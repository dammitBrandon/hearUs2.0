describe('Service: TwitterService', function() {
  var TwitterService, $httpBackend;
  var baseUrl = '/api/twitter';
  
  beforeEach(module("hearUs"));
  beforeEach(inject(function (_TwitterService_, _$httpBackend_) {
    TwitterService = _TwitterService_;
    $httpBackend = _$httpBackend_;
  }));
  
  it('creates a TwitterService instance', function() {
    expect(TwitterService).toBeDefined();
  });
  
  describe('#searchTweets', function() {
    it('exists', function() {
      expect(angular.isFunction(TwitterService.searchTweets)).toBe(true);
    });
  });
});