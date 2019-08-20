define(
    [
        'app',
        'text!./comp_echart_line.html',
        'common/components/comp_echart/comp_echart_base',
        'css!common/components/comp_echart/comp_echart.css'
    ],

    function (app, template, chartbase) {

        "use strict";

        app.CompEchartLineComponent = chartbase.extend({

            layout: Ember.ExtendHelper.compileEx(template),

            templateName: 'comp-echart-line',

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
                splitLine: {
                    show: false
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


            refreshFlagChanged: Ember.observer('refreshFlag', function () {
                this.notifyPropertyChange('datasource');
            }),

            themeChanged: Ember.observer('customTheme', function () {
                this.notifyPropertyChange('datasource');
            }),
             testA: Ember.observer('abserver', function () {
                 this.datasourceChanged();
             }),
            /**
             * 数据变化时更新图表
             */
            datasourceChanged: Ember.observer('datasource', function () {
                var data = this.get('datasource');
                if (data) {
                    var option = this.initialOption();
                     option.xAxis[0].data = [];
                    data.map(function (item) {
                        // item.data = item.data.sort(function (a, b) {
                        //     return a.name - b.name;
                        // });
                        item.data.map(function (item1) {
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
                                smooth: false,
                                symbol:'circle',
                                showSymbol: true,
                                symbolSize: 6,
                                animation: false,
                                animationDuration: 1,
                                lineStyle:{
                                    color:'red'
                                },
                                areaStyle: {},
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

            /**
             * 初始化配置
             */
            initialOption: function () {
               // var option = $.extend(true, {}, this.baseoption, this.get('customTheme') && this.get('customTheme').option);
                var option = this.baseoption;
                var splitY = this.get('splitY');
                if (splitY) {
                    option.yAxis[0].splitNumber = splitY;
                } else {
                    option.yAxis[0].splitNumber = 5;
                }

                return option;
            }
        });
    });