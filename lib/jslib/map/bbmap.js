window.BMAP_AUTHENTIC_KEY = "DD7f0f2c12f91fcf931128fb68fbaff4";
(function() {
	function aa(a) {
		throw a;
	}
	var j = void 0,
		o = !0,
		p = null,
		q = !1;

	function s() {
		return function() {}
	}

	function ba(a) {
		return function(b) {
			this[a] = b
		}
	}

	function t(a) {
		return function() {
			return this[a]
		}
	}

	function da(a) {
		return function() {
			return a
		}
	}
	var ea, fa = [];

	function ga(a) {
		return function() {
			return fa[a].apply(this, arguments)
		}
	}

	function ha(a, b) {
		return fa[a] = b
	}
	var ia, w = ia = w || {
		version: "1.3.4"
	};
	w.Q = "$BAIDU$";
	window[w.Q] = window[w.Q] || {};
	w.object = w.object || {};
	w.extend = w.object.extend = function(a, b) {
		for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
		return a
	};
	w.B = w.B || {};
	w.B.N = function(a) {
		return "string" == typeof a || a instanceof String ? document.getElementById(a) : a && a.nodeName && (1 == a.nodeType || 9 == a.nodeType) ? a : p
	};
	w.N = w.rc = w.B.N;
	w.B.J = function(a) {
		a = w.B.N(a);
		if (a === p) return a;
		a.style.display = "none";
		return a
	};
	w.J = w.B.J;
	w.lang = w.lang || {};
	w.lang.ig = function(a) {
		return "[object String]" == Object.prototype.toString.call(a)
	};
	w.ig = w.lang.ig;
	w.B.zj = function(a) {
		return w.lang.ig(a) ? document.getElementById(a) : a
	};
	w.zj = w.B.zj;
	w.B.getElementsByClassName = function(a, b) {
		var c;
		if (a.getElementsByClassName) c = a.getElementsByClassName(b);
		else {
			var d = a;
			d == p && (d = document);
			c = [];
			var d = d.getElementsByTagName("*"),
				e = d.length,
				f = RegExp("(^|\\s)" + b + "(\\s|$)"),
				g, i;
			for (i = g = 0; g < e; g++) f.test(d[g].className) && (c[i] = d[g], i++)
		}
		return c
	};
	w.getElementsByClassName = w.B.getElementsByClassName;
	w.B.contains = function(a, b) {
		var c = w.B.zj,
			a = c(a),
			b = c(b);
		return a.contains ? a != b && a.contains(b) : !!(a.compareDocumentPosition(b) & 16)
	};
	w.S = w.S || {};
	/msie (\d+\.\d)/i.test(navigator.userAgent) && (w.S.ba = w.ba = document.documentMode || +RegExp.$1);
	var la = {
		cellpadding: "cellPadding",
		cellspacing: "cellSpacing",
		colspan: "colSpan",
		rowspan: "rowSpan",
		valign: "vAlign",
		usemap: "useMap",
		frameborder: "frameBorder"
	};
	8 > w.S.ba ? (la["for"] = "htmlFor", la["class"] = "className") : (la.htmlFor = "for", la.className = "class");
	w.B.MF = la;
	w.B.DE = function(a, b, c) {
		a = w.B.N(a);
		if (a === p) return a;
		if ("style" == b) a.style.cssText = c;
		else {
			b = w.B.MF[b] || b;
			a.setAttribute(b, c)
		}
		return a
	};
	w.DE = w.B.DE;
	w.B.EE = function(a, b) {
		a = w.B.N(a);
		if (a === p) return a;
		for (var c in b) w.B.DE(a, c, b[c]);
		return a
	};
	w.EE = w.B.EE;
	w.xk = w.xk || {};
	(function() {
		var a = RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)", "g");
		w.xk.trim = function(b) {
			return ("" + b).replace(a, "")
		}
	})();
	w.trim = w.xk.trim;
	w.xk.uo = function(a, b) {
		var a = "" + a,
			c = Array.prototype.slice.call(arguments, 1),
			d = Object.prototype.toString;
		if (c.length) {
			c = c.length == 1 ? b !== p && /\[object Array\]|\[object Object\]/.test(d.call(b)) ? b : c : c;
			return a.replace(/#\{(.+?)\}/g, function(a, b) {
				var g = c[b];
				"[object Function]" == d.call(g) && (g = g(b));
				return "undefined" == typeof g ? "" : g
			})
		}
		return a
	};
	w.uo = w.xk.uo;
	w.B.Pb = function(a, b) {
		a = w.B.N(a);
		if (a === p) return a;
		for (var c = a.className.split(/\s+/), d = b.split(/\s+/), e, f = d.length, g, i = 0; i < f; ++i) {
			g = 0;
			for (e = c.length; g < e; ++g)
				if (c[g] == d[i]) {
					c.splice(g, 1);
					break
				}
		}
		a.className = c.join(" ");
		return a
	};
	w.Pb = w.B.Pb;
	w.B.$w = function(a, b, c) {
		a = w.B.N(a);
		if (a === p) return a;
		var d;
		if (a.insertAdjacentHTML) a.insertAdjacentHTML(b, c);
		else {
			d = a.ownerDocument.createRange();
			b = b.toUpperCase();
			if (b == "AFTERBEGIN" || b == "BEFOREEND") {
				d.selectNodeContents(a);
				d.collapse(b == "AFTERBEGIN")
			} else {
				b = b == "BEFOREBEGIN";
				d[b ? "setStartBefore" : "setEndAfter"](a);
				d.collapse(b)
			}
			d.insertNode(d.createContextualFragment(c))
		}
		return a
	};
	w.$w = w.B.$w;
	w.B.show = function(a) {
		a = w.B.N(a);
		if (a === p) return a;
		a.style.display = "";
		return a
	};
	w.show = w.B.show;
	w.B.$C = function(a) {
		a = w.B.N(a);
		return a === p ? a : a.nodeType == 9 ? a : a.ownerDocument || a.document
	};
	w.B.Oa = function(a, b) {
		a = w.B.N(a);
		if (a === p) return a;
		for (var c = b.split(/\s+/), d = a.className, e = " " + d + " ", f = 0, g = c.length; f < g; f++) e.indexOf(" " + c[f] + " ") < 0 && (d = d + (" " + c[f]));
		a.className = d;
		return a
	};
	w.Oa = w.B.Oa;
	w.B.YA = w.B.YA || {};
	w.B.pl = w.B.pl || [];
	w.B.pl.filter = function(a, b, c) {
		for (var d = 0, e = w.B.pl, f; f = e[d]; d++)
			if (f = f[c]) b = f(a, b);
		return b
	};
	w.xk.nN = function(a) {
		return a.indexOf("-") < 0 && a.indexOf("_") < 0 ? a : a.replace(/[-_][^-_]/g, function(a) {
			return a.charAt(1).toUpperCase()
		})
	};
	w.B.rZ = function(a) {
		w.B.zs(a, "expand") ? w.B.Pb(a, "expand") : w.B.Oa(a, "expand")
	};
	w.B.zs = function(a) {
		if (arguments.length <= 0 || typeof a === "function") return this;
		if (this.size() <= 0) return q;
		var a = a.replace(/^\s+/g, "").replace(/\s+$/g, "").replace(/\s+/g, " "),
			b = a.split(" "),
			c;
		w.forEach(this, function(a) {
			for (var a = a.className, e = 0; e < b.length; e++)
				if (!~(" " + a + " ").indexOf(" " + b[e] + " ")) {
					c = q;
					return
				}
			c !== q && (c = o)
		});
		return c
	};
	w.B.fj = function(a, b) {
		var c = w.B,
			a = c.N(a);
		if (a === p) return a;
		var b = w.xk.nN(b),
			d = a.style[b];
		if (!d) var e = c.YA[b],
			d = a.currentStyle || (w.S.ba ? a.style : getComputedStyle(a, p)),
			d = e && e.get ? e.get(a, d) : d[e || b];
		if (e = c.pl) d = e.filter(b, d, "get");
		return d
	};
	w.fj = w.B.fj;
	/opera\/(\d+\.\d)/i.test(navigator.userAgent) && (w.S.opera = +RegExp.$1);
	w.S.kL = /webkit/i.test(navigator.userAgent);
	w.S.YW = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
	w.S.LD = "CSS1Compat" == document.compatMode;
	w.B.V = function(a) {
		a = w.B.N(a);
		if (a === p) return a;
		var b = w.B.$C(a),
			c = w.S,
			d = w.B.fj;
		c.YW > 0 && b.getBoxObjectFor && d(a, "position");
		var e = {
				left: 0,
				top: 0
			},
			f;
		if (a == (c.ba && !c.LD ? b.body : b.documentElement)) return e;
		if (a.getBoundingClientRect) {
			a = a.getBoundingClientRect();
			e.left = Math.floor(a.left) + Math.max(b.documentElement.scrollLeft, b.body.scrollLeft);
			e.top = Math.floor(a.top) + Math.max(b.documentElement.scrollTop, b.body.scrollTop);
			e.left = e.left - b.documentElement.clientLeft;
			e.top = e.top - b.documentElement.clientTop;
			a = b.body;
			b = parseInt(d(a, "borderLeftWidth"));
			d = parseInt(d(a, "borderTopWidth"));
			if (c.ba && !c.LD) {
				e.left = e.left - (isNaN(b) ? 2 : b);
				e.top = e.top - (isNaN(d) ? 2 : d)
			}
		} else {
			f = a;
			do {
				e.left = e.left + f.offsetLeft;
				e.top = e.top + f.offsetTop;
				if (c.kL > 0 && d(f, "position") == "fixed") {
					e.left = e.left + b.body.scrollLeft;
					e.top = e.top + b.body.scrollTop;
					break
				}
				f = f.offsetParent
			} while (f && f != a);
			if (c.opera > 0 || c.kL > 0 && d(a, "position") == "absolute") e.top = e.top - b.body.offsetTop;
			for (f = a.offsetParent; f && f != b.body;) {
				e.left = e.left - f.scrollLeft;
				if (!c.opera || f.tagName != "TR") e.top = e.top - f.scrollTop;
				f = f.offsetParent
			}
		}
		return e
	};
	/firefox\/(\d+\.\d)/i.test(navigator.userAgent) && (w.S.fg = +RegExp.$1);
	/BIDUBrowser/i.test(navigator.userAgent) && (w.S.Z_ = o);
	var ma = navigator.userAgent;
	/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(ma) && !/chrome/i.test(ma) && (w.S.HM = +(RegExp.$1 || RegExp.$2));
	/chrome\/(\d+\.\d)/i.test(navigator.userAgent) && (w.S.jJ = +RegExp.$1);
	w.Yb = w.Yb || {};
	w.Yb.qb = function(a, b) {
		var c, d, e = a.length;
		if ("function" == typeof b)
			for (d = 0; d < e; d++) {
				c = a[d];
				c = b.call(a, c, d);
				if (c === q) break
			}
		return a
	};
	w.qb = w.Yb.qb;
	w.lang.Q = function() {
		return "TANGRAM__" + (window[w.Q]._counter++).toString(36)
	};
	window[w.Q]._counter = window[w.Q]._counter || 1;
	window[w.Q]._instances = window[w.Q]._instances || {};
	w.lang.Hs = function(a) {
		return "[object Function]" == Object.prototype.toString.call(a)
	};
	w.lang.qa = function(a) {
		this.Q = a || w.lang.Q();
		window[w.Q]._instances[this.Q] = this
	};
	window[w.Q]._instances = window[w.Q]._instances || {};
	w.lang.qa.prototype.Sh = ga(0);
	w.lang.qa.prototype.toString = function() {
		return "[object " + (this.pP || "Object") + "]"
	};
	w.lang.uy = function(a, b) {
		this.type = a;
		this.returnValue = o;
		this.target = b || p;
		this.currentTarget = p
	};
	w.lang.qa.prototype.addEventListener = function(a, b, c) {
		if (w.lang.Hs(b)) {
			!this.ti && (this.ti = {});
			var d = this.ti,
				e;
			if (typeof c == "string" && c) {
				/[^\w\-]/.test(c) && aa("nonstandard key:" + c);
				e = b.MK = c
			}
			a.indexOf("on") != 0 && (a = "on" + a);
			typeof d[a] != "object" && (d[a] = {});
			e = e || w.lang.Q();
			b.MK = e;
			d[a][e] = b
		}
	};
	w.lang.qa.prototype.removeEventListener = function(a, b) {
		if (w.lang.Hs(b)) b = b.MK;
		else if (!w.lang.ig(b)) return;
		!this.ti && (this.ti = {});
		a.indexOf("on") != 0 && (a = "on" + a);
		var c = this.ti;
		c[a] && c[a][b] && delete c[a][b]
	};
	w.lang.qa.prototype.dispatchEvent = function(a, b) {
		w.lang.ig(a) && (a = new w.lang.uy(a));
		!this.ti && (this.ti = {});
		var b = b || {},
			c;
		for (c in b) a[c] = b[c];
		var d = this.ti,
			e = a.type;
		a.target = a.target || this;
		a.currentTarget = this;
		e.indexOf("on") != 0 && (e = "on" + e);
		w.lang.Hs(this[e]) && this[e].apply(this, arguments);
		if (typeof d[e] == "object")
			for (c in d[e]) d[e][c].apply(this, arguments);
		return a.returnValue
	};
	w.lang.ia = function(a, b, c) {
		var d, e, f = a.prototype;
		e = new Function;
		e.prototype = b.prototype;
		e = a.prototype = new e;
		for (d in f) e[d] = f[d];
		a.prototype.constructor = a;
		a.hZ = b.prototype;
		if ("string" == typeof c) e.pP = c
	};
	w.ia = w.lang.ia;
	w.lang.Od = function(a) {
		return window[w.Q]._instances[a] || p
	};
	w.platform = w.platform || {};
	w.platform.dL = /macintosh/i.test(navigator.userAgent);
	w.platform.x1 = /MicroMessenger/i.test(navigator.userAgent);
	w.platform.lL = /windows/i.test(navigator.userAgent);
	w.platform.fX = /x11/i.test(navigator.userAgent);
	w.platform.lm = /android/i.test(navigator.userAgent);
	/android (\d+\.\d)/i.test(navigator.userAgent) && (w.platform.VI = w.VI = RegExp.$1);
	w.platform.$W = /ipad/i.test(navigator.userAgent);
	w.platform.GD = /iphone/i.test(navigator.userAgent);

	function na(a, b) {
		a.domEvent = b = window.event || b;
		a.clientX = b.clientX || b.pageX;
		a.clientY = b.clientY || b.pageY;
		a.offsetX = b.offsetX || b.layerX;
		a.offsetY = b.offsetY || b.layerY;
		a.screenX = b.screenX;
		a.screenY = b.screenY;
		a.ctrlKey = b.ctrlKey || b.metaKey;
		a.shiftKey = b.shiftKey;
		a.altKey = b.altKey;
		if (b.touches) {
			a.touches = [];
			for (var c = 0; c < b.touches.length; c++) a.touches.push({
				clientX: b.touches[c].clientX,
				clientY: b.touches[c].clientY,
				screenX: b.touches[c].screenX,
				screenY: b.touches[c].screenY,
				pageX: b.touches[c].pageX,
				pageY: b.touches[c].pageY,
				target: b.touches[c].target,
				identifier: b.touches[c].identifier
			})
		}
		if (b.changedTouches) {
			a.changedTouches = [];
			for (c = 0; c < b.changedTouches.length; c++) a.changedTouches.push({
				clientX: b.changedTouches[c].clientX,
				clientY: b.changedTouches[c].clientY,
				screenX: b.changedTouches[c].screenX,
				screenY: b.changedTouches[c].screenY,
				pageX: b.changedTouches[c].pageX,
				pageY: b.changedTouches[c].pageY,
				target: b.changedTouches[c].target,
				identifier: b.changedTouches[c].identifier
			})
		}
		if (b.targetTouches) {
			a.targetTouches = [];
			for (c = 0; c < b.targetTouches.length; c++) a.targetTouches.push({
				clientX: b.targetTouches[c].clientX,
				clientY: b.targetTouches[c].clientY,
				screenX: b.targetTouches[c].screenX,
				screenY: b.targetTouches[c].screenY,
				pageX: b.targetTouches[c].pageX,
				pageY: b.targetTouches[c].pageY,
				target: b.targetTouches[c].target,
				identifier: b.targetTouches[c].identifier
			})
		}
		a.rotation = b.rotation;
		a.scale = b.scale;
		return a
	}
	w.lang.nw = function(a) {
		var b = window[w.Q];
		b.xR && delete b.xR[a]
	};
	w.event = {};
	w.F = w.event.F = function(a, b, c) {
		if (!(a = w.N(a))) return a;
		b = b.replace(/^on/, "");
		a.addEventListener ? a.addEventListener(b, c, q) : a.attachEvent && a.attachEvent("on" + b, c);
		return a
	};
	w.ke = w.event.ke = function(a, b, c) {
		if (!(a = w.N(a))) return a;
		b = b.replace(/^on/, "");
		a.removeEventListener ? a.removeEventListener(b, c, q) : a.detachEvent && a.detachEvent("on" + b, c);
		return a
	};
	w.B.zs = function(a, b) {
		if (!a || !a.className || typeof a.className != "string") return q;
		var c = -1;
		try {
			c = a.className == b || a.className.search(RegExp("(\\s|^)" + b + "(\\s|$)"))
		} catch (d) {
			return q
		}
		return c > -1
	};
	w.UJ = function() {
		function a(a) {
			document.addEventListener && (this.element = a, this.XJ = this.gk ? "touchstart" : "mousedown", this.IC = this.gk ? "touchmove" : "mousemove", this.HC = this.gk ? "touchend" : "mouseup", this.ah = q, this.Bt = this.At = 0, this.element.addEventListener(this.XJ, this, q), ia.F(this.element, "mousedown", s()), this.handleEvent(p))
		}
		a.prototype = {
			gk: "ontouchstart" in window || "createTouch" in document,
			start: function(a) {
				oa(a);
				this.ah = q;
				this.At = this.gk ? a.touches[0].clientX : a.clientX;
				this.Bt = this.gk ? a.touches[0].clientY : a.clientY;
				this.element.addEventListener(this.IC, this, q);
				this.element.addEventListener(this.HC, this, q)
			},
			move: function(a) {
				pa(a);
				var c = this.gk ? a.touches[0].clientY : a.clientY;
				if (10 < Math.abs((this.gk ? a.touches[0].clientX : a.clientX) - this.At) || 10 < Math.abs(c - this.Bt)) this.ah = o
			},
			end: function(a) {
				pa(a);
				this.ah || (a = document.createEvent("Event"), a.initEvent("tap", q, o), this.element.dispatchEvent(a));
				this.element.removeEventListener(this.IC, this, q);
				this.element.removeEventListener(this.HC, this, q)
			},
			handleEvent: function(a) {
				if (a) switch (a.type) {
					case this.XJ:
						this.start(a);
						break;
					case this.IC:
						this.move(a);
						break;
					case this.HC:
						this.end(a)
				}
			}
		};
		return function(b) {
			return new a(b)
		}
	}();
	var z = window.BMap || {};
	z.version = "2.0";
	z.EI = 0.34 > Math.random();
	0 <= z.version.indexOf("#") && (z.version = "2.0");
	z.$q = [];
	z.Ge = function(a) {
		this.$q.push(a)
	};
	z.Qq = [];
	z.ym = function(a) {
		this.Qq.push(a)
	};
	z.KT = z.apiLoad || s();
	var qa = window.BMAP_AUTHENTIC_KEY;
	window.BMAP_AUTHENTIC_KEY = p;
	var ra = window.BMap_loadScriptTime,
		sa = (new Date).getTime(),
		ta = p,
		ua = o,
		va = p,
		wa = 5042,
		xa = 5002,
		za = 5003,
		Aa = "load_mapclick",
		Ba = 5038,
		Da = 5041,
		Ea = 5047,
		Fa = 5036,
		Ga = 5039,
		Ha = 5037,
		Ia = 5040,
		Ja = 5011,
		Ka = 7E3;

	function La(a, b) {
		if (a = w.N(a)) {
			var c = this;
			w.lang.qa.call(c);
			b = b || {};
			c.D = {
				DB: 200,
				Sb: o,
				ww: q,
				AC: o,
				ro: o,
				so: o,
				SJ: o,
				CC: o,
				bs: o,
				uw: o,
				Sl: o,
				po: b.enable3DBuilding || q,
				wc: 25,
				b_: 240,
				yT: 450,
				Kb: F.Kb,
				od: F.od,
				dx: !!b.dx,
				Ub: Math.round(b.minZoom) || 1,
				Nb: Math.round(b.maxZoom) || 19,
				ub: b.mapType || Ma,
				l2: q,
				vw: o,
				sw: 500,
				hV: b.enableHighResolution !== q,
				Yi: b.enableMapClick !== q,
				devicePixelRatio: b.devicePixelRatio || window.devicePixelRatio || 1,
				cF: b.vectorMapLevel || (G() ? 3 : 99),
				ge: b.mapStyle || p,
				oX: b.logoControl === q ? q : o,
				ST: [],
				Tv: b.beforeClickIcon || p
			};
			c.D.ge && (this.PW(c.D.ge.controls), this.YK(c.D.ge.geotableId));
			c.D.ge && c.D.ge.styleId && c.h1(c.D.ge.styleId);
			c.D.Kl = {
				dark: {
					backColor: "#2D2D2D",
					textColor: "#bfbfbf",
					iconUrl: "dicons"
				},
				normal: {
					backColor: "#F3F1EC",
					textColor: "#c61b1b",
					iconUrl: "icons"
				},
				light: {
					backColor: "#EBF8FC",
					textColor: "#017fb4",
					iconUrl: "licons"
				}
			};
			b.enableAutoResize && (c.D.uw = b.enableAutoResize);
			b.enableStreetEntrance === q && (c.D.Sl = b.enableStreetEntrance);
			b.enableDeepZoom === q && (c.D.SJ = b.enableDeepZoom);
			var d = c.D.ST;
			if (G())
				for (var e = 0, f = d.length; e < f; e++)
					if (w.S[d[e]]) {
						c.D.devicePixelRatio = 1;
						break
					}
			d = -1 < navigator.userAgent.toLowerCase().indexOf("android");
			e = -1 < navigator.userAgent.toLowerCase().indexOf("mqqbrowser");
			if (-1 < navigator.userAgent.toLowerCase().indexOf("UCBrowser") || d && e) c.D.cF = 99;
			c.Ja = a;
			c.RA(a);
			a.unselectable = "on";
			a.innerHTML = "";
			a.appendChild(c.ja());
			b.size && this.vd(b.size);
			d = c.Mb();
			c.width = d.width;
			c.height = d.height;
			c.offsetX = 0;
			c.offsetY = 0;
			c.platform = a.firstChild;
			c.he = c.platform.firstChild;
			c.he.style.width = c.width + "px";
			c.he.style.height = c.height + "px";
			c.Zd = {};
			c.Se = new H(0, 0);
			c.kc = new H(0, 0);
			c.wa = 3;
			c.xc = 0;
			c.WB = p;
			c.VB = p;
			c.Jb = "";
			c.Yv = "";
			c.zh = {};
			c.zh.custom = {};
			c.Ia = 0;
			c.G = new Na(a, {
				Af: "api",
				CR: o
			});
			c.G.J();
			c.G.GE(c);
			b = b || {};
			d = c.ub = c.D.ub;
			c.je = d.Fo();
			d === Oa && Pa(xa);
			d === Qa && Pa(za);
			d = c.D;
			d.GN = Math.round(b.minZoom);
			d.FN = Math.round(b.maxZoom);
			c.ru();
			c.H = {
				yc: q,
				Zb: 0,
				Ls: 0,
				qL: 0,
				B1: 0,
				wB: q,
				qE: -1,
				Ae: []
			};
			c.platform.style.cursor = c.D.Kb;
			for (e = 0; e < z.$q.length; e++) z.$q[e](c);
			c.H.qE = e;
			c.P();
			J.load("map", function() {
				c.rb()
			});
			c.D.Yi && (setTimeout(function() {
				Pa(Aa)
			}, 1E3), J.load("mapclick", function() {
				window.MPC_Mgr = window.MPC_Mgr || {};
				window.MPC_Mgr[c.Q] = new Ra(c)
			}, o));
			Sa() && J.load("oppc", function() {
				c.Ky()
			});
			G() && J.load("opmb", function() {
				c.Ky()
			});
			a = p;
			c.eB = []
		}
	}
	w.lang.ia(La, w.lang.qa, "Map");
	w.extend(La.prototype, {
		ja: function() {
			var a = K("div"),
				b = a.style;
			b.overflow = "visible";
			b.position = "absolute";
			b.zIndex = "0";
			b.top = b.left = "0px";
			var b = K("div", {
					"class": "BMap_mask"
				}),
				c = b.style;
			c.position = "absolute";
			c.top = c.left = "0px";
			c.zIndex = "9";
			c.overflow = "hidden";
			c.WebkitUserSelect = "none";
			a.appendChild(b);
			return a
		},
		RA: function(a) {
			var b = a.style;
			b.overflow = "hidden";
			"absolute" !== Ta(a).position && (b.position = "relative", b.zIndex = 0);
			b.backgroundColor = "#F3F1EC";
			b.color = "#000";
			b.textAlign = "left"
		},
		P: function() {
			var a = this;
			a.wr = function() {
				var b = a.Mb();
				if (a.width !== b.width || a.height !== b.height) {
					var c = new L(a.width, a.height),
						d = new M("onbeforeresize");
					d.size = c;
					a.dispatchEvent(d);
					a.Pj((b.width - a.width) / 2, (b.height - a.height) / 2);
					a.he.style.width = (a.width = b.width) + "px";
					a.he.style.height = (a.height = b.height) + "px";
					c = new M("onresize");
					c.size = b;
					a.dispatchEvent(c)
				}
			};
			a.D.uw && (a.H.Ar = setInterval(a.wr, 80))
		},
		Pj: function(a, b, c, d) {
			var e = this.la().Bc(this.U()),
				f = this.je,
				g = o;
			c && H.cL(c) && (this.Se = new H(c.lng, c.lat), g = q);
			if (c = c && d ? f.pm(c, this.Jb) : this.kc)
				if (this.kc = new H(c.lng + a * e, c.lat - b * e), (a = f.$g(this.kc, this.Jb)) && g) this.Se = a
		},
		sg: function(a, b) {
			if (Ua(a) && (this.ru(), this.dispatchEvent(new M("onzoomstart")), a = this.yn(a).zoom, a !== this.wa)) {
				this.xc = this.wa;
				this.wa = a;
				var c;
				b ? c = b : this.Tg() && (c = this.Tg().V());
				c && (c = this.Vb(c, this.xc), this.Pj(this.width / 2 - c.x, this.height / 2 - c.y, this.mb(c, this.xc), o));
				this.dispatchEvent(new M("onzoomstartcode"))
			}
		},
		Cc: function(a) {
			this.sg(a)
		},
		gF: function(a) {
			this.sg(this.wa + 1, a)
		},
		hF: function(a) {
			this.sg(this.wa - 1, a)
		},
		fi: function(a) {
			a instanceof H && (this.kc = this.je.pm(a, this.Jb), this.Se = H.cL(a) ? new H(a.lng, a.lat) : this.je.$g(this.kc, this.Jb))
		},
		mg: function(a, b) {
			a = Math.round(a) || 0;
			b = Math.round(b) || 0;
			this.Pj(-a, -b)
		},
		Jv: function(a) {
			a && Va(a.Ne) && (a.Ne(this), this.dispatchEvent(new M("onaddcontrol", a)))
		},
		vM: function(a) {
			a && Va(a.remove) && (a.remove(), this.dispatchEvent(new M("onremovecontrol", a)))
		},
		Wn: function(a) {
			a && Va(a.fa) && (a.fa(this), this.dispatchEvent(new M("onaddcontextmenu", a)))
		},
		ap: function(a) {
			a && Va(a.remove) && (this.dispatchEvent(new M("onremovecontextmenu", a)), a.remove())
		},
		ya: function(a) {
			a && Va(a.Ne) && (a.Ne(this), this.dispatchEvent(new M("onaddoverlay", a)))
		},
		Gb: function(a) {
			a && Va(a.remove) && (a.remove(), this.dispatchEvent(new M("onremoveoverlay", a)))
		},
		mJ: function() {
			this.dispatchEvent(new M("onclearoverlays"))
		},
		Kg: function(a) {
			a && this.dispatchEvent(new M("onaddtilelayer", a))
		},
		jh: function(a) {
			a && this.dispatchEvent(new M("onremovetilelayer", a))
		},
		og: function(a) {
			if (this.ub !== a) {
				var b = new M("onsetmaptype");
				b.c2 = this.ub;
				this.ub = this.D.ub = a;
				this.je = this.ub.Fo();
				this.Pj(0, 0, this.Aa(), o);
				this.ru();
				var c = this.yn(this.U()).zoom;
				this.sg(c);
				this.dispatchEvent(b);
				b = new M("onmaptypechange");
				b.wa = c;
				b.ub = a;
				this.dispatchEvent(b);
				(a === Wa || a === Qa) && Pa(za)
			}
		},
		If: function(a) {
			var b = this;
			if (a instanceof H) b.fi(a, {
				noAnimation: o
			});
			else if (Xa(a))
				if (b.ub === Oa) {
					var c = F.zB[a];
					c && (pt = c.m, b.If(pt))
				} else {
					var d = this.RG();
					d.JE(function(c) {
						0 === d.am() && 2 === d.ta.result.type && (b.If(c.ek(0).point), Oa.$j(a) && b.FE(a))
					});
					d.search(a, {
						log: "center"
					})
				}
		},
		ae: function(a, b) {
			"[object Undefined]" !== Object.prototype.toString.call(b) && (b = parseInt(b));
			va = G() ? Ya.qi.Vj(z.EI ? 102 : 101) : Ya.qi.Vj(1);
			va.Ct();
			va.Fy = +new Date;
			va.cc("script_loaded", sa - ra);
			va.cc("centerAndZoom");
			var c = this;
			if (Xa(a))
				if (c.ub === Oa) {
					var d = F.zB[a];
					d && (pt = d.m, c.ae(pt, b))
				} else {
					var e = c.RG();
					e.JE(function(d) {
						if (0 === e.am() && (2 === e.ta.result.type || 11 === e.ta.result.type)) {
							var d = d.ek(0).point,
								f = b || O.VC(e.ta.content.level, c);
							c.ae(d, f);
							Oa.$j(a) && c.FE(a)
						}
					});
					e.search(a, {
						log: "center"
					})
				} else if (a instanceof H && b) {
				b = c.yn(b).zoom;
				c.xc = c.wa || b;
				c.wa = b;
				d = c.Se;
				c.Se = new H(a.lng, a.lat);
				c.kc = c.je.pm(c.Se, c.Jb);
				c.WB = c.WB || c.wa;
				c.VB = c.VB || c.Se;
				var f = new M("onload"),
					g = new M("onloadcode");
				f.point = new H(a.lng, a.lat);
				f.pixel = c.Vb(c.Se, c.wa);
				f.zoom = b;
				c.loaded || (c.loaded = o, c.dispatchEvent(f), ta || (ta = Za()));
				c.dispatchEvent(g);
				f = new M("onmoveend");
				f.tG = "centerAndZoom";
				d.$a(c.Se) || c.dispatchEvent(f);
				c.dispatchEvent(new M("onmoveend"));
				c.xc !== c.wa && (d = new M("onzoomend"), d.tG = "centerAndZoom", c.dispatchEvent(d));
				c.D.po && c.po()
			}
		},
		RG: function() {
			this.H.wL || (this.H.wL = new $a(1));
			return this.H.wL
		},
		reset: function() {
			this.ae(this.VB, this.WB, o)
		},
		enableDragging: function() {
			this.D.Sb = o
		},
		disableDragging: function() {
			this.D.Sb = q
		},
		enableInertialDragging: function() {
			this.D.vw = o
		},
		disableInertialDragging: function() {
			this.D.vw = q
		},
		enableScrollWheelZoom: function() {
			this.D.so = o
		},
		disableScrollWheelZoom: function() {
			this.D.so = q
		},
		enableContinuousZoom: function() {
			this.D.ro = o
		},
		disableContinuousZoom: function() {
			this.D.ro = q
		},
		enableDoubleClickZoom: function() {
			this.D.AC = o
		},
		disableDoubleClickZoom: function() {
			this.D.AC = q
		},
		enableKeyboard: function() {
			this.D.ww = o
		},
		disableKeyboard: function() {
			this.D.ww = q
		},
		enablePinchToZoom: function() {
			this.D.bs = o
		},
		disablePinchToZoom: function() {
			this.D.bs = q
		},
		enableAutoResize: function() {
			this.D.uw = o;
			this.wr();
			this.H.Ar || (this.H.Ar = setInterval(this.wr, 80))
		},
		disableAutoResize: function() {
			this.D.uw = q;
			this.H.Ar && (clearInterval(this.H.Ar), this.H.Ar = p)
		},
		po: function() {
			this.D.po = o;
			this.jn || (this.jn = new bb({
				aK: o
			}), this.Kg(this.jn))
		},
		SU: function() {
			this.D.po = q;
			this.jn && (this.jh(this.jn), this.jn = p, delete this.jn)
		},
		Mb: function() {
			return this.Nr && this.Nr instanceof L ? new L(this.Nr.width, this.Nr.height) : new L(this.Ja.clientWidth, this.Ja.clientHeight)
		},
		vd: function(a) {
			a && a instanceof L ? (this.Nr = a, this.Ja.style.width = a.width + "px", this.Ja.style.height = a.height + "px") : this.Nr = p
		},
		Aa: t("Se"),
		U: t("wa"),
		jU: function() {
			this.wr()
		},
		yn: function(a) {
			var b = this.D.Ub,
				c = this.D.Nb,
				d = q,
				a = Math.round(a);
			a < b && (d = o, a = b);
			a > c && (d = o, a = c);
			return {
				zoom: a,
				JC: d
			}
		},
		Fa: t("Ja"),
		Vb: function(a, b) {
			b = b || this.U();
			return this.je.Vb(a, b, this.kc, this.Mb(), this.Jb)
		},
		mb: function(a, b) {
			b = b || this.U();
			return this.je.mb(a, b, this.kc, this.Mb(), this.Jb)
		},
		Fe: function(a, b) {
			if (a) {
				var c = this.Vb(new H(a.lng, a.lat), b);
				c.x -= this.offsetX;
				c.y -= this.offsetY;
				return c
			}
		},
		kM: function(a, b) {
			if (a) {
				var c = new P(a.x, a.y);
				c.x += this.offsetX;
				c.y += this.offsetY;
				return this.mb(c, b)
			}
		},
		pointToPixelFor3D: function(a, b) {
			var c = map.Jb;
			this.ub === Oa && c && cb.sJ(a, this, b)
		},
		X1: function(a, b) {
			var c = map.Jb;
			this.ub === Oa && c && cb.rJ(a, this, b)
		},
		Y1: function(a, b) {
			var c = this,
				d = map.Jb;
			c.ub === Oa && d && cb.sJ(a, c, function(a) {
				a.x -= c.offsetX;
				a.y -= c.offsetY;
				b && b(a)
			})
		},
		W1: function(a, b) {
			var c = map.Jb;
			this.ub === Oa && c && (a.x += this.offsetX, a.y += this.offsetY, cb.rJ(a, this, b))
		},
		Nd: function(a) {
			if (!this.bx()) return new db;
			var b = a || {},
				a = b.margins || [0, 0, 0, 0],
				c = b.zoom || p,
				b = this.mb({
					x: a[3],
					y: this.height - a[2]
				}, c),
				a = this.mb({
					x: this.width - a[1],
					y: a[0]
				}, c);
			return new db(b, a)
		},
		bx: function() {
			return !!this.loaded
		},
		EQ: function(a, b) {
			for (var c = this.la(), d = b.margins || [10, 10, 10, 10], e = b.zoomFactor || 0, f = d[1] + d[3], d = d[0] + d[2], g = c.Ao(), i = c = c.Xl(); i >= g; i--) {
				var k = this.la().Bc(i);
				if (a.WE().lng / k < this.width - f && a.WE().lat / k < this.height - d) break
			}
			i += e;
			i < g && (i = g);
			i > c && (i = c);
			return i
		},
		ys: function(a, b) {
			var c = {
				center: this.Aa(),
				zoom: this.U()
			};
			if (!a || !a instanceof db && 0 === a.length || a instanceof db && a.kj()) return c;
			var d = [];
			a instanceof db ? (d.push(a.Bf()), d.push(a.De())) : d = a.slice(0);
			for (var b = b || {}, e = [], f = 0, g = d.length; f < g; f++) e.push(this.je.pm(d[f], this.Jb));
			d = new db;
			for (f = e.length - 1; 0 <= f; f--) d.extend(e[f]);
			if (d.kj()) return c;
			c = d.Aa();
			e = this.EQ(d, b);
			b.margins && (d = b.margins, f = (d[1] - d[3]) / 2, d = (d[0] - d[2]) / 2, g = this.la().Bc(e), b.offset && (f = b.offset.width, d = b.offset.height), c.lng += g * f, c.lat += g * d);
			c = this.je.$g(c, this.Jb);
			return {
				center: c,
				zoom: e
			}
		},
		lh: function(a, b) {
			var c;
			c = a && a.center ? a : this.ys(a, b);
			var b = b || {},
				d = b.delay || 200;
			if (c.zoom === this.wa && b.enableAnimation !== q) {
				var e = this;
				setTimeout(function() {
					e.fi(c.center, {
						duration: 210
					})
				}, d)
			} else this.ae(c.center, c.zoom)
		},
		Df: t("Zd"),
		Tg: function() {
			return this.H.ab && this.H.ab.Ka() ? this.H.ab : p
		},
		getDistance: function(a, b) {
			if (a && b) {
				if (a.$a(b)) return 0;
				var c = 0,
					c = Q.yo(a, b);
				if (c === p || c === j) c = 0;
				return c
			}
		},
		Mw: function() {
			var a = [],
				b = this.ka,
				c = this.me;
			if (b)
				for (var d in b) b[d] instanceof eb && a.push(b[d]);
			if (c) {
				d = 0;
				for (b = c.length; d < b; d++) a.push(c[d])
			}
			return a
		},
		la: t("ub"),
		Ky: function() {
			for (var a = this.H.qE; a < z.$q.length; a++) z.$q[a](this);
			this.H.qE = a
		},
		FE: function(a) {
			this.Jb = Oa.$j(a);
			this.Yv = Oa.mK(this.Jb);
			this.ub === Oa && this.je instanceof fb && (this.je.PB = this.Jb)
		},
		setDefaultCursor: function(a) {
			this.D.Kb = a;
			this.platform && (this.platform.style.cursor = this.D.Kb)
		},
		getDefaultCursor: function() {
			return this.D.Kb
		},
		setDraggingCursor: function(a) {
			this.D.od = a
		},
		getDraggingCursor: function() {
			return this.D.od
		},
		OK: function() {
			return this.D.hV && 1.5 <= this.D.devicePixelRatio
		},
		Lv: function(a, b) {
			b ? this.zh[b] || (this.zh[b] = {}) : b = "custom";
			a.tag = b;
			a instanceof gb && (this.zh[b][a.Q] = a, a.fa(this));
			var c = this;
			J.load("hotspot", function() {
				c.Ky()
			}, o)
		},
		aY: function(a, b) {
			b || (b = "custom");
			this.zh[b][a.Q] && delete this.zh[b][a.Q]
		},
		Il: function(a) {
			a || (a = "custom");
			this.zh[a] = {}
		},
		ru: function() {
			var a = this.ub.Ao(),
				b = this.ub.Xl(),
				c = this.D;
			c.Ub = c.GN || a;
			c.Nb = c.FN || b;
			c.Ub < a && (c.Ub = a);
			c.Nb > b && (c.Nb = b)
		},
		setMinZoom: function(a) {
			a = Math.round(a);
			a > this.D.Nb && (a = this.D.Nb);
			this.D.GN = a;
			this.vI()
		},
		setMaxZoom: function(a) {
			a = Math.round(a);
			a < this.D.Ub && (a = this.D.Ub);
			this.D.FN = a;
			this.vI()
		},
		vI: function() {
			this.ru();
			var a = this.D;
			this.wa < a.Ub ? this.Cc(a.Ub) : this.wa > a.Nb && this.Cc(a.Nb);
			var b = new M("onzoomspanchange");
			b.Ub = a.Ub;
			b.Nb = a.Nb;
			this.dispatchEvent(b)
		},
		j1: t("eB"),
		getKey: function() {
			return qa
		},
		ht: function(a) {
			var b = this;
			window.MPC_Mgr && window.MPC_Mgr[b.Q] && window.MPC_Mgr[b.Q].close();
			b.D.Yi = q;
			if (a) {
				b = this;
				a.styleJson && (a.styleStr = b.eZ(a.styleJson));
				G() && w.S.HM ? setTimeout(function() {
					b.D.ge = a;
					b.dispatchEvent(new M("onsetcustomstyles", a))
				}, 50) : (this.D.ge = a, this.dispatchEvent(new M("onsetcustomstyles", a)), this.YK(b.D.ge.geotableId));
				var c = {
					style: a.style
				};
				a.features && 0 < a.features.length && (c.features = o);
				a.styleJson && 0 < a.styleJson.length && (c.styleJson = o);
				Pa(5050, c);
				a.style && (c = b.D.Kl[a.style] ? b.D.Kl[a.style].backColor : b.D.Kl.normal.backColor) && (this.Fa().style.backgroundColor = c)
			}
		},
		PW: function(a) {
			this.controls || (this.controls = {
				navigationControl: new hb,
				scaleControl: new ib,
				overviewMapControl: new kb,
				mapTypeControl: new lb
			});
			var b = this,
				c;
			for (c in this.controls) b.vM(b.controls[c]);
			a = a || [];
			w.Yb.qb(a, function(a) {
				b.Jv(b.controls[a])
			})
		},
		YK: function(a) {
			a ? this.Lr && this.Lr.hf === a || (this.jh(this.Lr), this.Lr = new mb({
				geotableId: a
			}), this.Kg(this.Lr)) : this.jh(this.Lr)
		},
		Ib: function() {
			var a = this.U() >= this.D.cF && this.la() === Ma && 18 >= this.U(),
				b = q;
			try {
				document.createElement("canvas").getContext("2d"), b = o
			} catch (c) {
				b = q
			}
			return a && b
		},
		getCurrentCity: function() {
			return {
				name: this.ho,
				code: this.tB
			}
		},
		Yl: function() {
			this.G.Dn();
			return this.G
		},
		setPanorama: function(a) {
			this.G = a;
			this.G.GE(this)
		},
		eZ: function(a) {
			for (var b = {
				featureType: "t",
				elementType: "e",
				visibility: "v",
				color: "c",
				lightness: "l",
				saturation: "s",
				weight: "w",
				zoom: "z",
				hue: "h"
			}, c = {
				all: "all",
				geometry: "g",
				"geometry.fill": "g.f",
				"geometry.stroke": "g.s",
				labels: "l",
				"labels.text.fill": "l.t.f",
				"labels.text.stroke": "l.t.s",
				"lables.text": "l.t",
				"labels.icon": "l.i"
			}, d = [], e = 0, f; f = a[e]; e++) {
				var g = f.stylers;
				delete f.stylers;
				w.extend(f, g);
				var g = [],
					i;
				for (i in b) f[i] && ("elementType" === i ? g.push(b[i] + ":" + c[f[i]]) : g.push(b[i] + ":" + f[i]));
				2 < g.length && d.push(g.join("|"))
			}
			return d.join(",")
		}
	});

	function Pa(a, b) {
		if (a) {
			var b = b || {},
				c = "",
				d;
			for (d in b) c = c + "&" + d + "=" + encodeURIComponent(b[d]);
			var e = function(a) {
					a && (nb = o, setTimeout(function() {
						ob.src = z.vc + "images/blank.gif?" + a.src
					}, 50))
				},
				f = function() {
					var a = qb.shift();
					a && e(a)
				};
			d = (1E8 * Math.random()).toFixed(0);
			nb ? qb.push({
				src: "product=jsapi&sub_product=jsapi&v=" + z.version + "&sub_product_v=" + z.version + "&t=" + d + "&code=" + a + "&da_src=" + a + c
			}) : e({
				src: "product=jsapi&sub_product=jsapi&v=" + z.version + "&sub_product_v=" + z.version + "&t=" + d + "&code=" + a + "&da_src=" + a + c
			});
			rb || (w.F(ob, "load", function() {
				nb = q;
				f()
			}), w.F(ob, "error", function() {
				nb = q;
				f()
			}), rb = o)
		}
	}
	var nb, rb, qb = [],
		ob = new Image;
	Pa(5E3, {
		device_pixel_ratio: window.devicePixelRatio,
		platform: navigator.platform
	});
	z.SK = {
		TILE_BASE_URLS: ["ss0.baidu.com/5bwHcj7lABFU8t_jkk_Z1zRvfdw6buu", "ss0.baidu.com/5bwHcj7lABFV8t_jkk_Z1zRvfdw6buu", "ss0.baidu.com/5bwHcj7lABFS8t_jkk_Z1zRvfdw6buu", "ss0.bdstatic.com/5bwHcj7lABFT8t_jkk_Z1zRvfdw6buu", "ss0.bdstatic.com/5bwHcj7lABFY8t_jkk_Z1zRvfdw6buu"],
		TILE_ONLINE_URLS: ["ss0.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv", "ss0.bdstatic.com/8bo_dTSlRMgBo1vgoIiO_jowehsv", "ss0.bdstatic.com/8bo_dTSlRcgBo1vgoIiO_jowehsv", "ss0.bdstatic.com/8bo_dTSlRsgBo1vgoIiO_jowehsv", "ss0.bdstatic.com/8bo_dTSlQ1gBo1vgoIiO_jowehsv"],
		TIlE_PERSPECT_URLS: ["ss0.bdstatic.com/-OR1cTe9KgQFm2e88IuM_a", "ss0.bdstatic.com/-ON1cTe9KgQFm2e88IuM_a", "ss0.bdstatic.com/-OZ1cTe9KgQFm2e88IuM_a", "ss0.bdstatic.com/-OV1cTe9KgQFm2e88IuM_a"],
		geolocControl: "sp2.baidu.com/8LkJsjOpB1gCo2Kml5_Y_D3",
		TILES_YUN_HOST: ["sp0.baidu.com/-eR1bSahKgkFkRGko9WTAnF6hhy", "sp0.baidu.com/-eN1bSahKgkFkRGko9WTAnF6hhy", "sp0.baidu.com/-eZ1bSahKgkFkRGko9WTAnF6hhy", "sp0.baidu.com/-eV1bSahKgkFkRGko9WTAnF6hhy"],
		traffic: "sp0.baidu.com/7_AZsjOpB1gCo2Kml5_Y_D3",
		iw_pano: "ss0.bdstatic.com/5LUZemba_QUU8t7mm9GUKT-xh_",
		message: "sp0.baidu.com/7vo0bSba2gU2pMbgoY3K",
		baidumap: "sp0.baidu.com/80MWsjip0QIZ8tyhnq",
		wuxian: "sp0.baidu.com/6a1OdTeaKgQFm2e88IuM_a",
		pano: ["ss0.bdstatic.com/5LUZemba_QUU8t7mm9GUKT-xh_", "ss0.bdstatic.com/5LUZemfa_QUU8t7mm9GUKT-xh_", "ss0.bdstatic.com/5LUZemja_QUU8t7mm9GUKT-xh_"],
		main_domain_nocdn: {
			baidu: "sp0.baidu.com/9_Q4sjOpB1gCo2Kml5_Y_D3",
			other: "sapi.map.baidu.com"
		},
		main_domain_cdn: {
			baidu: ["ss0.bdstatic.com/9_Q4vHSd2RZ3otebn9fN2DJv", "ss0.baidu.com/9_Q4vXSd2RZ3otebn9fN2DJv", "ss0.bdstatic.com/9_Q4vnSd2RZ3otebn9fN2DJv"],
			other: ["sapi.map.baidu.com"],
			webmap: ["ss0.baidu.com/6b1IcTe9R1gBo1vgoIiO_jowehsv"]
		},
		map_click: "sp0.baidu.com/80MWbzKh2wt3n2qy8IqW0jdnxx1xbK",
		vector_traffic: "ss0.bdstatic.com/8aZ1cTe9KgQIm2_p8IuM_a"
	};
	z.LW = {
		TILE_BASE_URLS: ["shangetu0.map.bdimg.com", "shangetu1.map.bdimg.com", "shangetu2.map.bdimg.com", "shangetu3.map.bdimg.com", "shangetu4.map.bdimg.com"],
		TILE_ONLINE_URLS: ["online0.map.bdimg.com", "online1.map.bdimg.com", "online2.map.bdimg.com", "online3.map.bdimg.com", "online4.map.bdimg.com"],
		TIlE_PERSPECT_URLS: ["d0.map.baidu.com", "d1.map.baidu.com", "d2.map.baidu.com", "d3.map.baidu.com"],
		geolocControl: "loc.map.baidu.com",
		TILES_YUN_HOST: ["g0.api.map.baidu.com", "g1.api.map.baidu.com", "g2.api.map.baidu.com", "g3.api.map.baidu.com"],
		traffic: "its.map.baidu.com",
		iw_pano: "pcsv0.map.bdimg.com",
		message: "j.map.baidu.com",
		baidumap: "map.baidu.com",
		wuxian: "wuxian.baidu.com",
		pano: ["pcsv0.map.bdimg.com", "pcsv1.map.bdimg.com", "pcsv2.map.bdimg.com"],
		main_domain_nocdn: {
			baidu: "api.map.baidu.com"
		},
		main_domain_cdn: {
			baidu: ["api0.map.bdimg.com", "api1.map.bdimg.com", "api2.map.bdimg.com"],
			webmap: ["webmap0.map.bdimg.com"]
		},
		map_click: "mapclick.map.baidu.com",
		vector_traffic: "or.map.bdimg.com"
	};
	z.IZ = {
		"0": {
			proto: "http://",
			domain: z.LW
		},
		1: {
			proto: "https://",
			domain: z.SK
		},
		2: {
			proto: "https://",
			domain: z.SK
		}
	};
	z.hy = window.HOST_TYPE || "0";
	z.url = z.IZ[z.hy];
	z.To = z.url.proto + z.url.domain.baidumap + "/";
	z.vc = z.url.proto + ("2" == z.hy ? z.url.domain.main_domain_nocdn.other : z.url.domain.main_domain_nocdn.baidu) + "/";
	z.ca = z.url.proto + ("2" == z.hy ? z.url.domain.main_domain_cdn.other[0] : z.url.domain.main_domain_cdn.baidu[0]) + "/";
	z.Cl = z.url.proto + z.url.domain.main_domain_cdn.webmap[0] + "/";
	z.hg = function(a, b) {
		var c, d, b = b || "";
		switch (a) {
			case "main_domain_nocdn":
				c = z.vc + b;
				break;
			case "main_domain_cdn":
				c = z.ca + b;
				break;
			default:
				d = z.url.domain[a], "[object Array]" == Object.prototype.toString.call(d) ? (c = [], w.Yb.qb(d, function(a, d) {
					c[d] = z.url.proto + a + "/" + b
				})) : c = z.url.proto + z.url.domain[a] + "/" + b
		}
		return c
	};

	function sb(a) {
		var b = {
			duration: 1E3,
			wc: 30,
			lo: 0,
			Xb: tb.uL,
			Ss: s()
		};
		this.Nf = [];
		if (a)
			for (var c in a) b[c] = a[c];
		this.k = b;
		if (Ua(b.lo)) {
			var d = this;
			setTimeout(function() {
				d.start()
			}, b.lo)
		} else b.lo != ub && this.start()
	}
	var ub = "INFINITE";
	sb.prototype.start = function() {
		this.ku = Za();
		this.qz = this.ku + this.k.duration;
		wb(this)
	};
	sb.prototype.add = function(a) {
		this.Nf.push(a)
	};

	function wb(a) {
		var b = Za();
		b >= a.qz ? (Va(a.k.ja) && a.k.ja(a.k.Xb(1)), Va(a.k.finish) && a.k.finish(), 0 < a.Nf.length && (b = a.Nf[0], b.Nf = [].concat(a.Nf.slice(1)), b.start())) : (a.Nx = a.k.Xb((b - a.ku) / a.k.duration), Va(a.k.ja) && a.k.ja(a.Nx), a.SE || (a.rr = setTimeout(function() {
			wb(a)
		}, 1E3 / a.k.wc)))
	}
	sb.prototype.stop = function(a) {
		this.SE = o;
		for (var b = 0; b < this.Nf.length; b++) this.Nf[b].stop(), this.Nf[b] = p;
		this.Nf.length = 0;
		this.rr && (clearTimeout(this.rr), this.rr = p);
		this.k.Ss(this.Nx);
		a && (this.qz = this.ku, wb(this))
	};
	sb.prototype.cancel = ga(1);
	var tb = {
		uL: function(a) {
			return a
		},
		reverse: function(a) {
			return 1 - a
		},
		vC: function(a) {
			return a * a
		},
		uC: function(a) {
			return Math.pow(a, 3)
		},
		$r: function(a) {
			return -(a * (a - 2))
		},
		QJ: function(a) {
			return Math.pow(a - 1, 3) + 1
		},
		PJ: function(a) {
			return 0.5 > a ? 2 * a * a : -2 * (a - 2) * a - 1
		},
		w0: function(a) {
			return 0.5 > a ? 4 * Math.pow(a, 3) : 4 * Math.pow(a - 1, 3) + 1
		},
		x0: function(a) {
			return (1 - Math.cos(Math.PI * a)) / 2
		}
	};
	tb["ease-in"] = tb.vC;
	tb["ease-out"] = tb.$r;
	var F = {
		kF: 34,
		lF: 21,
		mF: new L(21, 32),
		WN: new L(10, 32),
		VN: new L(24, 36),
		UN: new L(12, 36),
		iF: new L(13, 1),
		ea: z.ca + "images/",
		s1: "http://api0.map.bdimg.com/images/",
		jF: z.ca + "images/markers_new.png",
		SN: 24,
		TN: 73,
		zB: {
			"\u5317\u4eac": {
				Dx: "bj",
				m: new H(116.403874, 39.914889)
			},
			"\u4e0a\u6d77": {
				Dx: "sh",
				m: new H(121.487899, 31.249162)
			},
			"\u6df1\u5733": {
				Dx: "sz",
				m: new H(114.025974, 22.546054)
			},
			"\u5e7f\u5dde": {
				Dx: "gz",
				m: new H(113.30765, 23.120049)
			}
		},
		fontFamily: "arial,sans-serif"
	};
	w.S.fg ? (w.extend(F, {
		FJ: "url(" + F.ea + "ruler.cur),crosshair",
		Kb: "-moz-grab",
		od: "-moz-grabbing"
	}), w.platform.lL && (F.fontFamily = "arial,simsun,sans-serif")) : w.S.jJ || w.S.HM ? w.extend(F, {
		FJ: "url(" + F.ea + "ruler.cur) 2 6,crosshair",
		Kb: "url(" + F.ea + "openhand.cur) 8 8,default",
		od: "url(" + F.ea + "closedhand.cur) 8 8,move"
	}) : w.extend(F, {
		FJ: "url(" + F.ea + "ruler.cur),crosshair",
		Kb: "url(" + F.ea + "openhand.cur),default",
		od: "url(" + F.ea + "closedhand.cur),move"
	});

	function xb(a, b) {
		var c = a.style;
		c.left = b[0] + "px";
		c.top = b[1] + "px"
	}

	function yb(a) {
		0 < w.S.ba ? a.unselectable = "on" : a.style.MozUserSelect = "none"
	}

	function zb(a) {
		return a && a.parentNode && 11 != a.parentNode.nodeType
	}

	function Ab(a, b) {
		w.B.$w(a, "beforeEnd", b);
		return a.lastChild
	}

	function Bb(a) {
		for (var b = {
			left: 0,
			top: 0
		}; a && a.offsetParent;) b.left += a.offsetLeft, b.top += a.offsetTop, a = a.offsetParent;
		return b
	}

	function oa(a) {
		a = window.event || a;
		a.stopPropagation ? a.stopPropagation() : a.cancelBubble = o
	}

	function Cb(a) {
		a = window.event || a;
		a.preventDefault ? a.preventDefault() : a.returnValue = q;
		return q
	}

	function pa(a) {
		oa(a);
		return Cb(a)
	}

	function Db() {
		var a = document.documentElement,
			b = document.body;
		return a && (a.scrollTop || a.scrollLeft) ? [a.scrollTop, a.scrollLeft] : b ? [b.scrollTop, b.scrollLeft] : [0, 0]
	}

	function Eb(a, b) {
		if (a && b) return Math.round(Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)))
	}

	function Fb(a, b) {
		var c = [],
			b = b || function(a) {
				return a
			},
			d;
		for (d in a) c.push(d + "=" + b(a[d]));
		return c.join("&")
	}

	function K(a, b, c) {
		var d = document.createElement(a);
		c && (d = document.createElementNS(c, a));
		return w.B.EE(d, b || {})
	}

	function Ta(a) {
		if (a.currentStyle) return a.currentStyle;
		if (a.ownerDocument && a.ownerDocument.defaultView) return a.ownerDocument.defaultView.getComputedStyle(a, p)
	}

	function Va(a) {
		return "function" == typeof a
	}

	function Ua(a) {
		return "number" == typeof a
	}

	function Xa(a) {
		return "string" == typeof a
	}

	function Gb(a) {
		return "undefined" != typeof a
	}

	function Hb(a) {
		return "object" == typeof a
	}
	var Ib = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

	function Jb(a) {
		var b = "",
			c, d, e = "",
			f, g = "",
			i = 0;
		f = /[^A-Za-z0-9\+\/\=]/g;
		if (!a || f.exec(a)) return a;
		a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		do c = Ib.indexOf(a.charAt(i++)), d = Ib.indexOf(a.charAt(i++)), f = Ib.indexOf(a.charAt(i++)), g = Ib.indexOf(a.charAt(i++)), c = c << 2 | d >> 4, d = (d & 15) << 4 | f >> 2, e = (f & 3) << 6 | g, b += String.fromCharCode(c), 64 != f && (b += String.fromCharCode(d)), 64 != g && (b += String.fromCharCode(e)); while (i < a.length);
		return b
	}
	var M = w.lang.uy;

	function G() {
		return !(!w.platform.GD && !w.platform.$W && !w.platform.lm)
	}

	function Sa() {
		return !(!w.platform.lL && !w.platform.dL && !w.platform.fX)
	}

	function Za() {
		return (new Date).getTime()
	}

	function Kb() {
		var a = document.body.appendChild(K("div"));
		a.innerHTML = '<v:shape id="vml_tester1" adj="1" />';
		var b = a.firstChild;
		if (!b.style) return q;
		b.style.behavior = "url(#default#VML)";
		b = b ? "object" == typeof b.adj : o;
		a.parentNode.removeChild(a);
		return b
	}

	function Lb() {
		return !!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.1")
	}

	function Mb() {
		return !!K("canvas").getContext
	}

	function Nb(a) {
		return a * Math.PI / 180
	}
	z.nX = function() {
		var a = o,
			b = o,
			c = o,
			d = o,
			e = 0,
			f = 0,
			g = 0,
			i = 0;
		return {
			AP: function() {
				e += 1;
				a && (a = q, setTimeout(function() {
					Pa(5054, {
						pic: e
					});
					a = o;
					e = 0
				}, 1E4))
			},
			n_: function() {
				f += 1;
				b && (b = q, setTimeout(function() {
					Pa(5055, {
						move: f
					});
					b = o;
					f = 0
				}, 1E4))
			},
			p_: function() {
				g += 1;
				c && (c = q, setTimeout(function() {
					Pa(5056, {
						zoom: g
					});
					c = o;
					g = 0
				}, 1E4))
			},
			o_: function(a) {
				i += a;
				d && (d = q, setTimeout(function() {
					Pa(5057, {
						tile: i
					});
					d = o;
					i = 0
				}, 5E3))
			}
		}
	}();
	var Ya;
	(function() {
		function a(a) {
			this.LT = a;
			this.timing = {};
			this.start = +new Date
		}

		function b(a, b) {
			if (a.length === +a.length)
				for (var c = 0, d = a.length; c < d && b.call(j, c, a[c], a) !== q; c++);
			else
				for (c in a)
					if (a.hasOwnProperty(c) && b.call(j, c, a[c], a) === q) break
		}
		var c = [],
			d = {
				push: function(a) {
					c.push(a);
					if (window.localStorage && window.JSON) try {
						localStorage.setItem("WPO_NR", JSON.stringify(c))
					} catch (b) {}
				},
				get: function(a) {
					var b = [];
					if (window.localStorage) try {
						a && localStorage.removeItem("WPO_NR")
					} catch (d) {}
					b = c;
					a && (c = []);
					return b
				}
			},
			e, f, g, i, k = {};
		(!window.localStorage || !window.JSON) && document.attachEvent && window.attachEvent("onbeforeunload", function() {
			l.send()
		});
		var l = {
			send: function(a) {
				var c = [],
					e = [],
					f = a || d.get(o),
					g;
				0 < f.length && (b(f, function(d, e) {
					var f = [];
					b(e.timing, function(a, b) {
						f.push('"' + a + '":' + b)
					});
					c.push('{"t":{' + f.join(",") + '},"a":' + e.LT + "}");
					!g && (a && e.start) && (g = e.start)
				}), b(k, function(a, b) {
					e.push(a + "=" + b)
				}), e.push("d=[" + c.join(",") + "]"), g ? e.push("_st=" + g) : e.push("_t=" + +new Date), f = new Image, f.src = "http://static.tieba.baidu.com/tb/pms/img/st.gif?" + e.join("&"), window["___pms_img_" + 1 * new Date] = f)
			}
		};
		a.prototype = {
			cc: function(a, b) {
				this.timing[a] = 0 <= b ? b : new Date - this.start
			},
			Ct: function() {
				this.start = +new Date
			},
			vN: function() {
				this.cc("tt")
			},
			iy: function() {
				this.cc("vt")
			},
			Cm: function() {
				f && (d.push(this), d.get().length >= g && l.send())
			},
			error: s()
		};
		Ya = {
			qi: {
				yD: function(a) {
					var b = navigator.k0 || navigator.L1 || navigator.Y2 || {
						type: 0
					};
					f = Math.random() <= (a.kY || 0.01);
					g = a.max || 5;
					i = a.K1 || b.type;
					k = {
						p: a.XX,
						mnt: i,
						b: 50
					};
					window.localStorage && (window.JSON && window.addEventListener) && (e = d.get(o), window.addEventListener("load", function() {
						l.send(e)
					}, q))
				},
				Vj: function(b) {
					return new a(b)
				}
			}
		}
	})();
	Ya.qi.yD({
		XX: 18,
		kY: 0.1,
		max: 1
	});
	z.Hp = {
		yF: "#83a1ff",
		Jp: "#808080"
	};

	function Ob(a, b, c) {
		b.sm || (b.sm = [], b.handle = {});
		b.sm.push({
			filter: c,
			Tl: a
		});
		b.addEventListener || (b.addEventListener = function(a, c) {
			b.attachEvent("on" + a, c)
		});
		b.handle.click || (b.addEventListener("click", function(a) {
			for (var c = a.target || a.srcElement; c != b;) {
				Pb(b.sm, function(b, g) {
					RegExp(g.filter).test(c.getAttribute("filter")) && g.Tl.call(c, a, c.getAttribute("filter"))
				});
				c = c.parentNode
			}
		}, q), b.handle.click = o)
	}

	function Pb(a, b) {
		for (var c = 0, d = a.length; c < d; c++) b(c, a[c])
	};

	function Qb(a, b) {
		if (b) {
			var c = (1E5 * Math.random()).toFixed(0);
			z._rd["_cbk" + c] = function(a) {
				b && b(a);
				delete z._rd["_cbk" + c]
			};
			a += "&callback=BMap._rd._cbk" + c
		}
		var d = K("script", {
			type: "text/javascript"
		});
		d.charset = "utf-8";
		d.src = a;
		d.addEventListener ? d.addEventListener("load", function(a) {
			a = a.target;
			a.parentNode.removeChild(a)
		}, q) : d.attachEvent && d.attachEvent("onreadystatechange", function() {
			var a = window.event.srcElement;
			a && ("loaded" == a.readyState || "complete" == a.readyState) && a.parentNode.removeChild(a)
		});
		setTimeout(function() {
			document.getElementsByTagName("head")[0].appendChild(d);
			d = p
		}, 1)
	};
	var Rb = {
		map: "u2bj2x",
		common: "45f3pt",
		style: "snzk5q",
		tile: "lx42gh",
		vectordrawlib: "mwfj2h",
		newvectordrawlib: "nz45vv",
		groundoverlay: "svzstv",
		pointcollection: "ermrwa",
		marker: "msdzps",
		symbol: "w1bucz",
		canvablepath: "zgglh2",
		vmlcontext: "gck0eb",
		markeranimation: "atuli2",
		poly: "xenb3h",
		draw: "wrpwyd",
		drawbysvg: "yjiccf",
		drawbyvml: "blnbvf",
		drawbycanvas: "j5w4kk",
		infowindow: "tt3umh",
		oppc: "qlxswp",
		opmb: "1r0b22",
		menu: "vyomhz",
		control: "ik40qz",
		navictrl: "zhjmef",
		geoctrl: "vnxn3d",
		copyrightctrl: "uwqo2r",
		scommon: "krrlu0",
		local: "2ygxto",
		route: "fjcj24",
		othersearch: "c4pjwh",
		mapclick: "didsxk",
		buslinesearch: "25vpqp",
		hotspot: "1b1r5w",
		autocomplete: "vnp0yn",
		coordtrans: "py0mwb",
		coordtransutils: "i31w2h",
		convertor: "fogxt0",
		clayer: "31ltok",
		pservice: "jdzain",
		pcommon: "k0e51e",
		panorama: "bzyc1c",
		panoramaflash: "xkbz2e",
		vector: "zxhcjk"
	};
	w.ay = function() {
		function a(a) {
			return d && !!c[b + a + "_" + Rb[a]]
		}
		var b = "BMap_",
			c = window.localStorage,
			d = "localStorage" in window && c !== p && c !== j;
		return {
			bX: d,
			set: function(a, f) {
				if (d) {
					for (var g = b + a + "_", i = c.length, k; i--;) k = c.key(i), -1 < k.indexOf(g) && c.removeItem(k);
					try {
						c.setItem(b + a + "_" + Rb[a], f)
					} catch (l) {
						c.clear()
					}
				}
			},
			get: function(e) {
				return d && a(e) ? c.getItem(b + e + "_" + Rb[e]) : q
			},
			hJ: a
		}
	}();

	function J() {}
	w.object.extend(J, {
		rj: {
			zF: -1,
			BO: 0,
			Cp: 1
		},
		qK: function() {
			var a = "drawbysvg",
				b = "canvablepath",
				c = z.EI ? "newvectordrawlib" : "vectordrawlib";
			G() && Mb() ? a = "drawbycanvas" : Lb() ? a = "drawbysvg" : Kb() ? (a = "drawbyvml", b = "vmlcontext") : Mb() && (a = "drawbycanvas");
			return {
				tile: [c, "style"],
				control: [],
				marker: ["symbol"],
				symbol: ["canvablepath", "common"],
				canvablepath: "canvablepath" === b ? [] : [b],
				vmlcontext: [],
				style: [],
				poly: ["marker", a],
				drawbysvg: ["draw"],
				drawbyvml: ["draw"],
				drawbycanvas: ["draw"],
				infowindow: ["common", "marker"],
				menu: [],
				oppc: [],
				opmb: [],
				scommon: [],
				local: ["scommon"],
				route: ["scommon"],
				othersearch: ["scommon"],
				autocomplete: ["scommon"],
				mapclick: ["scommon"],
				buslinesearch: ["route"],
				hotspot: [],
				coordtransutils: ["coordtrans"],
				convertor: [],
				clayer: ["tile"],
				pservice: [],
				pcommon: ["style", "pservice"],
				panorama: ["pcommon"],
				panoramaflash: ["pcommon"]
			}
		},
		b2: {},
		sF: {
			SO: z.ca + "getmodules?v=2.0&t=20140707",
			pT: 5E3
		},
		XB: q,
		Ad: {
			Xk: {},
			an: [],
			ov: []
		},
		load: function(a, b, c) {
			var d = this.Va(a);
			if (d.md == this.rj.Cp) c && b();
			else {
				if (d.md == this.rj.zF) {
					this.oJ(a);
					this.sM(a);
					var e = this;
					e.XB == q && (e.XB = o, setTimeout(function() {
						for (var a = [], b = 0, c = e.Ad.an.length; b < c; b++) {
							var d = e.Ad.an[b],
								l = "";
							ia.ay.hJ(d) ? l = ia.ay.get(d) : (l = "", a.push(d + "_" + Rb[d]));
							e.Ad.ov.push({
								NL: d,
								$D: l
							})
						}
						e.XB = q;
						e.Ad.an.length = 0;
						0 == a.length ? e.WJ() : Qb(e.sF.SO + "&mod=" + a.join(","))
					}, 1));
					d.md = this.rj.BO
				}
				d.ou.push(b)
			}
		},
		oJ: function(a) {
			if (a && this.qK()[a])
				for (var a = this.qK()[a], b = 0; b < a.length; b++) this.oJ(a[b]), this.Ad.Xk[a[b]] || this.sM(a[b])
		},
		sM: function(a) {
			for (var b = 0; b < this.Ad.an.length; b++)
				if (this.Ad.an[b] == a) return;
			this.Ad.an.push(a)
		},
		jY: function(a, b) {
			var c = this.Va(a);
			try {
				eval(b)
			} catch (d) {
				return
			}
			c.md = this.rj.Cp;
			for (var e = 0, f = c.ou.length; e < f; e++) c.ou[e]();
			c.ou.length = 0
		},
		hJ: function(a, b) {
			var c = this;
			c.timeout = setTimeout(function() {
				c.Ad.Xk[a].md != c.rj.Cp ? (c.remove(a), c.load(a, b)) : clearTimeout(c.timeout)
			}, c.sF.pT)
		},
		Va: function(a) {
			this.Ad.Xk[a] || (this.Ad.Xk[a] = {}, this.Ad.Xk[a].md = this.rj.zF, this.Ad.Xk[a].ou = []);
			return this.Ad.Xk[a]
		},
		remove: function(a) {
			delete this.Va(a)
		},
		gU: function(a, b) {
			for (var c = this.Ad.ov, d = o, e = 0, f = c.length; e < f; e++) "" == c[e].$D && (c[e].NL == a ? c[e].$D = b : d = q);
			d && this.WJ()
		},
		WJ: function() {
			for (var a = this.Ad.ov, b = 0, c = a.length; b < c; b++) this.jY(a[b].NL, a[b].$D);
			this.Ad.ov.length = 0
		}
	});

	function P(a, b) {
		this.x = a || 0;
		this.y = b || 0;
		this.x = this.x;
		this.y = this.y
	}
	P.prototype.$a = function(a) {
		return a && a.x == this.x && a.y == this.y
	};

	function L(a, b) {
		this.width = a || 0;
		this.height = b || 0
	}
	L.prototype.$a = function(a) {
		return a && this.width == a.width && this.height == a.height
	};

	function gb(a, b) {
		a && (this.xb = a, this.Q = "spot" + gb.Q++, b = b || {}, this.Hg = b.text || "", this.Vu = b.offsets ? b.offsets.slice(0) : [5, 5, 5, 5], this.xI = b.userData || p, this.Ch = b.minZoom || p, this.nf = b.maxZoom || p)
	}
	gb.Q = 0;
	w.extend(gb.prototype, {
		fa: function(a) {
			this.Ch == p && (this.Ch = a.D.Ub);
			this.nf == p && (this.nf = a.D.Nb)
		},
		ha: function(a) {
			a instanceof H && (this.xb = a)
		},
		V: t("xb"),
		lt: ba("Hg"),
		nD: t("Hg"),
		setUserData: ba("xI"),
		getUserData: t("xI")
	});

	function Sb() {
		this.C = p;
		this.yb = "control";
		this.Ea = this.bJ = o
	}
	w.lang.ia(Sb, w.lang.qa, "Control");
	w.extend(Sb.prototype, {
		initialize: function(a) {
			this.C = a;
			if (this.A) return a.Ja.appendChild(this.A), this.A
		},
		Ne: function(a) {
			!this.A && (this.initialize && Va(this.initialize)) && (this.A = this.initialize(a));
			this.k = this.k || {
				gh: q
			};
			this.RA();
			this.hv();
			this.A && (this.A.Hq = this)
		},
		RA: function() {
			var a = this.A;
			if (a) {
				var b = a.style;
				b.position = "absolute";
				b.zIndex = this.Oy || "10";
				b.MozUserSelect = "none";
				b.WebkitTextSizeAdjust = "none";
				this.k.gh || w.B.Oa(a, "BMap_noprint");
				G() || w.F(a, "contextmenu", pa)
			}
		},
		remove: function() {
			this.C = p;
			this.A && (this.A.parentNode && this.A.parentNode.removeChild(this.A), this.A = this.A.Hq = p)
		},
		ra: function() {
			this.A = Ab(this.C.Ja, "<div unselectable='on'></div>");
			this.Ea == q && w.B.J(this.A);
			return this.A
		},
		hv: function() {
			this.nc(this.k.anchor)
		},
		nc: function(a) {
			if (this.V_ || !Ua(a) || isNaN(a) || a < Tb || 3 < a) a = this.defaultAnchor;
			this.k = this.k || {
				gh: q
			};
			this.k.pa = this.k.pa || this.defaultOffset;
			var b = this.k.anchor;
			this.k.anchor = a;
			if (this.A) {
				var c = this.A,
					d = this.k.pa.width,
					e = this.k.pa.height;
				c.style.left = c.style.top = c.style.right = c.style.bottom = "auto";
				switch (a) {
					case Tb:
						c.style.top = e + "px";
						c.style.left = d + "px";
						break;
					case Ub:
						c.style.top = e + "px";
						c.style.right = d + "px";
						break;
					case Vb:
						c.style.bottom = e + "px";
						c.style.left = d + "px";
						break;
					case 3:
						c.style.bottom = e + "px", c.style.right = d + "px"
				}
				c = ["TL", "TR", "BL", "BR"];
				w.B.Pb(this.A, "anchor" + c[b]);
				w.B.Oa(this.A, "anchor" + c[a])
			}
		},
		SC: function() {
			return this.k.anchor
		},
		He: function(a) {
			a instanceof L && (this.k = this.k || {
				gh: q
			}, this.k.pa = new L(a.width, a.height), this.A && this.nc(this.k.anchor))
		},
		Cf: function() {
			return this.k.pa
		},
		rd: t("A"),
		show: function() {
			this.Ea != o && (this.Ea = o, this.A && w.B.show(this.A))
		},
		J: function() {
			this.Ea != q && (this.Ea = q, this.A && w.B.J(this.A))
		},
		isPrintable: function() {
			return !!this.k.gh
		},
		Wg: function() {
			return !this.A && !this.C ? q : !!this.Ea
		}
	});
	var Tb = 0,
		Ub = 1,
		Vb = 2;

	function hb(a) {
		Sb.call(this);
		a = a || {};
		this.k = {
			gh: q,
			OE: a.showZoomInfo || o,
			anchor: a.anchor,
			pa: a.offset,
			type: a.type,
			gV: a.enableGeolocation || q
		};
		this.defaultAnchor = G() ? 3 : Tb;
		this.defaultOffset = new L(10, 10);
		this.nc(a.anchor);
		this.Lm(a.type);
		this.ff()
	}
	w.lang.ia(hb, Sb, "NavigationControl");
	w.extend(hb.prototype, {
		initialize: function(a) {
			this.C = a;
			return this.A
		},
		Lm: function(a) {
			this.k.type = Ua(a) && 0 <= a && 3 >= a ? a : 0
		},
		Jo: function() {
			return this.k.type
		},
		ff: function() {
			var a = this;
			J.load("navictrl", function() {
				a.wg()
			})
		}
	});

	function Wb(a) {
		Sb.call(this);
		a = a || {};
		this.k = {
			anchor: a.anchor || Vb,
			pa: a.offset || new L(10, 30),
			UY: a.showAddressBar !== q,
			z0: a.enableAutoLocation || q,
			BL: a.locationIcon || p
		};
		var b = this;
		this.Oy = 1200;
		b.KZ = [];
		this.$d = [];
		J.load("geoctrl", function() {
			(function d() {
				if (0 !== b.$d.length) {
					var a = b.$d.shift();
					b[a.method].apply(b, a.arguments);
					d()
				}
			})();
			b.RO()
		});
		Pa(Ka)
	}
	w.lang.ia(Wb, Sb, "GeolocationControl");
	w.extend(Wb.prototype, {
		location: function() {
			this.$d.push({
				method: "location",
				arguments: arguments
			})
		},
		getAddressComponent: da(p)
	});

	function Xb(a) {
		Sb.call(this);
		a = a || {};
		this.k = {
			gh: q,
			anchor: a.anchor,
			pa: a.offset
		};
		this.Rb = [];
		this.defaultAnchor = Vb;
		this.defaultOffset = new L(5, 2);
		this.nc(a.anchor);
		this.bJ = q;
		this.ff()
	}
	w.lang.ia(Xb, Sb, "CopyrightControl");
	w.object.extend(Xb.prototype, {
		initialize: function(a) {
			this.C = a;
			return this.A
		},
		Kv: function(a) {
			if (a && Ua(a.id) && !isNaN(a.id)) {
				var b = {
						bounds: p,
						content: ""
					},
					c;
				for (c in a) b[c] = a[c];
				if (a = this.Vl(a.id))
					for (var d in b) a[d] = b[d];
				else this.Rb.push(b)
			}
		},
		Vl: function(a) {
			for (var b = 0, c = this.Rb.length; b < c; b++)
				if (this.Rb[b].id == a) return this.Rb[b]
		},
		ZC: t("Rb"),
		rE: function(a) {
			for (var b = 0, c = this.Rb.length; b < c; b++) this.Rb[b].id == a && (r = this.Rb.splice(b, 1), b--, c = this.Rb.length)
		},
		ff: function() {
			var a = this;
			J.load("copyrightctrl", function() {
				a.wg()
			})
		}
	});

	function kb(a) {
		Sb.call(this);
		a = a || {};
		this.k = {
			gh: q,
			size: a.size || new L(150, 150),
			padding: 5,
			Ka: a.isOpen === o ? o : q,
			$Z: 4,
			pa: a.offset,
			anchor: a.anchor
		};
		this.defaultAnchor = 3;
		this.defaultOffset = new L(0, 0);
		this.Yp = this.Zp = 13;
		this.nc(a.anchor);
		this.vd(this.k.size);
		this.ff()
	}
	w.lang.ia(kb, Sb, "OverviewMapControl");
	w.extend(kb.prototype, {
		initialize: function(a) {
			this.C = a;
			return this.A
		},
		nc: function(a) {
			Sb.prototype.nc.call(this, a)
		},
		be: function() {
			this.be.Ln = o;
			this.k.Ka = !this.k.Ka;
			this.A || (this.be.Ln = q)
		},
		vd: function(a) {
			a instanceof L || (a = new L(150, 150));
			a.width = 0 < a.width ? a.width : 150;
			a.height = 0 < a.height ? a.height : 150;
			this.k.size = a
		},
		Mb: function() {
			return this.k.size
		},
		Ka: function() {
			return this.k.Ka
		},
		ff: function() {
			var a = this;
			J.load("control", function() {
				a.wg()
			})
		}
	});

	function ib(a) {
		Sb.call(this);
		a = a || {};
		this.k = {
			gh: q,
			color: "black",
			Rc: "metric",
			pa: a.offset
		};
		this.defaultAnchor = Vb;
		this.defaultOffset = new L(81, 18);
		this.nc(a.anchor);
		this.Lh = {
			metric: {
				name: "metric",
				qJ: 1,
				XK: 1E3,
				zN: "\u7c73",
				AN: "\u516c\u91cc"
			},
			us: {
				name: "us",
				qJ: 3.2808,
				XK: 5280,
				zN: "\u82f1\u5c3a",
				AN: "\u82f1\u91cc"
			}
		};
		this.Lh[this.k.Rc] || (this.k.Rc = "metric");
		this.WH = p;
		this.wH = {};
		this.ff()
	}
	w.lang.ia(ib, Sb, "ScaleControl");
	w.object.extend(ib.prototype, {
		initialize: function(a) {
			this.C = a;
			return this.A
		},
		qk: function(a) {
			this.k.color = a + ""
		},
		L0: function() {
			return this.k.color
		},
		LE: function(a) {
			this.k.Rc = this.Lh[a] && this.Lh[a].name || this.k.Rc
		},
		yW: function() {
			return this.k.Rc
		},
		ff: function() {
			var a = this;
			J.load("control", function() {
				a.wg()
			})
		}
	});
	var Yb = 0;

	function lb(a) {
		Sb.call(this);
		a = a || {};
		this.defaultAnchor = Ub;
		this.defaultOffset = new L(10, 10);
		this.k = {
			gh: q,
			Zg: [Ma, Wa, Qa, Oa],
			LU: ["B_DIMENSIONAL_MAP", "B_SATELLITE_MAP", "B_NORMAL_MAP"],
			type: a.type || Yb,
			pa: a.offset || this.defaultOffset,
			kV: o
		};
		this.nc(a.anchor);
		"[object Array]" == Object.prototype.toString.call(a.mapTypes) && (this.k.Zg = a.mapTypes.slice(0));
		this.ff()
	}
	w.lang.ia(lb, Sb, "MapTypeControl");
	w.object.extend(lb.prototype, {
		initialize: function(a) {
			this.C = a;
			return this.A
		},
		by: function(a) {
			this.C.Bn = a
		},
		ff: function() {
			var a = this;
			J.load("control", function() {
				a.wg()
			}, o)
		}
	});

	function Zb(a) {
		Sb.call(this);
		a = a || {};
		this.k = {
			gh: q,
			pa: a.offset,
			anchor: a.anchor
		};
		this.Ei = q;
		this.sv = p;
		this.FH = new $b({
			Af: "api"
		});
		this.GH = new ac(p, {
			Af: "api"
		});
		this.defaultAnchor = Ub;
		this.defaultOffset = new L(10, 10);
		this.nc(a.anchor);
		this.ff();
		Pa(wa)
	}
	w.lang.ia(Zb, Sb, "PanoramaControl");
	w.extend(Zb.prototype, {
		initialize: function(a) {
			this.C = a;
			return this.A
		},
		ff: function() {
			var a = this;
			J.load("control", function() {
				a.wg()
			})
		}
	});

	function bc(a) {
		w.lang.qa.call(this);
		this.k = {
			Ja: p,
			cursor: "default"
		};
		this.k = w.extend(this.k, a);
		this.yb = "contextmenu";
		this.C = p;
		this.na = [];
		this.qf = [];
		this.ne = [];
		this.lw = this.Ir = p;
		this.Bh = q;
		var b = this;
		J.load("menu", function() {
			b.rb()
		})
	}
	w.lang.ia(bc, w.lang.qa, "ContextMenu");
	w.object.extend(bc.prototype, {
		fa: function(a, b) {
			this.C = a;
			this.bl = b || p
		},
		remove: function() {
			this.C = this.bl = p
		},
		Mv: function(a) {
			if (a && !("menuitem" != a.yb || "" == a.Hg || 0 >= a.Ni)) {
				for (var b = 0, c = this.na.length; b < c; b++)
					if (this.na[b] === a) return;
				this.na.push(a);
				this.qf.push(a)
			}
		},
		removeItem: function(a) {
			if (a && "menuitem" == a.yb) {
				for (var b = 0, c = this.na.length; b < c; b++) this.na[b] === a && (this.na[b].remove(), this.na.splice(b, 1), c--);
				b = 0;
				for (c = this.qf.length; b < c; b++) this.qf[b] === a && (this.qf[b].remove(), this.qf.splice(b, 1), c--)
			}
		},
		kB: function() {
			this.na.push({
				yb: "divider",
				xj: this.ne.length
			});
			this.ne.push({
				B: p
			})
		},
		tE: function(a) {
			if (this.ne[a]) {
				for (var b = 0, c = this.na.length; b < c; b++) this.na[b] && ("divider" == this.na[b].yb && this.na[b].xj == a) && (this.na.splice(b, 1), c--), this.na[b] && ("divider" == this.na[b].yb && this.na[b].xj > a) && this.na[b].xj--;
				this.ne.splice(a, 1)
			}
		},
		rd: t("A"),
		show: function() {
			this.Bh != o && (this.Bh = o)
		},
		J: function() {
			this.Bh != q && (this.Bh = q)
		},
		zY: function(a) {
			a && (this.k.cursor = a)
		},
		getItem: function(a) {
			return this.qf[a]
		}
	});
	var cc = F.ea + "menu_zoom_in.png",
		dc = F.ea + "menu_zoom_out.png";

	function ec(a, b, c) {
		if (a && Va(b)) {
			w.lang.qa.call(this);
			this.k = {
				width: 100,
				id: "",
				hm: ""
			};
			c = c || {};
			this.k.width = 1 * c.width ? c.width : 100;
			this.k.id = c.id ? c.id : "";
			this.k.hm = c.iconUrl ? c.iconUrl : "";
			this.Hg = a + "";
			this.Ry = b;
			this.C = p;
			this.yb = "menuitem";
			this.pr = this.Ku = this.A = this.rh = p;
			this.wh = o;
			var d = this;
			J.load("menu", function() {
				d.rb()
			})
		}
	}
	w.lang.ia(ec, w.lang.qa, "MenuItem");
	w.object.extend(ec.prototype, {
		fa: function(a, b) {
			this.C = a;
			this.rh = b
		},
		remove: function() {
			this.C = this.rh = p
		},
		lt: function(a) {
			a && (this.Hg = a + "")
		},
		Hb: function(a) {
			a && (this.k.hm = a)
		},
		rd: t("A"),
		enable: function() {
			this.wh = o
		},
		disable: function() {
			this.wh = q
		}
	});

	function db(a, b) {
		a && !b && (b = a);
		this.re = this.qe = this.we = this.ve = this.ql = this.$k = p;
		a && (this.ql = new H(a.lng, a.lat), this.$k = new H(b.lng, b.lat), this.we = a.lng, this.ve = a.lat, this.re = b.lng, this.qe = b.lat)
	}
	w.object.extend(db.prototype, {
		kj: function() {
			return !this.ql || !this.$k
		},
		$a: function(a) {
			return !(a instanceof db) || this.kj() ? q : this.De().$a(a.De()) && this.Bf().$a(a.Bf())
		},
		De: t("ql"),
		Bf: t("$k"),
		uU: function(a) {
			return !(a instanceof db) || this.kj() || a.kj() ? q : a.we > this.we && a.re < this.re && a.ve > this.ve && a.qe < this.qe
		},
		Aa: function() {
			return this.kj() ? p : new H((this.we + this.re) / 2, (this.ve + this.qe) / 2)
		},
		Es: function(a) {
			if (!(a instanceof db) || Math.max(a.we, a.re) < Math.min(this.we, this.re) || Math.min(a.we, a.re) > Math.max(this.we, this.re) || Math.max(a.ve, a.qe) < Math.min(this.ve, this.qe) || Math.min(a.ve, a.qe) > Math.max(this.ve, this.qe)) return p;
			var b = Math.max(this.we, a.we),
				c = Math.min(this.re, a.re),
				d = Math.max(this.ve, a.ve),
				a = Math.min(this.qe, a.qe);
			return new db(new H(b, d), new H(c, a))
		},
		Dr: function(a) {
			return !(a instanceof H) || this.kj() ? q : a.lng >= this.we && a.lng <= this.re && a.lat >= this.ve && a.lat <= this.qe
		},
		extend: function(a) {
			if (a instanceof H) {
				var b = a.lng,
					a = a.lat;
				this.ql || (this.ql = new H(0, 0));
				this.$k || (this.$k = new H(0, 0));
				if (!this.we || this.we > b) this.ql.lng = this.we = b;
				if (!this.re || this.re < b) this.$k.lng = this.re = b;
				if (!this.ve || this.ve > a) this.ql.lat = this.ve = a;
				if (!this.qe || this.qe < a) this.$k.lat = this.qe = a
			}
		},
		WE: function() {
			return this.kj() ? new H(0, 0) : new H(Math.abs(this.re - this.we), Math.abs(this.qe - this.ve))
		}
	});

	function H(a, b) {
		isNaN(a) && (a = Jb(a), a = isNaN(a) ? 0 : a);
		Xa(a) && (a = parseFloat(a));
		isNaN(b) && (b = Jb(b), b = isNaN(b) ? 0 : b);
		Xa(b) && (b = parseFloat(b));
		this.lng = a;
		this.lat = b
	}
	H.cL = function(a) {
		return a && 180 >= a.lng && -180 <= a.lng && 74 >= a.lat && -74 <= a.lat
	};
	H.prototype.$a = function(a) {
		return a && this.lat == a.lat && this.lng == a.lng
	};

	function fc() {}
	fc.prototype.Xg = function() {
		aa("lngLatToPoint\u65b9\u6cd5\u672a\u5b9e\u73b0")
	};
	fc.prototype.hi = function() {
		aa("pointToLngLat\u65b9\u6cd5\u672a\u5b9e\u73b0")
	};

	function gc() {};
	var cb = {
		sJ: function(a, b, c) {
			J.load("coordtransutils", function() {
				cb.QT(a, b, c)
			}, o)
		},
		rJ: function(a, b, c) {
			J.load("coordtransutils", function() {
				cb.PT(a, b, c)
			}, o)
		}
	};

	function hc() {
		this.Da = [];
		var a = this;
		J.load("convertor", function() {
			a.PO()
		})
	}
	w.ia(hc, w.lang.qa, "Convertor");
	w.extend(hc.prototype, {
		translate: function(a, b, c, d) {
			this.Da.push({
				method: "translate",
				arguments: [a, b, c, d]
			})
		}
	});
	R(hc.prototype, {
		translate: hc.prototype.translate
	});

	function Q() {}
	Q.prototype = new fc;
	w.extend(Q, {
		fO: 6370996.81,
		DF: [1.289059486E7, 8362377.87, 5591021, 3481989.83, 1678043.12, 0],
		Zt: [75, 60, 45, 30, 15, 0],
		lO: [
			[1.410526172116255E-8, 8.98305509648872E-6, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653, 1.73379812E7],
			[-7.435856389565537E-9, 8.983055097726239E-6, -0.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 1.026014486E7],
			[-3.030883460898826E-8, 8.98305509983578E-6, 0.30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 6856817.37],
			[-1.981981304930552E-8, 8.983055099779535E-6, 0.03278182852591, 40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4482777.06],
			[3.09191371068437E-9, 8.983055096812155E-6, 6.995724062E-5, 23.10934304144901, -2.3663490511E-4, -0.6321817810242, -0.00663494467273, 0.03430082397953, -0.00466043876332, 2555164.4],
			[2.890871144776878E-9, 8.983055095805407E-6, -3.068298E-8, 7.47137025468032, -3.53937994E-6, -0.02145144861037, -1.234426596E-5, 1.0322952773E-4, -3.23890364E-6, 826088.5]
		],
		AF: [
			[-0.0015702102444, 111320.7020616939, 1704480524535203, -10338987376042340, 26112667856603880, -35149669176653700, 26595700718403920, -10725012454188240, 1800819912950474, 82.5],
			[8.277824516172526E-4, 111320.7020463578, 6.477955746671607E8, -4.082003173641316E9, 1.077490566351142E10, -1.517187553151559E10, 1.205306533862167E10, -5.124939663577472E9, 9.133119359512032E8, 67.5],
			[0.00337398766765, 111320.7020202162, 4481351.045890365, -2.339375119931662E7, 7.968221547186455E7, -1.159649932797253E8, 9.723671115602145E7, -4.366194633752821E7, 8477230.501135234, 52.5],
			[0.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5],
			[-3.441963504368392E-4, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5],
			[-3.218135878613132E-4, 111320.7020701615, 0.00369383431289, 823725.6402795718, 0.46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45]
		],
		Q0: function(a, b) {
			if (!a || !b) return 0;
			var c, d, a = this.sb(a);
			if (!a) return 0;
			c = this.yk(a.lng);
			d = this.yk(a.lat);
			b = this.sb(b);
			return !b ? 0 : this.Ce(c, this.yk(b.lng), d, this.yk(b.lat))
		},
		yo: function(a, b) {
			if (!a || !b) return 0;
			a.lng = this.gD(a.lng, -180, 180);
			a.lat = this.kD(a.lat, -74, 74);
			b.lng = this.gD(b.lng, -180, 180);
			b.lat = this.kD(b.lat, -74, 74);
			return this.Ce(this.yk(a.lng), this.yk(b.lng), this.yk(a.lat), this.yk(b.lat))
		},
		sb: function(a) {
			if (a === p || a === j) return new H(0, 0);
			var b, c;
			b = new H(Math.abs(a.lng), Math.abs(a.lat));
			for (var d = 0; d < this.DF.length; d++)
				if (b.lat >= this.DF[d]) {
					c = this.lO[d];
					break
				}
			a = this.tJ(a, c);
			return a = new H(a.lng.toFixed(6), a.lat.toFixed(6))
		},
		Fb: function(a) {
			if (a === p || a === j || 180 < a.lng || -180 > a.lng || 90 < a.lat || -90 > a.lat) return new H(0, 0);
			var b, c;
			a.lng = this.gD(a.lng, -180, 180);
			a.lat = this.kD(a.lat, -74, 74);
			b = new H(a.lng, a.lat);
			for (var d = 0; d < this.Zt.length; d++)
				if (b.lat >= this.Zt[d]) {
					c = this.AF[d];
					break
				}
			if (!c)
				for (d = this.Zt.length - 1; 0 <= d; d--)
					if (b.lat <= -this.Zt[d]) {
						c = this.AF[d];
						break
					}
			a = this.tJ(a, c);
			return a = new H(a.lng.toFixed(2), a.lat.toFixed(2))
		},
		tJ: function(a, b) {
			if (a && b) {
				var c = b[0] + b[1] * Math.abs(a.lng),
					d = Math.abs(a.lat) / b[9],
					d = b[2] + b[3] * d + b[4] * d * d + b[5] * d * d * d + b[6] * d * d * d * d + b[7] * d * d * d * d * d + b[8] * d * d * d * d * d * d,
					c = c * (0 > a.lng ? -1 : 1),
					d = d * (0 > a.lat ? -1 : 1);
				return new H(c, d)
			}
		},
		Ce: function(a, b, c, d) {
			return this.fO * Math.acos(Math.sin(c) * Math.sin(d) + Math.cos(c) * Math.cos(d) * Math.cos(b - a))
		},
		yk: function(a) {
			return Math.PI * a / 180
		},
		G2: function(a) {
			return 180 * a / Math.PI
		},
		kD: function(a, b, c) {
			b != p && (a = Math.max(a, b));
			c != p && (a = Math.min(a, c));
			return a
		},
		gD: function(a, b, c) {
			for (; a > c;) a -= c - b;
			for (; a < b;) a += c - b;
			return a
		}
	});
	w.extend(Q.prototype, {
		pm: function(a) {
			return Q.Fb(a)
		},
		Xg: function(a) {
			a = Q.Fb(a);
			return new P(a.lng, a.lat)
		},
		$g: function(a) {
			return Q.sb(a)
		},
		hi: function(a) {
			a = new H(a.x, a.y);
			return Q.sb(a)
		},
		Vb: function(a, b, c, d, e) {
			if (a) return a = this.pm(a, e), b = this.Bc(b), new P(Math.round((a.lng - c.lng) / b + d.width / 2), Math.round((c.lat - a.lat) / b + d.height / 2))
		},
		mb: function(a, b, c, d, e) {
			if (a) return b = this.Bc(b), this.$g(new H(c.lng + b * (a.x - d.width / 2), c.lat - b * (a.y - d.height / 2)), e)
		},
		Bc: function(a) {
			return Math.pow(2, 18 - a)
		}
	});

	function fb() {
		this.PB = "bj"
	}
	fb.prototype = new Q;
	w.extend(fb.prototype, {
		pm: function(a, b) {
			return this.xP(b, Q.Fb(a))
		},
		$g: function(a, b) {
			return Q.sb(this.yP(b, a))
		},
		lngLatToPointFor3D: function(a, b) {
			var c = this,
				d = Q.Fb(a);
			J.load("coordtrans", function() {
				var a = gc.iD(c.PB || "bj", d),
					a = new P(a.x, a.y);
				b && b(a)
			}, o)
		},
		pointToLngLatFor3D: function(a, b) {
			var c = this,
				d = new H(a.x, a.y);
			J.load("coordtrans", function() {
				var a = gc.hD(c.PB || "bj", d),
					a = new H(a.lng, a.lat),
					a = Q.sb(a);
				b && b(a)
			}, o)
		},
		xP: function(a, b) {
			if (J.Va("coordtrans").md == J.rj.Cp) {
				var c = gc.iD(a || "bj", b);
				return new H(c.x, c.y)
			}
			J.load("coordtrans", s());
			return new H(0, 0)
		},
		yP: function(a, b) {
			if (J.Va("coordtrans").md == J.rj.Cp) {
				var c = gc.hD(a || "bj", b);
				return new H(c.lng, c.lat)
			}
			J.load("coordtrans", s());
			return new H(0, 0)
		},
		Bc: function(a) {
			return Math.pow(2, 20 - a)
		}
	});

	function ic() {
		this.yb = "overlay"
	}
	w.lang.ia(ic, w.lang.qa, "Overlay");
	ic.dm = function(a) {
		a *= 1;
		return !a ? 0 : -1E5 * a << 1
	};
	w.extend(ic.prototype, {
		Ne: function(a) {
			if (!this.K && Va(this.initialize) && (this.K = this.initialize(a))) this.K.style.WebkitUserSelect = "none";
			this.draw()
		},
		initialize: function() {
			aa("initialize\u65b9\u6cd5\u672a\u5b9e\u73b0")
		},
		draw: function() {
			aa("draw\u65b9\u6cd5\u672a\u5b9e\u73b0")
		},
		remove: function() {
			this.K && this.K.parentNode && this.K.parentNode.removeChild(this.K);
			this.K = p;
			this.dispatchEvent(new M("onremove"))
		},
		J: function() {
			this.K && w.B.J(this.K)
		},
		show: function() {
			this.K && w.B.show(this.K)
		},
		Wg: function() {
			return !this.K || "none" == this.K.style.display || "hidden" == this.K.style.visibility ? q : o
		}
	});
	z.Ge(function(a) {
		function b(a, b) {
			var c = K("div"),
				g = c.style;
			g.position = "absolute";
			g.top = g.left = g.width = g.height = "0";
			g.zIndex = b;
			a.appendChild(c);
			return c
		}
		var c = a.H;
		c.ad = a.ad = b(a.platform, 200);
		a.Zd.MC = b(c.ad, 800);
		a.Zd.WD = b(c.ad, 700);
		a.Zd.cK = b(c.ad, 600);
		a.Zd.PD = b(c.ad, 500);
		a.Zd.FL = b(c.ad, 400);
		a.Zd.GL = b(c.ad, 300);
		a.Zd.RZ = b(c.ad, 201);
		a.Zd.Ns = b(c.ad, 200)
	});

	function eb() {
		w.lang.qa.call(this);
		ic.call(this);
		this.map = p;
		this.Ea = o;
		this.kb = p;
		this.oG = 0
	}
	w.lang.ia(eb, ic, "OverlayInternal");
	w.extend(eb.prototype, {
		initialize: function(a) {
			this.map = a;
			w.lang.qa.call(this, this.Q);
			return p
		},
		Hw: t("map"),
		draw: s(),
		remove: function() {
			this.map = p;
			w.lang.nw(this.Q);
			ic.prototype.remove.call(this)
		},
		J: function() {
			this.Ea != q && (this.Ea = q)
		},
		show: function() {
			this.Ea != o && (this.Ea = o)
		},
		Wg: function() {
			return !this.K ? q : !!this.Ea
		},
		Fa: t("K"),
		LM: function(a) {
			var a = a || {},
				b;
			for (b in a) this.z[b] = a[b]
		},
		mt: ba("zIndex"),
		Zi: function() {
			this.z.Zi = o
		},
		UU: function() {
			this.z.Zi = q
		},
		Wn: ba("Vf"),
		ap: function() {
			this.Vf = p
		}
	});

	function jc() {
		this.map = p;
		this.ka = {};
		this.me = []
	}
	z.Ge(function(a) {
		var b = new jc;
		b.map = a;
		a.ka = b.ka;
		a.me = b.me;
		a.addEventListener("load", function(a) {
			b.draw(a)
		});
		a.addEventListener("moveend", function(a) {
			b.draw(a)
		});
		w.S.ba && 8 > w.S.ba || "BackCompat" == document.compatMode ? a.addEventListener("zoomend", function(a) {
			setTimeout(function() {
				b.draw(a)
			}, 20)
		}) : a.addEventListener("zoomend", function(a) {
			b.draw(a)
		});
		a.addEventListener("maptypechange", function(a) {
			b.draw(a)
		});
		a.addEventListener("addoverlay", function(a) {
			a = a.target;
			if (a instanceof eb) b.ka[a.Q] || (b.ka[a.Q] = a);
			else {
				for (var d = q, e = 0, f = b.me.length; e < f; e++)
					if (b.me[e] === a) {
						d = o;
						break
					}
				d || b.me.push(a)
			}
		});
		a.addEventListener("removeoverlay", function(a) {
			a = a.target;
			if (a instanceof eb) delete b.ka[a.Q];
			else
				for (var d = 0, e = b.me.length; d < e; d++)
					if (b.me[d] === a) {
						b.me.splice(d, 1);
						break
					}
		});
		a.addEventListener("clearoverlays", function() {
			this.Lc();
			for (var a in b.ka) b.ka[a].z.Zi && (b.ka[a].remove(), delete b.ka[a]);
			a = 0;
			for (var d = b.me.length; a < d; a++) b.me[a].Zi != q && (b.me[a].remove(), b.me[a] = p, b.me.splice(a, 1), a--, d--)
		});
		a.addEventListener("infowindowopen", function() {
			var a = this.kb;
			a && (w.B.J(a.lc), w.B.J(a.Qb))
		});
		a.addEventListener("movestart", function() {
			this.Tg() && this.Tg().bI()
		});
		a.addEventListener("moveend", function() {
			this.Tg() && this.Tg().SH()
		})
	});
	jc.prototype.draw = function(a) {
		if (z.Gp) {
			var b = z.Gp.js(this.map);
			"canvas" == b.yb && b.canvas && b.sP(b.canvas.getContext("2d"))
		}
		for (var c in this.ka) this.ka[c].draw(a);
		w.Yb.qb(this.me, function(a) {
			a.draw()
		});
		this.map.H.ab && this.map.H.ab.ha();
		z.Gp && b.IE()
	};

	function kc(a) {
		eb.call(this);
		a = a || {};
		this.z = {
			strokeColor: a.strokeColor || "#3a6bdb",
			$b: a.strokeWeight || 5,
			cd: a.strokeOpacity || 0.65,
			strokeStyle: a.strokeStyle || "solid",
			Zi: a.enableMassClear === q ? q : o,
			dk: p,
			Zl: p,
			zf: a.enableEditing === o ? o : q,
			OL: 5,
			JZ: q,
			Te: a.enableClicking === q ? q : o,
			Zh: a.icons && 0 < a.icons.length ? a.icons : p
		};
		0 >= this.z.$b && (this.z.$b = 5);
		if (0 > this.z.cd || 1 < this.z.cd) this.z.cd = 0.65;
		if (0 > this.z.eg || 1 < this.z.eg) this.z.eg = 0.65;
		"solid" != this.z.strokeStyle && "dashed" != this.z.strokeStyle && (this.z.strokeStyle = "solid");
		this.K = p;
		this.lu = new db(0, 0);
		this.Qe = [];
		this.ac = [];
		this.Ga = {}
	}
	w.lang.ia(kc, eb, "Graph");
	kc.Dw = function(a) {
		var b = [];
		if (!a) return b;
		Xa(a) && w.Yb.qb(a.split(";"), function(a) {
			a = a.split(",");
			b.push(new H(a[0], a[1]))
		});
		"[object Array]" == Object.prototype.toString.apply(a) && 0 < a.length && (b = a);
		return b
	};
	kc.fE = [0.09, 0.0050, 1.0E-4, 1.0E-5];
	w.extend(kc.prototype, {
		initialize: function(a) {
			this.map = a;
			return p
		},
		draw: s(),
		jr: function(a) {
			this.Qe.length = 0;
			this.W = kc.Dw(a).slice(0);
			this.oh()
		},
		Vd: function(a) {
			this.jr(a)
		},
		oh: function() {
			if (this.W) {
				var a = this;
				a.lu = new db;
				w.Yb.qb(this.W, function(b) {
					a.lu.extend(b)
				})
			}
		},
		ee: t("W"),
		Km: function(a, b) {
			b && this.W[a] && (this.Qe.length = 0, this.W[a] = new H(b.lng, b.lat), this.oh())
		},
		setStrokeColor: function(a) {
			this.z.strokeColor = a
		},
		oW: function() {
			return this.z.strokeColor
		},
		rp: function(a) {
			0 < a && (this.z.$b = a)
		},
		DK: function() {
			return this.z.$b
		},
		pp: function(a) {
			a == j || (1 < a || 0 > a) || (this.z.cd = a)
		},
		pW: function() {
			return this.z.cd
		},
		ft: function(a) {
			1 < a || 0 > a || (this.z.eg = a)
		},
		MV: function() {
			return this.z.eg
		},
		qp: function(a) {
			"solid" != a && "dashed" != a || (this.z.strokeStyle = a)
		},
		CK: function() {
			return this.z.strokeStyle
		},
		setFillColor: function(a) {
			this.z.fillColor = a || ""
		},
		LV: function() {
			return this.z.fillColor
		},
		Nd: t("lu"),
		remove: function() {
			this.map && this.map.removeEventListener("onmousemove", this.Hu);
			eb.prototype.remove.call(this);
			this.Qe.length = 0
		},
		zf: function() {
			if (!(2 > this.W.length)) {
				this.z.zf = o;
				var a = this;
				J.load("poly", function() {
					a.wl()
				}, o)
			}
		},
		TU: function() {
			this.z.zf = q;
			var a = this;
			J.load("poly", function() {
				a.Tj()
			}, o)
		}
	});

	function lc(a) {
		eb.call(this);
		this.K = this.map = p;
		this.z = {
			width: 0,
			height: 0,
			pa: new L(0, 0),
			opacity: 1,
			background: "transparent",
			jx: 1,
			sL: "#000",
			lX: "solid",
			point: p
		};
		this.LM(a);
		this.point = this.z.point
	}
	w.lang.ia(lc, eb, "Division");
	w.extend(lc.prototype, {
		Gk: function() {
			var a = this.z,
				b = this.content,
				c = ['<div class="BMap_Division" style="position:absolute;'];
			c.push("width:" + a.width + "px;display:block;");
			c.push("overflow:hidden;");
			"none" != a.borderColor && c.push("border:" + a.jx + "px " + a.lX + " " + a.sL + ";");
			c.push("opacity:" + a.opacity + "; filter:(opacity=" + 100 * a.opacity + ")");
			c.push("background:" + a.background + ";");
			c.push('z-index:60;">');
			c.push(b);
			c.push("</div>");
			this.K = Ab(this.map.Df().WD, c.join(""))
		},
		initialize: function(a) {
			this.map = a;
			this.Gk();
			this.K && w.F(this.K, G() ? "touchstart" : "mousedown", function(a) {
				oa(a)
			});
			return this.K
		},
		draw: function() {
			var a = this.map.Fe(this.z.point);
			this.z.pa = new L(-Math.round(this.z.width / 2) - Math.round(this.z.jx), -Math.round(this.z.height / 2) - Math.round(this.z.jx));
			this.K.style.left = a.x + this.z.pa.width + "px";
			this.K.style.top = a.y + this.z.pa.height + "px"
		},
		V: function() {
			return this.z.point
		},
		B_: function() {
			return this.map.Vb(this.V())
		},
		ha: function(a) {
			this.z.point = a;
			this.draw()
		},
		AY: function(a, b) {
			this.z.width = Math.round(a);
			this.z.height = Math.round(b);
			this.K && (this.K.style.width = this.z.width + "px", this.K.style.height = this.z.height + "px", this.draw())
		}
	});

	function mc(a, b, c) {
		a && b && (this.imageUrl = a, this.size = b, a = new L(Math.floor(b.width / 2), Math.floor(b.height / 2)), c = c || {}, a = c.anchor || a, b = c.imageOffset || new L(0, 0), this.imageSize = c.imageSize, this.anchor = a, this.imageOffset = b, this.infoWindowAnchor = c.infoWindowAnchor || this.anchor, this.printImageUrl = c.printImageUrl || "")
	}
	w.extend(mc.prototype, {
		MM: function(a) {
			a && (this.imageUrl = a)
		},
		QY: function(a) {
			a && (this.printImageUrl = a)
		},
		vd: function(a) {
			a && (this.size = new L(a.width, a.height))
		},
		nc: function(a) {
			a && (this.anchor = new L(a.width, a.height))
		},
		gt: function(a) {
			a && (this.imageOffset = new L(a.width, a.height))
		},
		HY: function(a) {
			a && (this.infoWindowAnchor = new L(a.width, a.height))
		},
		EY: function(a) {
			a && (this.imageSize = new L(a.width, a.height))
		},
		toString: da("Icon")
	});

	function nc(a, b) {
		if (a) {
			b = b || {};
			this.style = {
				anchor: b.anchor || new L(0, 0),
				fillColor: b.fillColor || "#000",
				eg: b.fillOpacity || 0,
				scale: b.scale || 1,
				rotation: b.rotation || 0,
				strokeColor: b.strokeColor || "#000",
				cd: b.strokeOpacity || 1,
				$b: b.strokeWeight
			};
			this.yb = "number" === typeof a ? a : "UserDefined";
			this.ui = this.style.anchor;
			this.Nq = new L(0, 0);
			this.anchor = p;
			this.EA = a;
			var c = this;
			J.load("symbol", function() {
				c.hn()
			}, o)
		}
	}
	w.extend(nc.prototype, {
		setPath: ba("EA"),
		setAnchor: function(a) {
			this.ui = this.style.anchor = a
		},
		setRotation: function(a) {
			this.style.rotation = a
		},
		setScale: function(a) {
			this.style.scale = a
		},
		setStrokeWeight: function(a) {
			this.style.$b = a
		},
		setStrokeColor: function(a) {
			a = w.Cr.KB(a, this.style.cd);
			this.style.strokeColor = a
		},
		setStrokeOpacity: function(a) {
			this.style.cd = a
		},
		setFillOpacity: function(a) {
			this.style.eg = a
		},
		setFillColor: function(a) {
			this.style.fillColor = a
		}
	});

	function oc(a, b, c, d) {
		a && (this.$u = {}, this.bK = d ? !!d : q, this.Jc = [], this.iZ = a instanceof nc ? a : p, this.LH = b === j ? o : !!(b.indexOf("%") + 1), this.Ij = isNaN(parseFloat(b)) ? 1 : this.LH ? parseFloat(b) / 100 : parseFloat(b), this.MH = !!(c.indexOf("%") + 1), this.repeat = c != j ? this.MH ? parseFloat(c) / 100 : parseFloat(c) : 0)
	};

	function pc(a, b) {
		w.lang.qa.call(this);
		this.content = a;
		this.map = p;
		b = b || {};
		this.z = {
			width: b.width || 0,
			height: b.height || 0,
			maxWidth: b.maxWidth || 730,
			pa: b.offset || new L(0, 0),
			title: b.title || "",
			XD: b.maxContent || "",
			Og: b.enableMaximize || q,
			as: b.enableAutoPan === q ? q : o,
			yC: b.enableCloseOnClick === q ? q : o,
			margin: b.margin || [10, 10, 40, 10],
			FB: b.collisions || [
				[10, 10],
				[10, 10],
				[10, 10],
				[10, 10]
			],
			MW: q,
			GX: b.onClosing || da(o),
			TJ: q,
			DC: b.enableParano === o ? o : q,
			message: b.message,
			FC: b.enableSearchTool === o ? o : q,
			Uw: b.headerContent || "",
			zC: b.enableContentScroll || q
		};
		if (0 != this.z.width && (220 > this.z.width && (this.z.width = 220), 730 < this.z.width)) this.z.width = 730;
		if (0 != this.z.height && (60 > this.z.height && (this.z.height = 60), 650 < this.z.height)) this.z.height = 650;
		if (0 != this.z.maxWidth && (220 > this.z.maxWidth && (this.z.maxWidth = 220), 730 < this.z.maxWidth)) this.z.maxWidth = 730;
		this.Pd = q;
		this.pi = F.ea;
		this.Qa = p;
		var c = this;
		J.load("infowindow", function() {
			c.rb()
		})
	}
	w.lang.ia(pc, w.lang.qa, "InfoWindow");
	w.extend(pc.prototype, {
		setWidth: function(a) {
			!a && 0 != a || (isNaN(a) || 0 > a) || (0 != a && (220 > a && (a = 220), 730 < a && (a = 730)), this.z.width = a)
		},
		setHeight: function(a) {
			!a && 0 != a || (isNaN(a) || 0 > a) || (0 != a && (60 > a && (a = 60), 650 < a && (a = 650)), this.z.height = a)
		},
		PM: function(a) {
			!a && 0 != a || (isNaN(a) || 0 > a) || (0 != a && (220 > a && (a = 220), 730 < a && (a = 730)), this.z.maxWidth = a)
		},
		qc: function(a) {
			this.z.title = a
		},
		getTitle: function() {
			return this.z.title
		},
		Qc: ba("content"),
		bk: t("content"),
		it: function(a) {
			this.z.XD = a + ""
		},
		Ud: s(),
		as: function() {
			this.z.as = o
		},
		disableAutoPan: function() {
			this.z.as = q
		},
		enableCloseOnClick: function() {
			this.z.yC = o
		},
		disableCloseOnClick: function() {
			this.z.yC = q
		},
		Og: function() {
			this.z.Og = o
		},
		rw: function() {
			this.z.Og = q
		},
		show: function() {
			this.Ea = o
		},
		J: function() {
			this.Ea = q
		},
		close: function() {
			this.J()
		},
		nx: function() {
			this.Pd = o
		},
		restore: function() {
			this.Pd = q
		},
		Wg: function() {
			return this.Ka()
		},
		Ka: da(q),
		V: function() {
			if (this.Qa && this.Qa.V) return this.Qa.V()
		},
		Cf: function() {
			return this.z.pa
		}
	});
	La.prototype.zb = function(a, b) {
		if (a instanceof pc && b instanceof H) {
			var c = this.H;
			c.rm ? c.rm.ha(b) : (c.rm = new S(b, {
				icon: new mc(F.ea + "blank.gif", {
					width: 1,
					height: 1
				}),
				offset: new L(0, 0),
				clickable: q
			}), c.rm.vQ = 1);
			this.ya(c.rm);
			c.rm.zb(a)
		}
	};
	La.prototype.Lc = function() {
		var a = this.H.ab || this.H.Rk;
		a && a.Qa && a.Qa.Lc()
	};
	eb.prototype.zb = function(a) {
		this.map && (this.map.Lc(), a.Ea = o, this.map.H.Rk = a, a.Qa = this, w.lang.qa.call(a, a.Q))
	};
	eb.prototype.Lc = function() {
		this.map && this.map.H.Rk && (this.map.H.Rk.Ea = q, w.lang.nw(this.map.H.Rk.Q), this.map.H.Rk = p)
	};

	function qc(a, b) {
		eb.call(this);
		this.content = a;
		this.K = this.map = p;
		b = b || {};
		this.z = {
			width: 0,
			pa: b.offset || new L(0, 0),
			up: {
				backgroundColor: "#fff",
				border: "1px solid #f00",
				padding: "1px",
				whiteSpace: "nowrap",
				font: "12px " + F.fontFamily,
				zIndex: "80",
				MozUserSelect: "none"
			},
			position: b.position || p,
			Zi: b.enableMassClear === q ? q : o,
			Te: o
		};
		0 > this.z.width && (this.z.width = 0);
		Gb(b.enableClicking) && (this.z.Te = b.enableClicking);
		this.point = this.z.position;
		var c = this;
		J.load("marker", function() {
			c.rb()
		})
	}
	w.lang.ia(qc, eb, "Label");
	w.extend(qc.prototype, {
		V: function() {
			return this.Pu ? this.Pu.V() : this.point
		},
		ha: function(a) {
			a instanceof H && !this.Iw() && (this.point = this.z.position = new H(a.lng, a.lat))
		},
		Qc: ba("content"),
		HE: function(a) {
			0 <= a && 1 >= a && (this.z.opacity = a)
		},
		He: function(a) {
			a instanceof L && (this.z.pa = new L(a.width, a.height))
		},
		Cf: function() {
			return this.z.pa
		},
		xd: function(a) {
			a = a || {};
			this.z.up = w.extend(this.z.up, a)
		},
		ji: function(a) {
			return this.xd(a)
		},
		qc: function(a) {
			this.z.title = a || ""
		},
		getTitle: function() {
			return this.z.title
		},
		OM: function(a) {
			this.point = (this.Pu = a) ? this.z.position = a.V() : this.z.position = p
		},
		Iw: function() {
			return this.Pu || p
		},
		bk: t("content")
	});

	function rc(a, b) {
		if (0 !== arguments.length) {
			eb.apply(this, arguments);
			b = b || {};
			this.z = {
				Ua: a,
				opacity: b.opacity || 1,
				jm: b.jm || "",
				Rr: b.displayOnMinLevel || 1,
				Qr: b.displayOnMaxLevel || 19,
				cZ: b.stretch || q
			};
			var c = this;
			J.load("groundoverlay", function() {
				c.rb()
			})
		}
	}
	w.lang.ia(rc, eb, "GroundOverlay");
	w.extend(rc.prototype, {
		setBounds: function(a) {
			this.z.Ua = a
		},
		getBounds: function() {
			return this.z.Ua
		},
		setOpacity: function(a) {
			this.z.opacity = a
		},
		getOpacity: function() {
			return this.z.opacity
		},
		setImageURL: function(a) {
			this.z.jm = a
		},
		getImageURL: function() {
			return this.z.jm
		},
		setDisplayOnMinLevel: function(a) {
			this.z.Rr = a
		},
		getDisplayOnMinLevel: function() {
			return this.z.Rr
		},
		setDisplayOnMaxLevel: function(a) {
			this.z.Qr = a
		},
		getDisplayOnMaxLevel: function() {
			return this.z.Qr
		}
	});
	var sc = 3,
		tc = 4;

	function uc() {
		var a = document.createElement("canvas");
		return !(!a.getContext || !a.getContext("2d"))
	}

	function vc(a, b) {
		var c = this;
		uc() && (a === j && aa(Error("\u6ca1\u6709\u4f20\u5165points\u6570\u636e")), "[object Array]" !== Object.prototype.toString.call(a) && aa(Error("points\u6570\u636e\u4e0d\u662f\u6570\u7ec4")), b = b || {}, eb.apply(c, arguments), c.R = {
			W: a
		}, c.z = {
			shape: b.shape || sc,
			size: b.size || tc,
			color: b.color || "#fa937e",
			Zi: o
		}, this.BA = [], this.$d = [], J.load("pointcollection", function() {
			for (var a = 0, b; b = c.BA[a]; a++) c[b.method].apply(c, b.arguments);
			for (a = 0; b = c.$d[a]; a++) c[b.method].apply(c, b.arguments)
		}))
	}
	w.lang.ia(vc, eb, "PointCollection");
	w.extend(vc.prototype, {
		initialize: function(a) {
			this.BA && this.BA.push({
				method: "initialize",
				arguments: arguments
			})
		},
		setPoints: function(a) {
			this.$d && this.$d.push({
				method: "setPoints",
				arguments: arguments
			})
		},
		setStyles: function(a) {
			this.$d && this.$d.push({
				method: "setStyles",
				arguments: arguments
			})
		},
		clear: function() {
			this.$d && this.$d.push({
				method: "clear",
				arguments: arguments
			})
		},
		remove: function() {
			this.$d && this.$d.push({
				method: "remove",
				arguments: arguments
			})
		}
	});
	var wc = new mc(F.ea + "marker_red_sprite.png", new L(19, 25), {
			anchor: new L(10, 25),
			infoWindowAnchor: new L(10, 0)
		}),
		xc = new mc(F.ea + "marker_red_sprite.png", new L(20, 11), {
			anchor: new L(6, 11),
			imageOffset: new L(-19, -13)
		});

	function S(a, b) {
		eb.call(this);
		b = b || {};
		this.point = a;
		this.Up = this.map = p;
		this.z = {
			pa: b.offset || new L(0, 0),
			hj: b.icon || wc,
			sk: xc,
			title: b.title || "",
			label: p,
			aJ: b.baseZIndex || 0,
			Te: o,
			b3: q,
			MD: q,
			Zi: b.enableMassClear === q ? q : o,
			Sb: q,
			uM: b.raiseOnDrag === o ? o : q,
			BM: q,
			od: b.draggingCursor || F.od,
			rotation: b.rotation || 0
		};
		b.icon && !b.shadow && (this.z.sk = p);
		b.enableDragging && (this.z.Sb = b.enableDragging);
		Gb(b.enableClicking) && (this.z.Te = b.enableClicking);
		var c = this;
		J.load("marker", function() {
			c.rb()
		})
	}
	S.du = ic.dm(-90) + 1E6;
	S.wF = S.du + 1E6;
	w.lang.ia(S, eb, "Marker");
	w.extend(S.prototype, {
		Hb: function(a) {
			if (a instanceof mc || a instanceof nc) this.z.hj = a
		},
		zo: function() {
			return this.z.hj
		},
		Sx: function(a) {
			a instanceof mc && (this.z.sk = a)
		},
		getShadow: function() {
			return this.z.sk
		},
		Im: function(a) {
			this.z.label = a || p
		},
		eD: function() {
			return this.z.label
		},
		Sb: function() {
			this.z.Sb = o
		},
		dC: function() {
			this.z.Sb = q
		},
		V: t("point"),
		ha: function(a) {
			a instanceof H && (this.point = new H(a.lng, a.lat))
		},
		ki: function(a, b) {
			this.z.MD = !!a;
			a && (this.SF = b || 0)
		},
		qc: function(a) {
			this.z.title = a + ""
		},
		getTitle: function() {
			return this.z.title
		},
		He: function(a) {
			a instanceof L && (this.z.pa = a)
		},
		Cf: function() {
			return this.z.pa
		},
		Hm: ba("Up"),
		op: function(a) {
			this.z.rotation = a
		},
		AK: function() {
			return this.z.rotation
		}
	});

	function yc(a, b) {
		kc.call(this, b);
		b = b || {};
		this.z.eg = b.fillOpacity ? b.fillOpacity : 0.65;
		this.z.fillColor = "" == b.fillColor ? "" : b.fillColor ? b.fillColor : "#fff";
		this.Vd(a);
		var c = this;
		J.load("poly", function() {
			c.rb()
		})
	}
	w.lang.ia(yc, kc, "Polygon");
	w.extend(yc.prototype, {
		Vd: function(a, b) {
			this.Tn = kc.Dw(a).slice(0);
			var c = kc.Dw(a).slice(0);
			1 < c.length && c.push(new H(c[0].lng, c[0].lat));
			kc.prototype.Vd.call(this, c, b)
		},
		Km: function(a, b) {
			this.Tn[a] && (this.Tn[a] = new H(b.lng, b.lat), this.W[a] = new H(b.lng, b.lat), 0 == a && !this.W[0].$a(this.W[this.W.length - 1]) && (this.W[this.W.length - 1] = new H(b.lng, b.lat)), this.oh())
		},
		ee: function() {
			var a = this.Tn;
			0 == a.length && (a = this.W);
			return a
		}
	});

	function zc(a, b) {
		kc.call(this, b);
		this.jr(a);
		var c = this;
		J.load("poly", function() {
			c.rb()
		})
	}
	w.lang.ia(zc, kc, "Polyline");

	function Ac(a, b, c) {
		this.point = a;
		this.ma = Math.abs(b);
		yc.call(this, [], c)
	}
	Ac.fE = [0.01, 1.0E-4, 1.0E-5, 4.0E-6];
	w.lang.ia(Ac, yc, "Circle");
	w.extend(Ac.prototype, {
		initialize: function(a) {
			this.map = a;
			this.W = this.Du(this.point, this.ma);
			this.oh();
			return p
		},
		Aa: t("point"),
		If: function(a) {
			a && (this.point = a)
		},
		yK: t("ma"),
		cf: function(a) {
			this.ma = Math.abs(a)
		},
		Du: function(a, b) {
			if (!a || !b || !this.map) return [];
			for (var c = [], d = b / 6378800, e = Math.PI / 180 * a.lat, f = Math.PI / 180 * a.lng, g = 0; 360 > g; g += 9) {
				var i = Math.PI / 180 * g,
					k = Math.asin(Math.sin(e) * Math.cos(d) + Math.cos(e) * Math.sin(d) * Math.cos(i)),
					i = new H(((f - Math.atan2(Math.sin(i) * Math.sin(d) * Math.cos(e), Math.cos(d) - Math.sin(e) * Math.sin(k)) + Math.PI) % (2 * Math.PI) - Math.PI) * (180 / Math.PI), k * (180 / Math.PI));
				c.push(i)
			}
			d = c[0];
			c.push(new H(d.lng, d.lat));
			return c
		}
	});
	var Bc = {};

	function Cc(a) {
		this.map = a;
		this.qm = [];
		this.Jf = [];
		this.rg = [];
		this.cU = 300;
		this.pE = 0;
		this.kg = {};
		this.Ri = {};
		this.bh = 0;
		this.FD = o;
		this.zJ = {};
		this.En = this.ln(1);
		this.Yc = this.ln(2);
		this.al = this.ln(3);
		a.platform.appendChild(this.En);
		a.platform.appendChild(this.Yc);
		a.platform.appendChild(this.al)
	}
	z.Ge(function(a) {
		var b = new Cc(a);
		b.fa();
		a.ib = b
	});
	w.extend(Cc.prototype, {
		fa: function() {
			var a = this,
				b = a.map;
			b.addEventListener("loadcode", function() {
				a.kx()
			});
			b.addEventListener("addtilelayer", function(b) {
				a.Kg(b)
			});
			b.addEventListener("removetilelayer", function(b) {
				a.jh(b)
			});
			b.addEventListener("setmaptype", function(b) {
				a.og(b)
			});
			b.addEventListener("zoomstartcode", function(b) {
				a.Ac(b)
			});
			b.addEventListener("setcustomstyles", function(b) {
				a.ht(b.target);
				a.Gf(o)
			})
		},
		kx: function() {
			var a = this;
			if (w.S.ba) try {
				document.execCommand("BackgroundImageCache", q, o)
			} catch (b) {}
			this.loaded || a.Zw();
			a.Gf();
			this.loaded || (this.loaded = o, J.load("tile", function() {
				a.QO()
			}))
		},
		Zw: function() {
			for (var a = this.map.la().Iq, b = 0; b < a.length; b++) {
				var c = new Dc;
				w.extend(c, a[b]);
				this.qm.push(c);
				c.fa(this.map, this.En)
			}
			this.ht()
		},
		ln: function(a) {
			var b = K("div");
			b.style.position = "absolute";
			b.style.overflow = "visible";
			b.style.left = b.style.top = "0";
			b.style.zIndex = a;
			return b
		},
		gf: function() {
			this.bh--;
			var a = this;
			this.FD && (this.map.dispatchEvent(new M("onfirsttileloaded")), this.FD = q);
			0 == this.bh && (this.yi && (clearTimeout(this.yi), this.yi = p), this.yi = setTimeout(function() {
				if (a.bh == 0) {
					a.map.dispatchEvent(new M("ontilesloaded"));
					a.FD = o
				}
				a.yi = p
			}, 80))
		},
		oD: function(a, b) {
			return "TILE-" + b.Q + "-" + a[0] + "-" + a[1] + "-" + a[2]
		},
		Xw: function(a) {
			var b = a.tb;
			b && zb(b) && b.parentNode.removeChild(b);
			delete this.kg[a.name];
			a.loaded || (Ec(a), a.tb = p, a.tm = p)
		},
		cm: function(a, b, c) {
			var d = this.map,
				e = d.la(),
				f = d.wa,
				g = d.kc,
				i = e.Bc(f),
				k = this.oK(),
				l = k[0],
				m = k[1],
				n = k[2],
				u = k[3],
				v = k[4],
				c = "undefined" != typeof c ? c : 0,
				e = e.k.Cb,
				k = d.Q.replace(/^TANGRAM_/, "");
			for (this.Fc ? this.Fc.length = 0 : this.Fc = []; l < n; l++)
				for (var x = m; x < u; x++) {
					var y = l,
						B = x;
					this.Fc.push([y, B]);
					y = k + "_" + b + "_" + y + "_" + B + "_" + f;
					this.zJ[y] = y
				}
			this.Fc.sort(function(a) {
				return function(b, c) {
					return 0.4 * Math.abs(b[0] - a[0]) + 0.6 * Math.abs(b[1] - a[1]) - (0.4 * Math.abs(c[0] - a[0]) + 0.6 * Math.abs(c[1] - a[1]))
				}
			}([v[0] - 1, v[1] - 1]));
			g = [Math.round(-g.lng / i), Math.round(g.lat / i)];
			l = -d.offsetY + d.height / 2;
			a.style.left = -d.offsetX + d.width / 2 + "px";
			a.style.top = l + "px";
			this.xe ? this.xe.length = 0 : this.xe = [];
			l = 0;
			for (d = a.childNodes.length; l < d; l++) x = a.childNodes[l], x.Eq = q, this.xe.push(x);
			if (l = this.wm)
				for (var A in l) delete l[A];
			else this.wm = {};
			this.ye ? this.ye.length = 0 : this.ye = [];
			l = 0;
			for (d = this.Fc.length; l < d; l++) {
				A = this.Fc[l][0];
				i = this.Fc[l][1];
				x = 0;
				for (m = this.xe.length; x < m; x++)
					if (n = this.xe[x], n.id == k + "_" + b + "_" + A + "_" + i + "_" + f) {
						n.Eq = o;
						this.wm[n.id] = n;
						break
					}
			}
			l = 0;
			for (d = this.xe.length; l < d; l++) n = this.xe[l], n.Eq || this.ye.push(n);
			this.Pm = [];
			x = (e + c) * this.map.D.devicePixelRatio;
			l = 0;
			for (d = this.Fc.length; l < d; l++) A = this.Fc[l][0], i = this.Fc[l][1], u = A * e + g[0] - c / 2, v = (-1 - i) * e + g[1] - c / 2, y = k + "_" + b + "_" + A + "_" + i + "_" + f, m = this.wm[y], n = p, m ? (n = m.style, n.left = u + "px", n.top = v + "px", m.Le || this.Pm.push([A, i, m])) : (0 < this.ye.length ? (m = this.ye.shift(), m.getContext("2d").clearRect(-c / 2, -c / 2, x, x), n = m.style) : (m = document.createElement("canvas"), n = m.style, n.position = "absolute", n.width = e + c + "px", n.height = e + c + "px", this.fx() && (n.WebkitTransform = "scale(1.001)"), m.setAttribute("width", x), m.setAttribute("height", x), a.appendChild(m)), m.id = y, n.left = u + "px", n.top = v + "px", -1 < y.indexOf("bg") && (u = "#F3F1EC", this.map.D.ao && (u = this.map.D.ao), n.background = u ? u : ""), this.Pm.push([A, i, m])), m.style.visibility = "";
			l = 0;
			for (d = this.ye.length; l < d; l++) this.ye[l].style.visibility = "hidden";
			return this.Pm
		},
		fx: function() {
			return /M040/i.test(navigator.userAgent)
		},
		oK: function() {
			var a = this.map,
				b = a.la(),
				c = b.tD(a.wa),
				d = a.kc,
				e = Math.ceil(d.lng / c),
				f = Math.ceil(d.lat / c),
				b = b.k.Cb,
				c = [e, f, (d.lng - e * c) / c * b, (d.lat - f * c) / c * b];
			return [c[0] - Math.ceil((a.width / 2 - c[2]) / b), c[1] - Math.ceil((a.height / 2 - c[3]) / b), c[0] + Math.ceil((a.width / 2 + c[2]) / b), c[1] + Math.ceil((a.height / 2 + c[3]) / b), c]
		},
		XY: function(a, b, c, d) {
			var e = this;
			e.f0 = b;
			var f = this.map.la(),
				g = e.oD(a, c),
				i = f.k.Cb,
				b = [a[0] * i + b[0], (-1 - a[1]) * i + b[1]],
				k = this.kg[g];
			k && k.tb ? (xb(k.tb, b), d && (d = new P(a[0], a[1]), f = this.map.D.ge ? this.map.D.ge.style : "normal", d = c.getTilesUrl(d, a[2], f), k.loaded = q, Fc(k, d)), k.loaded ? this.gf() : Gc(k, function() {
				e.gf()
			})) : (k = this.Ri[g]) && k.tb ? (c.Db.insertBefore(k.tb, c.Db.lastChild), this.kg[g] = k, xb(k.tb, b), d && (d = new P(a[0], a[1]), f = this.map.D.ge ? this.map.D.ge.style : "normal", d = c.getTilesUrl(d, a[2], f), k.loaded = q, Fc(k, d)), k.loaded ? this.gf() : Gc(k, function() {
				e.gf()
			})) : (k = i * Math.pow(2, f.Xl() - a[2]), new H(a[0] * k, a[1] * k), d = new P(a[0], a[1]), f = this.map.D.ge ? this.map.D.ge.style : "normal", d = c.getTilesUrl(d, a[2], f), k = new Hc(this, d, b, a, c), Gc(k, function() {
				e.gf()
			}), k.Dn(), this.kg[g] = k)
		},
		gf: function() {
			this.bh--;
			var a = this;
			0 == this.bh && (this.yi && (clearTimeout(this.yi), this.yi = p), this.yi = setTimeout(function() {
				if (a.bh == 0) {
					a.map.dispatchEvent(new M("ontilesloaded"));
					if (ua) {
						if (ra && sa && ta) {
							var b = Za(),
								c = a.map.Mb();
							setTimeout(function() {
								Pa(5030, {
									load_script_time: sa - ra,
									load_tiles_time: b - ta,
									map_width: c.width,
									map_height: c.height,
									map_size: c.width * c.height
								})
							}, 1E4);
							va.cc("img_fisrt_loaded");
							va.cc("map_width", c.width);
							va.cc("map_height", c.height);
							va.cc("map_size", c.width * c.height);
							va.Cm()
						}
						ua = q
					}
				}
				a.yi = p
			}, 80))
		},
		oD: function(a, b) {
			return this.map.la() === Oa ? "TILE-" + b.Q + "-" + this.map.Yv + "-" + a[0] + "-" + a[1] + "-" + a[2] : "TILE-" + b.Q + "-" + a[0] + "-" + a[1] + "-" + a[2]
		},
		Xw: function(a) {
			var b = a.tb;
			b && (Ic(b), zb(b) && b.parentNode.removeChild(b));
			delete this.kg[a.name];
			a.loaded || (Ic(b), Ec(a), a.tb = p, a.tm = p)
		},
		Gf: function(a) {
			var b = this;
			if (b.map.la() == Oa) J.load("coordtrans", function() {
				b.map.Jb || (b.map.Jb = Oa.$j(b.map.ho), b.map.Yv = Oa.mK(b.map.Jb));
				b.sH()
			}, o);
			else {
				if (a && a)
					for (var c in this.Ri) delete this.Ri[c];
				b.sH(a)
			}
		},
		sH: function(a) {
			for (var b = this.qm.concat(this.Jf), c = b.length, d = 0; d < c; d++) {
				var e = b[d];
				if (e.Ub && l.wa < e.Ub) break;
				if (e.Sv) {
					var f = this.Db = e.Db;
					if (a) {
						var g = f;
						if (g && g.childNodes)
							for (var i = g.childNodes.length, k = i - 1; 0 <= k; k--) i = g.childNodes[k], g.removeChild(i), i = p
					}
					if (this.map.Ib()) {
						this.Yc.style.display = "block";
						f.style.display = "none";
						this.map.dispatchEvent(new M("vectorchanged"), {
							isvector: o
						});
						continue
					} else f.style.display = "block", this.Yc.style.display = "none", this.map.dispatchEvent(new M("vectorchanged"), {
						isvector: q
					})
				}
				if (!e.jH && !(e.Qo && !this.map.Ib() || e.jL && this.map.Ib())) {
					var l = this.map,
						m = l.la(),
						f = m.Fo(),
						i = l.wa,
						n = l.kc;
					m == Oa && n.$a(new H(0, 0)) && (n = l.kc = f.pm(l.Se, l.Jb));
					var u = m.Bc(i),
						i = m.tD(i),
						f = Math.ceil(n.lng / i),
						g = Math.ceil(n.lat / i),
						v = m.k.Cb,
						i = [f, g, (n.lng - f * i) / i * v, (n.lat - g * i) / i * v],
						k = i[0] - Math.ceil((l.width / 2 - i[2]) / v),
						f = i[1] - Math.ceil((l.height / 2 - i[3]) / v),
						g = i[0] + Math.ceil((l.width / 2 + i[2]) / v),
						x = 0;
					m === Oa && 15 == l.U() && (x = 1);
					m = i[1] + Math.ceil((l.height / 2 + i[3]) / v) + x;
					this.YI = new H(n.lng, n.lat);
					var y = this.kg,
						v = -this.YI.lng / u,
						x = this.YI.lat / u,
						u = [Math.ceil(v), Math.ceil(x)],
						n = l.U(),
						B;
					for (B in y) {
						var A = y[B],
							D = A.info;
						(D[2] != n || D[2] == n && (k > D[0] || g <= D[0] || f > D[1] || m <= D[1])) && this.Xw(A)
					}
					y = -l.offsetX + l.width / 2;
					A = -l.offsetY + l.height / 2;
					e.Db && (e.Db.style.left = Math.ceil(v + y) - u[0] + "px", e.Db.style.top = Math.ceil(x + A) - u[1] + "px", e.Db.style.WebkitTransform = "translate3d(0,0,0)");
					v = [];
					for (l.eB = []; k < g; k++)
						for (x = f; x < m; x++) v.push([k, x]), l.eB.push({
							x: k,
							y: x
						});
					v.sort(function(a) {
						return function(b, c) {
							return 0.4 * Math.abs(b[0] - a[0]) + 0.6 * Math.abs(b[1] - a[1]) - (0.4 * Math.abs(c[0] - a[0]) + 0.6 * Math.abs(c[1] - a[1]))
						}
					}([i[0] - 1, i[1] - 1]));
					i = v.length;
					this.bh += i;
					for (k = 0; k < i; k++) this.XY([v[k][0], v[k][1], n], u, e, a)
				}
			}
		},
		Kg: function(a) {
			var b = this,
				c = a.target,
				a = b.map.Ib();
			if (c instanceof bb) a && !c.km && (c.fa(this.map, this.Yc), c.km = o);
			else if (c.Kf && this.map.Kg(c.Kf), c.Qo) {
				for (a = 0; a < b.rg.length; a++)
					if (b.rg[a] == c) return;
				J.load("vector", function() {
					c.fa(b.map, b.Yc);
					b.rg.push(c)
				}, o)
			} else {
				for (a = 0; a < b.Jf.length; a++)
					if (b.Jf[a] == c) return;
				c.fa(this.map, this.al);
				b.Jf.push(c)
			}
		},
		jh: function(a) {
			var a = a.target,
				b = this.map.Ib();
			if (a instanceof bb) b && a.km && (a.remove(), a.km = q);
			else {
				a.Kf && this.map.jh(a.Kf);
				if (a.Qo)
					for (var b = 0, c = this.rg.length; b < c; b++) a == this.rg[b] && this.rg.splice(b, 1);
				else {
					b = 0;
					for (c = this.Jf.length; b < c; b++) a == this.Jf[b] && this.Jf.splice(b, 1)
				}
				a.remove()
			}
		},
		og: function() {
			for (var a = this.qm, b = 0, c = a.length; b < c; b++) a[b].remove();
			delete this.Db;
			this.qm = [];
			this.Ri = this.kg = {};
			this.Zw();
			this.Gf()
		},
		Ac: function() {
			var a = this;
			a.ed && w.B.J(a.ed);
			setTimeout(function() {
				a.Gf();
				a.map.dispatchEvent(new M("onzoomend"))
			}, 10)
		},
		Q2: s(),
		ht: function(a) {
			var b = this.map.la();
			if (!this.map.Ib() && (a ? this.map.D.fZ = a : a = this.map.D.fZ, a))
				for (var c = p, c = "2" == z.hy ? [z.url.proto + z.url.domain.main_domain_cdn.other[0] + "/"] : [z.url.proto + z.url.domain.main_domain_cdn.baidu[0] + "/", z.url.proto + z.url.domain.main_domain_cdn.baidu[1] + "/", z.url.proto + z.url.domain.main_domain_cdn.baidu[2] + "/"], d = 0, e; e = this.qm[d]; d++)
					if (e.SY == o) {
						b.k.Nb = 18;
						e.getTilesUrl = function(b, d) {
							var e = b.x,
								k = b.y,
								l = "customimage/tile?&x=" + e + "&y=" + k + "&z=" + d + "&udt=20150601",
								l = a.styleStr ? l + ("&styles=" + encodeURIComponent(a.styleStr)) : l + ("&customid=" + a.style);
							return c[Math.abs(e + k) % c.length] + l
						};
						break
					}
		}
	});

	function Hc(a, b, c, d, e) {
		this.tm = a;
		this.position = c;
		this.pu = [];
		this.name = a.oD(d, e);
		this.info = d;
		this.uI = e.Ks();
		d = K("img");
		yb(d);
		d.eK = q;
		var f = d.style,
			a = a.map.la();
		f.position = "absolute";
		f.border = "none";
		f.width = a.k.Cb + "px";
		f.height = a.k.Cb + "px";
		f.left = c[0] + "px";
		f.top = c[1] + "px";
		f.maxWidth = "none";
		this.tb = d;
		this.src = b;
		Jc && (this.tb.style.opacity = 0);
		var g = this;
		this.tb.onload = function() {
			z.nX.AP();
			g.loaded = o;
			if (g.tm) {
				var a = g.tm,
					b = a.Ri;
				if (!b[g.name]) {
					a.pE++;
					b[g.name] = g
				}
				if (g.tb && !zb(g.tb) && e.Db) {
					e.Db.appendChild(g.tb);
					if (w.S.ba <= 6 && w.S.ba > 0 && g.uI) g.tb.style.cssText = g.tb.style.cssText + (';filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + g.src + '",sizingMethod=scale);')
				}
				var c = a.pE - a.cU,
					d;
				for (d in b) {
					if (c <= 0) break;
					if (!a.kg[d]) {
						b[d].tm = p;
						var f = b[d].tb;
						if (f && f.parentNode) {
							f.parentNode.removeChild(f);
							Ic(f)
						}
						f = p;
						b[d].tb = p;
						delete b[d];
						a.pE--;
						c--
					}
				}
				Jc && new sb({
					wc: 20,
					duration: 200,
					ja: function(a) {
						if (g.tb && g.tb.style) g.tb.style.opacity = a * 1
					},
					finish: function() {
						g.tb && g.tb.style && delete g.tb.style.opacity
					}
				});
				Ec(g)
			}
		};
		this.tb.onerror = function() {
			Ec(g);
			if (g.tm) {
				var a = g.tm.map.la();
				if (a.k.GC) {
					g.error = o;
					g.tb.src = a.k.GC;
					g.tb && !zb(g.tb) && e.Db.appendChild(g.tb)
				}
			}
		};
		d = p
	}

	function Gc(a, b) {
		a.pu.push(b)
	}
	Hc.prototype.Dn = function() {
		this.tb.src = 0 < w.S.ba && 6 >= w.S.ba && this.uI ? F.ea + "blank.gif" : "" !== this.src && this.tb.src == this.src ? this.src + "&t = " + Date.now() : this.src
	};

	function Ec(a) {
		for (var b = 0; b < a.pu.length; b++) a.pu[b]();
		a.pu.length = 0
	}

	function Ic(a) {
		if (a) {
			a.onload = a.onerror = p;
			var b = a.attributes,
				c, d, e;
			if (b) {
				d = b.length;
				for (c = 0; c < d; c += 1) e = b[c].name, Va(a[e]) && (a[e] = p)
			}
			if (b = a.children) {
				d = b.length;
				for (c = 0; c < d; c += 1) Ic(a.children[c])
			}
		}
	}

	function Fc(a, b) {
		a.src = b;
		a.Dn()
	}
	var Jc = !w.S.ba || 8 < w.S.ba;

	function Dc(a) {
		this.dh = a || {};
		this.wU = this.dh.copyright || p;
		this.FZ = this.dh.transparentPng || q;
		this.Sv = this.dh.baseLayer || q;
		this.zIndex = this.dh.zIndex || 0;
		this.Q = Dc.lR++
	}
	Dc.lR = 0;
	w.lang.ia(Dc, w.lang.qa, "TileLayer");
	w.extend(Dc.prototype, {
		fa: function(a, b) {
			this.Sv && (this.zIndex = -100);
			this.map = a;
			if (!this.Db) {
				var c = K("div"),
					d = c.style;
				d.position = "absolute";
				d.overflow = "visible";
				d.zIndex = this.zIndex;
				d.left = Math.ceil(-a.offsetX + a.width / 2) + "px";
				d.top = Math.ceil(-a.offsetY + a.height / 2) + "px";
				b.appendChild(c);
				this.Db = c
			}
		},
		remove: function() {
			this.Db && this.Db.parentNode && (this.Db.innerHTML = "", this.Db.parentNode.removeChild(this.Db));
			delete this.Db
		},
		Ks: t("FZ"),
		getTilesUrl: function(a, b) {
			var c = "";
			this.dh.tileUrlTemplate && (c = this.dh.tileUrlTemplate.replace(/\{X\}/, a.x), c = c.replace(/\{Y\}/, a.y), c = c.replace(/\{Z\}/, b));
			return c
		},
		Vl: t("wU"),
		la: function() {
			return this.ub || Ma
		}
	});

	function Kc(a, b) {
		Hb(a) ? b = a || {} : (b = b || {}, b.databoxId = a);
		this.k = {
			AJ: b.databoxId,
			Qg: b.geotableId,
			Fx: b.q || "",
			Et: b.tags || "",
			filter: b.filter || "",
			Zx: b.sortby || "",
			dZ: b.styleId || "",
			xl: b.ak || qa,
			Pv: b.age || 36E5,
			zIndex: 11,
			iX: "VectorCloudLayer",
			ik: b.hotspotName || "vector_md_" + (1E5 * Math.random()).toFixed(0),
			JT: "LBS\u4e91\u9ebb\u70b9\u5c42"
		};
		this.Qo = o;
		Dc.call(this, this.k);
		this.OU = z.vc + "geosearch/detail/";
		this.PU = z.vc + "geosearch/v2/detail/";
		this.Mo = {}
	}
	w.ia(Kc, Dc, "VectorCloudLayer");

	function Lc(a) {
		a = a || {};
		this.k = w.extend(a, {
			zIndex: 1,
			iX: "VectorTrafficLayer",
			JT: "\u77e2\u91cf\u8def\u51b5\u5c42"
		});
		this.Qo = o;
		Dc.call(this, this.k);
		this.BZ = z.url.proto + z.url.domain.vector_traffic + "/gvd/?qt=lgvd&styles=pl&layers=tf";
		this.pb = {
			"0": [2, 1354709503, 2, 2, 0, [], 0, 0],
			1: [2, 1354709503, 3, 2, 0, [], 0, 0],
			10: [2, -231722753, 2, 2, 0, [], 0, 0],
			11: [2, -231722753, 3, 2, 0, [], 0, 0],
			12: [2, -231722753, 4, 2, 0, [], 0, 0],
			13: [2, -231722753, 5, 2, 0, [], 0, 0],
			14: [2, -231722753, 6, 2, 0, [], 0, 0],
			15: [2, -1, 4, 0, 0, [], 0, 0],
			16: [2, -1, 5.5, 0, 0, [], 0, 0],
			17: [2, -1, 7, 0, 0, [], 0, 0],
			18: [2, -1, 8.5, 0, 0, [], 0, 0],
			19: [2, -1, 10, 0, 0, [], 0, 0],
			2: [2, 1354709503, 4, 2, 0, [], 0, 0],
			3: [2, 1354709503, 5, 2, 0, [], 0, 0],
			4: [2, 1354709503, 6, 2, 0, [], 0, 0],
			5: [2, -6350337, 2, 2, 0, [], 0, 0],
			6: [2, -6350337, 3, 2, 0, [], 0, 0],
			7: [2, -6350337, 4, 2, 0, [], 0, 0],
			8: [2, -6350337, 5, 2, 0, [], 0, 0],
			9: [2, -6350337, 6, 2, 0, [], 0, 0]
		}
	}
	w.ia(Lc, Dc, "VectorTrafficLayer");

	function bb(a) {
		this.dU = [z.url.proto + z.url.domain.TILE_ONLINE_URLS[1] + "/gvd/?", z.url.proto + z.url.domain.TILE_ONLINE_URLS[2] + "/gvd/?", z.url.proto + z.url.domain.TILE_ONLINE_URLS[3] + "/gvd/?", z.url.proto + z.url.domain.TILE_ONLINE_URLS[4] + "/gvd/?"];
		this.k = {
			aK: q
		};
		for (var b in a) this.k[b] = a[b];
		this.Kh = this.th = this.La = this.A = this.C = p;
		this.pL = 0;
		var c = this;
		J.load("vector", function() {
			c.ff()
		})
	}
	w.extend(bb.prototype, {
		fa: function(a, b) {
			this.C = a;
			this.A = b
		},
		remove: function() {
			this.A = this.C = p
		}
	});

	function Mc(a) {
		Dc.call(this, a);
		this.k = a || {};
		this.jL = o;
		this.Kf = new Lc;
		this.Kf.fy = this;
		if (this.k.predictDate) {
			if (1 > this.k.predictDate.weekday || 7 < this.k.predictDate.weekday) this.k.predictDate = 1;
			if (0 > this.k.predictDate.hour || 23 < this.k.predictDate.hour) this.k.predictDate.hour = 0
		}
		this.oT = z.url.proto + z.url.domain.traffic + ":8002/traffic/"
	}
	Mc.prototype = new Dc;
	Mc.prototype.fa = function(a, b) {
		Dc.prototype.fa.call(this, a, b);
		this.C = a
	};
	Mc.prototype.Ks = da(o);
	Mc.prototype.getTilesUrl = function(a, b) {
		var c = "";
		this.k.predictDate ? c = "HistoryService?day=" + (this.k.predictDate.weekday - 1) + "&hour=" + this.k.predictDate.hour + "&t=" + (new Date).getTime() + "&" : (c = "TrafficTileService?time=" + (new Date).getTime() + "&", c += "label=web2D&v=016&");
		return (this.oT + c + "level=" + b + "&x=" + a.x + "&y=" + a.y).replace(/-(\d+)/gi, "M$1")
	};
	var Nc = [z.url.proto + z.url.domain.TILES_YUN_HOST[0] + "/georender/gss", z.url.proto + z.url.domain.TILES_YUN_HOST[1] + "/georender/gss", z.url.proto + z.url.domain.TILES_YUN_HOST[2] + "/georender/gss", z.url.proto + z.url.domain.TILES_YUN_HOST[3] + "/georender/gss"],
		Oc = z.url.proto + z.url.domain.main_domain_nocdn.baidu + "/style/poi/rangestyle",
		Pc = 100;

	function mb(a, b) {
		Dc.call(this);
		var c = this;
		this.jL = o;
		var d = q;
		try {
			document.createElement("canvas").getContext("2d"), d = o
		} catch (e) {
			d = q
		}
		d && (this.Kf = new Kc(a, b), this.Kf.fy = this);
		Hb(a) ? b = a || {} : (c.qn = a, b = b || {});
		b.geotableId && (c.hf = b.geotableId);
		b.databoxId && (c.qn = b.databoxId);
		d = z.vc + "geosearch";
		c.bc = {
			qM: b.pointDensity || Pc,
			JW: d + "/detail/",
			KW: d + "/v2/detail/",
			Pv: b.age || 36E5,
			Fx: b.q || "",
			oZ: "png",
			q1: [5, 5, 5, 5],
			hX: {
				backgroundColor: "#FFFFD5",
				borderColor: "#808080"
			},
			xl: b.ak || qa,
			Et: b.tags || "",
			filter: b.filter || "",
			Zx: b.sortby || "",
			ik: b.hotspotName || "tile_md_" + (1E5 * Math.random()).toFixed(0),
			aF: o
		};
		J.load("clayer", function() {
			c.Bd()
		})
	}
	mb.prototype = new Dc;
	mb.prototype.fa = function(a, b) {
		Dc.prototype.fa.call(this, a, b);
		this.C = a
	};
	mb.prototype.getTilesUrl = function(a, b) {
		var c = a.x,
			d = a.y,
			e = this.bc,
			c = Nc[Math.abs(c + d) % Nc.length] + "/image?grids=" + c + "_" + d + "_" + b + "&q=" + e.Fx + "&tags=" + e.Et + "&filter=" + e.filter + "&sortby=" + e.Zx + "&ak=" + this.bc.xl + "&age=" + e.Pv + "&page_size=" + e.qM + "&format=" + e.oZ;
		e.aF || (e = (1E5 * Math.random()).toFixed(0), c += "&timeStamp=" + e);
		this.hf ? c += "&geotable_id=" + this.hf : this.qn && (c += "&databox_id=" + this.qn);
		return c
	};
	mb.prototype.enableUseCache = function() {
		this.bc.aF = o
	};
	mb.prototype.disableUseCache = function() {
		this.bc.aF = q
	};
	mb.MS = /^point\(|\)$/ig;
	mb.NS = /\s+/;
	mb.PS = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

	function Qc(a, b, c) {
		this.Oe = a;
		this.Iq = b instanceof Dc ? [b] : b.slice(0);
		c = c || {};
		this.k = {
			pZ: c.tips || "",
			QD: "",
			Ub: c.minZoom || 3,
			Nb: c.maxZoom || 18,
			p1: c.minZoom || 3,
			o1: c.maxZoom || 18,
			Cb: 256,
			nZ: c.textColor || "black",
			GC: c.errorImageUrl || "",
			je: c.projection || new Q
		};
		1 <= this.Iq.length && (this.Iq[0].Sv = o);
		w.extend(this.k, c)
	}
	w.extend(Qc.prototype, {
		getName: t("Oe"),
		xs: function() {
			return this.k.pZ
		},
		W0: function() {
			return this.k.QD
		},
		uW: function() {
			return this.Iq[0]
		},
		i1: t("Iq"),
		vW: function() {
			return this.k.Cb
		},
		Ao: function() {
			return this.k.Ub
		},
		Xl: function() {
			return this.k.Nb
		},
		setMaxZoom: function(a) {
			this.k.Nb = a
		},
		ws: function() {
			return this.k.nZ
		},
		Fo: function() {
			return this.k.je
		},
		R0: function() {
			return this.k.GC
		},
		vW: function() {
			return this.k.Cb
		},
		Bc: function(a) {
			return Math.pow(2, 18 - a)
		},
		tD: function(a) {
			return this.Bc(a) * this.k.Cb
		}
	});
	var Rc = [z.url.proto + z.url.domain.TILE_BASE_URLS[0] + "/it/", z.url.proto + z.url.domain.TILE_BASE_URLS[1] + "/it/", z.url.proto + z.url.domain.TILE_BASE_URLS[2] + "/it/", z.url.proto + z.url.domain.TILE_BASE_URLS[3] + "/it/", z.url.proto + z.url.domain.TILE_BASE_URLS[4] + "/it/"],
		Sc = [z.url.proto + z.url.domain.TILE_ONLINE_URLS[0] + "/tile/", z.url.proto + z.url.domain.TILE_ONLINE_URLS[1] + "/tile/", z.url.proto + z.url.domain.TILE_ONLINE_URLS[2] + "/tile/", z.url.proto + z.url.domain.TILE_ONLINE_URLS[3] + "/tile/", z.url.proto + z.url.domain.TILE_ONLINE_URLS[4] + "/tile/"],
		Tc = {
			dark: "dl",
			light: "ll",
			normal: "pl"
		},
		Uc = new Dc;
	Uc.SY = o;
	Uc.getTilesUrl = function(a, b, c) {
		var d = a.x,
			a = a.y,
			e = 1,
			c = Tc[c];
		this.map.OK() && (e = 2);
		return (Sc[Math.abs(d + a) % Sc.length] + "?qt=tile&x=" + (d + "").replace(/-/gi, "M") + "&y=" + (a + "").replace(/-/gi, "M") + "&z=" + b + "&styles=" + c + "&scaler=" + e + (6 == w.S.ba ? "&color_dep=32&colors=50" : "") + "&udt=20150528").replace(/-(\d+)/gi, "M$1")
	};
	var Ma = new Qc("\u5730\u56fe", Uc, {
			tips: "\u663e\u793a\u666e\u901a\u5730\u56fe",
			maxZoom: 19
		}),
		Vc = new Dc;
	Vc.kN = [z.url.proto + z.url.domain.TIlE_PERSPECT_URLS[0] + "/resource/mappic/", z.url.proto + z.url.domain.TIlE_PERSPECT_URLS[1] + "/resource/mappic/", z.url.proto + z.url.domain.TIlE_PERSPECT_URLS[2] + "/resource/mappic/", z.url.proto + z.url.domain.TIlE_PERSPECT_URLS[3] + "/resource/mappic/"];
	Vc.getTilesUrl = function(a, b) {
		var c = a.x,
			d = a.y,
			e = 256 * Math.pow(2, 20 - b),
			d = Math.round((9998336 - e * d) / e) - 1;
		return url = this.kN[Math.abs(c + d) % this.kN.length] + this.map.Jb + "/" + this.map.Yv + "/3/lv" + (21 - b) + "/" + c + "," + d + ".jpg"
	};
	var Oa = new Qc("\u4e09\u7ef4", Vc, {
		tips: "\u663e\u793a\u4e09\u7ef4\u5730\u56fe",
		minZoom: 15,
		maxZoom: 20,
		textColor: "white",
		projection: new fb
	});
	Oa.Bc = function(a) {
		return Math.pow(2, 20 - a)
	};
	Oa.$j = function(a) {
		if (!a) return "";
		var b = F.zB,
			c;
		for (c in b)
			if (-1 < a.search(c)) return b[c].Dx;
		return ""
	};
	Oa.mK = function(a) {
		return {
			bj: 2,
			gz: 1,
			sz: 14,
			sh: 4
		}[a]
	};
	var Wc = new Dc({
		Sv: o
	});
	Wc.getTilesUrl = function(a, b) {
		var c = a.x,
			d = a.y;
		return (Rc[Math.abs(c + d) % Rc.length] + "u=x=" + c + ";y=" + d + ";z=" + b + ";v=009;type=sate&fm=46&udt=20141015").replace(/-(\d+)/gi, "M$1")
	};
	var Wa = new Qc("\u536b\u661f", Wc, {
			tips: "\u663e\u793a\u536b\u661f\u5f71\u50cf",
			minZoom: 1,
			maxZoom: 19,
			textColor: "white"
		}),
		Xc = new Dc({
			transparentPng: o
		});
	Xc.getTilesUrl = function(a, b) {
		var c = a.x,
			d = a.y;
		return (Sc[Math.abs(c + d) % Sc.length] + "?qt=tile&x=" + (c + "").replace(/-/gi, "M") + "&y=" + (d + "").replace(/-/gi, "M") + "&z=" + b + "&styles=sl" + (6 == w.S.ba ? "&color_dep=32&colors=50" : "") + "&udt=20141015").replace(/-(\d+)/gi, "M$1")
	};
	var Qa = new Qc("\u6df7\u5408", [Wc, Xc], {
		tips: "\u663e\u793a\u5e26\u6709\u8857\u9053\u7684\u536b\u661f\u5f71\u50cf",
		labelText: "\u8def\u7f51",
		minZoom: 1,
		maxZoom: 19,
		textColor: "white"
	});
	var Yc = 1,
		T = {};
	window.c_ = T;

	function U(a, b) {
		w.lang.qa.call(this);
		this.kd = {};
		this.Jm(a);
		b = b || {};
		b.aa = b.renderOptions || {};
		this.k = {
			aa: {
				va: b.aa.panel || p,
				map: b.aa.map || p,
				Lg: b.aa.autoViewport || o,
				bt: b.aa.selectFirstResult,
				Bs: b.aa.highlightMode,
				Sb: b.aa.enableDragging || q
			},
			wx: b.onSearchComplete || s(),
			cM: b.onMarkersSet || s(),
			bM: b.onInfoHtmlSet || s(),
			eM: b.onResultsHtmlSet || s(),
			aM: b.onGetBusListComplete || s(),
			$L: b.onGetBusLineComplete || s(),
			YL: b.onBusListHtmlSet || s(),
			XL: b.onBusLineHtmlSet || s(),
			cE: b.onPolylinesSet || s(),
			bp: b.reqFrom || ""
		};
		this.k.aa.Lg = "undefined" != typeof b && "undefined" != typeof b.renderOptions && "undefined" != typeof b.renderOptions.autoViewport ? b.renderOptions.autoViewport : o;
		this.k.aa.va = w.rc(this.k.aa.va)
	}
	w.ia(U, w.lang.qa);
	w.extend(U.prototype, {
		getResults: function() {
			return this.uc ? this.vi : this.$
		},
		enableAutoViewport: function() {
			this.k.aa.Lg = o
		},
		disableAutoViewport: function() {
			this.k.aa.Lg = q
		},
		Jm: function(a) {
			a && (this.kd.src = a)
		},
		JE: function(a) {
			this.k.wx = a || s()
		},
		setMarkersSetCallback: function(a) {
			this.k.cM = a || s()
		},
		setPolylinesSetCallback: function(a) {
			this.k.cE = a || s()
		},
		setInfoHtmlSetCallback: function(a) {
			this.k.bM = a || s()
		},
		setResultsHtmlSetCallback: function(a) {
			this.k.eM = a || s()
		},
		am: t("md")
	});
	var Zc = {
		FF: z.vc,
		fb: function(a, b, c, d, e) {
			var f = (1E5 * Math.random()).toFixed(0);
			z._rd["_cbk" + f] = function(b) {
				c = c || {};
				a && a(b, c);
				delete z._rd["_cbk" + f]
			};
			d = d || "";
			b = c && c.DN ? Fb(b, encodeURI) : Fb(b, encodeURIComponent);
			this.FF = c && c.cs ? c.AM ? c.AM : z.To : z.vc;
			d = this.FF + d + "?" + b + "&ie=utf-8&oue=1&fromproduct=jsapi";
			e || (d += "&res=api");
			Qb(d + ("&callback=BMap._rd._cbk" + f))
		}
	};
	window.j_ = Zc;
	z._rd = {};
	var O = {};
	window.i_ = O;
	O.wM = function(a) {
		a = a.replace(/<\/?[^>]*>/g, "");
		return a = a.replace(/[ | ]* /g, " ")
	};
	O.OX = function(a) {
		return a.replace(/([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0|[1-9]\d*),([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0|[1-9]\d*)(,)/g, "$1,$2;")
	};
	O.PX = function(a, b) {
		return a.replace(RegExp("(((-?\\d+)(\\.\\d+)?),((-?\\d+)(\\.\\d+)?);)(((-?\\d+)(\\.\\d+)?),((-?\\d+)(\\.\\d+)?);){" + b + "}", "ig"), "$1")
	};
	var $c = 2,
		ad = 3,
		bd = 0,
		cd = "bt",
		dd = "nav",
		ed = "walk",
		fd = "bl",
		gd = "bsl",
		hd = 14,
		id = 15,
		jd = 18,
		kd = 20,
		ld = 31;
	z.I = window.Instance = w.lang.Od;

	function md(a, b, c) {
		w.lang.qa.call(this);
		if (a) {
			this.Ja = "object" == typeof a ? a : w.rc(a);
			this.page = 1;
			this.sd = 100;
			this.ZI = "pg";
			this.Hf = 4;
			this.dJ = b;
			this.update = o;
			a = {
				page: 1,
				Ie: 100,
				sd: 100,
				Hf: 4,
				ZI: "pg",
				update: o
			};
			c || (c = a);
			for (var d in c) "undefined" != typeof c[d] && (this[d] = c[d]);
			this.ja()
		}
	}
	w.extend(md.prototype, {
		ja: function() {
			this.fa()
		},
		fa: function() {
			this.iU();
			this.Ja.innerHTML = this.EU()
		},
		iU: function() {
			isNaN(parseInt(this.page)) && (this.page = 1);
			isNaN(parseInt(this.sd)) && (this.sd = 1);
			1 > this.page && (this.page = 1);
			1 > this.sd && (this.sd = 1);
			this.page > this.sd && (this.page = this.sd);
			this.page = parseInt(this.page);
			this.sd = parseInt(this.sd)
		},
		$0: function() {
			location.search.match(RegExp("[?&]?" + this.ZI + "=([^&]*)[&$]?", "gi"));
			this.page = RegExp.$1
		},
		EU: function() {
			var a = [],
				b = this.page - 1,
				c = this.page + 1;
			a.push('<p style="margin:0;padding:0;white-space:nowrap">');
			if (!(1 > b)) {
				if (this.page >= this.Hf) {
					var d;
					a.push('<span style="margin-right:3px"><a style="color:#7777cc" href="javascript:void(0)" onclick="{temp1}">\u9996\u9875</a></span>'.replace("{temp1}", "BMap.I('" + this.Q + "').toPage(1);"))
				}
				a.push('<span style="margin-right:3px"><a style="color:#7777cc" href="javascript:void(0)" onclick="{temp2}">\u4e0a\u4e00\u9875</a></span>'.replace("{temp2}", "BMap.I('" + this.Q + "').toPage(" + b + ");"))
			}
			if (this.page < this.Hf) d = 0 == this.page % this.Hf ? this.page - this.Hf - 1 : this.page - this.page % this.Hf + 1, b = d + this.Hf - 1;
			else {
				d = Math.floor(this.Hf / 2);
				var e = this.Hf % 2 - 1,
					b = this.sd > this.page + d ? this.page + d : this.sd;
				d = this.page - d - e
			}
			this.page > this.sd - this.Hf && this.page >= this.Hf && (d = this.sd - this.Hf + 1, b = this.sd);
			for (e = d; e <= b; e++) 0 < e && (e == this.page ? a.push('<span style="margin-right:3px">' + e + "</span>") : 1 <= e && e <= this.sd && (d = '<span><a style="color:#7777cc;margin-right:3px" href="javascript:void(0)" onclick="{temp3}">[' + e + "]</a></span>", a.push(d.replace("{temp3}", "BMap.I('" + this.Q + "').toPage(" + e + ");"))));
			c > this.sd || a.push('<span><a style="color:#7777cc" href="javascript:void(0)" onclick="{temp4}">\u4e0b\u4e00\u9875</a></span>'.replace("{temp4}", "BMap.I('" + this.Q + "').toPage(" + c + ");"));
			a.push("</p>");
			return a.join("")
		},
		toPage: function(a) {
			a = a ? a : 1;
			"function" == typeof this.dJ && (this.dJ(a), this.page = a);
			this.update && this.ja()
		}
	});

	function $a(a, b) {
		U.call(this, a, b);
		b = b || {};
		b.renderOptions = b.renderOptions || {};
		this.np(b.pageCapacity);
		"undefined" != typeof b.renderOptions.selectFirstResult && !b.renderOptions.selectFirstResult ? this.eC() : this.BC();
		this.ka = [];
		this.ef = [];
		this.Xa = -1;
		this.Da = [];
		var c = this;
		J.load("local", function() {
			c.Vy()
		}, o)
	}
	w.ia($a, U, "LocalSearch");
	$a.Ep = 10;
	$a.g_ = 1;
	$a.Zm = 100;
	$a.vF = 2E3;
	$a.CF = 1E5;
	w.extend($a.prototype, {
		search: function(a, b) {
			this.Da.push({
				method: "search",
				arguments: [a, b]
			})
		},
		Gm: function(a, b, c) {
			this.Da.push({
				method: "searchInBounds",
				arguments: [a, b, c]
			})
		},
		ip: function(a, b, c, d) {
			this.Da.push({
				method: "searchNearby",
				arguments: [a, b, c, d]
			})
		},
		ze: function() {
			delete this.ta;
			delete this.md;
			delete this.$;
			delete this.T;
			this.Xa = -1;
			this.gb();
			this.k.aa.va && (this.k.aa.va.innerHTML = "")
		},
		em: s(),
		BC: function() {
			this.k.aa.bt = o
		},
		eC: function() {
			this.k.aa.bt = q
		},
		np: function(a) {
			this.k.mk = "number" == typeof a && !isNaN(a) ? 1 > a ? $a.Ep : a > $a.Zm ? $a.Ep : a : $a.Ep
		},
		Xe: function() {
			return this.k.mk
		},
		toString: da("LocalSearch")
	});
	var nd = $a.prototype;
	R(nd, {
		clearResults: nd.ze,
		setPageCapacity: nd.np,
		getPageCapacity: nd.Xe,
		gotoPage: nd.em,
		searchNearby: nd.ip,
		searchInBounds: nd.Gm,
		search: nd.search,
		enableFirstResultSelection: nd.BC,
		disableFirstResultSelection: nd.eC
	});

	function od(a, b) {
		U.call(this, a, b)
	}
	w.ia(od, U, "BaseRoute");
	w.extend(od.prototype, {
		ze: s()
	});

	function pd(a, b) {
		U.call(this, a, b);
		b = b || {};
		this.kt(b.policy);
		this.np(b.pageCapacity);
		this.fd = cd;
		this.$t = hd;
		this.au = Yc;
		this.ka = [];
		this.Xa = -1;
		this.k.Tc = b.enableTraffic || q;
		this.Da = [];
		var c = this;
		J.load("route", function() {
			c.Bd()
		})
	}
	pd.Zm = 100;
	pd.hO = [0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 1];
	w.ia(pd, od, "TransitRoute");
	w.extend(pd.prototype, {
		kt: function(a) {
			this.k.Pc = 0 <= a && 4 >= a ? a : 0
		},
		Xz: function(a, b) {
			this.Da.push({
				method: "_internalSearch",
				arguments: [a, b]
			})
		},
		search: function(a, b) {
			this.Da.push({
				method: "search",
				arguments: [a, b]
			})
		},
		np: function(a) {
			if ("string" === typeof a && (a = parseInt(a, 10), isNaN(a))) {
				this.k.mk = pd.Zm;
				return
			}
			this.k.mk = "number" !== typeof a ? pd.Zm : 1 <= a && a <= pd.Zm ? Math.round(a) : pd.Zm
		},
		toString: da("TransitRoute"),
		aT: function(a) {
			return a.replace(/\(.*\)/, "")
		}
	});
	var qd = pd.prototype;
	R(qd, {
		_internalSearch: qd.Xz
	});

	function rd(a, b) {
		U.call(this, a, b);
		this.ka = [];
		this.Xa = -1;
		this.Da = [];
		var c = this,
			d = this.k.aa;
		1 !== d.Bs && 2 !== d.Bs && (d.Bs = 1);
		this.pz = this.k.aa.Sb ? o : q;
		J.load("route", function() {
			c.Bd()
		});
		this.CD && this.CD()
	}
	rd.uO = " \u73af\u5c9b \u65e0\u5c5e\u6027\u9053\u8def \u4e3b\u8def \u9ad8\u901f\u8fde\u63a5\u8def \u4ea4\u53c9\u70b9\u5185\u8def\u6bb5 \u8fde\u63a5\u9053\u8def \u505c\u8f66\u573a\u5185\u90e8\u9053\u8def \u670d\u52a1\u533a\u5185\u90e8\u9053\u8def \u6865 \u6b65\u884c\u8857 \u8f85\u8def \u531d\u9053 \u5168\u5c01\u95ed\u9053\u8def \u672a\u5b9a\u4e49\u4ea4\u901a\u533a\u57df POI\u8fde\u63a5\u8def \u96a7\u9053 \u6b65\u884c\u9053 \u516c\u4ea4\u4e13\u7528\u9053 \u63d0\u524d\u53f3\u8f6c\u9053".split(" ");
	w.ia(rd, od, "DWRoute");
	w.extend(rd.prototype, {
		search: function(a, b, c) {
			this.Da.push({
				method: "search",
				arguments: [a, b, c]
			})
		}
	});

	function sd(a, b) {
		rd.call(this, a, b);
		b = b || {};
		this.k.Tc = b.enableTraffic || q;
		this.kt(b.policy);
		this.fd = dd;
		this.$t = kd;
		this.au = ad
	}
	w.ia(sd, rd, "DrivingRoute");
	sd.prototype.kt = function(a) {
		this.k.Pc = 0 <= a && 2 >= a ? a : 0
	};

	function ud(a, b) {
		rd.call(this, a, b);
		this.fd = ed;
		this.$t = ld;
		this.au = $c;
		this.pz = q
	}
	w.ia(ud, rd, "WalkingRoute");

	function vd(a, b) {
		w.lang.qa.call(this);
		this.Ff = [];
		this.zm = [];
		this.k = b;
		this.Tb = a;
		this.map = this.k.aa.map || p;
		this.Mx = this.k.Mx;
		this.kb = p;
		this.Si = 0;
		this.$x = "";
		this.Md = 1;
		this.xw = "";
		this.cp = [0, 0, 0, 0, 0, 0, 0];
		this.SD = [];
		this.Hr = [1, 1, 1, 1, 1, 1, 1];
		this.sN = [1, 1, 1, 1, 1, 1, 1];
		this.$s = [0, 0, 0, 0, 0, 0, 0];
		this.dp = [0, 0, 0, 0, 0, 0, 0];
		this.Ca = [{
			o: "",
			xf: 0,
			Rm: 0,
			x: 0,
			y: 0,
			pc: -1
		}, {
			o: "",
			xf: 0,
			Rm: 0,
			x: 0,
			y: 0,
			pc: -1
		}, {
			o: "",
			xf: 0,
			Rm: 0,
			x: 0,
			y: 0,
			pc: -1
		}, {
			o: "",
			xf: 0,
			Rm: 0,
			x: 0,
			y: 0,
			pc: -1
		}, {
			o: "",
			xf: 0,
			Rm: 0,
			x: 0,
			y: 0,
			pc: -1
		}, {
			o: "",
			xf: 0,
			Rm: 0,
			x: 0,
			y: 0,
			pc: -1
		}, {
			o: "",
			xf: 0,
			Rm: 0,
			x: 0,
			y: 0,
			pc: -1
		}];
		this.Rh = -1;
		this.Gt = [];
		this.Ht = [];
		J.load("route", s())
	}
	w.lang.ia(vd, w.lang.qa, "RouteAddr");
	var wd = navigator.userAgent;
	/ipad|iphone|ipod|iph/i.test(wd);
	var xd = /android/i.test(wd);

	function yd(a) {
		this.dh = a || {}
	}
	w.extend(yd.prototype, {
		GM: function(a, b, c) {
			var d = this;
			J.load("route", function() {
				d.Bd(a, b, c)
			})
		}
	});

	function zd(a) {
		this.k = {};
		w.extend(this.k, a);
		this.Da = [];
		var b = this;
		J.load("othersearch", function() {
			b.Bd()
		})
	}
	w.ia(zd, w.lang.qa, "Geocoder");
	w.extend(zd.prototype, {
		$l: function(a, b, c) {
			this.Da.push({
				method: "getPoint",
				arguments: [a, b, c]
			})
		},
		ns: function(a, b, c) {
			this.Da.push({
				method: "getLocation",
				arguments: [a, b, c]
			})
		},
		toString: da("Geocoder")
	});
	var Ad = zd.prototype;
	R(Ad, {
		getPoint: Ad.$l,
		getLocation: Ad.ns
	});

	function Geolocation(a) {
		a = a || {};
		this.D = {
			timeout: a.timeout || 1E4,
			maximumAge: a.maximumAge || 6E5
		};
		this.$d = [];
		var b = this;
		J.load("othersearch", function() {
			for (var a = 0, d; d = b.$d[a]; a++) b[d.method].apply(b, d.arguments)
		})
	}
	w.extend(Geolocation.prototype, {
		getCurrentPosition: function(a, b) {
			this.$d.push({
				method: "getCurrentPosition",
				arguments: arguments
			})
		},
		getStatus: da(2)
	});

	function Bd(a) {
		a = a || {};
		a.aa = a.renderOptions || {};
		this.k = {
			aa: {
				map: a.aa.map || p
			}
		};
		this.Da = [];
		var b = this;
		J.load("othersearch", function() {
			b.Bd()
		})
	}
	w.ia(Bd, w.lang.qa, "LocalCity");
	w.extend(Bd.prototype, {
		get: function(a) {
			this.Da.push({
				method: "get",
				arguments: [a]
			})
		},
		toString: da("LocalCity")
	});

	function Cd() {
		this.Da = [];
		var a = this;
		J.load("othersearch", function() {
			a.Bd()
		})
	}
	w.ia(Cd, w.lang.qa, "Boundary");
	w.extend(Cd.prototype, {
		get: function(a, b) {
			this.Da.push({
				method: "get",
				arguments: [a, b]
			})
		},
		toString: da("Boundary")
	});

	function Dd(a, b) {
		U.call(this, a, b);
		this.rO = fd;
		this.tO = id;
		this.qO = gd;
		this.sO = jd;
		this.Da = [];
		var c = this;
		J.load("buslinesearch", function() {
			c.Bd()
		})
	}
	Dd.Lu = F.ea + "iw_plus.gif";
	Dd.rR = F.ea + "iw_minus.gif";
	Dd.kT = F.ea + "stop_icon.png";
	w.ia(Dd, U);
	w.extend(Dd.prototype, {
		getBusList: function(a) {
			this.Da.push({
				method: "getBusList",
				arguments: [a]
			})
		},
		getBusLine: function(a) {
			this.Da.push({
				method: "getBusLine",
				arguments: [a]
			})
		},
		setGetBusListCompleteCallback: function(a) {
			this.k.aM = a || s()
		},
		setGetBusLineCompleteCallback: function(a) {
			this.k.$L = a || s()
		},
		setBusListHtmlSetCallback: function(a) {
			this.k.YL = a || s()
		},
		setBusLineHtmlSetCallback: function(a) {
			this.k.XL = a || s()
		},
		setPolylinesSetCallback: function(a) {
			this.k.cE = a || s()
		}
	});

	function Ed(a) {
		U.call(this, a);
		a = a || {};
		this.bc = {
			input: a.input || p,
			pB: a.baseDom || p,
			types: a.types || [],
			wx: a.onSearchComplete || s()
		};
		this.kd.src = a.location || "\u5168\u56fd";
		this.Oi = "";
		this.$f = p;
		this.fH = "";
		this.Di();
		Pa(Ja);
		var b = this;
		J.load("autocomplete", function() {
			b.Bd()
		})
	}
	w.ia(Ed, U, "Autocomplete");
	w.extend(Ed.prototype, {
		Di: s(),
		show: s(),
		J: s(),
		KE: function(a) {
			this.bc.types = a
		},
		Jm: function(a) {
			this.kd.src = a
		},
		search: ba("Oi"),
		Px: ba("fH")
	});
	var Ra;

	function Na(a, b) {
		function c() {
			e.k.visible ? ("inter" === e.Pe && e.k.indoorExitControl === o ? w.B.show(e.Qz) : w.B.J(e.Qz), e.k.closeControl ? w.B.show(e.Ai) : w.B.J(e.Ai)) : (w.B.J(e.Ai), w.B.J(e.Qz))
		}
		this.A = "string" == typeof a ? w.N(a) : a;
		this.k = {
			enableScrollWheelZoom: o,
			panoramaRenderer: "flash",
			swfSrc: z.hg("main_domain_nocdn", "res/swf/") + "APILoader.swf",
			visible: o,
			indoorExitControl: o,
			indoorFloorControl: q,
			linksControl: o,
			clickOnRoad: o,
			navigationControl: o,
			closeControl: o,
			indoorSceneSwitchControl: o,
			albumsControl: q,
			albumsControlOptions: {},
			copyrightControlOptions: {}
		};
		var b = b || {},
			d;
		for (d in b) this.k[d] = b[d];
		this.za = {
			heading: 0,
			pitch: 0
		};
		this.Cn = [];
		this.xb = this.Na = p;
		this.cr = this.Bj();
		this.ka = [];
		this.Ac = 1;
		this.Pe = this.PR = this.Jk = "";
		this.se = {};
		this.vf = p;
		this.Dg = [];
		this.Tq = [];
		this.Xq = q;
		var e = this;
		this.Dn = function() {
			"flashRender" === this.Bj() ? J.load("panoramaflash", function() {
				e.Di()
			}, o) : J.load("panorama", function() {
				e.rb()
			}, o);
			"api" == b.Af ? Pa(Fa) : Pa(Ga);
			this.Dn = s()
		};
		this.k.CR !== o && this.Dn();
		this.tS(this.A);
		this.addEventListener("id_changed", function() {
			Pa(Ea, {
				from: b.Af
			})
		});
		this.LO();
		this.addEventListener("indoorexit_options_changed", c);
		this.addEventListener("scene_type_changed", c);
		this.addEventListener("onclose_options_changed", c);
		this.addEventListener("onvisible_changed", c)
	}
	var Fd = 4,
		Gd = 1;
	w.lang.ia(Na, w.lang.qa, "Panorama");
	w.extend(Na.prototype, {
		LO: function() {
			var a = this,
				b = this.Ai = K("div");
			b.className = "pano_close";
			b.style.cssText = "z-index: 1201;display: none";
			b.title = "\u9000\u51fa\u5168\u666f";
			b.onclick = function() {
				a.J()
			};
			this.A.appendChild(b);
			var c = this.Qz = K("a");
			c.className = "pano_pc_indoor_exit";
			c.style.cssText = "z-index: 1201;display: none";
			c.innerHTML = '<span style="float:right;margin-right:12px;">\u51fa\u53e3</span>';
			c.title = "\u9000\u51fa\u5ba4\u5185\u666f";
			c.onclick = function() {
				a.to()
			};
			this.A.appendChild(c);
			window.ActiveXObject && !document.addEventListener && (b.style.backgroundColor = "rgb(37,37,37)", c.style.backgroundColor = "rgb(37,37,37)")
		},
		to: s(),
		tS: function(a) {
			var b, c;
			b = a.style;
			c = Ta(a).position;
			"absolute" != c && "relative" != c && (b.position = "relative", b.zIndex = 0);
			if ("absolute" === c || "relative" === c)
				if (a = Ta(a).zIndex, !a || "auto" === a) b.zIndex = 0
		},
		UV: t("Cn"),
		Lb: t("Na"),
		wW: t("tv"),
		WM: t("tv"),
		V: t("xb"),
		sa: t("za"),
		U: t("Ac"),
		Rg: t("Jk"),
		b1: function() {
			return this.I_ || []
		},
		Y0: t("PR"),
		vs: t("Pe"),
		Rx: function(a) {
			a !== this.Pe && (this.Pe = a, this.dispatchEvent(new M("onscene_type_changed")))
		},
		dc: function(a, b, c) {
			"object" === typeof b && (c = b, b = j);
			a != this.Na && (this.Uk = this.Na, this.Vk = this.xb, this.Na = a, this.Pe = b || "street", this.xb = p, c && c.pov && this.ud(c.pov))
		},
		ha: function(a) {
			a.$a(this.xb) || (this.Uk = this.Na, this.Vk = this.xb, this.xb = a, this.Na = p)
		},
		ud: function(a) {
			a && (this.za = a, a = this.za.pitch, "cvsRender" == this.Bj() || Hd() ? (90 < a && (a = 90), -90 > a && (a = -90)) : "cssRender" == this.Bj() && (45 < a && (a = 45), -45 > a && (a = -45)), this.Xq = o, this.za.pitch = a)
		},
		Cc: function(a) {
			a != this.Ac && (a > Fd && (a = Fd), a < Gd && (a = Gd), a != this.Ac && (this.Ac = a))
		},
		PA: function() {
			if (this.C)
				for (var a = this.C.Mw(), b = 0; b < a.length; b++)(a[b] instanceof S || a[b] instanceof qc) && a[b].point && this.ka.push(a[b])
		},
		GE: ba("C"),
		jt: function(a) {
			this.vf = a || "none"
		},
		mp: function(a) {
			for (var b in a) {
				if ("object" == typeof a[b])
					for (var c in a[b]) this.k[b][c] = a[b][c];
				else this.k[b] = a[b];
				switch (b) {
					case "linksControl":
						this.dispatchEvent(new M("onlinks_visible_changed"));
						break;
					case "clickOnRoad":
						this.dispatchEvent(new M("onclickonroad_changed"));
						break;
					case "navigationControl":
						this.dispatchEvent(new M("onnavigation_visible_changed"));
						break;
					case "indoorSceneSwitchControl":
						this.dispatchEvent(new M("onindoor_default_switch_mode_changed"));
						break;
					case "albumsControl":
						this.dispatchEvent(new M("onalbums_visible_changed"));
						break;
					case "albumsControlOptions":
						this.dispatchEvent(new M("onalbums_options_changed"));
						break;
					case "copyrightControlOptions":
						this.dispatchEvent(new M("oncopyright_options_changed"));
						break;
					case "closeControl":
						this.dispatchEvent(new M("onclose_options_changed"));
						break;
					case "indoorExitControl":
						this.dispatchEvent(new M("onindoorexit_options_changed"));
						break;
					case "indoorFloorControl":
						this.dispatchEvent(new M("onindoorfloor_options_changed"))
				}
			}
		},
		hk: function() {
			this.cl.style.visibility = "hidden"
		},
		Vx: function() {
			this.cl.style.visibility = "visible"
		},
		jV: function() {
			this.k.enableScrollWheelZoom = o
		},
		VU: function() {
			this.k.enableScrollWheelZoom = q
		},
		show: function() {
			this.k.visible = o
		},
		J: function() {
			this.k.visible = q
		},
		Bj: function() {
			return Sa() && !G() && "javascript" != this.k.panoramaRenderer ? "flashRender" : !G() && Mb() ? "cvsRender" : "cssRender"
		},
		ya: function(a) {
			this.se[a.Vc] = a
		},
		Gb: function(a) {
			delete this.se[a]
		},
		rD: function() {
			return this.k.visible
		},
		Uh: function() {
			return new L(this.A.clientWidth, this.A.clientHeight)
		},
		Fa: t("A"),
		hK: function() {
			var a = z.hg("baidumap", "?"),
				b = this.Lb();
			if (b) {
				var b = {
						panotype: this.vs(),
						heading: this.sa().heading,
						pitch: this.sa().pitch,
						pid: b,
						panoid: b,
						from: "api"
					},
					c;
				for (c in b) a += c + "=" + b[c] + "&"
			}
			return a.slice(0, -1)
		},
		Vw: function() {
			this.mp({
				copyrightControlOptions: {
					logoVisible: q
				}
			})
		},
		NE: function() {
			this.mp({
				copyrightControlOptions: {
					logoVisible: o
				}
			})
		},
		jB: function(a) {
			function b(a, b) {
				return function() {
					a.Tq.push({
						KL: b,
						JL: arguments
					})
				}
			}
			for (var c = a.getPanoMethodList(), d = "", e = 0, f = c.length; e < f; e++) d = c[e], this[d] = b(this, d);
			this.Dg.push(a)
		},
		sE: function(a) {
			for (var b = this.Dg.length; b--;) this.Dg[b] === a && this.Dg.splice(b, 1)
		}
	});
	var Id = Na.prototype;
	R(Id, {
		setId: Id.dc,
		setPosition: Id.ha,
		setPov: Id.ud,
		setZoom: Id.Cc,
		setOptions: Id.mp,
		getId: Id.Lb,
		getPosition: Id.V,
		getPov: Id.sa,
		getZoom: Id.U,
		getLinks: Id.UV,
		getBaiduMapUrl: Id.hK,
		hideMapLogo: Id.Vw,
		showMapLogo: Id.NE,
		enableDoubleClickZoom: Id.B0,
		disableDoubleClickZoom: Id.q0,
		enableScrollWheelZoom: Id.jV,
		disableScrollWheelZoom: Id.VU,
		show: Id.show,
		hide: Id.J,
		addPlugin: Id.jB,
		removePlugin: Id.sE,
		getVisible: Id.rD,
		addOverlay: Id.ya,
		removeOverlay: Id.Gb,
		getSceneType: Id.vs,
		setPanoramaPOIType: Id.jt,
		exitInter: Id.to
	});
	R(window, {
		BMAP_PANORAMA_POI_HOTEL: "hotel",
		BMAP_PANORAMA_POI_CATERING: "catering",
		BMAP_PANORAMA_POI_MOVIE: "movie",
		BMAP_PANORAMA_POI_TRANSIT: "transit",
		BMAP_PANORAMA_POI_INDOOR_SCENE: "indoor_scene",
		BMAP_PANORAMA_POI_NONE: "none",
		BMAP_PANORAMA_INDOOR_SCENE: "inter",
		BMAP_PANORAMA_STREET_SCENE: "street"
	});

	function Jd() {
		w.lang.qa.call(this);
		this.Vc = "PanoramaOverlay_" + this.Q;
		this.G = p;
		this.Ea = o
	}
	w.lang.ia(Jd, w.lang.qa, "PanoramaOverlayBase");
	w.extend(Jd.prototype, {
		Z0: t("Vc"),
		fa: function() {
			aa("initialize\u65b9\u6cd5\u672a\u5b9e\u73b0")
		},
		remove: function() {
			aa("remove\u65b9\u6cd5\u672a\u5b9e\u73b0")
		},
		uf: function() {
			aa("_setOverlayProperty\u65b9\u6cd5\u672a\u5b9e\u73b0")
		}
	});

	function Kd(a, b) {
		Jd.call(this);
		var c = {
				position: p,
				altitude: 2,
				displayDistance: o
			},
			b = b || {},
			d;
		for (d in b) c[d] = b[d];
		this.xb = c.position;
		this.vj = a;
		this.Tp = c.altitude;
		this.VP = c.displayDistance
	}
	w.lang.ia(Kd, Jd, "PanoramaLabel");
	w.extend(Kd.prototype, {
		ha: function(a) {
			this.xb = a;
			this.uf("position", a)
		},
		V: t("xb"),
		Qc: function(a) {
			this.vj = a;
			this.uf("content", a)
		},
		bk: t("vj"),
		CE: function(a) {
			this.Tp = a;
			this.uf("altitude", a)
		},
		wo: t("Tp"),
		sa: function() {
			var a = this.V(),
				b = p,
				c = p;
			this.G && (c = this.G.V());
			if (a && c)
				if (a.$a(c)) b = this.G.sa();
				else {
					b = {};
					b.heading = Ld(a.lng - c.lng, a.lat - c.lat) || 0;
					var a = b,
						c = this.wo(),
						d = this.xn();
					a.pitch = Math.round(180 * (Math.atan(c / d) / Math.PI)) || 0
				}
			return b
		},
		xn: function() {
			var a = 0,
				b, c;
			this.G && (b = this.G.V(), (c = this.V()) && !c.$a(b) && (a = Q.yo(b, c)));
			return a
		},
		J: function() {
			aa("hide\u65b9\u6cd5\u672a\u5b9e\u73b0")
		},
		show: function() {
			aa("show\u65b9\u6cd5\u672a\u5b9e\u73b0")
		},
		uf: s()
	});
	var Md = Kd.prototype;
	R(Md, {
		setPosition: Md.ha,
		getPosition: Md.V,
		setContent: Md.Qc,
		getContent: Md.bk,
		setAltitude: Md.CE,
		getAltitude: Md.wo,
		getPov: Md.sa,
		show: Md.show,
		hide: Md.J
	});

	function Nd(a, b) {
		Jd.call(this);
		var c = {
				icon: "",
				title: "",
				panoInfo: p,
				altitude: 2
			},
			b = b || {},
			d;
		for (d in b) c[d] = b[d];
		this.xb = a;
		this.aH = c.icon;
		this.sI = c.title;
		this.Tp = c.altitude;
		this.fS = c.panoInfo;
		this.za = {
			heading: 0,
			pitch: 0
		}
	}
	w.lang.ia(Nd, Jd, "PanoramaMarker");
	w.extend(Nd.prototype, {
		ha: function(a) {
			this.xb = a;
			this.uf("position", a)
		},
		V: t("xb"),
		qc: function(a) {
			this.sI = a;
			this.uf("title", a)
		},
		Ho: t("sI"),
		Hb: function(a) {
			this.aH = icon;
			this.uf("icon", a)
		},
		zo: t("aH"),
		CE: function(a) {
			this.Tp = a;
			this.uf("altitude", a)
		},
		wo: t("Tp"),
		jD: t("fS"),
		sa: function() {
			var a = p;
			if (this.G) {
				var a = this.G.V(),
					b = this.V(),
					a = Ld(b.lng - a.lng, b.lat - a.lat);
				isNaN(a) && (a = 0);
				a = {
					heading: a,
					pitch: 0
				}
			} else a = this.za;
			return a
		},
		uf: s()
	});
	var Od = Nd.prototype;
	R(Od, {
		setPosition: Od.ha,
		getPosition: Od.V,
		setTitle: Od.qc,
		getTitle: Od.Ho,
		setAltitude: Od.CE,
		getAltitude: Od.wo,
		getPanoInfo: Od.jD,
		getIcon: Od.zo,
		setIcon: Od.Hb,
		getPov: Od.sa
	});

	function Ld(a, b) {
		var c = 0;
		if (0 !== a && 0 !== b) {
			var c = 180 * (Math.atan(a / b) / Math.PI),
				d = 0;
			0 < a && 0 > b && (d = 90);
			0 > a && 0 > b && (d = 180);
			0 > a && 0 < b && (d = 270);
			c = (c + 90) % 90 + d
		} else 0 === a ? c = 0 > b ? 180 : 0 : 0 === b && (c = 0 < a ? 90 : 270);
		return Math.round(c)
	}

	function Hd() {
		if ("boolean" === typeof Pd) return Pd;
		if (!window.WebGLRenderingContext || w.platform.lm && -1 == navigator.userAgent.indexOf("Android 5")) return Pd = q;
		var a = document.createElement("canvas"),
			b = p;
		try {
			b = a.getContext("webgl")
		} catch (c) {
			Pd = q
		}
		return Pd = b === p ? q : o
	}
	var Pd;

	function ac(a, b) {
		this.G = a || p;
		var c = this;
		c.G && c.P();
		J.load("pservice", function() {
			c.nP()
		});
		"api" == (b || {}).Af ? Pa(Ha) : Pa(Ia);
		this.gd = {
			getPanoramaById: [],
			getPanoramaByLocation: [],
			getVisiblePOIs: [],
			getRecommendPanosById: [],
			getPanoramaVersions: [],
			checkPanoSupportByCityCode: [],
			getPanoramaByPOIId: [],
			getCopyrightProviders: []
		}
	}
	z.ym(function(a) {
		"flashRender" !== a.Bj() && new ac(a, {
			Af: "api"
		})
	});
	w.extend(ac.prototype, {
		P: function() {
			function a(a) {
				if (a) {
					if (a.id != b.tv) {
						b.WM(a.id);
						b.R = a;
						b.Na != p && (b.Vk = b._position);
						for (var c in a)
							if (a.hasOwnProperty(c)) switch (b["_" + c] = a[c], c) {
								case "position":
									b.xb = a[c];
									break;
								case "id":
									b.Na = a[c];
									break;
								case "links":
									b.Cn = a[c];
									break;
								case "zoom":
									b.Ac = a[c]
							}
							if (b.Vk) {
								var f = b.Vk,
									g = b._position;
								c = f.lat;
								var i = g.lat,
									k = Nb(i - c),
									f = Nb(g.lng - f.lng);
								c = Math.sin(k / 2) * Math.sin(k / 2) + Math.cos(Nb(c)) * Math.cos(Nb(i)) * Math.sin(f / 2) * Math.sin(f / 2);
								b.pG = 6371E3 * 2 * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c))
							}
						c = new M("ondataload");
						c.data = a;
						b.dispatchEvent(c);
						b.dispatchEvent(new M("onposition_changed"));
						b.dispatchEvent(new M("onlinks_changed"));
						b.dispatchEvent(new M("oncopyright_changed"), {
							copyright: a.copyright
						});
						a.Gl && b.k.closeControl ? w.B.show(b.qQ) : w.B.J(b.qQ)
					}
				} else b.Na = b.Uk, b.xb = b.Vk, b.dispatchEvent(new M("onnoresult"))
			}
			var b = this.G,
				c = this;
			b.addEventListener("id_changed", function() {
				c.Do(b.Lb(), a)
			});
			b.addEventListener("iid_changed", function() {
				c.Eg(ac.Fk + "qt=idata&iid=" + b.Mz + "&fn=", function(b) {
					if (b && b.result && 0 == b.result.error) {
						var b = b.content[0].interinfo,
							e = {};
						e.Gl = b.BreakID;
						for (var f = b.Defaultfloor, g = p, i = 0; i < b.Floors.length; i++)
							if (b.Floors[i].Floor == f) {
								g = b.Floors[i];
								break
							}
						e.id = g.StartID || g.Points[0].PID;
						c.Do(e.id, a, e)
					}
				})
			});
			b.addEventListener("position_changed_inner", function() {
				c.cj(b.V(), a)
			})
		},
		Do: function(a, b) {
			this.gd.getPanoramaById.push(arguments)
		},
		cj: function(a, b, c) {
			this.gd.getPanoramaByLocation.push(arguments)
		},
		sD: function(a, b, c, d) {
			this.gd.getVisiblePOIs.push(arguments)
		},
		Pw: function(a, b) {
			this.gd.getRecommendPanosById.push(arguments)
		},
		Ow: function(a) {
			this.gd.getPanoramaVersions.push(arguments)
		},
		xB: function(a, b) {
			this.gd.checkPanoSupportByCityCode.push(arguments)
		},
		Nw: function(a, b) {
			this.gd.getPanoramaByPOIId.push(arguments)
		},
		nK: function(a) {
			this.gd.getCopyrightProviders.push(arguments)
		}
	});
	var Qd = ac.prototype;
	R(Qd, {
		getPanoramaById: Qd.Do,
		getPanoramaByLocation: Qd.cj,
		getPanoramaByPOIId: Qd.Nw
	});

	function $b(a) {
		Dc.call(this);
		"api" == (a || {}).Af ? Pa(Ba) : Pa(Da)
	}
	$b.JF = z.hg("pano", "tile/");
	$b.prototype = new Dc;
	$b.prototype.getTilesUrl = function(a, b) {
		var c = $b.JF[(a.x + a.y) % $b.JF.length] + "?udt=20150114&qt=tile&styles=pl&x=" + a.x + "&y=" + a.y + "&z=" + b;
		w.S.ba && 6 >= w.S.ba && (c += "&color_dep=32");
		return c
	};
	$b.prototype.Ks = da(o);
	Rd.Fd = new Q;

	function Rd() {}
	w.extend(Rd, {
		WU: function(a, b, c) {
			c = w.lang.Od(c);
			b = {
				data: b
			};
			"position_changed" == a && (b.data = Rd.Fd.hi(new P(b.data.mercatorX, b.data.mercatorY)));
			c.dispatchEvent(new M("on" + a), b)
		}
	});
	var Sd = Rd;
	R(Sd, {
		dispatchFlashEvent: Sd.WU
	});
	var Td = {
		jO: 50
	};
	Td.bu = z.hg("pano")[0];
	Td.Yt = {
		width: 220,
		height: 60
	};
	w.extend(Td, {
		Oo: function(a, b, c, d) {
			if (!b || !c || !c.lngLat || !c.panoInstance) d();
			else {
				this.In === j && (this.In = new ac(p, {
					Af: "api"
				}));
				var e = this;
				this.In.xB(b, function(b) {
					b ? e.In.cj(c.lngLat, Td.jO, function(b) {
						if (b && b.id) {
							var f = b.id,
								k = b.eh,
								b = b.fh,
								l = ac.Fd.Xg(c.lngLat),
								m = e.TQ(l, {
									x: k,
									y: b
								}),
								k = e.wK(f, m, 0, Td.Yt.width, Td.Yt.height);
							a.content = e.UQ(a.content, k, c.titleTip, c.beforeDomId);
							a.addEventListener("open", function() {
								ia.F(w.rc("infoWndPano"), "click", function() {
									c.panoInstance.dc(f);
									c.panoInstance.show();
									c.panoInstance.ud({
										heading: m,
										pitch: 0
									})
								})
							})
						}
						d()
					}) : d()
				})
			}
		},
		UQ: function(a, b, c, d) {
			var c = c || "",
				e;
			!d || !a.split(d)[0] ? (d = a, a = "") : (d = a.split(d)[0], e = d.lastIndexOf("<"), d = a.substring(0, e), a = a.substring(e));
			e = [];
			var f = Td.Yt.width,
				g = Td.Yt.height;
			e.push(d);
			e.push("<div id='infoWndPano' class='panoInfoBox' style='height:" + g + "px;width:" + f + "px; margin-top: -19px;'>");
			e.push("<img class='pano_thumnail_img' width='" + f + "' height='" + g + "' border='0' alt='" + c + "\u5916\u666f' title='" + c + "\u5916\u666f' src='" + b + "' onerror='Pano.PanoEntranceUtil.thumbnailNotFound(this, " + f + ", " + g + ");' />");
			e.push("<div class='panoInfoBoxTitleBg' style='width:" + f + "px;'></div><a href='javascript:void(0)' class='panoInfoBoxTitleContent' >\u8fdb\u5165\u5168\u666f&gt;&gt;</a>");
			e.push("</div>");
			e.push(a);
			return e.join("")
		},
		TQ: function(a, b) {
			var c = 90 - 180 * Math.atan2(a.y - b.y, a.x - b.x) / Math.PI;
			0 > c && (c += 360);
			return c
		},
		wK: function(a, b, c, d, e) {
			var f = {
				panoId: a,
				panoHeading: b || 0,
				panoPitch: c || 0,
				width: d,
				height: e
			};
			return (Td.bu + "?qt=pr3d&fovy=75&quality=80&panoid={panoId}&heading={panoHeading}&pitch={panoPitch}&width={width}&height={height}").replace(/\{(.*?)\}/g, function(a, b) {
				return f[b]
			})
		}
	});
	var Ud = document,
		Vd = Math,
		Wd = Ud.createElement("div").style,
		Xd;
	a: {
		for (var Yd = ["t", "webkitT", "MozT", "msT", "OT"], ae, be = 0, ce = Yd.length; be < ce; be++)
			if (ae = Yd[be] + "ransform", ae in Wd) {
				Xd = Yd[be].substr(0, Yd[be].length - 1);
				break a
			}
		Xd = q
	}
	var de = Xd ? "-" + Xd.toLowerCase() + "-" : "",
		fe = ee("transform"),
		ge = ee("transitionProperty"),
		he = ee("transitionDuration"),
		ie = ee("transformOrigin"),
		je = ee("transitionTimingFunction"),
		ke = ee("transitionDelay"),
		xd = /android/gi.test(navigator.appVersion),
		le = /iphone|ipad/gi.test(navigator.appVersion),
		ne = /hp-tablet/gi.test(navigator.appVersion),
		oe = ee("perspective") in Wd,
		pe = "ontouchstart" in window && !ne,
		qe = Xd !== q,
		re = ee("transition") in Wd,
		se = "onorientationchange" in window ? "orientationchange" : "resize",
		te = pe ? "touchstart" : "mousedown",
		ue = pe ? "touchmove" : "mousemove",
		ve = pe ? "touchend" : "mouseup",
		we = pe ? "touchcancel" : "mouseup",
		xe = Xd === q ? q : {
			"": "transitionend",
			webkit: "webkitTransitionEnd",
			Moz: "transitionend",
			O: "otransitionend",
			ms: "MSTransitionEnd"
		}[Xd],
		ye = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
			return setTimeout(a, 1)
		},
		ze = window.cancelRequestAnimationFrame || window.X2 || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout,
		Ae = oe ? " translateZ(0)" : "";

	function Be(a, b) {
		var c = this,
			d;
		c.Um = "object" == typeof a ? a : Ud.getElementById(a);
		c.Um.style.overflow = "hidden";
		c.Bb = c.Um.children[0];
		c.options = {
			Lo: o,
			Sm: o,
			x: 0,
			y: 0,
			co: o,
			$T: q,
			ox: o,
			TD: o,
			zk: o,
			mi: q,
			sZ: 0,
			Xv: q,
			Tw: o,
			Yh: o,
			ni: o,
			LC: xd,
			Ww: le,
			pV: le && oe,
			zE: "",
			zoom: q,
			Ak: 1,
			Ap: 4,
			YU: 2,
			PN: "scroll",
			xt: q,
			Yx: 1,
			dM: p,
			WL: function(a) {
				a.preventDefault()
			},
			gM: p,
			VL: p,
			fM: p,
			UL: p,
			vx: p,
			hM: p,
			ZL: p,
			Xo: p,
			iM: p,
			Wo: p
		};
		for (d in b) c.options[d] = b[d];
		c.x = c.options.x;
		c.y = c.options.y;
		c.options.zk = qe && c.options.zk;
		c.options.Yh = c.options.Lo && c.options.Yh;
		c.options.ni = c.options.Sm && c.options.ni;
		c.options.zoom = c.options.zk && c.options.zoom;
		c.options.mi = re && c.options.mi;
		c.options.zoom && xd && (Ae = "");
		c.Bb.style[ge] = c.options.zk ? de + "transform" : "top left";
		c.Bb.style[he] = "0";
		c.Bb.style[ie] = "0 0";
		c.options.mi && (c.Bb.style[je] = "cubic-bezier(0.33,0.66,0.66,1)");
		c.options.zk ? c.Bb.style[fe] = "translate(" + c.x + "px," + c.y + "px)" + Ae : c.Bb.style.cssText += ";position:absolute;top:" + c.y + "px;left:" + c.x + "px";
		c.options.mi && (c.options.LC = o);
		c.refresh();
		c.P(se, window);
		c.P(te);
		!pe && "none" != c.options.PN && (c.P("DOMMouseScroll"), c.P("mousewheel"));
		c.options.Xv && (c.hU = setInterval(function() {
			c.lP()
		}, 500));
		this.options.Tw && (Event.prototype.stopImmediatePropagation || (document.body.removeEventListener = function(a, b, c) {
			var d = Node.prototype.removeEventListener;
			a === "click" ? d.call(document.body, a, b.PK || b, c) : d.call(document.body, a, b, c)
		}, document.body.addEventListener = function(a, b, c) {
			var d = Node.prototype.addEventListener;
			a === "click" ? d.call(document.body, a, b.PK || (b.PK = function(a) {
				a.YX || b(a)
			}), c) : d.call(document.body, a, b, c)
		}), c.P("click", document.body, o))
	}
	Be.prototype = {
		enabled: o,
		x: 0,
		y: 0,
		mj: [],
		scale: 1,
		SB: 0,
		TB: 0,
		Ee: [],
		bf: [],
		oB: p,
		jy: 0,
		handleEvent: function(a) {
			switch (a.type) {
				case te:
					if (!pe && 0 !== a.button) break;
					this.mv(a);
					break;
				case ue:
					this.RR(a);
					break;
				case ve:
				case we:
					this.zu(a);
					break;
				case se:
					this.IA();
					break;
				case "DOMMouseScroll":
				case "mousewheel":
					this.vT(a);
					break;
				case xe:
					this.rT(a);
					break;
				case "click":
					this.vP(a)
			}
		},
		lP: function() {
			!this.ah && (!this.Bk && !(this.Al || this.Ox == this.Bb.offsetWidth * this.scale && this.hp == this.Bb.offsetHeight * this.scale)) && this.refresh()
		},
		cv: function(a) {
			var b;
			this[a + "Scrollbar"] ? (this[a + "ScrollbarWrapper"] || (b = Ud.createElement("div"), this.options.zE ? b.className = this.options.zE + a.toUpperCase() : b.style.cssText = "position:absolute;z-index:100;" + ("h" == a ? "height:7px;bottom:1px;left:2px;right:" + (this.ni ? "7" : "2") + "px" : "width:7px;bottom:" + (this.Yh ? "7" : "2") + "px;top:2px;right:1px"), b.style.cssText += ";pointer-events:none;" + de + "transition-property:opacity;" + de + "transition-duration:" + (this.options.pV ? "350ms" : "0") + ";overflow:hidden;opacity:" + (this.options.Ww ? "0" : "1"), this.Um.appendChild(b), this[a + "ScrollbarWrapper"] = b, b = Ud.createElement("div"), this.options.zE || (b.style.cssText = "position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);" + de + "background-clip:padding-box;" + de + "box-sizing:border-box;" + ("h" == a ? "height:100%" : "width:100%") + ";" + de + "border-radius:3px;border-radius:3px"), b.style.cssText += ";pointer-events:none;" + de + "transition-property:" + de + "transform;" + de + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);" + de + "transition-duration:0;" + de + "transform: translate(0,0)" + Ae, this.options.mi && (b.style.cssText += ";" + de + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"), this[a + "ScrollbarWrapper"].appendChild(b), this[a + "ScrollbarIndicator"] = b), "h" == a ? (this.KK = this.LK.clientWidth, this.GW = Vd.max(Vd.round(this.KK * this.KK / this.Ox), 8), this.FW.style.width = this.GW + "px") : (this.HN = this.IN.clientHeight, this.NZ = Vd.max(Vd.round(this.HN * this.HN / this.hp), 8), this.MZ.style.height = this.NZ + "px"), this.JA(a, o)) : this[a + "ScrollbarWrapper"] && (qe && (this[a + "ScrollbarIndicator"].style[fe] = ""), this[a + "ScrollbarWrapper"].parentNode.removeChild(this[a + "ScrollbarWrapper"]), this[a + "ScrollbarWrapper"] = p, this[a + "ScrollbarIndicator"] = p)
		},
		IA: function() {
			var a = this;
			setTimeout(function() {
				a.refresh()
			}, xd ? 200 : 0)
		},
		Wq: function(a, b) {
			this.Bk || (a = this.Lo ? a : 0, b = this.Sm ? b : 0, this.options.zk ? this.Bb.style[fe] = "translate(" + a + "px," + b + "px) scale(" + this.scale + ")" + Ae : (a = Vd.round(a), b = Vd.round(b), this.Bb.style.left = a + "px", this.Bb.style.top = b + "px"), this.x = a, this.y = b, this.JA("h"), this.JA("v"))
		},
		JA: function(a, b) {
			var c = "h" == a ? this.x : this.y;
			this[a + "Scrollbar"] && (c *= this[a + "ScrollbarProp"], 0 > c ? (this.options.LC || (c = this[a + "ScrollbarIndicatorSize"] + Vd.round(3 * c), 8 > c && (c = 8), this[a + "ScrollbarIndicator"].style["h" == a ? "width" : "height"] = c + "px"), c = 0) : c > this[a + "ScrollbarMaxScroll"] && (this.options.LC ? c = this[a + "ScrollbarMaxScroll"] : (c = this[a + "ScrollbarIndicatorSize"] - Vd.round(3 * (c - this[a + "ScrollbarMaxScroll"])), 8 > c && (c = 8), this[a + "ScrollbarIndicator"].style["h" == a ? "width" : "height"] = c + "px", c = this[a + "ScrollbarMaxScroll"] + (this[a + "ScrollbarIndicatorSize"] - c))), this[a + "ScrollbarWrapper"].style[ke] = "0", this[a + "ScrollbarWrapper"].style.opacity = b && this.options.Ww ? "0" : "1", this[a + "ScrollbarIndicator"].style[fe] = "translate(" + ("h" == a ? c + "px,0)" : "0," + c + "px)") + Ae)
		},
		vP: function(a) {
			if (a.rQ === o) return this.gB = a.target, this.yw = Date.now(), o;
			if (this.gB && this.yw) {
				if (600 < Date.now() - this.yw) return this.yw = this.gB = p, o
			} else {
				for (var b = a.target; b != this.Bb && b != document.body;) b = b.parentNode;
				if (b == document.body) return o
			}
			for (b = a.target; 1 != b.nodeType;) b = b.parentNode;
			b = b.tagName.toLowerCase();
			if ("select" != b && "input" != b && "textarea" != b) return a.stopImmediatePropagation ? a.stopImmediatePropagation() : a.YX = o, a.stopPropagation(), a.preventDefault(), this.yw = this.gB = p, q
		},
		mv: function(a) {
			var b = pe ? a.touches[0] : a,
				c, d;
			if (this.enabled) {
				this.options.WL && this.options.WL.call(this, a);
				(this.options.mi || this.options.zoom) && this.tI(0);
				this.Bk = this.Al = this.ah = q;
				this.bC = this.aC = this.Ev = this.Dv = this.hC = this.gC = 0;
				this.options.zoom && (pe && 1 < a.touches.length) && (d = Vd.abs(a.touches[0].pageX - a.touches[1].pageX), c = Vd.abs(a.touches[0].pageY - a.touches[1].pageY), this.uZ = Vd.sqrt(d * d + c * c), this.xx = Vd.abs(a.touches[0].pageX + a.touches[1].pageX - 2 * this.eF) / 2 - this.x, this.yx = Vd.abs(a.touches[0].pageY + a.touches[1].pageY - 2 * this.fF) / 2 - this.y, this.options.Xo && this.options.Xo.call(this, a));
				if (this.options.ox && (this.options.zk ? (c = getComputedStyle(this.Bb, p)[fe].replace(/[^0-9\-.,]/g, "").split(","), d = +(c[12] || c[4]), c = +(c[13] || c[5])) : (d = +getComputedStyle(this.Bb, p).left.replace(/[^0-9-]/g, ""), c = +getComputedStyle(this.Bb, p).top.replace(/[^0-9-]/g, "")), d != this.x || c != this.y)) this.options.mi ? this.Hd(xe) : ze(this.oB), this.mj = [], this.Wq(d, c), this.options.vx && this.options.vx.call(this);
				this.Fv = this.x;
				this.Gv = this.y;
				this.At = this.x;
				this.Bt = this.y;
				this.eh = b.pageX;
				this.fh = b.pageY;
				this.startTime = a.timeStamp || Date.now();
				this.options.gM && this.options.gM.call(this, a);
				this.P(ue, window);
				this.P(ve, window);
				this.P(we, window)
			}
		},
		RR: function(a) {
			var b = pe ? a.touches[0] : a,
				c = b.pageX - this.eh,
				d = b.pageY - this.fh,
				e = this.x + c,
				f = this.y + d,
				g = a.timeStamp || Date.now();
			this.options.VL && this.options.VL.call(this, a);
			if (this.options.zoom && pe && 1 < a.touches.length) e = Vd.abs(a.touches[0].pageX - a.touches[1].pageX), f = Vd.abs(a.touches[0].pageY - a.touches[1].pageY), this.tZ = Vd.sqrt(e * e + f * f), this.Bk = o, b = 1 / this.uZ * this.tZ * this.scale, b < this.options.Ak ? b = 0.5 * this.options.Ak * Math.pow(2, b / this.options.Ak) : b > this.options.Ap && (b = 2 * this.options.Ap * Math.pow(0.5, this.options.Ap / b)), this.Ro = b / this.scale, e = this.xx - this.xx * this.Ro + this.x, f = this.yx - this.yx * this.Ro + this.y, this.Bb.style[fe] = "translate(" + e + "px," + f + "px) scale(" + b + ")" + Ae, this.options.iM && this.options.iM.call(this, a);
			else {
				this.eh = b.pageX;
				this.fh = b.pageY;
				if (0 < e || e < this.Td) e = this.options.co ? this.x + c / 2 : 0 <= e || 0 <= this.Td ? 0 : this.Td;
				if (f > this.$e || f < this.$c) f = this.options.co ? this.y + d / 2 : f >= this.$e || 0 <= this.$c ? this.$e : this.$c;
				this.gC += c;
				this.hC += d;
				this.Dv = Vd.abs(this.gC);
				this.Ev = Vd.abs(this.hC);
				6 > this.Dv && 6 > this.Ev || (this.options.TD && (this.Dv > this.Ev + 5 ? (f = this.y, d = 0) : this.Ev > this.Dv + 5 && (e = this.x, c = 0)), this.ah = o, this.Wq(e, f), this.aC = 0 < c ? -1 : 0 > c ? 1 : 0, this.bC = 0 < d ? -1 : 0 > d ? 1 : 0, 300 < g - this.startTime && (this.startTime = g, this.At = this.x, this.Bt = this.y), this.options.fM && this.options.fM.call(this, a))
			}
		},
		zu: function(a) {
			if (!(pe && 0 !== a.touches.length)) {
				var b = this,
					c = pe ? a.changedTouches[0] : a,
					d, e, f = {
						oa: 0,
						time: 0
					},
					g = {
						oa: 0,
						time: 0
					},
					i = (a.timeStamp || Date.now()) - b.startTime;
				d = b.x;
				e = b.y;
				b.Hd(ue, window);
				b.Hd(ve, window);
				b.Hd(we, window);
				b.options.UL && b.options.UL.call(b, a);
				if (b.Bk) d = b.scale * b.Ro, d = Math.max(b.options.Ak, d), d = Math.min(b.options.Ap, d), b.Ro = d / b.scale, b.scale = d, b.x = b.xx - b.xx * b.Ro + b.x, b.y = b.yx - b.yx * b.Ro + b.y, b.Bb.style[he] = "200ms", b.Bb.style[fe] = "translate(" + b.x + "px," + b.y + "px) scale(" + b.scale + ")" + Ae, b.Bk = q, b.refresh(), b.options.Wo && b.options.Wo.call(b, a);
				else {
					if (b.ah) {
						if (300 > i && b.options.ox) {
							f = d ? b.rH(d - b.At, i, -b.x, b.Ox - b.Qt + b.x, b.options.co ? b.Qt : 0) : f;
							g = e ? b.rH(e - b.Bt, i, -b.y, 0 > b.$c ? b.hp - b.Vm + b.y - b.$e : 0, b.options.co ? b.Vm : 0) : g;
							d = b.x + f.oa;
							e = b.y + g.oa;
							if (0 < b.x && 0 < d || b.x < b.Td && d < b.Td) f = {
								oa: 0,
								time: 0
							};
							if (b.y > b.$e && e > b.$e || b.y < b.$c && e < b.$c) g = {
								oa: 0,
								time: 0
							}
						}
						f.oa || g.oa ? (c = Vd.max(Vd.max(f.time, g.time), 10), b.options.xt && (f = d - b.Fv, g = e - b.Gv, Vd.abs(f) < b.options.Yx && Vd.abs(g) < b.options.Yx ? b.scrollTo(b.Fv, b.Gv, 200) : (f = b.kI(d, e), d = f.x, e = f.y, c = Vd.max(f.time, c))), b.scrollTo(Vd.round(d), Vd.round(e), c)) : b.options.xt ? (f = d - b.Fv, g = e - b.Gv, Vd.abs(f) < b.options.Yx && Vd.abs(g) < b.options.Yx ? b.scrollTo(b.Fv, b.Gv, 200) : (f = b.kI(b.x, b.y), (f.x != b.x || f.y != b.y) && b.scrollTo(f.x, f.y, f.time))) : b.Kn(200)
					} else {
						if (pe)
							if (b.HJ && b.options.zoom) clearTimeout(b.HJ), b.HJ = p, b.options.Xo && b.options.Xo.call(b, a), b.zoom(b.eh, b.fh, 1 == b.scale ? b.options.YU : 1), b.options.Wo && setTimeout(function() {
								b.options.Wo.call(b, a)
							}, 200);
							else if (this.options.Tw) {
							for (d = c.target; 1 != d.nodeType;) d = d.parentNode;
							e = d.tagName.toLowerCase();
							"select" != e && "input" != e && "textarea" != e ? (e = Ud.createEvent("MouseEvents"), e.initMouseEvent("click", o, o, a.view, 1, c.screenX, c.screenY, c.clientX, c.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, 0, p), e.rQ = o, d.dispatchEvent(e)) : d.focus()
						}
						b.Kn(400)
					}
					b.options.hM && b.options.hM.call(b, a)
				}
			}
		},
		Kn: function(a) {
			var b = 0 <= this.x ? 0 : this.x < this.Td ? this.Td : this.x,
				c = this.y >= this.$e || 0 < this.$c ? this.$e : this.y < this.$c ? this.$c : this.y;
			if (b == this.x && c == this.y) {
				if (this.ah && (this.ah = q, this.options.vx && this.options.vx.call(this)), this.Yh && this.options.Ww && ("webkit" == Xd && (this.LK.style[ke] = "300ms"), this.LK.style.opacity = "0"), this.ni && this.options.Ww) "webkit" == Xd && (this.IN.style[ke] = "300ms"), this.IN.style.opacity = "0"
			} else this.scrollTo(b, c, a || 0)
		},
		vT: function(a) {
			var b = this,
				c, d;
			if ("wheelDeltaX" in a) c = a.wheelDeltaX / 12, d = a.wheelDeltaY / 12;
			else if ("wheelDelta" in a) c = d = a.wheelDelta / 12;
			else if ("detail" in a) c = d = 3 * -a.detail;
			else return; if ("zoom" == b.options.PN) {
				if (d = b.scale * Math.pow(2, 1 / 3 * (d ? d / Math.abs(d) : 0)), d < b.options.Ak && (d = b.options.Ak), d > b.options.Ap && (d = b.options.Ap), d != b.scale) !b.jy && b.options.Xo && b.options.Xo.call(b, a), b.jy++, b.zoom(a.pageX, a.pageY, d, 400), setTimeout(function() {
					b.jy--;
					!b.jy && b.options.Wo && b.options.Wo.call(b, a)
				}, 400)
			} else c = b.x + c, d = b.y + d, 0 < c ? c = 0 : c < b.Td && (c = b.Td), d > b.$e ? d = b.$e : d < b.$c && (d = b.$c), 0 > b.$c && b.scrollTo(c, d, 0)
		},
		rT: function(a) {
			a.target == this.Bb && (this.Hd(xe), this.VA())
		},
		VA: function() {
			var a = this,
				b = a.x,
				c = a.y,
				d = Date.now(),
				e, f, g;
			a.Al || (a.mj.length ? (e = a.mj.shift(), e.x == b && e.y == c && (e.time = 0), a.Al = o, a.ah = o, a.options.mi) ? (a.tI(e.time), a.Wq(e.x, e.y), a.Al = q, e.time ? a.P(xe) : a.Kn(0)) : (g = function() {
				var i = Date.now(),
					k;
				if (i >= d + e.time) {
					a.Wq(e.x, e.y);
					a.Al = q;
					a.options.FX && a.options.FX.call(a);
					a.VA()
				} else {
					i = (i - d) / e.time - 1;
					f = Vd.sqrt(1 - i * i);
					i = (e.x - b) * f + b;
					k = (e.y - c) * f + c;
					a.Wq(i, k);
					if (a.Al) a.oB = ye(g)
				}
			}, g()) : a.Kn(400))
		},
		tI: function(a) {
			a += "ms";
			this.Bb.style[he] = a;
			this.Yh && (this.FW.style[he] = a);
			this.ni && (this.MZ.style[he] = a)
		},
		rH: function(a, b, c, d, e) {
			var b = Vd.abs(a) / b,
				f = b * b / 0.0012;
			0 < a && f > c ? (c += e / (6 / (6.0E-4 * (f / b))), b = b * c / f, f = c) : 0 > a && f > d && (d += e / (6 / (6.0E-4 * (f / b))), b = b * d / f, f = d);
			return {
				oa: f * (0 > a ? -1 : 1),
				time: Vd.round(b / 6.0E-4)
			}
		},
		Ij: function(a) {
			for (var b = -a.offsetLeft, c = -a.offsetTop; a = a.offsetParent;) b -= a.offsetLeft, c -= a.offsetTop;
			a != this.Um && (b *= this.scale, c *= this.scale);
			return {
				left: b,
				top: c
			}
		},
		kI: function(a, b) {
			var c, d, e;
			e = this.Ee.length - 1;
			c = 0;
			for (d = this.Ee.length; c < d; c++)
				if (a >= this.Ee[c]) {
					e = c;
					break
				}
			e == this.SB && (0 < e && 0 > this.aC) && e--;
			a = this.Ee[e];
			d = (d = Vd.abs(a - this.Ee[this.SB])) ? 500 * (Vd.abs(this.x - a) / d) : 0;
			this.SB = e;
			e = this.bf.length - 1;
			for (c = 0; c < e; c++)
				if (b >= this.bf[c]) {
					e = c;
					break
				}
			e == this.TB && (0 < e && 0 > this.bC) && e--;
			b = this.bf[e];
			c = (c = Vd.abs(b - this.bf[this.TB])) ? 500 * (Vd.abs(this.y - b) / c) : 0;
			this.TB = e;
			e = Vd.round(Vd.max(d, c)) || 200;
			return {
				x: a,
				y: b,
				time: e
			}
		},
		P: function(a, b, c) {
			(b || this.Bb).addEventListener(a, this, !!c)
		},
		Hd: function(a, b, c) {
			(b || this.Bb).removeEventListener(a, this, !!c)
		},
		YB: ga(2),
		refresh: function() {
			var a, b, c, d = 0;
			b = 0;
			this.scale < this.options.Ak && (this.scale = this.options.Ak);
			this.Qt = this.Um.clientWidth || 1;
			this.Vm = this.Um.clientHeight || 1;
			this.$e = -this.options.sZ || 0;
			this.Ox = Vd.round(this.Bb.offsetWidth * this.scale);
			this.hp = Vd.round((this.Bb.offsetHeight + this.$e) * this.scale);
			this.Td = this.Qt - this.Ox;
			this.$c = this.Vm - this.hp + this.$e;
			this.bC = this.aC = 0;
			this.options.dM && this.options.dM.call(this);
			this.Lo = this.options.Lo && 0 > this.Td;
			this.Sm = this.options.Sm && (!this.options.$T && !this.Lo || this.hp > this.Vm);
			this.Yh = this.Lo && this.options.Yh;
			this.ni = this.Sm && this.options.ni && this.hp > this.Vm;
			a = this.Ij(this.Um);
			this.eF = -a.left;
			this.fF = -a.top;
			if ("string" == typeof this.options.xt) {
				this.Ee = [];
				this.bf = [];
				c = this.Bb.querySelectorAll(this.options.xt);
				a = 0;
				for (b = c.length; a < b; a++) d = this.Ij(c[a]), d.left += this.eF, d.top += this.fF, this.Ee[a] = d.left < this.Td ? this.Td : d.left * this.scale, this.bf[a] = d.top < this.$c ? this.$c : d.top * this.scale
			} else if (this.options.xt) {
				for (this.Ee = []; d >= this.Td;) this.Ee[b] = d, d -= this.Qt, b++;
				this.Td % this.Qt && (this.Ee[this.Ee.length] = this.Td - this.Ee[this.Ee.length - 1] + this.Ee[this.Ee.length - 1]);
				b = d = 0;
				for (this.bf = []; d >= this.$c;) this.bf[b] = d, d -= this.Vm, b++;
				this.$c % this.Vm && (this.bf[this.bf.length] = this.$c - this.bf[this.bf.length - 1] + this.bf[this.bf.length - 1])
			}
			this.cv("h");
			this.cv("v");
			this.Bk || (this.Bb.style[he] = "0", this.Kn(400))
		},
		scrollTo: function(a, b, c, d) {
			var e = a;
			this.stop();
			e.length || (e = [{
				x: a,
				y: b,
				time: c,
				ZX: d
			}]);
			a = 0;
			for (b = e.length; a < b; a++) e[a].ZX && (e[a].x = this.x - e[a].x, e[a].y = this.y - e[a].y), this.mj.push({
				x: e[a].x,
				y: e[a].y,
				time: e[a].time || 0
			});
			this.VA()
		},
		disable: function() {
			this.stop();
			this.Kn(0);
			this.enabled = q;
			this.Hd(ue, window);
			this.Hd(ve, window);
			this.Hd(we, window)
		},
		enable: function() {
			this.enabled = o
		},
		stop: function() {
			this.options.mi ? this.Hd(xe) : ze(this.oB);
			this.mj = [];
			this.Al = this.ah = q
		},
		zoom: function(a, b, c, d) {
			var e = c / this.scale;
			this.options.zk && (this.Bk = o, d = d === j ? 200 : d, a = a - this.eF - this.x, b = b - this.fF - this.y, this.x = a - a * e + this.x, this.y = b - b * e + this.y, this.scale = c, this.refresh(), this.x = 0 < this.x ? 0 : this.x < this.Td ? this.Td : this.x, this.y = this.y > this.$e ? this.$e : this.y < this.$c ? this.$c : this.y, this.Bb.style[he] = d + "ms", this.Bb.style[fe] = "translate(" + this.x + "px," + this.y + "px) scale(" + c + ")" + Ae, this.Bk = q)
		}
	};

	function ee(a) {
		if ("" === Xd) return a;
		a = a.charAt(0).toUpperCase() + a.substr(1);
		return Xd + a
	}
	Wd = p;

	function Ce(a) {
		this.k = {
			anchor: Vb,
			offset: new L(0, 0),
			maxWidth: "100%",
			imageHeight: 80
		};
		var a = a || {},
			b;
		for (b in a) this.k[b] = a[b];
		this.ml = new ac(p, {
			Af: "api"
		});
		this.Jj = [];
		this.G = p;
		this.Sf = {
			height: this.k.imageHeight,
			width: this.k.imageHeight * De
		};
		this.Dc = this.KA = this.Gl = this.Mc = p
	}
	var Ee = [0, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 5, 5, 5, 6, 6, 7, 8, 8, 8, 9],
		Fe = "\u5176\u4ed6 \u6b63\u95e8 \u623f\u578b \u8bbe\u65bd \u6b63\u95e8 \u9910\u996e\u8bbe\u65bd \u5176\u4ed6\u8bbe\u65bd \u6b63\u95e8 \u8bbe\u65bd \u89c2\u5f71\u5385 \u5176\u4ed6\u8bbe\u65bd".split(" ");
	z.ym(function(a) {
		var b = p;
		a.addEventListener("position_changed", function() {
			a.k.albumsControl === o && (b ? b.Ix(a.Lb()) : (b = new Ce(a.k.albumsControlOptions), b.fa(a)))
		});
		a.addEventListener("albums_visible_changed", function() {
			a.k.albumsControl === o ? (b ? b.Ix(a.Lb()) : (b = new Ce(a.k.albumsControlOptions), b.fa(a)), b.show()) : b.J()
		});
		a.addEventListener("albums_options_changed", function() {
			b && b.mp(a.k.albumsControlOptions)
		});
		a.addEventListener("visible_changed", function() {
			b && (a.rD() ? a.k.albumsControl === o && (b.A.style.visibility = "visible") : b.A.style.visibility = "hidden")
		})
	});
	var De = 1.8;
	G() && (De = 1);
	w.extend(Ce.prototype, {
		mp: function(a) {
			for (var b in a) this.k[b] = a[b];
			a = this.k.imageHeight + "px";
			this.nc(this.k.anchor);
			this.A.style.width = isNaN(Number(this.k.maxWidth)) === o ? this.k.maxWidth : this.k.maxWidth + "px";
			this.A.style.height = a;
			this.Nj.style.height = a;
			this.Ih.style.height = a;
			this.Sf = {
				height: this.k.imageHeight,
				width: this.k.imageHeight * De
			};
			this.Mj.style.height = this.Sf.height - 6 + "px";
			this.Mj.style.width = this.Sf.width - 6 + "px";
			this.Ix(this.G.Lb(), o)
		},
		fa: function(a) {
			this.G = a;
			this.Fr();
			this.WO();
			this.SW();
			this.Ix(a.Lb())
		},
		Fr: function() {
			var a = this.k.imageHeight + "px";
			this.A = K("div");
			var b = this.A.style;
			b.cssText = "background:rgb(37,37,37);background:rgba(37,37,37,0.9);";
			b.position = "absolute";
			b.zIndex = "2000";
			b.width = isNaN(Number(this.k.maxWidth)) === o ? this.k.maxWidth : this.k.maxWidth + "px";
			b.padding = "8px 0";
			b.visibility = "hidden";
			b.height = a;
			this.Nj = K("div");
			b = this.Nj.style;
			b.position = "absolute";
			b.overflow = "hidden";
			b.width = "100%";
			b.height = a;
			this.Ih = K("div");
			b = this.Ih.style;
			b.height = a;
			this.Nj.appendChild(this.Ih);
			this.A.appendChild(this.Nj);
			this.G.A.appendChild(this.A);
			this.Mj = K("div", {
				"class": "pano_photo_item_seleted"
			});
			this.Mj.style.height = this.Sf.height - 6 + "px";
			this.Mj.style.width = this.Sf.width - 6 + "px";
			this.nc(this.k.anchor)
		},
		MG: function(a) {
			for (var b = this.Jj, c = b.length - 1; 0 <= c; c--)
				if (b[c].panoId == a) return c;
			return -1
		},
		Ix: function(a, b) {
			if (b || !this.Jj[this.Mc] || !(this.Jj[this.Mc].panoId == a && 3 !== this.Jj[this.Mc].recoType)) {
				var c = this,
					d = this.MG(a);
				!b && -1 !== d && this.Jj[d] && 3 !== this.Jj[d].recoType ? this.lp(d) : this.iW(function(a) {
					for (var b = {}, d, i, k = q, l = [], m = 0, n = a.length; m < n; m++) d = a[m].catlog, i = a[m].floor, j !== d && ("" === d && j !== i ? (k = o, b[i] || (b[i] = []), b[i].push(a[m])) : (b[Ee[d]] || (b[Ee[d]] = []), b[Ee[d]].push(a[m])));
					for (var u in b) k ? l.push({
						data: u + "F",
						index: u
					}) : l.push({
						data: Fe[u],
						index: u
					});
					c.eG = b;
					c.Bi = l;
					c.il(a);
					0 == a.length ? c.J() : c.show()
				})
			}
		},
		FU: function() {
			if (!this.xi) {
				var a = this.XV(this.Bi),
					b = K("div");
				b.style.cssText = ["width:" + 134 * this.Bi.length + "px;", "overflow:hidden;-ms-user-select:none;-moz-user-select:none;-webkit-user-select:none;"].join("");
				b.innerHTML = a;
				a = K("div");
				a.appendChild(b);
				a.style.cssText = "position:absolute;top:-25px;background:rgb(37,37,37);background:rgba(37,37,37,0.9);border-bottom:1px solid #4e596a;width:100%;line-height:25px;height:25px;overflow:scroll;outline:0";
				new Be(a, {
					co: q,
					ox: o,
					Yh: q,
					ni: q,
					Sm: q,
					TD: o,
					Xv: o,
					Tw: o
				});
				this.A.appendChild(a);
				for (var c = this, d = b.getElementsByTagName("span"), e = 0, f = d.length; e < f; e++) b = d[e], w.F(b, "click", function() {
					if (this.getAttribute("dataindex")) {
						c.il(c.eG[this.getAttribute("dataindex")]);
						for (var a = 0, b = d.length; a < b; a++) d[a].style.color = "#FFFFFF";
						this.style.color = "#3383FF"
					}
				});
				this.xi = a
			}
		},
		CU: function() {
			if (this.xi) a = this.lK(this.Bi), this.kP.innerHTML = a;
			else {
				var a = this.lK(this.Bi),
					b = K("ul"),
					c = this;
				b.style.cssText = "list-style: none;padding:0px;margin:0px;display:block;width:60px;position:absolute;top:7px";
				b.innerHTML = a;
				w.F(b, "click", function(a) {
					if (a = (a.srcElement || a.target).getAttribute("dataindex")) {
						c.il(c.eG[a]);
						for (var d = b.getElementsByTagName("li"), e = 0, f = d.length; e < f; e++) d[e].childNodes[0].getAttribute("dataindex") === a ? w.B.Oa(d[e], "pano_catlogLiActive") : w.B.Pb(d[e], "pano_catlogLiActive")
					}
				});
				var a = K("div"),
					d = K("a"),
					e = K("span"),
					f = K("a"),
					g = K("span"),
					i = ["background:url(" + F.ea + "panorama/catlog_icon.png) no-repeat;", "display:block;width:10px;height:7px;margin:0 auto;"].join("");
				e.style.cssText = i + "background-position:-18px 0;";
				d.style.cssText = "background:#1C1C1C;display:block;position:absolute;width:58px;";
				g.style.cssText = i + "background-position:0 0;";
				f.style.cssText = "background:#1C1C1C;display:block;position:absolute;width:58px;";
				f.style.top = this.k.imageHeight - 7 + "px";
				a.style.cssText = "position:absolute;top:0px;left:0px;width:60px;";
				d.appendChild(e);
				f.appendChild(g);
				w.F(d, "mouseover", function() {
					var a = parseInt(b.style.top, 10);
					7 !== a && (e.style.backgroundPosition = "-27px 0");
					new sb({
						wc: 60,
						Xb: tb.$r,
						duration: 300,
						ja: function(c) {
							b.style.top = a + (7 - a) * c + "px"
						}
					})
				});
				w.F(d, "mouseout", function() {
					e.style.backgroundPosition = "-18px 0"
				});
				w.F(f, "mouseover", function() {
					var a = parseInt(b.style.top, 10),
						d = c.k.imageHeight - 14;
					if (!(parseInt(b.offsetHeight, 10) < d)) {
						var e = d - parseInt(b.offsetHeight, 10) + 7;
						e !== a && (g.style.backgroundPosition = "-9px 0");
						new sb({
							wc: 60,
							Xb: tb.$r,
							duration: 300,
							ja: function(c) {
								b.style.top = a + (e - a) * c + "px"
							}
						})
					}
				});
				w.F(f, "mouseout", function() {
					g.style.backgroundPosition = "0 0"
				});
				a.appendChild(d);
				a.appendChild(f);
				d = K("div");
				d.style.cssText = ["position:absolute;z-index:2001;left:20px;", "height:" + this.k.imageHeight + "px;", "width:62px;overflow:hidden;background:rgb(37,37,37);background:rgba(37,37,37,0.9);"].join("");
				d.appendChild(b);
				d.appendChild(a);
				this.xi = d;
				this.kP = b;
				this.A.appendChild(d)
			}
		},
		DU: function() {
			if (this.Bi && !(0 >= this.Bi.length)) {
				var a = K("div");
				a.innerHTML = this.rz;
				a.style.cssText = "position:absolute;background:#252525";
				this.A.appendChild(a);
				this.ds = a;
				this.Dc.Tf.style.left = this.Sf.width + 8 + "px";
				this.xi && (this.xi.style.left = parseInt(this.xi.style.left, 10) + this.Sf.width + 8 + "px");
				var b = this;
				w.F(a, "click", function() {
					b.G.dc(b.mV)
				})
			}
		},
		il: function(a) {
			this.Jj = a;
			this.k.showCatalog && (0 < this.Bi.length ? (Sa() ? this.CU() : this.FU(), this.Dc.offsetLeft = 60) : (this.ds && (this.A.removeChild(this.ds), this.ds = p, this.Dc.Tf.style.left = "0px"), this.xi && (this.A.removeChild(this.xi), this.xi = p), this.Dc.offsetLeft = 0));
			var b = this.RV(a);
			Sa() && (this.Bi && 0 < this.Bi.length && this.k.showExit && this.rz) && (this.Dc.offsetLeft += this.Sf.width + 8, this.ds ? this.ds.innerHTML = this.rz : this.DU());
			this.Ih.innerHTML = b;
			this.Ih.style.width = (this.Sf.width + 8) * a.length + 8 + "px";
			a = this.A.offsetWidth;
			b = this.Ih.offsetWidth;
			this.Dc.is && (b += this.Dc.is());
			b < a - 2 * this.Dc.ri - this.Dc.offsetLeft ? this.A.style.width = b + this.Dc.offsetLeft + "px" : (this.A.style.width = isNaN(Number(this.k.maxWidth)) === o ? this.k.maxWidth : this.k.maxWidth + "px", b < this.A.offsetWidth - 2 * this.Dc.ri - this.Dc.offsetLeft && (this.A.style.width = b + this.Dc.offsetLeft + "px"));
			this.Dc.refresh();
			this.KA = this.Ih.children;
			this.Ih.appendChild(this.Mj);
			this.Mj.style.left = "-100000px";
			a = this.MG(this.G.Lb(), this.M_); - 1 !== a && this.lp(a)
		},
		XV: function(a) {
			for (var b = "", c, d = 0, e = a.length; d < e; d++) c = '<div style="color:white;opacity:0.5;margin:0 35px;float:left;text-align: center"><span  dataIndex="' + a[d].index + '">' + a[d].data + "</span></div>", b += c;
			return b
		},
		lK: function(a) {
			for (var b = "", c, d = 0, e = a.length; d < e; d++) c = '<li class="pano_catlogLi"><span style="display:block;width:100%;" dataIndex="' + a[d].index + '">' + a[d].data + "</span></li>", b += c;
			return b
		},
		RV: function(a) {
			for (var b, c, d, e, f = [], g = this.Sf.height, i = this.Sf.width, k = 0; k < a.length; k++) b = a[k], recoType = b.recoType, d = b.panoId, e = b.name, c = b.heading, b = b.pitch, c = Td.wK(d, c, b, 198, 108), b = '<a href="javascript:void(0);" class="pano_photo_item" data-index="' + k + '"><img style="width:' + (i - 2) + "px;height:" + (g - 2) + 'px;" data-index="' + k + '" name="' + e + '" src="' + c + '" alt="' + e + '"/><span class="pano_photo_decs" data-index="' + k + '" style="width:' + i + "px;font-size:" + Math.floor(g / 6) + "px; line-height:" + Math.floor(g / 6) + 'px;"><em class="pano_poi_' + recoType + '"></em>' + e + "</span></a>", 3 === recoType ? Sa() ? (this.rz = b, this.mV = d, a.splice(k, 1), k--) : (b = '<a href="javascript:void(0);" class="pano_photo_item" data-index="' + k + '"><img style="width:' + (i - 2) + "px;height:" + (g - 2) + 'px;" data-index="' + k + '" name="' + e + '" src="' + c + '" alt="' + e + '"/><div style="background:rgba(37,37,37,0.5);position:absolute;top:0px;left:0px;width:100%;height:100%;text-align: center;line-height:' + this.k.imageHeight + 'px;" data-index="' + k + '"><img src="' + F.ea + 'panorama/photoexit.png" style="border:none;vertical-align:middle;" data-index="' + k + '" alt=""/></div></a>', f.push(b)) : f.push(b);
			return f.join("")
		},
		iW: function(a) {
			var b = this,
				c = this.G.Lb();
			c && this.ml.Pw(c, function(d) {
				b.G.Lb() === c && a(d)
			})
		},
		nc: function(a) {
			if (!Ua(a) || isNaN(a) || a < Tb || 3 < a) a = this.defaultAnchor;
			var b = this.A,
				c = this.k.offset.width,
				d = this.k.offset.height;
			b.style.left = b.style.top = b.style.right = b.style.bottom = "auto";
			switch (a) {
				case Tb:
					b.style.top = d + "px";
					b.style.left = c + "px";
					break;
				case Ub:
					b.style.top = d + "px";
					b.style.right = c + "px";
					break;
				case Vb:
					b.style.bottom = d + "px";
					b.style.left = c + "px";
					break;
				case 3:
					b.style.bottom = d + "px", b.style.right = c + "px"
			}
		},
		WO: function() {
			this.UO()
		},
		UO: function() {
			var a = this;
			w.F(this.A, "touchstart", function(a) {
				a.stopPropagation()
			});
			w.F(this.Nj, "click", function(b) {
				if ((b = (b.srcElement || b.target).getAttribute("data-index")) && b != a.Mc) a.lp(b), a.G.dc(a.Jj[b].panoId)
			});
			w.F(this.Ih, "mouseover", function(b) {
				b = (b.srcElement || b.target).getAttribute("data-index");
				b !== p && a.pJ(b, o)
			});
			this.G.addEventListener("size_changed", function() {
				isNaN(Number(a.k.maxWidth)) && a.mp({
					maxWidth: a.k.maxWidth
				})
			})
		},
		lp: function(a) {
			this.Mj.style.left = this.KA[a].offsetLeft + 8 + "px";
			this.Mj.setAttribute("data-index", this.KA[a].getAttribute("data-index"));
			this.Mc = a;
			this.pJ(a)
		},
		pJ: function(a, b) {
			var c = this.Sf.width + 8,
				d = 0;
			this.Dc.is && (d = this.Dc.is() / 2);
			var e = this.Nj.offsetWidth - 2 * d,
				f = this.Ih.offsetLeft || this.Dc.x,
				f = f - d,
				g = -a * c;
			g > f && this.Dc.scrollTo(g + d);
			c = g - c;
			f -= e;
			c < f && (!b || b && 8 < g - f) && this.Dc.scrollTo(c + e + d)
		},
		SW: function() {
			this.Dc = G() ? new Be(this.Nj, {
				co: q,
				ox: o,
				Yh: q,
				ni: q,
				Sm: q,
				TD: o,
				Xv: o,
				Tw: o
			}) : new Ge(this.Nj)
		},
		J: function() {
			this.A.style.visibility = "hidden"
		},
		show: function() {
			this.A.style.visibility = "visible"
		}
	});

	function Ge(a) {
		this.A = a;
		this.Gg = a.children[0];
		this.lr = p;
		this.ri = 20;
		this.offsetLeft = 0;
		this.fa()
	}
	Ge.prototype = {
		fa: function() {
			this.Gg.style.position = "relative";
			this.refresh();
			this.Fr();
			this.El()
		},
		refresh: function() {
			this.Gn = this.A.offsetWidth - this.is();
			this.jA = -(this.Gg.offsetWidth - this.Gn - this.ri);
			this.Qu = this.ri + this.offsetLeft;
			this.Gg.style.left = this.Qu + "px";
			this.Gg.children[0] && (this.lr = this.Gg.children[0].offsetWidth);
			this.Tf && (this.Tf.children[0].style.marginTop = this.er.children[0].style.marginTop = this.Tf.offsetHeight / 2 - this.Tf.children[0].offsetHeight / 2 + "px")
		},
		is: function() {
			return 2 * this.ri
		},
		Fr: function() {
			this.dv = K("div");
			this.dv.innerHTML = '<a class="pano_photo_arrow_l" style="background:rgb(37,37,37);background:rgba(37,37,37,0.9);" href="javascript:void(0)" title="\u4e0a\u4e00\u9875"><span class="pano_arrow_l"></span></a><a class="pano_photo_arrow_r" style="background:rgb(37,37,37);background:rgba(37,37,37,0.9);" href="javascript:void(0)" title="\u4e0b\u4e00\u9875"><span class="pano_arrow_r"></span></a>';
			this.Tf = this.dv.children[0];
			this.er = this.dv.children[1];
			this.A.appendChild(this.dv);
			this.Tf.children[0].style.marginTop = this.er.children[0].style.marginTop = this.Tf.offsetHeight / 2 - this.Tf.children[0].offsetHeight / 2 + "px"
		},
		El: function() {
			var a = this;
			w.F(this.Tf, "click", function() {
				a.scrollTo(a.Gg.offsetLeft + a.Gn)
			});
			w.F(this.er, "click", function() {
				a.scrollTo(a.Gg.offsetLeft - a.Gn)
			})
		},
		sT: function() {
			w.B.Pb(this.Tf, "pano_arrow_disable");
			w.B.Pb(this.er, "pano_arrow_disable");
			var a = this.Gg.offsetLeft;
			a >= this.Qu && w.B.Oa(this.Tf, "pano_arrow_disable");
			a - this.Gn <= this.jA && w.B.Oa(this.er, "pano_arrow_disable")
		},
		scrollTo: function(a) {
			a = a < this.Gg.offsetLeft ? Math.ceil((a - this.ri - this.Gn) / this.lr) * this.lr + this.Gn + this.ri - 8 : Math.ceil((a - this.ri) / this.lr) * this.lr + this.ri;
			a < this.jA ? a = this.jA : a > this.Qu && (a = this.Qu);
			var b = this.Gg.offsetLeft,
				c = this;
			new sb({
				wc: 60,
				Xb: tb.$r,
				duration: 300,
				ja: function(d) {
					c.Gg.style.left = b + (a - b) * d + "px"
				},
				finish: function() {
					c.sT()
				}
			})
		}
	};
	z.Map = La;
	z.Hotspot = gb;
	z.MapType = Qc;
	z.Point = H;
	z.Pixel = P;
	z.Size = L;
	z.Bounds = db;
	z.TileLayer = Dc;
	z.Projection = fc;
	z.MercatorProjection = Q;
	z.PerspectiveProjection = fb;
	z.Copyright = function(a, b, c) {
		this.id = a;
		this.Ua = b;
		this.content = c
	};
	z.Overlay = ic;
	z.Label = qc;
	z.GroundOverlay = rc;
	z.PointCollection = vc;
	z.Marker = S;
	z.Icon = mc;
	z.IconSequence = oc;
	z.Symbol = nc;
	z.Polyline = zc;
	z.Polygon = yc;
	z.InfoWindow = pc;
	z.Circle = Ac;
	z.Control = Sb;
	z.NavigationControl = hb;
	z.GeolocationControl = Wb;
	z.OverviewMapControl = kb;
	z.CopyrightControl = Xb;
	z.ScaleControl = ib;
	z.MapTypeControl = lb;
	z.PanoramaControl = Zb;
	z.TrafficLayer = Mc;
	z.CustomLayer = mb;
	z.ContextMenu = bc;
	z.MenuItem = ec;
	z.LocalSearch = $a;
	z.TransitRoute = pd;
	z.DrivingRoute = sd;
	z.WalkingRoute = ud;
	z.Autocomplete = Ed;
	z.RouteSearch = yd;
	z.Geocoder = zd;
	z.LocalCity = Bd;
	z.Geolocation = Geolocation;
	z.Convertor = hc;
	z.BusLineSearch = Dd;
	z.Boundary = Cd;
	z.VectorCloudLayer = Kc;
	z.VectorTrafficLayer = Lc;
	z.Panorama = Na;
	z.PanoramaLabel = Kd;
	z.PanoramaService = ac;
	z.PanoramaCoverageLayer = $b;
	z.PanoramaFlashInterface = Rd;

	function R(a, b) {
		for (var c in b) a[c] = b[c]
	}
	R(window, {
		BMap: z,
		_jsload2: function(a, b) {
			ia.ay.bX && ia.ay.set(a, b);
			J.gU(a, b)
		},
		BMAP_API_VERSION: "2.0"
	});
	var V = La.prototype;
	R(V, {
		getBounds: V.Nd,
		getCenter: V.Aa,
		getMapType: V.la,
		getSize: V.Mb,
		setSize: V.vd,
		getViewport: V.ys,
		getZoom: V.U,
		centerAndZoom: V.ae,
		panTo: V.fi,
		panBy: V.mg,
		setCenter: V.If,
		setCurrentCity: V.FE,
		setMapType: V.og,
		setViewport: V.lh,
		setZoom: V.Cc,
		highResolutionEnabled: V.OK,
		zoomTo: V.sg,
		zoomIn: V.gF,
		zoomOut: V.hF,
		addHotspot: V.Lv,
		removeHotspot: V.aY,
		clearHotspots: V.Il,
		checkResize: V.jU,
		addControl: V.Jv,
		removeControl: V.vM,
		getContainer: V.Fa,
		addContextMenu: V.Wn,
		removeContextMenu: V.ap,
		addOverlay: V.ya,
		removeOverlay: V.Gb,
		clearOverlays: V.mJ,
		openInfoWindow: V.zb,
		closeInfoWindow: V.Lc,
		pointToOverlayPixel: V.Fe,
		overlayPixelToPoint: V.kM,
		getInfoWindow: V.Tg,
		getOverlays: V.Mw,
		getPanes: function() {
			return {
				floatPane: this.Zd.MC,
				markerMouseTarget: this.Zd.WD,
				floatShadow: this.Zd.cK,
				labelPane: this.Zd.PD,
				markerPane: this.Zd.FL,
				markerShadow: this.Zd.GL,
				mapPane: this.Zd.Ns
			}
		},
		addTileLayer: V.Kg,
		removeTileLayer: V.jh,
		pixelToPoint: V.mb,
		pointToPixel: V.Vb,
		setFeatureStyle: V.kp,
		selectBaseElement: V.p2,
		setMapStyle: V.ht,
		enable3DBuilding: V.po,
		disable3DBuilding: V.SU,
		getPanorama: V.Yl
	});
	var He = Qc.prototype;
	R(He, {
		getTileLayer: He.uW,
		getMinZoom: He.Ao,
		getMaxZoom: He.Xl,
		getProjection: He.Fo,
		getTextColor: He.ws,
		getTips: He.xs
	});
	R(window, {
		BMAP_NORMAL_MAP: Ma,
		BMAP_PERSPECTIVE_MAP: Oa,
		BMAP_SATELLITE_MAP: Wa,
		BMAP_HYBRID_MAP: Qa
	});
	var Ie = Q.prototype;
	R(Ie, {
		lngLatToPoint: Ie.Xg,
		pointToLngLat: Ie.hi
	});
	var Je = fb.prototype;
	R(Je, {
		lngLatToPoint: Je.Xg,
		pointToLngLat: Je.hi
	});
	var Ke = db.prototype;
	R(Ke, {
		equals: Ke.$a,
		containsPoint: Ke.Dr,
		containsBounds: Ke.uU,
		intersects: Ke.Es,
		extend: Ke.extend,
		getCenter: Ke.Aa,
		isEmpty: Ke.kj,
		getSouthWest: Ke.De,
		getNorthEast: Ke.Bf,
		toSpan: Ke.WE
	});
	var Le = ic.prototype;
	R(Le, {
		isVisible: Le.Wg,
		show: Le.show,
		hide: Le.J
	});
	ic.getZIndex = ic.dm;
	var Pe = eb.prototype;
	R(Pe, {
		openInfoWindow: Pe.zb,
		closeInfoWindow: Pe.Lc,
		enableMassClear: Pe.Zi,
		disableMassClear: Pe.UU,
		show: Pe.show,
		hide: Pe.J,
		getMap: Pe.Hw,
		addContextMenu: Pe.Wn,
		removeContextMenu: Pe.ap
	});
	var Qe = S.prototype;
	R(Qe, {
		setIcon: Qe.Hb,
		getIcon: Qe.zo,
		setPosition: Qe.ha,
		getPosition: Qe.V,
		setOffset: Qe.He,
		getOffset: Qe.Cf,
		getLabel: Qe.eD,
		setLabel: Qe.Im,
		setTitle: Qe.qc,
		setTop: Qe.ki,
		enableDragging: Qe.Sb,
		disableDragging: Qe.dC,
		setZIndex: Qe.mt,
		getMap: Qe.Hw,
		setAnimation: Qe.Hm,
		setShadow: Qe.Sx,
		hide: Qe.J,
		setRotation: Qe.op,
		getRotation: Qe.AK
	});
	R(window, {
		BMAP_ANIMATION_DROP: 1,
		BMAP_ANIMATION_BOUNCE: 2
	});
	var Re = qc.prototype;
	R(Re, {
		setStyle: Re.xd,
		setStyles: Re.ji,
		setContent: Re.Qc,
		setPosition: Re.ha,
		getPosition: Re.V,
		setOffset: Re.He,
		getOffset: Re.Cf,
		setTitle: Re.qc,
		setZIndex: Re.mt,
		getMap: Re.Hw,
		getContent: Re.bk
	});
	var Se = mc.prototype;
	R(Se, {
		setImageUrl: Se.MM,
		setSize: Se.vd,
		setAnchor: Se.nc,
		setImageOffset: Se.gt,
		setImageSize: Se.EY,
		setInfoWindowAnchor: Se.HY,
		setPrintImageUrl: Se.QY
	});
	var Te = pc.prototype;
	R(Te, {
		redraw: Te.Ud,
		setTitle: Te.qc,
		setContent: Te.Qc,
		getContent: Te.bk,
		getPosition: Te.V,
		enableMaximize: Te.Og,
		disableMaximize: Te.rw,
		isOpen: Te.Ka,
		setMaxContent: Te.it,
		maximize: Te.nx,
		enableAutoPan: Te.as
	});
	var Ue = kc.prototype;
	R(Ue, {
		getPath: Ue.ee,
		setPath: Ue.Vd,
		setPositionAt: Ue.Km,
		getStrokeColor: Ue.oW,
		setStrokeWeight: Ue.rp,
		getStrokeWeight: Ue.DK,
		setStrokeOpacity: Ue.pp,
		getStrokeOpacity: Ue.pW,
		setFillOpacity: Ue.ft,
		getFillOpacity: Ue.MV,
		setStrokeStyle: Ue.qp,
		getStrokeStyle: Ue.CK,
		getFillColor: Ue.LV,
		getBounds: Ue.Nd,
		enableEditing: Ue.zf,
		disableEditing: Ue.TU
	});
	var Ve = Ac.prototype;
	R(Ve, {
		setCenter: Ve.If,
		getCenter: Ve.Aa,
		getRadius: Ve.yK,
		setRadius: Ve.cf
	});
	var We = yc.prototype;
	R(We, {
		getPath: We.ee,
		setPath: We.Vd,
		setPositionAt: We.Km
	});
	var Xe = gb.prototype;
	R(Xe, {
		getPosition: Xe.V,
		setPosition: Xe.ha,
		getText: Xe.nD,
		setText: Xe.lt
	});
	H.prototype.equals = H.prototype.$a;
	P.prototype.equals = P.prototype.$a;
	L.prototype.equals = L.prototype.$a;
	R(window, {
		BMAP_ANCHOR_TOP_LEFT: Tb,
		BMAP_ANCHOR_TOP_RIGHT: Ub,
		BMAP_ANCHOR_BOTTOM_LEFT: Vb,
		BMAP_ANCHOR_BOTTOM_RIGHT: 3
	});
	var Ye = Sb.prototype;
	R(Ye, {
		setAnchor: Ye.nc,
		getAnchor: Ye.SC,
		setOffset: Ye.He,
		getOffset: Ye.Cf,
		show: Ye.show,
		hide: Ye.J,
		isVisible: Ye.Wg,
		toString: Ye.toString
	});
	var Ze = hb.prototype;
	R(Ze, {
		getType: Ze.Jo,
		setType: Ze.Lm
	});
	R(window, {
		BMAP_NAVIGATION_CONTROL_LARGE: 0,
		BMAP_NAVIGATION_CONTROL_SMALL: 1,
		BMAP_NAVIGATION_CONTROL_PAN: 2,
		BMAP_NAVIGATION_CONTROL_ZOOM: 3
	});
	var $e = kb.prototype;
	R($e, {
		changeView: $e.be,
		setSize: $e.vd,
		getSize: $e.Mb
	});
	var af = ib.prototype;
	R(af, {
		getUnit: af.yW,
		setUnit: af.LE
	});
	R(window, {
		BMAP_UNIT_METRIC: "metric",
		BMAP_UNIT_IMPERIAL: "us"
	});
	var bf = Xb.prototype;
	R(bf, {
		addCopyright: bf.Kv,
		removeCopyright: bf.rE,
		getCopyright: bf.Vl,
		getCopyrightCollection: bf.ZC
	});
	R(window, {
		BMAP_MAPTYPE_CONTROL_HORIZONTAL: Yb,
		BMAP_MAPTYPE_CONTROL_DROPDOWN: 1,
		BMAP_MAPTYPE_CONTROL_MAP: 2
	});
	var cf = Dc.prototype;
	R(cf, {
		getMapType: cf.la,
		getCopyright: cf.Vl,
		isTransparentPng: cf.Ks
	});
	var df = bc.prototype;
	R(df, {
		addItem: df.Mv,
		addSeparator: df.kB,
		removeSeparator: df.tE
	});
	var ef = ec.prototype;
	R(ef, {
		setText: ef.lt
	});
	var ff = U.prototype;
	R(ff, {
		getStatus: ff.am,
		setSearchCompleteCallback: ff.JE,
		getPageCapacity: ff.Xe,
		setPageCapacity: ff.np,
		setLocation: ff.Jm,
		disableFirstResultSelection: ff.eC,
		enableFirstResultSelection: ff.BC,
		gotoPage: ff.em,
		searchNearby: ff.ip,
		searchInBounds: ff.Gm,
		search: ff.search
	});
	R(window, {
		BMAP_STATUS_SUCCESS: 0,
		BMAP_STATUS_CITY_LIST: 1,
		BMAP_STATUS_UNKNOWN_LOCATION: 2,
		BMAP_STATUS_UNKNOWN_ROUTE: 3,
		BMAP_STATUS_INVALID_KEY: 4,
		BMAP_STATUS_INVALID_REQUEST: 5,
		BMAP_STATUS_PERMISSION_DENIED: 6,
		BMAP_STATUS_SERVICE_UNAVAILABLE: 7,
		BMAP_STATUS_TIMEOUT: 8
	});
	R(window, {
		BMAP_POI_TYPE_NORMAL: 0,
		BMAP_POI_TYPE_BUSSTOP: 1,
		BMAP_POI_TYPE_BUSLINE: 2,
		BMAP_POI_TYPE_SUBSTOP: 3,
		BMAP_POI_TYPE_SUBLINE: 4
	});
	R(window, {
		BMAP_TRANSIT_POLICY_LEAST_TIME: 0,
		BMAP_TRANSIT_POLICY_LEAST_TRANSFER: 2,
		BMAP_TRANSIT_POLICY_LEAST_WALKING: 3,
		BMAP_TRANSIT_POLICY_AVOID_SUBWAYS: 4,
		BMAP_LINE_TYPE_BUS: 0,
		BMAP_LINE_TYPE_SUBWAY: 1,
		BMAP_LINE_TYPE_FERRY: 2
	});
	var gf = od.prototype;
	R(gf, {
		clearResults: gf.ze
	});
	qd = pd.prototype;
	R(qd, {
		setPolicy: qd.kt,
		toString: qd.toString,
		setPageCapacity: qd.np
	});
	R(window, {
		BMAP_DRIVING_POLICY_LEAST_TIME: 0,
		BMAP_DRIVING_POLICY_LEAST_DISTANCE: 1,
		BMAP_DRIVING_POLICY_AVOID_HIGHWAYS: 2
	});
	R(window, {
		BMAP_MODE_DRIVING: "driving",
		BMAP_MODE_TRANSIT: "transit",
		BMAP_MODE_WALKING: "walking",
		BMAP_MODE_NAVIGATION: "navigation"
	});
	var hf = yd.prototype;
	R(hf, {
		routeCall: hf.GM
	});
	R(window, {
		BMAP_HIGHLIGHT_STEP: 1,
		BMAP_HIGHLIGHT_ROUTE: 2
	});
	R(window, {
		BMAP_ROUTE_TYPE_DRIVING: ad,
		BMAP_ROUTE_TYPE_WALKING: $c
	});
	R(window, {
		BMAP_ROUTE_STATUS_NORMAL: bd,
		BMAP_ROUTE_STATUS_EMPTY: 1,
		BMAP_ROUTE_STATUS_ADDRESS: 2
	});
	var jf = sd.prototype;
	R(jf, {
		setPolicy: jf.kt
	});
	var kf = Ed.prototype;
	R(kf, {
		show: kf.show,
		hide: kf.J,
		setTypes: kf.KE,
		setLocation: kf.Jm,
		search: kf.search,
		setInputValue: kf.Px
	});
	R(mb.prototype, {});
	var lf = Cd.prototype;
	R(lf, {
		get: lf.get
	});
	R($b.prototype, {});
	R(bb.prototype, {});
	R(window, {
		BMAP_POINT_DENSITY_HIGH: 200,
		BMAP_POINT_DENSITY_MEDIUM: Pc,
		BMAP_POINT_DENSITY_LOW: 50
	});
	R(window, {
		BMAP_POINT_SHAPE_STAR: 1,
		BMAP_POINT_SHAPE_WATERDROP: 2,
		BMAP_POINT_SHAPE_CIRCLE: sc,
		BMAP_POINT_SHAPE_SQUARE: 4,
		BMAP_POINT_SHAPE_RHOMBUS: 5
	});
	R(window, {
		BMAP_POINT_SIZE_TINY: 1,
		BMAP_POINT_SIZE_SMALLER: 2,
		BMAP_POINT_SIZE_SMALL: 3,
		BMAP_POINT_SIZE_NORMAL: tc,
		BMAP_POINT_SIZE_BIG: 5,
		BMAP_POINT_SIZE_BIGGER: 6,
		BMAP_POINT_SIZE_HUGE: 7
	});
	R(window, {
		BMap_Symbol_SHAPE_CAMERA: 11,
		BMap_Symbol_SHAPE_WARNING: 12,
		BMap_Symbol_SHAPE_SMILE: 13,
		BMap_Symbol_SHAPE_CLOCK: 14,
		BMap_Symbol_SHAPE_POINT: 9,
		BMap_Symbol_SHAPE_PLANE: 10,
		BMap_Symbol_SHAPE_CIRCLE: 1,
		BMap_Symbol_SHAPE_RECTANGLE: 2,
		BMap_Symbol_SHAPE_RHOMBUS: 3,
		BMap_Symbol_SHAPE_STAR: 4,
		BMap_Symbol_SHAPE_BACKWARD_CLOSED_ARROW: 5,
		BMap_Symbol_SHAPE_FORWARD_CLOSED_ARROW: 6,
		BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW: 7,
		BMap_Symbol_SHAPE_FORWARD_OPEN_ARROW: 8
	});
	R(window, {
		BMAP_CONTEXT_MENU_ICON_ZOOMIN: cc,
		BMAP_CONTEXT_MENU_ICON_ZOOMOUT: dc
	});
	z.KT();
})()