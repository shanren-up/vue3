define(
    [
        'app',
        'json!common/components/comp_echart/comp_echart_stdbar/cultureInfo.json',
        'text!./common/components/comp_echart/comp_echart_stdbar/comp_echart_stdbar.html',
        './common/components/comp_echart/comp_echart_base',
        'css!./common/components/comp_echart/comp_echart.css'
    ],

    function(app, cultureInfo, template, chartbase) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);

        app.CompEchartStdbarComponent = chartbase.extend({
            layout: Ember.ExtendHelper.compileEx(template),

            templateName: 'comp-echart-stdbar',

            init: function() {
                this._super();
            },

            didInsertElement: function() {
                this._super();
                this.on('click', this.clickBind);
            },

            baseoption: {
                grid: {
                    left: '5',
                    right: '5',
                    bottom: '5',
                    top: '30',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            opacity: 0
                        }
                    },
                    formatter: function(params) {
                        var str = '';
                        if (params && params[0].name) {
                            str += params[0].name + "<br>";
                            if (params[0].data) {
                                str += params[0].data.value + params[0].data.unit;
                                if (params[0].data.firstresult) {
                                    str = (new Date(params[0].data.firstresult)).Format("yyyy-MM-dd hh:mm") + "<br>" + str;
                                } else {
                                    str = str;
                                }
                            }
                        }
                        return str;
                    }
                },
                xAxis: [{
                    type: 'category',
                    data: [],
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
                series: [{
                    type: 'bar',
                    data: [],
                }]
            },
            themeChanged: Ember.observer('customTheme', function() {
                this.notifyPropertyChange('datasource');
            }),
            datasourceChanged: Ember.observer('datasource', function() {
                var data = this.get('datasource');
                if (data) {
                    var option = this.initialOption();

                    for (var i = 0; i < data.length; i++) {
                        option.xAxis[0].data.push(data[i].name);
                        option.series[0].data.push({
                            value: data[i].value,
                            unit: this.get('unit') ? this.get('unit') : '',
                            firstresult: data[i].firstresult
                        });
                    }

                    this.setOption(option);
                }
            }).on('didInsertElement'),

            initialOption: function() {
                //var option = $.extend(true, {}, this.baseoption);
                var option = $.extend(true, {}, this.baseoption, this.get('customTheme') && this.get('customTheme').option);

                var barcolor = this.get('barcolor');
                if (barcolor) {
                    option.series[0].itemStyle = {
                        normal: {
                            color: barcolor
                        }
                    };
                }

                var splitY = this.get('splitY');
                if (splitY) {
                    option.yAxis[0].splitNumber = splitY;
                } else {
                    option.yAxis[0].splitNumber = 4;
                }

                //顺序：左上右下
                var padding = this.get('padding');
                if (padding && padding.split(',').length === 4) {
                    var p = padding.split(',');
                    option.grid = {
                        x: parseInt(p[0], 10),
                        y: parseInt(p[1], 10),
                        x2: parseInt(p[2], 10),
                        y2: parseInt(p[3], 10),
                    };
                }

                //单位
                var unitStr = this.get('unit');
                var unitCol = this.get('unitCol');
                if (unitStr) {
                    option.yAxis[0].name = Ember.oloc('comp_echart_stdbar_dw：') + unitStr;
                    option.yAxis[0].nameTextStyle = {
                        fontSize: 10,
                        color: unitCol
                    };
                }

                //点击事件
                this.clickBind = this.clickHandler.bind(this);
                return option;
            },
            clickHandler: function(params) {
                if (params && params.currentTarget && params.currentTarget.innerText && params.currentTarget.innerText !== '') {
                    var item = params.currentTarget.innerText.split("\n");
                    if (item && item.length > 0) {
                        this.sendAction('clickItem', item);
                    }
                }
            },
            willDestroyElement: function() {
                if (this.myChart) {
                    //解除绑定
                    this.myChart.off('click', this.clickBind);
                }
            },
        });
    });