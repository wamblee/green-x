angular.module('iGrow.mygarden', [])
.controller('GardenController', function ($window, $location, $scope, Plants) {
	$scope.data = {}
	Plants.getGarden()
	.then(function(resp){
		$scope.data.plants=resp;
		window.user=$window.localStorage['com.username'];
		$scope.username=$window.localStorage['com.username'];
		
	})

	$scope.addComment=function ( comment) {
		Plants.addNewComment(comment,$scope.username,function (data) {	
			Plants.getAllComment()
			.then(function (resp) {
				$scope.data.comment=resp;
				console.log(resp,"from serverrrrrrrrrrrrrrrrrrrrrrrrrrr")
				$location.path('/mygarden')
			})
		})	
	}
	
	Plants.getAllComment()
		.then(function (resp) {
			$scope.data.comment=resp;
			$location.path('/mygarden')
	})

	

	$scope.removePlant = function(id){
		Plants.removePlant(id)
		.then(function(resp){
			$scope.data.plants=resp.data
			$location.path('/mygarden')
		})
	}
});