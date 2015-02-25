angular.module('auth.controllers', [
  'ui.router',
  'services.ProfileApi' 
])
.controller('authCtrl', function authController($scope, $state, $log, ProfileService) {
    function initAuthPage() {
      $scope.user = {
        email: null,
        password: null,
        verifyPassword: null
      };
    }
    
    $scope.signUp = function() {
      $log.log('email ', $scope.user.email);
      $log.log('password ', $scope.user.password);
      $log.log('matching?', _.isEqual($scope.user.password, $scope.user.verifyPassword));
    };
    
    initAuthPage();
  });