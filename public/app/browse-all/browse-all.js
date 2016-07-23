angular.module('iGrow.browse', [])
.controller('BrowseController', function ($window, $scope, $location, Plants) {
	$scope.data = {}
	Plants.getAll()
	.then(function(resp){
		$scope.data.plants=resp;
	})
	//Add plant function
	$scope.addTree = function (id){
		Plants.AddPlant(id)
		.then(function(resp){
			//After plant is added to user's garden, show user's garden
			$location.path('/mygarden')
		})
	}
});