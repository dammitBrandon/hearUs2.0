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

var success = function (data) {
  return function (data) {
    var testData = JSON.stringify(data, null, 4);
    console.log("test Data: ", testData);
  };
};

var gunControlBills = sunlight.billsSearch();
gunControlBills.fields("official_title", "introduced_on", "last_vote_at", "popular_title", "keywords");
gunControlBills.search("\"gun control\"~5");
gunControlBills.call(saveTestData("GunControlBills"));

var districtBills = sunlight.districtsLocate();
districtBills.addZip("60653");
districtBills.call(saveTestData("DistrictBills"));

/**
 * load json data
 */
var loadJsonFile = function(filename) {
  var jsonData = require('../../testData/' + filename);
  return jsonData;
};

/**
 *  search for a topic
 */
exports.searchIssue = function(req, res, next) {
  var searchTopic = req.params.issue;
  var filename = 'GunControlBills.json';
  var data = loadJsonFile(filename);
  res.send(data);
};

exports.loadHouseReps = function(req, res, next){
  var reps = sunlight.legislators();
  var filename = 'Reps.json';
  reps.filter("in_office", true)
    .filter("chamber", "house")
    .fields("first_name", "middle_name", "last_name", "twitter_id", "gender", "party", "state", "district");
//    .call();
    var data = loadJsonFile(filename);
  res.send(data);
};

exports.loadSenators = function(req, res, next){
  var reps = sunlight.legislators();
  var filename = 'Senators.json';
  reps.filter("in_office", true)
    .filter("chamber", "senate")
    .fields("first_name", "middle_name", "last_name", "twitter_id", "gender", "party", "state", "district");
//    .call();
  var data = loadJsonFile(filename);
  res.send(data);
};

/**
 * search for district by zipcode
 */
exports.searchDistrictZipCode  = function (req, res, next) {
  var zipCode = req.params.zipCode;
  var filename = 'DistrictBills.json';
  
  var district = sunlight.districtsLocate();
  district.addZip(zipCode);
//  district.call();
  var data = loadJsonFile(filename);
  
  res.send(data);
};