module.exports = function(less, utils) {

  function DuplicateProperty(options) {
    this.options = options;
    this._visitor = new less.visitors.Visitor(this);
  };

  DuplicateProperty.prototype = {
    isPreEvalVisitor: true,
    run: function (root) {
      this._levels = []
      return this._visitor.visit(root);
    },
    visitRuleset: function (node, visitArgs) {
      this._levels.push({});
    },
    visitRulesetOut: function (node, visitArgs) {
      this._levels.pop();
    },
    visitMixinDefinition: function (node, visitArgs) {
      this._levels.push({});
    },
    visitMixinDefinitionOut: function (node, visitArgs) {
      this._levels.pop();
    },
    visitRule: function (node, visitArgs) {
      if (utils.isIgnored(node.currentFileInfo.filename, this.options.ignored)) {
        return node;
      }

      var level = this._levels.length - 1;
      var ruleName = node.name[0] instanceof less.tree.Keyword ? node.name[0].value : node.name;
      if (this._levels[level][ruleName] != null) {
        var filename = node.currentFileInfo.filename;
        var index = node.index;
        var pos = less.utils.getLocation(index, utils.readFile(filename));
        var prevPos = less.utils.getLocation(this._levels[level][ruleName].index, utils.readFile(filename));

        less.logger.error({
          type: 'Lint',
          message: 'duplicate property `' + ruleName + '`',
          index: index,
          pos: pos,
          prevPos: prevPos,
          filename: filename
        });
      } else {
        this._levels[level][ruleName] = node;
      }
      return node;
    },
  };
  return DuplicateProperty;
};
