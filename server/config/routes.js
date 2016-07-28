var plantsController = require('../plants/plantsController.js');
var usersController = require('../users/usersController.js');
var storeController = require('../store/storeController.js');
var commentController = require('../comments/commentController.js');
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
//routes for comments
app.get('/api/users/comments', commentController.getAllComments);
app.post('/api/users/addcomments/:username', commentController.newComment);
  //Add plant to user garden
  app.post('/api/users/addplant', usersController.addPlant);
  //store route
  app.post('/api/users/signinstore',storeController.signin);
  app.post('/api/users/signupstore',storeController.signup);
  //View user garden
  app.get('/api/users/stores',usersController.getStores);
  app.get('/api/users/store',storeController.getOneStore);
  app.get('/api/stores/:store',storeController.getInfoStore);
  app.get('/api/:store',storeController.getInfoStore);
  app.get('/api/users/garden', usersController.getGarden);
  app.get('/api/users/friends',usersController.getFriends);
  app.post('/api/users/friendadd',usersController.addFriend);
  app.put('/api/users/likes',usersController.updateLikes);
  app.put('/api/users/description',usersController.addDescription);
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

