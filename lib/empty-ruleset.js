module.exports = function(less) {

  function EmptyRuleset() {
    this._visitor = new less.visitors.Visitor(this);
  };

  EmptyRuleset.prototype = {
    isPreEvalVisitor: true,
    run: function (root) {
      return this._visitor.visit(root);
    },
    visitRuleset: function (rulesetNode, visitArgs) {
      if (rulesetNode.rules.length === 0) {
        throw {
          type: "Lint",
          message: "error empty ruleset `" + rulesetNode.selectors[0].elements[0].value + "`",
          index: rulesetNode.selectors[0].elements[0].index,
          filename: rulesetNode.selectors[0].currentFileInfo.filename
        };
      }
      return rulesetNode;
    }
  };
  return EmptyRuleset;
};
