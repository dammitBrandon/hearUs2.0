'use strict';

angular.module('services.ProfileApi', [
  'ui.router'
])
.factory('ProfileService', function($q, $http, $log) {
    var baseUrl = 'api/session';
    
    function signup(userObj) {
      var deferred = $q.defer();
      var url = baseUrl + 'sign-up';
      
      $http({
        method: 'POST',
        url: url
      })
        .success(function(data, status, headers, config) {
          $log.log('successful signing up in user', data);
          deferred.resolve(data);
        })
        .error(function(err, status, headers, config) {
          $log.error('failed to sign up user', err);
          deferred.reject(err);
        });
      
      return deferred.promise;
    }
    
    return {
      signup: signup
    };
  });