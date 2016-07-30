var app = angular.module('jsbin', []);

app.controller('DemoCtrl', function($http) {
  
  var vm = this;
  
  var URL = 'http://api.openweathermap.org/data/2.5/forecast/daily';
  
  var request = {
    method: 'GET',
    url: URL,
    params: {
       q: 'Amman',
      mode: 'json'
    }
  };
  
  $http(request)
    .then(function(response) {
      vm.data = response.data;
    }).
    catch(function(response) {
      vm.data = response.data;
    });
});