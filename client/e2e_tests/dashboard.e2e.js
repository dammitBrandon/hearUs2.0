describe('dashboard page', function () {
  it('should navigate to the login page attempting to navigate to the dashboard while not logged in', function () {
    browser.get('http://localhost:3000/#/');
    
    element(By.linkText('Dashboard')).click();
    
    browser.getCurrentUrl().then(function(url) {
      expect(url.indexOf('sign_in')).not.toBe(-1);
    });
  });
});