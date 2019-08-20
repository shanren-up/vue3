define(
    [
        'app',
        'common/components/comp_msgbox/comp_msgbox',
        'text!./comp_flow_param.html',
        'json!./../../config/properties.json',
        'comp_modal',
        './../comp_path_dialog/comp_path_dialog',
        'css!./comp_flow_param.css'
    ],
    function(app, msgBox, template,cofPro,modal) {

        "use strict";

        app.CompFlowParamComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-flow-param',
            messageBox: null,
            paramData:undefined,
            flowModules:undefined,
            folderUrl:undefined,
            paraIndex:undefined,
            folderIndex:undefined,
            showBtn:false,
            init: function() {
                this._super();
                this.messageBox = msgBox.create();
                if(this.parameters){
                    this.paramData = this.parameters;
                    this.set('showBtn',this.paramData.showBtn);
                }
                this.flowModules = [];
                this.folderUrl =  cofPro.fileDir.origDir;
            },
            didInsertElement: function() {
                this.findNames();
                this._initData();
            },
            didUpdate: function() {},

            willDestroyElement: function() {
                this._super();
                if(this.messageBox){
                    this.messageBox = null;
                }
            },
            /**
             * 初始化数据，数据来源为流程模板的模块参数
             * @private
             */
            _initData: function() {
                if(this.paramData){
                    this.set('flowModules',this.paramData.modules);
                }
            },
            /**
             * 添加一个工具时，增加对应的参数
             * @param module
             */
            addModule:function(module){
                this.flowModules.pushObject(module);
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
                            Ember.set(_self.flowModules[_self.folderIndex].Userproperty.InputParameter.Configuration[_self.paraIndex],'value',this.parameters.data );
                        }
                    },
                    close: function () { //获取传递参数
                    }
                });
            },
            /**
             * 数据变化时更新组件
             */
            dataSourceChange: Ember.observer('flowModules', function () {
                //this.set('flowModules',this.flowModules);
            }),
            actions: {
                /**
                 * userproperty下拉框参数选择
                 * @param index
                 * @param index1
                 */
                paramSelectChange:function(index,index1){
                    if(index !== undefined && index1 !== undefined){
                        Ember.set(this.flowModules[index].Userproperty.InputParameter.Configuration[index1],'value',parseInt(event.target.value) );
                    }
                },
                /**
                 * systemproperty下拉框参数选择
                 * @param index
                 * @param index1
                 */
                sysSelectChange:function(index,index1){
                    if(index !== undefined && index1 !== undefined){
                        Ember.set(this.flowModules[index].Systemproperty.SystemConfiguration[index1],'value',parseInt(event.target.value) );
                    }
                },
                /**
                 * 打开文件浏览框
                 * @param index
                 * @param index2
                 */
                selectFolder:function(index,index2){
                    this.folderIndex = index;
                    this.paraIndex = index2;
                    this._openWindow('文件浏览', 'comp-path-dialog', {path: this.folderUrl});
                },
                /**
                 * 确认事件，在任务预览中动态修改参数时调用
                 */
                confirmParam:function () {
                    this.flowModules.forEach(function (item) {
                        item.Systemproperty.SystemConfiguration.forEach(function (sysItem) {
                            if (sysItem.type === 'int') {
                                // sysItem.value = parseInt( sysItem.value);
                                Ember.set(sysItem, 'value', parseInt(sysItem.value));
                            }
                            if (sysItem.type === 'float') {
                                // sysItem.value = parseFloat( sysItem.value);
                                Ember.set(sysItem, 'value', parseFloat(sysItem.value));
                            }
                        });
                        item.Userproperty.InputParameter.Configuration.forEach(function (userItem) {
                            if (userItem.type === 'int') {
                                // userItem.value = parseInt( userItem.value);
                                Ember.set(userItem, 'value', parseInt(userItem.value));
                            }
                            if (userItem.type === 'float') {
                                //userItem.value = parseFloat( userItem.value);
                                Ember.set(userItem, 'value', parseFloat(userItem.value));
                            }
                            if (userItem.type === 'select') {
                                //userItem.value = parseFloat( userItem.value);
                                Ember.set(userItem, 'value', parseInt(userItem.value));
                            }
                        });
                    }.bind(this));
                    this.sendAction('sendConfirm');
                },
                /**
                 * 取消事件，在任务预览中动态修改参数时调用
                 */
                cancleParam:function () {
                    this.sendAction('sendClose');
                }
            }
        });
    });