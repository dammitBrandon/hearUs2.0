angular.module('dashboard.controllers', [
  'ui.router'
])
  .controller('dashboardCtrl', function dashboardController($scope, $state, $log) {
    function initDashboardCtrl() {
      $log.log('init dashboard');
    }
    
    initDashboardCtrl();
  });