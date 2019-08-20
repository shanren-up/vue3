define(
	[
		'app',
		'configs',
        'app_info',
		'text!./frame_default.html',
		'frame/common/core/frame_core_helper',
		'frame/common/core/frame_core',
		'css!./frame_default.css',
		'../frame_login/frame_login',
		'../frame_login_new/frame_login_new',
		'../frame_view/frame_view',
        'lib/particleground'
	],

	function(app, configs,app_info, template, appCoreHelper, frameCore) {

		'use strict';

		app.FrameDefaultComponent = Ember.Component.extend({
			layout: Ember.ExtendHelper.compileEx(template),
			templateName: 'frame-default',
			authentication: configs.authentication,
			isNewAuthentication: configs.isNewAuthentication,
			classNames: ['absolute'],
			session: Ember.inject.service('session'),
			checkAuthenticationTimer: null,
			bssAuthUrl: null,
			bssApiUri: null,
			// 应用id 统计鉴权区分不用应用 用,
			_appId: '-1',
			_expiresIn: 60,
			_checkAuthenTimer: null,
			_isCheckAuthenJust: false,
			_isShowNoAuthenView: false,
            isShowWelcome: false,
			init: function() {
				this._super();

				//              if (configs.authentication) {
				//                  if (configs.isNewAuthentication) {
				//                      this.bssAuthUrl = location.protocol + '//' + configs.locators.authenticationUrl.host + '/' + configs.locators.authenticationUrl.svcId;
				//                      this.bssApiUri = location.protocol + '//' + configs.locators.systemManagerUrl.host + '/' + configs.locators.systemManagerUrl.svcId;
				//                      this.securityAdapter = bssAdapter.create();
				//                      //this._checkAuthentication();
				//                      this.get('session').on('invalidationSucceeded', function() {
				//                          console.log('invalidationSucceeded');
				//                          // TODO 登出记录 有缺陷
				//                          // this._writeLogoutLog();
				//                      }.bind(this));
				//                  } else {
				//                      this.securityAdapter = securityAdp.create();
				//                  }
				//              }
				// TODO 关掉浏览器实际上并没有登出 框架里不是真的登录，只是检测状态，所以应该记载bss服务这边
				// 登出日志由unload事件触发，刷新、关闭浏览器、地址栏输入新地址都会触发
				// Ember.$(window).on('unload', this._writeLogoutLog.bind(this));
			},
			didInsertElement: function() {
				if(configs.authentication && configs.isNewAuthentication && !configs.authNeverTimeout) {
					this.$().on('mousemove', this._handleMousemove.bind(this));
				}
				this.$('#frameDefaultWelcome').particleground({
                    dotColor: '#CCCCCC',
                    lineColor: '#062d64'
                });
                if(sessionStorage.getItem('3minSar') === 'isLogin'){
                	var userinfo = sessionStorage.getItem('userInfo');
                	if(userinfo){
                        app_info.userInfo2 = {
                            userName:JSON.parse(userinfo).userName,
                            userId:JSON.parse(userinfo).userId,
                            role:JSON.parse(userinfo).role,
                        };
                        this.set('isShowWelcome',false);
					}
                   this.set('authentication',false);
                }
			},
			willDestroyElement: function() {
				if(this.securityAdapter) {
					this.securityAdapter.destroy();
					this.securityAdapter = null;
				}

				var checkAuthenticationTimer = this.get('checkAuthenticationTimer');
				if(checkAuthenticationTimer) {
					Ember.run.cancel(checkAuthenticationTimer);
					this.set('checkAuthenticationTimer', null);
				}
				this.$().off();
				clearTimeout(this._checkAuthenTimer);
			},
			willRender: function() {
				var _this = this,
					later;
				if(configs.authentication && configs.isNewAuthentication) {
					this._checkAuthentication();

					// loop check
					later = function() {
						return Ember.run.later(this, function() {
							_this._checkAuthenticationStatus();
							_this.set('checkAuthenticationTimer', later());
						}, 5000);
					};
					if(!this.get('checkAuthenticationTimer')) {
						this.set('checkAuthenticationTimer', later());
					}
				}

			},
			_isNeedAuthentication: Ember.computed('authentication', '_isShowNoAuthenView', function() {
				if(this.authentication && !this._isShowNoAuthenView) {
					return true;
				}
				return false;
			}),
			// 有操作时保持更新鉴权状态防止登录过期
			_handleMousemove: function() {
				if(!this._isCheckAuthenJust) {
					this._checkAuthentication();
					this._isCheckAuthenJust = true;
					// 每分钟最多更新一次状态
					this._checkAuthenTimer = setTimeout(function() {
						this._isCheckAuthenJust = false;
					}.bind(this), 6e4);
				}
			},
			// 保持页面打开时用不超时
			_neverTimeout: function() {
				var _this = this,
					later = function() {
						// loop update authentication
						return Ember.run.later(this, function() {
							_this._checkAuthentication();
							later();
						}, 60000);
					};
			},
			_checkAuthenticationStatus: function() {
				//console.log('_checkAuthenticationStatus');
				var _this = this;
				this._authorize(function(headers) {
					_this.securityAdapter._getTokenStatus(headers).then(function(expiresIn) {
						if(expiresIn < 120) {
							console.log('Authentication expires in: ' + expiresIn + 's');

							// 如设置永不超时则在即将超时时更新登录状态
							if(configs.authNeverTimeout) {
								_this._updateAuthenticationStatus();
							}
						}
					}).catch(function(error) {
						console.warn('Authentication expired: ', error);
						_this.get('session').invalidate();
					});
				});
			},
			_updateAuthenticationStatus: function() {
				this._checkAuthentication();
			},
			_checkAuthentication: function() {
				console.log('Check Authentication');
				var _this = this,
					isAuthenticated = this.get('session.isAuthenticated') || false,
					hash;

				if(_this.get('session.logout')) {
					this.set('session.logout', false);
					if(configs.authenticator === 'oauth2-implicit') {
						this.set('session.checking', true);
						window.location = location.protocol + '//' + configs.locators.authenticationUrl.host + '/' + configs.locators.authenticationUrl.svcId +
							'/logout?service=' + encodeURIComponent(window.location.href.replace(/&state=[^=&]*/, ''));
						return;
					}
				}

				if(this.get('session.checking')) {
					console.log('Skip check authentication if checking.');
					return;
				}
				this.set('session.checking', true);

				if(configs.authenticator === 'oauth2-implicit') {
					hash = this._unparam(window.location.hash);
					if(!isAuthenticated) {
						this._oauth2ImplicitAuthenticate(hash);
					} else {
						if(hash && hash.access_token) {
							this._oauth2ImplicitAuthenticate(hash);
							this.set('session.checking', false);
						} else if(!this.get('session.userId')) {
							this._oauth2ImplicitAuthenticate(this.get('session.data.authenticated'));
						} else if(this.get('session.authenticationExpires') && this.get('session.authenticationExpires') < new Date().getTime()) {
							console.log('Refresh Authentication');
							// Check authentication status after some time
							this._authorize(function(headers) {
								_this.securityAdapter._getUserInfo(headers).then(function() {
									var expires = new Date().getTime() + _this._expiresIn;
									_this.set('session.authenticationExpires', expires);
									_this.set('session.checking', false);
								}).catch(function(error) {
									console.warn('Authentication expired:', error);
									_this.get('session').invalidate();
								});
							});
						} else {
							this.set('session.checking', false);
						}
					}
				}
			},
			_authorize: function(block) {
				this.get('session').authorize('authorizer:' + configs.authorizer, block);
			},
			_oauth2ImplicitAuthenticate: function(data) {
				var _this = this;

				this.get('session').authenticate('authenticator:oauth2-implicit', data).then(function() {
					history.replaceState({}, configs.produceName, window.location.href.replace(/#.*?$/, ''));

					console.log('Access token: ' + data.access_token);

					_this._expiresIn = Math.min(data.expires_in / 2, 600) * 1000;
					var expires = data.expires_in ? new Date().getTime() + _this._expiresIn : null;
					_this.set('session.authenticationExpires', expires);

					_this._authorize(function(headers) {
						_this.securityAdapter.refreshUserInfo(headers).then(function(response) {
							_this.set('session.userId', response.userId);
							_this.set('session.checking', false);
							_this.trigger('authenticated');
						}, function(error) {
							_this.set('session.userId', null);
							_this.set('session.checking', false);
							console.error('Authorize failed:', error);
							// Force logout if failed.
							_this.set('session.logout', true);
							_this.get('session').invalidate();
						});
						_this.securityAdapter.refreshZones(headers);
					});
				}, function(reason) {
					if(!_this._isExcludePages()) {
						_this._oauth2ImplicitRedirect();
					} else {
						frameCore.setMeauToExcludeAuthen();
						_this.set('_isShowNoAuthenView', true);
					}
				});
			},
			_isExcludePages: function() {
				var searchStr = decodeURIComponent(window.location.search),
					searchParam = appCoreHelper.parseQueryString(searchStr);
				return searchParam.templateName && configs.bssExcludePages.includes(searchParam.templateName);
			},
			_oauth2ImplicitRedirect: function() {
				var url = this.bssAuthUrl + '/oauth2.0/authorize?response_type=token&client_id=' + configs.bssClientId,
					redirectUrl,
					state = '';
				if(configs.bssCustomLoginPage) {
					redirectUrl = (window.location.search || '') + (window.location.hash || '');
					// url = typeof configs.bssCustomLoginPage === 'string' ? configs.bssCustomLoginPage : './configures/loginStyle/' + configs.produceId + '/login/login.html';
					url = './sso-login.html' + (redirectUrl ? '?redirect_uri=' + encodeURIComponent(redirectUrl) : '');
					window.location = url;
					return;
				}

				// TODO: 记录state map用于用户从单点登录跳转回来恢复之前的视图
				// state = Base64.encode(Math.floor((Math.random() + 0.1) / 1.1 * 1000));
				// this.set('redirect_state.' + state, currentTemplateName);
				window.location = url + (url.indexOf('?') === -1 ? '?' : '&') +
					'redirect_uri=' + encodeURIComponent(window.location.href.replace(/&state=[^=&]*/, '')) +
					'&state=' + state;
			},
			_unparam: function(str, filters) {
				filters = filters || [];
				var result = {},
					arr;
				if(typeof str === 'string') {
					str = str.replace(/&$|^[?#]/, '');
					arr = str.split('&');
					$.each(arr, function(i, kv) {
						var matches = kv.match(/^([^=]+)=(.*)$/);
						if(matches !== null) {
							if(filters.length === 0 || filters.length > 0 && $.inArray(matches[1], filters) !== -1) {
								result[matches[1]] = (decodeURIComponent(matches[2]) || '').replace('+', ' ');
							}
						}
					});
				}
				return result;
			},
			_writeLogoutLog: function() {
				// 登出写入日志
//				logAdapter.writeLog(logAdapter.logModel.create({
//					// 登出 ologId
//					ologId: -1,
//					applicationId: Number(this._appId),
//					memo: Ember.oloc('frame_default_yhdc'),
//					specificOpType: 'LongOut',
//					// 是否登录操作
//					isLoginOp: true,
//					// 日志级别 'Debug', 'Info', 'Major', 'Warning', 'Error', 'None'
//					logLevel: 'Major',
//					// 操作是否成功
//					isSuccess: true,
//				}));
			},
			actions: {
                backToIndex: function(){
                    this.set('isShowWelcome', true);
                    Ember.run.later(function(){
                        this.$('#frameDefaultWelcome').particleground({
                            dotColor: '#CCCCCC',
                            lineColor: '#062d64'
                        });
					}.bind(this), 500);
				},
                gotoLogin: function(){
                	this.set('isShowWelcome', false);
				},
				success: function(result) {
					this.set('authentication', !result);
				},
				loginCheck: function() {
					/* var self = this;
					if (appInfoIns.userInfo.userName || appInfoIns.userInfo.passWord) {
					self.securityAdapter.login(appInfoIns.userInfo.userName, appInfoIns.userInfo.passWord).then(function (result) {
					self.set('authentication', result.status != 0);
					});
					} else {
					self.set('authentication', true);
					} */
				},
				checkAuthentication: function() {
					this._checkAuthentication();
				},
				invalidateSession: function() {}
			}
		});
	});