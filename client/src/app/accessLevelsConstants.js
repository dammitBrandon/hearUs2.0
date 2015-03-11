angular.module('ACCESS', ['ui.router'])
  .constant('ACCESS_LEVELS', {
    authenticated: 1,
    anonymous: 0
  });