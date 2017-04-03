(function(beanFactory){
	"use strict";
	/* istanbul ignore else */
	if(typeof module ==='object' && typeof module.exports ==='object'){
		module.exports = beanFactory();
	}else{
		var _global_window = window ? window : {};
		if(typeof _global_window.BeanFactory ==='undefined'){
			_global_window.BeanFactory = beanFactory();
		}else if(typeof _global_window.BeanFactory.Author !=='undefined' && _global_window.BeanFactory.Author ==='pocmco'){
			var beanFactorySet = _global_window.beanFactory;
			var beanfy = beanFactory();
			beanFactorySet[_global_window.BeanFactory.Version] = _global_window.BeanFactory;
			beanFactorySet[beanfy.Version] = beanfy;
			_global_window.BeanFactory = beanFactorySet;
		}else{
			throw new Error("\nunexpected! \nproperty 'BeanFactory' already exists!\n");
		}		
	}
}((function(){
	"use strict";
	var beanFactory = function(){
		var opt = [];
		var point = this;
		for(var m=0; m<arguments.length; m++){
			opt.push(arguments[m]);
		}
		return new beanFactory.fn.init(point,opt);
	};
	beanFactory.isArrayLike = function(obj){
		var length = !!obj && !(typeof obj ==='string' || typeof obj ==='number' || typeof obj ==='boolean') && "length" in obj && obj.length;
		return (obj instanceof Array || length ===0 || typeof length ==='number' && length>0 && (length-1) in obj);
	};
	beanFactory.assembly = function(point,opt,cb){
		if(typeof point ==='undefined' || typeof opt ==='undefined' ){
			return;
		}
		if(beanFactory.isArrayLike(opt) && typeof opt !=='function'){
			for(var i=0; i<opt.length; i++){
				beanFactory.assembly(point,opt[i],cb);
			}			
		}else if(typeof opt ==='object'){
			for(var key in opt){
				if(opt.hasOwnProperty(key)){
					point[key] = opt[key];
				}
			}
		}else if(typeof opt ==='function'){
			if(typeof cb ==='undefined' || cb === null|| (typeof cb !=='function' && beanFactory.isArrayLike(cb) && cb.length===0)){
				cb = opt;
			}else{
				var arr = [cb];
				arr.push(opt);
				cb = arr;
			}
		}
		if(typeof cb !=='undefined' && (typeof cb ==='function' || typeof cb !=='function' && beanFactory.isArrayLike(cb) && cb.length>0)){
			if(typeof cb ==='function'){
				cb.apply(point.prototype);
			}else{
				for(var j=0; j<cb.length; j++){
					cb[j].apply(point.prototype);
				}
			}
		}				
	};
	beanFactory.fn = beanFactory.prototype = {
		Version:"0.0.0",
		Author:"pomco",
		bean:function(){
			beanFactory.fn.init.prototype=this.prototype;
			return beanFactory.apply(this,arguments);
		},
		init:function(point,opt){		
			beanFactory.assembly(point,opt,null);	
			return this;
		}
	};
	beanFactory.fn.init.prototype = beanFactory.fn;
	return beanFactory;	
})()));
