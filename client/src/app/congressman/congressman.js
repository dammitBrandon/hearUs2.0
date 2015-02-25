angular.module('congressman', [
  'ui.router',
  'congressman.controllers'
])
.config(function congressmanConfig($stateProvider) {
    $stateProvider
      .state('congressman', {
        url: '/congressman/:id',
        views: {
          "main": {
            controller: 'congressmanCtrl',
            templateUrl: "congressman/congressman-template.html",
            resolve: {
              congressman: function($log, $stateParams, sunlightService) {
                return sunlightService.getCongressmanById($stateParams.id).then(function(congressmanData){
                  return congressmanData[0];
                });
              }
            }
          }
        }
      });
  });