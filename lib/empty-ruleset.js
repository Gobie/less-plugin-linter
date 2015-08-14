module.exports = function(less, utils) {

  function EmptyRuleset(options) {
    this.options = options;
    this._visitor = new less.visitors.Visitor(this);
  };

  EmptyRuleset.prototype = {
    isPreEvalVisitor: true,
    run: function (root) {
      return this._visitor.visit(root);
    },
    visitRuleset: function (node, visitArgs) {
      if (node.rules.length === 0) {
        if (utils.isIgnored(node.selectors[0].currentFileInfo.filename, this.options.ignored)) {
          return node;
        }
        var filename = node.selectors[0].currentFileInfo.filename;
        var index = node.selectors[0].elements[0].index;
        var pos = less.utils.getLocation(index, utils.readFile(filename));
        var value = node.selectors[0].elements[0].value;

        less.logger.error({
          type: 'Lint',
          message: 'empty ruleset `' + value + '`',
          index: index,
          pos: pos,
          filename: filename
        });
      }
      return node;
    }
  };
  return EmptyRuleset;
};
