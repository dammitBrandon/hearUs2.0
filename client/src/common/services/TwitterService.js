'use strict';

angular.module('services.TwitterApi', [
  'ui.router'
])
.factory('TwitterService', function ($q, $http, $log) {
    var baseUrl = '/api/twitter/';
    
    function searchTweets(billSearchParams) {
      var deferred = $q.defer();
      var url = baseUrl + '/search/bill';
      
      $http({
        method: 'GET',
        url: url,
        params: {q: billSearchParams}
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
      searchTweets: searchTweets
    };
  });