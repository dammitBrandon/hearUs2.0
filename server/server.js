'use strict';

var express = require('express'),
  passport = require('passport'),
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
require('./lib/config/seedData');
  
// Passport Configuration
require('./lib/config/passport')(passport);

var app = express();

// Express settings
require('./lib/config/express')(app, config, passport);

// Routing
require('./lib/routes')(app, config, passport);

// Start server
app.listen(config.port, function () {
  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

// Heroku port definition
var DEFAULT_PORT = config.port;

// Expose app
exports = module.exports = app;