define(
    [
        'app',
        'json!./cultureInfo.json',
        'bootbox',
        'css!./comp_msgbox.css',
        'css!./comp_msgbox_theme_default.css'
    ],

    function(app, cultureInfo, bootbox, template) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);

        app.CompMsgBoxComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-msgbox',
            /*
             * 配置项 可覆盖默认配置
             * 使用说明 msgbox.create({options:/配置对象/})
             * // default language
             * locale: "en",
             * // show backdrop or not. Default to static so user has to interact with dialog
             * backdrop: "static",
             * // animate the modal in/out
             * animate: true,
             * // additional class string applied to the top level dialog
             * className: null,
             * // whether or not to include a close button
             * closeButton: true,
             * // show the dialog immediately by default
             * show: true,
             * // dialog container
             * container: "body"
             */
            options: null,
            init: function() {
                this._super();
                bootbox.setDefaults("locale", "zh_CN");
                bootbox.addLocale("zh_CN", {
                    OK: Ember.oloc('comp_msgbox_qd'),
                    CANCEL: Ember.oloc('comp_msgbox_qx'),
                    CONFIRM: Ember.oloc('comp_msgbox_qd')
                });
                if (this.options) {
                    bootbox.setDefaults(this.options);
                }
            },

            didInsertElement: function() {

            },

            /*
             * 弹出警告框
             * 举例：
             * var msgbox = comp_msgbox.create();
             * msgbox.showAlert("Hello world!");
             */
            showAlert: function(message, callback) {
                bootbox.dialog({
                    title: "",
                    buttons: {
                        ok: {
                            label: Ember.oloc('comp_msgbox_qd'),
                            className: 'comp-msgbox-button-active comp-msgbox-button',
                            callback: function() {
                                if (callback) {
                                    callback(true);
                                }
                            }
                        }
                    },
                    message: "<img class='comp-msgbox-img' src='img/alert.png'><span class='comp-msgbox-span'> " + message + "</span>",
                    animate: false
                });
            },

            /*
             * 弹出确认框
             * 举例：
             * var msgbox = comp_msgbox.create();
             * msgbox.showConfirm(
                    "Hello world!",
                    function(result){
                        if(result) {  
                            alert(Ember.oloc('comp_msgbox_djqran!'));  
                        } else {  
                            alert(Ember.oloc('comp_msgbox_djqxan!'));  
                        } 
                    });
             */
            showConfirm: function(message, callback) {
                bootbox.dialog({
                    title: "",
                    buttons: {
                        ok: {
                            label: Ember.oloc('comp_msgbox_qd'),
                            className: 'comp-msgbox-button-active comp-msgbox-button',
                            callback: function() {
                                if (callback) {
                                    callback(true);
                                }
                            }
                        },
                        cancel: {
                            label: Ember.oloc('comp_msgbox_qx'),
                            className: 'global-button comp-msgbox-button',
                            callback: function() {
                                if (callback) {
                                    callback(false);
                                }
                            }
                        }
                    },
                    message: "<img class='comp-msgbox-img' src='img/alert.png'><span class='comp-msgbox-span'> " + message + "</span>",
                    animate: false
                });
            },

            /*
             * 弹出成功框
             * 举例：
             * var msgbox = comp_msgbox.create();
             * msgbox.showSuccess(
                     "Hello world!",
                    function(result){
                        if(result) {  
                            alert(Ember.oloc('comp_msgbox_djqran!'));  
                        } else {  
                            alert(Ember.oloc('comp_msgbox_djqxan!'));  
                        } 
                    }
                );
             */
            showSuccess: function(message, callback) {
                bootbox.dialog({
                    title: "",
                    buttons: {
                        ok: {
                            label: Ember.oloc('comp_msgbox_qd'),
                            className: 'comp-msgbox-button-active comp-msgbox-button',
                            callback: function() {
                                if (callback) {
                                    callback(true);
                                }
                            }
                        }
                    },
                    message: "<img class='comp-msgbox-img' src='img/success.png'><span class='comp-msgbox-span'> " + message + "</span>",
                    animate: false
                });
            },

            /*
             * 弹出失败框
             * 举例：
             * var msgbox = comp_msgbox.create();
             * msgbox.showFailure(
                    "Hello world!", 
                    function(result){
                        if(result) {  
                            alert(Ember.oloc('comp_msgbox_djzsan!'));  
                        } else {  
                            alert(Ember.oloc('comp_msgbox_djqxan!'));  
                        } 
                    }
                );
             */
            showFailure: function(message, callback) {
                bootbox.dialog({
                    title: "",
                    buttons: {
                        retry: {
                            label: Ember.oloc('comp_msgbox_zs'),
                            className: 'comp-msgbox-button-active comp-msgbox-button',
                            callback: function() {
                                if (callback) {
                                    callback(true);
                                }
                            }
                        },
                        cancel: {
                            label: Ember.oloc('comp_msgbox_qx'),
                            className: 'global-button comp-msgbox-button',
                            callback: function() {
                                if (callback) {
                                    callback(false);
                                }
                            }
                        }
                    },
                    message: "<img class='comp-msgbox-img' src='img/error.png'><span class='comp-msgbox-span'> " + message + "</span>",
                    animate: false
                });
            },

            /*
             * 弹出错误框
             * 举例：
             * var msgbox = comp_msgbox.create();
             * msgbox.showError(
                    "Hello world!", 
                    function(result){
                        if(result) {  
                            alert(Ember.oloc('comp_msgbox_djqdan!'));  
                        } else {  
                            alert(Ember.oloc('comp_msgbox_djqxan!'));  
                        } 
                    }
                );
             */
            showError: function(message, callback) {
                bootbox.dialog({
                    title: "",
                    buttons: {
                        ok: {
                            label: Ember.oloc('comp_msgbox_qd'),
                            className: 'comp-msgbox-button-active comp-msgbox-button',
                            callback: function() {
                                if (callback) {
                                    callback(true);
                                }
                            }
                        }
                    },
                    message: "<img class='comp-msgbox-img' src='img/error.png'><span class='comp-msgbox-span'> " + message + "</span>",
                    animate: false
                });
            },

            /*
             * 弹出自定义对话框
             * 举例：
             * var msgbox = comp_msgbox.create();
             * msgbox.showDialog({
                    message:"Hello world!", 
                    title:Ember.oloc('comp_msgbox_nh！'),
                    function(result){}
                });
             */
            showDialog: function(options) {
                bootbox.dialog(
                    options
                );
            },
            /** 关闭所有当前打开的msgbox 
             *  
             */
            hideAll: function() {
                bootbox.hideAll();
            }
        });

        //返回弹出框组件类
        return app.CompMsgBoxComponent;
    });