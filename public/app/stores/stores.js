angular.module('iGrow.stores', [])
.controller('storesController', function ($window, $scope, $location, Plants) {
	$scope.data = {}
	Plants. getStores()
	.then(function(resp){
		console.log("show all stores",resp);
		$scope.data.stores=resp;
	})
	
$scope.viewStore=function (store){
 
   console.log(store);
      Plants.selectStore(store)
      .then(function (data){
      	console.log(data,"my dataaaaaaaaaaaaaaaa")
        $location.path('/2/'+store);

      })
      .catch(function (error){
        console.log(error);

      })

  }


	
});