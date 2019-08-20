define(
    [
    ],
    function() {
        'use strict';
        return Ember.Object.extend({
            //ID
            id:'',
            //用户组名称
            name:'',
            //用户组创建者
            ownerId:'',
            //描述
            memo:'',
            //用户集合
            userList:[]
        });
    });