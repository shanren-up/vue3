define(
    [
        'app',
        'text!./common/components/comp_echart/comp_echart_pie/comp_echart_pie.html',
        './common/components/comp_echart/comp_echart_base',
        'css!./common/components/comp_echart/comp_echart_pie/comp_echart_pie.css',
        'css!./common/components/comp_echart/comp_echart.css'
    ],

    function(app, template, echartbase) {

        "use strict";

        app.CompEchartPieComponent = echartbase.extend({

            layout: Ember.ExtendHelper.compileEx(template),

            classNames: ['echart-ringpie-backimg'],

            templateName: 'comp-echart-pie',

            init: function() {
                this._super();
            },

            baseoption: {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                series: [{
                    name: '',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],

                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: []
                }, {
                    name: '',
                    type: 'pie',
                    radius: ['40%', '55%'],

                    data: []
                }]
            },

            mainchart: null,

            didInsertElement: function() {
                this._super();
                var img = this.get('icon');
                if(img) {
                    $('#' + this.elementId).css('background-image', 'url(' + img + ')');
                }
                //this.setOption(this.initialOption());
            },

            datasourceChanged: Ember.observer('datasource', function() {
                var data = this.get('datasource');
                var self = this;
                if(data) {
                    var option = this.initialOption();
                    option.series[0].name = this.get('name');
                    option.series[1].name = this.get('name');

                    for(var i = 0; i < data['in'].length; i++) {
                        var inn = {};
                        inn.name = data['in'][i].name;
                        inn.value = data['in'][i].value;
                        option.series[0].data.push(inn);
                    }

                    for(var j = 0; j < data['out'].length; j++) {
                        var outt = {};
                        outt.name = data['out'][j].name;
                        outt.value = data['out'][j].value;
                        outt.label = {
                            normal: {
                                textStyle: {
                                    fontSize: 14
                                }
                            }
                        };
                        option.series[1].data.push(outt);
                    }

                    this.setOption(option);
                }
            }).on('didInsertElement'),

            initialOption: function() {
                //var option = $.extend(true, {}, this.baseoption);
                var option = $.extend(true, {}, this.baseoption, this.get('customTheme') && this.get('customTheme').option);
                this.on('click', function(params) {
                    var item = null;
                    try {
                        item = params.currentTarget.innerText.split("\n")[1].split(":")[0];
                    } catch(e) {
                        console.log("[环形图] click异常");
                    }

                    if(item && item.length > 0) {
                        this.sendAction('clickItem', item);
                    }
                });
                return option;
            }
        });
    });
