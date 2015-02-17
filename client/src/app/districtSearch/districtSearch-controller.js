angular.module('districtSearch.controllers', [
  'ui.router',
  'services.SunlightApi',
  'services.hearUsModal'
]).
  controller('districtSearchCtrl', function districtSearchController($scope, $rootScope, $state, $stateParams, $log, districtInfo, SunlightService, $modal) {

    function initDistrictSearch() {
      $scope.senators = [];

      if (districtInfo.count === 1 || districtInfo.count === 0) {
        $scope.district = districtInfo.district;
        _.forEach(districtInfo.congressmen, function (congressman) {
          if (congressman.chamber === 'senate') {
            $scope.senators.push(congressman);
          } else if (congressman.chamber === 'house') {
            $scope.houseRep = congressman;
          }
        });

      } else if (districtInfo.count === 2) {
//                  zipcode returned 2 districts, need to find out the district that the user is apart of
//                  what can we do? 1. get the street and find the lat and long from the street, 2. geolocate
//                  3. we can show them the two districts and let them choose the district that they are apart of
//                  4. we can get them to enter the +4 for the zip code
        
        requestAdditionalInformation(districtInfo);
      }
    }

    function requestAdditionalInformation(districtInfo) {
//  TODO: Implement ModalService
      
      var modalDefaults = {
        templateUrl: 'districtSearch/moreInfoModal.html',
        backdrop: true,
        keyboard: true,
        controller: function ($scope, $rootScope, $log, $modalInstance) {
          $scope.address = districtInfo.results[2];
          $scope.zipCode = $stateParams.zipCode;

          $scope.ok = function () {
            var fullAddress = $scope.$$childTail.$$childTail.streetName + ', ' + $scope.address.address;
            SunlightService.getDistrictByAddress(fullAddress).then(function (modalDistrictData) {
              $rootScope.$broadcast('district:located', modalDistrictData);
              $modalInstance.close();
            });
          };

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
    });

    $scope.test = function () {
      $log.log('test ');
    };

    initDistrictSearch();
  });