angular.module('districtSearch.controllers', [
  'ui.router',
  'services.SunlightApi',
  'services.hearUsModal'
]).
  controller('districtSearchCtrl', function districtSearchController($scope, $rootScope, $state, $stateParams, $log, districtInfo, ModalService) {
    
    function initDistrictSearch() {

      if(districtInfo.count <= 1) {
        $log.log('district ', districtInfo);
        $scope.district = districtInfo.district;
        $scope.senators = [];
        _.forEach(districtInfo.congressmen, function(congressman){
          if(congressman.chamber === 'senate') {
            $scope.senators.push(congressman);
          } else if (congressman.chamber === 'house') {
            $scope.houseRep = congressman;
          }
        });
        
      } else if (districtInfo.count > 1){
        $log.log('find out what district they are in', districtInfo);
        requestAdditionalInformation();
      }
    }
    
    function requestAdditionalInformation() {
      ModalService.openModal();
    }

    initDistrictSearch();
    
    $scope.test = function () {
      $log.log('test ');
    };
  });