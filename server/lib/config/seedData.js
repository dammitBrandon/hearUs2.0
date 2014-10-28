'use strict';

var _ = require('lodash'),
  mongoose = require('mongoose'),
  Congressman = mongoose.model('Congressman');

/**
 * Populate database with all the congressman (reps and senate)
 * Clear out old data, if any
 */
var congressmen = require('../../testData/Congressmen.json');
congressmen = congressmen.results;

Congressman.remove({}, function(){
  Congressman.create(congressmen, function(){
    Congressman.find().exec(function(err, docs){
      console.log('There are ' + docs.length + ' congress members seeded in DB ');
    });
    console.log('finished populating Congressmen');
  });
});