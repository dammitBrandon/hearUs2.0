angular.module('issueSearch', [
  'ui.router',
  'issueSearch.controllers'
])
.config(function issueSearchConfig($stateProvider) {
    $stateProvider
      .state('issueSearch', {
//        TODO: dynamically udpate the url to reflect the issue being searched for
        url: '/issue-search',
        views: {
          "main": {
            controller: "issueSearchCtrl",
            templateUrl: "issueSearch/issueSearch-template.html"
          }
        },
//        TODO: dynamically update the data to reflect the issue being searched for 
        data: { pageTitle: "Search Topics" }
      });
  });