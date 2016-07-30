angular.module('iGrow.newplant', [])

.controller('plantsController', function ($scope, $location, Plants) {

  $scope.plant = {};
// creating new plants and route to create plant page
  $scope.newPlant = function () {
    Plants.createPlant($scope.plant)
      .then(function (resp) {
        console.log(resp)
        $location.path('/plants')
      })
      .catch(function (error) {
        console.error(error);
      });
  }
})
