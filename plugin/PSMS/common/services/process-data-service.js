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
            getRestfulUrl: function(urlName,hostName){
               return 'http://' + configs.locators.VRSSRestful[hostName] + '/' + configs.locators.VRSSRestful[urlName] + '/';
            },
            /**
             * 获取数据服务rest地址
             */
            getFileUrl: function(){
                return 'http://' + configs.locators.VRSSRestful['host'] + '/' + configs.locators.VRSSRestful[urlName] + '/';
            },
            /**
             * 数据接口
             * @param  {Object} param
             * @param  {String} urlName
             * @param  {Object} callback
             * @param  {Object} hostName
             */
            getRestfulData: function(param, urlName, callback,hostName,type){
                if(!hostName){
                    hostName = 'host';
                }
                var restfulModel = new Ember.Object();
                restfulModel.type = type||'POST';
                restfulModel.url = this.getRestfulUrl(urlName,hostName);
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
                        console.error('getRestfulAsync error：' +urlName + '=[ '+ configs.locators.VRSSRestful[urlName] +' ]');
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