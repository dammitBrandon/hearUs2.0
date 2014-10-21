angular.module('landing.controllers', [
  'ui.router'
]).
  controller('landingCtrl', function landingPageController($scope, $state, $log) {
    $scope.searchTopic = "";
    $scope.zipCode = "";

    $scope.findTopic = function findTopic() {
      $state.go('issueSearch', {searchTopic: $scope.searchTopic});
    };

    $scope.findDistrict = function findDistrict() {
      $log.log("landingCtrl#findDistrict", $scope.zipCode);
    };
  });