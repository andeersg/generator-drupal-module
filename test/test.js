'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var fs = require('fs');

var mockPrompts = {
  moduleName: 'testModule',
  moduleDesc: 'Test creation of module',
  install: true,
  hooks: [false, false, true, false]
};


describe('yeoman:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt(mockPrompts)
      .on('end', done);
  });

  // Test to see if all files are created.
  it('creates files', function () {
    assert.file([
      mockPrompts.moduleName + '/' + mockPrompts.moduleName + '.info',
      mockPrompts.moduleName + '/' + mockPrompts.moduleName + '.module',
      mockPrompts.moduleName + '/' + mockPrompts.moduleName + '.install',
      mockPrompts.moduleName + '/templates'
    ]);
  });
});
