define(
    [
        'app',
        'json!common/components/comp_echart/comp_echart_ringpie/cultureInfo.json',
        'text!./common/components/comp_echart/comp_echart_ringpie/comp_echart_ringpie.html',
        './common/components/comp_echart/comp_echart_base',
        'common/core/emberExtendHelper',
        'css!./common/components/comp_echart/comp_echart_ringpie/comp_echart_ringpie.css',
        'css!./common/components/comp_echart/comp_echart.css'
    ],

    function(app, cultureInfo, template, echartbase, helper) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);

        app.CompEchartRingpieComponent = echartbase.extend({

            layout: Ember.ExtendHelper.compileEx(template),

            classNames: ['echart-ringpie-backimg'],

            templateName: 'comp-echart-ringpie',

            init: function() {
                this._super();
            },

            baseoption: {
                tooltip: {
                    trigger: 'item'
                },
                series: [{
                    type: 'pie',
                    radius: ['45%', '60%'],
                    clockWise: true,
                    itemStyle: {
                        normal: {
                            label: {
                                textStyle: {
                                    fontFamily: 'Microsoft YaHei',
                                    fontSize: 13,
                                    fontWeight: 'bold'
                                }
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

            mainchart: null,

            didInsertElement: function() {
                this._super();

                var img = this.get('icon');
                if (img) {
                    $('#' + this.elementId).css('background-image', 'url(' + img + ')');
                }
            },

            datasourceChanged: Ember.observer('datasource', function() {
                var data = this.get('datasource');
                var self = this;
                if (data) {
                    var option = this.initialOption();
                    option.tooltip.formatter = function(para) {
                        if (para) {
                            var unit = self.get('unit');
                            var percent = para.percent;
                            if (parseInt(Number(percent), 10) !== Number(percent)) {
                                percent = parseFloat(percent).toFixed(2);
                            }
                            if (unit === 'size') {
                                return para.name + ' : ' +
                                    helper.getHexTransferValue(para.value, 1024, ['MB', 'GB', 'TB']) +
                                    '(' + percent + '%)';
                            } else {
                                return para.name + ' : ' +
                                    helper.getHexTransferValue(para.value, 10000, [unit, Ember.oloc('comp_echart_ringpie_w') + unit, Ember.oloc('comp_echart_ringpie_y') + unit]) +
                                    '(' + percent + '%)';
                            }
                        }
                    };

                    option.series[0].itemStyle.normal.label.formatter = function(para) {
                        if (para) {
                            var unit = self.get('unit');
                            if (unit === 'size') {
                                return para.name + '\n' + helper.getHexTransferValue(para.value, 1024, ['MB', 'GB', 'TB']);
                            } else {
                                return para.name + '\n' + helper.getHexTransferValue(para.value, 10000, [unit, Ember.oloc('comp_echart_ringpie_w') + unit, Ember.oloc('comp_echart_ringpie_y') + unit]);
                            }
                        }
                    };

                    for (var i = 0; i < data.length; i++) {
                        var pie = {};
                        pie.name = data[i].name;
                        if (data[i].value === undefined) {
                            pie.value = 0;
                        } else {
                            pie.value = data[i].value;
                        }

                        option.series[0].data.push(pie);
                    }
                    this.setOption(option);
                }
            }).on('didInsertElement'),

            initialOption: function() {
                var option = $.extend(true, {}, this.baseoption);

                var unit = this.get('unit');
                if (unit) {
                    option.series[0].itemStyle.normal.label.formatter += unit;
                }
                return option;
            }
        });
    });