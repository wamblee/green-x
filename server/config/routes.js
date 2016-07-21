// var plantsController = require('../plants/plantsController.js');
var usersController = require('../users/usersController.js');
var helpers = require('./helpers.js'); // our custom middleware

module.exports = function (app, express) {
  // app.get('/:code', plantsController.navToLink);

  app.post('/api/users/signin', usersController.signin);
  app.post('/api/users/signup', usersController.signup);
  app.get('/api/users/signedin', usersController.checkAuth);
  // app.post('/api/users/newplant', usersController.addPlant);


  // authentication middleware used to decode token and made available on the request
  // app.use('/api/plants', helpers.decode);
  // app.get('/api/plants/', plantsController.allplants);

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};

