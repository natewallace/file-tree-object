var createTree = require('./createTree');
var deasync = require('deasync');

module.exports = function (dir, options) {
  var finish = false;
  var error = null;
  var tree = null;

  createTree(dir, options, function (err, result) {
    finish = true;
    error = err;
    tree = result;
  });

  deasync.loopWhile(function () {
    return !finish;
  });

  if (error) {
    throw err;
  }
  return tree;
};
