define(
    [
        'app',
        'json!common/components/comp_echart/comp_echart_gradbar/cultureInfo.json',
        'text!./common/components/comp_echart/comp_echart_gradbar/comp_echart_gradbar.html',
        './common/components/comp_echart/comp_echart_base',
        'css!./common/components/comp_echart/comp_echart.css'
    ],

    function(app, cultureInfo, template, chartbase) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);

        app.CompEchartGradbarComponent = chartbase.extend({
            layout: Ember.ExtendHelper.compileEx(template),

            templateName: 'comp-echart-gradbar',

            init: function() {
                this._super();
            },

            didInsertElement: function() {
                this._super();
            },

            baseoption: {
                xAxis: [{
                    type: 'category',
                    data: []
                }],
                yAxis: [{
                    type: 'value'
                }],
                series: [{
                    type: 'bar',
                    data: [],
                    itemStyle: {
                        normal: {}
                    },
                    markPoint: {
                        itemStyle: {
                            normal: {}
                        },
                        data: [{
                            type: 'max',
                            name: Ember.oloc('comp_echart_gradbar_zdz')
                        }, ]
                    }
                }]
            },

            datasourceChanged: Ember.observer('datasource', function() {
                var data = this.get('datasource');
                if (data) {
                    var option = this.initialOption();
                    for (var i = 0; i < data.length; i++) {
                        option.xAxis[0].data.push(data[i].name);
                        option.series[0].data.push(data[i].value);
                    }

                    this.setOption(option);
                }
            }).on('didInsertElement'),

            initialOption: function() {
                var option = $.extend(true, {}, this.baseoption);

                var height = this.get('height');
                var barcolor = this.get('color');
                if (barcolor) {
                    option.series[0].markPoint.itemStyle.normal.color = barcolor;
                    option.series[0].itemStyle.normal.color = (function() {
                        var zrColor = zrender.tool.color;
                        return zrColor.getLinearGradient(
                            0, 0, 0, height, [
                                [0, barcolor],
                                [1, '#FFFFFF']
                            ]);
                    })();
                }

                var splitY = this.get('splitY');
                if (splitY) {
                    option.yAxis[0].splitNumber = splitY;
                } else {
                    option.yAxis[0].splitNumber = 4;
                }

                var padding = this.get('padding');
                if (padding && padding.split(',').length === 4) {
                    var p = padding.split(',');
                    option.grid = {
                        x: parseInt(p[0], 10),
                        y: parseInt(p[1], 10),
                        x2: parseInt(p[2], 10),
                        y2: parseInt(p[3], 10),
                    };
                }

                return option;
            }
        });
    });