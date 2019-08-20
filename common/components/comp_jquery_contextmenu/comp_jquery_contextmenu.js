/**
 * 通用右键
 */

define(
    [
        'app',
        'jquery_contextmenu'
    ],
    function(app) {

        "use strict";

        return Ember.Object.extend({
            init: function() {
                this._super();
                require(['css!common/components/comp_jquery_contextmenu/comp_contextmenu.css']);
                require(['css!common/components/comp_jquery_contextmenu/comp_contextmenu_theme_default.css']);
                this.set('option', {});
                //菜单集合
                this._menuItems = {};
                this.beforeOpenMenu = undefined;
                this.beforeHideMenu = undefined;
                this.loadMenuCompleted = undefined;
            },
            willDestroy: function() {
                if (this.option && this.option.selector) {
                    $.contextMenu('destroy', this.option.selector);
                    this.option = undefined;
                }
                if (this._menuItems) {
                    this._menuItems = undefined;
                }
                this.beforeOpenMenu = undefined;
                this.beforeHideMenu = undefined;
                this.loadMenuCompleted = undefined;
            },
            /**
             * 创建右键菜单集合           
             * @param menuPath 完整的require请求配置文件地址 或请求require回来的对象
             */
            createMenu: function(menuPath) {
                var self = this;
                if (typeof menuPath === 'string') {
                    require([menuPath], function(menuConfig) {
                        self._createMenu(menuConfig);
                    });
                } else {
                    self._createMenu(menuPath);
                }
            },
            /**
             * 接受一个require请求配置文件地址后的对象object
             */
            _createMenu: function(menuConfig) {
                var self = this;
                $.map(menuConfig, function(menuItem, index) {
                    //根据menuItem获取subMenuItem
                    var guid = Ember.ExtendHelper.getGuid();
                    var menuItems = self._getMenuItems(menuItem, guid);
                    $.extend(self._menuItems, menuItems);
                });
                if (self.loadMenuCompleted) {
                    self.loadMenuCompleted();
                }
            },
            /**
             * 绑定DOM元素
             * @param selector (Dom的ID或class , ID 前加#，class 前加.)
             */
            bindDom: function(selector) {
                if (selector instanceof Ember.Object) {
                    //Ember对象
                    this.option.selector = "#".concat(selector.elementId);
                } else {
                    //字符串
                    this.option.selector = selector;
                }
                this._initOption();
                $.contextMenu(this.option);
            },
            /**
             * 手动增加参数，通过 option.getParams()获取
             * @param param 任意类型
             */
            setParam: function(param) {
                this.param = param;
            },
            /**
             * 此方法与setParam一样，只是为了更好的识别
             * 手动添加所属控件，通过option.getOwerControl()获取
             * @param control 控件对象
             */
            setOwerControl: function(control) {
                this.owerControl = control;
            },
            /**
             * 手动增加菜单
             * @param menuItem 扩展菜单对象
             * @param isOriginal bool 是否是原生类型，默认是false，true是模版类型对象
             */
            addExtendMenu: function(menuItem, isOriginal) {
                var guid = Ember.ExtendHelper.getGuid();
                if (isOriginal) {
                    //模版类型对象
                    var menuItems = this._getMenuItems(menuItem, guid);
                    $.extend(this._menuItems, menuItems);
                } else {
                    //原生对象类型
                    var item = {};
                    if (menuItem.key) {
                        item[menuItem.key] = menuItem;
                    } else {
                        item[guid] = menuItem;
                    }
                    $.extend(this._menuItems, item);
                }
            },
            /**
             * 赋值参数
             */
            _initOption: function() {
                var self = this;
                this.option.build = function() {
                    return {
                        items: self._menuItems
                    };
                };
                this.option.getParam = function() {
                    return self.param;
                };
                this.option.getOwerControl = function() {
                    return self.owerControl;
                };
                this.option.reposition = false;
                this.option.events = {
                    show: function(option) {
                        if (self.beforeOpenMenu) {
                            return self.beforeOpenMenu(option);
                        }
                    },
                    hide: function(option) {
                        if (self.beforeHideMenu) {
                            return self.beforeHideMenu(option);
                        }
                    }
                };
            },
            /**
             * 获取菜单
             */
            _getMenuItems: function(menuItem, guid) {
                var items = {};
                var key = menuItem.key ? this._getItemValue(menuItem.key) : guid;
                items[key] = this._createModel(menuItem);
                if (items[key].visible) {
                    items[key].items = this._loadSubMenu(menuItem);
                }
                return items;
            },
            /**
             * 创建实例
             */
            _createModel: function(menuItem) {
                var self = this;
                var item = {
                    name: this._getItemValue(menuItem.name),
                    icon: function() {
                        return "context-menu-icon " + self._getItemValue(menuItem.icon);
                    },
                    visible: menuItem.visible
                };
                //配置项目的visible为false的时候，就不进行加载和处理了
                if (menuItem.visible && menuItem.url) {
                    require([menuItem.url], function(itemObject) {
                        if (itemObject) {
                            var menuObject = itemObject.create();
                            item.callback = menuObject.command.bind(menuObject);
                            item.visible = menuObject.visible.bind(menuObject);
                            item.disabled = menuObject.disabled.bind(menuObject);
                        }
                    });
                }
                return item;
            },
            /**
             * 获取子菜单
             */
            _loadSubMenu: function(menuItem) {
                var items;
                var self = this;
                if (menuItem.subMenu) {
                    items = {};
                    menuItem.subMenu.forEach(function(subItem, subIndex) {
                        var guid = Ember.ExtendHelper.getGuid();
                        var subItems = this._getMenuItems(subItem, guid);
                        $.extend(items, subItems);
                    }, this);
                }
                return items;
            },
            /**
             * 获取值，默认为空
             */
            _getItemValue: function(value) {
                var result = '';
                if (value) {
                    result = value;
                }
                return result;
            }
        });
    });