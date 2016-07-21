angular.module('iGrow.newplant', [])

.controller('plantsController', function ($scope, Plants) {

  $scope.data = {};

  var initializePlants = function () {
    Plants.createplant()
      .then(function (plants) {
        $scope.data.plants = plants;
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  initializeLinks();
  });
