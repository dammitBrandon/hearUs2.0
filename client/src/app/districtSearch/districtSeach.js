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
          templateUrl: "templates/child-view-container.html"
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
            districtInfo: function ($log, $stateParams, sunlightService, $modal, ModalService) {
              return sunlightService.getDistrictByZipCode($stateParams.zipCode).then(function (districtData) {
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
                } else if (districtData.count > 1 ) {
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
            districtInfo: function ($log, $stateParams, sunlightService) {
              return sunlightService.getDistrictByCoords({lat: $stateParams.lat, long: $stateParams.long}).then(function (districtData) {
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
                } else if (districtData.count > 1) {
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