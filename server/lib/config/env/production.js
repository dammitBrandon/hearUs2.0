'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
  env: 'production',
  mongo: {
    uri: process.env.MONGOLAB_URI ||
         process.env.MONGOHQ_URL ||
      'mongodb://heroku_app25943479:ri0pbkfb7373vlrrps73tge0hi@ds053428.mongolab.com:53428/heroku_app25943479'
  },
  server: {
    distFolder: path.resolve(rootPath + '/../client/dist')
  }
};