'use strict';

var fs = require('fs'),
  gm = require('googlemaps'),
  config = require('../config/config'),
  apikey = config.googleMaps.apikey,
  _ = require('lodash');

gm.config(apikey);

exports.getLocationInfoByZipCode = function (zipCode) {
  if (!_.isUndefined(zipCode)) {
    gm.geocode(zipCode, function (err, data) {
      if (err) {
        console.error('error getting addy data ', err);
      } else if(data) {
//  TODO: get formatted address and return to frontend formatted address will have the city state and zip code
      }
    });  
  }
  
};