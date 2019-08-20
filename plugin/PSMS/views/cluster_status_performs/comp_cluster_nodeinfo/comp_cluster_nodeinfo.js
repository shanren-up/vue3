define(
    [
        'app',
        'common/components/comp_msgbox/comp_msgbox',
        'text!./comp_cluster_nodeinfo.html',
        'json!../../../common/common_dictionary_data.json',
        '../../../common/services/process-data-service',
        '../../../common/models/nodeModel',
        'css!./comp_cluster_nodeinfo.css',
        'css!lib/fontawesome/css/font-awesome.min.css'
    ],
    function(app, msgBox, template, commonData, dataService, nodeModel) {
        "use strict";
        app.CompClusterNodeinfoComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-cluster-nodeinfo',
            messageBox: null,
            dataAdaptor: null,
            nodeTypeData: null,
            nodeModel: null,
            isEdit: false,

            init: function() {
                this._super();
                this.nodeTypeData = Ember.A();
                this.userTypeData = Ember.A();
                this.dataAdaptor = dataService.create();
                this.messageBox = msgBox.create();
                if(this.parameters && this.parameters.data){
                    this.set('isEdit', true);
                    this.set('nodeInfo', this.parameters.data);
                }else{
                    this.set('nodeInfo', nodeModel.create());
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
                this.set('nodeTypeData', commonData.nodeType.concat());
                if(this.isEdit){
                    var obj = this.nodeTypeData.findBy('id', this.nodeInfo.nodetype);
                    if(obj){
                        Ember.set(obj, 'isSelected', true);
                    }
                }else{
                    this.nodeInfo.set('nodetype', this.nodeTypeData[0].id);
                }
            },
            _validRoleInfo: function(){
                var result = Ember.Object.create({
                    status: true,
                    des: ''
                });
                if(Ember.isEmpty(this.nodeInfo.nodename)){
                    result.set('status', false);
                    result.set('des', '节点名称不能为空！');
                    return result;
                }
                if(Ember.isEmpty(this.nodeInfo.nodeip)){
                    result.set('status', false);
                    result.set('des', '节点名称不能为空！');
                    return result;
                }
                if(Ember.isEmpty(this.nodeInfo.nodeport)){
                    result.set('status', false);
                    result.set('des', '节点端口不能为空！');
                    return result;
                }
                if(Ember.isEmpty(this.nodeInfo.nodetotalused)){
                    result.set('status', false);
                    result.set('des', '节点总处理能力不能为空！');
                    return result;
                }
                return result;
            },
            actions: {
                typeChange:function(){
                    this.nodeInfo.set('nodetype', event.target.value);
                },
                statusChange: function(){
                    this.nodeInfo.set('status', event.target.value);
                },
                confirmNodeInfo: function(){
                    Ember.set(this.nodeInfo,'nodetotalused',this.$('#nodetotalused').val());
                    var result = this._validRoleInfo();
                    if(!result.status){
                        this.messageBox.showError(result.des);
                        return;
                    }
                  
                    this.parameters.data=this.nodeInfo;

                    this.parameters.isEdit = this.isEdit;
                    this.sendAction('sendConfirm');
                },
                cancelNodeInfo: function(){
                    this.sendAction('sendClose');
                }
            }
        });
    });