define(
    [
        'app',
        'common/components/comp_msgbox/comp_msgbox',
        'text!./process_taskflow_view.html',
        '../../common/services/process-data-service',
        'css!./process_taskflow_view.css',
        './../process_task_manager_view/process_task_manager_view'
    ],
    function(app, msgBox, template, dataService) {
        "use strict";
        app.ProcessTaskflowViewComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'process-taskflow-view',
            dataAdaptor: null,
            messageBox: null,
            showFlow:true,
            processType:undefined,
            flowData:undefined,
            selectflow:undefined,
            init: function() {
                this._super();
                this.messageBox = msgBox.create();
                this.dataAdaptor = dataService.create();
                this._initData();
                if(this.parameters && this.parameters.processType){
                    this.processType = this.parameters.processType;
                }
            },
            didInsertElement: function() {
                this.findNames();
            },
            didUpdate: function() {},

            willDestroyElement: function() {
                this._super();
                if(this.messageBox){
                    this.messageBox = null;
                }
                if(this.dataAdaptor){
                    this.dataAdaptor.destroy();
                    this.dataAdaptor= null;
                }
            },
            _initData: function() {
                //获取flow信息
                this.dataAdaptor.getRestfulData({}, 'selectFlows', function (result) {
                    if (result) {
                        //解析数据
                       this.set('flowData',result);
                    }
                }.bind(this));
            },
            _deleteFlow:function(flowId){
                this.dataAdaptor.getRestfulData({id:flowId}, 'deleteFlow', function (result) {
                    if (result === 0) {
                        if(this.get('flowData')){
                            var delObj = this.get('flowData').findBy('id',flowId);
                            this.get('flowData').removeObject(delObj);
                        }
                        this.set('flowData',this.get('flowData'));
                        this.messageBox.showSuccess('删除成功！');
                    } else if(result === 1){
                        this.messageBox.showError('删除失败！');
                    } else if(result === 2){
                        var txt = "无法删除，当前流程上存在任务！";
                        this.messageBox.showError('无法删除，当前流程上存在任务！');
                    }
                }.bind(this));
            },
            actions: {
                queryProcess: function(){
                    this._initData();
                },
                deleteFlow:function(id){
                    this.messageBox.showConfirm('确认删除？', function(result){
                        if(result){
                            this._deleteFlow(id);
                        }
                    }.bind(this));
                },
                openTask:function(data){
                    this.set('selectflow', data);
                    this.set('showFlow',false);
                }
            }
        });
    });