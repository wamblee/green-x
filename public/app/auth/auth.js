angular.module('iGrow.auth', [])
//Auth controller responsible for client side authentication
// in signup/signin forms using injected Auth service
.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (resp) {
        //Attach tokens and username to local Storage for use elsewhere
        $window.localStorage.setItem('com.iGrow', resp.token);
        $window.localStorage.setItem('com.username', resp.user);
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  $scope.islog=function(){
    console.log("islog")
  };
  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (resp) {
        //Attach tokens and username to local Storage for use elsewhere
        $window.localStorage.setItem('com.iGrow', resp.token);
        $window.localStorage.setItem('com.username', resp.user);
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
