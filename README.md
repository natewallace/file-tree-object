# file-tree-object

## Overview
This is a node package that can be used to create an object with a tree structure that represents the local file system.
It uses an asynchronous pattern to create the tree structure to ensure fast and efficient performance.

## Guide
To install this package execute the following command in the console from within your project.
```
npm install --save file-tree-object
```

Once the package is installed you can start using it in your code.  There are three different patterns you can use to create 
a tree object which are illustrated below.

### Create tree using asynchronous pattern
```javascript
var fto = require('file-tree-object');

fto.createTree('MyFolder', function (err, tree) {
  if (err) {
    console.log('An error occured: ' + err);
  } else {
    tree.forEach(function (file) {
      console.log(file.path + '(' + (file.isFile ? 'file' : 'directory') + ')');
    });
  }
});
```

### Create tree using promise pattern
```javascript
var fto = require('file-tree-object');

fto.createTree('MyFolder')
  .then(function (tree) {
    tree.forEach(function (file) {
      console.log(file.path + '(' + (file.isFile ? 'file' : 'directory') + ')');
    });
  })
  .catch(function (err) {
    console.log('An error occured: ' + err);
  });
```

### Create tree using synchronous pattern
```javascript
var fto = require('file-tree-object');

try {
  var tree = fto.createTreeSync('MyFolder');
  tree.forEach(function (file) {
    console.log(file.path + '(' + (file.isFile ? 'file' : 'directory') + ')');
  });
} catch (err) {
  console.log('An error occured: ' + err);
}
```

### Filtering
There are also a number of options to filter out certain files or directories when a tree is created.
Below is an example of how to create a tree that will only be populated with files that have a .js extension.

```javascript
var fto = require('file-tree-object');

fto.createTree('MyFolder', { filePattern: /\.js$/ })
  .then(function (tree) {
    tree.forEachFile(function (file) {
      console.log(file.path + '(' + (file.isFile ? 'file' : 'directory') + ')');
    });
  })
  .catch(function (err) {
    console.log('An error occured: ' + err);
  });
```

See the API section for a list of possible options for filtering.

## API

### `file-tree-object.createTree(dir, options, cb)`
Type: `Function`

This function will create a new tree object that represents the given directory and its contents.
A [Promise](https://www.npmjs.com/package/promise) object will be returned from this function or you can specify a 
callback function in the cb parameter to be executed when the function completes.

The results of a successful call to this function will be a TreeNode object.

#### dir
Type: `String`

The path to the directory to create a tree object for.  This can be an absolute path or a relative path.  When a
relative path is used it will be interpreted as relative to the current working directory (process.cwd()).

#### options
Type: `Object`

This is an object that allows you to specify a number of differnt filters to be applied to the tree object that is created.

##### options.pattern
Type: `RegExp`

A regular expression that will be matched against both directories and files.  If the RegExp doesn't
match a given directory or file it will be excluded from the resulting tree.

##### options.filePattern
Type: `RegExp`

A regular expression that will be matched against files only.  If the RegExp doesn't
match a given file it will be excluded from the resulting tree.

##### options.directoryPattern
Type: `RegExp`

A regular expression that will be matched against directories only.  If the RegExp doesn't
match a given directory it will be excluded from the resulting tree.

##### options.excludeEmptyDirectories
Type: `Boolean`

When this is set to true, any empty directories will be excluded from the resulting tree.

#### cb
Type: `Function`

When provided, this function will be executed when the function has completed.  The function should have the standard
signature of function (err, result).

### `file-tree-object.createTreeSync(dir, options)`
Type: `Function`

This is the same as the createTree function except that it has a synchronous format.  Any errors that occur will be thrown
and the resulting tree is returned when the function call succeeds.

### `TreeNode`
Type: `Class`

The result of a call to createTree or createTreeSync is a single instance of this object which will have zero to many 
child nodes of the same type.

#### TreeNode.path
Type: `String`

The absolute path to the given file that this node represents.  The value is normalized and directories never have a trailing
slash at the end.

#### TreeNode.isDirectory
Type: `Boolean`

This property will be true when the node represents a directory.

#### TreeNode.isFile
Type: `Boolean`

This property will be true when the node represents a file.

#### TreeNode.children
Type: `Array`

This property is an array of TreeNode objects that are children to this node.  It will never be null.  If there are no children
then this property will be an empty array.

#### TreeNode.directories
Type: `Array`

This property is an array of TreeNode objects that are children of this node and are directories (isDirectory == true).
It will never be null.  If there are no child directories then this property will be an empty array.

#### TreeNode.files
Type: `Array`

This property is an array of TreeNode objects that are children of this node and are files (isFile == true).
It will never be null.  If there are no child files then this property will be an empty array.

#### TreeNode.forEach(cb)
Type: `Function`

This function will iterate through this node and all descendants of this node.

##### cb
Type: `Function`

The function that is executed for this node and each node in the collection of descendants.  It takes a single parameter
which is the node that is current in the iteration.

#### TreeNode.forEachDirectory(cb)
Type: `Function`

This function will iterate through this node and all directory descendants (isDirectory == true) of this node.  Only directories will be iterated
over.

##### cb
Type: `Function`

The function that is executed for this node and each node in the collection of directory descendants.  It takes a single parameter
which is the node that is current in the iteration.

#### TreeNode.forEachFile(cb)
Type: `Function`

This function will iterate through all file descendants (isFile == true) of this node.  Only files will be iterated
over.

##### cb
Type: `Function`

The function that is executed for each node in the collection of file descendants.  It takes a single parameter
which is the node that is current in the iteration.

#### TreeNode.getChildrenByPattern(pattern)
Type: `Function`

This function will return all immediate children of this node whose path matches the given pattern.

##### pattern
Type: `RegExp`

The regular expression to test against the paths properties.

#### TreeNode.getFilesByPattern(pattern)
Type: `Function`

This function will return all immediate child files of this node whose path matches the given pattern.

##### pattern
Type: `RegExp`

The regular expression to test against the paths properties.

#### TreeNode.getDirectoriesByPattern(pattern)
Type: `Function`

This function will return all immediate child directories of this node whose path matches the given pattern.

##### pattern
Type: `RegExp`

The regular expression to test against the paths properties.
