angular.module('bill', [
  'ui.router',
  'bill.controllers'
])
.config(function billConfig($stateProvider){
    $stateProvider
      .state('bill', {
        url: '/bill/:id',
        views: {
          "main": {
            controller: 'billCtrl',
            templateUrl: "bill/bill-template.html",
            resolve: {
              bill: function($log, $stateParams, SunlightService) {
                
                return SunlightService.getBill($stateParams.id).then(function(billData){
                  var bill;
                  if(billData.count === 1) {
                    bill = billData.results[0];
                    return bill;
                  } else if (billData.count < 1) {
                    bill = billData.results;
                    return bill;
                  } else {
                    return billData;
                  }
                });
              }
            }
          }
        },
        data: { pageTitle: "Bill :"}
      });
  });