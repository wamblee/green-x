angular.module('iGrow.stores',[])
.controller('storeController' , function($scope, Auth, $window){
	 $scope.map;
     $window.initMap = function() {
        $scope.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8,
          mapTypeId:  google.maps.MapTypeId.ROADMAP
        });
      }
      initMap();

})



