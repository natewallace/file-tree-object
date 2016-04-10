'use strict';

var assert = require('assert');
var path = require('path');
var fto = require('../index');

describe('option tests', function () {
  /**
   * Test filePattern option
   */
  it('filePattern option', function () {
    var tree = fto.createTreeSync(path.join(__dirname, '/fixtures/test4'), { filePattern: /\.ts$/ });
    var totalCount = 0;
    var results = {};
    results[path.join(__dirname, '/fixtures/test4')] = 0;
    results[path.join(__dirname, '/fixtures/test4/sub')] = 0;
    results[path.join(__dirname, '/fixtures/test4/sub/file3.ts')] = 0;
    results[path.join(__dirname, '/fixtures/test4/sub2')] = 0;
    
    tree.forEach(function (item) {
      totalCount++;
      results[item.path] += 1;
    }, { recurse: true });

    assert.equal(totalCount, 4, 'total number of iterations incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test4')], 1, 'root directory incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test4/sub')], 1, 'sub directory incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test4/sub/file3.ts')], 1, 'file3 file incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test4/sub2')], 1, 'sub2 directory incorrect');
  });

  /**
   * Test directoryPattern option
   */
  it('directoryPattern option', function () {
    var tree = fto.createTreeSync(path.join(__dirname, '/fixtures/test4'), { directoryPattern: /sub$/ });
    var totalCount = 0;
    var results = {};
    results[path.join(__dirname, '/fixtures/test4')] = 0;
    results[path.join(__dirname, '/fixtures/test4/file1.txt')] = 0;
    results[path.join(__dirname, '/fixtures/test4/file2.css')] = 0;
    results[path.join(__dirname, '/fixtures/test4/sub')] = 0;
    results[path.join(__dirname, '/fixtures/test4/sub/file3.ts')] = 0;
    results[path.join(__dirname, '/fixtures/test4/sub/file4.js')] = 0;
    
    tree.forEach(function (item) {
      totalCount++;
      results[item.path] += 1;
    }, { recurse: true });

    assert.equal(totalCount, 6, 'total number of iterations incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test4')], 1, 'root directory incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test4/file1.txt')], 1, 'file1 file incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test4/file2.css')], 1, 'file2 file incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test4/sub')], 1, 'sub directory incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test4/sub/file3.ts')], 1, 'file3 file incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test4/sub/file4.js')], 1, 'file4 file incorrect');
  });

  /**
   * Test pattern option
   */
  it('pattern option', function () {
    var tree = fto.createTreeSync(path.join(__dirname, '/fixtures/test4'), { pattern: /(sub$)|(\.js$)/ });
    var totalCount = 0;
    var results = {};
    results[path.join(__dirname, '/fixtures/test4')] = 0;
    results[path.join(__dirname, '/fixtures/test4/sub')] = 0;
    results[path.join(__dirname, '/fixtures/test4/sub/file4.js')] = 0;
    
    
    tree.forEach(function (item) {
      totalCount++;
      results[item.path] += 1;
    }, { recurse: true });

    assert.equal(totalCount, 3, 'total number of iterations incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test4')], 1, 'root directory incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test4/sub')], 1, 'sub directory incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test4/sub/file4.js')], 1, 'file4 file incorrect');
  });

  /**
   * Test excludeEmptyDirectories option
   */
  it('excludeEmptyDirectories option', function () {
    var tree = fto.createTreeSync(path.join(__dirname, '/fixtures/test4'), { 
      filePattern: /\.ts$/,
      excludeEmptyDirectories: true
    });
    var totalCount = 0;
    var results = {};
    results[path.join(__dirname, '/fixtures/test4')] = 0;
    results[path.join(__dirname, '/fixtures/test4/sub')] = 0;
    results[path.join(__dirname, '/fixtures/test4/sub/file3.ts')] = 0;
    
    tree.forEach(function (item) {
      totalCount++;
      results[item.path] += 1;
    }, { recurse: true });

    assert.equal(totalCount, 3, 'total number of iterations incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test4')], 1, 'root directory incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test4/sub')], 1, 'sub directory incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test4/sub/file3.ts')], 1, 'file3 file incorrect');
  });
});
