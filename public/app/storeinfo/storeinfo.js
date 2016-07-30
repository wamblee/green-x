angular.module('iGrow.storeinfo', [])
.controller('storeinfoController', function ($window, $scope, $location, Plants) {
 	$scope.data = {}

$scope.store= $location.path().split('/');
	console.log($scope.store);
 Plants.getStoreInfo($scope.store[2])
      .then(function (plants){
        console.log(plants,"data for specific store");
        $scope.data.plants=plants;

      })
      .catch(function (error){
        console.log(error);

      })
/////// add from store to garden 
$scope.addTree = function (id){
    Plants.AddPlant(id)
    .then(function(resp){
      //After plant is added to user's garden, show user's garden
      $location.path('/mygarden')
    })
  }
});