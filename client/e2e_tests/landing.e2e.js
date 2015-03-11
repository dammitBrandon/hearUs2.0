describe('Landing page', function() {
  beforeEach(function(){
    browser.get('http://localhost:3000/#/');
  });
  
  describe('Issue Search', function() {
    it('should have a disabled search button for issue search when input is empty', function() {
      element(By.model('searchTopic')).sendKeys('');
      var issueSearchButton = element(By.buttonText('Find'));
      expect(issueSearchButton.isEnabled()).toBe(false);
    });

    it('should have enabled the button when text has been entered', function() {
      element(By.model('searchTopic')).sendKeys('testing');
      var issueSearchButton = element(By.buttonText('Find'));
      expect(issueSearchButton.isEnabled()).toBe(true);
    });
  });

  describe('District Search', function() {
    it('should have a disabled search button for district search when input is empty', function() {
      element(By.model('zipCode')).sendKeys('');
      var districtSearchButton = element(By.buttonText('District'));
      expect(districtSearchButton.isEnabled()).toBe(false);
    });

    it('should be a disabled button when non number character has been entered', function() {
      element(By.model('zipCode')).sendKeys('f');
      var districtSearchButton = element(By.buttonText('District'));
      expect(districtSearchButton.isEnabled()).toBe(false);
    });

    it('should be a disabled button when less than 5 number characters have been entered', function() {
      element(By.model('zipCode')).sendKeys('1111');
      var districtSearchButton = element(By.buttonText('District'));
      expect(districtSearchButton.isEnabled()).toBe(false);
    });

    it('should be a enabled button when 5 number characters have been entered', function() {
      element(By.model('zipCode')).sendKeys('20744');
      var districtSearchButton = element(By.buttonText('District'));
      expect(districtSearchButton.isEnabled()).toBe(true);
    });
  })
});