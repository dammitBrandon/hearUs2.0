angular.module('templates-jade_app', ['landing/landing-template.html']);

angular.module("landing/landing-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("landing/landing-template.html",
    "<div class=\"text-center\"><h1>The Hear Us Project</h1></div><div><div class=\"form-group\"><input id=\"search-item\" ng-model=\"searchTopic\" placeholder=\"Search for Specifc topic\" class=\"form-control\"/><button ng-click=\"findTopic()\">Search for Issue</button></div><div class=\"form-group\"><input id=\"districr-search\" ng-model=\"zipCode\" placeholder=\"search for your district\" class=\"form-control\"/><button ng-click=\"findDistrict()\">Find your District</button></div></div>");
}]);
