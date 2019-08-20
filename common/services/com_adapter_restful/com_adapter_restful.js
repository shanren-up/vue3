define(
	[
		'configs'
	],

	function(configs) {

		'use strict';

		return Ember.Object.extend({
			baseUrl: '',
			callBack: null,
			timer: null,
			init: function() {
				//				this.set('baseUrl', 'http://' + configs.locators.XX.host + '/' + configs.locators.XX.svcId + '/');
			},
			willDestroy: function() {
				if(this.timer) {
					clearInterval(this.timer);
					this.timer = null;
				}
				if(this.callBack) {
					this.callBack = null;
				}
			},
			/**
			 * 单次接口查询
			 * @param {Object} restfulModel
			 */
			getRestfulData: function(restfulModel) {
				var self = this;
				if(restfulModel.url === "") {
					console.log("请求url不能为空!");
				}
				return new Ember.RSVP.Promise(function(resolve, reject) {
					$.ajax({
						type: restfulModel.type,
						url: self.baseUrl + restfulModel.url,
						contentType: restfulModel.contentType,
						dataType: restfulModel.dataType,
						data: JSON.stringify(restfulModel.data),
						async: restfulModel.async
					}).then(function(result) {
						// on success
						resolve(result);
					}, function(reason) {
						// on failure
						reject(reason);
					});
				});
			},
		});
	});