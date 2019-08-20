define(
    [
        'app',
        'common/components/comp_msgbox/comp_msgbox',
        'common/components/comp_table/comp_table',
        '../../helper/common_helper',
        'text!./process_manager_detailsub.html',
        'json!../../common/common_dictionary_data.json',
        '../../common/services/process-data-service',
        'css!./process_manager_detailsub.css',
        '../process_manager_view/process_task_log',
        '../../components/jsplumb_figure/jsplumb_figure'
    ],
    function(app, msgBox, tableModel, helper,  template, commonData, dataService) {
        "use strict";
        app.ProcessManagerDetailsubComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'process-manager-detailsub',
            dataAdaptor: null,
            messageBox: null,
            //当前流程列表选中流程
            curProcess: null,
            //当前选中状态
            curStatus: null,
            //唯一标示tab页
            tabId: '',
            curTabId: '1',
            //流程状态
            statusData: null,
            columnCH: ['内部任务号', '流程ID', '任务名称', '任务类型','任务下发类型', '操作员','开始时间', '结束时间', '卫星号', '传感器号', '状态', '失败原因', '节点名称'],
            columnEN: ['id','taskId','taskName', '', '', '', 'startTime','endTime','satelliteID','sensorID','state','failInfo','nodeName'],
            columnCH1: ['流程ID', '行为', '信息', '创建时间'],
            columnEN1: ['id','id0','id1','id2'],
            flowImgUlr: 'plugin/PSMS/img/flow/flow/',
            statImgUrl: 'plugin/PSMS/img/flow/state/',
            isFDFlow: false,
            chartHeight: 600,

            init: function() {
                this._super();
                this.set('tabId', Ember.ExtendHelper.makeCRC32(new Date().Format("yyyy-MM-dd hh:mm:ss")));
                this.columns = Ember.A();
                this.dataSource = Ember.A();
                this.dataSourceCache = Ember.A();
                this.columns1 = Ember.A();
                this.dataSource1 = Ember.A();
                this.dataSource2 = Ember.A();
                this.statusData = Ember.A();
                this.messageBox = msgBox.create();
                this.dataAdaptor = dataService.create();
                this.tableConfig = tableModel.tableConfigModel.create({
                    height: 330,
                    pagination: true,
                    clickToSelect: true
                });
                this.eventConfig = tableModel.eventConfigModel.create({
                    //dblClickCell: this._handleDbClick.bind(this),
                    clickCell: this._handleClick.bind(this)
                });
                this.tableConfig1 = tableModel.tableConfigModel.create({
                    height: 350,
                    pagination: false,
                    clickToSelect: true
                });
                this.eventConfig1 = tableModel.eventConfigModel.create({
                    clickCell: this._handleClick.bind(this)
                });
                this._initColumns();
                //this._initData();
            },
            didInsertElement: function() {
                this.findNames();
                Ember.run.later(function(){
                    this.set('statusData', commonData.flowStatus.concat());
                    this.statusData.unshift({
                        id: '',
                        name: '请选择'
                    });
                    this.set('curStatus', this.statusData[0].id);
                }.bind(this), 500);
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

            curProcessChange: Ember.observer('curProcess', function(){
               if(this.curProcess){
                   if(this.curProcess.flowType == 'VRSS2_FD'){
                       this.set('isFDFlow', true);
                       this.set('chartHeight', 600);
                   }else if(this.curProcess.flowType == 'VRSS2_CA'){
                       this.set('isFDFlow', false);
                       this.set('chartHeight', 350);
                   }else if(this.curProcess.flowType == 'VRSS2_PRODUCT'){
                       this.set('isFDFlow', false);
                       this.set('chartHeight', 350);
                   }
                   //this.messageBox.showAlert('重新加载');
                   this._initData();
               }else{
                   this.set('dataSource', Ember.A());
                   this.set('dataSource2', Ember.A());
               }
            }),
            curStatusChange: Ember.observer('curStatus', function(){
                if(this.curStatus){
                    this.set('dataSource', this.dataSourceCache.filterBy('state', this.curStatus));
                }else{
                    this.set('dataSource', this.dataSourceCache.concat());
                }
            }),
            onDataSourceChange: Ember.observer('dataSource.length', function(){
                this.childs['tabskInfo'].handleTableDataUpdate(this.dataSource);
            }),
            _initColumns: function(){
                this.columnCH.forEach(function(val, index){
                    if(this.columnEN[index] == 'startTime' || this.columnEN[index] == 'endTime'){
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 200,
                            formatter: function(value, row, index){
                                return helper.timeFormat(value);
                            }.bind(this)
                        }));
                    }else if(this.columnEN[index] == 'id' || this.columnEN[index] == 'taskId' || this.columnEN[index] == 'failInfo'){
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 300
                        }));
                    }else if(this.columnEN[index] == 'state'){
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 80,
                            formatter: function(value, row, index){
                                if(row.state.toLowerCase() == 'failed'){
                                    return '<span style="color: red;">'+ value + '</span>';
                                }else if(row.state.toLowerCase() == 'successed'){
                                    return '<span style="color: green;">'+ value + '</span>';
                                }else if(row.state.toLowerCase() == 'finished'){
                                    return '<span style="color: green;">'+ value +'</span>';
                                }else if(row.state.toLowerCase() == 'paused'){
                                    return '<span style="color: gray;">'+ value +'</span>';
                                }else if(row.state.toLowerCase() == 'running'){
                                    return '<span style="color: green;">'+ value +'</span>';
                                }else if(row.state.toLowerCase() == 'waiting'){
                                    return '<span style="color: gray;">'+ value +'</span>';
                                }else if(row.state.toLowerCase() == 'continue'){
                                    return '<span style="color: green;">'+ value +'</span>';
                                }
                            }.bind(this)
                        }));
                    }else{
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 200
                        }));
                    }
                }.bind(this));
                this.columnCH1.forEach(function(val, index){
                    this.columns1.push(tableModel.columnsModel.create({
                        field: this.columnEN1[index],
                        title: val
                    }));
                }.bind(this));
            },
            _getStateImg: function(status){
                if(status.toLowerCase() == 'failed'){
                    return this.statImgUrl + 'close.png';
                }else if(status.toLowerCase() == 'successed'){
                    return this.statImgUrl + 'wanchen.png';
                }else if(status.toLowerCase() == 'finished'){
                    return this.statImgUrl + 'wanchen.png';
                }else if(status.toLowerCase() == 'paused'){
                    return this.statImgUrl + 'paused.png';
                }else if(status.toLowerCase() == 'running'){
                    return this.statImgUrl + 'yunxin.gif';
                }else if(status.toLowerCase() == 'waiting'){
                    return this.statImgUrl + 'zhunbei.gif';
                }else if(status.toLowerCase() == 'continue'){
                    return this.statImgUrl + 'zhunbei.gif';
                }else if(status.toLowerCase() == 'warning'){
                    return this.statImgUrl + 'cuowu.png';
                }else{
                    return '';
                }
            },
            _getFlowImg: function(taskName){
                if(!taskName){
                    return '';
                }
                if(taskName == 'RawDataPlayback' || taskName == 'RowDataPlayback' || taskName == 'DataPlayback'){
                    return this.flowImgUlr + 'iFactory-icon_rawdataplayback.png';
                }
                if(taskName == 'Decompress' || taskName == 'unZip'){
                    return this.flowImgUlr + 'iFactory-icon_decompress.png';
                }
                var arr = taskName.split('_');
                if(arr[2]){
                    return this.flowImgUlr + 'iFactory-icon_' + arr[2].toLowerCase() + '.png';
                }
            },
            _initData: function() {
                //加载任务信息和流程图
                var timeStamp = Ember.ExtendHelper.makeCRC32(new Date().Format("yyyy-MM-dd hh:mm:ss"));
                this._getTaskInfoByFlow(function(result){
                    this.set('dataSourceCache', result.concat());
                    if(this.curStatus){
                        this.set('dataSource', this.dataSourceCache.filterBy('state', this.curStatus));
                    }else{
                        this.set('dataSource', result.concat());
                    }
                   // this.childs['tabskInfo'].resetView(500);
                    var list = Ember.A();
                    result.forEach(function(item, index){
                        list.push({
                            'name': item.taskName,
                            'id': item.id + '' + timeStamp,
                            'flowImg': this._getFlowImg(item.taskName),
                            'statImg': this._getStateImg(item.state),
                            'isStatus': this._getStateImg(item.state) == '' ? false : true
                        });
                    }.bind(this));
                    if(list && list.length){
                        this.set('dataSource2', [list]);
                    }
                }.bind(this));
                //加载日志信息
                /*this._getFlowLogInfo(function(result){
                    this.set('dataSource1', result.concat());
                    this.childs['flowLog'].resetView(500);
                }.bind(this));*/

            },
            //获取任务信息
            _getTaskInfoByFlow: function(callback){
                var param = {taskId: this.curProcess.taskId};
                if(this.curStatus){
                    param.curStatus = this.curStatus;
                }
                this.dataAdaptor.getRestfulData(param, 'flowTasks', function(result){
                    if(result){
                        //解析流程数据
                        callback(result);
                    }
                }.bind(this));
            },
            //获取日志信息
            _getFlowLogInfo: function(callback){
                var param = {taskId: this.curProcess.taskId};
                this.dataAdaptor.getRestfulData(param, 'taskLogInfo', function(result){
                    if(result){
                        //解析流程数据
                        callback(result);
                    }
                });
            },
            _handleClick: function($e, field, value, row, $element){
                var elements = event.target.parentElement.parentElement.children;
                for(var i = 0;i<elements.length;i++){
                    elements[i].classList.remove('selected');
                };
                event.target.parentElement.classList.add('selected');
            },
            _handleDbClick: function($e, field, value, row, $element){
                //this.messageBox.showAlert('双击');
                var elements = event.target.parentElement.parentElement.children;
                for(var i = 0;i<elements.length;i++){
                    elements[i].classList.remove('selected');
                };
                event.target.parentElement.classList.add('selected');
                helper.openWindow(this, '任务日志', 'process-task-log', {data: row});
            },
            actions: {
                tabCLick: function(index){
                    this.set('curTabId', index);
                    if(index == '1'){
                        this.childs['tabskInfo'].resetView(500);
                    }else if(index == '3'){
                        this.childs['flowLog'].resetView(500);
                    }else{
                        Ember.run.later(function(){
                            this.childs['flowChart'].clearLines();
                            this.childs['flowChart'].createLines();
                        }.bind(this), 1000);
                    }
                },
                statusChange: function(){
                    this.set('curStatus', event.target.value);
                },
                queryProcessInfo: function(){
                    this._initData();
                }
            }
        });
    });