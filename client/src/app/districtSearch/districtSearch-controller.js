angular.module('districtSearch.controllers', [
  'ui.router',
  'services.SunlightApi'
]).
  controller('districtSearchCtrl', function districtSearchController($scope, $state, $stateParams, $log, SunlightService) {
    $scope.zipCode = $stateParams.zipCode;
    
    function findDistrict() {
      SunlightService.getDistrict($scope.zipCode);
      $log.log('districtSearchCtrl#findDistrict: ', $scope.zipCode);
    }
    
    findDistrict();
  });