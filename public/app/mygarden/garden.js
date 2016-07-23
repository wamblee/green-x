angular.module('iGrow.mygarden', [])
.controller('GardenController', function ($window, $scope, Plants) {
	$scope.data = {}
	Plants.getGarden()
	.then(function(resp){
		console.log(resp)
		$scope.data.plants=resp;
	})
	// $scope.addTree = function (id){
	// 	Plants.(id)
	// 	.then(function(resp){
	// 		console.log(resp)
	// 	})
	// }
	
});