!function(f){
	"use strict";
	/* istanbul ignore next */
	if(typeof module ==='object' && typeof module.exports ==='object'){
		module.exports = f();
	}else{
		var _global_window = window ? window : {};
		_global_window.demoData_01 = f();
	}
}(function(){
	/* istanbul ignore next */
	var obj  = [
		{
			"name" : "类E",
			"parent" : "E",
			"url" : "",
			"alias" :"classE",
			"aliasparent" : "classF"
		},
		{
			"name" : "类F",
			"parent" : "F",
			"url" : "",
			"alias" :"classF",
			"aliasparent" : "classH"
		},
		{
			"name" : "类H",
			"parent" : "H",
			"url" : "",
			"alias" :"classH",
			"aliasparent" : "classE"
		},
		{
			"name" : "类E(first-child)",
			"parent" : "类E",
			"url" : "./html/a1.html",
			"alias" :"classE(first-child)",
			"aliasparent" : "classE"
		},
		{
			"name" : "类E(second-child)",
			"parent" : "类E",
			"url" : "./html/a2.html",
			"alias" :"classE(second-child)",
			"aliasparent" : "classE"
		},
		{
			"name" : "类F(first-child)",
			"parent" : "类F",
			"url" : "",
			"alias" :"classF(first-child)",
			"aliasparent" : "classF"
		},
		{
			"name" : "类F(second-child)",
			"parent" : "类F",
			"url" : "",
			"alias" :"classF(second-child)",
			"aliasparent" : "classF"
		},
		{
			"name" : "类F(first-great-grandchild)",
			"parent" : "类F(first-child)",
			"url" : "./html/b11.html",
			"alias" :"classF(first-great-grandchild)",
			"aliasparent" : "classF"
		},
		{
			"name" : "类F(second-great-grandchild)",
			"parent" : "类F(first-child)",
			"url" : "./html/b12.html",
			"alias" :"classF(second-great-grandchild)",
			"aliasparent" : "classF"
		},
		{
			"name" : "类F(third-great-grandchild)",
			"parent" : "类F(second-child)",
			"url" : "./html/b13.html",
			"alias" :"classF(third-great-grandchild)",
			"aliasparent" : "classF"
		},
		{
			"name" : "类H(first-child)",
			"parent" : "类H",
			"url" : "./html/c1.html",
			"alias" :"classH(first-child)",
			"aliasparent" : "classE"
		}
	];
	return obj;
});	


