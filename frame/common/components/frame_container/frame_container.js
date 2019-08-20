define(
    [
        'app',
        'json!./cultureInfo.json',
        'text!./frame_container.html',
        'css!./frame_container.css',
        'css!./frame_container_theme_default.css',
        'configs',
        'app_info',
        'frame/common/core/frame_core_helper',
//      'frame/common/services/adapter/frame_log_adapter/frame_log_adapter',
        'frame/configures/config',
        'common/components/comp_loading/comp_loading'
    ],

    function(app, cultureInfo, template, pass0, pass1, configs, appInfoIns, appCoreHelperIns, /**logAdapter,**/ frameConfig) {

        'use strict';
        Ember.addJsonCultureInfo(cultureInfo);

        var containerHelper = Ember.Mixin.create({
            allPanelId: 'div[id^=frame_container_tabContent]',
            allTabId: 'li[id^=frame_container_tab]',
            templateName: 'frame-container',
            activeId: 0,
            setTabAndPanelActive: function() {
                this.setFirstTabActive(this.activeId);
                var currentInstance = this.findByInstanceById(this.activeId);
                if (currentInstance) {
                    currentInstance.findNames();
                    currentInstance.doLayoutImmediately();
                    this.showView();
                }
            },
            showView: function() {
                // TODO 待解决，延时不能保证所有情况没问题
                Ember.run.later(this, this._showView, 1000);
            },
            _showView: function() {
                var currentInstance = this.findByInstanceById(this.activeId);
                if (currentInstance) {
                    currentInstance._showView();
                }
            },
            _hideView: function() {
                var currentInstance = this.findByInstanceById(this.activeId);
                if (currentInstance) {
                    currentInstance._hideView();
                }
            },
            /**
             * 更改activeId
             * @param {Number} id
             * public
             */
            updateActiveId: function(id) {
                if (parseInt(id, 10) !== this.activeId) {
                    this._hideView(this.activeId);
                    this.activeId = parseInt(id, 10);
                }
            },
            tabFor: function(tabId) {
                return this.$(tabId);
            },
            setFirstTabActive: function(id) {
                this.setActiveTab('li#frame_container_tab' + id);
                this.setActivePanel(id);
            },
            setActiveTab: function(id) {
                if (this.get('viewItems').length !== 0 && this.isDestroyed === false) {
                    var allTabId = this.get('allTabId');

                    this.tabFor(allTabId).removeClass('active');
                    this.tabFor(id).addClass('active');
                    appInfoIns.set('viewsCount', this.viewItems.length);
                }
            },
            findByInstanceById: function(id) {
                return this.childViews.findBy('tabIndex', id);
            },
            setActivePanel: function(id) {
                var allPanelId = this.get('allPanelId');
                this.tabFor(allPanelId).css('display', 'none');
                var currentPanelId = 'div#frame_container_tabContent' + id;
                this.tabFor(currentPanelId).css('display', 'block');
            },
            dataSourceChanged: function() {
                if (this.get('viewItems').length !== 0) {
                    Ember.run.later(this, this.setTabAndPanelActive, 500);
                }
            },
            remaining: Ember.computed('viewItems.@each.length', function() {
                return this.get('viewItems');
            }),
        });

        app.FrameContainerComponent = Ember.Component.extend(containerHelper, {
            layout: Ember.ExtendHelper.compileEx(template),
            viewItems: [],
            classNames: ['absolute'],
            // 切换菜单方式 默认 mousemove 鼠标移入移出 其他值为点击
            _openViewTabsType: frameConfig.containerConfig.changeOpenedViewType,
            // true  打开 false 关闭
            _viewTabsStatus: false,
            // 切换视图是否关闭tabs
            _isCloseTabsWhenChangeMeau: frameConfig.containerConfig.isCloseViewListWhenChange,
            // 关闭视图是否关闭tabs
            _isCloseTabsWhenCloseMeau: frameConfig.containerConfig.isCloseViewListWhenClose,
            init: function() {
                this._super();
            },
            setTabAndPanelActive: function() {
                this._super();
                // 某些情况下 视图打开之后立刻关闭（通过代码）viewItems为空时会出错  例如gxgd全区概览
                if (this.viewItems.length) {
                    this.sendAction('showViewChange', this.viewItems[this.activeId]);
                }
            },
            addView: function(item) {
                var self = this,
                    targetItem;

                if (item.viewtype === 2) {
                    window.open(item.src);
                    return;
                }

                item.viewName = item.hasOwnProperty('viewName') ? item.viewName : item.templateName;
                // 优先判断互斥属性
                if (item.mutexId) {
                    targetItem = self.viewItems.findBy('mutexId', item.mutexId);
                    if (targetItem) {
                        self.viewItems.removeObject(targetItem);
                    }
                } else if (item.singleton && self.viewItems.isAny('viewName', item.viewName)) {
                    targetItem = self.viewItems.findBy('viewName', item.viewName);
                    this.updateActiveId(self.viewItems.indexOf(targetItem));
                    Ember.set(targetItem, 'parameters', item.parameters);
                    //self.setTabAndPanelActive();
                    self.dataSourceChanged();
                    return;
                }

                var tmpItem = Ember.copy(item);

                tmpItem.viewId = Ember.ExtendHelper.getGuid();

                this.findNames();
                if (frameConfig.containerConfig.showLoadingAnimation) {
                    // 最多加载10s动画
                    this.childs['frameloading'].startWithTimes();
                }

                if (tmpItem.parameters) {
                    var tmpViewName = tmpItem.parameters.tmpViewName;
                    tmpItem.name = tmpViewName ? tmpViewName : tmpItem.name;
                    tmpItem.fromViewId = tmpItem.parameters.fromViewId;
                }

                if (tmpItem.viewtype === 1) {
                    // 保存下原来的templateName用于查找菜单
                    tmpItem._originTemplateName = tmpItem.templateName;
                    tmpItem.url = 'comp_iframe';
                    tmpItem.templateName = 'comp-iframe';
                }
                try {
                    require([tmpItem.url], function() {
                        if (self.viewItems.length > configs.showMenuItemsCount) {
                            self.viewItems.removeAt(0);
                        }
                        self.viewItems.pushObject(tmpItem);

                        self.updateActiveId(self.viewItems.indexOf(tmpItem));
                        self.dataSourceChanged();
                        //self.showView();
                        self._writeViewLog(item, true, true);
                    });
                } catch (e) {
                    this._writeViewLog(item, true, false, e);
                }
            },
            delView: function(item) {
                this.updateActiveId(0);
                this.viewItems.removeObject(item);
                this.dataSourceChanged();
                this._writeViewLog(item, false, true);
            },
            delViewByViewId: function(viewId) {
                var targetMenuItem = this.viewItems.findBy('viewId', viewId);
                if (targetMenuItem) {
                    this.delView(targetMenuItem);
                } else {
                    console.error(Ember.oloc('frame_container_cscw，jcstsfybc'));
                }
            },
            didInsertElement: function() {
                if (this._openViewTabsType === 'mousemove') {
                    this.$('.frame-container-dropup').mouseover(this._openMeauTabs.bind(this, true));
                    this.$('.frame-container-dropup').mouseout(this._closeMeauTabs.bind(this, true));
                } else {
                    this.$('.frame-container-dropup-button').click(this._toggleMeauTabs.bind(this));
                    this.$(document).click(this._handelClickOthers.bind(this));
                }
            },
            _toggleMeauTabs: function() {
                this.toggleProperty('_viewTabsStatus');
            },
            _openMeauTabs: function() {
                this.set('_viewTabsStatus', true);
            },
            _closeMeauTabs: function() {
                this.set('_viewTabsStatus', false);
            },
            _handelClickOthers: function(event) {
                if (this._viewTabsStatus) {
                    // 点击非切换区域时关闭tabs
                    if (!this.$('.frame-container-dropup').has(event.target).length &&
                        this.$('.frame-container-dropup')[0] !== event.target &&
                        // 关闭视图时 dom可能已删除 造成误判
                        !this.$(event.target).hasClass('frame-container-close')) {
                        this._closeMeauTabs();
                    }
                }
            },
            didRender: function() {
                var self = this;
                this.sendAction('loginCheck');
                Ember.run(function() {
                    Ember.run.scheduleOnce('afterRender', function() {
                        // 修改加载动画延时去掉
                        if (self.childs['frameloading'] && frameConfig.containerConfig.showLoadingAnimation) {
                            self.childs['frameloading'].stop();
                        }
                        // 主题改变触发延时 部分组件切换主题需要初始化完成如echarts等需要切换主题时
                        Ember.run.later(function() {
                            self.updateStyle();
                        }, 500);
                    });
                });
            },
            updateStyle: function() {
                jQuery(window).trigger('refreshStyle', window.theme);
            },
            frameBackgroundClass: Ember.computed(function() {
                return 'frame-background-img-' + configs.produceId;
            }),
            afterRender: function() {},
            lgScreenShow: false,
            _writeViewLog: function(meauItem, isOpen, isSuccess, errorObj) {
                var msg = (isOpen ? Ember.oloc('frame_container_dkst：') : Ember.oloc('frame_container_gbst：')) +
                    ((configs.language === 'zh' ? meauItem.name : meauItem.nameEn) || meauItem.viewName); // + '\n' + Ember.oloc('frame_container_xxxx') + JSON.stringify(meauItem);
                if (!isSuccess && errorObj) {
                    msg += '\n' + Ember.oloc('frame_container_cwxx') + JSON.stringify(errorObj);
                }
//              logAdapter.writeLog(logAdapter.logModel.create({
//                  ologId: meauItem.ologId || -1,
//                  applicationId: meauItem.appId || -1,
//                  memo: msg,
//                  specificOpType: 'Other',
//                  // 日志级别 'Debug', 'Info', 'Major', 'Warning', 'Error', 'None'
//                  logLevel: 'Info',
//                  // 操作是否成功
//                  isSuccess: isSuccess,
//              }));
            },
            _changeViewName: function(viewId, newViewName) {
                var language = configs.language,
                    nameKey = language === 'zh' ? 'name' : ('name' + Ember.String.capitalize(language)),
                    targetViewItem;
                if (viewId) {
                    targetViewItem = this.viewItems.findBy('viewId', viewId);
                    if (targetViewItem) {
                        Ember.set(targetViewItem, nameKey, newViewName);
                        this.notifyPropertyChange('viewItems');
                    }
                }
            },
            actions: {
                focusView: function(item) {
                    if (this._isCloseTabsWhenChangeMeau) {
                        this._closeMeauTabs();
                    }
                    this.updateActiveId(this.viewItems.indexOf(item));
                    this.setTabAndPanelActive();
                },
                delView: function(item, event) {
                    if (this._isCloseTabsWhenCloseMeau) {
                        this._closeMeauTabs();
                    }
                    if (event) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    this.delView(item);
                },
                backView: function() {
                    //this.activeId = this.viewItems[this.activeId].fromViewTabIndex;
                    var currentItem = this.viewItems[this.activeId];
                    if (currentItem) {
                        var fromViewId = currentItem.fromViewId;
                        var newActiveId = -1;
                        this.viewItems.forEach(function(item, index) {
                            if (item.viewId === fromViewId) {
                                newActiveId = index;
                            }
                        });
                        this.updateActiveId(newActiveId === -1 ? this.activeId : newActiveId);

                        this.setTabAndPanelActive();
                    }
                },
                lgScreen: function() {
                    this.set('lgScreenShow', !this.lgScreenShow);
                    // var theme = this.lgScreenShow ? "zhanshi" : "default";
                    // appCoreHelperIns.freshStyle(theme);
                    var url = this.lgScreenShow ? configs.lgscreens.lgScreenOpenUrl : configs.lgscreens.lgScreenCloseUrl;
                    $.ajax({
                        url: url,
                        type: 'GET',
                        dataType: 'json',
                        timeout: 1000,
                        success: function(result) {
                            if (result.code === 0) {
                                console.log(result.message);
                            }
                        },
                        error: function(error) {
                            console.log(error);
                        }
                    });

                },
                changeViewName: function(comp, viewName) {
                    this._changeViewName(comp.viewId, viewName);
                }
            }
        });

        return app.ContainerComponent;
    });