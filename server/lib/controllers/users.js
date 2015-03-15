'use strict';

var mongoose = require('mongoose'),
  _ = require('lodash'),
  UserRepository = require('../repositories/UserRepository'),
  sunlight = require('./sunlight'),
  User = require('../models/user'),
  Bill = require('../models/bill');

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
        console.log('user is ', user );
        sunlight.getCongressmenForDistrict({district: req.user.district, state: req.user.state}).addBack(function (err, queryResults) {
          if (err) {
            console.error('error getting data from query', err);
          } else {
            console.log('congressmen found', queryResults);
            return res.json({
              id: req.user._id,
              firstName: req.user.firstName,
              lastName: req.user.lastName,
              email: req.user.email,
              role: req.user.role,
              state: req.user.state,
              district: req.user.district,
              congressmen: queryResults,
              bills: req.user.favoriteBills
            });
          }
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

exports.addBill = function (req, res, next) {
  var userId = mongoose.Types.ObjectId(req.params.id);
  var billId = req.body.billId;
  
  User.findOne({"_id": userId}, function (err, user) {
    if (err) {
      return next(err);
    }
    
    if(_.indexOf(user.favoriteBills, billId) === -1) {
      console.log('Bill currently not in favorites');
      user.favoriteBills.push(billId);
      user.save(function(err, user) {
        if (err) {
          console.error(err);
          res.send(500, err);
        }
        console.log('successfully saved bill in favorites', user);
      });
    }
    res.json({
      id: user._id,
      email: user.email,
      role: user.role,
      favoriteBills: user.favoriteBills
    });
  });
};

exports.removeBill = function(req, res, next) {
  console.log('removeing bill');
  var userId = mongoose.Types.ObjectId(req.params.id);
  var billId = req.params.bill_id;

  User.findOne({"_id": userId}, function(err, user) {
    if (err) {
      return res.send(500, err);
    }
    
    var billIndex = _.indexOf(user.favoriteBills, billId);
    if( billIndex !== -1) {
      console.log('billid found', billIndex);
      user.favoriteBills.splice(billIndex, 1);
      user.save(function(err, user) {
        if (err) {
          console.error(err);
          res.send(500, err);
        }
        console.log('successfully removed bill from favorites', user);
      });
    }
    res.json({
      id: user._id,
      email: user.email,
      role: user.role,
      favoriteBills: user.favoriteBills
    });
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