angular.module('districtSearch.controllers', [
  'ui.router',
  'services.SunlightApi'
]).
  controller('districtSearchCtrl', function districtSearchController($scope, $rootScope, $state, $stateParams, $log, SunlightService, district) {
    
    function initDistrictSearch() {
      $scope.district = district;
      getCongressmen(district);
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

    function getCongressmen(district) {
      var congressMen = {};
      SunlightService.getCongressmen(district).then(function (congressmenData) {
        $scope.test = congressmenData;
        $log.log('test ', $scope.test);
        congressMen = {
          house: congressmenData.house[0],
          senate: congressmenData.senate
        };
        $scope.houseRep = congressMen.house;
        $scope.senate = congressMen.senate;
      });
    }
    initDistrictSearch();
    
    $scope.test = function () {
      $log.log('test ');
    };
  });