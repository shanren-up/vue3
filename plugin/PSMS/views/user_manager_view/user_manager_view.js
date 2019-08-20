define(
    [
        'app',
        'comp_modal',
        'app_info',
        'common/components/comp_msgbox/comp_msgbox',
        'common/components/comp_table/comp_table',
        'text!./user_manager_view.html',
        'json!../../common/common_dictionary_data.json',
        '../../common/services/process-data-service',
        '../../helper/common_helper',
        'common/components/comp_datetimpicker/comp_datetimepicker',
        'css!./user_manager_view.css',
        'css!lib/fontawesome/css/font-awesome.min.css',
        './components/comp_userinfo/comp_userinfo'
    ],
    function(app, modal,app_info, msgBox, tableModel, template, commonData, dataService, helper) {
        "use strict";
        app.UserManagerViewComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'user-manager-view',
            dataAdaptor: null,
            messageBox: null,
            userInfo:undefined,
            columnCH: ['用户名', '角色', '登录名', '性别', '电话号码', '电子邮件'],
            columnEN: ['username','rolename','loginname','sex','tel', 'email'],

            init: function() {
                this._super();
                var userinfo = sessionStorage.getItem('userInfo');
                if(userinfo){
                    this.userInfo ={
                        userName:JSON.parse(userinfo).userName,
                        userId:JSON.parse(userinfo).userId,
                        roleName:JSON.parse(userinfo).roleName
                    };
                }
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
            /**
             * 初始化表格
             * @private
             */
            _initColumns: function(){
                    var self = this;
                this.columns.push(tableModel.columnsModel.create({
                    field: '',
                    title: '操作',
                    width: 400,
                    formatter: function(value, row, index){
                        var htmlStr = '<button style="margin-left: 5px;" class="edit fa fa-pencil-square-o btn-success">修改</button>';
                        if(self.userInfo.roleName === '管理员'){
                            htmlStr +='<button style="margin-left: 5px" class="trash fa fa-trash btn-danger">删除</button>';
                        }
                        return htmlStr;
                    }
                }));
                this.columnCH.forEach(function(val, index){
                    this.columns.push(tableModel.columnsModel.create({
                        field: this.columnEN[index],
                        title: val,
                        width: 200
                    }));

                }.bind(this));
            },
            /**
             * 初始化用户数据
             * @private
             */
            _initData: function() {
                this._initAllUserData();
            },
            _initAllUserData: function(){
                //获取所有用户
                if(this.dataAdaptor){
                    var param = {};
                    if(this.userInfo.roleName !== '管理员'){
                        param.username = this.userInfo.userName;
                        param.id = this.userInfo.userId;
                    }
                    this.dataAdaptor.getRestfulData(param, 'selectUser',  function(result){
                        if(result.code === 0){
                            this.set('dataSource', result.data);
                            this.childs['sysManagerTable'].resetView(1000);
                        }else{
                            this.messageBox.showError('查询用户异常！');
                        }
                    }.bind(this));
                }
            },
            _handleClick: function($e, field, value, row, $element){
                if(event.target.className.indexOf('trash') !== -1 ){
                    //删除
                    this.messageBox.showConfirm('是否确认删除此用户？', function(result){
                       if(result){
                           this._handleTrashUser(row);
                       }
                    }.bind(this));
                }else if(event.target.className.indexOf('edit') !== -1){
                    //修改信息、
                    this.messageBox.showConfirm('是否确认修改此用户？', function(result){
                        if(result){
                            this._handleEditUser(row);
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
            /**
             * 删除用户
             * @param row
             * @private
             */
            _handleTrashUser: function(row){
                var param = {
                    uid: row.uid
                };
                if(this.dataAdaptor){
                    this.dataAdaptor.getRestfulData(row.id, 'deleteUser',  function(result){
                        if(result.code === 0){
                            this.messageBox.showSuccess('删除用户成功！');
                            this._initData();
                        }else{
                            this.messageBox.showError(result.message);
                        }
                    }.bind(this));
                }
            },
            /**
             * 编辑用户
             * @param row
             * @private
             */
            _handleEditUser: function(row){
                this._openWindow('修改用户信息', 'comp-userinfo', {data: row});
            },
            /**
             * 修改用户
             * @param row
             * @private
             */
            _updateUserInfo: function(row){
                if(this.dataAdaptor){
                    this.dataAdaptor.getRestfulData(row, 'updateUser',  function(result){
                        if(result.code === 0){
                            this.messageBox.showSuccess('修改用户成功！');
                            this._initData();
                        }else{
                            this.messageBox.showError(result.message);
                        }
                    }.bind(this));
                }
            },
            /**
             * 新增用户
             * @param row
             * @private
             */
            _insertUserInfo: function(row){
                if(this.dataAdaptor){
                    this.dataAdaptor.getRestfulData(row, 'addUser',  function(result){
                        if(result.code === 0){
                            this.messageBox.showSuccess('新增用户成功！');
                            this._initData();
                        }else{
                            this.messageBox.showError(result.message);
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
                            _self._updateUserInfo(this.parameters.data);
                        }else{
                            _self._insertUserInfo(this.parameters.data);
                        }
                    },
                    close: function() { //获取传递参数

                    }
                });
            },
            actions: {
                addUser: function(){
                    this._openWindow('新增用户', 'comp-userinfo', {data: null});
                }
            }
        });
    });