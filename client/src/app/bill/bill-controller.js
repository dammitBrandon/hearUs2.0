angular.module('bill.controllers', [
  'ui.router',
  'services.SunlightApi',
  'services.TwitterApi'
])
  .controller('billCtrl', function billController($scope, $state, $stateParams, $log, sunlightService, bill){
    function initBillPage() {
      if (bill.cosponsors_count > 0 ) {
        getCosponsors(bill.cosponsor_ids);
      }
      $scope.bill = bill;
    }
    
    function getCosponsors(cosponsorIds) {
      sunlightService.getCosponsors(cosponsorIds).then(function(cosponsorsData) {
        $scope.cosponsors = cosponsorsData;
      });
    }

    initBillPage();
    
  });