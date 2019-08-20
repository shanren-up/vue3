define(
  [
    'app',
    'text!./common/components/comp_echart/comp_echart_stdline/comp_echart_stdline.html',
    './common/components/comp_echart/comp_echart_base',
    'css!./common/components/comp_echart/comp_echart.css'
  ],

  function (app, template, chartbase) {

      "use strict";

      app.CompEchartStdlineComponent = chartbase.extend({

          layout: Ember.ExtendHelper.compileEx(template),

          templateName: 'comp-echart-stdline',

          init: function () {
              this._super();
          },

          didInsertElement: function () {
              this._super();
          },

          baseoption: {
              tooltip: {
                  trigger: 'axis'
              },
              xAxis: [
                  {
                      type: 'category',
                      data: []
                  }
              ],
              yAxis: [
                  {
                      type: 'value'
                  }
              ],
              series: [],
          },

          datasourceChanged: Ember.observer('datasource', function () {
              var data = this.get('datasource');
              if (data) {
                  var option = this.initialOption();

                  for (var i = 0; i < data.length; i++) {
                      var dataobj = $.extend(true, { type: 'line', data: [] }, this.get('customTheme') && this.get('customTheme').series);
                      for (var j = 0; j < data[i].length; j++) {
                          if (option.xAxis[0].data.indexOf(data[i][j].name) === -1) {
                              option.xAxis[0].data.push(data[i][j].name);
                          }
                          dataobj.data.push(data[i][j].value);
                      }
                      option.series.push(dataobj);
                  }

                  this.setOption(option);
              }
          }).on('didInsertElement'),

          initialOption: function () {
              var option = $.extend(true, {}, this.baseoption, this.get('customTheme') && this.get('customTheme').option);

              var splitY = this.get('splitY');
              if (splitY) {
                  option.yAxis[0].splitNumber = splitY;
              } else {
                  option.yAxis[0].splitNumber = 4;
              }

              return option;
          }
      });
  });