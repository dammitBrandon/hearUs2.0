angular.module('services.authHttpIntercept', [
  'services.ProfileApi'
])
  .run(function ($rootScope, $log, $state, profileService) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if(!_.isUndefined(toState.access_level)) {
        $log.log('this state has access levels');
        if (!profileService.isAuthorized(toState.access_level)) {
          $log.log('not authorized check to see if logged in');
          if (profileService.isLoggedIn()) {
            // The user is logged in but does not have permissions
            // to navigate to this state
            $log.log('logged in but doesnt have rights');
            event.preventDefault();
            $state.go('landingPage');
          } else {
            $state.go('auth.sign_in');
          }
        }
      }
      return;
    });
  })
  .factory('authHttpInterceptService', function ($rootScope, $log) {
    return {
      'response': function (responseObj) {
        $log.log('authHttpInterceptService#response', responseObj);
        return responseObj;
      },

      'responseError': function (responseErrObj) {
        $log.log('authHttpInterceptService#responseError', responseErrObj);
        return responseErrObj;
      }
    };
  })
  .config(function authHttpInterceptServiceConfig($httpProvider) {
    $httpProvider.interceptors.push('authHttpInterceptService');
  });