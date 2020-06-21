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
    ENDPOINT,
    MONGODB_URI,
  } = require('./utils/config');


let conn = null;

app.post(`${ENDPOINT}/api/file`, upload.none(), async (req, res) =>{
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
    /*TODO: HANDLE ERROR INCASE CLOUDINARY UPLOAD DOESN'T WORK
            INPUT VALIDATION
    */
   console.log('about to go to url');
    let url = await cloudinary.uploader.upload(req.body.pdf,
        {public_id: `${req.body.name} - Resume`, resource_type: 'raw', format: 'pdf'}, 
        (error, result) => {return result.secure_url });
        
        conn.model('resumes').create({
            name: req.body.name,
            linkedin: req.body.linkedin,
            email: req.body.email,
            gpa: req.body.gpa,
            major: req.body.major,
            standing: req.body.standing,
            resume: url.secure_url
        });
//       var uri = parser.format('.pdf', req.file.buffer);
//       const M = conn.model('PDF').create({data: req.file.buffer});
//       M.create({data: req.body})
//     console.log(doc);
//    // res.json(doc);
   res.send("Successfully Added");
})

app.get(
  `${ENDPOINT}/api/resumes`,
  passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        //From mongoose docs: https://mongoosejs.com/docs/lambda.html
        //context.callbackWaitsForEmptyEventLoop = false; <--- TODO: Research how to use context with Express
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
    
    const M = conn.model('resumes');
    const doc = await M.find({});
    res.json(doc);

    }
);

// app.get(`${ENDPOINT}/api/resumes/:id`, passport.authenticate('jwt', { session: false }),
// async (req, res) => {
//     if (conn == null) {
//         conn = mongoose.createConnection(MONGODB_URI, {
//           // Buffering means mongoose will queue up operations if it gets
//           // disconnected from MongoDB and send them when it reconnects.
//           // With serverless, better to fail fast if not connected.
//           bufferCommands: false, // Disable mongoose buffering
//           bufferMaxEntries: 0, // and MongoDB driver buffering
//           useNewUrlParser: true,
//           useUnifiedTopology: true
//     });
//     await conn;
//     conn.model('PDF', new mongoose.Schema({data: Buffer}));

//   }
//   const M = await conn.model('PDF').findById(req.params.id);
  

// })

module.exports.handler = serverless(app)