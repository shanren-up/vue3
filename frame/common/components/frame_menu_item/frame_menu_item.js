define(
    [
        'app',
        'text!./frame_menu_item.html',
        'configs',
        'css!./frame_menu_item.css',
        'css!./frame_menu_item_theme_default.css',
        '../frame_dropdown_menu/frame_dropdown_menu'
    ],

    function(app, template, configs) {

        'use strict';

        app.FrameMenuItemComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            mouseState: true,
            init: function() {
                this._super();
            },
            didInsertElement: function() {},
            showDropDownMeau: Ember.computed(function() {
                if (configs.meauType === 4 && !Ember.isEmpty(this.get('item.childViewMenus'))) {
                    return true;
                }
                return false;
            }),
            isLink: Ember.computed('item', function() {
                return this.get('item.viewtype') === 2;
            }),
            nameAlias: Ember.computed('item', function() {
                return Ember.ExtendHelper.cutstr(this.olocMeauName(this.get('item')), 8);
            }),
            actions: {
                clickMenuItem: function(item) {
                    this.sendAction('clickMenuItem', item);
                }
            }
        });
        app.FrameDropdownMenuHeaderComponent = app.FrameDropdownMenuComponent.extend({
            classNames: ['frame-dropdown-meau-header'],
            _timer: null,
            didInsertElement: function() {
                this._timer = Ember.run.later(this, this.setTooltipMenus, 500);
            },
            willDestroyElement: function() {
                // 注销事件
                if (this._timer) {
                    Ember.run.cancel(this._timer);
                    this._timer = null;
                }
            },
            setTooltipMenus: function() {
                this._timer = null;
                // Xslider 组件会在ul加上left:0 去掉
                this.$('ul').removeAttr('style');
                if (this.childViewMenus && this.childViewMenus.length > 0) {
                    $('#' + this.targetId + ' .frame-menu-item-bg').delayTooltip({
                        template: '<div class="tooltip frame-dropdown-meau-header-tootip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
                        animation: true,
                        html: true,
                        placement: 'bottom',
                        container: 'body',
                        title: this.element
                    });
                }
            },
        });
        return app.FrameMenuItemComponent;
    });