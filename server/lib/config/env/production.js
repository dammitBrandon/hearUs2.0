'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
  env: 'production',
  mongo: {
    uri: process.env.MONGOLAB_URI ||
         process.env.MONGOHQ_URL ||
      'mongodb://admin_user:abc123@ds045011.mongolab.com:45011/hear_us_project_sbx'
  },
  server: {
    distFolder: path.resolve(rootPath + '/../client/dist')
  }
};