define(
    [
        'configs',
        'common/core/emberExtendHelper',
    ],

    function(configs) {

        'use strict';

        /*global App */
        window.ENV = window.ENV || {
            _ENABLE_LEGACY_VIEW_SUPPORT: true,
            _ENABLE_LEGACY_CONTROLLER_SUPPORT: true

        };
        window.App = Ember.Application.create({
            // For debugging, log the information as below.
            LOG_TRANSITIONS: false,
            LOG_TRANSITIONS_INTERNAL: false,
            _ENABLE_LEGACY_VIEW_SUPPORT: true
        });
        //Ember.ENV._ENABLE_LEGACY_VIEW_SUPPORT = true;
        App.deferReadiness();

        App.ApplicationView = Ember.Component.extend({
            init: function() {
                this._super();
            }
        });

        if (configs.forbidF5) {
            document.onkeydown = function(e) {
                var ev = window.event || e;
                var code = ev.keyCode || ev.which;
                if (code === 116) {
                    if (ev.preventDefault) {
                        ev.preventDefault();
                    } else {
                        ev.keyCode = 0;
                        ev.returnValue = false;
                    }
                }
            };
        }

        App.addJsonCultureInfo = function(cultureInfo) {
            var fieldName = '';
            var value = '';
            for (var property in cultureInfo) {
                fieldName = property;
                value = cultureInfo[property];
                if (value.hasOwnProperty('en') && value.hasOwnProperty('zh')) {
                    Ember.STRINGS[fieldName + '_' + 'en'] = value['en'];
                    Ember.STRINGS[fieldName + '_' + 'zh'] = value['zh'];
                }
            }
        };

        Ember.addJsonCultureInfo = App.addJsonCultureInfo;

        App.OlocHelper = Ember.Helper.extend({
            configs: configs,
            language: Ember.computed.alias('configs.language'),
            _languageChanged: Ember.observer('language', function() {
                this.recompute();
            }),
            compute: function(params, hash) {
                var value = params[0];
                try {
                    var language = this.get('language');
                    value = value + '_' + language;
                } catch (ex) {}
                return Ember.String.loc(value, hash);
            }
        });
        App.OlocMeauNameHelper = Ember.Helper.extend({
            configs: configs,
            language: Ember.computed.alias('configs.language'),
            _languageChanged: Ember.observer('language', function() {
                this.recompute();
            }),
            compute: function(params, hash) {
                var meauData = params[0],
                    value;
                try {
                    var language = this.get('language');
                    value = meauData[language === 'zh' ? 'name' : ('name' + Ember.String.capitalize(language))];
                    if (!value) {
                        throw new Error();
                    }
                    return value;
                } catch (ex) {
                    console.info('读取菜单名称失败', meauData, language);
                    return '';
                }
            }
        });

        var oloc = Ember.Object.extend({
            configs: configs,
            language: Ember.computed.alias('configs.language'),
            _languageChanged: Ember.observer('language', function() {
                this.recompute();
            }),
            init: function() {
                this._super();
            },
            compute: function(path) {
                var value = path;
                try {
                    var language = this.get('language');
                    value = value + '_' + language;
                } catch (ex) {}
                return Ember.String.loc(value);
            }
        }).create();

        Ember.oloc = function(path) {
            return oloc.compute(path);
        };

        Ember.Component.reopen({
            currentTheme: configs.theme,
            language: configs.language,
            produceId: configs.produceId,
            cultureInfo: null,
            childs: {},
            resizeBind: null,
            freshStyleBind: null,
            resizeCallBack: function() {
                var rect = this.getRect();
                this.handleResize(rect.width, rect.height);
            },
            refreshStyleCallBack: function(event, theme) {
                if (!this.isDestroyed) {
                    this.set('currentTheme', theme);
                    this.refreshStyle(theme);
                }
            },
            getRect: function() {
                var height = 0;
                var width = 0;
                if (this.element) {
                    height = $("#" + this.elementId).height();
                    width = $("#" + this.elementId).width();
                }
                return {
                    width: width,
                    height: height
                };
            },
            init: function() {
                this.set('currentTheme', configs.theme);
                this.set('language', configs.language);
                this.set('produceId', configs.produceId);
                this.set('childs', {});
                if (this.templateName === "frame-view") {
                    Ember.__frameViewInstance = this;
                }

                if (this.handleResize) {
                    this.resizeBind = this.resizeCallBack.bind(this);
                    //console.log(this.templateName);
                    jQuery(window).on('resize', this.resizeBind);
                }

                if (this.refreshStyle) {
                    this.freshStyleBind = this.refreshStyleCallBack.bind(this);
                    jQuery(window).on('refreshStyle', this.freshStyleBind);
                }
                this.toggleVerticalMeauVisible = function(value) {
                    if (Ember.__frameViewInstance) {
                        Ember.__frameViewInstance.send('toggleVerticalMeauVisible', value);
                    }
                };
                this.toggleHeaderVisible = function(value) {
                    if (Ember.__frameViewInstance) {
                        Ember.__frameViewInstance.send('toggleHeaderVisible', value);
                    }
                };
                this.sendActionToFrame = function(actionName) {
                    if (!Ember.__frameViewInstance) {
                        throw new Error('can\'t find frame-view', Ember.__frameViewInstance);
                    }
                    var frameViewActions = ['frameLogout', 'frameExit', 'toggleVerticalMeauVisible',
                            'toggleHeaderVisible'
                        ],
                        frameContainerActions = ['backView', 'changeViewName'],
                        arraySlice = Array.prototype.slice,
                        param = arraySlice.call(arguments);
                    if (frameViewActions.includes(actionName)) {
                        Ember.__frameViewInstance.send.apply(Ember.__frameViewInstance, param);
                    } else if (frameContainerActions.includes(actionName)) {
                        param.splice(1, 0, this);
                        Ember.__frameViewInstance.send('sendActionToFrameContainer', param);
                    }
                };
                this._super();
            },
            oloc: function(path) {
                var value = path;
                try {
                    var language = this.get('language');
                    value = value + '_' + language;
                } catch (ex) {}
                return Ember.String.loc(value);
            },
            olocMeauName: function(meauItem) {
                var meauData = meauItem,
                    value;
                try {
                    var language = this.get('language');
                    value = meauData[language === 'zh' ? 'name' : ('name' + Ember.String.capitalize(language))];
                    if (!value) {
                        throw new Error();
                    }
                    return value;
                } catch (ex) {
                    console.info('读取菜单名称失败', meauData, language);
                    return '';
                }
            },
            findViewId: function(parentView) {
                if (parentView) {
                    if (parentView.hasOwnProperty('viewId')) {
                        return parentView.viewId;
                    } else {
                        return this.findViewId(parentView.parentView);
                    }
                } else {
                    return 0;
                }
            },
            openView: function(para) {
                var viewId = this.findViewId(this);
                para.fromViewId = viewId;
                Ember.__frameViewInstance.openView(para);
            },
            closeView: function() {
                Ember.__frameViewInstance.delView(this.viewId);
            },
            fullScreen: function(visibility) {
                Ember.__frameViewInstance.showHeader(!visibility);
            },
            _showView: function() {
                if (this.showView) {
                    this.showView(this.parameters);
                }
            },
            _hideView: function() {
                if (this.hideView) {
                    this.hideView(this.parameters);
                }
            },
            didInsertElement: function() {},
            doLayoutImmediately: function() {
                var target = this.$('.layout');
                if (target !== undefined && target.length > 0) {
                    target.borderLayout();
                    this.layoutResize();
                    jQuery(window).trigger('resize'); //视图下f11后，其他视图的子视图不会layout失效，事发 一下
                }
            },
            layoutResize: function() {
                if (this.handleResize) {
                    var rect = this.getRect();
                    this.handleResize(rect.width, rect.height);
                }
            },
            doLayout: function() {
                var self = this;
                Ember.run.later(function() {
                    self.doLayoutImmediately();
                }, 500);
            },
            findNames: function() {
                var self = this;
                self.set('childs', {});
                self.childViews.forEach(function(item) {
                    if (item.name !== undefined) {
                        self.childs[item.name] = item;
                    }
                });
            },
            willDestroy: function() {
                if (this.handleResize) {
                    jQuery(window).off('resize', this.resizeBind);
                }

                if (this.refreshStyle) {
                    jQuery(window).off('refreshStyle', this.freshStyleBind);
                }
            },
            mouseLeave: function() {},
            mouseEnter: function() {}
        });

        Ember.Checkbox.reopen({
            didInsertElement: function() {
                this.$().on('click', function(event) {
                    this.sendAction('checkboxClick', event);
                }.bind(this));
            },
        });

        return window.App;
    });