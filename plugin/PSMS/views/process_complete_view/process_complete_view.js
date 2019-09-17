define(
    [
        'app',
        'common/components/comp_msgbox/comp_msgbox',
        'common/components/comp_table/comp_table',
        'text!./process_complete_view.html',
        'json!../../common/common_dictionary_data.json',
        '../../common/services/process-data-service',
        '../../helper/common_helper',
        'css!./process_complete_view.css',
        'css!lib/fontawesome/css/font-awesome.min.css',
        './process_manager_detailsub'
    ],
    function(app, msgBox, tableModel, template, commonData, dataService, helper) {
        "use strict";
        app.ProcessCompleteViewComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'process-complete-view',
            dataAdaptor: null,
            messageBox: null,
            //当前选中流程
            currentProcess: null,
            currentFlowId: null,
            //流程ID
            processId: null,
            isProcessID: true,
            statusValue: null,
            isShowDetail: true,
            sliderClass: 'fa fa-angle-double-down',
            columnCH: ['流程ID', '外部订单号', '订单类型', '状态', '操作员', '任务下发类型', '开始时间', '结束时间', '优先级', '任务数量'],
            columnEN: ['taskId','orderId','flowType','state','userName', 'submitType','startDate','endDate','',''],
            headerName: '',

            init: function() {
                this._super();
                this.columns = Ember.A();
                this.tableId = 'detailTable' + Ember.ExtendHelper.makeCRC32(new Date().Format("yyyy-MM-dd hh:mm:ss"));
                this.dataSource = Ember.A();
                this.messageBox = msgBox.create();
                this.dataAdaptor = dataService.create();
                this.tableConfig = tableModel.tableConfigModel.create({
                    height: 350,
                    pagination: true,
                    clickToSelect: true
                });
                this.eventConfig = tableModel.eventConfigModel.create({
                    clickCell: this._handleClick.bind(this)
                });
                if(this.parameters && this.parameters.windType){
                    if(this.parameters.windType == '1'){
                        this.set('headerName', '等待中流程');
                    }else if(this.parameters.windType == '2'){
                        this.set('headerName', '运行中流程');
                    }else if(this.parameters.windType == '3'){
                        this.set('headerName', '已完成流程');
                        this.set('columnCH', ['流程ID', '外部订单号', '订单类型', '状态', '操作员', '任务下发类型', '开始时间', '结束时间', '任务数量']);
                        this.set('columnEN', ['taskId','orderId','flowType','state','userName', 'submitType','startDate','endDate','']);
                    }
                }
                this._initColumns();
                this._initData();
                this._initInterval();
            },
            didInsertElement: function() {
                this.findNames();
            },
            didUpdate: function() {},

            willDestroyElement: function() {
                this._super();
                Ember.run.later(function(){
                    if(this.intervalObj){
                        clearInterval(this.intervalObj);
                    }
                    if(this.messageBox){
                        this.messageBox = null;
                    }
                    if(this.dataAdaptor){
                        this.dataAdaptor.destroy();
                        this.dataAdaptor= null;
                    }
                }.bind(this), 1000);
            },
            _initInterval: function(){
                this.intervalObj = setInterval(function(){
                    this._initData();
                }.bind(this), commonData.interval);
            },
            _initColumns: function(){
                this.columnCH.forEach(function(val, index){
                    if(this.columnEN[index] == 'startDate' || this.columnEN[index] == 'endDate'){
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 200,
                            formatter: function(value, row, index){
                                return helper.timeFormat(value);
                            }.bind(this)
                        }));
                    }else if(this.columnEN[index] == 'state'){
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 80,
                            formatter: function(value, row, index){
                                if(row.state.toLowerCase() == 'failed'){
                                    return '<span style="color: red;">'+ value + '</span>';
                                }else if(row.state.toLowerCase() == 'success'){
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
                    }else if(this.columnEN[index] == 'taskId'){
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 300,
                            formatter: function(value, row, index){
                                return '<span id="complete-'+ value +'">'+ value +'</span>';
                            }.bind(this)
                        }));
                    }else if(this.columnEN[index] == 'submitType'){
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 80,
                            formatter: function(value, row, index){
                                return value == 'AUTO' ? '自动' : '手动';
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
            },
            onDataSourceChange: Ember.observer('dataSource.length', function(){
                this.childs['completeTable'].handleTableDataUpdate(this.dataSource);
                if(this.dataSource && this.dataSource.length){
                    if(this.currentFlowId){
                        var obj = this.dataSource.findBy('taskId', this.currentFlowId.split('-')[1]);
                        if(!obj){
                            this.set('currentProcess', this.dataSource[0]);
                        }else{
                            this.set('currentProcess', obj);
                            var curIndex = 0;
                            this.dataSource.forEach(function(item, index){
                                if(this.currentFlowId == item.taskId){
                                    curIndex = index;
                                }
                            }.bind(this));
                            Ember.run.later(function(){
                                this.$('#' + this.currentFlowId).parent().parent().addClass('selected');
                            }.bind(this), 100);
                        }
                    }else{
                        this.set('currentProcess', this.dataSource[0]);
                    }
                }else{
                    this.set('currentProcess', null);
                }
            }),
            _initFlowData: function(param){
                //获取查询流程参数
                if(this.dataAdaptor){
                    this.dataAdaptor.getRestfulData(param, 'allFlowsByInfo', function(result){
                        if(result){
                            //解析流程数据
                            var windType = [];
                            if(this.parameters.windType == '1'){
                                windType = ['waiting','paused'];
                            }else if(this.parameters.windType == '2'){
                                windType = ['running'];
                            }else if(this.parameters.windType == '3'){
                                windType = ['failed','success'];
                            }
                            var newList = [];
                            result.forEach(function(item, index){
                                if(windType.indexOf(item.state.toLowerCase()) != -1){
                                    newList.push(item);
                                }
                            }.bind(this));
                            if(newList){
                                this.set('dataSource', newList);
                                //this.childs['completeTable'].resetView(1000);
                            }
                        }
                    }.bind(this));
                }
            },
            _initData: function() {
                //this.set('dataSource', Ember.A());
                var param = {
                    taskId: this.processId ? this.processId : null
                };
                this._initFlowData(param);
            },
            _handleClick: function($e, field, value, row, $element){
                var elements = event.target.parentElement.parentElement.children;
                for(var i = 0;i<elements.length;i++){
                    elements[i].classList.remove('selected');
                };
                event.target.parentElement.classList.add('selected');
                this.set('currentProcess', row);
                this.set('currentFlowId', 'complete-' + row.taskId);
            },
            actions: {
                queryProcess: function(){
                    //按照流程ID查询
                    this._initData();
                },
                sliderClick: function(){
                    if(event.target.className.indexOf('down') != -1){
                        this.set('sliderClass', 'fa fa-angle-double-up');
                        var config = tableModel.tableConfigModel.create({
                            height: 700,
                            pagination: true,
                            clickToSelect: true
                        });
                        this.set('tableConfig',config);
                        this.childs['completeTable'].resetView(1000);
                        this.set('isShowDetail', false);
                    }else{
                        this.set('sliderClass', 'fa fa-angle-double-down');
                        var config1 = tableModel.tableConfigModel.create({
                            height: 350,
                            pagination: true,
                            clickToSelect: true
                        });
                        this.set('tableConfig',config1);
                        this.childs['completeTable'].resetView(1000);
                        this.set('isShowDetail', true);
                    }
                }
            }
        });
    });