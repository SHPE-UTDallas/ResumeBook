const admin = require('firebase-admin');

const {FIREBASE} = require('./config');
let serviceAccount = JSON.parse(FIREBASE);
const db = admin.initializeApp({
              credential: admin.credential.cert(serviceAccount)
            }).firestore();

module.exports.db = db;