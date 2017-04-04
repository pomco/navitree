(function(f){
	"use strict";
	var mocha ,chai,navitree,BeanFactory,demoDataTmp,assert,suite,setup,suiteSetup,test,teardown,suiteTeardown;
	/* istanbul ignore else */
	if(typeof module ==='object' && typeof module.exports ==='object'){
		mocha = require('mocha');
		chai = require('chai');
		var path = require('path');

		assert = chai.assert;
		//var expect = chai.expect;
		//var should = chai.should();
		suite = mocha.suite;
		setup = mocha.setup;
		suiteSetup = mocha.suiteSetup;
		test = mocha.test;
		teardown = mocha.teardown;
		suiteTeardown = mocha.suiteTeardown;

		//target
		navitree = require("../src/navitree");
		BeanFactory = require("../src/lib/common/beanFactory");
		var jsontree = require("../src/lib/treemodel/jsontree");
		//
		var demoPath = "../demo";
		demoDataTmp = [];
		demoDataTmp.push(require(path.join(demoPath,"/demodata/data.js")));
		demoDataTmp.push(require(path.join(demoPath,"/demodata/data_01.js")));
		//
		f(assert,suite,setup,suiteSetup,test,teardown,suiteTeardown,navitree,BeanFactory,jsontree,demoDataTmp);
	}else{
		var _global_window = window ? window : {};
		suite = _global_window.suite;
		setup = _global_window.setup;
		suiteSetup = _global_window.suiteSetup;
		test = _global_window.test;
		teardown = _global_window.teardown;
		suiteTeardown = _global_window.suiteTeardown;
		chai = _global_window.chai;
		assert = chai.assert;
		navitree = _global_window.navitree;
		BeanFactory = _global_window.BeanFactory;
		demoDataTmp = [];
		demoDataTmp.push(_global_window.demoData);
		demoDataTmp.push(_global_window.demoData_01);
		f(assert,suite,setup,suiteSetup,test,teardown,suiteTeardown,navitree,BeanFactory,null,demoDataTmp);
	}
})(function(assert,suite,setup,suiteSetup,test,teardown,suiteTeardown,navitree,BeanFactory,jsontree,demoData){
	"use strict";
	var data = "";
	var oldOpt = {};
	var JQ = BeanFactory.treemodel.jsontree.opt._jsontree_depend.JQ;
    var deepCopy  = function(srcObj,destObj){
    	for(var i in srcObj){
    		if(srcObj.hasOwnProperty(i)){
    			if(typeof srcObj[i] ==='object'){
    				var type =JQ.type(srcObj[i]);
    				if(type ==='object'){
    					destObj[i] = {};
    				}else if(type ==='array'){
    					destObj[i] = [];
    				}
    				destObj[i] = deepCopy(srcObj[i],destObj[i]);
    			}else{
    				destObj[i] = srcObj[i];
    			}
    		}
    	}
    	return destObj;
    };
    var domCheck = function(obj,opt){
    	var family = BeanFactory.treemodel.jsontree.familytree;
    	var point = [];
    	var rootnode = opt._jsontree_render.rootnode;
    	for(var i=0; i<obj.length;i++){
    		family(obj,obj[i],point,opt);
    		deepDomCheck(obj,obj[i],opt,point,rootnode+">ul");
    	}
    };
    var deepDomCheck = function(arr,testObj,opt,point,rootnode){
    	var el = null;
    	var para = null;
    	var obj = null;
    	var fUl = JQ(rootnode);
    	if(point.length>0){
    		el = point.shift();
    		para = el.split("_");
    		obj = findObJ(arr,para[0],opt);
    		deepDomCheckCore(obj,opt,point,fUl);
    		deepDomCheck(arr,testObj,opt,point,fUl);
    	}else{
    		obj = testObj;
    		deepDomCheckCore(obj,opt,point,fUl);
    	}
    };
    var deepDomCheckCore = function(obj,opt,point,fUl){
   		var nodename = opt._jsontree_field.nodename;
		var nodeid = opt._jsontree_field.nodeid;
		var displayname = opt._jsontree_field.displayname;
		var url = opt._jsontree_field.url;
		var target = opt._jsontree_render.a.target;
		var segname = /\(|\)/g;
		var deel_nodename = "";
		if(segname.test(obj[nodename])){
			
			deel_nodename = obj[nodename].replace(/\(/,"（");
			deel_nodename = deel_nodename.replace(/\)/,"）");
		}else{
			deel_nodename = obj[nodename];
		}
		var ul_class_reg = new RegExp(".*"+opt._jsontree_render.treenode+".*","gim");
		var li_id_reg = new RegExp(".*jsontree_li_"+deel_nodename+obj[nodeid]+".*","gim");
		var a_id_reg = new RegExp(".*jsontree_a_"+deel_nodename+obj[nodeid]+".*","gim");
		var label_for_reg = new RegExp(".*jsontree_label_"+deel_nodename+obj[nodeid]+".*","gim");

		assert.isAbove(fUl.length,0);
		assert.match(fUl.attr("class"),ul_class_reg);
		var li = JQ(">li",fUl);
		assert.isAbove(li.length,0);
		for(var i=0;i<li.length;i++){
			if(li.eq(i).attr("id") ==='jsontree_li_'+deel_nodename+obj[nodeid]){
				assert.match(li.eq(i).attr("id"),li_id_reg);
			    var a = JQ(">a",li.eq(i));
			    assert.isAbove(a.length,0);
				assert.match(a.attr("id"),a_id_reg);
				assert.strictEqual(a.attr("title"),obj[nodename]);
				if(""!==obj[url]){
					assert.strictEqual(a.attr("url"),obj[url]);
					assert.strictEqual(a.attr("href"),obj[url]);
					assert.strictEqual(a.attr("targer"),obj[target]);
				}else{
					assert.strictEqual(a.attr("href"),"#"+deel_nodename+obj[nodeid]);
				}
				var label = JQ(">label",a);
				assert.isAbove(label.length,0);
				assert.match(label.attr("for"),label_for_reg);
				assert.strictEqual(label.html(),obj[displayname]);
				break;
			}
		}
    };
    var findObJ = function(arr,nodename,opt){
    	for(var i=0;i<arr.length;i++){
    		if(arr[i][opt._jsontree_field.nodename] === nodename){
    			return arr[i];
    		}
    	}
    };
	suiteSetup('suiteSetup()在所有测试用例执行前，仅仅执行1次',function(){ // 在所有测试用例执行前，仅仅执行1次
	  	oldOpt =  deepCopy(BeanFactory.treemodel.jsontree.opt,oldOpt);
	});

	setup('setup()在执行每个测试用例前，都要执行1次',function(){ // 执行每个测试用例前，都要执行1次
		data = demoData;
		var obj = {};
		deepCopy(oldOpt,obj);
		BeanFactory.treemodel.jsontree.opt = obj;
	});
	teardown('teardown()在每个测试用例执行后，都要执行1次',function(){ // 每个测试用例执行后，都要执行1次
	});

	suiteTeardown('suiteTeardown()在所有测试用例执行后，仅仅执行1次',function(){ // 在所有测试用例执行后，仅仅执行1次

	});
	suite('navitree TDD Test\n',function(){ // 定义多组测试用例
		suite(' ^_^ 测试数据检查\n',function(){ 
			test(' ->测试数据封装在数组内\n',function(){
				for(var i=0;i<data.length;i++){
					assert.isArray(data[i],'测试数据应当封装在数组内\n');
				}
				
			});
			test(' ->数组长度大于0\n',function(){
				for(var i=0;i<data.length;i++){
					assert.isAbove(data[i].length,0,'数组长度应当大于0\n');
				}
			});
			test(' ->数组内每个元素是对象类型\n', function() {
				for(var i=0;i<data.length;i++){
			    	for(var j=0; j<data[i].length;j++){
			    		assert.isObject(data[i][j],'数组内每个元素应当是对象类型\n');
			    	}
				}
			});
			test(' ->每个对象的属性个数相等\n',function() {
				for(var i=0;i<data.length;i++){
				     var len = 0;
				     for(var j=0; j<data.length;j++){
				     	if(j===0){
				     		len = Object.keys(data[i][j]).length;
				     	}
				     	assert.strictEqual(Object.keys(data[i][j]).length,len,'每个对象的属性个数应当相等\n');
				     }
			    }
			});
			test(' ->每个对象的属性名称相同\n',function(){
				for(var i=0;i<data.length;i++){
					var keys = [];
					for(var j=0;j<data.length;j++){
						if(j===0){
							keys = Object.keys(data[i][j]);
						}
						assert.deepEqual(Object.keys(data[i][j]),keys,'每个对象的属性名称应当相同\n');
					}
			    }
			});
		});
		suite(' ^_^ BeanFactory 功能测试\n',function(){
			test(' ->内置属性检查\n', function() {
			   assert.property(BeanFactory,'Author');
			   assert.strictEqual(BeanFactory.Author,'pomco');
			   assert.property(BeanFactory,'Version');
			   assert.match(BeanFactory.Version,/([0-9]+\.[0-9]+\.[0-9])/);
			});
			suite(' ->bean属性\n',function(){
				test(' -->>存在且为函数\n',function(){
					assert.property(BeanFactory,'bean');
					assert.isFunction(BeanFactory.bean);
				});
				test(' -->>能正确初始化对像\n',function(){
					var a = function(){};
					a.prototype = {
						"ta" : "t_a",
						"tb" : function(){} 
					};
					var arr = [
						{
							"id" :"testa",
							"decription" : "BeanFactory"
						},
						function(){this.add = "addProperty";},
						"nothing",
						1,
						true
					];
					var inita = BeanFactory.bean.apply(a,arr);
					assert.isObject(inita);
					assert.propertyVal(a,"id","testa");
					assert.propertyVal(a,"decription","BeanFactory");
					assert.notProperty(inita,"id");
					assert.notProperty(inita,"decription");
					assert.propertyVal(inita,"ta","t_a");
					assert.property(inita,"tb");
					assert.isFunction(inita.tb);
					assert.deepPropertyVal(inita,"add","addProperty");
				});
			});
			suite(' ->treemodel属性\n',function(){
				test(' -->存在且为对象\n',function(){
					assert.property(BeanFactory,'treemodel');
					assert.isObject(BeanFactory.treemodel);
				});
				suite(' -->>jsontree属性\n',function(){
					test(' --->>>存在并且等于jsontree对象\n',function(){
						assert.property(BeanFactory.treemodel,"jsontree");
					});
					test(' --->>>内置属性检查\n',function(){
						var jt = BeanFactory.treemodel.jsontree;
						assert.property(jt,'opt');
						assert.isObject(jt.opt);
						assert.property(jt.opt,'_jsontree_depend');
						assert.isObject(jt.opt._jsontree_depend);
						assert.property(jt.opt._jsontree_depend,'JQ');
						assert.property(jt.opt,'_jsontree_data');
						assert.isObject(jt.opt._jsontree_data);
						assert.property(jt.opt._jsontree_data,'obj');
						assert.property(jt.opt,'_jsontree_field');
						assert.isObject(jt.opt._jsontree_field);
						assert.propertyVal(jt.opt._jsontree_field,'nodeid','nodeid');
						assert.propertyVal(jt.opt._jsontree_field,'nodename','');
						assert.propertyVal(jt.opt._jsontree_field,'nodeself','_self');
						assert.propertyVal(jt.opt._jsontree_field,'parentnodename','');
						assert.propertyVal(jt.opt._jsontree_field,'url','');
						assert.property(jt.opt,'_jsontree_render');
						assert.isObject(jt.opt._jsontree_render);
						assert.property(jt.opt,'_jsontree_render');
						assert.isObject(jt.opt._jsontree_render);
						assert.propertyVal(jt.opt._jsontree_render,'rootnode','defaul_tree');
						assert.propertyVal(jt.opt._jsontree_render,'treenode','jsontree');
						assert.property(jt.opt._jsontree_render,'a');
						assert.propertyVal(jt.opt._jsontree_render.a,'target','_blank');
						assert.property(jt.opt._jsontree_tree_info,'tree');
						assert.propertyVal(jt.opt._jsontree_tree_info,'html','');

						assert.isFunction(jt.setJQ);
						assert.isFunction(jt.setData);
						jt.setData({"a":"aa"});
						assert.deepEqual(jt.opt._jsontree_data.obj,{"a":"aa"});
						assert.isFunction(jt.setNodeName);
						assert.isFunction(jt.setNodeId);
						jt.setNodeId("reset_nodeid");
						jt.setNodeId("");
						assert.strictEqual(jt.opt._jsontree_field.nodeid,"reset_nodeid");
						assert.isFunction(jt.setNodeSelf);
						jt.setNodeSelf("reset_nodeself");
						jt.setNodeSelf("");
						assert.strictEqual(jt.opt._jsontree_field.nodeself,"reset_nodeself");
						assert.isFunction(jt.setParentNodeName);
						assert.isFunction(jt.setUrl);
						assert.isFunction(jt.setRootNodeWhenRenderTree);
						assert.isFunction(jt.setTreeNodeWhenRenderTree);
						jt.setTreeNodeWhenRenderTree("reset_treenode");
						jt.setTreeNodeWhenRenderTree("");
						assert.strictEqual(jt.opt._jsontree_render.treenode,"reset_treenode");
						assert.isFunction(jt.setTargetWhenOnclickUrl);
						assert.isFunction(jt.setTree);
						assert.isFunction(jt.setHtml);
					});
				});
			});
	    });
		suite(' ^_^ navitree 功能测试\n',function(){
			test(' ->内置属性检查\n', function() {
			   assert.property(navitree,'Author');
			   assert.strictEqual(navitree.Author,'pomco');
			   assert.property(navitree,'Version');
			   assert.match(navitree.Version,/([0-9]+\.[0-9]+\.[0-9])/);
			});
			suite(' ->extend属性\n',function(){
				test(' -->>存在且为函数\n', function() {
				  	assert.property(navitree,'extend');
				  	assert.isFunction(navitree.extend);
				});
				test(' -->>能正确扩展navitree属性\n',function(){
					navitree.extend("tree_extended",function(){
						return navitree.Version;
					});
					assert.property(navitree,'tree_extended','应当存在被扩展,名称为"tree_extended"的属性\n');
					assert.isFunction(navitree.tree_extended,'tree_extended','被扩展的属性"tree_extended"是函数\n');
					assert.strictEqual(navitree.tree_extended(),navitree.Version,'被扩展的属性"tree_extended"是函数能调用并且功能逻辑正确\n');
				});	
			});
			suite(' ->data属性\n',function(){
				test(' -->>存在且为函数\n', function() {
				  	assert.property(navitree,'data');
				  	assert.isFunction(navitree.data);
				});
				test(' -->> 执行后,正常存储数据\n',function(){
					var jt = BeanFactory.treemodel.jsontree;
					navitree.data({"a":"aa","b":"bb","c":"cc"});
					assert.deepEqual(jt.opt._jsontree_data.obj,{"a":"aa","b":"bb","c":"cc"});
					for(var i=0;i<data.length;i++){
						navitree.data(data[i]);
						assert.deepEqual(jt.opt._jsontree_data.obj,data[i]);
					}
				});	
			});
			suite(' ->tree属性\n',function(){
				test(' -->>存在且为函数\n', function() {
				  	assert.property(navitree,'tree');
				  	assert.isFunction(navitree.tree);
				});
				test(' -->> 执行后,正常获取数据\n',function(){
					var jt = BeanFactory.treemodel.jsontree;
					jt.opt._jsontree_tree_info.tree = {"a":"aa"};
					assert.strictEqual(navitree.tree(),jt.opt._jsontree_tree_info.tree);
				});	
			});
			suite(' ->html属性\n',function(){
				test(' -->>存在且为函数\n', function() {
				  	assert.property(navitree,'html');
				  	assert.isFunction(navitree.html);
				});
				test(' -->> 执行后,正常获取数据\n',function(){
					var jt = BeanFactory.treemodel.jsontree;
					jt.opt._jsontree_tree_info.html = "assignment";
					assert.strictEqual(navitree.html(),jt.opt._jsontree_tree_info.html);
				});	
			});
			suite(' ->child属性\n',function(){
				test(' -->>存在且为函数\n', function() {
				  	assert.property(navitree,'child');
				  	assert.isFunction(navitree.child);
				});
				test(' -->> 执行后,正常赋值\n',function(){
					for(var i=0;i<data.length;i++){
						var jt = BeanFactory.treemodel.jsontree;
						var oldValue = jt.opt._jsontree_field.nodename;
						navitree.data(data[i]);
						navitree.child("");
						assert.strictEqual(jt.opt._jsontree_field.nodename,oldValue);
						navitree.child({"test":"test"});
						assert.strictEqual(jt.opt._jsontree_field.nodename,oldValue);
						navitree.child(true);
						assert.strictEqual(jt.opt._jsontree_field.nodename,oldValue);
						navitree.child(1);
						assert.strictEqual(jt.opt._jsontree_field.nodename,oldValue);
						navitree.child("child");
						assert.strictEqual(jt.opt._jsontree_field.nodename,oldValue);
						navitree.child("alias");
						assert.strictEqual(jt.opt._jsontree_field.nodename,"alias");
						navitree.parent("parent");
						navitree.child("parent");
						assert.notStrictEqual(jt.opt._jsontree_field.nodename,"parent");
						assert.strictEqual(jt.opt._jsontree_field.nodename,"alias");
					}
				});	
			});
			suite(' ->parent属性\n',function(){
				test(' -->>存在且为函数\n', function() {
				  	assert.property(navitree,'parent');
				  	assert.isFunction(navitree.parent);
				});
				test(' -->> 执行后,正常赋值\n',function(){
					for(var i=0;i<data.length;i++){
						var jt = BeanFactory.treemodel.jsontree;
						var oldValue = jt.opt._jsontree_field.parentnodename;
						navitree.data(data[i]);
						navitree.parent("");
						assert.strictEqual(jt.opt._jsontree_field.parentnodename,oldValue);
						navitree.parent({"test":"test"});
						assert.strictEqual(jt.opt._jsontree_field.parentnodename,oldValue);
						navitree.parent(true);
						assert.strictEqual(jt.opt._jsontree_field.parentnodename,oldValue);
						navitree.parent(1);
						assert.strictEqual(jt.opt._jsontree_field.parentnodename,oldValue);				
						navitree.parent("parent");
						assert.strictEqual(jt.opt._jsontree_field.parentnodename,"parent");
						navitree.child("alias");
						navitree.parent("alias");
						assert.notStrictEqual(jt.opt._jsontree_field.parentnodename,"alias");
						assert.strictEqual(jt.opt._jsontree_field.parentnodename,"parent");
					}
				});	
			});
			suite(' ->url属性\n',function(){
				test(' -->>存在且为函数\n', function() {
				  	assert.property(navitree,'url');
				  	assert.isFunction(navitree.url);
				});
				test(' -->> 执行后,正常赋值\n',function(){
					for(var i=0;i<data.length;i++){
						var jt = BeanFactory.treemodel.jsontree;
						var oldValue = jt.opt._jsontree_field.url;
						navitree.data(data[i]);
						navitree.url("");
						assert.strictEqual(jt.opt._jsontree_field.url,oldValue);
						navitree.url({"test":"test"});
						assert.strictEqual(jt.opt._jsontree_field.url,oldValue);
						navitree.url(true);
						assert.strictEqual(jt.opt._jsontree_field.url,oldValue);
						navitree.url(1);
						assert.strictEqual(jt.opt._jsontree_field.url,oldValue);	
						navitree.url("http://");
						assert.strictEqual(jt.opt._jsontree_field.url,oldValue);
						navitree.url("url");
						assert.strictEqual(jt.opt._jsontree_field.url,"url");
					}
				});	
			});
			suite(' ->render属性\n',function(){
				test(' -->>存在且为函数\n', function() {
				  	assert.property(navitree,'render');
				  	assert.isFunction(navitree.render);
				});
				test(' -->> 执行后,正常赋值\n',function(){
					var jt = BeanFactory.treemodel.jsontree;
					var oldValue = jt.opt._jsontree_field.rootnode;
					navitree.render("");
					assert.strictEqual(jt.opt._jsontree_field.rootnode,oldValue);
					navitree.render({"test":"test"});
					assert.strictEqual(jt.opt._jsontree_field.rootnode,oldValue);
					navitree.render(true);
					assert.strictEqual(jt.opt._jsontree_field.rootnode,oldValue);
					navitree.render(1);
					assert.strictEqual(jt.opt._jsontree_field.rootnode,oldValue);	
					navitree.render("tree");
					assert.strictEqual(jt.opt._jsontree_render.rootnode,"#tree");
				});	
			});
			suite(' ->iframeName属性\n',function(){
				test(' -->>存在且为函数\n', function() {
				  	assert.property(navitree,'iframeName');
				  	assert.isFunction(navitree.iframeName);
				});
				test(' -->> 执行后,正常赋值\n',function(){
					var jt = BeanFactory.treemodel.jsontree;
					var oldValue = jt.opt._jsontree_render.a.target;
					navitree.iframeName("");
					assert.strictEqual(jt.opt._jsontree_render.a.target,oldValue);
					navitree.iframeName({"test":"test"});
					assert.strictEqual(jt.opt._jsontree_render.a.target,oldValue);
					navitree.iframeName(true);
					assert.strictEqual(jt.opt._jsontree_render.a.target,oldValue);
					navitree.iframeName(1);
					assert.strictEqual(jt.opt._jsontree_render.a.target,oldValue);
					navitree.iframeName("targetname");
					assert.strictEqual(jt.opt._jsontree_render.a.target,"targetname");
				});	
			});
		});
		suite(' ^_^ 案例测试\n',function(){

			test(' -> 正确产生树状菜单\n',function(){
				for(var i=0;i<data.length;i++){
					navitree.data(data[i]).child("name").parent("parent").url("url").iframeName("nothing").render("tree");
					assert.match(navitree.html(),/^<ul.*ul>$/);
					domCheck(data[i],BeanFactory.treemodel.jsontree.opt);	
				}				
			});
			test(' -> 正确产生树状菜单,并正确动态变换属性\n',function(){
				navitree.data(data[0]).child("name").parent("parent").url("url").iframeName("nothing").render("tree");
				navitree.child("alias");
				assert.match(navitree.html(),/^<ul.*ul>$/);
				domCheck(data[0],BeanFactory.treemodel.jsontree.opt);
				navitree.menuName("name");
				assert.match(navitree.html(),/^<ul.*ul>$/);
				domCheck(data[0],BeanFactory.treemodel.jsontree.opt);
				navitree.url("url");
				assert.match(navitree.html(),/^<ul.*ul>$/);
				domCheck(data[0],BeanFactory.treemodel.jsontree.opt);
				navitree.iframeName("no");
				assert.match(navitree.html(),/^<ul.*ul>$/);
				domCheck(data[0],BeanFactory.treemodel.jsontree.opt);
				navitree.render("athertree");
				assert.match(navitree.html(),/^<ul.*ul>$/);
				domCheck(data[0],BeanFactory.treemodel.jsontree.opt);	
				navitree.parent("aliasparent");
				assert.match(navitree.html(),/^<ul.*ul>$/);
				domCheck(data[0],BeanFactory.treemodel.jsontree.opt);
			});
			test(' -> 变换属性时正确忽略将会导致死循环的设置\n',function(){
				navitree.data(demoData[1]).child("name").parent("parent").url("url").iframeName("nothing").render("tree");
				navitree.child("alias");
				assert.match(navitree.html(),/^<ul.*ul>$/);
				domCheck(demoData[1],BeanFactory.treemodel.jsontree.opt);
				navitree.parent("aliasparent");
				assert.match(navitree.html(),/^<ul.*ul>$/);
				domCheck(demoData[1],BeanFactory.treemodel.jsontree.opt);
			});	
			test(' -> 正确产生树状菜单,正确切换菜单数据\n',function(){
				navitree.data(demoData[0]).child("name").parent("parent").url("url").iframeName("nothing").render("tree");
				assert.match(navitree.html(),/^<ul.*ul>$/);
				domCheck(demoData[0],BeanFactory.treemodel.jsontree.opt);
				navitree.data(demoData[1]);
				assert.match(navitree.html(),/^<ul.*ul>$/);
				domCheck(demoData[1],BeanFactory.treemodel.jsontree.opt);
				navitree.data({});
				assert.match(navitree.html(),/^$/);
				domCheck({},BeanFactory.treemodel.jsontree.opt);
				navitree.render("athertree");
				assert.match(navitree.html(),/^$/);
				domCheck({},BeanFactory.treemodel.jsontree.opt);
			});		
		});
	});
});

