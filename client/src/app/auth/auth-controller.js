angular.module('auth.controllers', [
  'ui.router',
  'services.ProfileApi' 
])
.controller('authCtrl', function authController($scope, $state, $log, profileService) {
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
        $state.go('dashboard');
      }, function(err) {
        $log.error('error', err);
      });
    };
    
    $scope.signIn = function() {
      profileService.logIn($scope.user).then(function() {
        // User will go to the home page on success
        $state.go('dashboard');
      }, function(err){
        $log.log('error', err);
      });
    };
    
    $scope.logOut = function() {
      $log.log('#logOutAuth');
      profileService.logOut();
    };
    
    $scope.passwordEquality = function() {
      if(($scope.hearUsForm['sign-up'].userPassword.$touched && $scope.hearUsForm['sign-up'].userPassword.$valid) || $scope.hearUsForm['sign-up'].verifyPassword.$touched) {
        if(angular.equals($scope.user.password, $scope.verifyPassword)) {
          if ($scope.hearUsForm['sign-up'].verifyPassword.$invalid === true ) {
            $scope.hearUsForm['sign-up'].verifyPassword.$invalid = false;
          }
        } else {
          $scope.hearUsForm['sign-up'].verifyPassword.$invalid = true;
        }
      }
    };
    
    $scope.isSignUpFormValid= function() {
      return (!$scope.hearUsForm['sign-up'].$invalid && !$scope.hearUsForm['sign-up'].userPassword.$pristine && angular.equals($scope.user.password, $scope.verifyPassword));
    };
    
    initAuthPage();
  });