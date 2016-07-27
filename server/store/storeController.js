var User = require('../users/usersModel.js');
var Store=require('../store/storeModel');
var mongoose = require('mongoose');
var Q = require('q')
var jwt = require('jwt-simple')
var Plant=require('../plants/plantsModel.js')
var findPlants = Q.nbind(Plant.find, Plant);
var findOneUser = Q.nbind(User.findOne, User);
var findOneStore= Q.nbind(Store.findOne,Store);
var createStore=Q.nbind(Store.create,Store);
var findAllStores=Q.nbind(Store.find,Store);

module.exports = {
  // signin function that check if the user is exist 
  // returning his token if his password is correct 
  signin: function (req, res, next) {
   var username = req.body.username;
    var password = req.body.password;
    findOneStore({username: username})
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
    var storename= req.body.storename;
    //console.log(username, password);
    findOneStore({username: username})
      .then(function (user) {
        if (user) {
          next(new Error('User already exist!'));
        } else {
          return createStore({
            username: username,
            password: password,
            storename:storename
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
      findOneStore({username: user.username})
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
   getStores:function(req,res,next){ 
    findAllStores()
      .then(function(stores){
        res.json(stores);
      })
    }
}