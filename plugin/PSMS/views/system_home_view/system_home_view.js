define(
    [
        'app',
        'text!./system_home_view.html',
        'css!./system_home_view.css'
    ],
    function(app, template) {
        "use strict";
        app.SystemHomeViewComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'system-home-view',

            init: function() {
                this._super();
            },
            didInsertElement: function() {
                this.findNames();
            },
            didUpdate: function() {},

            willDestroyElement: function() {
            },
            actions: {
            }
        });
    });