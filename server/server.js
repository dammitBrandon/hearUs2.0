'use strict';

var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    sunlight = require('sunlight-congress-api');

/**
 * Main application file
 */



// Default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./lib/config/config');

// Connect to database
var db = mongoose.connect(config.mongo.uri, config.mongo.options);

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// Populate empty DB with sample data
require('./lib/config/dummydata');
  
// Passport Configuration
require('./lib/config/passport')();

var app = express();

// Express settings
require('./lib/config/express')(app);

// Routing
require('./lib/routes')(app, config);

/**
 * apikey sunlight labs api key
 * init the sunlightlabs api module
 */

var apikey = config.apikey;

sunlight.init(apikey);

// RESULTS MIGHT NOT COME BACK IN THE ORDER WE REQUESTED THEM
// THIS FUNCTION WILL HELP US KNOW WHICH IS WHICH BY CREATING
// A STANDARD HEADER ROW SUCCESS FUNCTION WITH A LABEL
var buildSuccess = function(title){
    return function(data){
        console.log("\n**************************** "+title+" ***********************************");
        console.log(data);
        console.log();
    }
}

var senatorsPage1 = sunlight.legislators()
    .filter("in_office", true)
    .filter("chamber", "house")
    .fields("first_name", "middle_name", "last_name", "twitter_id", "gender")
    .fields("party", "term_start", "state", "state_rank")
    .page(1, 50); //this might make more sense at 50... but it just fills up the demo screen

// EXAMPLE RESPONSE: ./results/SenatorsPage1.json
senatorsPage1.call(buildSuccess("SENTORS PAGE 1"));

var gunControlBills = sunlight.billsSearch();
gunControlBills.fields("official_title", "introduced_on", "last_vote_at", "popular_title", "keywords");
gunControlBills.search("\"gun control\"~5");
gunControlBills.call(buildSuccess("GUN CONTROL"));

// Start server
app.listen(config.port, function () {
  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;