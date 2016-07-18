var express = require('express');
var mongoose = require('mongoose');
var db = require('./dbConfig');
var User=require('./users/usersModel');
var Plant=require('./plants/plantsModel')

var app = express();

// connect to mongo database named "shortly"
//mongoose.connect('mongodb://localhost/iGrow');

// configure our server with all the middleware and routing
// require('./config/middleware.js')(app, express);
// require('./config/routes.js')(app, express);

// start listening to requests on port 8000
app.get('/',function(req,res){
	res.redirect('./public')
});
app.listen(8000);
module.exports = app;
