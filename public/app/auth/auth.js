angular.module('iGrow.auth', [])
//Auth controller responsible for client side authentication
// in signup/signin forms using injected Auth service
.controller('AuthController', function ($scope, $window, $location, Auth) {
  

  $scope.FBLogin = function(){
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        $location.path('/');
        console.log('Logged in.');
        FB.api('/me?fields=id,name,email,permissions', function(response){
          console.log(response);
          checkLoginState();
          
        })
      }
      else {
        FB.login(function(response) {
          if (response.authResponse) {
             $window.localStorage.setItem('com.username', response.name);
             checkLoginState();
             $location.path('/');
           console.log('Welcome!  Fetching your information.... ');
           FB.api('/me?fields=id,name,email,permissions', function(response) {
            console.log(response);
             console.log('Good to see you, ' + response.name + '.');
             console.log(response.email);             
           });
          } else {
           console.log('User cancelled login or did not fully authorize.');
          }
      },{scope: 'email'});
      }
    });
  };

  window.statusChangeCallback = function (response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      console.log('connected')
      // console.log(response);
      $window.localStorage.setItem('com.iGrow', response.token);
      // Logged into your app and Facebook.
      // testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.

  window.checkLoginState = function () {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
  $scope.user = {};

  $scope.signin = function () {
     console.log($scope.user.type);
    if ($scope.user.type==="user"){
    Auth.signin($scope.user)
      .then(function (resp) {
        $scope.flag = true;
        $window.localStorage.setItem('com.iGrow', resp.token);
        $window.localStorage.setItem('com.username', resp.user);

        $location.path('/');
        $window.location.reload();
      })
      .catch(function (error) {
        console.error(error);
      });
      
    }
    else {
      Auth.signinStore($scope.user)
      .then(function (resp) {
        $scope.flag = true;
        $window.localStorage.setItem('com.iGrow', resp.token);
        $window.localStorage.setItem('com.username', resp.user);

        $location.path('/');
        $window.location.reload();
      })
      .catch(function (error) {
        console.error(error);
      });

    }
  };

  $scope.signup = function () {
      console.log($scope.user.type);
    if ($scope.user.type==="user"){
    Auth.signup($scope.user)
      .then(function (resp) {
        //Attach tokens and username to local Storage for use elsewhere
        $window.localStorage.setItem('com.iGrow', resp.token);
        $window.localStorage.setItem('com.username', resp.user);
        $location.path('/');
        $window.location.reload();
      })
      .catch(function (error) {
        console.error(error);
      });
      
    }
    else {
      Auth.signupStore($scope.user)
      .then(function (resp) {
        //Attach tokens and username to local Storage for use elsewhere
        $window.localStorage.setItem('com.iGrow', resp.token);
        $window.localStorage.setItem('com.username', resp.user);
        $location.path('/');
        $window.location.reload();
      })
      .catch(function (error) {
        console.error(error);
      });
      
    }


    }
  
})
