define(
    [
        'app',
        'json!common/components/comp_echart/comp_echart_timeline/cultureInfo.json',
        'text!./common/components/comp_echart/comp_echart_timeline/comp_echart_timeline.html',
        './common/components/comp_echart/comp_echart_base',
        'css!./common/components/comp_echart/comp_echart.css'
    ],

    function(app, cultureInfo, template, chartbase) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);

        app.CompEchartTimelineComponent = chartbase.extend({

            layout: Ember.ExtendHelper.compileEx(template),

            templateName: 'comp-echart-timeline',

            init: function() {
                this._super();
            },

            didInsertElement: function() {
                this._super();
            },

            baseoption: {
                tooltip: {
                    trigger: 'axis',
                    formatter: function(params) {
                        var ret = "";
                        if (params) {
                            if (params.length > 1) {
                                params.sort(function(a, b) {
                                    return b.value[1] - a.value[1];
                                });
                            }
                            var timeObj = [];
                            for (var i = 0; i < params.length; i++) {
                                var param = params[i];
                                //时间处理
                                var date = new Date(param.value[0]).Format('yyyy-MM-dd hh:mm:ss');
                                if (!timeObj.includes(date)) {
                                    ret += date + "<br>";
                                    timeObj.push(date);
                                }
                                if (param.value.length > 2 && param.value[2] !== "") {
                                    ret += param.value[2] + " , ";
                                }
                                if (param.value.length > 3 && param.value[3] !== "") {
                                    ret += param.value[1] + param.value[3] + "<br>";
                                } else {
                                    ret += param.value[1] + "<br>";
                                }
                            }
                        }
                        return ret;
                    }.bind(this),
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: [{
                    type: 'time',
                    splitLine: {
                        show: false
                    },
                }],
                yAxis: [{
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                }],
                series: [],
            },
            themeChanged: Ember.observer('customTheme', function() {
                this.notifyPropertyChange('datasource');
            }),
            datasourceChanged: Ember.observer('datasource', function() {
                var data = this.get('datasource');
                if (data && data.length > 0) {
                    var option = this.initialOption();
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].length > 0) {
                            var baseSeries = {
                                type: 'line',
                                data: [],
                            };
                            if (this.get('color')) {
                                baseSeries.itemStyle = {
                                    normal: {
                                        color: this.get('color')
                                    }
                                };
                            }
                            var unitStr = this.get('unit');
                            if (unitStr && data[i] && data[i].length > 0) {
                                data[i].forEach(function(item) {
                                    if (item.length === 2) {
                                        item.push('');
                                    }
                                    item.push(unitStr);
                                });
                            }
                            var dataobj = $.extend(true, baseSeries, this.get('customTheme') && this.get('customTheme').series);
                            dataobj.data = data[i];
                            option.series.push(dataobj);
                        }
                    }
                    this.setOption(option);
                }
            }).on('didInsertElement'),

            initialOption: function() {
                var option = $.extend(true, {}, this.baseoption, this.get('customTheme') && this.get('customTheme').option);

                var splitX = this.get('splitX');
                if (splitX) {
                    option.xAxis[0].splitNumber = splitX;
                }

                var splitY = this.get('splitY');
                if (splitY) {
                    option.yAxis[0].splitNumber = splitY;
                } else {
                    option.yAxis[0].splitNumber = 4;
                }

                var str = this.get('unit');
                if (str) {
                    option.yAxis[0].name = Ember.oloc('comp_echart_timeline_dw：') + str;
                    option.yAxis[0].nameTextStyle = {
                        fontSize: 10
                    };
                }

                var hide = this.get('hideTooltip');
                if (hide) {
                    option.tooltip = null;
                }

                //点击事件
                this.on('click', function(params) {
                    if (params && params.currentTarget && params.currentTarget.innerText && params.currentTarget.innerText !== '') {
                        var item = params.currentTarget.innerText.split("\n");
                        if (item && item.length > 0) {
                            this.sendAction('clickItem', item);
                        }
                    }
                });

                return option;
            },

            changeColor: function() {
                var option = $.extend(true, {}, this.baseoption, this.get('customTheme') && this.get('customTheme').option);

                option.yAxis[0].axisLabel.textStyle.color = 'white';
                option.xAxis[0].axisLabel.textStyle.color = 'white';
            }
        });
    });