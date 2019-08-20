define(function() {

	"use strict";
	return {
		restfulModel: Ember.Object.extend({
			init: function() {
				this.set('type', 'GET'); //请求类型 GET POST DELETE 
				this.set('dataType', 'json'); //返回数据类型
				this.set('async', true); //同步异步 true异步，false同步
				this.set('contentType', "application/json"); //内容编码类型
				this.set('url', ''); //请求URL
				this.set('data', null); //参数对象{id：1001,name:'集中故障'}
				this.set('ifTimer', false); //是否刷新
				this.set('interval', 10000); //刷新周期 毫秒
			}
		}),
	};
});