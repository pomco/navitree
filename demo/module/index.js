var navitree = require('../../src/navitree.js');
var obj = require('../demodata/data.js');
console.log(navitree.Version);
console.log(navitree.Author);

navitree.extend("maketreedefault",function(){
	navitree.data(obj).child("child").parent("parent").url("url").iframeName("showpage").render("tree");
});

navitree.maketreedefault();
navitree.child("name");
console.log(navitree.tree());
console.log(navitree.html());

