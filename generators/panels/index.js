'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../../package.json');
    this.options.dependencyPropTransformer = this.options.dependencyPropTransformer || function(prop) {
      return prop;
    };
  },

  prompting: function () {
    var done = this.async();
    var self = this;

    this.log(yosay(
      'Welcome to the groovy ' + chalk.red('Drupal Module') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'test',
      message: 'Would you like to add this stuff?',
      default: false
    }];

    this.prompt(prompts, function (props) {
      done();
    }.bind(this));
  },

  writing: {
    app: function () {}
  }
});
