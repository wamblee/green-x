var express = require('express');
var mongoose = require('mongoose');
var User=require('./users/usersModel');
var Plant=require('./plants/plantsModel')
var Messages=require('./messages/messageController.js');
var jwt = require('jwt-simple');

// connect to mongo database named "iGrow"
var mongoURL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:/iGrow';
//create mongoose connection
mongoose.connect(mongoURL);
var db = mongoose.connection;
// when there is an error with the connection
db.on('error',function(err){
 throw err;
});


// when the connection works 
// db.once('open',function(){
//  console.log('conecction is open');
// });

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// configure our server with all the middleware and routing
var port = process.env.PORT || 8000;
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);
// start listening to requests on port 8000

server.listen(port, function () {
  console.log(' app listening on port ' + port);
});

var numOfUsers = 0;
var users = [];

io.sockets.on('connection' , function(socket){
	var addedUser = false;
	var messages; 
	socket.emit('users' , users);
	Messages.getAllMessages(function(msgs){
		io.sockets.emit('get all', msgs);
	});
		
	socket.on('add user', function(username){
		if(addedUser) return;
		console.log('User connected');
		console.log(numOfUsers);	
		socket.username = username;
		if(users.indexOf(socket.username) === -1){
			users.push(username)
		}
		++numOfUsers;
		addedUser = true;
		socket.emit('login' , {
			users  : users,
			numOfUsers : numOfUsers
		})
		socket.broadcast.emit('user joined' , {
			users : users ,
			username : socket.username ,
			numOfUsers : numOfUsers
		})
	})
	

	socket.on('send msg' , function(data){
		
		Messages.addMessage({
			text:data.text,
			username:data.username
		});
		io.sockets.emit('get msg' , data);
	})

	socket.on('disconnect', function(){
		console.log('disconnected');
		if(addedUser){
			--numOfUsers
			// console.log(numOfUsers);
			users.splice(users.indexOf(socket.username),1)
			console.log(socket.username + ' Just Left');
			socket.broadcast.emit('user left' , {
				users : users,
				username : socket.username , 
				numOfUsers : numOfUsers
			})
		}
	})
})

//Kills server connection if it crashes or killed
//this is important so not to keep the 8000 port busy
//If the app crashes
app.on('uncaughtException', function(){
	//Close connection
	server.close();
})
// On kill
app.on('SIGTERM', function(){
	server.close();
})
//On exit
app.on('exit', function(){
	server.close();
})
module.exports = app;

