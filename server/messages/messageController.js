var Message = require('./messageModel.js');
    Q = require('q');
    var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var createMessage = Q.nbind(Message.create, Message);
var findAllMessage = Q.nbind(Message.find, Message);
var User=require('../users/usersController.js');
var Store=require('../store/storeController.js');
var findOneStore = Q.nbind(Store.find, Store);


module.exports = {
	getAll : function(req,res){
		Message.find({}).exec(function(err,messages){
			res.status(200).send(messages);
		})
	},
	getAllMessages:function(callback){
		var msgs;
		// findAllMessage().then(function(err, messages){
		// 	if(messages){
		// 		return messages;
		// 	}
		// })
		Message.find({}).exec(function(err,messages){
			//nsole.log(messages);
			// msgs=messages;
			callback(messages);
		})
		// return msgs;
	},
	addMessage:function(data){
		createMessage({
			text:data.text,
			username:data.username
		})
	}
}