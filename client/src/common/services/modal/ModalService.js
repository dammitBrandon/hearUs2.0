'use strict';

angular.module('services.hearUsModal', [
  'ui.router',
  'mm.foundation',
  'mm.foundation.tpls'
])
  .factory('ModalService', function ($log, $modal) {
    var modalDefaults = {
      template: "<div>" +
        "<h3>Test Modal</h3>" +
        "<button class='button' ng-click='ok()'>OK</button>" +
        "<button class='button' ng-click='cancel()'>Cancel</button>" +
        "</div>",
      backdrop: true,
      keyboard: true,
      controller: function($scope, $modalInstance) {
        $scope.ok = function () {
          $modalInstance.close();
        };
        
        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      }
    };

    function openModal(customModalDefaults, otherOptions) {
      return show();
    }
    
    function show() {
      $modal.open(modalDefaults);
    }
    
    return {
      openModal: openModal
    };
  });