define(
    [
        'app',
        'text!common/components/comp_echart/comp_echart_pie/comp_echart_pie.html',
        'common/components/comp_echart/comp_echart_base',
        'css!common/components/comp_echart/comp_echart_pie/comp_echart_pie.css',
        'css!common/components/comp_echart/comp_echart.css'
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
            willDestroy:function(){
                this._super();
            },
            /**
             * 基础配置信息
             */
            baseoption: {
                title: {
                    left: 'center',
                    text: ''
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                series: [{
                    name: '',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '55%'],
                    label: {
                        normal: {
                            textStyle: {
                                color: 'red'
                            },
                            formatter:'{b}: {d}'
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'red'
                            },
                            smooth: 0.2,
                            length: 20,
                            length2: 30
                        }
                    },
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
            testA: Ember.observer('abserver', function () {
                this.datasourceChanged();
            }),
            /**
             * 数据改变时更新图表
             */
            datasourceChanged: Ember.observer('datasource', function() {
                var data = this.get('datasource');
                if(data) {
                    var option = this.baseoption;
                    option.title.text = '';
                    option.series[0].name = this.get('name');
                    option.series[0].data = [];
                    for(var j = 0; j < data.length; j++) {
                        option.title.text = data[j].title;
                        option.series[0].data = data[j].data;
                    }
                    this.setOption(option);
                }
            }),
            /**
             * 初始化配置
             */
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
