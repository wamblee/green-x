angular.module('iGrow.storesmap',[])
.controller('storeController' , function($scope, Auth, $window){
	 $scope.map;
     $window.initMap = function() {
        $scope.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8,
          mapTypeId:  google.maps.MapTypeId.ROADMAP
        });

         var infoWindow = new google.maps.InfoWindow({map: $scope.map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            
            console.log(pos);

            var info = 'Store Name :' + 'masthal' + '<br>'+ 'Number : ' + '09234\n'

            infoWindow.setPosition(pos);
            infoWindow.setContent(info);
            $scope.map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, $scope.map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, $scope.map.getCenter());
        }

     }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }

      initMap();
});