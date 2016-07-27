var Comment= require('./commentModel.js')
var User=require('../users/usersModel.js');
var mongoose = require('mongoose');
var Q = require('q');
var jwt = require('jwt-simple');
var findOneUser = Q.nbind(User.findOne, User);
var createComment = Q.nbind(Comment.findOne, Comment);
var findAllComments=Q.nbind(Comment.find, Comment);

module.exports = {
  newComment: function (req, res, next) {
    var text = req.body.text;
    var username=req.params.username;
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      //decoded user token
      var friend = jwt.decode(token, 'secret');
      var friendid=friend._id;
     findOneUser({username:username})
     .then(function (user){
     	if (user){
     		return user._id
     	}
     }).then(function (userid){
	    createComment({
	      text:text,
	      friendid:friendid,
	      userid:userid
	    })
	    .then(function(newComment){
	    	user.comments.push(newComment._id)
	      res.json(newComment);
	    })
	    .catch(function(error){
	      res.send(204)
	    })
	  })
    }
},
getAllComments:function(req,res,next){
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else { 
      //decoded user token
    var user = jwt.decode(token, 'secret');    
    findOneUser({username:user.username})
    .then(function(user){
      if (!user) {
          next(new Error('User does not exist'));
           } else {
            //pushin new plant to garden array and saving it
        return user.comments
      }
    })
      .then(function(comments){
        findAllComments({'_id': { $in: comments }})
        .then(function(comments){
          res.json(comments)
        })
        .fail(function(err){
          res.send(204)
        })
      })
    }
  }
}