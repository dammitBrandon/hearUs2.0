'use strict';

var _ = require('lodash');

/**
 * Load environment configuration
 */

var config = {
    apikey: "d9836e25aa044e26bf6008212dab2514"
};

module.exports = _.extend(
    require('./env/all.js'),
    require('./env/' + process.env.NODE_ENV + '.js') || {});