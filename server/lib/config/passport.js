'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  LocalStrategy = require('passport-local').Strategy;

/**
 * Passport configuration
 */
module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    console.log('Serializing user with id %s', user._id);
    done(null, user._id);
  });
  passport.deserializeUser(function (id, done) {
    console.log('Finding user with id %s', id);
    User.findOne({
      _id: id
    }, function (err, user) { // don't ever give out the password or salt
      console.log('Found user to deserialize.', err, user);
      done(err, user);
    });
  });

//  add other strategies for more authentication flexibility
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password', // this is the virtual field on the model
      passReqToCallback: true // allows us to pass back the entire request to cb
    },
    function (req, email, password, done) {

      console.log('Authorizing user i think...', email, password);
      User.findOne({
        email: email
      }, function (err, user) {
        if (err) return done(err);

        if (user) {
          if (req.route.path === '/api/session/ServiceSignUpAuth') {
            console.log('attempting to signup with an email that already exists', user);
            return done(null, false, req.flash('signUpMessage', 'This email is registered already.'));
          } else {
            if (!user.authenticate(password)) {
              console.log('invalid password');
              return done(null, false, req.flash('signInMessage', 'Invalid password'));
            } else {
              return done(null, user);
            }
          }
        } else if (!user && req.route.path === '/api/session/ServiceSignUpAuth') {
          console.log('creating a new user');
          User.create({ email: email, password: password }, function (err, newUser) {
            if (err) {
              console.error('error saving new user record', err);
              return done(err);
            }
            return done(null, newUser, req.flash('signUpMessage', 'success'));
          });
        } else {
          console.log('unable to find user based on email provided');
          return done(null, false, req.flash('signInMessage', 'Unable to find email'));
        }
      });
    }
  ));
};