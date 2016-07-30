angular.module('iGrow.gardeninfo', [])
.controller('gardeninfoController', function ($window, $scope, $location, Plants) {
 	$scope.data = {}
   $scope.friend=" ";
$scope.username= $location.path().split('/');
	//console.log($scope.username);
 Plants.getGardenInfo($scope.username[2])
      .then(function (plants){
        console.log(plants,"data for specific garden");
        $scope.data.plants=plants;

      })
      .catch(function (error){
        console.log(error);

      })
      $scope.addComment=function (comment) {
    Plants.addNewComment(comment,$scope.username[2])
    .then (function () { 
    
      Plants.getAllComment($scope.username[2])
      .then(function (resp) {
        console.log(resp);
        $scope.data.comment=resp.comments;
        $scope.friend=resp.friendName
        // $location.path('/mygarden')
      })

    })  

  }
  Plants.getAllComment($scope.username[2])
    .then(function (resp) {
      console.log(resp)
      $scope.data.comment=resp.comments;
      $scope.friend=resp.friendName
     // $location.path('/mygarden')
  })

});