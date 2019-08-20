define(
    [
        'app',
        'comp_modal',
        'app_info',
        'common/components/comp_msgbox/comp_msgbox',
        'common/components/comp_table/comp_table',
        'text!./process_tools_view.html',
        'json!../../common/common_dictionary_data.json',
        '../../common/services/process-data-service',
        'css!./process_tools_view.css',
        '../../components/comp_path_dialog/comp_path_dialog',
        './components/comp_tool_detail/comp_tool_detail',
        './components/comp_tool_edit/comp_tool_edit',
        'common/components/comp_loading/comp_loading'
    ],
    function (app, modal, app_info, msgBox, tableModel, template, commonData, dataService) {
        "use strict";
        app.ProcessToolsViewComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'process-tools-view',
			idList:[],
            messageBox: undefined,
            dataAdaptor: undefined,
            columnCH: ['工具名称', '版本', '存储路径','权重'],
            columnEN: ['modulename', 'version', 'toolpath','weight'],
            init: function () {
                this._super();
                this.columns = Ember.A();
                this.dataSource = Ember.A();
                this.timeGranularity = Ember.A();
                this.messageBox = msgBox.create();
                this.dataAdaptor = dataService.create();
                this.tableConfig = tableModel.tableConfigModel.create({
                    height: 550,
                    pagination: true,
                    clickToSelect: true
                });
                this.eventConfig = tableModel.eventConfigModel.create({
                    clickCell: this._handleClick.bind(this)
                });
                this._initColumns();
            },
            didInsertElement: function () {
                this.findNames();
                this._queryData();
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
            _handleClick: function ($e, field, value, row, $element) {
                if (event.target.className.indexOf('trash') !== -1) {
                    //删除
                    this.messageBox.showConfirm(
                        '确认删除？删除后不可恢复！',
                        function (result) {
                            if (result) {
                                this._handleTrashTool(row);
                            }
                        }.bind(this)
                    );
                } else if (event.target.className.indexOf('view') !== -1) {
                    //查看信息、
                    this._handleViewTool(row);
                } else if (event.target.className.indexOf('edit') !== -1) {
                    //修改信息、
                    this._handleEditTool(row);
                } else if (event.target.className.indexOf('delete') !== -1) {
                    //删除信息、
					let _self = this
					 $("input[name='checkbox1']:checked").each(function (i, n) {
							 if(_self.idList.indexOf(n.value)==-1){
								 _self.idList.push(n.value);
							 }
					     });
                }else {
                    var elements = event.target.parentElement.parentElement.children;
                    for (var i = 0; i < elements.length; i++) {
                        elements[i].classList.remove('selected');
                    }
                    event.target.parentElement.classList.add('selected');
                }
            },
            /**
             * 预览工具json配置
             * @param row
             * @private
             */
            _handleViewTool:function(row){
                this._openWindow('详细信息','comp-tool-detail',row.content);
            },
            /**
             * 修改工具基础信息
             * @param row
             * @private
             */
            _handleEditTool:function(row){
                this._openWindow('修改信息','comp-tool-edit',row);
            },
            _editTool:function(row){
                var param = {
                    id : row.id,
                    modulename:row.modulename,
                    weight:row.weight
                };
                this.dataAdaptor.getRestfulData(param, 'updateTools', function(result){
                    if(result.code === 0){
                        this.messageBox.showAlert('修改成功！');
                        this._queryData();
                    }else{
                        this.messageBox.showAlert(result.message);
                    }
                }.bind(this));
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
                        if(this.parameters.toolData){
                            _self._editTool(this.parameters.toolData);
                        }
                    },
                    close: function() { //获取传递参数

                    }
                });
            },
            /**
             * 删除工具
             * @param row
             * @private
             */
            _handleTrashTool:function(row){
                var param = {
                    id : row.id
                };
                this.dataAdaptor.getRestfulData(param, 'deleteTools', function(result){
                    if(result.code === 0){
                        this.messageBox.showAlert('删除成功！');
                        this._queryData();
                    }else{
                        this.messageBox.showAlert(result.message);
                    }
                }.bind(this));
            },
			/**
			 * 批量删除工具
			 * @param rows
			 * @private
			 */
			_handleTrashTools:function(){
				let _self = this
			    var param = {
			        idList : this.idList
			    };
			    this.dataAdaptor.getRestfulData(param, 'deleteModleMuch', function(result){
			        if(result.code === 0){
			            this.messageBox.showAlert('删除成功！');
			            _self._queryData();
			        }else{
			            this.messageBox.showAlert(result.message);
			        }
			    }.bind(this));
			},
            /**
             * 初始化工具表格
             * @private
             */
            _initColumns: function () {
                this.columns.unshift(tableModel.columnsModel.create({
                    field: '',
                    title: '操作',
                    formatter: function (value, row, index) {
                        return '<input type="checkbox" name="checkbox1" value='+row.id+ ' class="delete"/><button style="margin-left: 5px;" class="trash fa fa-trash btn-danger">删除</button> <button style="margin-left: 5px;" class="edit fa fa-edit btn-warning">修改</button><button style="margin-left: 5px;" class="view fa fa-search btn-info">更多</button>';
                    }
                }));
                this.columnCH.forEach(function (val, index) {
                    this.columns.push(tableModel.columnsModel.create({
                        field: this.columnEN[index],
                        title: val
                    }));
                    // if(this.columnEN[index] == 'nodestatus'){
                    //     this.columns.push(tableModel.columnsModel.create({
                    //         field: this.columnEN[index],
                    //         title: val,
                    //         formatter: function(value, row, index){
                    //             return value == '' ? 'ENABLE' : 'DISABLE';
                    //         }.bind(this)
                    //     }));
                    // }else{
                    //     this.columns.push(tableModel.columnsModel.create({
                    //         field: this.columnEN[index],
                    //         title: val
                    //     }));
                    // }
                }.bind(this));
            },
            /**
             * 查询工具数据
             * @private
             */
            _queryData:function(){
                this.dataAdaptor.getRestfulData({}, 'flowTools', function(result){
                    if(result ){
                        this.set('dataSource',result);
                    }else{
                        this.messageBox.showAlert('查询工具失败！');
                    }
                }.bind(this));
            },
            actions: {
                /**
                 * 上传工具
                 */
                doUpload: function () {
                    var self = this;
                    var url =  this.dataAdaptor.getRestfulUrl('fileUpload','host');
                    var formData = new FormData();
                    if( $('#file1')[0].files.length !==2){
                        this.messageBox.showAlert('上传文件数必须是2个！');
                        return
                    }
                    formData.append("file1", $('#file1')[0].files[0]);
                    formData.append("file1", $('#file1')[0].files[1]);
                    formData.append("userId", app_info.userInfo2.userId);
                    formData.append("userName", app_info.userInfo2.userName);
                    self.childs['frameloading'].start();
                    $.ajax({
                        url: url,
                        type: 'POST',
                        data: formData,
                        contentType: false,
                        ContentType:"application/json; charset=utf-8",
                        processData: false,
                        success: function (returndata) {
							if(returndata.status){
								self.childs['frameloading'].stop();
								self.messageBox.showAlert('上传成功！');
								self._queryData();
							}else{
								self.childs['frameloading'].stop();
								self.messageBox.showAlert(returndata.message);
								self._queryData();
							}
                        },
                        error: function (returndata) {
                            self.childs['frameloading'].stop();
                            self.messageBox.showAlert('上传失败！');
                        }
                    });

                },
				/**
				 * 批量删除工具
				 * @param rows
				 * @private
				 */
				_handleTrashTools:function(){
					let _self = this
				    var param = {
				        idList : this.idList
				    };
				    this.dataAdaptor.getRestfulData(param, 'deleteModleMuch', function(result){
				        if(result.code === 1){
				            _self.messageBox.showAlert('删除成功！');
				            _self._queryData();
							_self.idList = [];
				        }else{
				            this.messageBox.showAlert(result.message);
				        }
				    }.bind(this));
				},
            }
        });
    });