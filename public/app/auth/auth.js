angular.module('iGrow.auth', [])
//Auth controller responsible for client side authentication
// in signup/signin forms using injected Auth service
.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.iGrow', token);
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    console.log($scope.user)
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.iGrow', token);
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
