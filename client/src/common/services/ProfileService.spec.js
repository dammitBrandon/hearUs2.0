describe('Service: profileService', function() {
  var profileService, $httpBackend;
  var baseUrl = '/api/session';
  
  beforeEach(module("hearUs"));
  beforeEach(inject(function(_profileService_, _$httpBackend_) {
    profileService = _profileService_;
    $httpBackend = _$httpBackend_;
  }));
  
  // error if any $http requests were made but not expected or made before the flush()
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
  
  it('creates a profileService instance', function() {
    expect(profileService).toBeDefined();
  });
});