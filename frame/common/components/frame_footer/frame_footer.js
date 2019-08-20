define(
    [
        'app',
        'text!./frame_footer.html',
        'css!frame/common/components/frame_footer/frame_footer.css'
    ],

    function (app, template) {

    "use strict";

    app.FrameFooterComponent = Ember.Component.extend({
            layout : Ember.ExtendHelper.compileEx(template),
            init : function () {
                this._super();
            },
            didInsertElement : function () {
                $("#userEdit").hide();
                $("#navigation").hide();
            },
            actions : {
                showUser : function () {
                    $("#userEdit").show();
                },
                hideUser : function () {
                    $("#userEdit").hide();
                },
                showMenu : function () {
                    $("#navigation").show();
                },
                hideMenu : function () {
                    $("#navigation").hide();
                },
                transitionTo : function (para) {
                    this.sendAction('transitionTo', para);
                    $("#navigation").hide();
                },
                showHome : function () {
                    this.sendAction('tranTo', '');
                }
            }
        });

    // mouseEnter:function(event){
    // $(event.target)
    // },
});
