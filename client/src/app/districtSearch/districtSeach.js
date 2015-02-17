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
                return districtData;

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
//                  Highly unlikely
                  return districtData;
                }
              });
            }
          }
        }
      }
    });
});