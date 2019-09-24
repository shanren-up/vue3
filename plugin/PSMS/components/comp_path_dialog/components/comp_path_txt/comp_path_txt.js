define(
    [
        'app',
        'common/components/comp_msgbox/comp_msgbox',
        'common/components/comp_table/comp_table',
        'text!./comp_path_txt.html',
        '../../../../common/services/process-data-service',
        'css!./comp_path_txt.css'
    ],
    function(app, msgBox, tableModel, template, dataService) {
        "use strict";
        app.CompPathTxtComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-path-txt',
            dataAdaptor: undefined,
            messageBox: undefined,
            newFolderName: '',
            path:undefined,
            files:undefined,
			filePath:undefined,
			txt:'',
            init: function() {
                this._super();
                this.columns = Ember.A();
                this.dataSource = Ember.A();
                this.messageBox = msgBox.create();
                this.dataAdaptor = dataService.create();
                if(this.parameters.filePath){
                    // this.path = this.parameters.path;
                    // this.files = this.parameters.files;
					this.filePath = this.parameters.filePath;
					this._initPathTXT();
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
			/**
			 * 服务请求TXT数据
			 * @param dirStr
			 * @private
			 */
			_initPathTXT: function () {
			    var param = {
			        filePath: this.filePath
			    };
			    this.dataAdaptor.getRestfulData(param, 'downloadFile', function(result){
			        if(result.status == "SUCCESS"){
					   this.set('txt', result.content);
			        }
			    }.bind(this));
			},
			/**
			 * 服务更新TXT数据
			 * @param dirStr
			 * @private
			 */
			_updatePathTXT: function () {
			    var param = {
			        filePath: this.filePath,
					content: this.txt
			    };
			    this.dataAdaptor.getRestfulData(param, 'saveFile', function(result){
			        if(result){
			            this.messageBox.showSuccess('修改成功！');
						this.sendAction('sendConfirm');
			        }else{
			            this.messageBox.showAlert(result.message);
			        }
			    }.bind(this));
			},
            /**
             * 创建文件夹
             * @private
             */
            _createFolder: function() {
                var param = {
                    filePath:this.path + '/' + this.newFolderName
                };
                this.dataAdaptor.getRestfulData(param, 'createFolder', function(result){
                    if(result.code === 0){
                        this.sendAction('sendConfirm');
                    }else{
                        this.messageBox.showError(result.message);
                    }
                }.bind(this));
            },
            actions: {
                confirmPath:function () {
                    /* var valid = true;
                    this.files.forEach(function (item) {
                        if(item.name === this.newFolderName){
                            valid = false;
                        }
                    }.bind(this));
                    if(valid){
                        this._createFolder();
                    }else{
                        this.messageBox.showAlert('文件夹已经存在！');
                    } */
					this._updatePathTXT();
                },
                cancelPath:function () {
                    this.sendAction('sendClose');
                }
            }
        });
    });