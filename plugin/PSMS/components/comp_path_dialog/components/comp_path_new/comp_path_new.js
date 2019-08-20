define(
    [
        'app',
        'common/components/comp_msgbox/comp_msgbox',
        'common/components/comp_table/comp_table',
        'text!./comp_path_new.html',
        '../../../../common/services/process-data-service',
        'css!./comp_path_new.css'
    ],
    function(app, msgBox, tableModel, template, dataService) {
        "use strict";
        app.CompPathNewComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-path-new',
            dataAdaptor: undefined,
            messageBox: undefined,
            newFolderName: '',
            path:undefined,
            files:undefined,
            init: function() {
                this._super();
                this.columns = Ember.A();
                this.dataSource = Ember.A();
                this.messageBox = msgBox.create();
                this.dataAdaptor = dataService.create();
                if(this.parameters.path){
                    this.path = this.parameters.path;
                    this.files = this.parameters.files;
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
                    var valid = true;
                    this.files.forEach(function (item) {
                        if(item.name === this.newFolderName){
                            valid = false;
                        }
                    }.bind(this));
                    if(valid){
                        this._createFolder();
                    }else{
                        this.messageBox.showAlert('文件夹已经存在！');
                    }
                },
                cancelPath:function () {
                    this.sendAction('sendClose');
                }
            }
        });
    });