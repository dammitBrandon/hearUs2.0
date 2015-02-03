'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'), 
    Congressman = mongoose.model('Congressman');

exports.getCongressmenInDistrict = function(districtObj) {
  var state = districtObj.state,
      district = districtObj.district;
  console.log('district info: ', districtObj);
  Congressman.find(
    {
      state: state,
      district: district
    }
  ).exec(function(err, docs) {
      if(err) {
        console.log('error performing query: ', err);
        return err;
      }
      console.log('search complete');
      return docs;
    });
};

exports.getCongressmenById = function(id) {
  Congressman.find(
    {
      bioguide_id: id
    }
  ).exec(function(err, docs) {
      if(err){
        console.log('error performing query: ', err);
        return err;
      }
      console.log('search complete', docs);
      return docs;
    });
};