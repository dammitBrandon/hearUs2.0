'use strict';

var fs = require('fs'),
  Twitter = require('node-twitter'),
  config = require('../config/config'),
  util = require('util');

var twit = new Twitter.SearchClient(
  config.twitter.consumerKey,
  config.twitter.consumerSecret,
  config.twitter.accessToken,
  config.twitter.accessTokenSecret
);


twit.search({'q': 'hr234', 'count': 100, 'result_type': 'recent'}, function(error, results) {
  if (error) {
    console.log('error ', error);
  } else if (results) {
    console.log('results ', results);
  }
});

exports.searchForBill = function (req, res, next) {
  console.log('req ', req);
};