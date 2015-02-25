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
      ProfileService.signUpAuth($scope.user);
    };
    
    initAuthPage();
  });