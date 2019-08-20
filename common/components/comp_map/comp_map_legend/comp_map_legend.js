define(
    [
        'app',
        'json!./cultureInfo.json',
        'text!./comp_map_legend.html',
        'css!./comp_map_legend.css',
        'css!./comp_map_legend_theme_default.css'
    ],

    function(app, cultureInfo, template) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);

        app.CompMapLegendComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-map-legend',
            init: function() {
                this._super();
            },
            isPoint: false,

            didInsertElement: function() {},
            willDestroy: function() {}
        });
    });
