'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
  writing: {
    app: function () {
      var context =  {
        module_name: this.options.module_name
      };
      this.template('rules.inc', context.module_name +'/' + context.module_name + '.rules.inc', context);
    }
  }
});
