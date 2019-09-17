define(
    [
        'app',
        'text!./process_task_manager_view.html',
        'app_info',
        'json!./data.json',
        'common/components/comp_msgbox/comp_msgbox',
        '../../common/services/process-data-service',
        'common/components/comp_table/comp_table',
        '../../helper/common_helper',
        'comp_modal',
        'json!./../../config/properties.json',
        'css!./process_task_manager_view.css',
        './../../components/comp_process_detail/comp_process_detail',
        './../../components/comp_create_task/comp_create_task',
        './../process_task_preview/process_task_preview',
        './../process_manager_view/process_manager_view',
    ],
    function (app, template, app_info, testData, msgBox, dataService, tableModel, helper, modal, proConfig) {
        "use strict";
        app.ProcessTaskManagerViewComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            classNames: ['process-task-manager-view-size'],
            templateName: 'process-task-manager-view',
            processType: "",
            flowType: "",
            currentProcess: undefined,
            selectTask: undefined,
            columnCH: ['任务名称', '创建时间', '结束时间', '运行时间', '输出影像目录', '优先级', '运行状态', '任务进度'],
            columnEN: ['taskname', 'startdate', 'enddate', 'usetime', 'projfolder', 'rpi', 'state', 'process'],
            sliderClass: 'fa fa-angle-double-up',
            showHome: true,
            showProcessManage: false,
            showPriview: false,
            //如果flowData有初始化，则是从流程界面进来，放开新建任务
            flowData: undefined,
            init: function () {
                this._super();
                this.messageBox = msgBox.create();
                this.dataAdaptor = dataService.create();
                this._initColumns();
            },
            _initColumns: function () {
                this.columns = Ember.A();
                this.tableConfig = tableModel.tableConfigModel.create({
                    height: 460,
                    pagination: true,
                    clickToSelect: true
                });
                this.eventConfig = tableModel.eventConfigModel.create({
                    clickCell: this._handleClick.bind(this),
                    dblClickCell: this._handleDbClick.bind(this)
                });
                this.columnCH.forEach(function (val, index) {
                    if (this.columnEN[index] === 'startdate') {
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 150,
                            formatter: function (value, row, index) {
                                return helper.timeFormat(value);
                            }.bind(this)
                        }));
                    } else if (this.columnEN[index] === 'enddate') {
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 150,
                            formatter: function (value, row, index) {
                                return helper.timeFormat(value);
                            }.bind(this)
                        }));
                    } else if (this.columnEN[index] === 'usetime') {
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 150,
                            formatter: function (value, row, index) {
                                if (row.startdate && row.enddate) {
                                    var time = Math.round((row.enddate - row.startdate) / 1000);
                                    var s = time % 60;
                                    var m = parseInt(time / 60) % 60;
                                    var h = parseInt(parseInt(time / 60) / 60);
                                    var timeStr = '';
                                    if (h > 0) {
                                        timeStr = h + '小时' + m + '分' + s + '秒'
                                    } else if (m > 0) {
                                        timeStr = m + '分' + s + '秒'
                                    } else {
                                        timeStr = s + '秒'
                                    }
                                    return timeStr;
                                } else {
                                    return '-';
                                }
                            }.bind(this)
                        }));
                    } else if (this.columnEN[index] === 'state') {
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 150,
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
                    } else if (this.columnEN[index] == 'process') {
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 280,
                            formatter: function (value, row, index) {
                                var processNum = 0;
                                if (row.taskRate !== undefined) {
                                    processNum = parseInt(row.taskRate);
                                }
                                if (processNum > 100) {
                                    processNum = 100;
                                }
                                return '<div class="progress"><div class="progress-bar progress-color" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style=" min-width: 2em;width: ' + processNum + '%;">' + processNum + '%</div></div>';
                            }.bind(this)
                        }));
                    } else {
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 160,
                        }));
                    }
                }.bind(this));
                this.columns.push(tableModel.columnsModel.create({
                    field: '',
                    title: '操作',
                    formatter: function (value, row, index) {
                        //return '<button style="margin-left: 5px;" class="stop btn-warning" >停止</button><button style="margin-left: 5px;" class="del btn-danger" >删除</button>';
                        return '<button style="margin-left: 5px;" class="del btn-danger" >删除</button>';
                    }
                }));
            },
            didInsertElement: function () {
                this.findNames();
                //this.set('taskData',testData);
                this._initTaskData();
                this._initFlowData();
            },
            /**
             * 初始化模板数据
             * @private
             */
            _initFlowData: function () {
                //目前模板不区分用户
                var param = {};
                param.username = app_info.userInfo2.userName;
                param.userid = app_info.userInfo2.userId;
                if (this.dataAdaptor) {
                    this.dataAdaptor.getRestfulData({}, 'selectFlows', function (result) {
                        if (result) {
                            this.set('flows', result);
                            //this.set('flowData',result[0]);
                        }
                    }.bind(this));
                }
            },
            /**
             * 初始化任务数据
             * @private
             */
            _initTaskData: function () {
                var param = {};
                if (app_info.userInfo2.role !== '1') {
                    param = {
                        username: app_info.userInfo2.userName,
                        userid: app_info.userInfo2.userId,
                    };
                }
                if (this.flowData) {
                    this.set('processType', proConfig.processType.findBy('id', this.flowData.subkey).name);
                    this.set('flowType', this.flowData.flowname);
                    param.flowid = this.flowData.id;
                }
                this.dataAdaptor.getRestfulData(param, 'task', function (result) {
                    if (result) {
                        this.set('taskData', result);
                    } else {
                    }
                }.bind(this));
            },
            didUpdate: function () {
            },

            willDestroyElement: function () {
            },
            /**
             * 双击后下钻到子任务界面
             * @param $e
             * @param field
             * @param value
             * @param row
             * @param $element
             * @private
             */
            _handleDbClick: function ($e, field, value, row, $element) {
                //this.set('selectTaskId',row.taskid);
                //this.set('selectTask',row);
                this.set('showProcessManage', true);
                this.set('showHome', false);
                this.set('showPriview', false);
            },
            _handleStopTask: function () {

            },
            /**
             * 删除任务，正在运行的任务无法删除
             * @param row
             * @private
             */
            _handleDelTask: function (row) {
                var param = {
                    taskid: row.taskid
                };
                if (this.dataAdaptor) {
                    this.dataAdaptor.getRestfulData(param, 'deleteTask', function (result) {
                        if (result) {
                            this.messageBox.showSuccess('删除成功！');
                            this._initTaskData();
                        } else {
                            this.messageBox.showSuccess('删除失败！后台错误！');
                        }
                    }.bind(this));
                }
            },
            _handleClick: function ($e, field, value, row, $element) {
                if (event.target.className.indexOf('del') !== -1) {
                    //删除
                    this.messageBox.showConfirm('确认删除？', function (data) {
                        if (data) {
                            if (row.state !== 'RUNNING') {
                                this._handleDelTask(row);
                            } else {
                                this.messageBox.showAlert('任务正在运行，无法删除！');
                            }
                        }
                    }.bind(this));
                } else if (event.target.className.indexOf('stop') !== -1) {
                    //停止
                    this._handleStopTask(row);
                } else {
                    var elements = event.target.parentElement.parentElement.children;
                    for (var i = 0; i < elements.length; i++) {
                        elements[i].classList.remove('selected');
                    }
                    ;
                    event.target.parentElement.classList.add('selected');
                    this.set('currentProcess', row);
                }
            },
            /**
             *  显示预览
             * @param row
             * @private
             */
            _showPreview: function (row) {
                this.set('selectTask', row);
                this.set('showProcessManage', false);
                this.set('showHome', false);
                this.set('showPriview', true);
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
                        _self._initTaskData();
                    },
                    close: function () { //获取传递参数
                        _self._initTaskData();
                    }
                });
            },
            actions: {
                /**
                 * 上下切换显示流程图
                 */
                sliderClick: function () {
                    if (event.target.className.indexOf('up') !== -1) {
                        this.set('sliderClass', 'fa fa-angle-double-down');
                        var config = tableModel.tableConfigModel.create({
                            height: 170,
                            pagination: true,
                            clickToSelect: true
                        });
                        this.set('tableConfig', config);
                        this.childs['taskTable'].resetView(1000);
                    } else {
                        this.set('sliderClass', 'fa fa-angle-double-up');
                        var config1 = tableModel.tableConfigModel.create({
                            height: 470,
                            pagination: true,
                            clickToSelect: true
                        });
                        this.set('tableConfig', config1);
                        this.childs['processTable'].resetView(1000);
                    }
                },
                /**
                 * 创建任务
                 */
                createTask: function () {
                    this._openWindow('创建任务', 'comp-create-task', this.flowData);
                },
                /**
                 * 显示预览
                 * @param selectRow
                 */
                showPreview: function (selectRow) {
                    this._showPreview(selectRow);
                },
                /**
                 * 返回上一级
                 */
                goBack: function () {
                    if (this.showPriview) {
                        this.set('showProcessManage', true);
                        this.set('showHome', false);
                        this.set('showPriview', false);
                    } else if (this.showProcessManage) {
                        this.set('showProcessManage', false);
                        this.set('showHome', true);
                        this.set('showPriview', false);
                        this._initColumns();
                        this._initTaskData();
                    }
                },
                /**
                 * 模板选择事件
                 */
                flowSelectChange: function () {
                    if (event.target.value === '-1') {
                        Ember.set(this, 'flowData', undefined);
                        this.childs.detailView.clearUI();
                    } else {
                        var flowData = this.flows.findBy('id', event.target.value);
                        Ember.set(this, 'flowData', flowData);
                        this.set('processType', proConfig.processType.findBy('id', this.flowData.subkey).name);
                        this.set('flowType', this.flowData.flowname);
                        this.findNames();
                        this.childs.detailView.refreshUI(flowData.id);
                    }
                    this._initTaskData();
                },
            }
        });
    });