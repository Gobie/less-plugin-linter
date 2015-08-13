module.exports = function(less) {

  function DuplicateProperties() {
    this._visitor = new less.visitors.Visitor(this);
  };

  DuplicateProperties.prototype = {
    isPreEvalVisitor: true,
    run: function (root) {
      this._rulesets = []
      return this._visitor.visit(root);
    },
    visitRuleset: function (rulesetNode, visitArgs) {
      this._rulesets.push({});
    },
    visitRulesetOut: function (rulesetNode, visitArgs) {
      this._rulesets.pop();
    },
    visitRule: function (ruleNode, visitArgs) {
      rulesetIndex = this._rulesets.length - 1
      if (this._rulesets[rulesetIndex].hasOwnProperty(ruleNode.name)) {
        throw {
          type: "Lint",
          message: "error duplicate rule `" + ruleNode.name + "`",
          index: ruleNode.index,
          filename: ruleNode.currentFileInfo.filename
        };
      }
      this._rulesets[rulesetIndex][ruleNode.name] = ruleNode.value
      return ruleNode;
    },
  };
  return DuplicateProperties;
};
