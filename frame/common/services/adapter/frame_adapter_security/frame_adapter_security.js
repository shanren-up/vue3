define(
    [
        'configs'
    ],

    function(configs) {

        'use strict';

        return Ember.Object.extend({
            init: function() {

            },
            willDestroy: function() {
                if(this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
                if(this.callBack) {
                    this.callBack = null;
                }
            },
            /**
             * 获取数据服务rest地址
             */
            getRestfulUrl: function(){
                return 'http://' + configs.locators.VRSSRestful['host'] + '/' + configs.locators.VRSSRestful['login'] + '/';
            },
            /**
             * 数据接口
             * @param  {Object} param
             * @param  {String} urlName
             * @param  {Object} callback
             */
            getRestfulData: function(param, callback){
                var restfulModel = new Ember.Object();
                restfulModel.type = 'POST';
                restfulModel.url = this.getRestfulUrl();
                restfulModel.contentType = 'application/json;charset=UTF-8';
                restfulModel.dataType = 'json';
                restfulModel.data = param;
                restfulModel.async = true;
                this.getRestfulAsync(restfulModel).then(
                    function(result){
                        if(callback){
                            callback(result);
                        }
                    }, function(reason){
                        console.warn('getRestfulAsync error');
                        if(callback){
                            callback(null);
                        }
                    });
            },
            /**
             * 单次接口查询
             * @param {Object} restfulModel
             */
            getRestfulAsync: function(restfulModel) {
                var self = this;
                if(!restfulModel.url) {
                    console.log("请求url不能为空!");
                    return;
                }
                return new Ember.RSVP.Promise(function(resolve, reject) {
                    $.ajax({
                        type: restfulModel.type,
                        url: restfulModel.url,
                        contentType: restfulModel.contentType,
                        dataType: restfulModel.dataType,
                        data: restfulModel.data ? JSON.stringify(restfulModel.data) : null,
                        async: restfulModel.async
                    }).then(function(result) {
                        // on success
                        resolve(result);
                    }, function(reason) {
                        // on failure
                        reject(reason);
                    });
                });
            },
        });
    });