angular.module('bill.controllers', [
  'ui.router',
  'services.SunlightApi'
])
  .controller('billCtrl', function billController($scope, $state, $stateParams, $log, SunlightService, bill){
    function initBillPage() {
      $scope.bill = bill;
    }

    initBillPage();
    
  });