angular.module('districtSearch.controllers', [
  'ui.router',
  'services.SunlightApi'
]).
  controller('districtSearchCtrl', function districtSearchController($scope, $rootScope, $state, $stateParams, $log, SunlightService) {
    $scope.zipCode = '';
    $scope.coords = {};

    function initDistrictSearch() {
      $log.log('inside district search');
//      $log.log('district ', district);
      if (angular.isDefined($state.params.zipCode)) {
        $scope.zipCode = $state.params.zipCode;
        $log.log('get district by zip code');
        getDistrictByZipCode($scope.params.zipCode);
      } else if (angular.isDefined($state.params.lat) && angular.isDefined($state.params.long)) {
        $scope.coords = {
          lat: $state.params.lat,
          long: $state.params.long
        };
        $log.log('get district by coords');
//        getDistrictByLatLong($scope.coords);
      }
    }

    var getDistrictByZipCode = function (zipCode) {
      SunlightService.getDistrictByZipCode(zipCode).then(function (district) {

        if (district.results.length > 1) {
//          TODO: if there are more than one districts then we must get more info from the user to 
//          get the correct district info
          $log.log('modal pops up to get more info from user');
        } else {
          $log.log('district ', district);
          getCongressmen($scope.district);
        }
      });
    };

    var getDistrictByLatLong = function (coords) {
      SunlightService.getDistrictByCoords(coords).then(function (district) {
        if (district.results.length > 1) {
          //          TODO: if there are more than one districts then we must get more info from the user to 
//          get the correct district info
          $log.log('modal pops up to get more info from user');
        } else {
          $scope.district = {
            state: district.results[0].state,
            number: district.results[0].district
          };
          $log.log('district search controller ', $scope.district);
          getCongressmen($scope.district);
        }
      });
    };

    var getCongressmen = function (district) {
      SunlightService.getCongressmen(district).then(function (members) {
        console.log(members);
        $scope.members = members;
      });
    };
    initDistrictSearch();

  });