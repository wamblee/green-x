var Plant = require('./plantsModel.js');
    Q = require('q');
var findPlant = Q.nbind(Plant.findOne, Plant);
var createPlant = Q.nbind(Plant.create, Plant);
var findAllPlants = Q.nbind(Plant.find, Plant);
var user=require('../users/usersController.js')

module.exports = {

  allPlants: function (req, res, next) {
  findAllPlants({})
    .then(function (plants) {
      res.json(plants);
    })
    .fail(function (error) {
      next(error);
    });
  },
  newPlant: function (req, res, next) {
    console.log(req)
    var name = req.query.name;
    var img = req.query.img;
    var plantType = req.query.Type;
    var sunExposure = req.query.sunExposure;
    var bloomTime = req.query.bloomTime;
    var watering= req.query.watering;

    console.log(name, img, plantType, sunExposure, bloomTime, watering)

    createPlant({
      name:name,
      img: img,
      plantType:plantType,
      sunExposure:sunExposure,
      bloomTime:bloomTime,
      watering:watering
    })
    .then(function(newPlant){
      res.json(newPlant);
    })
    .catch(function(error){
      res.send(204)
    })
  }
  
  
 };
