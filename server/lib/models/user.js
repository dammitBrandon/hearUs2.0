'use strict';

var mongoose = require('mongoose'),
  uniqueValidator = require('mongoose-unique-validator'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

var authTypes = ['github', 'twitter', 'facebook', 'google'],
  SALT_WORK_FACTOR = 10;

/**
 * User Schema
 */
var UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  role: {
    type: String,
    default: '1'
  },
  hashedPassword: String,
  provider: String,
  salt: String
});

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

/**
 * Methods
 */
UserSchema.methods = {
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  encryptPassword: function(password) {
    if(!password || !this.salt){ return ''; }
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 1000, 64).toString('base64');
  }
};

var User = mongoose.model('User', UserSchema);

module.exports = User;