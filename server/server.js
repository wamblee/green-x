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
var port = process.env.PORT || 3000;
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);
// start listening to requests on port 8000

server.listen(port, function () {
  console.log(' app listening on port ' + port);
});

var users = {
	customers : {
		names : [],
		counter : 0
	} , 
	stores : {
		names : [] ,
		counter : 0
	}
}
io.sockets.on('connection' , function(socket){
	console.log('Connected');
	socket.on('login' , function(data){
		// holds data.user && data.name
		if(users.customers.names.indexOf(data.name) > -1 || users.stores.names.indexOf(data.name) > -1){
			io.sockets.emit('users', users);
			socket.broadcast.emit('users', users);
			console.log('Not gonna Add you');
		} else {
			if(data.user === 'store'){
				user = 'store';
				socket.username = data.name;
				users.stores.names.push(data.name);
				users.stores.counter++;
			} else {
				user = 'customer'
				socket.username = data.name;
				users.customers.names.push(data.name);
				users.customers.counter++;
			}
			console.log(users);
			console.log('reached here');
			io.sockets.emit('users', users);
			socket.broadcast.emit('users', users);
		}

	})

	socket.on('send msg' , function(data){
		console.log(data);
		io.sockets.emit('get msg', data);
		// socket.broadcast.emit('get msg' , data);
	})


	socket.on('disconnect',function(){
		var string = socket.username + ' Just Left';
		if(user === 'store'){
			users.stores.names.splice(users.stores.names.indexOf(socket.username),1);
			--users.stores.counter;
		} else {
			users.customers.names.splice(users.customers.names.indexOf(socket.username),1);
			--users.customers.counter;
		}
		console.log(string);
		var object =  {users : users , string : string} ;
		io.sockets.emit('user left', object);
		// socket.broadcast.emit('user left', users);
		socket.broadcast.emit('user left', object);
	})
});

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

