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
  VERIFICATION_CODE,
  MONGODB_URI
} = require('./utils/config');

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
    //to be implemented
    if(req.body.code.toLocaleLowerCase() === VERIFICATION_CODE.toLocaleLowerCase())
    {
      if (conn == null) {
        conn = mongoose.createConnection(MONGODB_URI, {
          // Buffering means mongoose will queue up operations if it gets
          // disconnected from MongoDB and send them when it reconnects.
          // With serverless, better to fail fast if not connected.
          bufferCommands: false, // Disable mongoose buffering
          bufferMaxEntries: 0, // and MongoDB driver buffering
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        await conn;
      }
      const M = conn.model('users');
      await M.findOneAndUpdate({email: req.user.email}, {$set:{email: req.user.email, verified: true}}, {upsert: true, useFindAndModify: false}, (err, doc) => {
        if(err)
        {
          console.log(err);
          res.send(500, {error: err});
        }
        console.log(doc);
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

app.get('/.netlify/functions/auth/', (req, res) => {
    res.send('hi');
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