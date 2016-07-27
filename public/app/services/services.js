angular.module('iGrow.services', [])

.factory('Plants', function ($http, $window) {

  // show all plants in garden
  
  var getAll = function(){
     return $http({
      method:'GET',
      url:'/api/plants'
     })
     .then(function(resp){
      return resp.data;
     });
  };
 
 var addNewComment = function(text){
  console.log(text);
     return $http({
      method:'POST',
      url:'/api/users/addcomments',
      data: text
     })
     .then(function(resp){
      return resp.data;
     });
  };

   var getAllComment = function(){
     return $http({
      method:'GET',
      url:'/api/users/comments',
     })
     .then(function(resp){
      return resp.data;
     });
  };
  //view plants in garden
    var getGarden = function(){
     return $http({
      method:'GET',
      url:'/api/users/garden',
     })
     .then(function(resp){
      return resp.data;
     });
  };
  //add a plant to garden
  var AddPlant = function(plantId){
    return $http({
      method:'POST',  
      url:'api/users/addplant',
      data: {
        plantsId:plantId
      }
     })
    .then(function(resp){
      return resp;
    })
  }
  //removes plant from user garden
  var removePlant = function(plantId){
    return $http({
      method:'PUT',
      url:'api/users/removeplant',
      data: {
        plantsId:plantId
      }
     })
    .then(function(resp){
      return resp;
    })
  }
//creating a new plant by filling fields by user
  var createPlant = function(plant){
    console.log(plant)
    return $http({
      method: 'POST',
      url: '/api/plants/newplant',
      data: plant
    })
    .then(function(resp){
      return resp.data;
    })
  }


  return {
    getAll:getAll,
    AddPlant:AddPlant,
    createPlant:createPlant,
    getGarden: getGarden,
    removePlant: removePlant,
    addNewComment:addNewComment,
    getAllComment:getAllComment
  }

})
.factory('socket', function($rootScope){
  var socket = io.connect('http://localhost:8000');
  
  return socket;
})
.factory('Auth', function ($http, $location, $window) {

  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.iGrow');
  };

  var signout = function () {
    //remove token and username on session destroy
    $window.localStorage.removeItem('com.iGrow');
    $window.localStorage.removeItem('com.username');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
