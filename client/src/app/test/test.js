angular.module('test', [
  'ui.router',
  'ACCESS'
])
  .config(function testConfig($stateProvider, ACCESS_LEVELS) {
    $stateProvider
      .state('test', {
        url: '/test',
        views: {
          "main": {
            controller: 'testingCtrl',
            templateUrl: 'test/test-template.html'

          }
        },
        data: {pageTitle: "test"},
        access_level: ACCESS_LEVELS.authenticated
      });
  })
  .controller('testingCtrl', function testingController($scope, $state, $log) {
    function init() {
      $log.log('inside init');
    }

    init();
  });