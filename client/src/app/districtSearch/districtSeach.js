angular.module('districtSearch', [
  'ui.router',
  'districtSearch.controllers'
]).config(function districtSearchConfig($stateProvider) {
    $stateProvider
      .state('districtSearch', {
        abstract: true,
        views: {
          "main": {
            controller: "districtSearchCtrl",
            templateUrl: "districtSearch/districtSearch-template.html"
          }
        },
//        TODO: dynamically update the data to reflect the zipcode
        data: { pageTitle: "Your District" }
      })
      .state('districtSearch.zipCode', {
        url: '/district-search/:zipCode'
        
      })
      .state('districtSearch.coords', {
        url: '/district-search?lat&long'
      });
});