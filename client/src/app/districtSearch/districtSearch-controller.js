angular.module('districtSearch.controllers', [
  'ui.router',
  'services.SunlightApi',
  'services.hearUsModal'
]).
  controller('districtSearchCtrl', function districtSearchController($scope, $rootScope, $state, $stateParams, $log, districtInfo, SunlightService, $modal) {

    function initDistrictSearch() {
      $scope.senators = [];
      $log.log('info ', districtInfo);
      if (districtInfo.count === 1 || districtInfo.count === 0) {
        $scope.district = districtInfo.district;
        _.forEach(districtInfo.congressmen, function (congressman) {
          if (congressman.chamber === 'senate') {
            $scope.senators.push(congressman);
          } else if (congressman.chamber === 'house') {
            $scope.houseRep = congressman;
          }
        });

<<<<<<< Updated upstream
      } else if (districtInfo.count === 2) {
=======
      } else if (districtInfo.count > 2) {

>>>>>>> Stashed changes
        requestAdditionalInformation(districtInfo);
      }
    }

    function requestAdditionalInformation(districtInfo) {

      var modalDefaults = {
        templateUrl: 'districtSearch/moreInfoModal.html',
        backdrop: true,
        keyboard: true,
        controller: function ($scope, $rootScope, $log, $modalInstance) {
          $scope.address = _.last(districtInfo.results);
          $scope.zipCode = $stateParams.zipCode;

          $scope.ok = function () {
            var fullAddress = $scope.$$childTail.$$childTail.streetName + ', ' + $scope.address.address;
            var plusFourZipCode = $scope.$$childTail.$$childTail.plusFourZipCode;

            if (!_.isUndefined(plusFourZipCode) && plusFourZipCode) {
              var fullZipCode = $scope.zipCode + "-" + plusFourZipCode;
              getDistrictByAddress(fullZipCode);

            } else if (!_.isUndefined($scope.$$childTail.$$childTail.streetName) && fullAddress) {
              getDistrictByAddress(fullAddress);
            }
            $modalInstance.close();
          };

          function getDistrictByAddress(address) {
            SunlightService.getDistrictByAddress(address).then(function (modalDistrictData) {
              $rootScope.$broadcast('district:located', modalDistrictData);
              return;
            });
          }

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
        }
      };

      $modal.open(modalDefaults);
    }

    $scope.$on('district:located', function (event, data) {
      $scope.district = data.results[0].district;
      _.forEach(data.results[0].congressmen, function (congressman) {
        if (congressman.chamber === 'senate') {
          $scope.senators.push(congressman);
        } else if (congressman.chamber === 'house') {
          $scope.houseRep = congressman;
        }
      });
      return;
    });

    initDistrictSearch();
  });