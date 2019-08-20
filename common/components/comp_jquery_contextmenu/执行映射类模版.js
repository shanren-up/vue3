define(function() {
    "use strict";
    return Ember.Object.extend({
        command: function(key, options) {
            console.log(key + '未重写command');
        },
        //是否显示 默认true ：显示
        visible: function(key, options) {
            return true;
        },
        //是否可用 默认false：可用
        disabled: function(key, options) {
            return false;
        }
    });
});