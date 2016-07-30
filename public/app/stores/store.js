angular.module('iGrow.storesmap',[])
.controller('storeController' , function($scope, Auth, $window, Plants, $location){
	  $scope.map;
    $scope.value = true;
    console.log($scope.value);
    $scope.hideMap = function(){
      $scope.value = !$scope.value;
    }
    $scope.data = {}
    Plants. getStores()
    .then(function(resp){
      console.log("show all stores",resp);
      $scope.data.stores=resp;
    })

    $scope.viewStore=function (store){
     console.log(store);
        Plants.selectStore(store)
        .then(function (data){
          console.log(data,"my dataaaaaaaaaaaaaaaa")
          $location.path('/'+store);

        })
        .catch(function (error){
          console.log(error);

        })

    }
     var infoWindow = null;
     $window.initMap = function() {
        $scope.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8,
          mapTypeId:  google.maps.MapTypeId.ROADMAP
        });

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var obj = pos;


            console.log($scope.data);

            if($window.localStorage.getItem('user') === 'store'){
              var flag = false;
              for(var i = 0;  i <$scope.data.stores.length; i++){
                if($scope.data.stores[i].location)
                  continue;
                obj.store = $scope.data.stores[i].storename;
                flag = true;
              }
              if(flag){
                Plants.addLocation(obj).then(function(response){
                  console.log(response);
                  $window.location.reload();
                })
              }
            }
            var image = 'https://cdn3.iconfinder.com/data/icons/trees-volume-1/72/33-128.png';
            var markersArray = [];
            for(var i = 0 ; i < $scope.data.stores.length; i++){
              if($scope.data.stores[i].location){
                var marker = new google.maps.Marker({
                  position: $scope.data.stores[i].location,
                  html : 'Store Name : <b>' + $scope.data.stores[i].storename + '</b><ul><li>Please Call 0' + $scope.data.stores[i].number + ' ' + 'For more info </li><li>For a Quick Visit Click on our Store at the bottom</li></ul>' ,
                  map: $scope.map,
                  icon : image,
                  title: $scope.data.stores[i].storename
                });
                markersArray.push(marker);
              } 
            }
            

            function rad(x) {return x*Math.PI/180;}
            function find_closest_marker( event ) {
                var lat = event.latLng.lat();
                var lng = event.latLng.lng();
                var R = 500; // radius of earth in km
                var distances = [];
                var closest = -1;
                for( i=0;i<markersArray.length; i++ ) {
                    var mlat = markersArray[i].position.lat();
                    var mlng = markersArray[i].position.lng();
                    var dLat  = rad(mlat - lat);
                    var dLong = rad(mlng - lng);
                    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                        Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                    var d = R * c;
                    distances[i] = d;
                    if ( closest == -1 || d < distances[closest] ) {
                        closest = i;
                    }
                }


                // alert(markersArray[closest].title);
                swal({
                  title : 'Gotcha' ,
                  text : '<b style="color:blue">' + markersArray[closest].title + '</b> <br><p>Is the closest Place to You '+ $window.localStorage.getItem('com.username')+ '</p>',
                  html : true
                });
            }




            infoWindow = new google.maps.InfoWindow({
              content : 'holding ...'
            })

            for(var i = 0; i< markersArray.length; i++){
              var marker = markersArray[i];
              google.maps.event.addListener(marker , 'click', function(){
                infoWindow.setContent(this.html);
                infoWindow.open($scope.map,this);
              })
            }

             var marker = new google.maps.Marker({
              position: pos,
              map: $scope.map,
              draggable : true,
              title: 'Mee'
            });

            function AutoCenter() {
              //  Create a new viewpoint bound
              var bounds = new google.maps.LatLngBounds();
              //  Go through each...
              $.each(markersArray, function (index, marker) {
               bounds.extend(marker.position);
              });
              //  Fit these bounds to the map
              $scope.map.fitBounds(bounds);
            }

            AutoCenter();

            if($window.localStorage.getItem('user') === 'customer'){
              google.maps.event.addListener($scope.map, 'click', find_closest_marker);
            } 
              var info = 'You are here' + '<br>' + ' ' + $window.localStorage.getItem('com.username');
            var infoWindow = new google.maps.InfoWindow({map: $scope.map});
            infoWindow.setPosition(pos);
            infoWindow.setContent(info);
            $scope.map.setCenter(pos);
            $scope.map.setZoom(17)
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