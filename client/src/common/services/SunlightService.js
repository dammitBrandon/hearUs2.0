'use strict';

angular.module('services.SunlightApi', [
  'ui.router'
])
  .factory('sunlightService', function ($q, $http, $log) {
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
      var deferred = $q.defer();
      var url = baseUrl + 'bill/' + billId;

      $http({
        method: 'GET',
        url: url
      })
        .success(function(data, status, headers, config) {
          $log.debug('#getBill, successful getting data', data);
          deferred.resolve(data);
        })
        .error(function(err, status, headers, config) {
          $log.debug('#getBill, failed to get data', err);
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
          $log.debug('#billsSponsoredByCongressman, success getting bills for ' + congressmanId + ': ', data);
          deferred.resolve(data);
        })
        .error(function(err, status, headers, config){
          $log.debug('#billsSponsoredByCongressman, failure getting bills for ' + congressmanId + ': ', err);
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
          $log.debug('#getDistrictByZipCode, successful getting district back by zip: ', data);
          deferred.resolve(data);
        })
        .error(function(err, status, headers, config) {
          $log.debug('#getDistrictByZipCode, failed to get data, ', err);
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
          $log.debug('#getDistrictByCoords, successful getting district back by coords: ', data);
          deferred.resolve(data);
        })
        .error(function(err, status, headers, config){
          $log.debug('#getDistrictByCoords, failed to get data, ', err);
          deferred.reject(err);
        });

      return deferred.promise;
    }
    
    function getDistrictByAddress(address) {
      var deferred = $q.defer();
      var url = baseUrl + 'district/address';
      
      $http({
        method: 'GET',
        url: url,
        params: {address: address}
      })
        .success(function(data, status, headers, config) {
          $log.debug('#getDistrictByAddress, successful getting district back by street', data);
          deferred.resolve(data);
        })
        .error(function(err, status, headers, config) {
          $log.debug('#getDistrictByAddress, failed to get district back by street');
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
          $log.debug('#getCongressmenByDistrict, successful getting data ', data);
          deferred.resolve(data);
        })
        .error(function(err, status, headers, config) {
          $log.debug('#getCongressmenByDistrict, failed to get data', err);
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
          $log.debug('#getCongressmanById, successful getting data ', data);
          deferred.resolve(data);
        })
        .error(function (err, status, headers, config) {
          $log.debug('#getCongressmanById, failed to get data', err);
          deferred.reject(err);
        });
      return deferred.promise;
    }

    function getCosponsors(ids) {
      var deferred = $q.defer();
      var url = baseUrl + 'congressmen/cosponsors';

      $http({
        method: 'GET',
        url: url,
        params: {cosponsorIds: ids}
      })
        .success(function (data, status, headers, config) {
          $log.debug('#getCosponsors, successful getting data ', data);
          deferred.resolve(data);
        })
        .error(function (err, status, headers, config) {
          $log.debug('#getCosponsors, failed to get data', err);
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
          $log.debug('#getSenators, successful getting data ', data);
          deferred.resolve(data);
        })
        .error(function(err, status, headers, config) {
          $log.debug('#getSenators, failed to get data', err);
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
          $log.debug('#getReps, successful getting data', data);
        })
        .error(function (err, status, headers, config) {
          $log.debug('#getReps, failed to get data', err);
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
      getDistrictByAddress: getDistrictByAddress, 
      getCongressmenByDistrict: getCongressmenByDistrict,
      getCongressmanById: getCongressmanById,
      getCosponsors: getCosponsors,
      getSenators: getSenators,
      getReps: getReps
    };
  });