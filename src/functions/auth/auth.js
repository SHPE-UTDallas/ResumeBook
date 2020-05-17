const passport = require('passport');
const express = require('express');
const serverless = require('serverless-http');
const cookieParser = require('cookie-parser');
const {updateVerification} = require('../utils/auth');


require('../utils/auth');

const {
  ENDPOINT,
  COOKIE_SECURE,
  VERIFICATION_CODE
} = require('../utils/config');

const app = express();

app.use(cookieParser())
app.use(passport.initialize());
app.use(express.json());
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
  (req, res) => {
    //to be implemented
    if(req.body.code.toLocaleLowerCase() === VERIFICATION_CODE.toLocaleLowerCase())
    {
      const newJwt = updateVerification(req.user.email);
      res
          .clearCookie('jwt')
          .cookie('jwt', newJwt, { httpOnly: true, COOKIE_SECURE })
          .send("Successfully Verified");
    } else{
      res.send('Invalid Code');
    }
});

app.get('/.netlify/functions/auth/', (req, res) => {
    res.send('hi');
});
app.get(`${ENDPOINT}/auth/linkedin`, passport.authenticate('linkedin', {session: false}));

app.get(`${ENDPOINT}/auth/linkedin/callback`,
  passport.authenticate('linkedin', { failureRedirect: '/', session: false }),
  handleCallback()
);

app.get(
  `${ENDPOINT}/auth/status`,
  passport.authenticate('jwt', { session: false }),
  (req, res) => res.json({ email: req.user.email }),
);

module.exports.handler = serverless(app)