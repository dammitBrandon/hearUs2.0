angular.module('issueSearch.controllers', [
  'ui.router',
  'services.SunlightApi'
]).
  controller('issueSearchCtrl', function issueSearchController($scope, $state, $stateParams, $log, IssueService) {
    $scope.issue = $stateParams.searchTopic;
    $scope.bills = [];
    
    function findBills() {
      IssueService.getIssues($scope.issue);
    }
    
    findBills();
  });