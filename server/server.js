var express = require('express');
var mongoose = require('mongoose');
var User=require('./users/usersModel');
var Plant=require('./plants/plantsModel')


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


io.sockets.on('connection' , function(socket){
	// console.log('I AM FINALLY WORKINGGGGGGGGGGG')
	// socket.on('hello' , function(data){
	// 	console.log('MA AZNAKHAKKKKKK')
	// 	io.sockets.emit('send' , data)
	// })

	socket.on('send msg' , function(data){
		io.sockets.emit('get msg' , data);
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

