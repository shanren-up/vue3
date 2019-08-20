define(
    [
        'app',
        'echart',
        './comp_echart_dafulttheme',
        'json!./../../../configures/china.json',
        'json!./../../../configures/world.json',
    ],

    function (app, echart, theme, chinajson, worldjson) {

    "use strict";

    app.CompEchartCompontentBase = Ember.Component.extend({
            className : ['echart-component-div'],
            __mainchart__ : null,
            getChart : function () {
                return this.__mainchart__;
            },
            initMainChart : function () {
                if (!this.__mainchart__) {
                    var height = this.get('height') || $("#" + this.elementId).parent().height();
                    var width = this.get('width') || $("#" + this.elementId).parent().width();

                    if (height && width) {
                        var canvas = this.$('div')[0];
                        this.$('div').height(height);
                        this.$('div').width(width);
                        echart.registerTheme('bhz_theme', theme);
                        echart.registerMap('china', chinajson);
                        echart.registerMap('world', worldjson);
                        this.__mainchart__ = echart.init(canvas, 'bhz_theme');
                        this.datasourceChanged();
                    } else {
                        Ember.run.later(this, this.initMainChart, 100);
                    }
                }
            },

            getDefaultTheme : function () {
                var color = this.get('color') && this.get('color').split(',');
                if (color) {
                    var t = $.extend(true, {}, theme);
                    for (var i = 0; i < color.length; i++) {
                        t.color.unshift(color[i]);
                    }
                    return t;
                } else {
                    return theme;
                }
            },

            didInsertElement : function () {
                this.initMainChart();
            },

            handleResize : function (width, height) {
                if (0 === width && 0 === height) {
                    return;
                }
                var xnotresize = this.get('xNotResize');
                var ynotresize = this.get('yNotResize');
                if (xnotresize) {
                    this.$('div').width(this.get('width'));
                } else {
                    this.$('div').width(width);
                }

                if (ynotresize) {
                    this.$('div').height(this.get('height'));
                } else {
                    this.$('div').height(height);
                }

                if (this.getChart()) {
                    this.getChart().resize();
                }
            },

            setOption : function (option) {
                if (this.getChart()) {
                    this.getChart().setOption(option, true);
                }
            }
        });

    return app.CompEchartCompontentBase;
});
