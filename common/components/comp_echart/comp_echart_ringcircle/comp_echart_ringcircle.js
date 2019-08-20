define(
    [
        'app',
        'json!common/components/comp_echart/comp_echart_ringcircle/cultureInfo.json',
        'text!./common/components/comp_echart/comp_echart_ringcircle/comp_echart_ringcircle.html',
        './common/components/comp_echart/comp_echart_base',
        'common/core/emberExtendHelper',
        'css!./common/components/comp_echart/comp_echart.css'
    ],

    function(app, cultureInfo, template, echartbase, helper) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);

        app.CompEchartRingcircleComponent = echartbase.extend({

            layout: Ember.ExtendHelper.compileEx(template),

            templateName: 'comp-echart-ringcircle',

            init: function() {
                this._super();
            },

            baseoption: {
                tooltip: {
                    trigger: 'item'
                },
                series: [{
                    type: 'pie',
                    radius: ['60%', '100%'],
                    clockWise: true,
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                var colorList = [
                                    '#00C2FF', '#29377B', '#E4BD60'
                                ];
                                return colorList[params.dataIndex];
                            },
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false,
                                length: 0
                            }
                        }
                    },
                    data: []
                }]
            },

            didInsertElement: function() {
                this._super();
            },
            themeChanged: Ember.observer('customTheme', function() {
                this.notifyPropertyChange('datasource');
            }),
            datasourceChanged: Ember.observer('datasource', function() {
                var data = this.get('datasource');
                var self = this;
                if (data) {
                    var option = this.initialOption();

                    option.tooltip.formatter = function(para) {
                        if (para) {
                            var unit = self.get('unit');
                            if (unit === 'size') {
                                return helper.getHexTransferValue(para.value, 1024, ['MB', 'GB', 'TB']);
                            } else {
                                unit = '';
                                return helper.getHexTransferValue(para.value, 10000, [unit, Ember.oloc('comp_echart_ringcircle_w') + unit, Ember.oloc('comp_echart_ringcircle_y') + unit]);
                            }
                        }
                    };

                    for (var i = 0; i < data.length; i++) {
                        var pie = {};
                        pie.name = data[i].name;
                        pie.value = data[i].value;
                        option.series[0].data.push(pie);
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