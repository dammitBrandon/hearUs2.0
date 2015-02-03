angular.module('hearFilters', [])
.filter('chamber', function($log) {
    return function (chamber) {
     if (chamber === 'house') {
       return "House of Representatives";
     } else if (chamber === 'senate') {
       return "Senate";
     } else {
       return chamber.toUpperCase();
     }
    };
  });