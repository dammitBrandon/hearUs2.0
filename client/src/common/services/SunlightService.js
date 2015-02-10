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

      return deferred.promise;
    }
    
    function getBill(billId) {
      console.log('bill id ', billId);
      var deferred = $q.defer();
      var url = baseUrl + 'bill/' + billId;
      
      $http({
        method: 'GET',
        url: url
      })
        .success(function(data, status, headers, config) {
          $log.debug('successful getting data', data);
          deferred.resolve(data);
        })
        .error(function(err, status, headers, config) {
          $log.debug('failed to get data', err);
          deferred.reject(err);
        });
      
      return deferred.promise;
    }
    
    function billsSponsoredByCongressman(congressmanId) {
      var deferred = $q.defer();
      var url = baseUrl + 'congressman/bills/' + congressmanId;
      
      $http({
        method: 'Get',
        url: url
      })
        .success(function(data, status, headers, config){
//          $log.debug('success getting bills for ' + congressmanId + ': ', data);
          deferred.resolve(data);
        })
        .error(function(err, status, headers, config){
          $log.debug('failure getting bills for ' + congressmanId + ': ', err);
          deferred.reject(err);
        });
      
      return deferred.promise;
    }
    
    function getDistrictByZipCode(zipCode) {
      var deferred = $q.defer();
      var url = baseUrl + 'district/' + zipCode;
      
      $http({
        method: 'Get',
        url: url
      })
        .success(function (data, status, headers, config) {
          $log.debug('successful getting data back: ', data);
          deferred.resolve(data);
        })
        .error(function(err, status, headers, config) {
          $log.debug('failed to get data, ', err);
          deferred.reject(err);
        });
      
      return deferred.promise;
    }

    function getDistrictByCoords(coords) {
      var deferred = $q.defer();
      var url = baseUrl + 'district/lat/' + coords.lat + '/long/' + coords.long;
      
      $http({
        method: 'Get',
        url: url
      })
        .success(function(data, status, headers, config) {
//          $log.debug('successful getting data back: ', data);
          deferred.resolve(data);
        })
        .error(function(err, status, headers, config){
          $log.debug('failed to get data, ', err);
          deferred.reject(err);
        });
      
      return deferred.promise;
    }
    
    function getCongressmenByDistrict(districtObj) {
      var deferred = $q.defer();
      var url = baseUrl + 'district/congressmen/state/' + districtObj.state + '/district/' + districtObj.districtNumber;
      $log.log('dis obj ', districtObj);
      $log.log('url ', url);
      $http({
        method: 'Get',
        url: url
      })
        .success(function (data, status, headers, config) {
//          $log.debug('successful getting data ', data);
          deferred.resolve(data);
        })
        .error(function(err, status, headers, config) {
          $log.debug('failed to get data', err);
          deferred.reject(err);
        });
      
      return deferred.promise;
    }
    
    function getCongressmanById(id) {
      var deferred = $q.defer();
      var url = baseUrl + 'congressman/' + id;

      $http({
        method: 'GET',
        url: url
      })
        .success(function (data, status, headers, config) {
//          $log.debug('successful getting data ', data);
          deferred.resolve(data);
        })
        .error(function (err, status, headers, config) {
          $log.debug('failed to get data', err);
          deferred.reject(err);
        });
      return deferred.promise;
    }
    
    function getSenators() {
      var deferred = $q.defer();
      var url = baseUrl + 'senators';
      
      $http({
        method: 'Get',
        url: url
      })
        .success(function (data, status, headers, config) {
//          $log.debug('successful getting data ', data);
          deferred.resolve(data);
        })
        .error(function(err, status, headers, config) {
          $log.debug('failed to get data', err);
          deferred.reject(err);
        });

      return deferred.promise;
    }
    
    function getReps() {
      var deferred = $q.defer();
      var url = baseUrl + 'representatives';
      
      $http({
        method: 'Get',
        url: url
      })
        .sucess(function (data, status, headers, config) {
//          $log.debug('successufl getting data', data);
        })
        .error(function (err, status, headers, config) {
          $log.debug('failed to get data', err);
          deferred.reject(err);
        });

      return deferred.promise;
    }
    
    return {
      getIssues: getIssues,
      getBill: getBill,
      billsSponsoredByCongressman: billsSponsoredByCongressman,
      getDistrictByZipCode: getDistrictByZipCode,
      getDistrictByCoords: getDistrictByCoords,
      getCongressmenByDistrict: getCongressmenByDistrict,
      getCongressmanById: getCongressmanById,
      getSenators: getSenators,
      getReps: getReps
    };
  });