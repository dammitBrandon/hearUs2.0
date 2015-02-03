angular.module('hearUsFilters', [])
.filter('chamberFilter', function($log) {
    return function (chamber) {
     if (chamber === 'house') {
       return "House of Representatives";
     } else if (chamber === 'senate') {
       return "Senate";
     } else {
       return chamber.toUpperCase();
     }
    };
  })
.filter('stateFilter', function($log, states) {
    return function (state) {
      if (!_.isUndefined(states[state])){
        return states[state];
      } else {
        return state;
      }
    };
  });