// TODO: As the name suggests this is a test module used to test authorization and security of routes / states
// this module and its other associated components will be removed see Issue #27
angular.module('test', [
  'ui.router',
  'ACCESS'
])
  .config(function testConfig($stateProvider, ACCESS_LEVELS) {
    $stateProvider
      .state('test', {
        url: '/test',
        abstract: true,
        views: {
          "main": {
            controller: 'testingCtrl',
            templateUrl: 'templates/child-view-container.html'
          }
        },
        data: {pageTitle: "test"}
      })
      .state('test.test1', {
        url: '/test1',
        views: {
          "childView": {
            templateUrl: 'test/test-template.html'
          }
        },
        access_level: ACCESS_LEVELS.authenticated
      })
      .state('test.test2', {
        url: '/test2',
        views: {
          "childView": {
            templateUrl: 'test/test-template2.html'
          },
          access_level: ACCESS_LEVELS.authenticated
        }
      });
  })
  .controller('testingCtrl', function testingController($scope, $state, $log) {
    function init() {
      $log.log('inside init testCtrl');
    }

    init();
  });