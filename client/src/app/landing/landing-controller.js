angular.module('landing.controllers', [
  'ui.router'
]).
  controller('landingCtrl', function landingPageController($scope, $state, $log) {
    $scope.searchTopic = "";
    $scope.zipCode = "";

    $scope.findTopic = function findTopic() {
      $state.go('issueSearch', {searchTopic: $scope.searchTopic});
    };

    $scope.findDistrictLanding = function findDistrict() {
      $state.go('districtSearch', {zipCode: $scope.zipCode});
    };
  });