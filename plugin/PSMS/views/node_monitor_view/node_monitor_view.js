define(
    [
        'app',
        'common/components/comp_msgbox/comp_msgbox',
        'common/components/comp_table/comp_table',
        '../../helper/common_helper',
        'text!./node_monitor_view.html',
        'json!../../common/common_dictionary_data.json',
        '../../common/services/process-data-service',
        'json!./data.json',
        '../../components/comp_echart_graph/comp_echart_graph',
        'css!./node_monitor_view.css',
        'css!lib/fontawesome/css/font-awesome.min.css'
    ],
    function (app, msgBox, tableModel, helper, template, commonData, dataService,testData) {
        "use strict";
        app.NodeMonitorViewComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'node-monitor-view',
            dataAdaptor: null,
            messageBox: null,
            //当前状态轮询间隔时间
            calcTime:30000,
            //当前第几次查询
            queryCount:1,
            nodeList:undefined,
            dataNum:20,
            //当前选择的节点ip
            nodeIp:undefined,
            init: function () {
                this._super();
                this.messageBox = msgBox.create();
                this.dataAdaptor = dataService.create();
            },
            didInsertElement: function () {
                this.findNames();
             //   this._initChart();
             //   this.set('nodeList',testData);
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
                if(this.timer){
                    clearInterval(this.timer);
                }
            },
            _initData: function () {
                var self = this;
                //获取节点信息
                //self.set('nodeList',testData);
                this.dataAdaptor.getRestfulData({}, 'nodeStatus', function (result) {
                    if (result) {
                        self.set('nodeList',result);
                        //解析数据
                        // result.forEach(function(item,index){
                        //     item.cpu = '';
                        //     item.memory = '';
                        //     item.disk = '';
                        //     self.dataAdaptor.getRestfulData({hostip:item.nodeip,dataNum:1}, 'nodePerformance', function (result) {
                        //         if(result){
                        //             if(result.cpu){
                        //                 item.cpu = result.cpu+'%';
                        //             }
                        //             if(result.memory){
                        //                 item.memory = result.memory+'%';
                        //             }
                        //             if(result.disk){
                        //                 item.disk = result.disk+'%';
                        //             }
                        //         }
                        //     });
                        // });

                    }
                });
            },
            _initGraph: function () {
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
            actions: {

            }
        });
    });