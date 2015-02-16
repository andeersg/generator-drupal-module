'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the groovy ' + chalk.red('Drupal Module') + ' generator!'
    ));

    var prompts = [{
      name: 'moduleName',
      message: 'What is the name of this module?'
    },{
      name: 'moduleDesc',
      message: 'Describe your module:'
    },{
      type: 'confirm',
      name: 'hookMenu',
      message: 'Would you like to add hook_menu()?',
      default: true
    },{
      type: 'confirm',
      name: 'hookTheme',
      message: 'Would you like to add hook_theme()?',
      default: true
    },{
      type: 'confirm',
      name: 'hookBlocks',
      message: 'Would you like to add block hooks?',
      default: false
    }];

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      this.moduleDesc = props.moduleDesc;
      this.hookMenu = props.hookMenu;
      this.hookTheme = props.hookTheme;
      this.hookBlocks = props.hookBlocks;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var context = { 
        module_name: this.moduleName,
        module_desc: this.moduleDesc,
        hooks: {
          block: this.hookBlocks,
          menu: this.hookMenu,
          theme: this.hookTheme
        }
      };
      this.mkdir(context.module_name);
      this.template('_info.php', context.module_name +'/' + context.module_name + '.info', context);
      this.template('_module.php', context.module_name +'/' + context.module_name + '.module', context);
    }
  }
});
