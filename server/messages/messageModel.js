var mongoose = require('mongoose');

//creating plants Schema 
var MessageSchema = new mongoose.Schema({
 text: String,
 username:String
});
 
// creating plant model
var Message = mongoose.model('Message', MessageSchema);
module.exports = Message