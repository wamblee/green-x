var mongoose = require('mongoose');

//creating plants Schema 
var PlantSchema = new mongoose.Schema({
 name: String,
 img: String,
 plantType: String,
 sunExposure: String,
 watering:{
 	type:Number,
 	default:0
 },
 maxWatering:{
 	type:Number,
 	default:4
 },
 lifePlant:{
 	type:Number,
 	default:100
 }///depend on categories
});
 
// creating plant model
var Plant = mongoose.model('Plant', PlantSchema);
module.exports = Plant

