angular.module('districtSearch.controllers', [
  'ui.router',
  'services.SunlightApi'
]).
  controller('districtSearchCtrl', function districtSearchController($scope, $rootScope, $state, $stateParams, $log, SunlightService) {
    $scope.zipCode = $stateParams.zipCode;
    var init = function () {
      $scope.zipCode = $stateParams.zipCode;
      $log.log('data!: ', $stateParams);
      findDistrictByZipCode($scope.zipCode);
    };
    
    var getDistrictByZipCode = function (zipCode) {
      SunlightService.getDistrictByZipCode(zipCode).then(function(district){
        
        if (district.results.length > 1) {
//          TODO: if there are more than one districts then we must get more info from the user to 
//          get the correct district info
          $log.log('modal pops up to get more info from user');
        } else {
         $scope.district  = district.results[0];
          getCongressmen($scope.district);
        }
      });
    };
    
    var getDistrictByLatLong = function (coords) {
      SunlightService.getDistrictByCoords(coords);
    };
    
    var getCongressmen = function (district) {
      SunlightService.getCongressmen(district).then(function(members) {
        console.log(members);
        $scope.members = members;
      });
    };
  });