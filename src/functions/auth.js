const passport = require('passport')
const express = require('express')
const serverless = require('serverless-http')
const cookieParser = require('cookie-parser')
const { updateVerification, updateOfficer } = require('./utils/auth')

const app = express()

app.use(cookieParser())
app.use(passport.initialize())
app.use(express.json())
const {
  ENDPOINT,
  COOKIE_SECURE,
  VERIFICATION_CODE,
  OFFICER_CODE,
} = require('./utils/config')

const { db } = require('./utils/firebaseConfig')

const handleCallback = (req, res) => {
  res
    .cookie('jwt', req.user.jwt, { httpOnly: true, COOKIE_SECURE })
    .redirect('/login/success')
}

app.post(`${ENDPOINT}/auth/logout`, (req, res) => {
  res.clearCookie('jwt').send({ message: 'Successfully logged out' })
})

app.post(
  `${ENDPOINT}/auth/verify`,
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.body.code.toLocaleLowerCase() === VERIFICATION_CODE.toLocaleLowerCase()) {
      let userRef = db.collection('users')
      await userRef
        .where('email', '==', `${req.user.email}`)
        .get()
        .then(async (snapshot) => {
          if (snapshot.empty) {
            console.log(
              `No matching documents. Creating a new user entry for ${req.user.email}`
            )
            userRef
              .add({
                email: `${req.user.email}`,
                verified: true,
                officer: false,
              })
              .catch((err) => {
                console.error(
                  `Could not add user with an email of ${req.body.email} to the database`
                )
                console.log(err)
              })
          } else if (snapshot.size === 1) {
            console.log(
              `Attempting to update verification status for user ${snapshot.docs[0].id}`
            )
            await snapshot.docs[0].ref
              .update({ verified: true, officer: false })
              .then(() => {
                console.log(
                  `Successfully updated verification for user ${snapshot.docs[0].id}`
                )
              })
              .catch((err) => {
                console.error(
                  `Error updating verification status for user ${snapshot.docs[0].id}`
                )
                console.log(err)
              })
          } else {
            console.error(
              `There are two or more users with the same email: ${req.user.email}`
            )
          }
        })
        .catch((err) => {
          console.error('Could not successfully retrieve information from the database')
          console.log(err)
          return res.status(500).send({
            error: 'Server was unable to update verification',
          })
        })

      const newJwt = updateVerification(req.user.email)
      res
        .clearCookie('jwt')
        .cookie('jwt', newJwt, { httpOnly: true, COOKIE_SECURE })
        .send({ message: 'Successfully Verified' })
    } else {
      res.status(422).send({error: 'Invalid Verification Code entered, please try again'})
    }
  }
)

app.post(
  `${ENDPOINT}/auth/officer`,
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.body.code.toLocaleLowerCase() === OFFICER_CODE.toLocaleLowerCase()) {
      let userRef = db.collection('users')

      await userRef
        .where('email', '==', `${req.user.email}`)
        .get()
        .then(async (snapshot) => {
          if (snapshot.empty) {
            console.log(
              `No matching documents. Creating a new user entry for ${req.user.email}`
            )
            userRef
              .add({
                email: `${req.user.email}`,
                verified: true,
                officer: true,
              })
              .catch((err) => {
                console.error(
                  `Could not add user with an email of ${req.body.email} to the database`
                )
                console.log(err)
              })
          } else if (snapshot.size === 1) {
            console.log(
              `Attempting to update officer status for user ${snapshot.docs[0].id}`
            )
            await snapshot.docs[0].ref
              .update({ verified: true, officer: true })
              .then(() => {
                console.log(
                  `Successfully updated officer status for user ${snapshot.docs[0].id}`
                )
              })
              .catch((err) => {
                console.error(
                  `Error updating officer status for user ${snapshot.docs[0].id}`
                )
                console.log(err)
              })
          } else {
            console.error(
              `There are two or more users with the same email: ${req.user.email}`
            )
          }
        })
        .catch((err) => {
          console.error('Could not successfully retrieve information from the database')
          console.log(err)
          return res.status(500).send({
            error: 'Server was unable to update officer status',
          })
        })

      const newJwt = updateOfficer(req.user.email)
      res
        .clearCookie('jwt')
        .cookie('jwt', newJwt, { httpOnly: true, COOKIE_SECURE })
        .send({ message: 'Successfully Verified as an Officer' })
    } else {
      res.status(422).send({ message: 'Invalid Officer Code entered, please try again' })
    }
  }
)

app.get(
  `${ENDPOINT}/auth/linkedin`,
  passport.authenticate('linkedin', { session: false })
)

app.get(
  `${ENDPOINT}/auth/linkedin/callback`,
  passport.authenticate('linkedin', { failureRedirect: '/', session: false }),
  handleCallback
)

app.get(
  `${ENDPOINT}/auth/status`,
  passport.authenticate('jwt', { session: false }),
  (req, res) =>
    res.json({
      email: req.user.email,
      verified: req.user.verified,
      officer: req.user.officer,
    })
)

module.exports.handler = serverless(app)
