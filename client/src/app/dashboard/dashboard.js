angular.module('dashboard', [
  'ui.router',
  'dashboard.controllers'
])
  .config(function dashboardConfig($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        views: {
          "main": {
            controller: 'dashboardCtrl',
            templateUrl: 'dashboard/dashboard.html'
          }
        },
        data: {pageTitle: "dashboard"}
      });
  });