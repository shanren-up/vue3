define(
    [
        'app',
        'common/components/comp_msgbox/comp_msgbox',
        'text!./system_roleinfo_panel.html',
        'json!../../common/common_dictionary_data.json',
        '../../common/services/process-data-service',
        '../../common/models/role_info',
        'css!./system_roleinfo_panel.css',
        'css!lib/fontawesome/css/font-awesome.min.css'
    ],
    function(app, msgBox, template, commonData, dataService, roleinfo) {
        "use strict";
        app.SystemRoleinfoPanelComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'system-roleinfo-panel',
            messageBox: null,
            dataAdaptor: null,
            roleInfo: null,
            isEdit: false,

            init: function() {
                this._super();
                this.roleLevelData = Ember.A();
                this.dataAdaptor = dataService.create();
                this.messageBox = msgBox.create();
                if(this.parameters && this.parameters.data){
                    this.set('isEdit', true);
                    this.set('roleInfo', this.parameters.data);
                }else{
                    var id = Ember.ExtendHelper.makeCRC32(new Date().Format("yyyy-MM-dd hh:mm:ss"));
                    this.set('roleInfo', roleinfo.create());
                    this.roleInfo.set('id', id);
                }
                this._initData();
            },
            didInsertElement: function() {
                this.findNames();
            },
            didUpdate: function() {},

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
            },
            _initData: function() {
                this.set('roleLevelData', commonData.roleLevelData.concat());
                if(!this.isEdit){
                    Ember.set(this.roleInfo, 'level_', this.roleLevelData[0].id);
                }else{
                    var obj = this.roleLevelData.findBy('id', this.roleInfo.level_);
                    if(obj){
                        Ember.set(obj, 'isSelected', true);
                    }
                }
            },
            _validRoleInfo: function(){
                var result = Ember.Object.create({
                    status: true,
                    des: ''
                });
                if(Ember.isEmpty(this.roleInfo.rolename)){
                    result.set('status', false);
                    result.set('des', '请输入角色名称');
                    return result;
                }
                /*if(Ember.isEmpty(this.roleInfo.commtents)){
                    result.set('status', false);
                    result.set('des', '请输入角色描述');
                    return result;
                }*/
                return result;
            },
            actions: {
                levelChange: function(){
                    Ember.set(this.roleInfo, 'level_', this.roleInfo.level_ + event.target.value);
                },
                confirmRoleInfo: function(){
                    var result = this._validRoleInfo();
                    if(!result.status){
                        this.messageBox.showError(result.des);
                        return;
                    }
                    Ember.set(this.parameters, 'data', this.roleInfo);
                    Ember.set(this.parameters, 'isEdit', this.isEdit);
                    this.sendAction('sendConfirm');
                },
                cancelRoleInfo: function(){
                    this.sendAction('sendClose');
                }
            }
        });
    });