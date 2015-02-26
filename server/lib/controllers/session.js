'use strict';

var mongoose = require('mongoose'),
    passport = require('passport');

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
  var flashObj = req.flash();
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if (error) return res.json(401, error);

    req.logIn(user, function(err) {
      if (err) return res.send(err);
      if(user) {
        return res.json({
          id: user._id,
          email: user.email,
          role: user.role
        }, flashObj.signInMessage);
      } else {
        return res.json(401, flashObj.signInMessage);
      }
    });
  })(req, res, next);
};