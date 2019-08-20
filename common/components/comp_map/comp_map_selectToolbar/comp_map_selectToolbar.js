define(
	[
		'app',
        'json!./cultureInfo.json',
		'configs',
		'text!./comp_map_selectToolbar.html',
		'common/businessviews/view_comp_map/view_comp_map_services/view_comp_map_helper',
		'css!./comp_map_selectToolbar.css'
	],
	function(app, cultureInfo, configs, template, mapHelper) {

		"use strict";
        Ember.addJsonCultureInfo(cultureInfo);

		app.CompMapSelectToolbarComponent = Ember.Component.extend({
			layout: Ember.ExtendHelper.compileEx(template),
			templateName: 'comp-map-selectToolbar',
			tpMap: null,
			segments: null,
			graphic: null,
			layerSettingClick: null,
			init: function() {
				this._super();
			},
			didInsertElement: function() {
				this.findNames();
				this.$('.button-toggle, .button-complete').on('click', function() {
					this.$('.box').toggle();
				}.bind(this));
			},
			willDestroyElement: function() {},
			drawGraphicList: [], //框选几何空间graphic集合
			items: [{
				name: Ember.oloc('comp_map_selectToolbar_jxxk'),
				Text: Ember.oloc('comp_map_selectToolbar_jxxk'),
				tooltip: Ember.oloc('comp_map_selectToolbar_jxxk'),
				image: 'lib/resources/tools/rect.png',
				action: function() {
					var tpMap = this.get('target'),
						b = tpMap._graphView;
					tpMap.clearContextMenu();
					var self = this;
					tp.Default.DrawObject._drawState = 5;
					var c = tp.Default.OperateObject.curInterator = new CreateVectorInteractor(b, tpMap.getView());
					b.setInteractors(new ht.List([new ht.graph.SelectInteractor(b), new ht.graph.EditInteractor(b), new ht.graph.MoveInteractor(b), new ht.graph.DefaultInteractor(b), c]));
					b.getView().style.cursor = "url(" + ctx + "/resources/cursor/cursor_black.cur), pointer";
					c._vectorType = "rect";
					c._fillStyle = "rgba(0,255,0,0.3)";
					c.onCreateStarted = function() {
						b.getView().style.cursor = "url(" + ctx + "/resources/cursor/cursor_black.cur), pointer";
					};
					c.onCreateCompleted = function(c) {

						var x = c._position.x;
						var y = c._position.y;
						var width = c._width;
						var height = c._height;
						var x2 = x + width;
						var y2 = y;
						var x3 = x + width;
						var y3 = y - height;
						var x4 = x;
						var y4 = y - height;
						var x5 = x;
						var y5 = y;
						var pointList = [];
						pointList.push(new L.Point(x, y, false));
						pointList.push(new L.Point(x2, y2, false));
						pointList.push(new L.Point(x3, y3, false));
						pointList.push(new L.Point(x4, y4, false));
						pointList.push(new L.Point(x5, y5, false));
						var map = tpMap.getMap();
						var segments = new ht.List();
						for(var i = 0; i < pointList.length; i++) {
							var point = pointList[i];
							var latLng = L.latLng(map.containerPointToLatLng(point).lat, map.containerPointToLatLng(point).lng);
							segments.add(latLng);
						}
						self.segments = segments;
						var lngLat = L.latLng(map.containerPointToLatLng(pointList[0]).lat, map.containerPointToLatLng(pointList[0]).lng);
						c.a("latLng", lngLat);
						//转化图形为字符串
						var segementsStr = "";
						if(segments !== null && segments !== "") {
							segementsStr = "polygon ((";
							for(var j = 0; j < segments._as.length; j++) {
								segementsStr += segments._as[j].lng + " " + segments._as[j].lat + ",";
							}
							if(segementsStr.length > 0) {
								segementsStr = segementsStr.substring(0, segementsStr.length - 1);
							}
							segementsStr += " ))";
						}
						self.graphic = segementsStr;
						tp.Default.DrawObject._movePointState = 0;
						tp.Default.DrawObject._drawState = 0;
						b.getView().style.cursor = 'hand';
						b.setEditable(false);
						self.drawGraphicList.push(segementsStr);
					};
				}
			}, {
				name: Ember.oloc('comp_map_selectToolbar_zdyxk'),
				Text: Ember.oloc('comp_map_selectToolbar_zdyxk'),
				tooltip: Ember.oloc('comp_map_selectToolbar_zdyxk'),
				image: 'lib/resources/tools/poly.png',
				action: function() {
					var self = this;
					var tpMap = this.get('target'),
						b = tpMap._graphView;
					tpMap.clearContextMenu();
					tp.Default.DrawObject._drawState = 5;
					var c = tp.Default.OperateObject.curInterator = new CreateVectorInteractor(b, tpMap.getView());
					b.setInteractors(new ht.List([new ht.graph.SelectInteractor(b), new ht.graph.EditInteractor(b), new ht.graph.MoveInteractor(b), new ht.graph.DefaultInteractor(b), c]));
					b.getView().style.cursor = "url(" + ctx + "/resources/cursor/cursor_black.cur), pointer";
					c._vectorType = "shape";
					c._fillStyle = "rgba(0,255,0,0.3)";
					c.onCreateStarted = function() {
						b.getView().style.cursor = "url(" + ctx + "/resources/cursor/cursor_black.cur), pointer";
					};
					c.onCreateCompleted = function(c) {
						var map = self.get('target').getMap();
						if(c instanceof ht.Shape) {
							var e = c.getSegments();
							self.segments = e;
							self.segments = c.getPoints()._as;
							var segments = new ht.List();
							for(var i = 0; i < self.segments.length; i++) {
								var point = self.segments[i];
								var temp = new L.Point(point.x, point.y, false);
								var latLng = L.latLng(map.containerPointToLatLng(temp).lat, map.containerPointToLatLng(temp).lng);
								segments.add(latLng);
							}
							self.segments = segments;
							e._as[e.size()] = 5;
							//转化图形为字符串
							var segementsStr = "";
							if(segments !== null && segments !== "") {
								segementsStr = "polygon ((";
								for(var j = 0; j < segments._as.length; j++) {
									segementsStr += segments._as[j].lng + " " + segments._as[j].lat + ",";
								}
								segementsStr += segments._as[0].lng + " " + segments._as[0].lat + ",";
								if(segementsStr.length > 0) {
									segementsStr = segementsStr.substring(0, segementsStr.length - 1);
								}
								segementsStr += " ))";
							}
							self.graphic = segementsStr;
							self.drawGraphicList.push(segementsStr);
						}
						tp.Default.DrawObject._movePointState = 0;
						tp.Default.DrawObject._drawState = 0;
						b.getView().style.cursor = 'hand';
						b.setEditable(false);
					};
				}
			}, {
				name: Ember.oloc('comp_map_selectToolbar_yxxk'),
				Text: Ember.oloc('comp_map_selectToolbar_yxxk'),
				tooltip: Ember.oloc('comp_map_selectToolbar_yxxk'),
				image: 'lib/resources/tools/circle.png',
				action: function() {
					var self = this;
					var tpMap = this.get('target'),
						b = tpMap._graphView;
					tpMap.clearContextMenu();
					tp.Default.DrawObject._drawState = 5;
					var c = tp.Default.OperateObject.curInterator = new CreateVectorInteractor(b, tpMap.getView());
					b.setInteractors(new ht.List([new ht.graph.SelectInteractor(b), new ht.graph.EditInteractor(b), new ht.graph.MoveInteractor(b), new ht.graph.DefaultInteractor(b), c]));
					b.getView().style.cursor = "url(" + ctx + "/resources/cursor/cursor_black.cur), pointer";
					c._vectorType = "circle";
					c._fillStyle = "rgba(0,255,0,0.3)";
					c.onCreateStarted = function() {
						b.getView().style.cursor = "url(" + ctx + "/resources/cursor/cursor_black.cur), pointer";
					};
					c.onCreateCompleted = function(c) {

						var x0 = c._position.x;
						var y0 = c._position.y;
						var x = c._position.x - c._width / 2.0;
						var y = c._position.y - c._width / 2.0;
						var width = c._width;
						var height = c._height;
						var x2 = x + width;
						var y2 = y;
						var x3 = x + width;
						var y3 = y - height;
						var x4 = x;
						var y4 = y - height;
						var x5 = x;
						var y5 = y;
						var pointList = [];
						pointList.push(new L.Point(x, y, false));
						pointList.push(new L.Point(x2, y2, false));
						pointList.push(new L.Point(x3, y3, false));
						pointList.push(new L.Point(x4, y4, false));
						pointList.push(new L.Point(x5, y5, false));
						var map = tpMap.getMap();
						var segments = new ht.List();
						for(var i = 0; i < pointList.length; i++) {
							var point = pointList[i];
							var latLng = L.latLng(map.containerPointToLatLng(point).lat, map.containerPointToLatLng(point).lng);
							segments.add(latLng);
						}
						self.segments = segments;

						//转化图形为字符串
						var segementsStr = "";
						if(segments !== null && segments !== "") {
							segementsStr = "polygon ((";
							for(var j = 0; j < segments._as.length; j++) {
								segementsStr += segments._as[j].lng + " " + segments._as[j].lat + ",";
							}
							if(segementsStr.length > 0) {
								segementsStr = segementsStr.substring(0, segementsStr.length - 1);
							}
							segementsStr += " ))";
						}
						var lngLat = L.latLng(map.containerPointToLatLng(pointList[0]).lat, map.containerPointToLatLng(pointList[0]).lng);
						c.a("latLng", lngLat);
						self.graphic = segementsStr;
						//b.getView().style.cursor = "default";
						tp.Default.DrawObject._movePointState = 0;
						tp.Default.DrawObject._drawState = 0;
						b.getView().style.cursor = 'hand';
						b.setEditable(false);
						self.drawGraphicList.push(segementsStr);
					};
				}
			}],
			actions: {
				drawCompleted: function() {
					if(this.drawGraphicList.length > 0) {
						this.sendAction('drawCompleted', this.drawGraphicList);
					}
				}
			}
		});
	});
