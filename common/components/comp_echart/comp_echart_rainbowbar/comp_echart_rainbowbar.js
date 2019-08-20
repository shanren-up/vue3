define(
  [
    'app',
    'text!./common/components/comp_echart/comp_echart_rainbowbar/comp_echart_rainbowbar.html',
    './common/components/comp_echart/comp_echart_base',
    'css!./common/components/comp_echart/comp_echart.css'
  ],

  function (app, template, chartbase) {

      "use strict";

      app.CompEchartRainbowbarComponent = chartbase.extend({
          layout: Ember.ExtendHelper.compileEx(template),

          templateName: 'comp-echart-rainbowbar',

          init: function () {
              this._super();
          },

          didInsertElement: function () {
              this._super();
          },

          baseoption: {
              tooltip: {
                  trigger: 'item'
              },
              xAxis: [{
                  type: 'category',
                  data: []
              }],
              yAxis: [{
                  type: 'value',
              }],
              series: [{
                  type: 'bar',
                  itemStyle: {
                      normal: {
                          color: function (params) {
                              var colorList = [
                                '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                              ];
                              return colorList[params.dataIndex];
                          },
                          label: {
                              show: true,
                              position: 'top',
                              formatter: '{c}'
                          }
                      }
                  },
                  data: []
              }]
          },

          datasourceChanged: Ember.observer('datasource', function () {
              var data = this.get('datasource');
              if (data) {
                  var option = this.initialOption();

                  for (var i = 0; i < data.length; i++) {
                      option.xAxis[0].data.push(data[i].name);
                      option.series[0].data.push(data[i].value);
                  }

                  this.setOption(option);
              }
          }).on('didInsertElement'),

          initialOption: function () {
              var option = $.extend(true, {}, this.baseoption);

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

              return option;
          }
      });
  });