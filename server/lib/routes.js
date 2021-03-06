'use strict';

var express = require('express'),
  index = require('./controllers'),
  users = require('./controllers/users'),
  session = require('./controllers/session'),
  middleware = require('./middleware'),
  sunlightApi = require('./controllers/sunlight'),
  twitterApi = require('./controllers/nodeTwitter');

/**
 * Application routes
 */
module.exports = function (app, config, passport) {

//  app.post('/api/users', users.create);
//  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', ensureAuthenticated, users.me);
  app.get('/api/users/:id', users.show);
  app.post('/api/users/:id/bills', users.addBill);
  app.del('/api/users/:id/bills/:bill_id', users.removeBill);
  
//  app.get('/api/sunlight/topic/:issue', sunlightApi.searchIssue);
  app.get('/api/sunlight/topic/:issue', sunlightApi.searchForIssue);
  app.get('/api/sunlight/bill/:id', sunlightApi.getBill);
  app.get('/api/sunlight/district/congressmen/state/:state/district/:district', sunlightApi.getCongressmen);
  app.get('/api/sunlight/congressmen/cosponsors', sunlightApi.getCosponsors);
  app.get('/api/sunlight/congressman/bills/:id', sunlightApi.billsSponsoredByCongressman);
  app.get('/api/sunlight/congressman/:id', sunlightApi.getCongressmanById);
  app.get('/api/sunlight/district/lat/:lat/long/:long', sunlightApi.searchDistrictCoords);
  app.get('/api/sunlight/district/address', sunlightApi.searchDistrictByAddress);
  app.get('/api/sunlight/district/:zipCode', sunlightApi.searchDistrictByZipCode);
  app.get('/api/sunlight/representatives', sunlightApi.loadHouseReps);
  app.get('/api/sunlight/senators', sunlightApi.loadSenators);
  app.get('/api/twitter/search/bill', twitterApi.searchForBill);

  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);
  app.post('/api/session/ServiceSignUpAuth', users.create);

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
//  app.get('/*', middleware.setUserCookie, index.index);

  // If we hit this, something is wrong
  app.use(config.server.staticUrl, function (req, res) {
    return res.send(404);
  });

  // send the index file last
  app.all('/', function (req, res) {
    res.sendfile('index.html', { root: config.server.distFolder });
  });
};



// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/index.html#/login');
}