define(
    [
        'app',
        'text!./frame_navigation.html',
        'css!./frame_navigation.css',
        'css!./frame_navigation_theme_default.css',
        '../frame_dropdown_menu/frame_dropdown_menu',
    ],

    function(app, template) {

        "use strict";

        app.FrameNavigationComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'frame-navigation',
            classNames: ['frame-navigation'],
            menuItems: [],
            init: function() {
                this._super();
            },
            didInsertElement: function() {},
            actions: {
                clickMenuItem: function(item) {
                    this.sendAction('clickMenuItem', item);
                }
            }
        });

    });