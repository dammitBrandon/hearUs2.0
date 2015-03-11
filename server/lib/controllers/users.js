'use strict';

var UserRepository = require('../repositories/UserRepository'),
  User = require('../models/user');

/**
 * Create user
 */
exports.create = function (req, res, next) {
  var newUserData = req.body;

  User.create(newUserData, function (err, user) {
    if (err) {
      // Manually provide our own message for 'unique' validation errors, can't do it from schema
      if (err.errors.email.type === 'Value is not unique.') {
        err.errors.email.type = 'The specified email address is already in use.';
      }
      return res.json(400, err);
    }

    req.logIn(user, function (err) {
      if (err) return next(err);

      if (user) {
        return res.json({
            id: req.user._id,
            email: req.user.email,
            role: req.user.role
        });
      } else {
        return res.json(401);
      }
    });
  });
};

/**
 *  Get profile of specified user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  UserRepository.findOne({_id: userId}, function (err, user) {
    if (err) return next(new Error('Failed to load User'));

    if (user) {
      res.send({ profile: user.profile });
    } else {
      res.send(404, 'USER_NOT_FOUND');
    }
  });
};

/**
 * Change password
 */
exports.changePassword = function (req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  UserRepository.findOne({_id: userId}, function (err, user) {
    if (user.authenticate(oldPass)) {

      user.password = newPass;
      UserRepository.save(user, function (err) {
        if (err) {
          res.send(500, err);
        } else {
          res.send(200);
        }
      });
    } else {
      res.send(400);
    }
  });
};

/**
 * Get current user
 */
exports.me = function (req, res) {
  res.json(req.user || null);
};