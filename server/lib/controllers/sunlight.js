'use strict';

var fs = require('fs'),
  sunlight = require('sunlight-congress-api'),
  config = require('../config/config'),
  apikey = config.apikey;

var path = './testData';

/**
 * apikey sunlight labs api key
 * init the sunlightlabs api module
 */
sunlight.init(apikey);

fs.exists(path, function (exists) {
  if (!exists) {
    fs.mkdir(path, function () {
      console.log('test data dir has been made');
    });
  }
});

var saveTestData = function (title) {
  return function (data) {
    var testFile = JSON.stringify(data, null, 4);
    fs.writeFile(path + '/' +  title + '.json', testFile, function (err) {
      if (err) {
        console.log('File failed to save, error: ', err);
      } else {
        console.log('File was successfully saved');
      }
    });
  };
};

var gunControlBills = sunlight.billsSearch();
gunControlBills.fields("official_title", "introduced_on", "last_vote_at", "popular_title", "keywords");
gunControlBills.search("\"gun control\"~5");
gunControlBills.call(saveTestData("GunControlBills"));

/**
 * load json data
 */
var loadJsonFile = function() {
  var jsonData = require('../../testData/GunControlBills.json');
  console.log('#loadJsonFile: ', jsonData);
  return jsonData;
};

/**
 *  search for a topic
 */
exports.searchIssue = function (req, res, next) {
  var searchTopic = req.params.issue;
  console.log('search topic: ', searchTopic);
  var data = loadJsonFile();
  console.log('json data: ', data);
  res.send(data);
};

/**
 *
 */
exports.searchDistrictZipCode  = function (req, res, next) {
  var zipCode = req.params.zipCodea;
  console.log('zip code search: ', zipCode);
  res.send();
};