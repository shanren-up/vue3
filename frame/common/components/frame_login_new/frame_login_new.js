define([
    'app',
    'app_info',
    'configs',
    'common/components/comp_msgbox/comp_msgbox',
    'text!./frame_login_new.html',
    'app_info',
    'frame/common/core/frame_core_helper',
    '../../services/adapter/frame_adapter_security/frame_adapter_security',
    '../frame_code/frame_code',
    'css!./frame_login_new.css'
], function (App,  app_info, configs, msgBox, template, appInfoIns, frameCoreHelperIns, anthSecurity) {

    "use strict";

    App.FrameLoginNewComponent = Ember.Component.extend({
        layout: Ember.ExtendHelper.compileEx(template),
        templateName: 'frame-login-new',
        anthAdaptor: null,
        messageBox: null,
        userName: '',
        passWord: '',
        checkCode: '',
        isShowCode: false,
        backTitle: '<< 返回',
        showBack:false,
        init: function () {
            this._super();
            this.messageBox = msgBox.create();
            this.anthAdaptor = anthSecurity.create();
            this.loadDefaultUserInfo();
        },
        didInsertElement: function () {
            this.findNames();
            this.$('#loginNew').keyup(function(){
                if(event.which == 13){
                    this._handleConfirm();
                }
            }.bind(this));
        },
        willDestroyElement: function () {
            if(this.anthAdaptor){
                this.anthAdaptor.destroy();
                this.anthAdaptor = null;
            }
            if(this.messageBox){
                this.messageBox = null;
            }
        },
        loadDefaultUserInfo: function() {
            if(this.loadFromSearchString()) {
                this.loadUserNameFromStorage();
            }
        },
        loadFromSearchString: function() {
            var result = false;
            if(appInfoIns.userInfo.userName && appInfoIns.userInfo.passWord) {
                this.set('userName', appInfoIns.userInfo.userName);
                this.set('passWord', appInfoIns.userInfo.passWord);
                this.set('isVisible', false);
                this.loginFromUrl();
            } else {
                result = true;
            }

            return result;
        },

        loadUserNameFromStorage: function() {
            var userName = frameCoreHelperIns.getItemToStorage('frame_user_name');
            if(userName) {
                this.set('userName', userName);
            }
        },

        userNameChanged: Ember.observer('userName', function() {
            frameCoreHelperIns.setItemToStorage('frame_user_name', this.userName);
        }),

        validateUserPassCode: function() {
            var result = Ember.Object.create({
                status: true,
                des: ''
            });

            if(this.isShowCode){
                if(this.validate(this.get('checkCode'))) {
                    result.set('status', false);
                    result.set('des', '请输入验证码！');
                    this.$('#loginCode').focus();
                    return result;
                } else {
                    if(this.childs['verifyCode'].validateCode(this.checkCode)) {
                        result.set('status', false);
                        result.set('des', '输入验证码不正确！');
                        this.$('#loginCode').focus();
                        this._handleFreshCode();
                        return result;
                    }
                }
            }

            if(this.validate(this.get('userName'))) {
                result.set('status', false);
                result.set('des', '用户名不能为空！');
                this.$('#loginUser').focus();
                return result;
            }

            if(this.validate(this.$('#loginPass').val())) {
                result.set('status', false);
                result.set('des', '密码不能为空！');
                this.$('#loginPass').focus();
                return result;
            }else{
                this.set('passWord', this.$('#loginPass').val());
            }

            return result;
        },
        validate: function(str){
            return Ember.isEmpty(str);
        },
        validateDataByBD: function(callback){
            var param = {
                loginname: this.userName.trim(),
                password: this.passWord.trim()
            };
            //TODO
            this.anthAdaptor.getRestfulData(param, function(result){
                callback(result);
            }.bind(this));
            // var result = {
            //     loginCode : '1',
            // };
            // appInfoIns.userInfo.userName = 'test';
            // appInfoIns.userInfo.userId = '232';
            // callback(result);
        },
        _handleFreshCode: function(){
            if(this.isShowCode){
                this.childs['verifyCode'].freshVerifyCode();
            }
        },
        handleResult: function(result){
            if(result.code !==0){
                this.messageBox.showError('登录失败！');
                return;
            }else{
                sessionStorage.setItem('3minSar',"isLogin");
                var userInfo = {
                    userName:result.data.username,
                    userId:result.data.id,
                    roleName:result.data.rolename,
                    roleId:result.data.roleid,
            };
                app_info.userInfo2 = userInfo;
                sessionStorage.setItem('userInfo',JSON.stringify(userInfo));
                // appInfoIns.userInfo.userName = result.data.userName;
                // appInfoIns.userInfo.userId = result.data.uid;
                this.sendAction('success', true);
            }
        },
        // handleResult: function(result){
        //     if(!result){
        //         this.messageBox.showError('无法连接登陆服务');
        //         this._handleFreshCode();
        //         return;
        //     }
        //     switch(result.loginCode) {
        //         case '1': //成功
        //             //appInfoIns.setUserInfo(JSON.parse(result.loginUser));
        //             //设置全部操作权限
        //             //appInfoIns.setOperationPrivilges(result);
        //             //设置全部数据权限
        //             //appInfoIns.setAllDataPrivilges(result);
        //             this.sendAction('success', true);
        //             break;
        //         case '0': //密码不正确
        //             this.messageBox.showError('用户名或者密码不正确，请重新输入！');
        //             this._handleFreshCode();
        //             break;
        //         case '-1': //锁定状态
        //             this.messageBox.showError('此用户已被锁定，请联系管理员解锁后登陆！');
        //             this._handleFreshCode();
        //             break;
        //         default: //失败
        //             this.messageBox.showError('此用户不存在，请重新输入！');
        //             this._handleFreshCode();
        //             break;
        //     }
        // },
        _handleConfirm: function(){
            var result = this.validateUserPassCode();
            if(!result.status){
                this.messageBox.showError(result.des);
                return;
            }else{
                this.validateDataByBD(this.handleResult.bind(this));
            }
        },
        actions: {
            confirmLogin: function(){
                this._handleConfirm();
            },
            keyDownAction: function(){
                if(event.keyCode == '13'){
                    this._handleConfirm();
                }
            },
            backToIndex: function(){
                this.sendAction('backToIndex');
            }
        }
    });
});
