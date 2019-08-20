define(
    [
        'app',
        'text!./comp_echart_arealine.html',
        'common/components/comp_echart/comp_echart_base',
        'css!common/components/comp_echart/comp_echart.css'
    ],

    function (app, template, chartbase) {

        "use strict";

        app.CompEchartArealineComponent = chartbase.extend({

            layout: Ember.ExtendHelper.compileEx(template),

            templateName: 'comp-echart-arealine',

            init: function () {
                this._super();
            },

            didInsertElement: function () {
                this._super();
            },
            willDestroy: function () {
                this._super();
            },
            /**
             * 基础配置信息
             */
            baseoption: {
                title: {
                    left: 'center',
                    text: ''
                },
                legend: {
                    data: []
                },
                grid: {
                    top: '20%',
                    left: '10%',
                    right: '10%',
                    bottom: '20%',
                    containLabel: false
                },
                tooltip: {
                    trigger: 'axis'

                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: [],
                    axisLine :{
                        lineStyle:{
                            color:'#898585'
                        }
                    },
                    splitLine: {
                        show: false
                    }

                }],
                yAxis: [{
                    type: 'value',
                                      max: 100,
                    min: 0,
                    axisLine :{
                        lineStyle:{
                            color:'#898585'
                        }
                    },
                    splitLine: {
                        show: false
                    }
                }],
                series: []
            },
            /**
             * 刷新标识，改变后刷新echart数据
             */
            refreshFlagChanged: Ember.observer('refreshFlag', function () {
                this.notifyPropertyChange('datasource');
            }),
            /**
             * 主题变更后刷新echart数据
             */
            themeChanged: Ember.observer('customTheme', function () {
                this.notifyPropertyChange('datasource');
            }),
            testA: Ember.observer('abserver', function () {
                this.datasourceChanged();
            }),
            datasourceChanged: Ember.observer('datasource', function () {
                var data = this.get('datasource');
                if (data) {
                    var option = this.initialOption();
                    option.xAxis[0].data =[];
                    data.map(function (item, index) {
                        item.data.map(function (item1, index1) {
                            if (option.xAxis[0].data.indexOf(item1.name) === -1) {
                                option.xAxis[0].data.addObject(item1.name);
                            }
                        });
                    });
                    option.title.text = '';
                    option.series = [];
                    for (var i = 0; i < data.length; i++) {
                        var dataobj = $.extend(true, {
                                name: data[i].legend,
                                type: 'line',
                                smooth: true,
                                showSymbol: false,
                                lineStyle:{
                                    normal: {
                                        color: '#52707b',
                                        opacity:0.5
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0, color: '#1d97d2' // 0% 处的颜色
                                            }, {
                                                offset: 1, color: '#a1abac' // 100% 处的颜色
                                            }]
                                        }
                                    }
                                },
                                data: []
                            }, {}
                        );
                        dataobj.data = data[i].data;
                        option.title.text = data[i].title;
                        option.series.addObject(dataobj);
                    }
                    this.setOption(option);
                }
            }).on('didInsertElement'),

            initialOption: function () {
                var option = this.baseoption;

                var splitY = this.get('splitY');
                if (splitY) {
                    option.yAxis[0].splitNumber = splitY;
                } else {
                    option.yAxis[0].splitNumber = 4;
                }

                return option;
            }
        });
    });