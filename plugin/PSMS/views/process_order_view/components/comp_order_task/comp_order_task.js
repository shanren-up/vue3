define(
    [
        'app',
        'common/components/comp_msgbox/comp_msgbox',
        'text!./comp_order_task.html',
        '../../../../common/services/process-data-service',
        'json!../../../../config/properties.json',
        'comp_modal',
        '../../../../components/comp_path_dialog/comp_path_dialog',
        'css!./comp_order_task.css'
    ],
    function (app, msgBox, template, dataService, proConfig, modal) {
        "use strict";
        app.CompOrderTaskComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-order-task',
            messageBox: undefined,
            dataAdaptor: undefined,
            result: undefined,
            init: function () {
                this._super();
                this.dataAdaptor = dataService.create();
                this.messageBox = msgBox.create();
                if (this.parameters && this.parameters.data) {

                }
                this.productLevels = proConfig.productLevel;
                this.finalProductLevels = proConfig.finelProductLevel;
                this.productTypes = proConfig.productType;
                this.result = {
                    productLevel: this.productLevels[0],
                    finalProductLevel: this.finalProductLevels[0],
                    productType: this.productTypes[0].id,
                    priority: '',
                    tifPath: '',
                    outputPath: '',
                    taskId: ''
                };

                this._initData();
            },
            didInsertElement: function () {
                this.findNames();

            },
            didUpdate: function () {
            },
            willDestroyElement: function () {
                this._super();
                if (this.messageBox) {
                    this.messageBox = null;
                }
                if (this.dataAdaptor) {
                    this.dataAdaptor.destroy();
                    this.dataAdaptor = null;
                }
            },
            _initData: function () {

            },
            _validInfo: function () {
                var result = Ember.Object.create({
                    status: true,
                    des: ''
                });
                if (Ember.isEmpty(this.result.tifPath)) {
                    result.set('status', false);
                    result.set('des', '输入文件夹不能为空！');
                    return result;
                }
                if (Ember.isEmpty(this.result.outputPath)) {
                    result.set('status', false);
                    result.set('des', '输出文件夹不能为空！');
                    return result;
                }
                return result;
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
                            if (this.parameters.type === 'orginal') {
                                Ember.set(_self.result, 'tifPath', this.parameters.data);
                            }
                            if (this.parameters.type === 'result') {
                                Ember.set(_self.result, 'outputPath', this.parameters.data);
                            }
                        }
                    },
                    close: function () { //获取传递参数
                    }
                });
            },
            actions: {
                productLevelChange: function () {
                    Ember.set(this.result, 'productLevel', event.target.value);
                },
                finalProductLevelChange: function () {
                    Ember.set(this.result, 'finalProductLevel', event.target.value);
                },
                productTypeChange: function () {
                    Ember.set(this.result, 'productType', event.target.value);
                },
                confirmUserInfo: function () {
                    var result = this._validInfo();
                    if (!result.status) {
                        this.messageBox.showError(result.des);
                        return;
                    }
                    Ember.set(this.result, 'priority', this.$('#priority').val());
                    this.dataAdaptor.getRestfulData(this.result, 'postTask', function (result) {
                        if (result.info === 'OK') {
                            this.messageBox.showSuccess('创建成功！');
                            this.parameters = {orderTask:true} ;
                            this.sendAction('sendConfirm');
                        } else {
                            this.messageBox.showError('创建失败！');
                        }
                    }.bind(this), 'taskHost');
                },
                cancelUserInfo: function () {
                    this.sendAction('sendClose');
                },
                selectFolder: function (type) {
                    var path;
                    if (type === 'orginal') {
                        path = proConfig.fileDir.origDir;
                    }
                    if (type === 'result') {
                        path = proConfig.fileDir.resultDir;
                    }
                    this._openWindow('文件浏览', 'comp-path-dialog', {path: path, type: type});
                }
            }
        });
    });