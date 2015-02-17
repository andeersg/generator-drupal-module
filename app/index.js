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
    }
    ,{
      type: 'confirm',
      name: 'hookPerm',
      message: 'Would you like to add hook_permissions()?',
      default: false
    },{
      type: 'confirm',
      name: 'install',
      message: 'Would you like to add install file?',
      default: false
    }];

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      this.moduleDesc = props.moduleDesc;
      this.hookMenu = props.hookMenu;
      this.hookTheme = props.hookTheme;
      this.hookBlocks = props.hookBlocks;
      this.hookPerm = props.hookPerm;
      this.install = props.install;

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
          theme: this.hookTheme,
          perm: this.hookPerm
        },
        install: this.install
      };
      this.mkdir(context.module_name);
      this.template('_info.php', context.module_name +'/' + context.module_name + '.info', context);
      this.template('_module.php', context.module_name +'/' + context.module_name + '.module', context);
      if (context.hooks.theme) {
        this.mkdir(context.module_name +'/templates');
      }
      if (context.install) {
        this.template('_install.php', context.module_name +'/' + context.module_name + '.install', context);
      }
    }
  }
});
