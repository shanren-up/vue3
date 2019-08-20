define(
    [
        'configs',
        'frame/common/core/frame_core_helper',
        'frame/common/core/frame_crypt',
        'app_info',
        'configures/systemMenus'
    ],

    function(configs, appCoreHelperIns, frameCryptIns, appInfoIns, systemMenus) {

        "use strict";

        var frameCore = Ember.Object.extend({
            init: function() {
                this.converMenusInfo();
                this._super();
            },
            handleQueryString: function() {
                var search = decodeURIComponent(window.location.search);
                var paraMetersObject = appCoreHelperIns.parseQueryString(search);

                if (paraMetersObject.hasOwnProperty('theme')) {
                    appCoreHelperIns.freshStyle(paraMetersObject.theme);
                }
                if (paraMetersObject.hasOwnProperty('showHeader')) {
                    configs.showHeader = paraMetersObject.showHeader === "true";
                }
                if (paraMetersObject.hasOwnProperty('showFooter')) {
                    configs.showFooter = paraMetersObject.showFooter === "true";
                }
                if (paraMetersObject.hasOwnProperty('useLocalIpAsServiceIp')) {
                    configs.useLocalIpAsServiceIp = paraMetersObject.useLocalIpAsServiceIp === "true";
                }
                if (paraMetersObject.hasOwnProperty('produceId')) {
                    configs.produceId = paraMetersObject.produceId;
                }
                if (paraMetersObject.hasOwnProperty('userName')) {
                    var userName = frameCryptIns.decode(paraMetersObject.userName);
                    appInfoIns.userInfo.set('userName', userName);
                }
                if (paraMetersObject.hasOwnProperty('passWord')) {
                    var passWord = frameCryptIns.decode(paraMetersObject.passWord);
                    appInfoIns.userInfo.set('passWord', passWord);
                }

                if (paraMetersObject.hasOwnProperty('verifyCodeEnabled')) {
                    configs.verifyCodeEnabled = paraMetersObject.verifyCodeEnabled === "true";
                }

                configs.searchParameters = paraMetersObject;

                this.setHostIp();
                this.setSystemMenus();

                if (paraMetersObject.hasOwnProperty('templateName')) {
                    appCoreHelperIns.convertDefault(appInfoIns, paraMetersObject.templateName);
                }
            },
            converMenusInfo: function() {
                var self = this;
                var _systemMenus = appCoreHelperIns.convertSystemMenus(systemMenus);
                appInfoIns.set('_systemMenus', _systemMenus);
            },
            setHostIp: function() {
                if (configs.useLocalIpAsServiceIp) {
                    var port = window.location.port ? window.location.port : '80',
                        hostIpPort = window.location.hostname + ":" + port,
                        locators = configs.locators;
                    for (var i in locators) {
                        if (typeof(locators[i]) === 'object') {
                            locators[i].host = hostIpPort;
                        }
                    }
                }
            },
            filterMenusByProduceId: function() {
                var menuItems = systemMenus.filterBy('pid', configs.produceId);
                appInfoIns.set('_menuItems', menuItems);
            },
            setSystemMenus: function() {
                this.filterMenusByProduceId();
            },
            setMeauToExcludeAuthen: function() {
                appInfoIns.set('_menuItems', appInfoIns._systemMenus.filter(function(meauItem) {
                    return meauItem.templateName && configs.bssExcludePages.includes(meauItem.templateName);
                }));
            }

        });

        return frameCore.create();
    });