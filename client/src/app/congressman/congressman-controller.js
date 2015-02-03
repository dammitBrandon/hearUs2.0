angular.module('congressman.controllers', [
  'ui.router',
  'services.SunlightApi'
])
  .controller('congressmanCtrl', function congressmanController($scope, $state, $stateParams, $log, SunlightService, congressman) {
    function initCongressmanCtrl() {
      $log.log('init congressman');
      if (congressman) {
        $scope.congressman = congressman;
      }
    }
    
    initCongressmanCtrl();
  });