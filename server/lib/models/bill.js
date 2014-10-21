'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/*
 * Individual bill schema
 */
var BillSchema = new Schema({
  billId: {
    type: String,
    unique: true,
    required: true
  },
  
  officialTitle: {
    type: String,
    unique: true,
    required: true
  }
});

var Bill = mongoose.model('Bill', BillSchema);

module.exports = Bill;