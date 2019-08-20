define(
    [
        'app',
        'json!./cultureInfo.json',
        'bootbox',
        'css!./comp_map_msgbox.css',
        'css!./comp_map_msgbox_theme_default.css'
    ],

    function(app, cultureInfo, bootbox, template) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);

        app.CompMapMsgBoxComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-map-msgbox',
            init: function() {
                this._super();
                bootbox.setDefaults("locale", "zh_CN");
                bootbox.addLocale("zh_CN", {
                    OK: Ember.oloc('comp_map_msgbox_qd'),
                    CANCEL: Ember.oloc('comp_map_msgbox_qx'),
                    CONFIRM: Ember.oloc('comp_map_msgbox_qd')
                });
            },

            didInsertElement: function() {

            },

            /*
             * 弹出警告框
             * 举例：
             * var msgbox = comp-map-msgbox.create();
             * msgbox.showAlert("Hello world!");
             */
            showAlert: function(message, callback) {
                bootbox.dialog({
                    title: "",
                    buttons: {
                        ok: {
                            label: Ember.oloc('comp_map_msgbox_qd'),
                            className: 'bhz-global-button-active comp-map-msgbox-button',
                            callback: function() {
                                if (callback) {
                                    callback(true);
                                }
                            }
                        }
                    },
                    message: "<img class='comp-map-msgbox-img' src='img/alert.png'><span class='comp-map-msgbox-span'> " + message + "</span>",
                    animate: false
                });
            },

            /*
             * 弹出确认框
             * 举例：
             * var msgbox = comp-map-msgbox.create();
             * msgbox.showConfirm(
                    "Hello world!",
                    function(result){
                        if(result) {  
                            alert(Ember.oloc('comp_map_msgbox_djqran!'));  
                        } else {  
                            alert(Ember.oloc('comp_map_msgbox_djqxan!'));  
                        } 
                    });
             */
            showConfirm: function(message, callback) {
                bootbox.dialog({
                    title: "",
                    buttons: {
                        ok: {
                            label: Ember.oloc('comp_map_msgbox_qd'),
                            className: 'bhz-global-button-active comp-map-msgbox-button',
                            callback: function() {
                                if (callback) {
                                    callback(true);
                                }
                            }
                        },
                        cancel: {
                            label: Ember.oloc('comp_map_msgbox_qx'),
                            className: 'bhz-global-button comp-map-msgbox-button',
                            callback: function() {
                                if (callback) {
                                    callback(false);
                                }
                            }
                        }
                    },
                    message: "<img class='comp-map-msgbox-img' src='img/alert.png'><span class='comp-map-msgbox-span'> " + message + "</span>",
                    animate: false
                });
            },

            /*
             * 弹出成功框
             * 举例：
             * var msgbox = comp-map-msgbox.create();
             * msgbox.showSuccess(
                     "Hello world!",
                    function(result){
                        if(result) {  
                            alert(Ember.oloc('comp_map_msgbox_djqran!'));  
                        } else {  
                            alert(Ember.oloc('comp_map_msgbox_djqxan!'));  
                        } 
                    }
                );
             */
            showSuccess: function(message, callback) {
                bootbox.dialog({
                    title: "",
                    buttons: {
                        ok: {
                            label: Ember.oloc('comp_map_msgbox_qd'),
                            className: 'bhz-global-button-active comp-map-msgbox-button',
                            callback: function() {
                                if (callback) {
                                    callback(true);
                                }
                            }
                        }
                    },
                    message: "<img class='comp-map-msgbox-img' src='img/success.png'><span class='comp-map-msgbox-span'> " + message + "</span>",
                    animate: false
                });
            },

            /*
             * 弹出失败框
             * 举例：
             * var msgbox = comp-map-msgbox.create();
             * msgbox.showFailure(
                    "Hello world!", 
                    function(result){
                        if(result) {  
                            alert(Ember.oloc('comp_map_msgbox_djzsan!'));  
                        } else {  
                            alert(Ember.oloc('comp_map_msgbox_djqxan!'));  
                        } 
                    }
                );
             */
            showFailure: function(message, callback) {
                bootbox.dialog({
                    title: "",
                    buttons: {
                        retry: {
                            label: Ember.oloc('comp_map_msgbox_zs'),
                            className: 'bhz-global-button-active comp-map-msgbox-button',
                            callback: function() {
                                if (callback) {
                                    callback(true);
                                }
                            }
                        },
                        cancel: {
                            label: Ember.oloc('comp_map_msgbox_qx'),
                            className: 'bhz-global-button comp-map-msgbox-button',
                            callback: function() {
                                if (callback) {
                                    callback(false);
                                }
                            }
                        }
                    },
                    message: "<img class='comp-map-msgbox-img' src='img/error.png'><span class='comp-map-msgbox-span'> " + message + "</span>",
                    animate: false
                });
            },

            /*
             * 弹出错误框
             * 举例：
             * var msgbox = comp-map-msgbox.create();
             * msgbox.showError(
                    "Hello world!", 
                    function(result){
                        if(result) {  
                            alert(Ember.oloc('comp_map_msgbox_djqdan!'));  
                        } else {  
                            alert(Ember.oloc('comp_map_msgbox_djqxan!'));  
                        } 
                    }
                );
             */
            showError: function(message, callback) {
                bootbox.dialog({
                    title: "",
                    buttons: {
                        ok: {
                            label: Ember.oloc('comp_map_msgbox_qd'),
                            className: 'bhz-global-button-active comp-map-msgbox-button',
                            callback: function() {
                                if (callback) {
                                    callback(true);
                                }
                            }
                        }
                    },
                    message: "<img class='comp-map-msgbox-img' src='img/error.png'><span class='comp-map-msgbox-span'> " + message + "</span>",
                    animate: false
                });
            },

            /*
             * 弹出自定义对话框
             * 举例：
             * var msgbox = comp-map-msgbox.create();
             * msgbox.showDialog({
                    message:"Hello world!", 
                    title:Ember.oloc('comp_map_msgbox_nh！'),
                    function(result){}
                });
             */
            showDialog: function(options) {
                bootbox.dialog(
                    options
                );
            }
        });

        //返回弹出框组件类
        return app.CompMapMsgBoxComponent;
    });