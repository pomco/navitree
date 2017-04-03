# navitree
*create navigation tree menu in Browser or  NodeJs environment*
*small plugin that dependence on [jQuery](https://www.npmjs.com/package/jquery) and [jsdom](https://www.npmjs.com/package/jsdom)*

[![Build Status](https://travis-ci.org/pomco/navitree.svg)](https://travis-ci.org/pomco/navitree)
[![Coverage Status](https://coveralls.io/repos/github/pomco/navitree/badge.svg)](https://coveralls.io/repos/github/pomco/navitree)
[![Dependencies Status](https://david-dm.org/pomco/navitree.svg)](https://david-dm.org/pomco/navitree.svg)

[![NPM](https://nodei.co/npm/navitree.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/navitree/)

## example
see [demo](https://github.com/pomco/navitree/tree/master/demo/global/index.html)

## in Browser


### Script tag
```
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://github.com/pomco/navitree/tree/master/bulit/navitree.min.js"></script>
```
### html content
```
<div id="tree"></div>
```
### javascript statement
```
navitree.data(demoData).child("name").parent("parent").render("tree");
/**
 *  @  demoData an array that contain several of JSON Object.
 *  @  child("name"), treat the property (i.e. 'name') of JSON Object as 'child'
 *  @  similarly, parent("parent") ,treat the property (i.e 'parent') of JSON Object as 'parent'
 *  @  render("tree") , render the tree menu in html element whose id is 'tree'
 */
```
about 'demoData' e.g. see also some [demo](https://github.com/pomco/navitree/tree/master/demo/global/index.html).


## in NodeJs environment
### install
To include navitree in Node, first install with npm.
```
npm install navitree
```
### usage
```
var navitree = require('navitree');
navitree.data(demoData).child("name").parent("parent").render("tree");

console.log(navitree.html());
/**
 *  navitree.html() would return tree menu of html string ,such as <ul>.*</ul>
 */
console.log(navitree.tree());
/**
 *  navitree.tree() would return tree infomation of JSON Object
 */
```

## API 
```
// in node 
var navitree = require('navitree');
// or in Browser jsut use global navitree
navitree
```
### navitree.data(arr)
*set the data that is an array of JSON objects *

### navitree.child(str)
*set the property  which treating as children *

### navitree.parent(str)
*set the property  which treating as parent *

### navitree.url(str)
*set the property  form which getting a url content*
### navitree.render(str)
*tell which  id of  a html element  that  the tree menu would be rendered in *

### navitree.iframeName(str)
*set iframe's name *

### navitree.menuName(str)
*set the property from which getting the displayname content*

### navitree.tree()
*would return tree infomation of JSON Object*
### navitree.html()
*would return tree menu of html string ,such as <ul>.*</ul>*

## Run Unit Test
```
npm run gulp
```
