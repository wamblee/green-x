var mongoose = require('mongoose');

var PlantSchema = new mongoose.Schema({
 _id:Number,
 name: String,
 plantType: String,
 sunExposure: String,
 bloomTime: String,
 watering:String
});
var Plant = mongoose.model('Plant', PlantSchema);

// var newPlant = new Plant({name:'rose',plantType:'flower',sunExposure:"full sun",bloomTime:"spring",watering:"twice"});

// newPlant.save(function(err,newrecord){
//   console.log(err)
//   console.log(newrecord)
// });

module.exports = Plant

