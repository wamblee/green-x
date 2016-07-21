var User = require('./usersModel.js')
var mongoose = require('mongoose');
    Q = require('q')
    jwt = require('jwt-simple')
    var Plant=require('../plants/plantsModel.js')
    var findPlants = Q.nbind(Plant.find, Plant);

var findOneUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);
 
module.exports = {
  signin: function (req, res, next) {
   var username = req.query.username;
    var password = req.query.password;
    findOneUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          return user.comparePasswords(password)
            .then(function (foundUser) {
              if (foundUser) {
                var token = jwt.encode(user, 'secret');
                res.json({token: token});
              } else {
                return next(new Error('No user'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  signup: function (req, res, next) {
    var username = req.query.username;
    var password = req.query.password;
    console.log(req.query, "hi");
    findOneUser({username: username})
      .then(function (user) {
        if (user) {
          next(new Error('User already exist!'));
        } else {
          return createUser({
            username: username,
            password: password
          });
        }
      })
      .then(function (user) {
        var token = jwt.encode(user, 'secret');
        res.json({token: token});
      })
      .fail(function (error) {
        next(error);
      });
  },

  checkAuth: function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
      findOneUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            res.send(200);
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  },
  
  addPlant:function(req,res,next){

    var plantsId = req.query.plantsId;
   findOneUser({'username': req.query.username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
           } else {
           user.garden.push(plantsId)
           user.save();
           return user.garden
          }
        })
      .then(function(garden){
        findPlants(garden)
        .then(function(plants){
          res.json(plants)
        })
      })
      .fail(function(err){
        console.log(err)
      })
  },
  getGarden: function(req, res, next){
    var username= req.body.username;
    User.findUser({username:username})
    .then(function(data){
        return data.garden
    }) 
  }
};
