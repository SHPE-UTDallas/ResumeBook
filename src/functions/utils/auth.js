var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy
const { sign } = require('jsonwebtoken')
const passport = require('passport')
const passportJwt = require('passport-jwt')

const {
  BASE_URL,
  ENDPOINT,
  LINKEDIN_CLIENT_ID,
  LINKEDIN_CLIENT_SECRET,
  SECRET,
} = require('../utils/config')

const { db } = require('../utils/firebaseConfig')

module.exports = { updateVerification, updateOfficer }

function authJwt(email, verified, officer) {
  return sign({ user: { email, verified, officer } }, SECRET)
}

function updateVerification(email) {
  return sign({ user: { email, verified: true } }, SECRET)
}

function updateOfficer(email) {
  return sign({ user: { email, verified: true, officer: true } }, SECRET)
}

passport.use(
  new LinkedInStrategy(
    {
      clientID: LINKEDIN_CLIENT_ID,
      clientSecret: LINKEDIN_CLIENT_SECRET,
      callbackURL: `${BASE_URL}${ENDPOINT}/auth/linkedin/callback`,
      scope: ['r_emailaddress', 'r_liteprofile'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value

        let verified = false
        let officer = false
        //Check if user is verified or an officer
        if (email != null) {
          let userRef = db.collection('users')

          await userRef
            .where('email', '==', `${email}`)
            .get()
            .then((snapshot) => {
              if (snapshot.empty) {
                console.log('No matching documents.')
                userRef.add({
                  email: `${email}`,
                  verified: false,
                  officer: false,
                })
              } else if (snapshot.size === 1) {
                snapshot.forEach((doc) => {
                  if (doc.data().verified) verified = true
                  if (doc.data().officer) officer = true
                })
              } else {
                console.error(`There are two or more user with the same email: ${email}`)
              }
            })
        } else {
          console.error(`ERROR: The user's linkedin emails is ${email}`)
        }

        const jwt = authJwt(email, verified, officer)

        return done(null, { jwt })
      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.use(
  new passportJwt.Strategy(
    {
      jwtFromRequest(req) {
        if (!req.cookies) throw new Error('Missing cookie-parser middleware')
        return req.cookies.jwt
      },
      secretOrKey: SECRET,
    },
    async ({ user: { email, verified, officer } }, done) => {
      try {
        const jwt = authJwt(email, verified, officer)
        return done(null, { email, verified, officer, jwt })
      } catch (error) {
        return done(error)
      }
    }
  )
)
