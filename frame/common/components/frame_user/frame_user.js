define(
	[
		'app',
		'json!./cultureInfo.json',
		'text!./frame_user.html',
		//      'text!./frame_user_tooltip.html',
		'app_info',
		'comp_modal',
		'frame/configures/config',
		'css!./frame_user.css',
		'css!./frame_user_theme_default.css',
		//      'delayTooltip',
	],

	function(app, cultureInfo, template, appInfoIns, modal, frameConfig) {

		'use strict';

		Ember.addJsonCultureInfo(cultureInfo);

		app.FrameUserComponent = Ember.Component.extend({
			layout: Ember.ExtendHelper.compileEx(template),
			userInfo: appInfoIns.userInfo,
			// showButlersys: false,
			isMiniHeader: false,
			userName: Ember.computed.alias('userInfo.userName'),
			config: frameConfig.userConfig,
			init: function() {
				this._super();
				// if (configs.produceId === 'butlersys') {
				//     this.set('showButlersys', true);
				// } else {
				//     this.set('showButlersys', false);
				// }
				// var _this = this;
				// this.setUserInfo(appInfoIns);

				// this.parentView.on('authenticated', function() {
				//     _this.setUserInfo(appInfoIns);
				// });
			},
			didInsertElement: function() {
				var trigger = this.config.trigger || 'hover';
				if(trigger === 'click') {
					this.$(document).on('click.frameUser', this.handleClick.bind(this));
				}
				//              this.$('[data-toggle="tooltip"]').delayTooltip({
				//                  trigger: trigger,
				//                  html: true,
				//                  placement: 'bottom',
				//                  container: 'body',
				//                  title: this.$('.frame-user-tooltip').html()
				//              });
			},
			willDestroyElement: function() {
				this.$(document).off('.frameUser');
			},
			handleClick: function(event) {
				event = event || window.event;
				var target = event.target || event.srcElement;
				if(!this.$().find(target).length) {
					// Ember.$("div[id*='delayTooltip']").css('display', 'none');
					this.$('[data-toggle="tooltip"]').delayTooltip('hide');
				} else {
					this.$('[data-toggle="tooltip"]').delayTooltip('toggle');
				}
			},
			_menuListComputed: Ember.computed(function() {
				frameConfig.userConfig.menuList.forEach(function(item) {
					item.isModal = item.type === 'modal';
					item.isUrl = item.type === 'url';
					item.isDownload = item.type === 'download';
				});
				return frameConfig.userConfig.menuList.filterBy('show', true);
			}),
			butlersysAdd: function() {
				var that = this;
//				require(['plugin/butlersys/common/components/butlersys_comp_popup/butlersys_comp_popup'], function() {
//					modal.popup({
//						targetObject: that,
//						isDefaultStyle: false,
//						hasHeader: true, //是否包含默认头部
//						hasMax: false, //头部是否包含“最大化”按钮
//						hasPhoto: false, //头部是否包含“截图”按钮
//						headerClass: 'butlersys-comp-popup-modal-header',
//						headerText: Ember.oloc('frame_user_xzxt'),
//						parameters: {},
//						contentComponentName: 'butlersys-comp-popup', //内容组件
//						sizeClass: 'butlersys-comp-popup-modal-sizecss', //弹出框大小:large、small，或自定义样式
//						bodyClass: 'butlersys-comp-popup-modal-bodycss',
//						enforceModality: true
//					});
//				});
			},
			_openPasswordView: function() {
				var that = this;
//				require(['plugin/systemManager/views/system_update_password_manager_view/system_update_password_manager_view'], function() {
//					modal.popup({
//						targetObject: that,
//						isDefaultStyle: true,
//						hasHeader: true, //是否包含默认头部
//						hasMax: false, //头部是否包含“最大化”按钮
//						hasPhoto: false, //头部是否包含“截图”按钮
//						headerText: Ember.oloc('frame_user_xgmm'),
//						contentComponentName: 'system-update-password-manager-view', //内容组件
//						sizeClass: 'system-update-password-manager-sizecss', //弹出框大小:large、small，或自定义样式
//						// bodyClass: 'system-update-password-manager-bodycss',
//						enforceModality: true,
//					});
//				});
			},
			_showOnlineUsers: function() {
				var that = this;
//				require(['plugin/systemManager/views/system_onlineuser_view/system_onlineuser_view'], function() {
//					modal.popup({
//						targetObject: that,
//						isDefaultStyle: true,
//						hasHeader: true, //是否包含默认头部
//						hasMax: false, //头部是否包含“最大化”按钮
//						hasPhoto: false, //头部是否包含“截图”按钮
//						headerText: Ember.oloc('frame_user_online_user'),
//						contentComponentName: 'system-onlineuser-view', //内容组件
//						sizeClass: 'system-onlineuser-sizecss', //弹出框大小:large、small，或自定义样式
//						// bodyClass: 'system-onlineuser-bodycss',
//						enforceModality: true,
//					});
//				});
			},
			_showModalDefault: function(item) {
				var that = this;
				require([item.url], function() {
					modal.popup(Ember.$.extend({
						targetObject: that,
						isDefaultStyle: true,
						enforceModality: true,
						hasHeader: true, //是否包含默认头部
						hasMax: false, //头部是否包含“最大化”按钮
						hasPhoto: false, //头部是否包含“截图”按钮
						headerText: Ember.oloc('frame_user_title'),
						contentComponentName: item.componentName, //内容组件
						sizeClass: item.componentName + '-size', //弹出框大小:large、small，或自定义样式
						// bodyClass: 'system-onlineuser-bodycss',
					}, item.parameter));
				});
			},

			actions: {
				toolTipMenu: function(menu, isLink) {
					this.$('[data-toggle="tooltip"]').delayTooltip('hide');
					event.stopPropagation();
					if(isLink) {
						return;
					}
					if(event) {
						event.preventDefault();
					}
					switch(menu) {
						case 'userInfo':
							this._openPasswordView();
							break;
						case 'version':
							this.showVersion();
							break;
						case 'butlersysAdd':
							this.butlersysAdd();
							break;
						case 'phone':
							break;
						case 'exit':
							this.sendActionToFrame('frameExit');
							break;
						case 'logOut':
							this.sendActionToFrame('frameLogout');
							break;
						case 'onlinenum':
							this._showOnlineUsers();
							break;
					}
					if(menu.isModal) {
						this._showModalDefault(menu);
					}
				},
				showView: function(item) {
					this.sendAction('showView', item);
				}
			}
		});
	});