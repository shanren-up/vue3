define(
    [
        'app',
        'json!common/components/comp_echart/comp_echart_gauge/cultureInfo.json',
        'text!./common/components/comp_echart/comp_echart_gauge/comp_echart_gauge.html',
        './common/components/comp_echart/comp_echart_base',
        'css!./common/components/comp_echart/comp_echart.css'
    ],

    function(app, cultureInfo, template, chartbase) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);

        app.CompEchartGaugeComponent = chartbase.extend({
            layout: Ember.ExtendHelper.compileEx(template),

            templateName: 'comp-echart-gauge',

            init: function() {
                this._super();
            },

            didInsertElement: function() {
                this._super();
            },

            placeHolderStyle: {
                normal: {
                    color: 'rgba(0,0,0,0)',
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                },
                emphasis: {
                    color: 'rgba(0,0,0,0)'
                }
            },

            baseoption: {
                series: [{
                        hoverAnimation: false,
                        name: "name",
                        type: 'pie',
                        radius: ['70%', '90%'],
                        avoidLabelOverlap: false,
                        startAngle: 230,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },

                        data: [{
                            value: 70
                        }, {
                            value: 20,
                            itemStyle: {
                                normal: {
                                    color: 'rgba(0,0,0,0)',
                                    label: {
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                },
                                emphasis: {
                                    color: 'rgba(0,0,0,0)'
                                }
                            }
                        }]
                    }, {
                        hoverAnimation: false,
                        name: 'name',
                        type: 'pie',
                        radius: ['70%', '90%'],
                        avoidLabelOverlap: false,
                        startAngle: 230,
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },

                        data: [{
                            value: 100 * 0 * 0.7,
                            name: 0,
                            itemStyle: {
                                normal: {
                                    color: 'green'
                                }
                            }
                        }, {
                            value: 70 - 100 * 0 * 0.7,
                            itemStyle: {
                                normal: {
                                    color: 'rgba(0,0,0,0)',
                                    label: {
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                },
                                emphasis: {
                                    color: 'rgba(0,0,0,0)'
                                }
                            }
                        }, {
                            value: 20,
                            itemStyle: {
                                normal: {
                                    color: 'rgba(0,0,0,0)',
                                    label: {
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                },
                                emphasis: {
                                    color: 'rgba(0,0,0,0)'
                                }
                            }
                        }]
                    }

                ]
            },
            showValue: true,
            themeChanged: Ember.observer('customTheme', function() {
                this.notifyPropertyChange('datasource');
            }),
            datasourceChanged: Ember.observer('value', function() {
                var data = this.get('value');
                if (data) {
                    if (data < 0) {
                        data = 0;

                    }
                    if (data > 100) {

                        data = 100;
                    }
                    var option = this.initialOption();
                    var intValue = Number(data) / 100;
                    option.series[1].data[0].value = 100 * intValue * 0.7;
                    option.series[1].data[0].name = this.showValue ? data : "";
                    option.series[1].data[1].value = 70 - 100 * intValue * 0.7;
                    if (data < 5) {
                        option.series[1].data[0].itemStyle.normal.color = 'green';
                        option.series[1].label.normal.color = 'green';
                    } else if (data < 30) {
                        option.series[1].data[0].itemStyle.normal.color = 'yellow';
                        option.series[1].label.normal.color = 'yellow';

                    } else if (data < 50) {
                        option.series[1].data[0].itemStyle.normal.color = 'orange';
                        option.series[1].label.normal.color = 'orange';
                    } else {
                        option.series[1].data[0].itemStyle.normal.color = 'red';
                        option.series[1].label.normal.color = 'red';
                    }

                    this.setOption(option);
                }
            }).on('didInsertElement'),

            initialOption: function() {
                var option = $.extend(true, {}, this.baseoption, this.get('customTheme') && this.get('customTheme').option);
                return option;
            }
        });
    });