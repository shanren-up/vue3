define(
	[
		'app',
		'text!./comp_echart_splashes.html',
		'../comp_echart_base',
		'css!../comp_echart.css'

	],

	function(app, template, chartbase) {

		"use strict";

		app.CompEchartSplashesComponent = chartbase.extend({
			layout: Ember.ExtendHelper.compileEx(template),
			templateName: 'comp-echart-splashes',
			baseoption: null,
			showLegend: true,
			markLineFlag: false,
			chartType: 'scatter',
			areaFlag: false, //折线图转换面积图
			gridTop: 20,
			gridLeft: 10,
			gridRight: 20,
			gridBottom: 10,
			fontSize: 10,
			//x轴label字符串截取长度 （0：不截取 全部呈现）
			//xLabelLength: 0,
			//x轴呈现方式  0：正常显示  1：换行显示
			xlabelType: 0,
			//是否显示tip
			showTip: true,
			//是否显示提示框浮层
			showContent: true,
			//自定义tip函数
			formatterFun: null,
			//是否显示showSymbol
			showSymbol: true,
			//x周刻度显示间隔
			xInterval: 0,
			//x周label formatter方法
			xLabelFormatterFun: null,

			init: function() {
				this._super();
				this.initOption();
			},

			didInsertElement: function() {
				this._super();
			},

			initOption: function() {
				var self = this;
				this.baseoption = {
					tooltip: {
						show: self.showTip,
						showContent: self.showContent,
						confine: true,
						trigger: 'axis',
						axisPointer: {
							type: 'line'
						},
						formatter: self.formatterFun
					},
					legend: {
						left: 30,
						data: []
					},
					xAxis: [{
						type: 'category',
						data: [].map(function(str) {
							return str.replace(' ', '\n');
						}),
						splitLine: {
							show: false
						},
						axisLabel: {
							textStyle: {
								fontSize: 10
							},
							formatter: self.xLabelFormatterFun,
							interval: 0
						}
					}],
					yAxis: [{
						type: 'value',
						splitLine: {
							show: false
						}
					}],
					series: []
				};
			},

			themeChanged: Ember.observer('customTheme', function() {
				this.notifyPropertyChange('datasource');
			}),

			datasourceChanged: Ember.observer('datasource', function() {
				var data = this.get('datasource');
				var option = this.initialOption();
				if(data && data.length > 0) {

					for(var i = 0; i < data.length; i++) {
						if(this.showLegend) {
							option.legend.data.push(data[i].title);
						}
						var dataobj = $.extend(true, {
							name: data[i].title,
							type: this.chartType,
							showSymbol: this.showSymbol,
							data: []
						}, this.get('customTheme') && this.get('customTheme').series);

						if(data[i].color) {
							dataobj.itemStyle = {
								normal: {
									color: data[i].color
								}
							};
						}

						if(this.xlabelType === 0) {
							for(var j = 0; j < data[i].data.length; j++) {
								if(option.xAxis[0].data.indexOf(data[i].data[j].name) === -1) {
									option.xAxis[0].data.push(data[i].data[j].name);
								}
								dataobj.data.push(data[i].data[j].value);
							}
						} else {
							for(var m = 0; m < data[i].data.length; m++) {
								if(option.xAxis[0].data.indexOf(data[i].data[m].name) === -1) {
									if(option.xAxis[0].data.length % 2 === 0) {
										option.xAxis[0].data.push(data[i].data[m].name);
									} else {
										option.xAxis[0].data.push("\n" + data[i].data[m].name);
									}
								}
								dataobj.data.push(data[i].data[m].value);
							}
						}

						option.series.push(dataobj);
					}
					if(this.markLineFlag) {
						var markLineSource = this.get('marklineSource');
						if(markLineSource) {
							option.series[0].markLine = {
								silent: true,
								data: markLineSource
							};
						}
					}
				}
				this.setOption(option);
			}).on('didInsertElement'),

			initialOption: function() {
				var option = $.extend(true, {}, this.baseoption, this.get('customTheme') && this.get('customTheme').option);
				option.grid = {
					top: this.gridTop,
					left: this.gridLeft,
					right: this.gridRight,
					bottom: this.gridBottom,
					containLabel: true
				};
				option.xAxis[0].axisLabel.interval = this.xInterval;

				return option;
			},

			showMarkLine: function() {
				this.markLineFlag = true;
				this.notifyPropertyChange('datasource');
			},

			hideMarkLine: function() {
				this.markLineFlag = false;
				this.notifyPropertyChange('datasource');
			},

			chartResize: function(width, height) {
				this.$('.echart-main-div').width(width);
				this.$('.echart-main-div').height(height);
				if(this.getChart()) {
					this.getChart().resize();
				}
			},

		});
	});