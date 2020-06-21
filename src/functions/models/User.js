//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var userModel = new Schema({
    email: String,
    verified: {type: Boolean, default: false}
});

module.exports= mongoose.model('users', userModel);
