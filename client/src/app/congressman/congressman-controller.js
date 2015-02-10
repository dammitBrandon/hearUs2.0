angular.module('congressman.controllers', [
  'ui.router',
  'services.SunlightApi'
])
  .controller('congressmanCtrl', function congressmanController($scope, $state, $stateParams, $log, SunlightService, congressman) {
    function initCongressmanCtrl() {
      $log.log('init congressman', congressman);
      if (congressman) {
        $scope.congressman = congressman;
        billsSponsoredByCongressman();
      }
    }
    
    function billsSponsoredByCongressman() {
      SunlightService.billsSponsoredByCongressman(congressman.bioguide_id).then(function(bills) {
        $scope.bills = bills.results;
      });
    }
    
    initCongressmanCtrl();
  });