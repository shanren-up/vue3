define(
    [
        'app',
        'text!./common/components/comp_echart/comp_echart_multistdbar/comp_echart_multistdbar.html',
        './common/components/comp_echart/comp_echart_base',
        'css!./common/components/comp_echart/comp_echart.css'
    ],

    function(app, template, chartbase) {

        "use strict";

        app.CompEchartMultistdbarComponent = chartbase.extend({

            layout: Ember.ExtendHelper.compileEx(template),

            templateName: 'comp-echart-multistdbar',

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
                    data: [],
                    splitLine: {
                        show: false
                    }
                }],
                yAxis: [{
                    type: 'value',
                    splitLine: {
                        show: false
                    }
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
                        var dataobj = $.extend(true, {
                            name: data[i].title,
                            type: 'bar',
                            data: []
                        }, this.get('customTheme') && this.get('customTheme').series);
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
                option.grid = {
                    top:10,
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                };
                return option;
            }
        });
    });