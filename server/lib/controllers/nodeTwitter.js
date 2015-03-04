'use strict';

var fs = require('fs'),
  Promise = require('es6-promise').Promise,
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

//function responseCallback(error, results) {
//  var deferred = defer();
//  var response;
//  
//  
//  if (error) {
//    console.error('error ', error);
//    deferred.reject(error);  
//  } else if (results) {
////    response += results;
//    deferred.resolve(results);
////    do {
////      twit.next(results.search_metadata.next_results, responseCallback);
////      count++;
////    } while (results.search_metadata.next_results && count <= 3);
//  }
//  console.log(response);
//  return deferred.promise;
//}

//twit.search({'q': 'guns', 'count': 10, 'result_type': 'recent'}, responseCallback);

function search(query) {
  var deferred = defer();
  twit.search({'q': query.join(' OR '), 'count': 10, 'result_type': 'recent'}, function(error, results) {
    if (error) {
      console.error('error ', error);
      deferred.reject(error);
    } else if (results) {
      deferred.resolve(results);
    }
  });
  
  return deferred.promise;
}

exports.searchForBill = function (req, res, next) {
  var searchQueryParams = req.query.searchQuery;
  search(searchQueryParams).then(function(data){
    console.log('data returned', data);
    res.send(data);
  });
  
//  var filename = 'twitterSearchResultsForHr234.json';
//  var data = loadJsonFile(filename);
//  res.send(data);
};

var defer = function () {
  var resolve, reject;
  var promise = new Promise(function() {
    resolve = arguments[0];
    reject = arguments[1];
  });
  return {
    resolve: resolve,
    reject: reject,
    promise: promise
  };
};

