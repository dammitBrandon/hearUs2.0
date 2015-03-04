describe('Service: twitterService', function() {
  var twitterService, $httpBackend;
  var baseUrl = '/api/twitter/';
  
  beforeEach(module("hearUs"));
  beforeEach(inject(function (_twitterService_, _$httpBackend_) {
    twitterService = _twitterService_;
    $httpBackend = _$httpBackend_;
  }));
  
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
  
  it('creates a twitterService instance', function () {
    expect(twitterService).toBeDefined();
  });
});