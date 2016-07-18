// var plantsController = require('../plants/linkController.js');
// var userController = require('../users/userController.js');
var helpers = require('./helpers.js'); // our custom middleware

module.exports = function (app, express) {
  // app.get('/:code', plantsController.navToLink);

  // app.post('/api/users/signin', userController.signin);
  // app.post('/api/users/signup', userController.signup);
  // app.get('/api/users/signedin', userController.checkAuth);

  // authentication middleware used to decode token and made available on the request
  // app.use('/api/plants', helpers.decode);
  // app.get('/api/plants/', plantsController.allplants);
  // app.post('/api/plants/', plantsController.newLink);

  // If a request is sent somewhere other than the routes above,
  // send it through our custom error handler
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};

