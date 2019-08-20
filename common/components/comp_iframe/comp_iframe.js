define(
    [
        'app',
        'text!./common/components/comp_iframe/comp_iframe.html',
        'app_info',
        'css!./common/components/comp_iframe/comp_iframe.css',
        'css!./common/components/comp_iframe/comp_iframe_theme_default.css'
    ],

    function(app, template, appInfo) {

        'use strict';

        app.CompIframeComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp_iframe',
            classNames: ['absolute', 'comp-iframe'],
            _menuInfo: {},
            init: function() {
                this._super();
            },
            didInsertElement: function() {},
            _frameURI: Ember.computed('_menuInfo.src', function() {
                if (!this._menuInfo.hasUserInfo) {
                    return this._menuInfo.src;
                } else if (this._menuInfo._type === 'emos') {
                    return this._menuInfo.src + (this._menuInfo.src.indexOf('?') > -1 ? '&' : '?') + 'access_token=' + appInfo._accessToken + '&user_id=' + appInfo.userInfo.userId;
                } else if (this._menuInfo.urlParamType === 'hash') {
                    return this._addUrlUserInfoToHash(this._menuInfo.src);
                } else {
                    return this._addUrlUserInfoToQueryPamam(this._menuInfo.src);
                }
            }),
            _addUrlUserInfoToQueryPamam: function(url) {
                var subUrl, index,
                    addStr = 'access_token=' + appInfo._accessToken + '&user_id=' + appInfo.userInfo.userId;
                if (url.indexOf('#') === -1) {
                    return url + ((url.indexOf('?') > -1) ? '&' : '?') + addStr;
                } else {
                    index = url.indexOf('#');
                    subUrl = url.slice(0, index);
                    return subUrl + ((subUrl.indexOf('?') > -1) ? '&' : '?') + addStr + url.slice(index);
                }
            },
            _addUrlUserInfoToHash: function(url) {
                var addStr = '#access_token=' + appInfo._accessToken + '#user_id=' + appInfo.userInfo.userId;
                return url + addStr;
            },
            actions: {}
        });

        // mouseEnter:function(event){
        // $(event.target)
        // },
    });