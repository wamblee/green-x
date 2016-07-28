var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  userid:{
    type:mongoose.Schema.Types.ObjectId
  },
  friendid:{
    type:mongoose.Schema.Types.ObjectId
  }
});

var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;