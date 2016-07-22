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
db.once('open',function(){
 console.log('conecction is open');
});
var app = express();
// configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);
// start listening to requests on port 8000
app.listen(8000);
module.exports = app;
module.exports = db;

