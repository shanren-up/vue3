/**
 *
 */
define(
    [
        'app',
        'text!./comp_echart_graph.html',
        'common/components/comp_echart/comp_echart_base',
        'css!./comp_echart_graph.css'
    ],

    function (app, template, echartbase) {

        "use strict";

        app.CompEchartGraphComponent = echartbase.extend({

            layout: Ember.ExtendHelper.compileEx(template),

            classNames: ['echart-ringpie-backimg'],

            templateName: 'comp-echart-graph',

            //默认worker节点是1个
            workNodeNum:0,

            //默认master节点坐标
            rootLocation:[400,350],
            // 默认起始worker节点坐标
            workNodeLocationF:[100,100],
            init: function () {
                this._super();
            },
            willDestroy: function () {
                this._super();
            },
            /**
             * 基础配置信息
             */
            baseoption: {
                title: {
                    text: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                xAxis: {
                    show: false
                },
                yAxis: {
                    show: false,
                    type:'value'
                },
                series: [
                    {
                        name: '',
                        type: 'lines',
                        coordinateSystem: 'cartesian2d',
                        zlevel: 1,
                        symbol: ['none', 'arrow'],
                        symbolSize: 10,
                        effect: {
                            show: true,
                            period: 6,
                            delay:500,
                            trailLength: 0,
                            symbol: 'arrow',
                            symbolSize: 10
                        },
                        lineStyle: {
                            normal: {
                                color: 'green',
                                width: 3,
                                opacity: 0.6,
                                curveness: 0
                            }
                        },
                        data: []
                    }
                ]
            },
            baseNodeSer:  {
                name: '',
                tooltip:{
                    formatter:''
                },
                type: 'effectScatter',
                coordinateSystem: 'cartesian2d',
                data: [

                ],
                symbolSize: 52,
                symbol: '',
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke',
                    scale: 1.6
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        fontSize:14,
                        offset:[0,0],
                        backgroundColor: '#eee',
                        borderColor: '#777',
                        borderWidth: 1,
                        borderRadius: 4,
                        formatter: [
                            '{title|ip:122.223.142.422}{abg|}',
                            '{weatherHead|状态}{rateHead|正常}',
                            '{hr|}',
                            '{value|内存}{rate|55.3%}',
                            '{value|CPU}{rate|38.9%}'
                        ].join('\n'),
                        position: 'bottom',
                        show: true,
                        rich:{
                            title: {
                                color: '#eee',
                                align: 'center',
                                padding: [0, 5, 0, 5]
                            },
                            abg: {
                                backgroundColor: '#333',
                                width: '100%',
                                align: 'right',
                                height: 25,
                                borderRadius: [4, 4, 0, 0]
                            },
                            weatherHead: {
                                color: '#333',
                                height: 24,
                                align: 'left',
                                padding: [0, 0, 0, 10]
                            },
                            rateHead: {
                                width: 40,
                                align: 'right',
                                padding: [0, 10, 0, 0]
                            },
                            hr: {
                                borderColor: '#777',
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0
                            },
                            value: {
                                width: 20,
                                color: '#333',
                                align: 'left',
                                height:23,
                                padding: [0, 0, 0, 10]
                            },
                            rate: {
                                width: 40,
                                align: 'right',
                                padding: [0, 10, 0, 0]
                            }
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'green',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 2
            },
            mainchart: null,
            /**
             * 节点富文本框
             */
            _createFormatter:function(item){
                var formatter = [];
                formatter.push( '{title|IP:'+item.nodeip+'}{abg|}');
                var status = item.nodestatus === 'Off-line' ? '异常':'正常';
                formatter.push( '{weatherHead|状态}{rateHead|'+status+'}');
                formatter.push( '{hr|}');
                formatter.push( '{value|内存}{rate|'+item.memory+'%}');
                formatter.push( '{value|CPU}{rate|'+item.cpu+'%}');
                formatter.push( '{value|硬盘}{rate|'+item.disk+'%}');
                return formatter.join('\n');
            },
            didInsertElement: function () {
                this._super();
                var img = this.get('icon');
                if (img) {
                    $('#' + this.elementId).css('background-image', 'url(' + img + ')');
                }
                //this.setOption(this.initialOption());
            },

            testA: Ember.observer('abserver', function () {
                this.datasourceChanged();
            }),
            /**
             * 数据监控，改变时刷新图表
             */
            datasourceChanged: Ember.observer('datasource', function () {
                var self = this;
                var data = this.get('datasource');
                this.baseoption.series[0].data = [];
                var series_0 =  this.baseoption.series[0];
                this.baseoption.series = [];
                this.baseoption.series.push(series_0);
                self.workNodeNum = 0;
                if (data) {
                    self.nodeNum = data.length;
                    var option = self.baseoption;
                    data.forEach(function(item){
                        self._createData(item);
                    });
                    self.setOption(option);
                }
            }),
            /**
             * 创建图表数据
             */
            _createData:function(data){
                var self = this;
                var scaoption  = $.extend(true,{},this.baseNodeSer);
                scaoption.label.normal.formatter = self._createFormatter(data);
                scaoption.tooltip.formatter = data.nodedesc;
                var lineData  = {
                    lineStyle:{
                        normal:{
                            type:'solid',
                            color:'green',
                            width:3
                        }
                    },
                    coords: []
                };
                if(data.nodetype === 'worker'){
                    if(data.nodestatus === 'Off-line'){
                        lineData.lineStyle.normal.color = 'red';
                        lineData.lineStyle.normal.type = 'dotted';
                        lineData.lineStyle.normal.width = 4;
                        scaoption.itemStyle.normal.color = 'red';
                        scaoption.rippleEffect.scale = 2;
                    }
                    scaoption.label.normal.offset = [0,10];
                    var centerX = self.rootLocation[0];
                    var location = [self.workNodeNum*(centerX*2/(self.nodeNum-2)),self.workNodeLocationF[1]];
                    self.workNodeNum++;
                    lineData.coords.push(self.rootLocation,location);
                    self.baseoption.series[0].data.push(lineData);
                    scaoption.data.push(location);
                    self.baseoption.series.push(scaoption);
                }else{
                    if(data.nodestatus === 0){
                        scaoption.itemStyle.normal.color = 'red';

                    }
                    scaoption.label.normal.position = 'top';
                    // scaoption.label.normal.offset = [0,-10];
                    scaoption.data.push(self.rootLocation);
                    self.baseoption.series.push(scaoption);
                }
            },
            initialOption: function () {
                //var option = $.extend(true, {}, this.baseoption);
                // var option = $.extend(true, {}, this.baseoption, this.get('customTheme') && this.get('customTheme').option);
                // this.on('click', function(params) {
                //     var item = null;
                //     try {
                //         item = params.currentTarget.innerText.split("\n")[1].split(":")[0];
                //     } catch(e) {
                //         console.log("[环形图] click异常");
                //     }
                //
                //     if(item && item.length > 0) {
                //         this.sendAction('clickItem', item);
                //     }
                // });
                return this.baseoption;
            }
        });
    });
