define(
    [
        'app',
        'text!./frame_vertical_default.html',
        'css!./frame_vertical_default.css',
    ],

    function(app, template) {

        "use strict";

        app.FrameVerticalDefaultComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'frame-vertical-default',
            classNames: ['frame-vertical-default', 'absolute'],
            init: function() {
                this._super();
            },
            didInsertElement: function() {
            	console.log();
            },
            willDestroyElement: function() {

            },
            _hideChildMeau: function(targetId) {
                var child = this.childViews.findBy('targetId', targetId);
                if (child && child.hideMeau) {
                    child.hideMeau();
                }
            },
            actions: {
                clickMenuItem: function(item, isFirst, targetId) {
                    if (!isFirst && targetId && item.childViewMenus && item.childViewMenus.length) {
                        this._hideChildMeau(targetId);
                    }
                    this.sendAction('clickMenuItem', item, isFirst);
                }
            }
        });
    });