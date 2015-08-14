var extend = require('extend');
var utils = require('./utils');
var reporters = require('./reporters');
var rules = require('./rules');

var LessPluginLinter = function(options) {
  this.setOptions(options);
};

LessPluginLinter.prototype.install = function(less, pluginManager) {
  var Rule;
  for (var key in this.options.rules) {
    if (typeof this.options.rules[key] === 'function') {
      Rule = this.options.rules[key](less, utils);
    } else if (rules[key]) {
      if (this.options.rules[key] !== true) continue;
      Rule = rules[key](less, utils);
    } else {
      throw {
        message: 'unknown rule or rule option for `' + key + '`'
      }
    }
    pluginManager.addVisitor(new Rule(this.options));
  }
}

LessPluginLinter.prototype.setOptions = function(options) {
  this.options = options || {};
  this.options.rules = extend({}, rules, this.options.rules);
}

LessPluginLinter.prototype.minVersion = [2, 0, 0];

LessPluginLinter.reporters = reporters;

module.exports = LessPluginLinter
