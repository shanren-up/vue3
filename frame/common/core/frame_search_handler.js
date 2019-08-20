define([

	],
	function () {

	"use strict";

	var searchHandler = Ember.Object.extend({
			init : function () {},
			willDestroy : function () {},
			search : function (parameter) {
				this.query(parameter);
			},
			query : function (parameter) {},
			searchCallBack : function (callBack) {
				this.set('callBack', callBack);
			},
			queryCallBack : function (result) {
				var callBack = this.get('callBack');
				if (this.callBack) {
					this.callBack(result);
				}
			}
		});

	return searchHandler;
});
