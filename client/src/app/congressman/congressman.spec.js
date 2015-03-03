describe('congressmanCtrl', function () {
  describe('init', function () {
    var congressmanCtrl, $rootScope, $scope, SunlightService;

    beforeEach(module('hearUs'));
    
    beforeEach(inject(function ($controller, _$rootScope_, _SunlightService_) {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        SunlightService = _SunlightService_
        congressmanCtrl = $controller('congressmanCtrl', {
          $scope: $scope,
          SunlightService: SunlightService,
          congressman: {
            "bioguide_id": "J000296",
            "birthday": "1972-10-31",
            "chamber": "house",
            "contact_form": "https://jolly.house.gov/contact/email-me",
            "crp_id": "N00035717",
            "district": 13,
            "facebook_id": "712496765463007",
            "fax": null,
            "fec_ids": [
              "H4FL13101"
            ],
            "first_name": "David",
            "gender": "M",
            "govtrack_id": "412603",
            "in_office": true,
            "last_name": "Jolly",
            "leadership_role": null,
            "middle_name": "W.",
            "name_suffix": null,
            "nickname": null,
            "oc_email": "Rep.Jolly@opencongress.org",
            "ocd_id": "ocd-division/country:us/state:fl/cd:13",
            "office": "2407 Rayburn House Office Building",
            "party": "R",
            "phone": "202-225-5961",
            "state": "FL",
            "state_name": "Florida",
            "term_end": "2015-01-03",
            "term_start": "2014-03-11",
            "thomas_id": "02199",
            "title": "Rep",
            "twitter_id": "USRepDavidJolly",
            "votesmart_id": 146146,
            "website": "http://jolly.house.gov"
          }
        });
      }));

    it('creates a congressman controller', function() {
      expect(congressmanCtrl).toBeDefined();
    });
    
    xdescribe('fetches bills sponsored by congressman', function() {
      beforeEach(function() {
        spyOn(SunlightService, 'billsSponsoredByCongressman');
      });
      expect(SunlightService.billsSponsoredByCongressman).toHaveBeenCalledWith(congressmanCtrl.congressman.bioguide_id);      
    });
    
  });
});