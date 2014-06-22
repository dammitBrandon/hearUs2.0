angular.module('congressmen.controllers', [
    'ui.router'
]).
    controller('congressmenCtrl', function congressmenController($scope, $state, $log) {
       $scope.congressman = {};
        
        $log.log("congressmenController reached");
    });