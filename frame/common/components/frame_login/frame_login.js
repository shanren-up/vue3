define(
	[
		'app',
		'json!./cultureInfo.json',
		'configs',
		'text!./frame_login.html',
		'app_info',
		'frame/common/core/frame_core_helper',
		'comp_modal',
		'css!./frame_login.css',
		'css!./frame_login_theme_default.css',
		'../frame_view/frame_view',
		'../frame_code/frame_code',
	],

	function(app, cultureInfo, configs, template, appInfoIns, frameCoreHelperIns, modal) {

		"use strict";
		Ember.addJsonCultureInfo(cultureInfo);

		app.FrameLoginComponent = Ember.Component.extend({
			layout: Ember.ExtendHelper.compileEx(template),
			templateName: 'frame-login',
			classNames: ['absolute'],
			securityAdapter: null,
			userName: '',
			passWord: '',
			checkCode: '',
			loginType: 1,
			userNameError: '',
			passWordError: '',
			_isButlersys: false,

			init: function() {
				//              this.securityAdapter = securityAdp.create();
				this.loadDefaultUserInfo();
				this._super();
				if(configs.produceId === "butlersys") {
					this._isButlersys = true;
				}
			},
			didInsertElement: function() {},
			willDestroyElement: function() {
				//              if (this.securityAdapter) {
				//                  this.securityAdapter.destroy();
				//                  this.securityAdapter = null;
				//              }
			},
			loadUserNameFromStorage: function() {
				var userName = frameCoreHelperIns.getItemToStorage('frame_user_name');
				if(userName) {
					this.set('userName', userName);
				}
			},
			loadDefaultUserInfo: function() {
				if(this.loadFromSearchString()) {
					this.loadUserNameFromStorage();
				}
			},
			loadFromSearchString: function() {
				var result = false;
				if(appInfoIns.userInfo.userName && appInfoIns.userInfo.passWord) {
					this.set('userName', appInfoIns.userInfo.userName);
					this.set('passWord', appInfoIns.userInfo.passWord);
					this.set('isVisible', false);
					this.loginFromUrl();
				} else {
					result = true;
				}

				return result;
			},
			userNameChanged: Ember.observer('userName', function() {
				frameCoreHelperIns.setItemToStorage('frame_user_name', this.userName);
			}),
			validateInput: function() {
				//&& not ok
				return this.validateUserPass() /**& this.validateVerifyCode()**/;
			},
			validateUserPass: function() {
				var result = true;
				if(this.validate(this.get('userName'))) {
					this.set('userNameError', Ember.oloc('frame_login_sryhmbnwk！'));
					result = false;
				} else {
					this.set('userNameError', "");
				}

				if(this.validate(this.get('passWord'))) {
					this.set('passWordError', Ember.oloc('frame_login_srmmbnwk！'));
					result = false;
				} else {
					this.set('passWordError', "");
				}

				return result;
			},
			validateVerifyCode: function() {
				var result = true;
				if(this.validate(this.get('checkCode'))) {
					this.set('checkCodeError', Ember.oloc('frame_login_sryzmbnwk！'));
					result = false;
				} else {
					this.findNames();
					if(this.childs.verifyCode.validateCode(this.checkCode)) {
						this.set('checkCodeError', Ember.oloc('frame_login_sryzmbzq！'));
						result = false;
					} else {
						this.set('checkCodeError', "");
					}
				}

				return result;
			},
			validate: function(value) {
				return Ember.isEmpty(value.trim());
			},
			handleResult: function(result) {
				switch(result.status) {
					case 0: //成功
						appInfoIns.setUserInfo(result);
						appInfoIns.setOperationPrivilges(result);
						appInfoIns.setAllDataPrivilges(result);
						this.sendAction('success', true);
						break;
					default: //失败
						this.set('passWordError', result.description);
						break;
				}
			},
			_login: function() {
				var self = this;
				//              self.securityAdapter.login(this.userName.trim(), this.passWord.trim()).then(function(result) {
				self.handleResult({
					status: 0
				});
				//              });
			},
			loginFromInput: function() {
				var self = this;
				if(self.validateInput()) { //loginByDb  login
					self._login();
				}
			},
			loginFromUrl: function() {
				var self = this;
				if(self.validateUserPass()) { //loginByDb  login
					self._login();
				}
			},
			actions: {
				updateUserName: function() {},
				updatePassword: function() {},
				login: function() {
					if(configs.verifyCodeEnabled) {
						this.loginFromInput();
					} else {
						this.loginFromUrl();
					}
				},
				loginButlersys: function() {
					this.sendAction('success', true);
				},
				registerButlersys: function() {
					// 调用popup方法
					//                  require(['plugin/butlersys/views/butlersys_register_view/butlersys_register_view'], function() {
					//                      modal.popup({
					//                          targetObject: this, //父对象，支持弹出多层
					//                          isDefaultStyle: false, //是否默认样式
					//                          sizeClass: 'butlersys-view-comp-ember-sizecss', //弹出框大小:large、small，或自定义整体样式
					//                          bodyClass: 'butlersys-view-comp-ember-bodycss', //自定义内容样式
					//                          headerText: "新用户注册", //头部标题名称
					//                          contentComponentName: 'butlersys-register-view', //内容组件
					//                          parameters: {}, //内容传递参数
					//                          hasHeader: true,
					//                          hasFooter: false, //是否有底部，默认false
					//                          enforceModality: true,
					//                          close: function() {}
					//                      });
					//                  }.bind(this));
				}
			}
		});
	});