var Plant = require('./plantsModel.js');
    Q = require('q');
var findPlant = Q.nbind(Plant.findOne, Plant);
var createPlant = Q.nbind(Plant.create, Plant);
var findAllPlants = Q.nbind(Plant.find, Plant);
var User=require('../users/usersController.js');
var Store=require('../store/storeController.js');
var findOneStore = Q.nbind(Store.find, Store);

module.exports = {

  allPlants: function (req, res, next) {
  //Find all plants
  findAllPlants({})
    .then(function (plants) {
      res.json(plants);
    })
    .fail(function (error) {
      next(error);
    });
  },
 
newPlant: function (req, res, next) {
    var name = req.body.name;
    var img = req.body.img;
    var plantType = req.body.Type;
    var sunExposure = req.body.sunExposure;
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else { 
      var user= jwt.decode(token, 'secret');
      var userid=user._id;
      findOneStore({username:user.username})
     .then(function (user){
      if (user){
      createPlant({
      name:name,
      img: img,
      plantType:plantType,
      sunExposure:sunExposure,

    })
      .then(function(newPlant){
        user.plant.push(newPlant._id)
        res.json(newPlant);
      })
    }
    })
      .catch(function(error){
        res.send(204)
      })  

}},

 updateWatering:function(req,res,next){
  findPlant({name:req.body.name})
  .then(function (plant) {
  plant.watering=plant.watering++;
  plant.save();
})
},
  updatePlantLife:function(req,res,next){
    findPlant({name:req.body.name})
  .then(function (plant) {
    if (plant.watering<plant.maxWatering){
      var diff=(plant.maxWatering-plant.watering)*0.25;
      var result=plant.lifePlant*diff;
      if (plant.lifePlant-result>=0){
        plant.lifePlant=plant.lifePlant-result;
      }
      else
        plant.lifePlant=0;

    }
  })
  }
 };