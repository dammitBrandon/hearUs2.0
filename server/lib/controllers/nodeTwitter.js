'use strict';

var fs = require('fs'),
  Twitter = require('node-twitter'),
  config = require('../config/config'),
  util = require('util'),
  request = require('request'),
  Crypto = require('crypto');

Twitter.SearchClient.prototype.next = function(parameters, callback)
{

  var self = this;

  var requestUrlString = this._apiBaseUrlString + '/';
  if (this._apiVersion !== null)
  {
    requestUrlString += this._apiVersion + '/';
  }
  requestUrlString += 'search/tweets.json';

  if (parameters !== undefined && parameters !== null && parameters.length > 0)
  {
    requestUrlString = requestUrlString + parameters;
  }

  var requestOptions = {method: 'GET', url: requestUrlString, oauth: this.oauth()};

  var httpRequest = request.get(requestOptions);
  httpRequest.hash = Crypto.createHash('sha1').update(JSON.stringify(httpRequest.headers), 'utf8').digest('hex');
  this._connections[httpRequest.hash] = {callback: callback, data: '', httpRequest: httpRequest};


  this._createEventListenersForRequest(httpRequest);

};

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

var count = 0;
function responseCallback(error, results) {
  if (error) {
    console.error('error ', error);
  } else if (results) {
    if(results.search_metadata.next_results && count <= 3) {
      twit.next(results.search_metadata.next_results, responseCallback);
      count++;
    }
  }
}

twit.search({'q': 'guns', 'count': 10, 'result_type': 'recent'}, responseCallback);

exports.searchForBill = function (req, res, next) {
  var searchQueryParams = req.query.searchQuery;

  var filename = 'twitterSearchResultsForHr234.json';
  var data = loadJsonFile(filename);
  res.send(data);

};