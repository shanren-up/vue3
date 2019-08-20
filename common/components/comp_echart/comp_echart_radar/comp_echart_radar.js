define(
    [
        'app',
        'text!./common/components/comp_echart/comp_echart_radar/comp_echart_radar.html',
        './common/components/comp_echart/comp_echart_base',
        'css!./common/components/comp_echart/comp_echart.css'
    ],

    function(app, template, chartbase) {

        "use strict";

        app.CompEchartRadarComponent = chartbase.extend({
            layout: Ember.ExtendHelper.compileEx(template),

            templateName: 'comp-echart-radar',

            init: function() {
                this._super();
            },

            didInsertElement: function() {
                this._super();
            },

            baseoption: {
                tooltip: {
                    //trigger: 'axis'
                    formatter: function(params) {
                        var ret = "";
                        if(params && params.value.length > 0) {
                            ret += params.name + "<br>";
                            for(var i = 0; i < params.data.value.length; i++) {
                                ret += params.data.nameList[i] + " : " + params.data.value[i] + params.data.unit + "<br>";
                            }
                        }
                        return ret;
                    }
                },
                legend: {
                    formatter: function(name) {
                        var str = name.replace(/[^a-z\d]/ig, '');
                        if(str === '') {
                            return name;
                        } else {
                            return str;
                        }
                    },
                    orient: 'vertical',
                    x: 'right',
                    y: 'top',
                    data: []
                },
                radar: [{
                    indicator: []
                }],
                series: [{
                    type: 'radar',
                    data: []
                }]
            },
            themeChanged: Ember.observer('customTheme', function() {
                this.notifyPropertyChange('datasource');
            }),
            refreshUIdata: Ember.observer('datasourceUpdateFlag', function() {
                this.notifyPropertyChange('datasource');
            }),
            datasourceChanged: Ember.observer('datasource', function() {
                var data = this.get('datasource');
                if(data && data.length > 0) {
                    var option = this.initialOption();

                    if(data[0] instanceof Array && data[0].length > 0) {
                        for(var ind = 0; ind < data[0].length; ind++) {
                            option.radar[0].indicator.push({
                                name: data[0][ind].name
                            });
                        }
                        for(var max_i = 0; max_i < data[0].length; max_i++) {
                            var max_array = [];
                            for(var l = 0; l < data.length; l++) {
                                max_array.push(data[l][max_i].value);
                            }
                            option.radar[0].indicator[max_i].max = parseInt(Number(Math.max.apply(Math, max_array)) + 1, 10);
                        }
                        var titlemulti = this.get('title');
                        var title_array;
                        if(titlemulti) {
                            title_array = titlemulti.split(',');
                        }
                        for(var len = 0; len < data.length; len++) {
                            option.series[0].data.push({
                                value: []
                            });
                            //单位
                            option.series[0].data[len].unit = this.get('unit') ? this.get('unit') : '';
                            option.series[0].data[len].nameList = [];
                            option.series[0].data[len].name = title_array[len];
                            var legendObj1 = {
                                name: title_array[len],
                                // 设置文本颜色
                                textStyle: {
                                    color: '#BDBDBD'
                                }
                            };
                            option.legend.data.push(legendObj1);
                            for(var len_i = 0; len_i < data[len].length; len_i++) {
                                option.series[0].data[len].value.push(data[len][len_i].value);
                                option.series[0].data[len].nameList.push(data[len][len_i].name);
                            }
                        }
                    } else {
                        var max = 0;
                        for(var m = 0; m < data.length; m++) {
                            max = Math.max(max, data[m].value);
                        }
                        max = parseInt(Number(max) + 1, 10);
                        option.series[0].data.push({
                            value: []
                        });
                        var title = this.get('title');
                        if(title) {
                            var legendObj = {
                                name: title,
                                // 设置文本颜色
                                textStyle: {
                                    color: '#BDBDBD'
                                }
                            };
                            option.legend.data.push(legendObj);
                            option.series[0].data[0].name = title;
                        }
                        //单位
                        option.series[0].data[0].unit = this.get('unit') ? this.get('unit') : '';
                        option.series[0].data[0].nameList = [];
                        for(var i = 0; i < data.length; i++) {
                            option.radar[0].indicator.push({
                                name: data[i].name,
                                max: max
                            });
                            option.series[0].data[0].value.push(data[i].value);
                            option.series[0].data[0].nameList.push(data[i].name);
                        }
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