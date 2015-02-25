angular.module('auth', [
  'ui.router',
  'auth.controllers'
])
  .config(function authConfig($stateProvider) {
    $stateProvider
      .state('auth', {
        abstract: true,
        views: {
          "main": {
            templateUrl: "templates/child-view-container.html"
          }
          
        }
      })
      .state('auth.signup', {
        url: '/signup',
        views: {
          "childView": {
            controller: "authCtrl",
            templateUrl: "auth/sign-up.html"
          }
        }
      });
  });