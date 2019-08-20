define(
    [
    ],
    function() {
        'use strict';
        return Ember.Object.extend({
            //用户组的ID
            groupId:'',
            //用户编号
            id:'',
            //是否是超级管理员
            isSupper:false,
            //用户是否被锁定
            locked:false,
            //手机号
            mobilePhone:'',
            //EMail
            email:'',
            //密码
            password:'',
            //用户名
            userName:''
        });
    });