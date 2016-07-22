angular.module('iGrow.browse', [])
.controller('BrowseController', function ($scope, Plants) {
	$scope.data = {}
	$scope.data.plants = [
	{img: 'https://vienna-wv.com/images/tree.jpg', id:1, name:"Orcidia"},
	{img: 'https://vienna-wv.com/images/tree.jpg', id:2, name:"Wisteria"},
	{img: 'https://vienna-wv.com/images/tree.jpg', id:3, name:"Maple"}
	];
});