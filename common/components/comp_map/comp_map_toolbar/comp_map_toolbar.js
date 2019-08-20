define(
    [
        'app',
        'json!./cultureInfo.json',
        'configs',
        'text!./comp_map_toolbar.html',
        'common/businessviews/view_comp_map/view_comp_map_services/view_comp_map_helper',
        'css!./comp_map_toolbar.css'
    ],
    function(app, cultureInfo, configs, template, mapHelper) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);

        app.CompMapToolbarComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-map-toolbar',
            tpMap: null,
            segments: null,
            graphic: null,
            layerSettingClick: null,
            init: function() {
                this._super();
            },
            didInsertElement: function() {
                this.findNames();
            },
            willDestroyElement: function() {},
            //框选完成
            drawcompleted: function() {
                if (this !== undefined) {
                    this.sendAction('drawcompleted', this.graphic);
                }
            },
            items: [{
                    name: Ember.oloc('comp_map_toolbar_py'),
                    Text: 'Pan',
                    tooltip: Ember.oloc('comp_map_toolbar_py'),
                    image: 'lib/resources/tools/pan.png',
                    imageHover: 'lib/resources/tools/pan_click.png',
                    action: function() {
                        var tpMap = this.get('target');
                        tp.Default.DrawObject._movePointState = 0;
                        tp.Default.DrawObject._drawState = 0;
                        tpMap.getGraphView().getView().style.cursor = 'hand';
                    },
                }, {
                    name: Ember.oloc('comp_map_toolbar_fd'),
                    Text: 'ZoomIn',
                    tooltip: Ember.oloc('comp_map_toolbar_fd'),
                    image: 'lib/resources/tools/zoomin.png',
                    imageHover: 'lib/resources/tools/zoomin_click.png',
                    action: function() {
                        var tpMap = this.get('target');
                        if (tpMap.getMap().getZoom() < tpMap.getMap().getMaxZoom()) {
                            tpMap.getMap().zoomIn();
                        }
                    }
                }, {
                    name: Ember.oloc('comp_map_toolbar_sx'),
                    Text: 'ZoomOut',
                    tooltip: Ember.oloc('comp_map_toolbar_sx'),
                    image: 'lib/resources/tools/zoomout.png',
                    imageHover: 'lib/resources/tools/zoomout_click.png',
                    action: function() {
                        var tpMap = this.get('target');
                        if (tpMap.getMap().getZoom() > tpMap.getMap().getMinZoom()) {
                            tpMap.getMap().zoomOut();
                        }
                    }
                }, {
                    name: Ember.oloc('comp_map_toolbar_cj'),
                    Text: 'ZoomIn',
                    tooltip: Ember.oloc('comp_map_toolbar_cj'),
                    image: 'lib/resources/tools/measure.png',
                    imageHover: 'lib/resources/tools/measure_click.png',
                    action: function() {
                        var tpMap = this.get('target');
                        tpMap.measureLine();
                    }
                }, {
                    name: Ember.oloc('comp_map_toolbar_cm'),
                    Text: 'ZoomIn',
                    tooltip: Ember.oloc('comp_map_toolbar_cm'),
                    image: 'lib/resources/tools/measurearea.png',
                    imageHover: 'lib/resources/tools/measurearea_click.png',
                    action: function() {
                        var tpMap = this.get('target');
                        tpMap.measurePloygon();
                    }
                }, {
                    name: Ember.oloc('comp_map_toolbar_qt'),
                    Text: 'ZoomIn',
                    tooltip: Ember.oloc('comp_map_toolbar_qt'),
                    image: 'lib/resources/tools/fullscreen.png',
                    imageHover: 'lib/resources/tools/fullscreen_click.png',
                    action: function() {
                        var tpMap = this.get('target');
                        var origLatLng = L.latLng(tpMap._config.map.viewEntire.origLat, tpMap._config.map.viewEntire.origLng);
                        var destLatLng = L.latLng(tpMap._config.map.viewEntire.destLat, tpMap._config.map.viewEntire.destLng);
                        var bounds = L.latLngBounds(origLatLng, destLatLng);
                        tpMap.getMap().fitBounds(bounds);
                    }
                }, {
                    name: Ember.oloc('comp_map_toolbar_qc'),
                    Text: 'Clear',
                    tooltip: Ember.oloc('comp_map_toolbar_qc'),
                    image: 'lib/resources/tools/clear.png',
                    imageHover: 'lib/resources/tools/clear_click.png',
                    action: function() {
                        var tpMap = this.get('target');
                        tpMap.reset();
                    }
                }, {
                    name: Ember.oloc('comp_map_toolbar_tcsz'),
                    Text: Ember.oloc('comp_map_toolbar_tcsz'),
                    tooltip: Ember.oloc('comp_map_toolbar_tcsz'),
                    image: 'lib/resources/tools/layer.png',
                    imageHover: 'lib/resources/tools/layer_click.png',
                    action: function() {
                        if (this.layerSettingClick && this.layerSettingClick !== null) {
                            this.layerSettingClick();
                        }
                    }
                },
                //			{
                //				name: '矩形框选',
                //				Text: '矩形框选',
                //				tooltip: '矩形框选',
                //				image: 'lib/resources/tools/rect.png',
                //				action: function() {
                //					var tpMap = this.get('target'),
                //						b = tpMap._graphView;
                //					tpMap.clearContextMenu();
                //					//					tpMap.reset();
                //					var self = this;
                //					tp.Default.DrawObject._drawState = 5;
                //					var c = tp.Default.OperateObject.curInterator = new CreateVectorInteractor(b, tpMap.getView());
                //					b.setInteractors(new ht.List([new ht.graph.SelectInteractor(b), new ht.graph.EditInteractor(b), new ht.graph.MoveInteractor(b), new ht.graph.DefaultInteractor(b), c]));
                //					b.getView().style.cursor = "url(" + ctx + "/resources/cursor/cursor_black.cur), pointer";
                //					c._vectorType = "rect";
                //					c._fillStyle = "rgba(0,255,0,0.3)";
                //					c.onCreateStarted = function() {
                //						b.getView().style.cursor = "url(" + ctx + "/resources/cursor/cursor_black.cur), pointer";
                //					};
                //					c.onCreateCompleted = function(c) {
                //
                //						var x = c._position.x;
                //						var y = c._position.y;
                //						var width = c._width;
                //						var height = c._height;
                //						var x2 = x + width;
                //						var y2 = y;
                //						var x3 = x + width;
                //						var y3 = y - height;
                //						var x4 = x;
                //						var y4 = y - height;
                //						var x5 = x;
                //						var y5 = y;
                //						var pointList = [];
                //						pointList.push(new L.Point(x, y, false));
                //						pointList.push(new L.Point(x2, y2, false));
                //						pointList.push(new L.Point(x3, y3, false));
                //						pointList.push(new L.Point(x4, y4, false));
                //						pointList.push(new L.Point(x5, y5, false));
                //						var map = tpMap.getMap();
                //						var segments = new ht.List();
                //						for(var i = 0; i < pointList.length; i++) {
                //							var point = pointList[i];
                //							var latLng = L.latLng(map.containerPointToLatLng(point).lat, map.containerPointToLatLng(point).lng);
                //							segments.add(latLng);
                //						}
                //						self.segments = segments;
                //						var lngLat = L.latLng(map.containerPointToLatLng(pointList[0]).lat, map.containerPointToLatLng(pointList[0]).lng);
                //						c.a("latLng", lngLat);
                //						//转化图形为字符串
                //						var segementsStr = "";
                //						if(segments !== null && segments !== "") {
                //							segementsStr = "polygon ((";
                //							for(var j = 0; j < segments._as.length; j++) {
                //								segementsStr += segments._as[j].lng + " " + segments._as[j].lat + ",";
                //							}
                //							if(segementsStr.length > 0) {
                //								segementsStr = segementsStr.substring(0, segementsStr.length - 1);
                //							}
                //							segementsStr += " ))";
                //						}
                //						self.graphic = segementsStr;
                //						tp.Default.DrawObject._movePointState = 0;
                //						tp.Default.DrawObject._drawState = 0;
                //						b.getView().style.cursor = 'hand';
                //						b.setEditable(false);
                //					};
                //					self.drawcompleted();
                //				}
                //			}, {
                //				name: '多边形框选',
                //				Text: '多边形框选',
                //				tooltip: '多边形框选',
                //				image: 'lib/resources/tools/poly.png',
                //				action: function() {
                //					var self = this;
                //					var tpMap = this.get('target'),
                //						b = tpMap._graphView;
                //					tpMap.clearContextMenu();
                //					tp.Default.DrawObject._drawState = 5;
                //					var c = tp.Default.OperateObject.curInterator = new CreateVectorInteractor(b, tpMap.getView());
                //					b.setInteractors(new ht.List([new ht.graph.SelectInteractor(b), new ht.graph.EditInteractor(b), new ht.graph.MoveInteractor(b), new ht.graph.DefaultInteractor(b), c]));
                //					b.getView().style.cursor = "url(" + ctx + "/resources/cursor/cursor_black.cur), pointer";
                //					c._vectorType = "shape";
                //					c._fillStyle = "rgba(0,255,0,0.3)";
                //					c.onCreateStarted = function() {
                //						b.getView().style.cursor = "url(" + ctx + "/resources/cursor/cursor_black.cur), pointer";
                //					};
                //					c.onCreateCompleted = function(c) {
                //						var map = self.get('target').getMap();
                //						if(c instanceof ht.Shape) {
                //							var e = c.getSegments();
                //							self.segments = e;
                //							self.segments = c.getPoints()._as;
                //							var segments = new ht.List();
                //							for(var i = 0; i < self.segments.length; i++) {
                //								var point = self.segments[i];
                //								var temp = new L.Point(point.x, point.y, false);
                //								var latLng = L.latLng(map.containerPointToLatLng(temp).lat, map.containerPointToLatLng(temp).lng);
                //								segments.add(latLng);
                //							}
                //							self.segments = segments;
                //							e._as[e.size()] = 5;
                //							//							c.setStyle("shape.background", "rgba(0,128,192,0.5)");
                //							//							c.setStyle("shape.border.color", "rgba(255,0,0,0.7)");
                //							tpMap.refreshPolygon(c);
                //							tp.Default.DrawObject._drawPloygonList.push(c);
                //
                //							mapHelper.drawPolygon("temp", segments, tpMap); //绘制框选范围
                //
                //							//转化图形为字符串
                //							var segementsStr = "";
                //							if(segments !== null && segments !== "") {
                //								segementsStr = "polygon ((";
                //								for(var j = 0; j < segments._as.length; j++) {
                //									segementsStr += segments._as[j].lng + " " + segments._as[j].lat + ",";
                //								}
                //								if(segementsStr.length > 0) {
                //									segementsStr = segementsStr.substring(0, segementsStr.length - 1);
                //								}
                //								segementsStr += " ))";
                //							}
                //							self.graphic = segementsStr;
                //							self.drawcompleted();
                //						}
                //						tp.Default.DrawObject._movePointState = 0;
                //						tp.Default.DrawObject._drawState = 0;
                //						b.getView().style.cursor = 'hand';
                //					};
                //				}
                //			}, {
                //				name: '圆形框选',
                //				Text: '圆形框选',
                //				tooltip: '圆形框选',
                //				image: 'lib/resources/tools/circle.png',
                //				action: function() {
                //					var self = this;
                //					var tpMap = this.get('target'),
                //						b = tpMap._graphView;
                //					tpMap.clearContextMenu();
                //					tp.Default.DrawObject._drawState = 5;
                //					var c = tp.Default.OperateObject.curInterator = new CreateVectorInteractor(b, tpMap.getView());
                //					b.setInteractors(new ht.List([new ht.graph.SelectInteractor(b), new ht.graph.EditInteractor(b), new ht.graph.MoveInteractor(b), new ht.graph.DefaultInteractor(b), c]));
                //					b.getView().style.cursor = "url(" + ctx + "/resources/cursor/cursor_black.cur), pointer";
                //					c._vectorType = "circle";
                //					c._fillStyle = "rgba(0,255,0,0.3)";
                //					c.onCreateStarted = function() {
                //						b.getView().style.cursor = "url(" + ctx + "/resources/cursor/cursor_black.cur), pointer";
                //					};
                //					c.onCreateCompleted = function(c) {
                //
                //						var x0 = c._position.x;
                //						var y0 = c._position.y;
                //						var x = c._position.x - c._width / 2.0;
                //						var y = c._position.y - c._width / 2.0;
                //						var width = c._width;
                //						var height = c._height;
                //						var x2 = x + width;
                //						var y2 = y;
                //						var x3 = x + width;
                //						var y3 = y - height;
                //						var x4 = x;
                //						var y4 = y - height;
                //						var x5 = x;
                //						var y5 = y;
                //						var pointList = [];
                //						pointList.push(new L.Point(x, y, false));
                //						pointList.push(new L.Point(x2, y2, false));
                //						pointList.push(new L.Point(x3, y3, false));
                //						pointList.push(new L.Point(x4, y4, false));
                //						pointList.push(new L.Point(x5, y5, false));
                //						var map = tpMap.getMap();
                //						var segments = new ht.List();
                //						for(var i = 0; i < pointList.length; i++) {
                //							var point = pointList[i];
                //							var latLng = L.latLng(map.containerPointToLatLng(point).lat, map.containerPointToLatLng(point).lng);
                //							segments.add(latLng);
                //						}
                //						self.segments = segments;
                //
                //						//转化图形为字符串
                //						var segementsStr = "";
                //						if(segments !== null && segments !== "") {
                //							segementsStr = "polygon ((";
                //							for(var j = 0; j < segments._as.length; j++) {
                //								segementsStr += segments._as[j].lng + " " + segments._as[j].lat + ",";
                //							}
                //							if(segementsStr.length > 0) {
                //								segementsStr = segementsStr.substring(0, segementsStr.length - 1);
                //							}
                //							segementsStr += " ))";
                //						}
                //						var lngLat = L.latLng(map.containerPointToLatLng(pointList[0]).lat, map.containerPointToLatLng(pointList[0]).lng);
                //						c.a("latLng", lngLat);
                //						self.graphic = segementsStr;
                //						//b.getView().style.cursor = "default";
                //						tp.Default.DrawObject._movePointState = 0;
                //						tp.Default.DrawObject._drawState = 0;
                //						b.getView().style.cursor = 'hand';
                //						b.setEditable(false);
                //						self.drawcompleted();
                //					};
                //				}
                //			}, 
                {
                    id: 'camera',
                    image: 'lib/resources/tools/export.png',
                    imageHover: 'lib/resources/tools/export_click.png',
                    name: Ember.oloc('comp_map_toolbar_bc'),
                    tooltip: Ember.oloc('comp_map_toolbar_dcdt'),
                    action: function() {
                        var doc = window.open().document;
                        doc.open();
                        var mapPane = window.document.getElementsByClassName("leaflet-map-pane")[0];
                        doc.write("<link rel=\"stylesheet\" href=\"" + ctx + "/jslib/tp/tp-map.css\">");
                        doc.write("<link rel=\"stylesheet\" href=\"" + ctx + "/jslib/leaflet/leaflet.css\">");
                        doc.write(mapPane.outerHTML);
                        doc.write(this.getGraphView().getView());
                        doc.close();
                        doc.title = Ember.oloc('comp_map_toolbar_dctp ') + new Date();
                    }
                }
            ],
            actions: {

                //mouseEnter
                itemHover: function(index) {
                    this.$('li:nth-child(' + (index + 1) + ') img').attr('src', this.items[index].imageHover);
                },

                //mouseLeave
                itemHoverLeave: function(index) {
                    this.$('li:nth-child(' + (index + 1) + ') img').attr('src', this.items[index].image);
                }
            }
        });
    });