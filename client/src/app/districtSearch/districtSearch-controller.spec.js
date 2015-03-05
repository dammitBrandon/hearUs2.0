describe('districtSearchCtrl', function() {
  describe('init', function() {
    var districtSearchCtrl, $rootScope, $scope, modal, districtData;
    
    beforeEach(module('hearUs'));
    
    beforeEach( inject(function($controller, _$rootScope_, $modal) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      districtSearchCtrl = $controller('districtSearchCtrl', {
        $scope: $scope,
        districtInfo: {
          count: 1,
          district: 7,
          congressmen: [
            {
              first_name: "Mark",
              middle_name: "Steven",
              last_name: "Kirk",
              chamber: 'senate'
            },
            {
              first_name: "Danny",
              middle_name: "K.",
              last_name: "Davis",
              chamber: 'house'
            }
          ] 
        },
        $modal: $modal
      });
    }));
    
    it('creates a districtSearch controller', function() {
      expect(districtSearchCtrl).toBeDefined();
    });
    
    describe('#initDistrictSearch, district.count <= 1', function(){
      it('sets district', function() {
        expect($scope.district).toEqual(7);
        
      });
      
      it('sets congressmen', function() {
        expect($scope.senators[0].first_name).toEqual("Mark");
        expect($scope.senators[0].middle_name).toEqual("Steven");
        expect($scope.senators[0].last_name).toEqual("Kirk");
        
        expect($scope.houseRep.first_name).toEqual("Danny");
        expect($scope.houseRep.middle_name).toEqual("K.");
        expect($scope.houseRep.last_name).toEqual("Davis");
      });
      
      
    });
    
    describe("#initDistrictSearch, district.count > 1", function() {
      beforeEach( inject(function($controller, $rootScope, _$modal_) {
        $scope = $rootScope.$new();
        modal = _$modal_;
        
        spyOn(modal, 'open');
        districtSearchCtrl = $controller('districtSearchCtrl', {
          $scope: $scope,
          districtInfo: {
            count: 2
          },
          $modal: modal
        });
      }));
      it('opens up modal to get additional information', function(){
        expect(modal.open).toHaveBeenCalled();
      });
    });
    
  });
});