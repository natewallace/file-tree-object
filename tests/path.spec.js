'use strict';

var assert = require('assert');
var path = require('path');
var fto = require('../index');

describe('path tests', function () {
  /**
   * Test getPathFromRoot function
   */
  it('get path from root', function () {
    var tree = fto.createTreeSync(path.join(__dirname, '/fixtures/test3'));
    var sub2 = tree.getChildByPath('sub').getChildByPath('sub2');
    var file5 = sub2.getChildByPath('file5.txt');
    assert.equal(sub2.getPathFromRoot(), path.normalize('sub/sub2'), 'sub2 is incorrect');
    assert.equal(file5.getPathFromRoot(), path.normalize('sub/sub2/file5.txt'), 'file5 is incorrect');
  });

  /**
   * Test getPathBasename function
   */
  it('get path base name', function () {
    var tree = fto.createTreeSync(path.join(__dirname, '/fixtures/test3'));
    var sub2 = tree.getChildByPath('sub').getChildByPath('sub2');
    var file5 = sub2.getChildByPath('file5.txt');
    assert.equal(sub2.getPathBasename(), path.normalize('sub2'), 'sub2 is incorrect');
    assert.equal(file5.getPathBasename(), path.normalize('file5.txt'), 'file5 is incorrect');
  });

  /**
   * Test getRoot function
   */
  it('get root', function () {
    var tree = fto.createTreeSync(path.join(__dirname, '/fixtures/test3'));
    var sub2 = tree.getChildByPath('sub').getChildByPath('sub2');
    var file5 = sub2.getChildByPath('file5.txt');
    assert.equal(sub2.getRoot(), tree, 'sub2 is incorrect');
    assert.equal(file5.getRoot(), tree, 'file5 is incorrect');
  });

  /**
   * Test getByPath function
   */
  it('get by path', function () {
    var tree = fto.createTreeSync(path.join(__dirname, '/fixtures/test3'));
    var file5 = tree.getByPath('sub/sub2/file5.txt');
    assert.ok(file5, 'could not find file5');
    assert.equal(file5.path, path.join(__dirname, '/fixtures/test3/sub/sub2/file5.txt'), 'file5 is incorrect');
  });
});
