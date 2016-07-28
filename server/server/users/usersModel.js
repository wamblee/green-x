var Q = require('q');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;
var Plant = require('../plants/plantsModel');
var Store=require('../store/storeModel');
var User=require('../users/usersModel');
var Comment=require('../comments/commentModel');
 //creating usermodel and connecting it with plant table
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },
  salt: String,
  garden:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Plant'
  }],
  friends:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }],
  comments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Comment'
  }],
  likes:{
    type:Number,
    default:0
  },
  description:{
    type:String,
    default:""
  },
  lifeGarden:{
    type:Number,
    default:100
  } 
  ///comments in a seperate table
  ///stores array of stores id
  ///friends array of userid
});

 // user methods for comparing password in signing 
UserSchema.methods.comparePasswords = function (candidatePassword) {
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
UserSchema.pre('save', function (next) {
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


var User = mongoose.model('User', UserSchema);
module.exports = User;