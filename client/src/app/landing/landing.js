angular.module('landing', [
  'ui.router',
  'landing.controllers',
  'geolocate'
])
  .config(function landingConfig($stateProvider) {
    $stateProvider
      .state('landingPage', {
        url: '/',
        views: {
          "main": {
            controller: "landingCtrl",
            templateUrl: "landing/landing-template.html"
          }
        },
        data: { pageTitle: "Hear Us" }
      });
  });
