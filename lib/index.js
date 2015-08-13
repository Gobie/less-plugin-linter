var getEmptyRuleset = require("./empty-ruleset");
var getDuplicateProperties = require("./duplicate-properties");

module.exports = {
  install: function(less, pluginManager) {
    var EmptyRuleset = getEmptyRuleset(less);
    pluginManager.addVisitor(new EmptyRuleset());
    var DuplicateProperties = getDuplicateProperties(less);
    pluginManager.addVisitor(new DuplicateProperties());
  }
};
