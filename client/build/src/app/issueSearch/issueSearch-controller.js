angular.module('issueSearch.controllers', [
  'ui.router',
  'services.SunlightApi'
]).
  controller('issueSearchCtrl', function issueSearchController($scope, $state, $stateParams, $log, SunlightService) {
    $scope.issue = $stateParams.searchTopic;
    $scope.bills = [];
    
    function findBills() {
      SunlightService.getIssues($scope.issue);
    }
    
    findBills();
  });