describe('login page', function() {
  it('should show the dashboard page after login', function() {
    browser.get('http://localhost:3000/#/sign_in');

    element(By.id('email')).sendKeys('test1@slalom.com');
    element(By.id('password')).sendKeys('password1');
    element(By.id('sign-in-btn')).click();

    browser.getCurrentUrl().then(function(url) {
      expect(url.indexOf('dashboard')).not.toBe(-1);
    });
  });
});