
exports.LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
exports.LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
exports.VERIFICATION_CODE = process.env.VERIFICATION_CODE;
exports.MONGODB_URI = process.env.MONGODB_URI;
exports.CLOUDINARY_URL = process.env.CLOUDINARY_URL;
exports.BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8888'
  : process.env.BASE_URL;
  
exports.COOKIE_SECURE = process.env.NODE_ENV !== 'development';

exports.ENDPOINT = process.env.NODE_ENV === 'development'
  ? '/.netlify/functions'
  : '';

exports.SECRET = process.env.SECRET || 'SUPERSECRET';