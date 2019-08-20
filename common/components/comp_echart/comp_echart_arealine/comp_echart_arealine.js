define(
    [
        'app',
        'text!./common/components/comp_echart/comp_echart_arealine/comp_echart_arealine.html',
        './common/components/comp_echart/comp_echart_base',
        'css!./common/components/comp_echart/comp_echart.css'
    ],

    function(app, template, chartbase) {

        "use strict";

        app.CompEchartArealineComponent = chartbase.extend({

            layout: Ember.ExtendHelper.compileEx(template),

            templateName: 'comp-echart-arealine',

            init: function() {
                this._super();
            },

            didInsertElement: function() {
                this._super();
            },

            baseoption: {
                title: {
                    text: ''
                },
                legend: {
                    data: []
                },
                grid: {
                    left: '1%',
                    right: '1%',
                    bottom: '1%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: '{b0}<br />{a0}:{c0}<br />{a1}:{c1}'
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap : false,
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
                series: [],
            },

            
            refreshFlagChanged: Ember.observer('refreshFlag', function() {
                this.notifyPropertyChange('datasource');
            }),

            themeChanged: Ember.observer('customTheme', function() {
                this.notifyPropertyChange('datasource');
            }),
            datasourceChanged: Ember.observer('datasource', function() {
                var data = this.get('datasource');
                if(data) {
                    var option = this.initialOption();
                    data.map(function(item, index) {
                        item.data = item.data.sort(function(a, b) {
                            return a.name - b.name;
                        });
                        item.data.map(function(item1, index1) {
                            if(option.xAxis[0].data.indexOf(item1.name) === -1) {
                                option.xAxis[0].data.addObject(item1.name);
                            }
                        });
                    });
                    for(var i = 0; i < data.length; i++) {
                        var dataobj = $.extend(true, {
                                name: data[i].legend,
                                type: 'line',
                                smooth: true,
                                showSymbol: false,
                                areaStyle: {
                                    normal: {}
                                },
                                data: []
                            },
                            this.get('customTheme') && this.get('customTheme').series);
                        dataobj.data = data[i].data;
                        option.legend.data.addObject(data[i].legend);
                        option.series.addObject(dataobj);
                    }

                    this.setOption(option);
                }
            }).on('didInsertElement'),

            initialOption: function() {
                var option = $.extend(true, {}, this.baseoption, this.get('customTheme') && this.get('customTheme').option);

                var splitY = this.get('splitY');
                if(splitY) {
                    option.yAxis[0].splitNumber = splitY;
                } else {
                    option.yAxis[0].splitNumber = 4;
                }

                return option;
            }
        });
    });