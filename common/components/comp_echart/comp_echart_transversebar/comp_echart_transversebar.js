define(
    [
        'app',
        'json!common/components/comp_echart/comp_echart_transversebar/cultureInfo.json',
        'text!./common/components/comp_echart/comp_echart_transversebar/comp_echart_transversebar.html',
        './common/components/comp_echart/comp_echart_base',
        'css!./common/components/comp_echart/comp_echart.css'
    ],

    function(app, cultureInfo, template, chartbase) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);

        app.CompEchartTransversebarComponent = chartbase.extend({
            layout: Ember.ExtendHelper.compileEx(template),

            templateName: 'comp-echart-transversebar',

            init: function() {
                this._super();
            },
            selections: [],
            firstLoad: true,
            didInsertElement: function() {
                this._super();
                var self = this;
                this.__mainchart__.on('legendselectchanged', function(params) {
                    // 获取点击图例的选中状态
                    //                      this.get('selection')

                    var isSelected = params.selected[params.name];
                    for (var p in params.selected) {
                        if (self.selections.indexOf(p) === -1 && params.selected[p]) {
                            self.selections.push(p);
                        }
                        if (self.selections.indexOf(p) !== -1 && !params.selected[p]) {
                            var index = self.selections.indexOf(p);
                            self.selections.splice(index, 1);
                        }
                    }
                    // 在控制台中打印
                    console.log((isSelected ? Ember.oloc('comp_echart_transversebar_xzl') : Ember.oloc('comp_echart_transversebar_qxxzl')) + Ember.oloc('comp_echart_transversebar_tl') + params.name);
                    // 打印所有图例的状态
                    console.log(params.selected);
                }.bind(this));
            },
            baseoption: {
                grid: {
                    left: '1%',
                    right: '5%',
                    bottom: '5',
                    top: '30',
                    containLabel: true
                },
                legend: {
                    data: [],
                    selected: {}
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            opacity: 0
                        }
                    }
                },
                xAxis: {
                    splitNumber: 4,
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: [],
                    splitLine: {
                        show: false
                    },
                },
                series: []
            },
            themeChanged: Ember.observer('customTheme', function() {
                this.notifyPropertyChange('datasource');
            }),
            datasourceChanged: Ember.observer('datasource', function() {
                var data = this.get('datasource');
                if (data) {
                    var option = this.initialOption();
                    var legend = this.get('title');
                    var legendList = [];
                    if (legend) {
                        legendList = legend.split(",");
                        option.legend.data = legendList;
                        if (this.firstLoad) {
                            legendList.forEach(function(item) {
                                this.selections.push(item);
                            }.bind(this));
                            this.firstLoad = false;
                        }
                    }
                    for (var i = 0; i < data.length; i++) {
                        var series = {
                            name: legendList[i],
                            type: 'bar',
                            data: []
                        };

                        for (var j = 0; j < data[i].length; j++) {
                            series.data.push({
                                value: data[i][j].value,
                                unit: this.get('unit') ? this.get('unit') : ""
                            });
                            if (i === 0 && option.yAxis.data) {
                                option.yAxis.data.push(data[i][j].name);
                            }
                        }
                        option.series.push(series);
                        if (this.selections.indexOf(series.name) === -1) {
                            if (option.legend.selected) {
                                option.legend.selected[series.name] = false;
                            }
                        }

                    }
                    this.setOption(option);

                }
            }).on('didInsertElement'),

            initialOption: function() {
                /*var option = $.extend(true, {}, this.baseoption);*/
                var option = $.extend(true, {}, this.baseoption, this.get('customTheme') && this.get('customTheme').option);
                var barcolor = this.get('barcolor');
                if (barcolor) {
                    option.series[0].itemStyle = {
                        normal: {
                            color: barcolor
                        }
                    };
                }

                return option;
            }
        });
    });