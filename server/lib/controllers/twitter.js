'use strict';

var fs = require('fs'),
  Twitter = require('twitter-js-client').Twitter,
  config = require('../config/config');



var twitter = new Twitter(config.twitter);

var error = function (err, res, body) {
  console.log('error ', err);
};

var success = function (data) {
  console.log('success data ', data);
};

twitter.getUserTimeline({ screen_name: 'nathanjustice7', count: '10'}, error, success);