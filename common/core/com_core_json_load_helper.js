define(
    [
        'app',
        'configs'
    ],
    function (app, configs) {
        "use strict";
        var ComCoreJsonLoadHelper = Ember.Object.extend({

            init: function () {

            },
            willDestroy: function () {

            },
            //json文件克隆方法
            cloneJson: function(json) {
                var data = null;
                if(Object.prototype.toString.call(json).slice(8, -1) === 'Array') {
                    data = [];
                    json.forEach(function(item) {
                        data.pushObject(this.cloneJson(item));
                    }.bind(this));
                } else if(Object.prototype.toString.call(json).slice(8, -1) === 'Object') {
                    data = Ember.Object.create();
                    for(var item in json) {
                        if(json.hasOwnProperty(item)) {
                            if(Object.prototype.toString.call(json[item]).slice(8, -1) === 'Array') {
                                Ember.set(data, item, []);
                                json[item].forEach(function(value) {
                                    data[item].pushObject(this.cloneJson(value));
                                }.bind(this));
                            } else if(Object.prototype.toString.call(json[item]).slice(8, -1) === 'Object') {
                                Ember.set(data, item, this.cloneJson(json[item]));
                            } else {
                                Ember.set(data, item, json[item]);
                            }
                        }
                    }
                } else {
                    return json;
                }
                return data;
            },
            // 加载Json文件，
            // 如果produceJson存在，返回produceJson对应的Json对象，
            // 否则返回defaultJson对应的Json对象
            loadJson:function(defaultJson,produceJson,callback)
            {
                var promiseA = new Ember.RSVP.Promise(function(resolve, reject) {
                    require([
                            produceJson            
                        ],
                        function(a) {
                            resolve(a);
                        },
                        function(error) {
                            // 或者false
                            reject(error);
                        });
                });
                var promiseB = new Ember.RSVP.Promise(function(resolve, reject) {
                    require([
                            defaultJson            
                        ],
                        function(b) {
                            resolve(b);
                        },
                        function(error) {
                            // 或者false
                            reject(error);
                        });
                });
                Ember.RSVP.allSettled([promiseA, promiseB]).then(function(a, b) {
                    if(!Ember.isEmpty(a)&&a.length>1)
                    {
                        if(a[0].value&&callback){
                            callback(a[0].value);
                        } 
                        else if(a[1].value&&callback){
                            callback(a[1].value);
                        } 
                    }                    
                });
            }
        });
        return ComCoreJsonLoadHelper.create();
    });