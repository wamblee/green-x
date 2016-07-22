angular.module('iGrow.browse', [])
.controller('BrowseController', function ($window, $scope, Plants) {
	$scope.data = {}
	Plants.getAll()
	.then(function(resp){
		
		console.log($window.localStorage["com.iGrow"])
		$scope.data.plants=resp;
	})
	$scope.addTree = function (id){
		Plants.AddPlant(id)
		.then(function(resp){
			console.log(resp)
		})
	}
	
});