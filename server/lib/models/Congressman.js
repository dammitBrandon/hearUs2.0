'use strict';

var mongoose = require('mongoose'),
  uniqueValidator = require('mongoose-unique-validator'),
  Schema = mongoose.Schema;

var CongressmanSchema = new Schema({
  bioguide_id: String,
  first_name: String,
  last_name: String,
  middle_name: String,
  district: Number,
  party: String,
  state: String,
  chamber: String,
  website: String,
  phone: String,
  fax: String,
  office: String
});

var Congressman  = mongoose.model('Congressman', CongressmanSchema);

module.exports = Congressman;