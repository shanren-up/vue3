// A layer control which provides for layer groupings. 
// Author: Ishmael Smyrnow;modidfy finished by  xueyh 20140222
L.Control.GroupedLayersEsri = L.Control
		.extend({
			options : {
				collapsed : true,
				position : 'topright',
				autoZIndex : true
			},
			// static dynamic
			initialize : function(baseLayers, groupedOverlays, maplayers,
					options) {
				this._maplayers = maplayers;
				this._baseLayers = baseLayers;
				this._groupedOverlays = groupedOverlays;
				L.Util.setOptions(this, options);
				this._dynmic = {};
				this._layers = {};
				this._lastZIndex = 0;
				this._handlingClick = false;
				this._groupList = [];
				this._domGroups = [];

				for ( var i in baseLayers) {
					for (j in baseLayers[i]) {
						this._addLayer(baseLayers[i][j], j, i, true);
						// this._addLayer(baseLayers[i][j],j);
					}
				}

				for (i in groupedOverlays) {
					for (j in groupedOverlays[i]) {
						this._addLayer(groupedOverlays[i][j], j, i, true);
					}
				}
			},

			onAdd : function(map) {
				this._initLayout();
				this._update();

				map.on('layeradd', this._onLayerChange, this).on('layerremove',
						this._onLayerChange, this);

				return this._container;
			},

			onRemove : function(map) {
				map.off('layeradd', this._onLayerChange).off('layerremove',
						this._onLayerChange);
			},

			addBaseLayer : function(layer, name) {
				this._addLayer(layer, name);
				this._update();
				return this;
			},

			addOverlay : function(layer, name, group) {
				this._addLayer(layer, name, group, true);
				this._update();
				return this;
			},

			removeLayer : function(layer) {
				var id = L.Util.stamp(layer);
				delete this._layers[id];
				this._update();
				return this;
			},

			_initLayout : function() {
				var className = 'leaflet-control-layers', container = this._container = L.DomUtil
						.create('div', className);

				// Makes this work on IE10 Touch devices by stopping it from
				// firing a mouseout event when the touch is released
				container.setAttribute('aria-haspopup', true);

				if (!L.Browser.touch) {
					L.DomEvent.disableClickPropagation(container);
					L.DomEvent.on(container, 'wheel',
							L.DomEvent.stopPropagation);
				} else {
					L.DomEvent.on(container, 'click',
							L.DomEvent.stopPropagation);
				}

				var form = this._form = L.DomUtil.create('form', className
						+ '-list');

				if (this.options.collapsed) {
					if (!L.Browser.android) {
						L.DomEvent.on(container, 'mouseover', this._expand,
								this).on(container, 'mouseout', this._collapse,
								this);
					}
					var link = this._layersLink = L.DomUtil.create('a',
							className + '-toggle', container);
					link.href = '#';
					link.title = 'Layers';

					if (L.Browser.touch) {
						L.DomEvent.on(link, 'click', L.DomEvent.stop).on(link,
								'click', this._expand, this);
					} else {
						L.DomEvent.on(link, 'focus', this._expand, this);
					}

					this._map.on('click', this._collapse, this);
					// TODO keyboard accessibility
				} else {
					this._expand();
				}

				this._baseLayersList = L.DomUtil.create('div', className
						+ '-base', form);
				this._separator = L.DomUtil.create('div', className
						+ '-separator', form);
				this._overlaysList = L.DomUtil.create('div', className
						+ '-overlays', form);

				container.appendChild(form);
			},

			_addLayer : function(layer, name, group, overlay) {
				var id = L.Util.stamp(layer.maplayer);
				this._layers[name] = {
					layer : layer.maplayer,
					name : name,
					maptype : layer.maptype,
					mapid : id,
					visible : layer.visible,
					layerids : layer.layerid,
					overlay : overlay
				};

				if (group) {
					var groupId = this._groupList.indexOf(group);

					if (groupId === -1) {
						groupId = this._groupList.push(group) - 1;
					}

					this._layers[name].group = {
						name : group,
						id : groupId
					};
				}

				if (this.options.autoZIndex && layer.setZIndex) {
					this._lastZIndex++;
					layer.setZIndex(this._lastZIndex);
				}
			},

			_update : function() {
				if (!this._container) {
					return;
				}

				this._baseLayersList.innerHTML = '';
				this._overlaysList.innerHTML = '';
				this._domGroups.length = 0;

				var baseLayersPresent = false, overlaysPresent = false, i, obj;

				for (i in this._layers) {
					obj = this._layers[i];
					this._addItem(obj);
					overlaysPresent = overlaysPresent || obj.overlay;
					baseLayersPresent = baseLayersPresent || !obj.overlay;
				}

				this._separator.style.display = overlaysPresent
						&& baseLayersPresent ? '' : 'none';
			},

			_onLayerChange : function(e) {
				var obj = this._layers[L.Util.stamp(e.layer)];

				if (!obj) {
					return;
				}

				if (!this._handlingClick) {
					this._update();
				}

				var type = obj.overlay ? (e.type === 'layeradd' ? 'overlayadd'
						: 'overlayremove')
						: (e.type === 'layeradd' ? 'baselayerchange' : null);

				if (type) {
					this._map.fire(type, obj);
				}
			},

			// IE7 bugs out if you create a radio dynamically, so you have to do
			// it this hacky way (see http://bit.ly/PqYLBe)
			_createRadioElement : function(name, checked) {

				var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="'
						+ name + '"';
				if (checked) {
					radioHtml += ' checked="checked"';
				}
				radioHtml += '/>';

				var radioFragment = document.createElement('div');
				radioFragment.innerHTML = radioHtml;

				return radioFragment.firstChild;
			},

			_addItem : function(obj) {
				var label = document.createElement('label'), input, checked = this._map
						.hasLayer(obj.layer);

				if (obj.overlay) {
					input = document.createElement('input');
					input.type = 'checkbox';
					input.className = 'leaflet-control-layers-selector';
					input.defaultChecked = checked;
				} else {
					input = this._createRadioElement('leaflet-base-layers',
							checked);
				}

				input.layerId = L.Util.stamp(obj.layer);
				// input.layerId = L.Util.stamp(obj.name);
				input.name = obj.name;
				L.DomEvent.on(input, 'click', this._onInputClick, this);

				var name = document.createElement('span');
				name.innerHTML = ' ' + obj.name;

				label.appendChild(input);
				label.appendChild(name);

				if (obj.overlay) {
					container = this._overlaysList;

					var groupContainer = this._domGroups[obj.group.id];

					// Create the group container if it doesn't exist
					if (!groupContainer) {
						groupContainer = document.createElement('div');
						groupContainer.className = 'leaflet-control-layers-group';
						groupContainer.id = 'leaflet-control-layers-group-'
								+ obj.group.id;

						var groupLabel = document.createElement('span');
						groupLabel.className = 'leaflet-control-layers-group-name';
						groupLabel.innerHTML = obj.group.name;

						groupContainer.appendChild(groupLabel);
						container.appendChild(groupContainer);

						this._domGroups[obj.group.id] = groupContainer;
					}

					container = groupContainer;
				} else {
					container = this._baseLayersList;
				}

				container.appendChild(label);

				return label;
			},

			_onInputClick : function() {
				var i, input, obj, inputs = this._form
						.getElementsByTagName('input'), inputsLen = inputs.length;

				this._handlingClick = true;

				var dynmic = {};
				var staticLayers = {};
				for (i = 0; i < inputsLen; i++) {
					input = inputs[i];
					var staticLayer = this._getStaticLayers(input.name);
					if (staticLayer != null) {// static layers
						staticLayers[staticLayer.layername] = {
							"layername" : staticLayer.layername,
							"maplayer" : staticLayer.maplayer,
							"visible:" : input.checked
						};
						obj = this._layers[input.name].layer;
						if (input.checked && !this._map.hasLayer(obj)) {
							this._layers[input.name].visible = true;
							this._map.addLayer(obj);
						} else if (!input.checked && this._map.hasLayer(obj)) {
							this._layers[input.name].visible = false;
							this._map.removeLayer(obj);
						}
					} else {
						var layerIds = this._layers[input.name];
						var objLayer = this._layers[input.name];
						if (input.checked == true) {
							this._layers[input.name].visible = true;
						} else {
							this._layers[input.name].visible = false;
						}
					}
				}
				this._dynmic = {};
				for (i in this._layers) {
					var objLayer = this._layers[i];
					if (objLayer.maptype == 'static') {
						continue;
					}
					if (this._dynmic[objLayer.mapid]) {
						if (objLayer.visible == true) {
							// ++ layerid
							var addLayerids = objLayer.layerids;
							for (var j = 0; j < addLayerids.length; j++) {
								this._dynmic[objLayer.mapid].layerids
										.push(addLayerids[j]);
							}
						} else {// --
							var addLayerids = objLayer.layerids;
							for (var j = 0; j < addLayerids.length; j++) {
								this._dynmic[objLayer.mapid].layerids
										.remove(addLayerids[j]);
							}
						}
					} else {
						this._dynmic[objLayer.mapid] = {
							layer : objLayer.layer,
							name : objLayer.name,
							maptype : objLayer.maptype,
							mapid : objLayer.mapid,
							visible : objLayer.visible,
							layerids : [],
							overlay : objLayer.overlay
						};
						if (objLayer.visible == true) {
							var layerids = [];
							for (var j = 0; j < objLayer.layerids.length; j++) {
								layerids.push(objLayer.layerids[j]);
							}

							this._dynmic[objLayer.mapid].layerids = layerids;
						}
					}

				}
				// dynmic layer hide, default layerids show 
				if (Object.keys(this._dynmic).length === 0) {
					for (var i = 0; i < this._maplayers.length; i++) {
						var objLayer = this._maplayers[i];
						if (objLayer.maptype == 'static') {
							continue;
						}
						if (objLayer.maptype == 'dynamic') {
							objLayer.maplayer.options.layers = this._maplayers[i].layeridVisibleDefalut;
							var layeridStr = this._maplayers[i].layeridVisibleDefalut
									.join(',');
							objLayer.maplayer._layerParams.layers = "show:"
									+ layeridStr;
							this._map.removeLayer(objLayer.maplayer);
							this._map.addLayer(objLayer.maplayer);
						}
					}
				}

				for (i in this._dynmic) {
					for (j in this._dynmic[i]) {
						if (j != 'layer') {
							continue;
						}
						var defLayer = this._getDynamicLayer(this._dynmic[i]);
						var defLayerIds = defLayer.layeridVisibleDefalut;
						var layeridConcat = this._dynmic[i].layerids.concat(defLayerIds);
						var layeridStr = layeridConcat.join(',');
						this._dynmic[i].layer.options.layers = layeridConcat;
						this._dynmic[i].layer._layerParams.layers = "show:"+ layeridStr;
						this._dynmic[i].layer._parseLayers();
						if (this._map.hasLayer(this._dynmic[i].layer)) {
							// this._dynmic[i].layer._onNewImageLoad();
							// this._dynmic[i].layer._initImage();
							// this._map.setView(this._map.getCenter(),this._map.getZoom());
							this._map.removeLayer(this._dynmic[i].layer);
							this._map.addLayer(this._dynmic[i].layer);
						} else {
							// this._dynmic[i].layer.options.layers=this._dynmic[i].layerids;
							this._map.addLayer(this._dynmic[i].layer);
						}
					}
				}

				this._handlingClick = false;
			},

			_getDynamicLayer : function(inObjLayer) {
				for (var i = 0; i < this._maplayers.length; i++) {
					var objLayer = this._maplayers[i];
					if (objLayer.maptype == 'static') {
						continue;
					}
					if (objLayer.maptype == 'dynamic') {
						if (inObjLayer.layer == objLayer.maplayer) {
							return objLayer;
						} else {
							continue;
						}
					}
					return null;
				}
			},
			
			_getStaticLayers : function(layername) {
				for ( var i in this._baseLayers) {
					for (j in this._baseLayers[i]) {
						if (j == layername) {
							return {
								"layername" : layername,
								"maplayer" :this._baseLayers[i][j]
							};
						}
					}
				}
				return null;
			},
			
			_getGroupLayerIds : function(layername) {
				for (i in groupedOverlays) {
					for (j in groupedOverlays[i]) {
						if (j == layername) {
							return {
								"mapid" : groupedOverlays[i][j].mapid,
								"layer" : groupedOverlays[i][j].maplayer,
								layerIds : groupedOverlays[i][j].layerid
							};
						}
					}
				}
				return null;
			},

			_expand : function() {
				L.DomUtil.addClass(this._container,
						'leaflet-control-layers-expanded');
			},

			_collapse : function() {
				this._container.className = this._container.className.replace(
						' leaflet-control-layers-expanded', '');
			}
		});

L.control.groupedLayersEsri = function(baseLayers, groupedOverlays, options) {
	return new L.Control.GroupedLayersEsri(baseLayers, groupedOverlays, options);
};

Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val)
			return i;
	}
	return -1;
};

Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};
