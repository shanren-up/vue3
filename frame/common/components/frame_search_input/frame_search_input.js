define(
	[
		'app',
		'text!./frame_search_input.html',
		'css!./frame_search_input.css',
		'delayTooltip'
	],

	function (app, template) {

	"use strict";

	app.FrameSearchInputInsertHelper = Ember.Helper.helper(function (params, hash) {
			var component = Ember.ExtendHelper.lookupFactory(params[0]);
			if (component) {
				var result = component.create({
						searchViewMenuItems : params[1],
						isTyping : params[3],
						didInsertElement : function () {

							$("[href=" + params[2] + "]").delayTooltip({
								animation : true,
								html : true,
								placement : 'bottom',
								container : 'body',
								title : this.element /*$('.frame-user-tooltip').text()*/
							});

						}
					});
				result.append();
			}
		});

	app.FrameSearchInputComponent = Ember.Component.extend({
			layout : Ember.ExtendHelper.compileEx(template),
			templateName : 'frame-search-input',
			init : function () {
				this._super();
			},
			didInsertElement : function () {
				$("[href=" + this.targetId + "]").delayTooltip({
					animation : true,
					html : true,
					placement : 'bottom',
					container : 'body',
					title : this.element /*$('.frame-user-tooltip').text()*/
				});
			},
			actions : {
				showView : function (menuItem, parameters) {
					menuItem.parameters = parameters;
					Ember.__frameViewInstance.changeMenuItem(menuItem);
				},
				changeWord : function (word) {
					this.sendAction("changeWord", word);
				}
			}
		});

});
