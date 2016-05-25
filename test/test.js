'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var mockPrompts = {
  moduleName: 'testModule',
  moduleDesc: 'Test creation of module',
  install: true,
  hooks: ['theme'],
  extras: []
};

describe('general', function () {

  beforeEach(function(done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts(mockPrompts)
      .on('end', done);
  });

  it('the generator can be required without throwing', function () {
    // not testing the actual run of generators yet
    require('../generators/app');
  });

  // Test to see if all files are created.
  it('creates files and folders', function () {
    assert.file([
      mockPrompts.moduleName + '/' + mockPrompts.moduleName + '.info',
      mockPrompts.moduleName + '/' + mockPrompts.moduleName + '.module',
      mockPrompts.moduleName + '/' + mockPrompts.moduleName + '.install',
      mockPrompts.moduleName + '/templates'
    ]);
  });

});
