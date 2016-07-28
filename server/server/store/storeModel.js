var Q = require('q');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;
var Plant = require('../plants/plantsModel.js')

 //creating usermodel and connecting it with plant table
var StoreSchema = new mongoose.Schema({
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
  storename:{
    type:String,
    required:true,
    unique:true
  },
  location:{
    type:String
  },
  plant:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Plant'
  }]
});

var Store = mongoose.model('Store', StoreSchema);
module.exports = Store;