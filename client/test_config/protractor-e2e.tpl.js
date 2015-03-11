var basePath = '../';
exports.config = {
  // The address of a running selenium server.
//  seleniumAddress: 'http://localhost:4444/wd/hub',

  baseUrl: 'http://localhost3000/#/',
  // Leave Selenium JAR location blank so that Protractor will used the correct
  // version defined in its package.json file and installed as part of the package.
  seleniumServerJar: null,

  // The port to start the selenium server on, or null if the server should
  // find its own unused port.
  seleniumPort: null,
  
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },
  
  framework: 'jasmine',
  
  // ----- Options to be passed to minijasminenode -----
  //
  // See the full list at https://github.com/juliemr/minijasminenode
  jasmineNodeOpts: {
    // onComplete will be called just before the driver quits.
    onComplete: null,
    // If true, display spec names.
    isVerbose: false,
    // If true, print colors to the terminal.
    showColors: true,
    // If true, include stack traces in failures. 
    includeStackTrace: true,
    // Default time to wait in ms before a test fails.
    defaultTimeoutInterval: 30000
  },

  // Spec patterns are relative to the location of the spec file. They may
  // include glob patterns.
  specs: [
    basePath + 'e2e_tests/**/*.e2e.js'
  ]
};
