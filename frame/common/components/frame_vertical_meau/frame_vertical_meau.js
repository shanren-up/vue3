/**
 * Modified on 2017年9月14日
 * setActiveMenu和_queryActiveMenu增加meauName对比来确认是否同意菜单
 * 解决多个菜单配置相同视图的选中状态异常
 */
define(
	[
		'app',
		'text!./frame_vertical_meau.html',
		'configs',
		'css!./frame_vertical_meau.css',
		'./frame_vertical_simple/frame_vertical_simple.js',
		'./frame_vertical_default/frame_vertical_default.js',
		'../frame_dropdown_menu/frame_dropdown_menu',
	],

	function(app, template, configs) {

		'use strict';
		// 解决阿尔及利亚主题 他用修改问题
		if(configs.produceId === 'TNMS_Algeria') {
			require(['css!frame/common/components/frame_vertical_meau/frame_vertical_meau_true_theme_tnmsalgeria.css']);
		} else {
			require(['css!frame/common/components/frame_vertical_meau/frame_vertical_meau_theme_default.css']);
		}

		app.FrameVerticalMeauComponent = Ember.Component.extend({
			layout: Ember.ExtendHelper.compileEx(template),
			templateName: 'frame-vertical-meau',
			classNames: ['frame-vertical-meau', 'absolute'],
			menuItems: null,
			_activeMenu: null,
			isDefaultMenu: true,
			/**
			 * 当前鼠标是否在菜单上
			 * @property {boolean} _isMouseOver
			 * @private
			 */
			_isMouseOver: false,
			/**
			 * 当前菜单是否需要滚动
			 * @property {boolean} _needScroll
			 * @private
			 */
			_needScroll: false,
			_timer: null,
			dataSource: Ember.computed('menuItems', function() {
				// 数据变化后 重新检测是否需要scroll
				Ember.run.later(this, this._checkIfNeedScroll, 500);
				return this.convertMenuData(this.menuItems);
			}),
			init: function() {
				this._super();
			},
			didInsertElement: function() {},
			willDestroyElement: function() {
				clearTimeout(this._timer);
			},
			setActiveMenu: function(menuItem, isSendAction) {
				this._cancelActive();
				// 数据变化后 重新检测是否需要scroll
				Ember.run.later(this, this._checkIfNeedScroll, 500);
				this._activeMenu = menuItem;
				var result, dataSource = this.get('dataSource');
				for(var i = 0; i < dataSource.length; i++) {
					if(!dataSource[i]) {
						continue;
					}
					// 查找菜单
					if(dataSource[i]._menuId === menuItem._menuId) {
						return dataSource[i].set('_active', true);
					}
					// 查找子菜单
					if(dataSource[i].childViewMenus.length) {
						result = this._queryActiveMenu(dataSource[i].childViewMenus, menuItem);
						if(result > -1) {
							// 设置二级菜单active
							dataSource[i].childViewMenus[result].set('_active', true);
							dataSource[i].set('_active', true);
							if(isSendAction) {
								this.sendAction('clickMenuItem', result);
							}
							return;
						}
					}
				}
			},
			handleViewChange: function(menuItem, isChangeDataPossible) {
				// this._cancelActive();
				if(isChangeDataPossible || !this._activeMenu || menuItem._menuId !== this._activeMenu._menuId) {
					this.setActiveMenu(menuItem);
				}
			},
			/* 遍历目录菜单查找当前菜单是否属于当前菜单列表
			 * @param {Array} menuList
			 * @param {Object} menuItem
			 * return {number}
			 */
			_queryActiveMenu: function(menuList, menuItem) {
				for(var i = 0; i < menuList.length; i++) {
					if(!menuList[i]) {
						continue;
					}
					if(menuList[i]._menuId === menuItem._menuId) {
						menuList[i].set('_active', true);
						return i;
					}
					if(menuList[i].childViewMenus.length) {
						if(this._queryActiveMenu(menuList[i].childViewMenus, menuItem) > -1) {
							return i;
						}
					}
				}
				return -1;
			},
			_cancelActive: function() {
				var menuList = this.get('dataSource');
				this._cancelActiveRecursion(Array.isArray(menuList) ? menuList : []);
			},
			_cancelActiveRecursion: function(menuList) {
				menuList.forEach(function(item) {
					item.set('_active', false);
					if(item.childViewMenus && item.childViewMenus.length) {
						this._cancelActiveRecursion(item.childViewMenus);
					}
				}, this);
			},
			// 转换菜单到模型
			// 菜单参考原来的菜单配置模型主要是添加了几个计算属性方便控制状态和显示打开关闭图标
			convertMenuData: function(data) {
				var result;
				if(data instanceof Array) {
					return data.map(function(item) {
						var result;
						if(item.childViewMenus && item.childViewMenus.length) {
							result = menuModel.create(item);
							result.set('childViewMenus', this.convertMenuData(item.childViewMenus));
						} else {
							result = menuModel.create(item);
						}
						result._originData = item;
						return result;
					}, this);
				} else {
					result = menuModel.create(data);
					result._originData = data;
					return result;
				}
			},
			handleResize: function() {
				this._checkIfNeedScroll();
			},
			/**
			 * 检查菜单是否过多需要滚动
			 * @method _checkIfNeedScroll
			 * @private
			 */
			_checkIfNeedScroll: function() {
				if(this.isDestroyed || this.isDestroying || !this.$().length) {
					return;
				}
				var containerHeight = this.$('.meau-container').height(),
					$meau = this.$('.meau-container').children('.ember-view'),
					meauHeight = $meau.height();
				if(containerHeight < meauHeight) {
					this.set('_needScroll', true);
				} else {
					this.set('_needScroll', false);
					$meau.css('top', 0);
				}
			},
			_scrollMenu: function(deltaY) {
				if(this._timer) {
					return;
				}
				this._timer = setTimeout(function() {
					this._timer = null;
				}.bind(this), 50);
				var $meau = this.$('.meau-container').children('.ember-view');
				var top = parseInt($meau.css('top'), 10),
					maxTop = $meau.height() - this.$('.meau-container').height();
				top = top - deltaY / 10;
				if(top > 0) {
					top = 0;
				}
				if(top < -maxTop) {
					top = -maxTop;
				}
				$meau.css('top', parseInt(top, 10));
			},
			actions: {
				clickMenuItem: function(item, isFirst) {
					if(isFirst) {
						var active = item._active;
						this._cancelActive();
						item.set('_active', !active);
						Ember.run.later(this, this._checkIfNeedScroll, 500);
					} else {
						this.setActiveMenu(item);
					}
					this.sendAction('clickMenuItem', item._originData);
				},
				onScroll: function(e) {
					if(this._needScroll && this._isMouseOver) {
						if(e.deltaY) {
							this._scrollMenu(e.deltaY);
						}
					}
				},
				onEnter: function() {
					this.set('_isMouseOver', true);
				},
				onLeave: function() {
					this.set('_isMouseOver', false);
				}
			}
		});

		app.FrameDropdownMenuVerticalComponent = app.FrameDropdownMenuComponent.extend({
			classNames: ['frame-dropdown-meau-vertical'],
			_timer: null,
			didInsertElement: function() {
				// this._timer = Ember.run.later(this, this.setTooltipMenus, 0);
				this.setTooltipMenus();
			},
			willDestroyElement: function() {
				// 注销事件
				if(this._timer) {
					Ember.run.cancel(this._timer);
					this._timer = null;
				} else {
					$('[href=' + this.targetId + ']').off('.bs.delayTooltip');
				}
			},
			// 解决有子菜单时 点击出来视图带有modal类似全覆盖的 模态层时子菜单不消失问题
			hideMeau: function() {
				$('[href=' + this.targetId + ']').delayTooltip('hide');
			},
			setTooltipMenus: function() {
				this._timer = null;
				if(this.childViewMenus && this.childViewMenus.length > 0) {
					$('[href=' + this.targetId + ']').delayTooltip({
						template: '<div class="tooltip frame-vertical-meau-tooltip ' + (this.class || '') + '" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
						animation: true,
						html: true,
						placement: 'right',
						container: 'body',
						title: this.element
					});
					$('[href=' + this.targetId + ']').on('hide.bs.delayTooltip', function($e) {
						this.sendAction('tooltipHide', $e);
					}.bind(this));
					$('[href=' + this.targetId + ']').on('show.bs.delayTooltip', function($e) {
						this.sendAction('tooltipShow', $e);
					}.bind(this));
				}
			},
		});
		// 菜单参考原来的菜单配置模型主要是添加了几个计算属性方便控制状态和显示打开关闭图标
		var menuModel = Ember.Object.extend({
			'imgSrc': 'img/tnmsalgeria_meau/yuanq1.png',
			'imgClickSrc': 'img/tnmsalgeria_meau/yuanq2.png',
			'visible': false,
			'childViewMenus': null,
			// 原数据
			_originData: null,
			_active: false,
			// 子菜单模拟鼠标悬浮效果
			_hover: false,
			_expend: true,
			// visible为false的菜单 --去掉_active为true时也显示出来的效果 || this._active
			_isShow: Ember.computed('visible', function() {
				return this.visible;
			}),
			_hasChild: Ember.computed('childViewMenus.[]', function() {
				return !!this.childViewMenus.length;
			}),
			init: function() {
				this.childViewMenus = [];
			}
		});
	});