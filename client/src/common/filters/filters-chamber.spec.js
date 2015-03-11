describe('Filter: chamberFilter', function() {
  var chamberFilter;
  
  beforeEach(function() {
    module("hearUs");
    
    inject(function(_$filter_) {
      chamberFilter = _$filter_('chamberFilter');
    });
  });
  
  it('should exist', function() {
    expect(chamberFilter).not.toBeNull();
  });
  
  it('should return "House Representative" for "house"', function() {
    expect(chamberFilter("house")).toEqual("House Representative");
  });
  
  it('should return "Senate" for "senate"', function() {
    expect(chamberFilter("senate")).toEqual("Senator");
  });
});