!function(f){
	"use strict";
	if(typeof module ==='object' && typeof module.exports ==='object'){
		module.exports = f();
	}else{
		var _global_window = window ? window : {};
		_global_window.demoData = f();
	}
}(function(){
	/* istanbul ignore next */
	var obj  = [
		{
			"name" : "类A",
			"parent" : "A",
			"url" : "",
			"alias" :"classA",
			"aliasparent" : ""
		},
		{
			"name" : "类B",
			"parent" : "B",
			"url" : "",
			"alias" :"classB",
			"aliasparent" : "classC"
		},
		{
			"name" : "类C",
			"parent" : "C",
			"url" : "",
			"alias" :"classC",
			"aliasparent" : ""
		},
		{
			"name" : "类A(first-child)",
			"parent" : "类A",
			"url" : "./html/a1.html",
			"alias" :"classA(first-child)",
			"aliasparent" : "classA"
		},
		{
			"name" : "类A(second-child)",
			"parent" : "类A",
			"url" : "./html/a2.html",
			"alias" :"classA(second-child)",
			"aliasparent" : "classA"
		},
		{
			"name" : "类B(first-child)",
			"parent" : "类B",
			"url" : "",
			"alias" :"classB(first-child)",
			"aliasparent" : "classB"
		},
		{
			"name" : "类B(second-child)",
			"parent" : "类B",
			"url" : "",
			"alias" :"classB(second-child)",
			"aliasparent" : "classB"
		},
		{
			"name" : "类B(first-great-grandchild)",
			"parent" : "类B(first-child)",
			"url" : "./html/b11.html",
			"alias" :"classB(first-great-grandchild)",
			"aliasparent" : "classB"
		},
		{
			"name" : "类B(second-great-grandchild)",
			"parent" : "类B(first-child)",
			"url" : "./html/b12.html",
			"alias" :"classB(second-great-grandchild)",
			"aliasparent" : "classB"
		},
		{
			"name" : "类B(third-great-grandchild)",
			"parent" : "类B(second-child)",
			"url" : "./html/b13.html",
			"alias" :"classB(third-great-grandchild)",
			"aliasparent" : "classB"
		},
		{
			"name" : "类C(first-child)",
			"parent" : "类C",
			"url" : "./html/c1.html",
			"alias" :"classC(first-child)",
			"aliasparent" : "classA"
		}
	];
	return obj;
});	


