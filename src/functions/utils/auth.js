var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const { sign } = require('jsonwebtoken');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const mongoose = require('mongoose');

const {
  BASE_URL,
  ENDPOINT,
  LINKEDIN_CLIENT_ID,
  LINKEDIN_CLIENT_SECRET,
  SECRET,
  MONGODB_URI
} = require('../utils/config');

let conn = null;

module.exports = {updateVerification};

function authJwt(email, verified) {
  return sign({user: { email, verified}}, SECRET);
}

function updateVerification(email) {
  return sign({user: { email, verified: true}}, SECRET)
}

passport.use(
  new LinkedInStrategy({
    clientID: LINKEDIN_CLIENT_ID,
    clientSecret: LINKEDIN_CLIENT_SECRET,
    callbackURL: `${BASE_URL}${ENDPOINT}/auth/linkedin/callback`,
    scope: ['r_emailaddress', 'r_liteprofile'],
  }, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;
        const jwt = authJwt(email);
        return done(null, {email, jwt});
      } catch(error) {
        return done(error);
      }
    },
  ),
);

passport.use(
  new passportJwt.Strategy({
    jwtFromRequest(req) {
      if (!req.cookies) throw new Error('Missing cookie-parser middleware');
      return req.cookies.jwt;
    },
    secretOrKey: SECRET,
  },
  async ({ user: { email } }, done) => {
    try {
      //Setup DB connection
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
      //Check if the user is already verified
      let verified = false;
        if(email != null) {
        const M = conn.model('users');
        await M.findOne({email: email}, (err, doc) => {
          if(err)
            console.log(err);
          if(doc !== null && doc.verified === true)
            verified = true;
        });
      }
      const jwt = authJwt(email, verified);

      return done(null, { email, verified, jwt });
    } catch (error) {
      return done(error);
    }
  }),
);