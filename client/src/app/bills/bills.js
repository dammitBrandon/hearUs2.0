angular.module('bills', [
    'ui.router',
    'bills.controllers'
])
    .config(function billsConfig($stateProvider) {
        $stateProvider
            .state('bills', {
                url: '/bills',
                views: {
                    "main": {
                        controller: "billsCtrl",
                        templateUrl: "bills/bills-template.html"
                    }
                },
                data: { pageTitle: "Bills found" }
            });
    });