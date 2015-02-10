'use strict';

var fs = require('fs'),
  sunlight = require('sunlight-congress-api'),
  config = require('../config/config'),
  apikey = config.apikey,
  mongoose = require('mongoose'),
  _ = require('lodash'),
  Congressman = mongoose.model('Congressman');

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
    fs.writeFile(path + '/' + title + '.json', testFile, function (err) {
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
  };
};

var gunControlBills = sunlight.billsSearch();
gunControlBills.fields("official_title", "introduced_on", "last_vote_at", "popular_title", "short_title", "keywords", "summary_short");
gunControlBills.search("\"gun control\"~5");
gunControlBills.call(saveTestData("GunControlBills"));

var districtBills = sunlight.districtsLocate();
districtBills.addZip("60653");
districtBills.call(saveTestData("DistrictBills"));

/**
 * load json data
 */
var loadJsonFile = function (filename) {
  var jsonData = require('../../testData/' + filename);
  return jsonData;
};

/**
 *  search for a topic
 */
exports.searchIssue = function (req, res, next) {
  var searchTopic = req.params.issue;
  var filename = 'GunControlBills.json';
  var data = loadJsonFile(filename);
  res.send(data);
};

exports.getBill = function (req, res, next) {
  var billId = req.params.id;
  sunlight.bills()
    .filter("bill_id", billId)
    .filter("order", "introduced_on")
    .fields("official_title", "introduced_on", "last_vote_at", "popular_title", "short_title", "keywords", "summary_short", "summary", "sponsor_id", "urls", "cosponsor_ids", "cosponsors_count")
    .call()
    .then(function (data) {
      res.send(data);
    });
};

exports.searchForIssue = function (req, res, next) {
  var searchTopic = req.params.issue;
  sunlight.billsSearch()
    .fields("official_title", "introduced_on", "last_vote_at", "popular_title", "short_title", "keywords", "summary_short", "sponsor")
    .filter("order", "introduced_on")
    .search(searchTopic)
    .call()
    .then(function (data) {
      res.send(data);
    });
};

exports.getCongressmen = function (req, res, next) {
  var districtObj = {
    state: req.params.state,
    district: req.params.district
  };

  var members = {};

//  var data = congressmen.getCongressmenInDistrict(districtObj);
//  TODO: can this be moved to the controllers/congressmen.js file?
  Congressman.find(
    {
      state: districtObj.state,
      district: districtObj.district
    })
    .exec(function (err, docs) {
      if (err) {
        console.log('error performing query: ', err);
        res.send(err);
      }
      members.house = docs;
    });

  Congressman.find({
    state: districtObj.state,
    chamber: 'senate'
  })
    .exec(function (err, docs) {
      if (err) {
        console.log('error performing query: ', err);
        res.send(err);
      }
      members.senate = docs;
      res.send(members);
    });
};

exports.billsSponsoredByCongressman = function (req, res, next) {
  var id = req.params.id;
  sunlight.billsSearch()
    .filter("sponsor_id", id)
    .filter("order", "introduced_on")
    .fields("official_title", "introduced_on", "last_vote_at", "popular_title", "short_title", "keywords", "summary_short", "summary", "sponsor_id")
    .call()
    .then(function (data) {
      res.send(data);
    });
};

exports.getCosponsors = function (req, res, next) {
  var ids = req.query.cosponsorIds;
  getCongressmanByIdArray(ids)
    .addBack(function (err, queryResults) {
      if (err) {
        console.error('error getting data from query ', err);
      } else if (!_.isUndefined(queryResults)) {
        res.send(JSON.stringify(queryResults));
      } else {
        res.next();
      }
    });
};

// For lack of better name, this function will get congressmen from MongoDB, we pass a collection (for now we pass an array, maybe some other collection in the future)
// the Congressmen that we find will be added to the data that will be passed to the frontend, an array that has congressman records of cosponsors for now

var getCongressmanByIdArray = function (idArray) {

  if (!_.isArray(idArray)) {
    idArray = [idArray];
  }
  var congressmen = Congressman.find(
    {
      bioguide_id: { $in: idArray }
    })
    .exec(function (err, docs) {
      if (err) {
        console.error('error performing query ', err);
      } else if (!_.isEmpty(docs)) {
        return docs;
      }
    });

  return congressmen;
};

exports.getCongressmanById = function (req, res, next) {
  var id = req.params.id;
  Congressman.find(
    {
      bioguide_id: id
    })
    .exec(function (err, docs) {
      if (err) {
        console.log('error performing query ', err);
      } else if (!_.isEmpty(docs)) {
        res.send(docs);
      } else {
        console.log('didnt find congressman by id, look for id with api ', id);
        var congressman = getCongressmanFromSunlight(id);
        if (congressman !== -1) {
          res.send(congressman);
        } else {
          console.log('unable to find congressman');
          res.send(500);
        }
      }
    });
};

var getCongressmanFromSunlight = function (id) {
  sunlight.legislators().filter('bioguide_id', id).then(function (response) {
    if (response.status === 'success') {
      return response.results[0];
    } else {
      return -1;
    }
  });
};

exports.loadHouseReps = function (req, res, next) {
  var reps = sunlight.legislators();
  var filename = 'Reps.json';
  reps.filter("in_office", true)
    .filter("chamber", "house")
    .fields("first_name", "middle_name", "last_name", "twitter_id", "gender", "party", "state", "district", "contact_info", "phone", "fax", "office", "oc_email");
//    .call();
  var data = loadJsonFile(filename);
  res.send(data);
};

exports.loadSenators = function (req, res, next) {
  var reps = sunlight.legislators();
  var filename = 'Senators.json';
  reps.filter("in_office", true)
    .filter("chamber", "senate")
    .fields("first_name", "middle_name", "last_name", "twitter_id", "gender", "party", "state", "state_rank", "contact_info", "phone", "fax", "office", "oc_email");
//    .call();
  var data = loadJsonFile(filename);
  res.send(data);
};

/**
 * search for district by zipcode
 */
exports.searchDistrictByZipCode = function (req, res, next) {
  var zipCode = req.params.zipCode;
  var filename;

  if (zipCode === '60653') {
    filename = 'Districts.json';
  } else {
    filename = 'District.json';
  }

  var district = sunlight.districtsLocate();
  district.addZip(zipCode);
//  district.call();
  var data = loadJsonFile(filename);

  res.send(data);
};

exports.searchDistrictCoords = function (req, res, next) {
  var coords = {
    latitude: req.params.lat,
    longitude: req.params.long
  };

  var filename = 'District.json';

  var district = sunlight.districtsLocate();
  district.addCoordinates(coords);
//  district.call();

  var data = loadJsonFile(filename);

  res.send(data);

};