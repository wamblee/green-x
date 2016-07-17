angular.module('iGrow.services', [])

.factory('Plants', function ($http, $window) {
  // show all plants in my garden
  var AllPlants = function(){
     return $http({
      method:'GET',
      url:'/api/plants',
     })
     .then(function(resp){
      return resp.data;
     });
  };

  //add a plant to my garden
  var addPlant = function(plant){
    return $http({
      method:'POST',
      url:'/api/plants',
      data: plant
     })
    .then(function(resp){
      return resp;
    })
  };


  return {
    AllPlants:AllPlants,
    addPlant:addPlant
  }

});

.factory('Auth', function ($http, $location, $window) {

  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.iGrow');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.iGrow');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});