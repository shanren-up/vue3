(function (factory) {
	// Packaging/modules magic dance
	var L;
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['leaflet'], factory);
	} else if (typeof module !== 'undefined') {
		// Node/CommonJS
		L = require('leaflet');
		module.exports = factory(L);
	} else {
		// Browser globals
		if (typeof window.L === 'undefined')
			throw 'Leaflet must be loaded first';
		factory(window.L);
	}
}(function (L) {
	'use strict';
	L.Control.Pan = L.Control.extend({
		options: {
			position: 'topright',
			panOffset: 500
		},

		onAdd: function (map) {
			var className = 'leaflet-control-pan',
				container = L.DomUtil.create('div', className),
				off = this.options.panOffset;
			var upInfo='向上平移';
			var leftInfo='向左平移';
			var rightInfo='向右平移';
			var downInfo='向下平移';

			this._panButton(upInfo   , className + '-up',
					container, map, new L.Point(    0 , -off));
			this._panButton(leftInfo , className + '-left',
							container, map, new L.Point( -off ,  0));
			this._panButton(rightInfo, className + '-right',
							container, map, new L.Point(  off ,  0));
			this._panButton(downInfo , className + '-down',
					container, map, new L.Point(    0 ,  off));
			
			// Add pan control class to the control container
			var controlContainer = L.DomUtil.get(map._controlCorners.topleft);
			if(!L.DomUtil.hasClass(controlContainer, 'has-leaflet-pan-control')) {
				L.DomUtil.addClass(controlContainer, 'has-leaflet-pan-control');
			}

			return container;
		},

		onRemove: function (map) {
			// Remove pan control class to the control container
			var controlContainer = L.DomUtil.get(map._controlCorners.topleft);
			if(L.DomUtil.hasClass(controlContainer, 'has-leaflet-pan-control')) {
				L.DomUtil.removeClass(controlContainer, 'has-leaflet-pan-control');
			}
		},

		_panButton: function (title, className, container, map, offset) {
			var wrapper = L.DomUtil.create('div', className + '-wrap', container);
			var link = L.DomUtil.create('a', className, wrapper);
			link.href = '#';
			link.title = title;
			L.DomEvent
				.on(link, 'click', L.DomEvent.stopPropagation)
				.on(link, 'click', L.DomEvent.preventDefault)
				.on(link, 'click', function(){ map.panBy(offset); }, map)
				.on(link, 'dblclick', L.DomEvent.stopPropagation);

			return link;
		}
	});

	L.Map.mergeOptions({
		panControl: false
	});

	L.Map.addInitHook(function () {
		if (this.options.panControl) {
			this.panControl = new L.Control.Pan();
			this.addControl(this.panControl);
		}
	});

	L.control.pan = function (options) {
		return new L.Control.Pan(options);
	};

	return L.Control.Pan;
}));
