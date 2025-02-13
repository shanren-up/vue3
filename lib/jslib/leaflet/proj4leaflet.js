(function (factory) {
	var L, proj4;
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['leaflet', 'proj4'], factory);
	} else if (typeof module !== 'undefined') {
		// Node/CommonJS
		L = require('leaflet');
		proj4 = require('proj4');
		module.exports = factory(L, proj4);
	} else {
		// Browser globals
		if (typeof window.L === 'undefined' || typeof window.proj4 === 'undefined')
			throw 'Leaflet and proj4 must be loaded first';
		factory(window.L, window.proj4);
	}
}(function (L, proj4) {

	L.Proj = {};

	L.Proj._isProj4Obj = function(a) {
		return (typeof a.inverse !== 'undefined' &&
			typeof a.forward !== 'undefined');
	};

	L.Proj.ScaleDependantTransformation = function(scaleTransforms) {
		this.scaleTransforms = scaleTransforms;
	};

	L.Proj.ScaleDependantTransformation.prototype.transform = function(point, scale) {
		return this.scaleTransforms[scale].transform(point, scale);
	};

	L.Proj.ScaleDependantTransformation.prototype.untransform = function(point, scale) {
		return this.scaleTransforms[scale].untransform(point, scale);
	};

	L.Proj.Projection = L.Class.extend({
		initialize: function(a, def) {
			if (L.Proj._isProj4Obj(a)) {
				this._proj = a;
			} else {
				var code = this._code = a;
				if (def) {
					proj4.defs(code, def);
				} else if (proj4.defs[code] === undefined) {
					var urn = code.split(':');
					if (urn.length > 3) {
						code = urn[urn.length - 3] + ':' + urn[urn.length - 1];
					}
					if (proj4.defs[code] === undefined) {
						throw 'No projection definition for code ' + code;
					}
				}
				this._proj = proj4(code);
			}
		},

		project: function (latlng) {
			if(this._code === 'EPSG:3857')
			{
				var x = this.forwardMercatorX(latlng.lng);
				var y = this.forwardMercatorY(latlng.lat);
				return new L.Point(x, y);					
			}else
			{
				var point = this._proj.forward([latlng.lng, latlng.lat]);
				return new L.Point(point[0], point[1]);				
			}
		},

		unproject: function (point, unbounded) {
			if(this._code === 'EPSG:3857')
			{
				var lng = this.inverseMercatorLon(point.x);
				var lat = this.inverseMercatorLat(point.y);
				return new L.LatLng(lat, lng, unbounded);
			}else
			{
				var point2 = this._proj.inverse([point.x, point.y]);
				return new L.LatLng(point2[1], point2[0], unbounded);
			}
		},
		forwardMercatorX:function(lon){
			return lon * 20037508.34 / 180;
		},
		forwardMercatorY:function(lat){
			var y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
		    y = y * 20037508.34 / 180;
		    return y;
		},
		inverseMercatorLon:function(x){
			return (x / 20037508.34) * 180;
		},
		inverseMercatorLat:function(y){
		      var lat = (y / 20037508.34) * 180;
		      lat = 180/Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);
		      return lat;
		}

	});

	L.Proj.CRS = L.Class.extend({
		includes: L.CRS,

		options: {
			transformation: new L.Transformation(1, 0, -1, 0)
		},

		initialize: function(a, b, c) {
			var code, proj, def, options;

			if (L.Proj._isProj4Obj(a)) {
				proj = a;
				code = proj.srsCode;
				options = b || {};

				this.projection = new L.Proj.Projection(proj);
			} else {
				code = a;
				def = b;
				options = c || {};
				this.projection = new L.Proj.Projection(code, def);
			}
			this.projection.bounds = options.bounds;

			L.Util.setOptions(this, options);
			this.code = code;
			this.transformation = this.options.transformation;

			if (this.options.origin) {
				this.transformation =
					new L.Transformation(1, -this.options.origin[0],
						-1, this.options.origin[1]);
			}

			if (this.options.scales) {
				this._scales = this.options.scales;
			} else if (this.options.resolutions) {
				this._scales = [];
				for (var i = this.options.resolutions.length - 1; i >= 0; i--) {
					if (this.options.resolutions[i]) {
						this._scales[i] = 1 / this.options.resolutions[i];
					}
				}
			}
		},

		scale: function(zoom) {
			return this._scales[zoom];
		},

		getSize: function(zoom) {
			var b = this.options.bounds,
			    s,
			    min,
			    max;

			if (b) {
				s = this.scale(zoom);
				min = this.transformation.transform(b.min, s);
				max = this.transformation.transform(b.max, s);
				return L.point(Math.abs(max.x - min.x), Math.abs(max.y - min.y));
			} else {
				// Backwards compatibility with Leaflet < 0.7
				s = 256 * Math.pow(2, zoom);
				return L.point(s, s);
			}
		}
	});

	L.Proj.CRS.TMS = L.Proj.CRS.extend({
		options: {
			tileSize: 256
		},

		initialize: function(a, b, c, d) {
			var code,
				def,
				proj,
				projectedBounds,
				options;

			if (L.Proj._isProj4Obj(a)) {
				proj = a;
				projectedBounds = b;
				options = c || {};
				options.origin = [projectedBounds[0], projectedBounds[3]];
				L.Proj.CRS.prototype.initialize.call(this, proj, options);
			} else {
				code = a;
				def = b;
				projectedBounds = c;
				options = d || {};
				options.origin = [projectedBounds[0], projectedBounds[3]];
				L.Proj.CRS.prototype.initialize.call(this, code, def, options);
			}

			this.projectedBounds = projectedBounds;

			this._sizes = this._calculateSizes();
		},

		_calculateSizes: function() {
			var sizes = [],
				crsBounds = this.projectedBounds,
				projectedTileSize,
				i;
			for (i = this._scales.length - 1; i >= 0; i--) {
				if (this._scales[i]) {
					projectedTileSize = this.options.tileSize / this._scales[i];
					sizes[i] = L.point((crsBounds[2] - crsBounds[0]) * this._scales[i],
						Math.ceil((crsBounds[3] - crsBounds[1]) / projectedTileSize)
						* projectedTileSize * this._scales[i]);
				}
			}

			return sizes;
		},

		getSize: function(zoom) {
			return this._sizes[zoom];
		}
	});

	L.Proj.TileLayer = {};

	// Note: deprecated and not necessary since 0.7, will be removed
	L.Proj.TileLayer.TMS = L.TileLayer.extend({
		options: {
			continuousWorld: true
		},

		initialize: function(urlTemplate, crs, options) {
			var boundsMatchesGrid = true,
				scaleTransforms,
				upperY,
				crsBounds,
				i;

			if (!(crs instanceof L.Proj.CRS.TMS)) {
				throw 'CRS is not L.Proj.CRS.TMS.';
			}

			L.TileLayer.prototype.initialize.call(this, urlTemplate, options);
			// Enabling tms will cause Leaflet to also try to do TMS, which will
			// break (at least prior to 0.7.0). Actively disable it, to prevent
			// well-meaning users from shooting themselves in the foot.
			this.options.tms = false;
			this.crs = crs;
			crsBounds = this.crs.projectedBounds;

			// Verify grid alignment
			for (i = this.options.minZoom; i < this.options.maxZoom && boundsMatchesGrid; i++) {
				var gridHeight = (crsBounds[3] - crsBounds[1]) /
					this._projectedTileSize(i);
				boundsMatchesGrid = Math.abs(gridHeight - Math.round(gridHeight)) > 1e-3;
			}

			if (!boundsMatchesGrid) {
				scaleTransforms = {};
				for (i = this.options.minZoom; i < this.options.maxZoom; i++) {
					upperY = crsBounds[1] + Math.ceil((crsBounds[3] - crsBounds[1]) /
						this._projectedTileSize(i)) * this._projectedTileSize(i);
					scaleTransforms[this.crs.scale(i)] = new L.Transformation(1, -crsBounds[0], -1, upperY);
				}

				this.crs = new L.Proj.CRS.TMS(this.crs.projection._proj, crsBounds, this.crs.options);
				this.crs.transformation = new L.Proj.ScaleDependantTransformation(scaleTransforms);
			}
		},

		getTileUrl: function(tilePoint) {
			var zoom = this._map.getZoom(),
				gridHeight = Math.ceil(
				(this.crs.projectedBounds[3] - this.crs.projectedBounds[1]) /
				this._projectedTileSize(zoom));

			return L.Util.template(this._url, L.Util.extend({
				s: this._getSubdomain(tilePoint),
				z: this._getZoomForUrl(),
				x: tilePoint.x,
				y: gridHeight - tilePoint.y - 1
			}, this.options));
		},

		_projectedTileSize: function(zoom) {
			return (this.options.tileSize / this.crs.scale(zoom));
		}
	});

	L.Proj.GeoJSON = L.GeoJSON.extend({
		initialize: function(geojson, options) {
			var crs;
			if (geojson.crs && geojson.crs.type === 'name') {
				crs = new L.Proj.CRS(geojson.crs.properties.name);
			} else if (geojson.crs && geojson.crs.type) {
				crs = new L.Proj.CRS(geojson.crs.type + ':' + geojson.crs.properties.code);
			} else {
				throw 'GeoJSON should have CRS defined.';
			}

			if (crs !== undefined) {
				options = options || {};
				options.coordsToLatLng = function(coords) {
					var point = L.point(coords[0], coords[1]);
					return crs.projection.unproject(point);
				};
			}
			L.GeoJSON.prototype.initialize.call(this, geojson, options);
		}
	});

	L.Proj.geoJson = function(geojson, options) {
		return new L.Proj.GeoJSON(geojson, options);
	};

	if (typeof L.CRS !== 'undefined') {
		// This is left here for backwards compatibility
		L.CRS.proj4js = (function () {
			return function (code, def, transformation, options) {
				options = options || {};
				if (transformation) {
					options.transformation = transformation;
				}

				return new L.Proj.CRS(code, def, options);
			};
		}());
	}

	return L.Proj;
}));
