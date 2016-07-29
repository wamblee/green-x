angular.module('iGrow.friends', [])
.controller('friendController', function ($window, $scope, $location, Plants) {
$scope.data = {}
	///plants.getAllUsers
	Plants.getFriends()
			.then(function(resp){
		//console.log(resp)
		$scope.data.friends=resp;
	});

	Plants.getAllUsers()
	.then(function(resp){
		//console.log("show users in database",resp);
		$scope.data.plants=resp;
	})
	//Add plant function
	$scope.addFriend = function (id){
		//console.log(id)
		Plants.addFriend(id)
		.then(function(resp){
		//	console.log(resp);
			//After plant is added to user's garden, show user's garden
			//$location.path('/mygarden');
			Plants.getFriends()
			.then(function(resp){
		//console.log(resp)
		$scope.data.friends=resp;
	});
		})
	}
	$scope.getFriendGarden=function(id){
		Plants.getFriendGarden(id)
		.then(function(resp){
			console.log(resp)
			
		Plants.getGarden()
		.then(function(resp){
			$scope.data.gardens=resp;
			$location.path('/mygarden')
		})
	})
}});