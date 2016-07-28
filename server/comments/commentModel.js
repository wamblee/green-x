var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  userid:{
<<<<<<< HEAD
    type:Number
  },
  friendid:{
    type:Number
=======
    type:mongoose.Schema.Types.ObjectId
  },
  friendid:{
    type:mongoose.Schema.Types.ObjectId
>>>>>>> 414814f4e3d4a0c5fb0a5d0fc0ef3fc99841fb7b
  }
});

var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;