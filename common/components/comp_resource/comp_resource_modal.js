define(
    [
        'comp_modal',
        'json!./cultureInfo.json'
    ],
    function(modal, cultureInfo) {
        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);
        return Ember.Object.extend({
            /*调用资源管理查看/修改页面
                               修改传参：
            var param0 = {
                        targetObject: this,
                        resourceType: 'program_info',
                        resourceName: Ember.oloc('comp_resource_modal_cs'),
                        primaryKeyList: [{
                            key: 'int_id',
                            value: '101',
                        }],
                        operateType: 'modify'
                    };
                               查看传参：
            var param1 = {
                targetObject: this,
                resourceType: 'program_info',
                resourceName: Ember.oloc('comp_resource_modal_cs'),
                primaryKeyList: [{
                    key: 'int_id',
                    value: '101',
                }],
                operateType: 'see'
            };*/
            showResourceModal: function(originalParam) {
                if (!originalParam || !originalParam.resourceType || !originalParam.resourceName || !originalParam.primaryKeyList || !originalParam.targetObject) {
                    console.error(Ember.oloc('comp_resource_modal_csyc！wfdyzyck/xgym。'));
                    return;
                }
                var param = {
                    resourceType: originalParam.resourceType, //资源类型
                    resourceName: originalParam.resourceName, //资源名称
                    primaryKeyList: originalParam.primaryKeyList, //主键列表
                    operateType: originalParam.operateType || 'see' //操作类型
                };
                var targetObject = originalParam.targetObject;
                require(['plugin/grms/views/grms_overview_view/grms_resourceinfo_view/grms_resourceinfo_view'], function() {
                    modal.popup({
                        targetObject: targetObject, //父对象，支持弹出多层
                        isDefaultStyle: true, //是否默认样式
                        sizeClass: 'grms-resourceinfo-view-size', //弹出框大小:large、small，或自定义整体样式
                        bodyClass: 'comp-modal-body grms-resourceinfo-view-body', //自定义内容样式
                        hasHeader: false, //是否有头部，默认true
                        headerText: '',
                        hasMax: false,
                        hasPhoto: false,
                        contentComponentName: 'grms-resourceinfo-view', //内容组件
                        parameters: param, //内容传递参数
                        hasFooter: false,
                        confirmText: '关闭', //底部按钮名称
                        enforceModality: true
                    });
                });
            }
        });
    });