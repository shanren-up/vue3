define(
    [
        'configs',
        './frame_crypt'
    ],

    function(configs, frameCrypt) {

        'use strict';

        var frameCoreHelper = Ember.Object.extend({
            init: function() {},
            freshStyle: function(theme) {
                if (!configs.themes.includes(theme)) {
                    alert('不支持这个主题:  ' + theme);
                    return;
                }
                var self = this;
                var regxKey = new RegExp(/(theme=?)(\S*)(?=.css)/);
                var notExistUrls = [];
                $('link').each(function(linkIndex, linkItem) {
                    var resultKey, theme_href;
                    if (linkItem.href.indexOf('lib') < 0 && linkItem.href.indexOf('theme_' + configs.theme) > 0) {
                        $(linkItem).attr('disabled', true);
                        resultKey = regxKey.exec(linkItem.href);
                        theme_href = linkItem.href.replace(resultKey[0], 'theme_' + theme);

                    } else if (linkItem.href.indexOf('style/bootstrap_boco_') > 0) {
                        $(linkItem).attr('disabled', true);
                        theme_href = linkItem.href.replace(/bootstrap_boco_[^.]*/, 'bootstrap_boco_' + theme);
                    }
                    if (!theme_href) {
                        return;
                    }
                    if (self.checkNotExist(theme_href)) {
                        notExistUrls.push(theme_href);
                    } else {
                        var existLink = self.getExitsLink(theme_href);
                        $(existLink).attr('disabled', false);
                    }
                });
                notExistUrls.forEach(function(url) {
                    require(['css!' + url]);
                });
                configs.theme = theme;
                jQuery(window).trigger('refreshStyle', theme);
            },
            getExitsLink: function(url) {
                var existLinkItem = null;
                $('link').each(function(linkIndex, linkItem) {
                    if (linkItem.href === url) {
                        existLinkItem = linkItem;
                    }
                });
                return existLinkItem;
            },
            checkNotExist: function(url) {
                var notExist = true;
                $('link').each(function(linkIndex, linkItem) {
                    if (linkItem.href === url) {
                        notExist = false;
                    }
                });
                return notExist;
            },
            parseQueryString: function(url) {
                var arr;
                var res = {};
                //#符号之后的值称为hash，都不会加到request请求中去
                url = url.split('#')[0];
                //获取queryString 第一个？号后面的全是查询字符串
                arr = url.split('?');
                arr.shift();
                var queryStr = arr.join('?');
                //查询字符串为空直接返回 避免出现这样的返回值{'':''}
                if (queryStr.trim().length === 0) {
                    return res;
                }
                //获取参数
                arr = queryStr.split('&');
                for (var i = 0; i < arr.length; i++) {
                    var itemArr = arr[i].split('=');
                    //第一个=号之前的是name 后面的全是值
                    var name = itemArr.shift();
                    var value = itemArr.join('=');
                    res[name] = value;
                }
                return res;
            },
            ajaxOption: function(url, succesCallBack, errorCallBack) {
                return new Ember.RSVP.Promise(function(resolve, reject) {
                    $.ajax({
                        url: url,
                        type: 'GET',
                        dataType: 'json',
                        timeout: 5000,
                        success: function(result) {
                            resolve(Object.freeze(result));
                        },
                        error: function(error) {
                            reject(error);
                        }
                    });
                });
            },
            setItemToStorage: function(key, value) {

                var tmpKey = this.getKeyFromStorage(key);
                if (tmpKey) {
                    var tmpValue = frameCrypt.encode(value);
                    localStorage.setItem(tmpKey, tmpValue);
                }
                //tmpValue = frameCrypt.decode('1EA030F7B56B9ED55EE17724E57595CB6C');
            },
            getKeyFromStorage: function(key) {
                for (var prop in localStorage) {
                    var tmpKey = frameCrypt.decode(prop);
                    if (tmpKey && key === tmpKey) {
                        return prop;
                    }
                }

                return frameCrypt.encode(key);

            },
            getItemToStorage: function(key) {
                for (var prop in localStorage) {
                    var tmpKey = frameCrypt.decode(prop);
                    if (tmpKey && key === tmpKey) {
                        var tmpValue = frameCrypt.decode(localStorage[prop]);
                        if (tmpValue) {
                            return tmpValue;
                        }
                    }
                }

                return null;
            },
            createCode: function() {
                var code = '';
                var codeLength = 4; //验证码的长度
                var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数
                for (var i = 0; i < codeLength; i++) { //循环操作
                    var index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）
                    code += random[index]; //根据索引取得随机数加到code上
                }
                return code;
            },
            toRGB: function() {
                var str = '',
                    str2 = '';
                var num = [],
                    strs2 = [],
                    strs = [];
                var i = 0;

                for (i = 0; i < 3; i++) {
                    num.push(parseInt(Math.random() * 255, 10));
                }
                for (i = 0; i < num.length; i++) {
                    strs.push(num[i].toString(16));
                    strs2.push((255 - num[i]).toString(16));
                }
                for (i = 0; i < strs.length; i++) {
                    str += strs[i];
                    str2 += strs2[i];
                }

                var rgb = {

                    background: '#' + str,
                    color: '#' + str2

                };
                return rgb;
            },
            getRandom: function(min, max) {
                var r = Math.random() * (max - min);
                var re = Math.round(r + min);
                re = Math.max(Math.min(re, max), min);

                return re;
            },
            _convertSystemMenus: function(menus, systeMenus, appId, menuLevel) {
                var self = this;

                if (!Ember.isNone(systeMenus.childViewMenus) && Ember.isArray(systeMenus.childViewMenus)) {
                    systeMenus.childViewMenus.forEach(function(item) {
                        if (appId && !item.appId) {
                            item.appId = appId;
                        }
                        item._menuLevel = menuLevel;
                        item._menuId = Ember.generateGuid(null, 'menu');
                        menus.push(item);
                        self._convertSystemMenus(menus, item, item.appId || appId, menuLevel + 1);
                    });
                    //systeMenus.childViewMenus = [];
                } else {
                    return;
                }
            },
            convertSystemMenus: function(systeMenus) {
                var self = this;
                var menus = [];
                systeMenus.forEach(function(item) {
                    item._menuLevel = 0;
                    item._menuId = Ember.generateGuid(null, 'menu');
                    menus.push(item);
                    self._convertSystemMenus(menus, item, item.appId, 1);
                });

                return menus;
            },
            _convertDefault: function(menu, templateName) {
                var self = this;

                var result = null;
                if (!Ember.isNone(menu.childViewMenus) && Ember.isArray(menu.childViewMenus)) {
                    menu.childViewMenus.forEach(function(item) {
                        if (item.templateName === templateName) {
                            item.isActive = true;
                            result = item;
                        } else {
                            item.isActive = false;
                            var tmpResult = self._convertDefault(item, templateName);
                            if (tmpResult) {
                                result = tmpResult;
                            }
                        }
                    });
                    //systeMenus.childViewMenus = [];
                }

                return result;
            },
            convertDefault: function(appInfoIns, templateName) {
                var self = this;
                var defaultMenu = null;
                appInfoIns._menuItems.forEach(function(item) {
                    if (item.templateName === templateName) {
                        item.isActive = true;
                        defaultMenu = item;
                    } else {
                        item.isActive = false;
                        var _defaultMenu = self._convertDefault(item, templateName);
                        if (!Ember.isNone(_defaultMenu)) {
                            defaultMenu = _defaultMenu;
                            item.isActive = true;
                        }
                    }
                });

                appInfoIns.set('_defaultMenu', defaultMenu);
            }

        });

        return frameCoreHelper.create();
    });