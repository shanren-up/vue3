define(
    [
        'app',
        'comp_modal',
        'app_info',
        '../../helper/common_helper',
        'common/components/comp_msgbox/comp_msgbox',
        'common/components/comp_table/comp_table',
        'text!./process_order_view.html',
        'json!../../common/common_dictionary_data.json',
        '../../common/services/process-data-service',
        'json!../../config/properties.json',
        'css!./process_order_view.css',
        '../../components/comp_path_dialog/comp_path_dialog',
        './components/comp_order_task/comp_order_task',
    ],
    function (app, modal, app_info,helper, msgBox, tableModel, template, commonData, dataService,proConfig) {
        "use strict";
        app.ProcessOrderViewComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'process-order-view',
            messageBox: undefined,
            dataAdaptor: undefined,
            columnCH: [ '产品级别','最终产品级别','文件路径','产品类型','产品格式','优先级','生成时间',  '完成状态',  '接口实体类型','修改时间',   '发送方','接收方'],
            columnEN: ['productLevel','finalProductLevel','filePath','productType','productFormat','priority','creationTime',  'finishStatus', 'messageType','modifyTime','originatorAddress','recipientAddress'],
            columnCH1: [ '生成计划编号','生成时间','输入产品级别','最终产品级别','产品类型','优先级','输入文件路径','输出文件路径','完成进度','完成状态'],
            columnEN1: ['proPlanId','creationTime','productLevel','finalProductLevel','productType','priority','tifPath','outputPath', 'allOrderProcess','orderStatus'],
            folderUrl:undefined,
            flowId:undefined,
            flows:undefined,
            init: function () {
                this._super();
                this.columns = Ember.A();
                this.dataSource = Ember.A();
                this.columns1 = Ember.A();
                this.dataSource1 = Ember.A();
                this.timeGranularity = Ember.A();
                this.folderUrl = proConfig.fileDir.origDir;
                this.messageBox = msgBox.create();
                this.dataAdaptor = dataService.create();
                this.tableConfig = tableModel.tableConfigModel.create({
                    height: 360,
                    pagination: true,
                    clickToSelect: true
                });
                this.eventConfig = tableModel.eventConfigModel.create({
                    clickCell: this._handleClick.bind(this)
                });
                this.eventConfig1 = tableModel.eventConfigModel.create({
                    clickCell: this._handleClick1.bind(this)
                });
                this._initColumns();
                this._initColumns1();
                this._initFilePath();
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
                    this.messageBox = undefined;
                }
                if (this.dataAdaptor) {
                    this.dataAdaptor = undefined;
                }
            },
            /**
             * 初始化文件保存目录
             * @private
             */
            _initFilePath:function(){
                this.dataAdaptor.getRestfulData({}, 'queryExportPath', function (result) {
                    if (result.status === '1') {
                        this.set('folderUrl',result.results.exportPath);
                    }else{
                        console.error('文件导出路径获取错误！');
                    }
                }.bind(this),'taskHost','post');
            },
            _handleClick1:function($e, field, value, row, $element){

            },
            _handleClick: function ($e, field, value, row, $element) {
                if (event.target.className.indexOf('start') !== -1) {
                    this._handleStartTask(row);
                } else {
                    var elements = event.target.parentElement.parentElement.children;
                    for (var i = 0; i < elements.length; i++) {
                        elements[i].classList.remove('selected');
                    }
                    event.target.parentElement.classList.add('selected');
                }
            },
            _handleStartTask:function(row){
                var flow;
                this.dataAdaptor.getRestfulData({id:row.flowId}, 'flowSubmit', function (result) {
                    if (result) {
                        this.messageBox.showSuccess('任务创建成功！');
                        this.sendAction('sendClose');
                    }else{
                        this.messageBox.showFailure('任务创建失败！');
                    }
                }.bind(this));
                var param = {
                    taskname: row.proPlanId,
                    taskdesc: '自动任务',
                    projfolder: this.get('resultUrl'),
                    flowid:row.flowId,
                    sparefield2: filenames,
                    subtaskcount:subtaskcount,
                    satellite: this.subKeyObj.name2,
                    content: JSON.stringify(this.flowContent),
                    submitType:'AUTO',
                    username : app_info.userInfo2.userName,
                    userid : app_info.userInfo2.userId,
                };
                this.dataAdaptor.getRestfulData(param, 'flowSubmit', function (result) {
                    if (result) {
                        this.messageBox.showSuccess('任务创建成功！');
                        this.sendAction('sendClose');
                    }else{
                        this.messageBox.showFailure('任务创建失败！');
                    }
                }.bind(this));
            },
            /**
             * 初始化外部订单表格
             * @private
             */
            _initColumns: function () {
                this.columns.unshift(tableModel.columnsModel.create({
                    field: '',
                    title: '操作',
                    formatter: function (value, row, index) {
                        return '<button style="margin-left: 5px;" class="start  btn-info">启动</button>';
                    }
                }));
                this.columnCH.forEach(function (val, index) {
                    if(this.columnEN[index] === 'creationTime' || this.columnEN[index] === 'modifyTime'){
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 150,
                            formatter: function(value, row, index){
                                return helper.timeFormat(value);
                            }.bind(this)
                        }));
                    }else{
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val
                        }));
                    }

                }.bind(this));
            },
            /**
             * 初始化对外任务列表
             * @private
             */
            _initColumns1: function () {
                this.columnCH1.forEach(function (val, index) {
                    if(this.columnEN1[index] === 'productType'){
                        this.columns1.push(tableModel.columnsModel.create({
                            field: this.columnEN1[index],
                            title: val,
                            width: 150,
                            formatter: function(value, row, index){
                                 var typeObj = proConfig.productType.findBy('id',value);
                                return typeObj?typeObj.name:'';
                            }.bind(this)
                        }));
                    }else if(this.columnEN1[index] === 'orderStatus'){
                        this.columns1.push(tableModel.columnsModel.create({
                            field: this.columnEN1[index],
                            title: val,
                            width: 150,
                            formatter: function(value, row, index){
                                var val = '';
                                if(value === 0){
                                    val = '未开始'
                                }
                                if(value === 1){
                                    val = '开始'
                                }
                                if(value === 2){
                                    val = '结束'
                                }
                                return val;
                            }.bind(this)
                        }));
                    }else{
                        this.columns1.push(tableModel.columnsModel.create({
                            field: this.columnEN1[index],
                            title: val
                        }));
                    }
                }.bind(this));
            },
            /**
             * 组件初始化入口
             * @private
             */
            _initData:function(){
                //查询外部订单
                this._selectOrders();
                //查询下发任务列表
                this._selectPostTask();
                //查询模板列表
                this._initHisFlows();
            },
            /**
             * 查询外部订单
             * @private
             */
            _selectOrders:function(){
                this.dataAdaptor.getRestfulData({}, 'selectTaskUrl', function (result) {
                    if (result.info === 'OK') {
                        //var data = JSON.parse(result.results);
                        this.set('dataSource',result.results);
                    }else{
                        this.messageBox.showError('订单查询错误！');
                    }
                }.bind(this),'taskHost','get');
            },
            /**
             * 查询下发任务列表
             * @private
             */
            _selectPostTask:function(){
                this.dataAdaptor.getRestfulData({}, 'queryHHOrder', function (result) {
                    if (result.info === 'OK') {
                        //var data = JSON.parse(result.results);
                        this.set('dataSource1',result.results);
                    }else{
                        this.messageBox.showError('订单查询错误！');
                    }
                }.bind(this),'taskHost','post');
            },
            /**
             * 查询模板列表
             * @private
             */
            _initHisFlows: function () {
                //目前模板不区分用户
                var param = {};
                param.username = app_info.userInfo2.userName;
                param.userid = app_info.userInfo2.userId;
                if (this.dataAdaptor) {
                    this.dataAdaptor.getRestfulData({}, 'selectFlows', function (result) {
                        if (result) {
                            this.set('flowId', result[0].id);
                            this.set('flows', result);
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
                        if (this.parameters && this.parameters.type === 'orginal') {
                            Ember.set(_self, 'folderUrl', this.parameters.data);
                        }
                        if(this.parameters && this.parameters.orderTask){
                            _self._selectPostTask();
                        }
                    },
                    close: function() { //获取传递参数

                    }
                });
            },
            /**
             * 保存文件路径
             * @private
             */
            _savePath:function(){
                if (this.dataAdaptor) {
                    this.dataAdaptor.getRestfulData({exportPath:this.folderUrl}, 'modifyExportPath', function (result) {
                        if (result.status) {
                            this.messageBox.showSuccess('路径保存成功！');
                        }else{
                            this.messageBox.showError('路径保存失败！');
                        }
                    }.bind(this),'taskHost');
                }
            },
            actions: {
                doUpload: function () {
                },
                addTask:function(){
                    this._openWindow('新增外部任务', 'comp-order-task');
                },
                selectFolder:function () {
                    var  path = proConfig.fileDir.origDir;
                    this._openWindow('文件浏览', 'comp-path-dialog', {path: path, type: 'orginal'});
                },
                savePath:function () {
                    this._savePath();
                },
                flowSelectChange:function(){
                    Ember.set(this,'flowId',event.target.value);
                    console.log(this.flowId);
                },
            }
        });
    });