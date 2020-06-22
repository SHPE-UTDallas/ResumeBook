const passport = require('passport');
const express = require('express');
const serverless = require('serverless-http');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const {updateVerification} = require('./utils/auth');
require('./models/User');
require('./utils/auth');

const app = express();

app.use(cookieParser())
app.use(passport.initialize());
app.use(express.json());
const {
  ENDPOINT,
  COOKIE_SECURE,
  VERIFICATION_CODE
} = require('./utils/config');

const {db} = require('./utils/firebaseConfig');

let conn = null;

const handleCallback = () => (req, res) => {
  res
    .cookie('jwt', req.user.jwt, { httpOnly: true, COOKIE_SECURE })
    .redirect('/login/success');
};

app.get(`${ENDPOINT}/auth/logout`, (req, res) => {
  res
    .clearCookie('jwt')
    .send("Successfully logged out");
});

app.post(`${ENDPOINT}/auth/verify`, 
  passport.authenticate('jwt', { session: false }), 
  async (req, res) => {
    if(req.body.code.toLocaleLowerCase() === VERIFICATION_CODE.toLocaleLowerCase())
    {
      let userRef = db.collection('users');
      userRef.where('email', '==', `${req.user.email}`).get()
        .then(snapshot => {
          if(snapshot.empty) {
            console.log('No matching documents.');
            userRef.add({
              email: `${req.user.email}`,
              verified: true
            });
          }
          else if(snapshot.size === 1){
            userRef.doc(snapshot.docs[0].id).update({verified: true});
          }
          else{
            console.error(`There are two or more user with the same email: ${req.user.email}`);
          }
        });
      const newJwt = updateVerification(req.user.email);
      res
          .clearCookie('jwt')
          .cookie('jwt', newJwt, { httpOnly: true, COOKIE_SECURE })
          .send("Successfully Verified");
    } 
    else
    {
      res.send('Invalid Code');
    }
});

app.get(`${ENDPOINT}/auth/linkedin`, passport.authenticate('linkedin', {session: false}));

app.get(`${ENDPOINT}/auth/linkedin/callback`,
  passport.authenticate('linkedin', { failureRedirect: '/', session: false }),
  handleCallback()
);

app.get( `${ENDPOINT}/auth/status`,
  passport.authenticate('jwt', { session: false }),
  (req, res) => res.json({ email: req.user.email, verified: req.user.verified })
);

module.exports.handler = serverless(app)