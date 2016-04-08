'use strict';

var assert = require('assert');
var path = require('path');
var fto = require('../index');

describe('forEach tests', function () {
  /**
   * Test generic forEach
   */
  it('iterate through files and directories', function () {
    var tree = fto.createTreeSync(path.join(__dirname, '/fixtures/test3'));
    var totalCount = 0;
    var results = {};
    results[path.join(__dirname, '/fixtures/test3')] = 0;
    results[path.join(__dirname, '/fixtures/test3/sub')] = 0;
    results[path.join(__dirname, '/fixtures/test3/file1.txt')] = 0;
    results[path.join(__dirname, '/fixtures/test3/file2.txt')] = 0;
    results[path.join(__dirname, '/fixtures/test3/sub/sub2')] = 0;
    results[path.join(__dirname, '/fixtures/test3/sub/sub2/file5.txt')] = 0;
    results[path.join(__dirname, '/fixtures/test3/sub/file3.txt')] = 0;
    results[path.join(__dirname, '/fixtures/test3/sub/file4.txt')] = 0;
    
    tree.forEach(function (item) {
      totalCount++;
      results[item.path] += 1;
    });

    assert.equal(totalCount, 8, 'total number of iterations incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test3')], 1, 'root directory incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test3/sub')], 1, 'sub directory incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test3/file1.txt')], 1, 'file1 file incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test3/file2.txt')], 1, 'file2 file incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test3/sub/sub2')], 1, 'sub2 directory incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test3/sub/sub2/file5.txt')], 1, 'file5 file incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test3/sub/file3.txt')], 1, 'file3 file incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test3/sub/file4.txt')], 1, 'file4 file incorrect');
  });

  /**
   * Test file forEach
   */
  it('iterate through files', function () {
    var tree = fto.createTreeSync(path.join(__dirname, '/fixtures/test3'));
    var totalCount = 0;
    var results = {};
    results[path.join(__dirname, '/fixtures/test3/file1.txt')] = 0;
    results[path.join(__dirname, '/fixtures/test3/file2.txt')] = 0;
    results[path.join(__dirname, '/fixtures/test3/sub/file3.txt')] = 0;
    results[path.join(__dirname, '/fixtures/test3/sub/file4.txt')] = 0;
    results[path.join(__dirname, '/fixtures/test3/sub/sub2/file5.txt')] = 0;
    
    tree.forEachFile(function (item) {
      totalCount++;
      results[item.path] += 1;
    });

    assert.equal(totalCount, 5, 'total number of iterations incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test3/file1.txt')], 1, 'file1 file incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test3/file2.txt')], 1, 'file2 file incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test3/sub/file3.txt')], 1, 'file3 file incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test3/sub/file4.txt')], 1, 'file4 file incorrect');
  });

  /**
   * Test directory forEach
   */
  it('iterate through directories', function () {
    var tree = fto.createTreeSync(path.join(__dirname, '/fixtures/test3'));
    var totalCount = 0;
    var results = {};
    results[path.join(__dirname, '/fixtures/test3')] = 0;
    results[path.join(__dirname, '/fixtures/test3/sub')] = 0;
    results[path.join(__dirname, '/fixtures/test3/sub/sub2')] = 0;
    
    tree.forEachDirectory(function (item) {
      totalCount++;
      results[item.path] += 1;
    });

    assert.equal(totalCount, 3, 'total number of iterations incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test3')], 1, 'root directory incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test3/sub')], 1, 'sub directory incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test3/sub/sub2')], 1, 'sub2 directory incorrect');
  });
});
