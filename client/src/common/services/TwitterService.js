'use strict';

angular.module('services.TwitterApi', [
  'ui.router'
])
  .factory('twitterService', function ($q, $http, $log) {
    var baseUrl = '/api/twitter/';
    
    function getTweetsForBill(bill) {
      var deferred = $q.defer();
      var url = baseUrl + 'search/bill';
      
      var queryParams = [bill.bill_id.split('-')[0]];
      _.forEach([bill.popular_title, bill.short_title], function(title) {
        if (!_.isUndefined(title) && !_.isNull(title)){
          queryParams.push(title);
        }
      });

      $http({
        method: 'GET',
        url: url,
        params: {searchQuery: queryParams}
      })
        .success(function(data, status, headers, config) {
          $log.debug('successful getting tweets based on bill', data);
          deferred.resolve(data);
        })
        .error(function(err, status, headers, config) {
          $log.error('failed to get tweets based on bill');
          deferred.reject(err);
        });

      return deferred.promise;
    }

    return {
      getTweetsForBill: getTweetsForBill
    };
  });