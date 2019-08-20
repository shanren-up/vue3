define(
	[
		'app',
		'./comp_echart_circlebar.js'
	],
	function(app) {

		'use strict';

		app.CompEchartCirclebarDemoComponent = Ember.Component.extend({
			layout: Ember.ExtendHelper.compileEx('{{comp-echart-circlebar datasource=datasource height=600 width=800}}'),
			templateName: 'comp-echart-circlebar-demo',
			classNames: ['comp-echart-circlebar-demo', 'absoulte'],
			init: function() {
				this._super();
				this.datasource = {
					// startAngle: 180,
					// endAngle: 0,
					// barWidth: 20,
					value: 0.5, //0-1
					color: 'red',
					bgColor: "yellow",
					showDetail: true,
					// //默认与color一致，不一致时传参数
					// textColor: '#F37B1D',
					// fontSize: 30,
				};
			},
			didInsertElement: function() {

			},
			willDestroyElement: function() {

			},
			actions: {}
		});
	}
);