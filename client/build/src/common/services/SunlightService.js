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

    function getSenators() {
      var deferred = $q.defer();
      var url = baseUrl + 'senators';
      
      $http({
        method: 'Get',
        url: url
      })
        .success(function (data, status, headers, config) {
          $log.debug('successful getting data ', data);
        })
        .error(function(err, status, headers, config) {
          $log.debug('failed to get data', err);
          deferred.reject(err);
        });
    }
    
    function getReps() {
      var deferred = $q.defer();
      var url = baseUrl + 'representatives';
      
      $http({
        method: 'Get',
        url: url
      })
        .sucess(function (data, status, headers, config) {
          $log.debug('successufl getting data', data);
        })
        .error(function (err, status, headers, config) {
          $log.debug('failed to get data', err);
          deferred.reject(err);
        });
    }
    
    return {
      getIssues: getIssues,
      getDistrict: getDistrict,
      getSenators: getSenators,
      getReps: getReps
    };
  });