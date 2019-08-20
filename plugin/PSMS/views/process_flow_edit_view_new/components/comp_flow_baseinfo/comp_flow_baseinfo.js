define(
    [
        'app',
        'app_info',
        'text!./comp_flow_baseinfo.html',
        'common/components/comp_msgbox/comp_msgbox',
        'json!./../../../../config/properties.json',
        'css!./comp_flow_baseinfo.css'
    ],
    function(app,app_info, template,msgBox, proConfig) {
        "use strict";
        app.CompFlowBaseinfoComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-flow-baseinfo',
            messageBox: undefined,
            baseInfo:undefined,
            processTypeData:undefined,
            flowTypeData:undefined,
            hisFlowData:undefined,
            init: function() {
                this._super();
                this.messageBox = msgBox.create();
                this._initData();
            },
            _initData:function(){
                if (this.parameters) {
                    this.hisFlowData = this.parameters.hisFlows;
                    // this.hisFlowData.unshiftObject({
                    //     id:'-1',
                    //     flowname:'请选择历史模板...',
                    // });
                }

                this.processTypeData = proConfig.processType;
                this.flowTypeData = proConfig.flowType;
                this.baseInfo = {
                    name:'',
                    owner:app_info.userInfo2.userName,
                    processType:this.processTypeData[0].id,
                    flowType:this.flowTypeData[0].id,
                    desc:''
                };
            },
            didInsertElement: function() {
                this.findNames();
            },
            didUpdate: function() {},

            willDestroyElement: function() {
                this._super();
                if(this.messageBox){
                    this.messageBox = undefined;
                }
            },
            actions: {
                confirmAction:function(){
                    this.parameters.baseInfo = this.baseInfo;
                    if(this.baseInfo.name === ''){
                        this.messageBox.showAlert('模板名称不能为空！');
                        return;
                    }
                    this.sendAction('sendClose');

                },
                cancelAction:function(){
                    this.sendAction('sendClose');

                },
                getFlow:function(){
                    if(event.target.value !== '-1'){
                        this.parameters.flowIndex = event.target.value;
                        this.sendAction('sendParam');
                    }
                },
                getProcessType:function(){
                    if(event.target.value !== undefined){
                        this.baseInfo.processType = event.target.value;
                    }
                },
                getflowType:function(){
                    if(event.target.value !== undefined){
                        this.baseInfo.flowType = event.target.value;
                    }
                }
            }
        });
    });