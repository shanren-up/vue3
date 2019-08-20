/*
 *****自定义silder组件
 */
define(
    [
        'app',
        'text!./common/components/comp_xslider/comp_xslider.html',
        'css!./common/components/comp_xslider/comp_xslider.css',
    ],
    function(app, template) {
        "use strict";
        app.CompXsliderComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: "comp-xslider",
            //初始化
            init: function() {
                this._super();
            },
            didInsertElement: function() {
                this._initXslider();
            },
            willDestroyElement: function() {},
            //字段
            //属性
            gallerySource: [],
            //方法
            _refreshData: Ember.observer('gallerySource', function() {
                if (this.get('gallerySource').length !== 0) {
                    return Ember.run.later(this, this._initXslider, 1000);
                }
            }),
            _initXslider: function() {
                var quicktasksWidth = this.$(".galleryAlbum:eq(0)").width()-this.$('.aleft:eq(0)').width()-this.$('.aright:eq(0)').width()-30;
                this.$(".scrollobj:eq(0)").width(quicktasksWidth);
                var ulContainerWidth = quicktasksWidth;
                var liWidth = this.$(".scrollobj:eq(0)").find("li").width()+15;
                var showCount = parseInt(ulContainerWidth/liWidth,10);
                var length = $(".galleryAlbum:eq(0)").find("li").length;
                var ulWidht = liWidth * length;
                var ulHeight = this.$(".scrollobj:eq(0)").find("li").height();
                var margin_top="{0}px".format((ulHeight-54)/2);
                $("#custom_xsilder_left_btn").css({ "margin-top": margin_top});
                $("#custom_xsilder_right_btn").css({ "margin-top": margin_top});
                $(".galleryAlbum:eq(0)").find("ul:eq(0)").width(ulWidht);
                $(".galleryAlbum:eq(0)").Xslider({
                    unitdisplayed: showCount,
                    numtoMove: 3,
                    scrollobjSize: ulWidht,
                    autoscroll:false
                });
            },
            //动作
            actions: {

            },
        });
    });