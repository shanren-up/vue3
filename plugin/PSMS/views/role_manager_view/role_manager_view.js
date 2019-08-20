define(
    [
        'app',
        'comp_modal',
        'common/components/comp_msgbox/comp_msgbox',
        'common/components/comp_table/comp_table',
        'text!./role_manager_view.html',
        'json!../../common/common_dictionary_data.json',
        '../../common/services/process-data-service',
        '../../helper/common_helper',
        'common/components/comp_datetimpicker/comp_datetimepicker',
        'css!./role_manager_view.css',
        'css!lib/fontawesome/css/font-awesome.min.css',
        './system_roleinfo_panel'
    ],
    function(app, modal, msgBox, tableModel, template, commonData, dataService, helper) {
        "use strict";
        app.RoleManagerViewComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'role-manager-view',
            dataAdaptor: null,
            messageBox: null,
            columnCH: ['角色名称', '创建时间', '角色描述', '角色权限'],
            columnEN: ['rolename','createtime','commtents','level_'],

            init: function() {
                this._super();
                this.columns = Ember.A();
                this.dataSource = Ember.A();
                this.messageBox = msgBox.create();
                this.dataAdaptor = dataService.create();
                this.tableConfig = tableModel.tableConfigModel.create({
                    height: 500,
                    pagination: true,
                    clickToSelect: true
                });
                this.eventConfig = tableModel.eventConfigModel.create({
                    clickCell: this._handleClick.bind(this)
                });
                this._initColumns();
                this._initData();
            },
            didInsertElement: function() {
                this.findNames();
            },
            didUpdate: function() {},

            willDestroyElement: function() {
                this._super();
                Ember.run.later(function(){
                    if(this.messageBox){
                        this.messageBox = null;
                    }
                    if(this.dataAdaptor){
                        this.dataAdaptor.destroy();
                        this.dataAdaptor= null;
                    }
                }.bind(this), 1000);
            },
            _initColumns: function(){
                this.columns.push(tableModel.columnsModel.create({
                    field: '',
                    title: '操作',
                    width: 300,
                    formatter: function(value, row, index){
                        return '<button style="margin-left: 5px;background-color: transparent;border: none;font-size: 14px;" class="trash"><span style="color: red;margin-right: 2px;" class="trash fa fa-trash"></span>删除角色</button>' +
                            '<button style="margin-left: 5px;background-color: transparent;border: none;font-size: 14px;" class="edit"><span style="color: green;margin-right: 2px;" class="edit fa fa-pencil-square-o"></span>修改信息</button>';
                    }
                }));
                this.columnCH.forEach(function(val, index){
                    if(this.columnEN[index] == 'createtime'){
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 200,
                            formatter: function(value, row, index){
                                return helper.timeFormat(value, false);
                            }.bind(this)
                        }));
                    }else if(this.columnEN[index] == 'level_'){
                        this.columns.push(tableModel.columnsModel.create({
                            field: this.columnEN[index],
                            title: val,
                            width: 300,
                            formatter: function(value, row, index){
                                return helper.roleValueFormat(value, false);
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
            _initData: function() {
                this._initAllRoleData();
            },
            _initAllRoleData: function(){
                //获取所有角色
                if(this.dataAdaptor){
                    this.dataAdaptor.getRestfulData(null, 'allUserRoles',  function(result){
                        if(result){
                            this.set('dataSource', result);
                            this.childs['roleManagerTable'].resetView(1000);
                        }
                    }.bind(this));
                }
            },
            _handleClick: function($e, field, value, row, $element){
                if(event.target.className == 'trash'){
                    //删除
                    this.messageBox.showConfirm('是否确认删除此用角色？', function(result){
                       if(result){
                           this._handleTrashRole(row);
                       }
                    }.bind(this));
                }else if(event.target.className == 'edit'){
                    //修改信息、
                    this.messageBox.showConfirm('是否确认删除此用角色？', function(result){
                        if(result){
                            this._handleEditRole(row);
                        }
                    }.bind(this));
                }else{
                    var elements = event.target.parentElement.parentElement.children;
                    for(var i = 0;i<elements.length;i++){
                        elements[i].classList.remove('selected');
                    };
                    event.target.parentElement.classList.add('selected');
                }
            },
            _handleTrashRole: function(row){
                var param = {
                    id: row.id
                };
                if(this.dataAdaptor){
                    this.dataAdaptor.getRestfulData(param, 'roleDeleteAction',  function(result){
                        if(result){
                            this.messageBox.showSuccess('删除角色成功！');
                            this._initData();
                        }else{
                            this.messageBox.showError('删除角色失败！');
                        }
                    }.bind(this));
                }
            },
            _handleEditRole: function(row){
                this._openWindow('修改角色信息', 'system-roleinfo-panel', {data: row});
            },
            _updateRoleInfo: function(row){
                if(this.dataAdaptor){
                    this.dataAdaptor.getRestfulData(row, 'roleUpdateAction',  function(result){
                        if(result){
                            this.messageBox.showSuccess('修改角色成功！');
                            this._initData();
                        }else{
                            this.messageBox.showError('修改角色失败！');
                        }
                    }.bind(this));
                }
            },
            _insertRoleInfo: function(row){
                if(this.dataAdaptor){
                    this.dataAdaptor.getRestfulData(row, 'roleInsertAction',  function(result){
                        if(result){
                            this.messageBox.showSuccess('新增角色成功！');
                            this._initData();
                        }else{
                            this.messageBox.showError('新增角色失败！');
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
                        if(this.parameters.isEdit){
                            _self._updateRoleInfo(this.parameters.data);
                        }else{
                            _self._insertRoleInfo(this.parameters.data);
                        }
                    },
                    close: function() { //获取传递参数

                    }
                });
            },
            actions: {
                addRole: function(){
                    this._openWindow('新增角色', 'system-roleinfo-panel', {data: null});
                }
            }
        });
    });