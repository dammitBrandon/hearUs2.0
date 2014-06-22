angular.module('bills.controllers', [
    'ui.router'
]).
    controller('billsCtrl', function billsController($scope, $state, $log) {
       $scope.allBills = {};
        
        $log.log("billsController reached");
    });