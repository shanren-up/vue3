define(
    [
        'app',
        'common/components/comp_msgbox/comp_msgbox',
        'text!./comp_userinfo.html',
        'json!../../../../common/common_dictionary_data.json',
        '../../../../common/services/process-data-service',
        '../../../../common/models/user_info',
        'css!./comp_userinfo.css',
        'css!lib/fontawesome/css/font-awesome.min.css'
    ],
    function(app, msgBox, template, commonData, dataService, userinf) {
        "use strict";
        app.CompUserinfoComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-userinfo',
            messageBox: null,
            dataAdaptor: null,
            sexData: null,
            userInfo: null,
            isEdit: false,
            currentUser:undefined,
            init: function() {
                this._super();
                this.sexData = Ember.A();
                this.userTypeData = Ember.A();
                this.dataAdaptor = dataService.create();
                this.messageBox = msgBox.create();
                var currentUser = sessionStorage.getItem('userInfo');
                if(currentUser){
                    this.currentUser ={
                        username:JSON.parse(currentUser).userName,
                        userId:JSON.parse(currentUser).userId,
                        roleId:JSON.parse(currentUser).roleId
                    };
                }
                if(this.parameters && this.parameters.data){
                    this.set('isEdit', true);
                    this.set('userInfo', this.parameters.data);
                }else{
                    this.set('userInfo', {
                        username:'',
                        loginname:'',
                        password:'',
                        roleid:'',
                        tel:'',
                        sex:'',
                        email:'',
                    });
                }
                this._initData();
            },
            didInsertElement: function() {
                this.findNames();
               // this.$('#passwordValue').val(this.userInfo.loginPwd);
               // this.$('#passwordValue2').val(this.userInfo.loginPwd);
                this.$('#telValue').val(this.userInfo.tel);
                this.$('#emailValue').val(this.userInfo.email);
            },
            didUpdate: function() {},

            willDestroy:function(){

            },
            willDestroyElement: function() {
                this._super();
                Ember.run.later(function(){
                    if(this.messageBox){
                        this.messageBox = null;
                    }
                    if(this.dataAdaptor){
                        this.dataAdaptor.destroy();
                        this.dataAdaptor= null;
                    }
                }.bind(this), 1000);
                // if(this.sexData){
                //     this.sexData = null;
                // }
                // if(this.userInfo){
                //     this.userInfo = null;
                // }
                // if(this.currentUser){
                //     this.currentUser = null;
                // }
            },
            _initData: function() {
                this._initUserRoleData();
                this.set('sexData',  commonData.sexData);
                if(this.isEdit){
                    this.sexData.forEach(function(item){
                            item.isSelected = false;
                    });
                    var obj = this.sexData.findBy('name', this.userInfo.sex);
                    if(obj){
                        Ember.set(obj, 'isSelected', true);
                    }
                }else{
                    this.userInfo.sex=this.sexData[0].name;
                }
            },
            _initUserRoleData: function(){
                if(this.dataAdaptor){
                    this.dataAdaptor.getRestfulData({}, 'selectRole', function(result){
                        if(result.code === 0){
                            this.set('userTypeData',result.data);
                           
                            if(this.isEdit){
                                var obj = this.userTypeData.findBy('id', parseInt(this.userInfo.roleid));
                                if(obj){
                                    Ember.set(obj, 'isSelected', true);
                                }
                            }else{
                                this.userInfo.roleid = result.data[0].id;  
                            }
                        }else{
                            this.messageBox.showError(result.message);
                        }
                    }.bind(this));
                }
            },
            _validRoleInfo: function(){
                var result = Ember.Object.create({
                    status: true,
                    des: ''
                });
                if(Ember.isEmpty(this.userInfo.username)){
                    result.set('status', false);
                    result.set('des', '请输入用户名称');
                    return result;
                }
                if(Ember.isEmpty(this.$('#passwordValue').val()) && !this.isEdit){
                    result.set('status', false);
                    result.set('des', '请输入用户密码');
                    return result;
                }else{
                    Ember.set(this.userInfo, 'password', this.$('#passwordValue').val());
                }
                if(Ember.isEmpty(this.$('#passwordValue2').val()) && !this.isEdit){
                    result.set('status', false);
                    result.set('des', '请输入确认密码');
                    return result;
                }
                if(this.$('#passwordValue').val() !== this.$('#passwordValue2').val()){
                    result.set('des', '密码输入不一致');
                    return result;
                }
                if(Ember.isEmpty(this.userInfo.loginname)){
                    result.set('status', false);
                    result.set('des', '请输入登录名');
                    return result;
                }
                if(Ember.isEmpty(this.$('#telValue').val())){
                    result.set('status', false);
                    result.set('des', '请输入电话号码');
                    return result;
                }else{
                    Ember.set(this.userInfo, 'tel', this.$('#telValue').val());
                }
                if(Ember.isEmpty(this.$('#emailValue').val())){
                    result.set('status', false);
                    result.set('des', '请输入电子邮件');
                    return result;
                }else{
                    Ember.set(this.userInfo, 'email', this.$('#emailValue').val());
                }
                return result;
            },
            actions: {
                sexChange: function(){
                    Ember.set(this.userInfo, 'sex', event.target.value);
                },
                userTypeChange: function(){
                    Ember.set(this.userInfo, 'roleid', event.target.value);
                },
                confirmUserInfo: function(){
                    var result = this._validRoleInfo();
                    if(!result.status){
                        this.messageBox.showError(result.des);
                        return;
                    }
                    Ember.set(this.parameters, 'data', this.userInfo);
                    Ember.set(this.parameters, 'isEdit', this.isEdit);
                    this.sendAction('sendConfirm');
                },
                cancelUserInfo: function(){
                    this.sendAction('sendClose');
                }
            }
        });
    });