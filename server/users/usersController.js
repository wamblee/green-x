var User = require('./usersModel.js')
var mongoose = require('mongoose');
var Q = require('q')
var jwt = require('jwt-simple')
var Plant=require('../plants/plantsModel.js')
var findPlants = Q.nbind(Plant.find, Plant);
var findOneUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);
 

module.exports = {
  // signin function that check if the user is exist 
  // returning his token if his password is correct 
  signin: function (req, res, next) {
   var username = req.body.username;
    var password = req.body.password;
    findOneUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          return user.comparePasswords(password)
            .then(function (foundUser) {
              if (foundUser) {
                var token = jwt.encode(user, 'secret');
                res.json({token: token, user:user.username});
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
  // the function that saves username and password when signup for the first time
  signup: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(username, password);
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
        res.json({token: token, user:user.username});
      })
      .fail(function (error) {
        next(error);
      });
  },
  // the auth function 
  checkAuth: function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else { 
      //decoded user token
      var user = jwt.decode(token, 'secret');
      // find user from his name
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
  // the function that adding new plants to user's garden
  addPlant:function(req,res,next){
    //Get token from header to identify user
    var plantsId = req.body.plantsId;
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else { 
      //decoded user token
      var user = jwt.decode(token, 'secret');
      //find user from database
      findOneUser({username: user.username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
           } else {
            //pushin new plant to garden array and saving it
            //push plant id to garden array on user schema
           user.garden.push(plantsId)
           user.save();
           return user.garden
          }
        })
      .then(function(garden){
        //showing plants details that's inside the garden
        //Searches the plants schema to find each plant that is listed on the garden
        findPlants({'_id': { $in: garden}})
        .then(function(plants){
          res.json(plants)
        })
      })
      .fail(function(err){
        console.log(err)
      })
    }
  },
  getGarden: function(req, res, next){
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else { 
      //decoded user token
    var user = jwt.decode(token, 'secret');    
    findOneUser({username:user.username})
    .then(function(user){
      if (!user) {
          next(new Error('User does not exist'));
           } else {
            //pushin new plant to garden array and saving it
        return user.garden
      }
    })
      .then(function(garden){
        findPlants({'_id': { $in: garden }})
        .then(function(plants){
          res.json(plants)
        })
        .fail(function(err){
          res.send(204)
        })
      })
    }
  },
  removePlant: function(req, res, next){
    var plantsId = req.body.plantsId;
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else { 
      //decoded user token
      var user = jwt.decode(token, 'secret');
      findOneUser({username: user.username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
           } else {
            //find the index of the plant Id to be removed from user garden
           var indexPlant = user.garden.indexOf(plantsId);
           //Remove the plant
           user.garden.splice(indexPlant, 1);
           //Save user changes
           user.save();
           return user.garden
          }
        })
      .then(function(garden){
        //showing plants details that's inside the garden 
        findPlants({'_id': { $in: garden}})
        .then(function(plants){
          //Return plants models for the updated garden
          res.json(plants)
        })
      })
      .fail(function(err){
        console.log(err)
      })
    }
  }
};
