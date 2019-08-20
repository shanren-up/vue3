define(
    [
        'app',
        'common/components/comp_msgbox/comp_msgbox',
        'common/components/comp_table/comp_table',
        'text!./comp_process_log.html',
        '../../common/services/process-data-service',
        'css!./comp_process_log.css'
    ],
    function(app, msgBox, tableModel, template, dataService) {
        "use strict";
        app.CompProcessLogComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-process-log',
            dataAdaptor: null,
            messageBox: null,
            taskData: null,
            columnCH: ['流程ID', '行为', '信息', '释放时间', '创建时间'],
            columnEN: ['id','id0','id1','id2','id3'],

            init: function() {
                this._super();
                this.columns = Ember.A();
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
                this._initColumns();
                if(this.parameters.data){
                    this.set('taskData', this.parameters.data);
                    //加载任务日志数据
                    this._initData();
                }
            },
            didInsertElement: function() {
                this.findNames();
            },
            didUpdate: function() {},

            willDestroyElement: function() {
                this._super();
                if(this.messageBox){
                    this.messageBox = null;
                }
                if(this.dataAdaptor){
                    this.dataAdaptor= null;
                }
            },
            _initColumns: function(){
                this.columnCH.forEach(function(val, index){
                    this.columns.push(tableModel.columnsModel.create({
                        field: this.columnEN[index],
                        title: val
                    }));
                }.bind(this));
            },
            _handleClick: function($e, field, value, row, $element){
                var elements = event.target.parentElement.parentElement.children;
                for(var i = 0;i<elements.length;i++){
                    elements[i].classList.remove('selected');
                };
                event.target.parentElement.classList.add('selected');
            },
            _initData: function() {
                this.dataAdaptor.getRestfulData({}, 'taskDbLogInfo', function(result){
                    if(result){
                        //解析流程数据
                        this.set('dataSource', result);
                    }
                });
                this.set('dataSource', Ember.A());
                this.dataSource.push({
                    id: 'JB9_PRODUCT_180409363000002',
                    id0: '20180409900002',
                    id1: 'JB9_PRODUCT',
                    id2: 'Failure',
                    id3: 'admin'
                },{
                    id: 'JB9_PRODUCT_180409363000002',
                    id0: '20180409900002',
                    id1: 'JB9_PRODUCT',
                    id2: 'Failure',
                    id3: 'admin'
                },{
                    id: 'JB9_PRODUCT_180409363000002',
                    id0: '20180409900002',
                    id1: 'JB9_PRODUCT',
                    id2: 'success',
                    id3: 'admin'
                },{
                    id: 'JB9_PRODUCT_180409363000002',
                    id0: '20180409900002',
                    id1: 'JB9_PRODUCT',
                    id2: 'success',
                    id3: 'admin'
                });
            },
            actions: {

            }
        });
    });