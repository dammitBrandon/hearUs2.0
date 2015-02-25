'use strict';

var express = require('express'),
  session = require('express-session'),
  cookieParser = require('cookie-parser'),
  errorHandler = require('errorhandler'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  compression = require('compression'),
  favicon = require('serve-favicon'),
  path = require('path'),
  config = require('./config'),
  mongoStore = require('connect-mongo')(session),
  MemoryStore = session.MemoryStore;

/**
 * Express configuration
 */
module.exports = function (app, config, passport) {
  if (config.env === 'development') {
    //    app.use(require('connect-livereload')());

    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
      if (req.url.indexOf('/scripts/') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
      }
      next();
    });

//    app.use(express.static(path.join(config.root, '.tmp')));
//    app.use(express.static(path.join(config.root, 'app')));
    app.use(errorHandler());
    app.set('views', config.root + '/app/views');

    console.log('Configuring Express Sessions for dev');
    app.use(cookieParser());
    app.use(session({
      secret: config.server.sessionSecret,
      store: new mongoStore({
        url: config.mongo.uri,
        collection: 'sessions'
      }),
//      key: config.server.sessionCookieName,
      proxy: true
    }));

  } else if (config.env === 'production') {
//    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
//    app.use(express.static(path.join(config.root, 'public')));
    app.set('views', config.root + '/views');

    // Persist sessions with mongoStore
    console.log('Configuring Express Sessions.');
    app.use(cookieParser());
    app.use(session({
      secret: config.server.sessionSecret,
      store: new mongoStore({
        url: config.mongo.uri,
        collection: 'sessions'
      }),
//      key: config.server.sessionCookieName,
      proxy: true
    }));

  }

  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride());
//    app.use(express.cookieParser());

  // Server static resources from the compiled client application folder (either build or dist,
  // depending on environment)
  app.use(config.server.staticUrl, compression());
  app.use(config.server.staticUrl, express.static(config.server.distFolder));

  //use passport session
  console.log('Configuring Passport auth module.');
  app.use(passport.initialize());
  app.use(passport.session());
};