define(
    [
        'app',
        'json!./cultureInfo.json',
        'text!./comp_multi_timepicker_demo.html',
        './comp_multi_timepicker.js'
    ],

    function(app, cultureInfo, template) {

        'use strict';

        app.CompMultiTimepickerDemoComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-multi-timepicker-demo',
            time: '1:00:30~2:00:30,10:00:30~12:00:30',
            currentTime: null,
            init: function() {
                this._super();
            },
            didInsertElement: function() {

            },
            willDestroyElement: function() {},
            showView: function() {
                this.findNames();
                this.childs.timepicker.showView();
            },
            actions: {
                query: function() {
                    this.findNames();
                    this.set('currentTime', this.childs.timepicker.getValue());
                },
                set: function() {
                    var str = prompt(Ember.oloc('comp_multi_timepicker_demo_srsj'), '1:00:30~2:00:30,10:00:30~12:00:30');
                    if (str) {
                        this.childs.timepicker.setValue(str);
                    }
                },
                valueChange: function(str) {
                    this.set('currentTime', str);
                }
            }
        });
    });