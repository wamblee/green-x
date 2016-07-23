var plantsController = require('../plants/plantsController.js');
var usersController = require('../users/usersController.js');
var helpers = require('./helpers.js'); // our custom middleware

module.exports = function (app, express) {
  // app.get('/:code', plantsController.navToLink);
  app.get('/', function (req, res) {
    res.render('public/index.html');
  });

  //Routes to handle authentication
  app.post('/api/users/signin', usersController.signin);
  app.post('/api/users/signup', usersController.signup);
  app.get('/api/users/signedin', usersController.checkAuth);

  //Add plant to user garden
  app.post('/api/users/addplant', usersController.addPlant);
  //View user garden
  app.get('/api/users/garden', usersController.getGarden);
  //Remove plant from user garden
  app.put('/api/users/removeplant', usersController.removePlant);
  
  //Create new plant
  app.post('/api/plants/newplant', plantsController.newPlant)
  //View all plants
  app.get('/api/plants', plantsController.allPlants);
  //TODO: delete plant
  // app.put('/api/plants/deleteplant')
  //TODO: edit plant records
  // app.put('/api/plants/editplant')

  // authentication middleware used to decode token and made available on the request
  // app.use('/api/plants', helpers.decode);

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};

