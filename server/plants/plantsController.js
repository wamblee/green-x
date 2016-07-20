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
    })
    .fail(function (error) {
      next(error);
    });
  },
  newPlant: function (req, res, next) {
    var name = req.body.name;
    findPlant({name: name})
      .then(function (match) {
        if (match) {
          res.send(match);
        } else {
          return util.getPlantData(name);
        }
      })
  }
 };
