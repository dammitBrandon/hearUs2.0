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
      getTweetsForBill($scope.bill);
    }
    
    function getCosponsors(cosponsorIds) {
      sunlightService.getCosponsors(cosponsorIds).then(function(cosponsorsData) {
        $scope.cosponsors = cosponsorsData;
      });
    }
    
    function getTweetsForBill(bill) {
      var queryParams = [bill.bill_id.split('-')[0]];
      _.forEach([bill.popular_title, bill.short_title], function(title) {
        if (!_.isUndefined(title) && !_.isNull(title)){
          queryParams.push(title);
        }
      });
      twitterService.searchForTweets(queryParams).then(function(tweets) {
        $scope.tweetCollection = tweets;
        $log.log('tweets ', tweets);
      });
    }

    initBillPage();
    
  });