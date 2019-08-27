define(
    [
        'app',
        'app_info',
        'common/components/comp_msgbox/comp_msgbox',
        'common/components/comp_table/comp_table',
        'json!./../../config/properties.json',
        'text!./comp_create_task.html',
        '../../common/services/process-data-service',
        'comp_modal',
        'css!./comp_create_task.css',
        './../comp_path_dialog/comp_path_dialog',
        './../comp_flow_param/comp_flow_param'
    ],
    function (app,app_info, msgBox, tableModel, cofPro, template, dataService, modal) {
        "use strict";
        app.CompCreateTaskComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-create-task',
            dataAdaptor: null,
            messageBox: null,
            taskData: null,
            showPage: true,
            showData: false,
            showParam: false,
            taskName: '',
            taskDes: '',
            selectUrl: '',
            folderUrl: '',
            orignalUrl: '',
            fileData: [],
            selectFiles: [],
            resultUrl: Ember.computed('folderUrl', 'selectUrl', function () {
                return this.folderUrl + '/' + this.selectUrl;
            }),
            flowData: undefined,
            flowContent: undefined,
            paramView: undefined,
            // columnCH: ['序号', '影像名称', '卫星类型', '影像类型', 'RPC文件', 'XML文件'],
            // columnEN: ['num', 'cosname', 'flowType', 'cosType', 'rpc', 'xml'],
            columnCH: ['序号', '文件名称', '文件路径'],
            columnEN: ['num', 'fileName', 'filePath'],
            fileInfo: undefined,
            subKeyObj: undefined,
            init: function () {
                this._super();
                this.columns = Ember.A();
                this.messageBox = msgBox.create();
                this.dataAdaptor = dataService.create();
                if (this.parameters) {
                    this.flowData = this.parameters;
                    this.flowContent = JSON.parse(this.flowData.content);
                    this.subKeyObj = cofPro.processType.findBy('id', this.flowContent.subkey);
                }
                this.fileData = [];
                this.selectFiles = [];
                this.folderUrl = cofPro.fileDir.resultDir;
                this.orignalUrl = cofPro.fileDir.origDir;
                this._initColumns();
            },
            didInsertElement: function () {

            },
            _initFileInput: function () {
                var param = {
                    filePath: this.orignalUrl,
                    suffix: this.subKeyObj.file,
                };
                this.dataAdaptor.getRestfulData(param, 'fileConfig', function (result) {
                    if (result) {
                        //this._handleResult(result);
                        this.set('dataSource', result);
                    }
                }.bind(this));
            },
            _initColumns: function () {
                this.columns.unshift(tableModel.columnsModel.create({
                    field: '',
                    sortable: false,
                    width: 80,
                    checkbox: true,
                }));
                this.columnCH.forEach(function (val, index) {
                    if (this.columnEN[index] === 'num') {
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            sortable: true,
                            width: 100,
                            formatter: function (value, row, index) {
                                return index + 1;
                            }.bind(this)
                        }));
                    } else if (this.columnEN[index] === 'fileName' ) {
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            sortable: true,
                            width: 450,
                            title: val
                        }));
                    } else if (this.columnEN[index] === 'filePath') {
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            sortable: true,
                            width: 450,
                            title: val
                        }));
                    } else if (this.columnEN[index] === 'flowType') {
                        this.columns.push(tableModel.columnsModel.create({
                            width: 80,
                            sortable: true,
                            field: this.columnEN[index],
                            title: this.subKeyObj.name
                        }));
                    } else {
                        this.columns.push(tableModel.columnsModel.create({
                            width: 80,
                            sortable: true,
                            field: this.columnEN[index],
                            title: val
                        }));
                    }
                }.bind(this));
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
                        if (this.parameters) {
                            if (this.parameters.type === 'orignal') {
                                _self.set('orignalUrl', this.parameters.data);
                            } else {
                                _self.set('folderUrl', this.parameters.data);
                            }
                        }
                    },
                    close: function () { //获取传递参数
                    }
                });
            },
            _validateInfo:function(){
                if (this.taskName === '') {
                    this.messageBox.showError('任务名称不能为空！');
                    return ;
                }
                var param = {
                    filePath: this.get('resultUrl'),
                };
                this.dataAdaptor.getRestfulData(param, 'pathCheck', function (result) {
                    if (!result) {
                        this.messageBox.showError('无法创建，文件夹已经存在！');
                    }else{
                        this.set('showPage', false);
                        this.set('showData', true);
                        this._initFileInput();
                    }
                }.bind(this));
            },
            /**
             * 对参数中的数据进行处理，ember在双向绑定过程中，如果没有使用model，
             * 对于原本int类型的数据，界面修改后会变成string，这里转换下
             * @private
             */
            _replaceModuleParamStr:function(){
                this.flowContent.modules.forEach(function (item) {
                    item.Systemproperty.SystemConfiguration.forEach(function(sysItem){
                        if(sysItem.type === 'int'  ){
                            // sysItem.value = parseInt( sysItem.value);
                            Ember.set(sysItem,'value',parseInt( sysItem.value) );
                        }
                        if(sysItem.type === 'float'){
                            // sysItem.value = parseFloat( sysItem.value);
                            Ember.set(sysItem,'value',parseFloat( sysItem.value) );
                        }
                    });
                    item.Userproperty.InputParameter.Configuration.forEach(function(userItem){
                        if(userItem.type === 'int'  ){
                            // userItem.value = parseInt( userItem.value);
                            Ember.set(userItem,'value',parseInt( userItem.value) );
                        }
                        if(userItem.type === 'float'){
                            //userItem.value = parseFloat( userItem.value);
                            Ember.set(userItem,'value',parseFloat( userItem.value) );
                        }
                        if(userItem.type === 'select'){
                            //userItem.value = parseFloat( userItem.value);
                            Ember.set(userItem,'value',parseInt( userItem.value) );
                        }
                    });
                }.bind(this));
            },
            actions: {
                preAction: function () {
                    if (this.showParam) {
                        this.set('showParam', false);
                        this.set('showData', true);
                    } else if (this.showData) {
                        this.set('showData', false);
                        this.set('showPage', true);
                    }
                },
                nextAction: function () {
                    if (this.showPage) {
                        this._validateInfo();
                    } else if (this.showData) {
                        this.set('showData', false);
                        this.set('showParam', true);
                    }
                },
                selectDirectory: function (type) {
                    var path;
                    if (type === 'orignal') {
                        this.set('orignalUrl', cofPro.fileDir.origDir);
                        path = this.orignalUrl;
                    }
                    if (type === 'folder') {
                        this.set('folderUrl', cofPro.fileDir.resultDir);
                        path = this.folderUrl;
                    }
                    this._openWindow('文件浏览', 'comp-path-dialog', {path: path, type: type});
                },
                completeAction: function () {
                    this.findNames();
                    this.fileInfoView = this.childs.fileInfoView;
                    this.paramView = this.childs.paramView;
                    this._replaceModuleParamStr();
                    if (this.taskName === '') {
                        this.messageBox.showError('任务名称不能为空！');
                        return;
                    }
                    var selectFiles = this.fileInfoView._$table.bootstrapTable.apply(this.fileInfoView._$table, ['getSelections']);
                     
                    var filenames = '';
                    var subtaskcount = 0;
                    selectFiles.forEach(function (item) {
                        var matcher = /^TH2-[0-9]*A/;
                        //if (matcher.test(item.fileName)) {
                        subtaskcount++;
                        var name = item.fileName.split('.h5')[0];
                        if (filenames === '') {
                            filenames = item.filePath+'/'+item.fileName;
                        } else {
                            filenames += ',' +  item.filePath+'/'+name;
                        }
                        //}
                    });
					if (selectFiles.length < 1) {
					    //this.messageBox.showError('请选择原始数据文件！');
						filenames = this.orignalUrl
						subtaskcount++;
					    //return;
					} 
                    var param = {
                        taskname: this.taskName,
                        taskdesc: this.taskDes,
                        projfolder: this.get('resultUrl'),
                        flowid:this.flowData.id,
                        sparefield2: filenames,
                        subtaskcount:subtaskcount,
                        satellite: this.subKeyObj.name2,
                        content: JSON.stringify(this.flowContent),
                        submitType:'HAND',
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
                selectAll: function () {

                },
            }
        });
    });