var path = require('path');

/**
 * Constructor.
 */
function TreeNode(options) {
  var self = this;
  var opts = options || {};
  this.path = opts.path || '';
  this.isDirectory = opts.isDirectory;
  this.isFile = opts.isFile;
  this.children = opts.children || [];
  this.directories = [];
  this.files = [];
  this.children.forEach(function (element) {
    element.parent = self;
    if (element.isDirectory) {
      self.directories.push(element);
    } else if (element.isFile) {
      self.files.push(element);
    }
  });
}

/**
 * Get all children that match the given pattern.
 */
TreeNode.prototype.getChildrenByPattern = function (pattern, negate) {
  var result = [];
  this.children.forEach(function (element) {
    if (pattern.test(element.path) === !negate) {
      result.push(element);
    }
  });
  return result;
};

/**
 * Get all children that don't match the given pattern.
 */
TreeNode.prototype.getChildrenByNotPattern = function (pattern) {
  return this.getChildrenByPattern(pattern, true);
}

/**
 * Get all child files that match the given pattern.
 */
TreeNode.prototype.getFilesByPattern = function (pattern, negate) {
  var result = [];
  this.files.forEach(function (element) {
    if (pattern.test(element.path) === !negate) {
      result.push(element);
    }
  });
  return result;
};

/**
 * Get all files that don't match the given pattern.
 */
TreeNode.prototype.getFilesByNotPattern = function (pattern) {
  return this.getFilesByPattern(pattern, true);
}

/**
 * Get all child directories that match the given pattern.
 */
TreeNode.prototype.getDirectoriesByPattern = function (pattern, negate) {
  var result = [];
  this.directories.forEach(function (element) {
    if (pattern.test(element.path) === !negate) {
      result.push(element);
    }
  });
  return result;
};

/**
 * Get all directories that don't match the given pattern.
 */
TreeNode.prototype.getDirectoriesByNotPattern = function (pattern) {
  return this.getDirectoriesByPattern(pattern, true);
}

/**
 * Get child that has the given path.
 */
TreeNode.prototype.getChildByPath = function (filePath) {
  var relativePath = path.join(this.path, filePath);
  return this.children.find(function (element) {
    return (element.path === filePath || element.path === relativePath);
  });
};

/**
 * Iterate through this node and all descendants of this node.
 */
TreeNode.prototype.forEach = function (cb) {
  cb(this);
  this.children.forEach(function (element) {
    element.forEach(cb);
  });
};

/**
 * Iterate through this node and all descendant directories.
 */
TreeNode.prototype.forEachDirectory = function (cb) {
  if (this.isDirectory) {
    cb(this);
  }
  this.directories.forEach(function (element) {
    element.forEachDirectory(cb);
  });
};

/**
 * Iterate through this node and all descendant files.
 */
TreeNode.prototype.forEachFile = function (cb) {
  if (this.isFile) {
    cb(this);
  }
  this.children.forEach(function (element) {
    element.forEachFile(cb);
  });
};

module.exports = TreeNode;
