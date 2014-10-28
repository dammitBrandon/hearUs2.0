angular.module('districtSearch', [
  'ui.router',
  'districtSearch.controllers'
]).config(function districtSearchConfig($stateProvider) {
    $stateProvider
      .state('districtSearch', {
        url: '/district-search/:zipCode',
        views: {
          "main": {
            controller: "districtSearchCtrl",
            templateUrl: "districtSearch/districtSearch-template.html"
          }
        },
//        TODO: dynamically update the data to reflect the zipcode
        data: { pageTitle: "Your District" }
      });
});