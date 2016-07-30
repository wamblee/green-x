var Q = require('q');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;
var Plant = require('../plants/plantsModel.js');
var Store=require('../store/storeModel');
 //creating usermodel and connecting it with plant table
var StoreSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  number: {
    type: Number, 
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: String,
  storename:{
    type:String,
    required:true,
    unique:true
  },
  location:{
    type: mongoose.Schema.Types.Mixed
  },
  plant:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Plant'
  }]
  
});
StoreSchema.methods.comparePasswords = function (candidatePassword) {
  var savedPassword = this.password;
  return Q.Promise(function (resolve, reject) {
    bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

// saving the password adding salt and hashing it 
StoreSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});
var Store = mongoose.model('Store', StoreSchema);
module.exports = Store;