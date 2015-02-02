angular.module('test.controllers', [
  'ui.router'
])
  .controller('testingCtrl', function testingController($scope, $state, $log, district) {
    function init(){
      $log.log('inside init', district);
    }
    init();
  });