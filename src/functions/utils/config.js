exports.LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID
exports.LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET
exports.VERIFICATION_CODE = process.env.VERIFICATION_CODE
exports.OFFICER_CODE = process.env.OFFICER_CODE
exports.CLOUDINARY_URL = process.env.CLOUDINARY_URL
exports.FIREBASE = process.env.FIREBASE
exports.BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8888' : process.env.BASE_URL

exports.COOKIE_SECURE = process.env.NODE_ENV !== 'development'

exports.CLOUDINARY_TESTDATAPATH =
  process.env.NODE_ENV === 'development' ? 'test/' : 'prod/'
exports.ENDPOINT = process.env.NODE_ENV === 'development' ? '/.netlify/functions' : '/api'

exports.SECRET = process.env.SECRET || 'SUPERSECRET'
