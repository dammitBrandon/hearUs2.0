angular.module('services.hearModal', []).service('modalService', function($scope, $log, $modal) {
  var modalDefaults = {
    templateUrl: 'modal.html',
    backdrop: true,
    keyboard: true
  };

  function openModal(customModalDefaults, otherOptions) {
    $log.log('tesing', customModalDefaults);
  }
});