'use strict';

var assert = require('assert');
var path = require('path');
var fto = require('../index');

describe('promise tests', function () {
  /**
   * Test with an empty directory
   */
  it('empty directory', function (done) {
    fto.createTree(path.join(__dirname, '/fixtures/test1'))
      .then(function (tree) {
        assert.equal(tree.path, path.join(__dirname, '/fixtures/test1'), 'path is incorrect');
        assert.ok(!tree.parent, 'parent is incorrect');
        assert.equal(tree.isDirectory, true, 'isDirectory is incorrect');
        assert.equal(tree.isFile, false, 'isFile is incorrect');
        assert.ok(tree.children, 'children is incorrect');
        assert.equal(tree.children.length, 0, 'children.length is incorrect');
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });

  /**
   * Test with directory that contains files
   */
  it('directory with files', function (done) {
    fto.createTree(path.join(__dirname, '/fixtures/test2'))
      .then(function (tree) {
        assert.equal(tree.path, path.join(__dirname, '/fixtures/test2'), 'path is incorrect');
        assert.ok(!tree.parent, 'parent is incorrect');
        assert.equal(tree.isDirectory, true, 'isDirectory is incorrect');
        assert.equal(tree.isFile, false, 'isFile is incorrect');
        assert.ok(tree.children, 'children is incorrect');
        assert.equal(tree.children.length, 2, 'children.length is incorrect');

        var file1 = tree.getChildByPath(path.join(__dirname, '/fixtures/test2/file1.txt'));
        assert.ok(file1, 'could not find file1');
        assert.equal(tree, file1.parent, 'file1.parent is incorrect');
        assert.equal(file1.path, path.join(__dirname, '/fixtures/test2/file1.txt'), 'child path 1 is incorrect');
        assert.equal(file1.isFile, true, 'file1.isFile is incorrect');
        assert.equal(file1.isDirectory, false, 'file1.isDirectory is incorrect');
        assert.ok(file1.children, 'file1.children is incorrect');
        assert.equal(file1.children.length, 0, 'file1.children.length is incorrect');

        var file2 = tree.getChildByPath(path.join(__dirname, '/fixtures/test2/file2.txt'));
        assert.ok(file2, 'could not find file2');
        assert.equal(tree, file2.parent, 'file2.parent is incorrect');
        assert.equal(file2.path, path.join(__dirname, '/fixtures/test2/file2.txt'), 'child path 2 is incorrect');
        assert.equal(file2.isFile, true, 'file2.isFile is incorrect');
        assert.equal(file2.isDirectory, false, 'file2.isDirectory is incorrect');
        assert.ok(file2.children, 'file2.children is incorrect');
        assert.equal(file2.children.length, 0, 'file2.children.length is incorrect');

        done();
      })
      .catch(function (err) {
        done(err);
      });
  });

  /**
   * Test with directory that contains files and sub directories
   */
  it('directory with files and sub directories', function (done) {
    fto.createTree(path.join(__dirname, '/fixtures/test3'))
      .then(function (tree) {
        assert.equal(tree.path, path.join(__dirname, '/fixtures/test3'), 'path is incorrect');
        assert.ok(!tree.parent, 'parent is incorrect');
        assert.equal(tree.isDirectory, true, 'isDirectory is incorrect');
        assert.equal(tree.isFile, false, 'isFile is incorrect');
        assert.ok(tree.children, 'children is incorrect');
        assert.equal(tree.children.length, 3, 'children.length is incorrect');

        var file1 = tree.getChildByPath(path.join(__dirname, '/fixtures/test3/file1.txt'));
        assert.ok(file1, 'could not find file1');
        assert.equal(file1.path, path.join(__dirname, '/fixtures/test3/file1.txt'), 'child path 1 is incorrect');
        assert.equal(tree, file1.parent, 'file1.parent is incorrect');
        assert.equal(file1.isFile, true, 'file1.isFile is incorrect');
        assert.equal(file1.isDirectory, false, 'file1.isDirectory is incorrect');
        assert.ok(file1.children, 'file1.children is incorrect');
        assert.equal(file1.children.length, 0, 'file1.children.length is incorrect');

        var file2 = tree.getChildByPath(path.join(__dirname, '/fixtures/test3/file2.txt'));
        assert.ok(file2, 'could not find file2');
        assert.equal(file2.path, path.join(__dirname, '/fixtures/test3/file2.txt'), 'child path 2 is incorrect');
        assert.equal(tree, file2.parent, 'file2.parent is incorrect');
        assert.equal(file2.isFile, true, 'file2.isFile is incorrect');
        assert.equal(file2.isDirectory, false, 'file2.isDirectory is incorrect');
        assert.ok(file2.children, 'file2.children is incorrect');
        assert.equal(file2.children.length, 0, 'file2.children.length is incorrect');

        var sub = tree.getChildByPath('sub');
        assert.ok(sub, 'could not find sub');
        assert.equal(tree, sub.parent, 'sub.parent is incorrect');
        assert.ok(sub.children, 'sub.children is incorrect');
        assert.equal(sub.children.length, 3, 'sub.children.length is incorrect');
        
        var sub2 = sub.getChildByPath('sub2');
        assert.ok(sub2, 'could not find sub2');
        assert.equal(sub, sub2.parent, 'sub2.parent is incorrect');
        assert.ok(sub2.children, 'sub2.children is incorrect');
        assert.equal(sub2.children.length, 1, 'sub2.children.length is incorrect');

        var file3 = sub.getChildByPath('file3.txt');
        assert.ok(file3, 'could not find file3');
        assert.equal(file3.parent, sub, 'file3.parent is incorrect');

        var file4 = sub.getChildByPath('file4.txt');
        assert.ok(file4, 'could not find file4');
        assert.equal(file4.parent, sub, 'file4.parent is incorrect');
                    
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });

  /**
   * Test with directory that contains files and sub directories
   */
  it('large volume of directories and files loads ok', function (done) {
    fto.createTree(path.join(__dirname, '../node_modules'))
      .then(function (tree) {
        assert.ok(tree.children.length > 0, 'no files read in');
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });

  /**
   * Test with a directory that doesn't exist
   */
  it('bad directory', function (done) {
    fto.createTree(path.join(__dirname, '/fixtures/testx'))
      .then(function (tree) {
        done(new Error('error was not returned as expected'));
      })
      .catch(function (err) {
        assert.ok(err, 'err is incorrect');
        done();
      });
  });
});
