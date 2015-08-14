var fs = require('fs');

module.exports = {
  readFile: function (filename) {
    return fs.readFileSync(filename).toString();
  },
  readLineFromFile: function(filename, lineNumber, surroundingLines) {
    var content = this.readFile(filename);
    var linefeed = content.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
    var lines = content.split(linefeed);
    var startLine = lineNumber - surroundingLines,
        endLine = lineNumber + surroundingLines;

    if (startLine < 0){
      startLine = 0;
    }
    if (endLine >= lines.length){
      endLine = lines.length - 1;
    }

    return {
      lines: lines.slice(startLine, endLine + 1),
      startAt: startLine,
      endAt: endLine,
      lineNumber: lineNumber
    };
  },
  isIgnored: function(filename, ignored) {
    if (!Array.isArray(ignored)) {
      return false;
    }
    return -1 !== ignored.indexOf(filename)
  }
};
