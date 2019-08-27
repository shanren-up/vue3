define(
    [
        'app',
        'text!./comp_flow_ioinfo.html',
        'common/components/comp_msgbox/comp_msgbox',
        'json!./../../../../config/properties.json',
        'css!./comp_flow_ioinfo.css'
    ],
    function(app, template,msgBox,proConfig) {
        "use strict";
        app.CompFlowIoinfoComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-flow-ioinfo',
            messageBox: undefined,
            conn:undefined,
            blocks:undefined,
            modules:undefined,
            sourceData:undefined,
            targetData:undefined,
            sourceId:undefined,
            targetId:undefined,
            ioDataArr:undefined,
            init: function() {
                this._super();
                this.messageBox = msgBox.create();
                if(this.parameters){
                    this.conn = this.parameters.conn;
                    this.blocks = this.parameters.blocks;
                    this.modules = this.parameters.modules;
                    this.ioDataArr = this.parameters.ioDataArr;
                }
                this._initData();
            },
            _getIoData:function(line){
                var ioData = undefined;
                if(line === undefined){
                    return undefined;
                }
                var pageSourceId = line.sourceId;
                var pageTargetId = line.targetId;
                // var sourceBlock = this.blocks.findBy('blockId',pageSourceId);
                // var targetBlock = this.blocks.findBy('blockId',pageTargetId);
                if(pageSourceId && pageTargetId && this.ioDataArr){
                    this.ioDataArr.forEach(function(item){
                        if(item.pageSourceId === pageSourceId && item.pageTargetId === pageTargetId){
                            ioData = item;
                            return ioData;
                        }
                    });
                }else{
                    return undefined;
                }
                return ioData;
            },
            /**
             * 初始化数据
             * @private
             */
            _initData:function(){
                var oldIoData;
                if(this.ioDataArr){
                    oldIoData = this._getIoData(this.conn);
                }
                if(oldIoData){
                    this.sourceData = oldIoData.sourceData;
                    this.targetData = oldIoData.targetData;
                }else{
                    if(this.conn.targetId === 'state_end'){
                        return;
                    }
                    if(this.conn.sourceId === 'state_start'){
                        this.sourceData = proConfig.startKey;
                        //this.sourceId = '';
                    }else{
                        this.sourceData = [];
						this.sourceData = [].concat(proConfig.startKey);
                        var sourceFlowId = this.blocks.findBy('blockId',this.conn.sourceId).flowId;
                        this.modules.forEach(function (item) {
                            var source = item.Userproperty.OutputParameter.OutPutFilePath;
                            source.forEach(function(param){
                                param.sourceId = item.flow_id;
                                this.sourceData.pushObject(param);
                            }.bind(this));
                        }.bind(this));
                        // this.sourceData = this.modules.findBy('flow_id',sourceFlowId).Userproperty.OutputParameter.OutPutFilePath ;
                        //this.sourceId = this.blocks.findBy('blockId',this.conn.sourceId).flowId;
                    }
                    var targetFlowId = this.blocks.findBy('blockId',this.conn.targetId).flowId;
                    this.targetData = this.modules.findBy('flow_id',targetFlowId).Userproperty.InputParameter.InputFilePath ;
                    this.targetData.forEach(function(item){
                        item.targetId = targetFlowId
                    }.bind(this));
                }
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
            _changeRowIndex:function(type,fromIndex,toIndex){
                var data = this[type];
                if(data){
                    var tempData = data[fromIndex];
                    data[fromIndex] = data[toIndex];
                    data[toIndex] = tempData;
                    this.set(type,[]);
                    this.set(type,data);
                }
            },
            actions: {
                /**
                 * 确认事件
                 */
                confirmAction:function(){
                    this.parameters.ioData ={
                        connId:this.conn.id,
                        pageSourceId:this.conn.sourceId,
                        pageTargetId:this.conn.targetId,
                        sourceData:this.sourceData,
                        targetData:this.targetData
                    };
                    this.sendAction('sendClose');
                },
                cancelAction:function(){
                    this.sendAction('sendClose');
                },
                /**
                 * allowDrop，drop，drag为列表上下拖拽实现
                 * @param ev
                 */
                allowDrop:function(ev){
                    ev.preventDefault();
                },
                drop:function(type){
                    event.preventDefault();
                    var fromIndex = parseInt(event.dataTransfer.getData('index'))-1;
                    var toIndex = event.currentTarget.rowIndex-1;
                    this._changeRowIndex(type,fromIndex,toIndex);
                },
                drag:function(ev){
                    ev.dataTransfer.setData('index',ev.currentTarget.rowIndex);
                }
            }
        });
    });