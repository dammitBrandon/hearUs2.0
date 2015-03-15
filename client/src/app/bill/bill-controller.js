angular.module('bill.controllers', [
  'ui.router',
  'services.SunlightApi',
  'services.TwitterApi',
  'services.ProfileApi'
])
  .controller('billCtrl', function billController($scope, $state, $stateParams, $log, sunlightService, twitterService, profileService, bill){
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
    
    $scope.favoriteBill = function(bill) {
      $log.log('bill to favorite', bill);
        profileService.favoriteBill(bill);
    };
    
    $scope.unfavoriteBill = function(bill) {
      $log.log('bill to unfavortie', bill);
      profileService.unfavoriteBill(bill);
    };

    $scope.isBillFavorited = function(bill_id) {
      $log.log('checking to see if favorited');
      return profileService.isFavorited(bill_id);
    };
    
    initBillPage();
    
  });