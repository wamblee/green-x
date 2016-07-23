angular.module('iGrow.mygarden', [])
.controller('GardenController', function ($window, $location, $scope, Plants) {
	$scope.data = {}
	Plants.getGarden()
	.then(function(resp){
		$scope.data.plants=resp;
	})
	$scope.removePlant = function(id){
		Plants.removePlant(id)
		.then(function(resp){
			//After plant is added to user's garden, show user's garden
			$scope.data.plants=resp.data
			$location.path('/mygarden')
		})
	}
});