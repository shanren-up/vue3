define(
    [
        'app',
        'json!common/components/comp_echart/comp_echart_ringpie2/cultureInfo.json',
        'text!./common/components/comp_echart/comp_echart_ringpie2/comp_echart_ringpie2.html',
        './common/components/comp_echart/comp_echart_base',
        'common/core/emberExtendHelper',
        'css!./common/components/comp_echart/comp_echart_ringpie2/comp_echart_ringpie2.css',
        'css!./common/components/comp_echart/comp_echart.css'
    ],

    function(app, cultureInfo, template, echartbase, helper) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);

        app.CompEchartRingpie2Component = echartbase.extend({

            layout: Ember.ExtendHelper.compileEx(template),

            classNames: ['echart-ringpie-backimg'],

            templateName: 'comp-echart-ringpie2',

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
                                },
                            },
                            labelLine: {
                                show: true,
                                length: 10,
                                length2: 10
                            }
                        }
                    },
                    data: []
                }]
            },

            mainchart: null,

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
                            var percent = parseFloat(para.percent).toFixed(1);
                            return para.name + ' : ' + para.value + '(' + percent + '%)';
                        }
                    };

                    option.series[0].itemStyle.normal.label.formatter = function(para) {
                        if (para) {
                            var percent = parseFloat(para.percent).toFixed(1);
                            return para.name + '\n' + Ember.oloc('comp_echart_ringpie2_gs：') + para.value + '\n' + Ember.oloc('comp_echart_ringpie2_zb：') + percent + '%';
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
                var option = $.extend(true, {}, this.baseoption, this.get('customTheme') && this.get('customTheme').option);
                return option;
            }
        });
    });