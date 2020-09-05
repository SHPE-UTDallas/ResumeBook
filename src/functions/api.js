const passport = require('passport')
const express = require('express')
const serverless = require('serverless-http')
const cookieParser = require('cookie-parser')
var multer = require('multer')
var upload = multer({ storage: storage })
var storage = multer.memoryStorage()
var cloudinary = require('cloudinary').v2
require('./utils/auth')

const app = express()
app.use(passport.initialize())
app.use(cookieParser())
const { ENDPOINT, CLOUDINARY_TESTDATAPATH } = require('./utils/config')

const { db } = require('./utils/firebaseConfig')

function startsWith(str, check) {
  return str.indexOf(check) === 0
}

async function uploadDocument(res, name, base64) {
  return cloudinary.uploader.upload(
    base64,
    {
      public_id: CLOUDINARY_TESTDATAPATH + name,
      resource_type: 'raw',
      format: 'pdf',
    },
    (err, result) => {
      if (err) {
        console.error(
          `Cloudinary was unable to upload the resume for "${name}" successfully`
        )
        console.log(err)
        res.status(500).send('Unable to upload your resume to our CDN. Please try again')
      }
      console.log(`Cloudinary Successfully uploaded a resume for "${name}"`)
      return result.secure_url
    }
  )
}

app.post(
  `${ENDPOINT}/api/file`,
  passport.authenticate('jwt', { session: false }),
  upload.none(),
  async (req, res) => {
    /* TODO:
     *  - HANDLE ERROR INCASE CLOUDINARY UPLOAD DOESN'T WORK
     *  - INPUT VALIDATION
     *  - Select for majors
     *  - Verification
     */
    if (!req.user.verified) {
      res.sendStatus(401)
      return
    }

    // Upload the resume to the cloudinary CDN
    const url = await uploadDocument(res, `${profile.name} - Resume`, req.body.pdf)

    const profile = {
      name: req.body.name,
      linkedin: req.body.linkedin.toLowerCase(),
      email: req.body.email,
      gpa: req.body.gpa,
      major: req.body.major,
      standing: req.body.standing,
      resume: url.secure_url,
    }

    if (!startsWith(profile.linkedin, 'https://www.linkedin.com/in/')) {
      res.sendStatus(422)
      return
    }

    // Add an entry to the resumes collection
    const resumesRef = db.collection('resumes')

    console.log(`Performing a query to figure out if a resume exists for ${profile.name}`)
    const snapshot = await resumesRef.where('name', '==', profile.name).get()

    if (snapshot.size == 0) {
      console.log(`No resumes found for ${profile.name}, creating a new document`)
      await resumesRef
        .add(profile)
        .then((doc) => doc.update({ _id: doc.id }))
        .catch((err) => {
          console.error(`Unable add a resume to the collection for ${profile.name}`)
          console.log(err)
          res
            .status(500)
            .send('Unable to add your resume to our database. Please try again')
        })
    } else if (snapshot.size >= 1) {
      /* If there already exists an entry with that same name either:
       * Update their entry if we can be somewhat confident it's the same person
       * (We're going to assume the chance of two people having the same name, standing, and major is low)
       * Create a new entry if we can be somewhat confident it's a different person
       */
      console.log(`One or more entries were found with the name ${profile.name}`)

      let documentAdded = false
      for (let i = 0; i < snapshot.size; i++) {
        const doc = snapshot.docs[i]
        const { major, standing, email } = doc.data()

        // If the email they inputed is the same as another entry with the same name but a different major and/or standing we can reasonably assume it's the same person
        if (
          !documentAdded &&
          ((major === profile.major && standing === profile.standing) ||
            email === profile.email)
        ) {
          // TODO: Delete old cloudinary resume if the user is updating their resume
          await doc.ref
            .update({
              linkedin: req.body.linkedin,
              email: req.body.email,
              gpa: req.body.gpa,
              major: req.body.major,
              standing: req.body.standing,
              resume: url.secure_url,
            })
            .then(() => {
              console.log(
                `Successfully updated resume entry for ${profile.name} with collection ID: ${doc.id}`
              )
              documentAdded = true
            })
            .catch((err) => {
              console.error(
                `Unable to update resume entry for ${profile.name} with collection ID: ${doc.id}`
              )
              console.log(err)
              res
                .status(500)
                .send('Unable to update your resume in our database. Please try again')
            })
        }
      }

      // We are assuming that this person hasn't already been added to the resumes collection
      if (!documentAdded) {
        await resumesRef
          .add(profile)
          .then((doc) => {
            console.log(
              `Created a new entry for ${req.body.name} with collection ID: ${doc.id}`
            )
          })
          .catch((err) => {
            console.log(`Unable to add new resume entry for ${req.body.name}`)
            console.error(err)
            res
              .status(500)
              .send('Unable to add your resume to our database. Please try again')
          })
      }
    }
    res.send('Successfully Added')
  }
)

app.get(
  `${ENDPOINT}/api/resumes`,
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.user.verified === false) res.send(401)
    let resumesRef = db.collection('resumes')
    let resumes = []
    await resumesRef
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          resumes.push(doc.data())
        })
      })
      .then(() => {
        console.log(`Successfully retrived resumes for user ${req.body.email}`)
      })
      .catch((err) => {
        console.error('Unable to retrieve resumes from the database')
        console.log(err)
        res
          .status(500)
          .send('Could not retrieve resumes from our database. Please try again')
      })
    res.json(resumes)
  }
)

module.exports.handler = serverless(app)
