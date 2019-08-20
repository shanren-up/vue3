define(
    [

    ],
    function() {
        "use strict";

        return {
            comModelMessageGroup: Ember.Object.extend({
                init: function() {
                    this.set('msgType', ''); //消息类型，字符串
                    this.set('messages', '');//消息内容字典
                }
            }),
        };
    });