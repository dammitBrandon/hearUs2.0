angular.module('bill.controllers', [
  'ui.router',
  'services.SunlightApi',
  'services.TwitterApi'
])
  .controller('billCtrl', function billController($scope, $state, $stateParams, $log, sunlightService, twitterService, bill){
    function initBillPage() {
      if (bill.cosponsors_count > 0 ) {
        getCosponsors(bill.cosponsor_ids);
      }
      
      $scope.bill = bill;
      
      twitterService.getTweetsForBill($scope.bill).then(function(tweets) {
        $scope.tweetCollection = tweets;
        $log.log('tweets ', tweets);
      });
    }
    
    function getCosponsors(cosponsorIds) {
      sunlightService.getCosponsors(cosponsorIds).then(function(cosponsorsData) {
        $scope.cosponsors = cosponsorsData;
      });
    }

    initBillPage();
    
  });