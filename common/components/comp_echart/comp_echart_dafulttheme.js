define(
    [],

    function() {

        "use strict";

        var theme = {
            // 默认色板
            color: [
                '#2ec7c9', '#ffb97f', '#73ea72', '#7cc8fd',
                '#edb1e9', '#ffe681', '#abb1e2', '#90e4e2',
                '#7cc8fc', '#c7ccfc',
            ],

            // 图表标题
            title: {
                textStyle: {
                    fontWeight: 'normal',
                    color: '#008acd' // 主标题文字颜色
                }
            },

            // 提示框
            tooltip: {
                trigger: 'item | axis', // 触发类型，默认数据触发，见下图，可选为：'item' ¦ 'axis'
                showDelay: 10, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                hideDelay: 10,
                backgroundColor: 'rgba(150,150,150,0.7)', // 提示背景颜色，默认为透明度为0.7的黑色
            },

            // 网格
            grid: {
                borderColor: '#eee'
            },

            // 类目轴
            categoryAxis: {
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: '#008acd'
                    }
                },
                splitLine: { // 分隔线
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                        color: ['#eee']
                    }
                }
            },

            // 数值型坐标轴默认参数
            valueAxis: {
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: '#008acd'
                    }
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: 'rgba(255,255,255,0)'
                    }
                },
                splitLine: { // 分隔线
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                        color: ['#eee']
                    }
                }
            },

            // 柱形图默认参数
            bar: {
                itemStyle: {
                    normal: {
                        barBorderRadius: 5
                    },
                    emphasis: {
                        barBorderRadius: 5
                    }
                }
            },

            // 折线图默认参数
            line: {
                smooth: true,
                symbol: 'emptyCircle', // 拐点图形类型
                symbolSize: 3 // 拐点图形大小
            },

            // 雷达图默认参数
            radar: {
                symbol: 'emptyCircle', // 图形类型
                symbolSize: 3
            },

            map: {
                itemStyle: {
                    normal: {
                        areaStyle: {
                            color: '#ddd'
                        },
                        label: {
                            textStyle: {
                                color: '#d87a80'
                            }
                        }
                    },
                    emphasis: { // 也是选中样式
                        areaStyle: {
                            color: '#fe994e'
                        }
                    }
                }
            },

            textStyle: {
                fontFamily: '微软雅黑'
            }
        };

        return theme;
    });