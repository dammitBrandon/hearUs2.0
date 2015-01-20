'use strict';

var mongoose = require('mongoose'),
  uniqueValidator = require('mongoose-unique-validator'),
  Schema = mongoose.Schema;

var DistrictSchema = new Schema({
  state: String,
  district: Number
});

var District = mongoose.model('District', DistrictSchema);

module.exports = District;