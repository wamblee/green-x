angular.module('iGrow.What', [])
.controller('socketController',function ($window, $location, $scope, Plants, socket) {

	$scope.msgs = [];
	$scope.users={};
	$scope.testing = '';
	$scope.msg = {};
	socket.on('get msg' , function(data){
		console.log('Came here');
		console.log(data);
		$scope.msgs.push(data);
		$scope.$digest();
	});

	if($window.localStorage.getItem('user') === 'store'){
		socket.emit('login' , {user : 'store' , name : $window.localStorage.getItem('com.storename')})
		$scope.msg.username = $window.localStorage.getItem('com.storename');
	} else {
		$scope.msg.username = $window.localStorage.getItem('com.username');	
		socket.emit('login' , {user : 'customer', name : $window.localStorage.getItem('com.username')})
		console.log('Done this');
	}
	socket.on('users' , function(data){
		$scope.users = data;
		$scope.$digest();
		console.log($scope.users);
	})	
	$scope.sendMsg = function(){
		socket.emit('send msg' , $scope.msg)
		$scope.msg.text = "";
	}


	socket.on('user left' , function(data){
		console.log('1 Left');
		console.log(data);
		$scope.users = data.users ;
		$scope.message = data.string;
		$scope.$digest();
	});

	$scope.test = function(event){
   	  Plants.selectStore(event)
      .then(function (data){
      	console.log(data,"my dataaaaaaaaaaaaaaaa")
        $location.path('/'+event);

      })
      .catch(function (error){
        console.log(error);
      })
	};
	
});