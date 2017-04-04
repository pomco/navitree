 (function(f){
 	"use strict";
 	/* istanbul ignore else */
 	if(typeof module ==='object' && typeof module.exports ==='object'){
 		var beanfy = require("./../common/beanFactory.js");
 		module.exports = f(beanfy);
 	}else{
 		var _global_window = window ? window : {};
 		if(typeof _global_window.BeanFactory ==='undefined'){
 			return new Error("unexpected! missing BeanFactory!");
 		}else{
 			f(_global_window.BeanFactory);
 		}
 	}
	
}(function(BeanFactory){
	"use strict";
	if(typeof BeanFactory.treemodel ==='undefined'){
		var treemodel = {};
		BeanFactory.treemodel = treemodel;
	}
	var jsontree = {};
	BeanFactory.treemodel.jsontree = jsontree;
	jsontree.Author ="pomco";
	jsontree.Version='0.0.0';
	jsontree.opt = {
		"_jsontree_depend" :{
			"JQ"  : ""
		},
		"_jsontree_data" : {
			"obj" : {}
		},
		"_jsontree_field" : {
			"nodeid" : "nodeid",
			"nodename" : "",
			"nodeself" : "_self",
			"parentnodename" : "",
			"url" : "",
			"displayname":""
		},
		"_jsontree_render" : {
			"rootnode" : "defaul_tree",
			"treenode" : "jsontree",
			"a":{
					"target": "_blank"
				}
		},
		"_jsontree_tree_info" : {
			"tree" : {},
			"html" : ""
		}
		
	};
	jsontree.setJQ = function(arg){
		if(jsontree.isValidFieldData("JQ",arg)){
			jsontree.opt._jsontree_depend.JQ = arg;
		}
		return this;
	};
	jsontree.setData = function(arg){
		if(jsontree.isValidFieldData("obj",arg)){
			jsontree.opt._jsontree_data.obj = arg;
		}
		var JQ = jsontree.opt._jsontree_depend.JQ;
		JQ.each(["nodename","parentnodename","url","displayname"],function(index,value){
			if(!jsontree.isValidFieldData(value,jsontree.opt._jsontree_field[value])){
				jsontree.opt._jsontree_field[value] = "";
			}
		});
		if(jsontree.isNecessaryDataOnReady()){
			jsontree.opt._jsontree_depend.JQ(this).trigger('init_tree');
		}else{
			jsontree.empty();
		}
		return this;
	};
	jsontree.setNodeName = function(arg){
		if(jsontree.isValidFieldData("nodename",arg)){
			jsontree.opt._jsontree_field.nodename = arg;
		}
		if(jsontree.isNecessaryDataOnReady()){
			jsontree.opt._jsontree_depend.JQ(this).trigger('init_tree');
		}
		return this;
	};
	jsontree.setNodeId = function(arg){
		if(jsontree.isValidFieldData("nodeid",arg)){
			jsontree.opt._jsontree_field.nodeid = arg;
		}
		return this;
	};
	jsontree.setNodeSelf = function(arg){
		if(jsontree.isValidFieldData("nodeself",arg)){
			jsontree.opt._jsontree_field.nodeself = arg;
		}
		return this;
	};
	jsontree.setParentNodeName = function(arg){
		if(jsontree.isValidFieldData("parentnodename",arg)){
			jsontree.opt._jsontree_field.parentnodename = arg;
		}
		if(jsontree.isNecessaryDataOnReady()){
			jsontree.opt._jsontree_depend.JQ(this).trigger('init_tree');
		}		
		return this;
	};
	jsontree.setUrl = function(arg){
		if(jsontree.isValidFieldData("url",arg)){
			jsontree.opt._jsontree_field.url = arg;
		}
		if(jsontree.isNecessaryDataOnReady()){
			jsontree.opt._jsontree_depend.JQ(this).trigger('init_tree');
		}			
		return this;
	};
	jsontree.setDisplayName = function(arg){
		if(jsontree.isValidFieldData("displayname",arg)){
			jsontree.opt._jsontree_field.displayname = arg;
		}
		if(jsontree.isNecessaryDataOnReady()){
			jsontree.opt._jsontree_depend.JQ(this).trigger('init_tree');
		}			
		return this;
	};
	jsontree.setRootNodeWhenRenderTree = function(arg){
		var reg = /^#/g;
		if(reg.test(arg)){
			jsontree.opt._jsontree_render.rootnode = arg;
		}else{
			jsontree.opt._jsontree_render.rootnode = (typeof arg ==="string" && arg !=='')? ("#"+arg) : jsontree.opt._jsontree_render.rootnode;
		}
		if(jsontree.isNecessaryDataOnReady()){
			jsontree.opt._jsontree_depend.JQ(this).trigger('init_tree');
		}
		return this;
	};
	jsontree.setTreeNodeWhenRenderTree = function(arg){
		var reg = /^\./g;
		if(!reg.test(arg)){
			jsontree.opt._jsontree_render.treenode = (typeof arg ==="string" && arg !=='')? arg : jsontree.opt._jsontree_render.treenode;
		}
		return this;
	};
	jsontree.setTargetWhenOnclickUrl = function(arg){
		if(jsontree.isValidFieldData("target",arg)){
			jsontree.opt._jsontree_render.a.target = arg;
		}
		if(jsontree.isNecessaryDataOnReady()){
			jsontree.opt._jsontree_depend.JQ(this).trigger('init_tree');
		}
		return this;
	};
	jsontree.setTree = function(arg){
		if(jsontree.isValidFieldData("tree",arg)){
			jsontree.opt._jsontree_tree_info.tree = arg;
		}
		return this;
	};
	jsontree.setHtml = function(arg){
		if(jsontree.isValidFieldData("html",arg)){
			jsontree.opt._jsontree_tree_info.html = arg;
		}
		return this;
	};
	jsontree.findParent = function(arr,obj,opt){
		for(var i=0;i<arr.length;i++){
			if(arr[i][opt._jsontree_field.nodename]===obj[opt._jsontree_field.parentnodename]){
				return  arr[i];
			}
		}
	};
	jsontree.familytree = function(arr,obj,point,opt){
		if(obj[opt._jsontree_field.parentnodename]!==""){
			for (var i =0;i<arr.length ;i++ )
			{
				if(arr[i][opt._jsontree_field.nodename]===obj[opt._jsontree_field.parentnodename]){
					point.unshift(obj[opt._jsontree_field.parentnodename]+"_"+arr[i][opt._jsontree_field.nodeid]);
					jsontree.familytree(arr,arr[i],point,opt);
					break;
				}
			}
		}
	};
	jsontree.empty = function(){
		var JQ = jsontree.opt._jsontree_depend.JQ;
		var rootnode = jsontree.opt._jsontree_render.rootnode;
		jsontree.setTree({});
		jsontree.setHtml("");
		JQ(rootnode).empty();		
	};
	/**
	 * Not Recommend to assign the same field to  nodename/parentnodename
	 */
	jsontree.isMutexOfElements = function(field,arg){
		var result = {
			"check" : true,
			"err" : ""
		};
		switch(field){
			case "nodename" :
				result.check = (jsontree.opt._jsontree_field.parentnodename === arg) ? false : true;
				if(!result.check){
					result.err = new Error("\nNot Recommend to assign the same value of the field ('parentnodename' which been assigned by parent())  to nodename ! \n");
				}
				break;
			case "parentnodename" :
				result.check = (jsontree.opt._jsontree_field.nodename === arg) ? false : true;
				if(!result.check){
					result.err = new Error("\nNot Recommend to assign the same value of the field ('nodename' which been assigned by child())  to parentnodename ! \n");
				}
				break;
			default:
				result.check = true;
				break;
		}
		return result;
	};
	/**
	 * if key in array Object
	 */
	jsontree.isInObject = function(arr,key){
		var result = {
	 		"check" : false,
	 		"err" : ""
	 	};
	 	var JQ = jsontree.opt._jsontree_depend.JQ;
	 	for(var i in arr){
	 		if(arr.hasOwnProperty(i)){
	 			if(JQ.type(arr[i]) === 'object'){
				 	if(arr[i].hasOwnProperty(key)){
				 		result.check = true;
				 	}else{
				 		result.check = false;
				 		result.err = new Error("\nthe key : '"+key+"' not in the object:'"+arr[i]+"'.\n");
				 		break;
				 	} 				
	 			}
	 		}
	 	}
	 	return result;
	};
	/**
	 *   NOT Recommend to drop-dead halt !
	 */
	 jsontree.isDeadLoop = function(field,arg){
	 	var result = {
	 		"check" : false,
	 		"err" : ""
	 	};
	 	var JQ = jsontree.opt._jsontree_depend.JQ;
	 	var obj = jsontree.opt._jsontree_data.obj;
	 	var nodename =jsontree.opt._jsontree_field.nodename;
	 	var parentnodename = jsontree.opt._jsontree_field.parentnodename;
	 	switch(field){
	 		case "obj" :
	 			obj = arg;
	 			break;
	 		case "nodename" :
	 			nodename = arg;
	 			break;
	 		case "parentnodename" :
	 			parentnodename = arg;
	 			break;
	 		default :
	 			break;
	 	}
	 	if(jsontree.isInObject(obj,nodename).check && jsontree.isInObject(obj,parentnodename).check){
		 	for(var key in obj){
		 		if(obj.hasOwnProperty(key)){
		 			if(JQ.type(obj[key]) ==='object'){
		 				var trail = [];
		 				trail.push(obj[key][nodename]);
		 				trail.push(obj[key][parentnodename]);
		 				result = jsontree.isDeadLoopCheck(obj,obj[key],nodename,parentnodename,trail);
		 				if(result.check){
		 					break;
		 				}
		 			}
		 		}
		 	}	 		
		}
	 	return result;
	 };
	 jsontree.isDeadLoopCheck = function(arr,obj,nodename,parentnodename,trail){
	 	var result = {
	 		"check" : false,
	 		"err"  : ""
	 	};
	 	var JQ = jsontree.opt._jsontree_depend.JQ;
	 	for(var key in arr ){
	 		if(arr.hasOwnProperty(key)){
	 			if(JQ.type(arr[key]) ==='object'  && JQ.type(obj) ==='object' &&  arr[key][nodename]=== obj[parentnodename]){
	 				trail.push(arr[key][nodename]);
	 				trail.push(arr[key][parentnodename]);
	 				if(trail.length>1){
	 					if(trail[0] === trail[(trail.length)-1]){
	 						result.check = true;
	 						result.err = new Error("\nunexpected assignment! maybe casule deep loop.\n");
	 					}else{
			 				result = jsontree.isDeadLoopCheck(arr,arr[key],nodename,parentnodename,trail); 						 						
	 					}
	 				}
	 			break;
	 			}
	 		}
	 	}
	 	return result;
	 };

	 
	/**
	 * field check
	 */
	jsontree.isValidFieldData = function(field,arg){
		var result = {
			"check" : false,
			"err" : ""
		};
		switch(field){
			case "JQ" :
				result.check = (typeof arg.fn.jquery ==='undefined') ? false : true;
				break;
			case "obj":
				result.check = (typeof arg ==='object' && !(jsontree.isDeadLoop(field,arg)).check) ? true : false;
				break;
			case "nodename":
			case "parentnodename":
				result.check = (typeof arg ==="string" && arg !=='' && jsontree.isInObject(jsontree.opt._jsontree_data.obj,arg).check && jsontree.isMutexOfElements(field,arg).check && !(jsontree.isDeadLoop(field,arg)).check) ? true : false;
				break;
			case "nodeid":
				result.check = ((typeof arg ==="string" || typeof arg ==="number")  && arg !=='')? true : false;
				break;
			case "url":
			case "displayname":
				result.check = (typeof arg ==="string" && arg !=='' && jsontree.isInObject(jsontree.opt._jsontree_data.obj,arg).check) ? true : false;
				break;
			case "nodeself" :
			case "target":
				result.check = (typeof arg ==="string" && arg !=='')? true : false;
			    break;
			case "tree":
				var JQ = jsontree.opt._jsontree_depend.JQ;
				result.check = (JQ.type(arg) ==="object")? true : false;
				break;
			case "html":
				result.check = (typeof arg ==="string")? true : false;
			    break;
			default :
				result.check = false;
				break;
		}
		if(!result.check){
			result.err = new Error ("\n unexpected assignment for "+field+" !\n");
		}		
		return result.check;
	};
	jsontree.isNecessaryDataOnReady = function(){
		var err = false;
			if(typeof jsontree.opt._jsontree_depend.JQ ==='undefined'||jsontree.opt._jsontree_depend.JQ ==='' || typeof jsontree.opt._jsontree_depend.JQ.fn.jquery ==='undefined'){
				err =  new Error("\nunexpected!\n missing jQuery!\n");
			}
			if(jsontree.opt._jsontree_field.nodename ==='' || jsontree.opt._jsontree_field.parentnodename ==='' ){
				err = new Error("\nunexpected!\n missing assignment for 'nodename' which represent as child re or 'parentnodename' which represent as parent!\n");
			}
			if(jsontree.opt._jsontree_field.nodeid ===''){
				err = new Error("\n Not recommended!\n missing assignment for 'nodeid' which represent as unique identification for a record!\n");
			}
			if(jsontree.opt._jsontree_field.displayname ===''){
				if(jsontree.opt._jsontree_field.nodename !==''){
					jsontree.setDisplayName(jsontree.opt._jsontree_field.nodename);
				}else{
					err = new Error("\nunexpected!\n missing assignment for 'displayname' which represent as displayname on page!\n");
				}
				
			}
			if(typeof jsontree.opt._jsontree_render.rootnode ==='undefined' || jsontree.opt._jsontree_render.rootnode===""){
				err = new Error("\nunexpected!\n missing assignment for 'rootnode' which represent as the root when render a tree\n");
			}
		if(err){
			return false;
		}else{
			return true;
		}
	};
	jsontree.init =function(){
		jsontree.empty();
		if(jsontree.isNecessaryDataOnReady()){
			var tree = {};
			var point =[];
			var obj = jsontree.opt._jsontree_data.obj;
			var opt = jsontree.opt;
			var JQ = jsontree.opt._jsontree_depend.JQ;
			var rootnode = jsontree.opt._jsontree_render.rootnode;
			for(var i=0;i<obj.length;i++){
				if(typeof obj[i] ==='object' && !obj[i].hasOwnProperty("nodeid")){
					obj[i].nodeid = i+1;
				}
			}
			for(var j=0;j<obj.length;j++){
				jsontree.familytree(obj,obj[j],point,opt);
				jsontree.maketree(JQ,tree,obj[j],point,opt);
			}
			JQ(rootnode).empty();
			jsontree.render(JQ,tree,obj,opt);
			jsontree.setTree(tree);
			jsontree.setHtml(JQ(rootnode).html());					
		}
	};
	jsontree.maketree = function($,tree,obj,point,opt){
		if(point.length>0){
			var branch = point.shift();
	        if(tree.hasOwnProperty(branch)){
				if(point.length>0){
					jsontree.maketree($,tree[branch],obj,point,opt);
				}else{
					if(!tree[branch].hasOwnProperty(obj[opt._jsontree_field.nodename]+"_"+obj[opt._jsontree_field.nodeid])){
						tree[branch][obj[opt._jsontree_field.nodename]+"_"+obj[opt._jsontree_field.nodeid]] = {};
					}
						tree[branch][obj[opt._jsontree_field.nodename]+"_"+obj[opt._jsontree_field.nodeid]][opt._jsontree_field.nodeself] =obj;
				}
			}else{
				tree[branch] = {};
				if(point.length>0){
					jsontree.maketree($,tree[branch],obj,point,opt);
				}else{
					tree[branch][obj[opt._jsontree_field.nodename]+"_"+obj[opt._jsontree_field.nodeid]] = {};
					tree[branch][obj[opt._jsontree_field.nodename]+"_"+obj[opt._jsontree_field.nodeid]][opt._jsontree_field.nodeself] =obj;
				}
			}
		}else{
			if(!tree.hasOwnProperty(obj[opt._jsontree_field.nodename]+"_"+obj[opt._jsontree_field.nodeid])){
				tree[obj[opt._jsontree_field.nodename]+"_"+obj[opt._jsontree_field.nodeid]] = {};	
			}
			tree[obj[opt._jsontree_field.nodename]+"_"+obj[opt._jsontree_field.nodeid]][opt._jsontree_field.nodeself] = obj;
		}
		return this;
	};
	jsontree.render = function($,tree,arr,opt){
		if(tree !==null){
			for(var branch in tree){
				if(tree.hasOwnProperty(branch)){
					var str ="";
					if(branch === opt._jsontree_field.nodeself){
						continue;
					}
					if(tree[branch].hasOwnProperty(opt._jsontree_field.nodeself)){
						/*
						 * 字符处理  ,不用英式（）符号
						 * */
						var segname = /\(|\)/g;
						var fifter_tree_branch_self_name = "";
						if(segname.test(tree[branch][opt._jsontree_field.nodeself][opt._jsontree_field.nodename])){
							
							fifter_tree_branch_self_name = tree[branch][opt._jsontree_field.nodeself][opt._jsontree_field.nodename].replace(/\(/,"（");
							fifter_tree_branch_self_name = fifter_tree_branch_self_name.replace(/\)/,"）");
						}else{
							fifter_tree_branch_self_name = tree[branch][opt._jsontree_field.nodeself][opt._jsontree_field.nodename];
						}
						str +='<li id="jsontree_li_'+fifter_tree_branch_self_name+tree[branch][opt._jsontree_field.nodeself][opt._jsontree_field.nodeid]+'">';
						if(""===tree[branch][opt._jsontree_field.nodeself][opt._jsontree_field.url]){
							str +='<a id="jsontree_a_'+fifter_tree_branch_self_name+tree[branch][opt._jsontree_field.nodeself][opt._jsontree_field.nodeid]+'" ';
							str +='<a title="'+tree[branch][opt._jsontree_field.nodeself][opt._jsontree_field.nodename]+'" ';
							str +='href="#'+fifter_tree_branch_self_name+tree[branch][opt._jsontree_field.nodeself][opt._jsontree_field.nodeid]+'">';
						}else{
							str +='<a id="jsontree_a_'+fifter_tree_branch_self_name+tree[branch][opt._jsontree_field.nodeself][opt._jsontree_field.nodeid]+'" ';
							str +='title="'+tree[branch][opt._jsontree_field.nodeself][opt._jsontree_field.nodename]+'" ';
							str +='href="'+tree[branch][opt._jsontree_field.nodeself][opt._jsontree_field.url]+'" ';
							str +='url="'+tree[branch][opt._jsontree_field.nodeself][opt._jsontree_field.url]+'" ';
							str +='target="'+opt._jsontree_render.a.target+'">';
						}
						str +='<label for="jsontree_label_'+fifter_tree_branch_self_name+tree[branch][opt._jsontree_field.nodeself][opt._jsontree_field.nodeid]+'">'+tree[branch][opt._jsontree_field.nodeself][opt._jsontree_field.displayname]+'</label>';
						str +='</a></li>';
						var rootnode = opt._jsontree_render.rootnode;
						var treenode = opt._jsontree_render.treenode;
						var parentObj = jsontree.findParent(arr,tree[branch][opt._jsontree_field.nodeself],opt);
						if(tree[branch][opt._jsontree_field.nodeself][opt._jsontree_field.parentnodename]==="" || typeof parentObj ==='undefined'){
							if(opt._jsontree_depend.JQ.find(rootnode).length<=0){
								opt._jsontree_depend.JQ('html>body').append('<div id="'+(rootnode.replace(/^#/,''))+'"></div>');
							}
							if($(rootnode+">ul").length<=0){
								$(rootnode).append('<ul class="'+treenode+'"></ul>');
							}
							$(rootnode+">ul").append(str);
						}else{
							var parentId = (typeof parentObj !=='undefined') ? parentObj[opt._jsontree_field.nodeid] : "";
							var fifter_tree_branch_self_rootname ="";
							var segrootname = /\(|\)/g;
							if(segrootname.test(tree[branch][opt._jsontree_field.nodeself][opt._jsontree_field.parentnodename])){
								fifter_tree_branch_self_rootname = tree[branch][opt._jsontree_field.nodeself][opt._jsontree_field.parentnodename].replace(/\(/,"（");
								fifter_tree_branch_self_rootname = fifter_tree_branch_self_rootname.replace(/\)/,"）");
							}else{
								fifter_tree_branch_self_rootname = tree[branch][opt._jsontree_field.nodeself][opt._jsontree_field.parentnodename];
							}
							if($("#jsontree_li_"+fifter_tree_branch_self_rootname+parentId+">ul").length<=0){
								$("#jsontree_li_"+fifter_tree_branch_self_rootname+parentId+">a").after("<ul></ul>");
							}
							$("#jsontree_li_"+fifter_tree_branch_self_rootname+parentId+">ul").append(str);
						}
					}
					jsontree.render($,tree[branch],arr,opt);
				}
			}		
		}
		return this;
	};
	jsontree.tree = function(){
		return jsontree.opt._jsontree_tree_info.tree;
	};
	jsontree.tree.toString = function(){
		return jsontree.opt._jsontree_tree_info.html;
	};
	return jsontree;
}));
