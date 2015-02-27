angular.module('services.ProfileApi', [
  'ui.router'
])
.factory('profileService', function($rootScope, $q, $http, $log) {
    var baseUrl = 'api/session';
    
    var _user = {};
    
    function setUserProfile(userObj) {
      if (_.isNull(_user)) {
        _user = {};
      }
      if(!_.isUndefined(userObj) && !_.isNull(userObj)) {
        if(!_.isUndefined(userObj.id) && !_.isNull(userObj.id)) {
          _user.id = userObj.id;
        }
        if(!_.isUndefined(userObj.email) && !_.isNull(userObj.email)) {
          _user.email = userObj.email;
        }
        if(!_.isUndefined(userObj.role) && !_.isNull(userObj.role)) {
          _user.role = userObj.role;
        }
      }
      $log.log('setUserProfile _user', _user);
    }
    
    function signUpAuth(userObj) {
      var deferred = $q.defer();
      var url = baseUrl + '/ServiceSignUpAuth';
      
      $log.log('user obj ', userObj);
      
      $http({
        method: 'POST',
        url: url,
        headers: { 'Content-Type': 'application/json'},
        data: {userObj: userObj}
      })
        .success(function(data, status, headers, config) {
          $log.log('successful signing up in user', data);
          setUserProfile(data);
          $rootScope.$broadcast('user:loggedIn');
          deferred.resolve();
        })
        .error(function(err, status, headers, config) {
          $log.error('failed to sign up user', err);
          deferred.reject(err);
        });
      
      return deferred.promise;
    }
    
    function getId() {
      return _user ? _user.id : null;
    }
    
    function getUser() {
      return _user;
    }
    
    function getRole() {
      return _user ? _user.role : null;
    }
    
    function isLoggedIn() {
      return  (!_.isNull(_user) && !_.isUndefined(_user.id)) ? true : false;
    }
    
    function isAuthorized(role) {
      if(!_.isNull(_user) && !_.isUndefined(_user.role)) {
        return _user.role >= role;  
      } else {
        return false;
      }
    }
    
    function logIn(userObj) {
      var deferred = $q.defer();
      
      $http({
        method: 'POST',
        url: baseUrl,
        headers: { 'Content-Type': 'application/json'},
        data: userObj
      })
        .success(function(data, status, headers, config) {
          $log.log('successful signing user in', data);
          setUserProfile(data);
          $rootScope.$broadcast('user:loggedIn');
          deferred.resolve();
        })
        .error(function(err, status, headers, config){
          $log.error('failed to sign in user', err);
          deferred.reject(err);
        });
      
      return deferred.promise;
    }
    
    function logOut() {
      var deferred = $q.defer();
      
      $http({
        method: 'DELETE',
        url: baseUrl
      })
        .success(function(data, status, headers, config) {
          $log.log('successfully logged user out', data);
          $rootScope.$broadcast('user:loggedOut');
          deferred.resolve();
        })
        .error(function(err, status, headers, config) {
          $log.error('failed to log user out', err);
          deferred.reject();
        });
      // for right now it makes sense to set the _user to null regardless
      _user = null;
      
      return deferred.promise;
    }
    
    return {
      signUpAuth: signUpAuth,
      getId: getId,
      getUser: getUser,
      getRole: getRole,
      isLoggedIn: isLoggedIn,
      isAuthorized: isAuthorized,
      logIn: logIn,
      logOut: logOut
    };
  });