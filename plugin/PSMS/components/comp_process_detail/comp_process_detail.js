define(
    [
        'app',
        'common/components/comp_msgbox/comp_msgbox',
        'common/components/comp_table/comp_table',
        '../../helper/common_helper',
        'text!./comp_process_detail.html',
        'json!../../common/common_dictionary_data.json',
        '../../common/services/process-data-service',
        'css!./comp_process_detail.css',
        './../comp_process_log/comp_process_log',
        '../../components/jsplumb_figure/jsplumb_figure'
    ],
    function (app, msgBox, tableModel, helper, template, commonData, dataService) {
        "use strict";
        app.CompProcessDetailComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-process-detail',
            dataAdaptor: null,
            messageBox: null,
            //当前流程列表选中流程
            curProcess: null,
            //唯一标示tab页
            tabId: '',
            curTabId: '1',
            columnCH: ['内部任务号', '子任务号',  '开始时间', '结束时间',  '状态', '失败原因'],
            columnEN: ['subtaskid', 'subflowtaskid',  'starttime', 'endtime',   'state', 'failinfo'],
            columnCH1: ['流程ID', '行为', '信息', '创建时间'],
            columnEN1: ['id', 'id0', 'id1', 'id2'],
            flowImgUlr: 'plugin/PSMS/img/flow/flow/',
            statImgUrl: 'plugin/PSMS/img/flow/state/',
            chartHeight: 600,
            //是否显示模块信息列表
            showMsg: true,
            showStart:true,
            //模块状态图标
            imgObj: {
                FAILED: 'plugin/PSMS/img/flow/state/cuowu.png',
                SUCCESS: 'plugin/PSMS/img/flow/state/wanchen.png',
                FINISHED: 'plugin/PSMS/img/flow/state/wanchen.png',
                PAUSED: 'plugin/PSMS/img/flow/state/pause.png',
                RUNNING: 'plugin/PSMS/img/flow/state/yunxin.gif',
                WAITING: 'plugin/PSMS/img/flow/state/zhunbei.gif',
            },
            //循环调用对象，组件销毁时必须清理对象
            timer:undefined,
            //循环刷新间隔时间
            refreshTime:10000,
            init: function () {
                this._super();
                this.set('tabId', Ember.ExtendHelper.makeCRC32(new Date().Format("yyyy-MM-dd hh:mm:ss")));
                this.columns = Ember.A();
                this.dataSource = Ember.A();
                this.dataSourceCache = Ember.A();
                this.columns1 = Ember.A();
                this.dataSource2 = Ember.A();
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
                this._initColumns();
                //this._initData();
            },
            didInsertElement: function () {
                this.findNames();
            },
            didUpdate: function () {
            },
            willDestroyElement: function () {
                this._super();
                if (this.intervalObj) {
                    clearInterval(this.intervalObj);
                }
                if (this.messageBox) {
                    this.messageBox = null;
                }
                if (this.dataAdaptor) {
                    this.dataAdaptor.destroy();
                    this.dataAdaptor = null;
                }
                if(this.timer){
                    clearInterval(this.timer);
                }
            },
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
                    } else if (this.columnEN[index] === 'subflowtaskid' || this.columnEN[index] === 'subtaskid' || this.columnEN[index] === 'failinfo') {
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 300
                        }));
                    } else if (this.columnEN[index] === 'state') {
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 80,
                            formatter: function (value, row, index) {
                                if (row.state.toLowerCase() === 'failed') {
                                    return '<span style="color: red;">' + value + '</span>';
                                } else if (row.state.toLowerCase() === 'success') {
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
                    } else {
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 200
                        }));
                    }
                }.bind(this));
                this.columnCH1.forEach(function (val, index) {
                    this.columns1.push(tableModel.columnsModel.create({
                        field: this.columnEN1[index],
                        title: val,
                        width: 200
                    }));
                }.bind(this));
            },
            /**
             * 根据状态获取状态图片
             * @param status
             * @returns {string}
             * @private
             */
            _getStateImg: function (status) {
                if (status.toLowerCase() == 'failed') {
                    return this.statImgUrl + 'close.png';
                } else if (status.toLowerCase() == 'success') {
                    return this.statImgUrl + 'wanchen.png';
                } else if (status.toLowerCase() == 'finished') {
                    return this.statImgUrl + 'wanchen.png';
                } else if (status.toLowerCase() == 'paused') {
                    return this.statImgUrl + 'pause.png';
                } else if (status.toLowerCase() == 'running') {
                    return this.statImgUrl + 'yunxin.gif';
                } else if (status.toLowerCase() == 'waiting') {
                    return this.statImgUrl + 'zhunbei.gif';
                } else if (status.toLowerCase() == 'continue') {
                    return this.statImgUrl + 'zhunbei.gif';
                } else if (status.toLowerCase() == 'warning') {
                    return this.statImgUrl + 'cuowu.png';
                } else {
                    return '';
                }
            },
            /**
             * 获取模块图片
             * @param taskName
             * @returns {string}
             * @private
             */
            _getFlowImg: function (taskName) {
                if (!taskName) {
                    return '';
                }
                if (taskName == 'RawDataPlayback' || taskName == 'RowDataPlayback' || taskName == 'DataPlayback') {
                    return this.flowImgUlr + 'iFactory-icon_rawdataplayback.png';
                }
                if (taskName == 'Decompress' || taskName == 'unZip') {
                    return this.flowImgUlr + 'iFactory-icon_decompress.png';
                }
                var arr = taskName.split('_');
                if (arr[2]) {
                    return this.flowImgUlr + 'iFactory-icon_' + arr[2].toLowerCase() + '.png';
                }
            },
            /**
             * 初始化流程图和任务信息列表
             * @private
             */
            _initData: function () {
                //加载任务信息和流程图
                var timeStamp = Ember.ExtendHelper.makeCRC32(new Date().Format("yyyy-MM-dd hh:mm:ss"));
                this._getTaskInfoByFlow(function (result) {
                    this.set('dataSourceCache', result.concat());
                    if (this.curStatus) {
                        this.set('dataSource', this.dataSourceCache.filterBy('state', this.curStatus));
                    } else {
                        this.set('dataSource', result.concat());
                    }
                    //this.childs['tabskInfo'].resetView(500);
                    var list = Ember.A();
                    result.forEach(function (item, index) {
                        list.push({
                            'name': item.taskName,
                            'id': item.id + '' + timeStamp,
                            'flowImg': this._getFlowImg(item.taskName),
                            'statImg': this._getStateImg(item.state),
                            'isStatus': this._getStateImg(item.state) !== ''
                        });
                    }.bind(this));
                    this.set('dataSource2', [list]);
                }.bind(this));

            },
            /**
             * 获取流程模块的状态信息
             * @private
             */
            _getTaskInfoByFlow: function () {
                this.dataAdaptor.getRestfulData({flowid: this.curProcess.flowid}, 'selectUIData', function (result) {
                    if (result) {
                        //this.set('dataSource', result.concat());
                        var content = JSON.parse(result.content);
                        var lines = content.lines;
                        var blocks = content.blocks;
                        var param = {
                            taskid: this.curProcess.taskid,
                            subtaskid: this.curProcess.subtaskid
                        };
                        var self =  this;
                        if(this.curProcess.subtaskid){
                            this.dataAdaptor.getRestfulData(param, 'taskFlowStatus', function (result) {
                                if (result) {
                                    this.set('dataSource', result.concat());
                                    result.forEach(function (item) {
                                        blocks.forEach(function (item2) {
                                            if (item.subflowtaskid && item2.key) {
                                                    var arr = item.subflowtaskid.split('_');
                                                if (item.subflowtaskid.indexOf(item2.key) != -1&& item.state && item.state !== 'UNKNOWN' ) {
                                                    item2.isStatus = true;
                                                    item2.statImg = self.imgObj[item.state];
                                                }
                                                if(item.subflowtaskid.indexOf(item2.key) != -1 && item.process !== undefined){
                                                    item2.process = item.process;
                                                }
                                            }

                                        });
                                    });
                                    this.set('dataSource2', {
                                        blocks: blocks,
                                        lines: lines
                                    });
                                } else {
                                    console.error("taskFlowStatus ERROR!")
                                }
                            }.bind(this));
                        }else{
                             this.set('dataSource2', {
                                    blocks: blocks,
                                    lines: lines
                                });
                        }
                    } else {
                        console.error("selectUIData ERROR!")
                    }
                }.bind(this));

            },
            /**
             * 刷新流程图
             * @param flowid
             */
            refreshUI:function(flowid){
                this.dataAdaptor.getRestfulData({flowid: flowid}, 'selectUIData', function (result) {
                    if (result) {
                        var content = JSON.parse(result.content);
                        var lines = content.lines;
                        var blocks = content.blocks;
                        this.set('dataSource2', {
                            blocks: blocks,
                            lines: lines
                        });
                    }
                }.bind(this));
            },
            /**
             * 清空流程图
             */
            clearUI:function(){
                this.set('dataSource2', {
                    blocks: [],
                    lines: []
                });
            },
            /**
             * 监听选择的子任务，当子任务变化时，更新流程图和列表信息
             */
            onTaskChange: Ember.observer('curProcess', function () {
                this._getTaskInfoByFlow();
                if(this.timer){
                    clearInterval(this.timer);
                }
                this._setInterval();
            }),
            /**
             * 设置循环刷新流程图
             * @private
             */
            _setInterval:function(){
                this.timer = setInterval(function () {
                    this._getTaskInfoByFlow();
                }.bind(this),this.refreshTime);
            },
            /**
             * 信息列表单击事件
             * @param $e
             * @param field
             * @param value
             * @param row
             * @param $element
             * @private
             */
            _handleClick: function ($e, field, value, row, $element) {
                var elements = event.target.parentElement.parentElement.children;
                for (var i = 0; i < elements.length; i++) {
                    elements[i].classList.remove('selected');
                }
                event.target.parentElement.classList.add('selected');
            },
            /**
             * 信息列表双击事件
             * @param $e
             * @param field
             * @param value
             * @param row
             * @param $element
             * @private
             */
            _handleDbClick: function ($e, field, value, row, $element) {
                //this.messageBox.showAlert('双击');
                var elements = event.target.parentElement.parentElement.children;
                for (var i = 0; i < elements.length; i++) {
                    elements[i].classList.remove('selected');
                }
                event.target.parentElement.classList.add('selected');
                helper.openWindow(this, '任务日志', 'comp_process-log', {data: row});
            },
            /**
             * 回滚任务
             * @param data
             * @private
             */
            _handleRecoverTask: function (data) {
                var moduleItem;
                var hasRunning = false;
                this.dataSource.forEach(function (item) {
                    var arr = item.subflowtaskid.split('_');
                    if(item.subflowtaskid.indexOf(data.key) != -1){
                        moduleItem = item;
                    }
                    if(item.state === 'RUNNING'){
                        hasRunning = true;
                    }
                }.bind(this));
                if(!hasRunning){
                    if(moduleItem){
                        var param = {
                            taskid: moduleItem.taskid,
                            subtaskid:moduleItem.subtaskid,
                            subflowtaskid:moduleItem.subflowtaskid,
                            state:moduleItem.state
                        };
                        if (this.dataAdaptor) {
                            this.dataAdaptor.getRestfulData(param, 'recoverTask', function (result) {
                                if (result) {
                                    this.messageBox.showAlert('已经开始执行回滚！');
                                    this._getTaskInfoByFlow();
                                } else {
                                }
                            }.bind(this));
                        }
                    }else{
                        console.error('未找到匹配的subflow数据！');
                    }
                }else{
                    this.messageBox.showAlert('当前任务存在正在运行的模块，无法回滚！');
                }
            },
            actions: {
                /**
                 * 切换tab页
                 * @param index
                 */
                tabCLick: function (index) {
                    this.set('curTabId', index);
                    if (index === '1') {
                        this.childs['tabskInfo'].resetView(500);
                    }else if (index === '2'){
                        // Ember.run.later(function () {
                        //     this.childs['flowChart'].clearLines();
                        //     this.childs['flowChart'].createLines();
                        // }.bind(this), 1000);
                    }
                },
                /**
                 * 回滚按钮点击事件
                 * @param item
                 */
                startModuleAction:function (item) {
                    this.messageBox.showConfirm('确认开始回滚？', function (result) {
                        if (result) {
                            //执行回滚
                            this._handleRecoverTask(item);
                        }
                    }.bind(this));
                },
                /**
                 * 双击模块，抛出事件，由父级处理，一般用于打开模块参数组件
                 * @param item
                 */
                dbClickAction:function (item) {
                    this.sendAction('dbClickAction',item);
                }
            }
        });
    });