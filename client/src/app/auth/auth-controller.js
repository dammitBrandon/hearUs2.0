angular.module('auth.controllers', [
  'ui.router',
  'services.ProfileApi' 
])
.controller('authCtrl', function authController($scope, $state, $log, ProfileService) {
    function initAuthPage() {
      $scope.user = {
        email: null,
        password: null
      };
      $scope.verifyPassword = null;
    }
    
    $scope.signUp = function() {
      profileService.signUpAuth($scope.user).then(function() {
        // User will go to the home page on success
        // $state.go('homepage');
      }, function(err) {
        $log.error('error', err);
      });
    };
    
    $scope.signIn = function() {
      profileService.logIn($scope.user).then(function() {
        // User will go to the home page on success
        // $state.go('homepage');
      }, function(err){
        $log.log('error', err);
      });
    };
    
    $scope.logOut = function() {
      $log.log('#logOutAuth');
      profileService.logOut();
    };
    
    $scope.passwordEquality = function() {
      if($scope.hearUsForm['sign-up'].userPassword.$touched && $scope.hearUsForm['sign-up'].userPassword.$valid) {
        $log.log('password input valid and has been touched');
        if(angular.equals($scope.user.password, $scope.verifyPassword)) {
          $log.log('password and verify password same');
        } else {
          $log.log('password and verify password not the same');
          $scope.hearUsForm['sign-up'].verifyPassword.$invalid = true;
        }
      } else {
        $log.log('password field invalid or untouched');
      }
    };
    
    $scope.signUpFormValid = function() {
    };
    
    initAuthPage();
  });