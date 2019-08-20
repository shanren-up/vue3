define(
    [
        'app',
        'configs',
        'text!./frame_code.html',
        'css!./frame_code.css',
        'frame/common/core/frame_core_helper',
    ],

    function (app, configs, template, css, frameCoreHelperIns) {

    "use strict";

    app.FrameCodeComponent = Ember.Component.extend({
            layout : Ember.ExtendHelper.compileEx(template),
            templateName : 'frame-code',
            _verifyCode : '',
            _verifyCodeArray : [],
            init : function () {
                this.freshVerifyCode();
                this._super();
            },
            willDestroyElement : function () {},
            didInsertElement : function () {},
            freshVerifyCode : function () {
                this.set('_verifyCode', frameCoreHelperIns.createCode());
                this.freshVerifyCodeArray();
            },
            validateCode : function (code) {
                return code.toUpperCase() !== this._verifyCode.toUpperCase();
            },
            getCodeColorStyle : function () {
                var color = frameCoreHelperIns.toRGB().color;
                var rotate = frameCoreHelperIns.getRandom(0, 60);
                return new Ember.Handlebars.SafeString('color:' + color + '; transform:rotate(' + rotate + 'deg)');
            },
            freshVerifyCodeArray : function () {
                var self = this;
                var tmpCodeArray = [];
                var str = this._verifyCode;
                for (var i = 0; i < str.length; i++) {
                    var style = self.getCodeColorStyle();
                    tmpCodeArray.push({
                        char : str.charAt(i),
                        style : style
                    });
                }

                this.set('_verifyCodeArray', tmpCodeArray);
            },
            click : function () {
                this.freshVerifyCode();
            },
            actions : {
                clickCode : function (result) {
                    this.freshVerifyCode();
                }
            }
        });
});
