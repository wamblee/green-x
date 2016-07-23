angular.module('iGrow.browse', [])
.controller('BrowseController', function ($window, $scope, $location, Plants) {
	$scope.data = {}
	Plants.getAll()
	.then(function(resp){
		console.log($window.localStorage["com.iGrow"])
		console.log($window.localStorage["com.username"])
		$scope.data.plants=resp;
	})
	$scope.addTree = function (id){
		Plants.AddPlant(id)
		.then(function(resp){
			$location.path('/mygarden')
			console.log(resp.data)

		})
	}
	// $scope.data.plants = [
	// {img: 'https://vienna-wv.com/images/tree.jpg', id:1, name:"Orcidia"},
	// {img: 'https://vienna-wv.com/images/tree.jpg', id:2, name:"Wisteria"},
	// {img: 'https://vienna-wv.com/images/tree.jpg', id:3, name:"Maple"},
	// {img: 'https://vienna-wv.com/images/tree.jpg', id:4, name:"a"},
	// {img: 'https://vienna-wv.com/images/tree.jpg', id:5, name:"v"},
	// {img: 'https://vienna-wv.com/images/tree.jpg', id:6, name:"x"},
	// {img: 'https://vienna-wv.com/images/tree.jpg', id:7, name:"h"},
	// {img: 'https://vienna-wv.com/images/tree.jpg', id:8, name:"y"},
	// {img: 'https://vienna-wv.com/images/tree.jpg', id:9, name:"l"}

	// ];
});