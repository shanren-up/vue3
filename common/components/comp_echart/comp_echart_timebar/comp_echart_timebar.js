define(
    [
        'app',
        'json!common/components/comp_echart/comp_echart_timebar/cultureInfo.json',
        'text!./common/components/comp_echart/comp_echart_timebar/comp_echart_timebar.html',
        './common/components/comp_echart/comp_echart_base',
        'css!./common/components/comp_echart/comp_echart.css'
    ],

    function(app, cultureInfo, template, chartbase) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);

        app.CompEchartTimebarComponent = chartbase.extend({
            layout: Ember.ExtendHelper.compileEx(template),

            templateName: 'comp-echart-timebar',

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
                        type: 'line',
                        shadowStyle: {
                            opacity: 0
                        }
                    },
                    formatter: function(item) {
                        var ret = "";
                        if (item && item.length > 0) {
                            var timeLoader = false;
                            for (var i = 0; i < item.length; i++) {
                                if (!timeLoader && item[i].name !== '') {
                                    var date = new Date(item[i].name).Format('yyyy-MM-dd hh:mm:ss');
                                    ret += date + "<br>";
                                    timeLoader = true;
                                }
                                if (item[i].data && item[i].data.tipName) {
                                    if (item[i].data.tipName === "") {
                                        ret += item[i].data.value + item[i].data.unit + "<br>";
                                    } else {
                                        ret += item[i].data.tipName + " , " + item[i].data.value + item[i].data.unit + "<br>";
                                    }
                                }
                            }
                        }
                        return ret;
                    }
                },
                xAxis: [{
                    type: 'category',
                    splitLine: {
                        show: false
                    },
                    data: []
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
                if (data) {
                    var option = this.initialOption();
                    for (var i = 0; i < data.length; i++) {
                        var dataobj = $.extend(true, {
                            data: []
                        }, this.get('customTheme') && this.get('customTheme').series);
                        //0：显示的是总量，其它标识对比值
                        //0：曲线图 其它：柱状图
                        if (i === 0) {
                            dataobj.type = 'line';
                        } else {
                            dataobj.type = 'bar';
                            dataobj.itemStyle = {
                                normal: {
                                    color: function(params) {
                                        if (params.value > 0) {
                                            return "green";
                                        } else {
                                            return "red";
                                        }
                                    }
                                }
                            };
                        }
                        for (var j = 0; j < data[i].length; j++) {
                            if (data[i][j] && data[i][j].length > 1) {
                                if (option.xAxis[0].data.indexOf(data[i][j][0]) === -1) {
                                    option.xAxis[0].data.push(data[i][j][0]);
                                }
                                dataobj.data.push({
                                    value: data[i][j][1], //数据
                                    tipName: data[i][j].length > 2 ? data[i][j][2] : '', //数据名称
                                    unit: this.get('unit') ? this.get('unit') : '' //数据单位
                                });
                            }
                        }
                        option.series.push(dataobj);
                    }
                    this.setOption(option);
                }
            }).on('didInsertElement'),

            initialOption: function() {
                var option = $.extend(true, {}, this.baseoption, this.get('customTheme') && this.get('customTheme').option);
                var unitStr = this.get('unit');
                if (unitStr) {
                    option.yAxis[0].name = Ember.oloc('comp_echart_timebar_dw：') + unitStr;
                    option.yAxis[0].nameTextStyle = {
                        fontSize: 10
                    };
                }
                return option;
            }
        });
    });