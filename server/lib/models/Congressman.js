'use strict';

var mongoose = require('mongoose'),
  uniqueValidator = require('mongoose-unique-validator'),
  Schema = mongoose.Schema;

var CongressManSchema = new Schema({
  first_name: String,
  last_name: String,
  middle_name: String,
  distirct: Number,
  party: String,
  state: String
});

mongoose.model('Congressman', CongressManSchema);