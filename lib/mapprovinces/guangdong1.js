define(
    [],

    function() {

        "use strict";

        var provinces;

        (function() {
            var define,
                requireModule,
                require,
                requirejs;

            (function() {

                var _isArray;
                if (!Array.isArray) {
                    _isArray = function(x) {
                        return Object.prototype.toString.call(x) === "[object Array]";
                    };
                } else {
                    _isArray = Array.isArray;
                }

                var registry = {},
                    seen = {};
                var FAILED = false;

                var uuid = 0;

                function tryFinally(tryable, finalizer) {
                    try {
                        return tryable();
                    } finally {
                        finalizer();
                    }
                }

                function unsupportedModule(length) {
                    throw new Error("an unsupported module was defined, expected `define(name, deps, module)` instead got: `" + length + "` arguments to define`");
                }

                var defaultDeps = ['require', 'exports', 'module'];

                function Module(name, deps, callback, exports) {
                    this.id = uuid++;
                    this.name = name;
                    this.deps = !deps.length && callback.length ? defaultDeps : deps;
                    this.exports = exports || {};
                    this.callback = callback;
                    this.state = undefined;
                    this._require = undefined;
                }

                Module.prototype.makeRequire = function() {
                    var name = this.name;

                    return this._require || (this._require = function(dep) {
                        return require(resolve(dep, name));
                    });
                };

                define = function(name, deps, callback) {
                    if (arguments.length < 2) {
                        unsupportedModule(arguments.length);
                    }

                    if (!_isArray(deps)) {
                        callback = deps;
                        deps = [];
                    }

                    registry[name] = new Module(name, deps, callback);
                };

                // we don't support all of AMD
                // define.amd = {};
                // we will support petals...
                define.petal = {};

                function Alias(path) {
                    this.name = path;
                }

                define.alias = function(path) {
                    return new Alias(path);
                };

                function reify(mod, name, seen) {
                    var deps = mod.deps;
                    var length = deps.length;
                    var reified = new Array(length);
                    var dep;
                    // TODO: new Module
                    // TODO: seen refactor
                    var module = {};

                    for (var i = 0, l = length; i < l; i++) {
                        dep = deps[i];
                        if (dep === 'exports') {
                            module.exports = reified[i] = seen;
                        } else if (dep === 'require') {
                            reified[i] = mod.makeRequire();
                        } else if (dep === 'module') {
                            mod.exports = seen;
                            module = reified[i] = mod;
                        } else {
                            reified[i] = requireFrom(resolve(dep, name), name);
                        }
                    }

                    return {
                        deps: reified,
                        module: module
                    };
                }

                function requireFrom(name, origin) {
                    var mod = registry[name];
                    if (!mod) {
                        throw new Error('Could not find module `' + name + '` imported from `' + origin + '`');
                    }
                    return require(name);
                }

                function missingModule(name) {
                    throw new Error('Could not find module ' + name);
                }
                requirejs = require = requireModule = function(name) {
                    var mod = registry[name];

                    if (mod && mod.callback instanceof Alias) {
                        mod = registry[mod.callback.name];
                    }

                    if (!mod) {
                        missingModule(name);
                    }

                    if (mod.state !== FAILED &&
                        seen.hasOwnProperty(name)) {
                        return seen[name];
                    }

                    var reified;
                    var module;
                    var loaded = false;

                    seen[name] = {}; // placeholder for run-time cycles

                    tryFinally(function() {
                        reified = reify(mod, name, seen[name]);
                        module = mod.callback.apply(this, reified.deps);
                        loaded = true;
                    }, function() {
                        if (!loaded) {
                            mod.state = FAILED;
                        }
                    });

                    var obj;
                    if (module === undefined && reified.module.exports) {
                        obj = reified.module.exports;
                    } else {
                        obj = seen[name] = module;
                    }

                    if (obj !== null &&
                        (typeof obj === 'object' || typeof obj === 'function') &&
                        obj['default'] === undefined) {
                        obj['default'] = obj;
                    }

                    return (seen[name] = obj);
                };

                function resolve(child, name) {
                    if (child.charAt(0) !== '.') {
                        return child;
                    }

                    var parts = child.split('/');
                    var nameParts = name.split('/');
                    var parentBase = nameParts.slice(0, -1);

                    for (var i = 0, l = parts.length; i < l; i++) {
                        var part = parts[i];

                        if (part === '..') {
                            if (parentBase.length === 0) {
                                throw new Error('Cannot access parent module of root');
                            }
                            parentBase.pop();
                        } else if (part === '.') {
                            continue;
                        } else {
                            parentBase.push(part);
                        }
                    }

                    return parentBase.join('/');
                }

                requirejs.entries = requirejs._eak_seen = registry;
                requirejs.clear = function() {
                    requirejs.entries = requirejs._eak_seen = registry = {};
                    seen = state = {};
                };
            })();


            define("echarts/util/mapData/geoJson/guang_dong_geo", [], function() {
                return {
                    type: "FeatureCollection",
                    features: [{
                        type: "Feature",
                        id: "4418",
                        properties: {
                            id: 1131194941,
                            name: "清远",
                            cp: [113.0175, 24.3292],
                            childNum: 8
                        },
                        geometry: {
                            type: "Polygon",
                            coordinates: ["@@lÇ¯kÿaV¯VaÈU¥ÆÇIlxmnbUxlUôl°kWl@ôVwUanUl@xVkaX¥kU»a¯±@kka@UwmUkwJk±k@L@ÝWUwVÝxÇU¯ÇX@mÅ@@yĉ£VmUwȗ»ÇUnlUnWU¯`Uk@@x@bÇxX¼VV¯LĀkÝL¯@VĀ¯lnĊW¦kVÇôkUÇUK@ţU@aóÜUU»@¦k@VxKVbn@Æl@xbWnlUlxÈlVÈ°Æ@¼@xWxŎVK°¥nÆkŎ@ÈÑmK@¥k@ô@nôV"],
                            encodeOffsets: [
                                [115707, 25527]
                            ]
                        }
                    }, {
                        type: "Feature",
                        id: "4402",
                        properties: {
                            id: -178654600,
                            name: "韶关",
                            cp: [113.7964, 25.0028],
                            childNum: 8
                        },
                        geometry: {
                            type: "Polygon",
                            coordinates: ["@@WXk±Ñ@UwmUwĉwlmn@Æwn£mkI¥ÇÅ@¥aón£nWWw£V`Þ@nVml@xô¼IV¥kUmkamUkVWwÛ»mó£UVÅKmn@x@kbmm¯aXkaVĉaUbÝ²lIlxnVVx@lb@l²°bV¼lW¦bUlwk@mVVbUxó@kX¯lókVkwVmankwJÅÈ¦ÇVUbU°blĀ°kÈ@x¦ÆÜ°@°¦óaVUôlUlbXl@nÜVnKlnIVÞ°W°U@bnm@¥IV²Ul°VnalzXyl_Vyƒ¦lLlx@ÞbKmknVWanwÑVwČº@n_ÞVaVÜIl@KÈVJ@a£È@@kmaV¯W@_a¯KmbkÇkLmw@Å¥"],
                            encodeOffsets: [
                                [117147, 25549]
                            ]
                        }
                    }, {
                        type: "Feature",
                        id: "4408",
                        properties: {
                            id: -435321011,
                            name: "湛江",
                            cp: [110.0577, 20.9894],
                            childNum: 6
                        },
                        geometry: {
                            type: "Polygon",
                            coordinates: ["@@@kX@aUUċlkJk@wVJXUWk°W@nKnwlUl²blU@lIl@XbWxnm@lW@wwUJX¯VU°`ŎóˋkÝÝkÅ@ÇmğÈřmwaĵVxUÛ»°ĠǷnýmóX¥ɅĵҏÇ@°²ĊUĖ±ĮU¤Ç°Ā¯ɐnżUĊĊĬV@è@ÔÒU¼l¤nĠbêVĠ°ÈyzVaVnUÆLabVlwÆ@"],
                            encodeOffsets: [
                                [113040, 22416]
                            ]
                        }
                    }, {
                        type: "Feature",
                        id: "4414",
                        properties: {
                            id: 1264590310,
                            name: "梅州",
                            cp: [116.1255, 24.3534],
                            childNum: 8
                        },
                        geometry: {
                            type: "Polygon",
                            coordinates: ["@@nÔlW¼x¦@lVllLkèa@z¤Ė¼UxlnUKUbÝlU¼lb@VxVklJÈwV¯@ĠlÛĖnbkÆźÞUÈôklmL¥LWnKUkVa°Vx@IVV@x°bUkaa@mV@@ywLÑUwVUVUbÞVVann@XwÇÿ¯²aVamkXaÆ»@»nw@¥UXakbWa¯KUw@¥m@kwmLU»UUJ@kmU@UUWU@yanwmçÛl¯¯UmKUmwVkmÝXbW@XWÝbk¯@±w@»U@W¯Å@Ç¥UU@IUakJĀê°þXkam@_J°m@X"],
                            encodeOffsets: [
                                [118125, 24419]
                            ]
                        }
                    }, {
                        type: "Feature",
                        id: "4416",
                        properties: {
                            id: 349252210,
                            name: "河源",
                            cp: [114.917, 23.9722],
                            childNum: 6
                        },
                        geometry: {
                            type: "Polygon",
                            coordinates: ["@@°VlmX¹laĢÒlm@V£@¦Ģklynn¼lW°zW°VbÈV@lÆbnnJkXVÆaÅW@UUw@kaV»ÞkVaVLkmVw»ĕ£@yblçkKkU@k¥wX»kmÓ@Wn¯I`@nlbWý¯éÿlI@XUmWUw@@UJUÇmKUV@xţk¯¯LWnUxK@Å±»Vwa¯@¤WX@Û¦@¤ÇIÈ¼WxX@WxwUnVbÅèmVa±²UWl@klÈ¤nôÜ¼XxlUnVlbVnlU¦Jó»@wnkmUÝ@U_¤XxmXm¤ôb@¦ÈÆ¦lJn"],
                            encodeOffsets: [
                                [117057, 25167]
                            ]
                        }
                    }, {
                        type: "Feature",
                        id: "4412",
                        properties: {
                            id: 2141108882,
                            name: "肇庆",
                            cp: [112.1265, 23.7822],
                            childNum: 7
                        },
                        geometry: {
                            type: "Polygon",
                            coordinates: ["@@l@¥@V¼VôÛ@bV@ŤVLÈlVÈólUX¥mĉ°kÿU°@ÞKlÿ°KUUW»Èw@aw@@nm@w£kÓVUVnKk¥£Vam@nkKkbÆǫmakmLU¥UmÛwmVUmUJÇaUxÇIn`mb@Þ¯b@nJ@nlUVlVULW¯Û`Ç_¯`m¯IbĉWċzx±Jx¯ÆU_k@J@UmbXôlLn¦@¼ĊxlUXxUbLĠUnVĊwlUb@lWXm²@ÞWxXUnb"],
                            encodeOffsets: [
                                [114627, 24818]
                            ]
                        }
                    }, {
                        type: "Feature",
                        id: "4413",
                        properties: {
                            id: -1599349917,
                            name: "惠州",
                            cp: [114.6204, 23.2647],
                            childNum: 4
                        },
                        geometry: {
                            type: "Polygon",
                            coordinates: ["@@lbW°bnnla@@wnmÆLVUkÇl@XkV²±bnUÆçUaVmxXw@WXwÇ»ÈJ@£Ü¥@XW@£°bUx²¼@ÆLVwmX°K°Ťl@wVUnLÈVVIky±wkKU¯ÅkXġÑÛlwUwlm@mnKWaÅm¯óÇmğb¯alĉUwķbmb@lÞÒVnmĀŹ@VbVUnmakLm`@xĉkklVÔVJVnlVUnmJmaLUblzmkLaō@@zV¦UV²kJnÜU@VXUL@lJL@bÝ¤UnVb@xVnlK²Vx°VxlIlkVl²k¤@n"],
                            encodeOffsets: [
                                [116776, 24492]
                            ]
                        }
                    }, {
                        type: "Feature",
                        id: "4409",
                        properties: {
                            id: -1125282617,
                            name: "茂名",
                            cp: [111.0059, 22.0221],
                            childNum: 5
                        },
                        geometry: {
                            type: "Polygon",
                            coordinates: ["@@LnÇlkKnkÆLUmÈxlUJló°n@ana@@X_@mÝóóU@aaU¯mL¯kV¯ÇVwkw@V±Ŏ£@@alw±Vk@mÅm¯ÿÅƧIÇ`ōô¯_UVW°IVx@xkX@mnwXWa@kkJ@kVa±kkVmxmL@¯XXlWVUI@xlIklVČV@blW@@nUxVblVxkôlxnynIÆ»Æ°aXwlKbVnXbL¤kLèVV¼²IlĠVXynz°KVx°@VlLlblK"],
                            encodeOffsets: [
                                [113761, 23237]
                            ]
                        }
                    }, {
                        type: "Feature",
                        id: "4407",
                        properties: {
                            id: -169307475,
                            name: "江门",
                            cp: [112.6318, 22.1484],
                            childNum: 5
                        },
                        geometry: {
                            type: "Polygon",
                            coordinates: ["@@lUXx°JWnnÆXVWX@ºVLV¯nUVnbôxaXmWXIUb°xlKl¯KxXÞ°XÈ¥Ü@ĉÞUç»nóVmax¯UÅU¥Ý¯@ç@ș@çĉÅUmUç±ĉKÝxÝ_ÅJk¯»ó¯nmèkǀWx¼mnUÜġ°@¦@xLkÇaVnUxVVlnIlbnÆÆKX¦"],
                            encodeOffsets: [
                                [114852, 22928]
                            ]
                        }
                    }, {
                        type: "Feature",
                        id: "4417",
                        properties: {
                            id: 362836539,
                            name: "阳江",
                            cp: [111.8298, 22.0715],
                            childNum: 4
                        },
                        geometry: {
                            type: "Polygon",
                            coordinates: ["@@°nKV°b@bôVÞô@nVlÒôÆUnlnn@lmkmVkaÈkÆÆk¥ÅÞ»ÆKXkW¥ÅLmÅkamJUkUVwUmÈblKw@@¥Ģ¯VÛnm»Xwlƿ@kbWaʵ@óLl¯ƽ@Ln°Æ@nUl²kxb@@ō¤U²@lxUxÈU°l"],
                            encodeOffsets: [
                                [114053, 22782]
                            ]
                        }
                    }, {
                        type: "Feature",
                        id: "4453",
                        properties: {
                            id: 1901071257,
                            name: "云浮",
                            cp: [111.7859, 22.9916],
                            childNum: 5
                        },
                        geometry: {
                            type: "Polygon",
                            coordinates: ["@@@VIl@`V°Åw²IwČyĊXa°Jn°_È`Ü_°XKVkUUVk@mmI@°a@Ýnam_ÈJVwlĉX@lUómaUmVU°UK¹@WXUWmÅXm¯IWwkVWlÅLÝ¼Æl¦ÅÅÇlbUllnknm@kmVmóÅkÑUW`@@bmb@¯mkôIkVÇwnVÅKmlLklmÈKVĊK°²`n¤nUbWlxVxLUx@°nXm`VklVxmnnx"],
                            encodeOffsets: [
                                [114053, 23873]
                            ]
                        }
                    }, {
                        type: "Feature",
                        id: "4401",
                        properties: {
                            id: 609737586,
                            name: "广州",
                            cp: [113.5107, 23.5196],
                            childNum: 13
                        },
                        geometry: {
                            type: "Polygon",
                            coordinates: ["@@Ș¼VxUnĊ¤@z@Æ@nÈW°ÈVwUÞVxÞX@Kl@ÞVaĊbU@ml£k±lUkkJw¯UUw±kLUm@waUVmÞ£@aKkI@KVUW@ÛVmlIU±VU¥@yğzƧÇƽĠřÅnī±m@²¯l°@nÝÆóUll@XnÝVU¦mVV°V¼Jnb@°mbn@²¯¯wVw@@nmxX¤¯L@VLUm@@l"],
                            encodeOffsets: [
                                [115673, 24019]
                            ]
                        }
                    }, {
                        type: "Feature",
                        id: "4415",
                        properties: {
                            id: 792359234,
                            name: "汕尾",
                            cp: [115.5762, 23.2438],
                            childNum: 4
                        },
                        geometry: {
                            type: "Polygon",
                            coordinates: ["@@@@VxnXWV@bVJV@ÞÅU¥Ċx£UWUwÅUU¥WVUkĊÇnkV`°LVwnU@lbĊ¯Vnal@@çkUÝ¥ġaó¯ÅaÅLŻÆUýmy¯ó@ĉÆóȯwÆXbmL@nknVxkxÜĢÒWÆlV°Ll²xlz"],
                            encodeOffsets: [
                                [118193, 23806]
                            ]
                        }
                    }, {
                        type: "Feature",
                        id: "4452",
                        properties: {
                            id: -2089824983,
                            name: "揭阳",
                            cp: [116.0255, 23.513],
                            childNum: 5
                        },
                        geometry: {
                            type: "Polygon",
                            coordinates: ["@@VÈ¦Æ@X°V@@¼x²°@lÞaWXX@aÞWlnUxVnnL°V@kmĢl@ak@mlk°aX±nwm±²¯JV²@wW_maV»U@m¯ĉUÑJlabVnlĸLlƅÛÇ±wÝ@ĉxó@è@kmbUĉ°ka@mVxU¯KU_mlĉÈVlXUV¦ÆVxVVX¤ĉwV¦ÝÆ"],
                            encodeOffsets: [
                                [118384, 24036]
                            ]
                        }
                    }, {
                        type: "Feature",
                        id: "4404",
                        properties: {
                            id: 879804769,
                            name: "珠海",
                            cp: [113.7005, 22.2755],
                            childNum: 1
                        },
                        geometry: {
                            type: "Polygon",
                            coordinates: ["@@è@Þ°V¦VÆ°wnbUÆ»nçÆ@nxÜ¤²llU°VnÈJÞ°UôéķUklô£VVˌKÞV°£n¥£ȗÝy¯¯mÅkw¯bÇĔğ@Ýn¯ĊVğōŁŻķJ@Ț", "@@X¯kmèVbnJ"],
                            encodeOffsets: [
                                [115774, 22602],
                                [116325, 22697]
                            ]
                        }
                    }, {
                        type: "Feature",
                        id: "4406",
                        properties: {
                            id: 1510006446,
                            name: "佛山",
                            cp: [112.8955, 23.1097],
                            childNum: 1
                        },
                        geometry: {
                            type: "Polygon",
                            coordinates: ["@@ÈbInVVnUÜxnVV¦nKlnbÅǬlalL@mnUb¤l¦LUmUVlÔ¤@xmnVl°_XVVmkVmÈ@kn@VUK@°KW£nw@m@Ux°x°@±mna@¯amIU»U¯nUV¥ÞUWmk@Vk¯UknÑWÝĊÛ@Ç¦W¯WÝwLk°kL¯wVaWJXWnbwkVW@kĊ"],
                            encodeOffsets: [
                                [115088, 23316]
                            ]
                        }
                    }, {
                        type: "Feature",
                        id: "4451",
                        properties: {
                            id: 617791944,
                            name: "潮州",
                            cp: [116.7847, 23.9593],
                            childNum: 3
                        },
                        geometry: {
                            type: "Polygon",
                            coordinates: ["@@°Üknèmxbz@VVX@VnV@lIVVV¼nKlxn@@¦Vx°LXblaWbV°£¯W@nW@aUñVwW»@¥ŤÅUÝǓÝóV@ńÇkUVmIUwÅVWÇX¹@W¯bkl@nlb@kġn@l"],
                            encodeOffsets: [
                                [119161, 24306]
                            ]
                        }
                    }, {
                        type: "Feature",
                        id: "4405",
                        properties: {
                            id: 1954403854,
                            name: "汕头",
                            cp: [116.8000, 23.5405],
                            childNum: 2
                        },
                        geometry: {
                            type: "Polygon",
                            coordinates: ["@@@U±°I±n²mx²@WºXÈÆUVxJUnlVÈ@ŃôUǔÞVçn»VyĢÛVm@»kaÝUÇ¼óÛÈķKċ¥X¥Wwğk¯@wķKkUmabkIVÒ°Ċ@nVU¼bn`Xx"],
                            encodeOffsets: [
                                [119251, 24059]
                            ]
                        }
                    }, {
                        type: "Feature",
                        id: "4403",
                        properties: {
                            id: 1819935571,
                            name: "深圳",
                            cp: [113.9, 22.6439],
                            childNum: 1
                        },
                        geometry: {
                            type: "Polygon",
                            coordinates: ["@@ÞL@xbVVK°X°Kô¥Vw@anUèlkĊl@wn_lKnbVmUaUź@nÿUmÝÑ¯Ubk@ÆkxŻ@aÇXwJ¯LķÝUĕóĸóêWº@b²nmĬÆ"],
                            encodeOffsets: [
                                [116404, 23265]
                            ]
                        }
                    }, {
                        type: "Feature",
                        id: "4419",
                        properties: {
                            id: -594453696,
                            name: "东莞",
                            cp: [113.7953, 23.001],
                            childNum: 1
                        },
                        geometry: {
                            type: "Polygon",
                            coordinates: ["@@Ŏ@blKnykVaKnbnIVmUkUmUIUÓçmV@bUxó¦¯LW¯LUUa@wÝKğŚƾƨÈĠy"],
                            encodeOffsets: [
                                [116573, 23670]
                            ]
                        }
                    }, {
                        type: "Feature",
                        id: "4420",
                        properties: {
                            id: -506001368,
                            name: "中山",
                            cp: [113.3529, 22.678],
                            childNum: 1
                        },
                        geometry: {
                            type: "Polygon",
                            coordinates: ["@@XÒlmV°ôÞÅ@m¯°k±@@aX¹¯VÝÇIUmV¯kk±Û£mw@ÅmèÅ¼mô¼èV"],
                            encodeOffsets: [
                                [115887, 23209]
                            ]
                        }
                    }],
                    UTF8Encoding: !0
                };
            });
            define("echarts/util/mapData/geoJson/shaoguan", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "name": "乐昌市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.297823515625, 25.5163332343751],
                                        [113.31158328125, 25.4477053046875],
                                        [113.335391875, 25.4524098945313],
                                        [113.361658964844, 25.4335817695313],
                                        [113.371519804688, 25.4080178046875],
                                        [113.413170195313, 25.3996681953125],
                                        [113.42404421875, 25.3714699531251],
                                        [113.447345, 25.3668679023438],
                                        [113.482345, 25.3737819648438],
                                        [113.517345, 25.3668679023438],
                                        [113.534456816406, 25.3702492500001],
                                        [113.572652617188, 25.3428713203126],
                                        [113.577345, 25.313843],
                                        [113.556116972656, 25.3074513984375],
                                        [113.531219511719, 25.1978591132813],
                                        [113.532769804688, 25.1785475898438],
                                        [113.510867949219, 25.1476564765625],
                                        [113.517345, 25.093843],
                                        [113.454525175781, 25.0758815742188],
                                        [113.441632109375, 25.0452834296876],
                                        [113.427345, 25.0338430000001],
                                        [113.423016386719, 25.0401149726563],
                                        [113.407345, 25.0366017890625],
                                        [113.392066679688, 25.0400270820313],
                                        [113.352183867188, 25.0232741523438],
                                        [113.312345, 25.0322048164063],
                                        [113.292345, 25.0277223945313],
                                        [113.277767363281, 25.0309889960938],
                                        [113.262345, 25.0722048164063],
                                        [113.207037382813, 25.0598073554688],
                                        [113.190186796875, 25.0842116523438],
                                        [113.199439726563, 25.1254909492188],
                                        [113.181429472656, 25.1379274726563],
                                        [113.172345, 25.1510842109375],
                                        [113.163260527344, 25.1379274726563],
                                        [113.151429472656, 25.1297585273438],
                                        [113.136654082031, 25.0902712226562],
                                        [113.114525175781, 25.0749904609375],
                                        [113.092218046875, 25.0799929023438],
                                        [113.073260527344, 25.0743654609375],
                                        [113.086900664063, 25.0135182929688],
                                        [113.067840605469, 24.9842482734376],
                                        [113.041673613281, 24.9901149726563],
                                        [113.027022734375, 24.968891828125],
                                        [113.007345, 24.963843],
                                        [113.002806425781, 24.9793044257813],
                                        [112.991883574219, 24.9983815742188],
                                        [112.977471953125, 25.0316066718751],
                                        [113.006846953125, 25.0828932929688],
                                        [112.971883574219, 25.1383815742188],
                                        [112.962806425781, 25.1617678046875],
                                        [112.989488554688, 25.1839308906251],
                                        [113.031449003906, 25.2021291328126],
                                        [113.011883574219, 25.2183815742188],
                                        [112.985858183594, 25.2497096992188],
                                        [112.972345, 25.2483327460938],
                                        [112.947345, 25.2508815742188],
                                        [112.922345, 25.2483327460938],
                                        [112.912345, 25.2493532539063],
                                        [112.897345, 25.2478249335938],
                                        [112.861087675781, 25.25151878125],
                                        [112.863682890625, 25.2769753242188],
                                        [112.851807890625, 25.3085768867188],
                                        [112.852855253906, 25.318843],
                                        [112.850748320313, 25.3395143867188],
                                        [112.867345, 25.3378249335938],
                                        [112.888192167969, 25.3399489570313],
                                        [112.901883574219, 25.3083815742188],
                                        [112.918870878906, 25.2993044257813],
                                        [112.931883574219, 25.3293044257813],
                                        [112.954664335938, 25.3482302070313],
                                        [113.022806425781, 25.3583815742188],
                                        [113.033604765625, 25.3713796210938],
                                        [113.079781523438, 25.3914064765625],
                                        [113.092767363281, 25.4213478828125],
                                        [113.123941679688, 25.4181716132813],
                                        [113.119976835938, 25.457075421875],
                                        [113.155269804688, 25.4983815742188],
                                        [113.176217070313, 25.4731642890625],
                                        [113.224268828125, 25.5111940742188],
                                        [113.281910429688, 25.5053200507813],
                                        [113.287345, 25.5238430000001],
                                        [113.297823515625, 25.5163332343751]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "南雄市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [114.567345, 25.403843],
                                        [114.571529570313, 25.3875392890625],
                                        [114.592345, 25.3922048164063],
                                        [114.602271757813, 25.3656716132813],
                                        [114.628995390625, 25.3269704414063],
                                        [114.650230742188, 25.3317311835938],
                                        [114.674459257813, 25.3159548164063],
                                        [114.698375273438, 25.3213161445313],
                                        [114.72142703125, 25.2879274726563],
                                        [114.74142703125, 25.2741188789063],
                                        [114.733189726563, 25.2275319648438],
                                        [114.707428007813, 25.2333083320313],
                                        [114.681109648438, 25.1993483710938],
                                        [114.683468046875, 25.1888430000001],
                                        [114.68052859375, 25.175747296875],
                                        [114.72326296875, 25.1597585273437],
                                        [114.727345, 25.133843],
                                        [114.715406523438, 25.1144680000001],
                                        [114.687345, 25.1057277656251],
                                        [114.6683215625, 25.1116530585938],
                                        [114.650655546875, 25.0829885078125],
                                        [114.627345, 25.075727765625],
                                        [114.607345, 25.081958234375],
                                        [114.592345, 25.0772853828125],
                                        [114.560504179688, 25.0872023750001],
                                        [114.530386992188, 25.031880109375],
                                        [114.511158476563, 25.0200295234376],
                                        [114.503531523438, 25.0076564765626],
                                        [114.45045046875, 24.999926984375],
                                        [114.4560559375, 24.9819240546876],
                                        [114.421158476563, 24.9700295234376],
                                        [114.413531523438, 24.9576564765625],
                                        [114.387345, 24.9538430000001],
                                        [114.328699980469, 24.9634767890626],
                                        [114.277345, 24.9558864570313],
                                        [114.252345, 24.9595827460938],
                                        [114.236910429688, 24.95730003125],
                                        [114.25298953125, 24.9981984687501],
                                        [114.26170046875, 25.0395510078125],
                                        [114.19170046875, 25.06819846875],
                                        [114.17298953125, 25.0994875312501],
                                        [114.139222441406, 25.1450319648438],
                                        [114.077345, 25.1358864570313],
                                        [114.051937285156, 25.1396413398438],
                                        [113.997345, 25.1038430000001],
                                        [113.990975371094, 25.1074733710938],
                                        [113.983714628906, 25.1302126289063],
                                        [113.955721464844, 25.1391530585938],
                                        [113.943714628906, 25.1602126289063],
                                        [113.929027128906, 25.1685866523438],
                                        [113.950975371094, 25.2102126289063],
                                        [113.970767851563, 25.2214968085937],
                                        [113.959796171875, 25.2506032539063],
                                        [113.970975371094, 25.2702126289062],
                                        [114.007345, 25.273843],
                                        [114.023170195313, 25.2696681953126],
                                        [114.032345, 25.2568679023438],
                                        [114.049244414063, 25.2804445625001],
                                        [114.06267703125, 25.2777883125],
                                        [114.13201296875, 25.3098976875],
                                        [114.142345, 25.3078542304688],
                                        [114.157345, 25.3108180976563],
                                        [114.172345, 25.3078542304688],
                                        [114.189386015625, 25.3112233710938],
                                        [114.222056914063, 25.297798078125],
                                        [114.237345, 25.3008180976562],
                                        [114.253660917969, 25.2975954414063],
                                        [114.293170195313, 25.3080178046875],
                                        [114.305933867188, 25.3411135078126],
                                        [114.393182402344, 25.3236916328125],
                                        [114.421658964844, 25.3441042304688],
                                        [114.438219023438, 25.3870388007813],
                                        [114.452779570313, 25.3899172187501],
                                        [114.473682890625, 25.376645734375],
                                        [114.503472929688, 25.3881349921876],
                                        [114.501060820313, 25.4003322578125],
                                        [114.532218046875, 25.4201100898438],
                                        [114.567345, 25.403843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "曲江区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.667345, 24.473843],
                                        [113.677345, 24.473843],
                                        [113.677345, 24.4638430000001],
                                        [113.667345, 24.4638430000001],
                                        [113.667345, 24.473843]
                                    ]
                                ],
                                [
                                    [
                                        [113.667345, 24.473843],
                                        [113.64170046875, 24.47819846875],
                                        [113.63298953125, 24.4894875312501],
                                        [113.61170046875, 24.49819846875],
                                        [113.59298953125, 24.50948753125],
                                        [113.546143828125, 24.51819846875],
                                        [113.51490359375, 24.4777248359375],
                                        [113.502345, 24.4795827460938],
                                        [113.487345, 24.4773659492188],
                                        [113.471832304688, 24.4796584296875],
                                        [113.46298953125, 24.4681984687501],
                                        [113.436737089844, 24.45745628125],
                                        [113.417838164063, 24.4602468085938],
                                        [113.40298953125, 24.4794875312501],
                                        [113.3751965625, 24.4908620429688],
                                        [113.325289335938, 24.4712404609376],
                                        [113.277760039063, 24.45948753125],
                                        [113.242857695313, 24.5096755195313],
                                        [113.207345, 24.503843],
                                        [113.207345, 24.523843],
                                        [113.21298953125, 24.52819846875],
                                        [113.22170046875, 24.54948753125],
                                        [113.25298953125, 24.56819846875],
                                        [113.262916289063, 24.5924538398438],
                                        [113.31978640625, 24.584048078125],
                                        [113.33170046875, 24.5994875312501],
                                        [113.39298953125, 24.60819846875],
                                        [113.40170046875, 24.61948753125],
                                        [113.42298953125, 24.6281984687501],
                                        [113.438826933594, 24.6668947578125],
                                        [113.477684355469, 24.7172389960938],
                                        [113.507345, 24.733843],
                                        [113.517667265625, 24.718891828125],
                                        [113.561732207031, 24.7075856757813],
                                        [113.581007109375, 24.7119069648438],
                                        [113.600023222656, 24.7627272773438],
                                        [113.622345, 24.7577223945313],
                                        [113.632345, 24.7599636054688],
                                        [113.642491484375, 24.7576882148438],
                                        [113.698433867188, 24.7750295234375],
                                        [113.720726347656, 24.83460471875],
                                        [113.701429472656, 24.8479274726562],
                                        [113.697345, 24.853843],
                                        [113.705264921875, 24.8641017890625],
                                        [113.742735625, 24.8696388984376],
                                        [113.76170046875, 24.8581984687501],
                                        [113.78298953125, 24.84948753125],
                                        [113.80982546875, 24.8332985664063],
                                        [113.859906035156, 24.84069846875],
                                        [113.899095488281, 24.8252931953126],
                                        [113.937345, 24.853843],
                                        [113.969967070313, 24.8286623359375],
                                        [113.952017851563, 24.7435988593751],
                                        [113.908721953125, 24.7177053046875],
                                        [113.891170683594, 24.688608625],
                                        [113.910301542969, 24.673843],
                                        [113.89170046875, 24.65948753125],
                                        [113.877345, 24.623843],
                                        [113.786282988281, 24.61726096875],
                                        [113.770037871094, 24.54743675],
                                        [113.746395292969, 24.5191237617188],
                                        [113.732611113281, 24.5491579414063],
                                        [113.72209109375, 24.5485305],
                                        [113.71209109375, 24.55972190625],
                                        [113.67593875, 24.5575661445313],
                                        [113.654256621094, 24.5103224921876],
                                        [113.667345, 24.473843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "仁化县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [114.023392363281, 25.3338430000001],
                                        [114.044320097656, 25.318843],
                                        [114.02408328125, 25.3043386054688],
                                        [114.007345, 25.273843],
                                        [113.970975371094, 25.2702126289062],
                                        [113.959796171875, 25.2506032539063],
                                        [113.970767851563, 25.2214968085937],
                                        [113.950975371094, 25.2102126289063],
                                        [113.929027128906, 25.1685866523438],
                                        [113.943714628906, 25.1602126289063],
                                        [113.955721464844, 25.1391530585938],
                                        [113.983714628906, 25.1302126289063],
                                        [113.990975371094, 25.1074733710938],
                                        [113.997345, 25.1038430000001],
                                        [113.991832304688, 25.0967018867187],
                                        [113.971954375, 25.0996388984376],
                                        [113.95298953125, 25.08819846875],
                                        [113.93170046875, 25.07948753125],
                                        [113.92298953125, 25.0381984687501],
                                        [113.900611601563, 25.0290407539063],
                                        [113.919271269531, 25.0146364570313],
                                        [113.930765410156, 24.936860578125],
                                        [113.906280546875, 24.9404787421875],
                                        [113.900728789063, 24.9029006171875],
                                        [113.937345, 24.853843],
                                        [113.899095488281, 24.8252931953126],
                                        [113.859906035156, 24.84069846875],
                                        [113.80982546875, 24.8332985664063],
                                        [113.78298953125, 24.84948753125],
                                        [113.76170046875, 24.8581984687501],
                                        [113.742735625, 24.8696388984376],
                                        [113.705264921875, 24.8641017890625],
                                        [113.697345, 24.853843],
                                        [113.67170046875, 24.877602765625],
                                        [113.67341921875, 24.9209401679688],
                                        [113.692535429688, 24.9386525703125],
                                        [113.722154570313, 24.9798268867188],
                                        [113.688963652344, 24.97851096875],
                                        [113.631812773438, 24.9482692695313],
                                        [113.611009550781, 24.9490944648438],
                                        [113.571849394531, 24.9913576484376],
                                        [113.572869902344, 25.0171144843751],
                                        [113.517345, 25.093843],
                                        [113.510867949219, 25.1476564765625],
                                        [113.532769804688, 25.1785475898438],
                                        [113.531219511719, 25.1978591132813],
                                        [113.556116972656, 25.3074513984375],
                                        [113.577345, 25.313843],
                                        [113.611971464844, 25.3298757148438],
                                        [113.662345, 25.3398317695313],
                                        [113.672965117188, 25.3377321601563],
                                        [113.684920683594, 25.3544118476563],
                                        [113.712345, 25.3598317695313],
                                        [113.727345, 25.3568679023438],
                                        [113.745445585938, 25.3604445625001],
                                        [113.767503691406, 25.3296681953125],
                                        [113.816429472656, 25.3386135078125],
                                        [113.836673613281, 25.3668581367188],
                                        [113.877769804688, 25.3906838203126],
                                        [113.883333769531, 25.418843],
                                        [113.879251738281, 25.439497296875],
                                        [113.937345, 25.4438430000001],
                                        [113.967017851563, 25.4568556953126],
                                        [113.994486113281, 25.4392702460938],
                                        [113.973673125, 25.4088796210938],
                                        [114.007345, 25.403843],
                                        [114.011519804688, 25.3980178046876],
                                        [114.034666777344, 25.3890895820313],
                                        [114.020023222656, 25.3785964179688],
                                        [114.043472929688, 25.3695510078125],
                                        [114.041356230469, 25.358843],
                                        [114.043455839844, 25.3482228828126],
                                        [114.023392363281, 25.3338430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "乳源瑶族自治县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.177345, 24.563843],
                                        [113.180767851563, 24.5760353828125],
                                        [113.189537382813, 24.5672658515625],
                                        [113.177345, 24.563843]
                                    ]
                                ],
                                [
                                    [
                                        [113.177345, 24.563843],
                                        [113.177345, 24.553843],
                                        [113.197345, 24.553843],
                                        [113.197345, 24.523843],
                                        [113.207345, 24.523843],
                                        [113.207345, 24.503843],
                                        [113.199403105469, 24.4781252265625],
                                        [113.172345, 24.4797365546875],
                                        [113.150679960938, 24.4784450507813],
                                        [113.096168242188, 24.5080666328125],
                                        [113.078294707031, 24.4691237617188],
                                        [113.035299101563, 24.4803224921875],
                                        [112.992625761719, 24.5391237617188],
                                        [112.967345, 24.553843],
                                        [112.959176054688, 24.5856740546876],
                                        [112.927171660156, 24.6077712226563],
                                        [112.881732207031, 24.5975856757813],
                                        [112.873260527344, 24.6072145820312],
                                        [112.893260527344, 24.6379274726563],
                                        [112.906781035156, 24.67405784375],
                                        [112.896912871094, 24.7180690742188],
                                        [112.934932890625, 24.7322951484376],
                                        [112.929456816406, 24.7567287421875],
                                        [112.954339628906, 24.7949416328125],
                                        [112.948531523438, 24.82085471875],
                                        [112.989173613281, 24.8489138007813],
                                        [113.016546660156, 24.8591579414063],
                                        [112.998988066406, 24.9158034492188],
                                        [112.987345, 24.923843],
                                        [112.98970828125, 24.94147971875],
                                        [113.009359160156, 24.9475588203125],
                                        [112.995330839844, 24.9601271796875],
                                        [113.007345, 24.963843],
                                        [113.027022734375, 24.968891828125],
                                        [113.041673613281, 24.9901149726563],
                                        [113.067840605469, 24.9842482734376],
                                        [113.086900664063, 25.0135182929688],
                                        [113.073260527344, 25.0743654609375],
                                        [113.092218046875, 25.0799929023438],
                                        [113.114525175781, 25.0749904609375],
                                        [113.136654082031, 25.0902712226562],
                                        [113.151429472656, 25.1297585273438],
                                        [113.163260527344, 25.1379274726563],
                                        [113.172345, 25.1510842109375],
                                        [113.181429472656, 25.1379274726563],
                                        [113.199439726563, 25.1254909492188],
                                        [113.190186796875, 25.0842116523438],
                                        [113.207037382813, 25.0598073554688],
                                        [113.262345, 25.0722048164063],
                                        [113.277767363281, 25.0309889960938],
                                        [113.292345, 25.0277223945313],
                                        [113.312345, 25.0322048164063],
                                        [113.352183867188, 25.0232741523438],
                                        [113.392066679688, 25.0400270820313],
                                        [113.407345, 25.0366017890625],
                                        [113.423016386719, 25.0401149726563],
                                        [113.427345, 25.0338430000001],
                                        [113.431429472656, 25.0179274726563],
                                        [113.448255644531, 24.9920900703125],
                                        [113.456990996094, 24.9531154609376],
                                        [113.447345, 24.9138430000001],
                                        [113.415592070313, 24.8884157539062],
                                        [113.399820585938, 24.8509865546876],
                                        [113.424078398438, 24.8177809882813],
                                        [113.420618925781, 24.7899611640625],
                                        [113.370057402344, 24.7790212226563],
                                        [113.394210234375, 24.7688430000001],
                                        [113.389307890625, 24.7294191718751],
                                        [113.341790800781, 24.7093971992188],
                                        [113.325152617188, 24.6886183906251],
                                        [113.252042265625, 24.6779763007813],
                                        [113.241890898438, 24.6906520820313],
                                        [113.222345, 24.6882204414063],
                                        [113.194862089844, 24.6916384101563],
                                        [113.162738066406, 24.6681716132813],
                                        [113.151820097656, 24.6695290351563],
                                        [113.142899199219, 24.6282888007812],
                                        [113.13134890625, 24.6086428046876],
                                        [113.142899199219, 24.5993971992188],
                                        [113.153826933594, 24.5857497382813],
                                        [113.151656523438, 24.5683132148438],
                                        [113.177345, 24.563843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "始兴县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [114.177345, 24.663843],
                                        [114.187345, 24.663843],
                                        [114.187345, 24.6538430000001],
                                        [114.177345, 24.6538430000001],
                                        [114.177345, 24.663843]
                                    ]
                                ],
                                [
                                    [
                                        [114.177345, 24.663843],
                                        [114.167345, 24.663843],
                                        [114.167345, 24.6538430000001],
                                        [114.161922636719, 24.6327175117188],
                                        [114.111429472656, 24.6197585273438],
                                        [114.082345, 24.6075417304687],
                                        [114.0476575, 24.6221120429688],
                                        [114.029891386719, 24.5647927070313],
                                        [114.034984160156, 24.5420729804687],
                                        [114.000716582031, 24.5197585273438],
                                        [113.940728789063, 24.5418727851563],
                                        [113.913260527344, 24.5597585273438],
                                        [113.888983183594, 24.5688430000001],
                                        [113.896197539063, 24.6010231757812],
                                        [113.883260527344, 24.6197585273438],
                                        [113.877345, 24.623843],
                                        [113.89170046875, 24.65948753125],
                                        [113.910301542969, 24.673843],
                                        [113.891170683594, 24.688608625],
                                        [113.908721953125, 24.7177053046875],
                                        [113.952017851563, 24.7435988593751],
                                        [113.969967070313, 24.8286623359375],
                                        [113.937345, 24.853843],
                                        [113.900728789063, 24.9029006171875],
                                        [113.906280546875, 24.9404787421875],
                                        [113.930765410156, 24.936860578125],
                                        [113.919271269531, 25.0146364570313],
                                        [113.900611601563, 25.0290407539063],
                                        [113.92298953125, 25.0381984687501],
                                        [113.93170046875, 25.07948753125],
                                        [113.95298953125, 25.08819846875],
                                        [113.971954375, 25.0996388984376],
                                        [113.991832304688, 25.0967018867187],
                                        [113.997345, 25.1038430000001],
                                        [114.051937285156, 25.1396413398438],
                                        [114.077345, 25.1358864570313],
                                        [114.139222441406, 25.1450319648438],
                                        [114.17298953125, 25.0994875312501],
                                        [114.19170046875, 25.06819846875],
                                        [114.26170046875, 25.0395510078125],
                                        [114.25298953125, 24.9981984687501],
                                        [114.236910429688, 24.95730003125],
                                        [114.252345, 24.9595827460938],
                                        [114.277345, 24.9558864570313],
                                        [114.328699980469, 24.9634767890626],
                                        [114.387345, 24.9538430000001],
                                        [114.393104277344, 24.9289846015625],
                                        [114.390867949219, 24.9138430000001],
                                        [114.39611453125, 24.8783303046875],
                                        [114.35750125, 24.8485256171876],
                                        [114.330455351563, 24.7866335273438],
                                        [114.335638457031, 24.7515627265626],
                                        [114.28170046875, 24.72948753125],
                                        [114.27298953125, 24.70819846875],
                                        [114.166986113281, 24.6901930976563],
                                        [114.177345, 24.663843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "翁源县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [114.276129179688, 24.6339748359376],
                                        [114.300225859375, 24.5799758125],
                                        [114.307345, 24.5738430000001],
                                        [114.302899199219, 24.5582888007813],
                                        [114.266536894531, 24.5291725898438],
                                        [114.303407011719, 24.4786989570313],
                                        [114.239046660156, 24.4271999335938],
                                        [114.251790800781, 24.3682888007813],
                                        [114.288487578125, 24.3577980781251],
                                        [114.271678496094, 24.3292018867188],
                                        [114.27490359375, 24.3032814765625],
                                        [114.262899199219, 24.2882888007813],
                                        [114.257345, 24.283843],
                                        [114.251541777344, 24.2968337226563],
                                        [114.247345, 24.2738430000001],
                                        [114.210975371094, 24.2702126289063],
                                        [114.182491484375, 24.2569020820313],
                                        [114.172198515625, 24.2607839179687],
                                        [114.143714628906, 24.2474733710938],
                                        [114.110975371094, 24.2402126289062],
                                        [114.078182402344, 24.2248903632813],
                                        [114.084229765625, 24.208843],
                                        [114.080460234375, 24.198843],
                                        [114.086370878906, 24.1831618476563],
                                        [114.070404082031, 24.148989484375],
                                        [114.075924101563, 24.1343508125001],
                                        [114.050819121094, 24.1202126289063],
                                        [114.033228789063, 24.1510622382813],
                                        [114.004998808594, 24.1404201484375],
                                        [113.993714628906, 24.1602126289063],
                                        [113.972655058594, 24.1722194648437],
                                        [113.963714628906, 24.2002126289063],
                                        [113.917345, 24.203843],
                                        [113.895394316406, 24.2102858710937],
                                        [113.882806425781, 24.2393044257813],
                                        [113.871883574219, 24.2483815742188],
                                        [113.862735625, 24.2593923164063],
                                        [113.852345, 24.2583327460938],
                                        [113.840882597656, 24.2595021796875],
                                        [113.842855253906, 24.278843],
                                        [113.840816679688, 24.298843],
                                        [113.844427519531, 24.3342653632813],
                                        [113.811883574219, 24.3483815742188],
                                        [113.791886015625, 24.4017629218751],
                                        [113.753690214844, 24.4334938789063],
                                        [113.725819121094, 24.4483815742188],
                                        [113.709058867188, 24.4097389960938],
                                        [113.684569121094, 24.4392214179688],
                                        [113.677345, 24.4638430000001],
                                        [113.677345, 24.473843],
                                        [113.667345, 24.473843],
                                        [113.654256621094, 24.5103224921876],
                                        [113.67593875, 24.5575661445313],
                                        [113.71209109375, 24.55972190625],
                                        [113.72209109375, 24.5485305],
                                        [113.732611113281, 24.5491579414063],
                                        [113.746395292969, 24.5191237617188],
                                        [113.770037871094, 24.54743675],
                                        [113.786282988281, 24.61726096875],
                                        [113.877345, 24.623843],
                                        [113.883260527344, 24.6197585273438],
                                        [113.896197539063, 24.6010231757812],
                                        [113.888983183594, 24.5688430000001],
                                        [113.913260527344, 24.5597585273438],
                                        [113.940728789063, 24.5418727851563],
                                        [114.000716582031, 24.5197585273438],
                                        [114.034984160156, 24.5420729804687],
                                        [114.029891386719, 24.5647927070313],
                                        [114.0476575, 24.6221120429688],
                                        [114.082345, 24.6075417304687],
                                        [114.111429472656, 24.6197585273438],
                                        [114.161922636719, 24.6327175117188],
                                        [114.167345, 24.6538430000001],
                                        [114.177345, 24.6538430000001],
                                        [114.187345, 24.6538430000001],
                                        [114.276129179688, 24.6339748359376]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "武江区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.497345, 24.8738430000001],
                                        [113.485152617188, 24.8704201484375],
                                        [113.493922148438, 24.8616506171876],
                                        [113.512899199219, 24.8782888007813],
                                        [113.527183867188, 24.89612815625],
                                        [113.543011503906, 24.8692018867187],
                                        [113.537530546875, 24.8251345039063],
                                        [113.58150515625, 24.8306032539063],
                                        [113.586341582031, 24.791704328125],
                                        [113.562408476563, 24.7269631171875],
                                        [113.507345, 24.733843],
                                        [113.477684355469, 24.7172389960938],
                                        [113.438826933594, 24.6668947578125],
                                        [113.42298953125, 24.6281984687501],
                                        [113.40170046875, 24.61948753125],
                                        [113.39298953125, 24.60819846875],
                                        [113.33170046875, 24.5994875312501],
                                        [113.31978640625, 24.584048078125],
                                        [113.262916289063, 24.5924538398438],
                                        [113.25298953125, 24.56819846875],
                                        [113.22170046875, 24.54948753125],
                                        [113.21298953125, 24.52819846875],
                                        [113.207345, 24.523843],
                                        [113.197345, 24.523843],
                                        [113.197345, 24.553843],
                                        [113.177345, 24.553843],
                                        [113.177345, 24.563843],
                                        [113.189537382813, 24.5672658515625],
                                        [113.180767851563, 24.5760353828125],
                                        [113.177345, 24.563843],
                                        [113.151656523438, 24.5683132148438],
                                        [113.153826933594, 24.5857497382813],
                                        [113.142899199219, 24.5993971992188],
                                        [113.13134890625, 24.6086428046876],
                                        [113.142899199219, 24.6282888007812],
                                        [113.151820097656, 24.6695290351563],
                                        [113.162738066406, 24.6681716132813],
                                        [113.194862089844, 24.6916384101563],
                                        [113.222345, 24.6882204414063],
                                        [113.241890898438, 24.6906520820313],
                                        [113.252042265625, 24.6779763007813],
                                        [113.325152617188, 24.6886183906251],
                                        [113.341790800781, 24.7093971992188],
                                        [113.389307890625, 24.7294191718751],
                                        [113.394210234375, 24.7688430000001],
                                        [113.370057402344, 24.7790212226563],
                                        [113.420618925781, 24.7899611640625],
                                        [113.424078398438, 24.8177809882813],
                                        [113.399820585938, 24.8509865546876],
                                        [113.415592070313, 24.8884157539062],
                                        [113.447345, 24.9138430000001],
                                        [113.493985625, 24.8904836250001],
                                        [113.497345, 24.8738430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "新丰县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [114.247345, 24.2738430000001],
                                        [114.25197390625, 24.25847190625],
                                        [114.26271609375, 24.23921409375],
                                        [114.27197390625, 24.2184719062501],
                                        [114.292877226563, 24.2004616523438],
                                        [114.290921660156, 24.1761208320313],
                                        [114.332345, 24.1280397773438],
                                        [114.342669707031, 24.1400221992188],
                                        [114.367345, 24.1380397773438],
                                        [114.410726347656, 24.1415261054687],
                                        [114.428253203125, 24.1211794257813],
                                        [114.473072539063, 24.1175783515625],
                                        [114.4618371875, 24.1690993476563],
                                        [114.537691679688, 24.2326369453126],
                                        [114.552345, 24.2496462226563],
                                        [114.56197390625, 24.23847190625],
                                        [114.588922148438, 24.2264455390626],
                                        [114.593204375, 24.173149640625],
                                        [114.56197390625, 24.15921409375],
                                        [114.557345, 24.133843],
                                        [114.552857695313, 24.1280275703125],
                                        [114.542345, 24.1295827460937],
                                        [114.532345, 24.1281032539063],
                                        [114.521954375, 24.1296388984375],
                                        [114.502735625, 24.1180471015625],
                                        [114.491807890625, 24.1196608710938],
                                        [114.47298953125, 24.0881984687501],
                                        [114.44170046875, 24.0694875312501],
                                        [114.430943632813, 24.0308522773438],
                                        [114.412345, 24.0281032539063],
                                        [114.401832304688, 24.0296584296875],
                                        [114.39298953125, 24.0181984687501],
                                        [114.381529570313, 24.0093556953126],
                                        [114.383179960938, 23.9981911445313],
                                        [114.369920683594, 23.9201345039063],
                                        [114.35298953125, 23.8981984687501],
                                        [114.347345, 23.8938430000001],
                                        [114.322515898438, 23.8992580390625],
                                        [114.307345, 23.8980397773438],
                                        [114.278792753906, 23.9003346992188],
                                        [114.23271609375, 23.9226247382813],
                                        [114.26271609375, 23.9484719062501],
                                        [114.27197390625, 23.96288596875],
                                        [114.20814578125, 23.93944846875],
                                        [114.172345, 23.9594216132813],
                                        [114.15271609375, 23.9484719062501],
                                        [114.12197390625, 23.9392140937501],
                                        [114.102623320313, 23.9284181953125],
                                        [114.092345, 23.9292458320313],
                                        [114.077345, 23.9280397773438],
                                        [114.051373320313, 23.9301271796875],
                                        [114.03271609375, 23.9084719062501],
                                        [114.027345, 23.903843],
                                        [114.02271609375, 23.91921409375],
                                        [114.006065703125, 23.9335622382813],
                                        [113.937345, 23.9280397773438],
                                        [113.922345, 23.9292458320313],
                                        [113.907345, 23.9280397773438],
                                        [113.892345, 23.9292458320313],
                                        [113.882345, 23.9284401679688],
                                        [113.857291289063, 23.930454328125],
                                        [113.797345, 23.903843],
                                        [113.792493925781, 23.9212599921875],
                                        [113.76298953125, 23.95948753125],
                                        [113.723558378906, 23.9756252265625],
                                        [113.719598417969, 24.002426984375],
                                        [113.747345, 24.023843],
                                        [113.772303496094, 24.0299733710938],
                                        [113.783016386719, 24.0275710273438],
                                        [113.795513945313, 24.0456740546876],
                                        [113.8367590625, 24.0741506171875],
                                        [113.831224394531, 24.098843],
                                        [113.833465605469, 24.108843],
                                        [113.831065703125, 24.1195510078125],
                                        [113.865611601563, 24.1392702460938],
                                        [113.859132109375, 24.1681716132813],
                                        [113.891097441406, 24.1902443671875],
                                        [113.905697050781, 24.1869704414063],
                                        [113.917345, 24.203843],
                                        [113.963714628906, 24.2002126289063],
                                        [113.972655058594, 24.1722194648437],
                                        [113.993714628906, 24.1602126289063],
                                        [114.004998808594, 24.1404201484375],
                                        [114.033228789063, 24.1510622382813],
                                        [114.050819121094, 24.1202126289063],
                                        [114.075924101563, 24.1343508125001],
                                        [114.070404082031, 24.148989484375],
                                        [114.086370878906, 24.1831618476563],
                                        [114.080460234375, 24.198843],
                                        [114.084229765625, 24.208843],
                                        [114.078182402344, 24.2248903632813],
                                        [114.110975371094, 24.2402126289062],
                                        [114.143714628906, 24.2474733710938],
                                        [114.172198515625, 24.2607839179687],
                                        [114.182491484375, 24.2569020820313],
                                        [114.210975371094, 24.2702126289063],
                                        [114.247345, 24.2738430000001]
                                    ]
                                ],
                                [
                                    [
                                        [114.247345, 24.2738430000001],
                                        [114.251541777344, 24.2968337226563],
                                        [114.257345, 24.283843],
                                        [114.257345, 24.2738430000001],
                                        [114.247345, 24.2738430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "浈江区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.497345, 24.8738430000001],
                                        [113.493922148438, 24.8616506171876],
                                        [113.485152617188, 24.8704201484375],
                                        [113.497345, 24.8738430000001]
                                    ]
                                ],
                                [
                                    [
                                        [113.497345, 24.8738430000001],
                                        [113.493985625, 24.8904836250001],
                                        [113.447345, 24.9138430000001],
                                        [113.456990996094, 24.9531154609376],
                                        [113.448255644531, 24.9920900703125],
                                        [113.431429472656, 25.0179274726563],
                                        [113.427345, 25.0338430000001],
                                        [113.441632109375, 25.0452834296876],
                                        [113.454525175781, 25.0758815742188],
                                        [113.517345, 25.093843],
                                        [113.572869902344, 25.0171144843751],
                                        [113.571849394531, 24.9913576484376],
                                        [113.611009550781, 24.9490944648438],
                                        [113.631812773438, 24.9482692695313],
                                        [113.688963652344, 24.97851096875],
                                        [113.722154570313, 24.9798268867188],
                                        [113.692535429688, 24.9386525703125],
                                        [113.67341921875, 24.9209401679688],
                                        [113.67170046875, 24.877602765625],
                                        [113.697345, 24.853843],
                                        [113.701429472656, 24.8479274726562],
                                        [113.720726347656, 24.83460471875],
                                        [113.698433867188, 24.7750295234375],
                                        [113.642491484375, 24.7576882148438],
                                        [113.632345, 24.7599636054688],
                                        [113.622345, 24.7577223945313],
                                        [113.600023222656, 24.7627272773438],
                                        [113.581007109375, 24.7119069648438],
                                        [113.561732207031, 24.7075856757813],
                                        [113.517667265625, 24.718891828125],
                                        [113.507345, 24.733843],
                                        [113.562408476563, 24.7269631171875],
                                        [113.586341582031, 24.791704328125],
                                        [113.58150515625, 24.8306032539063],
                                        [113.537530546875, 24.8251345039063],
                                        [113.543011503906, 24.8692018867187],
                                        [113.527183867188, 24.89612815625],
                                        [113.512899199219, 24.8782888007813],
                                        [113.497345, 24.8738430000001]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });
            define("echarts/util/mapData/geoJson/shenzhen", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "name": "南山区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.987345, 22.533843],
                                        [113.952379179688, 22.5280983710938],
                                        [113.934823027344, 22.5306935859375],
                                        [113.92298953125, 22.4881984687501],
                                        [113.91170046875, 22.47948753125],
                                        [113.893485136719, 22.4558864570313],
                                        [113.88298953125, 22.4694875312501],
                                        [113.87170046875, 22.47819846875],
                                        [113.86298953125, 22.5059206367188],
                                        [113.89298953125, 22.51819846875],
                                        [113.897345, 22.543843],
                                        [113.911429472656, 22.5697585273437],
                                        [113.923616972656, 22.5781716132813],
                                        [113.919888945313, 22.5947927070313],
                                        [113.936092558594, 22.6579274726563],
                                        [113.965089140625, 22.6492092109375],
                                        [114.008211699219, 22.6194362617188],
                                        [114.017345, 22.583843],
                                        [113.99896609375, 22.579126203125],
                                        [113.987345, 22.533843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "盐田区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [114.337345, 22.603843],
                                        [114.347345, 22.603843],
                                        [114.342345, 22.5910353828125],
                                        [114.337345, 22.603843]
                                    ]
                                ],
                                [
                                    [
                                        [114.337345, 22.603843],
                                        [114.32263796875, 22.5980617500001],
                                        [114.311954375, 22.5996388984375],
                                        [114.292735625, 22.5880471015625],
                                        [114.2819153125, 22.5896462226563],
                                        [114.242323027344, 22.5602907539063],
                                        [114.237345, 22.5538430000001],
                                        [114.227345, 22.5538430000001],
                                        [114.197345, 22.5538430000001],
                                        [114.197345, 22.573843],
                                        [114.217345, 22.573843],
                                        [114.217345, 22.5938430000001],
                                        [114.223531523438, 22.5976564765625],
                                        [114.234969511719, 22.6162184882813],
                                        [114.253531523438, 22.6276564765625],
                                        [114.261671171875, 22.6515383125001],
                                        [114.29181765625, 22.6271218085938],
                                        [114.302740507813, 22.6305226875],
                                        [114.333531523438, 22.6200295234375],
                                        [114.337345, 22.603843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "宝安区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.983895292969, 22.8003932929688],
                                        [114.003238554688, 22.7625051093751],
                                        [114.022345, 22.77108909375],
                                        [114.032345, 22.76659690625],
                                        [114.04330203125, 22.77151878125],
                                        [114.051495390625, 22.7559645820313],
                                        [114.072345, 22.74659690625],
                                        [114.092345, 22.75558128125],
                                        [114.100794707031, 22.7272927070313],
                                        [114.107345, 22.723843],
                                        [114.089752226563, 22.6969655585937],
                                        [114.095008574219, 22.670356671875],
                                        [114.082345, 22.6678542304687],
                                        [114.054234648438, 22.6734084296875],
                                        [114.043819609375, 22.6207033515626],
                                        [114.067345, 22.603843],
                                        [114.067345, 22.5938430000001],
                                        [114.057345, 22.5938430000001],
                                        [114.043985625, 22.587202375],
                                        [114.017345, 22.583843],
                                        [114.008211699219, 22.6194362617188],
                                        [113.965089140625, 22.6492092109375],
                                        [113.936092558594, 22.6579274726563],
                                        [113.919888945313, 22.5947927070313],
                                        [113.923616972656, 22.5781716132813],
                                        [113.911429472656, 22.5697585273437],
                                        [113.897345, 22.543843],
                                        [113.881429472656, 22.5479274726563],
                                        [113.873016386719, 22.5601149726563],
                                        [113.853016386719, 22.555630109375],
                                        [113.832274199219, 22.5856716132813],
                                        [113.819176054688, 22.6206740546875],
                                        [113.794105253906, 22.65917503125],
                                        [113.781429472656, 22.6679274726563],
                                        [113.761534453125, 22.6967409492188],
                                        [113.757345, 22.7438430000001],
                                        [113.783895292969, 22.7572927070313],
                                        [113.797694121094, 22.7834938789062],
                                        [113.840374785156, 22.8059719062501],
                                        [113.829566679688, 22.8300270820313],
                                        [113.853895292969, 22.8372927070313],
                                        [113.877345, 22.8554714179688],
                                        [113.900794707031, 22.8372927070313],
                                        [113.943895292969, 22.8303932929688],
                                        [113.950794707031, 22.8172927070313],
                                        [113.983895292969, 22.8003932929688]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "福田区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [114.061429472656, 22.5097585273438],
                                        [114.037345, 22.503843],
                                        [114.022938261719, 22.5247096992188],
                                        [113.987345, 22.533843],
                                        [113.99896609375, 22.579126203125],
                                        [114.017345, 22.583843],
                                        [114.043985625, 22.587202375],
                                        [114.057345, 22.5938430000001],
                                        [114.06406375, 22.58056175],
                                        [114.093319121094, 22.5657619453126],
                                        [114.097345, 22.533843],
                                        [114.079222441406, 22.5301833320313],
                                        [114.087345, 22.5138430000001],
                                        [114.061429472656, 22.5097585273438]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "龙岗区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [114.233746367188, 22.7908522773438],
                                        [114.2527746875, 22.7880397773438],
                                        [114.2819153125, 22.8096462226563],
                                        [114.307345, 22.8058864570312],
                                        [114.344945097656, 22.8114430976563],
                                        [114.340667753906, 22.7824929023438],
                                        [114.358426542969, 22.75948753125],
                                        [114.38298953125, 22.76819846875],
                                        [114.410709257813, 22.7849196601563],
                                        [114.413822050781, 22.763843],
                                        [114.40724734375, 22.7193556953126],
                                        [114.434486113281, 22.6983303046876],
                                        [114.429744902344, 22.6662429023438],
                                        [114.457345, 22.6703200507813],
                                        [114.472379179688, 22.6680983710938],
                                        [114.507345, 22.6738430000001],
                                        [114.497784453125, 22.6478029609375],
                                        [114.59197390625, 22.660571515625],
                                        [114.573053007813, 22.615395734375],
                                        [114.54271609375, 22.59847190625],
                                        [114.49271609375, 22.5834181953126],
                                        [114.503673125, 22.5420583320313],
                                        [114.542432890625, 22.5695412421876],
                                        [114.5566028125, 22.5530983710938],
                                        [114.611319609375, 22.5366262031251],
                                        [114.614185820313, 22.5009548164063],
                                        [114.54197390625, 22.47921409375],
                                        [114.499664335938, 22.44921409375],
                                        [114.48025515625, 22.4978200507813],
                                        [114.483629179688, 22.5398146796876],
                                        [114.46197390625, 22.55847190625],
                                        [114.45271609375, 22.5692140937501],
                                        [114.44197390625, 22.5784719062501],
                                        [114.412020292969, 22.6132350898438],
                                        [114.35271609375, 22.6084719062501],
                                        [114.347345, 22.603843],
                                        [114.337345, 22.603843],
                                        [114.333531523438, 22.6200295234375],
                                        [114.302740507813, 22.6305226875],
                                        [114.29181765625, 22.6271218085938],
                                        [114.261671171875, 22.6515383125001],
                                        [114.253531523438, 22.6276564765625],
                                        [114.234969511719, 22.6162184882813],
                                        [114.223531523438, 22.5976564765625],
                                        [114.217345, 22.5938430000001],
                                        [114.181109648438, 22.6171169257812],
                                        [114.123768339844, 22.594575421875],
                                        [114.067345, 22.603843],
                                        [114.043819609375, 22.6207033515626],
                                        [114.054234648438, 22.6734084296875],
                                        [114.082345, 22.6678542304687],
                                        [114.095008574219, 22.670356671875],
                                        [114.089752226563, 22.6969655585937],
                                        [114.107345, 22.723843],
                                        [114.13634890625, 22.7185524726563],
                                        [114.153470488281, 22.6878615546875],
                                        [114.151243925781, 22.6601369453125],
                                        [114.180433378906, 22.6577907539063],
                                        [114.211678496094, 22.7428786445313],
                                        [114.174935332031, 22.7745363593751],
                                        [114.20271609375, 22.7984719062501],
                                        [114.21197390625, 22.80921409375],
                                        [114.227345, 22.813843],
                                        [114.233746367188, 22.7908522773438]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "罗湖区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [114.181109648438, 22.6171169257812],
                                        [114.217345, 22.5938430000001],
                                        [114.217345, 22.573843],
                                        [114.197345, 22.573843],
                                        [114.197345, 22.5538430000001],
                                        [114.16466921875, 22.5618679023438],
                                        [114.129386015625, 22.538891828125],
                                        [114.097345, 22.533843],
                                        [114.093319121094, 22.5657619453126],
                                        [114.06406375, 22.58056175],
                                        [114.057345, 22.5938430000001],
                                        [114.067345, 22.5938430000001],
                                        [114.067345, 22.603843],
                                        [114.123768339844, 22.594575421875],
                                        [114.181109648438, 22.6171169257812]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });
            define("echarts/util/mapData/geoJson/zhuhai", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "name": "斗门区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.377345, 22.193843],
                                        [113.389537382813, 22.1972658515626],
                                        [113.380767851563, 22.2060353828125],
                                        [113.362623320313, 22.2000270820313],
                                        [113.349383574219, 22.1970583320313],
                                        [113.356229277344, 22.1665212226563],
                                        [113.311429472656, 22.1497585273437],
                                        [113.27076296875, 22.12327659375],
                                        [113.253260527344, 22.0979274726563],
                                        [113.237345, 22.0938430000001],
                                        [113.233922148438, 22.1060353828125],
                                        [113.225152617188, 22.0972658515625],
                                        [113.237345, 22.0938430000001],
                                        [113.227620878906, 22.0797585273438],
                                        [113.203260527344, 22.1070949531251],
                                        [113.21166140625, 22.1201174140626],
                                        [113.2262903125, 22.1168386054688],
                                        [113.235501738281, 22.1579274726563],
                                        [113.201429472656, 22.1497585273437],
                                        [113.19267703125, 22.1370827460938],
                                        [113.138587675781, 22.101860578125],
                                        [113.107345, 22.0938430000001],
                                        [113.118162871094, 22.1378884101563],
                                        [113.106776152344, 22.1886818671875],
                                        [113.117345, 22.2138430000001],
                                        [113.127345, 22.2138430000001],
                                        [113.127345, 22.223843],
                                        [113.158470488281, 22.2327419257813],
                                        [113.191336699219, 22.3478444648438],
                                        [113.152899199219, 22.4004640937501],
                                        [113.172899199219, 22.3993971992188],
                                        [113.192345, 22.38796409375],
                                        [113.21373171875, 22.4005373359376],
                                        [113.232628203125, 22.3981862617188],
                                        [113.247345, 22.4038430000001],
                                        [113.278533964844, 22.382309796875],
                                        [113.313260527344, 22.3297585273438],
                                        [113.340513945313, 22.2520119453125],
                                        [113.3857825, 22.23507346875],
                                        [113.407345, 22.203843],
                                        [113.413985625, 22.1904836250001],
                                        [113.417345, 22.163843],
                                        [113.41267703125, 22.1570827460938],
                                        [113.382542753906, 22.1374587226563],
                                        [113.367345, 22.143843],
                                        [113.370704375, 22.180483625],
                                        [113.377345, 22.193843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "金湾区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.167345, 21.8638430000001],
                                        [113.187345, 21.8638430000001],
                                        [113.177345, 21.8498903632813],
                                        [113.167345, 21.8638430000001]
                                    ]
                                ],
                                [
                                    [
                                        [113.187345, 21.8638430000001],
                                        [113.190767851563, 21.8760353828125],
                                        [113.199537382813, 21.8672658515625],
                                        [113.187345, 21.8638430000001]
                                    ]
                                ],
                                [
                                    [
                                        [113.157345, 21.8638430000001],
                                        [113.135260039063, 21.8391237617188],
                                        [113.122679472656, 21.8762819648438],
                                        [113.157345, 21.8638430000001]
                                    ]
                                ],
                                [
                                    [
                                        [113.167345, 21.8638430000001],
                                        [113.157345, 21.8638430000001],
                                        [113.162345, 21.8766506171875],
                                        [113.167345, 21.8638430000001]
                                    ]
                                ],
                                [
                                    [
                                        [113.127345, 21.913843],
                                        [113.123922148438, 21.9016506171875],
                                        [113.115152617188, 21.9104201484375],
                                        [113.127345, 21.913843]
                                    ]
                                ],
                                [
                                    [
                                        [113.127345, 21.913843],
                                        [113.134334746094, 21.9382888007813],
                                        [113.151282988281, 21.9206862617188],
                                        [113.127345, 21.913843]
                                    ]
                                ],
                                [
                                    [
                                        [113.237252226563, 21.9537721992188],
                                        [113.252345, 21.94640159375],
                                        [113.267298613281, 21.9537038398438],
                                        [113.280704375, 21.9272023750001],
                                        [113.2972278125, 21.918843],
                                        [113.279420195313, 21.9098342109376],
                                        [113.285269804688, 21.8978517890626],
                                        [113.270704375, 21.890483625],
                                        [113.267345, 21.883843],
                                        [113.252359648438, 21.8912917304688],
                                        [113.241353789063, 21.8859181953125],
                                        [113.233985625, 21.900483625],
                                        [113.215428496094, 21.9098708320313],
                                        [113.237252226563, 21.9537721992188]
                                    ]
                                ],
                                [
                                    [
                                        [113.163922148438, 21.9560353828125],
                                        [113.167345, 21.9438430000001],
                                        [113.155152617188, 21.9472658515625],
                                        [113.163922148438, 21.9560353828125]
                                    ]
                                ],
                                [
                                    [
                                        [113.437345, 22.073843],
                                        [113.449537382813, 22.0704201484376],
                                        [113.440767851563, 22.0616506171875],
                                        [113.437345, 22.073843]
                                    ]
                                ],
                                [
                                    [
                                        [113.437345, 22.073843],
                                        [113.425152617188, 22.0772658515626],
                                        [113.433922148438, 22.0860353828125],
                                        [113.437345, 22.073843]
                                    ]
                                ],
                                [
                                    [
                                        [113.237345, 22.0938430000001],
                                        [113.225152617188, 22.0972658515625],
                                        [113.233922148438, 22.1060353828125],
                                        [113.237345, 22.0938430000001]
                                    ]
                                ],
                                [
                                    [
                                        [113.377345, 22.193843],
                                        [113.370704375, 22.180483625],
                                        [113.367345, 22.143843],
                                        [113.377508574219, 22.0840065742188],
                                        [113.413612089844, 22.0692311835938],
                                        [113.390282011719, 22.0305544257813],
                                        [113.406785917969, 22.0031935859376],
                                        [113.364813261719, 21.9969924140626],
                                        [113.305235625, 22.0095632148438],
                                        [113.289920683594, 22.0469850898438],
                                        [113.251031523438, 22.0527321601563],
                                        [113.253084746094, 22.038843],
                                        [113.250867949219, 22.0238430000001],
                                        [113.253167753906, 22.0082717109375],
                                        [113.212594023438, 21.9916652656251],
                                        [113.199422636719, 21.95948753125],
                                        [113.1815246875, 21.968286359375],
                                        [113.18447390625, 21.9882448554688],
                                        [113.17298953125, 22.02948753125],
                                        [113.113804960938, 22.0706447578125],
                                        [113.107345, 22.0938430000001],
                                        [113.138587675781, 22.101860578125],
                                        [113.19267703125, 22.1370827460938],
                                        [113.201429472656, 22.1497585273437],
                                        [113.235501738281, 22.1579274726563],
                                        [113.2262903125, 22.1168386054688],
                                        [113.21166140625, 22.1201174140626],
                                        [113.203260527344, 22.1070949531251],
                                        [113.227620878906, 22.0797585273438],
                                        [113.237345, 22.0938430000001],
                                        [113.253260527344, 22.0979274726563],
                                        [113.27076296875, 22.12327659375],
                                        [113.311429472656, 22.1497585273437],
                                        [113.356229277344, 22.1665212226563],
                                        [113.349383574219, 22.1970583320313],
                                        [113.362623320313, 22.2000270820313],
                                        [113.377345, 22.193843]
                                    ]
                                ],
                                [
                                    [
                                        [113.377345, 22.193843],
                                        [113.380767851563, 22.2060353828125],
                                        [113.389537382813, 22.1972658515626],
                                        [113.377345, 22.193843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "香洲区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.963922148438, 21.8360353828125],
                                        [113.967345, 21.8238430000001],
                                        [113.955152617188, 21.8272658515625],
                                        [113.963922148438, 21.8360353828125]
                                    ]
                                ],
                                [
                                    [
                                        [114.013922148438, 21.8760353828125],
                                        [114.017345, 21.8638430000001],
                                        [114.005152617188, 21.8672658515625],
                                        [114.013922148438, 21.8760353828125]
                                    ]
                                ],
                                [
                                    [
                                        [114.033922148438, 21.8960353828125],
                                        [114.037345, 21.883843],
                                        [114.025152617188, 21.8872658515626],
                                        [114.033922148438, 21.8960353828125]
                                    ]
                                ],
                                [
                                    [
                                        [114.061910429688, 21.9065407539063],
                                        [114.067345, 21.893843],
                                        [114.044346953125, 21.897895734375],
                                        [114.061910429688, 21.9065407539063]
                                    ]
                                ],
                                [
                                    [
                                        [113.743748808594, 21.939087140625],
                                        [113.737345, 21.923843],
                                        [113.703260527344, 21.9325905585938],
                                        [113.730074492188, 21.9579274726563],
                                        [113.743748808594, 21.939087140625]
                                    ]
                                ],
                                [
                                    [
                                        [113.694195585938, 21.9654567695313],
                                        [113.697345, 21.9438430000001],
                                        [113.675159941406, 21.947075421875],
                                        [113.694195585938, 21.9654567695313]
                                    ]
                                ],
                                [
                                    [
                                        [114.133922148438, 21.9760353828125],
                                        [114.137345, 21.963843],
                                        [114.125152617188, 21.9672658515626],
                                        [114.133922148438, 21.9760353828125]
                                    ]
                                ],
                                [
                                    [
                                        [114.157345, 21.993843],
                                        [114.150260039063, 21.9803932929688],
                                        [114.12439578125, 21.9895607734375],
                                        [114.157345, 21.993843]
                                    ]
                                ],
                                [
                                    [
                                        [113.773475371094, 21.9888014960938],
                                        [113.767345, 21.963843],
                                        [113.733260527344, 21.9873757148438],
                                        [113.7701575, 22.0035964179688],
                                        [113.773475371094, 21.9888014960938]
                                    ]
                                ],
                                [
                                    [
                                        [114.157345, 21.993843],
                                        [114.160767851563, 22.0060353828126],
                                        [114.169537382813, 21.9972658515626],
                                        [114.157345, 21.993843]
                                    ]
                                ],
                                [
                                    [
                                        [113.831910429688, 22.0065407539063],
                                        [113.837345, 21.993843],
                                        [113.814346953125, 21.9978957343751],
                                        [113.831910429688, 22.0065407539063]
                                    ]
                                ],
                                [
                                    [
                                        [114.217345, 21.993843],
                                        [114.177345, 21.993843],
                                        [114.177345, 22.013843],
                                        [114.217345, 22.013843],
                                        [114.217345, 21.993843]
                                    ]
                                ],
                                [
                                    [
                                        [114.247345, 22.033843],
                                        [114.241783476563, 22.020844953125],
                                        [114.224620390625, 22.0298366523438],
                                        [114.247345, 22.033843]
                                    ]
                                ],
                                [
                                    [
                                        [113.716678496094, 22.034926984375],
                                        [113.727345, 22.013843],
                                        [113.693985625, 22.0180495429688],
                                        [113.716678496094, 22.034926984375]
                                    ]
                                ],
                                [
                                    [
                                        [113.663922148438, 22.0460353828125],
                                        [113.667345, 22.033843],
                                        [113.655152617188, 22.0372658515626],
                                        [113.663922148438, 22.0460353828125]
                                    ]
                                ],
                                [
                                    [
                                        [113.921910429688, 22.0465407539063],
                                        [113.927345, 22.033843],
                                        [113.904346953125, 22.0378957343751],
                                        [113.921910429688, 22.0465407539063]
                                    ]
                                ],
                                [
                                    [
                                        [114.247345, 22.033843],
                                        [114.258465605469, 22.0477297187501],
                                        [114.307345, 22.0538430000001],
                                        [114.29490359375, 22.0377248359375],
                                        [114.282310820313, 22.0395876289063],
                                        [114.247345, 22.033843]
                                    ]
                                ],
                                [
                                    [
                                        [113.993922148438, 22.0560353828125],
                                        [113.997345, 22.043843],
                                        [113.985152617188, 22.0472658515625],
                                        [113.993922148438, 22.0560353828125]
                                    ]
                                ],
                                [
                                    [
                                        [114.307345, 22.0538430000001],
                                        [114.310767851563, 22.0660353828125],
                                        [114.319537382813, 22.0572658515625],
                                        [114.307345, 22.0538430000001]
                                    ]
                                ],
                                [
                                    [
                                        [113.497345, 22.073843],
                                        [113.493922148438, 22.0616506171875],
                                        [113.485152617188, 22.0704201484376],
                                        [113.497345, 22.073843]
                                    ]
                                ],
                                [
                                    [
                                        [113.703922148438, 22.1060353828125],
                                        [113.707345, 22.0938430000001],
                                        [113.695152617188, 22.0972658515625],
                                        [113.703922148438, 22.1060353828125]
                                    ]
                                ],
                                [
                                    [
                                        [114.040501738281, 22.1177809882813],
                                        [114.047345, 22.0938430000001],
                                        [114.022899199219, 22.1008327460938],
                                        [114.040501738281, 22.1177809882813]
                                    ]
                                ],
                                [
                                    [
                                        [113.873922148438, 22.1260353828125],
                                        [113.877345, 22.113843],
                                        [113.865152617188, 22.1172658515626],
                                        [113.873922148438, 22.1260353828125]
                                    ]
                                ],
                                [
                                    [
                                        [113.893922148438, 22.1260353828125],
                                        [113.897345, 22.113843],
                                        [113.885152617188, 22.1172658515626],
                                        [113.893922148438, 22.1260353828125]
                                    ]
                                ],
                                [
                                    [
                                        [113.823338652344, 22.146567609375],
                                        [113.827345, 22.123843],
                                        [113.814346953125, 22.1294045234375],
                                        [113.823338652344, 22.146567609375]
                                    ]
                                ],
                                [
                                    [
                                        [113.803922148438, 22.1760353828125],
                                        [113.807345, 22.163843],
                                        [113.795152617188, 22.1672658515625],
                                        [113.803922148438, 22.1760353828125]
                                    ]
                                ],
                                [
                                    [
                                        [113.607345, 22.3238430000001],
                                        [113.610767851563, 22.3360353828125],
                                        [113.619537382813, 22.3272658515625],
                                        [113.607345, 22.3238430000001]
                                    ]
                                ],
                                [
                                    [
                                        [113.607345, 22.3238430000001],
                                        [113.603624296875, 22.3175637031251],
                                        [113.574110136719, 22.3078249335938],
                                        [113.584061308594, 22.278843],
                                        [113.580628691406, 22.268843],
                                        [113.590579863281, 22.2398610664063],
                                        [113.556004667969, 22.2284499335938],
                                        [113.547345, 22.2138430000001],
                                        [113.537345, 22.2138430000001],
                                        [113.527345, 22.2138430000001],
                                        [113.527345, 22.193843],
                                        [113.527345, 22.183843],
                                        [113.527345, 22.163843],
                                        [113.537345, 22.163843],
                                        [113.543985625, 22.1504836250001],
                                        [113.547345, 22.113843],
                                        [113.540833769531, 22.0983400703126],
                                        [113.561429472656, 22.0841188789063],
                                        [113.552843046875, 22.0776100898438],
                                        [113.531846953125, 22.0823171210938],
                                        [113.497345, 22.073843],
                                        [113.493260527344, 22.0797585273438],
                                        [113.468983183594, 22.088843],
                                        [113.474586210938, 22.113843],
                                        [113.467135039063, 22.1470827460938],
                                        [113.433209257813, 22.1705055976562],
                                        [113.417345, 22.163843],
                                        [113.413985625, 22.1904836250001],
                                        [113.407345, 22.203843],
                                        [113.452093535156, 22.2116310859376],
                                        [113.472899199219, 22.2282888007813],
                                        [113.481790800781, 22.2393971992188],
                                        [113.51107546875, 22.2628469062501],
                                        [113.487323027344, 22.2818679023438],
                                        [113.470553007813, 22.310395734375],
                                        [113.493079863281, 22.3284352851563],
                                        [113.480477324219, 22.3952663398438],
                                        [113.491790800781, 22.4093971992187],
                                        [113.547345, 22.413843],
                                        [113.562625761719, 22.4091237617188],
                                        [113.572435332031, 22.377358625],
                                        [113.611995878906, 22.3797170234376],
                                        [113.613238554688, 22.3588430000001],
                                        [113.583465605469, 22.3451784492188],
                                        [113.607345, 22.3238430000001]
                                    ]
                                ],
                                [
                                    [
                                        [113.799737578125, 22.4275124335938],
                                        [113.817345, 22.4038430000001],
                                        [113.773079863281, 22.4158425117188],
                                        [113.799737578125, 22.4275124335938]
                                    ]
                                ],
                                [
                                    [
                                        [113.631339140625, 22.389848859375],
                                        [113.627345, 22.383843],
                                        [113.603350859375, 22.3997975898438],
                                        [113.61353640625, 22.4253639960938],
                                        [113.661339140625, 22.437407453125],
                                        [113.645872832031, 22.3995143867188],
                                        [113.631339140625, 22.389848859375]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });
            define("echarts/util/mapData/geoJson/shantou", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "name": "南澳县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [117.283922148438, 23.2660353828125],
                                        [117.287345, 23.253843],
                                        [117.275152617188, 23.2572658515626],
                                        [117.283922148438, 23.2660353828125]
                                    ]
                                ],
                                [
                                    [
                                        [117.303922148438, 23.2860353828125],
                                        [117.307345, 23.2738430000001],
                                        [117.295152617188, 23.2772658515625],
                                        [117.303922148438, 23.2860353828125]
                                    ]
                                ],
                                [
                                    [
                                        [117.119229765625, 23.4832643867187],
                                        [117.146441679688, 23.4516799140625],
                                        [117.1319153125, 23.4391677070313],
                                        [117.13408328125, 23.4121950507813],
                                        [117.127345, 23.3938430000001],
                                        [117.112584257813, 23.399262921875],
                                        [117.102022734375, 23.3984157539063],
                                        [117.090728789063, 23.4115261054688],
                                        [117.035699492188, 23.4071047187501],
                                        [117.000787382813, 23.4199221015625],
                                        [116.974166289063, 23.4177834296875],
                                        [116.93271609375, 23.4307570625],
                                        [116.984742460938, 23.46847190625],
                                        [117.00197390625, 23.4484719062501],
                                        [117.02041140625, 23.432583234375],
                                        [117.053316679688, 23.4707741523438],
                                        [117.091363554688, 23.4677175117188],
                                        [117.119229765625, 23.4832643867187]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "濠江区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [116.707345, 23.343843],
                                        [116.747125273438, 23.3370851875],
                                        [116.757345, 23.323843],
                                        [116.76197390625, 23.30847190625],
                                        [116.772764921875, 23.2790822578126],
                                        [116.770709257813, 23.2534963203125],
                                        [116.808404570313, 23.2366774726563],
                                        [116.787345, 23.2122365546875],
                                        [116.772667265625, 23.2292702460938],
                                        [116.756651640625, 23.227983625],
                                        [116.738585234375, 23.26847190625],
                                        [116.7214465625, 23.2589235664063],
                                        [116.733287382813, 23.2487233710938],
                                        [116.677345, 23.223843],
                                        [116.660704375, 23.2272023750001],
                                        [116.65062625, 23.24712425],
                                        [116.630704375, 23.2572023750001],
                                        [116.617345, 23.283608625],
                                        [116.629185820313, 23.3078517890626],
                                        [116.610704375, 23.317202375],
                                        [116.607345, 23.343843],
                                        [116.634937773438, 23.3378249335938],
                                        [116.707345, 23.343843]
                                    ]
                                ],
                                [
                                    [
                                        [116.597345, 23.343843],
                                        [116.592628203125, 23.320483625],
                                        [116.564976835938, 23.3289577460938],
                                        [116.577345, 23.3538430000001],
                                        [116.597345, 23.343843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "金平区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [116.627345, 23.4338430000001],
                                        [116.632022734375, 23.4284133125],
                                        [116.697345, 23.4338430000001],
                                        [116.70197390625, 23.4084719062501],
                                        [116.712784453125, 23.3991579414062],
                                        [116.707345, 23.343843],
                                        [116.634937773438, 23.3378249335938],
                                        [116.607345, 23.343843],
                                        [116.597345, 23.343843],
                                        [116.577345, 23.3538430000001],
                                        [116.573985625, 23.3704836250001],
                                        [116.567345, 23.383843],
                                        [116.571158476563, 23.4100295234376],
                                        [116.586202421875, 23.4314577460938],
                                        [116.575201445313, 23.4667775703125],
                                        [116.611158476563, 23.4376564765625],
                                        [116.627345, 23.4338430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "龙湖区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [116.767345, 23.323843],
                                        [116.757345, 23.323843],
                                        [116.747125273438, 23.3370851875],
                                        [116.707345, 23.343843],
                                        [116.712784453125, 23.3991579414062],
                                        [116.70197390625, 23.4084719062501],
                                        [116.697345, 23.4338430000001],
                                        [116.697345, 23.4638430000001],
                                        [116.707345, 23.4638430000001],
                                        [116.734840117188, 23.4238576484376],
                                        [116.76123171875, 23.4027223945313],
                                        [116.767345, 23.3538430000001],
                                        [116.767345, 23.323843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "澄海区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [116.898878203125, 23.6183180976563],
                                        [116.91326296875, 23.5597585273437],
                                        [116.917345, 23.553843],
                                        [116.879151640625, 23.5494997382813],
                                        [116.89408328125, 23.5391896796875],
                                        [116.8741028125, 23.50851096875],
                                        [116.86107546875, 23.4995143867187],
                                        [116.863468046875, 23.488843],
                                        [116.86107546875, 23.4781716132813],
                                        [116.8751965625, 23.468423078125],
                                        [116.8394934375, 23.459262921875],
                                        [116.85326296875, 23.4497585273438],
                                        [116.86142703125, 23.4156862617188],
                                        [116.827652617188, 23.4232570625],
                                        [116.791007109375, 23.3701808906251],
                                        [116.767345, 23.3538430000001],
                                        [116.76123171875, 23.4027223945313],
                                        [116.734840117188, 23.4238576484376],
                                        [116.707345, 23.4638430000001],
                                        [116.700240507813, 23.5361061835938],
                                        [116.712926054688, 23.558843],
                                        [116.701920195313, 23.5785646796875],
                                        [116.703116484375, 23.5934206367188],
                                        [116.726124296875, 23.6084719062501],
                                        [116.752022734375, 23.5784157539063],
                                        [116.779205351563, 23.5805983710938],
                                        [116.79197390625, 23.60921409375],
                                        [116.822867460938, 23.6185158515626],
                                        [116.817345, 23.643843],
                                        [116.85326296875, 23.6397585273438],
                                        [116.86142703125, 23.6279274726562],
                                        [116.898878203125, 23.6183180976563]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "潮阳区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [116.347345, 23.453843],
                                        [116.350767851563, 23.4416506171875],
                                        [116.359537382813, 23.4504201484376],
                                        [116.355728789063, 23.4865041328125],
                                        [116.402066679688, 23.5129518867187],
                                        [116.413121367188, 23.4834084296875],
                                        [116.43380984375, 23.4697585273438],
                                        [116.457345, 23.5038430000001],
                                        [116.491900664063, 23.4970973945313],
                                        [116.467574492188, 23.4498805976563],
                                        [116.532545195313, 23.4340431953126],
                                        [116.56224734375, 23.3887429023438],
                                        [116.567345, 23.383843],
                                        [116.573985625, 23.3704836250001],
                                        [116.577345, 23.3538430000001],
                                        [116.564976835938, 23.3289577460938],
                                        [116.592628203125, 23.320483625],
                                        [116.597345, 23.343843],
                                        [116.607345, 23.343843],
                                        [116.610704375, 23.317202375],
                                        [116.629185820313, 23.3078517890626],
                                        [116.617345, 23.283608625],
                                        [116.630704375, 23.2572023750001],
                                        [116.65062625, 23.24712425],
                                        [116.660704375, 23.2272023750001],
                                        [116.677345, 23.223843],
                                        [116.66197390625, 23.19921409375],
                                        [116.649932890625, 23.1592311835938],
                                        [116.63271609375, 23.1792140937501],
                                        [116.61197390625, 23.1884719062501],
                                        [116.607345, 23.193843],
                                        [116.619703398438, 23.2259987617187],
                                        [116.558912382813, 23.2382888007813],
                                        [116.542799101563, 23.2181642890625],
                                        [116.531890898438, 23.2195217109375],
                                        [116.520987578125, 23.2059035468751],
                                        [116.467354765625, 23.21257346875],
                                        [116.452896757813, 23.2793971992188],
                                        [116.361060820313, 23.2908815742188],
                                        [116.327345, 23.303843],
                                        [116.32158328125, 23.3287013984376],
                                        [116.323389921875, 23.3409059882813],
                                        [116.350767851563, 23.336860578125],
                                        [116.341607695313, 23.398843],
                                        [116.343463164063, 23.41140159375],
                                        [116.32170046875, 23.42819846875],
                                        [116.317345, 23.443843],
                                        [116.333985625, 23.4472023750001],
                                        [116.347345, 23.453843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "潮南区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [116.467354765625, 23.21257346875],
                                        [116.520987578125, 23.2059035468751],
                                        [116.531890898438, 23.2195217109375],
                                        [116.542799101563, 23.2181642890625],
                                        [116.558912382813, 23.2382888007813],
                                        [116.619703398438, 23.2259987617187],
                                        [116.607345, 23.193843],
                                        [116.59142703125, 23.1897585273438],
                                        [116.56201296875, 23.1706032539062],
                                        [116.541568632813, 23.1409963203125],
                                        [116.537345, 23.103843],
                                        [116.512388945313, 23.0977126289062],
                                        [116.482345, 23.10444846875],
                                        [116.442271757813, 23.09546409375],
                                        [116.42326296875, 23.0679274726563],
                                        [116.376178007813, 23.0410524726563],
                                        [116.36326296875, 23.0597585273438],
                                        [116.34142703125, 23.0679274726563],
                                        [116.330181914063, 23.0979811835938],
                                        [116.29142703125, 23.1079274726563],
                                        [116.252349882813, 23.124341046875],
                                        [116.247345, 23.143843],
                                        [116.2530871875, 23.1788088203125],
                                        [116.251549101563, 23.189233625],
                                        [116.263140898438, 23.2084523750001],
                                        [116.260128203125, 23.228843],
                                        [116.285167265625, 23.2390920234375],
                                        [116.309654570313, 23.2989162421875],
                                        [116.327345, 23.303843],
                                        [116.361060820313, 23.2908815742188],
                                        [116.452896757813, 23.2793971992188],
                                        [116.467354765625, 23.21257346875]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });
            define("echarts/util/mapData/geoJson/foshan", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "name": "高明区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [112.467345, 22.713843],
                                        [112.477345, 22.713843],
                                        [112.477345, 22.7038430000001],
                                        [112.467345, 22.7038430000001],
                                        [112.467345, 22.713843]
                                    ]
                                ],
                                [
                                    [
                                        [112.697345, 22.713843],
                                        [112.693292265625, 22.6908449531251],
                                        [112.684647246094, 22.7084084296875],
                                        [112.697345, 22.713843]
                                    ]
                                ],
                                [
                                    [
                                        [112.907345, 22.873843],
                                        [112.917345, 22.873843],
                                        [112.917345, 22.8538430000001],
                                        [112.907345, 22.8538430000001],
                                        [112.907345, 22.873843]
                                    ]
                                ],
                                [
                                    [
                                        [112.697345, 22.9338430000001],
                                        [112.672899199219, 22.9408327460938],
                                        [112.690501738281, 22.9577809882813],
                                        [112.697345, 22.9338430000001]
                                    ]
                                ],
                                [
                                    [
                                        [112.907345, 22.873843],
                                        [112.859971953125, 22.8854787421876],
                                        [112.837345, 22.843843],
                                        [112.848812285156, 22.8146755195313],
                                        [112.811522246094, 22.7994142890626],
                                        [112.815811796875, 22.7703786445313],
                                        [112.801529570313, 22.7593556953125],
                                        [112.804022246094, 22.7424929023438],
                                        [112.792366972656, 22.7273952460937],
                                        [112.741236601563, 22.6894875312501],
                                        [112.71170046875, 22.69819846875],
                                        [112.70298953125, 22.70948753125],
                                        [112.697345, 22.713843],
                                        [112.703389921875, 22.7285549140625],
                                        [112.697027617188, 22.7607570625],
                                        [112.679681425781, 22.7573293281251],
                                        [112.68341921875, 22.7384108710938],
                                        [112.666268339844, 22.7113942695313],
                                        [112.647345, 22.7377956367188],
                                        [112.633170195313, 22.7180178046875],
                                        [112.617554960938, 22.7068263984375],
                                        [112.602345, 22.7098317695313],
                                        [112.589681425781, 22.707329328125],
                                        [112.593455839844, 22.6882228828125],
                                        [112.581519804688, 22.6796681953126],
                                        [112.568995390625, 22.662192609375],
                                        [112.543187285156, 22.643696515625],
                                        [112.529791289063, 22.6784279609375],
                                        [112.546868925781, 22.6906691718751],
                                        [112.530142851563, 22.7313722968751],
                                        [112.471619902344, 22.7198073554688],
                                        [112.467345, 22.713843],
                                        [112.440704375, 22.710483625],
                                        [112.421031523438, 22.6713210273438],
                                        [112.393985625, 22.6867263007813],
                                        [112.404793730469, 22.7088576484375],
                                        [112.390704375, 22.737202375],
                                        [112.387345, 22.773843],
                                        [112.472899199219, 22.7982888007812],
                                        [112.511939726563, 22.8295143867188],
                                        [112.532345, 22.826977765625],
                                        [112.565179472656, 22.8310622382813],
                                        [112.56037234375, 22.8697096992187],
                                        [112.583192167969, 22.8668727851563],
                                        [112.680662871094, 22.9043386054688],
                                        [112.697345, 22.9338430000001],
                                        [112.718104277344, 22.9377638984375],
                                        [112.735404082031, 22.9585060859375],
                                        [112.724166289063, 22.9781081367188],
                                        [112.742081328125, 22.991860578125],
                                        [112.7612903125, 22.9808473945313],
                                        [112.7733996875, 23.0068386054688],
                                        [112.792681914063, 22.9957839179688],
                                        [112.810523710938, 23.0106642890626],
                                        [112.827345, 23.0138430000001],
                                        [112.83298953125, 23.00948753125],
                                        [112.867345, 22.963843],
                                        [112.869888945313, 22.9263869453125],
                                        [112.904801054688, 22.8912990546875],
                                        [112.907345, 22.873843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "南海区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [112.907345, 22.873843],
                                        [112.907345, 22.8538430000001],
                                        [112.871429472656, 22.8497585273438],
                                        [112.862994414063, 22.8375417304688],
                                        [112.837345, 22.843843],
                                        [112.859971953125, 22.8854787421876],
                                        [112.907345, 22.873843]
                                    ]
                                ],
                                [
                                    [
                                        [112.907345, 22.873843],
                                        [112.904801054688, 22.8912990546875],
                                        [112.869888945313, 22.9263869453125],
                                        [112.867345, 22.963843],
                                        [112.90170046875, 22.9696804023438],
                                        [112.89298953125, 22.9994875312501],
                                        [112.875728789063, 23.0128102851563],
                                        [112.861224394531, 23.1011061835938],
                                        [112.903612089844, 23.1184548164063],
                                        [112.891170683594, 23.1390773750001],
                                        [112.920260039063, 23.161528546875],
                                        [112.93170046875, 23.1894875312501],
                                        [112.943140898438, 23.2084523750001],
                                        [112.940496855469, 23.226352765625],
                                        [112.962735625, 23.2296388984376],
                                        [112.983922148438, 23.216860578125],
                                        [113.002345, 23.2195827460938],
                                        [113.027088652344, 23.2159255195313],
                                        [113.044486113281, 23.2293556953125],
                                        [113.041529570313, 23.2493556953126],
                                        [113.047345, 23.253843],
                                        [113.0758215625, 23.2583303046875],
                                        [113.069757109375, 23.2853908515625],
                                        [113.103260527344, 23.2979274726563],
                                        [113.121929960938, 23.3100856757813],
                                        [113.147345, 23.303843],
                                        [113.174681425781, 23.2667629218751],
                                        [113.17107546875, 23.2313893867188],
                                        [113.181883574219, 23.2183815742188],
                                        [113.20150515625, 23.2020803046875],
                                        [113.203834257813, 23.179233625],
                                        [113.173267851563, 23.153843],
                                        [113.207345, 23.143843],
                                        [113.20025515625, 23.114419171875],
                                        [113.205357695313, 23.0885964179688],
                                        [113.163170195313, 23.0774660468751],
                                        [113.204989042969, 23.0487795234376],
                                        [113.247345, 23.0438430000001],
                                        [113.254793730469, 23.0288576484375],
                                        [113.2474621875, 23.0138430000001],
                                        [113.254793730469, 22.9988283515625],
                                        [113.247345, 22.983843],
                                        [113.231429472656, 22.9879274726563],
                                        [113.194666777344, 23.0118679023438],
                                        [113.173260527344, 22.9979274726563],
                                        [113.157345, 22.993843],
                                        [113.15298953125, 22.9994875312501],
                                        [113.141529570313, 23.0083303046876],
                                        [113.143148222656, 23.0192726875],
                                        [113.112183867188, 23.0610353828125],
                                        [113.053975859375, 23.0524343085938],
                                        [113.04298953125, 23.03819846875],
                                        [112.993995390625, 23.0278615546875],
                                        [112.979967070313, 23.0299343085938],
                                        [112.983084746094, 23.0088430000001],
                                        [112.979173613281, 22.982387921875],
                                        [113.009874296875, 22.9314919257813],
                                        [113.037345, 22.923843],
                                        [113.045557890625, 22.9181716132813],
                                        [113.041224394531, 22.8988430000001],
                                        [113.043648710938, 22.8880275703126],
                                        [113.003260527344, 22.877661359375],
                                        [113.01322390625, 22.8535939765626],
                                        [113.051329375, 22.8272829414063],
                                        [113.057345, 22.803843],
                                        [113.047345, 22.803843],
                                        [113.041776152344, 22.8113283515625],
                                        [112.977454863281, 22.8002541328125],
                                        [112.951795683594, 22.8347438789063],
                                        [112.917345, 22.8538430000001],
                                        [112.917345, 22.873843],
                                        [112.907345, 22.873843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "三水区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [112.967345, 23.443843],
                                        [112.955152617188, 23.4404201484375],
                                        [112.963922148438, 23.4316506171875],
                                        [112.978997832031, 23.4338039375001],
                                        [112.992996855469, 23.4087136054688],
                                        [112.97271609375, 23.3912404609375],
                                        [112.989364042969, 23.3502883125001],
                                        [113.012623320313, 23.3484181953126],
                                        [113.041756621094, 23.364673078125],
                                        [113.021693144531, 23.3287136054688],
                                        [113.032772246094, 23.3191677070313],
                                        [113.031219511719, 23.2998244453125],
                                        [113.04271609375, 23.27921409375],
                                        [113.047345, 23.253843],
                                        [113.041529570313, 23.2493556953126],
                                        [113.044486113281, 23.2293556953125],
                                        [113.027088652344, 23.2159255195313],
                                        [113.002345, 23.2195827460938],
                                        [112.983922148438, 23.216860578125],
                                        [112.962735625, 23.2296388984376],
                                        [112.940496855469, 23.226352765625],
                                        [112.943140898438, 23.2084523750001],
                                        [112.93170046875, 23.1894875312501],
                                        [112.920260039063, 23.161528546875],
                                        [112.891170683594, 23.1390773750001],
                                        [112.903612089844, 23.1184548164063],
                                        [112.861224394531, 23.1011061835938],
                                        [112.875728789063, 23.0128102851563],
                                        [112.89298953125, 22.9994875312501],
                                        [112.90170046875, 22.9696804023438],
                                        [112.867345, 22.963843],
                                        [112.83298953125, 23.00948753125],
                                        [112.827345, 23.0138430000001],
                                        [112.813170195313, 23.0696681953125],
                                        [112.801519804688, 23.0980178046875],
                                        [112.789495878906, 23.1579982734375],
                                        [112.767345, 23.1638430000001],
                                        [112.761688261719, 23.2091237617188],
                                        [112.767345, 23.223843],
                                        [112.77298953125, 23.21948753125],
                                        [112.782542753906, 23.2071096015625],
                                        [112.792345, 23.231059796875],
                                        [112.802147246094, 23.2071096015625],
                                        [112.811832304688, 23.2196584296875],
                                        [112.822784453125, 23.2180397773438],
                                        [112.84170046875, 23.2327614570313],
                                        [112.821095, 23.24866721875],
                                        [112.850897246094, 23.2888649726563],
                                        [112.86298953125, 23.29819846875],
                                        [112.876512480469, 23.3467653632813],
                                        [112.86170046875, 23.35819846875],
                                        [112.839271269531, 23.3872585273438],
                                        [112.808426542969, 23.3981984687501],
                                        [112.79298953125, 23.37819846875],
                                        [112.77298953125, 23.3696047187501],
                                        [112.793219023438, 23.4389919257813],
                                        [112.83298953125, 23.48819846875],
                                        [112.848231230469, 23.5254396796875],
                                        [112.83170046875, 23.53819846875],
                                        [112.82298953125, 23.54948753125],
                                        [112.817345, 23.553843],
                                        [112.821529570313, 23.5701467109375],
                                        [112.832345, 23.5677223945313],
                                        [112.8536340625, 23.57249534375],
                                        [112.903260527344, 23.5597585273437],
                                        [112.907345, 23.553843],
                                        [112.883260527344, 23.5173976875],
                                        [112.901651640625, 23.4875661445313],
                                        [112.915697050781, 23.4907155585938],
                                        [112.937955351563, 23.4584743476563],
                                        [112.967345, 23.453843],
                                        [112.967345, 23.443843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "顺德区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.247345, 22.983843],
                                        [113.253900175781, 22.9620729804688],
                                        [113.285338164063, 22.9480446601563],
                                        [113.271807890625, 22.8986135078125],
                                        [113.291937285156, 22.8812721992188],
                                        [113.31197390625, 22.82847190625],
                                        [113.391810332031, 22.8163063789063],
                                        [113.362535429688, 22.7910842109375],
                                        [113.357345, 22.773843],
                                        [113.350238066406, 22.7646364570313],
                                        [113.32298953125, 22.74819846875],
                                        [113.28170046875, 22.73948753125],
                                        [113.262110625, 22.7276686835938],
                                        [113.246263457031, 22.74819846875],
                                        [113.231082792969, 22.7391164375],
                                        [113.20170046875, 22.6994875312501],
                                        [113.192010527344, 22.6758107734376],
                                        [113.157345, 22.683843],
                                        [113.14170046875, 22.68819846875],
                                        [113.085477324219, 22.7103029609375],
                                        [113.07298953125, 22.7694875312501],
                                        [113.057345, 22.803843],
                                        [113.051329375, 22.8272829414063],
                                        [113.01322390625, 22.8535939765626],
                                        [113.003260527344, 22.877661359375],
                                        [113.043648710938, 22.8880275703126],
                                        [113.041224394531, 22.8988430000001],
                                        [113.045557890625, 22.9181716132813],
                                        [113.037345, 22.923843],
                                        [113.041610136719, 22.9295778632813],
                                        [113.056356230469, 22.9405471015625],
                                        [113.048309355469, 22.9872853828125],
                                        [113.112345, 22.9762599921875],
                                        [113.148953886719, 22.982563703125],
                                        [113.157345, 22.993843],
                                        [113.173260527344, 22.9979274726563],
                                        [113.194666777344, 23.0118679023438],
                                        [113.231429472656, 22.9879274726563],
                                        [113.247345, 22.983843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "禅城区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.112183867188, 23.0610353828125],
                                        [113.143148222656, 23.0192726875],
                                        [113.141529570313, 23.0083303046876],
                                        [113.15298953125, 22.9994875312501],
                                        [113.157345, 22.993843],
                                        [113.148953886719, 22.982563703125],
                                        [113.112345, 22.9762599921875],
                                        [113.048309355469, 22.9872853828125],
                                        [113.056356230469, 22.9405471015625],
                                        [113.041610136719, 22.9295778632813],
                                        [113.037345, 22.923843],
                                        [113.009874296875, 22.9314919257813],
                                        [112.979173613281, 22.982387921875],
                                        [112.983084746094, 23.0088430000001],
                                        [112.979967070313, 23.0299343085938],
                                        [112.993995390625, 23.0278615546875],
                                        [113.04298953125, 23.03819846875],
                                        [113.053975859375, 23.0524343085938],
                                        [113.112183867188, 23.0610353828125]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });
            define("echarts/util/mapData/geoJson/jiangmen", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "name": "江海区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.148250761719, 22.5120607734376],
                                        [113.07906375, 22.4848635078125],
                                        [113.067345, 22.5538430000001],
                                        [113.10170046875, 22.59948753125],
                                        [113.157345, 22.603843],
                                        [113.17123171875, 22.5927223945313],
                                        [113.177345, 22.543843],
                                        [113.17298953125, 22.53819846875],
                                        [113.16170046875, 22.52948753125],
                                        [113.148250761719, 22.5120607734376]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "蓬江区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.148944121094, 22.6238430000001],
                                        [113.157345, 22.603843],
                                        [113.10170046875, 22.59948753125],
                                        [113.067345, 22.5538430000001],
                                        [113.050885039063, 22.5573830390626],
                                        [113.043265410156, 22.57128440625],
                                        [113.032345, 22.566782453125],
                                        [113.017345, 22.57296409375],
                                        [113.002345, 22.566782453125],
                                        [112.9919153125, 22.5710817695313],
                                        [112.964671660156, 22.5504763007813],
                                        [112.957345, 22.563843],
                                        [112.961519804688, 22.5696681953126],
                                        [112.978253203125, 22.5816603828126],
                                        [112.95947390625, 22.6112404609375],
                                        [112.93638796875, 22.6066774726563],
                                        [112.923170195313, 22.637466046875],
                                        [112.963170195313, 22.6480178046875],
                                        [112.984742460938, 22.66171409375],
                                        [112.979332304688, 22.6890895820313],
                                        [113.013170195313, 22.6980178046876],
                                        [113.023345976563, 22.7487770820313],
                                        [113.020369902344, 22.763843],
                                        [113.025125761719, 22.7879177070313],
                                        [113.047345, 22.803843],
                                        [113.057345, 22.803843],
                                        [113.07298953125, 22.7694875312501],
                                        [113.085477324219, 22.7103029609375],
                                        [113.14170046875, 22.68819846875],
                                        [113.157345, 22.683843],
                                        [113.163543730469, 22.6586037421875],
                                        [113.148944121094, 22.6238430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "台山市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [112.787345, 21.573843],
                                        [112.799537382813, 21.5704201484375],
                                        [112.790767851563, 21.5616506171875],
                                        [112.787345, 21.573843]
                                    ]
                                ],
                                [
                                    [
                                        [112.807345, 21.583843],
                                        [112.819537382813, 21.5804201484376],
                                        [112.810767851563, 21.5716506171875],
                                        [112.807345, 21.583843]
                                    ]
                                ],
                                [
                                    [
                                        [112.757345, 21.593843],
                                        [112.753922148438, 21.5816506171876],
                                        [112.745152617188, 21.5904201484375],
                                        [112.757345, 21.593843]
                                    ]
                                ],
                                [
                                    [
                                        [112.653922148438, 21.6060353828125],
                                        [112.657345, 21.593843],
                                        [112.645152617188, 21.5972658515625],
                                        [112.653922148438, 21.6060353828125]
                                    ]
                                ],
                                [
                                    [
                                        [112.591910429688, 21.6065407539063],
                                        [112.597345, 21.593843],
                                        [112.574346953125, 21.597895734375],
                                        [112.591910429688, 21.6065407539063]
                                    ]
                                ],
                                [
                                    [
                                        [112.896886015625, 21.6151442695313],
                                        [112.887345, 21.593843],
                                        [112.863531523438, 21.6085158515626],
                                        [112.896886015625, 21.6151442695313]
                                    ]
                                ],
                                [
                                    [
                                        [112.663922148438, 21.6260353828125],
                                        [112.667345, 21.613843],
                                        [112.655152617188, 21.6172658515626],
                                        [112.663922148438, 21.6260353828125]
                                    ]
                                ],
                                [
                                    [
                                        [112.673922148438, 21.6560353828126],
                                        [112.677345, 21.6438430000001],
                                        [112.665152617188, 21.6472658515625],
                                        [112.673922148438, 21.6560353828126]
                                    ]
                                ],
                                [
                                    [
                                        [112.453001738281, 21.692036359375],
                                        [112.457345, 21.653843],
                                        [112.429644804688, 21.6582082343751],
                                        [112.453001738281, 21.692036359375]
                                    ]
                                ],
                                [
                                    [
                                        [112.683922148438, 21.7160353828125],
                                        [112.687345, 21.703843],
                                        [112.675152617188, 21.7072658515625],
                                        [112.683922148438, 21.7160353828125]
                                    ]
                                ],
                                [
                                    [
                                        [112.631883574219, 21.6293044257813],
                                        [112.608136015625, 21.6157057929688],
                                        [112.555985136719, 21.6210207343751],
                                        [112.541617460938, 21.6090846992188],
                                        [112.547345, 21.593843],
                                        [112.522806425781, 21.6010427070313],
                                        [112.533316679688, 21.6221901679688],
                                        [112.561658964844, 21.6457326484375],
                                        [112.571883574219, 21.6693044257813],
                                        [112.592896757813, 21.6784206367188],
                                        [112.590916777344, 21.6978517890625],
                                        [112.660960722656, 21.7174343085938],
                                        [112.663053007813, 21.6968923164062],
                                        [112.623267851563, 21.663843],
                                        [112.653538847656, 21.6386989570313],
                                        [112.631883574219, 21.6293044257813]
                                    ]
                                ],
                                [
                                    [
                                        [112.807345, 21.583843],
                                        [112.787345, 21.583843],
                                        [112.787345, 21.573843],
                                        [112.767345, 21.573843],
                                        [112.767345, 21.593843],
                                        [112.757345, 21.593843],
                                        [112.752647734375, 21.6195925117188],
                                        [112.722933378906, 21.6030129218751],
                                        [112.748883085938, 21.6495217109375],
                                        [112.772249785156, 21.6476442695313],
                                        [112.79197390625, 21.6824294257813],
                                        [112.737345, 21.6780397773438],
                                        [112.722345, 21.6792458320313],
                                        [112.711099882813, 21.6783400703126],
                                        [112.714100371094, 21.7157033515626],
                                        [112.745655546875, 21.7297829414063],
                                        [112.768038359375, 21.7279836250001],
                                        [112.781998320313, 21.7592726875],
                                        [112.792669707031, 21.7584157539063],
                                        [112.802020292969, 21.7692702460938],
                                        [112.812345, 21.7684401679687],
                                        [112.861097441406, 21.772358625],
                                        [112.87197390625, 21.7512575507813],
                                        [112.828233671875, 21.7380886054688],
                                        [112.797044707031, 21.701889875],
                                        [112.812896757813, 21.6587258125],
                                        [112.789039335938, 21.6250783515626],
                                        [112.807345, 21.583843]
                                    ]
                                ],
                                [
                                    [
                                        [113.047017851563, 21.87370628125],
                                        [113.037345, 21.853843],
                                        [113.003895292969, 21.858188703125],
                                        [113.020350371094, 21.8872927070313],
                                        [113.047017851563, 21.87370628125]
                                    ]
                                ],
                                [
                                    [
                                        [112.387345, 21.933843],
                                        [112.393407011719, 21.9054665351563],
                                        [112.413460722656, 21.7736452460938],
                                        [112.402625761719, 21.7385622382812],
                                        [112.372064238281, 21.7291237617188],
                                        [112.342545195313, 21.7185329414063],
                                        [112.332113066406, 21.7191555000001],
                                        [112.307345, 21.703843],
                                        [112.301092558594, 21.7418996406251],
                                        [112.32298953125, 21.77819846875],
                                        [112.358150664063, 21.8655007148438],
                                        [112.341529570313, 21.8783303046875],
                                        [112.343822050781, 21.893843],
                                        [112.34156375, 21.90913596875],
                                        [112.347345, 21.923843],
                                        [112.363326445313, 21.9158986640626],
                                        [112.370704375, 21.930483625],
                                        [112.387345, 21.933843]
                                    ]
                                ],
                                [
                                    [
                                        [112.627345, 21.783843],
                                        [112.623922148438, 21.7960353828125],
                                        [112.615152617188, 21.7872658515625],
                                        [112.614312773438, 21.7692580390625],
                                        [112.558255644531, 21.7659181953125],
                                        [112.423031035156, 21.822329328125],
                                        [112.421749296875, 21.843843],
                                        [112.423238554688, 21.8688430000001],
                                        [112.422047148438, 21.888843],
                                        [112.4226575, 21.8990969062501],
                                        [112.408414335938, 21.911821515625],
                                        [112.49197390625, 21.9376247382813],
                                        [112.493519316406, 21.9635622382813],
                                        [112.462064238281, 21.9491237617188],
                                        [112.442569609375, 21.9385305000001],
                                        [112.432345, 21.9391408515625],
                                        [112.413841582031, 21.9380373359375],
                                        [112.402064238281, 21.9485622382813],
                                        [112.382625761719, 21.9791237617187],
                                        [112.377345, 21.9838430000001],
                                        [112.380704375, 22.0004836250001],
                                        [112.408116484375, 22.0083937812501],
                                        [112.3874621875, 22.0188430000001],
                                        [112.405289335938, 22.0278615546876],
                                        [112.397345, 22.043843],
                                        [112.393260527344, 22.0497585273438],
                                        [112.370301542969, 22.0583498359375],
                                        [112.360714140625, 22.1011208320313],
                                        [112.371429472656, 22.1297585273438],
                                        [112.397345, 22.1338430000001],
                                        [112.412891875, 22.1068776679688],
                                        [112.470289335938, 22.1114894843751],
                                        [112.483470488281, 22.0878615546875],
                                        [112.477987089844, 22.0195949531251],
                                        [112.497345, 22.0180397773438],
                                        [112.518070097656, 22.0197048164063],
                                        [112.604398222656, 21.9715383125],
                                        [112.622899199219, 22.0391335273438],
                                        [112.58271609375, 22.0570632148437],
                                        [112.59197390625, 22.08921409375],
                                        [112.620750761719, 22.114009015625],
                                        [112.623551054688, 22.148843],
                                        [112.60197390625, 22.1584719062501],
                                        [112.59271609375, 22.17921409375],
                                        [112.581165800781, 22.1891677070312],
                                        [112.584876738281, 22.2353444648438],
                                        [112.56271609375, 22.2750612617188],
                                        [112.593502226563, 22.28995628125],
                                        [112.619034453125, 22.2879030585938],
                                        [112.645877714844, 22.2998805976563],
                                        [112.641180449219, 22.3583473945313],
                                        [112.659522734375, 22.3598220039063],
                                        [112.672166777344, 22.3178322578125],
                                        [112.68197390625, 22.32921409375],
                                        [112.716793242188, 22.344751203125],
                                        [112.735113554688, 22.3605373359375],
                                        [112.753424101563, 22.4104006171875],
                                        [112.750836210938, 22.4426100898438],
                                        [112.807345, 22.4338430000001],
                                        [112.81298953125, 22.4294875312501],
                                        [112.82170046875, 22.4081984687501],
                                        [112.857225371094, 22.3869533515625],
                                        [112.87170046875, 22.36819846875],
                                        [112.898311796875, 22.357309796875],
                                        [112.924234648438, 22.3139626289062],
                                        [112.949127226563, 22.2947487617187],
                                        [112.963138457031, 22.259106671875],
                                        [112.94814578125, 22.1678395820313],
                                        [112.999659453125, 22.1467580390625],
                                        [113.017345, 22.123843],
                                        [113.00298953125, 22.08819846875],
                                        [112.97298953125, 22.0759206367188],
                                        [113.00170046875, 22.03819846875],
                                        [113.013160429688, 22.0293556953126],
                                        [113.00834109375, 21.9967482734375],
                                        [113.027081328125, 21.949077375],
                                        [112.980924101563, 21.9134499335938],
                                        [112.984244414063, 21.8909914375],
                                        [112.93170046875, 21.86948753125],
                                        [112.916263457031, 21.84948753125],
                                        [112.892513457031, 21.863696515625],
                                        [112.871549101563, 21.898452375],
                                        [112.875596953125, 21.9258498359375],
                                        [112.835484648438, 21.9500466132813],
                                        [112.822345, 21.9481032539063],
                                        [112.80060671875, 21.9513161445313],
                                        [112.757508574219, 21.9336794257813],
                                        [112.742345, 21.896626203125],
                                        [112.717738066406, 21.9002638984376],
                                        [112.679659453125, 21.8509279609375],
                                        [112.651522246094, 21.8394142890625],
                                        [112.653507109375, 21.8259743476563],
                                        [112.64298953125, 21.78819846875],
                                        [112.627345, 21.783843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "开平市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [112.597345, 22.563843],
                                        [112.600767851563, 22.5516506171875],
                                        [112.609537382813, 22.5604201484375],
                                        [112.60205203125, 22.6042360664063],
                                        [112.658292265625, 22.5811257148438],
                                        [112.702965117188, 22.5899538398438],
                                        [112.711519804688, 22.5780178046876],
                                        [112.723455839844, 22.5694631171875],
                                        [112.721234160156, 22.5582228828125],
                                        [112.750870390625, 22.5369826484375],
                                        [112.739681425781, 22.480356671875],
                                        [112.762345, 22.4758791328126],
                                        [112.782633085938, 22.479887921875],
                                        [112.797345, 22.4738430000001],
                                        [112.803985625, 22.4604836250001],
                                        [112.807345, 22.4338430000001],
                                        [112.750836210938, 22.4426100898438],
                                        [112.753424101563, 22.4104006171875],
                                        [112.735113554688, 22.3605373359375],
                                        [112.716793242188, 22.344751203125],
                                        [112.68197390625, 22.32921409375],
                                        [112.672166777344, 22.3178322578125],
                                        [112.659522734375, 22.3598220039063],
                                        [112.641180449219, 22.3583473945313],
                                        [112.645877714844, 22.2998805976563],
                                        [112.619034453125, 22.2879030585938],
                                        [112.593502226563, 22.28995628125],
                                        [112.56271609375, 22.2750612617188],
                                        [112.584876738281, 22.2353444648438],
                                        [112.581165800781, 22.1891677070312],
                                        [112.59271609375, 22.17921409375],
                                        [112.60197390625, 22.1584719062501],
                                        [112.623551054688, 22.148843],
                                        [112.620750761719, 22.114009015625],
                                        [112.59197390625, 22.08921409375],
                                        [112.58271609375, 22.0570632148437],
                                        [112.622899199219, 22.0391335273438],
                                        [112.604398222656, 21.9715383125],
                                        [112.518070097656, 22.0197048164063],
                                        [112.497345, 22.0180397773438],
                                        [112.477987089844, 22.0195949531251],
                                        [112.483470488281, 22.0878615546875],
                                        [112.470289335938, 22.1114894843751],
                                        [112.412891875, 22.1068776679688],
                                        [112.397345, 22.1338430000001],
                                        [112.406600371094, 22.1645876289063],
                                        [112.424205351563, 22.2125221992188],
                                        [112.483189726563, 22.2633400703125],
                                        [112.481942167969, 22.278843],
                                        [112.483951445313, 22.303843],
                                        [112.480345488281, 22.3487258125],
                                        [112.51271609375, 22.35847190625],
                                        [112.53197390625, 22.40483909375],
                                        [112.47197390625, 22.4184719062501],
                                        [112.45271609375, 22.44921409375],
                                        [112.44197390625, 22.4584719062501],
                                        [112.428949003906, 22.4735866523438],
                                        [112.387178984375, 22.4984719062501],
                                        [112.348089628906, 22.4530983710938],
                                        [112.323856230469, 22.43222190625],
                                        [112.30271609375, 22.39847190625],
                                        [112.292823515625, 22.38921409375],
                                        [112.237345, 22.413843],
                                        [112.231529570313, 22.4293190742188],
                                        [112.264908476563, 22.5062795234375],
                                        [112.292806425781, 22.5183815742188],
                                        [112.303499785156, 22.5783815742188],
                                        [112.322896757813, 22.569262921875],
                                        [112.320882597656, 22.5495021796875],
                                        [112.337982207031, 22.547759015625],
                                        [112.373053007813, 22.5768923164062],
                                        [112.371795683594, 22.5892336250001],
                                        [112.382806425781, 22.5983815742188],
                                        [112.4131653125, 22.6683815742187],
                                        [112.428514433594, 22.6539333320313],
                                        [112.444290800781, 22.6001735664063],
                                        [112.474608183594, 22.5970827460938],
                                        [112.517345, 22.603843],
                                        [112.522198515625, 22.5849318671875],
                                        [112.591429472656, 22.5679274726563],
                                        [112.597345, 22.563843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "恩平市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [112.177345, 22.373843],
                                        [112.180767851563, 22.3616506171875],
                                        [112.189537382813, 22.3704201484375],
                                        [112.192882109375, 22.4024318671875],
                                        [112.237345, 22.413843],
                                        [112.292823515625, 22.38921409375],
                                        [112.30271609375, 22.39847190625],
                                        [112.323856230469, 22.43222190625],
                                        [112.348089628906, 22.4530983710938],
                                        [112.387178984375, 22.4984719062501],
                                        [112.428949003906, 22.4735866523438],
                                        [112.44197390625, 22.4584719062501],
                                        [112.45271609375, 22.44921409375],
                                        [112.47197390625, 22.4184719062501],
                                        [112.53197390625, 22.40483909375],
                                        [112.51271609375, 22.35847190625],
                                        [112.480345488281, 22.3487258125],
                                        [112.483951445313, 22.303843],
                                        [112.481942167969, 22.278843],
                                        [112.483189726563, 22.2633400703125],
                                        [112.424205351563, 22.2125221992188],
                                        [112.406600371094, 22.1645876289063],
                                        [112.397345, 22.1338430000001],
                                        [112.371429472656, 22.1297585273438],
                                        [112.360714140625, 22.1011208320313],
                                        [112.370301542969, 22.0583498359375],
                                        [112.393260527344, 22.0497585273438],
                                        [112.397345, 22.043843],
                                        [112.381158476563, 22.0400295234376],
                                        [112.364671660156, 21.9916530585938],
                                        [112.377345, 21.9838430000001],
                                        [112.369700957031, 21.9684645820313],
                                        [112.383985625, 21.950483625],
                                        [112.387345, 21.933843],
                                        [112.370704375, 21.930483625],
                                        [112.363326445313, 21.9158986640626],
                                        [112.347345, 21.923843],
                                        [112.341429472656, 21.9279274726563],
                                        [112.333260527344, 21.9497585273438],
                                        [112.313792753906, 21.979653546875],
                                        [112.271429472656, 21.9879274726562],
                                        [112.263260527344, 21.9997585273438],
                                        [112.214324980469, 22.0180690742188],
                                        [112.223465605469, 22.0588430000001],
                                        [112.220081816406, 22.07394065625],
                                        [112.191898222656, 22.0676222968751],
                                        [112.164176054688, 22.0856740546875],
                                        [112.127254667969, 22.0994899726563],
                                        [112.113260527344, 22.1197585273438],
                                        [112.090303984375, 22.1356081367188],
                                        [112.032301054688, 22.1176296210938],
                                        [112.013260527344, 22.1241188789063],
                                        [112.045474882813, 22.1463600898438],
                                        [112.030960722656, 22.1686452460938],
                                        [112.044989042969, 22.2020436835938],
                                        [112.039752226563, 22.2254055],
                                        [111.997345, 22.2538430000001],
                                        [112.005301542969, 22.2658083320313],
                                        [112.022345, 22.270102765625],
                                        [112.038363066406, 22.2660671210938],
                                        [112.063734160156, 22.2983254218751],
                                        [112.061085234375, 22.308843],
                                        [112.063604765625, 22.3188430000001],
                                        [112.059471464844, 22.3352468085938],
                                        [112.092847929688, 22.35753440625],
                                        [112.144705839844, 22.344468],
                                        [112.140064726563, 22.3628932929688],
                                        [112.151339140625, 22.379848859375],
                                        [112.157345, 22.383843],
                                        [112.177345, 22.373843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "鹤山市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [112.597345, 22.563843],
                                        [112.609537382813, 22.5604201484375],
                                        [112.600767851563, 22.5516506171875],
                                        [112.597345, 22.563843]
                                    ]
                                ],
                                [
                                    [
                                        [112.597345, 22.563843],
                                        [112.591429472656, 22.5679274726563],
                                        [112.522198515625, 22.5849318671875],
                                        [112.517345, 22.603843],
                                        [112.508216582031, 22.6394191718751],
                                        [112.477345, 22.7038430000001],
                                        [112.477345, 22.713843],
                                        [112.467345, 22.713843],
                                        [112.471619902344, 22.7198073554688],
                                        [112.530142851563, 22.7313722968751],
                                        [112.546868925781, 22.6906691718751],
                                        [112.529791289063, 22.6784279609375],
                                        [112.543187285156, 22.643696515625],
                                        [112.568995390625, 22.662192609375],
                                        [112.581519804688, 22.6796681953126],
                                        [112.593455839844, 22.6882228828125],
                                        [112.589681425781, 22.707329328125],
                                        [112.602345, 22.7098317695313],
                                        [112.617554960938, 22.7068263984375],
                                        [112.633170195313, 22.7180178046875],
                                        [112.647345, 22.7377956367188],
                                        [112.666268339844, 22.7113942695313],
                                        [112.68341921875, 22.7384108710938],
                                        [112.679681425781, 22.7573293281251],
                                        [112.697027617188, 22.7607570625],
                                        [112.703389921875, 22.7285549140625],
                                        [112.697345, 22.713843],
                                        [112.684647246094, 22.7084084296875],
                                        [112.693292265625, 22.6908449531251],
                                        [112.697345, 22.713843],
                                        [112.70298953125, 22.70948753125],
                                        [112.71170046875, 22.69819846875],
                                        [112.741236601563, 22.6894875312501],
                                        [112.792366972656, 22.7273952460937],
                                        [112.804022246094, 22.7424929023438],
                                        [112.801529570313, 22.7593556953125],
                                        [112.815811796875, 22.7703786445313],
                                        [112.811522246094, 22.7994142890626],
                                        [112.848812285156, 22.8146755195313],
                                        [112.837345, 22.843843],
                                        [112.862994414063, 22.8375417304688],
                                        [112.871429472656, 22.8497585273438],
                                        [112.907345, 22.8538430000001],
                                        [112.917345, 22.8538430000001],
                                        [112.951795683594, 22.8347438789063],
                                        [112.977454863281, 22.8002541328125],
                                        [113.041776152344, 22.8113283515625],
                                        [113.047345, 22.803843],
                                        [113.025125761719, 22.7879177070313],
                                        [113.020369902344, 22.763843],
                                        [113.023345976563, 22.7487770820313],
                                        [113.013170195313, 22.6980178046876],
                                        [112.979332304688, 22.6890895820313],
                                        [112.984742460938, 22.66171409375],
                                        [112.963170195313, 22.6480178046875],
                                        [112.923170195313, 22.637466046875],
                                        [112.93638796875, 22.6066774726563],
                                        [112.95947390625, 22.6112404609375],
                                        [112.978253203125, 22.5816603828126],
                                        [112.961519804688, 22.5696681953126],
                                        [112.957345, 22.563843],
                                        [112.932100859375, 22.5581081367188],
                                        [112.91095828125, 22.5705373359375],
                                        [112.885318632813, 22.5673464179687],
                                        [112.849212675781, 22.5461232734375],
                                        [112.791163359375, 22.5533425117188],
                                        [112.793587675781, 22.533843],
                                        [112.791722441406, 22.5188405585938],
                                        [112.797345, 22.4738430000001],
                                        [112.782633085938, 22.479887921875],
                                        [112.762345, 22.4758791328126],
                                        [112.739681425781, 22.480356671875],
                                        [112.750870390625, 22.5369826484375],
                                        [112.721234160156, 22.5582228828125],
                                        [112.723455839844, 22.5694631171875],
                                        [112.711519804688, 22.5780178046876],
                                        [112.702965117188, 22.5899538398438],
                                        [112.658292265625, 22.5811257148438],
                                        [112.60205203125, 22.6042360664063],
                                        [112.597345, 22.563843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "新会区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.017345, 22.57296409375],
                                        [113.032345, 22.566782453125],
                                        [113.043265410156, 22.57128440625],
                                        [113.050885039063, 22.5573830390626],
                                        [113.067345, 22.5538430000001],
                                        [113.07906375, 22.4848635078125],
                                        [113.148250761719, 22.5120607734376],
                                        [113.16170046875, 22.52948753125],
                                        [113.17298953125, 22.53819846875],
                                        [113.177345, 22.543843],
                                        [113.214534941406, 22.511801984375],
                                        [113.241209746094, 22.4639943671875],
                                        [113.247345, 22.4038430000001],
                                        [113.232628203125, 22.3981862617188],
                                        [113.21373171875, 22.4005373359376],
                                        [113.192345, 22.38796409375],
                                        [113.172899199219, 22.3993971992188],
                                        [113.152899199219, 22.4004640937501],
                                        [113.191336699219, 22.3478444648438],
                                        [113.158470488281, 22.2327419257813],
                                        [113.127345, 22.223843],
                                        [113.117345, 22.223843],
                                        [113.117345, 22.2138430000001],
                                        [113.09158328125, 22.2201711250001],
                                        [113.080714140625, 22.1911208320313],
                                        [113.084586210938, 22.1738430000001],
                                        [113.080560332031, 22.1558815742188],
                                        [113.047652617188, 22.1632570625001],
                                        [113.023260527344, 22.1279274726563],
                                        [113.017345, 22.123843],
                                        [112.999659453125, 22.1467580390625],
                                        [112.94814578125, 22.1678395820313],
                                        [112.963138457031, 22.259106671875],
                                        [112.949127226563, 22.2947487617187],
                                        [112.924234648438, 22.3139626289062],
                                        [112.898311796875, 22.357309796875],
                                        [112.87170046875, 22.36819846875],
                                        [112.857225371094, 22.3869533515625],
                                        [112.82170046875, 22.4081984687501],
                                        [112.81298953125, 22.4294875312501],
                                        [112.807345, 22.4338430000001],
                                        [112.803985625, 22.4604836250001],
                                        [112.797345, 22.4738430000001],
                                        [112.791722441406, 22.5188405585938],
                                        [112.793587675781, 22.533843],
                                        [112.791163359375, 22.5533425117188],
                                        [112.849212675781, 22.5461232734375],
                                        [112.885318632813, 22.5673464179687],
                                        [112.91095828125, 22.5705373359375],
                                        [112.932100859375, 22.5581081367188],
                                        [112.957345, 22.563843],
                                        [112.964671660156, 22.5504763007813],
                                        [112.9919153125, 22.5710817695313],
                                        [113.002345, 22.566782453125],
                                        [113.017345, 22.57296409375]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });
            define("echarts/util/mapData/geoJson/zhanjiang", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "name": "赤坎区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [110.362345, 21.3237258125],
                                        [110.383563261719, 21.3027565742188],
                                        [110.387345, 21.313843],
                                        [110.42041140625, 21.309673078125],
                                        [110.403336210938, 21.2759181953125],
                                        [110.383985625, 21.2853664375001],
                                        [110.390704375, 21.267202375],
                                        [110.403985625, 21.260483625],
                                        [110.407345, 21.243843],
                                        [110.389144316406, 21.2361989570313],
                                        [110.367074003906, 21.2411452460938],
                                        [110.337345, 21.233843],
                                        [110.343587675781, 21.2592580390626],
                                        [110.331124296875, 21.2783962226563],
                                        [110.333616972656, 21.2895143867187],
                                        [110.321429472656, 21.2979274726563],
                                        [110.317345, 21.303843],
                                        [110.344801054688, 21.3063869453125],
                                        [110.362345, 21.3237258125]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "雷州市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [109.937345, 20.4638430000001],
                                        [109.924442167969, 20.4403029609375],
                                        [109.915030546875, 20.4590431953126],
                                        [109.937345, 20.4638430000001]
                                    ]
                                ],
                                [
                                    [
                                        [110.377345, 20.813843],
                                        [110.380767851563, 20.8260353828125],
                                        [110.389537382813, 20.8172658515626],
                                        [110.377345, 20.813843]
                                    ]
                                ],
                                [
                                    [
                                        [110.377345, 20.813843],
                                        [110.383529082031, 20.7991213203126],
                                        [110.381224394531, 20.788843],
                                        [110.391429472656, 20.7433205390626],
                                        [110.377415800781, 20.6997585273438],
                                        [110.351429472656, 20.7279274726563],
                                        [110.336676054688, 20.7673561835938],
                                        [110.323260527344, 20.7479274726563],
                                        [110.307345, 20.743843],
                                        [110.303922148438, 20.7560353828125],
                                        [110.295152617188, 20.7472658515626],
                                        [110.307345, 20.743843],
                                        [110.311319609375, 20.7269655585938],
                                        [110.323919707031, 20.7308913398438],
                                        [110.33420046875, 20.6978835273438],
                                        [110.297672148438, 20.685434796875],
                                        [110.307345, 20.663843],
                                        [110.284620390625, 20.6598366523438],
                                        [110.301783476563, 20.650844953125],
                                        [110.307345, 20.663843],
                                        [110.323841582031, 20.6720436835938],
                                        [110.327345, 20.633843],
                                        [110.311607695313, 20.61105003125],
                                        [110.277254667969, 20.5981960273438],
                                        [110.261329375, 20.5751296210938],
                                        [110.201429472656, 20.5597585273438],
                                        [110.162720976563, 20.5297585273438],
                                        [110.131429472656, 20.5379274726562],
                                        [110.120203886719, 20.5679274726563],
                                        [110.093707304688, 20.5432595039063],
                                        [110.115194121094, 20.528423078125],
                                        [110.078031035156, 20.5188869453126],
                                        [110.094832792969, 20.4646877265625],
                                        [110.083260527344, 20.4479274726563],
                                        [110.071429472656, 20.4397585273438],
                                        [110.062691679688, 20.42710471875],
                                        [110.034700957031, 20.4453322578125],
                                        [110.007345, 20.433843],
                                        [109.981519804688, 20.4480178046876],
                                        [109.967345, 20.4677956367188],
                                        [109.952345, 20.4468679023438],
                                        [109.943170195313, 20.4596681953125],
                                        [109.937345, 20.4638430000001],
                                        [109.9330871875, 20.4799782539063],
                                        [109.912965117188, 20.476001203125],
                                        [109.899835234375, 20.4943215156251],
                                        [109.831519804688, 20.5080178046875],
                                        [109.813170195313, 20.5336843085938],
                                        [109.833455839844, 20.5482228828126],
                                        [109.8262121875, 20.5848757148438],
                                        [109.801619902344, 20.6236110664063],
                                        [109.777554960938, 20.6408596015625],
                                        [109.752345, 20.6358791328125],
                                        [109.739791289063, 20.6684279609375],
                                        [109.768204375, 20.688794171875],
                                        [109.787345, 20.693843],
                                        [109.790704375, 20.687202375],
                                        [109.81552859375, 20.680483625],
                                        [109.827345, 20.703843],
                                        [109.839537382813, 20.7072658515626],
                                        [109.830767851563, 20.7160353828125],
                                        [109.827345, 20.703843],
                                        [109.803372832031, 20.7157595039063],
                                        [109.793985625, 20.697202375],
                                        [109.787345, 20.693843],
                                        [109.78298953125, 20.69948753125],
                                        [109.77170046875, 20.70819846875],
                                        [109.7476965625, 20.7392995429688],
                                        [109.764295683594, 20.7815261054688],
                                        [109.757345, 20.823843],
                                        [109.769537382813, 20.8272658515626],
                                        [109.760767851563, 20.8360353828125],
                                        [109.757345, 20.823843],
                                        [109.75197390625, 20.82847190625],
                                        [109.742166777344, 20.8398537421875],
                                        [109.729935332031, 20.7992311835938],
                                        [109.717345, 20.813843],
                                        [109.729537382813, 20.8172658515626],
                                        [109.720767851563, 20.8260353828125],
                                        [109.717345, 20.813843],
                                        [109.71170046875, 20.8181984687501],
                                        [109.6728528125, 20.8696681953125],
                                        [109.66298953125, 20.9427614570313],
                                        [109.683160429688, 20.9583303046875],
                                        [109.678455839844, 20.9901564765625],
                                        [109.69490359375, 20.9877248359376],
                                        [109.707345, 21.003843],
                                        [109.734700957031, 21.0153322578125],
                                        [109.762904082031, 20.9969680000001],
                                        [109.793260527344, 21.0179274726563],
                                        [109.812274199219, 21.04546409375],
                                        [109.832850371094, 21.0500759101563],
                                        [109.871969023438, 21.0197585273438],
                                        [109.874620390625, 21.0365236640625],
                                        [109.860833769531, 21.0693459296876],
                                        [109.873616972656, 21.0781716132813],
                                        [109.867191191406, 21.1068312812501],
                                        [109.886654082031, 21.1202712226563],
                                        [109.903682890625, 21.1657790351563],
                                        [109.937345, 21.173325421875],
                                        [109.962623320313, 21.1676589179688],
                                        [110.002215605469, 21.1842897773438],
                                        [110.05002078125, 21.1512819648438],
                                        [110.067845488281, 21.1088430000001],
                                        [110.043260527344, 21.0503102851562],
                                        [110.055531035156, 21.0317116523438],
                                        [110.101673613281, 21.0420558906251],
                                        [110.111429472656, 21.0279274726563],
                                        [110.117345, 21.0238430000001],
                                        [110.124918242188, 21.008872296875],
                                        [110.153985625, 21.000483625],
                                        [110.157345, 20.983843],
                                        [110.164881621094, 20.9642360664063],
                                        [110.161261015625, 20.9351247382813],
                                        [110.171790800781, 20.8982888007813],
                                        [110.183941679688, 20.8666799140625],
                                        [110.180887480469, 20.8421340156251],
                                        [110.222345, 20.836977765625],
                                        [110.305907011719, 20.8473708320313],
                                        [110.377345, 20.813843]
                                    ],
                                    [
                                        [109.835152617188, 20.5772658515625],
                                        [109.847345, 20.5738430000001],
                                        [109.843922148438, 20.5860353828126],
                                        [109.835152617188, 20.5772658515625]
                                    ],
                                    [
                                        [109.925152617188, 20.4972658515625],
                                        [109.937345, 20.4938430000001],
                                        [109.933922148438, 20.5060353828125],
                                        [109.925152617188, 20.4972658515625]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "廉江市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [110.197345, 21.433843],
                                        [110.209537382813, 21.4304201484376],
                                        [110.200767851563, 21.4216506171875],
                                        [110.197345, 21.433843]
                                    ]
                                ],
                                [
                                    [
                                        [110.417345, 21.583843],
                                        [110.420577421875, 21.6060280585938],
                                        [110.438958769531, 21.5869924140625],
                                        [110.417345, 21.583843]
                                    ]
                                ],
                                [
                                    [
                                        [110.403338652344, 21.696567609375],
                                        [110.407345, 21.6738430000001],
                                        [110.394346953125, 21.6794045234375],
                                        [110.403338652344, 21.696567609375]
                                    ]
                                ],
                                [
                                    [
                                        [110.377345, 21.783843],
                                        [110.390343046875, 21.7782814765626],
                                        [110.381351347656, 21.761118390625],
                                        [110.377345, 21.783843]
                                    ]
                                ],
                                [
                                    [
                                        [110.377345, 21.783843],
                                        [110.371883574219, 21.7793044257813],
                                        [110.360167265625, 21.7652028632813],
                                        [110.363834257813, 21.729233625],
                                        [110.343267851563, 21.7121486640626],
                                        [110.382894316406, 21.6792336250001],
                                        [110.381636992188, 21.6668923164063],
                                        [110.402894316406, 21.649233625],
                                        [110.400816679688, 21.628843],
                                        [110.404298125, 21.5946804023438],
                                        [110.417345, 21.583843],
                                        [110.433905058594, 21.559858625],
                                        [110.473260527344, 21.5497585273438],
                                        [110.481529570313, 21.5175392890626],
                                        [110.500189238281, 21.5217214179688],
                                        [110.507345, 21.493843],
                                        [110.49406375, 21.48712425],
                                        [110.487345, 21.473843],
                                        [110.480704375, 21.4604836250001],
                                        [110.477345, 21.4438430000001],
                                        [110.435804472656, 21.4391188789063],
                                        [110.403260527344, 21.4179274726562],
                                        [110.387345, 21.4138430000001],
                                        [110.377345, 21.4138430000001],
                                        [110.37170046875, 21.4181984687501],
                                        [110.36298953125, 21.42948753125],
                                        [110.318975859375, 21.438774640625],
                                        [110.30298953125, 21.45948753125],
                                        [110.270699492188, 21.4727028632813],
                                        [110.274127226563, 21.4958962226563],
                                        [110.191981230469, 21.5098513007813],
                                        [110.179530058594, 21.4937184882812],
                                        [110.19298953125, 21.45948753125],
                                        [110.197345, 21.433843],
                                        [110.16422, 21.45491721875],
                                        [110.136143828125, 21.4198537421875],
                                        [110.10095828125, 21.4405373359375],
                                        [110.077345, 21.4376003242188],
                                        [110.062183867188, 21.4394850898438],
                                        [109.982345, 21.4213503242188],
                                        [109.927345, 21.433843],
                                        [109.92170046875, 21.43819846875],
                                        [109.912803984375, 21.47015159375],
                                        [109.878961210938, 21.4497365546876],
                                        [109.803746367188, 21.4608522773437],
                                        [109.79021609375, 21.5094411445313],
                                        [109.793160429688, 21.5293556953126],
                                        [109.773065214844, 21.5448635078125],
                                        [109.76298953125, 21.56948753125],
                                        [109.747345, 21.573843],
                                        [109.747345, 21.583843],
                                        [109.739595976563, 21.6153932929688],
                                        [109.753260527344, 21.6479274726563],
                                        [109.757345, 21.663843],
                                        [109.769058867188, 21.6779470039063],
                                        [109.786724882813, 21.6372145820312],
                                        [109.904788847656, 21.6598635078125],
                                        [109.901803007813, 21.6891652656251],
                                        [109.912806425781, 21.7083815742188],
                                        [109.921883574219, 21.7293044257813],
                                        [109.932894316406, 21.738452375],
                                        [109.931326933594, 21.7538430000001],
                                        [109.933873320313, 21.778843],
                                        [109.931807890625, 21.7991091132813],
                                        [109.943682890625, 21.8307106757813],
                                        [109.941793242188, 21.8492507148438],
                                        [109.991126738281, 21.8796804023438],
                                        [110.064151640625, 21.863423078125],
                                        [110.092022734375, 21.8793849921875],
                                        [110.102735625, 21.8782936835938],
                                        [110.120394316406, 21.8995510078125],
                                        [110.137345, 21.8978249335938],
                                        [110.152345, 21.8993532539063],
                                        [110.162345, 21.8983327460938],
                                        [110.17255984375, 21.8993752265625],
                                        [110.222816191406, 21.8853224921875],
                                        [110.267432890625, 21.8898708320313],
                                        [110.287345, 21.913843],
                                        [110.304801054688, 21.9112990546875],
                                        [110.319888945313, 21.8963869453125],
                                        [110.387345, 21.893843],
                                        [110.395394316406, 21.860434796875],
                                        [110.382345, 21.8578542304688],
                                        [110.346512480469, 21.8649367500001],
                                        [110.334132109375, 21.8022805000001],
                                        [110.373118925781, 21.8099831367187],
                                        [110.377345, 21.783843]
                                    ]
                                ],
                                [
                                    [
                                        [110.427345, 21.9438430000001],
                                        [110.439537382813, 21.9404201484375],
                                        [110.430767851563, 21.9316506171876],
                                        [110.427345, 21.9438430000001]
                                    ]
                                ],
                                [
                                    [
                                        [110.417345, 21.9438430000001],
                                        [110.397345, 21.913843],
                                        [110.390885039063, 21.9173830390626],
                                        [110.383804960938, 21.9303029609376],
                                        [110.364100371094, 21.9411013007813],
                                        [110.387345, 21.953843],
                                        [110.403985625, 21.950483625],
                                        [110.417345, 21.9438430000001]
                                    ]
                                ],
                                [
                                    [
                                        [110.427345, 21.9438430000001],
                                        [110.417345, 21.9438430000001],
                                        [110.422345, 21.9566506171875],
                                        [110.427345, 21.9438430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "麻章区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [110.503922148438, 20.9160353828125],
                                        [110.507345, 20.903843],
                                        [110.495152617188, 20.9072658515625],
                                        [110.503922148438, 20.9160353828125]
                                    ]
                                ],
                                [
                                    [
                                        [110.612899199219, 20.8882888007813],
                                        [110.597345, 20.863843],
                                        [110.561143828125, 20.8741921210938],
                                        [110.563023710938, 20.8892971015625],
                                        [110.551229277344, 20.8987404609375],
                                        [110.594469023438, 20.9527370429688],
                                        [110.640784941406, 20.9246047187501],
                                        [110.621790800781, 20.9093971992188],
                                        [110.612899199219, 20.8882888007813]
                                    ]
                                ],
                                [
                                    [
                                        [110.247345, 20.963843],
                                        [110.257345, 20.963843],
                                        [110.252345, 20.9510353828125],
                                        [110.247345, 20.963843]
                                    ]
                                ],
                                [
                                    [
                                        [110.247345, 20.963843],
                                        [110.197083769531, 20.9403737617188],
                                        [110.203468046875, 20.968852765625],
                                        [110.247345, 20.973843],
                                        [110.247345, 20.963843]
                                    ]
                                ],
                                [
                                    [
                                        [110.257345, 20.963843],
                                        [110.257345, 20.973843],
                                        [110.247345, 20.973843],
                                        [110.251883574219, 20.9793044257813],
                                        [110.268270292969, 20.9929177070313],
                                        [110.298831816406, 21.0297096992188],
                                        [110.327928496094, 21.0267458320313],
                                        [110.301326933594, 21.048843],
                                        [110.312806425781, 21.0583815742188],
                                        [110.321883574219, 21.0693044257813],
                                        [110.362806425781, 21.0783815742188],
                                        [110.397345, 21.0981618476563],
                                        [110.427479277344, 21.0493044257812],
                                        [110.472806425781, 21.0583815742188],
                                        [110.526033964844, 21.0783815742188],
                                        [110.549368925781, 21.0518459296875],
                                        [110.531883574219, 20.9893044257813],
                                        [110.521456328125, 20.9193044257813],
                                        [110.502266875, 20.9374977851563],
                                        [110.487432890625, 20.9716994453126],
                                        [110.469283476563, 20.99355003125],
                                        [110.403387480469, 21.0002663398438],
                                        [110.341883574219, 20.9893044257813],
                                        [110.289249296875, 20.9695290351563],
                                        [110.257345, 20.963843]
                                    ]
                                ],
                                [
                                    [
                                        [110.411910429688, 21.1165407539063],
                                        [110.417345, 21.1038430000001],
                                        [110.394346953125, 21.107895734375],
                                        [110.411910429688, 21.1165407539063]
                                    ]
                                ],
                                [
                                    [
                                        [110.207345, 21.1038430000001],
                                        [110.203260527344, 21.0679274726563],
                                        [110.191429472656, 21.0397585273438],
                                        [110.181329375, 21.0004030585938],
                                        [110.157345, 20.983843],
                                        [110.153985625, 21.000483625],
                                        [110.124918242188, 21.008872296875],
                                        [110.117345, 21.0238430000001],
                                        [110.133280058594, 21.0484157539063],
                                        [110.123316679688, 21.1062819648438],
                                        [110.153079863281, 21.1181081367188],
                                        [110.163626738281, 21.1322853828125],
                                        [110.181949492188, 21.1076540351563],
                                        [110.197345, 21.113843],
                                        [110.197345, 21.1038430000001],
                                        [110.207345, 21.1038430000001]
                                    ]
                                ],
                                [
                                    [
                                        [110.207345, 21.1038430000001],
                                        [110.207345, 21.113843],
                                        [110.219720488281, 21.1387404609375],
                                        [110.209896269531, 21.1588576484375],
                                        [110.217345, 21.173843],
                                        [110.229537382813, 21.1772658515625],
                                        [110.220767851563, 21.1860353828125],
                                        [110.217345, 21.173843],
                                        [110.18107546875, 21.1884499335938],
                                        [110.193140898438, 21.208452375],
                                        [110.189427519531, 21.2335866523438],
                                        [110.20170046875, 21.2494875312501],
                                        [110.213822050781, 21.2588430000001],
                                        [110.200611601563, 21.2690407539063],
                                        [110.22298953125, 21.27819846875],
                                        [110.231773710938, 21.2996657539063],
                                        [110.265479765625, 21.2946852851563],
                                        [110.28298953125, 21.3081984687501],
                                        [110.294810820313, 21.3235158515625],
                                        [110.31298953125, 21.30948753125],
                                        [110.317345, 21.303843],
                                        [110.321429472656, 21.2979274726563],
                                        [110.333616972656, 21.2895143867187],
                                        [110.331124296875, 21.2783962226563],
                                        [110.343587675781, 21.2592580390626],
                                        [110.337345, 21.233843],
                                        [110.316168242188, 21.1869411445313],
                                        [110.351790800781, 21.1282888007813],
                                        [110.357345, 21.123843],
                                        [110.343680449219, 21.1090944648438],
                                        [110.332345, 21.1086452460937],
                                        [110.313209257813, 21.1094020820313],
                                        [110.282535429688, 21.0986525703125],
                                        [110.251495390625, 21.0888259101563],
                                        [110.223582792969, 21.0296828437501],
                                        [110.212535429688, 21.0990334296876],
                                        [110.207345, 21.1038430000001]
                                    ],
                                    [
                                        [110.237345, 21.123843],
                                        [110.233922148438, 21.1360353828125],
                                        [110.225152617188, 21.1272658515626],
                                        [110.237345, 21.123843]
                                    ],
                                    [
                                        [110.237345, 21.153843],
                                        [110.233922148438, 21.1660353828126],
                                        [110.225152617188, 21.1572658515626],
                                        [110.237345, 21.153843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "坡头区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [110.457345, 21.193843],
                                        [110.483985625, 21.2072023750001],
                                        [110.487345, 21.2138430000001],
                                        [110.507345, 21.203843],
                                        [110.512579375, 21.183442609375],
                                        [110.552542753906, 21.2002272773438],
                                        [110.580357695313, 21.182114484375],
                                        [110.603260527344, 21.1979274726563],
                                        [110.617069121094, 21.2179274726563],
                                        [110.613260527344, 21.1879274726562],
                                        [110.601429472656, 21.1697585273438],
                                        [110.573387480469, 21.0897585273438],
                                        [110.53103640625, 21.0980031562501],
                                        [110.534801054688, 21.1147927070313],
                                        [110.522110625, 21.164243390625],
                                        [110.478775664063, 21.1460451484375],
                                        [110.429681425781, 21.1791042304688],
                                        [110.453260527344, 21.1879274726562],
                                        [110.457345, 21.193843]
                                    ]
                                ],
                                [
                                    [
                                        [110.507345, 21.203843],
                                        [110.499935332031, 21.2284548164063],
                                        [110.487345, 21.2138430000001],
                                        [110.457345, 21.2138430000001],
                                        [110.457345, 21.193843],
                                        [110.4310559375, 21.1982009101562],
                                        [110.445875273438, 21.2350612617188],
                                        [110.428814726563, 21.2626247382813],
                                        [110.443533964844, 21.2992385078125],
                                        [110.423756132813, 21.3139528632813],
                                        [110.435159941406, 21.3801882148437],
                                        [110.414017363281, 21.376548078125],
                                        [110.387345, 21.393843],
                                        [110.387345, 21.4138430000001],
                                        [110.403260527344, 21.4179274726562],
                                        [110.435804472656, 21.4391188789063],
                                        [110.477345, 21.4438430000001],
                                        [110.503778105469, 21.4396779609375],
                                        [110.523260527344, 21.4097585273438],
                                        [110.532991972656, 21.3837526679688],
                                        [110.561429472656, 21.3641188789063],
                                        [110.5495715625, 21.3261013007813],
                                        [110.524129667969, 21.3318044257813],
                                        [110.518450957031, 21.306469953125],
                                        [110.588404570313, 21.2747658515626],
                                        [110.623973417969, 21.2979274726563],
                                        [110.633260527344, 21.2897585273438],
                                        [110.637345, 21.243843],
                                        [110.632098417969, 21.2239528632813],
                                        [110.602279082031, 21.2298439765626],
                                        [110.551519804688, 21.2196681953125],
                                        [110.532777128906, 21.20776878125],
                                        [110.522056914063, 21.2098879218751],
                                        [110.507345, 21.203843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "遂溪县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [110.233922148438, 21.1360353828125],
                                        [110.237345, 21.123843],
                                        [110.225152617188, 21.1272658515626],
                                        [110.233922148438, 21.1360353828125]
                                    ]
                                ],
                                [
                                    [
                                        [110.233922148438, 21.1660353828126],
                                        [110.237345, 21.153843],
                                        [110.225152617188, 21.1572658515626],
                                        [110.233922148438, 21.1660353828126]
                                    ]
                                ],
                                [
                                    [
                                        [110.217345, 21.173843],
                                        [110.220767851563, 21.1860353828125],
                                        [110.229537382813, 21.1772658515625],
                                        [110.217345, 21.173843]
                                    ]
                                ],
                                [
                                    [
                                        [110.217345, 21.173843],
                                        [110.209896269531, 21.1588576484375],
                                        [110.219720488281, 21.1387404609375],
                                        [110.207345, 21.113843],
                                        [110.197345, 21.113843],
                                        [110.181949492188, 21.1076540351563],
                                        [110.163626738281, 21.1322853828125],
                                        [110.153079863281, 21.1181081367188],
                                        [110.123316679688, 21.1062819648438],
                                        [110.133280058594, 21.0484157539063],
                                        [110.117345, 21.0238430000001],
                                        [110.111429472656, 21.0279274726563],
                                        [110.101673613281, 21.0420558906251],
                                        [110.055531035156, 21.0317116523438],
                                        [110.043260527344, 21.0503102851562],
                                        [110.067845488281, 21.1088430000001],
                                        [110.05002078125, 21.1512819648438],
                                        [110.002215605469, 21.1842897773438],
                                        [109.962623320313, 21.1676589179688],
                                        [109.937345, 21.173325421875],
                                        [109.903682890625, 21.1657790351563],
                                        [109.886654082031, 21.1202712226563],
                                        [109.867191191406, 21.1068312812501],
                                        [109.873616972656, 21.0781716132813],
                                        [109.860833769531, 21.0693459296876],
                                        [109.874620390625, 21.0365236640625],
                                        [109.871969023438, 21.0197585273438],
                                        [109.832850371094, 21.0500759101563],
                                        [109.812274199219, 21.04546409375],
                                        [109.793260527344, 21.0179274726563],
                                        [109.762904082031, 20.9969680000001],
                                        [109.734700957031, 21.0153322578125],
                                        [109.707345, 21.003843],
                                        [109.700535917969, 21.0092971015625],
                                        [109.708328886719, 21.0719606757812],
                                        [109.674918242188, 21.117700421875],
                                        [109.699534941406, 21.1595803046876],
                                        [109.722899199219, 21.1782888007813],
                                        [109.731890898438, 21.1895217109375],
                                        [109.746422148438, 21.1877150703125],
                                        [109.777056914063, 21.2259694648438],
                                        [109.771102324219, 21.273843],
                                        [109.774832792969, 21.303843],
                                        [109.769107695313, 21.3498683906251],
                                        [109.787345, 21.3476003242188],
                                        [109.812345, 21.3507082343751],
                                        [109.832345, 21.3482204414063],
                                        [109.913531523438, 21.3583205390626],
                                        [109.901678496094, 21.3784841132813],
                                        [109.904830351563, 21.4038210273438],
                                        [109.922899199219, 21.4182888007813],
                                        [109.927345, 21.433843],
                                        [109.982345, 21.4213503242188],
                                        [110.062183867188, 21.4394850898438],
                                        [110.077345, 21.4376003242188],
                                        [110.10095828125, 21.4405373359375],
                                        [110.136143828125, 21.4198537421875],
                                        [110.16422, 21.45491721875],
                                        [110.197345, 21.433843],
                                        [110.200767851563, 21.4216506171875],
                                        [110.209537382813, 21.4304201484376],
                                        [110.197345, 21.433843],
                                        [110.19298953125, 21.45948753125],
                                        [110.179530058594, 21.4937184882812],
                                        [110.191981230469, 21.5098513007813],
                                        [110.274127226563, 21.4958962226563],
                                        [110.270699492188, 21.4727028632813],
                                        [110.30298953125, 21.45948753125],
                                        [110.318975859375, 21.438774640625],
                                        [110.36298953125, 21.42948753125],
                                        [110.37170046875, 21.4181984687501],
                                        [110.377345, 21.4138430000001],
                                        [110.377345, 21.393843],
                                        [110.387345, 21.393843],
                                        [110.391790800781, 21.3682888007813],
                                        [110.411334257813, 21.335044171875],
                                        [110.391790800781, 21.3193971992188],
                                        [110.387345, 21.313843],
                                        [110.383563261719, 21.3027565742188],
                                        [110.362345, 21.3237258125],
                                        [110.344801054688, 21.3063869453125],
                                        [110.317345, 21.303843],
                                        [110.31298953125, 21.30948753125],
                                        [110.294810820313, 21.3235158515625],
                                        [110.28298953125, 21.3081984687501],
                                        [110.265479765625, 21.2946852851563],
                                        [110.231773710938, 21.2996657539063],
                                        [110.22298953125, 21.27819846875],
                                        [110.200611601563, 21.2690407539063],
                                        [110.213822050781, 21.2588430000001],
                                        [110.20170046875, 21.2494875312501],
                                        [110.189427519531, 21.2335866523438],
                                        [110.193140898438, 21.208452375],
                                        [110.18107546875, 21.1884499335938],
                                        [110.217345, 21.173843]
                                    ],
                                    [
                                        [109.735152617188, 21.1672658515626],
                                        [109.747345, 21.163843],
                                        [109.743922148438, 21.1760353828125],
                                        [109.735152617188, 21.1672658515626]
                                    ],
                                    [
                                        [109.763922148438, 21.1660353828126],
                                        [109.755152617188, 21.1572658515626],
                                        [109.767345, 21.153843],
                                        [109.763922148438, 21.1660353828126]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "吴川市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [110.707345, 21.513843],
                                        [110.712779570313, 21.5011452460938],
                                        [110.730343046875, 21.5097902656251],
                                        [110.711248808594, 21.5199391914063],
                                        [110.731109648438, 21.5326540351563],
                                        [110.720792265625, 21.5693679023438],
                                        [110.743897734375, 21.5983180976563],
                                        [110.735963164063, 21.6265554023438],
                                        [110.747345, 21.6338430000001],
                                        [110.753531523438, 21.6376564765625],
                                        [110.762847929688, 21.6527761054688],
                                        [110.800382109375, 21.6296486640626],
                                        [110.787672148438, 21.588843],
                                        [110.813531523438, 21.5800295234376],
                                        [110.822215605469, 21.5431667304688],
                                        [110.849378691406, 21.5264284492188],
                                        [110.838292265625, 21.4908278632813],
                                        [110.867345, 21.503843],
                                        [110.873160429688, 21.4993556953126],
                                        [110.870203886719, 21.4793556953125],
                                        [110.893463164063, 21.4614015937501],
                                        [110.888765898438, 21.4296193671875],
                                        [110.921954375, 21.4496388984375],
                                        [110.937345, 21.4473659492188],
                                        [110.952957792969, 21.4496730781251],
                                        [110.957345, 21.423843],
                                        [110.952857695313, 21.4180275703125],
                                        [110.933812285156, 21.4208425117188],
                                        [110.879007597656, 21.3856423164063],
                                        [110.847345, 21.3903200507813],
                                        [110.832135039063, 21.3880739570313],
                                        [110.780990019531, 21.4029860664063],
                                        [110.723116484375, 21.3683718085938],
                                        [110.68861453125, 21.3218361640626],
                                        [110.650740996094, 21.2541823554688],
                                        [110.637345, 21.243843],
                                        [110.633260527344, 21.2897585273438],
                                        [110.623973417969, 21.2979274726563],
                                        [110.588404570313, 21.2747658515626],
                                        [110.518450957031, 21.306469953125],
                                        [110.524129667969, 21.3318044257813],
                                        [110.5495715625, 21.3261013007813],
                                        [110.561429472656, 21.3641188789063],
                                        [110.532991972656, 21.3837526679688],
                                        [110.523260527344, 21.4097585273438],
                                        [110.503778105469, 21.4396779609375],
                                        [110.477345, 21.4438430000001],
                                        [110.480704375, 21.4604836250001],
                                        [110.487345, 21.473843],
                                        [110.507345, 21.473843],
                                        [110.507345, 21.493843],
                                        [110.532896757813, 21.476958234375],
                                        [110.541429472656, 21.4997585273438],
                                        [110.553260527344, 21.5079274726563],
                                        [110.561998320313, 21.52058128125],
                                        [110.581429472656, 21.5079274726563],
                                        [110.603260527344, 21.4997585273438],
                                        [110.617069121094, 21.4797585273438],
                                        [110.633260527344, 21.4879274726563],
                                        [110.64435671875, 21.5039968085938],
                                        [110.686678496094, 21.4945095039062],
                                        [110.667757597656, 21.5235671210938],
                                        [110.707345, 21.513843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "霞山区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [110.377345, 21.1438430000001],
                                        [110.389537382813, 21.1404201484375],
                                        [110.380767851563, 21.1316506171875],
                                        [110.377345, 21.1438430000001]
                                    ]
                                ],
                                [
                                    [
                                        [110.431910429688, 21.1665407539063],
                                        [110.437345, 21.153843],
                                        [110.414346953125, 21.1578957343751],
                                        [110.431910429688, 21.1665407539063]
                                    ]
                                ],
                                [
                                    [
                                        [110.377345, 21.1438430000001],
                                        [110.36406375, 21.1371242500001],
                                        [110.357345, 21.123843],
                                        [110.351790800781, 21.1282888007813],
                                        [110.316168242188, 21.1869411445313],
                                        [110.337345, 21.233843],
                                        [110.367074003906, 21.2411452460938],
                                        [110.389144316406, 21.2361989570313],
                                        [110.407345, 21.243843],
                                        [110.424559355469, 21.231958234375],
                                        [110.408211699219, 21.1682497382813],
                                        [110.381429472656, 21.1497585273438],
                                        [110.377345, 21.1438430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "徐闻县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [110.567345, 20.3438430000001],
                                        [110.563922148438, 20.3316506171875],
                                        [110.555152617188, 20.3404201484375],
                                        [110.567345, 20.3438430000001]
                                    ]
                                ],
                                [
                                    [
                                        [110.567345, 20.3438430000001],
                                        [110.570767851563, 20.3560353828125],
                                        [110.579537382813, 20.3472658515625],
                                        [110.567345, 20.3438430000001]
                                    ]
                                ],
                                [
                                    [
                                        [110.583922148438, 20.3760353828125],
                                        [110.587345, 20.363843],
                                        [110.575152617188, 20.3672658515626],
                                        [110.583922148438, 20.3760353828125]
                                    ]
                                ],
                                [
                                    [
                                        [110.413922148438, 20.6160353828125],
                                        [110.417345, 20.6038430000001],
                                        [110.405152617188, 20.6072658515625],
                                        [110.413922148438, 20.6160353828125]
                                    ]
                                ],
                                [
                                    [
                                        [110.3932825, 20.6655251289063],
                                        [110.390042753906, 20.6252053046876],
                                        [110.406536894531, 20.5882424140625],
                                        [110.443326445313, 20.5677175117187],
                                        [110.480719023438, 20.5707204414063],
                                        [110.53197390625, 20.4788552070313],
                                        [110.511927519531, 20.4264064765625],
                                        [110.483856230469, 20.40222190625],
                                        [110.450833769531, 20.3494997382813],
                                        [110.4273059375, 20.3221901679688],
                                        [110.401363554688, 20.3077175117188],
                                        [110.374359160156, 20.3098854804688],
                                        [110.36197390625, 20.29921409375],
                                        [110.35271609375, 20.2884719062501],
                                        [110.34197390625, 20.2792140937501],
                                        [110.33271609375, 20.26847190625],
                                        [110.29197390625, 20.25921409375],
                                        [110.282345, 20.2480397773438],
                                        [110.270650664063, 20.2616115546875],
                                        [110.21814578125, 20.28089378125],
                                        [110.19197390625, 20.26921409375],
                                        [110.178587675781, 20.23921409375],
                                        [110.12197390625, 20.2484719062501],
                                        [110.11271609375, 20.25921409375],
                                        [110.0734778125, 20.276723859375],
                                        [110.057730742188, 20.2950026679688],
                                        [110.006236601563, 20.2760915351563],
                                        [109.982205839844, 20.2894997382813],
                                        [109.925211210938, 20.21921409375],
                                        [109.919581328125, 20.252700421875],
                                        [109.938424101563, 20.3040138984375],
                                        [109.916546660156, 20.3530446601563],
                                        [109.87271609375, 20.3726003242188],
                                        [109.88197390625, 20.3992140937501],
                                        [109.89271609375, 20.40847190625],
                                        [109.902020292969, 20.4192702460938],
                                        [109.917345, 20.4180397773438],
                                        [109.932669707031, 20.4192702460938],
                                        [109.94197390625, 20.40847190625],
                                        [109.9727746875, 20.3991970039063],
                                        [109.97072390625, 20.3736794257813],
                                        [109.982418242188, 20.3474758125],
                                        [109.99197390625, 20.37921409375],
                                        [110.00271609375, 20.3984719062501],
                                        [110.007345, 20.433843],
                                        [110.034700957031, 20.4453322578125],
                                        [110.062691679688, 20.42710471875],
                                        [110.071429472656, 20.4397585273438],
                                        [110.083260527344, 20.4479274726563],
                                        [110.094832792969, 20.4646877265625],
                                        [110.078031035156, 20.5188869453126],
                                        [110.115194121094, 20.528423078125],
                                        [110.093707304688, 20.5432595039063],
                                        [110.120203886719, 20.5679274726563],
                                        [110.131429472656, 20.5379274726562],
                                        [110.162720976563, 20.5297585273438],
                                        [110.201429472656, 20.5597585273438],
                                        [110.261329375, 20.5751296210938],
                                        [110.277254667969, 20.5981960273438],
                                        [110.311607695313, 20.61105003125],
                                        [110.327345, 20.633843],
                                        [110.33271609375, 20.63847190625],
                                        [110.342120390625, 20.659546125],
                                        [110.362345, 20.6482643867188],
                                        [110.3932825, 20.6655251289063]
                                    ]
                                ],
                                [
                                    [
                                        [110.472806425781, 20.6493044257813],
                                        [110.487345, 20.583843],
                                        [110.450477324219, 20.5885597968751],
                                        [110.432806425781, 20.6293044257812],
                                        [110.402806425781, 20.6542263007813],
                                        [110.422137480469, 20.6593727851563],
                                        [110.432345, 20.6583327460938],
                                        [110.442735625, 20.6593923164063],
                                        [110.452345, 20.6478249335938],
                                        [110.469420195313, 20.6683815742188],
                                        [110.472806425781, 20.6493044257813]
                                    ]
                                ],
                                [
                                    [
                                        [110.363922148438, 20.6860353828125],
                                        [110.367345, 20.673843],
                                        [110.355152617188, 20.6772658515625],
                                        [110.363922148438, 20.6860353828125]
                                    ]
                                ],
                                [
                                    [
                                        [110.424871855469, 20.6989846015625],
                                        [110.417345, 20.6838430000001],
                                        [110.399090605469, 20.6875270820312],
                                        [110.4141028125, 20.717202375],
                                        [110.424871855469, 20.6989846015625]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });
            define("echarts/util/mapData/geoJson/maoming", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "name": "电白县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [111.373922148438, 21.4460353828125],
                                        [111.377345, 21.433843],
                                        [111.365152617188, 21.4372658515626],
                                        [111.373922148438, 21.4460353828125]
                                    ]
                                ],
                                [
                                    [
                                        [111.264837675781, 21.4466603828125],
                                        [111.277345, 21.423843],
                                        [111.253804960938, 21.4289064765625],
                                        [111.264837675781, 21.4466603828125]
                                    ]
                                ],
                                [
                                    [
                                        [111.043922148438, 21.5060353828126],
                                        [111.047345, 21.493843],
                                        [111.035152617188, 21.4972658515625],
                                        [111.043922148438, 21.5060353828126]
                                    ]
                                ],
                                [
                                    [
                                        [111.037345, 21.533843],
                                        [111.030704375, 21.530483625],
                                        [111.019488554688, 21.5083132148438],
                                        [110.997345, 21.503843],
                                        [110.984407988281, 21.5382692695313],
                                        [111.009039335938, 21.5679201484375],
                                        [111.037345, 21.533843]
                                    ]
                                ],
                                [
                                    [
                                        [111.397345, 21.533843],
                                        [111.393922148438, 21.5460353828126],
                                        [111.385152617188, 21.5372658515625],
                                        [111.39187625, 21.5156789375001],
                                        [111.299437285156, 21.43921409375],
                                        [111.281715117188, 21.458755109375],
                                        [111.295811796875, 21.4840163398438],
                                        [111.282647734375, 21.4992971015625],
                                        [111.237345, 21.493843],
                                        [111.237345, 21.503843],
                                        [111.217345, 21.503843],
                                        [111.212345, 21.5270876289062],
                                        [111.207345, 21.503843],
                                        [111.183924589844, 21.5130495429688],
                                        [111.196263457031, 21.48948753125],
                                        [111.207345, 21.503843],
                                        [111.217345, 21.503843],
                                        [111.217345, 21.493843],
                                        [111.237345, 21.493843],
                                        [111.233531523438, 21.4876564765625],
                                        [111.191158476563, 21.4800295234375],
                                        [111.147513457031, 21.4656764960938],
                                        [111.127345, 21.471958234375],
                                        [111.103150664063, 21.4644216132813],
                                        [111.093531523438, 21.4800295234375],
                                        [111.081158476563, 21.4876564765625],
                                        [111.073531523438, 21.5100295234376],
                                        [111.041158476563, 21.5276564765625],
                                        [111.037345, 21.533843],
                                        [111.063079863281, 21.5381081367188],
                                        [111.081610136719, 21.5732302070313],
                                        [111.061610136719, 21.5881081367188],
                                        [111.053079863281, 21.6095778632813],
                                        [111.023365507813, 21.6316823554688],
                                        [111.039283476563, 21.7241432929688],
                                        [111.027345, 21.7538430000001],
                                        [111.03197390625, 21.7692140937501],
                                        [111.05271609375, 21.7784719062501],
                                        [111.072066679688, 21.7892678046875],
                                        [111.101785917969, 21.786880109375],
                                        [111.102913847656, 21.8009377265626],
                                        [111.07271609375, 21.8550612617188],
                                        [111.104566679688, 21.87847190625],
                                        [111.125186796875, 21.867954328125],
                                        [111.149947539063, 21.83921409375],
                                        [111.170902128906, 21.8544045234375],
                                        [111.18197390625, 21.8792140937501],
                                        [111.1940246875, 21.8895973945313],
                                        [111.21810671875, 21.9695851875],
                                        [111.232625761719, 21.9684181953125],
                                        [111.277345, 21.993843],
                                        [111.281553984375, 21.9577321601563],
                                        [111.293892851563, 21.8961843085938],
                                        [111.312965117188, 21.8999538398437],
                                        [111.330484648438, 21.8755104804688],
                                        [111.352777128906, 21.87991721875],
                                        [111.377139921875, 21.8644509101562],
                                        [111.417345, 21.853843],
                                        [111.413260527344, 21.8179274726563],
                                        [111.379339628906, 21.7772512031251],
                                        [111.383465605469, 21.7588430000001],
                                        [111.377345, 21.7315407539063],
                                        [111.429115019531, 21.7182570625],
                                        [111.43353640625, 21.6985329414063],
                                        [111.409654570313, 21.6458425117188],
                                        [111.415706816406, 21.618843],
                                        [111.410472441406, 21.5954909492188],
                                        [111.427345, 21.583843],
                                        [111.441429472656, 21.5503102851563],
                                        [111.43228640625, 21.5252614570313],
                                        [111.397345, 21.533843]
                                    ],
                                    [
                                        [111.197345, 21.8338430000001],
                                        [111.191910429688, 21.8465407539063],
                                        [111.174346953125, 21.837895734375],
                                        [111.197345, 21.8338430000001]
                                    ],
                                    [
                                        [111.354346953125, 21.527895734375],
                                        [111.377345, 21.5238430000001],
                                        [111.371910429688, 21.5365407539063],
                                        [111.354346953125, 21.527895734375]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "高州市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [111.191910429688, 21.8465407539063],
                                        [111.197345, 21.8338430000001],
                                        [111.174346953125, 21.837895734375],
                                        [111.191910429688, 21.8465407539063]
                                    ]
                                ],
                                [
                                    [
                                        [111.361712675781, 22.2814650703125],
                                        [111.37197390625, 22.25847190625],
                                        [111.377345, 22.2538430000001],
                                        [111.372899199219, 22.2482888007813],
                                        [111.352313261719, 22.2318068671875],
                                        [111.342899199219, 22.1882888007812],
                                        [111.327142363281, 22.1756716132813],
                                        [111.333016386719, 22.1284499335938],
                                        [111.308675566406, 22.0951296210938],
                                        [111.280553007813, 22.0472902656251],
                                        [111.307103300781, 22.0260280585938],
                                        [111.292899199219, 22.0082888007813],
                                        [111.281790800781, 21.9993971992188],
                                        [111.277345, 21.993843],
                                        [111.232625761719, 21.9684181953125],
                                        [111.21810671875, 21.9695851875],
                                        [111.1940246875, 21.8895973945313],
                                        [111.18197390625, 21.8792140937501],
                                        [111.170902128906, 21.8544045234375],
                                        [111.149947539063, 21.83921409375],
                                        [111.125186796875, 21.867954328125],
                                        [111.104566679688, 21.87847190625],
                                        [111.07271609375, 21.8550612617188],
                                        [111.102913847656, 21.8009377265626],
                                        [111.101785917969, 21.786880109375],
                                        [111.072066679688, 21.7892678046875],
                                        [111.05271609375, 21.7784719062501],
                                        [111.03197390625, 21.7692140937501],
                                        [111.027345, 21.7538430000001],
                                        [110.975167265625, 21.7778029609376],
                                        [110.957345, 21.7538430000001],
                                        [110.94170046875, 21.75819846875],
                                        [110.914451933594, 21.7746364570313],
                                        [110.902857695313, 21.7896584296876],
                                        [110.883577910156, 21.7868093085938],
                                        [110.833089628906, 21.8242409492188],
                                        [110.81298953125, 21.7981984687501],
                                        [110.801529570313, 21.7893556953125],
                                        [110.803658476563, 21.7749538398438],
                                        [110.771732207031, 21.779673078125],
                                        [110.76298953125, 21.7281984687501],
                                        [110.75170046875, 21.71948753125],
                                        [110.747345, 21.7138430000001],
                                        [110.730103789063, 21.7190334296875],
                                        [110.712669707031, 21.7392702460938],
                                        [110.683316679688, 21.7369118476563],
                                        [110.67271609375, 21.74921409375],
                                        [110.649351835938, 21.7596413398438],
                                        [110.66400515625, 21.8131789375],
                                        [110.65470828125, 21.9288845039063],
                                        [110.623455839844, 21.9558083320313],
                                        [110.61271609375, 21.9750856757813],
                                        [110.6427746875, 21.9884963203125],
                                        [110.641942167969, 21.998843],
                                        [110.643414335938, 22.01714378125],
                                        [110.67271609375, 22.05847190625],
                                        [110.68197390625, 22.0750856757813],
                                        [110.65197390625, 22.08847190625],
                                        [110.64271609375, 22.11483909375],
                                        [110.705299101563, 22.1290578437501],
                                        [110.677345, 22.1738430000001],
                                        [110.66298953125, 22.1994875312501],
                                        [110.64298953125, 22.2149245429688],
                                        [110.65170046875, 22.2394875312501],
                                        [110.68298953125, 22.2581984687501],
                                        [110.694451933594, 22.2730495429688],
                                        [110.72220828125, 22.2897927070313],
                                        [110.752081328125, 22.2780495429688],
                                        [110.787345, 22.2838430000001],
                                        [110.7928528125, 22.268843],
                                        [110.772884550781, 22.2144680000001],
                                        [110.832669707031, 22.2192702460937],
                                        [110.848997832031, 22.2003176093751],
                                        [110.877345, 22.1980397773438],
                                        [110.892345, 22.1992458320313],
                                        [110.902669707031, 22.1984157539063],
                                        [110.91197390625, 22.20921409375],
                                        [110.93271609375, 22.21847190625],
                                        [110.95197390625, 22.2292140937501],
                                        [111.01271609375, 22.23847190625],
                                        [111.046705351563, 22.2625685859376],
                                        [111.077171660156, 22.245571515625],
                                        [111.20271609375, 22.2684719062501],
                                        [111.241800566406, 22.290278546875],
                                        [111.259947539063, 22.2692140937501],
                                        [111.276405058594, 22.2811452460938],
                                        [111.299742460938, 22.3082326484376],
                                        [111.328006621094, 22.31050315625],
                                        [111.361712675781, 22.2814650703125]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "化州市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [110.507345, 21.493843],
                                        [110.507345, 21.473843],
                                        [110.487345, 21.473843],
                                        [110.49406375, 21.48712425],
                                        [110.507345, 21.493843]
                                    ]
                                ],
                                [
                                    [
                                        [110.707345, 21.513843],
                                        [110.730343046875, 21.5097902656251],
                                        [110.712779570313, 21.5011452460938],
                                        [110.707345, 21.513843]
                                    ]
                                ],
                                [
                                    [
                                        [110.707345, 21.513843],
                                        [110.667757597656, 21.5235671210938],
                                        [110.686678496094, 21.4945095039062],
                                        [110.64435671875, 21.5039968085938],
                                        [110.633260527344, 21.4879274726563],
                                        [110.617069121094, 21.4797585273438],
                                        [110.603260527344, 21.4997585273438],
                                        [110.581429472656, 21.5079274726563],
                                        [110.561998320313, 21.52058128125],
                                        [110.553260527344, 21.5079274726563],
                                        [110.541429472656, 21.4997585273438],
                                        [110.532896757813, 21.476958234375],
                                        [110.507345, 21.493843],
                                        [110.500189238281, 21.5217214179688],
                                        [110.481529570313, 21.5175392890626],
                                        [110.473260527344, 21.5497585273438],
                                        [110.433905058594, 21.559858625],
                                        [110.417345, 21.583843],
                                        [110.438958769531, 21.5869924140625],
                                        [110.420577421875, 21.6060280585938],
                                        [110.417345, 21.583843],
                                        [110.404298125, 21.5946804023438],
                                        [110.400816679688, 21.628843],
                                        [110.402894316406, 21.649233625],
                                        [110.381636992188, 21.6668923164063],
                                        [110.382894316406, 21.6792336250001],
                                        [110.343267851563, 21.7121486640626],
                                        [110.363834257813, 21.729233625],
                                        [110.360167265625, 21.7652028632813],
                                        [110.371883574219, 21.7793044257813],
                                        [110.377345, 21.783843],
                                        [110.381351347656, 21.761118390625],
                                        [110.390343046875, 21.7782814765626],
                                        [110.377345, 21.783843],
                                        [110.373118925781, 21.8099831367187],
                                        [110.334132109375, 21.8022805000001],
                                        [110.346512480469, 21.8649367500001],
                                        [110.382345, 21.8578542304688],
                                        [110.395394316406, 21.860434796875],
                                        [110.387345, 21.893843],
                                        [110.397345, 21.913843],
                                        [110.417345, 21.9438430000001],
                                        [110.427345, 21.9438430000001],
                                        [110.430767851563, 21.9316506171876],
                                        [110.439537382813, 21.9404201484375],
                                        [110.427345, 21.9438430000001],
                                        [110.422345, 21.9566506171875],
                                        [110.417345, 21.9438430000001],
                                        [110.403985625, 21.950483625],
                                        [110.387345, 21.953843],
                                        [110.383531523438, 21.9600295234376],
                                        [110.350526152344, 21.9780007148438],
                                        [110.355460234375, 21.993843],
                                        [110.350787382813, 22.008843],
                                        [110.353902617188, 22.0188430000001],
                                        [110.344556914063, 22.048843],
                                        [110.353902617188, 22.078843],
                                        [110.349229765625, 22.0938430000001],
                                        [110.360382109375, 22.1296486640626],
                                        [110.331158476563, 22.1476564765626],
                                        [110.323531523438, 22.1725246406251],
                                        [110.348834257813, 22.1976564765625],
                                        [110.369388457031, 22.1642995429688],
                                        [110.401873808594, 22.190610578125],
                                        [110.407345, 22.2138430000001],
                                        [110.425736113281, 22.208305890625],
                                        [110.48271609375, 22.15921409375],
                                        [110.499947539063, 22.13921409375],
                                        [110.52271609375, 22.1584719062501],
                                        [110.557178984375, 22.1984719062501],
                                        [110.59271609375, 22.17921409375],
                                        [110.609742460938, 22.1594533515625],
                                        [110.631363554688, 22.1577175117188],
                                        [110.65197390625, 22.16921409375],
                                        [110.677345, 22.1738430000001],
                                        [110.705299101563, 22.1290578437501],
                                        [110.64271609375, 22.11483909375],
                                        [110.65197390625, 22.08847190625],
                                        [110.68197390625, 22.0750856757813],
                                        [110.67271609375, 22.05847190625],
                                        [110.643414335938, 22.01714378125],
                                        [110.641942167969, 21.998843],
                                        [110.6427746875, 21.9884963203125],
                                        [110.61271609375, 21.9750856757813],
                                        [110.623455839844, 21.9558083320313],
                                        [110.65470828125, 21.9288845039063],
                                        [110.66400515625, 21.8131789375],
                                        [110.649351835938, 21.7596413398438],
                                        [110.67271609375, 21.74921409375],
                                        [110.683316679688, 21.7369118476563],
                                        [110.712669707031, 21.7392702460938],
                                        [110.730103789063, 21.7190334296875],
                                        [110.747345, 21.7138430000001],
                                        [110.741138945313, 21.6507399726562],
                                        [110.747345, 21.6338430000001],
                                        [110.735963164063, 21.6265554023438],
                                        [110.743897734375, 21.5983180976563],
                                        [110.720792265625, 21.5693679023438],
                                        [110.731109648438, 21.5326540351563],
                                        [110.711248808594, 21.5199391914063],
                                        [110.707345, 21.513843]
                                    ],
                                    [
                                        [110.407345, 21.6738430000001],
                                        [110.403338652344, 21.696567609375],
                                        [110.394346953125, 21.6794045234375],
                                        [110.407345, 21.6738430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "茂港区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [111.081610136719, 21.5732302070313],
                                        [111.063079863281, 21.5381081367188],
                                        [111.037345, 21.533843],
                                        [111.009039335938, 21.5679201484375],
                                        [110.984407988281, 21.5382692695313],
                                        [110.997345, 21.503843],
                                        [111.002115507813, 21.4835866523438],
                                        [111.022345, 21.4772853828125],
                                        [111.032345, 21.4804006171876],
                                        [111.042345, 21.4772853828125],
                                        [111.061881132813, 21.4833718085938],
                                        [111.086026640625, 21.4684938789063],
                                        [111.020101347656, 21.4463088203125],
                                        [110.993531523438, 21.4276564765626],
                                        [110.957345, 21.423843],
                                        [110.952957792969, 21.4496730781251],
                                        [110.937345, 21.4473659492188],
                                        [110.921954375, 21.4496388984375],
                                        [110.888765898438, 21.4296193671875],
                                        [110.893463164063, 21.4614015937501],
                                        [110.870203886719, 21.4793556953125],
                                        [110.873160429688, 21.4993556953126],
                                        [110.867345, 21.503843],
                                        [110.87170046875, 21.51948753125],
                                        [110.89298953125, 21.52819846875],
                                        [110.91170046875, 21.5427614570313],
                                        [110.883604765625, 21.56444846875],
                                        [110.93298953125, 21.5781984687501],
                                        [110.953577910156, 21.6285085273438],
                                        [110.94170046875, 21.6481984687501],
                                        [110.928031035156, 21.6972902656251],
                                        [110.97545046875, 21.7256520820312],
                                        [110.957345, 21.7538430000001],
                                        [110.975167265625, 21.7778029609376],
                                        [111.027345, 21.7538430000001],
                                        [111.039283476563, 21.7241432929688],
                                        [111.023365507813, 21.6316823554688],
                                        [111.053079863281, 21.6095778632813],
                                        [111.061610136719, 21.5881081367188],
                                        [111.081610136719, 21.5732302070313]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "茂南区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [110.833089628906, 21.8242409492188],
                                        [110.883577910156, 21.7868093085938],
                                        [110.902857695313, 21.7896584296876],
                                        [110.914451933594, 21.7746364570313],
                                        [110.94170046875, 21.75819846875],
                                        [110.957345, 21.7538430000001],
                                        [110.97545046875, 21.7256520820312],
                                        [110.928031035156, 21.6972902656251],
                                        [110.94170046875, 21.6481984687501],
                                        [110.953577910156, 21.6285085273438],
                                        [110.93298953125, 21.5781984687501],
                                        [110.883604765625, 21.56444846875],
                                        [110.91170046875, 21.5427614570313],
                                        [110.89298953125, 21.52819846875],
                                        [110.87170046875, 21.51948753125],
                                        [110.867345, 21.503843],
                                        [110.838292265625, 21.4908278632813],
                                        [110.849378691406, 21.5264284492188],
                                        [110.822215605469, 21.5431667304688],
                                        [110.813531523438, 21.5800295234376],
                                        [110.787672148438, 21.588843],
                                        [110.800382109375, 21.6296486640626],
                                        [110.762847929688, 21.6527761054688],
                                        [110.753531523438, 21.6376564765625],
                                        [110.747345, 21.6338430000001],
                                        [110.741138945313, 21.6507399726562],
                                        [110.747345, 21.7138430000001],
                                        [110.75170046875, 21.71948753125],
                                        [110.76298953125, 21.7281984687501],
                                        [110.771732207031, 21.779673078125],
                                        [110.803658476563, 21.7749538398438],
                                        [110.801529570313, 21.7893556953125],
                                        [110.81298953125, 21.7981984687501],
                                        [110.833089628906, 21.8242409492188]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "信宜市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [111.617345, 22.5138430000001],
                                        [111.605152617188, 22.5104201484375],
                                        [111.613922148438, 22.5016506171876],
                                        [111.630704375, 22.507202375],
                                        [111.673985625, 22.500483625],
                                        [111.677345, 22.483843],
                                        [111.67091921875, 22.4486159492188],
                                        [111.60197390625, 22.38921409375],
                                        [111.59271609375, 22.3784719062501],
                                        [111.512069121094, 22.3637599921875],
                                        [111.46236453125, 22.3209352851563],
                                        [111.45271609375, 22.27847190625],
                                        [111.41197390625, 22.2692140937501],
                                        [111.39271609375, 22.25847190625],
                                        [111.377345, 22.2538430000001],
                                        [111.37197390625, 22.25847190625],
                                        [111.361712675781, 22.2814650703125],
                                        [111.328006621094, 22.31050315625],
                                        [111.299742460938, 22.3082326484376],
                                        [111.276405058594, 22.2811452460938],
                                        [111.259947539063, 22.2692140937501],
                                        [111.241800566406, 22.290278546875],
                                        [111.20271609375, 22.2684719062501],
                                        [111.077171660156, 22.245571515625],
                                        [111.046705351563, 22.2625685859376],
                                        [111.01271609375, 22.23847190625],
                                        [110.95197390625, 22.2292140937501],
                                        [110.93271609375, 22.21847190625],
                                        [110.91197390625, 22.20921409375],
                                        [110.902669707031, 22.1984157539063],
                                        [110.892345, 22.1992458320313],
                                        [110.877345, 22.1980397773438],
                                        [110.848997832031, 22.2003176093751],
                                        [110.832669707031, 22.2192702460937],
                                        [110.772884550781, 22.2144680000001],
                                        [110.7928528125, 22.268843],
                                        [110.787345, 22.2838430000001],
                                        [110.783260527344, 22.2897585273438],
                                        [110.771429472656, 22.2979274726563],
                                        [110.763260527344, 22.3197585273438],
                                        [110.738487578125, 22.3578029609376],
                                        [110.711429472656, 22.3679274726562],
                                        [110.703260527344, 22.4497585273438],
                                        [110.685513945313, 22.4620119453126],
                                        [110.677345, 22.4738430000001],
                                        [110.682034941406, 22.4803884101563],
                                        [110.709032011719, 22.463247296875],
                                        [110.745008574219, 22.470356671875],
                                        [110.738258085938, 22.5045290351562],
                                        [110.75341921875, 22.5284108710938],
                                        [110.751356230469, 22.538843],
                                        [110.753333769531, 22.5488430000001],
                                        [110.751300078125, 22.5591310859376],
                                        [110.767244902344, 22.5979347968751],
                                        [110.790089140625, 22.5660622382813],
                                        [110.811519804688, 22.5796681953125],
                                        [110.862279082031, 22.5898439765625],
                                        [110.877345, 22.5868679023438],
                                        [110.896846953125, 22.5907204414063],
                                        [110.887345, 22.613843],
                                        [110.948175078125, 22.6177614570313],
                                        [110.964998808594, 22.6472658515626],
                                        [110.992789335938, 22.6367922187501],
                                        [111.015282011719, 22.6533888984375],
                                        [111.034105253906, 22.646294171875],
                                        [111.053714628906, 22.6574733710938],
                                        [111.060975371094, 22.6702126289063],
                                        [111.073714628906, 22.6774733710938],
                                        [111.080975371094, 22.6902126289063],
                                        [111.087345, 22.693843],
                                        [111.119281035156, 22.7061183906251],
                                        [111.135877714844, 22.629399640625],
                                        [111.17373171875, 22.6071486640625],
                                        [111.192738066406, 22.6095143867188],
                                        [111.224862089844, 22.5860475898437],
                                        [111.287718535156, 22.5938649726563],
                                        [111.313516875, 22.55855003125],
                                        [111.288648710938, 22.548071515625],
                                        [111.262899199219, 22.5042653632812],
                                        [111.272308378906, 22.4979421210938],
                                        [111.305318632813, 22.5173464179688],
                                        [111.3284778125, 22.5202272773437],
                                        [111.404254179688, 22.5091994453125],
                                        [111.401082792969, 22.4837013984376],
                                        [111.423077421875, 22.4315090156251],
                                        [111.4737121875, 22.4528469062501],
                                        [111.46681765625, 22.5082888007813],
                                        [111.492899199219, 22.4993971992188],
                                        [111.525330839844, 22.4803322578125],
                                        [111.542266875, 22.5205251289063],
                                        [111.59396609375, 22.5582888007813],
                                        [111.602899199219, 22.5493971992188],
                                        [111.617345, 22.5138430000001]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });
            define("echarts/util/mapData/geoJson/zhaoqing", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "name": "德庆县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [112.172689238281, 23.4874660468751],
                                        [112.224783964844, 23.46698753125],
                                        [112.248695097656, 23.4705202460938],
                                        [112.26298953125, 23.4594875312501],
                                        [112.267345, 23.4338430000001],
                                        [112.228526640625, 23.4277028632813],
                                        [112.194115019531, 23.4312111640625],
                                        [112.190907011719, 23.3997365546875],
                                        [112.214676542969, 23.3667092109375],
                                        [112.209845, 23.3193044257813],
                                        [112.222806425781, 23.3283815742188],
                                        [112.239420195313, 23.3483815742188],
                                        [112.256751738281, 23.3366310859375],
                                        [112.242791777344, 23.2582888007813],
                                        [112.214410429688, 23.2611794257813],
                                        [112.186656523438, 23.2127223945313],
                                        [112.221883574219, 23.1834596992188],
                                        [112.212806425781, 23.1483815742188],
                                        [112.173963652344, 23.1244216132813],
                                        [112.241173125, 23.1312721992188],
                                        [112.247345, 23.1238430000001],
                                        [112.221519804688, 23.1096681953125],
                                        [112.178951445313, 23.0745363593751],
                                        [112.095328398438, 23.0912331367188],
                                        [112.077345, 23.0838430000001],
                                        [112.054439726563, 23.0748390937501],
                                        [111.987196074219, 23.0847756171875],
                                        [111.966553984375, 23.1352126289062],
                                        [111.897345, 23.1238430000001],
                                        [111.892899199219, 23.1293971992188],
                                        [111.87656375, 23.1424782539063],
                                        [111.781619902344, 23.1306667304687],
                                        [111.732899199219, 23.1493971992188],
                                        [111.693033476563, 23.1607936835938],
                                        [111.666561308594, 23.1575026679688],
                                        [111.622899199219, 23.1893971992188],
                                        [111.557977324219, 23.2006935859375],
                                        [111.522899199219, 23.2242653632813],
                                        [111.547345, 23.2438430000001],
                                        [111.551990996094, 23.2284133125],
                                        [111.572345, 23.2300490546875],
                                        [111.597345, 23.2280397773438],
                                        [111.622020292969, 23.2300221992188],
                                        [111.63197390625, 23.2184719062501],
                                        [111.643519316406, 23.20921409375],
                                        [111.641541777344, 23.2338430000001],
                                        [111.642747832031, 23.248843],
                                        [111.639654570313, 23.2873366523438],
                                        [111.71271609375, 23.2984719062501],
                                        [111.734991484375, 23.3108986640625],
                                        [111.731920195313, 23.3491384101563],
                                        [111.75271609375, 23.3784719062501],
                                        [111.763485136719, 23.4026052070313],
                                        [111.80197390625, 23.38847190625],
                                        [111.834742460938, 23.37921409375],
                                        [111.862901640625, 23.411899640625],
                                        [111.9166809375, 23.3971828437501],
                                        [111.968248320313, 23.4013259101563],
                                        [112.007345, 23.4638430000001],
                                        [112.02062625, 23.4705617500001],
                                        [112.027345, 23.483843],
                                        [112.057345, 23.483843],
                                        [112.10298953125, 23.48819846875],
                                        [112.140875273438, 23.5110524726563],
                                        [112.172689238281, 23.4874660468751]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "鼎湖区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [112.523350859375, 23.3098488593751],
                                        [112.541890898438, 23.2974684882813],
                                        [112.552862578125, 23.3002321601563],
                                        [112.586854277344, 23.2734987617188],
                                        [112.61720828125, 23.2937697578125],
                                        [112.673040800781, 23.307837140625],
                                        [112.706221953125, 23.2881447578125],
                                        [112.71486453125, 23.253843],
                                        [112.706615019531, 23.2211013007812],
                                        [112.7489075, 23.2317555976563],
                                        [112.767345, 23.223843],
                                        [112.761688261719, 23.2091237617188],
                                        [112.767345, 23.1638430000001],
                                        [112.753170195313, 23.1380178046875],
                                        [112.731519804688, 23.1296681953125],
                                        [112.686961699219, 23.0928932929688],
                                        [112.611519804688, 23.1080178046876],
                                        [112.590018339844, 23.1380178046875],
                                        [112.567332792969, 23.127778546875],
                                        [112.553170195313, 23.1080178046876],
                                        [112.547345, 23.103843],
                                        [112.52455203125, 23.1195803046875],
                                        [112.513260527344, 23.1497585273438],
                                        [112.497345, 23.173843],
                                        [112.488450957031, 23.1849489570313],
                                        [112.471790800781, 23.1982888007813],
                                        [112.445267363281, 23.2612380195313],
                                        [112.487345, 23.3138430000001],
                                        [112.523350859375, 23.3098488593751]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "端州区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [112.52455203125, 23.1195803046875],
                                        [112.547345, 23.103843],
                                        [112.503367949219, 23.0394875312501],
                                        [112.403057890625, 23.0490212226563],
                                        [112.393699980469, 23.1123366523438],
                                        [112.43170046875, 23.1067214179688],
                                        [112.42298953125, 23.1194875312501],
                                        [112.400611601563, 23.1286452460938],
                                        [112.41298953125, 23.1381984687501],
                                        [112.42170046875, 23.1494875312501],
                                        [112.46298953125, 23.15819846875],
                                        [112.497345, 23.173843],
                                        [112.513260527344, 23.1497585273438],
                                        [112.52455203125, 23.1195803046875]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "封开县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [112.007345, 23.4638430000001],
                                        [112.007345, 23.483843],
                                        [112.027345, 23.483843],
                                        [112.02062625, 23.4705617500001],
                                        [112.007345, 23.4638430000001]
                                    ]
                                ],
                                [
                                    [
                                        [112.007345, 23.4638430000001],
                                        [111.968248320313, 23.4013259101563],
                                        [111.9166809375, 23.3971828437501],
                                        [111.862901640625, 23.411899640625],
                                        [111.834742460938, 23.37921409375],
                                        [111.80197390625, 23.38847190625],
                                        [111.763485136719, 23.4026052070313],
                                        [111.75271609375, 23.3784719062501],
                                        [111.731920195313, 23.3491384101563],
                                        [111.734991484375, 23.3108986640625],
                                        [111.71271609375, 23.2984719062501],
                                        [111.639654570313, 23.2873366523438],
                                        [111.642747832031, 23.248843],
                                        [111.641541777344, 23.2338430000001],
                                        [111.643519316406, 23.20921409375],
                                        [111.63197390625, 23.2184719062501],
                                        [111.622020292969, 23.2300221992188],
                                        [111.597345, 23.2280397773438],
                                        [111.572345, 23.2300490546875],
                                        [111.551990996094, 23.2284133125],
                                        [111.547345, 23.2438430000001],
                                        [111.56298953125, 23.2481984687501],
                                        [111.57170046875, 23.2677346015625],
                                        [111.531414824219, 23.3220729804687],
                                        [111.50572390625, 23.2887868476563],
                                        [111.46248171875, 23.27948753125],
                                        [111.41298953125, 23.31948753125],
                                        [111.367345, 23.323843],
                                        [111.357191191406, 23.33085471875],
                                        [111.36490359375, 23.3652516914063],
                                        [111.385745878906, 23.37964378125],
                                        [111.377345, 23.413843],
                                        [111.383260527344, 23.4179274726563],
                                        [111.397345, 23.4738430000001],
                                        [111.422899199219, 23.4782888007813],
                                        [111.458607207031, 23.5043752265625],
                                        [111.485535917969, 23.5682814765626],
                                        [111.477345, 23.633843],
                                        [111.512420683594, 23.6286135078126],
                                        [111.543209257813, 23.6394020820313],
                                        [111.562345, 23.6386452460938],
                                        [111.596178007813, 23.639985578125],
                                        [111.632154570313, 23.6890334296876],
                                        [111.661478300781, 23.7162038398438],
                                        [111.621746855469, 23.7287819648438],
                                        [111.623179960938, 23.7648952460938],
                                        [111.647345, 23.833843],
                                        [111.681363554688, 23.8258034492188],
                                        [111.695225859375, 23.844438703125],
                                        [111.732435332031, 23.8214089179688],
                                        [111.801163359375, 23.8095778632813],
                                        [111.8169153125, 23.8472951484375],
                                        [111.809090605469, 23.8927468085938],
                                        [111.822913847656, 23.9113283515625],
                                        [111.84302859375, 23.9078639960938],
                                        [111.85166140625, 23.9498220039063],
                                        [111.872345, 23.9462599921876],
                                        [111.892345, 23.9497048164062],
                                        [111.905184355469, 23.9474929023438],
                                        [111.921610136719, 23.9695778632813],
                                        [111.927345, 23.973843],
                                        [111.952630644531, 23.967983625],
                                        [111.981624785156, 23.985473859375],
                                        [111.96170046875, 23.89948753125],
                                        [111.952659941406, 23.8462624335938],
                                        [111.923289824219, 23.7744997382812],
                                        [111.898631621094, 23.7425563789063],
                                        [111.87298953125, 23.7227614570313],
                                        [111.886380644531, 23.7003762031251],
                                        [111.919659453125, 23.6867580390625],
                                        [111.94170046875, 23.65819846875],
                                        [111.970487089844, 23.6464186835938],
                                        [111.97312625, 23.6285500312501],
                                        [111.95834109375, 23.5909377265626],
                                        [111.963084746094, 23.558843],
                                        [111.961605253906, 23.5488430000001],
                                        [111.963084746094, 23.5388430000001],
                                        [111.960770292969, 23.5231935859375],
                                        [111.98170046875, 23.48819846875],
                                        [111.993160429688, 23.4793556953126],
                                        [111.991517363281, 23.4682497382813],
                                        [112.007345, 23.4638430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "高要市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [112.697345, 22.9338430000001],
                                        [112.690501738281, 22.9577809882813],
                                        [112.672899199219, 22.9408327460938],
                                        [112.680662871094, 22.9043386054688],
                                        [112.583192167969, 22.8668727851563],
                                        [112.56037234375, 22.8697096992187],
                                        [112.565179472656, 22.8310622382813],
                                        [112.532345, 22.826977765625],
                                        [112.511939726563, 22.8295143867188],
                                        [112.472899199219, 22.7982888007812],
                                        [112.387345, 22.773843],
                                        [112.380523710938, 22.7770217109376],
                                        [112.374166289063, 22.7906642890625],
                                        [112.318568144531, 22.7972536445313],
                                        [112.330340605469, 22.8177883125001],
                                        [112.310523710938, 22.8270217109375],
                                        [112.307345, 22.833843],
                                        [112.30298953125, 22.85948753125],
                                        [112.291549101563, 22.878452375],
                                        [112.296009550781, 22.9086452460938],
                                        [112.26170046875, 22.91819846875],
                                        [112.25298953125, 22.9427614570313],
                                        [112.27298953125, 22.95819846875],
                                        [112.293741484375, 23.0089064765626],
                                        [112.281529570313, 23.0183303046875],
                                        [112.283822050781, 23.033843],
                                        [112.281605253906, 23.0488430000001],
                                        [112.284129667969, 23.0659230781251],
                                        [112.31298953125, 23.08819846875],
                                        [112.32170046875, 23.1050441718751],
                                        [112.288570585938, 23.1306154609375],
                                        [112.247345, 23.1238430000001],
                                        [112.241173125, 23.1312721992188],
                                        [112.173963652344, 23.1244216132813],
                                        [112.212806425781, 23.1483815742188],
                                        [112.221883574219, 23.1834596992188],
                                        [112.186656523438, 23.2127223945313],
                                        [112.214410429688, 23.2611794257813],
                                        [112.242791777344, 23.2582888007813],
                                        [112.256751738281, 23.3366310859375],
                                        [112.239420195313, 23.3483815742188],
                                        [112.222806425781, 23.3283815742188],
                                        [112.209845, 23.3193044257813],
                                        [112.214676542969, 23.3667092109375],
                                        [112.190907011719, 23.3997365546875],
                                        [112.194115019531, 23.4312111640625],
                                        [112.228526640625, 23.4277028632813],
                                        [112.267345, 23.4338430000001],
                                        [112.306163359375, 23.4277028632813],
                                        [112.347611113281, 23.4319289375],
                                        [112.364881621094, 23.417583234375],
                                        [112.389945097656, 23.359790265625],
                                        [112.427345, 23.373843],
                                        [112.433260527344, 23.3697585273437],
                                        [112.443074980469, 23.3435305000001],
                                        [112.487345, 23.3138430000001],
                                        [112.445267363281, 23.2612380195313],
                                        [112.471790800781, 23.1982888007813],
                                        [112.488450957031, 23.1849489570313],
                                        [112.497345, 23.173843],
                                        [112.46298953125, 23.15819846875],
                                        [112.42170046875, 23.1494875312501],
                                        [112.41298953125, 23.1381984687501],
                                        [112.400611601563, 23.1286452460938],
                                        [112.42298953125, 23.1194875312501],
                                        [112.43170046875, 23.1067214179688],
                                        [112.393699980469, 23.1123366523438],
                                        [112.403057890625, 23.0490212226563],
                                        [112.503367949219, 23.0394875312501],
                                        [112.547345, 23.103843],
                                        [112.553170195313, 23.1080178046876],
                                        [112.567332792969, 23.127778546875],
                                        [112.590018339844, 23.1380178046875],
                                        [112.611519804688, 23.1080178046876],
                                        [112.686961699219, 23.0928932929688],
                                        [112.731519804688, 23.1296681953125],
                                        [112.753170195313, 23.1380178046875],
                                        [112.767345, 23.1638430000001],
                                        [112.789495878906, 23.1579982734375],
                                        [112.801519804688, 23.0980178046875],
                                        [112.813170195313, 23.0696681953125],
                                        [112.827345, 23.0138430000001],
                                        [112.810523710938, 23.0106642890626],
                                        [112.792681914063, 22.9957839179688],
                                        [112.7733996875, 23.0068386054688],
                                        [112.7612903125, 22.9808473945313],
                                        [112.742081328125, 22.991860578125],
                                        [112.724166289063, 22.9781081367188],
                                        [112.735404082031, 22.9585060859375],
                                        [112.718104277344, 22.9377638984375],
                                        [112.697345, 22.9338430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "广宁县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [112.552796660156, 23.9795217109375],
                                        [112.562345, 23.9676003242188],
                                        [112.567345, 23.973843],
                                        [112.602957792969, 23.9509694648438],
                                        [112.632345, 23.9466262031251],
                                        [112.670125761719, 23.9522096992188],
                                        [112.684879179688, 23.9146804023438],
                                        [112.671575957031, 23.8690529609375],
                                        [112.67373171875, 23.8544509101563],
                                        [112.66298953125, 23.8281984687501],
                                        [112.650391875, 23.8184767890626],
                                        [112.69298953125, 23.80948753125],
                                        [112.701978789063, 23.7565724921875],
                                        [112.731302519531, 23.7609059882813],
                                        [112.733148222656, 23.7484133125001],
                                        [112.711527128906, 23.71925315625],
                                        [112.717345, 23.683843],
                                        [112.701383085938, 23.6908425117188],
                                        [112.693441191406, 23.6377468085938],
                                        [112.649928007813, 23.6224416328125],
                                        [112.656561308594, 23.598843],
                                        [112.62334109375, 23.5871584296876],
                                        [112.611886015625, 23.590376203125],
                                        [112.593441191406, 23.5777468085938],
                                        [112.570687285156, 23.5697414375],
                                        [112.575155058594, 23.553843],
                                        [112.57093875, 23.5388430000001],
                                        [112.575155058594, 23.523843],
                                        [112.566102324219, 23.4916335273438],
                                        [112.545147734375, 23.4610305000001],
                                        [112.488675566406, 23.476899640625],
                                        [112.49375125, 23.458843],
                                        [112.489945097656, 23.4453029609375],
                                        [112.47154421875, 23.450473859375],
                                        [112.453441191406, 23.4177468085938],
                                        [112.431248808594, 23.3899391914063],
                                        [112.427345, 23.373843],
                                        [112.389945097656, 23.359790265625],
                                        [112.364881621094, 23.417583234375],
                                        [112.347611113281, 23.4319289375],
                                        [112.306163359375, 23.4277028632813],
                                        [112.267345, 23.4338430000001],
                                        [112.26298953125, 23.4594875312501],
                                        [112.248695097656, 23.4705202460938],
                                        [112.224783964844, 23.46698753125],
                                        [112.172689238281, 23.4874660468751],
                                        [112.140875273438, 23.5110524726563],
                                        [112.10298953125, 23.48819846875],
                                        [112.057345, 23.483843],
                                        [112.062764921875, 23.4986037421875],
                                        [112.061812773438, 23.5104616523438],
                                        [112.084359160156, 23.5298854804688],
                                        [112.102623320313, 23.5284181953125],
                                        [112.124837675781, 23.5408132148438],
                                        [112.141998320313, 23.5792726875001],
                                        [112.161785917969, 23.5776833320313],
                                        [112.131922636719, 23.64858909375],
                                        [112.136170683594, 23.7014455390625],
                                        [112.19271609375, 23.7184719062501],
                                        [112.20197390625, 23.7492140937501],
                                        [112.212769804688, 23.7685646796875],
                                        [112.211842070313, 23.7800881171875],
                                        [112.234205351563, 23.7782912421875],
                                        [112.252120390625, 23.7381398750001],
                                        [112.2773059375, 23.7521901679688],
                                        [112.292115507813, 23.769380109375],
                                        [112.332142363281, 23.7584255195313],
                                        [112.343509550781, 23.7593386054688],
                                        [112.341942167969, 23.7788430000001],
                                        [112.343551054688, 23.798843],
                                        [112.341165800781, 23.8285182929688],
                                        [112.361712675781, 23.8462209296875],
                                        [112.381229277344, 23.8899587226563],
                                        [112.404359160156, 23.9098854804688],
                                        [112.422623320313, 23.9084181953125],
                                        [112.477225371094, 23.9388845039063],
                                        [112.507345, 23.973843],
                                        [112.552796660156, 23.9795217109375]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "怀集县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [112.407345, 24.313843],
                                        [112.421800566406, 24.2880226875],
                                        [112.441082792969, 24.2908718085938],
                                        [112.453177519531, 24.2386769843751],
                                        [112.42298953125, 24.1618874335938],
                                        [112.43170046875, 24.1281984687501],
                                        [112.483804960938, 24.1136916328126],
                                        [112.513311796875, 24.0184474921876],
                                        [112.501512480469, 24.0093410468751],
                                        [112.507345, 23.973843],
                                        [112.477225371094, 23.9388845039063],
                                        [112.422623320313, 23.9084181953125],
                                        [112.404359160156, 23.9098854804688],
                                        [112.381229277344, 23.8899587226563],
                                        [112.361712675781, 23.8462209296875],
                                        [112.341165800781, 23.8285182929688],
                                        [112.343551054688, 23.798843],
                                        [112.341942167969, 23.7788430000001],
                                        [112.343509550781, 23.7593386054688],
                                        [112.332142363281, 23.7584255195313],
                                        [112.292115507813, 23.769380109375],
                                        [112.2773059375, 23.7521901679688],
                                        [112.252120390625, 23.7381398750001],
                                        [112.234205351563, 23.7782912421875],
                                        [112.211842070313, 23.7800881171875],
                                        [112.212769804688, 23.7685646796875],
                                        [112.20197390625, 23.7492140937501],
                                        [112.19271609375, 23.7184719062501],
                                        [112.136170683594, 23.7014455390625],
                                        [112.131922636719, 23.64858909375],
                                        [112.161785917969, 23.5776833320313],
                                        [112.141998320313, 23.5792726875001],
                                        [112.124837675781, 23.5408132148438],
                                        [112.102623320313, 23.5284181953125],
                                        [112.084359160156, 23.5298854804688],
                                        [112.061812773438, 23.5104616523438],
                                        [112.062764921875, 23.4986037421875],
                                        [112.057345, 23.483843],
                                        [112.027345, 23.483843],
                                        [112.007345, 23.483843],
                                        [112.007345, 23.4638430000001],
                                        [111.991517363281, 23.4682497382813],
                                        [111.993160429688, 23.4793556953126],
                                        [111.98170046875, 23.48819846875],
                                        [111.960770292969, 23.5231935859375],
                                        [111.963084746094, 23.5388430000001],
                                        [111.961605253906, 23.5488430000001],
                                        [111.963084746094, 23.558843],
                                        [111.95834109375, 23.5909377265626],
                                        [111.97312625, 23.6285500312501],
                                        [111.970487089844, 23.6464186835938],
                                        [111.94170046875, 23.65819846875],
                                        [111.919659453125, 23.6867580390625],
                                        [111.886380644531, 23.7003762031251],
                                        [111.87298953125, 23.7227614570313],
                                        [111.898631621094, 23.7425563789063],
                                        [111.923289824219, 23.7744997382812],
                                        [111.952659941406, 23.8462624335938],
                                        [111.96170046875, 23.89948753125],
                                        [111.981624785156, 23.985473859375],
                                        [111.952630644531, 23.967983625],
                                        [111.927345, 23.973843],
                                        [111.933294707031, 23.98897971875],
                                        [111.92170046875, 24.0081984687501],
                                        [111.91298953125, 24.03948753125],
                                        [111.901207304688, 24.048579328125],
                                        [111.87619265625, 24.1122121406251],
                                        [111.883140898438, 24.159233625],
                                        [111.86298953125, 24.192641828125],
                                        [111.872081328125, 24.231098859375],
                                        [111.910809355469, 24.2253762031251],
                                        [111.922000761719, 24.2398757148438],
                                        [111.937345, 24.2338430000001],
                                        [111.9541028125, 24.2398561835938],
                                        [111.999429960938, 24.1891237617187],
                                        [112.032625761719, 24.1985622382813],
                                        [112.059534941406, 24.2685622382813],
                                        [112.10970828125, 24.232387921875],
                                        [112.150096464844, 24.1871877265626],
                                        [112.172064238281, 24.1991237617188],
                                        [112.192625761719, 24.2085622382813],
                                        [112.212064238281, 24.2391237617188],
                                        [112.250384550781, 24.2509572578125],
                                        [112.253238554688, 24.298843],
                                        [112.2520325, 24.31909690625],
                                        [112.257345, 24.323843],
                                        [112.291146269531, 24.3293068671875],
                                        [112.277567167969, 24.3980178046875],
                                        [112.313170195313, 24.3796681953125],
                                        [112.341519804688, 24.3580178046875],
                                        [112.370999785156, 24.3466481757813],
                                        [112.391519804688, 24.3180178046875],
                                        [112.407345, 24.313843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "四会市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [112.717345, 23.683843],
                                        [112.747074003906, 23.6765407539063],
                                        [112.768365507813, 23.681313703125],
                                        [112.781429472656, 23.6504714179688],
                                        [112.751429472656, 23.6297585273438],
                                        [112.743260527344, 23.6084670234375],
                                        [112.795706816406, 23.5888430000001],
                                        [112.789132109375, 23.5595143867188],
                                        [112.810887480469, 23.5444924140625],
                                        [112.817345, 23.553843],
                                        [112.82298953125, 23.54948753125],
                                        [112.83170046875, 23.53819846875],
                                        [112.848231230469, 23.5254396796875],
                                        [112.83298953125, 23.48819846875],
                                        [112.793219023438, 23.4389919257813],
                                        [112.77298953125, 23.3696047187501],
                                        [112.79298953125, 23.37819846875],
                                        [112.808426542969, 23.3981984687501],
                                        [112.839271269531, 23.3872585273438],
                                        [112.86170046875, 23.35819846875],
                                        [112.876512480469, 23.3467653632813],
                                        [112.86298953125, 23.29819846875],
                                        [112.850897246094, 23.2888649726563],
                                        [112.821095, 23.24866721875],
                                        [112.84170046875, 23.2327614570313],
                                        [112.822784453125, 23.2180397773438],
                                        [112.811832304688, 23.2196584296875],
                                        [112.802147246094, 23.2071096015625],
                                        [112.792345, 23.231059796875],
                                        [112.782542753906, 23.2071096015625],
                                        [112.77298953125, 23.21948753125],
                                        [112.767345, 23.223843],
                                        [112.7489075, 23.2317555976563],
                                        [112.706615019531, 23.2211013007812],
                                        [112.71486453125, 23.253843],
                                        [112.706221953125, 23.2881447578125],
                                        [112.673040800781, 23.307837140625],
                                        [112.61720828125, 23.2937697578125],
                                        [112.586854277344, 23.2734987617188],
                                        [112.552862578125, 23.3002321601563],
                                        [112.541890898438, 23.2974684882813],
                                        [112.523350859375, 23.3098488593751],
                                        [112.487345, 23.3138430000001],
                                        [112.443074980469, 23.3435305000001],
                                        [112.433260527344, 23.3697585273437],
                                        [112.427345, 23.373843],
                                        [112.431248808594, 23.3899391914063],
                                        [112.453441191406, 23.4177468085938],
                                        [112.47154421875, 23.450473859375],
                                        [112.489945097656, 23.4453029609375],
                                        [112.49375125, 23.458843],
                                        [112.488675566406, 23.476899640625],
                                        [112.545147734375, 23.4610305000001],
                                        [112.566102324219, 23.4916335273438],
                                        [112.575155058594, 23.523843],
                                        [112.57093875, 23.5388430000001],
                                        [112.575155058594, 23.553843],
                                        [112.570687285156, 23.5697414375],
                                        [112.593441191406, 23.5777468085938],
                                        [112.611886015625, 23.590376203125],
                                        [112.62334109375, 23.5871584296876],
                                        [112.656561308594, 23.598843],
                                        [112.649928007813, 23.6224416328125],
                                        [112.693441191406, 23.6377468085938],
                                        [112.701383085938, 23.6908425117188],
                                        [112.717345, 23.683843]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });
            define("echarts/util/mapData/geoJson/huizhou", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "name": "博罗县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [114.479713164063, 23.7051296210938],
                                        [114.503443632813, 23.6899391914063],
                                        [114.511246367188, 23.6777468085937],
                                        [114.527345, 23.673843],
                                        [114.533394804688, 23.6502638984376],
                                        [114.553565703125, 23.6192897773438],
                                        [114.549254179688, 23.6000466132812],
                                        [114.57142703125, 23.5679274726563],
                                        [114.597432890625, 23.5581960273438],
                                        [114.612345, 23.5366017890625],
                                        [114.62142703125, 23.5497585273438],
                                        [114.647345, 23.563843],
                                        [114.653443632813, 23.5599391914063],
                                        [114.661246367188, 23.5377468085938],
                                        [114.6947278125, 23.5296266914063],
                                        [114.673648710938, 23.498843],
                                        [114.6945325, 23.4683498359375],
                                        [114.661246367188, 23.4499391914063],
                                        [114.645636015625, 23.4255519843751],
                                        [114.627345, 23.413843],
                                        [114.60197390625, 23.4092140937501],
                                        [114.59271609375, 23.38847190625],
                                        [114.575069609375, 23.3732692695313],
                                        [114.549229765625, 23.4032643867187],
                                        [114.519854765625, 23.3868727851563],
                                        [114.496065703125, 23.3335622382813],
                                        [114.5180871875, 23.3145876289062],
                                        [114.5366028125, 23.2930983710938],
                                        [114.561754179688, 23.2714284492188],
                                        [114.505675078125, 23.2464040351563],
                                        [114.474527617188, 23.2637844062501],
                                        [114.424610625, 23.2058498359376],
                                        [114.368782988281, 23.2103346992188],
                                        [114.328089628906, 23.1630983710938],
                                        [114.31197390625, 23.1492140937501],
                                        [114.294359160156, 23.1287697578125],
                                        [114.236085234375, 23.1181398750001],
                                        [114.216751738281, 23.1196950507813],
                                        [114.17271609375, 23.08847190625],
                                        [114.15197390625, 23.07921409375],
                                        [114.138089628906, 23.0630983710938],
                                        [114.127345, 23.0538430000001],
                                        [114.094881621094, 23.0600417304688],
                                        [114.079500761719, 23.108618390625],
                                        [114.015628691406, 23.0862306953126],
                                        [113.972535429688, 23.1090334296875],
                                        [113.882296171875, 23.1198317695313],
                                        [113.852193632813, 23.118637921875],
                                        [113.837345, 23.1238430000001],
                                        [113.846085234375, 23.151450421875],
                                        [113.89658328125, 23.1752834296876],
                                        [113.878468046875, 23.1920680976563],
                                        [113.897323027344, 23.227700421875],
                                        [113.882535429688, 23.2590334296875],
                                        [113.872017851563, 23.2687770820313],
                                        [113.882535429688, 23.2886525703126],
                                        [113.893990507813, 23.3486525703125],
                                        [113.943436308594, 23.3388552070313],
                                        [113.979705839844, 23.2997096992188],
                                        [113.992154570313, 23.3390334296875],
                                        [113.997345, 23.343843],
                                        [114.038690214844, 23.3344509101563],
                                        [114.043587675781, 23.373843],
                                        [114.040721464844, 23.3969045234375],
                                        [114.09197390625, 23.4295119453125],
                                        [114.104605742188, 23.4279396796876],
                                        [114.17099734375, 23.4559157539063],
                                        [114.181890898438, 23.4695217109376],
                                        [114.192345, 23.4682204414063],
                                        [114.222799101563, 23.4720095039063],
                                        [114.245355253906, 23.4438381171876],
                                        [114.312899199219, 23.5282888007813],
                                        [114.321790800781, 23.5493971992187],
                                        [114.332899199219, 23.5582888007812],
                                        [114.358858671875, 23.6010329414063],
                                        [114.397103300781, 23.6316579414063],
                                        [114.382899199219, 23.6493971992188],
                                        [114.354522734375, 23.6721193671876],
                                        [114.392899199219, 23.6882888007813],
                                        [114.417345, 23.703843],
                                        [114.426156035156, 23.6900783515626],
                                        [114.479713164063, 23.7051296210938]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "惠城区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [114.693682890625, 23.4146071601563],
                                        [114.691085234375, 23.3937013984375],
                                        [114.701793242188, 23.3682888007812],
                                        [114.713023710938, 23.3592971015625],
                                        [114.711666289063, 23.3483669257813],
                                        [114.774386015625, 23.31026878125],
                                        [114.770650664063, 23.28022971875],
                                        [114.785479765625, 23.2550051093751],
                                        [114.777345, 23.2338430000001],
                                        [114.73170046875, 23.2294875312501],
                                        [114.691905546875, 23.1999806953125],
                                        [114.68298953125, 23.1781984687501],
                                        [114.670172148438, 23.1569484687501],
                                        [114.651832304688, 23.1596584296875],
                                        [114.635894804688, 23.139009015625],
                                        [114.617345, 23.133843],
                                        [114.60263796875, 23.1280617500001],
                                        [114.571031523438, 23.1327321601563],
                                        [114.57312625, 23.11855003125],
                                        [114.559127226563, 23.0829372382813],
                                        [114.531226835938, 23.0614015937501],
                                        [114.535611601563, 23.0317360664063],
                                        [114.499840117188, 22.9834865546876],
                                        [114.453057890625, 22.9473805976563],
                                        [114.43298953125, 22.9594875312501],
                                        [114.41170046875, 22.96819846875],
                                        [114.39298953125, 22.9994875312501],
                                        [114.37170046875, 23.00819846875],
                                        [114.361419707031, 23.02151878125],
                                        [114.3027746875, 22.9780397773438],
                                        [114.292345, 22.9795827460938],
                                        [114.271912871094, 22.9765627265625],
                                        [114.24298953125, 22.92819846875],
                                        [114.227345, 22.923843],
                                        [114.20375125, 22.9297292304688],
                                        [114.215452910156, 22.9761818671875],
                                        [114.203040800781, 22.997837140625],
                                        [114.152345, 22.985063703125],
                                        [114.119686308594, 22.9932912421875],
                                        [114.125379667969, 23.0158864570313],
                                        [114.14486453125, 23.028843],
                                        [114.131339140625, 23.037837140625],
                                        [114.127345, 23.0538430000001],
                                        [114.138089628906, 23.0630983710938],
                                        [114.15197390625, 23.07921409375],
                                        [114.17271609375, 23.08847190625],
                                        [114.216751738281, 23.1196950507813],
                                        [114.236085234375, 23.1181398750001],
                                        [114.294359160156, 23.1287697578125],
                                        [114.31197390625, 23.1492140937501],
                                        [114.328089628906, 23.1630983710938],
                                        [114.368782988281, 23.2103346992188],
                                        [114.424610625, 23.2058498359376],
                                        [114.474527617188, 23.2637844062501],
                                        [114.505675078125, 23.2464040351563],
                                        [114.561754179688, 23.2714284492188],
                                        [114.5366028125, 23.2930983710938],
                                        [114.5180871875, 23.3145876289062],
                                        [114.496065703125, 23.3335622382813],
                                        [114.519854765625, 23.3868727851563],
                                        [114.549229765625, 23.4032643867187],
                                        [114.575069609375, 23.3732692695313],
                                        [114.59271609375, 23.38847190625],
                                        [114.60197390625, 23.4092140937501],
                                        [114.627345, 23.413843],
                                        [114.632799101563, 23.4070339179688],
                                        [114.693682890625, 23.4146071601563]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "惠东县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [114.887345, 22.5538430000001],
                                        [114.883922148438, 22.5416506171875],
                                        [114.875152617188, 22.5504201484375],
                                        [114.887345, 22.5538430000001]
                                    ]
                                ],
                                [
                                    [
                                        [114.887345, 22.5538430000001],
                                        [114.893595, 22.5865822578126],
                                        [114.921827421875, 22.5604250312501],
                                        [114.887345, 22.5538430000001]
                                    ]
                                ],
                                [
                                    [
                                        [114.777345, 22.8238430000001],
                                        [114.773922148438, 22.8360353828126],
                                        [114.765152617188, 22.8272658515625],
                                        [114.77330203125, 22.7917751289063],
                                        [114.742213164063, 22.7763210273438],
                                        [114.720704375, 22.787202375],
                                        [114.713326445313, 22.8017873359376],
                                        [114.697345, 22.793843],
                                        [114.689967070313, 22.8342897773438],
                                        [114.602027617188, 22.8183473945313],
                                        [114.59271609375, 22.8392140937501],
                                        [114.581163359375, 22.8491677070313],
                                        [114.582745390625, 22.868843],
                                        [114.58158328125, 22.8833229804687],
                                        [114.561763945313, 22.918843],
                                        [114.573541289063, 22.9399513984375],
                                        [114.60255984375, 22.9376198554688],
                                        [114.61197390625, 22.9892140937501],
                                        [114.62271609375, 22.9984719062501],
                                        [114.6332825, 23.022153546875],
                                        [114.631944609375, 23.038843],
                                        [114.632760039063, 23.0489870429688],
                                        [114.617345, 23.133843],
                                        [114.635894804688, 23.139009015625],
                                        [114.651832304688, 23.1596584296875],
                                        [114.670172148438, 23.1569484687501],
                                        [114.68298953125, 23.1781984687501],
                                        [114.691905546875, 23.1999806953125],
                                        [114.73170046875, 23.2294875312501],
                                        [114.777345, 23.2338430000001],
                                        [114.782843046875, 23.2151052070313],
                                        [114.849322539063, 23.1624929023438],
                                        [114.862882109375, 23.1985768867188],
                                        [114.86107546875, 23.2162966132813],
                                        [114.876422148438, 23.2347682929688],
                                        [114.892896757813, 23.2484523750001],
                                        [114.891803007813, 23.2591652656251],
                                        [114.910011015625, 23.2909596992188],
                                        [114.9128528125, 23.3188430000001],
                                        [114.910079375, 23.3460646796875],
                                        [114.945421171875, 23.3496657539063],
                                        [114.962808867188, 23.3193044257813],
                                        [114.975631132813, 23.2897389960938],
                                        [115.010391875, 23.3315895820313],
                                        [115.051285429688, 23.3274221015625],
                                        [115.101881132813, 23.3593044257813],
                                        [115.152808867188, 23.3683815742188],
                                        [115.187725859375, 23.3883815742188],
                                        [115.269737578125, 23.3784670234375],
                                        [115.292808867188, 23.3593044257813],
                                        [115.305050078125, 23.3175905585938],
                                        [115.338233671875, 23.32097190625],
                                        [115.390992460938, 23.2834914375001],
                                        [115.401881132813, 23.2583815742188],
                                        [115.407345, 23.253843],
                                        [115.407345, 23.2438430000001],
                                        [115.395655546875, 23.2307595039062],
                                        [115.349034453125, 23.1969264960937],
                                        [115.323970976563, 23.1688747382813],
                                        [115.279678984375, 23.1585695625001],
                                        [115.283238554688, 23.098843],
                                        [115.260260039063, 23.088296125],
                                        [115.239478789063, 23.0650417304688],
                                        [115.16724734375, 23.0372731757813],
                                        [115.14252078125, 22.9983962226563],
                                        [115.112545195313, 23.0091530585938],
                                        [115.097345, 23.008247296875],
                                        [115.082100859375, 23.0091555],
                                        [115.022413359375, 22.9601833320313],
                                        [114.982569609375, 22.9385305],
                                        [114.966441679688, 22.9394924140625],
                                        [114.913121367188, 22.9150197578126],
                                        [114.93283328125, 22.87874534375],
                                        [114.917408476563, 22.8649636054688],
                                        [114.932061796875, 22.8485622382813],
                                        [114.942628203125, 22.8391237617188],
                                        [114.952061796875, 22.7985622382813],
                                        [114.9926575, 22.7691017890625],
                                        [114.991607695313, 22.7514577460937],
                                        [115.012061796875, 22.7285622382812],
                                        [115.017345, 22.723843],
                                        [115.017345, 22.7038430000001],
                                        [114.97297, 22.6901418281251],
                                        [114.953189726563, 22.6679982734375],
                                        [114.932061796875, 22.6491237617188],
                                        [114.917906523438, 22.6332814765625],
                                        [114.9020325, 22.6190969062501],
                                        [114.902642851563, 22.608843],
                                        [114.9019934375, 22.5979689765625],
                                        [114.882345, 22.5991408515626],
                                        [114.872345, 22.5985451484375],
                                        [114.847345, 22.6000344062501],
                                        [114.812345, 22.5979494453126],
                                        [114.792164335938, 22.5991506171875],
                                        [114.752174101563, 22.5884401679688],
                                        [114.741539335938, 22.6003395820313],
                                        [114.74373171875, 22.6370925117188],
                                        [114.731890898438, 22.6588771796875],
                                        [114.752799101563, 22.6888088203125],
                                        [114.74095828125, 22.7105934882813],
                                        [114.74334109375, 22.7505300117188],
                                        [114.831651640625, 22.7910622382813],
                                        [114.806783476563, 22.8132814765626],
                                        [114.792491484375, 22.8292775703125],
                                        [114.777345, 22.8238430000001]
                                    ],
                                    [
                                        [114.927345, 22.723843],
                                        [114.927345, 22.713843],
                                        [114.937345, 22.713843],
                                        [114.937345, 22.7038430000001],
                                        [114.947345, 22.7038430000001],
                                        [114.950767851563, 22.6916506171876],
                                        [114.959537382813, 22.7004201484375],
                                        [114.947345, 22.7038430000001],
                                        [114.947345, 22.713843],
                                        [114.937345, 22.713843],
                                        [114.937345, 22.723843],
                                        [114.932965117188, 22.7316847968751],
                                        [114.961519804688, 22.7260427070313],
                                        [114.94896609375, 22.7465309882813],
                                        [114.868629179688, 22.7625710273437],
                                        [114.88341921875, 22.7392751289062],
                                        [114.879678984375, 22.7203566718751],
                                        [114.897921171875, 22.7167531562501],
                                        [114.927345, 22.723843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "惠阳区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [114.643922148438, 22.4460353828125],
                                        [114.647345, 22.4338430000001],
                                        [114.635152617188, 22.4372658515625],
                                        [114.643922148438, 22.4460353828125]
                                    ]
                                ],
                                [
                                    [
                                        [114.628961210938, 22.4776589179688],
                                        [114.647345, 22.453843],
                                        [114.61298953125, 22.4596804023438],
                                        [114.628961210938, 22.4776589179688]
                                    ]
                                ],
                                [
                                    [
                                        [114.647345, 22.573843],
                                        [114.659537382813, 22.5704201484376],
                                        [114.650767851563, 22.5616506171875],
                                        [114.647345, 22.573843]
                                    ]
                                ],
                                [
                                    [
                                        [114.647345, 22.573843],
                                        [114.635152617188, 22.5772658515626],
                                        [114.643922148438, 22.5860353828125],
                                        [114.647345, 22.573843]
                                    ]
                                ],
                                [
                                    [
                                        [114.517345, 22.6738430000001],
                                        [114.529537382813, 22.6704201484375],
                                        [114.520767851563, 22.6616506171875],
                                        [114.517345, 22.6738430000001]
                                    ]
                                ],
                                [
                                    [
                                        [114.593922148438, 22.7060353828125],
                                        [114.597345, 22.693843],
                                        [114.585152617188, 22.6972658515625],
                                        [114.593922148438, 22.7060353828125]
                                    ]
                                ],
                                [
                                    [
                                        [114.537345, 22.7038430000001],
                                        [114.531910429688, 22.7165407539063],
                                        [114.514346953125, 22.707895734375],
                                        [114.537345, 22.683843],
                                        [114.517345, 22.683843],
                                        [114.517345, 22.6738430000001],
                                        [114.507345, 22.6738430000001],
                                        [114.472379179688, 22.6680983710938],
                                        [114.457345, 22.6703200507813],
                                        [114.429744902344, 22.6662429023438],
                                        [114.434486113281, 22.6983303046876],
                                        [114.40724734375, 22.7193556953126],
                                        [114.413822050781, 22.763843],
                                        [114.410709257813, 22.7849196601563],
                                        [114.38298953125, 22.76819846875],
                                        [114.358426542969, 22.75948753125],
                                        [114.340667753906, 22.7824929023438],
                                        [114.344945097656, 22.8114430976563],
                                        [114.307345, 22.8058864570312],
                                        [114.2819153125, 22.8096462226563],
                                        [114.2527746875, 22.7880397773438],
                                        [114.233746367188, 22.7908522773438],
                                        [114.227345, 22.813843],
                                        [114.232064238281, 22.8791237617188],
                                        [114.261224394531, 22.9051784492188],
                                        [114.232064238281, 22.9185622382813],
                                        [114.227345, 22.923843],
                                        [114.24298953125, 22.92819846875],
                                        [114.271912871094, 22.9765627265625],
                                        [114.292345, 22.9795827460938],
                                        [114.3027746875, 22.9780397773438],
                                        [114.361419707031, 23.02151878125],
                                        [114.37170046875, 23.00819846875],
                                        [114.39298953125, 22.9994875312501],
                                        [114.41170046875, 22.96819846875],
                                        [114.43298953125, 22.9594875312501],
                                        [114.453057890625, 22.9473805976563],
                                        [114.499840117188, 22.9834865546876],
                                        [114.535611601563, 23.0317360664063],
                                        [114.531226835938, 23.0614015937501],
                                        [114.559127226563, 23.0829372382813],
                                        [114.57312625, 23.11855003125],
                                        [114.571031523438, 23.1327321601563],
                                        [114.60263796875, 23.1280617500001],
                                        [114.617345, 23.133843],
                                        [114.632760039063, 23.0489870429688],
                                        [114.631944609375, 23.038843],
                                        [114.6332825, 23.022153546875],
                                        [114.62271609375, 22.9984719062501],
                                        [114.61197390625, 22.9892140937501],
                                        [114.60255984375, 22.9376198554688],
                                        [114.573541289063, 22.9399513984375],
                                        [114.561763945313, 22.918843],
                                        [114.58158328125, 22.8833229804687],
                                        [114.582745390625, 22.868843],
                                        [114.581163359375, 22.8491677070313],
                                        [114.59271609375, 22.8392140937501],
                                        [114.602027617188, 22.8183473945313],
                                        [114.689967070313, 22.8342897773438],
                                        [114.697345, 22.793843],
                                        [114.69142703125, 22.7897585273438],
                                        [114.68326296875, 22.7779274726563],
                                        [114.65142703125, 22.7697585273438],
                                        [114.63326296875, 22.7579274726563],
                                        [114.5676184375, 22.73491721875],
                                        [114.5767590625, 22.6941628242188],
                                        [114.537345, 22.7038430000001]
                                    ],
                                    [
                                        [114.557345, 22.723843],
                                        [114.553922148438, 22.7360353828125],
                                        [114.545152617188, 22.7272658515626],
                                        [114.557345, 22.723843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "龙门县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [114.26271609375, 23.9484719062501],
                                        [114.23271609375, 23.9226247382813],
                                        [114.278792753906, 23.9003346992188],
                                        [114.307345, 23.8980397773438],
                                        [114.322515898438, 23.8992580390625],
                                        [114.347345, 23.8938430000001],
                                        [114.34271609375, 23.87847190625],
                                        [114.32295046875, 23.8430422187501],
                                        [114.342764921875, 23.7890822578125],
                                        [114.340413847656, 23.7598146796876],
                                        [114.352772246094, 23.7491677070313],
                                        [114.351180449219, 23.7293386054687],
                                        [114.362669707031, 23.7284157539063],
                                        [114.377345, 23.7454494453126],
                                        [114.396600371094, 23.7230983710938],
                                        [114.41271609375, 23.7092140937501],
                                        [114.417345, 23.703843],
                                        [114.392899199219, 23.6882888007813],
                                        [114.354522734375, 23.6721193671876],
                                        [114.382899199219, 23.6493971992188],
                                        [114.397103300781, 23.6316579414063],
                                        [114.358858671875, 23.6010329414063],
                                        [114.332899199219, 23.5582888007812],
                                        [114.321790800781, 23.5493971992187],
                                        [114.312899199219, 23.5282888007813],
                                        [114.245355253906, 23.4438381171876],
                                        [114.222799101563, 23.4720095039063],
                                        [114.192345, 23.4682204414063],
                                        [114.181890898438, 23.4695217109376],
                                        [114.17099734375, 23.4559157539063],
                                        [114.104605742188, 23.4279396796876],
                                        [114.09197390625, 23.4295119453125],
                                        [114.040721464844, 23.3969045234375],
                                        [114.043587675781, 23.373843],
                                        [114.038690214844, 23.3344509101563],
                                        [113.997345, 23.343843],
                                        [113.9783996875, 23.3736232734376],
                                        [113.99334109375, 23.3990431953126],
                                        [113.981790800781, 23.4082888007812],
                                        [113.972899199219, 23.4293971992188],
                                        [113.94361453125, 23.45284690625],
                                        [113.975748320313, 23.4785817695313],
                                        [113.941790800781, 23.4882888007813],
                                        [113.896551542969, 23.5148830390626],
                                        [113.850863066406, 23.5719362617188],
                                        [113.856473417969, 23.6170339179688],
                                        [113.817345, 23.6238430000001],
                                        [113.805738554688, 23.633843],
                                        [113.831712675781, 23.6562209296875],
                                        [113.84197390625, 23.6792140937501],
                                        [113.87271609375, 23.68847190625],
                                        [113.934827910156, 23.739848859375],
                                        [113.953963652344, 23.7383107734375],
                                        [113.97197390625, 23.75921409375],
                                        [113.995655546875, 23.7697829414063],
                                        [114.021046171875, 23.7677419257813],
                                        [114.05197390625, 23.7812404609376],
                                        [114.031917753906, 23.7985182929688],
                                        [114.032747832031, 23.8088430000001],
                                        [114.031920195313, 23.8191213203125],
                                        [114.050316191406, 23.8520925117188],
                                        [114.027345, 23.903843],
                                        [114.03271609375, 23.9084719062501],
                                        [114.051373320313, 23.9301271796875],
                                        [114.077345, 23.9280397773438],
                                        [114.092345, 23.9292458320313],
                                        [114.102623320313, 23.9284181953125],
                                        [114.12197390625, 23.9392140937501],
                                        [114.15271609375, 23.9484719062501],
                                        [114.172345, 23.9594216132813],
                                        [114.20814578125, 23.93944846875],
                                        [114.27197390625, 23.96288596875],
                                        [114.26271609375, 23.9484719062501]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });
            define("echarts/util/mapData/geoJson/meizhou", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "name": "丰顺县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [116.391099882813, 24.219809796875],
                                        [116.423902617188, 24.2077638984375],
                                        [116.447916289063, 24.2096926093751],
                                        [116.484205351563, 24.1987648750001],
                                        [116.525181914063, 24.1333473945313],
                                        [116.61709109375, 24.0673513007813],
                                        [116.64197390625, 24.03847190625],
                                        [116.67572390625, 24.0173317695313],
                                        [116.687345, 24.0038430000001],
                                        [116.68244265625, 23.9987429023438],
                                        [116.64224734375, 23.9889430976563],
                                        [116.63244265625, 23.9787429023438],
                                        [116.602554960938, 23.9642433906251],
                                        [116.602242460938, 23.948843],
                                        [116.602642851563, 23.9293556953126],
                                        [116.582633085938, 23.9085305],
                                        [116.562252226563, 23.9089479804688],
                                        [116.51244265625, 23.8787429023438],
                                        [116.492144804688, 23.8688942695313],
                                        [116.514293242188, 23.8362136054688],
                                        [116.489678984375, 23.7489430976562],
                                        [116.46224734375, 23.7587429023438],
                                        [116.419263945313, 23.7878786445313],
                                        [116.367345, 23.7338430000001],
                                        [116.32005984375, 23.7716677070313],
                                        [116.27736453125, 23.7663576484376],
                                        [116.262896757813, 23.7482888007812],
                                        [116.237100859375, 23.7276296210938],
                                        [116.21634890625, 23.7302101875],
                                        [116.202896757813, 23.6982888007813],
                                        [116.1791809375, 23.6792971015625],
                                        [116.183472929688, 23.6447658515626],
                                        [116.14896609375, 23.6171340156251],
                                        [116.107345, 23.6238430000001],
                                        [116.103150664063, 23.6306520820312],
                                        [116.0849621875, 23.6249855781251],
                                        [116.063531523438, 23.6400295234376],
                                        [116.032740507813, 23.6505226875],
                                        [116.0183215625, 23.6460329414063],
                                        [116.003531523438, 23.6700295234375],
                                        [115.983721953125, 23.6822365546875],
                                        [115.93740359375, 23.6423830390625],
                                        [115.892740507813, 23.6271633125],
                                        [115.869283476563, 23.6344680000001],
                                        [115.853531523438, 23.6600295234375],
                                        [115.847345, 23.6638430000001],
                                        [115.85170046875, 23.66948753125],
                                        [115.86298953125, 23.67819846875],
                                        [115.87170046875, 23.6894875312501],
                                        [115.89162234375, 23.7048635078125],
                                        [115.90170046875, 23.7294875312501],
                                        [115.92162234375, 23.7448635078125],
                                        [115.93170046875, 23.76948753125],
                                        [115.966666289063, 23.7964748359376],
                                        [116.017862578125, 23.827094953125],
                                        [116.007345, 23.8538430000001],
                                        [116.02302859375, 23.8583278632813],
                                        [116.021099882813, 23.8738552070313],
                                        [116.027345, 23.9238430000001],
                                        [116.05298953125, 23.92819846875],
                                        [116.094171171875, 23.9614821601563],
                                        [116.089298125, 23.9944753242188],
                                        [116.158892851563, 24.0481960273438],
                                        [116.17373171875, 24.0844509101563],
                                        [116.171519804688, 24.0994142890626],
                                        [116.196812773438, 24.1097634101563],
                                        [116.187345, 24.133843],
                                        [116.197345, 24.133843],
                                        [116.21326296875, 24.1297585273437],
                                        [116.231900664063, 24.1176222968751],
                                        [116.242345, 24.1199636054687],
                                        [116.253116484375, 24.1175490546876],
                                        [116.26142703125, 24.1397585273438],
                                        [116.27326296875, 24.1479274726563],
                                        [116.305323515625, 24.1955446601563],
                                        [116.317345, 24.203843],
                                        [116.3678528125, 24.1928249335938],
                                        [116.391099882813, 24.219809796875]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "蕉岭县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [116.371807890625, 24.8085768867188],
                                        [116.377345, 24.793843],
                                        [116.371793242188, 24.789233625],
                                        [116.372896757813, 24.7784206367188],
                                        [116.351793242188, 24.7692653632813],
                                        [116.353834257813, 24.749233625],
                                        [116.336422148438, 24.7347682929688],
                                        [116.32107546875, 24.7162966132813],
                                        [116.3228528125, 24.698843],
                                        [116.3218371875, 24.6888430000001],
                                        [116.322896757813, 24.678452375],
                                        [116.311881132813, 24.6693044257812],
                                        [116.302808867188, 24.6583815742188],
                                        [116.274288359375, 24.6346901679688],
                                        [116.31158328125, 24.6037062812501],
                                        [116.2897278125, 24.5655422187501],
                                        [116.247345, 24.5698610664063],
                                        [116.217345, 24.5668044257813],
                                        [116.181671171875, 24.5704396796876],
                                        [116.185484648438, 24.5330519843751],
                                        [116.16158328125, 24.4913210273438],
                                        [116.163873320313, 24.468843],
                                        [116.141881132813, 24.4593044257813],
                                        [116.12517703125, 24.420786359375],
                                        [116.112808867188, 24.4493044257813],
                                        [116.09125125, 24.4869460273438],
                                        [116.037345, 24.4938430000001],
                                        [116.03052859375, 24.5369411445313],
                                        [116.045933867188, 24.563843],
                                        [116.02302859375, 24.603843],
                                        [116.04375125, 24.6400319648438],
                                        [116.039840117188, 24.6784206367188],
                                        [116.062808867188, 24.6883815742187],
                                        [116.071954375, 24.6993923164063],
                                        [116.082769804688, 24.6982912421875],
                                        [116.096422148438, 24.7297682929688],
                                        [116.117047148438, 24.7657839179688],
                                        [116.101881132813, 24.7783815742188],
                                        [116.092808867188, 24.7893044257813],
                                        [116.081881132813, 24.7983815742188],
                                        [116.0688684375, 24.8140456367188],
                                        [116.082808867188, 24.8383815742188],
                                        [116.087345, 24.853843],
                                        [116.141397734375, 24.8470900703125],
                                        [116.182467070313, 24.8799343085938],
                                        [116.191793242188, 24.8682888007813],
                                        [116.208453398438, 24.8549489570313],
                                        [116.221793242188, 24.8382888007813],
                                        [116.24341921875, 24.8291774726562],
                                        [116.22638796875, 24.8002053046875],
                                        [116.253033476563, 24.7968923164063],
                                        [116.292896757813, 24.8082888007813],
                                        [116.311793242188, 24.8193971992188],
                                        [116.339932890625, 24.831255109375],
                                        [116.354195585938, 24.8651027656251],
                                        [116.387345, 24.8838430000001],
                                        [116.391881132813, 24.8583815742188],
                                        [116.4114465625, 24.8421291328125],
                                        [116.373551054688, 24.8256935859376],
                                        [116.371807890625, 24.8085768867188]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "梅江区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [116.112086210938, 24.3809181953126],
                                        [116.12443484375, 24.3290749335938],
                                        [116.162154570313, 24.3490334296875],
                                        [116.186041289063, 24.3586525703125],
                                        [116.161378203125, 24.2882839179688],
                                        [116.162940703125, 24.248843],
                                        [116.162110625, 24.2279567695313],
                                        [116.182535429688, 24.2090334296875],
                                        [116.205601835938, 24.1733132148437],
                                        [116.197345, 24.133843],
                                        [116.187345, 24.133843],
                                        [116.172154570313, 24.1386525703125],
                                        [116.136007109375, 24.1513210273438],
                                        [116.102535429688, 24.1690334296875],
                                        [116.082154570313, 24.1786525703125],
                                        [116.072535429688, 24.190122296875],
                                        [116.092535429688, 24.2086525703125],
                                        [116.112154570313, 24.230122296875],
                                        [116.084918242188, 24.2553566718751],
                                        [116.108370390625, 24.2996755195313],
                                        [116.082174101563, 24.298637921875],
                                        [116.042027617188, 24.3294240546876],
                                        [116.012877226563, 24.3282692695313],
                                        [115.990308867188, 24.3402126289063],
                                        [116.003892851563, 24.4051345039063],
                                        [116.032535429688, 24.4186525703125],
                                        [116.059615507813, 24.4329811835938],
                                        [116.082154570313, 24.4086525703125],
                                        [116.112086210938, 24.3809181953126]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "梅县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [115.977345, 24.163843],
                                        [115.980767851563, 24.1516506171875],
                                        [115.989537382813, 24.1604201484375],
                                        [115.972628203125, 24.1791237617188],
                                        [115.962061796875, 24.1885622382813],
                                        [115.946490507813, 24.2389919257813],
                                        [115.882061796875, 24.2685622382813],
                                        [115.871539335938, 24.2803395820313],
                                        [115.8726575, 24.299067609375],
                                        [115.862061796875, 24.3185622382813],
                                        [115.852628203125, 24.3391237617188],
                                        [115.829830351563, 24.3495876289063],
                                        [115.811080351563, 24.3484694648438],
                                        [115.792628203125, 24.3691237617188],
                                        [115.77279421875, 24.3868434882813],
                                        [115.802628203125, 24.4585622382813],
                                        [115.807345, 24.473843],
                                        [115.872340117188, 24.4792458320313],
                                        [115.882345, 24.4784401679688],
                                        [115.914249296875, 24.4810060859375],
                                        [115.970269804688, 24.4029885078125],
                                        [115.98197390625, 24.42921409375],
                                        [116.012906523438, 24.4385280585938],
                                        [116.001783476563, 24.4791579414063],
                                        [116.03271609375, 24.48847190625],
                                        [116.037345, 24.4938430000001],
                                        [116.09125125, 24.4869460273438],
                                        [116.112808867188, 24.4493044257813],
                                        [116.12517703125, 24.420786359375],
                                        [116.141881132813, 24.4593044257813],
                                        [116.163873320313, 24.468843],
                                        [116.16158328125, 24.4913210273438],
                                        [116.185484648438, 24.5330519843751],
                                        [116.181671171875, 24.5704396796876],
                                        [116.217345, 24.5668044257813],
                                        [116.247345, 24.5698610664063],
                                        [116.2897278125, 24.5655422187501],
                                        [116.31158328125, 24.6037062812501],
                                        [116.274288359375, 24.6346901679688],
                                        [116.302808867188, 24.6583815742188],
                                        [116.311881132813, 24.6693044257812],
                                        [116.322896757813, 24.678452375],
                                        [116.3218371875, 24.6888430000001],
                                        [116.3228528125, 24.698843],
                                        [116.32107546875, 24.7162966132813],
                                        [116.336422148438, 24.7347682929688],
                                        [116.353834257813, 24.749233625],
                                        [116.351793242188, 24.7692653632813],
                                        [116.372896757813, 24.7784206367188],
                                        [116.371793242188, 24.789233625],
                                        [116.377345, 24.793843],
                                        [116.39326296875, 24.7897585273438],
                                        [116.417345, 24.773843],
                                        [116.408975859375, 24.7510524726563],
                                        [116.4280871875, 24.7345876289063],
                                        [116.442667265625, 24.7176638007813],
                                        [116.488599882813, 24.7213552070313],
                                        [116.514644804688, 24.6067116523438],
                                        [116.547345, 24.6138430000001],
                                        [116.553155546875, 24.5987282539063],
                                        [116.540650664063, 24.57745628125],
                                        [116.54552859375, 24.5382595039063],
                                        [116.532843046875, 24.5081594062501],
                                        [116.515440703125, 24.5103249335937],
                                        [116.491441679688, 24.491108625],
                                        [116.4937121875, 24.4728469062501],
                                        [116.451187773438, 24.454926984375],
                                        [116.415787382813, 24.426577375],
                                        [116.424210234375, 24.358843],
                                        [116.421724882813, 24.3388430000001],
                                        [116.4234778125, 24.3247536445313],
                                        [116.306763945313, 24.2313698554688],
                                        [116.317345, 24.203843],
                                        [116.305323515625, 24.1955446601563],
                                        [116.27326296875, 24.1479274726563],
                                        [116.26142703125, 24.1397585273438],
                                        [116.253116484375, 24.1175490546876],
                                        [116.242345, 24.1199636054687],
                                        [116.231900664063, 24.1176222968751],
                                        [116.21326296875, 24.1297585273437],
                                        [116.197345, 24.133843],
                                        [116.205601835938, 24.1733132148437],
                                        [116.182535429688, 24.2090334296875],
                                        [116.162110625, 24.2279567695313],
                                        [116.162940703125, 24.248843],
                                        [116.161378203125, 24.2882839179688],
                                        [116.186041289063, 24.3586525703125],
                                        [116.162154570313, 24.3490334296875],
                                        [116.12443484375, 24.3290749335938],
                                        [116.112086210938, 24.3809181953126],
                                        [116.082154570313, 24.4086525703125],
                                        [116.059615507813, 24.4329811835938],
                                        [116.032535429688, 24.4186525703125],
                                        [116.003892851563, 24.4051345039063],
                                        [115.990308867188, 24.3402126289063],
                                        [116.012877226563, 24.3282692695313],
                                        [116.042027617188, 24.3294240546876],
                                        [116.082174101563, 24.298637921875],
                                        [116.108370390625, 24.2996755195313],
                                        [116.084918242188, 24.2553566718751],
                                        [116.112154570313, 24.230122296875],
                                        [116.092535429688, 24.2086525703125],
                                        [116.072535429688, 24.190122296875],
                                        [116.082154570313, 24.1786525703125],
                                        [116.102535429688, 24.1690334296875],
                                        [116.136007109375, 24.1513210273438],
                                        [116.172154570313, 24.1386525703125],
                                        [116.187345, 24.133843],
                                        [116.196812773438, 24.1097634101563],
                                        [116.171519804688, 24.0994142890626],
                                        [116.17373171875, 24.0844509101563],
                                        [116.158892851563, 24.0481960273438],
                                        [116.089298125, 23.9944753242188],
                                        [116.094171171875, 23.9614821601563],
                                        [116.05298953125, 23.92819846875],
                                        [116.027345, 23.9238430000001],
                                        [116.01263796875, 23.91806175],
                                        [115.994342070313, 23.9207643867188],
                                        [116.017779570313, 23.98038596875],
                                        [116.002345, 23.9781032539063],
                                        [115.980494414063, 23.981333234375],
                                        [115.983082304688, 23.9988430000001],
                                        [115.979918242188, 24.0202809882813],
                                        [115.910128203125, 24.048843],
                                        [115.913604765625, 24.0723513007813],
                                        [115.9666809375, 24.0645070625],
                                        [115.934224882813, 24.1082814765626],
                                        [115.973160429688, 24.1383303046875],
                                        [115.970206328125, 24.1583303046875],
                                        [115.977345, 24.163843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "大埔县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [116.79033328125, 24.6886525703126],
                                        [116.811925078125, 24.6539382148438],
                                        [116.761763945313, 24.5885231757813],
                                        [116.762550078125, 24.5686647773438],
                                        [116.7481653125, 24.555337140625],
                                        [116.8100403125, 24.4885524726563],
                                        [116.84154421875, 24.4898024726563],
                                        [116.85263796875, 24.468843],
                                        [116.836090117188, 24.4375759101563],
                                        [116.872154570313, 24.3986525703125],
                                        [116.897345, 24.3838430000001],
                                        [116.891104765625, 24.3584279609375],
                                        [116.90326296875, 24.3397585273438],
                                        [116.91142703125, 24.2879274726563],
                                        [116.924483671875, 24.2789138007813],
                                        [116.93361453125, 24.2381716132813],
                                        [116.927345, 24.2338430000001],
                                        [116.890318632813, 24.2275539375],
                                        [116.893140898438, 24.208452375],
                                        [116.865719023438, 24.162993390625],
                                        [116.849400664063, 24.1841335273438],
                                        [116.822735625, 24.1680471015626],
                                        [116.796715117188, 24.1718923164063],
                                        [116.759429960938, 24.1235866523438],
                                        [116.76623171875, 24.0775295234375],
                                        [116.751832304688, 24.0796584296876],
                                        [116.74298953125, 24.06819846875],
                                        [116.72869265625, 24.0571657539063],
                                        [116.699742460938, 24.0614430976563],
                                        [116.7052746875, 24.0240138984375],
                                        [116.697345, 24.0038430000001],
                                        [116.687345, 24.0038430000001],
                                        [116.67572390625, 24.0173317695313],
                                        [116.64197390625, 24.03847190625],
                                        [116.61709109375, 24.0673513007813],
                                        [116.525181914063, 24.1333473945313],
                                        [116.484205351563, 24.1987648750001],
                                        [116.447916289063, 24.2096926093751],
                                        [116.423902617188, 24.2077638984375],
                                        [116.391099882813, 24.219809796875],
                                        [116.3678528125, 24.1928249335938],
                                        [116.317345, 24.203843],
                                        [116.306763945313, 24.2313698554688],
                                        [116.4234778125, 24.3247536445313],
                                        [116.421724882813, 24.3388430000001],
                                        [116.424210234375, 24.358843],
                                        [116.415787382813, 24.426577375],
                                        [116.451187773438, 24.454926984375],
                                        [116.4937121875, 24.4728469062501],
                                        [116.491441679688, 24.491108625],
                                        [116.515440703125, 24.5103249335937],
                                        [116.532843046875, 24.5081594062501],
                                        [116.54552859375, 24.5382595039063],
                                        [116.540650664063, 24.57745628125],
                                        [116.553155546875, 24.5987282539063],
                                        [116.547345, 24.6138430000001],
                                        [116.558482695313, 24.6258620429688],
                                        [116.59326296875, 24.6497975898438],
                                        [116.622496367188, 24.648637921875],
                                        [116.676671171875, 24.6676271796875],
                                        [116.722345, 24.6694387031251],
                                        [116.751812773438, 24.6682692695313],
                                        [116.79033328125, 24.6886525703126]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "平远县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [115.911783476563, 24.9278469062501],
                                        [115.962345, 24.9178542304687],
                                        [115.972965117188, 24.9199538398438],
                                        [115.981519804688, 24.9080178046876],
                                        [116.026475859375, 24.8990041328125],
                                        [116.055113554688, 24.8590529609375],
                                        [116.087345, 24.853843],
                                        [116.082808867188, 24.8383815742188],
                                        [116.0688684375, 24.8140456367188],
                                        [116.081881132813, 24.7983815742188],
                                        [116.092808867188, 24.7893044257813],
                                        [116.101881132813, 24.7783815742188],
                                        [116.117047148438, 24.7657839179688],
                                        [116.096422148438, 24.7297682929688],
                                        [116.082769804688, 24.6982912421875],
                                        [116.071954375, 24.6993923164063],
                                        [116.062808867188, 24.6883815742187],
                                        [116.039840117188, 24.6784206367188],
                                        [116.04375125, 24.6400319648438],
                                        [116.02302859375, 24.603843],
                                        [116.045933867188, 24.563843],
                                        [116.03052859375, 24.5369411445313],
                                        [116.037345, 24.4938430000001],
                                        [116.03271609375, 24.48847190625],
                                        [116.001783476563, 24.4791579414063],
                                        [116.012906523438, 24.4385280585938],
                                        [115.98197390625, 24.42921409375],
                                        [115.970269804688, 24.4029885078125],
                                        [115.914249296875, 24.4810060859375],
                                        [115.882345, 24.4784401679688],
                                        [115.872340117188, 24.4792458320313],
                                        [115.807345, 24.473843],
                                        [115.80142703125, 24.4779274726563],
                                        [115.79326296875, 24.4897585273438],
                                        [115.75142703125, 24.5179274726563],
                                        [115.737345, 24.543843],
                                        [115.780025664063, 24.5709963203125],
                                        [115.843682890625, 24.5630788398438],
                                        [115.840968046875, 24.584926984375],
                                        [115.811793242188, 24.6082888007813],
                                        [115.779693632813, 24.6539528632813],
                                        [115.761666289063, 24.6683888984375],
                                        [115.76318484375, 24.6806032539063],
                                        [115.792086210938, 24.6770095039063],
                                        [115.801793242188, 24.6922731757813],
                                        [115.776236601563, 24.7127370429688],
                                        [115.749713164063, 24.7458596015626],
                                        [115.762896757813, 24.7682888007813],
                                        [115.771793242188, 24.8193971992188],
                                        [115.783013945313, 24.8384841132813],
                                        [115.781676054688, 24.8492018867188],
                                        [115.818140898438, 24.9112306953126],
                                        [115.845108671875, 24.907876203125],
                                        [115.86185671875, 24.8681301093751],
                                        [115.901793242188, 24.8742653632813],
                                        [115.876886015625, 24.9166335273438],
                                        [115.887345, 24.943843],
                                        [115.911783476563, 24.9278469062501]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "五华县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [115.317345, 23.763843],
                                        [115.312345, 23.7510353828126],
                                        [115.307345, 23.763843],
                                        [115.317345, 23.763843]
                                    ]
                                ],
                                [
                                    [
                                        [115.317345, 23.763843],
                                        [115.320704375, 23.770483625],
                                        [115.34062625, 23.7805617500001],
                                        [115.354859648438, 23.808696515625],
                                        [115.344967070313, 23.8289455390625],
                                        [115.357345, 23.8538430000001],
                                        [115.366549101563, 23.8609499335938],
                                        [115.391217070313, 23.9018434882813],
                                        [115.403043242188, 23.9443093085938],
                                        [115.45170046875, 23.9734108710938],
                                        [115.437584257813, 24.03187034375],
                                        [115.416236601563, 24.0672634101563],
                                        [115.444127226563, 24.1354128242188],
                                        [115.472857695313, 24.1396584296875],
                                        [115.481832304688, 24.1280275703125],
                                        [115.492857695313, 24.1296584296875],
                                        [115.516143828125, 24.0994875312501],
                                        [115.527525664063, 24.1139723945312],
                                        [115.51298953125, 24.14948753125],
                                        [115.501549101563, 24.168452375],
                                        [115.503082304688, 24.178843],
                                        [115.50080203125, 24.1942775703125],
                                        [115.527345, 24.183843],
                                        [115.527345, 24.173843],
                                        [115.537345, 24.173843],
                                        [115.60047, 24.1817287421875],
                                        [115.613004179688, 24.149126203125],
                                        [115.610865507813, 24.1319362617188],
                                        [115.623297148438, 24.1164089179687],
                                        [115.663409453125, 24.0871096015625],
                                        [115.686422148438, 24.0899709296876],
                                        [115.732769804688, 24.0320900703125],
                                        [115.762896757813, 24.0193971992188],
                                        [115.782545195313, 24.0078469062501],
                                        [115.796304960938, 24.0250295234376],
                                        [115.841793242188, 23.9982888007813],
                                        [115.864810820313, 23.9885915351563],
                                        [115.883057890625, 23.9452834296875],
                                        [115.904156523438, 23.9283888984376],
                                        [115.901666289063, 23.9083888984375],
                                        [115.912896757813, 23.8993971992188],
                                        [115.921846953125, 23.87815940625],
                                        [115.94982546875, 23.8816384101563],
                                        [115.981793242188, 23.8582888007813],
                                        [116.007345, 23.8538430000001],
                                        [116.017862578125, 23.827094953125],
                                        [115.966666289063, 23.7964748359376],
                                        [115.93170046875, 23.76948753125],
                                        [115.92162234375, 23.7448635078125],
                                        [115.90170046875, 23.7294875312501],
                                        [115.89162234375, 23.7048635078125],
                                        [115.87170046875, 23.6894875312501],
                                        [115.86298953125, 23.67819846875],
                                        [115.85170046875, 23.66948753125],
                                        [115.847345, 23.6638430000001],
                                        [115.83170046875, 23.65948753125],
                                        [115.799166289063, 23.6353639960938],
                                        [115.803082304688, 23.608843],
                                        [115.801607695313, 23.598843],
                                        [115.8052746875, 23.5740138984375],
                                        [115.787569609375, 23.5289772773437],
                                        [115.715928984375, 23.5168068671875],
                                        [115.68252078125, 23.5600930000001],
                                        [115.642320585938, 23.5302907539063],
                                        [115.63298953125, 23.5181984687501],
                                        [115.62170046875, 23.50948753125],
                                        [115.617345, 23.4738430000001],
                                        [115.59142703125, 23.4697585273438],
                                        [115.58326296875, 23.4579274726563],
                                        [115.555513945313, 23.4387721992188],
                                        [115.512144804688, 23.4225417304688],
                                        [115.500191679688, 23.3759645820313],
                                        [115.482066679688, 23.3800270820313],
                                        [115.467345, 23.373843],
                                        [115.451812773438, 23.3872243476563],
                                        [115.452764921875, 23.3990822578125],
                                        [115.423624296875, 23.4784304023438],
                                        [115.411539335938, 23.488843],
                                        [115.432877226563, 23.5072243476563],
                                        [115.431265898438, 23.5272853828125],
                                        [115.442926054688, 23.5590358710938],
                                        [115.43197390625, 23.5684719062501],
                                        [115.420269804688, 23.6073439765625],
                                        [115.44271609375, 23.66847190625],
                                        [115.45197390625, 23.7147951484375],
                                        [115.421280546875, 23.6976686835938],
                                        [115.379967070313, 23.74562034375],
                                        [115.392769804688, 23.7685646796875],
                                        [115.391485625, 23.7845217109375],
                                        [115.344000273438, 23.7580300117188],
                                        [115.317345, 23.763843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "兴宁市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [115.977345, 24.163843],
                                        [115.989537382813, 24.1604201484375],
                                        [115.980767851563, 24.1516506171875],
                                        [115.977345, 24.163843]
                                    ]
                                ],
                                [
                                    [
                                        [115.977345, 24.163843],
                                        [115.970206328125, 24.1583303046875],
                                        [115.973160429688, 24.1383303046875],
                                        [115.934224882813, 24.1082814765626],
                                        [115.9666809375, 24.0645070625],
                                        [115.913604765625, 24.0723513007813],
                                        [115.910128203125, 24.048843],
                                        [115.979918242188, 24.0202809882813],
                                        [115.983082304688, 23.9988430000001],
                                        [115.980494414063, 23.981333234375],
                                        [116.002345, 23.9781032539063],
                                        [116.017779570313, 23.98038596875],
                                        [115.994342070313, 23.9207643867188],
                                        [116.01263796875, 23.91806175],
                                        [116.027345, 23.9238430000001],
                                        [116.021099882813, 23.8738552070313],
                                        [116.02302859375, 23.8583278632813],
                                        [116.007345, 23.8538430000001],
                                        [115.981793242188, 23.8582888007813],
                                        [115.94982546875, 23.8816384101563],
                                        [115.921846953125, 23.87815940625],
                                        [115.912896757813, 23.8993971992188],
                                        [115.901666289063, 23.9083888984375],
                                        [115.904156523438, 23.9283888984376],
                                        [115.883057890625, 23.9452834296875],
                                        [115.864810820313, 23.9885915351563],
                                        [115.841793242188, 23.9982888007813],
                                        [115.796304960938, 24.0250295234376],
                                        [115.782545195313, 24.0078469062501],
                                        [115.762896757813, 24.0193971992188],
                                        [115.732769804688, 24.0320900703125],
                                        [115.686422148438, 24.0899709296876],
                                        [115.663409453125, 24.0871096015625],
                                        [115.623297148438, 24.1164089179687],
                                        [115.610865507813, 24.1319362617188],
                                        [115.613004179688, 24.149126203125],
                                        [115.60047, 24.1817287421875],
                                        [115.537345, 24.173843],
                                        [115.537345, 24.183843],
                                        [115.527345, 24.183843],
                                        [115.548834257813, 24.2097096992188],
                                        [115.562779570313, 24.2082888007812],
                                        [115.571881132813, 24.2393044257813],
                                        [115.588306914063, 24.2529494453125],
                                        [115.551881132813, 24.3383815742188],
                                        [115.542808867188, 24.3666970039063],
                                        [115.574674101563, 24.4109767890625],
                                        [115.571803007813, 24.4391652656251],
                                        [115.5831653125, 24.4590065742188],
                                        [115.571881132813, 24.4683815742188],
                                        [115.562735625, 24.4793923164062],
                                        [115.551954375, 24.4782936835938],
                                        [115.542735625, 24.4893923164063],
                                        [115.532345, 24.4883327460938],
                                        [115.497257109375, 24.4919094062501],
                                        [115.48107546875, 24.5113893867188],
                                        [115.483873320313, 24.5388430000001],
                                        [115.481793242188, 24.559233625],
                                        [115.5021496875, 24.5761403632813],
                                        [115.520069609375, 24.6371999335938],
                                        [115.557345, 24.6438430000001],
                                        [115.574561796875, 24.6133888984376],
                                        [115.6022278125, 24.6296535468751],
                                        [115.631793242188, 24.6182888007813],
                                        [115.67125125, 24.6070070625],
                                        [115.68345828125, 24.5505837226563],
                                        [115.737345, 24.543843],
                                        [115.75142703125, 24.5179274726563],
                                        [115.79326296875, 24.4897585273438],
                                        [115.80142703125, 24.4779274726563],
                                        [115.807345, 24.473843],
                                        [115.802628203125, 24.4585622382813],
                                        [115.77279421875, 24.3868434882813],
                                        [115.792628203125, 24.3691237617188],
                                        [115.811080351563, 24.3484694648438],
                                        [115.829830351563, 24.3495876289063],
                                        [115.852628203125, 24.3391237617188],
                                        [115.862061796875, 24.3185622382813],
                                        [115.8726575, 24.299067609375],
                                        [115.871539335938, 24.2803395820313],
                                        [115.882061796875, 24.2685622382813],
                                        [115.946490507813, 24.2389919257813],
                                        [115.962061796875, 24.1885622382813],
                                        [115.972628203125, 24.1791237617188],
                                        [115.977345, 24.163843]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });
            define("echarts/util/mapData/geoJson/shanwei", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "name": "海丰县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [115.017345, 22.723843],
                                        [115.031295195313, 22.713843],
                                        [115.017345, 22.7038430000001],
                                        [115.017345, 22.723843]
                                    ]
                                ],
                                [
                                    [
                                        [115.577345, 22.843843],
                                        [115.582486601563, 22.8670119453125],
                                        [115.609693632813, 22.8772658515626],
                                        [115.617345, 22.8638430000001],
                                        [115.577345, 22.843843]
                                    ]
                                ],
                                [
                                    [
                                        [115.577345, 22.843843],
                                        [115.557345, 22.813843],
                                        [115.502120390625, 22.7983034492188],
                                        [115.492022734375, 22.8100221992188],
                                        [115.463326445313, 22.8077175117188],
                                        [115.435113554688, 22.8234572578125],
                                        [115.412525664063, 22.8595217109376],
                                        [115.392623320313, 22.8484181953126],
                                        [115.375279570313, 22.8498122382813],
                                        [115.324757109375, 22.9084548164063],
                                        [115.317345, 22.883843],
                                        [115.307345, 22.883843],
                                        [115.307345, 22.8638430000001],
                                        [115.287345, 22.8638430000001],
                                        [115.287345, 22.8538430000001],
                                        [115.27406375, 22.8471242500001],
                                        [115.267345, 22.833843],
                                        [115.257345, 22.833843],
                                        [115.257345, 22.8238430000001],
                                        [115.200172148438, 22.83788596875],
                                        [115.16326296875, 22.8035671210938],
                                        [115.18326296875, 22.7897585273438],
                                        [115.19142703125, 22.7756862617188],
                                        [115.163682890625, 22.7819069648438],
                                        [115.150582304688, 22.816919171875],
                                        [115.052198515625, 22.7927541328125],
                                        [115.042296171875, 22.7541652656251],
                                        [115.02142703125, 22.7397585273438],
                                        [115.017345, 22.723843],
                                        [115.012061796875, 22.7285622382812],
                                        [114.991607695313, 22.7514577460937],
                                        [114.9926575, 22.7691017890625],
                                        [114.952061796875, 22.7985622382813],
                                        [114.942628203125, 22.8391237617188],
                                        [114.932061796875, 22.8485622382813],
                                        [114.917408476563, 22.8649636054688],
                                        [114.93283328125, 22.87874534375],
                                        [114.913121367188, 22.9150197578126],
                                        [114.966441679688, 22.9394924140625],
                                        [114.982569609375, 22.9385305],
                                        [115.022413359375, 22.9601833320313],
                                        [115.082100859375, 23.0091555],
                                        [115.097345, 23.008247296875],
                                        [115.112545195313, 23.0091530585938],
                                        [115.14252078125, 22.9983962226563],
                                        [115.16724734375, 23.0372731757813],
                                        [115.239478789063, 23.0650417304688],
                                        [115.260260039063, 23.088296125],
                                        [115.283238554688, 23.098843],
                                        [115.279678984375, 23.1585695625001],
                                        [115.323970976563, 23.1688747382813],
                                        [115.349034453125, 23.1969264960937],
                                        [115.395655546875, 23.2307595039062],
                                        [115.407345, 23.2438430000001],
                                        [115.44170046875, 23.22819846875],
                                        [115.505435820313, 23.214751203125],
                                        [115.501607695313, 23.188843],
                                        [115.504483671875, 23.1693556953126],
                                        [115.491514921875, 23.159341046875],
                                        [115.497345, 23.1238430000001],
                                        [115.501519804688, 23.1180178046876],
                                        [115.515186796875, 23.1082228828125],
                                        [115.51127078125, 23.0884108710938],
                                        [115.523580351563, 23.06901878125],
                                        [115.5112903125, 23.039106671875],
                                        [115.501358671875, 22.988843],
                                        [115.503428984375, 22.9783571601563],
                                        [115.473170195313, 22.9387331367188],
                                        [115.481641875, 22.9177150703125],
                                        [115.493053007813, 22.9199709296875],
                                        [115.501519804688, 22.8980178046875],
                                        [115.518995390625, 22.8854933906251],
                                        [115.545113554688, 22.8490529609375],
                                        [115.577345, 22.843843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "陆丰市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [115.973922148438, 22.9760353828125],
                                        [115.977345, 22.963843],
                                        [115.965152617188, 22.9672658515625],
                                        [115.973922148438, 22.9760353828125]
                                    ]
                                ],
                                [
                                    [
                                        [115.947345, 23.0138430000001],
                                        [115.950767851563, 23.0260353828126],
                                        [115.959537382813, 23.0172658515625],
                                        [115.947345, 23.0138430000001]
                                    ]
                                ],
                                [
                                    [
                                        [115.767345, 23.133843],
                                        [115.770767851563, 23.1216506171875],
                                        [115.779537382813, 23.1304201484375],
                                        [115.767345, 23.143843],
                                        [115.822896757813, 23.1293971992188],
                                        [115.84634890625, 23.10011253125],
                                        [115.866261015625, 23.1249758125001],
                                        [115.902799101563, 23.1295217109376],
                                        [115.911793242188, 23.1182888007813],
                                        [115.917345, 23.113843],
                                        [115.926978789063, 23.0801540351563],
                                        [115.96107546875, 23.05284690625],
                                        [115.91861453125, 23.018843],
                                        [115.947345, 23.0138430000001],
                                        [115.933624296875, 22.9838527656251],
                                        [115.941295195313, 22.9567653632813],
                                        [115.953189726563, 22.9608498359375],
                                        [115.9633996875, 22.9436330390625],
                                        [115.987345, 22.9354079414063],
                                        [116.002345, 22.9405593085938],
                                        [116.012345, 22.9371266914063],
                                        [116.022799101563, 22.9407155585938],
                                        [116.041065703125, 22.9275637031251],
                                        [116.073624296875, 22.920122296875],
                                        [116.0833996875, 22.9036330390625],
                                        [116.112345, 22.8936916328126],
                                        [116.132345, 22.9005593085938],
                                        [116.161329375, 22.8906081367188],
                                        [116.172232695313, 22.9236525703125],
                                        [116.198238554688, 22.932583234375],
                                        [116.217345, 22.923843],
                                        [116.171392851563, 22.866411359375],
                                        [116.122554960938, 22.8307350898438],
                                        [116.092799101563, 22.8270339179688],
                                        [116.076217070313, 22.8477394843751],
                                        [116.044644804688, 22.8516677070313],
                                        [115.981236601563, 22.8249489570313],
                                        [115.952706328125, 22.8081764960938],
                                        [115.934508085938, 22.8104396796875],
                                        [115.902896757813, 22.7982888007812],
                                        [115.856236601563, 22.7849489570313],
                                        [115.819761992188, 22.7393971992188],
                                        [115.792896757813, 22.7676418281251],
                                        [115.801793242188, 22.8093971992188],
                                        [115.807345, 22.813843],
                                        [115.810767851563, 22.8016506171876],
                                        [115.819537382813, 22.8104201484375],
                                        [115.807345, 22.813843],
                                        [115.80326296875, 22.8197585273438],
                                        [115.78142703125, 22.8279274726562],
                                        [115.749893828125, 22.8484645820313],
                                        [115.70142703125, 22.8579274726563],
                                        [115.69326296875, 22.8697585273438],
                                        [115.650504179688, 22.8857570625001],
                                        [115.617345, 22.8638430000001],
                                        [115.609693632813, 22.8772658515626],
                                        [115.582486601563, 22.8670119453125],
                                        [115.577345, 22.843843],
                                        [115.545113554688, 22.8490529609375],
                                        [115.518995390625, 22.8854933906251],
                                        [115.501519804688, 22.8980178046875],
                                        [115.493053007813, 22.9199709296875],
                                        [115.481641875, 22.9177150703125],
                                        [115.473170195313, 22.9387331367188],
                                        [115.503428984375, 22.9783571601563],
                                        [115.501358671875, 22.988843],
                                        [115.5112903125, 23.039106671875],
                                        [115.523580351563, 23.06901878125],
                                        [115.51127078125, 23.0884108710938],
                                        [115.515186796875, 23.1082228828125],
                                        [115.501519804688, 23.1180178046876],
                                        [115.497345, 23.1238430000001],
                                        [115.526095, 23.1305055976563],
                                        [115.56978640625, 23.124048078125],
                                        [115.591202421875, 23.1517995429688],
                                        [115.602345, 23.1373659492188],
                                        [115.613199492188, 23.1514260078125],
                                        [115.663761015625, 23.1209255195313],
                                        [115.722345, 23.1295827460938],
                                        [115.732379179688, 23.1280983710938],
                                        [115.767345, 23.133843]
                                    ]
                                ],
                                [
                                    [
                                        [115.780152617188, 23.1588430000001],
                                        [115.767345, 23.153843],
                                        [115.767345, 23.1638430000001],
                                        [115.780152617188, 23.1588430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "陆河县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [115.767345, 23.133843],
                                        [115.779537382813, 23.1304201484375],
                                        [115.770767851563, 23.1216506171875],
                                        [115.767345, 23.133843]
                                    ]
                                ],
                                [
                                    [
                                        [115.767345, 23.133843],
                                        [115.732379179688, 23.1280983710938],
                                        [115.722345, 23.1295827460938],
                                        [115.663761015625, 23.1209255195313],
                                        [115.613199492188, 23.1514260078125],
                                        [115.602345, 23.1373659492188],
                                        [115.591202421875, 23.1517995429688],
                                        [115.56978640625, 23.124048078125],
                                        [115.526095, 23.1305055976563],
                                        [115.497345, 23.1238430000001],
                                        [115.491514921875, 23.159341046875],
                                        [115.504483671875, 23.1693556953126],
                                        [115.501607695313, 23.188843],
                                        [115.505435820313, 23.214751203125],
                                        [115.44170046875, 23.22819846875],
                                        [115.407345, 23.2438430000001],
                                        [115.407345, 23.253843],
                                        [115.4251575, 23.2648171210938],
                                        [115.42047, 23.279868390625],
                                        [115.45422, 23.287817609375],
                                        [115.4486340625, 23.3057619453125],
                                        [115.486011992188, 23.3185012031251],
                                        [115.471158476563, 23.3276564765626],
                                        [115.467345, 23.373843],
                                        [115.482066679688, 23.3800270820313],
                                        [115.500191679688, 23.3759645820313],
                                        [115.512144804688, 23.4225417304688],
                                        [115.555513945313, 23.4387721992188],
                                        [115.58326296875, 23.4579274726563],
                                        [115.59142703125, 23.4697585273438],
                                        [115.617345, 23.4738430000001],
                                        [115.624224882813, 23.4509938789063],
                                        [115.6727746875, 23.4091677070312],
                                        [115.668043242188, 23.3502834296875],
                                        [115.716182890625, 23.3771413398438],
                                        [115.773316679688, 23.381733625],
                                        [115.80197390625, 23.34847190625],
                                        [115.81271609375, 23.3392140937501],
                                        [115.817345, 23.333843],
                                        [115.790924101563, 23.3134499335938],
                                        [115.79375125, 23.2943361640625],
                                        [115.81298953125, 23.27948753125],
                                        [115.82170046875, 23.2596804023438],
                                        [115.748878203125, 23.2473073554688],
                                        [115.7530871875, 23.2188185859375],
                                        [115.748424101563, 23.1894875312501],
                                        [115.727506132813, 23.2165895820313],
                                        [115.73392703125, 23.1731496406251],
                                        [115.767345, 23.1638430000001],
                                        [115.767345, 23.153843],
                                        [115.767345, 23.143843],
                                        [115.767345, 23.133843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "城区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [115.567345, 22.6638430000001],
                                        [115.579537382813, 22.6604201484375],
                                        [115.570767851563, 22.6516506171876],
                                        [115.567345, 22.6638430000001]
                                    ]
                                ],
                                [
                                    [
                                        [115.567345, 22.7438430000001],
                                        [115.60142703125, 22.7522145820313],
                                        [115.588590117188, 22.7297585273438],
                                        [115.57142703125, 22.7379274726563],
                                        [115.567345, 22.7438430000001]
                                    ]
                                ],
                                [
                                    [
                                        [115.567345, 22.7438430000001],
                                        [115.555152617188, 22.7472658515625],
                                        [115.563922148438, 22.7560353828125],
                                        [115.567345, 22.7438430000001]
                                    ]
                                ],
                                [
                                    [
                                        [115.567345, 22.6638430000001],
                                        [115.561612578125, 22.6681081367188],
                                        [115.500650664063, 22.682514875],
                                        [115.46623171875, 22.7038161445313],
                                        [115.3898059375, 22.69065940625],
                                        [115.3401965625, 22.7213625312501],
                                        [115.3495715625, 22.7758083320312],
                                        [115.311163359375, 22.7981081367188],
                                        [115.230694609375, 22.7842555976563],
                                        [115.234093046875, 22.8039846015626],
                                        [115.253077421875, 22.8181081367188],
                                        [115.257345, 22.8238430000001],
                                        [115.267345, 22.8238430000001],
                                        [115.267345, 22.833843],
                                        [115.287345, 22.833843],
                                        [115.287345, 22.8538430000001],
                                        [115.307345, 22.8538430000001],
                                        [115.307345, 22.8638430000001],
                                        [115.317345, 22.8638430000001],
                                        [115.317345, 22.883843],
                                        [115.324757109375, 22.9084548164063],
                                        [115.375279570313, 22.8498122382813],
                                        [115.392623320313, 22.8484181953126],
                                        [115.412525664063, 22.8595217109376],
                                        [115.435113554688, 22.8234572578125],
                                        [115.463326445313, 22.8077175117188],
                                        [115.492022734375, 22.8100221992188],
                                        [115.502120390625, 22.7983034492188],
                                        [115.557345, 22.813843],
                                        [115.524761992188, 22.7701882148438],
                                        [115.52103640625, 22.7449733710938],
                                        [115.54170046875, 22.7181984687501],
                                        [115.563170195313, 22.7094142890625],
                                        [115.56068484375, 22.6925954414063],
                                        [115.567345, 22.6638430000001]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });
            define("echarts/util/mapData/geoJson/heyuan", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "name": "紫金县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [115.392769804688, 23.7685646796875],
                                        [115.379967070313, 23.74562034375],
                                        [115.421280546875, 23.6976686835938],
                                        [115.45197390625, 23.7147951484375],
                                        [115.44271609375, 23.66847190625],
                                        [115.420269804688, 23.6073439765625],
                                        [115.43197390625, 23.5684719062501],
                                        [115.442926054688, 23.5590358710938],
                                        [115.431265898438, 23.5272853828125],
                                        [115.432877226563, 23.5072243476563],
                                        [115.411539335938, 23.488843],
                                        [115.423624296875, 23.4784304023438],
                                        [115.452764921875, 23.3990822578125],
                                        [115.451812773438, 23.3872243476563],
                                        [115.467345, 23.373843],
                                        [115.471158476563, 23.3276564765626],
                                        [115.486011992188, 23.3185012031251],
                                        [115.4486340625, 23.3057619453125],
                                        [115.45422, 23.287817609375],
                                        [115.42047, 23.279868390625],
                                        [115.4251575, 23.2648171210938],
                                        [115.407345, 23.253843],
                                        [115.401881132813, 23.2583815742188],
                                        [115.390992460938, 23.2834914375001],
                                        [115.338233671875, 23.32097190625],
                                        [115.305050078125, 23.3175905585938],
                                        [115.292808867188, 23.3593044257813],
                                        [115.269737578125, 23.3784670234375],
                                        [115.187725859375, 23.3883815742188],
                                        [115.152808867188, 23.3683815742188],
                                        [115.101881132813, 23.3593044257813],
                                        [115.051285429688, 23.3274221015625],
                                        [115.010391875, 23.3315895820313],
                                        [114.975631132813, 23.2897389960938],
                                        [114.962808867188, 23.3193044257813],
                                        [114.945421171875, 23.3496657539063],
                                        [114.910079375, 23.3460646796875],
                                        [114.9128528125, 23.3188430000001],
                                        [114.910011015625, 23.2909596992188],
                                        [114.891803007813, 23.2591652656251],
                                        [114.892896757813, 23.2484523750001],
                                        [114.876422148438, 23.2347682929688],
                                        [114.86107546875, 23.2162966132813],
                                        [114.862882109375, 23.1985768867188],
                                        [114.849322539063, 23.1624929023438],
                                        [114.782843046875, 23.2151052070313],
                                        [114.777345, 23.2338430000001],
                                        [114.785479765625, 23.2550051093751],
                                        [114.770650664063, 23.28022971875],
                                        [114.774386015625, 23.31026878125],
                                        [114.711666289063, 23.3483669257813],
                                        [114.713023710938, 23.3592971015625],
                                        [114.701793242188, 23.3682888007812],
                                        [114.691085234375, 23.3937013984375],
                                        [114.693682890625, 23.4146071601563],
                                        [114.632799101563, 23.4070339179688],
                                        [114.627345, 23.413843],
                                        [114.645636015625, 23.4255519843751],
                                        [114.661246367188, 23.4499391914063],
                                        [114.6945325, 23.4683498359375],
                                        [114.673648710938, 23.498843],
                                        [114.6947278125, 23.5296266914063],
                                        [114.661246367188, 23.5377468085938],
                                        [114.653443632813, 23.5599391914063],
                                        [114.647345, 23.563843],
                                        [114.651158476563, 23.5800295234375],
                                        [114.673023710938, 23.5935036445312],
                                        [114.681158476563, 23.6600295234375],
                                        [114.702183867188, 23.7069728828125],
                                        [114.743248320313, 23.7209670234375],
                                        [114.757345, 23.743843],
                                        [114.825797148438, 23.7505739570313],
                                        [114.867345, 23.7472365546875],
                                        [114.902345, 23.7500490546875],
                                        [114.922345, 23.7484401679687],
                                        [114.940328398438, 23.7498854804688],
                                        [114.95271609375, 23.73921409375],
                                        [114.962257109375, 23.7281447578125],
                                        [115.005025664063, 23.7584719062501],
                                        [115.03271609375, 23.73921409375],
                                        [115.04197390625, 23.72847190625],
                                        [115.07271609375, 23.7092140937501],
                                        [115.089947539063, 23.68921409375],
                                        [115.1427746875, 23.7006471992188],
                                        [115.193204375, 23.723149640625],
                                        [115.191666289063, 23.7423049140625],
                                        [115.22584109375, 23.7613747382813],
                                        [115.27713015625, 23.7572536445313],
                                        [115.307345, 23.763843],
                                        [115.312345, 23.7510353828126],
                                        [115.317345, 23.763843],
                                        [115.344000273438, 23.7580300117188],
                                        [115.391485625, 23.7845217109375],
                                        [115.392769804688, 23.7685646796875]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "东源县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [114.96326296875, 24.2397585273438],
                                        [114.976573515625, 24.204184796875],
                                        [115.002847929688, 24.2100759101563],
                                        [115.03142703125, 24.1879274726563],
                                        [115.05326296875, 24.1797585273438],
                                        [115.06142703125, 24.1679274726563],
                                        [115.077345, 24.163843],
                                        [115.072896757813, 24.1482888007813],
                                        [115.055748320313, 24.1036696601563],
                                        [115.11150515625, 24.1106032539063],
                                        [115.112965117188, 24.098843],
                                        [115.110865507813, 24.0819362617187],
                                        [115.126236601563, 24.0627370429688],
                                        [115.144781523438, 24.0478884101563],
                                        [115.174898710938, 24.0066603828125],
                                        [115.132896757813, 24.0118849921875],
                                        [115.147017851563, 23.9903005195313],
                                        [115.17302859375, 23.9793410468751],
                                        [115.16935671875, 23.9498366523438],
                                        [115.207345, 23.94511253125],
                                        [115.24279421875, 23.9495217109375],
                                        [115.292896757813, 23.9093971992188],
                                        [115.331456328125, 23.86124534375],
                                        [115.357345, 23.8538430000001],
                                        [115.344967070313, 23.8289455390625],
                                        [115.354859648438, 23.808696515625],
                                        [115.34062625, 23.7805617500001],
                                        [115.320704375, 23.770483625],
                                        [115.317345, 23.763843],
                                        [115.307345, 23.763843],
                                        [115.27713015625, 23.7572536445313],
                                        [115.22584109375, 23.7613747382813],
                                        [115.191666289063, 23.7423049140625],
                                        [115.193204375, 23.723149640625],
                                        [115.1427746875, 23.7006471992188],
                                        [115.089947539063, 23.68921409375],
                                        [115.07271609375, 23.7092140937501],
                                        [115.04197390625, 23.72847190625],
                                        [115.03271609375, 23.73921409375],
                                        [115.005025664063, 23.7584719062501],
                                        [114.962257109375, 23.7281447578125],
                                        [114.95271609375, 23.73921409375],
                                        [114.940328398438, 23.7498854804688],
                                        [114.922345, 23.7484401679687],
                                        [114.902345, 23.7500490546875],
                                        [114.867345, 23.7472365546875],
                                        [114.825797148438, 23.7505739570313],
                                        [114.757345, 23.743843],
                                        [114.73197390625, 23.7584719062501],
                                        [114.721470976563, 23.8274001289063],
                                        [114.694761992188, 23.85847190625],
                                        [114.68271609375, 23.81847190625],
                                        [114.6519153125, 23.7991799140625],
                                        [114.653204375, 23.7831496406251],
                                        [114.601832304688, 23.7602272773438],
                                        [114.603150664063, 23.743843],
                                        [114.59963015625, 23.7000417304688],
                                        [114.55197390625, 23.68921409375],
                                        [114.54271609375, 23.6784719062501],
                                        [114.527345, 23.673843],
                                        [114.511246367188, 23.6777468085937],
                                        [114.503443632813, 23.6899391914063],
                                        [114.479713164063, 23.7051296210938],
                                        [114.426156035156, 23.6900783515626],
                                        [114.417345, 23.703843],
                                        [114.41271609375, 23.7092140937501],
                                        [114.396600371094, 23.7230983710938],
                                        [114.377345, 23.7454494453126],
                                        [114.362669707031, 23.7284157539063],
                                        [114.351180449219, 23.7293386054687],
                                        [114.352772246094, 23.7491677070313],
                                        [114.340413847656, 23.7598146796876],
                                        [114.342764921875, 23.7890822578125],
                                        [114.32295046875, 23.8430422187501],
                                        [114.34271609375, 23.87847190625],
                                        [114.347345, 23.8938430000001],
                                        [114.35298953125, 23.8981984687501],
                                        [114.369920683594, 23.9201345039063],
                                        [114.383179960938, 23.9981911445313],
                                        [114.381529570313, 24.0093556953126],
                                        [114.39298953125, 24.0181984687501],
                                        [114.401832304688, 24.0296584296875],
                                        [114.412345, 24.0281032539063],
                                        [114.430943632813, 24.0308522773438],
                                        [114.44170046875, 24.0694875312501],
                                        [114.47298953125, 24.0881984687501],
                                        [114.491807890625, 24.1196608710938],
                                        [114.502735625, 24.1180471015625],
                                        [114.521954375, 24.1296388984375],
                                        [114.532345, 24.1281032539063],
                                        [114.542345, 24.1295827460937],
                                        [114.552857695313, 24.1280275703125],
                                        [114.557345, 24.133843],
                                        [114.572628203125, 24.1291237617188],
                                        [114.59220828125, 24.0983351875001],
                                        [114.612061796875, 24.1091237617188],
                                        [114.641568632813, 24.1226662421875],
                                        [114.618531523438, 24.1650612617187],
                                        [114.630264921875, 24.1785622382812],
                                        [114.669674101563, 24.11659690625],
                                        [114.712345, 24.1191408515625],
                                        [114.722613554688, 24.1185280585938],
                                        [114.732061796875, 24.1391237617188],
                                        [114.764293242188, 24.1596218085938],
                                        [114.782545195313, 24.1585329414063],
                                        [114.819522734375, 24.1718019843751],
                                        [114.832613554688, 24.200317609375],
                                        [114.86611453125, 24.1983205390625],
                                        [114.892061796875, 24.2391237617188],
                                        [114.922628203125, 24.2585622382813],
                                        [114.927345, 24.2638430000001],
                                        [114.96326296875, 24.2397585273438]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "和平县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [115.074346953125, 24.6983913398437],
                                        [115.097056914063, 24.672973859375],
                                        [115.142061796875, 24.6891237617188],
                                        [115.187345, 24.6938430000001],
                                        [115.19298953125, 24.68948753125],
                                        [115.219127226563, 24.6556252265626],
                                        [115.264678984375, 24.62046409375],
                                        [115.21127078125, 24.548911359375],
                                        [115.224327421875, 24.5272658515625],
                                        [115.221549101563, 24.508452375],
                                        [115.233375273438, 24.488843],
                                        [115.2214465625, 24.4690676093751],
                                        [115.233258085938, 24.4285622382813],
                                        [115.210308867188, 24.3976100898437],
                                        [115.214019804688, 24.3724929023437],
                                        [115.1986340625, 24.3525563789063],
                                        [115.17298953125, 24.3327614570313],
                                        [115.19170046875, 24.2781984687501],
                                        [115.24170046875, 24.2577346015625],
                                        [115.206886015625, 24.2097927070313],
                                        [115.18170046875, 24.19948753125],
                                        [115.16298953125, 24.18819846875],
                                        [115.11170046875, 24.1794875312501],
                                        [115.077345, 24.163843],
                                        [115.06142703125, 24.1679274726563],
                                        [115.05326296875, 24.1797585273438],
                                        [115.03142703125, 24.1879274726563],
                                        [115.002847929688, 24.2100759101563],
                                        [114.976573515625, 24.204184796875],
                                        [114.96326296875, 24.2397585273438],
                                        [114.927345, 24.2638430000001],
                                        [114.916436796875, 24.3010158515625],
                                        [114.882608671875, 24.288305890625],
                                        [114.869107695313, 24.28968284375],
                                        [114.847345, 24.3158815742188],
                                        [114.825631132813, 24.2897389960938],
                                        [114.812808867188, 24.3193044257813],
                                        [114.803892851563, 24.3283815742188],
                                        [114.792789335938, 24.2782888007813],
                                        [114.7481653125, 24.282837140625],
                                        [114.752886992188, 24.329165265625],
                                        [114.741803007813, 24.348520734375],
                                        [114.7428528125, 24.358843],
                                        [114.741324492188, 24.373843],
                                        [114.7428528125, 24.3888430000001],
                                        [114.741324492188, 24.403843],
                                        [114.7428528125, 24.4188430000001],
                                        [114.741314726563, 24.433930890625],
                                        [114.69064578125, 24.4760182929688],
                                        [114.704859648438, 24.513843],
                                        [114.697345, 24.5338430000001],
                                        [114.703350859375, 24.5378371406251],
                                        [114.711339140625, 24.549848859375],
                                        [114.734508085938, 24.5652565742187],
                                        [114.723350859375, 24.6095388007812],
                                        [114.779029570313, 24.611704328125],
                                        [114.797345, 24.603843],
                                        [114.813570585938, 24.5980226875],
                                        [114.852735625, 24.600356671875],
                                        [114.851539335938, 24.5803395820312],
                                        [114.868092070313, 24.5618141914063],
                                        [114.891485625, 24.6048610664063],
                                        [114.914229765625, 24.6785207343751],
                                        [114.935513945313, 24.6546974921876],
                                        [114.979039335938, 24.6783473945312],
                                        [114.992345, 24.6791408515625],
                                        [115.02259890625, 24.6773366523438],
                                        [115.050494414063, 24.7085622382813],
                                        [115.074346953125, 24.6983913398437]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "连平县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [114.337345, 24.583843],
                                        [114.342345, 24.5710353828125],
                                        [114.347345, 24.583843],
                                        [114.367345, 24.583843],
                                        [114.367345, 24.563843],
                                        [114.387345, 24.563843],
                                        [114.3982434375, 24.5012184882813],
                                        [114.436673613281, 24.4964382148438],
                                        [114.486060820313, 24.5325124335938],
                                        [114.532545195313, 24.5598390937501],
                                        [114.548912382813, 24.5393971992188],
                                        [114.592896757813, 24.5482888007813],
                                        [114.618267851563, 24.5799709296876],
                                        [114.637345, 24.5776003242188],
                                        [114.662120390625, 24.5806813789063],
                                        [114.681793242188, 24.5482888007813],
                                        [114.692896757813, 24.5393971992188],
                                        [114.697345, 24.5338430000001],
                                        [114.704859648438, 24.513843],
                                        [114.69064578125, 24.4760182929688],
                                        [114.741314726563, 24.433930890625],
                                        [114.7428528125, 24.4188430000001],
                                        [114.741324492188, 24.403843],
                                        [114.7428528125, 24.3888430000001],
                                        [114.741324492188, 24.373843],
                                        [114.7428528125, 24.358843],
                                        [114.741803007813, 24.348520734375],
                                        [114.752886992188, 24.329165265625],
                                        [114.7481653125, 24.282837140625],
                                        [114.792789335938, 24.2782888007813],
                                        [114.803892851563, 24.3283815742188],
                                        [114.812808867188, 24.3193044257813],
                                        [114.825631132813, 24.2897389960938],
                                        [114.847345, 24.3158815742188],
                                        [114.869107695313, 24.28968284375],
                                        [114.882608671875, 24.288305890625],
                                        [114.916436796875, 24.3010158515625],
                                        [114.927345, 24.2638430000001],
                                        [114.922628203125, 24.2585622382813],
                                        [114.892061796875, 24.2391237617188],
                                        [114.86611453125, 24.1983205390625],
                                        [114.832613554688, 24.200317609375],
                                        [114.819522734375, 24.1718019843751],
                                        [114.782545195313, 24.1585329414063],
                                        [114.764293242188, 24.1596218085938],
                                        [114.732061796875, 24.1391237617188],
                                        [114.722613554688, 24.1185280585938],
                                        [114.712345, 24.1191408515625],
                                        [114.669674101563, 24.11659690625],
                                        [114.630264921875, 24.1785622382812],
                                        [114.618531523438, 24.1650612617187],
                                        [114.641568632813, 24.1226662421875],
                                        [114.612061796875, 24.1091237617188],
                                        [114.59220828125, 24.0983351875001],
                                        [114.572628203125, 24.1291237617188],
                                        [114.557345, 24.133843],
                                        [114.56197390625, 24.15921409375],
                                        [114.593204375, 24.173149640625],
                                        [114.588922148438, 24.2264455390626],
                                        [114.56197390625, 24.23847190625],
                                        [114.552345, 24.2496462226563],
                                        [114.537691679688, 24.2326369453126],
                                        [114.4618371875, 24.1690993476563],
                                        [114.473072539063, 24.1175783515625],
                                        [114.428253203125, 24.1211794257813],
                                        [114.410726347656, 24.1415261054687],
                                        [114.367345, 24.1380397773438],
                                        [114.342669707031, 24.1400221992188],
                                        [114.332345, 24.1280397773438],
                                        [114.290921660156, 24.1761208320313],
                                        [114.292877226563, 24.2004616523438],
                                        [114.27197390625, 24.2184719062501],
                                        [114.26271609375, 24.23921409375],
                                        [114.25197390625, 24.25847190625],
                                        [114.247345, 24.2738430000001],
                                        [114.257345, 24.2738430000001],
                                        [114.257345, 24.283843],
                                        [114.262899199219, 24.2882888007813],
                                        [114.27490359375, 24.3032814765625],
                                        [114.271678496094, 24.3292018867188],
                                        [114.288487578125, 24.3577980781251],
                                        [114.251790800781, 24.3682888007813],
                                        [114.239046660156, 24.4271999335938],
                                        [114.303407011719, 24.4786989570313],
                                        [114.266536894531, 24.5291725898438],
                                        [114.302899199219, 24.5582888007813],
                                        [114.307345, 24.5738430000001],
                                        [114.311353789063, 24.5817678046876],
                                        [114.322359648438, 24.5763942695313],
                                        [114.337345, 24.583843]
                                    ]
                                ],
                                [
                                    [
                                        [114.347345, 24.583843],
                                        [114.337345, 24.583843],
                                        [114.342345, 24.5966506171876],
                                        [114.347345, 24.583843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "龙川县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [115.527345, 24.183843],
                                        [115.537345, 24.183843],
                                        [115.537345, 24.173843],
                                        [115.527345, 24.173843],
                                        [115.527345, 24.183843]
                                    ]
                                ],
                                [
                                    [
                                        [115.527345, 24.183843],
                                        [115.50080203125, 24.1942775703125],
                                        [115.503082304688, 24.178843],
                                        [115.501549101563, 24.168452375],
                                        [115.51298953125, 24.14948753125],
                                        [115.527525664063, 24.1139723945312],
                                        [115.516143828125, 24.0994875312501],
                                        [115.492857695313, 24.1296584296875],
                                        [115.481832304688, 24.1280275703125],
                                        [115.472857695313, 24.1396584296875],
                                        [115.444127226563, 24.1354128242188],
                                        [115.416236601563, 24.0672634101563],
                                        [115.437584257813, 24.03187034375],
                                        [115.45170046875, 23.9734108710938],
                                        [115.403043242188, 23.9443093085938],
                                        [115.391217070313, 23.9018434882813],
                                        [115.366549101563, 23.8609499335938],
                                        [115.357345, 23.8538430000001],
                                        [115.331456328125, 23.86124534375],
                                        [115.292896757813, 23.9093971992188],
                                        [115.24279421875, 23.9495217109375],
                                        [115.207345, 23.94511253125],
                                        [115.16935671875, 23.9498366523438],
                                        [115.17302859375, 23.9793410468751],
                                        [115.147017851563, 23.9903005195313],
                                        [115.132896757813, 24.0118849921875],
                                        [115.174898710938, 24.0066603828125],
                                        [115.144781523438, 24.0478884101563],
                                        [115.126236601563, 24.0627370429688],
                                        [115.110865507813, 24.0819362617187],
                                        [115.112965117188, 24.098843],
                                        [115.11150515625, 24.1106032539063],
                                        [115.055748320313, 24.1036696601563],
                                        [115.072896757813, 24.1482888007813],
                                        [115.077345, 24.163843],
                                        [115.11170046875, 24.1794875312501],
                                        [115.16298953125, 24.18819846875],
                                        [115.18170046875, 24.19948753125],
                                        [115.206886015625, 24.2097927070313],
                                        [115.24170046875, 24.2577346015625],
                                        [115.19170046875, 24.2781984687501],
                                        [115.17298953125, 24.3327614570313],
                                        [115.1986340625, 24.3525563789063],
                                        [115.214019804688, 24.3724929023437],
                                        [115.210308867188, 24.3976100898437],
                                        [115.233258085938, 24.4285622382813],
                                        [115.2214465625, 24.4690676093751],
                                        [115.233375273438, 24.488843],
                                        [115.221549101563, 24.508452375],
                                        [115.224327421875, 24.5272658515625],
                                        [115.21127078125, 24.548911359375],
                                        [115.264678984375, 24.62046409375],
                                        [115.219127226563, 24.6556252265626],
                                        [115.19298953125, 24.68948753125],
                                        [115.187345, 24.6938430000001],
                                        [115.1812903125, 24.7092409492187],
                                        [115.216695585938, 24.7304177070313],
                                        [115.235484648438, 24.7276393867187],
                                        [115.291173125, 24.7612331367188],
                                        [115.320767851563, 24.7568605781251],
                                        [115.352735625, 24.73757346875],
                                        [115.367345, 24.773843],
                                        [115.38298953125, 24.7781984687501],
                                        [115.407345, 24.7928908515626],
                                        [115.449205351563, 24.7676393867187],
                                        [115.469000273438, 24.7705641914063],
                                        [115.50170046875, 24.72819846875],
                                        [115.51298953125, 24.7194875312501],
                                        [115.5260559375, 24.7025563789063],
                                        [115.5505871875, 24.6836208320313],
                                        [115.557345, 24.6438430000001],
                                        [115.520069609375, 24.6371999335938],
                                        [115.5021496875, 24.5761403632813],
                                        [115.481793242188, 24.559233625],
                                        [115.483873320313, 24.5388430000001],
                                        [115.48107546875, 24.5113893867188],
                                        [115.497257109375, 24.4919094062501],
                                        [115.532345, 24.4883327460938],
                                        [115.542735625, 24.4893923164063],
                                        [115.551954375, 24.4782936835938],
                                        [115.562735625, 24.4793923164062],
                                        [115.571881132813, 24.4683815742188],
                                        [115.5831653125, 24.4590065742188],
                                        [115.571803007813, 24.4391652656251],
                                        [115.574674101563, 24.4109767890625],
                                        [115.542808867188, 24.3666970039063],
                                        [115.551881132813, 24.3383815742188],
                                        [115.588306914063, 24.2529494453125],
                                        [115.571881132813, 24.2393044257813],
                                        [115.562779570313, 24.2082888007812],
                                        [115.548834257813, 24.2097096992188],
                                        [115.527345, 24.183843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "源城区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [114.62142703125, 23.5497585273438],
                                        [114.612345, 23.5366017890625],
                                        [114.597432890625, 23.5581960273438],
                                        [114.57142703125, 23.5679274726563],
                                        [114.549254179688, 23.6000466132812],
                                        [114.553565703125, 23.6192897773438],
                                        [114.533394804688, 23.6502638984376],
                                        [114.527345, 23.673843],
                                        [114.54271609375, 23.6784719062501],
                                        [114.55197390625, 23.68921409375],
                                        [114.59963015625, 23.7000417304688],
                                        [114.603150664063, 23.743843],
                                        [114.601832304688, 23.7602272773438],
                                        [114.653204375, 23.7831496406251],
                                        [114.6519153125, 23.7991799140625],
                                        [114.68271609375, 23.81847190625],
                                        [114.694761992188, 23.85847190625],
                                        [114.721470976563, 23.8274001289063],
                                        [114.73197390625, 23.7584719062501],
                                        [114.757345, 23.743843],
                                        [114.743248320313, 23.7209670234375],
                                        [114.702183867188, 23.7069728828125],
                                        [114.681158476563, 23.6600295234375],
                                        [114.673023710938, 23.5935036445312],
                                        [114.651158476563, 23.5800295234375],
                                        [114.647345, 23.563843],
                                        [114.62142703125, 23.5497585273438]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });
            define("echarts/util/mapData/geoJson/yangjiang", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "name": "阳春市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [111.851529570313, 22.6293556953125],
                                        [111.854722929688, 22.6077516914063],
                                        [111.823602324219, 22.6123513007813],
                                        [111.820338164063, 22.590259015625],
                                        [111.862135039063, 22.5780739570313],
                                        [111.877345, 22.5803200507812],
                                        [111.899000273438, 22.5771218085938],
                                        [111.93170046875, 22.6194875312501],
                                        [111.957345, 22.6338430000001],
                                        [111.981790800781, 22.5982888007813],
                                        [112.00107546875, 22.58284690625],
                                        [111.963167753906, 22.5524904609375],
                                        [111.983057890625, 22.5052834296875],
                                        [112.002899199219, 22.4893971992188],
                                        [112.011790800781, 22.4782888007813],
                                        [112.057454863281, 22.4461916328126],
                                        [112.079537382813, 22.418618390625],
                                        [112.150347929688, 22.4083107734375],
                                        [112.157345, 22.383843],
                                        [112.151339140625, 22.379848859375],
                                        [112.140064726563, 22.3628932929688],
                                        [112.144705839844, 22.344468],
                                        [112.092847929688, 22.35753440625],
                                        [112.059471464844, 22.3352468085938],
                                        [112.063604765625, 22.3188430000001],
                                        [112.061085234375, 22.308843],
                                        [112.063734160156, 22.2983254218751],
                                        [112.038363066406, 22.2660671210938],
                                        [112.022345, 22.270102765625],
                                        [112.005301542969, 22.2658083320313],
                                        [111.997345, 22.2538430000001],
                                        [111.941197539063, 22.2481154609376],
                                        [111.943148222656, 22.223843],
                                        [111.941942167969, 22.2088430000001],
                                        [111.944303007813, 22.1794655585938],
                                        [111.91197390625, 22.15921409375],
                                        [111.886766386719, 22.1299587226563],
                                        [111.87271609375, 22.09847190625],
                                        [111.858997832031, 22.0738820625],
                                        [111.84197390625, 22.05921409375],
                                        [111.83271609375, 22.04847190625],
                                        [111.767056914063, 22.0013234687501],
                                        [111.796766386719, 21.9757277656251],
                                        [111.781146269531, 21.9477346015626],
                                        [111.762105742188, 21.949262921875],
                                        [111.727157011719, 21.9364284492188],
                                        [111.717345, 21.9038430000001],
                                        [111.649422636719, 21.895356671875],
                                        [111.601485625, 21.9137819648438],
                                        [111.548372832031, 21.8749831367188],
                                        [111.512061796875, 21.8794997382813],
                                        [111.458804960938, 21.859028546875],
                                        [111.417345, 21.853843],
                                        [111.377139921875, 21.8644509101562],
                                        [111.352777128906, 21.87991721875],
                                        [111.330484648438, 21.8755104804688],
                                        [111.312965117188, 21.8999538398437],
                                        [111.293892851563, 21.8961843085938],
                                        [111.281553984375, 21.9577321601563],
                                        [111.277345, 21.993843],
                                        [111.281790800781, 21.9993971992188],
                                        [111.292899199219, 22.0082888007813],
                                        [111.307103300781, 22.0260280585938],
                                        [111.280553007813, 22.0472902656251],
                                        [111.308675566406, 22.0951296210938],
                                        [111.333016386719, 22.1284499335938],
                                        [111.327142363281, 22.1756716132813],
                                        [111.342899199219, 22.1882888007812],
                                        [111.352313261719, 22.2318068671875],
                                        [111.372899199219, 22.2482888007813],
                                        [111.377345, 22.2538430000001],
                                        [111.39271609375, 22.25847190625],
                                        [111.41197390625, 22.2692140937501],
                                        [111.45271609375, 22.27847190625],
                                        [111.46236453125, 22.3209352851563],
                                        [111.512069121094, 22.3637599921875],
                                        [111.59271609375, 22.3784719062501],
                                        [111.60197390625, 22.38921409375],
                                        [111.67091921875, 22.4486159492188],
                                        [111.677345, 22.483843],
                                        [111.70291140625, 22.5035768867188],
                                        [111.729163847656, 22.5677223945313],
                                        [111.773697539063, 22.5986940742187],
                                        [111.803148222656, 22.6384133125001],
                                        [111.801033964844, 22.6527126289063],
                                        [111.826058378906, 22.6851296210938],
                                        [111.837345, 22.693843],
                                        [111.85170046875, 22.66819846875],
                                        [111.87170046875, 22.6527614570313],
                                        [111.86298953125, 22.6381984687501],
                                        [111.851529570313, 22.6293556953125]
                                    ],
                                    [
                                        [111.785152617188, 22.0372658515626],
                                        [111.797345, 22.033843],
                                        [111.793922148438, 22.0460353828125],
                                        [111.785152617188, 22.0372658515626]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "阳东县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [111.793922148438, 22.0460353828125],
                                        [111.797345, 22.033843],
                                        [111.785152617188, 22.0372658515626],
                                        [111.793922148438, 22.0460353828125]
                                    ]
                                ],
                                [
                                    [
                                        [112.013260527344, 22.1241188789063],
                                        [112.032301054688, 22.1176296210938],
                                        [112.090303984375, 22.1356081367188],
                                        [112.113260527344, 22.1197585273438],
                                        [112.127254667969, 22.0994899726563],
                                        [112.164176054688, 22.0856740546875],
                                        [112.191898222656, 22.0676222968751],
                                        [112.220081816406, 22.07394065625],
                                        [112.223465605469, 22.0588430000001],
                                        [112.214324980469, 22.0180690742188],
                                        [112.263260527344, 21.9997585273438],
                                        [112.271429472656, 21.9879274726562],
                                        [112.313792753906, 21.979653546875],
                                        [112.333260527344, 21.9497585273438],
                                        [112.341429472656, 21.9279274726563],
                                        [112.347345, 21.923843],
                                        [112.34156375, 21.90913596875],
                                        [112.343822050781, 21.893843],
                                        [112.341529570313, 21.8783303046875],
                                        [112.358150664063, 21.8655007148438],
                                        [112.32298953125, 21.77819846875],
                                        [112.301092558594, 21.7418996406251],
                                        [112.307345, 21.703843],
                                        [112.241024199219, 21.7079518867188],
                                        [112.245767851563, 21.7291139960938],
                                        [112.202957792969, 21.7401003242188],
                                        [112.191685820313, 21.797817609375],
                                        [112.147782011719, 21.8079274726563],
                                        [112.078294707031, 21.7863893867188],
                                        [112.057345, 21.7910842109375],
                                        [112.042303496094, 21.7877126289063],
                                        [112.017345, 21.7938430000001],
                                        [112.017345, 21.803843],
                                        [112.030152617188, 21.808843],
                                        [112.017345, 21.813843],
                                        [111.995199003906, 21.8476760078125],
                                        [112.003333769531, 21.888843],
                                        [112.001234160156, 21.8994631171875],
                                        [112.013170195313, 21.9080178046875],
                                        [112.029495878906, 21.9503444648438],
                                        [112.017503691406, 21.9680178046876],
                                        [111.992862578125, 21.933637921875],
                                        [111.94685671875, 21.9069631171875],
                                        [111.932345, 21.9098317695313],
                                        [111.921912871094, 21.90776878125],
                                        [111.898651152344, 21.9225368476563],
                                        [111.903333769531, 21.898843],
                                        [111.900369902344, 21.883843],
                                        [111.903333769531, 21.8688430000001],
                                        [111.900369902344, 21.853843],
                                        [111.907691679688, 21.8167848945313],
                                        [111.841727324219, 21.82995628125],
                                        [111.832642851563, 21.8172829414063],
                                        [111.807345, 21.8338430000001],
                                        [111.783260527344, 21.8497585273438],
                                        [111.757254667969, 21.8594899726562],
                                        [111.735091582031, 21.8915895820312],
                                        [111.717345, 21.9038430000001],
                                        [111.727157011719, 21.9364284492188],
                                        [111.762105742188, 21.949262921875],
                                        [111.781146269531, 21.9477346015626],
                                        [111.796766386719, 21.9757277656251],
                                        [111.767056914063, 22.0013234687501],
                                        [111.83271609375, 22.04847190625],
                                        [111.84197390625, 22.05921409375],
                                        [111.858997832031, 22.0738820625],
                                        [111.87271609375, 22.09847190625],
                                        [111.886766386719, 22.1299587226563],
                                        [111.91197390625, 22.15921409375],
                                        [111.944303007813, 22.1794655585938],
                                        [111.941942167969, 22.2088430000001],
                                        [111.943148222656, 22.223843],
                                        [111.941197539063, 22.2481154609376],
                                        [111.997345, 22.2538430000001],
                                        [112.039752226563, 22.2254055],
                                        [112.044989042969, 22.2020436835938],
                                        [112.030960722656, 22.1686452460938],
                                        [112.045474882813, 22.1463600898438],
                                        [112.013260527344, 22.1241188789063]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "江城区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [112.183338652344, 21.5665676093751],
                                        [112.187345, 21.543843],
                                        [112.174346953125, 21.5494045234375],
                                        [112.183338652344, 21.5665676093751]
                                    ]
                                ],
                                [
                                    [
                                        [111.967345, 21.653843],
                                        [111.972345, 21.6410353828125],
                                        [111.977345, 21.653843],
                                        [112.014371367188, 21.6475539375],
                                        [112.011605253906, 21.628843],
                                        [112.013436308594, 21.6164650703126],
                                        [111.99205203125, 21.61962425],
                                        [111.959906035156, 21.60698753125],
                                        [111.928678007813, 21.6116017890626],
                                        [111.89170046875, 21.5894875312501],
                                        [111.8627746875, 21.5680397773438],
                                        [111.847345, 21.5703200507813],
                                        [111.804598417969, 21.5640041328126],
                                        [111.82298953125, 21.5781984687501],
                                        [111.83170046875, 21.59948753125],
                                        [111.854066191406, 21.6167482734375],
                                        [111.839849882813, 21.6529055],
                                        [111.887174101563, 21.6459133125001],
                                        [111.92248171875, 21.6597927070313],
                                        [111.946156035156, 21.6455129218751],
                                        [111.967345, 21.653843]
                                    ]
                                ],
                                [
                                    [
                                        [111.977345, 21.653843],
                                        [111.967345, 21.653843],
                                        [111.972345, 21.6666506171875],
                                        [111.977345, 21.653843]
                                    ]
                                ],
                                [
                                    [
                                        [111.827345, 21.703843],
                                        [111.817345, 21.703843],
                                        [111.817345, 21.733843],
                                        [111.827345, 21.733843],
                                        [111.827345, 21.703843]
                                    ]
                                ],
                                [
                                    [
                                        [111.817345, 21.733843],
                                        [111.792733183594, 21.7412526679688],
                                        [111.807345, 21.7538430000001],
                                        [111.817345, 21.733843]
                                    ]
                                ],
                                [
                                    [
                                        [111.827345, 21.703843],
                                        [111.837345, 21.703843],
                                        [111.837345, 21.7538430000001],
                                        [111.849537382813, 21.7572658515625],
                                        [111.840767851563, 21.7660353828126],
                                        [111.837345, 21.7538430000001],
                                        [111.807345, 21.7538430000001],
                                        [111.807345, 21.763843],
                                        [111.787345, 21.763843],
                                        [111.787345, 21.773843],
                                        [111.797345, 21.773843],
                                        [111.797345, 21.783843],
                                        [111.807257109375, 21.80378440625],
                                        [111.799896269531, 21.8188576484376],
                                        [111.807345, 21.8338430000001],
                                        [111.832642851563, 21.8172829414063],
                                        [111.841727324219, 21.82995628125],
                                        [111.907691679688, 21.8167848945313],
                                        [111.900369902344, 21.853843],
                                        [111.903333769531, 21.8688430000001],
                                        [111.900369902344, 21.883843],
                                        [111.903333769531, 21.898843],
                                        [111.898651152344, 21.9225368476563],
                                        [111.921912871094, 21.90776878125],
                                        [111.932345, 21.9098317695313],
                                        [111.94685671875, 21.9069631171875],
                                        [111.992862578125, 21.933637921875],
                                        [112.017503691406, 21.9680178046876],
                                        [112.029495878906, 21.9503444648438],
                                        [112.013170195313, 21.9080178046875],
                                        [112.001234160156, 21.8994631171875],
                                        [112.003333769531, 21.888843],
                                        [111.995199003906, 21.8476760078125],
                                        [112.017345, 21.813843],
                                        [112.017345, 21.803843],
                                        [112.017345, 21.7938430000001],
                                        [112.033516875, 21.7684230781251],
                                        [111.991790800781, 21.7593971992187],
                                        [111.982799101563, 21.7481642890626],
                                        [111.971890898438, 21.7495217109376],
                                        [111.962899199219, 21.7382888007813],
                                        [111.931790800781, 21.7193971992188],
                                        [111.869273710938, 21.6693971992188],
                                        [111.837359648438, 21.6913381171876],
                                        [111.827345, 21.703843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "阳西县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [111.547345, 21.513843],
                                        [111.543922148438, 21.5016506171876],
                                        [111.535152617188, 21.5104201484376],
                                        [111.547345, 21.513843]
                                    ]
                                ],
                                [
                                    [
                                        [111.783922148438, 21.6260353828125],
                                        [111.787345, 21.613843],
                                        [111.775152617188, 21.6172658515626],
                                        [111.783922148438, 21.6260353828125]
                                    ]
                                ],
                                [
                                    [
                                        [111.787345, 21.6738430000001],
                                        [111.783922148438, 21.6860353828125],
                                        [111.775152617188, 21.6772658515625],
                                        [111.758753691406, 21.6193361640625],
                                        [111.697713652344, 21.6036721015625],
                                        [111.671429472656, 21.5697585273438],
                                        [111.659034453125, 21.5214626289063],
                                        [111.641571074219, 21.5175490546875],
                                        [111.633260527344, 21.5397585273437],
                                        [111.617345, 21.543843],
                                        [111.613922148438, 21.5560353828125],
                                        [111.605152617188, 21.5472658515626],
                                        [111.617345, 21.543843],
                                        [111.614801054688, 21.5363869453125],
                                        [111.579888945313, 21.5312990546875],
                                        [111.564801054688, 21.5163869453125],
                                        [111.547345, 21.513843],
                                        [111.53545046875, 21.5281618476563],
                                        [111.479303007813, 21.5070632148438],
                                        [111.452806425781, 21.5117678046875],
                                        [111.473363066406, 21.5288430000001],
                                        [111.461883574219, 21.5383815742188],
                                        [111.437081328125, 21.5955641914063],
                                        [111.427345, 21.583843],
                                        [111.410472441406, 21.5954909492188],
                                        [111.415706816406, 21.618843],
                                        [111.409654570313, 21.6458425117188],
                                        [111.43353640625, 21.6985329414063],
                                        [111.429115019531, 21.7182570625],
                                        [111.377345, 21.7315407539063],
                                        [111.383465605469, 21.7588430000001],
                                        [111.379339628906, 21.7772512031251],
                                        [111.413260527344, 21.8179274726563],
                                        [111.417345, 21.853843],
                                        [111.458804960938, 21.859028546875],
                                        [111.512061796875, 21.8794997382813],
                                        [111.548372832031, 21.8749831367188],
                                        [111.601485625, 21.9137819648438],
                                        [111.649422636719, 21.895356671875],
                                        [111.717345, 21.9038430000001],
                                        [111.735091582031, 21.8915895820312],
                                        [111.757254667969, 21.8594899726562],
                                        [111.783260527344, 21.8497585273438],
                                        [111.807345, 21.8338430000001],
                                        [111.799896269531, 21.8188576484376],
                                        [111.807257109375, 21.80378440625],
                                        [111.797345, 21.783843],
                                        [111.787345, 21.783843],
                                        [111.787345, 21.773843],
                                        [111.769144316406, 21.7661989570313],
                                        [111.752345, 21.7699636054688],
                                        [111.732345, 21.7654811835938],
                                        [111.683260527344, 21.7764846015626],
                                        [111.70193484375, 21.747134015625],
                                        [111.731898222656, 21.7276222968751],
                                        [111.746304960938, 21.7308522773438],
                                        [111.801429472656, 21.6993874335938],
                                        [111.793260527344, 21.6779274726563],
                                        [111.787345, 21.6738430000001]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });
            define("echarts/util/mapData/geoJson/qingyuan", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "name": "佛冈县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.615135527344, 24.1051271796876],
                                        [113.67201296875, 24.0675417304688],
                                        [113.727078886719, 24.0846096015625],
                                        [113.743260527344, 24.0597585273438],
                                        [113.747345, 24.023843],
                                        [113.719598417969, 24.002426984375],
                                        [113.723558378906, 23.9756252265625],
                                        [113.76298953125, 23.95948753125],
                                        [113.792493925781, 23.9212599921875],
                                        [113.797345, 23.903843],
                                        [113.78170046875, 23.89948753125],
                                        [113.746951933594, 23.8544680000001],
                                        [113.708455839844, 23.8601564765625],
                                        [113.713084746094, 23.828843],
                                        [113.711302519531, 23.8167800117188],
                                        [113.687345, 23.8203200507813],
                                        [113.667345, 23.8173659492188],
                                        [113.640809355469, 23.8212868476563],
                                        [113.62298953125, 23.79819846875],
                                        [113.607054472656, 23.7859011054688],
                                        [113.62298953125, 23.7594875312501],
                                        [113.63170046875, 23.7226418281251],
                                        [113.596514921875, 23.6643093085937],
                                        [113.549295683594, 23.7024709296876],
                                        [113.51298953125, 23.68819846875],
                                        [113.478426542969, 23.6794875312501],
                                        [113.458631621094, 23.7051296210938],
                                        [113.44170046875, 23.71819846875],
                                        [113.432857695313, 23.7296584296875],
                                        [113.411783476563, 23.7265431953125],
                                        [113.367345, 23.7338430000001],
                                        [113.33298953125, 23.73948753125],
                                        [113.297345, 23.743843],
                                        [113.306783476563, 23.7768508125],
                                        [113.347337675781, 23.8458425117188],
                                        [113.337345, 23.8538430000001],
                                        [113.3539075, 23.88931175],
                                        [113.33486453125, 23.9024611640625],
                                        [113.36384890625, 23.9213332343751],
                                        [113.402345, 23.9299636054687],
                                        [113.42435671875, 23.9250295234375],
                                        [113.445697050781, 23.9559377265625],
                                        [113.482791777344, 23.947622296875],
                                        [113.501429472656, 23.9597585273438],
                                        [113.529454375, 23.9702443671875],
                                        [113.510960722656, 23.9986452460938],
                                        [113.523260527344, 24.0279274726563],
                                        [113.531925078125, 24.0723000312501],
                                        [113.56060671875, 24.0658693671876],
                                        [113.591839628906, 24.0900759101563],
                                        [113.603016386719, 24.0875710273438],
                                        [113.615135527344, 24.1051271796876]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "连南瑶族自治县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [112.463338652344, 24.446567609375],
                                        [112.467345, 24.4238430000001],
                                        [112.454346953125, 24.4294045234376],
                                        [112.463338652344, 24.446567609375]
                                    ]
                                ],
                                [
                                    [
                                        [112.377345, 24.623843],
                                        [112.365152617188, 24.6204201484375],
                                        [112.373922148438, 24.6116506171875],
                                        [112.387345, 24.623843],
                                        [112.38298953125, 24.5881984687501],
                                        [112.371575957031, 24.5490529609376],
                                        [112.374561796875, 24.528843],
                                        [112.369427519531, 24.4940993476562],
                                        [112.390809355469, 24.4663991523438],
                                        [112.434840117188, 24.4729055],
                                        [112.417821074219, 24.429614484375],
                                        [112.48970828125, 24.4033864570313],
                                        [112.460233183594, 24.3806349921875],
                                        [112.479019804688, 24.34948753125],
                                        [112.457972441406, 24.3600759101563],
                                        [112.436263457031, 24.38819846875],
                                        [112.412157011719, 24.3421633125],
                                        [112.407345, 24.313843],
                                        [112.391519804688, 24.3180178046875],
                                        [112.370999785156, 24.3466481757813],
                                        [112.341519804688, 24.3580178046875],
                                        [112.313170195313, 24.3796681953125],
                                        [112.277567167969, 24.3980178046875],
                                        [112.291146269531, 24.3293068671875],
                                        [112.257345, 24.323843],
                                        [112.24298953125, 24.34948753125],
                                        [112.22170046875, 24.3581984687501],
                                        [112.21298953125, 24.37948753125],
                                        [112.198074980469, 24.4042116523438],
                                        [112.16298953125, 24.37819846875],
                                        [112.138746367188, 24.3694875312501],
                                        [112.145384550781, 24.4144142890625],
                                        [112.110128203125, 24.428843],
                                        [112.113160429688, 24.4493556953125],
                                        [112.101529570313, 24.4583303046875],
                                        [112.104378691406, 24.4776100898438],
                                        [112.069837675781, 24.5241994453126],
                                        [112.050391875, 24.5392092109375],
                                        [112.116866484375, 24.55323753125],
                                        [112.110594511719, 24.5956911445313],
                                        [112.125799589844, 24.6478444648438],
                                        [112.16298953125, 24.6581984687501],
                                        [112.21170046875, 24.68948753125],
                                        [112.263624296875, 24.7084304023438],
                                        [112.242611113281, 24.7432717109376],
                                        [112.180128203125, 24.7688430000001],
                                        [112.184378691406, 24.7976100898438],
                                        [112.16170046875, 24.82819846875],
                                        [112.157345, 24.8438430000001],
                                        [112.170152617188, 24.848843],
                                        [112.157345, 24.853843],
                                        [112.16170046875, 24.88948753125],
                                        [112.167345, 24.923843],
                                        [112.193729277344, 24.9342165351563],
                                        [112.2534778125, 24.8891164375001],
                                        [112.273294707031, 24.8387062812501],
                                        [112.258880644531, 24.814809796875],
                                        [112.276058378906, 24.7925563789062],
                                        [112.29298953125, 24.77948753125],
                                        [112.308255644531, 24.6896096015626],
                                        [112.333167753906, 24.6794142890625],
                                        [112.330203886719, 24.6593556953126],
                                        [112.343160429688, 24.6493556953125],
                                        [112.341517363281, 24.6382497382813],
                                        [112.37298953125, 24.62948753125],
                                        [112.377345, 24.623843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "连山壮族瑶族自治县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [112.157345, 24.8438430000001],
                                        [112.16170046875, 24.82819846875],
                                        [112.184378691406, 24.7976100898438],
                                        [112.180128203125, 24.7688430000001],
                                        [112.242611113281, 24.7432717109376],
                                        [112.263624296875, 24.7084304023438],
                                        [112.21170046875, 24.68948753125],
                                        [112.16298953125, 24.6581984687501],
                                        [112.125799589844, 24.6478444648438],
                                        [112.110594511719, 24.5956911445313],
                                        [112.116866484375, 24.55323753125],
                                        [112.050391875, 24.5392092109375],
                                        [112.069837675781, 24.5241994453126],
                                        [112.104378691406, 24.4776100898438],
                                        [112.101529570313, 24.4583303046875],
                                        [112.113160429688, 24.4493556953125],
                                        [112.110128203125, 24.428843],
                                        [112.145384550781, 24.4144142890625],
                                        [112.138746367188, 24.3694875312501],
                                        [112.16298953125, 24.37819846875],
                                        [112.198074980469, 24.4042116523438],
                                        [112.21298953125, 24.37948753125],
                                        [112.22170046875, 24.3581984687501],
                                        [112.24298953125, 24.34948753125],
                                        [112.257345, 24.323843],
                                        [112.2520325, 24.31909690625],
                                        [112.253238554688, 24.298843],
                                        [112.250384550781, 24.2509572578125],
                                        [112.212064238281, 24.2391237617188],
                                        [112.192625761719, 24.2085622382813],
                                        [112.172064238281, 24.1991237617188],
                                        [112.150096464844, 24.1871877265626],
                                        [112.10970828125, 24.232387921875],
                                        [112.059534941406, 24.2685622382813],
                                        [112.032625761719, 24.1985622382813],
                                        [111.999429960938, 24.1891237617187],
                                        [111.9541028125, 24.2398561835938],
                                        [111.937345, 24.2338430000001],
                                        [111.945277128906, 24.261587140625],
                                        [111.974610625, 24.2579396796875],
                                        [111.998785429688, 24.288130109375],
                                        [112.022899199219, 24.2982888007813],
                                        [112.0526184375, 24.3472194648438],
                                        [112.061790800781, 24.3822731757813],
                                        [112.041790800781, 24.3982888007812],
                                        [112.027830839844, 24.4314235664063],
                                        [111.98146609375, 24.4685500312501],
                                        [111.992899199219, 24.4982888007813],
                                        [112.001790800781, 24.5422731757813],
                                        [111.981790800781, 24.5582888007813],
                                        [111.968450957031, 24.5749489570313],
                                        [111.943787871094, 24.5946999335938],
                                        [111.922899199219, 24.6322731757813],
                                        [111.944154082031, 24.6492971015626],
                                        [111.939808378906, 24.6842360664063],
                                        [111.95584109375, 24.7259450507812],
                                        [112.012899199219, 24.7382888007813],
                                        [112.017345, 24.743843],
                                        [112.022899199219, 24.7482888007813],
                                        [112.036261015625, 24.7800002265625],
                                        [112.051790800781, 24.7993971992188],
                                        [112.075904570313, 24.8095558906251],
                                        [112.097352324219, 24.8363381171875],
                                        [112.157345, 24.8438430000001]
                                    ]
                                ],
                                [
                                    [
                                        [112.157345, 24.8438430000001],
                                        [112.157345, 24.853843],
                                        [112.170152617188, 24.848843],
                                        [112.157345, 24.8438430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "连州市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [112.377345, 24.623843],
                                        [112.373922148438, 24.6116506171875],
                                        [112.365152617188, 24.6204201484375],
                                        [112.377345, 24.623843]
                                    ]
                                ],
                                [
                                    [
                                        [112.377345, 24.623843],
                                        [112.37298953125, 24.62948753125],
                                        [112.341517363281, 24.6382497382813],
                                        [112.343160429688, 24.6493556953125],
                                        [112.330203886719, 24.6593556953126],
                                        [112.333167753906, 24.6794142890625],
                                        [112.308255644531, 24.6896096015626],
                                        [112.29298953125, 24.77948753125],
                                        [112.276058378906, 24.7925563789062],
                                        [112.258880644531, 24.814809796875],
                                        [112.273294707031, 24.8387062812501],
                                        [112.2534778125, 24.8891164375001],
                                        [112.193729277344, 24.9342165351563],
                                        [112.167345, 24.923843],
                                        [112.163260527344, 24.9297585273438],
                                        [112.121429472656, 24.9579274726563],
                                        [112.113260527344, 24.9792189765625],
                                        [112.143260527344, 25.0179274726563],
                                        [112.147345, 25.053843],
                                        [112.158450957031, 25.0827370429687],
                                        [112.18908328125, 25.1898708320313],
                                        [112.207345, 25.1876003242188],
                                        [112.233704863281, 25.1908766914063],
                                        [112.258914824219, 25.1593971992188],
                                        [112.302899199219, 25.1682888007813],
                                        [112.357345, 25.193843],
                                        [112.362535429688, 25.1890334296875],
                                        [112.399210234375, 25.1390334296876],
                                        [112.412535429688, 25.1486525703126],
                                        [112.438153105469, 25.1883205390625],
                                        [112.452154570313, 25.1586525703125],
                                        [112.492535429688, 25.1490334296875],
                                        [112.549222441406, 25.129165265625],
                                        [112.570882597656, 25.128305890625],
                                        [112.627345, 25.1401198554688],
                                        [112.657345, 25.133843],
                                        [112.71423953125, 25.0674367500001],
                                        [112.711197539063, 25.02956565625],
                                        [112.73271609375, 24.99921409375],
                                        [112.743900175781, 24.9620729804687],
                                        [112.77271609375, 24.94921409375],
                                        [112.777345, 24.903843],
                                        [112.771790800781, 24.8993971992188],
                                        [112.762215605469, 24.8766725898438],
                                        [112.701790800781, 24.8593971992188],
                                        [112.690863066406, 24.8457497382813],
                                        [112.693587675781, 24.823843],
                                        [112.689583769531, 24.7916530585938],
                                        [112.652530546875, 24.7619802070313],
                                        [112.642515898438, 24.7269557929688],
                                        [112.617345, 24.7300856757813],
                                        [112.597579375, 24.7276271796875],
                                        [112.55521609375, 24.6673610664063],
                                        [112.431790800781, 24.6493971992188],
                                        [112.402899199219, 24.6282888007812],
                                        [112.387345, 24.623843],
                                        [112.377345, 24.623843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "清城区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.157345, 23.743843],
                                        [113.145152617188, 23.7404201484375],
                                        [113.153922148438, 23.7316506171875],
                                        [113.19298953125, 23.7294875312501],
                                        [113.20170046875, 23.71819846875],
                                        [113.21298953125, 23.70948753125],
                                        [113.221832304688, 23.6980275703126],
                                        [113.257345, 23.7032765937501],
                                        [113.292345, 23.6981032539063],
                                        [113.304561796875, 23.6999098945313],
                                        [113.297345, 23.743843],
                                        [113.33298953125, 23.73948753125],
                                        [113.367345, 23.7338430000001],
                                        [113.358865996094, 23.7008010078126],
                                        [113.323260527344, 23.6479274726563],
                                        [113.297254667969, 23.6381960273438],
                                        [113.283260527344, 23.6179274726563],
                                        [113.277345, 23.613843],
                                        [113.251790800781, 23.6093971992188],
                                        [113.199273710938, 23.5785256171875],
                                        [113.203011503906, 23.5484841132813],
                                        [113.186041289063, 23.519614484375],
                                        [113.155206328125, 23.5066213203126],
                                        [113.115477324219, 23.5115627265625],
                                        [113.092899199219, 23.4982888007813],
                                        [113.071790800781, 23.4893971992188],
                                        [113.049276152344, 23.4761598945313],
                                        [112.971790800781, 23.4593971992188],
                                        [112.967345, 23.453843],
                                        [112.937955351563, 23.4584743476563],
                                        [112.915697050781, 23.4907155585938],
                                        [112.901651640625, 23.4875661445313],
                                        [112.883260527344, 23.5173976875],
                                        [112.907345, 23.553843],
                                        [112.950096464844, 23.5826930976563],
                                        [112.964886503906, 23.6564601875],
                                        [112.981519804688, 23.6796681953125],
                                        [113.0039465625, 23.6957424140626],
                                        [112.999503203125, 23.7182228828125],
                                        [113.021658964844, 23.7341042304688],
                                        [113.0340246875, 23.7661598945312],
                                        [113.093170195313, 23.7780178046875],
                                        [113.102115507813, 23.7904982734375],
                                        [113.181519804688, 23.7695510078125],
                                        [113.172962675781, 23.7577321601563],
                                        [113.1616028125, 23.7599782539063],
                                        [113.157345, 23.743843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "清新县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.157345, 23.743843],
                                        [113.153922148438, 23.7316506171875],
                                        [113.145152617188, 23.7404201484375],
                                        [113.157345, 23.743843]
                                    ]
                                ],
                                [
                                    [
                                        [112.747345, 24.253843],
                                        [112.735152617188, 24.2572658515626],
                                        [112.743922148438, 24.2660353828125],
                                        [112.747345, 24.253843]
                                    ]
                                ],
                                [
                                    [
                                        [113.157345, 23.743843],
                                        [113.1616028125, 23.7599782539063],
                                        [113.172962675781, 23.7577321601563],
                                        [113.181519804688, 23.7695510078125],
                                        [113.102115507813, 23.7904982734375],
                                        [113.093170195313, 23.7780178046875],
                                        [113.0340246875, 23.7661598945312],
                                        [113.021658964844, 23.7341042304688],
                                        [112.999503203125, 23.7182228828125],
                                        [113.0039465625, 23.6957424140626],
                                        [112.981519804688, 23.6796681953125],
                                        [112.964886503906, 23.6564601875],
                                        [112.950096464844, 23.5826930976563],
                                        [112.907345, 23.553843],
                                        [112.903260527344, 23.5597585273437],
                                        [112.8536340625, 23.57249534375],
                                        [112.832345, 23.5677223945313],
                                        [112.821529570313, 23.5701467109375],
                                        [112.817345, 23.553843],
                                        [112.810887480469, 23.5444924140625],
                                        [112.789132109375, 23.5595143867188],
                                        [112.795706816406, 23.5888430000001],
                                        [112.743260527344, 23.6084670234375],
                                        [112.751429472656, 23.6297585273438],
                                        [112.781429472656, 23.6504714179688],
                                        [112.768365507813, 23.681313703125],
                                        [112.747074003906, 23.6765407539063],
                                        [112.717345, 23.683843],
                                        [112.711527128906, 23.71925315625],
                                        [112.733148222656, 23.7484133125001],
                                        [112.731302519531, 23.7609059882813],
                                        [112.701978789063, 23.7565724921875],
                                        [112.69298953125, 23.80948753125],
                                        [112.650391875, 23.8184767890626],
                                        [112.66298953125, 23.8281984687501],
                                        [112.67373171875, 23.8544509101563],
                                        [112.671575957031, 23.8690529609375],
                                        [112.684879179688, 23.9146804023438],
                                        [112.670125761719, 23.9522096992188],
                                        [112.632345, 23.9466262031251],
                                        [112.602957792969, 23.9509694648438],
                                        [112.567345, 23.973843],
                                        [112.57170046875, 24.03948753125],
                                        [112.603150664063, 24.0783986640625],
                                        [112.60048953125, 24.0964040351563],
                                        [112.624691191406, 24.1579665351562],
                                        [112.616224394531, 24.215259015625],
                                        [112.639683867188, 24.2333669257813],
                                        [112.711390410156, 24.2124587226563],
                                        [112.721751738281, 24.2496706367188],
                                        [112.741832304688, 24.2467018867188],
                                        [112.747345, 24.253843],
                                        [112.757345, 24.253843],
                                        [112.757345, 24.313843],
                                        [112.77271609375, 24.30921409375],
                                        [112.805225859375, 24.2714821601563],
                                        [112.8327746875, 24.2591896796875],
                                        [112.831942167969, 24.248843],
                                        [112.833492460938, 24.22956565625],
                                        [112.805496855469, 24.1900807929688],
                                        [112.82271609375, 24.15921409375],
                                        [112.83197390625, 24.12847190625],
                                        [112.873148222656, 24.1160744453125],
                                        [112.904378691406, 24.0891677070313],
                                        [112.901180449219, 24.0493386054688],
                                        [112.922345, 24.0476369453125],
                                        [112.979212675781, 24.0522072578126],
                                        [112.993609648438, 23.9577394843751],
                                        [113.014439726563, 23.9594118476563],
                                        [113.05197390625, 23.93847190625],
                                        [113.077901640625, 23.926899640625],
                                        [113.104405546875, 23.8845900703125],
                                        [113.169034453125, 23.8897829414063],
                                        [113.19271609375, 23.87921409375],
                                        [113.20197390625, 23.8684719062501],
                                        [113.24271609375, 23.85921409375],
                                        [113.272110625, 23.8484206367188],
                                        [113.337345, 23.8538430000001],
                                        [113.347337675781, 23.8458425117188],
                                        [113.306783476563, 23.7768508125],
                                        [113.297345, 23.743843],
                                        [113.304561796875, 23.6999098945313],
                                        [113.292345, 23.6981032539063],
                                        [113.257345, 23.7032765937501],
                                        [113.221832304688, 23.6980275703126],
                                        [113.21298953125, 23.70948753125],
                                        [113.20170046875, 23.71819846875],
                                        [113.19298953125, 23.7294875312501],
                                        [113.157345, 23.743843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "阳山县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [112.747345, 24.253843],
                                        [112.743922148438, 24.2660353828125],
                                        [112.735152617188, 24.2572658515626],
                                        [112.741832304688, 24.2467018867188],
                                        [112.721751738281, 24.2496706367188],
                                        [112.711390410156, 24.2124587226563],
                                        [112.639683867188, 24.2333669257813],
                                        [112.616224394531, 24.215259015625],
                                        [112.624691191406, 24.1579665351562],
                                        [112.60048953125, 24.0964040351563],
                                        [112.603150664063, 24.0783986640625],
                                        [112.57170046875, 24.03948753125],
                                        [112.567345, 23.973843],
                                        [112.562345, 23.9676003242188],
                                        [112.552796660156, 23.9795217109375],
                                        [112.507345, 23.973843],
                                        [112.501512480469, 24.0093410468751],
                                        [112.513311796875, 24.0184474921876],
                                        [112.483804960938, 24.1136916328126],
                                        [112.43170046875, 24.1281984687501],
                                        [112.42298953125, 24.1618874335938],
                                        [112.453177519531, 24.2386769843751],
                                        [112.441082792969, 24.2908718085938],
                                        [112.421800566406, 24.2880226875],
                                        [112.407345, 24.313843],
                                        [112.412157011719, 24.3421633125],
                                        [112.436263457031, 24.38819846875],
                                        [112.457972441406, 24.3600759101563],
                                        [112.479019804688, 24.34948753125],
                                        [112.460233183594, 24.3806349921875],
                                        [112.48970828125, 24.4033864570313],
                                        [112.417821074219, 24.429614484375],
                                        [112.434840117188, 24.4729055],
                                        [112.390809355469, 24.4663991523438],
                                        [112.369427519531, 24.4940993476562],
                                        [112.374561796875, 24.528843],
                                        [112.371575957031, 24.5490529609376],
                                        [112.38298953125, 24.5881984687501],
                                        [112.387345, 24.623843],
                                        [112.402899199219, 24.6282888007812],
                                        [112.431790800781, 24.6493971992188],
                                        [112.55521609375, 24.6673610664063],
                                        [112.597579375, 24.7276271796875],
                                        [112.617345, 24.7300856757813],
                                        [112.642515898438, 24.7269557929688],
                                        [112.652530546875, 24.7619802070313],
                                        [112.689583769531, 24.7916530585938],
                                        [112.693587675781, 24.823843],
                                        [112.690863066406, 24.8457497382813],
                                        [112.701790800781, 24.8593971992188],
                                        [112.762215605469, 24.8766725898438],
                                        [112.771790800781, 24.8993971992188],
                                        [112.777345, 24.903843],
                                        [112.787454863281, 24.8902541328125],
                                        [112.847345, 24.9005641914063],
                                        [112.862806425781, 24.8979030585938],
                                        [112.891610136719, 24.9195778632813],
                                        [112.987345, 24.923843],
                                        [112.998988066406, 24.9158034492188],
                                        [113.016546660156, 24.8591579414063],
                                        [112.989173613281, 24.8489138007813],
                                        [112.948531523438, 24.82085471875],
                                        [112.954339628906, 24.7949416328125],
                                        [112.929456816406, 24.7567287421875],
                                        [112.934932890625, 24.7322951484376],
                                        [112.896912871094, 24.7180690742188],
                                        [112.906781035156, 24.67405784375],
                                        [112.893260527344, 24.6379274726563],
                                        [112.873260527344, 24.6072145820312],
                                        [112.881732207031, 24.5975856757813],
                                        [112.927171660156, 24.6077712226563],
                                        [112.959176054688, 24.5856740546876],
                                        [112.967345, 24.553843],
                                        [112.963150664063, 24.5470339179687],
                                        [112.951243925781, 24.5507424140625],
                                        [112.943446074219, 24.4869435859375],
                                        [112.927345, 24.491958234375],
                                        [112.912345, 24.4872853828125],
                                        [112.899449492188, 24.4913014960938],
                                        [112.8682825, 24.4720973945313],
                                        [112.847772246094, 24.4097414375],
                                        [112.881158476563, 24.3891701484375],
                                        [112.869110136719, 24.3551784492188],
                                        [112.852313261719, 24.3604103828125],
                                        [112.812376738281, 24.3472756171875],
                                        [112.799947539063, 24.3511476875],
                                        [112.761158476563, 24.3300295234376],
                                        [112.757345, 24.313843],
                                        [112.757345, 24.253843],
                                        [112.747345, 24.253843]
                                    ],
                                    [
                                        [112.467345, 24.4238430000001],
                                        [112.463338652344, 24.446567609375],
                                        [112.454346953125, 24.4294045234376],
                                        [112.467345, 24.4238430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "英德市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [112.967345, 24.553843],
                                        [112.992625761719, 24.5391237617188],
                                        [113.035299101563, 24.4803224921875],
                                        [113.078294707031, 24.4691237617188],
                                        [113.096168242188, 24.5080666328125],
                                        [113.150679960938, 24.4784450507813],
                                        [113.172345, 24.4797365546875],
                                        [113.199403105469, 24.4781252265625],
                                        [113.207345, 24.503843],
                                        [113.242857695313, 24.5096755195313],
                                        [113.277760039063, 24.45948753125],
                                        [113.325289335938, 24.4712404609376],
                                        [113.3751965625, 24.4908620429688],
                                        [113.40298953125, 24.4794875312501],
                                        [113.417838164063, 24.4602468085938],
                                        [113.436737089844, 24.45745628125],
                                        [113.46298953125, 24.4681984687501],
                                        [113.471832304688, 24.4796584296875],
                                        [113.487345, 24.4773659492188],
                                        [113.502345, 24.4795827460938],
                                        [113.51490359375, 24.4777248359375],
                                        [113.546143828125, 24.51819846875],
                                        [113.59298953125, 24.50948753125],
                                        [113.61170046875, 24.49819846875],
                                        [113.63298953125, 24.4894875312501],
                                        [113.64170046875, 24.47819846875],
                                        [113.667345, 24.473843],
                                        [113.667345, 24.4638430000001],
                                        [113.677345, 24.4638430000001],
                                        [113.684569121094, 24.4392214179688],
                                        [113.709058867188, 24.4097389960938],
                                        [113.725819121094, 24.4483815742188],
                                        [113.753690214844, 24.4334938789063],
                                        [113.791886015625, 24.4017629218751],
                                        [113.811883574219, 24.3483815742188],
                                        [113.844427519531, 24.3342653632813],
                                        [113.840816679688, 24.298843],
                                        [113.842855253906, 24.278843],
                                        [113.840882597656, 24.2595021796875],
                                        [113.852345, 24.2583327460938],
                                        [113.862735625, 24.2593923164063],
                                        [113.871883574219, 24.2483815742188],
                                        [113.882806425781, 24.2393044257813],
                                        [113.895394316406, 24.2102858710937],
                                        [113.917345, 24.203843],
                                        [113.905697050781, 24.1869704414063],
                                        [113.891097441406, 24.1902443671875],
                                        [113.859132109375, 24.1681716132813],
                                        [113.865611601563, 24.1392702460938],
                                        [113.831065703125, 24.1195510078125],
                                        [113.833465605469, 24.108843],
                                        [113.831224394531, 24.098843],
                                        [113.8367590625, 24.0741506171875],
                                        [113.795513945313, 24.0456740546876],
                                        [113.783016386719, 24.0275710273438],
                                        [113.772303496094, 24.0299733710938],
                                        [113.747345, 24.023843],
                                        [113.743260527344, 24.0597585273438],
                                        [113.727078886719, 24.0846096015625],
                                        [113.67201296875, 24.0675417304688],
                                        [113.615135527344, 24.1051271796876],
                                        [113.603016386719, 24.0875710273438],
                                        [113.591839628906, 24.0900759101563],
                                        [113.56060671875, 24.0658693671876],
                                        [113.531925078125, 24.0723000312501],
                                        [113.523260527344, 24.0279274726563],
                                        [113.510960722656, 23.9986452460938],
                                        [113.529454375, 23.9702443671875],
                                        [113.501429472656, 23.9597585273438],
                                        [113.482791777344, 23.947622296875],
                                        [113.445697050781, 23.9559377265625],
                                        [113.42435671875, 23.9250295234375],
                                        [113.402345, 23.9299636054687],
                                        [113.36384890625, 23.9213332343751],
                                        [113.33486453125, 23.9024611640625],
                                        [113.3539075, 23.88931175],
                                        [113.337345, 23.8538430000001],
                                        [113.272110625, 23.8484206367188],
                                        [113.24271609375, 23.85921409375],
                                        [113.20197390625, 23.8684719062501],
                                        [113.19271609375, 23.87921409375],
                                        [113.169034453125, 23.8897829414063],
                                        [113.104405546875, 23.8845900703125],
                                        [113.077901640625, 23.926899640625],
                                        [113.05197390625, 23.93847190625],
                                        [113.014439726563, 23.9594118476563],
                                        [112.993609648438, 23.9577394843751],
                                        [112.979212675781, 24.0522072578126],
                                        [112.922345, 24.0476369453125],
                                        [112.901180449219, 24.0493386054688],
                                        [112.904378691406, 24.0891677070313],
                                        [112.873148222656, 24.1160744453125],
                                        [112.83197390625, 24.12847190625],
                                        [112.82271609375, 24.15921409375],
                                        [112.805496855469, 24.1900807929688],
                                        [112.833492460938, 24.22956565625],
                                        [112.831942167969, 24.248843],
                                        [112.8327746875, 24.2591896796875],
                                        [112.805225859375, 24.2714821601563],
                                        [112.77271609375, 24.30921409375],
                                        [112.757345, 24.313843],
                                        [112.761158476563, 24.3300295234376],
                                        [112.799947539063, 24.3511476875],
                                        [112.812376738281, 24.3472756171875],
                                        [112.852313261719, 24.3604103828125],
                                        [112.869110136719, 24.3551784492188],
                                        [112.881158476563, 24.3891701484375],
                                        [112.847772246094, 24.4097414375],
                                        [112.8682825, 24.4720973945313],
                                        [112.899449492188, 24.4913014960938],
                                        [112.912345, 24.4872853828125],
                                        [112.927345, 24.491958234375],
                                        [112.943446074219, 24.4869435859375],
                                        [112.951243925781, 24.5507424140625],
                                        [112.963150664063, 24.5470339179687],
                                        [112.967345, 24.553843]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });
            define("echarts/util/mapData/geoJson/dongguan", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "name": "东莞市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.837345, 23.1238430000001],
                                        [113.852193632813, 23.118637921875],
                                        [113.882296171875, 23.1198317695313],
                                        [113.972535429688, 23.1090334296875],
                                        [114.015628691406, 23.0862306953126],
                                        [114.079500761719, 23.108618390625],
                                        [114.094881621094, 23.0600417304688],
                                        [114.127345, 23.0538430000001],
                                        [114.131339140625, 23.037837140625],
                                        [114.14486453125, 23.028843],
                                        [114.125379667969, 23.0158864570313],
                                        [114.119686308594, 22.9932912421875],
                                        [114.152345, 22.985063703125],
                                        [114.203040800781, 22.997837140625],
                                        [114.215452910156, 22.9761818671875],
                                        [114.20375125, 22.9297292304688],
                                        [114.227345, 22.923843],
                                        [114.232064238281, 22.9185622382813],
                                        [114.261224394531, 22.9051784492188],
                                        [114.232064238281, 22.8791237617188],
                                        [114.227345, 22.813843],
                                        [114.21197390625, 22.80921409375],
                                        [114.20271609375, 22.7984719062501],
                                        [114.174935332031, 22.7745363593751],
                                        [114.211678496094, 22.7428786445313],
                                        [114.180433378906, 22.6577907539063],
                                        [114.151243925781, 22.6601369453125],
                                        [114.153470488281, 22.6878615546875],
                                        [114.13634890625, 22.7185524726563],
                                        [114.107345, 22.723843],
                                        [114.100794707031, 22.7272927070313],
                                        [114.092345, 22.75558128125],
                                        [114.072345, 22.74659690625],
                                        [114.051495390625, 22.7559645820313],
                                        [114.04330203125, 22.77151878125],
                                        [114.032345, 22.76659690625],
                                        [114.022345, 22.77108909375],
                                        [114.003238554688, 22.7625051093751],
                                        [113.983895292969, 22.8003932929688],
                                        [113.950794707031, 22.8172927070313],
                                        [113.943895292969, 22.8303932929688],
                                        [113.900794707031, 22.8372927070313],
                                        [113.877345, 22.8554714179688],
                                        [113.853895292969, 22.8372927070313],
                                        [113.829566679688, 22.8300270820313],
                                        [113.840374785156, 22.8059719062501],
                                        [113.797694121094, 22.7834938789062],
                                        [113.783895292969, 22.7572927070313],
                                        [113.757345, 22.7438430000001],
                                        [113.713062773438, 22.7612502265626],
                                        [113.70298953125, 22.74819846875],
                                        [113.686143828125, 22.73948753125],
                                        [113.65298953125, 22.75948753125],
                                        [113.637345, 22.763843],
                                        [113.613260527344, 22.7997585273437],
                                        [113.571429472656, 22.8479274726563],
                                        [113.567345, 22.8638430000001],
                                        [113.563985625, 22.900483625],
                                        [113.520704375, 22.987202375],
                                        [113.517345, 23.033843],
                                        [113.533260527344, 23.0579274726563],
                                        [113.547345, 23.0838430000001],
                                        [113.567345, 23.0838430000001],
                                        [113.601790800781, 23.0993971992188],
                                        [113.632899199219, 23.1082888007813],
                                        [113.642799101563, 23.1206520820313],
                                        [113.662650175781, 23.1181838203125],
                                        [113.716529570313, 23.14144065625],
                                        [113.821790800781, 23.1282888007813],
                                        [113.837345, 23.1238430000001]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });
            define("echarts/util/mapData/geoJson/zhongshan", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "name": "中山市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.587345, 22.5138430000001],
                                        [113.582908964844, 22.5570851875],
                                        [113.573624296875, 22.521977765625],
                                        [113.569637480469, 22.4759206367188],
                                        [113.573616972656, 22.4581716132813],
                                        [113.555513945313, 22.4456740546876],
                                        [113.547345, 22.413843],
                                        [113.491790800781, 22.4093971992187],
                                        [113.480477324219, 22.3952663398438],
                                        [113.493079863281, 22.3284352851563],
                                        [113.470553007813, 22.310395734375],
                                        [113.487323027344, 22.2818679023438],
                                        [113.51107546875, 22.2628469062501],
                                        [113.481790800781, 22.2393971992188],
                                        [113.472899199219, 22.2282888007813],
                                        [113.452093535156, 22.2116310859376],
                                        [113.407345, 22.203843],
                                        [113.3857825, 22.23507346875],
                                        [113.340513945313, 22.2520119453125],
                                        [113.313260527344, 22.3297585273438],
                                        [113.278533964844, 22.382309796875],
                                        [113.247345, 22.4038430000001],
                                        [113.241209746094, 22.4639943671875],
                                        [113.214534941406, 22.511801984375],
                                        [113.177345, 22.543843],
                                        [113.17123171875, 22.5927223945313],
                                        [113.157345, 22.603843],
                                        [113.148944121094, 22.6238430000001],
                                        [113.163543730469, 22.6586037421875],
                                        [113.157345, 22.683843],
                                        [113.192010527344, 22.6758107734376],
                                        [113.20170046875, 22.6994875312501],
                                        [113.231082792969, 22.7391164375],
                                        [113.246263457031, 22.74819846875],
                                        [113.262110625, 22.7276686835938],
                                        [113.28170046875, 22.73948753125],
                                        [113.32298953125, 22.74819846875],
                                        [113.350238066406, 22.7646364570313],
                                        [113.357345, 22.773843],
                                        [113.415872832031, 22.7405690742187],
                                        [113.44197390625, 22.73847190625],
                                        [113.447345, 22.733843],
                                        [113.532655058594, 22.6716579414063],
                                        [113.531803007813, 22.6501686835938],
                                        [113.552154570313, 22.6186525703125],
                                        [113.577345, 22.603843],
                                        [113.570909453125, 22.5881789375001],
                                        [113.614908476563, 22.5765700507813],
                                        [113.603170195313, 22.5180178046875],
                                        [113.587345, 22.5138430000001]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });
            define("echarts/util/mapData/geoJson/chaozhou", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "name": "潮安县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [116.757345, 23.903843],
                                        [116.745152617188, 23.9004201484376],
                                        [116.753922148438, 23.8916506171875],
                                        [116.790631132813, 23.879985578125],
                                        [116.7512121875, 23.8695851875],
                                        [116.75341921875, 23.8584108710938],
                                        [116.741519804688, 23.8396681953125],
                                        [116.733170195313, 23.8180178046875],
                                        [116.709561796875, 23.801098859375],
                                        [116.723170195313, 23.7796681953126],
                                        [116.727345, 23.753843],
                                        [116.669464140625, 23.7315944648438],
                                        [116.642232695313, 23.7282057929688],
                                        [116.57326296875, 23.7412136054688],
                                        [116.570123320313, 23.715981671875],
                                        [116.585592070313, 23.6792702460938],
                                        [116.623023710938, 23.6492971015626],
                                        [116.620548125, 23.6293971992188],
                                        [116.713702421875, 23.6664650703126],
                                        [116.734195585938, 23.715102765625],
                                        [116.767345, 23.7338430000001],
                                        [116.774498320313, 23.7059645820313],
                                        [116.795694609375, 23.7107155585938],
                                        [116.81142703125, 23.6879274726563],
                                        [116.82857546875, 23.67608909375],
                                        [116.81060671875, 23.6484963203126],
                                        [116.817345, 23.643843],
                                        [116.822867460938, 23.6185158515626],
                                        [116.79197390625, 23.60921409375],
                                        [116.779205351563, 23.5805983710938],
                                        [116.752022734375, 23.5784157539063],
                                        [116.726124296875, 23.6084719062501],
                                        [116.703116484375, 23.5934206367188],
                                        [116.701920195313, 23.5785646796875],
                                        [116.712926054688, 23.558843],
                                        [116.700240507813, 23.5361061835938],
                                        [116.707345, 23.4638430000001],
                                        [116.697345, 23.4638430000001],
                                        [116.697345, 23.4338430000001],
                                        [116.632022734375, 23.4284133125],
                                        [116.627345, 23.4338430000001],
                                        [116.621597929688, 23.4676686835938],
                                        [116.554986601563, 23.4817263007813],
                                        [116.53298953125, 23.5250441718751],
                                        [116.563160429688, 23.5483303046875],
                                        [116.561607695313, 23.558843],
                                        [116.563170195313, 23.5694142890626],
                                        [116.5335559375, 23.5815309882813],
                                        [116.52298953125, 23.61948753125],
                                        [116.51000125, 23.6525246406251],
                                        [116.4434778125, 23.6797487617188],
                                        [116.431832304688, 23.6780275703125],
                                        [116.42298953125, 23.6894875312501],
                                        [116.40170046875, 23.69819846875],
                                        [116.372340117188, 23.7159108710938],
                                        [116.367345, 23.7338430000001],
                                        [116.419263945313, 23.7878786445313],
                                        [116.46224734375, 23.7587429023438],
                                        [116.489678984375, 23.7489430976562],
                                        [116.514293242188, 23.8362136054688],
                                        [116.492144804688, 23.8688942695313],
                                        [116.51244265625, 23.8787429023438],
                                        [116.562252226563, 23.9089479804688],
                                        [116.582633085938, 23.9085305],
                                        [116.602642851563, 23.9293556953126],
                                        [116.602242460938, 23.948843],
                                        [116.602554960938, 23.9642433906251],
                                        [116.63244265625, 23.9787429023438],
                                        [116.64224734375, 23.9889430976563],
                                        [116.68244265625, 23.9987429023438],
                                        [116.687345, 24.0038430000001],
                                        [116.697345, 24.0038430000001],
                                        [116.714215117188, 23.9921950507813],
                                        [116.711104765625, 23.97831565625],
                                        [116.750289335938, 23.9313283515626],
                                        [116.757345, 23.903843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "饶平县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [117.077345, 23.563843],
                                        [117.0541028125, 23.568843],
                                        [117.077345, 23.573843],
                                        [117.077345, 23.563843]
                                    ]
                                ],
                                [
                                    [
                                        [117.017345, 23.573843],
                                        [117.028424101563, 23.5881984687501],
                                        [117.040767851563, 23.5646364570313],
                                        [117.017345, 23.573843]
                                    ]
                                ],
                                [
                                    [
                                        [116.757345, 23.903843],
                                        [116.753922148438, 23.8916506171875],
                                        [116.745152617188, 23.9004201484376],
                                        [116.757345, 23.903843]
                                    ]
                                ],
                                [
                                    [
                                        [117.077345, 23.563843],
                                        [117.090152617188, 23.568843],
                                        [117.077345, 23.573843],
                                        [117.084307890625, 23.5907888007813],
                                        [117.064078398438, 23.64323753125],
                                        [117.049771757813, 23.6232741523438],
                                        [117.022345, 23.6178542304688],
                                        [116.983619414063, 23.6255080390625],
                                        [116.960367460938, 23.608843],
                                        [116.981295195313, 23.593843],
                                        [116.953170195313, 23.5736843085938],
                                        [116.975616484375, 23.5545192695313],
                                        [117.017345, 23.573843],
                                        [117.013170195313, 23.5580178046875],
                                        [117.001519804688, 23.5396681953125],
                                        [116.989947539063, 23.5096681953125],
                                        [116.935045195313, 23.52159690625],
                                        [116.917345, 23.553843],
                                        [116.91326296875, 23.5597585273437],
                                        [116.898878203125, 23.6183180976563],
                                        [116.86142703125, 23.6279274726562],
                                        [116.85326296875, 23.6397585273438],
                                        [116.817345, 23.643843],
                                        [116.81060671875, 23.6484963203126],
                                        [116.82857546875, 23.67608909375],
                                        [116.81142703125, 23.6879274726563],
                                        [116.795694609375, 23.7107155585938],
                                        [116.774498320313, 23.7059645820313],
                                        [116.767345, 23.7338430000001],
                                        [116.762432890625, 23.7770314765626],
                                        [116.727345, 23.753843],
                                        [116.723170195313, 23.7796681953126],
                                        [116.709561796875, 23.801098859375],
                                        [116.733170195313, 23.8180178046875],
                                        [116.741519804688, 23.8396681953125],
                                        [116.75341921875, 23.8584108710938],
                                        [116.7512121875, 23.8695851875],
                                        [116.790631132813, 23.879985578125],
                                        [116.757345, 23.903843],
                                        [116.750289335938, 23.9313283515626],
                                        [116.711104765625, 23.97831565625],
                                        [116.714215117188, 23.9921950507813],
                                        [116.697345, 24.0038430000001],
                                        [116.7052746875, 24.0240138984375],
                                        [116.699742460938, 24.0614430976563],
                                        [116.72869265625, 24.0571657539063],
                                        [116.74298953125, 24.06819846875],
                                        [116.751832304688, 24.0796584296876],
                                        [116.76623171875, 24.0775295234375],
                                        [116.759429960938, 24.1235866523438],
                                        [116.796715117188, 24.1718923164063],
                                        [116.822735625, 24.1680471015626],
                                        [116.849400664063, 24.1841335273438],
                                        [116.865719023438, 24.162993390625],
                                        [116.893140898438, 24.208452375],
                                        [116.890318632813, 24.2275539375],
                                        [116.927345, 24.2338430000001],
                                        [116.930704375, 24.227202375],
                                        [116.953985625, 24.220483625],
                                        [116.960704375, 24.207202375],
                                        [116.98287234375, 24.1959865546875],
                                        [116.987345, 24.173843],
                                        [116.92298953125, 24.1254006171875],
                                        [116.93170046875, 24.06819846875],
                                        [116.943140898438, 24.049233625],
                                        [116.94095828125, 24.0344509101562],
                                        [116.951773710938, 24.0080202460938],
                                        [116.971300078125, 24.0109059882813],
                                        [116.973082304688, 23.9988430000001],
                                        [116.970865507813, 23.983843],
                                        [116.97670046875, 23.9443556953125],
                                        [116.960362578125, 23.9172658515625],
                                        [116.964561796875, 23.8888430000001],
                                        [116.960284453125, 23.8598854804687],
                                        [116.972345, 23.8581032539063],
                                        [116.997086210938, 23.8617604804688],
                                        [117.02093875, 23.8433498359375],
                                        [117.023824492188, 23.823843],
                                        [117.02156375, 23.80855003125],
                                        [117.04162234375, 23.7575221992188],
                                        [117.051768828125, 23.6978054023438],
                                        [117.10127078125, 23.6611037421876],
                                        [117.165030546875, 23.6433498359375],
                                        [117.18298953125, 23.62948753125],
                                        [117.187345, 23.6238430000001],
                                        [117.18326296875, 23.6179274726563],
                                        [117.1489075, 23.60507346875],
                                        [117.1205871875, 23.5640529609375],
                                        [117.083013945313, 23.555630109375],
                                        [117.077345, 23.563843]
                                    ],
                                    [
                                        [116.935152617188, 23.5372658515625],
                                        [116.947345, 23.533843],
                                        [116.943922148438, 23.5460353828125],
                                        [116.935152617188, 23.5372658515625]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "湘桥区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [116.767345, 23.7338430000001],
                                        [116.734195585938, 23.715102765625],
                                        [116.713702421875, 23.6664650703126],
                                        [116.620548125, 23.6293971992188],
                                        [116.623023710938, 23.6492971015626],
                                        [116.585592070313, 23.6792702460938],
                                        [116.570123320313, 23.715981671875],
                                        [116.57326296875, 23.7412136054688],
                                        [116.642232695313, 23.7282057929688],
                                        [116.669464140625, 23.7315944648438],
                                        [116.727345, 23.753843],
                                        [116.762432890625, 23.7770314765626],
                                        [116.767345, 23.7338430000001]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });
            define("echarts/util/mapData/geoJson/jieyang", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "name": "榕城区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [116.347345, 23.453843],
                                        [116.359537382813, 23.4504201484376],
                                        [116.350767851563, 23.4416506171875],
                                        [116.347345, 23.453843]
                                    ]
                                ],
                                [
                                    [
                                        [116.347345, 23.453843],
                                        [116.333985625, 23.4472023750001],
                                        [116.317345, 23.443843],
                                        [116.309718046875, 23.4562184882813],
                                        [116.2795325, 23.4748171210938],
                                        [116.290382109375, 23.5096486640625],
                                        [116.267345, 23.523843],
                                        [116.3123840625, 23.583676984375],
                                        [116.357345, 23.5903200507813],
                                        [116.372345, 23.5881032539062],
                                        [116.391300078125, 23.5909059882813],
                                        [116.393082304688, 23.5788430000001],
                                        [116.391519804688, 23.5682497382813],
                                        [116.430045195313, 23.5575221992188],
                                        [116.45298953125, 23.51948753125],
                                        [116.457345, 23.5038430000001],
                                        [116.43380984375, 23.4697585273438],
                                        [116.413121367188, 23.4834084296875],
                                        [116.402066679688, 23.5129518867187],
                                        [116.355728789063, 23.4865041328125],
                                        [116.347345, 23.453843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "惠来县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [115.947345, 23.0138430000001],
                                        [115.959537382813, 23.0172658515625],
                                        [115.950767851563, 23.0260353828126],
                                        [115.91861453125, 23.018843],
                                        [115.96107546875, 23.05284690625],
                                        [115.926978789063, 23.0801540351563],
                                        [115.917345, 23.113843],
                                        [115.93326296875, 23.1097585273438],
                                        [115.972999296875, 23.0930666328125],
                                        [115.991676054688, 23.1201149726563],
                                        [116.002345, 23.1177223945313],
                                        [116.013013945313, 23.1201149726563],
                                        [116.0270715625, 23.0997585273438],
                                        [116.04326296875, 23.1079274726563],
                                        [116.06349734375, 23.1879274726563],
                                        [116.098468046875, 23.1734743476563],
                                        [116.134639921875, 23.1454396796875],
                                        [116.152271757813, 23.170981671875],
                                        [116.193013945313, 23.1801149726563],
                                        [116.214483671875, 23.1490212226563],
                                        [116.247345, 23.143843],
                                        [116.252349882813, 23.124341046875],
                                        [116.29142703125, 23.1079274726563],
                                        [116.330181914063, 23.0979811835938],
                                        [116.34142703125, 23.0679274726563],
                                        [116.36326296875, 23.0597585273438],
                                        [116.376178007813, 23.0410524726563],
                                        [116.42326296875, 23.0679274726563],
                                        [116.442271757813, 23.09546409375],
                                        [116.482345, 23.10444846875],
                                        [116.512388945313, 23.0977126289062],
                                        [116.537345, 23.103843],
                                        [116.553463164063, 23.09140159375],
                                        [116.54834109375, 23.0567482734375],
                                        [116.5633996875, 23.0184450507813],
                                        [116.523878203125, 22.994809796875],
                                        [116.5001965625, 22.9369435859376],
                                        [116.451671171875, 22.9441139960938],
                                        [116.37861453125, 22.9271852851563],
                                        [116.333746367188, 22.9455471015626],
                                        [116.31654421875, 22.9678395820313],
                                        [116.2610559375, 22.9451296210938],
                                        [116.23298953125, 22.92819846875],
                                        [116.217345, 22.923843],
                                        [116.198238554688, 22.932583234375],
                                        [116.172232695313, 22.9236525703125],
                                        [116.161329375, 22.8906081367188],
                                        [116.132345, 22.9005593085938],
                                        [116.112345, 22.8936916328126],
                                        [116.0833996875, 22.9036330390625],
                                        [116.073624296875, 22.920122296875],
                                        [116.041065703125, 22.9275637031251],
                                        [116.022799101563, 22.9407155585938],
                                        [116.012345, 22.9371266914063],
                                        [116.002345, 22.9405593085938],
                                        [115.987345, 22.9354079414063],
                                        [115.9633996875, 22.9436330390625],
                                        [115.953189726563, 22.9608498359375],
                                        [115.941295195313, 22.9567653632813],
                                        [115.933624296875, 22.9838527656251],
                                        [115.947345, 23.0138430000001]
                                    ],
                                    [
                                        [115.965152617188, 22.9672658515625],
                                        [115.977345, 22.963843],
                                        [115.973922148438, 22.9760353828125],
                                        [115.965152617188, 22.9672658515625]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "揭东县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [116.117345, 23.533843],
                                        [116.127345, 23.533843],
                                        [116.122345, 23.5210353828126],
                                        [116.117345, 23.533843]
                                    ]
                                ],
                                [
                                    [
                                        [116.127345, 23.533843],
                                        [116.122345, 23.5466506171875],
                                        [116.117345, 23.533843],
                                        [116.094293242188, 23.5464797187501],
                                        [116.114449492188, 23.588735578125],
                                        [116.110284453125, 23.598843],
                                        [116.114449492188, 23.608950421875],
                                        [116.107345, 23.6238430000001],
                                        [116.14896609375, 23.6171340156251],
                                        [116.183472929688, 23.6447658515626],
                                        [116.1791809375, 23.6792971015625],
                                        [116.202896757813, 23.6982888007813],
                                        [116.21634890625, 23.7302101875],
                                        [116.237100859375, 23.7276296210938],
                                        [116.262896757813, 23.7482888007812],
                                        [116.27736453125, 23.7663576484376],
                                        [116.32005984375, 23.7716677070313],
                                        [116.367345, 23.7338430000001],
                                        [116.372340117188, 23.7159108710938],
                                        [116.40170046875, 23.69819846875],
                                        [116.42298953125, 23.6894875312501],
                                        [116.431832304688, 23.6780275703125],
                                        [116.4434778125, 23.6797487617188],
                                        [116.51000125, 23.6525246406251],
                                        [116.52298953125, 23.61948753125],
                                        [116.5335559375, 23.5815309882813],
                                        [116.563170195313, 23.5694142890626],
                                        [116.561607695313, 23.558843],
                                        [116.563160429688, 23.5483303046875],
                                        [116.53298953125, 23.5250441718751],
                                        [116.554986601563, 23.4817263007813],
                                        [116.621597929688, 23.4676686835938],
                                        [116.627345, 23.4338430000001],
                                        [116.611158476563, 23.4376564765625],
                                        [116.575201445313, 23.4667775703125],
                                        [116.586202421875, 23.4314577460938],
                                        [116.571158476563, 23.4100295234376],
                                        [116.567345, 23.383843],
                                        [116.56224734375, 23.3887429023438],
                                        [116.532545195313, 23.4340431953126],
                                        [116.467574492188, 23.4498805976563],
                                        [116.491900664063, 23.4970973945313],
                                        [116.457345, 23.5038430000001],
                                        [116.45298953125, 23.51948753125],
                                        [116.430045195313, 23.5575221992188],
                                        [116.391519804688, 23.5682497382813],
                                        [116.393082304688, 23.5788430000001],
                                        [116.391300078125, 23.5909059882813],
                                        [116.372345, 23.5881032539062],
                                        [116.357345, 23.5903200507813],
                                        [116.3123840625, 23.583676984375],
                                        [116.267345, 23.523843],
                                        [116.180704375, 23.5204836250001],
                                        [116.167345, 23.513843],
                                        [116.16298953125, 23.51948753125],
                                        [116.127345, 23.533843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "揭西县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [116.127345, 23.533843],
                                        [116.117345, 23.533843],
                                        [116.122345, 23.5466506171875],
                                        [116.127345, 23.533843]
                                    ]
                                ],
                                [
                                    [
                                        [116.117345, 23.533843],
                                        [116.122345, 23.5210353828126],
                                        [116.127345, 23.533843],
                                        [116.16298953125, 23.51948753125],
                                        [116.167345, 23.513843],
                                        [116.17142703125, 23.4979274726563],
                                        [116.184229765625, 23.4890895820313],
                                        [116.15142703125, 23.4497585273438],
                                        [116.14326296875, 23.4279274726563],
                                        [116.12142703125, 23.4197585273438],
                                        [116.105694609375, 23.3969704414063],
                                        [116.091842070313, 23.4000759101563],
                                        [116.053873320313, 23.3706545234375],
                                        [116.004459257813, 23.3817311835938],
                                        [115.977345, 23.3640749335938],
                                        [115.942345, 23.3868679023438],
                                        [115.91326296875, 23.3679274726563],
                                        [115.897345, 23.363843],
                                        [115.893922148438, 23.3760353828126],
                                        [115.885152617188, 23.3672658515625],
                                        [115.897345, 23.363843],
                                        [115.859464140625, 23.3135158515626],
                                        [115.83298953125, 23.32948753125],
                                        [115.817345, 23.333843],
                                        [115.81271609375, 23.3392140937501],
                                        [115.80197390625, 23.34847190625],
                                        [115.773316679688, 23.381733625],
                                        [115.716182890625, 23.3771413398438],
                                        [115.668043242188, 23.3502834296875],
                                        [115.6727746875, 23.4091677070312],
                                        [115.624224882813, 23.4509938789063],
                                        [115.617345, 23.4738430000001],
                                        [115.62170046875, 23.50948753125],
                                        [115.63298953125, 23.5181984687501],
                                        [115.642320585938, 23.5302907539063],
                                        [115.68252078125, 23.5600930000001],
                                        [115.715928984375, 23.5168068671875],
                                        [115.787569609375, 23.5289772773437],
                                        [115.8052746875, 23.5740138984375],
                                        [115.801607695313, 23.598843],
                                        [115.803082304688, 23.608843],
                                        [115.799166289063, 23.6353639960938],
                                        [115.83170046875, 23.65948753125],
                                        [115.847345, 23.6638430000001],
                                        [115.853531523438, 23.6600295234375],
                                        [115.869283476563, 23.6344680000001],
                                        [115.892740507813, 23.6271633125],
                                        [115.93740359375, 23.6423830390625],
                                        [115.983721953125, 23.6822365546875],
                                        [116.003531523438, 23.6700295234375],
                                        [116.0183215625, 23.6460329414063],
                                        [116.032740507813, 23.6505226875],
                                        [116.063531523438, 23.6400295234376],
                                        [116.0849621875, 23.6249855781251],
                                        [116.103150664063, 23.6306520820312],
                                        [116.107345, 23.6238430000001],
                                        [116.114449492188, 23.608950421875],
                                        [116.110284453125, 23.598843],
                                        [116.114449492188, 23.588735578125],
                                        [116.094293242188, 23.5464797187501],
                                        [116.117345, 23.533843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "普宁市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [115.897345, 23.363843],
                                        [115.885152617188, 23.3672658515625],
                                        [115.893922148438, 23.3760353828126],
                                        [115.897345, 23.363843]
                                    ]
                                ],
                                [
                                    [
                                        [115.897345, 23.363843],
                                        [115.91326296875, 23.3679274726563],
                                        [115.942345, 23.3868679023438],
                                        [115.977345, 23.3640749335938],
                                        [116.004459257813, 23.3817311835938],
                                        [116.053873320313, 23.3706545234375],
                                        [116.091842070313, 23.4000759101563],
                                        [116.105694609375, 23.3969704414063],
                                        [116.12142703125, 23.4197585273438],
                                        [116.14326296875, 23.4279274726563],
                                        [116.15142703125, 23.4497585273438],
                                        [116.184229765625, 23.4890895820313],
                                        [116.17142703125, 23.4979274726563],
                                        [116.167345, 23.513843],
                                        [116.180704375, 23.5204836250001],
                                        [116.267345, 23.523843],
                                        [116.290382109375, 23.5096486640625],
                                        [116.2795325, 23.4748171210938],
                                        [116.309718046875, 23.4562184882813],
                                        [116.317345, 23.443843],
                                        [116.32170046875, 23.42819846875],
                                        [116.343463164063, 23.41140159375],
                                        [116.341607695313, 23.398843],
                                        [116.350767851563, 23.336860578125],
                                        [116.323389921875, 23.3409059882813],
                                        [116.32158328125, 23.3287013984376],
                                        [116.327345, 23.303843],
                                        [116.309654570313, 23.2989162421875],
                                        [116.285167265625, 23.2390920234375],
                                        [116.260128203125, 23.228843],
                                        [116.263140898438, 23.2084523750001],
                                        [116.251549101563, 23.189233625],
                                        [116.2530871875, 23.1788088203125],
                                        [116.247345, 23.143843],
                                        [116.214483671875, 23.1490212226563],
                                        [116.193013945313, 23.1801149726563],
                                        [116.152271757813, 23.170981671875],
                                        [116.134639921875, 23.1454396796875],
                                        [116.098468046875, 23.1734743476563],
                                        [116.06349734375, 23.1879274726563],
                                        [116.04326296875, 23.1079274726563],
                                        [116.0270715625, 23.0997585273438],
                                        [116.013013945313, 23.1201149726563],
                                        [116.002345, 23.1177223945313],
                                        [115.991676054688, 23.1201149726563],
                                        [115.972999296875, 23.0930666328125],
                                        [115.93326296875, 23.1097585273438],
                                        [115.917345, 23.113843],
                                        [115.911793242188, 23.1182888007813],
                                        [115.902799101563, 23.1295217109376],
                                        [115.866261015625, 23.1249758125001],
                                        [115.84634890625, 23.10011253125],
                                        [115.822896757813, 23.1293971992188],
                                        [115.767345, 23.143843],
                                        [115.767345, 23.153843],
                                        [115.780152617188, 23.1588430000001],
                                        [115.767345, 23.1638430000001],
                                        [115.73392703125, 23.1731496406251],
                                        [115.727506132813, 23.2165895820313],
                                        [115.748424101563, 23.1894875312501],
                                        [115.7530871875, 23.2188185859375],
                                        [115.748878203125, 23.2473073554688],
                                        [115.82170046875, 23.2596804023438],
                                        [115.81298953125, 23.27948753125],
                                        [115.79375125, 23.2943361640625],
                                        [115.790924101563, 23.3134499335938],
                                        [115.817345, 23.333843],
                                        [115.83298953125, 23.32948753125],
                                        [115.859464140625, 23.3135158515626],
                                        [115.897345, 23.363843]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });
            define("echarts/util/mapData/geoJson/guangzhou", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "name": "海珠区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.383260527344, 23.1097585273438],
                                        [113.407345, 23.103843],
                                        [113.407345, 23.0838430000001],
                                        [113.397345, 23.0838430000001],
                                        [113.351756621094, 23.0478762031251],
                                        [113.267345, 23.0538430000001],
                                        [113.23970828125, 23.0956618476563],
                                        [113.247345, 23.113843],
                                        [113.301888457031, 23.1070290351563],
                                        [113.307345, 23.113843],
                                        [113.383260527344, 23.1097585273438]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "番禺区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.397345, 23.0838430000001],
                                        [113.402074003906, 23.0654201484376],
                                        [113.455223417969, 23.0773342109375],
                                        [113.487345, 23.063843],
                                        [113.50062625, 23.05712425],
                                        [113.510704375, 23.0372023750001],
                                        [113.517345, 23.033843],
                                        [113.520704375, 22.987202375],
                                        [113.563985625, 22.900483625],
                                        [113.567345, 22.8638430000001],
                                        [113.551790800781, 22.8682888007813],
                                        [113.516182890625, 22.8819777656251],
                                        [113.482110625, 22.86194846875],
                                        [113.47166140625, 22.7783962226562],
                                        [113.484832792969, 22.76784690625],
                                        [113.456239042969, 22.7449489570313],
                                        [113.447345, 22.733843],
                                        [113.44197390625, 22.73847190625],
                                        [113.415872832031, 22.7405690742187],
                                        [113.357345, 22.773843],
                                        [113.362535429688, 22.7910842109375],
                                        [113.391810332031, 22.8163063789063],
                                        [113.31197390625, 22.82847190625],
                                        [113.291937285156, 22.8812721992188],
                                        [113.271807890625, 22.8986135078125],
                                        [113.285338164063, 22.9480446601563],
                                        [113.253900175781, 22.9620729804688],
                                        [113.247345, 22.983843],
                                        [113.254793730469, 22.9988283515625],
                                        [113.2474621875, 23.0138430000001],
                                        [113.254793730469, 23.0288576484375],
                                        [113.247345, 23.0438430000001],
                                        [113.247345, 23.0538430000001],
                                        [113.267345, 23.0538430000001],
                                        [113.351756621094, 23.0478762031251],
                                        [113.397345, 23.0838430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "白云区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.4620325, 23.3991042304688],
                                        [113.462642851563, 23.3888430000001],
                                        [113.462047148438, 23.378843],
                                        [113.463238554688, 23.3588430000001],
                                        [113.461470976563, 23.3291921210938],
                                        [113.472345, 23.3285451484375],
                                        [113.491453886719, 23.32968284375],
                                        [113.502779570313, 23.308843],
                                        [113.491859160156, 23.28874534375],
                                        [113.508660917969, 23.2737331367188],
                                        [113.459310332031, 23.2392604804688],
                                        [113.432254667969, 23.2695412421875],
                                        [113.422611113281, 23.2485280585938],
                                        [113.41209109375, 23.2491555000001],
                                        [113.402625761719, 23.2385622382813],
                                        [113.397345, 23.2338430000001],
                                        [113.391673613281, 23.242055890625],
                                        [113.352320585938, 23.2332326484375],
                                        [113.341329375, 23.1904030585938],
                                        [113.311429472656, 23.1697585273438],
                                        [113.307345, 23.1638430000001],
                                        [113.267408476563, 23.1540334296876],
                                        [113.241690703125, 23.1707814765625],
                                        [113.237345, 23.153843],
                                        [113.222359648438, 23.1463942695313],
                                        [113.211353789063, 23.1517678046875],
                                        [113.207345, 23.143843],
                                        [113.173267851563, 23.153843],
                                        [113.203834257813, 23.179233625],
                                        [113.20150515625, 23.2020803046875],
                                        [113.181883574219, 23.2183815742188],
                                        [113.17107546875, 23.2313893867188],
                                        [113.174681425781, 23.2667629218751],
                                        [113.147345, 23.303843],
                                        [113.155406523438, 23.3682888007812],
                                        [113.202899199219, 23.3593971992187],
                                        [113.215538359375, 23.3293971992188],
                                        [113.25302859375, 23.3483547187501],
                                        [113.251390410156, 23.3615236640625],
                                        [113.295972929688, 23.3877321601563],
                                        [113.332899199219, 23.3982888007813],
                                        [113.3779309375, 23.4155983710938],
                                        [113.396175566406, 23.3928151679688],
                                        [113.432899199219, 23.4082888007812],
                                        [113.441790800781, 23.4193971992188],
                                        [113.467345, 23.423843],
                                        [113.487345, 23.423843],
                                        [113.487345, 23.413843],
                                        [113.4620325, 23.3991042304688]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "从化市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [114.006065703125, 23.9335622382813],
                                        [114.02271609375, 23.91921409375],
                                        [114.027345, 23.903843],
                                        [114.050316191406, 23.8520925117188],
                                        [114.031920195313, 23.8191213203125],
                                        [114.032747832031, 23.8088430000001],
                                        [114.031917753906, 23.7985182929688],
                                        [114.05197390625, 23.7812404609376],
                                        [114.021046171875, 23.7677419257813],
                                        [113.995655546875, 23.7697829414063],
                                        [113.97197390625, 23.75921409375],
                                        [113.953963652344, 23.7383107734375],
                                        [113.934827910156, 23.739848859375],
                                        [113.87271609375, 23.68847190625],
                                        [113.84197390625, 23.6792140937501],
                                        [113.831712675781, 23.6562209296875],
                                        [113.805738554688, 23.633843],
                                        [113.817345, 23.6238430000001],
                                        [113.81271609375, 23.61847190625],
                                        [113.749664335938, 23.60886253125],
                                        [113.72271609375, 23.54847190625],
                                        [113.711920195313, 23.5291213203125],
                                        [113.712801542969, 23.5181716132813],
                                        [113.65271609375, 23.46847190625],
                                        [113.624564238281, 23.4559084296876],
                                        [113.575692167969, 23.4138039375],
                                        [113.56197390625, 23.38921409375],
                                        [113.557345, 23.373843],
                                        [113.541429472656, 23.3779274726563],
                                        [113.51201296875, 23.3970827460938],
                                        [113.503260527344, 23.4097585273438],
                                        [113.487345, 23.413843],
                                        [113.487345, 23.423843],
                                        [113.467345, 23.423843],
                                        [113.452899199219, 23.4793971992188],
                                        [113.430479765625, 23.488843],
                                        [113.436553984375, 23.5376882148438],
                                        [113.351790800781, 23.5482888007813],
                                        [113.342899199219, 23.5593971992188],
                                        [113.321441679688, 23.576577375],
                                        [113.323214140625, 23.5908351875],
                                        [113.281790800781, 23.6082888007813],
                                        [113.277345, 23.613843],
                                        [113.283260527344, 23.6179274726563],
                                        [113.297254667969, 23.6381960273438],
                                        [113.323260527344, 23.6479274726563],
                                        [113.358865996094, 23.7008010078126],
                                        [113.367345, 23.7338430000001],
                                        [113.411783476563, 23.7265431953125],
                                        [113.432857695313, 23.7296584296875],
                                        [113.44170046875, 23.71819846875],
                                        [113.458631621094, 23.7051296210938],
                                        [113.478426542969, 23.6794875312501],
                                        [113.51298953125, 23.68819846875],
                                        [113.549295683594, 23.7024709296876],
                                        [113.596514921875, 23.6643093085937],
                                        [113.63170046875, 23.7226418281251],
                                        [113.62298953125, 23.7594875312501],
                                        [113.607054472656, 23.7859011054688],
                                        [113.62298953125, 23.79819846875],
                                        [113.640809355469, 23.8212868476563],
                                        [113.667345, 23.8173659492188],
                                        [113.687345, 23.8203200507813],
                                        [113.711302519531, 23.8167800117188],
                                        [113.713084746094, 23.828843],
                                        [113.708455839844, 23.8601564765625],
                                        [113.746951933594, 23.8544680000001],
                                        [113.78170046875, 23.89948753125],
                                        [113.797345, 23.903843],
                                        [113.857291289063, 23.930454328125],
                                        [113.882345, 23.9284401679688],
                                        [113.892345, 23.9292458320313],
                                        [113.907345, 23.9280397773438],
                                        [113.922345, 23.9292458320313],
                                        [113.937345, 23.9280397773438],
                                        [114.006065703125, 23.9335622382813]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "花都区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [112.967345, 23.443843],
                                        [112.963922148438, 23.4316506171875],
                                        [112.955152617188, 23.4404201484375],
                                        [112.967345, 23.443843]
                                    ]
                                ],
                                [
                                    [
                                        [112.967345, 23.443843],
                                        [112.967345, 23.453843],
                                        [112.971790800781, 23.4593971992188],
                                        [113.049276152344, 23.4761598945313],
                                        [113.071790800781, 23.4893971992188],
                                        [113.092899199219, 23.4982888007813],
                                        [113.115477324219, 23.5115627265625],
                                        [113.155206328125, 23.5066213203126],
                                        [113.186041289063, 23.519614484375],
                                        [113.203011503906, 23.5484841132813],
                                        [113.199273710938, 23.5785256171875],
                                        [113.251790800781, 23.6093971992188],
                                        [113.277345, 23.613843],
                                        [113.281790800781, 23.6082888007813],
                                        [113.323214140625, 23.5908351875],
                                        [113.321441679688, 23.576577375],
                                        [113.342899199219, 23.5593971992188],
                                        [113.351790800781, 23.5482888007813],
                                        [113.436553984375, 23.5376882148438],
                                        [113.430479765625, 23.488843],
                                        [113.452899199219, 23.4793971992188],
                                        [113.467345, 23.423843],
                                        [113.441790800781, 23.4193971992188],
                                        [113.432899199219, 23.4082888007812],
                                        [113.396175566406, 23.3928151679688],
                                        [113.3779309375, 23.4155983710938],
                                        [113.332899199219, 23.3982888007813],
                                        [113.295972929688, 23.3877321601563],
                                        [113.251390410156, 23.3615236640625],
                                        [113.25302859375, 23.3483547187501],
                                        [113.215538359375, 23.3293971992188],
                                        [113.202899199219, 23.3593971992187],
                                        [113.155406523438, 23.3682888007812],
                                        [113.147345, 23.303843],
                                        [113.121929960938, 23.3100856757813],
                                        [113.103260527344, 23.2979274726563],
                                        [113.069757109375, 23.2853908515625],
                                        [113.0758215625, 23.2583303046875],
                                        [113.047345, 23.253843],
                                        [113.04271609375, 23.27921409375],
                                        [113.031219511719, 23.2998244453125],
                                        [113.032772246094, 23.3191677070313],
                                        [113.021693144531, 23.3287136054688],
                                        [113.041756621094, 23.364673078125],
                                        [113.012623320313, 23.3484181953126],
                                        [112.989364042969, 23.3502883125001],
                                        [112.97271609375, 23.3912404609375],
                                        [112.992996855469, 23.4087136054688],
                                        [112.978997832031, 23.4338039375001],
                                        [112.967345, 23.443843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "黄埔区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.547345, 23.133843],
                                        [113.547345, 23.1238430000001],
                                        [113.523985625, 23.128559796875],
                                        [113.531422148438, 23.1417580390625],
                                        [113.547345, 23.133843]
                                    ]
                                ],
                                [
                                    [
                                        [113.471580839844, 23.1522512031251],
                                        [113.504293242188, 23.1036745429688],
                                        [113.532623320313, 23.1100270820313],
                                        [113.547345, 23.103843],
                                        [113.56062625, 23.09712425],
                                        [113.567345, 23.0838430000001],
                                        [113.547345, 23.0838430000001],
                                        [113.496058378906, 23.0751296210938],
                                        [113.487345, 23.063843],
                                        [113.455223417969, 23.0773342109375],
                                        [113.402074003906, 23.0654201484376],
                                        [113.397345, 23.0838430000001],
                                        [113.407345, 23.0838430000001],
                                        [113.407345, 23.103843],
                                        [113.431329375, 23.1204030585938],
                                        [113.437345, 23.143843],
                                        [113.471580839844, 23.1522512031251]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "荔湾区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.243616972656, 23.1495143867188],
                                        [113.241214628906, 23.1388014960938],
                                        [113.247345, 23.113843],
                                        [113.23970828125, 23.0956618476563],
                                        [113.267345, 23.0538430000001],
                                        [113.247345, 23.0538430000001],
                                        [113.247345, 23.0438430000001],
                                        [113.204989042969, 23.0487795234376],
                                        [113.163170195313, 23.0774660468751],
                                        [113.205357695313, 23.0885964179688],
                                        [113.20025515625, 23.114419171875],
                                        [113.207345, 23.143843],
                                        [113.211353789063, 23.1517678046875],
                                        [113.222359648438, 23.1463942695313],
                                        [113.237345, 23.153843],
                                        [113.243616972656, 23.1495143867188]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "萝岗区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.533260527344, 23.0579274726563],
                                        [113.517345, 23.033843],
                                        [113.510704375, 23.0372023750001],
                                        [113.50062625, 23.05712425],
                                        [113.487345, 23.063843],
                                        [113.496058378906, 23.0751296210938],
                                        [113.547345, 23.0838430000001],
                                        [113.533260527344, 23.0579274726563]
                                    ]
                                ],
                                [
                                    [
                                        [113.417345, 23.173843],
                                        [113.404537382813, 23.178843],
                                        [113.417345, 23.183843],
                                        [113.417345, 23.173843]
                                    ]
                                ],
                                [
                                    [
                                        [113.417345, 23.173843],
                                        [113.430152617188, 23.178843],
                                        [113.417345, 23.183843],
                                        [113.417345, 23.2038430000001],
                                        [113.397345, 23.2038430000001],
                                        [113.397345, 23.2338430000001],
                                        [113.402625761719, 23.2385622382813],
                                        [113.41209109375, 23.2491555000001],
                                        [113.422611113281, 23.2485280585938],
                                        [113.432254667969, 23.2695412421875],
                                        [113.459310332031, 23.2392604804688],
                                        [113.508660917969, 23.2737331367188],
                                        [113.491859160156, 23.28874534375],
                                        [113.502779570313, 23.308843],
                                        [113.491453886719, 23.32968284375],
                                        [113.472345, 23.3285451484375],
                                        [113.461470976563, 23.3291921210938],
                                        [113.463238554688, 23.3588430000001],
                                        [113.462047148438, 23.378843],
                                        [113.462642851563, 23.3888430000001],
                                        [113.4620325, 23.3991042304688],
                                        [113.487345, 23.413843],
                                        [113.503260527344, 23.4097585273438],
                                        [113.51201296875, 23.3970827460938],
                                        [113.541429472656, 23.3779274726563],
                                        [113.557345, 23.373843],
                                        [113.584818144531, 23.3548757148438],
                                        [113.581124296875, 23.3383962226563],
                                        [113.593565703125, 23.3192897773438],
                                        [113.590103789063, 23.303843],
                                        [113.594586210938, 23.2838430000001],
                                        [113.591224394531, 23.268843],
                                        [113.595233183594, 23.2509572578125],
                                        [113.576434355469, 23.2220900703126],
                                        [113.571224394531, 23.1988430000001],
                                        [113.575706816406, 23.178843],
                                        [113.551429472656, 23.1697585273438],
                                        [113.547345, 23.133843],
                                        [113.531422148438, 23.1417580390625],
                                        [113.523985625, 23.128559796875],
                                        [113.547345, 23.1238430000001],
                                        [113.547345, 23.103843],
                                        [113.532623320313, 23.1100270820313],
                                        [113.504293242188, 23.1036745429688],
                                        [113.471580839844, 23.1522512031251],
                                        [113.437345, 23.143843],
                                        [113.430704375, 23.1472023750001],
                                        [113.417345, 23.173843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "南沙区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.652545195313, 22.676157453125],
                                        [113.657345, 22.653843],
                                        [113.633804960938, 22.6667458320313],
                                        [113.652545195313, 22.676157453125]
                                    ]
                                ],
                                [
                                    [
                                        [113.597345, 22.693843],
                                        [113.597345, 22.7038430000001],
                                        [113.587345, 22.7038430000001],
                                        [113.592074003906, 22.7222658515626],
                                        [113.612345, 22.7177223945313],
                                        [113.641429472656, 22.724243390625],
                                        [113.623060332031, 22.6875270820313],
                                        [113.597345, 22.693843]
                                    ]
                                ],
                                [
                                    [
                                        [113.587345, 22.7038430000001],
                                        [113.587345, 22.693843],
                                        [113.597345, 22.693843],
                                        [113.643504667969, 22.638266828125],
                                        [113.641541777344, 22.613843],
                                        [113.644307890625, 22.5794020820313],
                                        [113.632049589844, 22.5784181953125],
                                        [113.60271609375, 22.59921409375],
                                        [113.577345, 22.603843],
                                        [113.552154570313, 22.6186525703125],
                                        [113.531803007813, 22.6501686835938],
                                        [113.532655058594, 22.6716579414063],
                                        [113.447345, 22.733843],
                                        [113.456239042969, 22.7449489570313],
                                        [113.484832792969, 22.76784690625],
                                        [113.47166140625, 22.7783962226562],
                                        [113.482110625, 22.86194846875],
                                        [113.516182890625, 22.8819777656251],
                                        [113.551790800781, 22.8682888007813],
                                        [113.567345, 22.8638430000001],
                                        [113.571429472656, 22.8479274726563],
                                        [113.613260527344, 22.7997585273437],
                                        [113.637345, 22.763843],
                                        [113.603441191406, 22.7477468085938],
                                        [113.543914824219, 22.7388430000001],
                                        [113.573441191406, 22.7199391914063],
                                        [113.581248808594, 22.7077468085938],
                                        [113.587345, 22.7038430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "天河区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.417345, 23.173843],
                                        [113.417345, 23.183843],
                                        [113.430152617188, 23.178843],
                                        [113.417345, 23.173843]
                                    ]
                                ],
                                [
                                    [
                                        [113.417345, 23.183843],
                                        [113.404537382813, 23.178843],
                                        [113.417345, 23.173843],
                                        [113.430704375, 23.1472023750001],
                                        [113.437345, 23.143843],
                                        [113.431329375, 23.1204030585938],
                                        [113.407345, 23.103843],
                                        [113.383260527344, 23.1097585273438],
                                        [113.307345, 23.113843],
                                        [113.301551542969, 23.149106671875],
                                        [113.307345, 23.1638430000001],
                                        [113.311429472656, 23.1697585273438],
                                        [113.341329375, 23.1904030585938],
                                        [113.352320585938, 23.2332326484375],
                                        [113.391673613281, 23.242055890625],
                                        [113.397345, 23.2338430000001],
                                        [113.397345, 23.2038430000001],
                                        [113.417345, 23.2038430000001],
                                        [113.417345, 23.183843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "越秀区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.241690703125, 23.1707814765625],
                                        [113.267408476563, 23.1540334296876],
                                        [113.307345, 23.1638430000001],
                                        [113.301551542969, 23.149106671875],
                                        [113.307345, 23.113843],
                                        [113.301888457031, 23.1070290351563],
                                        [113.247345, 23.113843],
                                        [113.241214628906, 23.1388014960938],
                                        [113.243616972656, 23.1495143867188],
                                        [113.237345, 23.153843],
                                        [113.241690703125, 23.1707814765625]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "增城市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [113.9783996875, 23.3736232734376],
                                        [113.997345, 23.343843],
                                        [113.992154570313, 23.3390334296875],
                                        [113.979705839844, 23.2997096992188],
                                        [113.943436308594, 23.3388552070313],
                                        [113.893990507813, 23.3486525703125],
                                        [113.882535429688, 23.2886525703126],
                                        [113.872017851563, 23.2687770820313],
                                        [113.882535429688, 23.2590334296875],
                                        [113.897323027344, 23.227700421875],
                                        [113.878468046875, 23.1920680976563],
                                        [113.89658328125, 23.1752834296876],
                                        [113.846085234375, 23.151450421875],
                                        [113.837345, 23.1238430000001],
                                        [113.821790800781, 23.1282888007813],
                                        [113.716529570313, 23.14144065625],
                                        [113.662650175781, 23.1181838203125],
                                        [113.642799101563, 23.1206520820313],
                                        [113.632899199219, 23.1082888007813],
                                        [113.601790800781, 23.0993971992188],
                                        [113.567345, 23.0838430000001],
                                        [113.56062625, 23.09712425],
                                        [113.547345, 23.103843],
                                        [113.547345, 23.1238430000001],
                                        [113.547345, 23.133843],
                                        [113.551429472656, 23.1697585273438],
                                        [113.575706816406, 23.178843],
                                        [113.571224394531, 23.1988430000001],
                                        [113.576434355469, 23.2220900703126],
                                        [113.595233183594, 23.2509572578125],
                                        [113.591224394531, 23.268843],
                                        [113.594586210938, 23.2838430000001],
                                        [113.590103789063, 23.303843],
                                        [113.593565703125, 23.3192897773438],
                                        [113.581124296875, 23.3383962226563],
                                        [113.584818144531, 23.3548757148438],
                                        [113.557345, 23.373843],
                                        [113.56197390625, 23.38921409375],
                                        [113.575692167969, 23.4138039375],
                                        [113.624564238281, 23.4559084296876],
                                        [113.65271609375, 23.46847190625],
                                        [113.712801542969, 23.5181716132813],
                                        [113.711920195313, 23.5291213203125],
                                        [113.72271609375, 23.54847190625],
                                        [113.749664335938, 23.60886253125],
                                        [113.81271609375, 23.61847190625],
                                        [113.817345, 23.6238430000001],
                                        [113.856473417969, 23.6170339179688],
                                        [113.850863066406, 23.5719362617188],
                                        [113.896551542969, 23.5148830390626],
                                        [113.941790800781, 23.4882888007813],
                                        [113.975748320313, 23.4785817695313],
                                        [113.94361453125, 23.45284690625],
                                        [113.972899199219, 23.4293971992188],
                                        [113.981790800781, 23.4082888007812],
                                        [113.99334109375, 23.3990431953126],
                                        [113.9783996875, 23.3736232734376]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });

            define("echarts/util/mapData/geoJson/yunfu", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "name": "罗定市"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [111.617345, 22.5138430000001],
                                        [111.613922148438, 22.5016506171876],
                                        [111.605152617188, 22.5104201484375],
                                        [111.617345, 22.5138430000001]
                                    ]
                                ],
                                [
                                    [
                                        [111.787345, 22.793843],
                                        [111.790767851563, 22.8060353828126],
                                        [111.799537382813, 22.7972658515626],
                                        [111.787345, 22.793843]
                                    ]
                                ],
                                [
                                    [
                                        [111.787345, 22.793843],
                                        [111.774713164063, 22.7637697578125],
                                        [111.837738066406, 22.7778981757813],
                                        [111.831041289063, 22.7480275703125],
                                        [111.869115019531, 22.7382570625],
                                        [111.876800566406, 22.7039675117188],
                                        [111.837345, 22.693843],
                                        [111.826058378906, 22.6851296210938],
                                        [111.801033964844, 22.6527126289063],
                                        [111.803148222656, 22.6384133125001],
                                        [111.773697539063, 22.5986940742187],
                                        [111.729163847656, 22.5677223945313],
                                        [111.70291140625, 22.5035768867188],
                                        [111.677345, 22.483843],
                                        [111.673985625, 22.500483625],
                                        [111.630704375, 22.507202375],
                                        [111.617345, 22.5138430000001],
                                        [111.602899199219, 22.5493971992188],
                                        [111.59396609375, 22.5582888007813],
                                        [111.542266875, 22.5205251289063],
                                        [111.525330839844, 22.4803322578125],
                                        [111.492899199219, 22.4993971992188],
                                        [111.46681765625, 22.5082888007813],
                                        [111.4737121875, 22.4528469062501],
                                        [111.423077421875, 22.4315090156251],
                                        [111.401082792969, 22.4837013984376],
                                        [111.404254179688, 22.5091994453125],
                                        [111.3284778125, 22.5202272773437],
                                        [111.305318632813, 22.5173464179688],
                                        [111.272308378906, 22.4979421210938],
                                        [111.262899199219, 22.5042653632812],
                                        [111.288648710938, 22.548071515625],
                                        [111.313516875, 22.55855003125],
                                        [111.287718535156, 22.5938649726563],
                                        [111.224862089844, 22.5860475898437],
                                        [111.192738066406, 22.6095143867188],
                                        [111.17373171875, 22.6071486640625],
                                        [111.135877714844, 22.629399640625],
                                        [111.119281035156, 22.7061183906251],
                                        [111.087345, 22.693843],
                                        [111.060965605469, 22.729184796875],
                                        [111.106522246094, 22.7478322578125],
                                        [111.17263796875, 22.73806175],
                                        [111.222608671875, 22.7577053046875],
                                        [111.243226347656, 22.7844191718751],
                                        [111.28298953125, 22.80819846875],
                                        [111.29170046875, 22.82948753125],
                                        [111.320897246094, 22.8688649726563],
                                        [111.359696074219, 22.898813703125],
                                        [111.367345, 22.943843],
                                        [111.4022278125, 22.9492531562501],
                                        [111.412345, 22.9484401679687],
                                        [111.453411894531, 22.9517409492188],
                                        [111.491358671875, 22.8837258125],
                                        [111.50197390625, 22.84847190625],
                                        [111.551265898438, 22.8372731757813],
                                        [111.552747832031, 22.8188430000001],
                                        [111.551243925781, 22.8001369453125],
                                        [111.574439726563, 22.7982741523438],
                                        [111.612474394531, 22.8194948554688],
                                        [111.629947539063, 22.7992140937501],
                                        [111.65271609375, 22.8084719062501],
                                        [111.674576445313, 22.833843],
                                        [111.727345, 22.803843],
                                        [111.731673613281, 22.7975710273438],
                                        [111.743016386719, 22.8001149726563],
                                        [111.752345, 22.7866017890625],
                                        [111.761695585938, 22.8001442695313],
                                        [111.787345, 22.793843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "新兴县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [112.177345, 22.373843],
                                        [112.189537382813, 22.3704201484375],
                                        [112.180767851563, 22.3616506171875],
                                        [112.177345, 22.373843]
                                    ]
                                ],
                                [
                                    [
                                        [112.177345, 22.373843],
                                        [112.157345, 22.383843],
                                        [112.150347929688, 22.4083107734375],
                                        [112.079537382813, 22.418618390625],
                                        [112.057454863281, 22.4461916328126],
                                        [112.011790800781, 22.4782888007813],
                                        [112.002899199219, 22.4893971992188],
                                        [111.983057890625, 22.5052834296875],
                                        [111.963167753906, 22.5524904609375],
                                        [112.00107546875, 22.58284690625],
                                        [111.981790800781, 22.5982888007813],
                                        [111.957345, 22.6338430000001],
                                        [111.9894934375, 22.6550881171875],
                                        [112.026976347656, 22.646684796875],
                                        [112.043616972656, 22.6581716132812],
                                        [112.039132109375, 22.6781716132813],
                                        [112.064217558594, 22.6954909492188],
                                        [112.060203886719, 22.7133888984376],
                                        [112.101444121094, 22.7746291328125],
                                        [112.153260527344, 22.7879274726562],
                                        [112.161429472656, 22.7997585273437],
                                        [112.167345, 22.803843],
                                        [112.183260527344, 22.8079274726563],
                                        [112.194539824219, 22.8242653632813],
                                        [112.238621855469, 22.8427785468751],
                                        [112.261898222656, 22.8276222968751],
                                        [112.272345, 22.8299636054688],
                                        [112.282386503906, 22.8277126289063],
                                        [112.307345, 22.833843],
                                        [112.310523710938, 22.8270217109375],
                                        [112.330340605469, 22.8177883125001],
                                        [112.318568144531, 22.7972536445313],
                                        [112.374166289063, 22.7906642890625],
                                        [112.380523710938, 22.7770217109376],
                                        [112.387345, 22.773843],
                                        [112.390704375, 22.737202375],
                                        [112.404793730469, 22.7088576484375],
                                        [112.393985625, 22.6867263007813],
                                        [112.421031523438, 22.6713210273438],
                                        [112.440704375, 22.710483625],
                                        [112.467345, 22.713843],
                                        [112.467345, 22.7038430000001],
                                        [112.477345, 22.7038430000001],
                                        [112.508216582031, 22.6394191718751],
                                        [112.517345, 22.603843],
                                        [112.474608183594, 22.5970827460938],
                                        [112.444290800781, 22.6001735664063],
                                        [112.428514433594, 22.6539333320313],
                                        [112.4131653125, 22.6683815742187],
                                        [112.382806425781, 22.5983815742188],
                                        [112.371795683594, 22.5892336250001],
                                        [112.373053007813, 22.5768923164062],
                                        [112.337982207031, 22.547759015625],
                                        [112.320882597656, 22.5495021796875],
                                        [112.322896757813, 22.569262921875],
                                        [112.303499785156, 22.5783815742188],
                                        [112.292806425781, 22.5183815742188],
                                        [112.264908476563, 22.5062795234375],
                                        [112.231529570313, 22.4293190742188],
                                        [112.237345, 22.413843],
                                        [112.192882109375, 22.4024318671875],
                                        [112.177345, 22.373843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "郁南县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [111.877345, 22.8938430000001],
                                        [111.899530058594, 22.890610578125],
                                        [111.880494414063, 22.8722292304688],
                                        [111.877345, 22.8938430000001]
                                    ]
                                ],
                                [
                                    [
                                        [111.877345, 22.8938430000001],
                                        [111.854505644531, 22.8879811835938],
                                        [111.838892851563, 22.846255109375],
                                        [111.812345, 22.8522048164063],
                                        [111.787345, 22.8466017890625],
                                        [111.766312285156, 22.8513161445313],
                                        [111.743260527344, 22.8179274726563],
                                        [111.731429472656, 22.8097585273438],
                                        [111.727345, 22.803843],
                                        [111.674576445313, 22.833843],
                                        [111.65271609375, 22.8084719062501],
                                        [111.629947539063, 22.7992140937501],
                                        [111.612474394531, 22.8194948554688],
                                        [111.574439726563, 22.7982741523438],
                                        [111.551243925781, 22.8001369453125],
                                        [111.552747832031, 22.8188430000001],
                                        [111.551265898438, 22.8372731757813],
                                        [111.50197390625, 22.84847190625],
                                        [111.491358671875, 22.8837258125],
                                        [111.453411894531, 22.9517409492188],
                                        [111.412345, 22.9484401679687],
                                        [111.4022278125, 22.9492531562501],
                                        [111.367345, 22.943843],
                                        [111.357345, 22.943843],
                                        [111.357345, 22.9738430000001],
                                        [111.394366484375, 22.9836110664063],
                                        [111.388521757813, 23.0131862617188],
                                        [111.423170195313, 23.0380178046876],
                                        [111.431519804688, 23.0679933906251],
                                        [111.372757597656, 23.0797756171876],
                                        [111.363170195313, 23.1436843085938],
                                        [111.385186796875, 23.1594631171875],
                                        [111.373343535156, 23.2193947578125],
                                        [111.36127078125, 23.2384108710938],
                                        [111.364925566406, 23.2569020820313],
                                        [111.347821074219, 23.2838430000001],
                                        [111.363170195313, 23.3080178046876],
                                        [111.367345, 23.323843],
                                        [111.41298953125, 23.31948753125],
                                        [111.46248171875, 23.27948753125],
                                        [111.50572390625, 23.2887868476563],
                                        [111.531414824219, 23.3220729804687],
                                        [111.57170046875, 23.2677346015625],
                                        [111.56298953125, 23.2481984687501],
                                        [111.547345, 23.2438430000001],
                                        [111.522899199219, 23.2242653632813],
                                        [111.557977324219, 23.2006935859375],
                                        [111.622899199219, 23.1893971992188],
                                        [111.666561308594, 23.1575026679688],
                                        [111.693033476563, 23.1607936835938],
                                        [111.732899199219, 23.1493971992188],
                                        [111.781619902344, 23.1306667304687],
                                        [111.87656375, 23.1424782539063],
                                        [111.892899199219, 23.1293971992188],
                                        [111.897345, 23.1238430000001],
                                        [111.889132109375, 23.1181716132813],
                                        [111.893465605469, 23.098843],
                                        [111.888983183594, 23.078843],
                                        [111.896197539063, 23.0466628242188],
                                        [111.88033328125, 23.0236891914063],
                                        [111.851483183594, 23.0301564765626],
                                        [111.843260527344, 22.9679274726563],
                                        [111.818521757813, 22.9299367500001],
                                        [111.833260527344, 22.9197585273438],
                                        [111.841673613281, 22.9075710273438],
                                        [111.856976347656, 22.911001203125],
                                        [111.873260527344, 22.8997585273438],
                                        [111.877345, 22.8938430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "云安县"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [111.787345, 22.793843],
                                        [111.799537382813, 22.7972658515626],
                                        [111.790767851563, 22.8060353828126],
                                        [111.761695585938, 22.8001442695313],
                                        [111.752345, 22.7866017890625],
                                        [111.743016386719, 22.8001149726563],
                                        [111.731673613281, 22.7975710273438],
                                        [111.727345, 22.803843],
                                        [111.731429472656, 22.8097585273438],
                                        [111.743260527344, 22.8179274726563],
                                        [111.766312285156, 22.8513161445313],
                                        [111.787345, 22.8466017890625],
                                        [111.812345, 22.8522048164063],
                                        [111.838892851563, 22.846255109375],
                                        [111.854505644531, 22.8879811835938],
                                        [111.877345, 22.8938430000001],
                                        [111.880494414063, 22.8722292304688],
                                        [111.899530058594, 22.890610578125],
                                        [111.877345, 22.8938430000001],
                                        [111.873260527344, 22.8997585273438],
                                        [111.856976347656, 22.911001203125],
                                        [111.841673613281, 22.9075710273438],
                                        [111.833260527344, 22.9197585273438],
                                        [111.818521757813, 22.9299367500001],
                                        [111.843260527344, 22.9679274726563],
                                        [111.851483183594, 23.0301564765626],
                                        [111.88033328125, 23.0236891914063],
                                        [111.896197539063, 23.0466628242188],
                                        [111.888983183594, 23.078843],
                                        [111.893465605469, 23.098843],
                                        [111.889132109375, 23.1181716132813],
                                        [111.897345, 23.1238430000001],
                                        [111.966553984375, 23.1352126289062],
                                        [111.987196074219, 23.0847756171875],
                                        [112.054439726563, 23.0748390937501],
                                        [112.077345, 23.0838430000001],
                                        [112.0640246875, 23.0395973945313],
                                        [112.051917753906, 23.0291677070312],
                                        [112.052847929688, 23.0175978828126],
                                        [112.032049589844, 23.0192678046876],
                                        [112.00271609375, 22.9984719062501],
                                        [111.974935332031, 22.9860744453126],
                                        [111.971942167969, 22.948843],
                                        [111.974876738281, 22.9123415351563],
                                        [111.953785429688, 22.8745388007813],
                                        [112.017345, 22.8796462226563],
                                        [112.041363554688, 22.8777175117188],
                                        [112.065843535156, 22.8913747382813],
                                        [112.117345, 22.8872365546876],
                                        [112.156082792969, 22.8903493476563],
                                        [112.151922636719, 22.8385842109376],
                                        [112.167345, 22.803843],
                                        [112.161429472656, 22.7997585273437],
                                        [112.153260527344, 22.7879274726562],
                                        [112.101444121094, 22.7746291328125],
                                        [112.060203886719, 22.7133888984376],
                                        [112.064217558594, 22.6954909492188],
                                        [112.039132109375, 22.6781716132813],
                                        [112.043616972656, 22.6581716132812],
                                        [112.026976347656, 22.646684796875],
                                        [111.9894934375, 22.6550881171875],
                                        [111.957345, 22.6338430000001],
                                        [111.93170046875, 22.6194875312501],
                                        [111.899000273438, 22.5771218085938],
                                        [111.877345, 22.5803200507812],
                                        [111.862135039063, 22.5780739570313],
                                        [111.820338164063, 22.590259015625],
                                        [111.823602324219, 22.6123513007813],
                                        [111.854722929688, 22.6077516914063],
                                        [111.851529570313, 22.6293556953125],
                                        [111.86298953125, 22.6381984687501],
                                        [111.87170046875, 22.6527614570313],
                                        [111.85170046875, 22.66819846875],
                                        [111.837345, 22.693843],
                                        [111.876800566406, 22.7039675117188],
                                        [111.869115019531, 22.7382570625],
                                        [111.831041289063, 22.7480275703125],
                                        [111.837738066406, 22.7778981757813],
                                        [111.774713164063, 22.7637697578125],
                                        [111.787345, 22.793843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "name": "云城区"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [112.31298953125, 23.08819846875],
                                        [112.284129667969, 23.0659230781251],
                                        [112.281605253906, 23.0488430000001],
                                        [112.283822050781, 23.033843],
                                        [112.281529570313, 23.0183303046875],
                                        [112.293741484375, 23.0089064765626],
                                        [112.27298953125, 22.95819846875],
                                        [112.25298953125, 22.9427614570313],
                                        [112.26170046875, 22.91819846875],
                                        [112.296009550781, 22.9086452460938],
                                        [112.291549101563, 22.878452375],
                                        [112.30298953125, 22.85948753125],
                                        [112.307345, 22.833843],
                                        [112.282386503906, 22.8277126289063],
                                        [112.272345, 22.8299636054688],
                                        [112.261898222656, 22.8276222968751],
                                        [112.238621855469, 22.8427785468751],
                                        [112.194539824219, 22.8242653632813],
                                        [112.183260527344, 22.8079274726563],
                                        [112.167345, 22.803843],
                                        [112.151922636719, 22.8385842109376],
                                        [112.156082792969, 22.8903493476563],
                                        [112.117345, 22.8872365546876],
                                        [112.065843535156, 22.8913747382813],
                                        [112.041363554688, 22.8777175117188],
                                        [112.017345, 22.8796462226563],
                                        [111.953785429688, 22.8745388007813],
                                        [111.974876738281, 22.9123415351563],
                                        [111.971942167969, 22.948843],
                                        [111.974935332031, 22.9860744453126],
                                        [112.00271609375, 22.9984719062501],
                                        [112.032049589844, 23.0192678046876],
                                        [112.052847929688, 23.0175978828126],
                                        [112.051917753906, 23.0291677070312],
                                        [112.0640246875, 23.0395973945313],
                                        [112.077345, 23.0838430000001],
                                        [112.095328398438, 23.0912331367188],
                                        [112.178951445313, 23.0745363593751],
                                        [112.221519804688, 23.1096681953125],
                                        [112.247345, 23.1238430000001],
                                        [112.288570585938, 23.1306154609375],
                                        [112.32170046875, 23.1050441718751],
                                        [112.31298953125, 23.08819846875]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });

            provinces = {
                guang_dong: require("echarts/util/mapData/geoJson/guang_dong_geo"),
                guangzhou: require("echarts/util/mapData/geoJson/guangzhou"),
                shaoguan: require("echarts/util/mapData/geoJson/shaoguan"),
                shenzhen: require("echarts/util/mapData/geoJson/shenzhen"),
                zhuhai: require("echarts/util/mapData/geoJson/zhuhai"),
                shantou: require("echarts/util/mapData/geoJson/shantou"),
                foshan: require("echarts/util/mapData/geoJson/foshan"),
                jiangmen: require("echarts/util/mapData/geoJson/jiangmen"),
                zhanjiang: require("echarts/util/mapData/geoJson/zhanjiang"),
                maoming: require("echarts/util/mapData/geoJson/maoming"),
                zhaoqing: require("echarts/util/mapData/geoJson/zhaoqing"),
                huizhou: require("echarts/util/mapData/geoJson/huizhou"),
                meizhou: require("echarts/util/mapData/geoJson/meizhou"),
                shanwei: require("echarts/util/mapData/geoJson/shanwei"),
                heyuan: require("echarts/util/mapData/geoJson/heyuan"),
                yangjiang: require("echarts/util/mapData/geoJson/yangjiang"),
                qingyuan: require("echarts/util/mapData/geoJson/qingyuan"),
                dongguan: require("echarts/util/mapData/geoJson/dongguan"),
                zhongshan: require("echarts/util/mapData/geoJson/zhongshan"),
                chaozhou: require("echarts/util/mapData/geoJson/chaozhou"),
                jieyang: require("echarts/util/mapData/geoJson/jieyang"),
                yunfu:require("echarts/util/mapData/geoJson/yunfu"),
            };
        })();

        return provinces;

    });
