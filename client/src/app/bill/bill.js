angular.module('bill', [
    'ui.router',
    'bill.controllers'
])
    .config(function billConfig($stateProvider) {
        $stateProvider
            .state('bill', {
                url: '/bill',
                views: {
                    "main": {
                        controller: "billCtrl",
                        templateUrl: "bill/bill-template.html"
                    }
                },
                data: { pageTitle: "single Bill" }
            });
    });