var User = require('../users/usersModel.js');
var Store=require('../store/storeModel');
var mongoose = require('mongoose');
var Q = require('q');
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
                res.json({token: token, user:user.username , store:user.storename});
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
    console.log("signup in storeController")
    var username = req.body.username;
    var password = req.body.password;
    var storename= req.body.storename;
    var number = req.body.number;
    //console.log(username, password);
    findOneStore({username: username})
      .then(function (user) {
        if (user) {
          next(new Error('User already exist!'));
        } else {
          return createStore({
            username: username,
            password: password,
            storename:storename,
            number: number
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
    },


    getOneStore: function(req, res, next){
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else { 
      //decoded user token
    var user = jwt.decode(token, 'secret');    
    findOneStore({username:user.username})
    .then(function(user){
      if (!user) {
          next(new Error('User does not exist'));
           } else {
            //pushin new plant to garden array and saving it
        return user.plant
        }
    })
      .then(function(plant){
        findPlants({'_id': { $in: plant }})
        .then(function(plants){
          res.json(plants)
        })
        .fail(function(err){
          res.send(204)
        })
      })
    }
  },

  getInfoStore:function (req,res,next){
    console.log(req.params.store);
     var storename=req.params.store;
     console.log(storename);
     findOneStore({storename:storename})
    .then(function(user){
      if (!user) {
          next(new Error('User does not exist'));
           } else {
            //pushin new plant to garden array and saving it
        return user.plant
        }
    })
      .then(function(plant){
        findPlants({'_id': { $in: plant }})
        .then(function(plants){
          res.json(plants)
        })
        .fail(function(err){
          res.status(404).send('Not possible');
        })
      })
  },

  addLocation : function(req,res,next){
    var lat =  req.body.lat ;
    var lng = req.body.lng ; 
    var store = req.body.store;
    Store.findOne({storename : store})
      .exec(function(err,store){
        if(!store){
          res.status(500).send('Store Not Found');
        } else {
          store.location = {
            lat : lat, 
            lng : lng
          }
          store.save(function(err,savedStore){
            res.status(201).send('Added the location to store')
          })
        }
      })
  }

}