angular.module('hearUsFilters', [])
  .filter('titleFilter', function () {
    return function (bill) {
      if (!_.isNull(bill.popular_title) && !_.isEmpty(bill.popular_title)) {
        return bill.popular_title;
      } else if (!_.isNull(bill.short_title) && !_.isEmpty(bill.short_title)) {
        return bill.short_title;
      } else {
        return bill.official_title;
      }
    };
  })
  .filter('congressmanFilter', function ($filter, $log) {
    return function (congressmanObj) {
      var name = $filter('congressmanNameFilter')(congressmanObj);
      if (congressmanObj.chamber === 'house') {
        return 'Representative ' + name;
      } else if (congressmanObj.chamber === 'senate') {
        return 'Senator ' + name;
      }
    };
  })
  .filter('congressmanNameFilter', function ($log) {
    return function (congressmanObj) {
      if(_.isUndefined(congressmanObj)) {
        return;
      }
      var name = '';

      if (!_.isNull(congressmanObj.first_name) && !_.isUndefined(congressmanObj.first_name)) {
        name += congressmanObj.first_name;
      }

      if (!_.isNull(congressmanObj.middle_name) && !_.isUndefined(congressmanObj.middle_name) && !_.isEmpty(congressmanObj.middle_name)) {
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
        return "House Representative";
      } else if (chamber === 'senate') {
        return "Senator";
      } else {
        return chamber.toUpperCase();
      }
    };
  })
  .filter('summaryFilter', function ($log) {
    return function (billObj) {
      if (!_.isNull(billObj.summary_short) && !_.isUndefined(billObj.summary_short)) {
        return billObj.summary_short;
      } else if (!_.isNull(billObj.summary) && !_.isUndefined(billObj.summary)) {
        return billObj.summary;
      } else {
        return "There is no summary for this bill as of yet.  You can view this bill in its entirety by clicking the View as Pdf link below.";
      }
    };
  })
  .filter('shortSummaryFilter', function () {
    return function (billObj) {
      if (!_.isNull(billObj.summary_short) && !_.isUndefined(billObj.summary_short)) {
        return billObj.summary_short;
      }
      else {
        return "Continue to bill to view summary.";
      }
    };
  })
  .filter('capitalizeFilter', function ($log) {
    return function (string) {
      if (!_.isUndefined(string) && !_.isNull(string)) {
        return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
      } else {
        return string;
      }
    };
  })
  .filter('stateFilter', function ($log, STATES) {
    return function (state) {
      if (!_.isUndefined(STATES[state])) {
        return STATES[state];
      } else {
        return state;
      }
    };
  })
  .filter('addressFilter', function ($log) {
    return function(address) {
      var Country = /, USA/;
      
      var testForCountry = Country.exec(address);
      
      if (testForCountry) {
        return testForCountry.input.substring(0, testForCountry.index);
      } else {
        return address;
      }
      
    };
  });