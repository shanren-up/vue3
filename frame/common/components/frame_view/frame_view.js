define(
	[
		'app',
		'json!./cultureInfo.json',
		'text!./frame_view.html',
		'configs',
		'app_info',
		'frame/common/core/frame_core_helper',
		'common/components/comp_msgbox/comp_msgbox',
		'frame/configures/config',
		'css!./frame_view.css',
		'../frame_header/frame_header',
		'../frame_header/frame_header_mini/frame_header_mini',
		'../frame_container/frame_container',
		'../frame_footer/frame_footer',
		'../frame_vertical_meau/frame_vertical_meau'
	],

	function(app, cultureInfo, template, configs, appInfoIns, frameHelper, msgbox, frameConfig) {

		'use strict';

		Ember.addJsonCultureInfo(cultureInfo);

		app.FrameViewComponent = Ember.Component.extend({
			layout: Ember.ExtendHelper.compileEx(template),
			templateName: 'frame-view',
			appInfoIns: appInfoIns,
			session: Ember.inject.service('session'),
			classNames: ['absolute'],
			menuItems: [],
			isShowHeader: true,
			// 是否显示横排二级菜单
			_isShowNav: true,
			// 是否显示竖排菜单
			_isShowVerMeau: false,
			// 是否是默认菜单
			isDefaultMeau: true,
			/**
			 * 增加meauTypeclass 为了实现不同meauType 菜单栏和header高度不一致问题
			 * @property _meauType
			 * @type {string}
			 * @private
			 */
			_meauType: '',
			msgbox: null,
			init: function() {
				var _this = this;
				this._super();
				this.msgbox = msgbox.create();
				this._meauType = 'meau-type' + configs.meauType;
				if(configs.meauType && (+configs.meauType !== 1)) {
					this._isShowNav = false;
					if([2, 3, 5].includes(+configs.meauType)) {
						this._isShowVerMeau = true;
					}
					if([3, 5].includes(+configs.meauType)) {
						this.set('menuItems', appInfoIns._menuItems);
						// this.set('_defaultMenu', this.attrs.appInfoIns.value._defaultMenu);
					}
				}
				this._getMeauStatusFormStorage();
				// 菜单鉴权 旧版登录鉴权菜单鉴权在frameHeader
				if(configs.authentication && configs.isNewAuthentication) {
					this._checkMenuAuthentication();
				}
				this.parentView.on('authenticated', function() {
					// 登录成功后获取一次meau状态
					// _this._getMeauStatusFormStorage();
					_this.trigger('authenticated');
				});
			},
			didInsertElement: function() {
				this.findNames();
				this.showHeader(configs.showHeader);
				this.showFooter(configs.showFooter);
				$('title').text(configs.produceName);
			},
			headerComponentName: Ember.computed('configs.meauType', function() {
				if([3, 2, 5].includes(+configs.meauType)) {
					return 'frame-header-mini';
				} else {
					return 'frame-header';
				}
			}),
			containerTopStyle: Ember.computed('menuItems', 'isShowHeader', function() {
				var top = 0;
				if(this.isShowHeader) {
					if(+configs.meauType === 1) {
						top = Ember.isNone(this.menuItems) || this.menuItems.length === 0 ? 50 : 74;
					} else if([3, 5].includes(+configs.meauType)) {
						top = 75;
					} else {
						top = 75;
					}
				}
				return new Ember.String.htmlSafe('top:' + top + 'px;');
			}),
			verticalMeauEmptyClassName: Ember.computed('menuItems', '_isShowVerMeau', function() {
				// 手动隐藏vertical菜单时为了header 变长也增加此类
				if(!this._isShowVerMeau) {
					return 'vertical-meau-empty';
				}
				if(frameConfig.containerConfig.isAutoHideVerticalMeauWhenEmpty &&
					parseInt(configs.meauType, 10) === 2 && Ember.isEmpty(this.get('menuItems'))) {
					return 'vertical-meau-empty';
				}
			}),
			verticalMeauTopStyle: Ember.computed('containerTopStyle', function() {
				if([3, 5].includes(+configs.meauType)) {
					return 'top:0px;'.htmlSafe();
				} else {
					return this.get('containerTopStyle');
				}
			}),
			_getVerticalMeauStatusKey: function() {
				// return (appInfoIns.userInfo.userId || '-1') + 'verticalMeauStatus';
				// 只能本地存储取用户区分意义不大  而且还会造成登录后菜单变化屏幕闪动 先取消
				return 'verticalMeauStatus';
			},
			_getMeauStatusFormStorage: function() {
				var key = this._getVerticalMeauStatusKey();
				var meauStatusStr = frameHelper.getItemToStorage(key);
				this.set('isDefaultMeau', meauStatusStr !== 'simple');
			},
			_setMeauStatusToStorage: function(meauStaus) {
				var key = this._getVerticalMeauStatusKey();
				frameHelper.setItemToStorage(key, meauStaus ? 'default' : 'simple');
			},
			showHeader: function(visibility) {
				this.set('isShowHeader', visibility);
			},
			showFooter: function(visibility) {
				if(visibility) {
					this.$('.frame-container-dropup').css('display', 'block');
					this.$('.frame-container-lgscreen-close').css('display', 'block');
					this.$('.frame-container-back').css('display', 'block');
				} else {
					this.$('.frame-view-child-loc2').css('top', '0px');
					this.$('.frame-container-dropup').css('display', 'none');
					this.$('.frame-container-lgscreen-close').removeClass('show').css('display', 'none');
					this.$('.frame-container-back').removeClass('show').css('display', 'none');
					this.$('.frame-container-back').css('left', '0px');
					this.$('.frame-view-container').addClass('no-footer');
				}
			},
			changeMenuItem: function(item) {
				var openIndex, setIndex;
				if(!Ember.isEmpty(item.templateName)) {
					this.childs.frameContainer.addView(item);
				} else {
					if(item.childViewMenus && item.childViewMenus.length > 0) {
						// 兼容之前写法
						if(item.showFirstChildView) {
							openIndex = 0;
							// 打开子菜单序号
						} else if(!Ember.isNone(item.showChildViewIndex)) {
							setIndex = parseInt(item.showChildViewIndex, 10);
							openIndex = item.childViewMenus[setIndex] ? setIndex : 0;
						}
						if(!Ember.isNone(openIndex)) {
							// 递归直到打开视图或者没有设置打开子菜单退出
							this.changeMenuItem(item.childViewMenus[openIndex]);
						}
					}
				}
			},
			openView: function(parameters) {
				var targetItem = this.appInfoIns._systemMenus.findBy('templateName', parameters.templateName);
				if(targetItem) {
					var tmpItem = Ember.copy(targetItem);
					tmpItem.parameters = parameters;
					this.changeMenuItem(tmpItem);
				}
			},
			delView: function(viewId) {
				this.childs.frameContainer.delViewByViewId(viewId);
			},
			_checkMeauSetting: function(meau) {
				// 切换视图需要一些时间所以延时设置些时间所以延时设置
				Ember.run.later(this, function() {
					if(meau && meau.hideVerticalMeau) {
						this.set('_isShowVerMeau', false);
					} else {
						this.set('_isShowVerMeau', true);
					}
				}, 500);
			},
			/**
			 * 菜单鉴权 检查操作权限获取成功后调用菜单鉴权方法
			 * @method _checkMenuAuthentication
			 * @private
			 */
			_checkMenuAuthentication: function() {
				if(this.appInfoIns.hasGotOperations) {
					this._menuAuthentication();
				} else {
					this.appInfoIns.one('gotOperations', this._menuAuthentication.bind(this));
				}
			},
			/**
			 * 菜单鉴权 获取操作权限成功后调用
			 * @method _menuAuthentication
			 * @private
			 */
			_menuAuthentication: function() {
				this._checkMeauListAuthentication(this.appInfoIns._menuItems);
				this.findNames();
				if(this.childs.frameHeader) {
					this.childs.frameHeader.notifyPropertyChange('_menuItems');
					this.childViews.invoke('notifyPropertyChange', 'menuItems');
					// 如果frameHeader组件不存在说明 在didInsertElement之前执行了菜单鉴权 在didInsertElement之后通知下属性变更
				} else {
					this.one('didInsertElement', function() {
						this.findNames();
						this.childs.frameHeader.notifyPropertyChange('_menuItems');
						this.childViews.invoke('notifyPropertyChange', 'menuItems');
					}.bind(this));
				}

			},

			/**
			 * 鉴权参数菜单中需要鉴权菜单
			 * @method _checkMeauListAuthentication
			 * @param {Array|Object} meauList - 菜单或者菜单列表 
			 * @param {number=} appId - 对应的appId  
			 * @private
			 */
			_checkMeauListAuthentication: function(meauList, appId) {
				if(Array.isArray(meauList)) {
					for(var i = 0; i < meauList.length; i++) {
						if(!meauList[i] || !(meauList[i].appId || appId)) {
							continue;
						}
						if(meauList[i].operationId &&
							!this.appInfoIns.userInfo.checkOperationUniform(meauList[i].appId || appId,
								meauList[i].operationId)
						) {
							meauList.removeAt(i);
							i--;
						} else if(meauList[i].childViewMenus && meauList[i].childViewMenus.length) {
							this._checkMeauListAuthentication(meauList[i].childViewMenus, meauList[i].appId || appId);
						}
					}
				} else {
					console.error('TypeError meauList is not a array', meauList);
				}
			},
			actions: {
				clickMenuItem: function(item, defaultMenu, noAction) {
					// configs.meauType为3时 只有竖排菜单menuItems为所有菜单不能再这里设置值
					if(![3, 5].includes(+configs.meauType)) {
						this.set('menuItems', item.childViewMenus);
					}
					if(+configs.meauType === 2) {
						this._checkMeauSetting(item);
					}
					if(noAction) {
						return;
					}
					var targetMenu = Ember.isNone(defaultMenu) ? item : defaultMenu;
					this.changeMenuItem(targetMenu);
				},
				clickNavigation: function(item) {
					this.changeMenuItem(item);
				},
				delView: function(item) {
					this.childs.frameContainer.delView(item);
				},
				loginCheck: function() {
					this.sendAction('loginCheck');
				},
				toggleMeauType: function() {
					this.toggleProperty('isDefaultMeau');
					this._setMeauStatusToStorage(this.isDefaultMeau);
					// 触发resize事件通知视图，需要时重绘
					Ember.run.later(function() {
						$(document).trigger('resize');
					}, 50);
				},
				toggleVerticalMeauVisible: function(value) {
					if([2, 3, 5].includes(+configs.meauType)) {
						if(Ember.isEmpty(value)) {
							this.toggleProperty('_isShowVerMeau');
						} else {
							this.set('_isShowVerMeau', !!value);
						}
					} else {
						throw new SyntaxError(Ember.oloc('frame_view_zyzyverticalMeauskyqh'));
					}
				},
				toggleHeaderVisible: function(value) {
					if(Ember.isEmpty(value)) {
						this.toggleProperty('isShowHeader');
					} else {
						this.set('isShowHeader', !!value);
					}
				},
				showViewChange: function(item) {
					// var templateName = parseInt(item.viewtype, 10) !== 1 ? item.templateName : item._originTemplateName;
					var isChangeVerticalMeauDataPossible;
					this.findNames();
					if(this.get('headerComponentName') === 'frame-header') {
						this.childs.frameHeader.handleViewChange(item);
						// 有header菜单时 一级菜单在header菜单里面 
						if(item._menuLevel === 0) {
							return;
						}
						isChangeVerticalMeauDataPossible = true;
					}
					if(this.childs.verticalMeau && item.templateName) {
						// header菜单选中状态变化 可能影响verticalMeau数据源
						Ember.run.later(this, function() {
							this.childs.verticalMeau.handleViewChange(item, isChangeVerticalMeauDataPossible);
						});
					}
				},
				frameLogout: function() {
					this.msgbox.showConfirm(Ember.oloc('frame_view_qrzx'), function(isConfirm) {
						if(isConfirm) {
							if(this.get('session')) {
								this.set('session.logout', true);
								this.get('session').invalidate();
							} else {
								location.reload();
							}
						}
					}.bind(this));
				},
				frameExit: function() {
					this.msgbox.showConfirm(Ember.oloc('frame_view_qrtc'), function(isConfirm) {
						if(isConfirm) {
							if(this.get('session')) {
								this.set('session.logout', true);
								this.get('session').invalidate();
							}
							setTimeout(function() {
								window.close();
								window.open('about:blank', '_self').close();
							}, 50);
						}
					}.bind(this));
				},
				sendActionToFrameContainer: function(paramList) {
					if(!this.childs.frameContainer) {
						this.findNames();
					}
					this.childs.frameContainer.send.apply(this.childs.frameContainer, paramList);
				}
			}
		});
	});