//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var ResumeModel = new Schema({
    name: String,
    linkedin: String,
    gpa: String,
    major: String,
    standing: String,
    resume: String
});

module.exports= mongoose.model('resumes', ResumeModel);
