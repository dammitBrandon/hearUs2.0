angular.module('hearUs', [
  'templates-app',
  'templates-common',
  'templates-jade_app',
  'templates-jade_common',
  'header',
  'ui.router',
  'ui.map',
  'mm.foundation',
  'landing',
  'issueSearch',
  'districtSearch',
  'geolocate'
])
  .config(function myAppConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: "/",
        controller: "AppCtrl"
      });
  })
  .run(function ($rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    })
  .controller('AppCtrl', function AppCtrl($scope, $location) {
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      if (angular.isDefined(toState.data.pageTitle)) {
        $scope.pageTitle = toState.data.pageTitle + ' | The Hear Us Project';
      }
    });
  });

