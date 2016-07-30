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
		Plants.addNewComment(comment,$scope.username)
		.then(function () {
			Plants.getAllComment()
			.then(function (resp) {
				$scope.data.comment=resp;
				$location.path('/mygarden');
			})
		})		
		$scope.gotoBottom();		
	}
	
	Plants.getAllComment()
		.then(function (resp) {
			$scope.data.comment=resp;
			console.log(resp)
			$location.path('/mygarden')
	})


	$scope.editTheDescription = function(description){
		Plants.editDescription(description)
		.then(function(resp){
			$scope.data.description=resp
			
			$location.path('/mygarden')
		})
	}

	$scope.removePlant = function(id){
		Plants.removePlant(id)
		.then(function(resp){
			$scope.data.plants=resp.data
			$location.path('/mygarden')
		})
	}

	 $scope.gotoBottom = function() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('bottom');
      console.log("going down !!!!")
      // call $anchorScroll()
      $anchorScroll();
    }



});