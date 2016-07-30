var app = angular.module('jsbin', []);

app.controller('DemoCtrl', function($http) {
  
  var WEATHER_API = '4f27f6f4eab43afca7bfd7e02b2d0cc4';
  
  function processForm() {
    // Fetch the data from the public API through JSONP.
    // See http://openweathermap.org/API#weather.
    $.ajax({
      type: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?q=' + 'JO'+'&APPID=4f27f6f4eab43afca7bfd7e02b2d0cc4',
      jsonp: 'callback',
      dataType: 'jsonp',
      // work with the response
      success: function (response) {
        console.log(response.main.temp - 273.15);
        console.log('Succeeeded')
      } , 
      error: function(error){
        console.log(error);
      }
    });
  }
  processForm();
});










