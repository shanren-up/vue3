define(
    [
        'app',
        'json!common/components/comp_echart/comp_echart_stackbar/cultureInfo.json',
        'text!./common/components/comp_echart/comp_echart_stackbar/comp_echart_stackbar.html',
        './common/components/comp_echart/comp_echart_base',
        'css!./common/components/comp_echart/comp_echart.css'
    ],

    function(app, cultureInfo, template, chartbase) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);

        app.CompEchartStackbarComponent = chartbase.extend({
            layout: Ember.ExtendHelper.compileEx(template),

            templateName: 'comp-echart-stackbar',

            init: function() {
                this._super();
            },

            didInsertElement: function() {
                this._super();
            },

            baseoption: {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: []
                },
                xAxis: [{
                    type: 'category',
                    data: []
                }],
                yAxis: [{
                    type: 'value',
                }],
                series: []
            },
            themeChanged: Ember.observer('customTheme', function() {
                this.notifyPropertyChange('datasource');
            }),
            datasourceChanged: Ember.observer('datasource', function() {
                var data = this.get('datasource');
                if (data) {
                    var option = this.initialOption();

                    for (var i = 0; i < data.length; i++) {
                        option.legend.data.push(data[i].title);
                        var dataobj = {
                            name: data[i].title,
                            type: 'bar',
                            stack: Ember.oloc('comp_echart_stackbar_zl'),
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false
                                    }
                                }
                            },
                            data: []
                        };
                        for (var j = 0; j < data[i].data.length; j++) {
                            if (option.xAxis[0].data.indexOf(data[i].data[j].name) === -1) {
                                option.xAxis[0].data.push(data[i].data[j].name);
                            }
                            dataobj.data.push(data[i].data[j].value);
                        }
                        option.series.push(dataobj);
                    }

                    this.setOption(option);
                }
            }).on('didInsertElement'),

            initialOption: function() {
                var option = $.extend(true, {}, this.baseoption, this.get('customTheme') && this.get('customTheme').option);

                var splitY = this.get('splitY');
                if (splitY) {
                    option.yAxis[0].splitNumber = splitY;
                } else {
                    option.yAxis[0].splitNumber = 4;
                }

                //顺序：左上右下
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