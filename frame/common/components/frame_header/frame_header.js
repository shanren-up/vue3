define(
	[
		'app',
		'json!./cultureInfo.json',
		'text!./frame_header.html',
		'configs',
		'json!configures/authentication.json',
		'app_info',
		'css!./frame_header.css',
		'css!./frame_header_theme_default.css',
		'../frame_menu_item/frame_menu_item',
		'../frame_user/frame_user',
		'../frame_navigation/frame_navigation',
		'../frame_search_input/frame_search_input',
		'xslider'
	],

	function(app, cultureInfo, template, configs, authentications, appInfoIns) {

		'use strict';
		Ember.addJsonCultureInfo(cultureInfo);

		app.FrameHeaderComponent = Ember.Component.extend({
			layout: Ember.ExtendHelper.compileEx(template),
			templateName: 'frame-header',
			_menuItems: [],
			_defaultMenu: null,
			_systemMenus: [],
			_searchMenuItems: [],
			_searchText: '',
			_isTyping: true,
			appInfoIns: null,
			_hisSearchWords: '',
			classNames: ['absolute'],
			// 是否显示竖菜单切换按钮
			_isShowVerMeau: false,
			init: function() {
				var _this = this;
				this.set('_hisSearchWords', this.getHisSearchWords());
				if(configs.authentication && !configs.isNewAuthentication && !appInfoIns.userInfo.isAdmin && !appInfoIns.userInfo.isSupperAdmin) { //管理员不鉴权
					this.checkRight();
				}
				this.set('_menuItems', this.attrs.appInfoIns.value._menuItems);
				this.set('_defaultMenu', this.attrs.appInfoIns.value._defaultMenu);
				this.set('_systemMenus', this.attrs.appInfoIns.value._systemMenus);
				this.set('_searchMenuItems', this.attrs.appInfoIns.value._searchMenuItems);
				var searchHandlers = this.loadSearchHandlers();
				this.set('searchHandlers', searchHandlers);
				this.set('searchViewMenuItems', Ember.A());
				this._super();
				this.parentView.on('authenticated', function() {
					_this.trigger('authenticated');
				});
			},
			didInsertElement: function() {
				Ember.run.later(this, this.initXSilder, 100);
				// 菜单类型为3时header无菜单
				if(![3, 5].includes(+configs.meauType)) {
					Ember.run.later(this, this.showActiveMenu, 100);
				}
				this.showUserControl();
			},
			willDestroyElement: function() {},
			showMeau: Ember.computed('_menuItems', function() {
				// 菜单类型为3时header无菜单
				if([3, 5].includes(+configs.meauType)) {
					return false;
				}
				return Boolean(this.get('_menuItems').findBy('visible', true));
			}),
			getHisSearchWords: function() {
				var _hisSearchWords = localStorage.getItem('_hisSearchWords');
				_hisSearchWords = _hisSearchWords ? _hisSearchWords.split(',') : [];
				return _hisSearchWords;
			},

			//鉴权验证
			checkRight: function() {
				var functionAuthentication = authentications.findBy('name', 'functionAuthentication');
				functionAuthentication.authenticationIDLists.forEach(function(item) {
					var hasFunctionAuth = appInfoIns.checkOperationPrivilge(item.ID);
					var targetObject = this.attrs.appInfoIns.value._menuItems.findBy('name', item.name);
					if(!hasFunctionAuth) {
						if(targetObject) {
							var targetIndex = this.attrs.appInfoIns.value._menuItems.indexOf(targetObject);
							this.attrs.appInfoIns.value._menuItems.splice(targetIndex, 1);
						}
					}
					if(hasFunctionAuth && item.child) {
						item.child.forEach(function(childItem) {
							var childHasFunctionAuth = appInfoIns.checkOperationPrivilge(childItem.ID);
							if(!childHasFunctionAuth) {
								var childTargetObject = targetObject.childViewMenus.findBy('name', childItem.name);
								if(childTargetObject) {
									var childTargetIndex = targetObject.childViewMenus.indexOf(childTargetObject);
									targetObject.childViewMenus.splice(childTargetIndex, 1);
								}
							}
						}.bind(this));
					}
				}.bind(this));
			},

			setHisSearchWords: function(word) {
				if(this.get('_hisSearchWords').length > 10) {
					this.get('_hisSearchWords').removeAt(0);
				}
				this.get('_hisSearchWords').pushObject(word);
				var uniqResult = this.get('_hisSearchWords').uniq();
				this.set('_hisSearchWords', uniqResult);
				localStorage.setItem('_hisSearchWords', this.get('_hisSearchWords'));

			},
			searchTextChanged: Ember.observer('_searchText', function() {
				this.set('_isTyping', true);
			}),
			query: function() {
				var result = this.get('_searchText');
				this.setHisSearchWords(result);

				var searchHandlers = this.get('searchHandlers');
				var searchViewMenuItems = this.get('searchViewMenuItems');
				searchViewMenuItems.clear();
				searchHandlers.forEach(function(searchItem, searchIndex) {
					searchItem.searchHandler.searchCallBack(function(result) {
						searchItem.searchResult = result;
						searchViewMenuItems.pushObject(searchItem);
					});
					searchItem.searchHandler.search(result);
				});
				this.set('_isTyping', false);
			},
			loadSearchHandlers: function() {
				var searchHandlers = Ember.A();
				var _searchMenuItems = this.get('_searchMenuItems');
				_searchMenuItems.forEach(function(searchMenuItem, searchMenuItemIndex) {
					require([searchMenuItem.search], function(handler) {
						var searchHandler = handler.create();
						searchHandlers.push({
							menu: searchMenuItem,
							searchHandler: searchHandler
						});
					});
				});

				return searchHandlers;
			},

			showActiveMenu: function() {
				var activeItem = this.get('_menuItems').findBy('isActive', true);
				if(activeItem) {
					this.sendAction('clickMenuItem', activeItem, this._defaultMenu);
				}
			},
			showUserControl: function() {
				if(!configs.showUser) {
					this.$('.frame-header-child-loc3').hide();
					this.$('.frame-header-child-loc2').css('right', '2%');
				}
			},
			logoClass: Ember.computed('', function() {
				return 'frame-header-bg-img-' + configs.produceId;
			}),
			initXSilder: function() {
				var showMenuItemsCount = configs.showMenuItemsCount;
				var avgItemWidth = 90;
				var ulContainerWidth = showMenuItemsCount * avgItemWidth;
				var parentContainerWidth = ulContainerWidth + 10;
				this.$('.frame-header-menu-scrollcontainer:eq(0)').width(ulContainerWidth);
				this.$('.frame-header-child-loc2:eq(0)').width(parentContainerWidth);
				this.$('.frame-header-menu-container:eq(0)').width(parentContainerWidth);
				var length = this.$('.frame-header-menu-scrollcontainer>ul.nav>li').width(avgItemWidth).length;
				var ulWidht = Math.ceil(avgItemWidth * length);
				this.$('.frame-header-menu-container:eq(0)').find('ul:eq(0)').width(ulWidht);
				this.$('.frame-header-menu-container:eq(0)').Xslider({
					unitdisplayed: showMenuItemsCount,
					numtoMove: showMenuItemsCount,
					scrollobjSize: ulWidht,
					speed: 1000
				});
				if(length < showMenuItemsCount) {
					this.$('.frame-header-menu-container:eq(0)').find('ul:eq(0)').css({
						left: 'auto',
						right: '0'
					});
				}
			},
			changeMenuItemState: function(item) {
				this.get('_menuItems').setEach('isActive', false);
				Ember.set(item, 'isActive', true);
			},
			handleViewChange: function(activeMenu) {
				var activeMenuIndex, result;
				activeMenuIndex = this._checkSubMeauIsActive(activeMenu);
				result = this.get('_menuItems')[activeMenuIndex];
				if(activeMenuIndex === -1 || result.isActive) {
					return;
				}
				this.changeMenuItemState(result);
				// null 默认菜单  true 无打开视图动作
				this.sendAction('clickMenuItem', result, null, true);
			},
			_checkSubMeauIsActive: function(activeMenu, menuList) {
				menuList = menuList || this.get('_menuItems');
				for(var i = 0; i < menuList.length; i++) {
					if(!menuList[i]) {
						continue;
					}
					if(menuList[i]._menuId === activeMenu._menuId) {
						return i;
					}
					if(menuList[i].childViewMenus && menuList[i].childViewMenus.length) {
						if(this._checkSubMeauIsActive(activeMenu, menuList[i].childViewMenus) > -1) {
							return i;
						}
					}
				}
				return -1;
			},
			actions: {
				clickMenuItem: function(item) {
					this.changeMenuItemState(item);
					this.sendAction('clickMenuItem', item);
				},
				toggleMeauType: function(e) {
					this.sendAction('toggleMeauType');
					if(e) {
						e.stopImmediatePropagation();
						e.stopPropagation();
					}
				},
				vendorImgOpen: function() {
					var item = this._systemMenus.findBy('openByVendorImg', true);
					if(item) {
						this.sendAction('clickMenuItem', item);
					}
				},
				query: function() {
					this.query();
				},
				changeWord: function(word) {
					this.set('_searchText', word);
					this.query();
				}
			}
		});
		// mouseEnter:function(event){
		// $(event.target)
		// },
	});