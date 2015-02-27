angular.module('geolocate.directives', [
  'ui.router',
  'services.SunlightApi'
])
  .directive('huGeolocate', function (sunlightService, $state, $stateParams, $rootScope, $log) {
    return {
      replace: true,
      restrict: 'E',
      scope: {},
      template: '<button id="geolocate" type="button" class="button secondary small postfix"><span class="icon-compass"></span></button>',
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