'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
  root: rootPath,
  port: process.env.PORT || 3000,
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },
  server: {
    port: process.env.PORT || 3000,
    staticUrl: '/static',
    distFolder: path.resolve(rootPath + '/../client/build'),
    sessionSecret: 'oursupersecretkey',
    sessionCookieName: 'MBP_TOKEN'
  },
  sunlightLabs: {
    apikey: "d9836e25aa044e26bf6008212dab2514"
  },
  googleMaps: {
    apikey: "AIzaSyAeT2qiRj4vcpDOw1TegMmXeQu4SHl9QQQ"
  },
  twitter: {
    "consumerKey": "hBRolSpFC8mW8JfL0QDDg",
    "consumerSecret": "lDBy6KwLec8gX4oS338IG9BaPAJJHOvwPM0iH5a6Ef0",
    "accessToken": "376208330-1AoYnFgmNICvNLrOctZMZgax1GMuVARCCGRmhhy9",
    "accessTokenSecret": "S26w6mwU6A45CZrm7aLqzBshWHFV0454KPYFekjyak"
  }
};