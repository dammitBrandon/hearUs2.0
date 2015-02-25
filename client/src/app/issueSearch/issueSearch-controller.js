angular.module('issueSearch.controllers', [
  'ui.router',
  'services.SunlightApi'
]).
  controller('issueSearchCtrl', function issueSearchController($scope, $state, $stateParams, $log, sunlightService) {
    $scope.issue = $stateParams.searchTopic;
    $scope.bills = [];
    
    function findBills() {
      sunlightService.getIssues($scope.issue).then(function(bills) {
        $scope.bills = bills.results;
      });
    }
    
    findBills();
  });