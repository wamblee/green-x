angular.module('iGrow.browse', [])
.controller('BrowseController', function ($window, $scope, $location, Plants) {
	$scope.data = {}
	///plants.getAllUsers
	Plants.getAllUsers()
	.then(function(resp){
		//console.log("show users in database",resp);
		$scope.data.plants=resp;
	})
	//Add plant function
	$scope.addFriend = function (id){
		console.log(id)
		Plants.addFriend(id)
		.then(function(resp){
			console.log(resp);
			//After plant is added to user's garden, show user's garden
			//$location.path('/mygarden');
			Plants.getFriends()
			.then(function(resp){
		console.log(resp)
		$scope.data.friends=resp;
	});
		})
	}
});