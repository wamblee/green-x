var Comment= require('./commentModel.js')
var User=require('../users/usersModel.js');
var mongoose = require('mongoose');
var Q = require('q');
var jwt = require('jwt-simple');
var findOneUser = Q.nbind(User.findOne, User);
var createComment = Q.nbind(Comment.create, Comment);
var findAllComments=Q.nbind(Comment.find, Comment);

module.exports = {
  newComment: function (req, res, next) {
    var text = req.body.text;
    console.log(text)
    var username=req.params.username;
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      //decoded user token
      var friend = jwt.decode(token, 'secret');
      var friendid=friend._id;
     //console.log(username,"this is the user name")
     // console.log(friendid,"this is the friend name")
     findOneUser({username:username})
     .then(function (user){
      //console.log(user,"inside userttttttttttttttttttttttttttttttttt")
     	if (user){
     		return user
     	}
     }).then(function (user){
      createComment({
	      text:text,
	      friendid:friendid,
	      userid:user.userid
	    })
	    .then(function(newComment){
	    	user.comments.push(newComment._id);
        user.save();
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
    //console.log(user,"userrrrrrrrrrrrrrrrrrrrr")    
    findOneUser({username:user.username})
    .then(function(user){
      console.log(user)
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