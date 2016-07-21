var Plants = require('./plantsModel.js');
    Q = require('q');
var findPlant = Q.nbind(Plant.findOne, Plant);
var createPlant = Q.nbind(Plant.create, Plant);
var findAllPlants = Q.nbind(Plant.find, Plant);

module.exports = {

  allPlants: function (req, res, next) {
  findAllPlants({})
    .then(function (plants) {
      res.json(plants);
      console.log(plants)

    })
    .fail(function (error) {
      next(error);
    });
  },
  newPlant: function (req, res, next) {
    var name = req.body.name;
    var plantType = req.body.plantType;
    var sunExposure = req.body.sunExposure;
    var bloomTime = req.body.bloomTime;
    var watering= req.body.watering;

    createPlant({
      name:name,
      plantType:plantType,
      sunExposure:sunExposure,
      bloomTime:bloomTime,
      watering:watering
    })
    .save(function(err,newrecord){
      if(err){
      console.log(err)
    }else{
      console.log(newrecord)
    }
    })
  },
  
 };
