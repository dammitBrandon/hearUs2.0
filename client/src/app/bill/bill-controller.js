angular.module('bill.controllers', [
  'ui.router',
  'services.SunlightApi',
  'services.TwitterApi'
])
  .controller('billCtrl', function billController($scope, $state, $stateParams, $log, SunlightService, TwitterService, bill){
    function initBillPage() {
      if (bill.cosponsors_count > 0 ) {
        getCosponsors(bill.cosponsor_ids);
      }
      $scope.bill = bill;
      getTweetsForBill();
    }
    
    function getCosponsors(cosponsorIds) {
      SunlightService.getCosponsors(cosponsorIds).then(function(cosponsorsData) {
        $scope.cosponsors = cosponsorsData;
      });
    }
    
    function getTweetsForBill() {
      
      var queryParams = [bill.popular_title, bill.short_title, bill.bill_id];
      TwitterService.searchTweets(queryParams).then(function(data) {
        $scope.tweetCollection = data.statuses;  
      });
    }

    initBillPage();
    
  });