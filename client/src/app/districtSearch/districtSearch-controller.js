angular.module('districtSearch.controllers', [
  'ui.router',
  'services.SunlightApi'
]).
  controller('districtSearchCtrl', function districtSearchController($scope, $rootScope, $state, $stateParams, $log, SunlightService, district) {
    
    function initDistrictSearch() {
      if(_.isUndefined(district.count)) {
        $scope.district = district[0];
        $scope.senators = [];

        _.forEach(district[1], function(congressman) {
          if(congressman.chamber === 'senate') {
            $scope.senators.push(congressman);
          } else if (congressman.chamber === 'house') {
            $scope.houseRep = congressman;
          }
        });
        
      } else if (district.count < 1){
        $log.log('find out what district they are in', district);
        
      }
    }
    
    initDistrictSearch();
    
    $scope.test = function () {
      $log.log('test ');
    };
  });