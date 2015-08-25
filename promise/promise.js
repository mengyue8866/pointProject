(function(_){
	var building = false;
	function Promise(){
		if(!building && typeof this.initialize == 'function'){
			this.initialize(this,arguments);
		}
	}
	Promise.prototype ={
		initialize:function(){
			this.status = 'pending';
			this.queue = [];
			this.value = null;
		},
		getQueue:function(){
			return this.queue;
		},
		setQueue:function(s,value){   /*什么时候调用？为什么会在这里throw*/
			if(s=='fulfilled' || s=='rejected'){
				this.status = s;
				this.value = value || null;
				this.queue = [];	/*执行结束*/
				var frzeeze = Object.frzeeze || function(){};
				frzeeze(this);
			}else{
				throw new Error({
					message:'not support'
				})
			}
		},
		ispending:function(){
			return this.status === 'pending';
		},
		isfulfilled:function(){
			return this.status === 'fulfilled';
		},
		isrejected:function(){
			return this.status === 'rejected';
		},
		then:function(onFulfilled,onRejected){
			var handler = {
				'fulfilled':onFulfilled,
				'rejected':onRejected,
				'deferred':new Deferred()
			}
			if(this.status!=='pending'){
				util.procedure(this.status,handler,value);
			}else{
				/*在 fulfilled 之前，promise 的每一个 then 都会将回调函数压入队列，
				*fulfilled 后，将 fulfilled 的值送给队列的第一个函数，
				*第一个函数执行完毕后，将执行结果再送入下一个函数，依次执行完队列。*/
				this.queue.push(handler);	
			}
			return handler.deferred.promise;
		}
	}

	var util = {
		procedure:function(status,handler,value) {
			var func = handler[status];
			var def = handler.deferred;
		}
	}
})(Underscore)