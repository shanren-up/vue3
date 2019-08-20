define(
    [
        'frame/common/models/frame_user'
    ],

    function(frameUser) {

        'use strict';

        var frameInfo = Ember.Object.extend(Ember.Evented, {
            _systemMenus: null, //所有菜单不区分产品
            _menuItems: null, //框架显示菜单
            _searchMenuItems: null,
            _paraMetersObject: null,
            _defaultMenu: null,
            userInfo: null,
            viewsCount: 0,
            ip: '',
            _accessToken: '',
            // 客户端信息
            clientInfo: null,
            // 服务当前时间
            serviceTime: 0,
            // 是否获得操作权限
            hasGotOperations: false,
            // 是否获得数据权限
            hasGotDataOperations: false,

            init: function() {
                this.set('_systemMenus', []);
                this.set('_defaultMenu', null);
                this.set('_menuItems', []);
                this.set('_searchMenuItems', []);
                this.set('userInfo', frameUser.create());
            },
            getServiceTime: function() {
                return new Ember.RSVP.Promise(function(resolve, reject) {
                    if (this.serviceTime) {
                        resolve(this.serviceTime);
                    } else {
                        this.one('timeUpdated', function() {
                            resolve(this.serviceTime);
                        }.bind(this));
                    }
                }.bind(this));
            },
            getClientInfo: function() {
                return new Ember.RSVP.Promise(function(resolve, reject) {
                    if (this.clientInfo) {
                        resolve(this.clientInfo);
                    } else {
                        this.one('clientInfoUpdated', function() {
                            resolve(this.clientInfo);
                        }.bind(this));
                    }
                }.bind(this));
            },

            setUserInfo: function(userInfo) {
                this.userInfo.setUserInfo(userInfo);
            },
            setAllDataPrivilges: function(data) {
                this.hasGotDataOperations = true;
                this.userInfo.setAllDataPrivilges(data);
                this.trigger('gotDataOperations');
            },
            checkDataPrivilge: function(accessType, dataPrivilgeId) {
                try {
                    return this.userInfo.checkDataPrivilge(accessType, dataPrivilgeId);
                } catch (ex) {
                    console.error(ex);
                }
            },

            setOperationPrivilges: function(data) {
                this.hasGotOperations = true;
                this.userInfo.setOperationPrivilges(data);
                this.trigger('gotOperations');
            },
            checkOperationPrivilge: function(operationId) {
                try {
                    return this.userInfo.checkOperationPrivilge(operationId);
                } catch (ex) {
                   // console.error(ex);
                }
            },
            // 统一鉴权后新增
            // 设置用户信息
            setUserInfoNew: function(data) {
                this.userInfo.setUserInfoNew(data);
                this.trigger('gotUserInfo');
            },
            // 设置用户角色
            setUserRole: function(data) {
                this.userInfo.setUserRole(data);
                this.trigger('gotUserRole');
            },
            // 设置用户区域
            setUserZones: function(data) {
                this.userInfo.setUserZones(data);
                this.trigger('gotUserZones');
            },
            // 区域字典
            setZones: function(data) {
                this.userInfo.setAllZones(data);
                this.trigger('gotAllZones');
            },
            // 数据权限翻译
            setDataOperationsUniformTranslation: function(data) {
                this.userInfo.setDataOperationsUniformTranslation(data);
            },
            setClientInfo: function(clientInfo) {
                this.set('clientInfo', clientInfo);
                this.set('ip', clientInfo.ip && clientInfo.ip.address);
                this.trigger('clientInfoUpdated');
            },
            setTimes: function(timeString) {
                var time = new Date(timeString);
                this.set('serviceTime', time ? time.getTime() : Date.now());
                this.trigger('timeUpdated');
            }
        });

        return frameInfo.create();

    });