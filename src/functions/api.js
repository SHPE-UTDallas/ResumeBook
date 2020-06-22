const passport = require('passport');
const express = require('express');
const serverless = require('serverless-http');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('./models/Resume');
var multer  = require('multer');
var upload = multer({ storage: storage });
var storage = multer.memoryStorage();
var cloudinary = require('cloudinary').v2;
require('./utils/auth');

const app = express();
app.use(passport.initialize());
app.use(cookieParser());
const {
    ENDPOINT
  } = require('./utils/config');

const {db} = require('./utils/firebaseConfig');
let conn = null;

app.post(`${ENDPOINT}/api/file`, upload.none(), async (req, res) =>{
  /*TODO: -HANDLE ERROR INCASE CLOUDINARY UPLOAD DOESN'T WORK
          -INPUT VALIDATION
  */
 
  //Upload the resume to the cloudinary CDN
  let url = await cloudinary.uploader.upload(req.body.pdf,
      {public_id: `${req.body.name} - Resume`, resource_type: 'raw', format: 'pdf'}, 
      (error, result) => {return result.secure_url });
  
  //Add an entry to the resumes collection
  let resumesRef = db.collection('resumes');
  resumesRef.where('name', '==', `${req.body.name}`).get().then(snapshot => {
    if(snapshot.size== 0) {
      resumesRef.add({
        name: req.body.name,
        linkedin: req.body.linkedin,
        email: req.body.email,
        gpa: req.body.gpa,
        major: req.body.major,
        standing: req.body.standing,
        resume: url.secure_url
      })
    }
    else if(snapshot.size >= 1)
    {
      /*If there already exists an entry with that same name either:
        Update their entry if we can be somewhat confident it's the same person (We're going to assume the chance of two people having the same name, standing, and major is low)
        Create a new entry if we can be somewhat confident it's a different person
      */
      let documentAdded = false;
      snapshot.forEach(doc => {
        const { major, standing, email } = doc.data();
        //If the email they inputed is the same as another entry with the same name but a different major and/or standing we can assume it's the same person
        if (!documentAdded && (major === req.body.major && standing === req.body.standing) || email === req.body.email) {
          //TODO: Delete old cloudinary resume if the user is updating their resume
          resumesRef.doc(doc).update({
            linkedin: req.body.linkedin,
            email: req.body.email,
            gpa: req.body.gpa,
            major: req.body.major,
            standing: req.body.standing,
            resume: url.secure_url
          });
          documentAdded = true;
        }
      });
      //We are assuming that this person hasn't already been added to the resumes collection
      if(documentAdded === false)
      {
        resumesRef.add({
          name: req.body.name,
          linkedin: req.body.linkedin,
          email: req.body.email,
          gpa: req.body.gpa,
          major: req.body.major,
          standing: req.body.standing,
          resume: url.secure_url
        });
      }
    }
  });
   res.send("Successfully Added");
})

app.get(
  `${ENDPOINT}/api/resumes`,
  passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      let resumesRef = db.collection('resumes');
      let resumes = [];
      await resumesRef.get().then(snapshot => {
        snapshot.forEach(doc => {
          resumes.push(doc.data());
        })
      });
      res.json(resumes);

    }
);

module.exports.handler = serverless(app)