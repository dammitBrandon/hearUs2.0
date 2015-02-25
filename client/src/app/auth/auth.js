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
      .state('auth.sign_up', {
        url: '/sign_up',
        views: {
          "childView": {
            controller: "authCtrl",
            templateUrl: "auth/sign-up.html"
          }
        }
      })
      .state('auth.sign_in', {
        url: '/sign_in',
        views: {
          "childView": {
            controller: "authCtrl",
            templateUrl: "auth/sign-in.html"
          }
        }
      });
  });