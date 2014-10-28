'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
  env: 'production',
  mongo: {
    uri: process.env.MONGOLAB_URI ||
         process.env.MONGOHQ_URL ||
      'mongodb://heroku_app31076694:[needDbPassword]@ds049180.mongolab.com:49180/heroku_app31076694'
  },
  server: {
    distFolder: path.resolve(rootPath + '/../client/dist')
  }
};