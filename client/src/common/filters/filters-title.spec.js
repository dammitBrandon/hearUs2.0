describe('Filter: titleFilter', function() {
  var titleFilter;
  var mockBill = {
    popular_title: "Popular",
    short_title: "Short",
    official_title: "Official"
  };

  beforeEach( function() {
    module("hearUs");

    inject(function(_$filter_) {
      titleFilter = _$filter_('titleFilter');
    });
  });
  
  it('should exist', function() {
    expect(titleFilter).not.toBeNull();
  });
  
  it('should return popular title, if present and not empty string', function() {
   expect(titleFilter(mockBill)).toEqual(mockBill.popular_title);
  });
  
  it('should return short title, if popular title null', function() {
    mockBill.popular_title = null;
    expect(titleFilter(mockBill)).toEqual(mockBill.short_title);
  });

  it('should return short title, if popular title present but empty string', function() {
    mockBill.popular_title = '';
    expect(titleFilter(mockBill)).toEqual(mockBill.short_title);
  });

  it('should return official title, if popular title and short title empty strings ', function() {
    mockBill.popular_title = '';
    mockBill.short_title = '';
    expect(titleFilter(mockBill)).toEqual(mockBill.official_title);
  });

  it('should return official title, if popular title is null and short title empty string ', function() {
    mockBill.popular_title = null;
    mockBill.short_title = '';
    expect(titleFilter(mockBill)).toEqual(mockBill.official_title);
  });

  it('should return official title, if popular title empty string and short title null', function() {
    mockBill.popular_title = '';
    mockBill.short_title = null;
    expect(titleFilter(mockBill)).toEqual(mockBill.official_title);
  });
});