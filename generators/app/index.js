'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({

  initializing: function () {
    this.pkg = require('../../package.json');
  },

  prompting: function () {
    // var self = this;

    this.log(yosay(
      'Welcome to the groovy ' + chalk.red('Drupal Module') + ' generator!'
    ));

    var prompts = [{
      name: 'moduleName',
      message: 'Name:'
    }, {
      name: 'moduleMachine',
      message: 'Machine-name:',
      default: function (answers) {
        var handled = answers.moduleName.replace(/[^0-9A-Za-z .]/g, '');
        handled = handled.replace(/ /g, '_');
        handled = handled.toLowerCase();
        return handled;
      },
      validate: function (answer) {
        if (answer.match(/^[a-z0-9_]+$/)) {
          return true;
        }
        return 'Machine names can only contain a-z 0-9 and underscores.';
      }
    }, {
      name: 'moduleDesc',
      message: 'Description:'
    }, {
      type: 'confirm',
      name: 'install',
      message: 'Would you like to add install file?',
      default: false
    }, {
      type: 'checkbox',
      name: 'hooks',
      message: 'Would you like to add some hooks?',
      choices: [
        {
          name: 'hook_permission',
          value: 'perm',
          default: false
        },
        {
          name: 'hook_menu',
          value: 'menu',
          default: false
        },
        {
          name: 'hook_theme',
          value: 'theme',
          default: false
        },
        {
          name: 'hook_block_[info|view]',
          value: 'block',
          default: false
        }
      ]
    }, {
      name: 'dependency',
      message: 'Add dependencies (separate with a space, leave blank to skip):'
    }, {
      type: 'checkbox',
      name: 'extras',
      message: 'Do you want extra features?',
      choices: [
        {
          name: 'Rules hooks',
          value: 'rules',
          default: false
        }
      ]
    }];

    return this.prompt(prompts)
      .then(function (answers) {
        this.moduleName = answers.moduleName;
        this.moduleMachine = answers.moduleMachine;
        this.moduleDesc = answers.moduleDesc;
        this.install = answers.install;
        this.dependencies = answers.dependency.split(' ');

        this.extras = answers.extras;

        var def_value_hooks = {
          perm: false,
          menu: false,
          theme: false,
          block: false
        };
        answers.hooks.forEach(function (v) {
          def_value_hooks[v] = true;
        });
        this.hooks = def_value_hooks;

      }.bind(this));
  },


/*
  default: function() {
    if (this.extras.indexOf('rules') != -1) {
      this.composeWith('drupal-module:rules', {
        options: {'module_name': this.moduleName}
      });
      this.log(chalk.green('Rules functionality added.'));
    }
  },
*/

  writing: {
    app: function () {
      var context = {
        module_name: this.moduleMachine,
        module_desc: this.moduleDesc,
        hooks: this.hooks,
        install: this.install,
        dependencies: this.dependencies,
        niceName: this.moduleName
      };
      mkdirp(context.module_name);
      this.fs.copyTpl(
        this.templatePath('_info.php'),
        this.destinationPath(context.module_name + '/' + context.module_name + '.info'),
        context
      );
      this.fs.copyTpl(
        this.templatePath('_module.php'),
        this.destinationPath(context.module_name + '/' + context.module_name + '.module'),
        context
      );
      if (context.hooks.theme) {
        mkdirp(context.module_name + '/templates');
      }
      if (context.install) {
        this.template('_install.php', context.module_name + '/' + context.module_name + '.install', context);
        this.fs.copyTpl(
          this.templatePath('_install.php'),
          this.destinationPath(context.module_name + '/' + context.module_name + '.install'),
          context
        );
      }
    }
  }
});
