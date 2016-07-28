// connecting the angular iGrow module with different modules
angular.module('iGrow',[
	'iGrow.services',
	'iGrow.auth',
  'iGrow.browse',
  'iGrow.newplant',
  'iGrow.mygarden',
  'iGrow.stores',
  'iGrow.storeinfo',
  'ngRoute',
  'vAccordion', 
  'ngAnimate',
  'iGrow.What'
])

//routing 
.controller("HeaderController", function($scope, $window, $location, Auth) {
  //Sets isActive to true or false for highlighting the buttons in the nav panel
  $scope.flag = !!$window.localStorage.getItem('com.iGrow');
  $scope.isActive = function (viewLocation) { 
      return viewLocation === $location.path();
  };
  
  $scope.logOut = function (){    
    console.log(Auth.isAuth());
    if(Auth.isAuth()){
      Auth.signout();
      $scope.flag = !!$window.localStorage.getItem('com.iGrow');
      $location.path('/signin');
    } 
  }

})

//routing user to signin page when path includes /signin
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
  .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
  .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
  .when('/plants', {
    templateUrl: 'app/browse-all/browse-all.html',
    controller: 'BrowseController'
    })
  .when('/mygarden', {
   	templateUrl: 'app/mygarden/mygarden.html',
   	controller: 'GardenController'
   })
  .when('/newplant', {
    templateUrl: 'app/newplant/newplant.html',
    controller: 'plantsController'
   })
  .when('/chat',{
    templateUrl: 'app/chat/message.html',
    controller: 'socketController'
  })
  .when('/stores', {
    templateUrl: 'app/stores/stores.html',
    controller: 'storesController'
   })
  .when('/stores/:store', {
    templateUrl: 'app/stores/stores.html',
    controller: 'storesController'
   })
  .when('/:store', {
    templateUrl: 'app/storeinfo/storeinfo.html',
    controller: 'storeinfoController'
   })
  // .when('/' , {
  //   templateUrl: '/',
  //   controller: 'AuthController'
  // })


  $httpProvider.interceptors.push('AttachTokens')
})

 .factory('AttachTokens', function ($rootScope, $window) {
  //an $httpInterceptor's
  // job is to stop all out going requests
  // then look in local storage and find the user's token
  //and add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.iGrow');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route.originalPath!=="/signup" && next.$$route  && !Auth.isAuth()) {
      $location.path('/signin')
    }
  })
});

window.fbAsyncInit = function() {
  FB.init({
    appId      : '835093243291061',
    status : true,
    cookie : true,
    xfbml      : true,
    version    : 'v2.7'
  });
  };

  (function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));