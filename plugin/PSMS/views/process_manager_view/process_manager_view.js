define(
    [
        'app',
        'common/components/comp_msgbox/comp_msgbox',
        'comp_modal',
        'common/components/comp_table/comp_table',
        'text!./process_manager_view.html',
        'json!../../config/properties.json',
        '../../common/services/process-data-service',
        '../../helper/common_helper',
        'common/components/comp_datetimpicker/comp_datetimepicker',
        'css!./process_manager_view.css',
        'css!lib/fontawesome/css/font-awesome.min.css',
        './../../components/comp_process_detail/comp_process_detail'
    ],
    function (app, msgBox,modal, tableModel, template, commonData, dataService, helper) {
        "use strict";
        app.ProcessManagerViewComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'process-manager-view',
            dataAdaptor: null,
            messageBox: null,
            intervalObj: null,
            sliderClass: 'fa fa-angle-double-up',
            //流程状态
            statusData: null,
            statusValue: null,
            isShowDetail: true,
            //当前选中流程
            currentProcess: null,
            currentFlowId: null,
            //true代表流程id，false代表外部订单号
            isProcessID: true,
            columnCH: ['流程ID', '外部订单号', '状态', '开始时间', '结束时间','运行时间'],
            columnEN: ['subtaskid', 'taskid', 'state', 'starttime', 'endtime','usetime'],
            subType: '',
            sourceTask:undefined,
            //单独模块修改参数
            curModule:undefined,
            processDetailView:undefined,
            init: function () {
                this._super();
                this.statusData = Ember.A();
                this.columns = Ember.A();
                this.dataSource = Ember.A();
                this.messageBox = msgBox.create();
                this.dataAdaptor = dataService.create();
                this.tableConfig = tableModel.tableConfigModel.create({
                    height: 460,
                    pagination: true,
                    clickToSelect: true
                });
                this.eventConfig = tableModel.eventConfigModel.create({
                    clickCell: this._handleClick.bind(this)
                    // dblClickCell: this._handleDbClick.bind(this)
                });
                this._initColumns();
                this._initData();
            },
            didInsertElement: function () {
                this.findNames();
                this.processDetailView = this.childs.processDetailView;
                this.set('statusData', commonData.flowStatus.concat());
                this.statusData.unshift({
                    'id': '',
                    'name': 'ALL'
                });
            },
            didUpdate: function () {
            },
            willDestroyElement: function () {
                this._super();
                if (this.messageBox) {
                    this.messageBox = null;
                }
                if (this.dataAdaptor) {
                    this.dataAdaptor.destroy();
                    this.dataAdaptor = null;
                }
            },
            willDestroy:function(){
                if(this.processDetailView){
                    this.processDetailView.destroy();
                }
            },
            // _initInterval: function(){
            //     this.intervalObj = setInterval(function(){
            //         if(this.startTime || this.endTime || this.processId || this.statusValue){
            //             this._handleQueryFlow();
            //         }else{
            //             this._initData();
            //         }
            //     }.bind(this), commonData.interval);
            // },
            /**
             * 初始化表格
             * @private
             */
            _initColumns: function () {
                this.columnCH.forEach(function (val, index) {
                    if (this.columnEN[index] === 'starttime' || this.columnEN[index] === 'endtime') {
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 180,
                            formatter: function (value, row, index) {
                                return helper.timeFormat(value);
                            }.bind(this)
                        }));
                    }else if(this.columnEN[index] === 'usetime'){
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 150,
                            formatter: function(value, row, index){
                                if(row.starttime && row.endtime){
                                    var time =Math.round((row.endtime - row.starttime)/1000);
                                    var s = time%60;
                                    var m = parseInt(time/60)%60;
                                    var h = parseInt(parseInt(time/60)/60);
                                    var timeStr = '';
                                    if(h > 0){
                                        timeStr = h + '小时' + m + '分' + s + '秒'
                                    }else if(m>0){
                                        timeStr =  m + '分' + s + '秒'
                                    }else{
                                        timeStr =  s + '秒'
                                    }
                                    return timeStr;
                                }else{
                                    return '-';
                                }
                            }.bind(this)
                        }));
                    } else if (this.columnEN[index] === 'state') {
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 80,
                            formatter: function (value, row, index) {
                                if (row.state.toLowerCase() === 'failed') {
                                    return '<span style="color: red;">' + value + '</span>';
                                } else if (row.state.toLowerCase() === 'successed') {
                                    return '<span style="color: green;">' + value + '</span>';
                                } else if (row.state.toLowerCase() === 'finished') {
                                    return '<span style="color: green;">' + value + '</span>';
                                } else if (row.state.toLowerCase() === 'paused') {
                                    return '<span style="color: gray;">' + value + '</span>';
                                } else if (row.state.toLowerCase() === 'running') {
                                    return '<span style="color: green;">' + value + '</span>';
                                } else if (row.state.toLowerCase() === 'waiting') {
                                    return '<span style="color: gray;">' + value + '</span>';
                                } else if (row.state.toLowerCase() === 'continue') {
                                    return '<span style="color: green;">' + value + '</span>';
                                }
                            }.bind(this)
                        }));
                    } else if (this.columnEN[index] === 'subtaskid') {
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 200,
                            formatter: function (value, row, index) {
                                return '<span id="manager-' + value + '">' + value + '</span>';
                            }.bind(this)

                        }));
                    } else if (this.columnEN[index] === 'submitType') {
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 80,
                            formatter: function (value, row, index) {
                                return value == 'AUTO' ? '自动' : '手动';
                            }.bind(this)
                        }));
                    } else {
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 180,
                        }));
                    }
                }.bind(this));
                this.columns.push(tableModel.columnsModel.create({
                    field: '',
                    title: '操作',
                    width: 300,
                    formatter: function (value, row, index) {
                        return '<button style="margin-left: 5px;" class="pause btn-warning" >暂停</button><button style="margin-left: 5px;" class="restart btn-success" >恢复</button><button style="margin-left: 5px;" class="dele btn-danger" >删除</button><button style="margin-left: 5px;" class="preview btn-info" >预览</button>';
                    }
                }));
            },
            /**
             * 初始化列表数据
             * @private
             */
            _initData: function () {
                //获取查询流程参数
                if(this.sourceTask !==undefined && this.sourceTask.taskid !=='' && this.sourceTask.taskid !== undefined){
                    if (this.dataAdaptor) {
                        this.dataAdaptor.getRestfulData({taskid: this.sourceTask.taskid}, 'subTask', function (result) {
                            if (result) {
                                if (this.dataSource) {
                                    this.set('dataSource', result);
                                }
                            }
                        }.bind(this));
                    }
                }
            },
            /**
             * 暂停任务
             * @param row
             * @private
             */
            _handlePauseTask: function (row) {
                var param = {
                    taskid: row.taskid,
                    subtaskid:row.subtaskid,
                    url:row.nodename
                };
                if (this.dataAdaptor) {
                    this.dataAdaptor.getRestfulData(param, 'pauseTask', function (result) {
                        if (result) {
                           // this._initFlowData();
                            this.messageBox.showAlert('任务已暂停！');
                            this._refreshDetail();
                        } else {
                            console.error('暂停任务失败!');
                        }
                    }.bind(this));
                }
            },
            /**
             * 继续任务
             * @param row
             * @private
             */
            _handleContinueTask: function (row) {
                var param = {
                    taskid: row.taskid,
                    subtaskid:row.subtaskid,
                    url:row.nodename
                };
                if (this.dataAdaptor) {
                    this.dataAdaptor.getRestfulData(param, 'continueTask', function (result) {
                        if (result) {
                          //  this._initFlowData();
                            this.messageBox.showAlert('任务已恢复！');
                            this._refreshDetail();
                        } else {
                            console.error('恢复任务失败!');
                        }
                    }.bind(this));
                }
            },
            // _handleStopTask: function (row) {
            //     var param = {
            //         taskId: row.taskId
            //     };
            //     if (this.dataAdaptor) {
            //         this.dataAdaptor.getRestfulData(param, 'stopTask', function (result) {
            //             if (result) {
            //                 this._initFlowData();
            //             } else {
            //                 console.error('停止任务失败!');
            //             }
            //         }.bind(this));
            //     }
            // },
            /**
             *  删除任务
             * @param row
             * @private
             */
            _handleDelTask: function (row) {
               var param = {
                    taskid: row.taskid,
                    subtaskid:row.subtaskid
                };
                if (this.dataAdaptor) {
                    this.dataAdaptor.getRestfulData(param, 'deleteSubTaskInfo', function (result) {
                        if (result) {
                            this.messageBox.showSuccess('删除成功！');
                            this._initData();
                        } else {
                            this.messageBox.showSuccess('删除失败！后台错误！');
                        }
                    }.bind(this));
                }
            },
            /**
             * 刷新processDetailView组件状态
             * @private
             */
            _refreshDetail:function(){
                this.processDetailView._getTaskInfoByFlow();
            },
            _handleClick: function ($e, field, value, row, $element) {
                var elements = event.target.parentElement.parentElement.children;
                for (var i = 0; i < elements.length; i++) {
                    elements[i].classList.remove('selected');
                };
                event.target.parentElement.classList.add('selected');
                this.set('currentProcess', row);
                this.set('currentFlowId', 'manager-' + row.taskId);
                var _event = event;
                var param = {
                    taskid: this.currentProcess.taskid,
                    subtaskid: this.currentProcess.subtaskid
                };
                this.dataAdaptor.getRestfulData(param, 'taskFlowStatus', function (result) {
                    if (result) {
                        if (_event.target.className.indexOf('pause')>-1) {
                            this.messageBox.showConfirm('是否暂停当前任务？',function (data) {
                                if(data){
                                    //暂停
                                    if(result[result.length - 1].state === 'RUNNING'){
                                        this.messageBox.showAlert('已执行到最后模块，无法暂停！');
                                        return;
                                    }
                                    var hasRunning = false;
                                    var hasPause = false;
                                    result.forEach(function (item) {
                                        if(item.state === 'RUNNING'){
                                            hasRunning = true;
                                        }
                                        if(item.state === 'PAUSED'){
                                            hasPause = true;
                                        }
                                    });
                                    if(hasRunning && !hasPause){
                                        this._handlePauseTask(row);
                                    }else{
                                        if(!hasRunning){
                                            this.messageBox.showAlert('没有正在执行的模块，无法暂停！');
                                        }
                                        if(hasPause){
                                            this.messageBox.showAlert('当前任务已处于暂停状态！');
                                        }
                                    }
                                }
                            }.bind(this));
                        } else if (_event.target.className.indexOf('restart')>-1) {
                            this.messageBox.showConfirm('是否恢复当前任务？',function (data) {
                                var hasPause = false;
                                var hasRunning = false;
                                result.forEach(function (item) {
                                    if(item.state === 'PAUSED'){
                                        hasPause = true;
                                    }
                                    if(item.state === 'RUNNING'){
                                        hasRunning = true;
                                    }
                                });
                                //恢复
                                if(hasRunning){
                                    this.messageBox.showAlert('当前任务存在正在运行的模块，请等待执行完毕后再恢复任务！');
                                }else{
                                    if(hasPause){
                                        this._handleContinueTask(row);
                                    }
                                }
                            }.bind(this));
                        } else if (_event.target.className.indexOf('dele')>-1) {
                            this.messageBox.showConfirm('确认删除？',function (data) {
                                // if(data){
                                //     var hasRunning = false;
                                //     result.forEach(function (item) {
                                //         if(item.state === 'RUNNING'){
                                //             hasRunning = true;
                                //         }
                                //     });
                                //     //删除
                                //     if(!hasRunning){
                                //         this._handleDelTask(row);
                                //     }else{
                                //         this.messageBox.showAlert('存在正在运行的模块，无法删除！');
                                //     }
                                // }
                                if(row.state === 'RUNNING'){
                                    this.messageBox.showAlert('存在正在运行的模块，无法删除！');
                                }else{
                                    this._handleDelTask(row);
                                }
                            }.bind(this));
                        }
                    } else {
                        console.error("taskFlowStatus ERROR!")
                    }
                }.bind(this));
                if(event.target.className.indexOf( 'preview')>-1){
                    //预览
                    this.sendAction('previewAction',this.currentProcess);
                }
            },
            /**
             * 更新模块参数
             * @private
             */
            _updateModuleParam:function(){
                var content = JSON.parse(this.currentProcess.content);
                content.modules.forEach(function(item){
                    if(item.flow_id === this.curModule.flow_id){
                        item.Systemproperty = this.curModule.Systemproperty;
                        item.Userproperty = this.curModule.Userproperty;
                    }
                }.bind(this));
                var param = {
                    taskId: this.currentProcess.taskid,
                    subtaskid: this.currentProcess.subtaskid,
                    content:JSON.stringify(content)
                };
                this.currentProcess.content = JSON.stringify(content);
                if (this.dataAdaptor) {
                    this.dataAdaptor.getRestfulData(param, 'updateSubTask', function (result) {
                        if (result) {
                            this.messageBox.showSuccess('修改参数成功！');
                        } else {
                            this.messageBox.showError('修改参数失败！');
                        }
                    }.bind(this));
                }
            },
            _openWindow: function(title, componentName, data){
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
                    confirm: function(){
                        _self._updateModuleParam();
                        //console.log(_self.curModule);
                    },
                    close: function() { //获取传递参数
                        //_self._initTaskData();
                    }
                });
            },
            actions: {
                /**
                 * 上下切换显示流程图
                 */
                sliderClick: function () {
                    if (event.target.className.indexOf('down') !== -1) {
                        this.set('sliderClass', 'fa fa-angle-double-up');
                        var config = tableModel.tableConfigModel.create({
                            height: 470,
                            pagination: true,
                            clickToSelect: true
                        });
                        this.set('tableConfig', config);
                        this.childs['processTable'].resetView(1000);
                        //this.set('isShowDetail', false);
                    } else {
                        this.set('sliderClass', 'fa fa-angle-double-down');
                        var config1 = tableModel.tableConfigModel.create({
                            height: 170,
                            pagination: true,
                            clickToSelect: true
                        });
                        this.set('tableConfig', config1);
                        this.childs['processTable'].resetView(1000);
                       // this.set('isShowDetail', true);
                    }
                },

                // queryProcess: function () {
                //     this._handleQueryFlow();
                // },
                // refreshData: function () {
                //     this._handleQueryFlow();
                // },
                startModuleAction:function (item) {
                },
                dbClickAction:function (item) {
                    var modules = JSON.parse(this.currentProcess.content).modules;
                    this.curModule = modules.findBy('flow_id',item.flowId);
                    if(this.curModule){
                        this._openWindow('参数修改','comp-flow-param',{modules:[this.curModule],showBtn:true});
                    }
                },
                /**
                 * 根据状态查询任务
                 * @param type
                 */
                searchTask:function (type) {
                    var param = {
                        taskid:this.sourceTask.taskid,
                    };
                    if(type !== 'ALL'){
                        param.state = type;
                    }
                    if (this.dataAdaptor) {
                        this.dataAdaptor.getRestfulData(param, 'subTask', function (result) {
                            if (result) {
                                if (this.dataSource) {
                                    this.set('dataSource', result);
                                }
                            }
                        }.bind(this));
                    }
                }
            }
        });
    });