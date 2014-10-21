'use strict';

angular.module('services.SunlightApi', [
  'ui.router'
])
  .factory('IssueService', function ($q, $http, $log) {
    function getIssues(issue) {
      var deferred = $q.defer();
      var url = '/api/sunlight/' + issue;
      
      $http({
        method: 'GET',
        url: url
      })
        .success(function (data, status, headers, config) {
        $log.debug('successful getting data', data);
        deferred.resolve(data);
      })
        .error(function(err, status, headers, config){
        $log.debug('failed to get data', err);
        deferred.reject(err);
      });
    }

    return {
      getIssues: getIssues
    };
  });