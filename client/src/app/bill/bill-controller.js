angular.module('bill.controllers', [
    'ui.router'
]).
    controller('billCtrl', function billController($scope, $state, $log) {
        $scope.bill = {};

        $log.log("billController reached");
    });