var mongoose = require('mongoose');

//creating plants Schema 
var PlantSchema = new mongoose.Schema({
 name: String,
 img: String,
 plantType: String,
 sunExposure: String,
 bloomTime: String,
 watering:String
});
 
// creating plant model
var Plant = mongoose.model('Plant', PlantSchema);
module.exports = Plant

