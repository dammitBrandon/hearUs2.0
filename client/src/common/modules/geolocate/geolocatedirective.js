angular.module('geolocate.directives', [
  'ui.router',
  'services.SunlightApi'
])
  .directive('huGeolocate', function (SunlightService, $state, $stateParams, $rootScope, $log) {
    return {
      replace: false,
      restrict: 'E',
      scope: {},
      template: '<button id="geolocate" type="button">Current Location</button>',
      link: function ($scope, elems, attrs) {
        elems.bind("click", function getLocation() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
              var coords = {
                lat: position.coords.latitude,
                long: position.coords.longitude
              };
              $state.go('districtSearch.coords', coords);
            });
          } else {
            alert('Geolocation is not supported by this browser or you must allow this site to access that information');
          }
        });
      }
    };
  });