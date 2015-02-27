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
      $state.go('districtSearch.zipCode', {zipCode: $scope.zipCode});
    };
    
    $scope.disableTopicSearch = function() {
      return _.isEmpty($scope.searchTopic);
    };
    
    $scope.isNewCharNumber = function() {
      var last = parseInt(_.last($scope.zipCode), 10);
      
      if (!(_.isNumber(last) && !_.isNaN(last))) {
        $scope.zipCode = $scope.zipCode.slice(0, -1);
      }
    };
    
    $scope.disableZipSearch = function() {
      return $scope.zipCode.length != 5;
    };
  });