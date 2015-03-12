angular.module('dashboard.controllers', [
  'ui.router',
  'services.ProfileApi'
])
  .controller('dashboardCtrl', function dashboardController($scope, $state, profileService, $log) {
    function initDashboardCtrl() {
      $log.log('init dashboard');
      $scope.senators = [];
      $scope.user = profileService.getUser();
      $log.log('user profile', $scope.user);
      if (!_.isUndefined($scope.user.congressmen)) {
        _.forEach($scope.user.congressmen, function (congressman) {
          if (congressman.chamber === 'senate') {
            $scope.senators.push(congressman);
          } else if (congressman.chamber === 'house') {
            $scope.houseRep = congressman;
          }
        });
      }
    }

    initDashboardCtrl();
  });