define(
    [
        'app',
        'text!./frame_dropdown_menu.html',
        'css!./frame_dropdown_menu.css',
        'css!./frame_dropdown_menu_theme_default.css',
        'delayTooltip'
    ],

    function(app, template) {

        'use strict';

        app.FrameDropdownMenuComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'frame-dropdown-menu',
            childViewMenus: [],
            init: function() {
                this._super();
            },
            didInsertElement: function() {
                // Ember.run.later(this, this.setTooltipMenus, 1500);
                // 去掉无意义的延时
                this.setTooltipMenus();
            },
            setTooltipMenus: function() {
                if (this.childViewMenus && this.childViewMenus.length > 0) {
                    $('[href=' + this.targetId + ']').delayTooltip({
                        animation: true,
                        html: true,
                        placement: 'bottom',
                        container: 'body',
                        title: this.element
                    });
                }
            },
            actions: {
                clickMenuItem: function(item) {
                    $("div[id*='delayTooltip']").css('display', 'none');
                    this.sendAction('clickMenuItem', item);
                }
            }
        });

    });