var colors = require('colors/safe');
var utils = require('./utils');

var printSurroundingLines = function(filepath, line, surroundingLines) {
  var errorLineNumber, currentLineNumber;
  var marks = colors.red('>> ');
  var data = utils.readLineFromFile(filepath, line, surroundingLines);
  for (var i = 0; i < data.lines.length; i++) {
    currentLineNumber = data.startAt + i
    errorLineNumber = currentLineNumber === data.lineNumber ? colors.red(currentLineNumber) : currentLineNumber;
    console.log(marks + errorLineNumber + ': ' + data.lines[i]);
  };
}

var getSource = function(filepath, line, column) {
  return filepath + ' on line ' + line + ', column ' + column;
}

module.exports = {
  fail: function(msg) {
    throw msg;
  },
  log: function(msg) {
    console.log(colors.red(msg.type + 'Error') + ': ' + msg.message + ' in ' + getSource(msg.filename, msg.pos.line, msg.pos.column));
  },
  verbose: function(msg) {
    console.log(colors.red(msg.type + 'Error') + ': ' + msg.message + ' in ' + getSource(msg.filename, msg.pos.line, msg.pos.column));
    printSurroundingLines(msg.filename, msg.pos.line, 1);

    if (msg.prevPos) {
      console.log('previous position in ' + getSource(msg.filename, msg.prevPos.line, msg.prevPos.column));
      printSurroundingLines(msg.filename, msg.prevPos.line, 1);
    }
  }
}