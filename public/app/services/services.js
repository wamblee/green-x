angular.module('iGrow.services', [])

.factory('Plants', function ($http, $window) {
  var getFriends=function(){
    return $http({
      method:'GET',
      url:'/api/users/friends'
     })
     .then(function(resp){
      return resp.data;
     });
  }
  var addFriend=function(friendid){
    console.log(friendid);
    return $http({
      method:'POST',  
      url:'/api/users/friendadd',
      data: {
        friendid:friendid
      }
     })
    .then(function(resp){
      return resp;
    })
  }
  var getAllUsers=function(){
    return $http({
      method:'GET',
      url:'/api/users/allusers'
     })
     .then(function(resp){
      return resp.data;
     });
  }
  // show all plants in garden
  var getMessages=function(){
    return $http({
      method:'GET',
      url:'/api/users/message'
     })
     .then(function(resp){
      return resp.data;
     });
  };
  var getAll = function(){
     return $http({
      method:'GET',
      url:'/api/users/store'
     })
     .then(function(resp){
      return resp.data;
     });
  };
   var getStores = function(){
     return $http({
      method:'GET',
      url:'/api/users/stores'
     })
     .then(function(resp){
      return resp.data;
     });
  };
 

 var addNewComment = function(text,user){

     return $http({
      method:'POST',
      url:'/api/1/'+ user,
      data: {text:text}
     })
     .then(function(resp){
      return resp.data;
     });
  };

   var getAllComment = function(user){
     return $http({
      method:'GET',
      url:'/api/us/'+ user
     })
     .then(function(resp){
      return resp.data;
     });
  };

  var editDescription = function(description){
    console.log(description)
    return $http({
      method:'POST',
      url:'/api/users/description',
      data: {description:description}
     })
    .then(function(resp){
      return resp.data.description;
    })
  }
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
      url: 'api/plants/newplant',
      data: plant
    })
    .then(function(resp){
      console.log(resp.data)
      return resp.data;
    })
  };
  var selectStore=function (store){
    return $http({
      method:'GET',
      url:'/api/stores/'+ store

    }).then(function (resp){
      return resp.data;
    })
  };
  var getFriendGarden=function(friend){
    return $http({
      method:'POST',
      url:'/api/users/garden',
      data:{friend:friend}
    }).then(function (resp){
      console.log(resp)
      return resp.data;
    })
  };
var getStoreInfo=function (store){
    return $http({
      method:'GET',
      url:'/api/2/'+ store

      }).then(function (resp){
      return resp.data;
    })
  };  

var getGardenInfo=function (user){
    return $http({
      method:'GET',
      url:'/api/1/'+ user

      }).then(function (resp){
      return resp.data;
    })
  };  
  var selectUser=function (user){
    return $http({
      method:'GET',
      url:'/api/browseusers/'+ user

    }).then(function (resp){
      return resp.data;
    })
  };



/*                                     frined                                             */
//=======================================================================================
  var getFrinedGarden=function () {
    return $http({
      method:'GET',
      url:'/api/users/frindgarden'
     })
     .then(function(resp){
      return resp.data;
     })
  }

  var addFollower =function (baseID,FollowerID) {
    return $http({
      method: 'POST',
      url:'/api/users/frindgarden',
      data: {
            baseID:baseID,
            FollowerID:FollowerID
          }
    })
    .then(function (resp) {
      return resp.data;
    });
  }
//========================================================================================

  return {
    getFriendGarden:getFriendGarden,
    getFriends:getFriends,
    addFriend:addFriend,
    getAllUsers:getAllUsers,
    getMessages:getMessages,
    getAll:getAll,
    AddPlant:AddPlant,
    createPlant:createPlant,
    getGarden: getGarden,
    removePlant: removePlant,
    addNewComment:addNewComment,
    editDescription:editDescription,
    addFollower:addFollower,
    getFrinedGarden:getFrinedGarden,
    getAllComment:getAllComment,
    getStores:getStores,
    selectStore:selectStore,
    getStoreInfo:getStoreInfo,
    getGardenInfo:getGardenInfo,
    selectUser:selectUser
  }
})









//======================================================================================
.factory('socket', function($rootScope){
  var socket = io.connect('http://localhost:8000');
  
  return socket;
})
//=======================================================================================



















/*                                     Auth                                             */
//=======================================================================================
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

 var signinStore = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signinstore',
      data: user
    })
    .then(function (resp) {
      return resp.data;
    });
  };
   var signupStore = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signupstore',
      data: user
    })
    .then(function (resp) {
      return resp.data;
    });
  };

//=======================================================================================

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout,
    signinStore:signinStore,
    signupStore:signupStore
  };
});
