define(
    [
        'app',
        'text!./common/components/comp_echart/comp_echart_ring/comp_echart_ring.html',
        './common/components/comp_echart/comp_echart_base',
        'css!./common/components/comp_echart/comp_echart.css'
    ],

    function(app, template, chartbase) {

        "use strict";

        app.CompEchartRingComponent = chartbase.extend({
            layout: Ember.ExtendHelper.compileEx(template),

            templateName: 'comp-echart-ring',

            init: function() {
                this._super();
            },

            didInsertElement: function() {
                this._super();
            },

            baseplaceholderstyle: {
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
                tooltip: {
                    trigger: 'item',
                    show: true,
                    formatter: function(item) {
                        if (item.name === 'invisible'||!item.data) {
                            return null;
                        }
                        var str = '';
                        var value = item.data.realValue;
                        if (parseInt(Number(value), 10) !== Number(value)) {
                            value = parseFloat(value).toFixed(2);
                        }
                        str += item.seriesName;
                        str += '(' + value + '%' + ')';
                        return str;
                    }
                },
                legend: {
                    orient: 'vertical',
                    y: 0,
                    data: [],
                    textStyle: {
                        color: '#5CDDE8'
                    }
                },
                series: []
            },
            themeChanged : Ember.observer('customTheme', function () {
                this.notifyPropertyChange('datasource');
            }),
            datasourceChanged: Ember.observer('datasource', function() {
                var data = this.get('datasource');
                if (data) {
                    var option = this.initialOption();
                    var width = this.get('width');
                    var height = this.get('height');
                    var radius = Math.min(width, height) / 2;
                    option.legend.x = radius + 10;

                    option.legend.data = [];
                    option.series = [];

                    for (var i = 0; i < data.length; i++) {
                        option.legend.data.push(data[i].name);
                        var tempr = radius;
                        tempr = radius - i * 10;

                        var basedatastyle = {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        };
                        if (this.get('colorList') && this.get('colorList')[i]) {
                            basedatastyle.normal.color = this.get('colorList')[i];
                        }

                        var dataobj = {
                            hoverAnimation: false, //禁用tooltip时，放大效果
                            name: data[i].name,
                            type: 'pie',
                            clockWise: false,
                            center: [radius, radius],
                            radius: [tempr - 10, tempr],
                            itemStyle: basedatastyle,
                            data: [{
                                value: data[i].value * 0.7,
                                name: data[i].name,
                                realValue:data[i].value
                            }, {
                                value: 100 - data[i].value * 0.7,
                                name: 'invisible',
                                realValue:100 - data[i].value,
                                itemStyle: this.baseplaceholderstyle
                            }]
                        };
                        option.series.push(dataobj);
                    }

                    this.setOption(option);
                }
            }).on('didInsertElement'),

            initialOption: function() {
                //var option = $.extend(true, {}, this.baseoption);
                var option = $.extend(true, {}, this.baseoption, this.get('customTheme') && this.get('customTheme').option);

                var itemgap = this.get('itemgap');
                if (itemgap) {
                    option.legend.itemGap = itemgap;
                }

                return option;
            }
        });
    });