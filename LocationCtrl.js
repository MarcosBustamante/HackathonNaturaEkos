angular.module('myApp', []);

angular.module('myApp').config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

angular.module('myApp').controller('LocationCtrl', function($scope){
  $scope.myPosition = null;
  
	navigator.geolocation.getCurrentPosition(
    function(pos) {
  	  var crd = pos.coords;
  	  $scope.myPosition = {'lat': crd.latitude, 'lng': crd.longitude};
  	},
  	function(err) {
  	  $scope.myPosition = null;
  	}
  )
});
