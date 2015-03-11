angular.module('dashboard', [
  'ui.router',
  'dashboard.controllers',
  'ACCESS'
])
  .config(function dashboardConfig($stateProvider, ACCESS_LEVELS) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        views: {
          "main": {
            controller: 'dashboardCtrl',
            templateUrl: 'dashboard/dashboard.html'
          }
        },
        data: {pageTitle: "dashboard"},
        access_level: ACCESS_LEVELS.authenticated        
      });
  });