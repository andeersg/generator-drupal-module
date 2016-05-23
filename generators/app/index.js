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
      name: 'moduleName',
      message: 'What is the name of this module?',
      filter: function(input) {
        // Replace illegal characters with
        var handled = input.replace(/[^0-9A-Za-z .]/g, '');
        // Then replace spaces with underscore.
        handled = handled.replace(' ', '_');
        handled = handled.toLowerCase();

        self.niceName = input;

        return handled;
      }
    },{
      name: 'moduleDesc',
      message: 'Describe your module:'
    },{
      type: 'confirm',
      name: 'install',
      message: 'Would you like to add install file?',
      default: false
    },{
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
    },{
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

    var dependencies = [];
    var dependency = function(self) {
      var dep_quest = {
        name: "dependency",
        message: "Need any dependencies? (Leave blank to continue)"
      };
      self.prompt([dep_quest], function(props) {
        props = self.options.dependencyPropTransformer(props);
        if (props.dependency && props.dependency !== '') {
          dependencies.push(props.dependency);
          dependency(self);
        }
        else {
          self.dependencies = dependencies;
          done();
        }
      });
    };

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      this.moduleDesc = props.moduleDesc;
      this.install = props.install;

      this.extras = props.extras;

      var def_value_hooks = {
        perm: false,
        menu: false,
        theme: false,
        block: false
      };
      props.hooks.forEach(function(v) {
        def_value_hooks[v] = true;
      });
      this.hooks = def_value_hooks;

      dependency(self);
    }.bind(this));
  },


  default: function() {
    if (this.extras.indexOf('rules') != -1) {
      this.composeWith('drupal-module:rules', {
        options: {'module_name': this.moduleName}
      });
      this.log(chalk.green('Rules functionality added.'));
    }
  },

  writing: {
    app: function () {
      var context = {
        module_name: this.moduleName,
        module_desc: this.moduleDesc,
        hooks: this.hooks,
        install: this.install,
        dependencies: this.dependencies,
        niceName: this.niceName
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
