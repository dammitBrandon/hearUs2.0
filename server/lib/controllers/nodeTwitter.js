'use strict';

var fs = require('fs'),
  _ = require('lodash'),
  Twitter = require('node-twitter'),
  config = require('../config/config'),
  util = require('util');

var twit = new Twitter.SearchClient(
  config.twitter.consumerKey,
  config.twitter.consumerSecret,
  config.twitter.accessToken,
  config.twitter.accessTokenSecret
);

/**
 * load json data
 */
var loadJsonFile = function (filename) {
  var jsonData = require('../../testData/' + filename);
  return jsonData;
};

//twit.search({'q': 'hr234', 'count': 100, 'result_type': 'recent'}, function(error, results) {
//  if (error) {
//    console.log('error ', error);
//  } else if (results) {
//    console.log('results ', results);
//  }
//});

exports.searchForBill = function (req, res, next) {
  var searchQueryParams = req.query.searchQuery;
//  twit.search({'q': 'guns'}, function(error, data) {
//    
//    if(!_.isUndefined(other.search_metadata.next_results)) {
//      console.log('get additional tweets');
//    }
//  });
  
  var filename = 'twitterSearchResultsForGuns.json';
  var data = loadJsonFile(filename);
  res.send(data);
  
};