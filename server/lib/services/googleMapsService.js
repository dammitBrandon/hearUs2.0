'use strict';

var fs = require('fs'),
  Promise = require("es6-promise").Promise,
  gm = require('googlemaps'),
  config = require('../config/config'),
  apikey = config.googleMaps.apikey,
  _ = require('lodash');

gm.config(apikey);

exports.getLocationInfoByZipCode = function (zipCode) {

  var deferred = defer();
  var address = '';

  if (!_.isUndefined(zipCode)) {
    gm.geocode(zipCode, function (err, data) {
      if (err) {
        console.error('error getting addy data ', err);
        deferred.reject(err);
      } else if (data) {
        address = data.results[0].formatted_address;
        deferred.resolve(address);
      }
    });
  }

  return deferred.promise;
};

exports.getCoords = function (address) {
  var deferred = defer();
  var coords = {};

  if (!_.isUndefined(address)) {
    gm.geocode(address, function (err, data) {
      if (err) {
        console.log('error getting addy data ', err);
        deferred.reject(err);
      } else if (data) {
        coords = {
          latitude: data.results[0].geometry.location.lat,
          longitude: data.results[0].geometry.location.lng
        };
        deferred.resolve(coords);
      }
    });
  }

  return deferred.promise;
};

var defer = function () {
  var resolve, reject;
  var promise = new Promise(function () {
    resolve = arguments[0];
    reject = arguments[1];
  });
  return {
    resolve: resolve,
    reject: reject,
    promise: promise
  };
};