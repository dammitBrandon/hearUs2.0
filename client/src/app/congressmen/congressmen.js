angular.module('congressmen', [
    'ui.router',
    'congressmen.controllers'
])
.config(function congressmenConfig($stateProvider) {
        $stateProvider
            .state('congressmen', {
                url: '/congressmen',
                views: {
                    "main": {
                        controller: "congressmenCtrl",
                        templateUrl: "congressmen/congressmen-template.html"                          
                    }
                },
                data: { pageTitle: "Congressmen"}
            });
    });