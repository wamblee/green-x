angular.module('iGrow.What', [])
.controller('socketController',function ($window, $location, $scope, Plants, socket) {
	socket.on('user joined' , function(data){
	});
	socket.on('login' , function(data){
		$scope.users = data.users;
		$scope.$digest();
	})
	$scope.msg = {};
	$scope.msg.username = $window.localStorage.getItem('com.username');
	$scope.initialize=function(){
		Plants.getMessages()
		.then(function (resp) {
			console.log(resp)
				$scope.msgs=resp;
			});
		socket.emit('add user' , $window.localStorage.getItem('com.username'));
		socket.on('users' ,function(users){
			$scope.users = users;
		})
	}
	$scope.sendMsg = function(){
		console.log($scope.msg);
		socket.emit('send msg' , $scope.msg)
		$scope.msg.text = "";
	}

	socket.on('get msg' , function(data){
		$scope.msgs.push(data);
		$scope.$digest();
	})

	$scope.initialize();
	console.log($scope.msgs);
});