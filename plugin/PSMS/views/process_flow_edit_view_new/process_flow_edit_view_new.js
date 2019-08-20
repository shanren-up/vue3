define(
    [
        'app',
        'text!./process_flow_edit_view_new.html',
        'app_info',
        'common/components/comp_msgbox/comp_msgbox',
        'json!./../../config/properties.json',
        'comp_modal',
        '../../common/services/process-data-service',
        'css!./process_flow_edit_view_new.css',
        './../../components/jsplumb_figure/jsplumb_figure',
        './../../components/comp_flow_param/comp_flow_param',
        './components/comp_flow_baseinfo/comp_flow_baseinfo',
        './components/comp_flow_ioinfo/comp_flow_ioinfo',
    ],
    function (app, template, app_info, msgBox, configPro, modal, dataService) {
        "use strict";
        app.ProcessFlowEditViewNewComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'process-flow-edit-view-new',
            dataAdaptor: undefined,
            messageBox: undefined,
            baseToolData: undefined,
            actionModulesData: undefined,
            //创建模板必须，模块输入输出参数，
            ioMap: undefined,
            ioDataArr: undefined,
            //创建模板必须，模板基本信息
            baseInfo: undefined,
            //创建模板必须，modules
            modules: undefined,
            //创建模板必须，workflow
            workflow: undefined,
            blocks: undefined,
            lines: undefined,
            baseImgUrl: 'plugin/PSMS/img/flow/',
            hisFlows: undefined,
            currentFlowId: undefined,
            flowChartView: undefined,
            paramView: undefined,
            init: function () {
                this._super();
                this.ioMap = [];
                this.workflow = [];
                this.modules = [];
                this.ioDataArr = [];
                this.dataAdaptor = dataService.create();
                this.messageBox = msgBox.create();
            },
            didInsertElement: function () {
                this.findNames();
                this.paramView = this.childs.paramView;
                this.flowChartView = this.childs.flowChartView;
                this.set('baseToolData', configPro.baseTools);
                this._initModules();
                this._initHisFlows();
            },
            didUpdate: function () {
            },

            willDestroyElement: function () {
                if (this.messageBox) {
                    this.messageBox = undefined;
                }
                if (this.dataAdaptor) {
                    this.dataAdaptor = undefined;
                }
            },
            willDestroy: function () {
                if (this.flowChartView) {
                    this.flowChartView.destroy();
                }
                if (this.paramView) {
                    this.paramView.destroy();
                }
            },
            /**
             * 初始化左侧工具
             * @private
             */
            _initModules: function () {
                //获取modules
                if (this.dataAdaptor) {
                    this.dataAdaptor.getRestfulData({}, 'flowTools', function (result) {
                        if (result) {
                            result.forEach(function (item) {
                                item.imgSrc = this.baseImgUrl + item.id.split('-')[0] + '.png';
                            }.bind(this));
                            this.set('actionModulesData', result);
                        }
                    }.bind(this));
                }
            },
            /**
             * 初始化历史模板
             * @private
             */
            _initHisFlows: function () {
                //获取modules
                var param = {};
                param.username = app_info.userInfo2.userName;
                param.userid = app_info.userInfo2.userId;
                if (this.dataAdaptor) {
                    this.dataAdaptor.getRestfulData({}, 'selectFlows', function (result) {
                        if (result) {
                            this.set('hisFlows', result);
                        }
                    }.bind(this));
                }
            },
            _openWindow: function (title, componentName, data) {
                var _self = this;
                modal.popup({
                    targetObject: this,
                    isDefaultStyle: true,
                    sizeClass: componentName + '-size',
                    headerClass: componentName + '-header',
                    bodyClass: componentName + '-body',
                    hasHeader: true,
                    hasMax: false,
                    hasPhoto: false,
                    headerText: title,
                    contentComponentName: componentName,
                    parameters: data,
                    hasFooter: false,
                    enforceModality: true,
                    top: 100,
                    confirm: function () {
                    },
                    param: function () {
                        if (this.parameters.flowIndex) {
                            _self._showFlowChart(_self.hisFlows[this.parameters.flowIndex]);
                        }
                    },
                    close: function () { //获取传递参数
                        if (this.parameters.baseInfo) {
                            _self.set('baseInfo', this.parameters.baseInfo);
                            _self.set('currentFlowId', undefined);
                        }
                        if (this.parameters.ioData) {
                            var tempData = _self._getIoData(this.parameters.ioData);
                            if (tempData) {
                                tempData.sourceData = this.parameters.ioData.sourceData;
                                tempData.targetData = this.parameters.ioData.targetData;
                            } else {
                                _self.ioDataArr.push(this.parameters.ioData);
                            }
                        }
                    }
                });
            },
            /**
             * 流程检查，创建后保存时检查，
             * @returns {boolean}
             * @private
             */
            //TODO
            _checkFlowData: function () {
                return true;
            },
            /**
             * 创建流程
             * @param block
             * @private
             */
            _createWorkflow: function (block) {
                var fromLine = this.lines.findBy('pageSourceId', block.blockId);
                var toLine = this.lines.findBy('pageTargetId', block.blockId);
                var flow = {};
                if (fromLine && this.blocks.findBy('blockId', fromLine.pageTargetId)) {
                    flow.next_id = this.blocks.findBy('blockId', fromLine.pageTargetId).flowId;
                }
                if (toLine && this.blocks.findBy('blockId', toLine.pageSourceId)) {
                    flow.pre_id = this.blocks.findBy('blockId', toLine.pageSourceId).flowId
                }
                flow.flow_id = block.flowId;
                this.workflow.push(flow);
                if (block.blockId !== 'state_start' && block.blockId !== 'state_end') {
                    var module = this.paramView.flowModules.findBy('flow_id', block.flowId);
                    this.modules.push(module);
                }
                if (fromLine && this.blocks.findBy('blockId', fromLine.pageTargetId)) {
                    this._createWorkflow(this.blocks.findBy('blockId', fromLine.pageTargetId));
                }
            },
            _getIoData:function(line){
                var ioData = undefined;
                if(line === undefined){
                    return undefined;
                }
                var pageSourceId = line.pageSourceId;
                var pageTargetId = line.pageTargetId;
                if(this.blocks === undefined){
                          this.blocks = this.flowChartView.getData().blocks;    
                }
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
             * 生成iomap数据，创建流程的必要数据
             * @private
             */
            _createIOMap: function () {
                this.lines.forEach(function (line) {
                    if (line.pageTargetId === 'state_end') {
                        return;
                    }
                    var sourceData, targetData;
                    var ioData = this._getIoData(line);
                    if (ioData) {
                        if(this.ioMap === undefined){
                            this.ioMap = [];
                        }
                        sourceData = ioData.sourceData;
                        targetData = ioData.targetData;
                        for (var i = 0; i < sourceData.length; i++) {
                            if (sourceData[i] && targetData[i]) {
                                //如果ioMap已经存在当前数据，更新数据
                                var tempItem;
                                for(var m = 0;m< this.ioMap.length;m++){
                                    var item = this.ioMap[m];
                                    if(item.input.name === targetData[i].name && item.input.id === targetData[i].targetId){
                                        tempItem = item;
                                    }
                                }
                                if(tempItem){
                                    tempItem.output.name = sourceData[i].name;
                                    tempItem.output.id = sourceData[i].sourceId;
                                }else{
                                    this.ioMap.push({
                                        output: {
                                            name: sourceData[i].name,
                                            id: sourceData[i].sourceId
                                        },
                                        input: {
                                            name: targetData[i].name,
                                            id: targetData[i].targetId
                                        }
                                    });
                                }
                            }
                        }
                    }
                }.bind(this));
                console.log(this.ioMap);
            },
            /**
             * 对参数中的数据进行处理，ember在双向绑定过程中，如果没有使用model，
             * 对于原本int类型的数据，界面修改后会变成string，这里转换下
             * @private
             */
            _replaceModuleParamStr: function () {
                this.modules.forEach(function (item) {
                    item.Systemproperty.SystemConfiguration.forEach(function (sysItem) {
                        if (sysItem.type === 'int') {
                            // sysItem.value = parseInt( sysItem.value);
                            Ember.set(sysItem, 'value', parseInt(sysItem.value));
                        }
                        if (sysItem.type === 'float') {
                            // sysItem.value = parseFloat( sysItem.value);
                            Ember.set(sysItem, 'value', parseFloat(sysItem.value));
                        }
                    });
                    item.Userproperty.InputParameter.Configuration.forEach(function (userItem) {
                        if (userItem.type === 'int') {
                            // userItem.value = parseInt( userItem.value);
                            Ember.set(userItem, 'value', parseInt(userItem.value));
                        }
                        if (userItem.type === 'float') {
                            //userItem.value = parseFloat( userItem.value);
                            Ember.set(userItem, 'value', parseFloat(userItem.value));
                        }
                        if (userItem.type === 'select') {
                            //userItem.value = parseFloat( userItem.value);
                            Ember.set(userItem, 'value', parseInt(userItem.value));
                        }
                    });
                }.bind(this));
            },
            /**
             * 创建一个流程
             * @private
             */
            _createFlow: function () {
                this.workflow = [];
                this.modules = [];
                this.blocks = this.flowChartView.getData().blocks;
                this.lines = this.flowChartView.getData().lines;
                var startBlock = this.blocks.findBy('blockId', 'state_start');
                this._createWorkflow(startBlock);
                this._createIOMap();
                this._replaceModuleParamStr();
                var flow = {
                    owner: this.baseInfo.owner,
                    subkey: this.baseInfo.processType,
                    key: this.baseInfo.flowType,
                    name: this.baseInfo.name,
                    icon: './plugin/PSMS/img/flow/FlowIcon/CustomProcess.png',
                    type: '',
                    desc: this.baseInfo.desc,
                    createDate: new Date(),
                    runMethod: 'auto',
                    IOMap: this.ioMap,
                    modules: this.modules,
                    workflow: this.workflow
                };
                var flowData;
                var flowUIData = {
                    content: {
                        blocks: this.blocks,
                        lines: this.lines,
                        ioDataArr:this.ioDataArr
						
                    }
                };
                //有currentFlowId是编辑流程，没有是新建流程
                if (this.currentFlowId !== undefined) {
                    flowData = {
                        id: this.currentFlowId,
                        content: flow,
                        flowname: flow.name,
                        userid: app_info.userInfo2.userId,
                        username: app_info.userInfo2.userName
                    };
                    this.dataAdaptor.getRestfulData(flowData, 'updateFlow', function (result) {
                        if (result) {
                            flowUIData.flowid = this.currentFlowId;
                            this.dataAdaptor.getRestfulData(flowUIData, 'updateUIData', function (result) {
                                if (result) {
                                    this.messageBox.showSuccess('编辑成功！');
                                    this._initHisFlows();
                                } else {
                                    this.messageBox.showSuccess('模板UI编辑失败！');
                                }
                            }.bind(this));

                        } else {
                            this.messageBox.showSuccess('模板编辑失败！');
                        }
                    }.bind(this));

                } else {
                    flowData = {
                        content: flow,
                        flowname: flow.name,
                        userid: app_info.userInfo2.userId,
                        username: app_info.userInfo2.userName
                    };
                    this.dataAdaptor.getRestfulData(flowData, 'createFlow', function (result) {
                        if (result.flowid) {
                            this.set('currentFlowId', result.flowid);
                            flowUIData.flowid = result.flowid;
                            this.dataAdaptor.getRestfulData(flowUIData, 'submitUiData', function (result) {
                                if (!result) {
                                    this.messageBox.showSuccess('模板UI创建失败！');
                                }
                            }.bind(this));
                            this.messageBox.showSuccess('创建模板成功！');
                            this._initHisFlows();
                        }
                        if(result === 1){
                            this.messageBox.showError('创建模板失败！服务错误！');
                        }
                        if(result === 2){
                            this.messageBox.showError('创建失败,模板名称已存在！');
                        }
                    }.bind(this));
                }
            },
            /**
             * 如果选择历史模板，刷新流程模板数据
             * @param item
             * @private
             */
            _showFlowChart: function (item) {
                var content = JSON.parse(item.content);
                this.set('currentFlowId', item.id);
                this.paramView.set('flowModules', content.modules);
                var baseInfo = {};
                baseInfo.owner = content.owner;
                baseInfo.processType = content.subkey;
                baseInfo.name = content.name;
                baseInfo.desc = content.desc;
                this.ioMap = content.IOMap;
                this.modules = content.modules;
                this.workflow = content.workflow;
                this.set('baseInfo', baseInfo);
                var param = {flowid: item.id};
                this.dataAdaptor.getRestfulData(param, 'selectUIData', function (result) {
                    if (result) {
                        var plumbObj = JSON.parse(result.content);
                        this.set('flowUIData', plumbObj);
                        this.set('ioDataArr',plumbObj.ioDataArr === undefined?[]:plumbObj.ioDataArr);
                    }
                }.bind(this));
            },
            actions: {
                /**
                 * 创建流程
                 */
                newFlow: function () {
                    var param = {
                        hisFlows: this.hisFlows,
                        currentFlowId: this.currentFlowId
                    };
                    this._openWindow('创建向导', 'comp-flow-baseinfo', param);
                },
                /**
                 * 保存流程
                 */
                saveFlow: function () {
                    if (!this.baseInfo) {
                        this._openWindow('创建向导', 'comp-flow-baseinfo', this.hisFlows);
                        return;
                    }
                    if (this._checkFlowData) {
                        this._createFlow();
                    }
                },
                /**
                 * 选择框垂直对齐
                 */
                alignFlow: function () {
                    this.flowChartView.alignSelectModules();
                },
                /**
                 * 从工具栏拖拽模块，这个是起始事件，其他事件在jsplumb_figure组件中allowDrop，ondrop
                 * @param item
                 */
                ondragstart: function (item) {
                    event.dataTransfer.setData("module", JSON.stringify(item));
                },
                /**
                 * 当流程中新增一个模块时，同事参数组件会增加这个模块的参数
                 * @param module
                 */
                setParam: function (module) {
                    if (this.paramView) {
                        this.paramView.addModule(module);
                    }
                },
                /**
                 * 双击连线时弹出输入输出信息表
                 * @param param
                 */
                dbClickLine: function (param) {
                    console.log(param);
                    // param.currentFlowId = this.currentFlowId;
                    param.ioDataArr = this.ioDataArr;
                    param.modules = this.paramView.flowModules;
                    this._openWindow('端口连接设置', 'comp-flow-ioinfo', param);
                },
                /**
                 * 删除一个模块
                 * @param data
                 */
                deleteBlock: function (data) {
                    // var ioMapTemp = {};
                    // for(var key in this.ioMapFlag){
                    //     var ioData = this.ioMapFlag[key];
                    //     var isRemove = false;
                    //     ioData.forEach(function(item){
                    //         if(item.input.id === data.flowId || item.output.id === data.flowId ){
                    //             isRemove = true;
                    //         }
                    //     });
                    //     if(!isRemove){
                    //         ioMapTemp[key] = ioData;
                    //     }
                    // }
                    // this.ioMapFlag = ioMapTemp;
                    var module = this.paramView.flowModules.findBy('flow_id', data.flowId);
                    if (module) {
                        this.paramView.flowModules.removeObject(module);
                    }
                },
                /**
                 * 点击历史模块时，刷新数据
                 * @param item
                 */
                showFlowChart: function (item) {
                    this._showFlowChart(item);
                },
                /**
                 * 删除一个历史流程
                 * @param item
                 */
                deleteFlow: function (item) {
                    this.messageBox.showConfirm('删除后不可恢复，确认删除？', function (result) {
                        if (result) {
                            var param = {
                                id: item.id
                            };
                            this.dataAdaptor.getRestfulData(param, 'deleteFlow', function (data) {
                                if (data !== undefined) {
                                    if (data === 0) {
                                        this.messageBox.showSuccess('删除成功！');
                                        var flow = this.hisFlows.findBy('id', param.id);
                                        this.hisFlows.removeObject(flow);
                                    } else if (data === 1) {
                                        this.messageBox.showSuccess('删除失败！');
                                    } else if (data === 2) {
                                        this.messageBox.showSuccess('无法删除，当前流程上存在任务！');
                                    }
                                }
                            }.bind(this));
                        }
                    }.bind(this));
                }

            }
        });
    });