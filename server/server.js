var express = require('express');
var mongoose = require('mongoose');
var db = require('./dbConfig');
var User=require('./users/usersModel');
var Plant=require('./plants/plantsModel')

var app = express();

// connect to mongo database named "shortly"
//mongoose.connect('mongodb://localhost/iGrow');

// configure our server with all the middleware and routing

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

// start listening to requests on port 8000

app.listen(8000, function () {
  console.log(' app listening on port 8000!');
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
