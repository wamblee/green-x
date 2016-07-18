var express = require('express');
var mongoose = require('mongoose');

var app = express();

// connect to mongo database named "shortly"
//mongoose.connect('mongodb://localhost/iGrow');

// configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

// start listening to requests on port 8000

app.get('/', function (req, res) {
	res.render('public/index.html');
});
app.listen(8000, function () {
  console.log(' app listening on port 8000!');
});

// export our app for testing and flexibility, required by index.js
module.exports = app;


