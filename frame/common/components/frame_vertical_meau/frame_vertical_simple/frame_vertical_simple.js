define(
    [
        'app',
        'text!./frame_vertical_simple.html',
        'css!./frame_vertical_simple.css',
    ],

    function (app, template) {

        "use strict";

        app.FrameVerticalSimpleComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'frame-vertical-simple',
            classNames: ['frame-vertical-simple', 'absolute'],
            classNameBindings: ['meauHide'],
            meauHide: false,
            // 二级菜单高度
            meauHeight: 40,
            init: function () {
                this._super();
            },
            didInsertElement: function () {

            },
            willDestroyElement: function () {

            },
            actions: {
                clickMenuItem: function (item, isFirst) {
                    // 点击后收起菜单
                    this.send('tooltipHide');
                    // 隐藏菜单
                    this.set('meauHide', true);
                    // isFirst 是否第一级菜单
                    this.sendAction('clickMenuItem', item, isFirst);
                },
                mouseEnter: function (item, event) {
                    var meauItemOffsetTop = this.$(event.target).offset() && this.$(event.target).offset().top || 0,
                        meauItemHeight = this.$(event.target).height(),
                        bootomDistance = window.innerHeight - (meauItemOffsetTop + meauItemHeight),
                        childrenMenuLength = item.childViewMenus.filterBy('visible', true).length * (this.meauHeight || 40),
                        $subMeauContainer = this.$(event.target).find('.sub-meau-container');
                    if (bootomDistance - childrenMenuLength < 0) {
                        $subMeauContainer.css({
                            bottom: meauItemHeight - 1,
                            top: 'initial'
                        });
                    } else {
                        $subMeauContainer.css({
                            bottom: 'initial',
                            top: 'initial'
                        });
                    }
                    this.set('meauHide', false);
                    item.set('_hover', true);
                },
                mouseLeave: function (item, event) {
                    var $moveTo = this.$(event.relatedTarget);
                    if ($moveTo.is('.tooltip *')) {
                        return;
                    }
                    item.set('_hover', false);
                },
                tooltipHide: function () {
                    Ember.run.later(this, function () {
                        // 没有tootip时收起菜单
                        if (!$('.tooltip .frame-dropdown-meau-vertical').length) {
                            if (this.dataSource) {
                                this.dataSource.setEach('_hover', false);
                            }
                        }
                    }, 250);
                },
                tooltipShow: function (event) {
                    var index = $(event.target).parents('.item-container').data('index');
                    this.dataSource[index].set('_hover', true);
                },
            }
        });
    });