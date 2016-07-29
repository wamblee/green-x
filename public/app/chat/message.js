angular.module('iGrow.What', [])
.controller('socketController',function ($window, $location, $scope, Plants, socket) {

	$scope.msgs = [];
	
	$scope.sendMsg = function(){
		socket.emit('send msg' , $scope.msg.text)
		$scope.msg.text = "";
	}

	socket.on('get msg' , function(data){
		$scope.msgs.push(data);
		$scope.$digest();
	})
	console.log($window.localStorage.getItem('com.username'));
});