angular.module('hearUsFilters', [])
  .filter('titleFilter', function () {
    return function (bill) {
      if(!_.isNull(bill.popular_title)){
        return bill.popular_title;
      } else if (!_.isNull(bill.short_title)) {
        return bill.short_title;
      } else {
        return bill.official_title;
      }
    };
  })
  .filter('congressmanFilter', function($filter, $log) {
    return function (congressmanObj) {
      var name = $filter('congressmanNameFilter')(congressmanObj);
      if (congressmanObj.chamber === 'house') {
        return 'Representative ' + name; 
      } else if (congressmanObj.chamber === 'senate') {
        return 'Senator ' + name;
      }
    };
  })
  .filter('congressmanNameFilter', function($log) {
    return function (congressmanObj) {
      var name = '';
      
      if (!_.isNull(congressmanObj.first_name) && !_.isUndefined(congressmanObj.first_name)) {
        name += congressmanObj.first_name;
      } 
      
      if (!_.isNull(congressmanObj.middle_name) && !_.isUndefined(congressmanObj.middle_name)) {
        name += " " + congressmanObj.middle_name;
      }
      
      if (!_.isNull(congressmanObj.last_name) && !_.isUndefined(congressmanObj.last_name)) {
        name += " " + congressmanObj.last_name;
      }
      
      return name;
    };
  })
  .filter('chamberFilter', function ($log) {
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
  .filter('stateFilter', function ($log, states) {
    return function (state) {
      if (!_.isUndefined(states[state])) {
        return states[state];
      } else {
        return state;
      }
    };
  });