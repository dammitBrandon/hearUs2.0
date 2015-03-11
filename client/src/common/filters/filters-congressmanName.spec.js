describe('Filter: congressmanName', function() {
  var congressmanNameFilter;
  var congressmanObj =  {
    "bioguide_id": "D000096",
    "chamber": "house",
    "district": 7,
    "fax": "202-225-5641",
    "first_name": "Danny",
    "last_name": "Davis",
    "middle_name": "K.",
    "oc_email": "Rep.Davis@opencongress.org",
    "office": "2159 Rayburn House Office Building",
    "party": "D",
    "phone": "202-225-5006",
    "state": "IL",
    "website": "http://www.davis.house.gov",
    "_id": "54ec9c80e0f78d73bd00019c",
    "__v": 0
  };
  
  beforeEach(function () {
    module("hearUs");

    inject(function (_$filter_) {
      congressmanNameFilter = _$filter_('congressmanNameFilter');
    });
  });

  it('should exist', function () {
    expect(congressmanNameFilter).not.toBeNull();
  });
  
  it('should return whole name with middle name', function() {
    expect(congressmanNameFilter(congressmanObj)).toEqual(congressmanObj.first_name + " " + congressmanObj.middle_name + " " + congressmanObj.last_name);
  });
  
  it('should return first and last name if middle name is empty string', function() {
    congressmanObj.middle_name = '';
    
    expect(congressmanNameFilter(congressmanObj)).toEqual(congressmanObj.first_name + " " + congressmanObj.last_name);
  });
});