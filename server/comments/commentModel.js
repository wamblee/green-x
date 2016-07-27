var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  userid:{
    type:Number
  },
  friendid:{
    type:Number
  }
});

var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;