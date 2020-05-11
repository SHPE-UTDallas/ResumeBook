var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const { sign } = require('jsonwebtoken');
const passport = require('passport');
const passportJwt = require('passport-jwt');


const {
  BASE_URL,
  ENDPOINT,
  LINKEDIN_CLIENT_ID,
  LINKEDIN_CLIENT_SECRET,
  SECRET,
} = require('../utils/config');


function authJwt(email) {
  return sign({user: { email }}, SECRET)
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
      // Here you'd typically load an existing user
      // and use the data to create the JWT.
      const jwt = authJwt(email);

      return done(null, { email, jwt });
    } catch (error) {
      return done(error);
    }
  }),
);