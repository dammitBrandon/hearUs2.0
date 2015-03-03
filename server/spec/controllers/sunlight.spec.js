var sunlight = require('../../lib/controllers/sunlight'),
  mongooseMock = require('mongoose-mock'),
  proxyquire = require('proxyquire'),
  sinon = require('sinon'),
  mongoose = require('mongoose');


describe('sunlight controller', function() {
  var Congressman;
  beforeEach(function() {
    Congressman = proxyquire('../../lib/models/Congressman');
  });
  
  it('exists', function() {
    expect(sunlight).toBeTruthy();
  });
});