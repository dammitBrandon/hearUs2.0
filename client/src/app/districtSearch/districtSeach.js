angular.module('districtSearch', [
  'ui.router',
  'districtSearch.controllers',
  'test.controllers',
  'services.SunlightApi'
]).config(function districtSearchConfig($stateProvider) {
  $stateProvider
    .state('districtSearch', {
      abstract: true,
      views: {
        "main": {
          templateUrl: "districtSearch/districtSearch-template.html"
        }
      },
//        TODO: dynamically update the data to reflect the zipcode
      data: { pageTitle: "Your District" }
    })
    .state('districtSearch.zipCode', {
      url: '/district-search/zipcode/:zipCode',
      views: {
        "childView": {
          controller: "districtSearchCtrl",
          templateUrl: "districtSearch/district-landing-template.html",
          resolve: {
            districtInfo: function ($log, $stateParams, SunlightService, $modal, ModalService) {
              return SunlightService.getDistrictByZipCode($stateParams.zipCode).then(function (districtData) {
                var district = {};
                if (districtData.count === 1 || districtData.count === 0) {
                  district = {
                    state: districtData.results[0].state,
                    districtNumber: districtData.results[0].district
                  };
                  return {
                    district: district,
                    congressmen: districtData.results[0].congressmen,
                    count: districtData.count
                  };
                } else if (districtData.count === 2) {
//                  zipcode returned 2 districts, need to find out the district that the user is apart of
//                  what can we do? 1. get the street and find the lat and long from the street, 2. geolocate
//                  3. we can show them the two districts and let them choose the district that they are apart of
//                  4. we can get them to enter the +4 for the zip code

                  $log.log('pop up modal', districtData);
//                  ModalService.openModal($stateParams.zipCode);

                  var modalDefaults = {
                    templateUrl: 'districtSearch/moreInfoModal.html',
                    backdrop: true,
                    keyboard: true,
                    controller: function ($scope, $log, $modalInstance) {
                      $scope.address = districtData.results[2];
                      $scope.zipCode = $stateParams.zipCode;
                      
                      $scope.ok = function () {
                        var fullAddress = $scope.$$childTail.$$childTail.streetName + ', ' + $scope.address;
                        SunlightService.getDistrictByAddress(fullAddress).then(function(modalDistrictData) {
                          $log.log('data in resolve get street, ', modalDistrictData);
                          district = {
                            state: modalDistrictData.results[0].state,
                            districtNumber: modalDistrictData.district,
                            count: modalDistrictData.count
                          };
                          $modalInstance.close();
                          return district;
                        });
                      };

                      $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                      };
                    }
                  };

                  $modal.open(modalDefaults);

                }
              });
            }
          }
        }}
    })
    .state('districtSearch.coords', {
      url: '/district-search?lat&long',
      views: {
        "childView": {
          controller: "districtSearchCtrl",
          templateUrl: "districtSearch/district-landing-template.html",
          resolve: {
            districtInfo: function ($log, $stateParams, SunlightService) {
              return SunlightService.getDistrictByCoords({lat: $stateParams.lat, long: $stateParams.long}).then(function (districtData) {
                var district;
                if (districtData.count == 1 || districtData.count === 0) {
                  district = {
                    state: districtData.results[0].state,
                    districtNumber: districtData.results[0].district
                  };
                  return {
                    district: district,
                    congressmen: districtData.results[0].congressmen,
                    count: districtData.count
                  };
                } else if (districtData.count === 2) {
//                  zipcode returned 2 districts, need to find out the district that the user is apart of
//                  what can we do? 1. get the street and find the lat and long from the street, 2. geolocate
//                  3. we can show them the two districts and let them choose the district that they are apart of
//                  4. we can get them to enter the +4 for the zip code

                  $log.log('pop up modal', districtData);
                  ModalService.openModal();
                  var districtsArray = _.map(districtData.results, function (districtNumber) {
                    return districtNumber.district;

                  });
                  district = {
                    state: districtData.results[0].state,
                    districtNumber: districtsArray,
                    count: districtData.count
                  };
                  return district;
                }
              });
            }
          }
        }
      }
    });
});