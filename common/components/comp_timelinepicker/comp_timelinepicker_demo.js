define(
    [
        'app',
        'text!./comp_timelinepicker_demo.html',
        './comp_timelinepicker'
    ],
    function (app, template) {

        "use strict";

        app.CompTimelinepickerDemoComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-timelinepicker-demo',
            rangtest1: null,
            rangtest2: null,
            rangtest3: null,
            init: function () {
                this._super();
            },
            didInsertElement: function () {
            },
            willDestroyElement: function () {
            },
            actions: {
                rangtestosc: function (i, value) {
                    this.set('rangtest' + i, value);
                }
            }
        });
    });
