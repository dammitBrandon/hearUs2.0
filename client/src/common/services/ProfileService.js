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
          _user.id = userObj.id;
          _user.firstName = userObj.firstName;
          _user.lastName = userObj.lastName;
          _user.email = userObj.email;
          _user.role = userObj.role;
          _user.congressmen = userObj.congressmen;
          _user.district = userObj.district;
          _user.favoriteBills = userObj.favoriteBills;
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
    
    function favoriteBill(bill) {
      var deferred = $q.defer();
      $log.log('updateFavorites', bill);
      $log.log('user', _user);
      
      $http({
        method: 'POST',
        url: '/api/users/' + _user.id + '/bills',
        data: {billId: bill.bill_id}
      })
        .success(function(data, status, headers, config) {
          $log.log('successfully added bill', data);
          setUserProfile(data);
          deferred.resolve(data);
        })
        .error(function(err, status, headers, config) {
          $log.error('failed to add bill', err);
        });
      
      return deferred.promise;
    }
    
    function unfavoriteBill(bill) {
      var deferred = $q.defer();
      $log.log('updateFavorites', bill);
      $log.log('user', _user);

      $http({
        method: 'DELETE',
        url: '/api/users/' + _user.id + '/bills/' + bill.bill_id
      })
        .success(function(data, status, headers, config) {
          $log.log('successfully deleted bill', data);
          setUserProfile(data);
          deferred.resolve(data);
        })
        .error(function(err, status, headers, config) {
          $log.error('failed to delete bill', err);
          deferred.reject(err);          
        });

      return deferred.promise;
    }
    
    function isFavorited(billId) {
      var test = _.indexOf(_user.favoriteBills, billId);
      $log.log('bill favorited?', test);
      if(test === -1) {
        $log.log('false');
        return false;
      } else {
        $log.log('true');
        return true;
      }
    }
    
    return {
      signUpAuth: signUpAuth,
      getId: getId,
      getUser: getUser,
      getRole: getRole,
      isLoggedIn: isLoggedIn,
      isAuthorized: isAuthorized,
      logIn: logIn,
      logOut: logOut,
      favoriteBill: favoriteBill,
      unfavoriteBill: unfavoriteBill,
      isFavorited: isFavorited
    };
  });