var plantsController = require('../plants/plantsController.js');
var usersController = require('../users/usersController.js');
var helpers = require('./helpers.js'); // our custom middleware

module.exports = function (app, express) {
  // app.get('/:code', plantsController.navToLink);
  app.get('/', function (req, res) {
    res.render('public/index.html');
  });
  app.post('/api/users/signin', usersController.signin);
  app.post('/api/users/signup', usersController.signup);
  app.get('/api/users/signedin', usersController.checkAuth);
  app.post('/api/users/addplant', usersController.addPlant);
  app.post('/api/plants/newplant', plantsController.newPlant)
  app.get('/api/plants/', plantsController.allPlants);
  app.get('/api/users/garden', usersController.getGarden);
  // app.put('/api/users/removeplant', usersController.removePlant);//TODO 


  // authentication middleware used to decode token and made available on the request
  // app.use('/api/plants', helpers.decode);

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};

