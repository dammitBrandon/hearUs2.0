angular.module('header.controller', [
  'ui.router',
  'services.ProfileApi'
])
  .controller('HeaderCtrl', function ($scope, $state, $log, profileService) {
    function initHeader() {
      $scope.user = {
        email: 'mock@slalom.com'
      };
      $log.log('#initHeader');
      if ($scope.isLoggedIn()) {
        $log.log('logged in, fetching user info');
        getUser();
      } else {
        $log.log('not logged in');
      }
    }
    
    function getUser() {
      $scope.user = profileService.getUser();
    }
    
    $scope.isLoggedIn = function() {
      return profileService.isLoggedIn();
    }; 
        
    $scope.$on('user:loggedIn', function() {
      $log.log('user has logged in calling #getUser()');
      getUser();
    });
    
    initHeader();
  });