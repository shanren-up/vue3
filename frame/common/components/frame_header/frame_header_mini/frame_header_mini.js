define(
    [
        'app',
        'json!./cultureInfo.json',
        'text!./frame_header_mini.html',
        'plugin/PSMS/common/services/process-data-service',
        'configs',
        'frame/configures/config',
        'common/components/comp_msgbox/comp_msgbox',
        '../frame_header.js',
        'css!./frame_header_mini.css',
        'css!./frame_header_mini_theme_default.css',
        'css!lib/fontawesome/css/font-awesome.min.css'
    ],

    function (app, cultureInfo, template, dataService, envconfigs, config, msgbox) {

        'use strict';
        Ember.addJsonCultureInfo(cultureInfo);

        app.FrameHeaderMiniComponent = app.FrameHeaderComponent.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'frame-header-mini',
            classNames: ['frame-header-mini', 'absolute'],
            msgBox: null,
            // 存储登录时间 ms数
            _loginTime: null,
            // 用户登录时长显示
            loginTimeStr: '',
            // 自定义组件名称
            _componentName: '',
            // 是否包含更多菜单
            _hasMoreMeau: config.headerConfig.hasMoreMeau,
            userName: '',
            init: function () {
                this._super();
                this.msgBox = msgbox.create();
                this.dataAdaptor = dataService.create();
                this._getLoginTime = this.getLoginTime.bind(this);
                if (config.headerConfig.headerComponent && config.headerConfig.headerComponent.templateName) {
                    this.getHeaderComponent();
                } else {
                    if (this.appInfoIns.userInfo.loginTime) {
                        this.getLoginTime();
                    } else {
                        //this.getLoginTime.bind(this)
                        this.appInfoIns.one('gotUserInfo', function () {
                            this.appInfoIns.getServiceTime().then(function () {
                                this.getLoginTime();
                                this.appInfoIns.on('timeUpdated', this._getLoginTime);
                            }.bind(this));
                        }.bind(this));
                    }
                }
                this.initData();
            },
            didInsertElement: function () {
                this.findNames();
                Ember.run.later(this, this.showActiveMenu, 100);
            },
            willDestroyElement: function () {
                this.appInfoIns.off('timeUpdated', this._getLoginTime);
                if (this.dataAdaptor) {
                    this.dataAdaptor = undefined;
                }
            },
            getHeaderComponent: function () {
                require([config.headerConfig.headerComponent.url], function () {
                    this.set('_componentName', config.headerConfig.headerComponent.templateName);
                }.bind(this));
            },
            getLoginTime: function () {
                this._loginTime = this.appInfoIns.userInfo.loginTime || Date.now();
                this.updateTimeData(this.appInfoIns.serviceTime);
            },
            updateUserName: Ember.observer('appInfoIns.userInfo.userName', 'appInfoIns.onLineNumber', function () {
                Ember.run.later(this, this.initData);
            }),
            initData: function () {
                var userName, operatorData = [];
                var dataModel = Ember.Object.extend({
                        type: '',
                        title: ''
                    }),
                    greetWords;
                try {
                    userName = this.appInfoIns.userInfo2.userName;
                    this.set('userName', this.appInfoIns.userInfo2.userName);
                } catch (e) {
                    userName = Ember.oloc('frame_header_mini_gly');
                }
                // 中英文字序不一致
                if (envconfigs.language === 'zh') {
                    greetWords = userName + '，' + Ember.oloc('frame_header_mini_nh') + '！';
                } else {
                    greetWords = Ember.oloc('frame_header_mini_nh') + ' ' + userName + '!';
                }
                if (config.headerConfig.hasUser) {
                    operatorData.push(dataModel.create({
                        type: 'user',
                        title: greetWords
                    }));
                }
                if (config.headerConfig.hasOnlineNum) {
                    operatorData.push(dataModel.create({
                        type: 'onlinenum',
                        title: Ember.oloc('frame_header_mini_zxyh') + '(' + (this.appInfoIns.onLineNumber || 0) + ')'
                    }));
                }
                if (config.headerConfig.hasQuit) {
                    operatorData.push(dataModel.create({
                        title: Ember.oloc('frame_header_mini_tc'),
                        type: 'quit',
                    }));
                }
                if (config.headerConfig.hasLogout) {
                    operatorData.push(dataModel.create({
                        title: Ember.oloc('frame_header_mini_zx'),
                        type: 'logout',
                    }));
                }
                this.set('operatorData', operatorData);
                this.set('menuItems', this.appInfoIns._menuItems)
            },
            updateTimeData: function (serviceTime) {
                serviceTime = serviceTime || Date.now();
                var times = (serviceTime - this._loginTime) / 1000,
                    day = Math.floor(times / 3600 / 24),
                    hour = Math.floor(times / 3600 % 24),
                    minutes = Math.floor(times / 60 % 60);
                if (minutes < 10 && minutes !== 0) {
                    minutes = '0' + minutes;
                }
                var string1 = Ember.oloc('frame_header_mini_dlsz：'),
                    dayString = Ember.oloc('frame_header_mini_t'),
                    hourStr = Ember.oloc('frame_header_mini_xs'),
                    minutesStr = Ember.oloc('frame_header_mini_fz');
                this.set('loginTimeStr', [string1, day, dayString, hour, hourStr, minutes, minutesStr].join(' '));
            },
            actions: {
                meauClick: function (meau) {
                    switch (meau.type) {
                        case 'quit':
                            this.sendActionToFrame('frameExit');
                            break;
                        case 'logout':
                            this.sendActionToFrame('frameLogout');
                            break;
                        case 'onlinenum':
                            this.childs.userMeau.send('toolTipMenu', 'onlinenum');
                            break;
                    }
                },
                modifyPassWord: function () {

                },
                quitSystem: function () {
                    this.msgBox.showConfirm('确认退出？', function (isConfirm) {
                        if (isConfirm) {
                            sessionStorage.clear();
                            if (this.get('session')) {
                                this.set('session.logout', true);
                                this.get('session').invalidate();
                            }
                            setTimeout(function () {
                                window.open('./index.html', '_self');
                            }, 50);
                        }
                    }.bind(this));
                    //window.location.href = './index.html';
                    //this.sendActionToFrame('frameExit');
                },
                openDms: function () {
                    // window.open('http://' +envconfigs.locators.VRSSRestful['dmsUrl'],"_blank");
                    var url = envconfigs.locators.VRSSRestful['dmsUrl'];
                    var newWin = window.open(),
                        formStr = '';
                    var params = {};
                    //设置样式为隐藏，打开新标签再跳转页面前，如果有可现实的表单选项，用户会看到表单内容数据
                    formStr = '<form style="visibility:hidden;" method="GET" action="' + url + '">' +
                        '<input type="hidden" name="params" value="' + params + '" />' +
                        '</form>';
                    newWin.document.body.innerHTML = formStr;
                    newWin.document.forms[0].submit();
//                     $.ajax({
//                         type: "POST",
//                         url: 'http://' +envconfigs.locators.VRSSRestful['dmsUrl'],
//                         data: {},
//                         async :false,
//                         success: function(str_response) {
//                             var obj = window.open("about:blank");
//                             obj.document.write(str_response);
//                         }
//                     });
                },
                setFlow: function () {

                }
            }
        });
    });