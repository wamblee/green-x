angular.module('iGrow.storeinfo', [])
.controller('storeinfoController', function ($window, $scope, $location, Plants) {
 	$scope.data = {}
// 	Plants. getStores()
// 	.then(function(resp){
// 		console.log("show all stores",resp);
// 		$scope.data.stores=resp;
// 	})
$scope.store= $location.path().split('/');
	console.log($scope.store);
 Plants.getStoreInfo($scope.store[1])
      .then(function (plants){
        console.log(plants,"data for specific store");
        $scope.data.plants=plants;

      })
      .catch(function (error){
        console.log(error);

      })




	
});