/*
 * datasource实例，都有默认值需要修改是传参数，修改其他配置传customTheme.option
 *datasource={
 *  startAngle:180,
 *  endAngle:0,
 *  barWidth: 20,
 *  value: 0.3,//0-1
 *  color: '#F37B1D',
 *  bgColor: "#9FBDE5",
 *  showDetail: true,
 *  //默认与color一致，不一致时传参数
 *  textColor: '#F37B1D',
 *  fontSize: 50,
 *}
 */
define(
    [
        'app',
        'json!common/components/comp_echart/comp_echart_circlebar/cultureInfo.json',
        'text!./comp_echart_circlebar.html',
        'common/components/comp_echart/comp_echart_base',
        'css!./common/components/comp_echart/comp_echart.css'
    ],

    function(app, cultureInfo, template, chartbase) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);

        app.CompEchartCirclebarComponent = chartbase.extend({

            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-echart-circlebar',
            init: function() {
                this._super();
            },
            didInsertElement: function() {
                this._super();
            },
            baseoption: {
                tooltip: {
                    formatter: "{a} <br/>{b} : {c}%"
                },
                // toolbox: {
                //     feature: {
                //         restore: {},
                //         saveAsImage: {}
                //     }
                // },
                series: [{
                    name: '',
                    type: "gauge",
                    // 开始角度以向右水平为开始
                    startAngle: 180,
                    // 结束角度以向右水平为开始
                    endAngle: 0,
                    axisLine: {
                        lineStyle: {
                            color: [
                                [0.31, "#F37B1D"],
                                [1, "#9FBDE5"]
                            ],
                            width: 20
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                    splitLine: {
                        show: false
                    },
                    pointer: {
                        width: 0
                    },
                    detail: {
                        show: true,
                        formatter: "{value}%",
                        offsetCenter: [0, 0],
                        textStyle: {
                            fontSize: 50,
                            color: "#0079EC"
                        }
                    },
                    title: {
                        show: false,
                        // offsetCenter: [0, "-40%"],
                        // textStyle: {
                        //     color: '#',
                        //     fontFamily: 'microsoft yahei',
                        //     fontSize: 14,
                        // },
                    },
                    data: [{
                        value: 50,
                        name: Ember.oloc('comp_echart_circlebar_wcl')
                    }]
                }]
            },
            refreshFlagChanged: Ember.observer('refreshFlag', function() {
                this.notifyPropertyChange('datasource');
            }),

            themeChanged: Ember.observer('customTheme', function() {
                this.notifyPropertyChange('datasource');
            }),
            datasourceChanged: Ember.observer('datasource', function() {
                var data = this.get('datasource');
                if (data) {
                    var option = this.initialOption();
                    ['startAngle', 'endAngle'].forEach(function(key) {
                        if (data.hasOwnProperty(key)) {
                            option.series[0][key] = data[key];
                        }
                    });
                    // 初始化value
                    option.series[0].axisLine.lineStyle.color[0][0] = data.value || 0;
                    option.series[0].data[0].value = data.value * 100 || 0;
                    option.series[0].axisLine.lineStyle.width = data.barWidth || 20;
                    this.initColor(option, data);
                    this.setOption(option);
                }
            }).on('didInsertElement'),
            initColor: function(option, data) {
                if (data.color) {
                    option.series[0].axisLine.lineStyle.color[0][1] = data.color;
                }
                if (data.bgColor) {
                    option.series[0].axisLine.lineStyle.color[1][1] = data.bgColor;
                }
                if (data.showDetail === false) {
                    option.series[0].detail.show = false;
                }
                if (data.textColor) {
                    option.series[0].detail.textStyle.color = data.textColor;
                } else if (data.color) {
                    option.series[0].detail.textStyle.color = data.color;
                }
                if (data.fontSize) {
                    option.series[0].detail.textStyle.fontSize = data.fontSize;
                }
            },
            initialOption: function() {
                var option = $.extend(true, {}, this.baseoption, this.get('customTheme') && this.get('customTheme').option);
                return option;
            }
        });
    });