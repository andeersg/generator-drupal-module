'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var fs = require('fs');

var testDependency = 'test' + Math.random();
var dependencyAdded = false;
var dependencyPropTransformer = function(prop) {
  if (dependencyAdded) {
    return {dependency: ''};
  }
  dependencyAdded = true;
  return prop;
}

var mockPrompts = {
  moduleName: 'testModule',
  moduleDesc: 'Test creation of module',
  install: true,
  hooks: ['theme'],
  dependency: testDependency,
  extras: []
};
var opts = { dependencyPropTransformer: dependencyPropTransformer };

describe('yeoman:app', function () {
  var runGenerator = function(callback) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions(opts)
        .withPrompt(mockPrompts)
        .on('end', callback);
    };

  // Test to see if all files are created.
  it('creates files and folders', function (done) {
    runGenerator(function() {
      assert.file([
        mockPrompts.moduleName + '/' + mockPrompts.moduleName + '.info',
        mockPrompts.moduleName + '/' + mockPrompts.moduleName + '.module',
        mockPrompts.moduleName + '/' + mockPrompts.moduleName + '.install',
        mockPrompts.moduleName + '/templates'
      ]);
      assert.fileContent(mockPrompts.moduleName + '/' + mockPrompts.moduleName + '.info',
                           'dependencies[] = ' + testDependency);
      done();
    });
  });

  it('Creates files with the expected format and options', function(done) {
    opts = {};
    mockPrompts = {
      moduleName: 'testModule2',
      moduleDesc: 'Test creation of module',
      hooks: [],
      dependency: '',
      extras: []
    };
    runGenerator(function() {
      assert.file([
        mockPrompts.moduleName + '/' + mockPrompts.moduleName + '.info',
        mockPrompts.moduleName + '/' + mockPrompts.moduleName + '.module'
      ]);
      assert.noFile([
        mockPrompts.moduleName + '/' + mockPrompts.moduleName + '.install',
        mockPrompts.moduleName + '/templates'
      ]);
      assert.noFileContent(mockPrompts.moduleName + '/' + mockPrompts.moduleName + '.info',
                           'dependencies[]');
      done();
    });
  });
});
