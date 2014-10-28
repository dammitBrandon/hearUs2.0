angular.module('templates-jade_app', ['districtSearch/districtSearch-template.html', 'issueSearch/issueSearch-template.html', 'landing/landing-template.html']);

angular.module("districtSearch/districtSearch-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("districtSearch/districtSearch-template.html",
    "<div><h4>The district page</h4><div><ul></ul></div></div>");
}]);

angular.module("issueSearch/issueSearch-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("issueSearch/issueSearch-template.html",
    "<div><h4>The issue page</h4><div><ul></ul></div></div>");
}]);

angular.module("landing/landing-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("landing/landing-template.html",
    "<div class=\"text-center\"><h1>The Hear Us Project</h1></div><div><div class=\"form-group\"><input id=\"search-item\" ng-model=\"searchTopic\" placeholder=\"Search for Specifc topic\" class=\"form-control\"/><!--button(ng-click=\"findTopic()\") Search for Issue--><button ng-click=\"findTopic()\">Search for Issue</button></div><div class=\"form-group\"><input id=\"district-search\" ng-model=\"zipCode\" placeholder=\"search for your district\" class=\"form-control\"/><button ng-click=\"findDistrictLanding()\">Find your District</button></div></div>");
}]);
