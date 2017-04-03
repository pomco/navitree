(function(treeFactory){
	"use strict";
	/* istanbul ignore else */
	if(typeof module ==='object' && typeof module.exports ==='object'){
		var jsdom = require("jsdom").jsdom;
		var doc = jsdom("");
		var win = doc.defaultView;
		var jq = require("jquery")(win);
		var BeanFactory = require("./lib/common/beanFactory.js");
		require("./lib/treemodel/jsontree.js");
		var arrlista = {
			"BeanFactory":BeanFactory,
			"JQ":jq
		};
		module.exports = treeFactory(arrlista);
	}else{
		var arrlistb = {};
		var _global_window = window ? window : {};
		if(typeof _global_window.jQuery ==='undefined'){
			throw new Error("unexpected! missing jQuery!");
		}else{
			arrlistb = {
				"BeanFactory":_global_window.BeanFactory,
				"JQ":_global_window.jQuery
			};
		}
		if(typeof _global_window.navitree ==='undefined'){
			_global_window.navitree = treeFactory(arrlistb);
		}else if(typeof _global_window.navitree.Author !=='undefined' && _global_window.navitree.Author ==='pocmco'){
			var navitreeset = _global_window.navitree;
			var treebn = treeFactory(arrlistb);
			navitreeset[_global_window.navitree.Version] = _global_window.navitree;
			navitreeset[treebn.Version] = treebn;
			_global_window.navitree = navitreeset;
		}else{
			throw new Error("\nunexpected! \nproperty 'navitree' already exists!\n");
		}		
	}
})((function(){
	"use strict";
	var treeBean = function(){
		var opt = [];
		var BeanFactory = {};
		for(var m=0; m<arguments.length; m++){
			if(typeof arguments[m]==='object' && arguments[m].hasOwnProperty("BeanFactory")){
				BeanFactory = arguments[m].BeanFactory;
			}
			opt.push(arguments[m]);
		}
		opt.push(function(){
			treeBean.extend("jsontree",BeanFactory.treemodel.jsontree);
			treeBean.jsontree.setJQ(treeBean.JQ);
			treeBean.JQ(this).on("init_tree",treeBean.jsontree.init);		
		});
		opt.push(function(){
			treeBean.JQ.extend(true,this,{"extend" : treeBean.extend});
		});
		opt.push(function(){
			treeBean.JQ.extend(true,this,{"data" : treeBean.jsontree.setData});
			treeBean.JQ.extend(true,this,{"tree" : treeBean.jsontree.tree});
			treeBean.JQ.extend(true,this,{"html" : treeBean.jsontree.tree.toString});
			treeBean.JQ.extend(true,this,{"child" : treeBean.jsontree.setNodeName});
			treeBean.JQ.extend(true,this,{"parent" : treeBean.jsontree.setParentNodeName});
			treeBean.JQ.extend(true,this,{"url" : treeBean.jsontree.setUrl});
			treeBean.JQ.extend(true,this,{"menuName" : treeBean.jsontree.setDisplayName});
			treeBean.JQ.extend(true,this,{"render" : treeBean.jsontree.setRootNodeWhenRenderTree});
			treeBean.JQ.extend(true,this,{"iframeName" : treeBean.jsontree.setTargetWhenOnclickUrl});
		});
		return BeanFactory.bean.apply(treeBean,opt); 
	};
	treeBean.fn = treeBean.prototype = {
		Version : "0.0.0",
		Author : "pomco",
	};
	treeBean.extend = function(name,obj){
		var emptyObj = {};
		if(typeof emptyObj[name] ==='undefined'){
			emptyObj[name] = obj;
		}
		treeBean.JQ.extend(true,this,emptyObj);
		return this;
	};
	return treeBean;
})());
