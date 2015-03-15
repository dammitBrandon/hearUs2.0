'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    sunlight = require('./sunlight'),
    _ = require('lodash');

/**
 * Logout
 */
exports.logout = function (req, res) {
  req.logout();
  res.send(200);
};

/**
 * Login
 */
exports.login = function (req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var flashObj = req.flash();
    
    var error = err || info;
    if (error) return res.status(401).json(error);
    
    if(user) {
      console.log('first user in session is ', user);
      req.logIn(user, function(err) {
        if (err) {
          console.error(err);
          return res.send(err);
        }
        if(user) {
          console.log('second user in session is ', user);
          sunlight.getCongressmenForDistrict({district: req.user.district, state: req.user.state}).addBack(function (err, queryResults) {
            if (err) {
              console.error('error getting data from query', err);
            } else {
              console.log('congressman found', queryResults);
              return res.json({
                id: req.user._id,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                email: req.user.email,
                role: req.user.role,
                state: req.user.state,
                district: req.user.district,
                congressmen: queryResults,
                favoriteBills: user.favoriteBills
              });
            }
          });
        } else {
          return res.json(401);
        }
      });
    }
    
    // If all else fails and there is a flashObj send it
    if(!_.isEmpty(flashObj)) {
      return res.status(401).json(flashObj.signInMessage);
    }
  })(req, res, next);
};