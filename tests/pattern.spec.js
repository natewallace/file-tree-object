'use strict';

var assert = require('assert');
var path = require('path');
var fto = require('../index');

describe('pattern tests', function () {
  /**
   * Test getChildrenByPattern function
   */
  it('get children by pattern', function () {
    var tree = fto.createTreeSync(path.join(__dirname, '/fixtures/test3'));
    var totalCount = 0;
    var results = {};
    results[path.join(__dirname, '/fixtures/test3/file1.txt')] = 0;
    results[path.join(__dirname, '/fixtures/test3/file2.txt')] = 0;
    results[path.join(__dirname, '/fixtures/test3/sub')] = 0;
    
    tree.getChildrenByPattern(/(sub$)|(\.txt$)/).forEach(function (item) {
      totalCount++;
      results[item.path] += 1;
    });

    assert.equal(totalCount, 3, 'total number of iterations incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test3/file1.txt')], 1, 'file1 file incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test3/file2.txt')], 1, 'file2 file incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test3/sub')], 1, 'sub directory incorrect');
  });

  /**
   * Test getChildrenByNotPattern function
   */
  it('get children by not pattern', function () {
    var tree = fto.createTreeSync(path.join(__dirname, '/fixtures/test3'));
    var totalCount = 0;
    var results = {};
    results[path.join(__dirname, '/fixtures/test3/file2.txt')] = 0;
    results[path.join(__dirname, '/fixtures/test3/sub')] = 0;
    
    tree.getChildrenByNotPattern(/file1\.txt$/).forEach(function (item) {
      totalCount++;
      results[item.path] += 1;
    });

    assert.equal(totalCount, 2, 'total number of iterations incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test3/file2.txt')], 1, 'file2 file incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test3/sub')], 1, 'sub directory incorrect');
  });
  
  /**
   * Test getFilesByPattern function
   */
  it('get files by pattern', function () {
    var tree = fto.createTreeSync(path.join(__dirname, '/fixtures/test3'));
    var totalCount = 0;
    var results = {};
    results[path.join(__dirname, '/fixtures/test3/file1.txt')] = 0;
    results[path.join(__dirname, '/fixtures/test3/file2.txt')] = 0;
    
    tree.getFilesByPattern(/(sub$)|(\.txt$)/).forEach(function (item) {
      totalCount++;
      results[item.path] += 1;
    });

    assert.equal(totalCount, 2, 'total number of iterations incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test3/file1.txt')], 1, 'file1 file incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test3/file2.txt')], 1, 'file2 file incorrect');
  });
  
  /**
   * Test getFilesByNotPattern function
   */
  it('get files by not pattern', function () {
    var tree = fto.createTreeSync(path.join(__dirname, '/fixtures/test3'));
    var totalCount = 0;
    var results = {};
    results[path.join(__dirname, '/fixtures/test3/file2.txt')] = 0;
    
    tree.getFilesByNotPattern(/file1\.txt$/).forEach(function (item) {
      totalCount++;
      results[item.path] += 1;
    });

    assert.equal(totalCount, 1, 'total number of iterations incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test3/file2.txt')], 1, 'file2 file incorrect');
  });

  /**
   * Test getDirectoriesByPattern function
   */
  it('get directories by pattern', function () {
    var tree = fto.createTreeSync(path.join(__dirname, '/fixtures/test3'));
    var totalCount = 0;
    var results = {};
    results[path.join(__dirname, '/fixtures/test3/sub')] = 0;
    
    tree.getDirectoriesByPattern(/(sub$)|(\.txt$)/).forEach(function (item) {
      totalCount++;
      results[item.path] += 1;
    });

    assert.equal(totalCount, 1, 'total number of iterations incorrect');
    assert.equal(results[path.join(__dirname, '/fixtures/test3/sub')], 1, 'sub directory incorrect');
  });

  /**
   * Test getDirectoriesByNotPattern function
   */
  it('get directories by not pattern', function () {
    var tree = fto.createTreeSync(path.join(__dirname, '/fixtures/test3'));
    var totalCount = 0;
    var results = {};
    
    tree.getDirectoriesByNotPattern(/sub$/).forEach(function (item) {
      totalCount++;
      results[item.path] += 1;
    });

    assert.equal(totalCount, 0, 'total number of iterations incorrect');
  });
});
