'use strict';

angular.module('services.SunlightApi', [
  'ui.router'
])
  .factory('SunlightService', function ($q, $http, $log) {
    var baseUrl = '/api/sunlight/';
    
    function getIssues(issue) {
      var deferred = $q.defer();
      var url = baseUrl + 'topic/' + issue;
      
      $http({
        method: 'GET',
        url: url
      })
        .success(function (data, status, headers, config) {
        $log.debug('successful getting data', data);
        deferred.resolve(data);
      })
        .error(function(err, status, headers, config) {
        $log.debug('failed to get data', err);
        deferred.reject(err);
      });
    }
    
    function getDistrict(zipCode) {
      var deferred = $q.defer();
      var url = baseUrl + 'district/' + zipCode;
      $log.log('the url: ', url);
      
      $http({
        method: 'Get',
        url: url
      })
        .success(function (data, status, headers, config) {
          $log.debug('successful getting data ', data);
          deferred.resolve(data);
        })
        .error(function(err, status, headers, config) {
          $log.debug('failed to get data, ', err);
          deferred.reject(err);
        });
    }

    return {
      getIssues: getIssues,
      getDistrict: getDistrict
    };
  });