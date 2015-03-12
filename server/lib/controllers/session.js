'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
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
      req.logIn(user, function(err) {
        if (err) {
          console.error(err);
          return res.send(err);
        }
        if(user) {
          return res.json({
            id: user._id,
            email: user.email,
            role: user.role,
            favoriteBills: user.favoriteBills
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