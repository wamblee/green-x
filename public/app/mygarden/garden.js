angular.module('iGrow.mygarden', [])
.controller('GardenController', function ($window, $location, $scope, Plants) {
	$scope.data = {}
	Plants.getGarden()
	.then(function(resp){
		$scope.data.plants=resp;
		window.user=$window.localStorage['com.username'];
		///console.log($window.localStorage['com.username'])
	})

	Plants.getAllComment()
	.then(function (resp) {
		$scope.data.comment=resp;
		$location.path('/mygarden')
	})

	$scope.addComment=function (comment) {
		Plants.addNewComment($window.localStorage['com.username'])
		$window.localStorage.setItem('com.comment', resp.comment);
	}

	$scope.removePlant = function(id){
		Plants.removePlant(id)
		.then(function(resp){
			//After plant is added to user's garden, show user's garden
			$scope.data.plants=resp.data
			$location.path('/mygarden')
		})
	}
});