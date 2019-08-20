define(
    [
        'app',
        'comp_modal',
        'common/components/comp_msgbox/comp_msgbox',
        'common/components/comp_table/comp_table',
        '../../helper/common_helper',
        'text!./cluster_status_performs.html',
        'json!../../common/common_dictionary_data.json',
        '../../common/services/process-data-service',
        '../../components/comp_echart_arealine/comp_echart_arealine',
        '../../components/comp_echart_line/comp_echart_line',
        '../../components/comp_echart_pie/comp_echart_pie',
        'css!./cluster_status_performs.css',
        'css!lib/fontawesome/css/font-awesome.min.css',
        './comp_cluster_nodeinfo/comp_cluster_nodeinfo'
    ],
    function (app,modal, msgBox, tableModel, helper, template, commonData, dataService) {
        "use strict";
        app.ClusterStatusPerformsComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'cluster-status-performs',
            dataAdaptor: null,
            messageBox: null,
            columnCH: ['节点ID', '节点名称', '节点IP','节点端口', '节点类型',  '状态','已运行能力', '节点总处理能力',  '描述'],
            columnEN: ['nodeid', 'nodename', 'nodeip','nodeport', 'nodetype', 'nodestatus','nodeused', 'nodetotalused', 'nodedesc'],
            headerName: '当前集群CPU、硬盘、内存利用率',
            timeGranularity: null,
            timeValue: null,
            nodeNum: 4,
            totalCPUNum: 12,
            totalHandleNum: 34,
            canHandleNum: 34,
            //默认展示当前状态
            showCurrent: true,
            //当前状态轮询间隔时间
            calcTime:30000,
            //当前第几次查询
            queryCount:1,
            cpuData:undefined,
            memoryData:undefined,
            diskData:undefined,
            dataNum:20,
            //当前选择的节点ip
            nodeIp:undefined,
            init: function () {
                this._super();
                this.columns = Ember.A();
                this.dataSource = Ember.A();
                this.timeGranularity = Ember.A();
                this.messageBox = msgBox.create();
                this.dataAdaptor = dataService.create();
                this.tableConfig = tableModel.tableConfigModel.create({
                    height: 350,
                    pagination: true,
                    clickToSelect: true
                });
                this.eventConfig = tableModel.eventConfigModel.create({
                    clickCell: this._handleClick.bind(this)
                  //  dblClickCell: this._dbHandleClick.bind(this)
                });
                //this._initInterval();
                   this._initColumns();
            },
            didInsertElement: function () {
                this.findNames();
                this._initData();
            },
            didUpdate: function () {
            },

            willDestroyElement: function () {
                this._super();
                if (this.messageBox) {
                    this.messageBox = null;
                }
                if (this.dataAdaptor) {
                    this.dataAdaptor = null;
                }
                if(this.intervalObj){
                    clearInterval(this.intervalObj);
                }
            },
            /**
             * 设置轮询
             * @private
             */
            _initInterval: function () {
                if(this.intervalObj){
                    clearInterval(this.intervalObj);
                }
                this.intervalObj = setInterval(function () {
                    this._initData();
                }.bind(this), commonData.interval);
            },
            /**
             * 初始化表格
             * @private
             */
            _initColumns: function () {
                this.columns.unshift(tableModel.columnsModel.create({
                    field: '',
                    title: '操作',
                    formatter: function(value, row, index){
                        return '<button style="margin-left: 5px;" class="cluster-button trash fa fa-trash btn-danger">删除</button>';
                        // return '<button style="margin-left: 5px;" class="cluster-button trash fa fa-trash btn-danger">删除</button>' +
                        //     '<button style="margin-left: 5px;" class="cluster-button  edit fa fa-pencil-square-o btn-success">修改</button>';
                    }
                }));
                this.columnCH.forEach(function (val, index) {
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val
                        }));
                }.bind(this));
            },
            /**
             * 查询节点信息，生成列表，之后调用echart图初始化方法
             * @private
             */
            _initClusterData: function () {
                    var self = this;
                //获取节点信息
                this.dataAdaptor.getRestfulData({}, 'nodeList', function (result) {
                    if (result) {
                        //解析数据
                        self.set('dataSource', result);
                        //默认选择列表第一条作为当前对象
                        self.nodeip = result[0].nodeip;
                        //初始化echart图
                        self._initChart();
                    }
                });
            },
            /**
             * 初始化组件数据，整体初始化入口方法
             * @private
             */
            _initData: function () {
                this.set('timeGranularity', commonData.timeGranularity);
                this.set('timeValue', this.timeGranularity[0].id);
                this._initClusterData();
            },
            /**
             * 双击查看日志，目前不用
             * @param $e
             * @param field
             * @param value
             * @param row
             * @param $element
             * @private
             */
            _dbHandleClick: function ($e, field, value, row, $element) {
                var elements = event.target.parentElement.parentElement.children;
                for (var i = 0; i < elements.length; i++) {
                    elements[i].classList.remove('selected');
                }
                event.target.parentElement.classList.add('selected');
                helper.openWindow(this, '任务日志', 'process-task-log', {data: row});
            },
            /**
             * 列表单击事件
             * @param $e
             * @param field
             * @param value
             * @param row
             * @param $element
             * @private
             */
            _handleClick: function ($e, field, value, row, $element) {
                if(event.target.className.indexOf('trash') !==-1){
                    //删除
                    this.messageBox.showConfirm(
                       '确认删除？删除后不可恢复！',
                        function(result) {
                            if(result) {
                                this._handleTrashNode(row);
                            }
                        }.bind(this)
                    );
                }else if(event.target.className.indexOf('edit') !== -1){
                    //修改信息、
                    this._handleEditNode(row);
                }else{
                    var elements = event.target.parentElement.parentElement.children;
                    for(var i = 0;i<elements.length;i++){
                        elements[i].classList.remove('selected');
                    }
                    event.target.parentElement.classList.add('selected');
                }
                this.nodeip = row.nodeip;
                this._initChart();
            },
            /**
             * 删除节点事件
             * @param row
             * @private
             */
            _handleTrashNode: function(row){
                var param = {
                    nodeid: row.nodeid,
                    nodeip:row.nodeip
                };
                if(this.dataAdaptor){
                    this.dataAdaptor.getRestfulData(param, 'deleteNode',  function(result){
                        if(result){
                            this.messageBox.showAlert('删除节点成功！');
                            this._initData();
                        }else{
                            this.messageBox.showError('删除节点失败！');
                        }
                    }.bind(this));
                }
            },
            /**
             * 修改节点信息事件
             * @param row
             * @private
             */
            _handleEditNode: function(row){
                this._openWindow('修改节点信息', 'comp-cluster-nodeinfo', {data: row});
            },
            /**
             * 修改节点方法
             * @param row
             * @private
             */
            _updateNodeInfo: function(row){
                if(this.dataAdaptor){
                    this.dataAdaptor.getRestfulData(row, 'updateNode',  function(result){
                        if(result){
                            this.messageBox.showAlert('修改节点成功！');
                            this._initData();
                        }else{
                            this.messageBox.showError('修改节点失败！');
                        }
                    }.bind(this));
                }
            },
            /**
             * 新建节点
             * @param row
             * @private
             */
            _insertNodeInfo: function(row){
                if(this.dataAdaptor){
                    this.dataAdaptor.getRestfulData(row, 'createNode',  function(result){
                        if(result){
                            this.messageBox.showAlert('添加节点成功！');
                            this._initData();
                        }else{
                            this.messageBox.showError('添加节点失败！');
                        }
                    }.bind(this));
                }
            },
            /**
             * 设置echart图的数据
             * @param type
             * @param time
             * @private
             */
            _setChartData:function(type,time){
                var self = this;
                var url = '';
                //chart图数据
                if(this.dataAdaptor === null ){
                    this.dataAdaptor = dataService.create();
                }
                this.dataAdaptor.getRestfulData({hostip:self.nodeip,dataNum:this.dataNum}, 'nodePerformance', function (result) {
                    if (result) {
                        var chartData = result;
                       // var chartData = testData;
                        if(chartData.cpu){
                            self.cpuData = [
                                {
                                    title: 'CPU使用率',
                                    data: chartData.cpu
                                }
                            ];
                            if (self.showCurrent) {
                                self.set('cpu', self.cpuData);
                            }else{
                                self.set('cpuCalc', self.cpuData);
                            }
                        }
                        if(chartData.memory){
                            self.memoryData = [
                                {
                                    title: '内存使用率',
                                    data: chartData.memory
                                }
                            ];
                            if (self.showCurrent) {
                                self.set('memory', self.memoryData);
                            }else{
                                self.set('memoryCalc', self.memoryData);
                            }
                        }
                        if(chartData.disk){
                            self.diskData = [
                                {
                                    title: '硬盘使用率',
                                    data: chartData.disk
                                }
                            ];
                            self.set('disk', self.diskData);
                        }
                        self.queryCount++;
                    }else{
                        if (self.timer) {
                            clearInterval(self.timer);
                        }
                    }
                });
            },
            /**
             * 初始化echart
             * @private
             */
            _initChart: function () {
                var self = this;
                self.queryCount = 1;
                self._setChartData();
                if (self.timer) {
                    clearInterval(self.timer);
                }
                self.timer = setInterval(function(){
                    self._setChartData();
                    self.findNames();
                    if(self.showCurrent){
                        self.memoryChart = self.childs.memoryChart;
                        self.cpuChart = self.childs.cpuChart;
                        self.diskChart = self.childs.diskChart;
                        if(self.memoryChart){
                            self.memoryChart.set('abserver',{name:self.queryCount});
                        }
                        if(self.cpuChart){
                            self.cpuChart.set('abserver',{name:self.queryCount});
                        }
                        if(self.diskChart){
                            self.diskChart.set('abserver',{name:self.queryCount});
                        }
                    }else{
                        self.memoryCalcChart = self.childs.memoryCalcChart;
                        self.cpuCalcChart = self.childs.cpuCalcChart;
                        if(self.memoryCalcChart){
                            self.memoryCalcChart.set('abserver',{name:self.queryCount});
                        }
                        if(self.cpuCalcChart){
                            self.cpuCalcChart.set('abserver',{name:self.queryCount});
                        }
                    }
                },self.calcTime);
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
                        if(this.parameters.isEdit){
                            _self._updateNodeInfo(this.parameters.data);
                        }else{
                            _self._insertNodeInfo(this.parameters.data);
                        }
                    },
                    close: function() { //获取传递参数

                    }
                });
            },
            actions: {
                /**
                 * 时间粒度下拉框选择事件
                 */
                timeChange: function () {
                    this.set('timeValue', event.target.value);
                    if (this.timeValue === '1') {
                        this.set('headerName', '当前集群CPU、硬盘、内存利用率');
                        this.set('showCurrent', true);
                        this.dataNum = 20;
                    } else if (this.timeValue === '2') {
                        this.set('headerName', '1小时内的CPU、内存使用率');
                        this.set('showCurrent', false);
                         this.dataNum = 120;
                    } else if (this.timeValue === '3') {
                        this.set('headerName', '5小时内的CPU、内存使用率');
                        this.set('showCurrent', false);
                         this.dataNum = 600;
                    } else if (this.timeValue === '4') {
                        this.set('headerName', '10小时内的CPU、内存使用率');
                        this.set('showCurrent', false);
                         this.dataNum = 1200;
                    } else if (this.timeValue === '5') {
                        this.set('headerName', '24小时内的CPU、内存使用率');
                        this.set('showCurrent', false);
                         this.dataNum = 2880;
                    }
                    this._initChart();
                },
                /**
                 * 添加节点事件
                 */
                addNode: function(){
                    this._openWindow('添加节点', 'comp-cluster-nodeinfo', {data: null});
                }

            }
        });
    });