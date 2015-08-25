/*
*
* 
 */
(function(){
	var fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
	var initializing = false;
	this.Class = function(){};
	Class.extend = function(prop){
		/*其他子类Event.extned*/
		var _super = this.prototype;
		initializing = true;
		var property = new this();
		initializing = false;
		/**a类中有initialize属性方法
		**b类的initialize属性方法中的调用是this._super();
		 */
		for(var name in prop){
			if(typeof _super[name] == 'function' 
				&& typeof prop[name] == 'function' 
				&& fnTest.test(prop[name])){
				property[name] = return (function(name,fn){
					/*b类的initialize运行之后是这个方法,此方法的参数*/
					return function(){
						var temp = this._super;
						/*
						*initialize里是使用this._super调用的
						*如果该类中也有_super方法，先暂存，执行完后，再还原
						**/
						this._super = _super[name];
						fn.apply(this,arguments);
						this._super = temp;
					}
				})(name,prop[name]);
			}else{
				property[name] = prop[name];
			}
		}

		function Class(){
			if(!initializing && this.init){
				this.init.apply(this,arguments);
			}
		}
		Class.newInstance = function(paramArr) {
        initializing = true;
        var obj = new Class();
        initializing = false;
        obj.init.apply(obj, paramArr);
        return obj;
    };
    Class.__Intance = null;
    Class.getReadyIntance = function(paramArr) {
	      if(mui.os.plus){
	          mui.plusReady(function(){
	              Class.__Intance = Class.newInstance(paramArr);
	          });
	          return Class.__Intance;
	      } else{
	          return Class.newInstance(paramArr);
	      }
	  };
		Class.prototype = property;
		Class.prototype.constructor = Class;
		Class.extend = arguments.callee;
	}
})();