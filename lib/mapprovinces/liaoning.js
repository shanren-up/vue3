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
                if(!Array.isArray) {
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
                    if(arguments.length < 2) {
                        unsupportedModule(arguments.length);
                    }

                    if(!_isArray(deps)) {
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

                    for(var i = 0, l = length; i < l; i++) {
                        dep = deps[i];
                        if(dep === 'exports') {
                            module.exports = reified[i] = seen;
                        } else if(dep === 'require') {
                            reified[i] = mod.makeRequire();
                        } else if(dep === 'module') {
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
                    if(!mod) {
                        throw new Error('Could not find module `' + name + '` imported from `' + origin + '`');
                    }
                    return require(name);
                }

                function missingModule(name) {
                    throw new Error('Could not find module ' + name);
                }
                requirejs = require = requireModule = function(name) {
                    var mod = registry[name];

                    if(mod && mod.callback instanceof Alias) {
                        mod = registry[mod.callback.name];
                    }

                    if(!mod) {
                        missingModule(name);
                    }

                    if(mod.state !== FAILED &&
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
                        if(!loaded) {
                            mod.state = FAILED;
                        }
                    });

                    var obj;
                    if(module === undefined && reified.module.exports) {
                        obj = reified.module.exports;
                    } else {
                        obj = seen[name] = module;
                    }

                    if(obj !== null &&
                        (typeof obj === 'object' || typeof obj === 'function') &&
                        obj['default'] === undefined) {
                        obj['default'] = obj;
                    }

                    return(seen[name] = obj);
                };

                function resolve(child, name) {
                    if(child.charAt(0) !== '.') {
                        return child;
                    }

                    var parts = child.split('/');
                    var nameParts = name.split('/');
                    var parentBase = nameParts.slice(0, -1);

                    for(var i = 0, l = parts.length; i < l; i++) {
                        var part = parts[i];

                        if(part === '..') {
                            if(parentBase.length === 0) {
                                throw new Error('Cannot access parent module of root');
                            }
                            parentBase.pop();
                        } else if(part === '.') {
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

            define("echarts/util/mapData/geoJson/liao_ning_geo", [], function() {
                    return {
                        type: "FeatureCollection",
                        features: [{
                            type: "Feature",
                            id: "2102",
                            properties: {
                                name: "大连市",
                                cp: [122.2229, 39.4409],
                                childNum: 5
                            },
                            geometry: {
                                type: "Polygon",
                                coordinates: ["@@IÞmVk@wXWÜbnwlLnU@nLlbXW@awnbl@XLa@Ċ¥@LULnJ@xVnmV@VXXV@VJkn@VÜKXXôJlbxl@IVbnJVLUbnlnVwJVU@XUaUUlwn@°nVKnV°_VJwl@nwlVIXWlIVVnK@IWmkIVaVU@WÈUlmU@UWUalkXġŻ@kI»mmakUmĉUŁV»²ġVĕ@aUU؍IɃ`ȃ@kw@Umwĉ@WķÑIĉÇbÝLkymbIwÇmÛbmbU¯ÜõÈkÆVbŎxnXVÆnǪ¦b¤UxÝnĉÒmĊVÈ¤ÈbÆ¼ĀÆÆÞźbVVbX°²¤"],
                                encodeOffsets: [
                                    [124786, 41102]
                                ]
                            }
                        }, {
                            type: "Feature",
                            id: "2113",
                            properties: {
                                name: "朝阳市",
                                cp: [120.0696, 41.4899],
                                childNum: 6
                            },
                            geometry: {
                                type: "Polygon",
                                coordinates: ["@@na@UVI@mÑWkaV¥UI@wl@aÈbm@wVak@@K@k@a@UUmUUalmU@KÇUÅ±¯@±kUKVkUaaU@¥m@@¯k@WLUmkn@mmIkm@amU@wVmkU@Klk@UmaXIWWULaULVbmk@UUmUk±_Uym@mbkImaX¯WWxWKzU@WkJWwkV@Um@UbVVVVXb@VWX@W@Vkb@VnUK±aUUlwXÇWKknU@mmUkLUVVUUVUawbkKmwnIkJ@nmb`kmVkLWwUm@UUUK@UmaUa@UUaWK@mU¯Wkk¯VmUUxVXUVmL¯ymXkWUbmXUKVknWx¯JVnkLl@VVxnxlĀVL²WlXl@bÝVUn@bnlÜaXblIVl@@È¦@VmbXV@@xVVnUn@`°@VnXU@K@VV@VmbnVn@ln@bx°Ub@bLV`ÅnW@@lUnnWVU@Vbkl@Xl`XxVUblkX@°¦VUVVbUlkV@UbVbkLUxmJkX@bbxVKÆlXXbnnala@Uk@UVVklKVUXKVU°KVan@VUnLKVLWVaU_@mmUXa@mwXwVkVWXkk@k@klm@wXKl@U@KVUUUVaUV@alLxUx@b°°VnnVxlIXJmxLUVlV@bnX@VbaVx@XJ@bn@VVXÈl@llX@lUVô°°@ÞVbn@Vk@VW"],
                                encodeOffsets: [
                                    [123919, 43262]
                                ]
                            }
                        }, {
                            type: "Feature",
                            id: "2106",
                            properties: {
                                name: "丹东市",
                                cp: [124.541, 40.4242],
                                childNum: 4
                            },
                            geometry: {
                                type: "Polygon",
                                coordinates: ["@@lzXJU@²x@@V@bUVmKUn°n@lnVKnV@n@VlV°WbXn@VzJ@¦@bkbbUl@bkbJ¯zWULWbklVnb¦VJ@K°Ukl@@WbVn°@Vm²UnX`UÜLXmVXlKVbUVVnUbnX@VUL@lUbWx@²kl`n@Vlb@nUVWVLVU@aV@²bl@ÈmxWXVÈUJVl@laWnXKÈkÈ@Va°bÆm@XV°IVV°UnalVUn@UwVU@@VVJI@bl@XK@wWmXUUVbkJVXnJVI@mknwlKXL@`l@VI@UUaVKÞnaVm@aÇ£XWU@aÇUU@mbkKm£@WWL@@Kk@klUbWKUkUU¯UõÛmUUaVUU@WU_W@kVkJ_WKkV@bUL¯¯±mk¯ġğÑ@UmwKUaka@am¥ÝIUWmk@wmţLKʝbȗKWĢklVbX@VVknÇV@XUVUblJXn@J"],
                                encodeOffsets: [
                                    [126372, 40967]
                                ]
                            }
                        }, {
                            type: "Feature",
                            id: "2112",
                            properties: {
                                name: "铁岭市",
                                cp: [124.2773, 42.7423],
                                childNum: 7
                            },
                            geometry: {
                                type: "Polygon",
                                coordinates: ["@@XJm@¯mXUlnVbUJU@bV@UJWL@VXLmJVbkXlJXxVL@b@V@n@b@`Vbk@lxknV@VVV@bUL@bV@@bVK@VXLWLXJ@LV@nbWJ@IUVx@LVJUXVxVx@VV@@LXJWL@VU@@L@VnL@bVVmVX@@VVInJmbnLWVnVULVVU@VVmX@@JVzl@nVVKVXÞ@mk_lmUUWV_nJlUÞÑÞVVUVVLUVJ@IVna@@KV@XwWknwnKlalUwaĉÝwJl_@aUaKUUU@WU@WXUÆ@@UVK@n@UnVVblK@bllb@bbW@Xbl@UlnLl°°b¦nKlVnIV@UWU@WXkw@am@nm@aVw@I@KUaVIm±XÑlknJVnVJaX_VaUaVKmwnkmmn@lU@U@mnaXlKUmUIVmklaUK@UlUVUW@UkVma@UUU@JmUU@@bmbKWV¯XUKm@ka@UVKVk@aUKmLkKUUÝUmbXbÇJ@k@WU_@m@klm@UXKVaUI@KWUXaÇWkaWUkWUL±U@lUU@UJI@V¯JmIm@@aU@Uwa@UV@VkIV¯aUkWkb@bVL@@VVVUXW@Ua@@bÝbUVÝ@LmUkVUbVllLUV@LXWbUXm@U`@kxlnnJlbnIllLXlVlUXmVKnV@L"],
                                encodeOffsets: [
                                    [126720, 43572]
                                ]
                            }
                        }, {
                            type: "Feature",
                            id: "2101",
                            properties: {
                                name: "沈阳市",
                                cp: [123.1238, 42.1216],
                                childNum: 5
                            },
                            geometry: {
                                type: "Polygon",
                                coordinates: ["@@ȚĊÜ°bLlÞxUbUn±@ÈnVÆL@xnLlUVbxkImJkn@V±LUxkV@bbKVKnzVl@L°@VaxÞUlbôxVV@@V±bn@llXLöXĶnal@nkVJVI@aU@@aVK@aUUUU@lmkwl@Ua@_@a@m@U@aUKWwkIlWUanIWK@UXKVIU@@aVVIUamVknW°n@WI@KUmULWnkVkUWKkkmJkamIkmlw@V_n@VWXaW@KVUkKUkValUnVK@ÞVUÞa@a@VbX@VWUU@U@UK@ala@IkKmUUa@U@VkkWVwU_@KÜUXbl@V¥XUVmXakÅlUUkIm`UIUJW@UIKmkm@UUJImmU@VUXU`mIUbUK@LJUUl@X@UbJkU@nm@Uam@@aUmLKwmWXUK@kUaÇa@JUIUa@aKVUUXmUy_@lmbkLUKWLX`n@bVL@JXLWX@Vnb@Vm@UbnVmL@V@x@LUbVV@V@LUVl@mb¯U@xU@UVVV@X@VVblJ@bnVKUnx@llnL±¤b@k`VXÆK@kV@¼kl@bWIUl@VmLnbm@@JXXmb"],
                                encodeOffsets: [
                                    [125359, 43139]
                                ]
                            }
                        }, {
                            type: "Feature",
                            id: "2104",
                            properties: {
                                name: "抚顺市",
                                cp: [124.585, 41.8579],
                                childNum: 4
                            },
                            geometry: {
                                type: "Polygon",
                                coordinates: ["@@XVl°bUlJ@UVU@bVxV@@bn@nJ°I@UJIVV@V@k²VVKlXXVblÈXWbXV@LVJUbWL@Vkn@l@nV`@X@lÈIWanaÞVVVlLnKVL@bUlUL@Vlbn@VL°WXULna@aV@nV@IVV@VbUnl@VXnKVa@UUnyWkXaaVk@aabnm@_WKXmWanU@alaUl@XJVLVxX@wnKnVlw@V_@a¯¥@UkKWUaUUanK@IaU@WUaVw@klUVyUUVUUÇ@Iôba@mnUma@kXa@UWak@Wal@a@WULmU@U`mIUU`mUk@@UUK±nkJbUam@kwm@@a@UU@Ua@@K@VK@kmKU_UKUUaĉWmkkL@`LnmlkLkbmK@k@Ulmb@b@xUVIUlmVXXxm@JUUk@WUk@akx±@¯x¯UmbKUUVmUU¯UmVVnWkÆlWbUnWVU¦k@WaÛV@LV`UxXllU@@VVbnVlL@J"],
                                encodeOffsets: [
                                    [126754, 42992]
                                ]
                            }
                        }, {
                            type: "Feature",
                            id: "2114",
                            properties: {
                                name: "葫芦岛市",
                                cp: [120.1575, 40.578],
                                childNum: 4
                            },
                            geometry: {
                                type: "Polygon",
                                coordinates: ["@@ll°XnV@XLVb@VVbnb@VLVV@VVnXxlKnUl_na@mlImJnxlLaxVbUVVUVUKVlnnV@lmXLÈWkxVV²bVLm@Ula@UX@XW@UWaUUUUVan@V@lUXxlIXV@yXLwXXW°nblJnan@Vz`l²nVVVl@nUaVKbVKnXVaUaVUynXK@kVK@X@m@mLXaLWU¯w@a@UVw¥°ó¯¯y¯UÇ¯»w¯Im¯ÇUUl¯»ţKċÑţķm¯w@mU_ómk¼VnU`±IkbVlnnU¼±Lk`@XWl¦UbmVUxkXVlkbllUVb@bkVmx@XVV@Jb±aULkKWXkWmX¯aUJmIkVm@xU@n"],
                                encodeOffsets: [
                                    [122097, 41575]
                                ]
                            }
                        }, {
                            type: "Feature",
                            id: "2109",
                            properties: {
                                name: "阜新市",
                                cp: [122.0032, 42.2699],
                                childNum: 4
                            },
                            geometry: {
                                type: "Polygon",
                                coordinates: ["@@Xnb°lVlnXVJLlVnl@zÆxnK@bblKVLn@@VaVLVK@L@Vl@XVVInVVKVwlUXwlKLVVb@aV@XlUXbVW@nlWnXKV@@V@XUVVLUVV@@bVVV@@ln@VbVUXVIxVanJ@UIVWL@UV@@¤V@nInwWklnIVxlnzUVÇJ¦VVÜLĸUnW@aV_WĊXXaKnkl@nmLa@alUVw²K@UlmnIlJwaVUkmK@wÅKmU@Ç²VmVaÝwkKaÛ¯șĉķ¥ğ¥@kUWkƏīÝ@@akUK@KWIUm¯nU¯JmwUVmIkJÇLm@UImJUU@aW@U@@nUbJabXVWn@UVmX@V@b@l@L@lUb@xnÇabk@@xVJU¦lbXÒ@nUJ@Vmb"],
                                encodeOffsets: [
                                    [123919, 43262]
                                ]
                            }
                        }, {
                            type: "Feature",
                            id: "2107",
                            properties: {
                                name: "锦州市",
                                cp: [121.6626, 41.4294],
                                childNum: 5
                            },
                            geometry: {
                                type: "Polygon",
                                coordinates: ["@@nJ@nlmVnXKl@@°n@@¦VbVbUlVL²l°@Æ²ÈV@LVknVbVVnnWVU@XmWUabIVa@mV@X@@bVVnIVJ@nÈKlInJVUnx°IV°mVnXJ@LLlV@b@ÞƐĬXllV@Ġ¦ĸ¦naWW@In@manK@UVkXJ@alk@»lU@ÅLUWl_@a²£Kkm@kwVmULm@akIUa@U@WUUVUaÝ@ğwkmĉ£UW@@bÇL@ma@_mKlXUwKLţÓ@UWw@K@UI@mU@UV¥@°UnJ°@@_KUwW@UnaWUmmI@mķwUaÇLóVĵwÝUUW¯¦Ux@Vb@xV°XKWbK@n@nW@UL@lWLmzUVVbUbmWXXWJbn@Vkl@LlVUn@xnV@bln"],
                                encodeOffsets: [
                                    [123694, 42391]
                                ]
                            }
                        }, {
                            type: "Feature",
                            id: "2103",
                            properties: {
                                name: "鞍山市",
                                cp: [123.0798, 40.6055],
                                childNum: 4
                            },
                            geometry: {
                                type: "Polygon",
                                coordinates: ["@@lxĠÞ@bV@@w°Vna@UkV@K@UUUVa@K@w@UnKmUVan@@Uma@UXWWK@IUK@amW_XKVLlKna@kmKVak@VU@VmU@anIÆan@aUVnb@blLV`ÞLlUbnaKn@naVU@¥°IVK@anUUKVaUVak@mJkXUVwkVUUa°U@W@WlkXWlIXUlJlaxIVVXLll@nLV@lLXlKĊz¥maUlkXaVKX°yIla@aVkala@a@¥IUy@WmXa¯kU@U@mmUULkmm@¯VmnLVU@a@U@±w@VWIkymLUUkJWXJkUmxk@xUI¯`mUULm¯m@kxVVbWV@UVIUx@bkVVVxUbVV@V@zJVXUlnk@@lkLlLUU±Jkm@UIUVLUVU@K@UnnV@l@LlaUJ@zn`@nWlIUVUUUV±Ln@nmL@VUVkLVlUxVLVlÅXma@@akLmWUX@JUnVJVkXJ@X@`WXVUVUIlbW@bVUVL@`Un@¦U`@bUV@z@Jm@@XV`LUL¯J@IVKmKÅI@JnWVnLnVxV¤z@bmV@VUV@bUL"],
                                encodeOffsets: [
                                    [125123, 42447]
                                ]
                            }
                        }, {
                            type: "Feature",
                            id: "2105",
                            properties: {
                                name: "本溪市",
                                cp: [124.1455, 41.1987],
                                childNum: 3
                            },
                            geometry: {
                                type: "Polygon",
                                coordinates: ["@@lb@VnlnVVUb@VJ@nnJ@bmXUx@xVbkbkWLUxnl@Ul@xWx@nUV@¼UllknkK@bmbnlLVJX@VIVJn_lJVVXUmnU°VVVUnVVLna°V°w²@lwbl@XVl@VVIn@wWWnUVkJVUw@@anaVk@@lnLlalKnkmK@_lKnlĊXVbVVLV`nL@lUL@@L@VbV@@V@bn@lxn@VbalI²mVL@Vl@nV_VVnJV_@nVKV@X@bkXbl@XblylUUk@Xa@UVIlK@UUWVULlm@UUUnKWU@K@UXmXVa@U°KVUUWUk@aUVKkaWkKUknaWa@U@m@mk@aUJk@@_WKkLmxl@nUJmIUWlIUaVWVXn@xWLk@@aJUI@U@UVVxm@UVkmb¯VUU¯JWU@Ån¯aUbÇ@ÇlLmWXkbk@UIÇVUXWwÇnk@±aU@@bUVUKUXmV@kaUm@k_±l@XwVa@kVK@UWmVaUmVUUakLUWWnÛKVW_m±VnU¯@Uma@Xk@l¯V"],
                                encodeOffsets: [
                                    [126552, 41839]
                                ]
                            }
                        }, {
                            type: "Feature",
                            id: "2108",
                            properties: {
                                name: "营口市",
                                cp: [122.4316, 40.4297],
                                childNum: 4
                            },
                            geometry: {
                                type: "Polygon",
                                coordinates: ["@@ĊĖÆn¤°Ċ¯ŎWô@xXbwnKl@nX@VUVKmL@VU@UxÝ@VlbxU@VUb@bk`IUlVUnV@@UV@@JnXlK@b@nbÆWUkUKVwUklKVU@UnK@mm²KVUVVVUJXk@mm_@yVIbk@K@kmUm@VLV@VUKVUVJn@l²IVVKklK@kl@kmVUWI@y@UUUVawUUUl@akmmVaUKmIUaJk@wkaóIWWÛL@UlmUIU@WW@UnUUm@wmIVK@Kĉ¦@bWKk@max@bWXkamK@mVkKmxÛaWX@xUlÝnJ"],
                                encodeOffsets: [
                                    [124786, 41102]
                                ]
                            }
                        }, {
                            type: "Feature",
                            id: "2110",
                            properties: {
                                name: "辽阳市",
                                cp: [123.4094, 41.1383],
                                childNum: 5
                            },
                            geometry: {
                                type: "Polygon",
                                coordinates: ["@@`VzWnVUVL@bVbVJ@IÈbVb@lVLXWnxLnKVb@n@Vbn@mV@lIVa@@WkVVI@KVLVanJV_VWUV@nnJVIVn@na@alLlmkVk@»VU@mXwwk@@VmkVwXKllaUa@wVwnW@amI@mUI@VaUUkmm@UkaL@UIĉyLWkkKU@mKk@kWKUUJwkbkIWVkJWXkl@X@X¯VVbUVlUxVWlnI@lUbVUbVLmV@bUL¯J@¦UVmbm@LmbakVÝKU_kK@amaVUbm@ÅbmJ@bVUn@UVl@UbnL"],
                                encodeOffsets: [
                                    [125562, 42194]
                                ]
                            }
                        }, {
                            type: "Feature",
                            id: "2111",
                            properties: {
                                name: "盘锦市",
                                cp: [121.9482, 41.0449],
                                childNum: 3
                            },
                            geometry: {
                                type: "Polygon",
                                coordinates: ["@@Vbĸx@nnJVnXmb@VXVxL@`¯@mI¯V@U¦@VV@nJ@V@LXx@VŤÔKLVxWknL@`b@nÈK@a@VXĊ¤nVK@aVU@UnU@ayU£UwmmKXUm@IÆJnLUL@J°IVKKU_@Wn@@I@yVU@aV_@¥Vm@_UKUV@aXkaVJVUUXW@_@WWIUlUIVm@IVW@IU@@VU@mUVVkJ_l@aVa@UVwka@UÞVwV@@UnKLVU@UmWk@mLxWa@wóUVUIÇÆĉ¦¯¦¯xʟJ"],
                                encodeOffsets: [
                                    [124392, 41822]
                                ]
                            }
                        }],
                        UTF8Encoding: !0
                    }
                }),
                define("echarts/util/mapData/geoJson/shenyang", [], function() {
                    return {
                        "type": "FeatureCollection",
                        "features": [{
                            "type": "Feature",
                            "properties": { "name": "皇姑区" },
                            "geometry": {
                                "type": "MultiPolygon",
                                "coordinates": [
                                    [
                                        [
                                            [123.4311340625, 41.8491274238282],
                                            [123.437345, 41.823843],
                                            [123.437345, 41.813843],
                                            [123.427345, 41.813843],
                                            [123.410704375, 41.8104836250001],
                                            [123.397345, 41.8038430000001],
                                            [123.393985625, 41.8104836250001],
                                            [123.360704375, 41.8172023750001],
                                            [123.347345, 41.823843],
                                            [123.354796171875, 41.8388283515626],
                                            [123.3458215625, 41.8572023750001],
                                            [123.373985625, 41.8504836250001],
                                            [123.3841028125, 41.830483625],
                                            [123.403985625, 41.837202375],
                                            [123.410704375, 41.880483625],
                                            [123.447345, 41.883843],
                                            [123.4311340625, 41.8491274238282]
                                        ]
                                    ]
                                ]
                            }
                        }, {
                            "type": "Feature",
                            "properties": { "name": "大东区" },
                            "geometry": {
                                "type": "MultiPolygon",
                                "coordinates": [
                                    [
                                        [
                                            [123.494439726563, 41.7767494941407],
                                            [123.477345, 41.773843],
                                            [123.45170046875, 41.8081996894532],
                                            [123.447345, 41.823843],
                                            [123.46062625, 41.83056175],
                                            [123.467345, 41.843843],
                                            [123.528033476563, 41.8407534003907],
                                            [123.504581328125, 41.8146181464844],
                                            [123.51716921875, 41.7971450019532],
                                            [123.494439726563, 41.7767494941407]
                                        ]
                                    ],
                                    [
                                        [
                                            [123.501685820313, 41.8903041816407],
                                            [123.504801054688, 41.8597695136719],
                                            [123.467345, 41.8738430000001],
                                            [123.479107695313, 41.88800315625],
                                            [123.501685820313, 41.8903041816407]
                                        ]
                                    ]
                                ]
                            }
                        }, {
                            "type": "Feature",
                            "properties": { "name": "东陵区" },
                            "geometry": {
                                "type": "MultiPolygon",
                                "coordinates": [
                                    [
                                        [
                                            [123.467345, 41.8738430000001],
                                            [123.504801054688, 41.8597695136719],
                                            [123.501685820313, 41.8903041816407],
                                            [123.479107695313, 41.88800315625],
                                            [123.447345, 41.883843],
                                            [123.447345, 41.903843],
                                            [123.472760039063, 41.8976003242188],
                                            [123.497261992188, 41.9135561347656],
                                            [123.55326296875, 41.9279274726563],
                                            [123.595987578125, 41.9458730292969],
                                            [123.640230742188, 41.9359548164063],
                                            [123.681300078125, 41.9626967597657],
                                            [123.717345, 41.9538430000001],
                                            [123.722896757813, 41.9492336250001],
                                            [123.721803007813, 41.9385207343751],
                                            [123.7358215625, 41.9140456367188],
                                            [123.722808867188, 41.8983803535157],
                                            [123.711324492188, 41.888843],
                                            [123.74076296875, 41.8643910957031],
                                            [123.712808867188, 41.8483803535156],
                                            [123.67166140625, 41.8305361152344],
                                            [123.673834257813, 41.809233625],
                                            [123.652808867188, 41.7917678046875],
                                            [123.703414335938, 41.7728810859375],
                                            [123.777345, 41.7938430000001],
                                            [123.770631132813, 41.7642873359375],
                                            [123.807335234375, 41.7018447089844],
                                            [123.791793242188, 41.6893959785157],
                                            [123.781632109375, 41.6652834296875],
                                            [123.747940703125, 41.6383058906251],
                                            [123.757345, 41.6138430000001],
                                            [123.678761015625, 41.6083901191407],
                                            [123.642345, 41.6098342109376],
                                            [123.612345, 41.6086452460937],
                                            [123.602345, 41.6090407539063],
                                            [123.592174101563, 41.608637921875],
                                            [123.549327421875, 41.6381215644531],
                                            [123.509595976563, 41.6170961738282],
                                            [123.452535429688, 41.6290334296875],
                                            [123.382154570313, 41.6386525703125],
                                            [123.362535429688, 41.6501210761719],
                                            [123.401475859375, 41.6862026191407],
                                            [123.359971953125, 41.6993434882813],
                                            [123.322408476563, 41.6978542304688],
                                            [123.317345, 41.713843],
                                            [123.327345, 41.713843],
                                            [123.327345, 41.7238430000001],
                                            [123.35142703125, 41.7397585273437],
                                            [123.367345, 41.743843],
                                            [123.394635039063, 41.7618776679688],
                                            [123.427345, 41.753843],
                                            [123.45142703125, 41.7697585273438],
                                            [123.477345, 41.773843],
                                            [123.494439726563, 41.7767494941407],
                                            [123.51716921875, 41.7971450019532],
                                            [123.504581328125, 41.8146181464844],
                                            [123.528033476563, 41.8407534003907],
                                            [123.467345, 41.843843],
                                            [123.467345, 41.8738430000001]
                                        ]
                                    ]
                                ]
                            }
                        }, {
                            "type": "Feature",
                            "properties": { "name": "法库县" },
                            "geometry": {
                                "type": "MultiPolygon",
                                "coordinates": [
                                    [
                                        [
                                            [123.627257109375, 42.6394887519531],
                                            [123.65326296875, 42.6297585273438],
                                            [123.66142703125, 42.6079274726563],
                                            [123.68326296875, 42.5997585273438],
                                            [123.693443632813, 42.5725429511719],
                                            [123.727345, 42.5638430000001],
                                            [123.730343046875, 42.5568398261719],
                                            [123.760260039063, 42.54937034375],
                                            [123.747345, 42.543843],
                                            [123.707261992188, 42.5335561347656],
                                            [123.68326296875, 42.5179274726563],
                                            [123.647345, 42.513843],
                                            [123.660894804688, 42.5507350898438],
                                            [123.620113554688, 42.5474587226563],
                                            [123.602345, 42.5076381660157],
                                            [123.57662234375, 42.5097048164062],
                                            [123.50271609375, 42.4684706855469],
                                            [123.47197390625, 42.4592153144532],
                                            [123.451236601563, 42.4476454902344],
                                            [123.452955351563, 42.4262404609375],
                                            [123.472926054688, 42.4090358710937],
                                            [123.461749296875, 42.3786098457032],
                                            [123.517345, 42.343843],
                                            [123.523726835938, 42.3286452460938],
                                            [123.51142703125, 42.3097585273437],
                                            [123.50326296875, 42.2779274726563],
                                            [123.473204375, 42.2666811347656],
                                            [123.46326296875, 42.2279274726563],
                                            [123.447550078125, 42.2037990546876],
                                            [123.467345, 42.1738430000001],
                                            [123.452623320313, 42.1676601386719],
                                            [123.442345, 42.1699636054688],
                                            [123.4141028125, 42.1636330390626],
                                            [123.40326296875, 42.1479274726562],
                                            [123.370548125, 42.1356874824219],
                                            [123.337345, 42.1438430000001],
                                            [123.331832304688, 42.1509841132813],
                                            [123.30978640625, 42.1477260566406],
                                            [123.292857695313, 42.1696572089844],
                                            [123.250806914063, 42.1634438300782],
                                            [123.25677859375, 42.203843],
                                            [123.22170046875, 42.2181996894532],
                                            [123.210806914063, 42.2323110175781],
                                            [123.176485625, 42.2272377753906],
                                            [123.11654421875, 42.2716799140625],
                                            [123.082345, 42.266626203125],
                                            [123.05978640625, 42.2699599433594],
                                            [123.041275664063, 42.2459804511719],
                                            [122.982486601563, 42.2596034980469],
                                            [122.953883085938, 42.2553762031251],
                                            [122.892271757813, 42.2696535468751],
                                            [122.845826445313, 42.2561110664063],
                                            [122.807345, 42.2617983222656],
                                            [122.755611601563, 42.2541542792969],
                                            [122.747345, 42.283843],
                                            [122.752061796875, 42.2891237617187],
                                            [122.793189726563, 42.3079994941406],
                                            [122.849268828125, 42.3384743476563],
                                            [122.902003203125, 42.3507436347657],
                                            [122.882061796875, 42.3685622382813],
                                            [122.856236601563, 42.3974672675782],
                                            [122.821715117188, 42.4133107734375],
                                            [122.822642851563, 42.428843],
                                            [122.81822390625, 42.5029628730469],
                                            [122.897877226563, 42.4982155585938],
                                            [122.912061796875, 42.5291237617188],
                                            [122.95197390625, 42.5474416328126],
                                            [122.967345, 42.573843],
                                            [122.990616484375, 42.5650991035157],
                                            [123.032701445313, 42.5693886542969],
                                            [123.094976835938, 42.5201039863281],
                                            [123.121954375, 42.5173537421875],
                                            [123.139420195313, 42.5383803535156],
                                            [123.192808867188, 42.5293056464844],
                                            [123.212432890625, 42.5180666328126],
                                            [123.261881132813, 42.5593056464844],
                                            [123.287398710938, 42.5703713203126],
                                            [123.332808867188, 42.5983803535157],
                                            [123.342769804688, 42.6213478828126],
                                            [123.45755984375, 42.6096474433594],
                                            [123.506627226563, 42.6377504707032],
                                            [123.522345, 42.6393520332031],
                                            [123.542345, 42.6373146796875],
                                            [123.567345, 42.6398622871094],
                                            [123.582667265625, 42.6383010078126],
                                            [123.601881132813, 42.6493056464844],
                                            [123.617345, 42.653843],
                                            [123.627257109375, 42.6394887519531]
                                        ]
                                    ]
                                ]
                            }
                        }, {
                            "type": "Feature",
                            "properties": { "name": "和平区" },
                            "geometry": {
                                "type": "MultiPolygon",
                                "coordinates": [
                                    [
                                        [
                                            [123.418048125, 41.7917031074219],
                                            [123.427345, 41.753843],
                                            [123.394635039063, 41.7618776679688],
                                            [123.367345, 41.743843],
                                            [123.367345, 41.7638430000001],
                                            [123.373985625, 41.767202375],
                                            [123.390704375, 41.800483625],
                                            [123.397345, 41.8038430000001],
                                            [123.410704375, 41.8104836250001],
                                            [123.427345, 41.813843],
                                            [123.418048125, 41.7917031074219]
                                        ]
                                    ]
                                ]
                            }
                        }, {
                            "type": "Feature",
                            "properties": { "name": "康平县" },
                            "geometry": {
                                "type": "MultiPolygon",
                                "coordinates": [
                                    [
                                        [
                                            [123.59361453125, 42.7781728339844],
                                            [123.576925078125, 42.7666469550782],
                                            [123.558409453125, 42.7225661445313],
                                            [123.573565703125, 42.6992897773438],
                                            [123.57107546875, 42.6881728339844],
                                            [123.58361453125, 42.6795131660156],
                                            [123.58037234375, 42.6650380683594],
                                            [123.6126184375, 42.6722670722656],
                                            [123.617345, 42.653843],
                                            [123.601881132813, 42.6493056464844],
                                            [123.582667265625, 42.6383010078126],
                                            [123.567345, 42.6398622871094],
                                            [123.542345, 42.6373146796875],
                                            [123.522345, 42.6393520332031],
                                            [123.506627226563, 42.6377504707032],
                                            [123.45755984375, 42.6096474433594],
                                            [123.342769804688, 42.6213478828126],
                                            [123.332808867188, 42.5983803535157],
                                            [123.287398710938, 42.5703713203126],
                                            [123.261881132813, 42.5593056464844],
                                            [123.212432890625, 42.5180666328126],
                                            [123.192808867188, 42.5293056464844],
                                            [123.139420195313, 42.5383803535156],
                                            [123.121954375, 42.5173537421875],
                                            [123.094976835938, 42.5201039863281],
                                            [123.032701445313, 42.5693886542969],
                                            [122.990616484375, 42.5650991035157],
                                            [122.967345, 42.573843],
                                            [122.92166140625, 42.5823696113281],
                                            [122.9226575, 42.5990956855469],
                                            [122.910220976563, 42.6102065253907],
                                            [122.863101835938, 42.6073976875],
                                            [122.852628203125, 42.6191237617188],
                                            [122.842061796875, 42.6285622382813],
                                            [122.823609648438, 42.6492165351563],
                                            [122.812345, 42.6485451484375],
                                            [122.802345, 42.6491408515626],
                                            [122.79209109375, 42.6485305],
                                            [122.774429960938, 42.668296125],
                                            [122.743468046875, 42.6825075507813],
                                            [122.78709109375, 42.7214870429688],
                                            [122.837345, 42.7138430000001],
                                            [122.859556914063, 42.7316310859375],
                                            [122.888472929688, 42.767739484375],
                                            [122.919210234375, 42.7715627265626],
                                            [122.956143828125, 42.7498537421875],
                                            [122.975513945313, 42.7740456367188],
                                            [123.027345, 42.7675991035156],
                                            [123.042345, 42.7694643378907],
                                            [123.052706328125, 42.7681764960938],
                                            [123.09068484375, 42.7905019355469],
                                            [123.152896757813, 42.8082900214844],
                                            [123.181793242188, 42.8193959785157],
                                            [123.216685820313, 42.8293727851563],
                                            [123.167960234375, 42.8499050117188],
                                            [123.181793242188, 42.9293959785157],
                                            [123.192896757813, 42.9382900214844],
                                            [123.201793242188, 42.9493959785156],
                                            [123.222896757813, 42.9582900214844],
                                            [123.247281523438, 42.9887392402344],
                                            [123.343599882813, 43.002759015625],
                                            [123.432896757813, 43.0282900214844],
                                            [123.463697539063, 43.0401284003907],
                                            [123.512896757813, 43.0193959785157],
                                            [123.531793242188, 43.0082900214844],
                                            [123.557345, 43.003843],
                                            [123.54580203125, 42.9568471503906],
                                            [123.594132109375, 42.9292629218751],
                                            [123.58060671875, 42.9084950996094],
                                            [123.59408328125, 42.8991909003906],
                                            [123.58060671875, 42.8784950996094],
                                            [123.59408328125, 42.8691909003907],
                                            [123.580831328125, 42.848843],
                                            [123.593565703125, 42.8292897773438],
                                            [123.587862578125, 42.803843],
                                            [123.59361453125, 42.7781728339844]
                                        ]
                                    ]
                                ]
                            }
                        }, {
                            "type": "Feature",
                            "properties": { "name": "辽中县" },
                            "geometry": {
                                "type": "MultiPolygon",
                                "coordinates": [
                                    [
                                        [
                                            [122.627345, 41.433843],
                                            [122.623922148438, 41.4216506171875],
                                            [122.615152617188, 41.4304201484376],
                                            [122.627345, 41.433843]
                                        ]
                                    ],
                                    [
                                        [
                                            [122.597345, 41.513843],
                                            [122.593922148438, 41.5016506171875],
                                            [122.585152617188, 41.5104201484376],
                                            [122.597345, 41.513843]
                                        ]
                                    ],
                                    [
                                        [
                                            [122.957345, 41.4938430000001],
                                            [122.945152617188, 41.4904201484375],
                                            [122.953922148438, 41.4816506171875],
                                            [122.98170046875, 41.4870607734376],
                                            [122.952374296875, 41.4677944160157],
                                            [122.931954375, 41.4801100898438],
                                            [122.92298953125, 41.4581996894532],
                                            [122.911514921875, 41.4493422675782],
                                            [122.917345, 41.4138430000001],
                                            [122.8519934375, 41.4192751289063],
                                            [122.840328398438, 41.3805434394531],
                                            [122.755670195313, 41.3574990058594],
                                            [122.74271609375, 41.3284706855469],
                                            [122.7119153125, 41.3191970039063],
                                            [122.7127746875, 41.3085195136719],
                                            [122.70197390625, 41.2992153144531],
                                            [122.691715117188, 41.2762221503907],
                                            [122.67197390625, 41.2592153144531],
                                            [122.661300078125, 41.2468288398438],
                                            [122.664068632813, 41.2123659492188],
                                            [122.617345, 41.203843],
                                            [122.607345, 41.203843],
                                            [122.5976965625, 41.2384938789063],
                                            [122.545748320313, 41.2494557929688],
                                            [122.58298953125, 41.2781996894532],
                                            [122.59306765625, 41.3028212714844],
                                            [122.644068632813, 41.3421877265625],
                                            [122.640362578125, 41.3672658515625],
                                            [122.660592070313, 41.4007997871094],
                                            [122.642345, 41.3981044746094],
                                            [122.630284453125, 41.3998867011719],
                                            [122.634483671875, 41.4283315253907],
                                            [122.627345, 41.433843],
                                            [122.6216028125, 41.4688088203125],
                                            [122.623082304688, 41.478843],
                                            [122.621607695313, 41.4888430000001],
                                            [122.624195585938, 41.5063661933594],
                                            [122.597345, 41.513843],
                                            [122.593170195313, 41.5296681953125],
                                            [122.537447539063, 41.5408388496095],
                                            [122.512345, 41.5358791328125],
                                            [122.489678984375, 41.5403578925782],
                                            [122.4934778125, 41.5595864082032],
                                            [122.477345, 41.5638430000001],
                                            [122.470147734375, 41.579575421875],
                                            [122.483624296875, 41.5875649238282],
                                            [122.491065703125, 41.6101210761719],
                                            [122.516666289063, 41.641264875],
                                            [122.504498320313, 41.6766884589844],
                                            [122.532345, 41.6671254707032],
                                            [122.54642703125, 41.6719606757813],
                                            [122.540445585938, 41.6893679023438],
                                            [122.563624296875, 41.7175649238282],
                                            [122.571065703125, 41.7501210761719],
                                            [122.583624296875, 41.7575649238281],
                                            [122.587345, 41.7638430000001],
                                            [122.617769804688, 41.7835720039063],
                                            [122.661119414063, 41.750952375],
                                            [122.703077421875, 41.7395778632813],
                                            [122.722818632813, 41.7130385566407],
                                            [122.754547148438, 41.7366396308594],
                                            [122.775733671875, 41.7651235175782],
                                            [122.833077421875, 41.7495778632813],
                                            [122.86205203125, 41.7379311347657],
                                            [122.9148840625, 41.7470278144532],
                                            [122.972345, 41.7114650703125],
                                            [123.001612578125, 41.7295778632813],
                                            [123.017345, 41.733843],
                                            [123.026451445313, 41.7121608710938],
                                            [123.016803007813, 41.6691152167969],
                                            [123.05326296875, 41.6597585273437],
                                            [123.085323515625, 41.6121413398438],
                                            [123.097345, 41.6038430000001],
                                            [123.08142703125, 41.5797585273438],
                                            [123.07326296875, 41.5579274726563],
                                            [123.043082304688, 41.5466347480469],
                                            [123.01435671875, 41.5050295234375],
                                            [122.980167265625, 41.5126943183594],
                                            [122.96142703125, 41.4997585273438],
                                            [122.957345, 41.4938430000001]
                                        ]
                                    ]
                                ]
                            }
                        }, {
                            "type": "Feature",
                            "properties": { "name": "沈北新区" },
                            "geometry": {
                                "type": "MultiPolygon",
                                "coordinates": [
                                    [
                                        [
                                            [123.532896757813, 42.1693959785157],
                                            [123.543761015625, 42.1436220527344],
                                            [123.641793242188, 42.0982900214844],
                                            [123.69375125, 42.0892482734376],
                                            [123.742896757813, 42.0593959785157],
                                            [123.754610625, 42.044770734375],
                                            [123.811793242188, 42.0518837714844],
                                            [123.798350859375, 42.0162294746094],
                                            [123.76318484375, 42.0206044746094],
                                            [123.761676054688, 42.0084706855469],
                                            [123.777345, 41.9838430000001],
                                            [123.777345, 41.973843],
                                            [123.728463164063, 41.9677297187501],
                                            [123.717345, 41.9538430000001],
                                            [123.681300078125, 41.9626967597657],
                                            [123.640230742188, 41.9359548164063],
                                            [123.595987578125, 41.9458730292969],
                                            [123.55326296875, 41.9279274726563],
                                            [123.497261992188, 41.9135561347656],
                                            [123.472760039063, 41.8976003242188],
                                            [123.447345, 41.903843],
                                            [123.369185820313, 41.9084438300782],
                                            [123.37431765625, 41.9497109199219],
                                            [123.362345, 41.9482216621094],
                                            [123.348472929688, 41.949946515625],
                                            [123.328453398438, 41.9749489570313],
                                            [123.269635039063, 42.0220497871095],
                                            [123.274156523438, 42.0583901191407],
                                            [123.267345, 42.0638430000001],
                                            [123.326104765625, 42.1341591621094],
                                            [123.337345, 42.1438430000001],
                                            [123.370548125, 42.1356874824219],
                                            [123.40326296875, 42.1479274726562],
                                            [123.4141028125, 42.1636330390626],
                                            [123.442345, 42.1699636054688],
                                            [123.452623320313, 42.1676601386719],
                                            [123.467345, 42.1738430000001],
                                            [123.482896757813, 42.1782900214844],
                                            [123.516173125, 42.1978493476563],
                                            [123.532896757813, 42.1693959785157]
                                        ]
                                    ]
                                ]
                            }
                        }, {
                            "type": "Feature",
                            "properties": { "name": "沈河区" },
                            "geometry": {
                                "type": "MultiPolygon",
                                "coordinates": [
                                    [
                                        [
                                            [123.45142703125, 41.7697585273438],
                                            [123.427345, 41.753843],
                                            [123.418048125, 41.7917031074219],
                                            [123.427345, 41.813843],
                                            [123.437345, 41.813843],
                                            [123.437345, 41.823843],
                                            [123.447345, 41.823843],
                                            [123.45170046875, 41.8081996894532],
                                            [123.477345, 41.773843],
                                            [123.45142703125, 41.7697585273438]
                                        ]
                                    ]
                                ]
                            }
                        }, {
                            "type": "Feature",
                            "properties": { "name": "苏家屯区" },
                            "geometry": {
                                "type": "MultiPolygon",
                                "coordinates": [
                                    [
                                        [
                                            [123.317345, 41.713843],
                                            [123.322408476563, 41.6978542304688],
                                            [123.359971953125, 41.6993434882813],
                                            [123.401475859375, 41.6862026191407],
                                            [123.362535429688, 41.6501210761719],
                                            [123.382154570313, 41.6386525703125],
                                            [123.452535429688, 41.6290334296875],
                                            [123.509595976563, 41.6170961738282],
                                            [123.549327421875, 41.6381215644531],
                                            [123.592174101563, 41.608637921875],
                                            [123.602345, 41.6090407539063],
                                            [123.612345, 41.6086452460937],
                                            [123.642345, 41.6098342109376],
                                            [123.678761015625, 41.6083901191407],
                                            [123.757345, 41.6138430000001],
                                            [123.79125125, 41.5948622871094],
                                            [123.717296171875, 41.5678786445313],
                                            [123.737345, 41.523843],
                                            [123.728756132813, 41.5114003730469],
                                            [123.711900664063, 41.507622296875],
                                            [123.692789335938, 41.5200637031251],
                                            [123.682345, 41.5177223945313],
                                            [123.662345, 41.5222060371094],
                                            [123.642345, 41.5177223945313],
                                            [123.628258085938, 41.5208803535157],
                                            [123.587345, 41.4938430000001],
                                            [123.543707304688, 41.4868080878907],
                                            [123.522345, 41.4894643378906],
                                            [123.505318632813, 41.4873464179688],
                                            [123.469210234375, 41.4661232734375],
                                            [123.442345, 41.4694643378907],
                                            [123.431954375, 41.4681728339844],
                                            [123.402896757813, 41.4893959785157],
                                            [123.350045195313, 41.5116664863281],
                                            [123.321983671875, 41.5081764960937],
                                            [123.293453398438, 41.5249489570313],
                                            [123.231793242188, 41.5382900214844],
                                            [123.210699492188, 41.5646315742188],
                                            [123.182896757813, 41.5482900214844],
                                            [123.138697539063, 41.5296645332031],
                                            [123.122896757813, 41.5493959785156],
                                            [123.103355742188, 41.5650453925781],
                                            [123.128487578125, 41.607798078125],
                                            [123.107345, 41.6138430000001],
                                            [123.1224621875, 41.6334267402344],
                                            [123.18298953125, 41.6581996894532],
                                            [123.20170046875, 41.6694863105469],
                                            [123.22298953125, 41.6781996894532],
                                            [123.232857695313, 41.6909841132813],
                                            [123.267086210938, 41.6859255195313],
                                            [123.283160429688, 41.6983315253907],
                                            [123.281514921875, 41.7094643378907],
                                            [123.317345, 41.713843]
                                        ]
                                    ],
                                    [
                                        [
                                            [123.317345, 41.713843],
                                            [123.317345, 41.7238430000001],
                                            [123.327345, 41.7238430000001],
                                            [123.327345, 41.713843],
                                            [123.317345, 41.713843]
                                        ]
                                    ]
                                ]
                            }
                        }, {
                            "type": "Feature",
                            "properties": { "name": "铁西区" },
                            "geometry": {
                                "type": "MultiPolygon",
                                "coordinates": [
                                    [
                                        [
                                            [123.373985625, 41.767202375],
                                            [123.367345, 41.7638430000001],
                                            [123.30298953125, 41.7747756171875],
                                            [123.312955351563, 41.8373622871094],
                                            [123.347345, 41.823843],
                                            [123.360704375, 41.8172023750001],
                                            [123.393985625, 41.8104836250001],
                                            [123.397345, 41.8038430000001],
                                            [123.390704375, 41.800483625],
                                            [123.373985625, 41.767202375]
                                        ]
                                    ]
                                ]
                            }
                        }, {
                            "type": "Feature",
                            "properties": { "name": "新民市" },
                            "geometry": {
                                "type": "MultiPolygon",
                                "coordinates": [
                                    [
                                        [
                                            [122.467345, 42.033843],
                                            [122.479537382813, 42.0372658515625],
                                            [122.470767851563, 42.0460353828126],
                                            [122.460523710938, 42.0370217109375],
                                            [122.454166289063, 42.0506642890625],
                                            [122.438873320313, 42.0577895332032],
                                            [122.445816679688, 42.0698964667969],
                                            [122.426612578125, 42.078843],
                                            [122.448077421875, 42.088843],
                                            [122.428873320313, 42.0977895332032],
                                            [122.440338164063, 42.1177895332031],
                                            [122.427345, 42.123843],
                                            [122.432061796875, 42.1391237617187],
                                            [122.463199492188, 42.1487380195313],
                                            [122.600264921875, 42.2059206367188],
                                            [122.620787382813, 42.2288857246094],
                                            [122.672628203125, 42.2385622382813],
                                            [122.729610625, 42.2783669257813],
                                            [122.747345, 42.283843],
                                            [122.755611601563, 42.2541542792969],
                                            [122.807345, 42.2617983222656],
                                            [122.845826445313, 42.2561110664063],
                                            [122.892271757813, 42.2696535468751],
                                            [122.953883085938, 42.2553762031251],
                                            [122.982486601563, 42.2596034980469],
                                            [123.041275664063, 42.2459804511719],
                                            [123.05978640625, 42.2699599433594],
                                            [123.082345, 42.266626203125],
                                            [123.11654421875, 42.2716799140625],
                                            [123.176485625, 42.2272377753906],
                                            [123.210806914063, 42.2323110175781],
                                            [123.22170046875, 42.2181996894532],
                                            [123.25677859375, 42.203843],
                                            [123.250806914063, 42.1634438300782],
                                            [123.292857695313, 42.1696572089844],
                                            [123.30978640625, 42.1477260566406],
                                            [123.331832304688, 42.1509841132813],
                                            [123.337345, 42.1438430000001],
                                            [123.326104765625, 42.1341591621094],
                                            [123.267345, 42.0638430000001],
                                            [123.252154570313, 42.0590334296876],
                                            [123.218482695313, 42.0358632636719],
                                            [123.202535429688, 42.0186525703125],
                                            [123.182154570313, 42.0090334296875],
                                            [123.159654570313, 41.9971279121094],
                                            [123.142535429688, 41.9786525703125],
                                            [123.132154570313, 41.9690334296875],
                                            [123.122535429688, 41.9586525703126],
                                            [123.108468046875, 41.9456179023438],
                                            [123.122550078125, 41.9190065742188],
                                            [123.121749296875, 41.898843],
                                            [123.142808867188, 41.8889052558594],
                                            [123.132139921875, 41.8790200019532],
                                            [123.132545195313, 41.8688430000001],
                                            [123.132110625, 41.8579579902345],
                                            [123.152535429688, 41.8390334296875],
                                            [123.163472929688, 41.81585471875],
                                            [123.151822539063, 41.7264809394532],
                                            [123.017345, 41.733843],
                                            [123.001612578125, 41.7295778632813],
                                            [122.972345, 41.7114650703125],
                                            [122.9148840625, 41.7470278144532],
                                            [122.86205203125, 41.7379311347657],
                                            [122.833077421875, 41.7495778632813],
                                            [122.775733671875, 41.7651235175782],
                                            [122.754547148438, 41.7366396308594],
                                            [122.722818632813, 41.7130385566407],
                                            [122.703077421875, 41.7395778632813],
                                            [122.661119414063, 41.750952375],
                                            [122.617769804688, 41.7835720039063],
                                            [122.587345, 41.7638430000001],
                                            [122.583077421875, 41.7695778632813],
                                            [122.561612578125, 41.7781081367188],
                                            [122.55291140625, 41.7898012519532],
                                            [122.54177859375, 41.7878847480469],
                                            [122.533077421875, 41.7995778632813],
                                            [122.503839140625, 41.8213271308594],
                                            [122.461612578125, 41.8381081367188],
                                            [122.453077421875, 41.8795778632813],
                                            [122.433756132813, 41.8939528632812],
                                            [122.453526640625, 41.9081081367188],
                                            [122.518140898438, 41.8969838691406],
                                            [122.501612578125, 41.9381081367188],
                                            [122.483077421875, 42.0095778632813],
                                            [122.467345, 42.033843]
                                        ]
                                    ]
                                ]
                            }
                        }, {
                            "type": "Feature",
                            "properties": { "name": "于洪区" },
                            "geometry": {
                                "type": "MultiPolygon",
                                "coordinates": [
                                    [
                                        [
                                            [123.447345, 41.883843],
                                            [123.467345, 41.8738430000001],
                                            [123.467345, 41.843843],
                                            [123.46062625, 41.83056175],
                                            [123.447345, 41.823843],
                                            [123.437345, 41.823843],
                                            [123.4311340625, 41.8491274238282],
                                            [123.447345, 41.883843]
                                        ]
                                    ],
                                    [
                                        [
                                            [123.447345, 41.883843],
                                            [123.410704375, 41.880483625],
                                            [123.403985625, 41.837202375],
                                            [123.3841028125, 41.830483625],
                                            [123.373985625, 41.8504836250001],
                                            [123.3458215625, 41.8572023750001],
                                            [123.354796171875, 41.8388283515626],
                                            [123.347345, 41.823843],
                                            [123.312955351563, 41.8373622871094],
                                            [123.30298953125, 41.7747756171875],
                                            [123.367345, 41.7638430000001],
                                            [123.367345, 41.743843],
                                            [123.35142703125, 41.7397585273437],
                                            [123.327345, 41.7238430000001],
                                            [123.317345, 41.7238430000001],
                                            [123.317345, 41.713843],
                                            [123.281514921875, 41.7094643378907],
                                            [123.283160429688, 41.6983315253907],
                                            [123.267086210938, 41.6859255195313],
                                            [123.232857695313, 41.6909841132813],
                                            [123.22298953125, 41.6781996894532],
                                            [123.20170046875, 41.6694863105469],
                                            [123.18298953125, 41.6581996894532],
                                            [123.1224621875, 41.6334267402344],
                                            [123.107345, 41.6138430000001],
                                            [123.107345, 41.6038430000001],
                                            [123.097345, 41.6038430000001],
                                            [123.085323515625, 41.6121413398438],
                                            [123.05326296875, 41.6597585273437],
                                            [123.016803007813, 41.6691152167969],
                                            [123.026451445313, 41.7121608710938],
                                            [123.017345, 41.733843],
                                            [123.151822539063, 41.7264809394532],
                                            [123.163472929688, 41.81585471875],
                                            [123.152535429688, 41.8390334296875],
                                            [123.132110625, 41.8579579902345],
                                            [123.132545195313, 41.8688430000001],
                                            [123.132139921875, 41.8790200019532],
                                            [123.142808867188, 41.8889052558594],
                                            [123.121749296875, 41.898843],
                                            [123.122550078125, 41.9190065742188],
                                            [123.108468046875, 41.9456179023438],
                                            [123.122535429688, 41.9586525703126],
                                            [123.132154570313, 41.9690334296875],
                                            [123.142535429688, 41.9786525703125],
                                            [123.159654570313, 41.9971279121094],
                                            [123.182154570313, 42.0090334296875],
                                            [123.202535429688, 42.0186525703125],
                                            [123.218482695313, 42.0358632636719],
                                            [123.252154570313, 42.0590334296876],
                                            [123.267345, 42.0638430000001],
                                            [123.274156523438, 42.0583901191407],
                                            [123.269635039063, 42.0220497871095],
                                            [123.328453398438, 41.9749489570313],
                                            [123.348472929688, 41.949946515625],
                                            [123.362345, 41.9482216621094],
                                            [123.37431765625, 41.9497109199219],
                                            [123.369185820313, 41.9084438300782],
                                            [123.447345, 41.903843],
                                            [123.447345, 41.883843]
                                        ]
                                    ]
                                ]
                            }
                        }]
                    };
                });
            define("echarts/util/mapData/geoJson/dalian", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": { "name": "西岗区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [121.617345, 38.923843],
                                        [121.617345, 38.933843],
                                        [121.637345, 38.933843],
                                        [121.637345, 38.923843],
                                        [121.617345, 38.923843]
                                    ]
                                ],
                                [
                                    [
                                        [121.617345, 38.933843],
                                        [121.604537382813, 38.928843],
                                        [121.617345, 38.923843],
                                        [121.63142703125, 38.8979274726563],
                                        [121.644093046875, 38.889184796875],
                                        [121.627345, 38.8638430000001],
                                        [121.610704375, 38.867202375],
                                        [121.597345, 38.873843],
                                        [121.59326296875, 38.9197585273437],
                                        [121.587345, 38.9438430000001],
                                        [121.607345, 38.9438430000001],
                                        [121.617345, 38.9438430000001],
                                        [121.617345, 38.933843]
                                    ]
                                ],
                                [
                                    [
                                        [121.637345, 38.933843],
                                        [121.642345, 38.9466506171875],
                                        [121.647345, 38.933843],
                                        [121.637345, 38.933843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "中山区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [121.717921171875, 38.8961171699219],
                                        [121.693961210938, 38.8683107734375],
                                        [121.6823059375, 38.8692482734375],
                                        [121.627345, 38.8638430000001],
                                        [121.644093046875, 38.889184796875],
                                        [121.63142703125, 38.8979274726563],
                                        [121.617345, 38.923843],
                                        [121.637345, 38.923843],
                                        [121.637345, 38.933843],
                                        [121.647345, 38.933843],
                                        [121.688521757813, 38.9214455390625],
                                        [121.717921171875, 38.8961171699219]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "庄河市" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.06072390625, 39.457915265625],
                                        [123.077345, 39.4338430000001],
                                        [123.04326296875, 39.4425905585938],
                                        [123.06072390625, 39.457915265625]
                                    ]
                                ],
                                [
                                    [
                                        [123.103922148438, 39.5160353828125],
                                        [123.107345, 39.503843],
                                        [123.095152617188, 39.5072658515625],
                                        [123.103922148438, 39.5160353828125]
                                    ]
                                ],
                                [
                                    [
                                        [123.00687625, 39.5561940742187],
                                        [123.02341921875, 39.5287746406251],
                                        [122.997345, 39.493843],
                                        [122.969581328125, 39.4985597968751],
                                        [122.947623320313, 39.5349623847657],
                                        [122.972345, 39.5498744941407],
                                        [122.992579375, 39.5376699042969],
                                        [123.00687625, 39.5561940742187]
                                    ]
                                ],
                                [
                                    [
                                        [123.287345, 39.773843],
                                        [123.28334109375, 39.7965688300781],
                                        [123.274346953125, 39.7794045234375],
                                        [123.280709257813, 39.7512245917969],
                                        [123.252345, 39.7483339667969],
                                        [123.232808867188, 39.7503249335938],
                                        [123.241881132813, 39.7383803535157],
                                        [123.271314726563, 39.713930890625],
                                        [123.272901640625, 39.6983937812501],
                                        [123.211881132813, 39.6893056464844],
                                        [123.202808867188, 39.6783803535156],
                                        [123.151881132813, 39.6693056464844],
                                        [123.140206328125, 39.6552516914063],
                                        [123.09834109375, 39.6709828925781],
                                        [123.072345, 39.6683339667969],
                                        [123.061265898438, 39.6694631171875],
                                        [122.98091921875, 39.6591823554688],
                                        [122.995474882813, 39.6470900703126],
                                        [122.962808867188, 39.6283803535156],
                                        [122.8854309375, 39.6168556953125],
                                        [122.8058215625, 39.5870351386719],
                                        [122.741881132813, 39.5593056464844],
                                        [122.722808867188, 39.5483803535157],
                                        [122.701881132813, 39.5393056464844],
                                        [122.672398710938, 39.5180849433594],
                                        [122.647530546875, 39.5323281074219],
                                        [122.629195585938, 39.4900502753906],
                                        [122.612345, 39.4883339667969],
                                        [122.601954375, 39.4893923164063],
                                        [122.590206328125, 39.4752516914063],
                                        [122.567345, 39.483843],
                                        [122.551881132813, 39.4883803535156],
                                        [122.532808867188, 39.4993056464844],
                                        [122.496671171875, 39.5149770332031],
                                        [122.512808867188, 39.5283803535157],
                                        [122.543941679688, 39.5658620429688],
                                        [122.5814465625, 39.5821279121094],
                                        [122.561793242188, 39.5984523750001],
                                        [122.563092070313, 39.6111550117188],
                                        [122.603233671875, 39.6285646796876],
                                        [122.591881132813, 39.6483803535157],
                                        [122.578267851563, 39.6947682929688],
                                        [122.561881132813, 39.7083803535156],
                                        [122.545455351563, 39.7281569648438],
                                        [122.484185820313, 39.7547292304688],
                                        [122.504268828125, 39.8449526191407],
                                        [122.501793242188, 39.869233625],
                                        [122.524381132813, 39.8879958320313],
                                        [122.511793242188, 39.8984523750001],
                                        [122.513834257813, 39.918452375],
                                        [122.507345, 39.923843],
                                        [122.521173125, 39.9404909492188],
                                        [122.556881132813, 39.9368520332032],
                                        [122.534879179688, 39.987583234375],
                                        [122.5132434375, 40.0055580878906],
                                        [122.543233671875, 40.0185646796876],
                                        [122.525836210938, 40.0489394355469],
                                        [122.692301054688, 40.0693569160156],
                                        [122.702691679688, 40.0682973457032],
                                        [122.7576575, 40.1078554511719],
                                        [122.772345, 40.1093520332032],
                                        [122.799644804688, 40.1065700507813],
                                        [122.822022734375, 40.1193849921876],
                                        [122.838189726563, 40.1177370429688],
                                        [122.862105742188, 40.1728774238281],
                                        [122.887345, 40.1938430000001],
                                        [122.89978640625, 40.1777260566406],
                                        [122.930123320313, 40.1822096992188],
                                        [122.94312625, 40.1491347480469],
                                        [122.940982695313, 40.1346108222656],
                                        [122.9831653125, 40.1093825507813],
                                        [122.98045046875, 40.0910182929688],
                                        [123.00170046875, 40.0781996894532],
                                        [123.02298953125, 40.0694863105469],
                                        [123.036549101563, 40.0519155097657],
                                        [123.073883085938, 40.0463991523438],
                                        [123.092857695313, 40.0709841132813],
                                        [123.112345, 40.0681044746094],
                                        [123.13369265625, 40.0712587714844],
                                        [123.20298953125, 40.0594863105469],
                                        [123.2310559375, 40.0425551582031],
                                        [123.26298953125, 40.0294863105469],
                                        [123.283922148438, 40.0168593574219],
                                        [123.313219023438, 40.0211891914063],
                                        [123.372686796875, 39.9978115058594],
                                        [123.38170046875, 40.0094863105469],
                                        [123.397345, 40.0138430000001],
                                        [123.392652617188, 39.9848146796875],
                                        [123.37080203125, 39.9691518378906],
                                        [123.383170195313, 39.9496681953125],
                                        [123.391636992188, 39.9277150703126],
                                        [123.407447539063, 39.9308388496094],
                                        [123.479879179688, 39.9163185859375],
                                        [123.48341921875, 39.8984096503907],
                                        [123.465201445313, 39.8697145820313],
                                        [123.493453398438, 39.8494631171875],
                                        [123.48968875, 39.8304128242187],
                                        [123.513170195313, 39.7996681953125],
                                        [123.517345, 39.7838430000001],
                                        [123.481793242188, 39.7793959785157],
                                        [123.472896757813, 39.7682900214844],
                                        [123.461666289063, 39.7592958808594],
                                        [123.46302859375, 39.7483364082032],
                                        [123.409303007813, 39.7293959785157],
                                        [123.412965117188, 39.758843],
                                        [123.408912382813, 39.7914296699219],
                                        [123.31291140625, 39.7640163398438],
                                        [123.287345, 39.773843]
                                    ],
                                    [
                                        [123.095152617188, 39.6972658515625],
                                        [123.107345, 39.693843],
                                        [123.103922148438, 39.7060353828125],
                                        [123.095152617188, 39.6972658515625]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "长海县" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [122.717345, 39.033843],
                                        [122.74517703125, 39.0312636542969],
                                        [122.759888945313, 39.0160305000001],
                                        [122.719888945313, 39.0163869453125],
                                        [122.717345, 39.033843]
                                    ]
                                ],
                                [
                                    [
                                        [122.717345, 39.033843],
                                        [122.705152617188, 39.0372658515626],
                                        [122.713922148438, 39.0460353828125],
                                        [122.717345, 39.033843]
                                    ]
                                ],
                                [
                                    [
                                        [122.831910429688, 39.0565395332032],
                                        [122.837345, 39.043843],
                                        [122.814346953125, 39.047895734375],
                                        [122.831910429688, 39.0565395332032]
                                    ]
                                ],
                                [
                                    [
                                        [122.863922148438, 39.0660353828125],
                                        [122.867345, 39.0538430000001],
                                        [122.855152617188, 39.0572658515625],
                                        [122.863922148438, 39.0660353828125]
                                    ]
                                ],
                                [
                                    [
                                        [122.803922148438, 39.0860353828125],
                                        [122.807345, 39.073843],
                                        [122.795152617188, 39.0772658515626],
                                        [122.803922148438, 39.0860353828125]
                                    ]
                                ],
                                [
                                    [
                                        [123.198643828125, 39.0546181464844],
                                        [123.16406375, 39.03712425],
                                        [123.157345, 39.023843],
                                        [123.143985625, 39.0306008125],
                                        [123.151026640625, 39.0619277167969],
                                        [123.170704375, 39.0523183417969],
                                        [123.163985625, 39.0704836250001],
                                        [123.133985625, 39.0791408515625],
                                        [123.172974882813, 39.0869313789063],
                                        [123.198643828125, 39.0546181464844]
                                    ]
                                ],
                                [
                                    [
                                        [122.423922148438, 39.1760353828125],
                                        [122.427345, 39.163843],
                                        [122.415152617188, 39.1672658515625],
                                        [122.423922148438, 39.1760353828125]
                                    ]
                                ],
                                [
                                    [
                                        [122.403922148438, 39.1860353828126],
                                        [122.407345, 39.1738430000001],
                                        [122.395152617188, 39.1772658515625],
                                        [122.403922148438, 39.1860353828126]
                                    ]
                                ],
                                [
                                    [
                                        [122.377345, 39.2038430000001],
                                        [122.384918242188, 39.1683913398438],
                                        [122.36259890625, 39.1697219062501],
                                        [122.335260039063, 39.1391237617188],
                                        [122.313375273438, 39.1713613105469],
                                        [122.332628203125, 39.1885622382813],
                                        [122.342061796875, 39.1991237617188],
                                        [122.377345, 39.2038430000001]
                                    ]
                                ],
                                [
                                    [
                                        [122.303922148438, 39.2060353828125],
                                        [122.307345, 39.193843],
                                        [122.295152617188, 39.1972658515625],
                                        [122.303922148438, 39.2060353828125]
                                    ]
                                ],
                                [
                                    [
                                        [122.697345, 39.213843],
                                        [122.693922148438, 39.2016506171875],
                                        [122.685152617188, 39.2104201484375],
                                        [122.697345, 39.213843]
                                    ]
                                ],
                                [
                                    [
                                        [122.377345, 39.2038430000001],
                                        [122.380767851563, 39.2160353828125],
                                        [122.389537382813, 39.2072658515625],
                                        [122.377345, 39.2038430000001]
                                    ]
                                ],
                                [
                                    [
                                        [122.603922148438, 39.2260353828126],
                                        [122.607345, 39.213843],
                                        [122.595152617188, 39.2172658515625],
                                        [122.603922148438, 39.2260353828126]
                                    ]
                                ],
                                [
                                    [
                                        [122.773922148438, 39.2360353828125],
                                        [122.777345, 39.223843],
                                        [122.765152617188, 39.2272658515626],
                                        [122.773922148438, 39.2360353828125]
                                    ]
                                ],
                                [
                                    [
                                        [122.431910429688, 39.2365395332031],
                                        [122.437345, 39.223843],
                                        [122.414346953125, 39.2278957343751],
                                        [122.431910429688, 39.2365395332031]
                                    ]
                                ],
                                [
                                    [
                                        [122.538365507813, 39.2368520332031],
                                        [122.547345, 39.223843],
                                        [122.48326296875, 39.2285243964844],
                                        [122.538365507813, 39.2368520332031]
                                    ]
                                ],
                                [
                                    [
                                        [122.697345, 39.213843],
                                        [122.691358671875, 39.23534690625],
                                        [122.632940703125, 39.2267140937501],
                                        [122.62298953125, 39.2386562324219],
                                        [122.723053007813, 39.2481996894532],
                                        [122.75170046875, 39.2230763984375],
                                        [122.697345, 39.213843]
                                    ]
                                ],
                                [
                                    [
                                        [122.443922148438, 39.2660353828126],
                                        [122.447345, 39.253843],
                                        [122.435152617188, 39.2572658515625],
                                        [122.443922148438, 39.2660353828126]
                                    ]
                                ],
                                [
                                    [
                                        [123.003922148438, 39.2660353828126],
                                        [123.007345, 39.253843],
                                        [122.995152617188, 39.2572658515625],
                                        [123.003922148438, 39.2660353828126]
                                    ]
                                ],
                                [
                                    [
                                        [122.683922148438, 39.2760353828125],
                                        [122.687345, 39.263843],
                                        [122.675152617188, 39.2672658515626],
                                        [122.683922148438, 39.2760353828125]
                                    ]
                                ],
                                [
                                    [
                                        [122.663892851563, 39.2703932929688],
                                        [122.667345, 39.253843],
                                        [122.653892851563, 39.2603932929688],
                                        [122.603892851563, 39.2683974433594],
                                        [122.630513945313, 39.2872927070313],
                                        [122.663892851563, 39.2703932929688]
                                    ]
                                ],
                                [
                                    [
                                        [122.4849621875, 39.2995034003907],
                                        [122.522345, 39.2987404609375],
                                        [122.551344023438, 39.2993325019531],
                                        [122.594698515625, 39.2709084296876],
                                        [122.58224734375, 39.2589430976563],
                                        [122.577345, 39.253843],
                                        [122.57224734375, 39.2587429023438],
                                        [122.56244265625, 39.2689430976563],
                                        [122.4849621875, 39.2995034003907]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "甘井子区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [121.497345, 38.8238430000001],
                                        [121.509537382813, 38.8204201484375],
                                        [121.500767851563, 38.8116506171876],
                                        [121.497345, 38.8238430000001]
                                    ]
                                ],
                                [
                                    [
                                        [121.497345, 38.8238430000001],
                                        [121.467345, 38.8238430000001],
                                        [121.461705351563, 38.8486818671875],
                                        [121.463248320313, 38.8611074042969],
                                        [121.413599882813, 38.9008644843751],
                                        [121.390079375, 38.8979396796876],
                                        [121.372896757813, 38.9193959785156],
                                        [121.319815703125, 38.9516384101563],
                                        [121.282174101563, 38.9469557929688],
                                        [121.277345, 38.963843],
                                        [121.283883085938, 38.9723110175782],
                                        [121.31673953125, 38.9674550605469],
                                        [121.347877226563, 38.9801992011719],
                                        [121.33298953125, 38.9994863105469],
                                        [121.3191028125, 39.0102065253906],
                                        [121.34170046875, 39.0394863105469],
                                        [121.36298953125, 39.0481996894532],
                                        [121.375767851563, 39.0647536445313],
                                        [121.412857695313, 39.0167018867188],
                                        [121.432345, 39.0195815253907],
                                        [121.442345, 39.0181044746094],
                                        [121.452345, 39.0195815253907],
                                        [121.46673953125, 39.0174550605469],
                                        [121.5036340625, 39.0325551582032],
                                        [121.53170046875, 39.049486310547],
                                        [121.57298953125, 39.0581996894532],
                                        [121.618365507813, 39.0760390449219],
                                        [121.64170046875, 39.0794863105469],
                                        [121.647345, 39.083843],
                                        [121.652345, 39.0710353828126],
                                        [121.657345, 39.083843],
                                        [121.667345, 39.083843],
                                        [121.693985625, 39.080483625],
                                        [121.717345, 39.033843],
                                        [121.72170046875, 39.0281996894532],
                                        [121.75170046875, 39.0159206367188],
                                        [121.738516875, 39.0042360664063],
                                        [121.644029570313, 39.0181996894532],
                                        [121.638507109375, 38.9975368476563],
                                        [121.659854765625, 39.0006911445313],
                                        [121.6631653125, 38.9782973457031],
                                        [121.61170046875, 38.9494863105469],
                                        [121.607345, 38.9438430000001],
                                        [121.587345, 38.9438430000001],
                                        [121.546417265625, 38.9391884589844],
                                        [121.530972929688, 38.8790138984376],
                                        [121.537345, 38.8638430000001],
                                        [121.527266875, 38.843921125],
                                        [121.500704375, 38.830483625],
                                        [121.497345, 38.8238430000001]
                                    ]
                                ],
                                [
                                    [
                                        [121.163922148438, 39.0960353828125],
                                        [121.167345, 39.083843],
                                        [121.155152617188, 39.0872658515625],
                                        [121.163922148438, 39.0960353828125]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "金州区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [121.833619414063, 38.889380109375],
                                        [121.827345, 38.8638430000001],
                                        [121.81326296875, 38.8735671210937],
                                        [121.825553007813, 38.8979274726563],
                                        [121.833619414063, 38.889380109375]
                                    ]
                                ],
                                [
                                    [
                                        [121.913922148438, 39.0360353828126],
                                        [121.917345, 39.023843],
                                        [121.905152617188, 39.0272658515625],
                                        [121.913922148438, 39.0360353828126]
                                    ]
                                ],
                                [
                                    [
                                        [121.657345, 39.083843],
                                        [121.652345, 39.0710353828126],
                                        [121.647345, 39.083843],
                                        [121.652345, 39.0966506171875],
                                        [121.657345, 39.083843]
                                    ]
                                ],
                                [
                                    [
                                        [121.477345, 39.193843],
                                        [121.473922148438, 39.1816506171875],
                                        [121.465152617188, 39.1904201484376],
                                        [121.477345, 39.193843]
                                    ]
                                ],
                                [
                                    [
                                        [121.573922148438, 39.1960353828125],
                                        [121.577345, 39.183843],
                                        [121.565152617188, 39.1872658515626],
                                        [121.573922148438, 39.1960353828125]
                                    ]
                                ],
                                [
                                    [
                                        [121.477345, 39.193843],
                                        [121.480767851563, 39.2060353828125],
                                        [121.489537382813, 39.1972658515625],
                                        [121.477345, 39.193843]
                                    ]
                                ],
                                [
                                    [
                                        [121.597345, 39.193843],
                                        [121.585152617188, 39.1972658515625],
                                        [121.593922148438, 39.2060353828125],
                                        [121.597345, 39.193843]
                                    ]
                                ],
                                [
                                    [
                                        [121.493922148438, 39.2260353828126],
                                        [121.497345, 39.213843],
                                        [121.485152617188, 39.2172658515625],
                                        [121.493922148438, 39.2260353828126]
                                    ]
                                ],
                                [
                                    [
                                        [121.597345, 39.253843],
                                        [121.607345, 39.253843],
                                        [121.602345, 39.2410353828125],
                                        [121.597345, 39.253843]
                                    ]
                                ],
                                [
                                    [
                                        [122.293922148438, 39.2760353828125],
                                        [122.297345, 39.263843],
                                        [122.285152617188, 39.2672658515626],
                                        [122.293922148438, 39.2760353828125]
                                    ]
                                ],
                                [
                                    [
                                        [121.677345, 39.303843],
                                        [121.665152617188, 39.3072658515626],
                                        [121.673922148438, 39.3160353828125],
                                        [121.677345, 39.303843]
                                    ]
                                ],
                                [
                                    [
                                        [121.597345, 39.193843],
                                        [121.610299101563, 39.2038430000001],
                                        [121.584595976563, 39.2236818671875],
                                        [121.622803984375, 39.2180361152344],
                                        [121.64170046875, 39.2346096015625],
                                        [121.607345, 39.253843],
                                        [121.602345, 39.2666506171876],
                                        [121.597345, 39.253843],
                                        [121.5832434375, 39.2655580878907],
                                        [121.616436796875, 39.2799550605469],
                                        [121.652345, 39.2762953925782],
                                        [121.686392851563, 39.2797646308594],
                                        [121.677345, 39.303843],
                                        [121.719996367188, 39.2933669257813],
                                        [121.723468046875, 39.308843],
                                        [121.721221953125, 39.3188430000001],
                                        [121.723468046875, 39.328843],
                                        [121.720714140625, 39.3411208320313],
                                        [121.73298953125, 39.3739321113281],
                                        [121.747345, 39.383843],
                                        [121.75142703125, 39.3779274726563],
                                        [121.809820585938, 39.3629433417969],
                                        [121.817345, 39.373843],
                                        [121.827345, 39.373843],
                                        [121.857345, 39.373843],
                                        [121.865465117188, 39.3475392890626],
                                        [121.912076445313, 39.3503176093751],
                                        [121.922076445313, 39.3285292792969],
                                        [121.932345, 39.3291408515626],
                                        [121.947345, 39.328247296875],
                                        [121.962345, 39.3291408515626],
                                        [121.972345, 39.3285451484375],
                                        [121.982345, 39.3291408515626],
                                        [122.002345, 39.3279494453126],
                                        [122.0431653125, 39.3303823066407],
                                        [122.132237578125, 39.3185390449219],
                                        [122.142545195313, 39.3191530585938],
                                        [122.172154570313, 39.3085280585938],
                                        [122.247345, 39.313843],
                                        [122.26197390625, 39.3012404609375],
                                        [122.23271609375, 39.2784706855469],
                                        [122.172867460938, 39.2557595039063],
                                        [122.11170046875, 39.2118398261719],
                                        [122.112877226563, 39.1972243476563],
                                        [122.090582304688, 39.1780165839844],
                                        [122.139952421875, 39.1559853339844],
                                        [122.071363554688, 39.1177162910157],
                                        [122.03271609375, 39.1208217597656],
                                        [122.04197390625, 39.0984706855469],
                                        [122.064527617188, 39.0666591621094],
                                        [121.992022734375, 39.0724843574219],
                                        [121.9585559375, 39.0336403632812],
                                        [121.892535429688, 39.0704750800781],
                                        [121.88271609375, 39.0484706855469],
                                        [121.83271609375, 39.0371120429688],
                                        [121.842003203125, 39.0184133125],
                                        [121.858858671875, 39.0197682929688],
                                        [121.891734648438, 38.9914455390625],
                                        [121.894244414063, 38.960200421875],
                                        [121.831646757813, 38.9551711250001],
                                        [121.8327746875, 38.9691896796875],
                                        [121.807628203125, 38.9804091621094],
                                        [121.791920195313, 39.0085646796875],
                                        [121.793331328125, 39.0260927558594],
                                        [121.717345, 39.033843],
                                        [121.693985625, 39.080483625],
                                        [121.667345, 39.083843],
                                        [121.68326296875, 39.1079274726563],
                                        [121.69142703125, 39.1329604316407],
                                        [121.65142703125, 39.1479274726563],
                                        [121.637022734375, 39.1687929511719],
                                        [121.60142703125, 39.1779274726562],
                                        [121.597345, 39.193843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "旅顺口区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [121.023922148438, 38.8760353828125],
                                        [121.027345, 38.8638430000001],
                                        [121.015152617188, 38.8672658515625],
                                        [121.023922148438, 38.8760353828125]
                                    ]
                                ],
                                [
                                    [
                                        [120.983922148438, 38.9560353828126],
                                        [120.987345, 38.9438430000001],
                                        [120.975152617188, 38.9472658515625],
                                        [120.983922148438, 38.9560353828126]
                                    ]
                                ],
                                [
                                    [
                                        [121.277345, 38.963843],
                                        [121.282174101563, 38.9469557929688],
                                        [121.319815703125, 38.9516384101563],
                                        [121.372896757813, 38.9193959785156],
                                        [121.390079375, 38.8979396796876],
                                        [121.413599882813, 38.9008644843751],
                                        [121.463248320313, 38.8611074042969],
                                        [121.461705351563, 38.8486818671875],
                                        [121.467345, 38.8238430000001],
                                        [121.456490507813, 38.8107753730469],
                                        [121.336959257813, 38.8229592109375],
                                        [121.297730742188, 38.7947267890625],
                                        [121.223209257813, 38.8023220039062],
                                        [121.220640898438, 38.7771401191407],
                                        [121.251881132813, 38.7950331855469],
                                        [121.241119414063, 38.7752870917969],
                                        [121.221881132813, 38.7593056464844],
                                        [121.18865359375, 38.7193056464844],
                                        [121.140347929688, 38.7286782050781],
                                        [121.11142703125, 38.7791725898438],
                                        [121.148741484375, 38.7901222968751],
                                        [121.132808867188, 38.8093056464844],
                                        [121.11318484375, 38.8256056953125],
                                        [121.110816679688, 38.848843],
                                        [121.114849882813, 38.8884194160157],
                                        [121.082808867188, 38.9023159003906],
                                        [121.097340117188, 38.9295217109375],
                                        [121.147725859375, 38.9583803535157],
                                        [121.182808867188, 38.9493056464844],
                                        [121.207345, 38.9352516914063],
                                        [121.244464140625, 38.9565102363282],
                                        [121.271881132813, 38.9593056464844],
                                        [121.277345, 38.963843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "普兰店市" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [122.343922148438, 39.3460353828126],
                                        [122.347345, 39.333843],
                                        [122.335152617188, 39.3372658515626],
                                        [122.343922148438, 39.3460353828126]
                                    ]
                                ],
                                [
                                    [
                                        [122.340767851563, 39.9808266425782],
                                        [122.365889921875, 39.9656728339844],
                                        [122.392345, 39.9695815253907],
                                        [122.402345, 39.9681044746094],
                                        [122.412735625, 39.9696401191406],
                                        [122.43170046875, 39.9581996894531],
                                        [122.45298953125, 39.9494863105469],
                                        [122.47170046875, 39.9381996894532],
                                        [122.507345, 39.923843],
                                        [122.513834257813, 39.918452375],
                                        [122.511793242188, 39.8984523750001],
                                        [122.524381132813, 39.8879958320313],
                                        [122.501793242188, 39.869233625],
                                        [122.504268828125, 39.8449526191407],
                                        [122.484185820313, 39.7547292304688],
                                        [122.545455351563, 39.7281569648438],
                                        [122.561881132813, 39.7083803535156],
                                        [122.578267851563, 39.6947682929688],
                                        [122.591881132813, 39.6483803535157],
                                        [122.603233671875, 39.6285646796876],
                                        [122.563092070313, 39.6111550117188],
                                        [122.561793242188, 39.5984523750001],
                                        [122.5814465625, 39.5821279121094],
                                        [122.543941679688, 39.5658620429688],
                                        [122.512808867188, 39.5283803535157],
                                        [122.496671171875, 39.5149770332031],
                                        [122.532808867188, 39.4993056464844],
                                        [122.551881132813, 39.4883803535156],
                                        [122.567345, 39.483843],
                                        [122.56271609375, 39.4584706855469],
                                        [122.55197390625, 39.4492153144532],
                                        [122.526436796875, 39.4195729804688],
                                        [122.512345, 39.4184413886719],
                                        [122.49560671875, 39.4197866035157],
                                        [122.377515898438, 39.4077407050781],
                                        [122.304234648438, 39.3618422675782],
                                        [122.29271609375, 39.3484706855469],
                                        [122.25197390625, 39.3192153144532],
                                        [122.247345, 39.313843],
                                        [122.172154570313, 39.3085280585938],
                                        [122.142545195313, 39.3191530585938],
                                        [122.132237578125, 39.3185390449219],
                                        [122.0431653125, 39.3303823066407],
                                        [122.002345, 39.3279494453126],
                                        [121.982345, 39.3291408515626],
                                        [121.972345, 39.3285451484375],
                                        [121.962345, 39.3291408515626],
                                        [121.947345, 39.328247296875],
                                        [121.932345, 39.3291408515626],
                                        [121.922076445313, 39.3285292792969],
                                        [121.912076445313, 39.3503176093751],
                                        [121.865465117188, 39.3475392890626],
                                        [121.857345, 39.373843],
                                        [121.88142703125, 39.3897585273438],
                                        [121.897345, 39.3938430000001],
                                        [121.907345, 39.3938430000001],
                                        [121.917345, 39.3938430000001],
                                        [121.917345, 39.4038430000001],
                                        [121.923648710938, 39.4094753242188],
                                        [121.878761015625, 39.4300783515625],
                                        [121.934718046875, 39.5101918769531],
                                        [122.003272734375, 39.5061061835938],
                                        [121.99033328125, 39.5666506171876],
                                        [122.01420046875, 39.6008180976563],
                                        [122.070396757813, 39.5974684882813],
                                        [122.049386015625, 39.6560207343751],
                                        [122.013121367188, 39.6726662421875],
                                        [122.0326575, 39.7086171699219],
                                        [122.030855742188, 39.7388430000001],
                                        [122.075421171875, 39.7492116523438],
                                        [122.11318484375, 39.7697341132813],
                                        [122.1120325, 39.7891091132813],
                                        [122.1326575, 39.7985768867188],
                                        [122.131886015625, 39.8115529609375],
                                        [122.182511015625, 39.8085353828125],
                                        [122.192061796875, 39.8106923652344],
                                        [122.1720325, 39.8285903144532],
                                        [122.173521757813, 39.8536244941407],
                                        [122.221798125, 39.8967568183594],
                                        [122.235211210938, 39.9259780097657],
                                        [122.270679960938, 39.9422585273438],
                                        [122.277345, 39.9638430000001],
                                        [122.312017851563, 39.9796303535157],
                                        [122.322345, 39.9781044746094],
                                        [122.340767851563, 39.9808266425782]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "沙河口区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [121.56142703125, 38.8697585273438],
                                        [121.537345, 38.8638430000001],
                                        [121.530972929688, 38.8790138984376],
                                        [121.546417265625, 38.9391884589844],
                                        [121.587345, 38.9438430000001],
                                        [121.59326296875, 38.9197585273437],
                                        [121.597345, 38.873843],
                                        [121.56142703125, 38.8697585273438]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "瓦房店市" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [121.447345, 39.413843],
                                        [121.456553984375, 39.4372634101562],
                                        [121.43298953125, 39.4249245429688],
                                        [121.430894804688, 39.3847475410157],
                                        [121.399268828125, 39.3661550117188],
                                        [121.352564726563, 39.3794924140625],
                                        [121.312896757813, 39.3745583320313],
                                        [121.347515898438, 39.4200661445313],
                                        [121.371793242188, 39.417046125],
                                        [121.35935671875, 39.4482900214844],
                                        [121.341656523438, 39.4393288398438],
                                        [121.291793242188, 39.3993959785157],
                                        [121.267769804688, 39.3693959785156],
                                        [121.251671171875, 39.3884316230469],
                                        [121.253590117188, 39.4038430000001],
                                        [121.251666289063, 39.4192958808594],
                                        [121.262896757813, 39.4282900214844],
                                        [121.271793242188, 39.4393959785157],
                                        [121.298912382813, 39.4508242011719],
                                        [121.336261015625, 39.4974648261719],
                                        [121.380079375, 39.5029152656251],
                                        [121.39834109375, 39.4801113105469],
                                        [121.417345, 39.503843],
                                        [121.440069609375, 39.5078481269532],
                                        [121.422906523438, 39.5168398261719],
                                        [121.417345, 39.503843],
                                        [121.371265898438, 39.5207643867188],
                                        [121.329000273438, 39.517368390625],
                                        [121.309229765625, 39.4944228339844],
                                        [121.28271609375, 39.5092153144531],
                                        [121.23197390625, 39.5184706855469],
                                        [121.22271609375, 39.5320546699219],
                                        [121.286866484375, 39.5816823554688],
                                        [121.302022734375, 39.5992702460937],
                                        [121.322345, 39.5976381660156],
                                        [121.39423953125, 39.6034145332031],
                                        [121.454273710938, 39.6198439765625],
                                        [121.4519153125, 39.6492018867188],
                                        [121.494742460938, 39.6584706855469],
                                        [121.52388796875, 39.6246413398438],
                                        [121.521944609375, 39.648843],
                                        [121.523629179688, 39.6698146796875],
                                        [121.5019153125, 39.6885195136719],
                                        [121.5030871875, 39.7030519843751],
                                        [121.460738554688, 39.7395351386719],
                                        [121.48271609375, 39.7584706855469],
                                        [121.49197390625, 39.7812404609376],
                                        [121.470738554688, 39.7995351386719],
                                        [121.540240507813, 39.8594142890625],
                                        [121.567345, 39.8572365546875],
                                        [121.607178984375, 39.8604372382813],
                                        [121.639722929688, 39.8982106757813],
                                        [121.690748320313, 39.9209804511719],
                                        [121.776304960938, 39.9141054511719],
                                        [121.795577421875, 39.9572890449219],
                                        [121.83271609375, 39.9684706855469],
                                        [121.858394804688, 39.9827980781251],
                                        [121.87197390625, 40.0006227851563],
                                        [121.831070585938, 40.0188735175782],
                                        [121.890943632813, 40.0415932441407],
                                        [121.948233671875, 40.1080886054688],
                                        [121.967345, 40.113843],
                                        [121.983033476563, 40.0520632148438],
                                        [122.0532825, 40.0659450507813],
                                        [122.081519804688, 40.0480178046875],
                                        [122.161510039063, 40.0319814277344],
                                        [122.183267851563, 40.0016237617188],
                                        [122.210406523438, 39.9962624335937],
                                        [122.241954375, 40.0162917304688],
                                        [122.277345, 39.9638430000001],
                                        [122.270679960938, 39.9422585273438],
                                        [122.235211210938, 39.9259780097657],
                                        [122.221798125, 39.8967568183594],
                                        [122.173521757813, 39.8536244941407],
                                        [122.1720325, 39.8285903144532],
                                        [122.192061796875, 39.8106923652344],
                                        [122.182511015625, 39.8085353828125],
                                        [122.131886015625, 39.8115529609375],
                                        [122.1326575, 39.7985768867188],
                                        [122.1120325, 39.7891091132813],
                                        [122.11318484375, 39.7697341132813],
                                        [122.075421171875, 39.7492116523438],
                                        [122.030855742188, 39.7388430000001],
                                        [122.0326575, 39.7086171699219],
                                        [122.013121367188, 39.6726662421875],
                                        [122.049386015625, 39.6560207343751],
                                        [122.070396757813, 39.5974684882813],
                                        [122.01420046875, 39.6008180976563],
                                        [121.99033328125, 39.5666506171876],
                                        [122.003272734375, 39.5061061835938],
                                        [121.934718046875, 39.5101918769531],
                                        [121.878761015625, 39.4300783515625],
                                        [121.923648710938, 39.4094753242188],
                                        [121.917345, 39.4038430000001],
                                        [121.907345, 39.4038430000001],
                                        [121.907345, 39.3938430000001],
                                        [121.897345, 39.3938430000001],
                                        [121.888531523438, 39.4076076484376],
                                        [121.840279570313, 39.3940468574219],
                                        [121.827345, 39.373843],
                                        [121.817345, 39.373843],
                                        [121.79326296875, 39.3797585273438],
                                        [121.747345, 39.383843],
                                        [121.74298953125, 39.3894863105469],
                                        [121.698839140625, 39.4075551582032],
                                        [121.704615507813, 39.3684755683594],
                                        [121.637564726563, 39.3570851875001],
                                        [121.618082304688, 39.3318447089844],
                                        [121.566910429688, 39.3194863105469],
                                        [121.54298953125, 39.3594863105469],
                                        [121.505889921875, 39.3698171210938],
                                        [121.4786340625, 39.4051308417969],
                                        [121.447345, 39.413843]
                                    ],
                                    [
                                        [121.477345, 39.523843],
                                        [121.471910429688, 39.5365395332031],
                                        [121.454346953125, 39.5278957343751],
                                        [121.477345, 39.523843]
                                    ],
                                    [
                                        [121.537345, 39.603843],
                                        [121.533922148438, 39.6160353828125],
                                        [121.525152617188, 39.6072658515626],
                                        [121.542779570313, 39.5911464667969],
                                        [121.560343046875, 39.599790265625],
                                        [121.537345, 39.603843]
                                    ],
                                    [
                                        [121.807345, 39.9338430000001],
                                        [121.803922148438, 39.9460353828126],
                                        [121.795152617188, 39.9372658515625],
                                        [121.807345, 39.9338430000001]
                                    ],
                                    [
                                        [121.887345, 39.993843],
                                        [121.883922148438, 40.0060353828125],
                                        [121.875152617188, 39.9972658515625],
                                        [121.887345, 39.993843]
                                    ]
                                ]
                            ]
                        }
                    }]
                }

                ;
            });

            define("echarts/util/mapData/geoJson/anshan", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": { "name": "海城市" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [122.327345, 40.9638430000001],
                                        [122.315152617188, 40.9672658515625],
                                        [122.323922148438, 40.9760353828126],
                                        [122.327345, 40.9638430000001]
                                    ]
                                ],
                                [
                                    [
                                        [122.327345, 40.9638430000001],
                                        [122.347345, 40.9638430000001],
                                        [122.347345, 40.973843],
                                        [122.359537382813, 40.9772658515626],
                                        [122.350767851563, 40.9860353828125],
                                        [122.347345, 40.973843],
                                        [122.337345, 40.973843],
                                        [122.337345, 40.983843],
                                        [122.346158476563, 40.9976076484375],
                                        [122.38310671875, 40.9872231269532],
                                        [122.39158328125, 41.0004628730469],
                                        [122.406158476563, 40.9963661933594],
                                        [122.417345, 41.013843],
                                        [122.441959257813, 41.0212538886719],
                                        [122.413756132813, 41.0455495429688],
                                        [122.4427746875, 41.0584963203126],
                                        [122.441304960938, 41.0767909980469],
                                        [122.515513945313, 41.0936501289063],
                                        [122.53271609375, 41.1084706855469],
                                        [122.54197390625, 41.1192153144532],
                                        [122.593287382813, 41.1421120429688],
                                        [122.591163359375, 41.1685195136719],
                                        [122.597345, 41.173843],
                                        [122.614586210938, 41.1686525703125],
                                        [122.63197390625, 41.1484706855469],
                                        [122.66271609375, 41.1392153144531],
                                        [122.700909453125, 41.1121352363282],
                                        [122.827345, 41.083843],
                                        [122.85218875, 41.0785353828125],
                                        [122.892061796875, 41.0809120917969],
                                        [122.882628203125, 41.0585622382812],
                                        [122.86615359375, 41.043843],
                                        [122.891910429688, 41.0208278632813],
                                        [122.832628203125, 40.9831215644531],
                                        [122.872276640625, 40.9769789863282],
                                        [122.900494414063, 41.0085622382813],
                                        [122.932628203125, 40.9991237617187],
                                        [122.942061796875, 40.9885622382813],
                                        [122.987086210938, 40.9780861640625],
                                        [123.035094023438, 40.9475551582032],
                                        [123.052061796875, 40.9285622382813],
                                        [123.057345, 40.9238430000001],
                                        [123.063585234375, 40.8984291816406],
                                        [123.040347929688, 40.8627443671876],
                                        [123.043468046875, 40.8488430000001],
                                        [123.041051054688, 40.8380605292969],
                                        [123.097345, 40.8183266425781],
                                        [123.08326296875, 40.7979274726563],
                                        [123.06326296875, 40.7841188789063],
                                        [123.07142703125, 40.7579274726563],
                                        [123.11904421875, 40.7258632636719],
                                        [123.127345, 40.713843],
                                        [123.136178007813, 40.6600661445313],
                                        [123.11170046875, 40.6194863105469],
                                        [123.101373320313, 40.5705336738281],
                                        [123.06170046875, 40.5594863105469],
                                        [123.05298953125, 40.5381996894532],
                                        [123.03154421875, 40.5092726875],
                                        [123.033170195313, 40.4982717109375],
                                        [122.997345, 40.483843],
                                        [122.98170046875, 40.4881996894531],
                                        [122.96490359375, 40.5099599433594],
                                        [122.951832304688, 40.5080287910156],
                                        [122.94298953125, 40.5194863105469],
                                        [122.922266875, 40.5354811835937],
                                        [122.867345, 40.5273647285157],
                                        [122.825264921875, 40.5335842109375],
                                        [122.7987121875, 40.5679848457031],
                                        [122.72170046875, 40.5881996894532],
                                        [122.69244265625, 40.5997023750001],
                                        [122.652554960938, 40.5880727363282],
                                        [122.637261992188, 40.5903334785157],
                                        [122.653267851563, 40.659408185547],
                                        [122.62170046875, 40.6681996894532],
                                        [122.61298953125, 40.6827614570313],
                                        [122.64744265625, 40.7093544746094],
                                        [122.640230742188, 40.7581362128906],
                                        [122.571832304688, 40.7480287910157],
                                        [122.56298953125, 40.7594863105469],
                                        [122.515660429688, 40.7694741035156],
                                        [122.536392851563, 40.8038430000001],
                                        [122.518795195313, 40.8330178046876],
                                        [122.481080351563, 40.8484535957032],
                                        [122.494327421875, 40.8704201484375],
                                        [122.490362578125, 40.8972658515625],
                                        [122.506470976563, 40.9239699531251],
                                        [122.46607546875, 40.9405007148438],
                                        [122.385640898438, 40.9218617988281],
                                        [122.362735625, 40.9080458808594],
                                        [122.34478640625, 40.91069846875],
                                        [122.327345, 40.903843],
                                        [122.317345, 40.903843],
                                        [122.320704375, 40.920483625],
                                        [122.333985625, 40.927202375],
                                        [122.345401640625, 40.9497670722656],
                                        [122.330704375, 40.957202375],
                                        [122.327345, 40.9638430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "立山区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.02361453125, 41.17284690625],
                                        [123.068565703125, 41.1368508125001],
                                        [123.027345, 41.103843],
                                        [123.02062625, 41.11712425],
                                        [123.000704375, 41.127202375],
                                        [122.997345, 41.133843],
                                        [123.007345, 41.133843],
                                        [123.007345, 41.163843],
                                        [122.997345, 41.163843],
                                        [123.007345, 41.1838430000001],
                                        [123.007345, 41.1938430000001],
                                        [123.027345, 41.1938430000001],
                                        [123.027345, 41.203843],
                                        [123.047345, 41.203843],
                                        [123.047345, 41.1938430000001],
                                        [123.042896757813, 41.1882900214844],
                                        [123.02361453125, 41.17284690625]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "千山区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [122.997345, 41.163843],
                                        [122.952623320313, 41.1384181953126],
                                        [122.941983671875, 41.1392739082032],
                                        [122.93271609375, 41.0942690253906],
                                        [122.967345, 41.083843],
                                        [123.007345, 41.0694899726563],
                                        [123.027345, 41.103843],
                                        [123.068565703125, 41.1368508125001],
                                        [123.02361453125, 41.17284690625],
                                        [123.042896757813, 41.1882900214844],
                                        [123.047345, 41.1938430000001],
                                        [123.0855090625, 41.1760231757813],
                                        [123.117345, 41.1838430000001],
                                        [123.117345, 41.173843],
                                        [123.127345, 41.173843],
                                        [123.131519804688, 41.1580178046875],
                                        [123.143453398438, 41.1494631171875],
                                        [123.134351835938, 41.1033864570313],
                                        [123.162345, 41.0978554511719],
                                        [123.200079375, 41.1053115058594],
                                        [123.203331328125, 41.088843],
                                        [123.201236601563, 41.0782228828125],
                                        [123.22021609375, 41.0646181464844],
                                        [123.223453398438, 41.0482228828126],
                                        [123.2007434375, 41.0319448066407],
                                        [123.204361601563, 41.0136342597657],
                                        [123.180484648438, 40.9803188300782],
                                        [123.129386015625, 40.9904152656251],
                                        [123.084146757813, 40.9729677558594],
                                        [123.081358671875, 40.9588430000001],
                                        [123.087315703125, 40.9286879707032],
                                        [123.057345, 40.9238430000001],
                                        [123.052061796875, 40.9285622382813],
                                        [123.035094023438, 40.9475551582032],
                                        [122.987086210938, 40.9780861640625],
                                        [122.942061796875, 40.9885622382813],
                                        [122.932628203125, 40.9991237617187],
                                        [122.900494414063, 41.0085622382813],
                                        [122.872276640625, 40.9769789863282],
                                        [122.832628203125, 40.9831215644531],
                                        [122.891910429688, 41.0208278632813],
                                        [122.86615359375, 41.043843],
                                        [122.882628203125, 41.0585622382812],
                                        [122.892061796875, 41.0809120917969],
                                        [122.85218875, 41.0785353828125],
                                        [122.827345, 41.083843],
                                        [122.842896757813, 41.1082900214844],
                                        [122.851793242188, 41.1393959785157],
                                        [122.862896757813, 41.1482900214844],
                                        [122.871793242188, 41.1593959785156],
                                        [122.888453398438, 41.1727370429688],
                                        [122.902940703125, 41.1908327460938],
                                        [122.972706328125, 41.1995095039063],
                                        [122.991793242188, 41.1882900214844],
                                        [123.007345, 41.1838430000001],
                                        [122.997345, 41.163843]
                                    ]
                                ],
                                [
                                    [
                                        [123.027345, 41.1938430000001],
                                        [123.007345, 41.1938430000001],
                                        [123.007345, 41.203843],
                                        [123.027345, 41.203843],
                                        [123.027345, 41.1938430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "台安县" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [122.607345, 41.203843],
                                        [122.617345, 41.203843],
                                        [122.612345, 41.1910353828125],
                                        [122.607345, 41.203843]
                                    ]
                                ],
                                [
                                    [
                                        [122.597345, 41.513843],
                                        [122.585152617188, 41.5104201484376],
                                        [122.593922148438, 41.5016506171875],
                                        [122.624195585938, 41.5063661933594],
                                        [122.621607695313, 41.4888430000001],
                                        [122.623082304688, 41.478843],
                                        [122.6216028125, 41.4688088203125],
                                        [122.627345, 41.433843],
                                        [122.615152617188, 41.4304201484376],
                                        [122.623922148438, 41.4216506171875],
                                        [122.627345, 41.433843],
                                        [122.634483671875, 41.4283315253907],
                                        [122.630284453125, 41.3998867011719],
                                        [122.642345, 41.3981044746094],
                                        [122.660592070313, 41.4007997871094],
                                        [122.640362578125, 41.3672658515625],
                                        [122.644068632813, 41.3421877265625],
                                        [122.59306765625, 41.3028212714844],
                                        [122.58298953125, 41.2781996894532],
                                        [122.545748320313, 41.2494557929688],
                                        [122.5976965625, 41.2384938789063],
                                        [122.607345, 41.203843],
                                        [122.597345, 41.203843],
                                        [122.597345, 41.173843],
                                        [122.591163359375, 41.1685195136719],
                                        [122.593287382813, 41.1421120429688],
                                        [122.54197390625, 41.1192153144532],
                                        [122.53271609375, 41.1084706855469],
                                        [122.515513945313, 41.0936501289063],
                                        [122.441304960938, 41.0767909980469],
                                        [122.4427746875, 41.0584963203126],
                                        [122.413756132813, 41.0455495429688],
                                        [122.441959257813, 41.0212538886719],
                                        [122.417345, 41.013843],
                                        [122.400308867188, 41.0285195136719],
                                        [122.404874296875, 41.0853444648438],
                                        [122.383331328125, 41.1239601875],
                                        [122.37271609375, 41.1592153144532],
                                        [122.3619153125, 41.1685195136719],
                                        [122.363370390625, 41.1866249824219],
                                        [122.40271609375, 41.1984706855469],
                                        [122.41197390625, 41.2092153144532],
                                        [122.43271609375, 41.2184706855469],
                                        [122.45197390625, 41.2292153144532],
                                        [122.47271609375, 41.2384706855469],
                                        [122.48197390625, 41.2508217597657],
                                        [122.452345, 41.2484413886719],
                                        [122.407003203125, 41.2520851875],
                                        [122.332652617188, 41.1884169746095],
                                        [122.307345, 41.1904494453126],
                                        [122.25584109375, 41.1863112617188],
                                        [122.20603640625, 41.2141005683594],
                                        [122.241593046875, 41.244731671875],
                                        [122.25197390625, 41.2792153144532],
                                        [122.26271609375, 41.2984706855469],
                                        [122.273829375, 41.3353774238282],
                                        [122.271793242188, 41.3607021308594],
                                        [122.23197390625, 41.3784706855469],
                                        [122.206090117188, 41.40851096875],
                                        [122.187345, 41.4538430000001],
                                        [122.187345, 41.463843],
                                        [122.197345, 41.463843],
                                        [122.197345, 41.473843],
                                        [122.247340117188, 41.5059535957031],
                                        [122.355523710938, 41.5489553046875],
                                        [122.46298953125, 41.5581996894531],
                                        [122.477345, 41.5638430000001],
                                        [122.4934778125, 41.5595864082032],
                                        [122.489678984375, 41.5403578925782],
                                        [122.512345, 41.5358791328125],
                                        [122.537447539063, 41.5408388496095],
                                        [122.593170195313, 41.5296681953125],
                                        [122.597345, 41.513843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "铁东区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.027345, 41.103843],
                                        [123.007345, 41.0694899726563],
                                        [122.967345, 41.083843],
                                        [122.990704375, 41.1304836250001],
                                        [122.997345, 41.133843],
                                        [123.000704375, 41.127202375],
                                        [123.02062625, 41.11712425],
                                        [123.027345, 41.103843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "铁西区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.007345, 41.163843],
                                        [123.007345, 41.133843],
                                        [122.997345, 41.133843],
                                        [122.990704375, 41.1304836250001],
                                        [122.967345, 41.083843],
                                        [122.93271609375, 41.0942690253906],
                                        [122.941983671875, 41.1392739082032],
                                        [122.952623320313, 41.1384181953126],
                                        [122.997345, 41.163843],
                                        [123.007345, 41.163843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "岫岩满族自治县" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.551793242188, 40.8082900214844],
                                        [123.578018828125, 40.7723891425781],
                                        [123.553448515625, 40.7527150703125],
                                        [123.550611601563, 40.7299062324219],
                                        [123.573013945313, 40.6992348457031],
                                        [123.571163359375, 40.6843422675781],
                                        [123.625206328125, 40.6910646796875],
                                        [123.652896757813, 40.6793959785157],
                                        [123.671793242188, 40.6682900214844],
                                        [123.728844023438, 40.651977765625],
                                        [123.735391875, 40.599341046875],
                                        [123.71127078125, 40.5891762519532],
                                        [123.733316679688, 40.5516689277344],
                                        [123.731085234375, 40.5337026191407],
                                        [123.741793242188, 40.5082900214844],
                                        [123.755284453125, 40.4974843574219],
                                        [123.751724882813, 40.4688430000001],
                                        [123.754830351563, 40.443843],
                                        [123.751099882813, 40.413843],
                                        [123.7537903125, 40.3922365546875],
                                        [123.722896757813, 40.3482900214844],
                                        [123.700308867188, 40.3302016425782],
                                        [123.70341921875, 40.3051955390625],
                                        [123.652896757813, 40.2682900214844],
                                        [123.631793242188, 40.2593959785157],
                                        [123.612896757813, 40.2482900214844],
                                        [123.590982695313, 40.2390554023438],
                                        [123.552896757813, 40.1742665839844],
                                        [123.576431914063, 40.166821515625],
                                        [123.607345, 40.173843],
                                        [123.595211210938, 40.1314064765625],
                                        [123.558717070313, 40.1099538398438],
                                        [123.520640898438, 40.099067609375],
                                        [123.471666289063, 40.0693178535156],
                                        [123.47474734375, 40.0445363593751],
                                        [123.421793242188, 40.0293959785157],
                                        [123.397345, 40.0138430000001],
                                        [123.38170046875, 40.0094863105469],
                                        [123.372686796875, 39.9978115058594],
                                        [123.313219023438, 40.0211891914063],
                                        [123.283922148438, 40.0168593574219],
                                        [123.26298953125, 40.0294863105469],
                                        [123.2310559375, 40.0425551582031],
                                        [123.20298953125, 40.0594863105469],
                                        [123.13369265625, 40.0712587714844],
                                        [123.112345, 40.0681044746094],
                                        [123.092857695313, 40.0709841132813],
                                        [123.073883085938, 40.0463991523438],
                                        [123.036549101563, 40.0519155097657],
                                        [123.02298953125, 40.0694863105469],
                                        [123.00170046875, 40.0781996894532],
                                        [122.98045046875, 40.0910182929688],
                                        [122.9831653125, 40.1093825507813],
                                        [122.940982695313, 40.1346108222656],
                                        [122.94312625, 40.1491347480469],
                                        [122.930123320313, 40.1822096992188],
                                        [122.89978640625, 40.1777260566406],
                                        [122.887345, 40.1938430000001],
                                        [122.88298953125, 40.2294863105469],
                                        [122.86662234375, 40.2711244941406],
                                        [122.887345, 40.323843],
                                        [122.920416289063, 40.333051984375],
                                        [122.93298953125, 40.4070607734375],
                                        [122.9870325, 40.4221108222657],
                                        [122.98154421875, 40.4592458320313],
                                        [122.997345, 40.483843],
                                        [123.033170195313, 40.4982717109375],
                                        [123.03154421875, 40.5092726875],
                                        [123.05298953125, 40.5381996894532],
                                        [123.06170046875, 40.5594863105469],
                                        [123.101373320313, 40.5705336738281],
                                        [123.11170046875, 40.6194863105469],
                                        [123.136178007813, 40.6600661445313],
                                        [123.127345, 40.713843],
                                        [123.148619414063, 40.7227797675782],
                                        [123.172345, 40.7073305488282],
                                        [123.204796171875, 40.7284633613282],
                                        [123.25326296875, 40.7379274726562],
                                        [123.322022734375, 40.7700356269532],
                                        [123.338297148438, 40.7663881660156],
                                        [123.387022734375, 40.7788930488281],
                                        [123.40435671875, 40.8039968085938],
                                        [123.439141875, 40.7961977363282],
                                        [123.472066679688, 40.8100258613281],
                                        [123.482491484375, 40.8076894355469],
                                        [123.52142703125, 40.8197585273438],
                                        [123.547345, 40.823843],
                                        [123.551793242188, 40.8082900214844]
                                    ]
                                ]
                            ]
                        }
                    }]
                }

                ;
            });

            define("echarts/util/mapData/geoJson/benxi", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": { "name": "本溪满族自治县" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.917237578125, 41.5674318671875],
                                        [123.933687773438, 41.5453139472656],
                                        [123.982603789063, 41.5598720527344],
                                        [124.001612578125, 41.5481081367188],
                                        [124.033077421875, 41.5395778632813],
                                        [124.065050078125, 41.5267263007813],
                                        [124.094049101563, 41.5317189765626],
                                        [124.114058867188, 41.5048183417969],
                                        [124.163077421875, 41.5181081367188],
                                        [124.188580351563, 41.5338906074219],
                                        [124.232345, 41.5414260078126],
                                        [124.257345, 41.5371218085938],
                                        [124.284049101563, 41.5417189765625],
                                        [124.301612578125, 41.5181081367188],
                                        [124.31330203125, 41.5094106269531],
                                        [124.31025515625, 41.4917031074219],
                                        [124.341886015625, 41.4679030585938],
                                        [124.35812625, 41.4706996894531],
                                        [124.373077421875, 41.4595778632813],
                                        [124.377345, 41.4538430000001],
                                        [124.372628203125, 41.4485622382813],
                                        [124.342628203125, 41.4217568183594],
                                        [124.352061796875, 41.3885622382813],
                                        [124.392867460938, 41.3626113105469],
                                        [124.39197390625, 41.3475783515625],
                                        [124.412628203125, 41.3291237617188],
                                        [124.426392851563, 41.2991237617187],
                                        [124.462628203125, 41.3085622382813],
                                        [124.476168242188, 41.3380678535156],
                                        [124.512061796875, 41.3185622382813],
                                        [124.532628203125, 41.3091237617188],
                                        [124.590011015625, 41.2690395332032],
                                        [124.632628203125, 41.2591237617188],
                                        [124.648785429688, 41.241040265625],
                                        [124.695343046875, 41.2663393378907],
                                        [124.75209109375, 41.2697219062501],
                                        [124.757345, 41.2638430000001],
                                        [124.737428007813, 41.2239138007813],
                                        [124.748004179688, 41.2022585273438],
                                        [124.730704375, 41.180483625],
                                        [124.727345, 41.1538430000001],
                                        [124.708101835938, 41.1306764960938],
                                        [124.679234648438, 41.1181569648438],
                                        [124.656490507813, 41.0907753730469],
                                        [124.566436796875, 41.0999550605469],
                                        [124.541881132813, 41.0893056464844],
                                        [124.528267851563, 41.0729177070312],
                                        [124.511881132813, 41.0593056464844],
                                        [124.507345, 41.043843],
                                        [124.472808867188, 41.0593056464844],
                                        [124.4209778125, 41.0745143867188],
                                        [124.392667265625, 41.0583010078125],
                                        [124.382345, 41.0593520332032],
                                        [124.363531523438, 41.0574355292969],
                                        [124.34244265625, 41.0695156074219],
                                        [124.310474882813, 41.0575051093751],
                                        [124.290885039063, 41.0595021796876],
                                        [124.294361601563, 41.0936354804688],
                                        [124.230987578125, 41.0871755195313],
                                        [124.2328528125, 41.068843],
                                        [124.231138945313, 41.0519924140626],
                                        [124.201881132813, 41.0393056464844],
                                        [124.18107546875, 41.0273879218751],
                                        [124.137345, 41.0524343085937],
                                        [124.112808867188, 41.0383803535156],
                                        [124.091456328125, 41.0291213203126],
                                        [124.102808867188, 41.0093056464844],
                                        [124.111881132813, 40.9883803535157],
                                        [124.122896757813, 40.979233625],
                                        [124.121636992188, 40.9668910957032],
                                        [124.1431653125, 40.9490077949219],
                                        [124.130069609375, 40.9261440253906],
                                        [124.136803007813, 40.86011253125],
                                        [124.096612578125, 40.8426833320313],
                                        [124.081954375, 40.8603322578126],
                                        [124.062345, 40.8583339667969],
                                        [124.037345, 40.8608815742188],
                                        [124.012345, 40.8583339667969],
                                        [123.97541140625, 40.8620973945313],
                                        [123.929957304688, 40.8261232734376],
                                        [123.856339140625, 40.8467055488282],
                                        [123.82250125, 40.8594203925781],
                                        [123.75892703125, 40.8476625800782],
                                        [123.741988554688, 40.8493886542969],
                                        [123.696690703125, 40.8135390449219],
                                        [123.612808867188, 40.8493056464844],
                                        [123.587345, 40.853843],
                                        [123.62197390625, 40.9092153144531],
                                        [123.64271609375, 40.9384706855469],
                                        [123.647345, 40.973843],
                                        [123.653170195313, 40.9780178046875],
                                        [123.702896757813, 40.9878444648437],
                                        [123.72216921875, 41.0000795722656],
                                        [123.751519804688, 40.9880178046876],
                                        [123.793170195313, 40.9796681953125],
                                        [123.801519804688, 40.9580178046875],
                                        [123.819088164063, 40.9454262519532],
                                        [123.855308867188, 40.968423078125],
                                        [123.91500125, 40.9803908515625],
                                        [123.911236601563, 40.9994631171875],
                                        [123.923170195313, 41.0080178046875],
                                        [123.931519804688, 41.0196681953125],
                                        [123.9469153125, 41.0307033515626],
                                        [123.94127078125, 41.0592763496094],
                                        [123.95341921875, 41.0784096503906],
                                        [123.947681914063, 41.1074428535156],
                                        [123.983170195313, 41.1280178046875],
                                        [123.991519804688, 41.1693483710938],
                                        [123.977345, 41.203843],
                                        [124.00326296875, 41.2179274726563],
                                        [124.01142703125, 41.2341188789063],
                                        [123.99142703125, 41.2479274726563],
                                        [123.98326296875, 41.2641188789063],
                                        [124.00326296875, 41.2779274726563],
                                        [124.02142703125, 41.3076625800782],
                                        [123.971724882813, 41.3204189277344],
                                        [123.95326296875, 41.3697585273438],
                                        [123.91713015625, 41.3832778144532],
                                        [123.865694609375, 41.3717482734376],
                                        [123.84654421875, 41.3994826484375],
                                        [123.885474882813, 41.4263600898438],
                                        [123.87142703125, 41.4479274726563],
                                        [123.857345, 41.503843],
                                        [123.857345, 41.513843],
                                        [123.863258085938, 41.5285488105469],
                                        [123.858306914063, 41.5572878242188],
                                        [123.917237578125, 41.5674318671875]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "桓仁满族自治县" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [125.469176054688, 41.5556740546875],
                                        [125.48142703125, 41.5379274726562],
                                        [125.49361453125, 41.5295131660156],
                                        [125.489254179688, 41.5100478339844],
                                        [125.51142703125, 41.4779274726563],
                                        [125.535709257813, 41.468843],
                                        [125.531221953125, 41.448843],
                                        [125.533468046875, 41.438843],
                                        [125.530943632813, 41.4275966621094],
                                        [125.55142703125, 41.3979274726563],
                                        [125.57326296875, 41.3897585273438],
                                        [125.58142703125, 41.3679274726563],
                                        [125.607345, 41.363843],
                                        [125.61170046875, 41.3581996894531],
                                        [125.625811796875, 41.3473073554688],
                                        [125.620362578125, 41.3104201484375],
                                        [125.63298953125, 41.2894863105469],
                                        [125.642345, 41.266626203125],
                                        [125.673883085938, 41.2712868476563],
                                        [125.69170046875, 41.2481996894531],
                                        [125.750831328125, 41.2381545234375],
                                        [125.727701445313, 41.1793129707032],
                                        [125.781085234375, 41.1644472480469],
                                        [125.76170046875, 41.1494863105469],
                                        [125.75298953125, 41.1281996894531],
                                        [125.713560820313, 41.1120619941406],
                                        [125.711529570313, 41.0983315253907],
                                        [125.73170046875, 41.0827614570313],
                                        [125.710865507813, 41.0442800117188],
                                        [125.682276640625, 41.022212140625],
                                        [125.67298953125, 40.9781996894531],
                                        [125.648365507813, 40.9681215644532],
                                        [125.63298953125, 40.9481996894531],
                                        [125.593746367188, 40.9321388984375],
                                        [125.58298953125, 40.9181996894532],
                                        [125.577345, 40.913843],
                                        [125.565982695313, 40.9270314765626],
                                        [125.52713015625, 40.9053530097657],
                                        [125.49271609375, 40.9261598945313],
                                        [125.529049101563, 40.9774025703125],
                                        [125.490367460938, 40.988470685547],
                                        [125.49291140625, 40.9567885566406],
                                        [125.450445585938, 40.9602004218751],
                                        [125.455025664063, 41.0172243476563],
                                        [125.434508085938, 41.0349001289063],
                                        [125.422691679688, 41.0084133125001],
                                        [125.381715117188, 41.0117055488281],
                                        [125.382974882813, 40.9959804511719],
                                        [125.340382109375, 40.9994020820313],
                                        [125.3427746875, 41.0291786933594],
                                        [125.31197390625, 41.0484706855469],
                                        [125.287320585938, 41.0878285957032],
                                        [125.25197390625, 41.0984706855469],
                                        [125.222266875, 41.109380109375],
                                        [125.202623320313, 41.0984194160157],
                                        [125.172345, 41.1008522773438],
                                        [125.089620390625, 41.094204328125],
                                        [125.04654421875, 41.1182375312501],
                                        [124.992266875, 41.098305890625],
                                        [124.97271609375, 41.1092153144531],
                                        [124.90197390625, 41.1184706855469],
                                        [124.87271609375, 41.1292153144532],
                                        [124.825714140625, 41.1398928046875],
                                        [124.760875273438, 41.1281374335937],
                                        [124.74271609375, 41.1492153144532],
                                        [124.727345, 41.1538430000001],
                                        [124.730704375, 41.180483625],
                                        [124.748004179688, 41.2022585273438],
                                        [124.737428007813, 41.2239138007813],
                                        [124.757345, 41.2638430000001],
                                        [124.797081328125, 41.2935036445313],
                                        [124.83298953125, 41.3081996894532],
                                        [124.84170046875, 41.3194863105469],
                                        [124.8701965625, 41.3311501289063],
                                        [124.85048953125, 41.3812831855469],
                                        [124.853082304688, 41.398843],
                                        [124.849429960938, 41.4235854316407],
                                        [124.86170046875, 41.4394863105469],
                                        [124.87298953125, 41.4481996894531],
                                        [124.881905546875, 41.4699806953126],
                                        [124.931080351563, 41.5064394355469],
                                        [124.955484648438, 41.5100453925782],
                                        [124.991954375, 41.4880458808594],
                                        [125.009190703125, 41.4905934882812],
                                        [125.060914335938, 41.475512921875],
                                        [125.072686796875, 41.4907656074219],
                                        [125.132735625, 41.4996401191407],
                                        [125.15615359375, 41.485512921875],
                                        [125.192686796875, 41.4998744941406],
                                        [125.208424101563, 41.4794863105469],
                                        [125.24298953125, 41.4881996894532],
                                        [125.251832304688, 41.4996572089844],
                                        [125.316715117188, 41.4900698066406],
                                        [125.345914335938, 41.5278993964844],
                                        [125.383922148438, 41.5508266425781],
                                        [125.412345, 41.5466262031251],
                                        [125.432345, 41.5495815253906],
                                        [125.442857695313, 41.5480287910156],
                                        [125.45170046875, 41.5594863105469],
                                        [125.457345, 41.5638430000001],
                                        [125.469176054688, 41.5556740546875]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "明山区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.84654421875, 41.3994826484375],
                                        [123.865694609375, 41.3717482734376],
                                        [123.91713015625, 41.3832778144532],
                                        [123.95326296875, 41.3697585273438],
                                        [123.971724882813, 41.3204189277344],
                                        [124.02142703125, 41.3076625800782],
                                        [124.00326296875, 41.2779274726563],
                                        [123.98326296875, 41.2641188789063],
                                        [123.99142703125, 41.2479274726563],
                                        [124.01142703125, 41.2341188789063],
                                        [124.00326296875, 41.2179274726563],
                                        [123.977345, 41.203843],
                                        [123.94142703125, 41.2079274726563],
                                        [123.907345, 41.2222426582031],
                                        [123.872310820313, 41.2075283027344],
                                        [123.811553984375, 41.235063703125],
                                        [123.777345, 41.243843],
                                        [123.769615507813, 41.2664186835938],
                                        [123.791715117188, 41.2876491523438],
                                        [123.747345, 41.293843],
                                        [123.7560559375, 41.3051308417969],
                                        [123.787740507813, 41.3295876289063],
                                        [123.747945585938, 41.3832631660157],
                                        [123.76298953125, 41.4081996894531],
                                        [123.783316679688, 41.4578700996094],
                                        [123.83298953125, 41.4781996894531],
                                        [123.8460559375, 41.4951308417969],
                                        [123.857345, 41.503843],
                                        [123.87142703125, 41.4479274726563],
                                        [123.885474882813, 41.4263600898438],
                                        [123.84654421875, 41.3994826484375]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "南芬区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.811553984375, 41.235063703125],
                                        [123.872310820313, 41.2075283027344],
                                        [123.907345, 41.2222426582031],
                                        [123.94142703125, 41.2079274726563],
                                        [123.977345, 41.203843],
                                        [123.991519804688, 41.1693483710938],
                                        [123.983170195313, 41.1280178046875],
                                        [123.947681914063, 41.1074428535156],
                                        [123.95341921875, 41.0784096503906],
                                        [123.94127078125, 41.0592763496094],
                                        [123.9469153125, 41.0307033515626],
                                        [123.931519804688, 41.0196681953125],
                                        [123.923170195313, 41.0080178046875],
                                        [123.911236601563, 40.9994631171875],
                                        [123.91500125, 40.9803908515625],
                                        [123.855308867188, 40.968423078125],
                                        [123.819088164063, 40.9454262519532],
                                        [123.801519804688, 40.9580178046875],
                                        [123.793170195313, 40.9796681953125],
                                        [123.751519804688, 40.9880178046876],
                                        [123.72216921875, 41.0000795722656],
                                        [123.702896757813, 40.9878444648437],
                                        [123.653170195313, 40.9780178046875],
                                        [123.647345, 40.973843],
                                        [123.654849882813, 41.0338356757813],
                                        [123.684830351563, 41.05784690625],
                                        [123.666236601563, 41.0727370429688],
                                        [123.647633085938, 41.0959694648438],
                                        [123.653004179688, 41.139126203125],
                                        [123.647345, 41.1538430000001],
                                        [123.692345, 41.1482204414063],
                                        [123.707345, 41.1500868964844],
                                        [123.735484648438, 41.146587140625],
                                        [123.781793242188, 41.1572206855469],
                                        [123.751793242188, 41.1982900214844],
                                        [123.742896757813, 41.2256484199219],
                                        [123.772896757813, 41.2382900214844],
                                        [123.777345, 41.243843],
                                        [123.811553984375, 41.235063703125]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "平山区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.673531523438, 41.3000307441406],
                                        [123.681383085938, 41.2666994453125],
                                        [123.713531523438, 41.2776552558594],
                                        [123.731158476563, 41.2900307441407],
                                        [123.747345, 41.293843],
                                        [123.791715117188, 41.2876491523438],
                                        [123.769615507813, 41.2664186835938],
                                        [123.777345, 41.243843],
                                        [123.772896757813, 41.2382900214844],
                                        [123.742896757813, 41.2256484199219],
                                        [123.751793242188, 41.1982900214844],
                                        [123.781793242188, 41.1572206855469],
                                        [123.735484648438, 41.146587140625],
                                        [123.707345, 41.1500868964844],
                                        [123.692345, 41.1482204414063],
                                        [123.647345, 41.1538430000001],
                                        [123.634034453125, 41.1605776191406],
                                        [123.613985625, 41.2004836250001],
                                        [123.599420195313, 41.2078530097657],
                                        [123.60478640625, 41.218843],
                                        [123.595504179688, 41.2378530097656],
                                        [123.607345, 41.243843],
                                        [123.6660559375, 41.2511855292969],
                                        [123.651578398438, 41.288843],
                                        [123.657345, 41.3038430000001],
                                        [123.673531523438, 41.3000307441406]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "溪湖区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.781143828125, 41.5339919257813],
                                        [123.793673125, 41.5033827949219],
                                        [123.857345, 41.513843],
                                        [123.857345, 41.503843],
                                        [123.8460559375, 41.4951308417969],
                                        [123.83298953125, 41.4781996894531],
                                        [123.783316679688, 41.4578700996094],
                                        [123.76298953125, 41.4081996894531],
                                        [123.747945585938, 41.3832631660157],
                                        [123.787740507813, 41.3295876289063],
                                        [123.7560559375, 41.3051308417969],
                                        [123.747345, 41.293843],
                                        [123.731158476563, 41.2900307441407],
                                        [123.713531523438, 41.2776552558594],
                                        [123.681383085938, 41.2666994453125],
                                        [123.673531523438, 41.3000307441406],
                                        [123.657345, 41.3038430000001],
                                        [123.65142703125, 41.3279274726563],
                                        [123.64326296875, 41.3897585273438],
                                        [123.6307825, 41.4089223457032],
                                        [123.653580351563, 41.4383376289062],
                                        [123.649112578125, 41.4582570625],
                                        [123.603902617188, 41.469858625],
                                        [123.587345, 41.4938430000001],
                                        [123.628258085938, 41.5208803535157],
                                        [123.642345, 41.5177223945313],
                                        [123.662345, 41.5222060371094],
                                        [123.682345, 41.5177223945313],
                                        [123.692789335938, 41.5200637031251],
                                        [123.711900664063, 41.507622296875],
                                        [123.728756132813, 41.5114003730469],
                                        [123.737345, 41.523843],
                                        [123.781143828125, 41.5339919257813]
                                    ]
                                ]
                            ]
                        }
                    }]
                }

                ;
            });

            define("echarts/util/mapData/geoJson/fushun", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": { "name": "望花区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.777345, 41.973843],
                                        [123.77326296875, 41.9479274726563],
                                        [123.75326296875, 41.9172145820313],
                                        [123.773765898438, 41.8687990546875],
                                        [123.817345, 41.863843],
                                        [123.833013945313, 41.8411464667969],
                                        [123.907652617188, 41.8578798652344],
                                        [123.917345, 41.843843],
                                        [123.912535429688, 41.8386525703126],
                                        [123.872535429688, 41.8259877753906],
                                        [123.896090117188, 41.7835378242187],
                                        [123.922535429688, 41.7590334296876],
                                        [123.932154570313, 41.7486525703125],
                                        [123.942535429688, 41.7390334296875],
                                        [123.947345, 41.733843],
                                        [123.880704375, 41.737202375],
                                        [123.81545046875, 41.769720685547],
                                        [123.827203398438, 41.7937953925782],
                                        [123.787486601563, 41.8138893867188],
                                        [123.777345, 41.7938430000001],
                                        [123.703414335938, 41.7728810859375],
                                        [123.652808867188, 41.7917678046875],
                                        [123.673834257813, 41.809233625],
                                        [123.67166140625, 41.8305361152344],
                                        [123.712808867188, 41.8483803535156],
                                        [123.74076296875, 41.8643910957031],
                                        [123.711324492188, 41.888843],
                                        [123.722808867188, 41.8983803535157],
                                        [123.7358215625, 41.9140456367188],
                                        [123.721803007813, 41.9385207343751],
                                        [123.722896757813, 41.9492336250001],
                                        [123.717345, 41.9538430000001],
                                        [123.728463164063, 41.9677297187501],
                                        [123.777345, 41.973843]
                                    ]
                                ],
                                [
                                    [
                                        [123.777345, 41.973843],
                                        [123.777345, 41.9838430000001],
                                        [123.797345, 41.9938430000001],
                                        [123.797345, 41.973843],
                                        [123.777345, 41.973843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "新宾满族自治县" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [124.395699492188, 41.9805825019531],
                                        [124.422345, 41.9784413886719],
                                        [124.440328398438, 41.9798867011719],
                                        [124.472457304688, 41.9522072578125],
                                        [124.493912382813, 41.9041274238281],
                                        [124.536182890625, 41.8805434394531],
                                        [124.562345, 41.878441388672],
                                        [124.572584257813, 41.8792641425782],
                                        [124.602105742188, 41.8684218574219],
                                        [124.680621367188, 41.8747304511719],
                                        [124.708228789063, 41.8019863105469],
                                        [124.752647734375, 41.7984169746095],
                                        [124.792974882813, 41.8299977851563],
                                        [124.820787382813, 41.8277626777344],
                                        [124.852252226563, 41.8393166328125],
                                        [124.910074492188, 41.826704328125],
                                        [125.01271609375, 41.8384706855469],
                                        [125.022667265625, 41.8500221992187],
                                        [125.054327421875, 41.8474782539063],
                                        [125.116871367188, 41.8616872382813],
                                        [125.140728789063, 41.8893752265625],
                                        [125.161490507813, 41.8877065253907],
                                        [125.218131132813, 41.9230580878907],
                                        [125.287345, 41.9538430000001],
                                        [125.304298125, 41.9504201484375],
                                        [125.343985625, 41.9304836250001],
                                        [125.347345, 41.923843],
                                        [125.296695585938, 41.9191188789063],
                                        [125.290621367188, 41.883843],
                                        [125.293204375, 41.8688430000001],
                                        [125.2855090625, 41.8241274238281],
                                        [125.317393828125, 41.7726076484376],
                                        [125.325787382813, 41.7238430000001],
                                        [125.316534453125, 41.6700954414062],
                                        [125.403917265625, 41.6851393867188],
                                        [125.448267851563, 41.667514875],
                                        [125.454068632813, 41.633843],
                                        [125.4484778125, 41.601372296875],
                                        [125.457345, 41.5638430000001],
                                        [125.45170046875, 41.5594863105469],
                                        [125.442857695313, 41.5480287910156],
                                        [125.432345, 41.5495815253906],
                                        [125.412345, 41.5466262031251],
                                        [125.383922148438, 41.5508266425781],
                                        [125.345914335938, 41.5278993964844],
                                        [125.316715117188, 41.4900698066406],
                                        [125.251832304688, 41.4996572089844],
                                        [125.24298953125, 41.4881996894532],
                                        [125.208424101563, 41.4794863105469],
                                        [125.192686796875, 41.4998744941406],
                                        [125.15615359375, 41.485512921875],
                                        [125.132735625, 41.4996401191407],
                                        [125.072686796875, 41.4907656074219],
                                        [125.060914335938, 41.475512921875],
                                        [125.009190703125, 41.4905934882812],
                                        [124.991954375, 41.4880458808594],
                                        [124.955484648438, 41.5100453925782],
                                        [124.931080351563, 41.5064394355469],
                                        [124.881905546875, 41.4699806953126],
                                        [124.87298953125, 41.4481996894531],
                                        [124.86170046875, 41.4394863105469],
                                        [124.849429960938, 41.4235854316407],
                                        [124.853082304688, 41.398843],
                                        [124.85048953125, 41.3812831855469],
                                        [124.8701965625, 41.3311501289063],
                                        [124.84170046875, 41.3194863105469],
                                        [124.83298953125, 41.3081996894532],
                                        [124.797081328125, 41.2935036445313],
                                        [124.757345, 41.2638430000001],
                                        [124.75209109375, 41.2697219062501],
                                        [124.695343046875, 41.2663393378907],
                                        [124.648785429688, 41.241040265625],
                                        [124.632628203125, 41.2591237617188],
                                        [124.590011015625, 41.2690395332032],
                                        [124.532628203125, 41.3091237617188],
                                        [124.512061796875, 41.3185622382813],
                                        [124.476168242188, 41.3380678535156],
                                        [124.462628203125, 41.3085622382813],
                                        [124.426392851563, 41.2991237617187],
                                        [124.412628203125, 41.3291237617188],
                                        [124.39197390625, 41.3475783515625],
                                        [124.392867460938, 41.3626113105469],
                                        [124.352061796875, 41.3885622382813],
                                        [124.342628203125, 41.4217568183594],
                                        [124.372628203125, 41.4485622382813],
                                        [124.377345, 41.4538430000001],
                                        [124.426329375, 41.4590566230469],
                                        [124.44427859375, 41.5157411933594],
                                        [124.43205203125, 41.538843],
                                        [124.442672148438, 41.5589076972657],
                                        [124.429683867188, 41.5709401679688],
                                        [124.391749296875, 41.588843],
                                        [124.392769804688, 41.6146059394532],
                                        [124.422535429688, 41.6286525703125],
                                        [124.43576296875, 41.6429311347656],
                                        [124.422017851563, 41.6689076972657],
                                        [124.451475859375, 41.6962026191407],
                                        [124.408062773438, 41.7099477363282],
                                        [124.392535429688, 41.7328224921876],
                                        [124.432642851563, 41.7587221503906],
                                        [124.42033328125, 41.7938430000001],
                                        [124.435655546875, 41.8375600410157],
                                        [124.410636015625, 41.84937034375],
                                        [124.34166140625, 41.84663596875],
                                        [124.343175078125, 41.8847963691407],
                                        [124.373018828125, 41.8988808417969],
                                        [124.319195585938, 41.9159206367188],
                                        [124.302535429688, 41.9460439277344],
                                        [124.352232695313, 41.9286244941407],
                                        [124.402154570313, 41.9333242011719],
                                        [124.377345, 41.973843],
                                        [124.395699492188, 41.9805825019531]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "新抚区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.979346953125, 41.8580348945313],
                                        [123.930704375, 41.8504836250001],
                                        [123.917345, 41.843843],
                                        [123.907652617188, 41.8578798652344],
                                        [123.833013945313, 41.8411464667969],
                                        [123.817345, 41.863843],
                                        [123.902628203125, 41.8685622382813],
                                        [123.987345, 41.8738430000001],
                                        [123.979346953125, 41.8580348945313]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "东洲区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [124.069810820313, 41.8186977363282],
                                        [124.073834257813, 41.779233625],
                                        [124.056422148438, 41.7647682929688],
                                        [124.035631132813, 41.7397402167969],
                                        [124.0145325, 41.7883803535157],
                                        [123.981793242188, 41.7692531562501],
                                        [123.9828528125, 41.7588430000001],
                                        [123.9818371875, 41.748843],
                                        [123.983804960938, 41.7295021796875],
                                        [123.953516875, 41.7264138007813],
                                        [123.947345, 41.733843],
                                        [123.942535429688, 41.7390334296875],
                                        [123.932154570313, 41.7486525703125],
                                        [123.922535429688, 41.7590334296876],
                                        [123.896090117188, 41.7835378242187],
                                        [123.872535429688, 41.8259877753906],
                                        [123.912535429688, 41.8386525703126],
                                        [123.917345, 41.843843],
                                        [123.930704375, 41.8504836250001],
                                        [123.979346953125, 41.8580348945313],
                                        [123.987345, 41.8738430000001],
                                        [124.049078398438, 41.877505109375],
                                        [124.057345, 41.893843],
                                        [124.090347929688, 41.8879616523438],
                                        [124.113365507813, 41.8688430000001],
                                        [124.100855742188, 41.858452375],
                                        [124.10388796875, 41.8286977363281],
                                        [124.069810820313, 41.8186977363282]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "抚顺县" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [124.247789335938, 42.0759670234375],
                                        [124.2680871875, 42.0395864082031],
                                        [124.28252078125, 42.0072438789063],
                                        [124.337345, 42.013843],
                                        [124.3551575, 41.9783217597656],
                                        [124.377345, 41.973843],
                                        [124.402154570313, 41.9333242011719],
                                        [124.352232695313, 41.9286244941407],
                                        [124.302535429688, 41.9460439277344],
                                        [124.319195585938, 41.9159206367188],
                                        [124.373018828125, 41.8988808417969],
                                        [124.343175078125, 41.8847963691407],
                                        [124.34166140625, 41.84663596875],
                                        [124.410636015625, 41.84937034375],
                                        [124.435655546875, 41.8375600410157],
                                        [124.42033328125, 41.7938430000001],
                                        [124.432642851563, 41.7587221503906],
                                        [124.392535429688, 41.7328224921876],
                                        [124.408062773438, 41.7099477363282],
                                        [124.451475859375, 41.6962026191407],
                                        [124.422017851563, 41.6689076972657],
                                        [124.43576296875, 41.6429311347656],
                                        [124.422535429688, 41.6286525703125],
                                        [124.392769804688, 41.6146059394532],
                                        [124.391749296875, 41.588843],
                                        [124.429683867188, 41.5709401679688],
                                        [124.442672148438, 41.5589076972657],
                                        [124.43205203125, 41.538843],
                                        [124.44427859375, 41.5157411933594],
                                        [124.426329375, 41.4590566230469],
                                        [124.377345, 41.4538430000001],
                                        [124.373077421875, 41.4595778632813],
                                        [124.35812625, 41.4706996894531],
                                        [124.341886015625, 41.4679030585938],
                                        [124.31025515625, 41.4917031074219],
                                        [124.31330203125, 41.5094106269531],
                                        [124.301612578125, 41.5181081367188],
                                        [124.284049101563, 41.5417189765625],
                                        [124.257345, 41.5371218085938],
                                        [124.232345, 41.5414260078126],
                                        [124.188580351563, 41.5338906074219],
                                        [124.163077421875, 41.5181081367188],
                                        [124.114058867188, 41.5048183417969],
                                        [124.094049101563, 41.5317189765626],
                                        [124.065050078125, 41.5267263007813],
                                        [124.033077421875, 41.5395778632813],
                                        [124.001612578125, 41.5481081367188],
                                        [123.982603789063, 41.5598720527344],
                                        [123.933687773438, 41.5453139472656],
                                        [123.917237578125, 41.5674318671875],
                                        [123.858306914063, 41.5572878242188],
                                        [123.863258085938, 41.5285488105469],
                                        [123.857345, 41.513843],
                                        [123.793673125, 41.5033827949219],
                                        [123.781143828125, 41.5339919257813],
                                        [123.737345, 41.523843],
                                        [123.717296171875, 41.5678786445313],
                                        [123.79125125, 41.5948622871094],
                                        [123.757345, 41.6138430000001],
                                        [123.747940703125, 41.6383058906251],
                                        [123.781632109375, 41.6652834296875],
                                        [123.791793242188, 41.6893959785157],
                                        [123.807335234375, 41.7018447089844],
                                        [123.770631132813, 41.7642873359375],
                                        [123.777345, 41.7938430000001],
                                        [123.787486601563, 41.8138893867188],
                                        [123.827203398438, 41.7937953925782],
                                        [123.81545046875, 41.769720685547],
                                        [123.880704375, 41.737202375],
                                        [123.947345, 41.733843],
                                        [123.953516875, 41.7264138007813],
                                        [123.983804960938, 41.7295021796875],
                                        [123.9818371875, 41.748843],
                                        [123.9828528125, 41.7588430000001],
                                        [123.981793242188, 41.7692531562501],
                                        [124.0145325, 41.7883803535157],
                                        [124.035631132813, 41.7397402167969],
                                        [124.056422148438, 41.7647682929688],
                                        [124.073834257813, 41.779233625],
                                        [124.069810820313, 41.8186977363282],
                                        [124.10388796875, 41.8286977363281],
                                        [124.100855742188, 41.858452375],
                                        [124.113365507813, 41.8688430000001],
                                        [124.090347929688, 41.8879616523438],
                                        [124.057345, 41.893843],
                                        [124.050704375, 41.8972023750001],
                                        [124.043336210938, 41.9117690253907],
                                        [124.023336210938, 41.9020009589845],
                                        [124.011353789063, 41.9256850410157],
                                        [123.983336210938, 41.9120009589844],
                                        [123.973985625, 41.9304836250001],
                                        [123.940704375, 41.9372023750001],
                                        [123.914796171875, 41.9887783027344],
                                        [123.943985625, 41.997202375],
                                        [123.947345, 42.003843],
                                        [124.0252746875, 42.01179221875],
                                        [124.049371367188, 42.0657912421876],
                                        [124.09982546875, 42.0698451972657],
                                        [124.15486453125, 42.0578408027344],
                                        [124.182345, 42.0600478339844],
                                        [124.230728789063, 42.0561611152344],
                                        [124.247789335938, 42.0759670234375]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "清原满族自治县" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [125.2005871875, 42.3665834785157],
                                        [125.16654421875, 42.3479213691407],
                                        [125.174405546875, 42.3288430000001],
                                        [125.165650664063, 42.3075978828125],
                                        [125.257345, 42.303843],
                                        [125.29146609375, 42.2847414375],
                                        [125.271529570313, 42.2693544746094],
                                        [125.274561796875, 42.248843],
                                        [125.271519804688, 42.2282497382813],
                                        [125.305421171875, 42.2188100410156],
                                        [125.279742460938, 42.1762416816407],
                                        [125.30623171875, 42.1801564765625],
                                        [125.300225859375, 42.1394863105469],
                                        [125.353175078125, 42.1482302070313],
                                        [125.348834257813, 42.1775856757813],
                                        [125.362735625, 42.1796401191406],
                                        [125.39763796875, 42.1585866523438],
                                        [125.447345, 42.153843],
                                        [125.481793242188, 42.1439943671876],
                                        [125.470831328125, 42.1246450019531],
                                        [125.451793242188, 42.1093959785156],
                                        [125.440987578125, 42.0959023261719],
                                        [125.41037234375, 42.0997109199219],
                                        [125.414156523438, 42.0692958808594],
                                        [125.401793242188, 42.0593959785157],
                                        [125.3491028125, 41.9935451484375],
                                        [125.291793242188, 41.9693959785156],
                                        [125.287345, 41.9538430000001],
                                        [125.218131132813, 41.9230580878907],
                                        [125.161490507813, 41.8877065253907],
                                        [125.140728789063, 41.8893752265625],
                                        [125.116871367188, 41.8616872382813],
                                        [125.054327421875, 41.8474782539063],
                                        [125.022667265625, 41.8500221992187],
                                        [125.01271609375, 41.8384706855469],
                                        [124.910074492188, 41.826704328125],
                                        [124.852252226563, 41.8393166328125],
                                        [124.820787382813, 41.8277626777344],
                                        [124.792974882813, 41.8299977851563],
                                        [124.752647734375, 41.7984169746095],
                                        [124.708228789063, 41.8019863105469],
                                        [124.680621367188, 41.8747304511719],
                                        [124.602105742188, 41.8684218574219],
                                        [124.572584257813, 41.8792641425782],
                                        [124.562345, 41.878441388672],
                                        [124.536182890625, 41.8805434394531],
                                        [124.493912382813, 41.9041274238281],
                                        [124.472457304688, 41.9522072578125],
                                        [124.440328398438, 41.9798867011719],
                                        [124.422345, 41.9784413886719],
                                        [124.395699492188, 41.9805825019531],
                                        [124.377345, 41.973843],
                                        [124.3551575, 41.9783217597656],
                                        [124.337345, 42.013843],
                                        [124.363658476563, 42.0179897285157],
                                        [124.361051054688, 42.0296254707031],
                                        [124.41326296875, 42.0479274726563],
                                        [124.46142703125, 42.0697585273438],
                                        [124.521329375, 42.0851308417969],
                                        [124.544010039063, 42.1179775214844],
                                        [124.537345, 42.133843],
                                        [124.54197390625, 42.1392153144531],
                                        [124.56197390625, 42.1564455390625],
                                        [124.55271609375, 42.1692153144531],
                                        [124.524205351563, 42.1937795234375],
                                        [124.511807890625, 42.2390724921875],
                                        [124.52271609375, 42.2484706855469],
                                        [124.53197390625, 42.2592153144532],
                                        [124.551715117188, 42.2762221503907],
                                        [124.56197390625, 42.2992153144532],
                                        [124.572769804688, 42.3185646796875],
                                        [124.570367460938, 42.3484706855469],
                                        [124.6227746875, 42.3392043281251],
                                        [124.621241484375, 42.3201369453125],
                                        [124.681202421875, 42.3153188300782],
                                        [124.73197390625, 42.3292153144531],
                                        [124.791861601563, 42.3428212714844],
                                        [124.763638945313, 42.3934072089844],
                                        [124.79197390625, 42.4092153144532],
                                        [124.817345, 42.413843],
                                        [124.842896757813, 42.4093959785157],
                                        [124.902799101563, 42.3957900214844],
                                        [124.936422148438, 42.3999721503907],
                                        [124.96365359375, 42.3659658027344],
                                        [124.992896757813, 42.3782900214844],
                                        [125.001793242188, 42.3993959785157],
                                        [125.03302859375, 42.4083278632813],
                                        [125.029957304688, 42.4330471015625],
                                        [125.091793242188, 42.4693959785157],
                                        [125.107345, 42.473843],
                                        [125.12892703125, 42.4692006660157],
                                        [125.145445585938, 42.4390639472656],
                                        [125.175816679688, 42.4296804023437],
                                        [125.18646609375, 42.4038430000001],
                                        [125.17654421875, 42.3797646308594],
                                        [125.2005871875, 42.3665834785157]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "顺城区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.973985625, 41.9304836250001],
                                        [123.983336210938, 41.9120009589844],
                                        [124.011353789063, 41.9256850410157],
                                        [124.023336210938, 41.9020009589845],
                                        [124.043336210938, 41.9117690253907],
                                        [124.050704375, 41.8972023750001],
                                        [124.057345, 41.893843],
                                        [124.049078398438, 41.877505109375],
                                        [123.987345, 41.8738430000001],
                                        [123.902628203125, 41.8685622382813],
                                        [123.817345, 41.863843],
                                        [123.773765898438, 41.8687990546875],
                                        [123.75326296875, 41.9172145820313],
                                        [123.77326296875, 41.9479274726563],
                                        [123.777345, 41.973843],
                                        [123.797345, 41.973843],
                                        [123.797345, 41.9938430000001],
                                        [123.813531523438, 41.9976552558594],
                                        [123.823902617188, 42.0144887519532],
                                        [123.877701445313, 42.0321828437501],
                                        [123.943531523438, 42.0100307441407],
                                        [123.947345, 42.003843],
                                        [123.943985625, 41.997202375],
                                        [123.914796171875, 41.9887783027344],
                                        [123.940704375, 41.9372023750001],
                                        [123.973985625, 41.9304836250001]
                                    ]
                                ]
                            ]
                        }
                    }]
                }

                ;
            });

            define("echarts/util/mapData/geoJson/tieling", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": { "name": "昌图县" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.767345, 43.483843],
                                        [123.77252078125, 43.4782552314453],
                                        [123.799971953125, 43.4793434882813],
                                        [123.862115507813, 43.4596688056641],
                                        [123.862550078125, 43.4486788154297],
                                        [123.842720976563, 43.4112026191407],
                                        [123.892935820313, 43.3787746406251],
                                        [123.892139921875, 43.3586562324219],
                                        [123.9439075, 43.3463246894532],
                                        [124.013961210938, 43.2871230292969],
                                        [124.09259890625, 43.2902407050781],
                                        [124.092139921875, 43.2786659980469],
                                        [124.102535429688, 43.2690334296875],
                                        [124.112345, 43.2482485175782],
                                        [124.137345, 43.2492397285157],
                                        [124.172345, 43.2478517890626],
                                        [124.202511015625, 43.249048078125],
                                        [124.222154570313, 43.2386525703125],
                                        [124.277345, 43.223843],
                                        [124.270753203125, 43.1710695625],
                                        [124.322896757813, 43.1393959785157],
                                        [124.331793242188, 43.1282900214844],
                                        [124.347345, 43.123843],
                                        [124.382154570313, 43.0986525703126],
                                        [124.422037382813, 43.0728969550782],
                                        [124.32490359375, 42.9930727363282],
                                        [124.372550078125, 42.9678603339844],
                                        [124.42093875, 42.9697780585938],
                                        [124.442154570313, 42.9501210761719],
                                        [124.425206328125, 42.9299123359375],
                                        [124.402154570313, 42.9190334296875],
                                        [124.382535429688, 42.9086525703126],
                                        [124.362154570313, 42.8990334296876],
                                        [124.357345, 42.883843],
                                        [124.342345, 42.8896083808594],
                                        [124.310655546875, 42.8774282050782],
                                        [124.313023710938, 42.8583901191407],
                                        [124.301793242188, 42.8493959785157],
                                        [124.292896757813, 42.8182900214844],
                                        [124.251793242188, 42.8093959785156],
                                        [124.193453398438, 42.7327370429688],
                                        [124.161793242188, 42.7193959785156],
                                        [124.152896757813, 42.7082900214844],
                                        [124.131793242188, 42.6993959785157],
                                        [124.110709257813, 42.6870021796875],
                                        [124.11302859375, 42.6683388496094],
                                        [124.088912382813, 42.6593959785156],
                                        [124.072896757813, 42.6793959785157],
                                        [123.960943632813, 42.6882900214844],
                                        [123.87138796875, 42.6538649726563],
                                        [123.811920195313, 42.5796022773438],
                                        [123.741793242188, 42.5693959785156],
                                        [123.727345, 42.5638430000001],
                                        [123.693443632813, 42.5725429511719],
                                        [123.68326296875, 42.5997585273438],
                                        [123.66142703125, 42.6079274726563],
                                        [123.65326296875, 42.6297585273438],
                                        [123.627257109375, 42.6394887519531],
                                        [123.617345, 42.653843],
                                        [123.6126184375, 42.6722670722656],
                                        [123.58037234375, 42.6650380683594],
                                        [123.58361453125, 42.6795131660156],
                                        [123.57107546875, 42.6881728339844],
                                        [123.573565703125, 42.6992897773438],
                                        [123.558409453125, 42.7225661445313],
                                        [123.576925078125, 42.7666469550782],
                                        [123.59361453125, 42.7781728339844],
                                        [123.587862578125, 42.803843],
                                        [123.593565703125, 42.8292897773438],
                                        [123.580831328125, 42.848843],
                                        [123.59408328125, 42.8691909003907],
                                        [123.58060671875, 42.8784950996094],
                                        [123.59408328125, 42.8991909003906],
                                        [123.58060671875, 42.9084950996094],
                                        [123.594132109375, 42.9292629218751],
                                        [123.54580203125, 42.9568471503906],
                                        [123.557345, 43.003843],
                                        [123.57326296875, 43.0079274726563],
                                        [123.58298953125, 43.0339321113281],
                                        [123.604586210938, 43.048843],
                                        [123.590103789063, 43.0588430000001],
                                        [123.622164335938, 43.0809804511719],
                                        [123.63142703125, 43.1397585273438],
                                        [123.643565703125, 43.1583962226563],
                                        [123.641051054688, 43.1696169257813],
                                        [123.664361601563, 43.1783388496094],
                                        [123.640328398438, 43.2093471503907],
                                        [123.669845, 43.2203908515625],
                                        [123.66107546875, 43.2595131660157],
                                        [123.679176054688, 43.2720119453126],
                                        [123.703746367188, 43.3075966621094],
                                        [123.701221953125, 43.3188430000001],
                                        [123.7046496875, 43.3341127753907],
                                        [123.697345, 43.3638430000001],
                                        [123.689561796875, 43.3812142158203],
                                        [123.708780546875, 43.4124056220704],
                                        [123.737564726563, 43.4301387763672],
                                        [123.75281375, 43.4748891425781],
                                        [123.767345, 43.483843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "调兵山市" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.647345, 42.513843],
                                        [123.66576296875, 42.4669875312501],
                                        [123.659303007813, 42.4232729316407],
                                        [123.70170046875, 42.4059206367187],
                                        [123.69298953125, 42.3981996894531],
                                        [123.651514921875, 42.3894472480469],
                                        [123.65423953125, 42.3710182929688],
                                        [123.620767851563, 42.3508266425781],
                                        [123.596607695313, 42.3472560859376],
                                        [123.522276640625, 42.3615468574219],
                                        [123.517345, 42.343843],
                                        [123.461749296875, 42.3786098457032],
                                        [123.472926054688, 42.4090358710937],
                                        [123.452955351563, 42.4262404609375],
                                        [123.451236601563, 42.4476454902344],
                                        [123.47197390625, 42.4592153144532],
                                        [123.50271609375, 42.4684706855469],
                                        [123.57662234375, 42.5097048164062],
                                        [123.602345, 42.5076381660157],
                                        [123.620113554688, 42.5474587226563],
                                        [123.660894804688, 42.5507350898438],
                                        [123.647345, 42.513843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "开原市" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.757345, 42.5238430000001],
                                        [123.769537382813, 42.5272658515625],
                                        [123.760767851563, 42.5360353828125],
                                        [123.747345, 42.5238430000001],
                                        [123.747345, 42.543843],
                                        [123.760260039063, 42.54937034375],
                                        [123.730343046875, 42.5568398261719],
                                        [123.727345, 42.5638430000001],
                                        [123.741793242188, 42.5693959785156],
                                        [123.811920195313, 42.5796022773438],
                                        [123.87138796875, 42.6538649726563],
                                        [123.960943632813, 42.6882900214844],
                                        [124.072896757813, 42.6793959785157],
                                        [124.088912382813, 42.6593959785156],
                                        [124.11302859375, 42.6683388496094],
                                        [124.110709257813, 42.6870021796875],
                                        [124.131793242188, 42.6993959785157],
                                        [124.152896757813, 42.7082900214844],
                                        [124.161793242188, 42.7193959785156],
                                        [124.193453398438, 42.7327370429688],
                                        [124.251793242188, 42.8093959785156],
                                        [124.292896757813, 42.8182900214844],
                                        [124.301793242188, 42.8493959785157],
                                        [124.313023710938, 42.8583901191407],
                                        [124.310655546875, 42.8774282050782],
                                        [124.342345, 42.8896083808594],
                                        [124.357345, 42.883843],
                                        [124.37142703125, 42.8779274726563],
                                        [124.440953398438, 42.8687416816407],
                                        [124.45142703125, 42.8279274726563],
                                        [124.457345, 42.8238430000001],
                                        [124.466812773438, 42.7997634101563],
                                        [124.434605742188, 42.7865822578126],
                                        [124.416207304688, 42.7416298652344],
                                        [124.367345, 42.73440940625],
                                        [124.331773710938, 42.7396657539063],
                                        [124.32298953125, 42.7181996894532],
                                        [124.27298953125, 42.6796059394532],
                                        [124.308507109375, 42.6283827949219],
                                        [124.33298953125, 42.6094863105469],
                                        [124.337345, 42.583843],
                                        [124.312486601563, 42.5896034980469],
                                        [124.301954375, 42.5880458808594],
                                        [124.27281375, 42.6056240058594],
                                        [124.180689726563, 42.6269716621094],
                                        [124.13298953125, 42.5981996894532],
                                        [124.087393828125, 42.58550315625],
                                        [124.065152617188, 42.5486318183594],
                                        [124.08170046875, 42.5081996894531],
                                        [124.12427859375, 42.4907741523438],
                                        [124.173922148438, 42.4608266425781],
                                        [124.192345, 42.4581044746094],
                                        [124.205953398438, 42.4601149726563],
                                        [124.26170046875, 42.4381996894531],
                                        [124.317750273438, 42.428676984375],
                                        [124.38263796875, 42.3895388007813],
                                        [124.429215117188, 42.3826552558594],
                                        [124.433140898438, 42.4092336250001],
                                        [124.414576445313, 42.4400112128907],
                                        [124.39123171875, 42.4993886542969],
                                        [124.437471953125, 42.509145734375],
                                        [124.431519804688, 42.5494362617188],
                                        [124.447345, 42.553843],
                                        [124.468551054688, 42.5451296210938],
                                        [124.495303984375, 42.5504152656251],
                                        [124.523170195313, 42.5396681953126],
                                        [124.568717070313, 42.5020790839844],
                                        [124.628023710938, 42.526450421875],
                                        [124.698350859375, 42.4949587226563],
                                        [124.730904570313, 42.5156264472657],
                                        [124.758995390625, 42.495493390625],
                                        [124.771519804688, 42.4780178046876],
                                        [124.783170195313, 42.4696681953125],
                                        [124.791519804688, 42.4580178046875],
                                        [124.811295195313, 42.4438430000001],
                                        [124.790025664063, 42.4285951972657],
                                        [124.813170195313, 42.4196681953126],
                                        [124.817345, 42.413843],
                                        [124.79197390625, 42.4092153144532],
                                        [124.763638945313, 42.3934072089844],
                                        [124.791861601563, 42.3428212714844],
                                        [124.73197390625, 42.3292153144531],
                                        [124.681202421875, 42.3153188300782],
                                        [124.621241484375, 42.3201369453125],
                                        [124.6227746875, 42.3392043281251],
                                        [124.570367460938, 42.3484706855469],
                                        [124.572769804688, 42.3185646796875],
                                        [124.56197390625, 42.2992153144532],
                                        [124.551715117188, 42.2762221503907],
                                        [124.53197390625, 42.2592153144532],
                                        [124.52271609375, 42.2484706855469],
                                        [124.511807890625, 42.2390724921875],
                                        [124.524205351563, 42.1937795234375],
                                        [124.55271609375, 42.1692153144531],
                                        [124.56197390625, 42.1564455390625],
                                        [124.54197390625, 42.1392153144531],
                                        [124.537345, 42.133843],
                                        [124.531793242188, 42.1293959785157],
                                        [124.471143828125, 42.1156191230469],
                                        [124.42062625, 42.130044171875],
                                        [124.423214140625, 42.1508351875001],
                                        [124.377486601563, 42.1701039863282],
                                        [124.34486453125, 42.1660463691407],
                                        [124.312896757813, 42.1893959785156],
                                        [124.251656523438, 42.1983095527344],
                                        [124.25302859375, 42.2093581367188],
                                        [124.18259890625, 42.2294960761719],
                                        [124.172345, 42.2282216621094],
                                        [124.162345, 42.2294643378907],
                                        [124.151890898438, 42.2281642890625],
                                        [124.140079375, 42.242915265625],
                                        [124.102203398438, 42.2382033515625],
                                        [124.082896757813, 42.2422743964844],
                                        [124.114381132813, 42.2674843574219],
                                        [124.11150515625, 42.2906044746095],
                                        [124.092345, 42.2882216621094],
                                        [124.06951296875, 42.2910610175781],
                                        [124.072965117188, 42.318843],
                                        [124.070982695313, 42.3347988105469],
                                        [124.042706328125, 42.3181764960938],
                                        [123.99119265625, 42.3245839667969],
                                        [123.99880984375, 42.385805890625],
                                        [123.958580351563, 42.4102407050781],
                                        [123.920889921875, 42.4055519843751],
                                        [123.923922148438, 42.3811586738281],
                                        [123.88537234375, 42.4038210273438],
                                        [123.869342070313, 42.4238356757813],
                                        [123.842706328125, 42.4081764960938],
                                        [123.832345, 42.4094643378906],
                                        [123.817345, 42.4075991035157],
                                        [123.800582304688, 42.4096840644532],
                                        [123.803023710938, 42.4292958808594],
                                        [123.791099882813, 42.438843],
                                        [123.806163359375, 42.4509035468751],
                                        [123.790928984375, 42.490532453125],
                                        [123.7676965625, 42.4876430488281],
                                        [123.757345, 42.5238430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "清河区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [124.27281375, 42.6056240058594],
                                        [124.301954375, 42.5880458808594],
                                        [124.312486601563, 42.5896034980469],
                                        [124.337345, 42.583843],
                                        [124.353804960938, 42.5803029609375],
                                        [124.375440703125, 42.5639369941406],
                                        [124.40806765625, 42.5773830390625],
                                        [124.443077421875, 42.5616323066407],
                                        [124.447345, 42.553843],
                                        [124.431519804688, 42.5494362617188],
                                        [124.437471953125, 42.509145734375],
                                        [124.39123171875, 42.4993886542969],
                                        [124.414576445313, 42.4400112128907],
                                        [124.433140898438, 42.4092336250001],
                                        [124.429215117188, 42.3826552558594],
                                        [124.38263796875, 42.3895388007813],
                                        [124.317750273438, 42.428676984375],
                                        [124.26170046875, 42.4381996894531],
                                        [124.205953398438, 42.4601149726563],
                                        [124.192345, 42.4581044746094],
                                        [124.173922148438, 42.4608266425781],
                                        [124.12427859375, 42.4907741523438],
                                        [124.08170046875, 42.5081996894531],
                                        [124.065152617188, 42.5486318183594],
                                        [124.087393828125, 42.58550315625],
                                        [124.13298953125, 42.5981996894532],
                                        [124.180689726563, 42.6269716621094],
                                        [124.27281375, 42.6056240058594]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "铁岭县" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.757345, 42.5238430000001],
                                        [123.760767851563, 42.5360353828125],
                                        [123.769537382813, 42.5272658515625],
                                        [123.757345, 42.5238430000001]
                                    ]
                                ],
                                [
                                    [
                                        [123.757345, 42.5238430000001],
                                        [123.7676965625, 42.4876430488281],
                                        [123.790928984375, 42.490532453125],
                                        [123.806163359375, 42.4509035468751],
                                        [123.791099882813, 42.438843],
                                        [123.803023710938, 42.4292958808594],
                                        [123.800582304688, 42.4096840644532],
                                        [123.817345, 42.4075991035157],
                                        [123.832345, 42.4094643378906],
                                        [123.842706328125, 42.4081764960938],
                                        [123.869342070313, 42.4238356757813],
                                        [123.88537234375, 42.4038210273438],
                                        [123.923922148438, 42.3811586738281],
                                        [123.920889921875, 42.4055519843751],
                                        [123.958580351563, 42.4102407050781],
                                        [123.99880984375, 42.385805890625],
                                        [123.99119265625, 42.3245839667969],
                                        [124.042706328125, 42.3181764960938],
                                        [124.070982695313, 42.3347988105469],
                                        [124.072965117188, 42.318843],
                                        [124.06951296875, 42.2910610175781],
                                        [124.092345, 42.2882216621094],
                                        [124.11150515625, 42.2906044746095],
                                        [124.114381132813, 42.2674843574219],
                                        [124.082896757813, 42.2422743964844],
                                        [124.102203398438, 42.2382033515625],
                                        [124.140079375, 42.242915265625],
                                        [124.151890898438, 42.2281642890625],
                                        [124.162345, 42.2294643378907],
                                        [124.172345, 42.2282216621094],
                                        [124.18259890625, 42.2294960761719],
                                        [124.25302859375, 42.2093581367188],
                                        [124.251656523438, 42.1983095527344],
                                        [124.312896757813, 42.1893959785156],
                                        [124.34486453125, 42.1660463691407],
                                        [124.377486601563, 42.1701039863282],
                                        [124.423214140625, 42.1508351875001],
                                        [124.42062625, 42.130044171875],
                                        [124.471143828125, 42.1156191230469],
                                        [124.531793242188, 42.1293959785157],
                                        [124.537345, 42.133843],
                                        [124.544010039063, 42.1179775214844],
                                        [124.521329375, 42.0851308417969],
                                        [124.46142703125, 42.0697585273438],
                                        [124.41326296875, 42.0479274726563],
                                        [124.361051054688, 42.0296254707031],
                                        [124.363658476563, 42.0179897285157],
                                        [124.337345, 42.013843],
                                        [124.28252078125, 42.0072438789063],
                                        [124.2680871875, 42.0395864082031],
                                        [124.247789335938, 42.0759670234375],
                                        [124.230728789063, 42.0561611152344],
                                        [124.182345, 42.0600478339844],
                                        [124.15486453125, 42.0578408027344],
                                        [124.09982546875, 42.0698451972657],
                                        [124.049371367188, 42.0657912421876],
                                        [124.0252746875, 42.01179221875],
                                        [123.947345, 42.003843],
                                        [123.943531523438, 42.0100307441407],
                                        [123.877701445313, 42.0321828437501],
                                        [123.823902617188, 42.0144887519532],
                                        [123.813531523438, 41.9976552558594],
                                        [123.797345, 41.9938430000001],
                                        [123.777345, 41.9838430000001],
                                        [123.761676054688, 42.0084706855469],
                                        [123.76318484375, 42.0206044746094],
                                        [123.798350859375, 42.0162294746094],
                                        [123.811793242188, 42.0518837714844],
                                        [123.754610625, 42.044770734375],
                                        [123.742896757813, 42.0593959785157],
                                        [123.69375125, 42.0892482734376],
                                        [123.641793242188, 42.0982900214844],
                                        [123.543761015625, 42.1436220527344],
                                        [123.532896757813, 42.1693959785157],
                                        [123.516173125, 42.1978493476563],
                                        [123.482896757813, 42.1782900214844],
                                        [123.467345, 42.1738430000001],
                                        [123.447550078125, 42.2037990546876],
                                        [123.46326296875, 42.2279274726563],
                                        [123.473204375, 42.2666811347656],
                                        [123.50326296875, 42.2779274726563],
                                        [123.51142703125, 42.3097585273437],
                                        [123.523726835938, 42.3286452460938],
                                        [123.517345, 42.343843],
                                        [123.522276640625, 42.3615468574219],
                                        [123.596607695313, 42.3472560859376],
                                        [123.620767851563, 42.3508266425781],
                                        [123.65423953125, 42.3710182929688],
                                        [123.651514921875, 42.3894472480469],
                                        [123.69298953125, 42.3981996894531],
                                        [123.70170046875, 42.4059206367187],
                                        [123.659303007813, 42.4232729316407],
                                        [123.66576296875, 42.4669875312501],
                                        [123.647345, 42.513843],
                                        [123.68326296875, 42.5179274726563],
                                        [123.707261992188, 42.5335561347656],
                                        [123.747345, 42.543843],
                                        [123.747345, 42.5238430000001],
                                        [123.757345, 42.5238430000001]
                                    ],
                                    [
                                        [123.793682890625, 42.2187673164063],
                                        [123.750054960938, 42.1922658515625],
                                        [123.75326296875, 42.1664455390625],
                                        [123.797345, 42.153843],
                                        [123.790787382813, 42.1709023261719],
                                        [123.823214140625, 42.1668691230469],
                                        [123.82166140625, 42.179341046875],
                                        [123.842896757813, 42.1882900214844],
                                        [123.87595828125, 42.2077223945313],
                                        [123.9614465625, 42.1970888496094],
                                        [123.971793242188, 42.2056484199219],
                                        [123.941793242188, 42.2182900214844],
                                        [123.932896757813, 42.2293959785156],
                                        [123.8992590625, 42.2390151191406],
                                        [123.904210234375, 42.278843],
                                        [123.880714140625, 42.2887429023438],
                                        [123.928531523438, 42.3177858710938],
                                        [123.867203398438, 42.3353200507813],
                                        [123.799195585938, 42.3091786933594],
                                        [123.804156523438, 42.2692958808594],
                                        [123.784371367188, 42.2534560371095],
                                        [123.772896757813, 42.2354116035156],
                                        [123.793682890625, 42.2187673164063]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "西丰县" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [124.887345, 43.1338430000001],
                                        [124.87271609375, 43.0684706855469],
                                        [124.836949492188, 43.0227992988282],
                                        [124.85271609375, 43.0092153144531],
                                        [124.8663684375, 42.9786183906251],
                                        [124.849146757813, 42.8836330390625],
                                        [124.852745390625, 42.838843],
                                        [124.851217070313, 42.8198232246094],
                                        [124.8668371875, 42.7918300605469],
                                        [124.886124296875, 42.7792153144531],
                                        [124.913316679688, 42.8107741523437],
                                        [124.955689726563, 42.8073683906251],
                                        [124.97986453125, 42.7793105292969],
                                        [124.99197390625, 42.7364455390625],
                                        [124.971163359375, 42.7185195136719],
                                        [124.973150664063, 42.693843],
                                        [124.9719153125, 42.6785073066406],
                                        [125.00271609375, 42.6592153144531],
                                        [125.01197390625, 42.628470685547],
                                        [125.034742460938, 42.6092153144532],
                                        [125.047345, 42.623843],
                                        [125.090279570313, 42.6193190742188],
                                        [125.079229765625, 42.583843],
                                        [125.08404421875, 42.5683852363282],
                                        [125.066329375, 42.5431545234375],
                                        [125.075460234375, 42.513843],
                                        [125.07048953125, 42.4978835273438],
                                        [125.098389921875, 42.48837425],
                                        [125.107345, 42.473843],
                                        [125.091793242188, 42.4693959785157],
                                        [125.029957304688, 42.4330471015625],
                                        [125.03302859375, 42.4083278632813],
                                        [125.001793242188, 42.3993959785157],
                                        [124.992896757813, 42.3782900214844],
                                        [124.96365359375, 42.3659658027344],
                                        [124.936422148438, 42.3999721503907],
                                        [124.902799101563, 42.3957900214844],
                                        [124.842896757813, 42.4093959785157],
                                        [124.817345, 42.413843],
                                        [124.813170195313, 42.4196681953126],
                                        [124.790025664063, 42.4285951972657],
                                        [124.811295195313, 42.4438430000001],
                                        [124.791519804688, 42.4580178046875],
                                        [124.783170195313, 42.4696681953125],
                                        [124.771519804688, 42.4780178046876],
                                        [124.758995390625, 42.495493390625],
                                        [124.730904570313, 42.5156264472657],
                                        [124.698350859375, 42.4949587226563],
                                        [124.628023710938, 42.526450421875],
                                        [124.568717070313, 42.5020790839844],
                                        [124.523170195313, 42.5396681953126],
                                        [124.495303984375, 42.5504152656251],
                                        [124.468551054688, 42.5451296210938],
                                        [124.447345, 42.553843],
                                        [124.443077421875, 42.5616323066407],
                                        [124.40806765625, 42.5773830390625],
                                        [124.375440703125, 42.5639369941406],
                                        [124.353804960938, 42.5803029609375],
                                        [124.337345, 42.583843],
                                        [124.33298953125, 42.6094863105469],
                                        [124.308507109375, 42.6283827949219],
                                        [124.27298953125, 42.6796059394532],
                                        [124.32298953125, 42.7181996894532],
                                        [124.331773710938, 42.7396657539063],
                                        [124.367345, 42.73440940625],
                                        [124.416207304688, 42.7416298652344],
                                        [124.434605742188, 42.7865822578126],
                                        [124.466812773438, 42.7997634101563],
                                        [124.457345, 42.8238430000001],
                                        [124.463453398438, 42.8282228828125],
                                        [124.460089140625, 42.845259015625],
                                        [124.493170195313, 42.8580178046876],
                                        [124.514283476563, 42.8714235664063],
                                        [124.532965117188, 42.8677321601563],
                                        [124.541519804688, 42.8796681953126],
                                        [124.582862578125, 42.903637921875],
                                        [124.601519804688, 42.9296681953125],
                                        [124.62166140625, 42.9441030097657],
                                        [124.631519804688, 42.9696681953125],
                                        [124.6618371875, 42.9813600898438],
                                        [124.676529570313, 43.0546584296876],
                                        [124.743170195313, 43.0680178046875],
                                        [124.755694609375, 43.0854933906251],
                                        [124.773170195313, 43.0980178046875],
                                        [124.789244414063, 43.1204433417969],
                                        [124.807345, 43.1168666816406],
                                        [124.832345, 43.1218068671875],
                                        [124.852345, 43.1178554511719],
                                        [124.868121367188, 43.12097190625],
                                        [124.877345, 43.1338430000001],
                                        [124.887345, 43.1338430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "银州区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.941793242188, 42.2182900214844],
                                        [123.971793242188, 42.2056484199219],
                                        [123.9614465625, 42.1970888496094],
                                        [123.87595828125, 42.2077223945313],
                                        [123.842896757813, 42.1882900214844],
                                        [123.82166140625, 42.179341046875],
                                        [123.823214140625, 42.1668691230469],
                                        [123.790787382813, 42.1709023261719],
                                        [123.797345, 42.153843],
                                        [123.75326296875, 42.1664455390625],
                                        [123.750054960938, 42.1922658515625],
                                        [123.793682890625, 42.2187673164063],
                                        [123.772896757813, 42.2354116035156],
                                        [123.784371367188, 42.2534560371095],
                                        [123.804156523438, 42.2692958808594],
                                        [123.799195585938, 42.3091786933594],
                                        [123.867203398438, 42.3353200507813],
                                        [123.928531523438, 42.3177858710938],
                                        [123.880714140625, 42.2887429023438],
                                        [123.904210234375, 42.278843],
                                        [123.8992590625, 42.2390151191406],
                                        [123.932896757813, 42.2293959785156],
                                        [123.941793242188, 42.2182900214844]
                                    ]
                                ]
                            ]
                        }
                    }]
                }

                ;
            });

            define("echarts/util/mapData/geoJson/panjin", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": { "name": "大洼县" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [122.317345, 40.903843],
                                        [122.327345, 40.903843],
                                        [122.322345, 40.8910353828125],
                                        [122.317345, 40.903843]
                                    ]
                                ],
                                [
                                    [
                                        [122.347345, 40.973843],
                                        [122.350767851563, 40.9860353828125],
                                        [122.359537382813, 40.9772658515626],
                                        [122.347345, 40.973843]
                                    ]
                                ],
                                [
                                    [
                                        [122.347345, 40.973843],
                                        [122.347345, 40.9638430000001],
                                        [122.327345, 40.9638430000001],
                                        [122.323922148438, 40.9760353828126],
                                        [122.315152617188, 40.9672658515625],
                                        [122.327345, 40.9638430000001],
                                        [122.330704375, 40.957202375],
                                        [122.345401640625, 40.9497670722656],
                                        [122.333985625, 40.927202375],
                                        [122.320704375, 40.920483625],
                                        [122.317345, 40.903843],
                                        [122.271402617188, 40.8670937324219],
                                        [122.252125273438, 40.8694924140625],
                                        [122.205421171875, 40.8561550117187],
                                        [122.169425078125, 40.8773159003906],
                                        [122.17447390625, 40.8367116523438],
                                        [122.151954375, 40.8395131660156],
                                        [122.122896757813, 40.8182900214844],
                                        [122.086495390625, 40.7961794257813],
                                        [122.207345, 40.7338430000001],
                                        [122.19974734375, 40.6997158027344],
                                        [122.237345, 40.713843],
                                        [122.27142703125, 40.7050954414063],
                                        [122.25326296875, 40.6879274726563],
                                        [122.227345, 40.683843],
                                        [122.195303984375, 40.6888930488282],
                                        [122.155323515625, 40.7149282050782],
                                        [122.147345, 40.683843],
                                        [122.12170046875, 40.6881996894532],
                                        [122.085914335938, 40.7097866035156],
                                        [122.06298953125, 40.7394863105469],
                                        [122.0160559375, 40.7525551582032],
                                        [122.00298953125, 40.7694863105469],
                                        [121.97673953125, 40.7802309394532],
                                        [121.962345, 40.7781044746094],
                                        [121.948834257813, 40.7801003242187],
                                        [121.957139921875, 40.8362831855469],
                                        [121.941529570313, 40.8483315253906],
                                        [121.945933867188, 40.8781362128907],
                                        [121.923990507813, 40.8881996894532],
                                        [121.90193484375, 40.8041774726563],
                                        [121.861378203125, 40.8201198554688],
                                        [121.830328398438, 40.8959902167969],
                                        [121.847779570313, 40.9403847480469],
                                        [121.823487578125, 40.9367958808594],
                                        [121.81298953125, 40.9450429511719],
                                        [121.84298953125, 40.9681996894532],
                                        [121.847345, 40.973843],
                                        [121.887994414063, 41.0484059882813],
                                        [121.802628203125, 41.0598244453125],
                                        [121.81771609375, 41.0746938300782],
                                        [121.847345, 41.083843],
                                        [121.877345, 41.103843],
                                        [121.887345, 41.103843],
                                        [121.892515898438, 41.0973842597656],
                                        [121.901793242188, 41.1193959785156],
                                        [121.917769804688, 41.1382900214844],
                                        [121.951983671875, 41.1181764960938],
                                        [122.028267851563, 41.1276650214844],
                                        [122.060792265625, 41.0870510078125],
                                        [122.089678984375, 41.1040322089844],
                                        [122.127345, 41.1538430000001],
                                        [122.182965117188, 41.1493910957032],
                                        [122.260714140625, 41.1271620917969],
                                        [122.291632109375, 41.1024025703126],
                                        [122.301793242188, 41.0782900214844],
                                        [122.313013945313, 41.0592031074219],
                                        [122.307633085938, 41.0159694648438],
                                        [122.326236601563, 40.9927370429688],
                                        [122.337345, 40.983843],
                                        [122.337345, 40.973843],
                                        [122.347345, 40.973843]
                                    ],
                                    [
                                        [122.277345, 41.013843],
                                        [122.271910429688, 41.0265395332031],
                                        [122.254346953125, 41.0178957343751],
                                        [122.277345, 41.013843]
                                    ],
                                    [
                                        [122.247345, 41.023843],
                                        [122.243922148438, 41.0360353828125],
                                        [122.235152617188, 41.0272658515625],
                                        [122.247345, 41.023843]
                                    ],
                                    [
                                        [122.217345, 41.0338430000001],
                                        [122.213922148438, 41.0460353828125],
                                        [122.205152617188, 41.0372658515625],
                                        [122.217345, 41.0338430000001]
                                    ],
                                    [
                                        [122.275152617188, 41.0472658515625],
                                        [122.287345, 41.043843],
                                        [122.283922148438, 41.0560353828126],
                                        [122.275152617188, 41.0472658515625]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "盘山县" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [121.877345, 41.1138430000001],
                                        [121.887345, 41.1138430000001],
                                        [121.887345, 41.103843],
                                        [121.877345, 41.103843],
                                        [121.877345, 41.1138430000001]
                                    ]
                                ],
                                [
                                    [
                                        [121.877345, 41.1138430000001],
                                        [121.865152617188, 41.1172658515625],
                                        [121.873922148438, 41.1260353828126],
                                        [121.877345, 41.1138430000001]
                                    ]
                                ],
                                [
                                    [
                                        [121.890025664063, 41.1581520820313],
                                        [121.897345, 41.133843],
                                        [121.85271609375, 41.1396816230469],
                                        [121.890025664063, 41.1581520820313]
                                    ]
                                ],
                                [
                                    [
                                        [122.23197390625, 41.3784706855469],
                                        [122.271793242188, 41.3607021308594],
                                        [122.273829375, 41.3353774238282],
                                        [122.26271609375, 41.2984706855469],
                                        [122.25197390625, 41.2792153144532],
                                        [122.241593046875, 41.244731671875],
                                        [122.20603640625, 41.2141005683594],
                                        [122.25584109375, 41.1863112617188],
                                        [122.307345, 41.1904494453126],
                                        [122.332652617188, 41.1884169746095],
                                        [122.407003203125, 41.2520851875],
                                        [122.452345, 41.2484413886719],
                                        [122.48197390625, 41.2508217597657],
                                        [122.47271609375, 41.2384706855469],
                                        [122.45197390625, 41.2292153144532],
                                        [122.43271609375, 41.2184706855469],
                                        [122.41197390625, 41.2092153144532],
                                        [122.40271609375, 41.1984706855469],
                                        [122.363370390625, 41.1866249824219],
                                        [122.3619153125, 41.1685195136719],
                                        [122.37271609375, 41.1592153144532],
                                        [122.383331328125, 41.1239601875],
                                        [122.404874296875, 41.0853444648438],
                                        [122.400308867188, 41.0285195136719],
                                        [122.417345, 41.013843],
                                        [122.406158476563, 40.9963661933594],
                                        [122.39158328125, 41.0004628730469],
                                        [122.38310671875, 40.9872231269532],
                                        [122.346158476563, 40.9976076484375],
                                        [122.337345, 40.983843],
                                        [122.326236601563, 40.9927370429688],
                                        [122.307633085938, 41.0159694648438],
                                        [122.313013945313, 41.0592031074219],
                                        [122.301793242188, 41.0782900214844],
                                        [122.291632109375, 41.1024025703126],
                                        [122.260714140625, 41.1271620917969],
                                        [122.182965117188, 41.1493910957032],
                                        [122.127345, 41.1538430000001],
                                        [122.120704375, 41.157202375],
                                        [122.109263945313, 41.1798183417969],
                                        [122.077345, 41.1838430000001],
                                        [122.0876184375, 41.2072670722657],
                                        [122.065816679688, 41.2212233710938],
                                        [122.051886015625, 41.2173085761719],
                                        [122.024073515625, 41.2363552070313],
                                        [121.974112578125, 41.2223146796875],
                                        [121.9951575, 41.208843],
                                        [121.973648710938, 41.1950746894532],
                                        [121.987345, 41.163843],
                                        [121.962183867188, 41.1532753730469],
                                        [121.92724734375, 41.1611061835938],
                                        [121.937345, 41.2061440253907],
                                        [121.870733671875, 41.22323753125],
                                        [121.85326296875, 41.1979274726563],
                                        [121.84107546875, 41.1895131660156],
                                        [121.847003203125, 41.1630690742188],
                                        [121.804620390625, 41.1472121406251],
                                        [121.788541289063, 41.1508168769532],
                                        [121.796207304688, 41.1166164375],
                                        [121.84326296875, 41.0897585273437],
                                        [121.847345, 41.083843],
                                        [121.81771609375, 41.0746938300782],
                                        [121.802628203125, 41.0598244453125],
                                        [121.887994414063, 41.0484059882813],
                                        [121.847345, 40.973843],
                                        [121.804605742188, 40.9665822578125],
                                        [121.790030546875, 40.9309694648438],
                                        [121.803516875, 40.9086086250001],
                                        [121.77033328125, 40.882993390625],
                                        [121.74298953125, 40.8994863105469],
                                        [121.72170046875, 40.9081996894531],
                                        [121.701846953125, 40.9201760078126],
                                        [121.69298953125, 40.8781996894532],
                                        [121.655264921875, 40.8494863105469],
                                        [121.6425403125, 40.8805763984376],
                                        [121.632857695313, 40.8680287910157],
                                        [121.621954375, 40.8696401191407],
                                        [121.60298953125, 40.8581996894532],
                                        [121.576143828125, 40.8494863105469],
                                        [121.557345, 40.873843],
                                        [121.596422148438, 40.8791835761719],
                                        [121.622154570313, 40.9190334296876],
                                        [121.632535429688, 40.9286525703126],
                                        [121.642154570313, 40.9490334296876],
                                        [121.664874296875, 40.9700832343751],
                                        [121.661783476563, 41.0479787421875],
                                        [121.672550078125, 41.0786916328126],
                                        [121.671846953125, 41.0963942695313],
                                        [121.578941679688, 41.1090908027344],
                                        [121.562535429688, 41.1563649726563],
                                        [121.621822539063, 41.1946498847656],
                                        [121.586011992188, 41.2115517402344],
                                        [121.572535429688, 41.2363649726563],
                                        [121.622535429688, 41.2686525703126],
                                        [121.632154570313, 41.2790334296875],
                                        [121.649371367188, 41.2949867988282],
                                        [121.711246367188, 41.314575421875],
                                        [121.717345, 41.333843],
                                        [121.762799101563, 41.3281642890625],
                                        [121.771890898438, 41.3395217109376],
                                        [121.790181914063, 41.3372463203125],
                                        [121.841129179688, 41.3568288398438],
                                        [121.862896757813, 41.3393959785157],
                                        [121.87834109375, 41.3201113105469],
                                        [121.902711210938, 41.3505458808594],
                                        [121.966920195313, 41.3882900214844],
                                        [122.002896757813, 41.3793959785157],
                                        [122.027345, 41.3650258613282],
                                        [122.051793242188, 41.3793959785157],
                                        [122.083453398438, 41.3927370429687],
                                        [122.111793242188, 41.4093959785157],
                                        [122.132896757813, 41.4182900214844],
                                        [122.14537234375, 41.4338649726563],
                                        [122.171793242188, 41.4493959785157],
                                        [122.187345, 41.4538430000001],
                                        [122.206090117188, 41.40851096875],
                                        [122.23197390625, 41.3784706855469]
                                    ],
                                    [
                                        [122.235152617188, 41.3372658515625],
                                        [122.247345, 41.333843],
                                        [122.243922148438, 41.3460353828125],
                                        [122.235152617188, 41.3372658515625]
                                    ],
                                    [
                                        [121.71029421875, 41.0877272773438],
                                        [121.757345, 41.083843],
                                        [121.753531523438, 41.1000307441406],
                                        [121.673531523438, 41.1002541328126],
                                        [121.71029421875, 41.0877272773438]
                                    ],
                                    [
                                        [121.687345, 41.053843],
                                        [121.675152617188, 41.0504201484376],
                                        [121.683922148438, 41.0416506171875],
                                        [121.699537382813, 41.0572658515626],
                                        [121.690767851563, 41.0660353828125],
                                        [121.687345, 41.053843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "双台子区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [122.024073515625, 41.2363552070313],
                                        [122.051886015625, 41.2173085761719],
                                        [122.065816679688, 41.2212233710938],
                                        [122.0876184375, 41.2072670722657],
                                        [122.077345, 41.1838430000001],
                                        [122.071519804688, 41.1796681953125],
                                        [122.056861601563, 41.1592201972656],
                                        [122.027506132813, 41.1496681953125],
                                        [122.007345, 41.1777956367188],
                                        [121.992345, 41.1568666816407],
                                        [121.987345, 41.163843],
                                        [121.973648710938, 41.1950746894532],
                                        [121.9951575, 41.208843],
                                        [121.974112578125, 41.2223146796875],
                                        [122.024073515625, 41.2363552070313]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "兴隆台区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [122.271910429688, 41.0265395332031],
                                        [122.277345, 41.013843],
                                        [122.254346953125, 41.0178957343751],
                                        [122.271910429688, 41.0265395332031]
                                    ]
                                ],
                                [
                                    [
                                        [122.243922148438, 41.0360353828125],
                                        [122.247345, 41.023843],
                                        [122.235152617188, 41.0272658515625],
                                        [122.243922148438, 41.0360353828125]
                                    ]
                                ],
                                [
                                    [
                                        [122.213922148438, 41.0460353828125],
                                        [122.217345, 41.0338430000001],
                                        [122.205152617188, 41.0372658515625],
                                        [122.213922148438, 41.0460353828125]
                                    ]
                                ],
                                [
                                    [
                                        [121.687345, 41.053843],
                                        [121.683922148438, 41.0416506171875],
                                        [121.675152617188, 41.0504201484376],
                                        [121.687345, 41.053843]
                                    ]
                                ],
                                [
                                    [
                                        [122.283922148438, 41.0560353828126],
                                        [122.287345, 41.043843],
                                        [122.275152617188, 41.0472658515625],
                                        [122.283922148438, 41.0560353828126]
                                    ]
                                ],
                                [
                                    [
                                        [121.687345, 41.053843],
                                        [121.690767851563, 41.0660353828125],
                                        [121.699537382813, 41.0572658515626],
                                        [121.687345, 41.053843]
                                    ]
                                ],
                                [
                                    [
                                        [121.877345, 41.1138430000001],
                                        [121.873922148438, 41.1260353828126],
                                        [121.865152617188, 41.1172658515625],
                                        [121.877345, 41.103843],
                                        [121.847345, 41.083843],
                                        [121.84326296875, 41.0897585273437],
                                        [121.796207304688, 41.1166164375],
                                        [121.788541289063, 41.1508168769532],
                                        [121.804620390625, 41.1472121406251],
                                        [121.847003203125, 41.1630690742188],
                                        [121.84107546875, 41.1895131660156],
                                        [121.85326296875, 41.1979274726563],
                                        [121.870733671875, 41.22323753125],
                                        [121.937345, 41.2061440253907],
                                        [121.92724734375, 41.1611061835938],
                                        [121.962183867188, 41.1532753730469],
                                        [121.987345, 41.163843],
                                        [121.992345, 41.1568666816407],
                                        [122.007345, 41.1777956367188],
                                        [122.027506132813, 41.1496681953125],
                                        [122.056861601563, 41.1592201972656],
                                        [122.071519804688, 41.1796681953125],
                                        [122.077345, 41.1838430000001],
                                        [122.109263945313, 41.1798183417969],
                                        [122.120704375, 41.157202375],
                                        [122.127345, 41.1538430000001],
                                        [122.089678984375, 41.1040322089844],
                                        [122.060792265625, 41.0870510078125],
                                        [122.028267851563, 41.1276650214844],
                                        [121.951983671875, 41.1181764960938],
                                        [121.917769804688, 41.1382900214844],
                                        [121.901793242188, 41.1193959785156],
                                        [121.892515898438, 41.0973842597656],
                                        [121.887345, 41.103843],
                                        [121.887345, 41.1138430000001],
                                        [121.877345, 41.1138430000001]
                                    ],
                                    [
                                        [121.897345, 41.133843],
                                        [121.890025664063, 41.1581520820313],
                                        [121.85271609375, 41.1396816230469],
                                        [121.897345, 41.133843]
                                    ]
                                ],
                                [
                                    [
                                        [122.243922148438, 41.3460353828125],
                                        [122.247345, 41.333843],
                                        [122.235152617188, 41.3372658515625],
                                        [122.243922148438, 41.3460353828125]
                                    ]
                                ]
                            ]
                        }
                    }]
                }

                ;
            });

            define("echarts/util/mapData/geoJson/dandong", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": { "name": "东港市" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.747345, 39.753843],
                                        [123.759537382813, 39.7504201484375],
                                        [123.750767851563, 39.7416506171875],
                                        [123.747345, 39.753843]
                                    ]
                                ],
                                [
                                    [
                                        [123.713922148438, 39.7560353828126],
                                        [123.717345, 39.7438430000001],
                                        [123.705152617188, 39.7472658515625],
                                        [123.713922148438, 39.7560353828126]
                                    ]
                                ],
                                [
                                    [
                                        [123.747345, 39.753843],
                                        [123.724346953125, 39.7578957343751],
                                        [123.741910429688, 39.7665395332031],
                                        [123.747345, 39.753843]
                                    ]
                                ],
                                [
                                    [
                                        [123.813922148438, 39.7960353828126],
                                        [123.817345, 39.7838430000001],
                                        [123.805152617188, 39.7872658515625],
                                        [123.813922148438, 39.7960353828126]
                                    ]
                                ],
                                [
                                    [
                                        [123.947345, 39.823843],
                                        [123.959537382813, 39.8272658515625],
                                        [123.950767851563, 39.8360353828126],
                                        [123.851881132813, 39.8283803535156],
                                        [123.842735625, 39.8393923164062],
                                        [123.831954375, 39.8382936835938],
                                        [123.822345, 39.8498622871094],
                                        [123.805704375, 39.8298268867188],
                                        [123.693804960938, 39.8172780585938],
                                        [123.66634890625, 39.8330055976563],
                                        [123.648267851563, 39.8547682929688],
                                        [123.637345, 39.863843],
                                        [123.63334109375, 39.8865688300782],
                                        [123.624346953125, 39.8694045234376],
                                        [123.637345, 39.863843],
                                        [123.643643828125, 39.8381923652344],
                                        [123.63142703125, 39.8297585273437],
                                        [123.621085234375, 39.7894557929688],
                                        [123.57142703125, 39.7797585273438],
                                        [123.551998320313, 39.76710471875],
                                        [123.54326296875, 39.7797585273438],
                                        [123.517345, 39.7838430000001],
                                        [123.513170195313, 39.7996681953125],
                                        [123.48968875, 39.8304128242187],
                                        [123.493453398438, 39.8494631171875],
                                        [123.465201445313, 39.8697145820313],
                                        [123.48341921875, 39.8984096503907],
                                        [123.479879179688, 39.9163185859375],
                                        [123.407447539063, 39.9308388496094],
                                        [123.391636992188, 39.9277150703126],
                                        [123.383170195313, 39.9496681953125],
                                        [123.37080203125, 39.9691518378906],
                                        [123.392652617188, 39.9848146796875],
                                        [123.397345, 40.0138430000001],
                                        [123.421793242188, 40.0293959785157],
                                        [123.47474734375, 40.0445363593751],
                                        [123.471666289063, 40.0693178535156],
                                        [123.520640898438, 40.099067609375],
                                        [123.558717070313, 40.1099538398438],
                                        [123.595211210938, 40.1314064765625],
                                        [123.607345, 40.173843],
                                        [123.629049101563, 40.1818141914063],
                                        [123.66197390625, 40.1584706855469],
                                        [123.68271609375, 40.1492153144531],
                                        [123.70197390625, 40.1350612617187],
                                        [123.662843046875, 40.1013491035157],
                                        [123.711158476563, 40.0332082343751],
                                        [123.782291289063, 40.05933128125],
                                        [123.835889921875, 40.0446620917969],
                                        [123.867345, 40.062212140625],
                                        [123.892183867188, 40.04835471875],
                                        [123.942174101563, 40.0592580390625],
                                        [123.982974882813, 40.0559804511719],
                                        [123.981539335938, 40.073843],
                                        [123.984298125, 40.1081435371094],
                                        [124.03271609375, 40.1384706855469],
                                        [124.056788359375, 40.1769008613282],
                                        [124.087213164063, 40.1904787421876],
                                        [124.107345, 40.213843],
                                        [124.117345, 40.213843],
                                        [124.135894804688, 40.2086769843751],
                                        [124.15170046875, 40.1881996894531],
                                        [124.187779570313, 40.1781520820313],
                                        [124.13298953125, 40.1042470527344],
                                        [124.161280546875, 40.0951039863282],
                                        [124.215797148438, 40.1279885078126],
                                        [124.233140898438, 40.099233625],
                                        [124.231256132813, 40.0864650703125],
                                        [124.252857695313, 40.0896572089844],
                                        [124.26297, 40.0765541816407],
                                        [124.307345, 40.0838430000001],
                                        [124.2994934375, 40.0210695625],
                                        [124.263863554688, 40.0060549140626],
                                        [124.260479765625, 39.978843],
                                        [124.282896757813, 39.9693959785157],
                                        [124.287345, 39.9638430000001],
                                        [124.281685820313, 39.9491262031251],
                                        [124.283033476563, 39.9383193183594],
                                        [124.22584109375, 39.9259450507813],
                                        [124.211793242188, 39.8893959785157],
                                        [124.202686796875, 39.8575588203126],
                                        [124.152706328125, 39.8281764960937],
                                        [124.120748320313, 39.8321511054688],
                                        [124.061793242188, 39.8193959785157],
                                        [124.009761992188, 39.7993959785156],
                                        [123.9570325, 39.8117470527344],
                                        [123.947345, 39.823843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "凤城市" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [124.107345, 40.213843],
                                        [124.112345, 40.2266506171875],
                                        [124.117345, 40.213843],
                                        [124.107345, 40.213843]
                                    ]
                                ],
                                [
                                    [
                                        [124.107345, 40.213843],
                                        [124.087213164063, 40.1904787421876],
                                        [124.056788359375, 40.1769008613282],
                                        [124.03271609375, 40.1384706855469],
                                        [123.984298125, 40.1081435371094],
                                        [123.981539335938, 40.073843],
                                        [123.982974882813, 40.0559804511719],
                                        [123.942174101563, 40.0592580390625],
                                        [123.892183867188, 40.04835471875],
                                        [123.867345, 40.062212140625],
                                        [123.835889921875, 40.0446620917969],
                                        [123.782291289063, 40.05933128125],
                                        [123.711158476563, 40.0332082343751],
                                        [123.662843046875, 40.1013491035157],
                                        [123.70197390625, 40.1350612617187],
                                        [123.68271609375, 40.1492153144531],
                                        [123.66197390625, 40.1584706855469],
                                        [123.629049101563, 40.1818141914063],
                                        [123.607345, 40.173843],
                                        [123.576431914063, 40.166821515625],
                                        [123.552896757813, 40.1742665839844],
                                        [123.590982695313, 40.2390554023438],
                                        [123.612896757813, 40.2482900214844],
                                        [123.631793242188, 40.2593959785157],
                                        [123.652896757813, 40.2682900214844],
                                        [123.70341921875, 40.3051955390625],
                                        [123.700308867188, 40.3302016425782],
                                        [123.722896757813, 40.3482900214844],
                                        [123.7537903125, 40.3922365546875],
                                        [123.751099882813, 40.413843],
                                        [123.754830351563, 40.443843],
                                        [123.751724882813, 40.4688430000001],
                                        [123.755284453125, 40.4974843574219],
                                        [123.741793242188, 40.5082900214844],
                                        [123.731085234375, 40.5337026191407],
                                        [123.733316679688, 40.5516689277344],
                                        [123.71127078125, 40.5891762519532],
                                        [123.735391875, 40.599341046875],
                                        [123.728844023438, 40.651977765625],
                                        [123.671793242188, 40.6682900214844],
                                        [123.652896757813, 40.6793959785157],
                                        [123.625206328125, 40.6910646796875],
                                        [123.571163359375, 40.6843422675781],
                                        [123.573013945313, 40.6992348457031],
                                        [123.550611601563, 40.7299062324219],
                                        [123.553448515625, 40.7527150703125],
                                        [123.578018828125, 40.7723891425781],
                                        [123.551793242188, 40.8082900214844],
                                        [123.547345, 40.823843],
                                        [123.53916140625, 40.8598622871094],
                                        [123.587345, 40.853843],
                                        [123.612808867188, 40.8493056464844],
                                        [123.696690703125, 40.8135390449219],
                                        [123.741988554688, 40.8493886542969],
                                        [123.75892703125, 40.8476625800782],
                                        [123.82250125, 40.8594203925781],
                                        [123.856339140625, 40.8467055488282],
                                        [123.929957304688, 40.8261232734376],
                                        [123.97541140625, 40.8620973945313],
                                        [124.012345, 40.8583339667969],
                                        [124.037345, 40.8608815742188],
                                        [124.062345, 40.8583339667969],
                                        [124.081954375, 40.8603322578126],
                                        [124.096612578125, 40.8426833320313],
                                        [124.136803007813, 40.86011253125],
                                        [124.130069609375, 40.9261440253906],
                                        [124.1431653125, 40.9490077949219],
                                        [124.121636992188, 40.9668910957032],
                                        [124.122896757813, 40.979233625],
                                        [124.111881132813, 40.9883803535157],
                                        [124.102808867188, 41.0093056464844],
                                        [124.091456328125, 41.0291213203126],
                                        [124.112808867188, 41.0383803535156],
                                        [124.137345, 41.0524343085937],
                                        [124.18107546875, 41.0273879218751],
                                        [124.201881132813, 41.0393056464844],
                                        [124.231138945313, 41.0519924140626],
                                        [124.2328528125, 41.068843],
                                        [124.230987578125, 41.0871755195313],
                                        [124.294361601563, 41.0936354804688],
                                        [124.290885039063, 41.0595021796876],
                                        [124.310474882813, 41.0575051093751],
                                        [124.34244265625, 41.0695156074219],
                                        [124.363531523438, 41.0574355292969],
                                        [124.382345, 41.0593520332032],
                                        [124.392667265625, 41.0583010078125],
                                        [124.4209778125, 41.0745143867188],
                                        [124.472808867188, 41.0593056464844],
                                        [124.507345, 41.043843],
                                        [124.529595976563, 40.9659523750001],
                                        [124.5361340625, 40.9133766914063],
                                        [124.501676054688, 40.8592153144532],
                                        [124.504156523438, 40.8392958808594],
                                        [124.491099882813, 40.828843],
                                        [124.519586210938, 40.8060341621094],
                                        [124.5241809375, 40.7690700507813],
                                        [124.4812121875, 40.7429689765625],
                                        [124.483472929688, 40.7247670722656],
                                        [124.451793242188, 40.6993959785157],
                                        [124.442896757813, 40.6882900214844],
                                        [124.431793242188, 40.6793959785157],
                                        [124.4214075, 40.6430800605469],
                                        [124.372345, 40.6369777656251],
                                        [124.342896757813, 40.640639875],
                                        [124.354117460938, 40.6124428535156],
                                        [124.382896757813, 40.5893959785156],
                                        [124.39373171875, 40.5271498847657],
                                        [124.420279570313, 40.5304518867188],
                                        [124.422965117188, 40.508843],
                                        [124.420650664063, 40.4902297187501],
                                        [124.433013945313, 40.4692031074219],
                                        [124.430533476563, 40.4492958808594],
                                        [124.448453398438, 40.4349489570312],
                                        [124.461793242188, 40.4182900214844],
                                        [124.474830351563, 40.40784690625],
                                        [124.446236601563, 40.3849489570313],
                                        [124.413702421875, 40.3443202949219],
                                        [124.371890898438, 40.3495217109376],
                                        [124.367345, 40.3438430000001],
                                        [124.33982546875, 40.3498451972657],
                                        [124.283316679688, 40.3453054023437],
                                        [124.243961210938, 40.390981671875],
                                        [124.199000273438, 40.387368390625],
                                        [124.181300078125, 40.3668288398438],
                                        [124.182745390625, 40.3488430000001],
                                        [124.180167265625, 40.3167360664063],
                                        [124.105386992188, 40.2942214179688],
                                        [124.08271609375, 40.2350612617188],
                                        [124.107345, 40.213843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "宽甸满族自治县" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [124.74271609375, 41.1492153144532],
                                        [124.760875273438, 41.1281374335937],
                                        [124.825714140625, 41.1398928046875],
                                        [124.87271609375, 41.1292153144532],
                                        [124.90197390625, 41.1184706855469],
                                        [124.97271609375, 41.1092153144531],
                                        [124.992266875, 41.098305890625],
                                        [125.04654421875, 41.1182375312501],
                                        [125.089620390625, 41.094204328125],
                                        [125.172345, 41.1008522773438],
                                        [125.202623320313, 41.0984194160157],
                                        [125.222266875, 41.109380109375],
                                        [125.25197390625, 41.0984706855469],
                                        [125.287320585938, 41.0878285957032],
                                        [125.31197390625, 41.0484706855469],
                                        [125.3427746875, 41.0291786933594],
                                        [125.340382109375, 40.9994020820313],
                                        [125.382974882813, 40.9959804511719],
                                        [125.381715117188, 41.0117055488281],
                                        [125.422691679688, 41.0084133125001],
                                        [125.434508085938, 41.0349001289063],
                                        [125.455025664063, 41.0172243476563],
                                        [125.450445585938, 40.9602004218751],
                                        [125.49291140625, 40.9567885566406],
                                        [125.490367460938, 40.988470685547],
                                        [125.529049101563, 40.9774025703125],
                                        [125.49271609375, 40.9261598945313],
                                        [125.52713015625, 40.9053530097657],
                                        [125.565982695313, 40.9270314765626],
                                        [125.577345, 40.913843],
                                        [125.5676575, 40.8897377753906],
                                        [125.657701445313, 40.9110170722657],
                                        [125.691339140625, 40.8859938789062],
                                        [125.697345, 40.863843],
                                        [125.67873171875, 40.8422389960937],
                                        [125.62271609375, 40.807153546875],
                                        [125.63197390625, 40.7984706855469],
                                        [125.68197390625, 40.7761598945313],
                                        [125.661573515625, 40.7592153144531],
                                        [125.59197390625, 40.7684706855469],
                                        [125.574742460938, 40.7884706855469],
                                        [125.544093046875, 40.7662526679688],
                                        [125.53271609375, 40.7284706855469],
                                        [125.457320585938, 40.7169826484375],
                                        [125.442701445313, 40.6684133125],
                                        [125.410162382813, 40.6710268378906],
                                        [125.413511992188, 40.6293386054688],
                                        [125.402047148438, 40.6284169746094],
                                        [125.37060671875, 40.6507118964844],
                                        [125.332345, 40.6476381660157],
                                        [125.263170195313, 40.6531960273438],
                                        [125.251988554688, 40.6160585761719],
                                        [125.197877226563, 40.6204067207031],
                                        [125.10345828125, 40.5677272773438],
                                        [125.016168242188, 40.5414455390626],
                                        [124.99271609375, 40.5212404609375],
                                        [125.00625125, 40.4879518867188],
                                        [125.031051054688, 40.4899440742187],
                                        [125.03291140625, 40.4667885566406],
                                        [124.977491484375, 40.4712416816407],
                                        [124.925904570313, 40.4522975898438],
                                        [124.897345, 40.4854494453125],
                                        [124.840636015625, 40.4196279121094],
                                        [124.80271609375, 40.3984706855469],
                                        [124.764288359375, 40.3869008613281],
                                        [124.727345, 40.363843],
                                        [124.693531523438, 40.3721486640625],
                                        [124.68326296875, 40.3604714179688],
                                        [124.70326296875, 40.3297585273438],
                                        [124.707345, 40.3138430000001],
                                        [124.652564726563, 40.2981935859376],
                                        [124.642345, 40.2994643378907],
                                        [124.62658328125, 40.2975038886719],
                                        [124.548804960938, 40.2406899238282],
                                        [124.507345, 40.223843],
                                        [124.501793242188, 40.2282900214844],
                                        [124.489078398438, 40.2870412421876],
                                        [124.409537382813, 40.298618390625],
                                        [124.392896757813, 40.3193959785157],
                                        [124.371793242188, 40.3282900214844],
                                        [124.367345, 40.3438430000001],
                                        [124.371890898438, 40.3495217109376],
                                        [124.413702421875, 40.3443202949219],
                                        [124.446236601563, 40.3849489570313],
                                        [124.474830351563, 40.40784690625],
                                        [124.461793242188, 40.4182900214844],
                                        [124.448453398438, 40.4349489570312],
                                        [124.430533476563, 40.4492958808594],
                                        [124.433013945313, 40.4692031074219],
                                        [124.420650664063, 40.4902297187501],
                                        [124.422965117188, 40.508843],
                                        [124.420279570313, 40.5304518867188],
                                        [124.39373171875, 40.5271498847657],
                                        [124.382896757813, 40.5893959785156],
                                        [124.354117460938, 40.6124428535156],
                                        [124.342896757813, 40.640639875],
                                        [124.372345, 40.6369777656251],
                                        [124.4214075, 40.6430800605469],
                                        [124.431793242188, 40.6793959785157],
                                        [124.442896757813, 40.6882900214844],
                                        [124.451793242188, 40.6993959785157],
                                        [124.483472929688, 40.7247670722656],
                                        [124.4812121875, 40.7429689765625],
                                        [124.5241809375, 40.7690700507813],
                                        [124.519586210938, 40.8060341621094],
                                        [124.491099882813, 40.828843],
                                        [124.504156523438, 40.8392958808594],
                                        [124.501676054688, 40.8592153144532],
                                        [124.5361340625, 40.9133766914063],
                                        [124.529595976563, 40.9659523750001],
                                        [124.507345, 41.043843],
                                        [124.511881132813, 41.0593056464844],
                                        [124.528267851563, 41.0729177070312],
                                        [124.541881132813, 41.0893056464844],
                                        [124.566436796875, 41.0999550605469],
                                        [124.656490507813, 41.0907753730469],
                                        [124.679234648438, 41.1181569648438],
                                        [124.708101835938, 41.1306764960938],
                                        [124.727345, 41.1538430000001],
                                        [124.74271609375, 41.1492153144532]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "元宝区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [124.324845, 40.2283803535157],
                                        [124.321016875, 40.1907900214844],
                                        [124.372808867188, 40.1793056464844],
                                        [124.392022734375, 40.1683010078126],
                                        [124.402345, 40.1693520332032],
                                        [124.416392851563, 40.1679213691407],
                                        [124.407345, 40.143843],
                                        [124.407345, 40.133843],
                                        [124.397345, 40.133843],
                                        [124.360704375, 40.137202375],
                                        [124.351314726563, 40.1557582832031],
                                        [124.327345, 40.143843],
                                        [124.321881132813, 40.1483803535157],
                                        [124.266236601563, 40.1607680488281],
                                        [124.223272734375, 40.1563893867188],
                                        [124.243511992188, 40.2102529121094],
                                        [124.262345, 40.2083339667969],
                                        [124.272345, 40.2093520332032],
                                        [124.282667265625, 40.2083010078126],
                                        [124.301881132813, 40.2193056464844],
                                        [124.324845, 40.2283803535157]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "振安区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [124.723511992188, 40.3220204902344],
                                        [124.707345, 40.3138430000001],
                                        [124.70326296875, 40.3297585273438],
                                        [124.68326296875, 40.3604714179688],
                                        [124.693531523438, 40.3721486640625],
                                        [124.727345, 40.363843],
                                        [124.723511992188, 40.3220204902344]
                                    ]
                                ],
                                [
                                    [
                                        [124.243961210938, 40.390981671875],
                                        [124.283316679688, 40.3453054023437],
                                        [124.33982546875, 40.3498451972657],
                                        [124.367345, 40.3438430000001],
                                        [124.371793242188, 40.3282900214844],
                                        [124.392896757813, 40.3193959785157],
                                        [124.409537382813, 40.298618390625],
                                        [124.489078398438, 40.2870412421876],
                                        [124.501793242188, 40.2282900214844],
                                        [124.507345, 40.223843],
                                        [124.502838164063, 40.2062831855469],
                                        [124.483013945313, 40.1775722480469],
                                        [124.470069609375, 40.180473859375],
                                        [124.44142703125, 40.1697585273438],
                                        [124.427022734375, 40.1488930488282],
                                        [124.407345, 40.143843],
                                        [124.416392851563, 40.1679213691407],
                                        [124.402345, 40.1693520332032],
                                        [124.392022734375, 40.1683010078126],
                                        [124.372808867188, 40.1793056464844],
                                        [124.321016875, 40.1907900214844],
                                        [124.324845, 40.2283803535157],
                                        [124.301881132813, 40.2193056464844],
                                        [124.282667265625, 40.2083010078126],
                                        [124.272345, 40.2093520332032],
                                        [124.262345, 40.2083339667969],
                                        [124.243511992188, 40.2102529121094],
                                        [124.223272734375, 40.1563893867188],
                                        [124.266236601563, 40.1607680488281],
                                        [124.321881132813, 40.1483803535157],
                                        [124.327345, 40.143843],
                                        [124.33302859375, 40.098344953125],
                                        [124.311793242188, 40.0893959785157],
                                        [124.307345, 40.0838430000001],
                                        [124.26297, 40.0765541816407],
                                        [124.252857695313, 40.0896572089844],
                                        [124.231256132813, 40.0864650703125],
                                        [124.233140898438, 40.099233625],
                                        [124.215797148438, 40.1279885078126],
                                        [124.161280546875, 40.0951039863282],
                                        [124.13298953125, 40.1042470527344],
                                        [124.187779570313, 40.1781520820313],
                                        [124.15170046875, 40.1881996894531],
                                        [124.135894804688, 40.2086769843751],
                                        [124.117345, 40.213843],
                                        [124.112345, 40.2266506171875],
                                        [124.107345, 40.213843],
                                        [124.08271609375, 40.2350612617188],
                                        [124.105386992188, 40.2942214179688],
                                        [124.180167265625, 40.3167360664063],
                                        [124.182745390625, 40.3488430000001],
                                        [124.181300078125, 40.3668288398438],
                                        [124.199000273438, 40.387368390625],
                                        [124.243961210938, 40.390981671875]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "振兴区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [124.30298953125, 39.9681996894532],
                                        [124.287345, 39.9638430000001],
                                        [124.282896757813, 39.9693959785157],
                                        [124.260479765625, 39.978843],
                                        [124.263863554688, 40.0060549140626],
                                        [124.2994934375, 40.0210695625],
                                        [124.307345, 40.0838430000001],
                                        [124.311793242188, 40.0893959785157],
                                        [124.33302859375, 40.098344953125],
                                        [124.327345, 40.143843],
                                        [124.351314726563, 40.1557582832031],
                                        [124.360704375, 40.137202375],
                                        [124.397345, 40.133843],
                                        [124.38427859375, 40.1169118476563],
                                        [124.36170046875, 40.0994863105469],
                                        [124.35298953125, 40.0881996894532],
                                        [124.33375125, 40.0733498359375],
                                        [124.330128203125, 40.0488430000001],
                                        [124.360484648438, 40.0364174628907],
                                        [124.363140898438, 40.018452375],
                                        [124.351549101563, 39.9992336250001],
                                        [124.353219023438, 39.9879445625001],
                                        [124.30298953125, 39.9681996894532]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });

            define("echarts/util/mapData/geoJson/jinzhou", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": { "name": "凌河区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [121.211158476563, 41.1376552558594],
                                        [121.247345, 41.133843],
                                        [121.239166289063, 41.1176772285156],
                                        [121.197345, 41.1138430000001],
                                        [121.181246367188, 41.1099404121094],
                                        [121.16857546875, 41.0901467109375],
                                        [121.137345, 41.103843],
                                        [121.1289465625, 41.1380434394532],
                                        [121.137345, 41.143843],
                                        [121.141558867188, 41.1370058417969],
                                        [121.189586210938, 41.1528017402344],
                                        [121.211158476563, 41.1376552558594]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "古塔区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [121.077345, 41.143843],
                                        [121.065152617188, 41.1472658515625],
                                        [121.073922148438, 41.1560353828125],
                                        [121.077345, 41.143843]
                                    ]
                                ],
                                [
                                    [
                                        [121.077345, 41.143843],
                                        [121.103985625, 41.147202375],
                                        [121.111422148438, 41.1618984199219],
                                        [121.133985625, 41.150483625],
                                        [121.137345, 41.143843],
                                        [121.1289465625, 41.1380434394532],
                                        [121.137345, 41.103843],
                                        [121.110704375, 41.107202375],
                                        [121.093985625, 41.120483625],
                                        [121.06927859375, 41.1276137519531],
                                        [121.077345, 41.143843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "太和区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [121.183922148438, 41.0360353828125],
                                        [121.187345, 41.023843],
                                        [121.175152617188, 41.0272658515625],
                                        [121.183922148438, 41.0360353828125]
                                    ]
                                ],
                                [
                                    [
                                        [121.077345, 41.143843],
                                        [121.073922148438, 41.1560353828125],
                                        [121.065152617188, 41.1472658515625],
                                        [121.06927859375, 41.1276137519531],
                                        [121.093985625, 41.120483625],
                                        [121.110704375, 41.107202375],
                                        [121.137345, 41.103843],
                                        [121.16857546875, 41.0901467109375],
                                        [121.181246367188, 41.1099404121094],
                                        [121.197345, 41.1138430000001],
                                        [121.20142703125, 41.0979274726563],
                                        [121.21422, 41.078286359375],
                                        [121.187257109375, 41.0681972480469],
                                        [121.173013945313, 41.0475722480469],
                                        [121.162066679688, 41.0500258613281],
                                        [121.11380984375, 41.0297585273438],
                                        [121.05142703125, 41.0379274726563],
                                        [121.027345, 41.043843],
                                        [120.991080351563, 41.0349355292969],
                                        [120.937354765625, 41.0515883613282],
                                        [120.9446496875, 41.0841127753907],
                                        [120.937345, 41.1138430000001],
                                        [120.95326296875, 41.1179274726562],
                                        [120.96142703125, 41.1297585273437],
                                        [120.99490359375, 41.1383498359375],
                                        [121.02326296875, 41.1579274726562],
                                        [121.042271757813, 41.1854640937501],
                                        [121.082183867188, 41.1944106269531],
                                        [121.122647734375, 41.177415998047],
                                        [121.168175078125, 41.2153823066406],
                                        [121.202345, 41.2077223945312],
                                        [121.213053007813, 41.210122296875],
                                        [121.23142703125, 41.1779274726563],
                                        [121.2651965625, 41.1692629218751],
                                        [121.25107546875, 41.1595131660156],
                                        [121.253526640625, 41.1485646796875],
                                        [121.247345, 41.133843],
                                        [121.211158476563, 41.1376552558594],
                                        [121.189586210938, 41.1528017402344],
                                        [121.141558867188, 41.1370058417969],
                                        [121.137345, 41.143843],
                                        [121.133985625, 41.150483625],
                                        [121.111422148438, 41.1618984199219],
                                        [121.103985625, 41.147202375],
                                        [121.077345, 41.143843]
                                    ]
                                ],
                                [
                                    [
                                        [121.227345, 41.273843],
                                        [121.207769804688, 41.2493959785157],
                                        [121.183609648438, 41.2628444648438],
                                        [121.202896757813, 41.2782900214844],
                                        [121.207345, 41.283843],
                                        [121.217345, 41.283843],
                                        [121.217345, 41.273843],
                                        [121.227345, 41.273843]
                                    ]
                                ],
                                [
                                    [
                                        [121.227345, 41.273843],
                                        [121.227345, 41.293843],
                                        [121.227345, 41.3038430000001],
                                        [121.237345, 41.3038430000001],
                                        [121.2609778125, 41.2887148261719],
                                        [121.2709778125, 41.2531264472657],
                                        [121.227345, 41.273843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "黑山县" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [122.197345, 41.473843],
                                        [122.197345, 41.463843],
                                        [122.187345, 41.463843],
                                        [122.187345, 41.473843],
                                        [122.197345, 41.473843]
                                    ]
                                ],
                                [
                                    [
                                        [122.467345, 42.033843],
                                        [122.470767851563, 42.0460353828126],
                                        [122.479537382813, 42.0372658515625],
                                        [122.467345, 42.033843]
                                    ]
                                ],
                                [
                                    [
                                        [122.467345, 42.033843],
                                        [122.483077421875, 42.0095778632813],
                                        [122.501612578125, 41.9381081367188],
                                        [122.518140898438, 41.8969838691406],
                                        [122.453526640625, 41.9081081367188],
                                        [122.433756132813, 41.8939528632812],
                                        [122.453077421875, 41.8795778632813],
                                        [122.461612578125, 41.8381081367188],
                                        [122.503839140625, 41.8213271308594],
                                        [122.533077421875, 41.7995778632813],
                                        [122.54177859375, 41.7878847480469],
                                        [122.55291140625, 41.7898012519532],
                                        [122.561612578125, 41.7781081367188],
                                        [122.583077421875, 41.7695778632813],
                                        [122.587345, 41.7638430000001],
                                        [122.583624296875, 41.7575649238281],
                                        [122.571065703125, 41.7501210761719],
                                        [122.563624296875, 41.7175649238282],
                                        [122.540445585938, 41.6893679023438],
                                        [122.54642703125, 41.6719606757813],
                                        [122.532345, 41.6671254707032],
                                        [122.504498320313, 41.6766884589844],
                                        [122.516666289063, 41.641264875],
                                        [122.491065703125, 41.6101210761719],
                                        [122.483624296875, 41.5875649238282],
                                        [122.470147734375, 41.579575421875],
                                        [122.477345, 41.5638430000001],
                                        [122.46298953125, 41.5581996894531],
                                        [122.355523710938, 41.5489553046875],
                                        [122.247340117188, 41.5059535957031],
                                        [122.197345, 41.473843],
                                        [122.192628203125, 41.4991237617188],
                                        [122.105640898438, 41.5477407050782],
                                        [122.078678007813, 41.5601149726563],
                                        [122.04310671875, 41.5579946113282],
                                        [122.017994414063, 41.5716396308594],
                                        [122.03373171875, 41.6005947089844],
                                        [122.031451445313, 41.638843],
                                        [122.033111601563, 41.666684796875],
                                        [121.9820325, 41.6785695625001],
                                        [121.98322390625, 41.6985903144531],
                                        [121.972061796875, 41.7085622382812],
                                        [121.962628203125, 41.7291237617188],
                                        [121.893853789063, 41.7790358710938],
                                        [121.827345, 41.783843],
                                        [121.838365507813, 41.7981215644531],
                                        [121.864859648438, 41.8089650703126],
                                        [121.830474882813, 41.818540265625],
                                        [121.84298953125, 41.8281996894531],
                                        [121.85170046875, 41.8394863105469],
                                        [121.89298953125, 41.8481996894532],
                                        [121.9210559375, 41.8651308417969],
                                        [121.95298953125, 41.8781996894532],
                                        [121.96170046875, 41.8894863105469],
                                        [121.9786340625, 41.9025551582031],
                                        [121.99170046875, 41.9194863105469],
                                        [122.02298953125, 41.9281996894532],
                                        [122.06170046875, 41.9594863105469],
                                        [122.09298953125, 41.9781996894531],
                                        [122.10978640625, 41.9999599433594],
                                        [122.122857695313, 41.9980287910156],
                                        [122.133902617188, 42.0123378730469],
                                        [122.27298953125, 42.0681996894532],
                                        [122.296768828125, 42.0825441718751],
                                        [122.35298953125, 42.0981996894532],
                                        [122.40170046875, 42.1194863105469],
                                        [122.417345, 42.123843],
                                        [122.427345, 42.123843],
                                        [122.440338164063, 42.1177895332031],
                                        [122.428873320313, 42.0977895332032],
                                        [122.448077421875, 42.088843],
                                        [122.426612578125, 42.078843],
                                        [122.445816679688, 42.0698964667969],
                                        [122.438873320313, 42.0577895332032],
                                        [122.454166289063, 42.0506642890625],
                                        [122.460523710938, 42.0370217109375],
                                        [122.467345, 42.033843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "凌海市" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [121.193922148438, 40.9260353828125],
                                        [121.197345, 40.913843],
                                        [121.185152617188, 40.9172658515625],
                                        [121.193922148438, 40.9260353828125]
                                    ]
                                ],
                                [
                                    [
                                        [121.753531523438, 41.1000307441406],
                                        [121.757345, 41.083843],
                                        [121.71029421875, 41.0877272773438],
                                        [121.673531523438, 41.1002541328126],
                                        [121.753531523438, 41.1000307441406]
                                    ]
                                ],
                                [
                                    [
                                        [121.227345, 41.273843],
                                        [121.217345, 41.273843],
                                        [121.217345, 41.283843],
                                        [121.217345, 41.293843],
                                        [121.227345, 41.293843],
                                        [121.227345, 41.273843]
                                    ]
                                ],
                                [
                                    [
                                        [121.187345, 40.943843],
                                        [121.197345, 40.943843],
                                        [121.197345, 40.9538430000001],
                                        [121.209537382813, 40.9572658515625],
                                        [121.200767851563, 40.9660353828125],
                                        [121.197345, 40.9538430000001],
                                        [121.187345, 40.9538430000001],
                                        [121.181519804688, 40.9396681953125],
                                        [121.170152617188, 40.9101882148438],
                                        [121.132310820313, 40.8830678535156],
                                        [121.081519804688, 40.8696681953125],
                                        [121.070797148438, 40.8161843085938],
                                        [121.01162234375, 40.8278786445313],
                                        [121.003170195313, 40.8396681953125],
                                        [120.997345, 40.8438430000001],
                                        [121.001612578125, 40.8595778632813],
                                        [121.022633085938, 40.8752138496094],
                                        [121.031612578125, 40.9332314277344],
                                        [121.003756132813, 40.9539516425781],
                                        [121.013155546875, 41.0085378242188],
                                        [121.027345, 41.043843],
                                        [121.05142703125, 41.0379274726563],
                                        [121.11380984375, 41.0297585273438],
                                        [121.162066679688, 41.0500258613281],
                                        [121.173013945313, 41.0475722480469],
                                        [121.187257109375, 41.0681972480469],
                                        [121.21422, 41.078286359375],
                                        [121.20142703125, 41.0979274726563],
                                        [121.197345, 41.1138430000001],
                                        [121.239166289063, 41.1176772285156],
                                        [121.247345, 41.133843],
                                        [121.253526640625, 41.1485646796875],
                                        [121.25107546875, 41.1595131660156],
                                        [121.2651965625, 41.1692629218751],
                                        [121.23142703125, 41.1779274726563],
                                        [121.213053007813, 41.210122296875],
                                        [121.202345, 41.2077223945312],
                                        [121.168175078125, 41.2153823066406],
                                        [121.122647734375, 41.177415998047],
                                        [121.082183867188, 41.1944106269531],
                                        [121.042271757813, 41.1854640937501],
                                        [121.02326296875, 41.1579274726562],
                                        [120.99490359375, 41.1383498359375],
                                        [120.96142703125, 41.1297585273437],
                                        [120.95326296875, 41.1179274726562],
                                        [120.937345, 41.1138430000001],
                                        [120.93330203125, 41.12151878125],
                                        [120.922345, 41.11659690625],
                                        [120.8992590625, 41.1269692207031],
                                        [120.905142851563, 41.1400673652344],
                                        [120.869698515625, 41.1572927070313],
                                        [120.857345, 41.133843],
                                        [120.847345, 41.133843],
                                        [120.815303984375, 41.1388930488282],
                                        [120.77970828125, 41.1620729804688],
                                        [120.788853789063, 41.2028774238281],
                                        [120.767345, 41.1938430000001],
                                        [120.7534778125, 41.2088088203125],
                                        [120.703389921875, 41.2207399726563],
                                        [120.763331328125, 41.249028546875],
                                        [120.7317590625, 41.2782851386719],
                                        [120.742535429688, 41.2986525703125],
                                        [120.752154570313, 41.3490334296875],
                                        [120.767725859375, 41.363462140625],
                                        [120.777345, 41.393843],
                                        [120.804195585938, 41.4013198066407],
                                        [120.800225859375, 41.4281996894532],
                                        [120.81298953125, 41.4194863105469],
                                        [120.831754179688, 41.3951772285157],
                                        [120.841783476563, 41.4196852851563],
                                        [120.877345, 41.4138430000001],
                                        [120.88142703125, 41.3979274726563],
                                        [120.896280546875, 41.3876723457032],
                                        [120.881046171875, 41.3385182929688],
                                        [120.89408328125, 41.3184950996094],
                                        [120.87326296875, 41.3041188789063],
                                        [120.925728789063, 41.2862392402344],
                                        [120.942345, 41.2899636054688],
                                        [120.961676054688, 41.285630109375],
                                        [120.9770715625, 41.3079274726562],
                                        [120.99326296875, 41.2997585273438],
                                        [121.005553007813, 41.2819545722657],
                                        [121.050440703125, 41.316743390625],
                                        [121.085548125, 41.3314882636719],
                                        [121.102345, 41.3277223945313],
                                        [121.117345, 41.3310842109376],
                                        [121.132345, 41.3277223945313],
                                        [121.142789335938, 41.3300637031251],
                                        [121.161900664063, 41.317622296875],
                                        [121.173013945313, 41.3201137519532],
                                        [121.18142703125, 41.3079274726562],
                                        [121.199176054688, 41.2956740546875],
                                        [121.207345, 41.283843],
                                        [121.202896757813, 41.2782900214844],
                                        [121.183609648438, 41.2628444648438],
                                        [121.207769804688, 41.2493959785157],
                                        [121.227345, 41.273843],
                                        [121.2709778125, 41.2531264472657],
                                        [121.2609778125, 41.2887148261719],
                                        [121.237345, 41.3038430000001],
                                        [121.250728789063, 41.3193752265625],
                                        [121.262642851563, 41.3184169746094],
                                        [121.29408328125, 41.3407118964844],
                                        [121.366329375, 41.334907453125],
                                        [121.394586210938, 41.3506716132813],
                                        [121.525050078125, 41.3401894355469],
                                        [121.521138945313, 41.388843],
                                        [121.54271609375, 41.3984706855469],
                                        [121.55197390625, 41.4092153144531],
                                        [121.587345, 41.433843],
                                        [121.59142703125, 41.4279274726563],
                                        [121.628961210938, 41.4065041328125],
                                        [121.643682890625, 41.3491481757813],
                                        [121.70326296875, 41.3397585273438],
                                        [121.717345, 41.333843],
                                        [121.711246367188, 41.314575421875],
                                        [121.649371367188, 41.2949867988282],
                                        [121.632154570313, 41.2790334296875],
                                        [121.622535429688, 41.2686525703126],
                                        [121.572535429688, 41.2363649726563],
                                        [121.586011992188, 41.2115517402344],
                                        [121.621822539063, 41.1946498847656],
                                        [121.562535429688, 41.1563649726563],
                                        [121.578941679688, 41.1090908027344],
                                        [121.671846953125, 41.0963942695313],
                                        [121.672550078125, 41.0786916328126],
                                        [121.661783476563, 41.0479787421875],
                                        [121.664874296875, 40.9700832343751],
                                        [121.642154570313, 40.9490334296876],
                                        [121.632535429688, 40.9286525703126],
                                        [121.622154570313, 40.9190334296876],
                                        [121.596422148438, 40.8791835761719],
                                        [121.557345, 40.873843],
                                        [121.498863554688, 40.8602919746094],
                                        [121.503170195313, 40.8894130683594],
                                        [121.47673953125, 40.9002309394532],
                                        [121.437857695313, 40.8944850898438],
                                        [121.41298953125, 40.9094863105469],
                                        [121.347564726563, 40.9206008125001],
                                        [121.332857695313, 40.9396572089844],
                                        [121.310494414063, 40.9363527656251],
                                        [121.313175078125, 40.9182326484375],
                                        [121.265264921875, 40.9094863105469],
                                        [121.252808867188, 40.9399233222656],
                                        [121.21990359375, 40.92698753125],
                                        [121.197838164063, 40.9302480292969],
                                        [121.187345, 40.943843]
                                    ],
                                    [
                                        [121.187345, 41.023843],
                                        [121.183922148438, 41.0360353828125],
                                        [121.175152617188, 41.0272658515625],
                                        [121.187345, 41.023843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "北镇市" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [122.03373171875, 41.6005947089844],
                                        [122.017994414063, 41.5716396308594],
                                        [122.04310671875, 41.5579946113282],
                                        [122.078678007813, 41.5601149726563],
                                        [122.105640898438, 41.5477407050782],
                                        [122.192628203125, 41.4991237617188],
                                        [122.197345, 41.473843],
                                        [122.187345, 41.473843],
                                        [122.187345, 41.463843],
                                        [122.187345, 41.4538430000001],
                                        [122.171793242188, 41.4493959785157],
                                        [122.14537234375, 41.4338649726563],
                                        [122.132896757813, 41.4182900214844],
                                        [122.111793242188, 41.4093959785157],
                                        [122.083453398438, 41.3927370429687],
                                        [122.051793242188, 41.3793959785157],
                                        [122.027345, 41.3650258613282],
                                        [122.002896757813, 41.3793959785157],
                                        [121.966920195313, 41.3882900214844],
                                        [121.902711210938, 41.3505458808594],
                                        [121.87834109375, 41.3201113105469],
                                        [121.862896757813, 41.3393959785157],
                                        [121.841129179688, 41.3568288398438],
                                        [121.790181914063, 41.3372463203125],
                                        [121.771890898438, 41.3395217109376],
                                        [121.762799101563, 41.3281642890625],
                                        [121.717345, 41.333843],
                                        [121.70326296875, 41.3397585273438],
                                        [121.643682890625, 41.3491481757813],
                                        [121.628961210938, 41.4065041328125],
                                        [121.59142703125, 41.4279274726563],
                                        [121.587345, 41.433843],
                                        [121.59170046875, 41.4494863105469],
                                        [121.60312625, 41.4785512519531],
                                        [121.601607695313, 41.4888430000001],
                                        [121.603160429688, 41.4993544746094],
                                        [121.569600859375, 41.525259015625],
                                        [121.574561796875, 41.558843],
                                        [121.569967070313, 41.5899330878906],
                                        [121.590767851563, 41.5868593574219],
                                        [121.61170046875, 41.5994863105469],
                                        [121.6722278125, 41.6163417792969],
                                        [121.693253203125, 41.6677077460938],
                                        [121.690865507813, 41.6838430000001],
                                        [121.697218046875, 41.7268044257813],
                                        [121.733560820313, 41.748540265625],
                                        [121.72170046875, 41.7681996894532],
                                        [121.717345, 41.7938430000001],
                                        [121.787447539063, 41.8026015449219],
                                        [121.811793242188, 41.7882900214844],
                                        [121.827345, 41.783843],
                                        [121.893853789063, 41.7790358710938],
                                        [121.962628203125, 41.7291237617188],
                                        [121.972061796875, 41.7085622382812],
                                        [121.98322390625, 41.6985903144531],
                                        [121.9820325, 41.6785695625001],
                                        [122.033111601563, 41.666684796875],
                                        [122.031451445313, 41.638843],
                                        [122.03373171875, 41.6005947089844]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "义县" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [121.717345, 41.7938430000001],
                                        [121.72170046875, 41.7681996894532],
                                        [121.733560820313, 41.748540265625],
                                        [121.697218046875, 41.7268044257813],
                                        [121.690865507813, 41.6838430000001],
                                        [121.693253203125, 41.6677077460938],
                                        [121.6722278125, 41.6163417792969],
                                        [121.61170046875, 41.5994863105469],
                                        [121.590767851563, 41.5868593574219],
                                        [121.569967070313, 41.5899330878906],
                                        [121.574561796875, 41.558843],
                                        [121.569600859375, 41.525259015625],
                                        [121.603160429688, 41.4993544746094],
                                        [121.601607695313, 41.4888430000001],
                                        [121.60312625, 41.4785512519531],
                                        [121.59170046875, 41.4494863105469],
                                        [121.587345, 41.433843],
                                        [121.55197390625, 41.4092153144531],
                                        [121.54271609375, 41.3984706855469],
                                        [121.521138945313, 41.388843],
                                        [121.525050078125, 41.3401894355469],
                                        [121.394586210938, 41.3506716132813],
                                        [121.366329375, 41.334907453125],
                                        [121.29408328125, 41.3407118964844],
                                        [121.262642851563, 41.3184169746094],
                                        [121.250728789063, 41.3193752265625],
                                        [121.237345, 41.3038430000001],
                                        [121.227345, 41.3038430000001],
                                        [121.227345, 41.293843],
                                        [121.217345, 41.293843],
                                        [121.217345, 41.283843],
                                        [121.207345, 41.283843],
                                        [121.199176054688, 41.2956740546875],
                                        [121.18142703125, 41.3079274726562],
                                        [121.173013945313, 41.3201137519532],
                                        [121.161900664063, 41.317622296875],
                                        [121.142789335938, 41.3300637031251],
                                        [121.132345, 41.3277223945313],
                                        [121.117345, 41.3310842109376],
                                        [121.102345, 41.3277223945313],
                                        [121.085548125, 41.3314882636719],
                                        [121.050440703125, 41.316743390625],
                                        [121.005553007813, 41.2819545722657],
                                        [120.99326296875, 41.2997585273438],
                                        [120.9770715625, 41.3079274726562],
                                        [120.961676054688, 41.285630109375],
                                        [120.942345, 41.2899636054688],
                                        [120.925728789063, 41.2862392402344],
                                        [120.87326296875, 41.3041188789063],
                                        [120.89408328125, 41.3184950996094],
                                        [120.881046171875, 41.3385182929688],
                                        [120.896280546875, 41.3876723457032],
                                        [120.88142703125, 41.3979274726563],
                                        [120.877345, 41.4138430000001],
                                        [120.88197390625, 41.4692153144532],
                                        [120.89271609375, 41.4784706855469],
                                        [120.90197390625, 41.5192153144531],
                                        [120.959576445313, 41.5449184394532],
                                        [120.972769804688, 41.5685646796875],
                                        [120.971085234375, 41.5895107246094],
                                        [121.053902617188, 41.6199233222656],
                                        [121.098624296875, 41.6163295722657],
                                        [121.12345828125, 41.6377272773438],
                                        [121.14197390625, 41.6592153144532],
                                        [121.221295195313, 41.6808071113281],
                                        [121.224176054688, 41.7166030097656],
                                        [121.208878203125, 41.7440163398438],
                                        [121.22197390625, 41.7592153144532],
                                        [121.24271609375, 41.7684706855469],
                                        [121.25197390625, 41.7792153144532],
                                        [121.257345, 41.783843],
                                        [121.283985625, 41.7804836250001],
                                        [121.293336210938, 41.7620009589844],
                                        [121.31740359375, 41.773755109375],
                                        [121.337345, 41.7638430000001],
                                        [121.33099734375, 41.7364589667969],
                                        [121.356939726563, 41.7164357734375],
                                        [121.42834109375, 41.7372548652344],
                                        [121.456627226563, 41.6899599433594],
                                        [121.47170046875, 41.7094863105469],
                                        [121.50459109375, 41.7186452460938],
                                        [121.501607695313, 41.738843],
                                        [121.50375125, 41.7533498359375],
                                        [121.52298953125, 41.7681996894532],
                                        [121.527345, 41.773843],
                                        [121.5318371875, 41.7794509101563],
                                        [121.621890898438, 41.7906520820313],
                                        [121.632799101563, 41.7770339179688],
                                        [121.657345, 41.7800868964844],
                                        [121.672799101563, 41.7781642890625],
                                        [121.681793242188, 41.7893959785157],
                                        [121.717345, 41.7938430000001]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });

            define("echarts/util/mapData/geoJson/yingkou", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": { "name": "大石桥市" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [122.747345, 40.443843],
                                        [122.759537382813, 40.4472658515626],
                                        [122.750767851563, 40.4560353828125],
                                        [122.69170046875, 40.4481996894531],
                                        [122.67248171875, 40.4597927070313],
                                        [122.64263796875, 40.4480605292969],
                                        [122.627838164063, 40.4502480292969],
                                        [122.598238554688, 40.4885951972657],
                                        [122.532232695313, 40.4998073554688],
                                        [122.499845, 40.4802700019532],
                                        [122.43298953125, 40.5094863105469],
                                        [122.407345, 40.513843],
                                        [122.407345, 40.523843],
                                        [122.445128203125, 40.5302614570313],
                                        [122.437345, 40.563843],
                                        [122.44312625, 40.5785512519532],
                                        [122.43798953125, 40.6133303046876],
                                        [122.453516875, 40.639077375],
                                        [122.44170046875, 40.6481996894532],
                                        [122.43298953125, 40.6894863105469],
                                        [122.36170046875, 40.7181996894531],
                                        [122.3500403125, 40.7466957832031],
                                        [122.30298953125, 40.7281996894532],
                                        [122.267345, 40.723843],
                                        [122.267345, 40.7338430000001],
                                        [122.247345, 40.7338430000001],
                                        [122.227345, 40.7338430000001],
                                        [122.211363554688, 40.7417873359375],
                                        [122.207345, 40.7338430000001],
                                        [122.086495390625, 40.7961794257813],
                                        [122.122896757813, 40.8182900214844],
                                        [122.151954375, 40.8395131660156],
                                        [122.17447390625, 40.8367116523438],
                                        [122.169425078125, 40.8773159003906],
                                        [122.205421171875, 40.8561550117187],
                                        [122.252125273438, 40.8694924140625],
                                        [122.271402617188, 40.8670937324219],
                                        [122.317345, 40.903843],
                                        [122.322345, 40.8910353828125],
                                        [122.327345, 40.903843],
                                        [122.34478640625, 40.91069846875],
                                        [122.362735625, 40.9080458808594],
                                        [122.385640898438, 40.9218617988281],
                                        [122.46607546875, 40.9405007148438],
                                        [122.506470976563, 40.9239699531251],
                                        [122.490362578125, 40.8972658515625],
                                        [122.494327421875, 40.8704201484375],
                                        [122.481080351563, 40.8484535957032],
                                        [122.518795195313, 40.8330178046876],
                                        [122.536392851563, 40.8038430000001],
                                        [122.515660429688, 40.7694741035156],
                                        [122.56298953125, 40.7594863105469],
                                        [122.571832304688, 40.7480287910157],
                                        [122.640230742188, 40.7581362128906],
                                        [122.64744265625, 40.7093544746094],
                                        [122.61298953125, 40.6827614570313],
                                        [122.62170046875, 40.6681996894532],
                                        [122.653267851563, 40.659408185547],
                                        [122.637261992188, 40.5903334785157],
                                        [122.652554960938, 40.5880727363282],
                                        [122.69244265625, 40.5997023750001],
                                        [122.72170046875, 40.5881996894532],
                                        [122.7987121875, 40.5679848457031],
                                        [122.825264921875, 40.5335842109375],
                                        [122.867345, 40.5273647285157],
                                        [122.922266875, 40.5354811835937],
                                        [122.94298953125, 40.5194863105469],
                                        [122.951832304688, 40.5080287910156],
                                        [122.96490359375, 40.5099599433594],
                                        [122.98170046875, 40.4881996894531],
                                        [122.997345, 40.483843],
                                        [122.98154421875, 40.4592458320313],
                                        [122.9870325, 40.4221108222657],
                                        [122.93298953125, 40.4070607734375],
                                        [122.920416289063, 40.333051984375],
                                        [122.887345, 40.323843],
                                        [122.811300078125, 40.3367617011719],
                                        [122.815386992188, 40.3644130683594],
                                        [122.78170046875, 40.3781996894531],
                                        [122.7686340625, 40.3951308417969],
                                        [122.737608671875, 40.4190761542969],
                                        [122.747345, 40.443843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "盖州市" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [122.747345, 40.443843],
                                        [122.750767851563, 40.4560353828125],
                                        [122.759537382813, 40.4472658515626],
                                        [122.747345, 40.443843]
                                    ]
                                ],
                                [
                                    [
                                        [122.747345, 40.443843],
                                        [122.737608671875, 40.4190761542969],
                                        [122.7686340625, 40.3951308417969],
                                        [122.78170046875, 40.3781996894531],
                                        [122.815386992188, 40.3644130683594],
                                        [122.811300078125, 40.3367617011719],
                                        [122.887345, 40.323843],
                                        [122.86662234375, 40.2711244941406],
                                        [122.88298953125, 40.2294863105469],
                                        [122.887345, 40.1938430000001],
                                        [122.862105742188, 40.1728774238281],
                                        [122.838189726563, 40.1177370429688],
                                        [122.822022734375, 40.1193849921876],
                                        [122.799644804688, 40.1065700507813],
                                        [122.772345, 40.1093520332032],
                                        [122.7576575, 40.1078554511719],
                                        [122.702691679688, 40.0682973457032],
                                        [122.692301054688, 40.0693569160156],
                                        [122.525836210938, 40.0489394355469],
                                        [122.543233671875, 40.0185646796876],
                                        [122.5132434375, 40.0055580878906],
                                        [122.534879179688, 39.987583234375],
                                        [122.556881132813, 39.9368520332032],
                                        [122.521173125, 39.9404909492188],
                                        [122.507345, 39.923843],
                                        [122.47170046875, 39.9381996894532],
                                        [122.45298953125, 39.9494863105469],
                                        [122.43170046875, 39.9581996894531],
                                        [122.412735625, 39.9696401191406],
                                        [122.402345, 39.9681044746094],
                                        [122.392345, 39.9695815253907],
                                        [122.365889921875, 39.9656728339844],
                                        [122.340767851563, 39.9808266425782],
                                        [122.322345, 39.9781044746094],
                                        [122.312017851563, 39.9796303535157],
                                        [122.277345, 39.9638430000001],
                                        [122.241954375, 40.0162917304688],
                                        [122.210406523438, 39.9962624335937],
                                        [122.183267851563, 40.0016237617188],
                                        [122.161510039063, 40.0319814277344],
                                        [122.081519804688, 40.0480178046875],
                                        [122.0532825, 40.0659450507813],
                                        [121.983033476563, 40.0520632148438],
                                        [121.967345, 40.113843],
                                        [122.013424101563, 40.1404103828125],
                                        [122.009932890625, 40.183843],
                                        [122.04271609375, 40.1984706855469],
                                        [122.087345, 40.223843],
                                        [122.115592070313, 40.2139418769531],
                                        [122.132159453125, 40.249048078125],
                                        [122.179390898438, 40.2471767402344],
                                        [122.152139921875, 40.2986794257813],
                                        [122.152701445313, 40.3128749824219],
                                        [122.211475859375, 40.3314833808594],
                                        [122.187345, 40.3538430000001],
                                        [122.205548125, 40.3821804023438],
                                        [122.20009890625, 40.4190407539063],
                                        [122.23298953125, 40.4281996894532],
                                        [122.272369414063, 40.4573952460938],
                                        [122.277345, 40.4638430000001],
                                        [122.306060820313, 40.4504262519532],
                                        [122.3709778125, 40.5102114082032],
                                        [122.407345, 40.513843],
                                        [122.43298953125, 40.5094863105469],
                                        [122.499845, 40.4802700019532],
                                        [122.532232695313, 40.4998073554688],
                                        [122.598238554688, 40.4885951972657],
                                        [122.627838164063, 40.4502480292969],
                                        [122.64263796875, 40.4480605292969],
                                        [122.67248171875, 40.4597927070313],
                                        [122.69170046875, 40.4481996894531],
                                        [122.747345, 40.443843]
                                    ]
                                ],
                                [
                                    [
                                        [122.445128203125, 40.5302614570313],
                                        [122.407345, 40.523843],
                                        [122.399288359375, 40.5279189277344],
                                        [122.415201445313, 40.5593727851563],
                                        [122.437345, 40.563843],
                                        [122.445128203125, 40.5302614570313]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "老边区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [122.267345, 40.723843],
                                        [122.247345, 40.723843],
                                        [122.247345, 40.7338430000001],
                                        [122.267345, 40.7338430000001],
                                        [122.267345, 40.723843]
                                    ]
                                ],
                                [
                                    [
                                        [122.237345, 40.713843],
                                        [122.19974734375, 40.6997158027344],
                                        [122.207345, 40.7338430000001],
                                        [122.211363554688, 40.7417873359375],
                                        [122.227345, 40.7338430000001],
                                        [122.237345, 40.713843]
                                    ]
                                ],
                                [
                                    [
                                        [122.267345, 40.723843],
                                        [122.30298953125, 40.7281996894532],
                                        [122.3500403125, 40.7466957832031],
                                        [122.36170046875, 40.7181996894531],
                                        [122.43298953125, 40.6894863105469],
                                        [122.44170046875, 40.6481996894532],
                                        [122.453516875, 40.639077375],
                                        [122.43798953125, 40.6133303046876],
                                        [122.44312625, 40.5785512519532],
                                        [122.437345, 40.563843],
                                        [122.415201445313, 40.5593727851563],
                                        [122.399288359375, 40.5279189277344],
                                        [122.407345, 40.523843],
                                        [122.407345, 40.513843],
                                        [122.3709778125, 40.5102114082032],
                                        [122.306060820313, 40.4504262519532],
                                        [122.277345, 40.4638430000001],
                                        [122.285787382813, 40.5050575996094],
                                        [122.26513796875, 40.5265468574219],
                                        [122.22244265625, 40.5589430976563],
                                        [122.132735625, 40.6098049140625],
                                        [122.147345, 40.6238430000001],
                                        [122.16298953125, 40.6281996894532],
                                        [122.1760559375, 40.6451308417969],
                                        [122.227345, 40.6538430000001],
                                        [122.239039335938, 40.6397658515626],
                                        [122.271881132813, 40.6793056464844],
                                        [122.28732546875, 40.6921340156251],
                                        [122.267345, 40.723843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "西市区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [122.16298953125, 40.6281996894532],
                                        [122.147345, 40.6238430000001],
                                        [122.169273710938, 40.6678078437501],
                                        [122.150704375, 40.6772023750001],
                                        [122.147345, 40.683843],
                                        [122.155323515625, 40.7149282050782],
                                        [122.195303984375, 40.6888930488282],
                                        [122.227345, 40.683843],
                                        [122.227345, 40.6538430000001],
                                        [122.1760559375, 40.6451308417969],
                                        [122.16298953125, 40.6281996894532]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "站前区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [122.247345, 40.7338430000001],
                                        [122.247345, 40.723843],
                                        [122.267345, 40.723843],
                                        [122.28732546875, 40.6921340156251],
                                        [122.271881132813, 40.6793056464844],
                                        [122.239039335938, 40.6397658515626],
                                        [122.227345, 40.6538430000001],
                                        [122.227345, 40.683843],
                                        [122.25326296875, 40.6879274726563],
                                        [122.27142703125, 40.7050954414063],
                                        [122.237345, 40.713843],
                                        [122.227345, 40.7338430000001],
                                        [122.247345, 40.7338430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "鲅鱼圈区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [122.152139921875, 40.2986794257813],
                                        [122.179390898438, 40.2471767402344],
                                        [122.132159453125, 40.249048078125],
                                        [122.115592070313, 40.2139418769531],
                                        [122.087345, 40.223843],
                                        [122.11142703125, 40.2602883125],
                                        [122.10326296875, 40.2797585273438],
                                        [122.087120390625, 40.290903546875],
                                        [122.13142703125, 40.3197585273438],
                                        [122.15326296875, 40.3279274726563],
                                        [122.16142703125, 40.3397585273438],
                                        [122.187345, 40.3538430000001],
                                        [122.211475859375, 40.3314833808594],
                                        [122.152701445313, 40.3128749824219],
                                        [122.152139921875, 40.2986794257813]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });

            define("echarts/util/mapData/geoJson/liaoyang", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": { "name": "宏伟区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.167345, 41.213843],
                                        [123.179537382813, 41.2172658515625],
                                        [123.170767851563, 41.2260353828125],
                                        [123.147345, 41.213843],
                                        [123.147345, 41.203843],
                                        [123.13361453125, 41.2148390937501],
                                        [123.162896757813, 41.2382900214844],
                                        [123.167345, 41.243843],
                                        [123.183326445313, 41.2358986640626],
                                        [123.187345, 41.243843],
                                        [123.197345, 41.243843],
                                        [123.202345, 41.2310353828125],
                                        [123.207345, 41.243843],
                                        [123.227345, 41.243843],
                                        [123.240704375, 41.237202375],
                                        [123.287345, 41.233843],
                                        [123.281148710938, 41.1998622871094],
                                        [123.2573059375, 41.1721901679688],
                                        [123.220787382813, 41.1518141914063],
                                        [123.167345, 41.213843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "辽阳县" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.167345, 41.213843],
                                        [123.170767851563, 41.2260353828125],
                                        [123.179537382813, 41.2172658515625],
                                        [123.167345, 41.213843]
                                    ]
                                ],
                                [
                                    [
                                        [123.537345, 41.243843],
                                        [123.527345, 41.243843],
                                        [123.527345, 41.253843],
                                        [123.537345, 41.253843],
                                        [123.537345, 41.243843]
                                    ]
                                ],
                                [
                                    [
                                        [123.537345, 41.243843],
                                        [123.567003203125, 41.2302724433594],
                                        [123.555191679688, 41.2646694160157],
                                        [123.581002226563, 41.2735329414063],
                                        [123.603624296875, 41.2601210761719],
                                        [123.607345, 41.243843],
                                        [123.595504179688, 41.2378530097656],
                                        [123.60478640625, 41.218843],
                                        [123.599420195313, 41.2078530097657],
                                        [123.613985625, 41.2004836250001],
                                        [123.634034453125, 41.1605776191406],
                                        [123.647345, 41.1538430000001],
                                        [123.653004179688, 41.139126203125],
                                        [123.647633085938, 41.0959694648438],
                                        [123.666236601563, 41.0727370429688],
                                        [123.684830351563, 41.05784690625],
                                        [123.654849882813, 41.0338356757813],
                                        [123.647345, 40.973843],
                                        [123.64271609375, 40.9384706855469],
                                        [123.62197390625, 40.9092153144531],
                                        [123.587345, 40.853843],
                                        [123.53916140625, 40.8598622871094],
                                        [123.547345, 40.823843],
                                        [123.52142703125, 40.8197585273438],
                                        [123.482491484375, 40.8076894355469],
                                        [123.472066679688, 40.8100258613281],
                                        [123.439141875, 40.7961977363282],
                                        [123.40435671875, 40.8039968085938],
                                        [123.387022734375, 40.7788930488281],
                                        [123.338297148438, 40.7663881660156],
                                        [123.322022734375, 40.7700356269532],
                                        [123.25326296875, 40.7379274726562],
                                        [123.204796171875, 40.7284633613282],
                                        [123.172345, 40.7073305488282],
                                        [123.148619414063, 40.7227797675782],
                                        [123.127345, 40.713843],
                                        [123.11904421875, 40.7258632636719],
                                        [123.07142703125, 40.7579274726563],
                                        [123.06326296875, 40.7841188789063],
                                        [123.08326296875, 40.7979274726563],
                                        [123.097345, 40.8183266425781],
                                        [123.041051054688, 40.8380605292969],
                                        [123.043468046875, 40.8488430000001],
                                        [123.040347929688, 40.8627443671876],
                                        [123.063585234375, 40.8984291816406],
                                        [123.057345, 40.9238430000001],
                                        [123.087315703125, 40.9286879707032],
                                        [123.081358671875, 40.9588430000001],
                                        [123.084146757813, 40.9729677558594],
                                        [123.129386015625, 40.9904152656251],
                                        [123.180484648438, 40.9803188300782],
                                        [123.204361601563, 41.0136342597657],
                                        [123.2007434375, 41.0319448066407],
                                        [123.223453398438, 41.0482228828126],
                                        [123.22021609375, 41.0646181464844],
                                        [123.201236601563, 41.0782228828125],
                                        [123.203331328125, 41.088843],
                                        [123.200079375, 41.1053115058594],
                                        [123.162345, 41.0978554511719],
                                        [123.134351835938, 41.1033864570313],
                                        [123.143453398438, 41.1494631171875],
                                        [123.131519804688, 41.1580178046875],
                                        [123.127345, 41.173843],
                                        [123.133985625, 41.1772023750001],
                                        [123.147345, 41.203843],
                                        [123.147345, 41.213843],
                                        [123.167345, 41.213843],
                                        [123.220787382813, 41.1518141914063],
                                        [123.2573059375, 41.1721901679688],
                                        [123.281148710938, 41.1998622871094],
                                        [123.287345, 41.233843],
                                        [123.297345, 41.233843],
                                        [123.321329375, 41.2504030585938],
                                        [123.327345, 41.273843],
                                        [123.327345, 41.283843],
                                        [123.359991484375, 41.2914076972657],
                                        [123.382735625, 41.2880458808594],
                                        [123.407345, 41.3028908515625],
                                        [123.431978789063, 41.2880324531251],
                                        [123.519600859375, 41.302426984375],
                                        [123.52312625, 41.2785512519532],
                                        [123.517345, 41.2638430000001],
                                        [123.493765898438, 41.2577919746094],
                                        [123.460230742188, 41.2359548164063],
                                        [123.43037234375, 41.2426479316406],
                                        [123.433526640625, 41.2285646796876],
                                        [123.418736601563, 41.1933534980469],
                                        [123.35142703125, 41.1697585273438],
                                        [123.34326296875, 41.1579274726562],
                                        [123.30142703125, 41.1497585273438],
                                        [123.253624296875, 41.1349404121094],
                                        [123.24326296875, 41.1104714179688],
                                        [123.27093875, 41.0679689765625],
                                        [123.3676184375, 41.0597585273438],
                                        [123.38142703125, 41.0797585273438],
                                        [123.41755984375, 41.0932778144531],
                                        [123.472418242188, 41.0809804511719],
                                        [123.48142703125, 41.0679274726563],
                                        [123.511964140625, 41.0468459296875],
                                        [123.558819609375, 41.0859206367188],
                                        [123.54142703125, 41.0979274726563],
                                        [123.529176054688, 41.1156740546875],
                                        [123.500474882813, 41.1354921699219],
                                        [123.505709257813, 41.158843],
                                        [123.48142703125, 41.1679274726563],
                                        [123.46654421875, 41.1894826484376],
                                        [123.509176054688, 41.2189150214844],
                                        [123.53326296875, 41.2279274726563],
                                        [123.537345, 41.243843]
                                    ]
                                ],
                                [
                                    [
                                        [122.987345, 41.353843],
                                        [122.975152617188, 41.3504201484375],
                                        [122.983922148438, 41.3416506171875],
                                        [123.137345, 41.353843],
                                        [123.137345, 41.3438430000001],
                                        [123.132535429688, 41.3155202460938],
                                        [123.082345, 41.3081044746094],
                                        [123.056495390625, 41.3119240546875],
                                        [123.050128203125, 41.2688430000001],
                                        [123.1171496875, 41.2414125800782],
                                        [123.089390898438, 41.2199831367188],
                                        [123.112178984375, 41.2023928046876],
                                        [123.117345, 41.1838430000001],
                                        [123.0855090625, 41.1760231757813],
                                        [123.047345, 41.1938430000001],
                                        [123.047345, 41.203843],
                                        [123.027345, 41.203843],
                                        [123.007345, 41.203843],
                                        [123.007345, 41.1938430000001],
                                        [123.007345, 41.1838430000001],
                                        [122.991793242188, 41.1882900214844],
                                        [122.972706328125, 41.1995095039063],
                                        [122.902940703125, 41.1908327460938],
                                        [122.888453398438, 41.1727370429688],
                                        [122.871793242188, 41.1593959785156],
                                        [122.862896757813, 41.1482900214844],
                                        [122.851793242188, 41.1393959785157],
                                        [122.842896757813, 41.1082900214844],
                                        [122.827345, 41.083843],
                                        [122.700909453125, 41.1121352363282],
                                        [122.66271609375, 41.1392153144531],
                                        [122.63197390625, 41.1484706855469],
                                        [122.614586210938, 41.1686525703125],
                                        [122.597345, 41.173843],
                                        [122.597345, 41.203843],
                                        [122.607345, 41.203843],
                                        [122.612345, 41.1910353828125],
                                        [122.617345, 41.203843],
                                        [122.664068632813, 41.2123659492188],
                                        [122.661300078125, 41.2468288398438],
                                        [122.67197390625, 41.2592153144531],
                                        [122.691715117188, 41.2762221503907],
                                        [122.70197390625, 41.2992153144531],
                                        [122.7127746875, 41.3085195136719],
                                        [122.7119153125, 41.3191970039063],
                                        [122.74271609375, 41.3284706855469],
                                        [122.755670195313, 41.3574990058594],
                                        [122.840328398438, 41.3805434394531],
                                        [122.8519934375, 41.4192751289063],
                                        [122.917345, 41.4138430000001],
                                        [122.924801054688, 41.4112990546875],
                                        [122.930494414063, 41.3722280097656],
                                        [122.942374296875, 41.3836989570313],
                                        [122.959888945313, 41.3663869453125],
                                        [122.984801054688, 41.3612990546876],
                                        [122.987345, 41.353843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "白塔区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.203531523438, 41.3000307441406],
                                        [123.207345, 41.293843],
                                        [123.183682890625, 41.277505109375],
                                        [123.167345, 41.253843],
                                        [123.167345, 41.243843],
                                        [123.137471953125, 41.2481923652344],
                                        [123.143902617188, 41.2688430000001],
                                        [123.133531523438, 41.3021352363282],
                                        [123.153018828125, 41.3108644843751],
                                        [123.162345, 41.295727765625],
                                        [123.171685820313, 41.310884015625],
                                        [123.203531523438, 41.3000307441406]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "灯塔市" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [122.987345, 41.353843],
                                        [122.983922148438, 41.3416506171875],
                                        [122.975152617188, 41.3504201484375],
                                        [122.987345, 41.353843]
                                    ]
                                ],
                                [
                                    [
                                        [122.957345, 41.4938430000001],
                                        [122.953922148438, 41.4816506171875],
                                        [122.945152617188, 41.4904201484375],
                                        [122.957345, 41.4938430000001]
                                    ]
                                ],
                                [
                                    [
                                        [122.987345, 41.353843],
                                        [122.984801054688, 41.3612990546876],
                                        [122.959888945313, 41.3663869453125],
                                        [122.942374296875, 41.3836989570313],
                                        [122.930494414063, 41.3722280097656],
                                        [122.924801054688, 41.4112990546875],
                                        [122.917345, 41.4138430000001],
                                        [122.911514921875, 41.4493422675782],
                                        [122.92298953125, 41.4581996894532],
                                        [122.931954375, 41.4801100898438],
                                        [122.952374296875, 41.4677944160157],
                                        [122.98170046875, 41.4870607734376],
                                        [122.957345, 41.4938430000001],
                                        [122.96142703125, 41.4997585273438],
                                        [122.980167265625, 41.5126943183594],
                                        [123.01435671875, 41.5050295234375],
                                        [123.043082304688, 41.5466347480469],
                                        [123.07326296875, 41.5579274726563],
                                        [123.08142703125, 41.5797585273438],
                                        [123.097345, 41.6038430000001],
                                        [123.107345, 41.6038430000001],
                                        [123.107345, 41.6138430000001],
                                        [123.128487578125, 41.607798078125],
                                        [123.103355742188, 41.5650453925781],
                                        [123.122896757813, 41.5493959785156],
                                        [123.138697539063, 41.5296645332031],
                                        [123.182896757813, 41.5482900214844],
                                        [123.210699492188, 41.5646315742188],
                                        [123.231793242188, 41.5382900214844],
                                        [123.293453398438, 41.5249489570313],
                                        [123.321983671875, 41.5081764960937],
                                        [123.350045195313, 41.5116664863281],
                                        [123.402896757813, 41.4893959785157],
                                        [123.431954375, 41.4681728339844],
                                        [123.442345, 41.4694643378907],
                                        [123.469210234375, 41.4661232734375],
                                        [123.505318632813, 41.4873464179688],
                                        [123.522345, 41.4894643378906],
                                        [123.543707304688, 41.4868080878907],
                                        [123.587345, 41.4938430000001],
                                        [123.603902617188, 41.469858625],
                                        [123.649112578125, 41.4582570625],
                                        [123.653580351563, 41.4383376289062],
                                        [123.6307825, 41.4089223457032],
                                        [123.64326296875, 41.3897585273438],
                                        [123.65142703125, 41.3279274726563],
                                        [123.657345, 41.3038430000001],
                                        [123.651578398438, 41.288843],
                                        [123.6660559375, 41.2511855292969],
                                        [123.607345, 41.243843],
                                        [123.603624296875, 41.2601210761719],
                                        [123.581002226563, 41.2735329414063],
                                        [123.555191679688, 41.2646694160157],
                                        [123.567003203125, 41.2302724433594],
                                        [123.537345, 41.243843],
                                        [123.537345, 41.253843],
                                        [123.527345, 41.253843],
                                        [123.517345, 41.253843],
                                        [123.517345, 41.2638430000001],
                                        [123.52312625, 41.2785512519532],
                                        [123.519600859375, 41.302426984375],
                                        [123.431978789063, 41.2880324531251],
                                        [123.407345, 41.3028908515625],
                                        [123.382735625, 41.2880458808594],
                                        [123.359991484375, 41.2914076972657],
                                        [123.327345, 41.283843],
                                        [123.313985625, 41.310483625],
                                        [123.2941028125, 41.317202375],
                                        [123.287345, 41.3038430000001],
                                        [123.267345, 41.3038430000001],
                                        [123.257345, 41.3038430000001],
                                        [123.19298953125, 41.3294863105469],
                                        [123.15170046875, 41.3381996894532],
                                        [123.137345, 41.3438430000001],
                                        [123.137345, 41.353843],
                                        [122.987345, 41.353843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "弓长岭区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.517345, 41.2638430000001],
                                        [123.517345, 41.253843],
                                        [123.527345, 41.253843],
                                        [123.527345, 41.243843],
                                        [123.537345, 41.243843],
                                        [123.53326296875, 41.2279274726563],
                                        [123.509176054688, 41.2189150214844],
                                        [123.46654421875, 41.1894826484376],
                                        [123.48142703125, 41.1679274726563],
                                        [123.505709257813, 41.158843],
                                        [123.500474882813, 41.1354921699219],
                                        [123.529176054688, 41.1156740546875],
                                        [123.54142703125, 41.0979274726563],
                                        [123.558819609375, 41.0859206367188],
                                        [123.511964140625, 41.0468459296875],
                                        [123.48142703125, 41.0679274726563],
                                        [123.472418242188, 41.0809804511719],
                                        [123.41755984375, 41.0932778144531],
                                        [123.38142703125, 41.0797585273438],
                                        [123.3676184375, 41.0597585273438],
                                        [123.27093875, 41.0679689765625],
                                        [123.24326296875, 41.1104714179688],
                                        [123.253624296875, 41.1349404121094],
                                        [123.30142703125, 41.1497585273438],
                                        [123.34326296875, 41.1579274726562],
                                        [123.35142703125, 41.1697585273438],
                                        [123.418736601563, 41.1933534980469],
                                        [123.433526640625, 41.2285646796876],
                                        [123.43037234375, 41.2426479316406],
                                        [123.460230742188, 41.2359548164063],
                                        [123.493765898438, 41.2577919746094],
                                        [123.517345, 41.2638430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "太子河区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.207345, 41.243843],
                                        [123.202345, 41.2310353828125],
                                        [123.197345, 41.243843],
                                        [123.207345, 41.243843]
                                    ]
                                ],
                                [
                                    [
                                        [123.167345, 41.243843],
                                        [123.167345, 41.253843],
                                        [123.187345, 41.253843],
                                        [123.187345, 41.243843],
                                        [123.183326445313, 41.2358986640626],
                                        [123.167345, 41.243843]
                                    ]
                                ],
                                [
                                    [
                                        [123.287345, 41.3038430000001],
                                        [123.277345, 41.2898903632813],
                                        [123.267345, 41.3038430000001],
                                        [123.287345, 41.3038430000001]
                                    ]
                                ],
                                [
                                    [
                                        [123.287345, 41.3038430000001],
                                        [123.2941028125, 41.317202375],
                                        [123.313985625, 41.310483625],
                                        [123.327345, 41.283843],
                                        [123.327345, 41.273843],
                                        [123.298892851563, 41.2773220039062],
                                        [123.310538359375, 41.29931175],
                                        [123.287345, 41.3038430000001]
                                    ]
                                ],
                                [
                                    [
                                        [123.167345, 41.243843],
                                        [123.162896757813, 41.2382900214844],
                                        [123.13361453125, 41.2148390937501],
                                        [123.147345, 41.203843],
                                        [123.133985625, 41.1772023750001],
                                        [123.127345, 41.173843],
                                        [123.117345, 41.173843],
                                        [123.117345, 41.1838430000001],
                                        [123.112178984375, 41.2023928046876],
                                        [123.089390898438, 41.2199831367188],
                                        [123.1171496875, 41.2414125800782],
                                        [123.050128203125, 41.2688430000001],
                                        [123.056495390625, 41.3119240546875],
                                        [123.082345, 41.3081044746094],
                                        [123.132535429688, 41.3155202460938],
                                        [123.137345, 41.3438430000001],
                                        [123.15170046875, 41.3381996894532],
                                        [123.19298953125, 41.3294863105469],
                                        [123.257345, 41.3038430000001],
                                        [123.250733671875, 41.2881056953126],
                                        [123.286163359375, 41.2790138984376],
                                        [123.24326296875, 41.2629604316407],
                                        [123.269156523438, 41.2470070625],
                                        [123.285694609375, 41.2507155585938],
                                        [123.297345, 41.233843],
                                        [123.287345, 41.233843],
                                        [123.240704375, 41.237202375],
                                        [123.227345, 41.243843],
                                        [123.2237121875, 41.2502114082031],
                                        [123.203922148438, 41.2614968085938],
                                        [123.214561796875, 41.2897280097657],
                                        [123.207345, 41.293843],
                                        [123.203531523438, 41.3000307441406],
                                        [123.171685820313, 41.310884015625],
                                        [123.162345, 41.295727765625],
                                        [123.153018828125, 41.3108644843751],
                                        [123.133531523438, 41.3021352363282],
                                        [123.143902617188, 41.2688430000001],
                                        [123.137471953125, 41.2481923652344],
                                        [123.167345, 41.243843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "文圣区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [123.203922148438, 41.2614968085938],
                                        [123.2237121875, 41.2502114082031],
                                        [123.227345, 41.243843],
                                        [123.207345, 41.243843],
                                        [123.197345, 41.243843],
                                        [123.187345, 41.243843],
                                        [123.187345, 41.253843],
                                        [123.167345, 41.253843],
                                        [123.183682890625, 41.277505109375],
                                        [123.207345, 41.293843],
                                        [123.214561796875, 41.2897280097657],
                                        [123.203922148438, 41.2614968085938]
                                    ]
                                ],
                                [
                                    [
                                        [123.310538359375, 41.29931175],
                                        [123.298892851563, 41.2773220039062],
                                        [123.327345, 41.273843],
                                        [123.321329375, 41.2504030585938],
                                        [123.297345, 41.233843],
                                        [123.285694609375, 41.2507155585938],
                                        [123.269156523438, 41.2470070625],
                                        [123.24326296875, 41.2629604316407],
                                        [123.286163359375, 41.2790138984376],
                                        [123.250733671875, 41.2881056953126],
                                        [123.257345, 41.3038430000001],
                                        [123.267345, 41.3038430000001],
                                        [123.277345, 41.2898903632813],
                                        [123.287345, 41.3038430000001],
                                        [123.310538359375, 41.29931175]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });

            define("echarts/util/mapData/geoJson/chaoyang", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": { "name": "双塔区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [120.447345, 41.713843],
                                        [120.471890898438, 41.6976210761719],
                                        [120.491676054688, 41.702055890625],
                                        [120.505513945313, 41.6820119453125],
                                        [120.52326296875, 41.6697585273438],
                                        [120.53142703125, 41.6579274726563],
                                        [120.556158476563, 41.6408534980469],
                                        [120.551041289063, 41.6180275703125],
                                        [120.611329375, 41.6025551582031],
                                        [120.62142703125, 41.5879274726563],
                                        [120.634586210938, 41.578843],
                                        [120.62142703125, 41.5697585273438],
                                        [120.617345, 41.5638430000001],
                                        [120.59170046875, 41.5594863105469],
                                        [120.552320585938, 41.5302907539063],
                                        [120.541202421875, 41.5158876777344],
                                        [120.522579375, 41.5400160957032],
                                        [120.49486453125, 41.5232985664063],
                                        [120.452345, 41.5295815253907],
                                        [120.421031523438, 41.5249550605469],
                                        [120.4231653125, 41.5393886542969],
                                        [120.397345, 41.553843],
                                        [120.40170046875, 41.5594863105469],
                                        [120.4186340625, 41.5725551582031],
                                        [120.4360559375, 41.5951308417969],
                                        [120.45298953125, 41.6081996894532],
                                        [120.46170046875, 41.6227614570312],
                                        [120.423678007813, 41.6521108222656],
                                        [120.463721953125, 41.6684987617188],
                                        [120.4413684375, 41.6986452460938],
                                        [120.447345, 41.713843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "龙城区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [120.447345, 41.713843],
                                        [120.4413684375, 41.6986452460938],
                                        [120.463721953125, 41.6684987617188],
                                        [120.423678007813, 41.6521108222656],
                                        [120.46170046875, 41.6227614570312],
                                        [120.45298953125, 41.6081996894532],
                                        [120.4360559375, 41.5951308417969],
                                        [120.4186340625, 41.5725551582031],
                                        [120.40170046875, 41.5594863105469],
                                        [120.397345, 41.553843],
                                        [120.391881132813, 41.5493056464844],
                                        [120.377257109375, 41.5316994453125],
                                        [120.362808867188, 41.4983803535156],
                                        [120.34119265625, 41.4606423164062],
                                        [120.282808867188, 41.4534609199219],
                                        [120.31322390625, 41.4787270332031],
                                        [120.291881132813, 41.5083803535156],
                                        [120.274439726563, 41.5485976386719],
                                        [120.244908476563, 41.5614052558594],
                                        [120.225103789063, 41.6070632148437],
                                        [120.262808867188, 41.6383803535157],
                                        [120.285299101563, 41.6748464179688],
                                        [120.281822539063, 41.7089687324219],
                                        [120.285269804688, 41.7283803535156],
                                        [120.301881132813, 41.7083803535157],
                                        [120.335269804688, 41.6993056464844],
                                        [120.351881132813, 41.7193056464844],
                                        [120.372808867188, 41.7283803535156],
                                        [120.387345, 41.753843],
                                        [120.41142703125, 41.7379274726563],
                                        [120.437432890625, 41.7281972480469],
                                        [120.447345, 41.713843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "北票市" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [120.934307890625, 42.274887921875],
                                        [120.99326296875, 42.2597585273438],
                                        [121.01142703125, 42.2479274726563],
                                        [121.027345, 42.243843],
                                        [121.03248171875, 42.22761253125],
                                        [121.052550078125, 42.2090200019532],
                                        [121.051417265625, 42.1804457832031],
                                        [121.0789465625, 42.1134255195313],
                                        [121.062535429688, 42.0786525703125],
                                        [121.041729765625, 42.0593740058595],
                                        [121.043136015625, 42.0238430000001],
                                        [121.042144804688, 41.998843],
                                        [121.042545195313, 41.9888430000001],
                                        [121.041807890625, 41.9702516914063],
                                        [121.118433867188, 41.9672145820313],
                                        [121.1523840625, 41.9791139960937],
                                        [121.172154570313, 41.9686525703125],
                                        [121.192535429688, 41.9590334296875],
                                        [121.206597929688, 41.9146205878907],
                                        [121.252154570313, 41.8986525703125],
                                        [121.302115507813, 41.8867519355469],
                                        [121.27482546875, 41.8351784492187],
                                        [121.262154570313, 41.7990334296875],
                                        [121.257345, 41.783843],
                                        [121.25197390625, 41.7792153144532],
                                        [121.24271609375, 41.7684706855469],
                                        [121.22197390625, 41.7592153144532],
                                        [121.208878203125, 41.7440163398438],
                                        [121.224176054688, 41.7166030097656],
                                        [121.221295195313, 41.6808071113281],
                                        [121.14197390625, 41.6592153144532],
                                        [121.12345828125, 41.6377272773438],
                                        [121.098624296875, 41.6163295722657],
                                        [121.053902617188, 41.6199233222656],
                                        [120.971085234375, 41.5895107246094],
                                        [120.972769804688, 41.5685646796875],
                                        [120.959576445313, 41.5449184394532],
                                        [120.90197390625, 41.5192153144531],
                                        [120.89271609375, 41.4784706855469],
                                        [120.88197390625, 41.4692153144532],
                                        [120.877345, 41.4138430000001],
                                        [120.841783476563, 41.4196852851563],
                                        [120.831754179688, 41.3951772285157],
                                        [120.81298953125, 41.4194863105469],
                                        [120.800225859375, 41.4281996894532],
                                        [120.804195585938, 41.4013198066407],
                                        [120.777345, 41.393843],
                                        [120.77326296875, 41.4097585273438],
                                        [120.732960234375, 41.4201015449219],
                                        [120.71033328125, 41.4150295234375],
                                        [120.687022734375, 41.4487929511719],
                                        [120.627691679688, 41.46401878125],
                                        [120.65755984375, 41.5098854804688],
                                        [120.63060671875, 41.5284950996094],
                                        [120.650250273438, 41.5586574531251],
                                        [120.617345, 41.5638430000001],
                                        [120.62142703125, 41.5697585273438],
                                        [120.634586210938, 41.578843],
                                        [120.62142703125, 41.5879274726563],
                                        [120.611329375, 41.6025551582031],
                                        [120.551041289063, 41.6180275703125],
                                        [120.556158476563, 41.6408534980469],
                                        [120.53142703125, 41.6579274726563],
                                        [120.52326296875, 41.6697585273438],
                                        [120.505513945313, 41.6820119453125],
                                        [120.491676054688, 41.702055890625],
                                        [120.471890898438, 41.6976210761719],
                                        [120.447345, 41.713843],
                                        [120.437432890625, 41.7281972480469],
                                        [120.41142703125, 41.7379274726563],
                                        [120.387345, 41.753843],
                                        [120.38298953125, 41.7794863105469],
                                        [120.36170046875, 41.8081996894532],
                                        [120.341436796875, 41.8577077460938],
                                        [120.343082304688, 41.8688430000001],
                                        [120.340728789063, 41.8847743964844],
                                        [120.287345, 41.893843],
                                        [120.287345, 41.903843],
                                        [120.267345, 41.903843],
                                        [120.275338164063, 41.9310854316407],
                                        [120.302769804688, 41.9282900214844],
                                        [120.316422148438, 41.9597682929688],
                                        [120.365513945313, 41.9900490546876],
                                        [120.410391875, 41.985473859375],
                                        [120.421881132813, 41.9993056464845],
                                        [120.4421496875, 42.0161415839844],
                                        [120.453785429688, 42.0557949042969],
                                        [120.482896757813, 42.0684194160156],
                                        [120.481793242188, 42.079233625],
                                        [120.493541289063, 42.0889882636719],
                                        [120.4632434375, 42.1021279121094],
                                        [120.482882109375, 42.118442609375],
                                        [120.562808867188, 42.1483803535156],
                                        [120.585045195313, 42.1611159492188],
                                        [120.61255984375, 42.1583119941407],
                                        [120.665479765625, 42.1731069160156],
                                        [120.701881132813, 42.1993056464844],
                                        [120.722808867188, 42.2083803535157],
                                        [120.733516875, 42.2212721992188],
                                        [120.781173125, 42.2164138007813],
                                        [120.791881132813, 42.2293056464844],
                                        [120.8490246875, 42.2507106757813],
                                        [120.883604765625, 42.2471852851563],
                                        [120.877345, 42.263843],
                                        [120.881676054688, 42.2701137519531],
                                        [120.897345, 42.2666017890626],
                                        [120.934307890625, 42.274887921875]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "朝阳县" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [120.337345, 40.9938430000001],
                                        [120.349537382813, 40.9972658515625],
                                        [120.340767851563, 41.0060353828125],
                                        [120.319439726563, 41.00136253125],
                                        [120.30326296875, 40.9779274726563],
                                        [120.29142703125, 40.9697585273438],
                                        [120.270753203125, 40.9398110175781],
                                        [120.237345, 40.9538430000001],
                                        [120.210787382813, 40.9488857246094],
                                        [120.18552859375, 40.9206179023437],
                                        [120.152628203125, 40.9317568183594],
                                        [120.1944153125, 40.9690956855469],
                                        [120.191925078125, 41.010903546875],
                                        [120.142345, 41.0079494453126],
                                        [120.127906523438, 41.0394057441407],
                                        [120.107882109375, 41.0762538886719],
                                        [120.057345, 41.103843],
                                        [120.040924101563, 41.1299013496094],
                                        [120.0428528125, 41.1488430000001],
                                        [120.040069609375, 41.1761550117188],
                                        [119.9979309375, 41.1944301582032],
                                        [119.972584257813, 41.2528774238282],
                                        [119.9332434375, 41.2855580878907],
                                        [119.96431765625, 41.2990358710937],
                                        [119.911881132813, 41.3083803535156],
                                        [119.883507109375, 41.3246315742188],
                                        [119.86937625, 41.35722190625],
                                        [119.882808867188, 41.3683803535157],
                                        [119.89345828125, 41.3929360175782],
                                        [119.8918371875, 41.408843],
                                        [119.89287234375, 41.4190151191407],
                                        [119.881754179688, 41.4689614082032],
                                        [119.8940246875, 41.5016164375001],
                                        [119.887345, 41.543843],
                                        [119.897345, 41.543843],
                                        [119.897345, 41.553843],
                                        [119.908795195313, 41.568676984375],
                                        [119.94298953125, 41.5781996894532],
                                        [119.97170046875, 41.5894863105469],
                                        [120.041695585938, 41.5994362617188],
                                        [120.045391875, 41.6244741035157],
                                        [120.001529570313, 41.6583315253907],
                                        [120.003160429688, 41.6693544746094],
                                        [119.987672148438, 41.6813100410156],
                                        [120.00170046875, 41.6994863105469],
                                        [120.027345, 41.713843],
                                        [120.03197390625, 41.7084706855469],
                                        [120.055655546875, 41.6979042792969],
                                        [120.072345, 41.6992446113281],
                                        [120.091363554688, 41.6977162910157],
                                        [120.136300078125, 41.7227883125001],
                                        [120.119088164063, 41.7536391425782],
                                        [120.188658476563, 41.8377443671875],
                                        [120.239859648438, 41.8818544746094],
                                        [120.282701445313, 41.8784133125001],
                                        [120.287345, 41.893843],
                                        [120.340728789063, 41.8847743964844],
                                        [120.343082304688, 41.8688430000001],
                                        [120.341436796875, 41.8577077460938],
                                        [120.36170046875, 41.8081996894532],
                                        [120.38298953125, 41.7794863105469],
                                        [120.387345, 41.753843],
                                        [120.372808867188, 41.7283803535156],
                                        [120.351881132813, 41.7193056464844],
                                        [120.335269804688, 41.6993056464844],
                                        [120.301881132813, 41.7083803535157],
                                        [120.285269804688, 41.7283803535156],
                                        [120.281822539063, 41.7089687324219],
                                        [120.285299101563, 41.6748464179688],
                                        [120.262808867188, 41.6383803535157],
                                        [120.225103789063, 41.6070632148437],
                                        [120.244908476563, 41.5614052558594],
                                        [120.274439726563, 41.5485976386719],
                                        [120.291881132813, 41.5083803535156],
                                        [120.31322390625, 41.4787270332031],
                                        [120.282808867188, 41.4534609199219],
                                        [120.34119265625, 41.4606423164062],
                                        [120.362808867188, 41.4983803535156],
                                        [120.377257109375, 41.5316994453125],
                                        [120.391881132813, 41.5493056464844],
                                        [120.397345, 41.553843],
                                        [120.4231653125, 41.5393886542969],
                                        [120.421031523438, 41.5249550605469],
                                        [120.452345, 41.5295815253907],
                                        [120.49486453125, 41.5232985664063],
                                        [120.522579375, 41.5400160957032],
                                        [120.541202421875, 41.5158876777344],
                                        [120.552320585938, 41.5302907539063],
                                        [120.59170046875, 41.5594863105469],
                                        [120.617345, 41.5638430000001],
                                        [120.650250273438, 41.5586574531251],
                                        [120.63060671875, 41.5284950996094],
                                        [120.65755984375, 41.5098854804688],
                                        [120.627691679688, 41.46401878125],
                                        [120.687022734375, 41.4487929511719],
                                        [120.71033328125, 41.4150295234375],
                                        [120.732960234375, 41.4201015449219],
                                        [120.77326296875, 41.4097585273438],
                                        [120.777345, 41.393843],
                                        [120.767725859375, 41.363462140625],
                                        [120.752154570313, 41.3490334296875],
                                        [120.742535429688, 41.2986525703125],
                                        [120.7317590625, 41.2782851386719],
                                        [120.763331328125, 41.249028546875],
                                        [120.703389921875, 41.2207399726563],
                                        [120.7534778125, 41.2088088203125],
                                        [120.767345, 41.1938430000001],
                                        [120.712369414063, 41.1869741035157],
                                        [120.68373171875, 41.1905361152344],
                                        [120.662706328125, 41.1781764960938],
                                        [120.651983671875, 41.1795095039063],
                                        [120.632896757813, 41.1682900214844],
                                        [120.611793242188, 41.1593959785156],
                                        [120.592896757813, 41.1082900214844],
                                        [120.541793242188, 41.0893959785156],
                                        [120.52834109375, 41.0574758125],
                                        [120.508472929688, 41.059946515625],
                                        [120.49263796875, 41.0797206855469],
                                        [120.456046171875, 41.0656569648438],
                                        [120.442896757813, 41.0154116035156],
                                        [120.457345, 41.0038430000001],
                                        [120.427633085938, 40.9603639960938],
                                        [120.403863554688, 40.9568508125],
                                        [120.348365507813, 40.9795644355469],
                                        [120.337345, 40.9938430000001]
                                    ]
                                ],
                                [
                                    [
                                        [120.287345, 41.893843],
                                        [120.254288359375, 41.8977602363281],
                                        [120.267345, 41.903843],
                                        [120.287345, 41.903843],
                                        [120.287345, 41.893843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "建平县" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [119.797345, 41.5338430000001],
                                        [119.793922148438, 41.5460353828126],
                                        [119.785152617188, 41.5372658515625],
                                        [119.788267851563, 41.5229177070313],
                                        [119.76650515625, 41.5048403144532],
                                        [119.748355742188, 41.4731508613281],
                                        [119.729405546875, 41.4227089667969],
                                        [119.751881132813, 41.3834609199219],
                                        [119.722457304688, 41.3580788398438],
                                        [119.643975859375, 41.3246157050782],
                                        [119.577345, 41.3178237128906],
                                        [119.56201296875, 41.3193862128907],
                                        [119.537345, 41.3038430000001],
                                        [119.53326296875, 41.3097585273438],
                                        [119.517193632813, 41.3208534980469],
                                        [119.52361453125, 41.3495131660156],
                                        [119.493590117188, 41.3702431464844],
                                        [119.477076445313, 41.3665407539063],
                                        [119.415806914063, 41.3815895820313],
                                        [119.396734648438, 41.4092116523438],
                                        [119.367345, 41.4138430000001],
                                        [119.371612578125, 41.4495778632813],
                                        [119.393287382813, 41.4783815742188],
                                        [119.390621367188, 41.4938430000001],
                                        [119.393287382813, 41.509321515625],
                                        [119.353360625, 41.5582094550781],
                                        [119.413326445313, 41.568149640625],
                                        [119.410069609375, 41.5870607734375],
                                        [119.351612578125, 41.6081081367188],
                                        [119.300299101563, 41.6519533515625],
                                        [119.304068632813, 41.673843],
                                        [119.296807890625, 41.7160048652344],
                                        [119.31330203125, 41.7282753730469],
                                        [119.309776640625, 41.7487538886719],
                                        [119.288062773438, 41.783843],
                                        [119.311226835938, 41.8212721992188],
                                        [119.317345, 41.843843],
                                        [119.323424101563, 41.8603993964844],
                                        [119.321539335938, 41.883843],
                                        [119.323951445313, 41.9138430000001],
                                        [119.321944609375, 41.938843],
                                        [119.322745390625, 41.9488430000001],
                                        [119.321187773438, 41.9682631660156],
                                        [119.374815703125, 42.0330971503907],
                                        [119.371944609375, 42.0688430000001],
                                        [119.373629179688, 42.0898146796876],
                                        [119.357345, 42.1038430000001],
                                        [119.35298953125, 42.1094863105469],
                                        [119.308131132813, 42.1189528632813],
                                        [119.26724734375, 42.1777443671875],
                                        [119.225611601563, 42.1947853828125],
                                        [119.24298953125, 42.2081996894531],
                                        [119.27744265625, 42.2577443671875],
                                        [119.30298953125, 42.2681996894532],
                                        [119.346485625, 42.3004482246094],
                                        [119.367345, 42.2973647285156],
                                        [119.395299101563, 42.3014955878906],
                                        [119.44170046875, 42.3294863105469],
                                        [119.46298953125, 42.3381996894532],
                                        [119.48900515625, 42.353891828125],
                                        [119.497345, 42.383843],
                                        [119.571500273438, 42.3508596015626],
                                        [119.53271609375, 42.2961598945313],
                                        [119.552095976563, 42.2884218574219],
                                        [119.562623320313, 42.2892665839844],
                                        [119.58197390625, 42.2784706855469],
                                        [119.60271609375, 42.2692153144532],
                                        [119.6173840625, 42.2521901679688],
                                        [119.642066679688, 42.2384194160157],
                                        [119.652345, 42.2392446113281],
                                        [119.662345, 42.2384413886719],
                                        [119.672623320313, 42.2392665839844],
                                        [119.7220715625, 42.2116774726563],
                                        [119.762345, 42.2084413886719],
                                        [119.833233671875, 42.2141371894531],
                                        [119.853502226563, 42.1778041816406],
                                        [119.82271609375, 42.1226247382813],
                                        [119.84197390625, 42.0984706855469],
                                        [119.869542265625, 42.0747170234375],
                                        [119.90197390625, 42.018470685547],
                                        [119.91271609375, 42.0092153144532],
                                        [119.93123171875, 41.9877272773438],
                                        [119.955025664063, 41.9672243476563],
                                        [119.95115359375, 41.9189858222656],
                                        [119.98271609375, 41.8992153144531],
                                        [119.99197390625, 41.8684706855469],
                                        [120.00271609375, 41.8492153144532],
                                        [120.016651640625, 41.8179836250001],
                                        [120.035206328125, 41.8194753242188],
                                        [120.031944609375, 41.778843],
                                        [120.032764921875, 41.7686049628906],
                                        [120.021871367188, 41.7389382148438],
                                        [120.027345, 41.713843],
                                        [120.00170046875, 41.6994863105469],
                                        [119.987672148438, 41.6813100410156],
                                        [120.003160429688, 41.6693544746094],
                                        [120.001529570313, 41.6583315253907],
                                        [120.045391875, 41.6244741035157],
                                        [120.041695585938, 41.5994362617188],
                                        [119.97170046875, 41.5894863105469],
                                        [119.94298953125, 41.5781996894532],
                                        [119.908795195313, 41.568676984375],
                                        [119.897345, 41.553843],
                                        [119.887345, 41.553843],
                                        [119.887345, 41.543843],
                                        [119.852843046875, 41.5353688789063],
                                        [119.827076445313, 41.5411452460938],
                                        [119.797345, 41.5338430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "喀喇沁左翼蒙古族自治县" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [119.797345, 41.5338430000001],
                                        [119.827076445313, 41.5411452460938],
                                        [119.852843046875, 41.5353688789063],
                                        [119.887345, 41.543843],
                                        [119.8940246875, 41.5016164375001],
                                        [119.881754179688, 41.4689614082032],
                                        [119.89287234375, 41.4190151191407],
                                        [119.8918371875, 41.408843],
                                        [119.89345828125, 41.3929360175782],
                                        [119.882808867188, 41.3683803535157],
                                        [119.86937625, 41.35722190625],
                                        [119.883507109375, 41.3246315742188],
                                        [119.911881132813, 41.3083803535156],
                                        [119.96431765625, 41.2990358710937],
                                        [119.9332434375, 41.2855580878907],
                                        [119.972584257813, 41.2528774238282],
                                        [119.9979309375, 41.1944301582032],
                                        [120.040069609375, 41.1761550117188],
                                        [120.0428528125, 41.1488430000001],
                                        [120.040924101563, 41.1299013496094],
                                        [120.057345, 41.103843],
                                        [120.05013796875, 41.0957790351563],
                                        [119.991124296875, 41.0686928535157],
                                        [120.021827421875, 41.0121889472657],
                                        [119.990367460938, 40.9436354804688],
                                        [119.961529570313, 40.9279665351563],
                                        [119.937345, 40.9550356269532],
                                        [119.922628203125, 40.9385622382813],
                                        [119.912061796875, 40.9291237617188],
                                        [119.902271757813, 40.9077919746094],
                                        [119.82209109375, 40.9292678046876],
                                        [119.812628203125, 40.8785622382813],
                                        [119.802061796875, 40.8691237617188],
                                        [119.784312773438, 40.8492580390626],
                                        [119.772164335938, 40.8485341621094],
                                        [119.727086210938, 40.8606081367188],
                                        [119.6930090625, 40.8449684882813],
                                        [119.6920325, 40.8285903144531],
                                        [119.706690703125, 40.815493390625],
                                        [119.674195585938, 40.7791237617188],
                                        [119.662061796875, 40.7885622382813],
                                        [119.617628203125, 40.838296125],
                                        [119.562198515625, 40.8184084296875],
                                        [119.552628203125, 40.8291237617188],
                                        [119.527345, 40.833843],
                                        [119.522628203125, 40.8591237617188],
                                        [119.472061796875, 40.8685622382812],
                                        [119.462628203125, 40.8770827460938],
                                        [119.5726575, 40.938579328125],
                                        [119.5719934375, 40.9497158027344],
                                        [119.549605742188, 40.9483815742188],
                                        [119.522628203125, 40.9847927070312],
                                        [119.556011992188, 41.0001149726562],
                                        [119.582569609375, 40.9985317207031],
                                        [119.602061796875, 41.0091237617188],
                                        [119.622628203125, 41.0185622382813],
                                        [119.632061796875, 41.0510231757813],
                                        [119.572061796875, 41.0785622382813],
                                        [119.552628203125, 41.0891237617188],
                                        [119.502061796875, 41.1085622382813],
                                        [119.492628203125, 41.1203163886719],
                                        [119.522345, 41.1185451484375],
                                        [119.532569609375, 41.1191542792969],
                                        [119.56172, 41.1033144355469],
                                        [119.582061796875, 41.1317568183594],
                                        [119.55968875, 41.172934796875],
                                        [119.474254179688, 41.2121462226563],
                                        [119.4937903125, 41.2296010566406],
                                        [119.491910429688, 41.2611183906251],
                                        [119.522628203125, 41.2885622382812],
                                        [119.532061796875, 41.2991237617187],
                                        [119.537345, 41.3038430000001],
                                        [119.56201296875, 41.3193862128907],
                                        [119.577345, 41.3178237128906],
                                        [119.643975859375, 41.3246157050782],
                                        [119.722457304688, 41.3580788398438],
                                        [119.751881132813, 41.3834609199219],
                                        [119.729405546875, 41.4227089667969],
                                        [119.748355742188, 41.4731508613281],
                                        [119.76650515625, 41.5048403144532],
                                        [119.788267851563, 41.5229177070313],
                                        [119.797345, 41.5338430000001]
                                    ]
                                ],
                                [
                                    [
                                        [119.797345, 41.5338430000001],
                                        [119.785152617188, 41.5372658515625],
                                        [119.793922148438, 41.5460353828126],
                                        [119.797345, 41.5338430000001]
                                    ]
                                ],
                                [
                                    [
                                        [119.887345, 41.543843],
                                        [119.887345, 41.553843],
                                        [119.897345, 41.553843],
                                        [119.897345, 41.543843],
                                        [119.887345, 41.543843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "凌源市" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [119.415806914063, 41.3815895820313],
                                        [119.477076445313, 41.3665407539063],
                                        [119.493590117188, 41.3702431464844],
                                        [119.52361453125, 41.3495131660156],
                                        [119.517193632813, 41.3208534980469],
                                        [119.53326296875, 41.3097585273438],
                                        [119.537345, 41.3038430000001],
                                        [119.532061796875, 41.2991237617187],
                                        [119.522628203125, 41.2885622382812],
                                        [119.491910429688, 41.2611183906251],
                                        [119.4937903125, 41.2296010566406],
                                        [119.474254179688, 41.2121462226563],
                                        [119.55968875, 41.172934796875],
                                        [119.582061796875, 41.1317568183594],
                                        [119.56172, 41.1033144355469],
                                        [119.532569609375, 41.1191542792969],
                                        [119.522345, 41.1185451484375],
                                        [119.492628203125, 41.1203163886719],
                                        [119.502061796875, 41.1085622382813],
                                        [119.552628203125, 41.0891237617188],
                                        [119.572061796875, 41.0785622382813],
                                        [119.632061796875, 41.0510231757813],
                                        [119.622628203125, 41.0185622382813],
                                        [119.602061796875, 41.0091237617188],
                                        [119.582569609375, 40.9985317207031],
                                        [119.556011992188, 41.0001149726562],
                                        [119.522628203125, 40.9847927070312],
                                        [119.549605742188, 40.9483815742188],
                                        [119.5719934375, 40.9497158027344],
                                        [119.5726575, 40.938579328125],
                                        [119.462628203125, 40.8770827460938],
                                        [119.472061796875, 40.8685622382812],
                                        [119.522628203125, 40.8591237617188],
                                        [119.527345, 40.833843],
                                        [119.52107546875, 40.8295131660157],
                                        [119.525557890625, 40.8095131660156],
                                        [119.51142703125, 40.7997585273438],
                                        [119.50170046875, 40.7737538886719],
                                        [119.47697390625, 40.7566835761719],
                                        [119.461676054688, 40.7601137519532],
                                        [119.45326296875, 40.7479274726563],
                                        [119.42455203125, 40.7281069160156],
                                        [119.41170046875, 40.6937538886719],
                                        [119.38697390625, 40.6766835761719],
                                        [119.372345, 40.6799636054688],
                                        [119.3441028125, 40.6736330390625],
                                        [119.33326296875, 40.6579274726563],
                                        [119.32142703125, 40.6497585273438],
                                        [119.309176054688, 40.6320119453125],
                                        [119.265582304688, 40.6019130683594],
                                        [119.250797148438, 40.6233266425782],
                                        [119.237345, 40.603843],
                                        [119.147345, 40.603843],
                                        [119.147345, 40.6138430000001],
                                        [119.141358671875, 40.6290651679688],
                                        [119.174400664063, 40.6699440742188],
                                        [119.170308867188, 40.6976186347657],
                                        [119.10013796875, 40.6669533515626],
                                        [119.077345, 40.6703212714844],
                                        [119.052857695313, 40.6667018867188],
                                        [119.04298953125, 40.6794863105469],
                                        [119.027086210938, 40.6917604804688],
                                        [119.002345, 40.6881044746094],
                                        [118.980113554688, 40.6913893867188],
                                        [118.937125273438, 40.7470851875],
                                        [118.897345, 40.753843],
                                        [118.891632109375, 40.7728115058594],
                                        [118.841158476563, 40.8090566230469],
                                        [118.842955351563, 40.8314455390625],
                                        [118.86271609375, 40.8484706855469],
                                        [118.884766875, 40.8836782050782],
                                        [118.881920195313, 40.9191213203126],
                                        [118.89271609375, 40.9384706855469],
                                        [118.903038359375, 40.9615993476563],
                                        [118.952345, 40.9576381660157],
                                        [118.98404421875, 40.9601845527344],
                                        [119.02197390625, 40.9964284492188],
                                        [118.953819609375, 41.01694846875],
                                        [118.92271609375, 41.0426247382813],
                                        [118.956920195313, 41.0720912910156],
                                        [119.017345, 41.0672365546876],
                                        [119.068834257813, 41.0713735175781],
                                        [119.08197390625, 41.1292153144532],
                                        [119.12271609375, 41.1384706855469],
                                        [119.191080351563, 41.1920095039063],
                                        [119.162730742188, 41.2164321113282],
                                        [119.20271609375, 41.2284706855469],
                                        [119.21197390625, 41.2492153144531],
                                        [119.243199492188, 41.2761159492187],
                                        [119.237345, 41.313843],
                                        [119.24197390625, 41.3192153144532],
                                        [119.32392703125, 41.3341640449219],
                                        [119.321944609375, 41.358843],
                                        [119.323472929688, 41.3778627753907],
                                        [119.306842070313, 41.407671125],
                                        [119.367345, 41.4138430000001],
                                        [119.396734648438, 41.4092116523438],
                                        [119.415806914063, 41.3815895820313]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });

            define("echarts/util/mapData/geoJson/huludao", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": { "name": "建昌县" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [120.127906523438, 41.0394057441407],
                                        [120.142345, 41.0079494453126],
                                        [120.191925078125, 41.010903546875],
                                        [120.1944153125, 40.9690956855469],
                                        [120.152628203125, 40.9317568183594],
                                        [120.18552859375, 40.9206179023437],
                                        [120.210787382813, 40.9488857246094],
                                        [120.237345, 40.9538430000001],
                                        [120.2438684375, 40.9141408515625],
                                        [120.240206328125, 40.8893544746094],
                                        [120.2586340625, 40.8751308417969],
                                        [120.2760559375, 40.8525551582032],
                                        [120.293375273438, 40.8391872382812],
                                        [120.287345, 40.823843],
                                        [120.270343046875, 40.7973757148438],
                                        [120.275421171875, 40.7630141425782],
                                        [120.245328398438, 40.6894863105469],
                                        [120.23170046875, 40.6981996894532],
                                        [120.216265898438, 40.7181996894531],
                                        [120.20170046875, 40.7094863105469],
                                        [120.192857695313, 40.6980287910156],
                                        [120.172945585938, 40.7009706855469],
                                        [120.1176575, 40.6855751777344],
                                        [120.125953398438, 40.6294130683594],
                                        [120.10170046875, 40.6194863105469],
                                        [120.097345, 40.6138430000001],
                                        [120.07197390625, 40.6092153144531],
                                        [120.06271609375, 40.5864455390625],
                                        [120.090499296875, 40.5625112128906],
                                        [120.03197390625, 40.5492153144532],
                                        [120.011363554688, 40.5377162910156],
                                        [119.963961210938, 40.5415248847656],
                                        [119.95271609375, 40.5284706855469],
                                        [119.9091809375, 40.5153627753906],
                                        [119.884464140625, 40.4599770332032],
                                        [119.8666028125, 40.4445864082032],
                                        [119.852667265625, 40.4284157539063],
                                        [119.842345, 40.4292446113282],
                                        [119.822345, 40.4276381660157],
                                        [119.802105742188, 40.4292641425781],
                                        [119.74814578125, 40.40944846875],
                                        [119.706329375, 40.432778546875],
                                        [119.652345, 40.4284413886719],
                                        [119.632345, 40.4300478339844],
                                        [119.612345, 40.4284413886719],
                                        [119.602105742188, 40.4292641425781],
                                        [119.587345, 40.4238430000001],
                                        [119.593472929688, 40.4488014960937],
                                        [119.58978640625, 40.4652529121094],
                                        [119.565513945313, 40.4820119453125],
                                        [119.55326296875, 40.4997585273438],
                                        [119.54060671875, 40.5084950996094],
                                        [119.553858671875, 40.528843],
                                        [119.539112578125, 40.5514821601563],
                                        [119.517345, 40.5466017890625],
                                        [119.501900664063, 40.550063703125],
                                        [119.472550078125, 40.5309511542969],
                                        [119.425548125, 40.5414882636719],
                                        [119.391842070313, 40.5273305488281],
                                        [119.38326296875, 40.5397585273438],
                                        [119.363975859375, 40.5479274726562],
                                        [119.332789335938, 40.527622296875],
                                        [119.312345, 40.5322060371094],
                                        [119.291900664063, 40.527622296875],
                                        [119.272789335938, 40.540063703125],
                                        [119.261900664063, 40.537622296875],
                                        [119.214136992188, 40.5687233710938],
                                        [119.237345, 40.603843],
                                        [119.250797148438, 40.6233266425782],
                                        [119.265582304688, 40.6019130683594],
                                        [119.309176054688, 40.6320119453125],
                                        [119.32142703125, 40.6497585273438],
                                        [119.33326296875, 40.6579274726563],
                                        [119.3441028125, 40.6736330390625],
                                        [119.372345, 40.6799636054688],
                                        [119.38697390625, 40.6766835761719],
                                        [119.41170046875, 40.6937538886719],
                                        [119.42455203125, 40.7281069160156],
                                        [119.45326296875, 40.7479274726563],
                                        [119.461676054688, 40.7601137519532],
                                        [119.47697390625, 40.7566835761719],
                                        [119.50170046875, 40.7737538886719],
                                        [119.51142703125, 40.7997585273438],
                                        [119.525557890625, 40.8095131660156],
                                        [119.52107546875, 40.8295131660157],
                                        [119.527345, 40.833843],
                                        [119.552628203125, 40.8291237617188],
                                        [119.562198515625, 40.8184084296875],
                                        [119.617628203125, 40.838296125],
                                        [119.662061796875, 40.7885622382813],
                                        [119.674195585938, 40.7791237617188],
                                        [119.706690703125, 40.815493390625],
                                        [119.6920325, 40.8285903144531],
                                        [119.6930090625, 40.8449684882813],
                                        [119.727086210938, 40.8606081367188],
                                        [119.772164335938, 40.8485341621094],
                                        [119.784312773438, 40.8492580390626],
                                        [119.802061796875, 40.8691237617188],
                                        [119.812628203125, 40.8785622382813],
                                        [119.82209109375, 40.9292678046876],
                                        [119.902271757813, 40.9077919746094],
                                        [119.912061796875, 40.9291237617188],
                                        [119.922628203125, 40.9385622382813],
                                        [119.937345, 40.9550356269532],
                                        [119.961529570313, 40.9279665351563],
                                        [119.990367460938, 40.9436354804688],
                                        [120.021827421875, 41.0121889472657],
                                        [119.991124296875, 41.0686928535157],
                                        [120.05013796875, 41.0957790351563],
                                        [120.057345, 41.103843],
                                        [120.107882109375, 41.0762538886719],
                                        [120.127906523438, 41.0394057441407]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "连山区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [120.337345, 40.9938430000001],
                                        [120.340767851563, 41.0060353828125],
                                        [120.349537382813, 40.9972658515625],
                                        [120.337345, 40.9938430000001]
                                    ]
                                ],
                                [
                                    [
                                        [120.717345, 41.023843],
                                        [120.707345, 41.023843],
                                        [120.712345, 41.0366506171875],
                                        [120.717345, 41.023843]
                                    ]
                                ],
                                [
                                    [
                                        [120.857345, 41.133843],
                                        [120.852345, 41.1210353828125],
                                        [120.847345, 41.133843],
                                        [120.857345, 41.133843]
                                    ]
                                ],
                                [
                                    [
                                        [120.337345, 40.9938430000001],
                                        [120.348365507813, 40.9795644355469],
                                        [120.403863554688, 40.9568508125],
                                        [120.427633085938, 40.9603639960938],
                                        [120.457345, 41.0038430000001],
                                        [120.484644804688, 40.9858034492188],
                                        [120.524830351563, 41.0119716621094],
                                        [120.55033328125, 40.9750295234376],
                                        [120.572652617188, 40.9800331855469],
                                        [120.639454375, 40.9497585273438],
                                        [120.67326296875, 40.9579274726563],
                                        [120.692862578125, 41.013843],
                                        [120.707345, 41.023843],
                                        [120.712345, 41.0005995917969],
                                        [120.717345, 41.023843],
                                        [120.768643828125, 41.0112429023438],
                                        [120.78142703125, 41.0297585273438],
                                        [120.814176054688, 41.0420119453125],
                                        [120.84142703125, 41.0897585273437],
                                        [120.869234648438, 41.1256349921876],
                                        [120.857345, 41.133843],
                                        [120.869698515625, 41.1572927070313],
                                        [120.905142851563, 41.1400673652344],
                                        [120.8992590625, 41.1269692207031],
                                        [120.922345, 41.11659690625],
                                        [120.93330203125, 41.12151878125],
                                        [120.937345, 41.1138430000001],
                                        [120.9446496875, 41.0841127753907],
                                        [120.937354765625, 41.0515883613282],
                                        [120.991080351563, 41.0349355292969],
                                        [121.027345, 41.043843],
                                        [121.013155546875, 41.0085378242188],
                                        [121.003756132813, 40.9539516425781],
                                        [121.031612578125, 40.9332314277344],
                                        [121.022633085938, 40.8752138496094],
                                        [121.001612578125, 40.8595778632813],
                                        [120.997345, 40.8438430000001],
                                        [120.99298953125, 40.8381996894531],
                                        [120.957345, 40.823843],
                                        [120.945650664063, 40.8379201484375],
                                        [120.8914465625, 40.7726638007813],
                                        [120.893897734375, 40.7486220527344],
                                        [120.851881132813, 40.7393056464844],
                                        [120.832808867188, 40.7283803535157],
                                        [120.817345, 40.723843],
                                        [120.810079375, 40.7322768378906],
                                        [120.761998320313, 40.7284133125],
                                        [120.75271609375, 40.7492153144532],
                                        [120.7069934375, 40.7696181464844],
                                        [120.659288359375, 40.7657851386719],
                                        [120.5724621875, 40.7792543769532],
                                        [120.562345, 40.7784413886719],
                                        [120.542345, 40.7800478339844],
                                        [120.517345, 40.7780397773437],
                                        [120.502105742188, 40.7792641425782],
                                        [120.44814578125, 40.7594484687501],
                                        [120.41271609375, 40.7792153144532],
                                        [120.39197390625, 40.7884706855469],
                                        [120.376304960938, 40.8235805488281],
                                        [120.303902617188, 40.8177626777344],
                                        [120.287345, 40.823843],
                                        [120.293375273438, 40.8391872382812],
                                        [120.2760559375, 40.8525551582032],
                                        [120.2586340625, 40.8751308417969],
                                        [120.240206328125, 40.8893544746094],
                                        [120.2438684375, 40.9141408515625],
                                        [120.237345, 40.9538430000001],
                                        [120.270753203125, 40.9398110175781],
                                        [120.29142703125, 40.9697585273438],
                                        [120.30326296875, 40.9779274726563],
                                        [120.319439726563, 41.00136253125],
                                        [120.337345, 40.9938430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "龙港区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [121.021910429688, 40.7265395332031],
                                        [121.027345, 40.713843],
                                        [121.004346953125, 40.717895734375],
                                        [121.021910429688, 40.7265395332031]
                                    ]
                                ],
                                [
                                    [
                                        [120.92298953125, 40.7670607734376],
                                        [120.937349882813, 40.7194863105469],
                                        [120.96298953125, 40.7281996894532],
                                        [120.990709257813, 40.7449196601563],
                                        [120.99459109375, 40.7186452460938],
                                        [120.96170046875, 40.7094863105469],
                                        [120.938590117188, 40.6955471015625],
                                        [120.83298953125, 40.6781996894531],
                                        [120.827345, 40.673843],
                                        [120.823443632813, 40.6799404121094],
                                        [120.803648710938, 40.6926113105469],
                                        [120.817345, 40.723843],
                                        [120.832808867188, 40.7283803535157],
                                        [120.851881132813, 40.7393056464844],
                                        [120.893897734375, 40.7486220527344],
                                        [120.8914465625, 40.7726638007813],
                                        [120.945650664063, 40.8379201484375],
                                        [120.957345, 40.823843],
                                        [120.96170046875, 40.7981996894531],
                                        [120.981085234375, 40.7832387519531],
                                        [120.92298953125, 40.7670607734376]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "南票区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [120.707345, 41.023843],
                                        [120.717345, 41.023843],
                                        [120.712345, 41.0005995917969],
                                        [120.707345, 41.023843]
                                    ]
                                ],
                                [
                                    [
                                        [120.717345, 41.023843],
                                        [120.712345, 41.0366506171875],
                                        [120.707345, 41.023843],
                                        [120.692862578125, 41.013843],
                                        [120.67326296875, 40.9579274726563],
                                        [120.639454375, 40.9497585273438],
                                        [120.572652617188, 40.9800331855469],
                                        [120.55033328125, 40.9750295234376],
                                        [120.524830351563, 41.0119716621094],
                                        [120.484644804688, 40.9858034492188],
                                        [120.457345, 41.0038430000001],
                                        [120.442896757813, 41.0154116035156],
                                        [120.456046171875, 41.0656569648438],
                                        [120.49263796875, 41.0797206855469],
                                        [120.508472929688, 41.059946515625],
                                        [120.52834109375, 41.0574758125],
                                        [120.541793242188, 41.0893959785156],
                                        [120.592896757813, 41.1082900214844],
                                        [120.611793242188, 41.1593959785156],
                                        [120.632896757813, 41.1682900214844],
                                        [120.651983671875, 41.1795095039063],
                                        [120.662706328125, 41.1781764960938],
                                        [120.68373171875, 41.1905361152344],
                                        [120.712369414063, 41.1869741035157],
                                        [120.767345, 41.1938430000001],
                                        [120.788853789063, 41.2028774238281],
                                        [120.77970828125, 41.1620729804688],
                                        [120.815303984375, 41.1388930488282],
                                        [120.847345, 41.133843],
                                        [120.852345, 41.1210353828125],
                                        [120.857345, 41.133843],
                                        [120.869234648438, 41.1256349921876],
                                        [120.84142703125, 41.0897585273437],
                                        [120.814176054688, 41.0420119453125],
                                        [120.78142703125, 41.0297585273438],
                                        [120.768643828125, 41.0112429023438],
                                        [120.717345, 41.023843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "绥中县" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [119.627345, 40.2338430000001],
                                        [119.623922148438, 40.2216506171876],
                                        [119.615152617188, 40.2304201484375],
                                        [119.627345, 40.2338430000001]
                                    ]
                                ],
                                [
                                    [
                                        [119.627345, 40.2338430000001],
                                        [119.630704375, 40.2504836250001],
                                        [119.644976835938, 40.2684511542969],
                                        [119.631090117188, 40.2968898750001],
                                        [119.610704375, 40.307202375],
                                        [119.607345, 40.3138430000001],
                                        [119.602896757813, 40.3293959785156],
                                        [119.590533476563, 40.3392958808594],
                                        [119.593013945313, 40.3592031074219],
                                        [119.581676054688, 40.3784841132813],
                                        [119.587345, 40.4238430000001],
                                        [119.602105742188, 40.4292641425781],
                                        [119.612345, 40.4284413886719],
                                        [119.632345, 40.4300478339844],
                                        [119.652345, 40.4284413886719],
                                        [119.706329375, 40.432778546875],
                                        [119.74814578125, 40.40944846875],
                                        [119.802105742188, 40.4292641425781],
                                        [119.822345, 40.4276381660157],
                                        [119.842345, 40.4292446113282],
                                        [119.852667265625, 40.4284157539063],
                                        [119.8666028125, 40.4445864082032],
                                        [119.884464140625, 40.4599770332032],
                                        [119.9091809375, 40.5153627753906],
                                        [119.95271609375, 40.5284706855469],
                                        [119.963961210938, 40.5415248847656],
                                        [120.011363554688, 40.5377162910156],
                                        [120.03197390625, 40.5492153144532],
                                        [120.090499296875, 40.5625112128906],
                                        [120.06271609375, 40.5864455390625],
                                        [120.07197390625, 40.6092153144531],
                                        [120.097345, 40.6138430000001],
                                        [120.10298953125, 40.6094863105469],
                                        [120.111832304688, 40.5980287910157],
                                        [120.12869265625, 40.6005202460938],
                                        [120.14298953125, 40.5894863105469],
                                        [120.161890898438, 40.5578798652344],
                                        [120.2115246875, 40.5723513007813],
                                        [120.186612578125, 40.5310488105469],
                                        [120.253487578125, 40.4936098457031],
                                        [120.27170046875, 40.4281996894532],
                                        [120.312569609375, 40.4114723945313],
                                        [120.32490359375, 40.3530190253906],
                                        [120.392086210938, 40.3236623359376],
                                        [120.44298953125, 40.309486310547],
                                        [120.472984648438, 40.2706264472657],
                                        [120.497345, 40.263843],
                                        [120.5080871875, 40.2542470527344],
                                        [120.442628203125, 40.1985622382813],
                                        [120.31595828125, 40.1866738105469],
                                        [120.233726835938, 40.1419899726563],
                                        [120.192061796875, 40.1291237617188],
                                        [120.12060671875, 40.1034853339844],
                                        [119.91451296875, 40.0470571113282],
                                        [119.899766875, 39.9993056464844],
                                        [119.847345, 39.993843],
                                        [119.83654421875, 39.9997646308594],
                                        [119.84966921875, 40.0316078925782],
                                        [119.8135559375, 40.0514028144532],
                                        [119.787345, 40.0405995917969],
                                        [119.754263945313, 40.0542348457031],
                                        [119.76478640625, 40.0797646308594],
                                        [119.741988554688, 40.09226096875],
                                        [119.737345, 40.113843],
                                        [119.74298953125, 40.1181996894532],
                                        [119.756256132813, 40.1353871894531],
                                        [119.740748320313, 40.2023012519531],
                                        [119.706485625, 40.1972377753906],
                                        [119.66111453125, 40.2308779121094],
                                        [119.64205203125, 40.2280605292969],
                                        [119.627345, 40.2338430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "兴城市" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [120.613922148438, 40.4060353828126],
                                        [120.617345, 40.3938430000001],
                                        [120.605152617188, 40.3972658515625],
                                        [120.613922148438, 40.4060353828126]
                                    ]
                                ],
                                [
                                    [
                                        [120.767345, 40.473843],
                                        [120.763922148438, 40.4616506171875],
                                        [120.755152617188, 40.4704201484375],
                                        [120.767345, 40.473843]
                                    ]
                                ],
                                [
                                    [
                                        [120.767345, 40.473843],
                                        [120.775513945313, 40.4856740546875],
                                        [120.79361453125, 40.4981728339844],
                                        [120.789185820313, 40.5179274726563],
                                        [120.83142703125, 40.5078005195313],
                                        [120.82326296875, 40.4879274726563],
                                        [120.767345, 40.473843]
                                    ]
                                ],
                                [
                                    [
                                        [120.287345, 40.823843],
                                        [120.303902617188, 40.8177626777344],
                                        [120.376304960938, 40.8235805488281],
                                        [120.39197390625, 40.7884706855469],
                                        [120.41271609375, 40.7792153144532],
                                        [120.44814578125, 40.7594484687501],
                                        [120.502105742188, 40.7792641425782],
                                        [120.517345, 40.7780397773437],
                                        [120.542345, 40.7800478339844],
                                        [120.562345, 40.7784413886719],
                                        [120.5724621875, 40.7792543769532],
                                        [120.659288359375, 40.7657851386719],
                                        [120.7069934375, 40.7696181464844],
                                        [120.75271609375, 40.7492153144532],
                                        [120.761998320313, 40.7284133125],
                                        [120.810079375, 40.7322768378906],
                                        [120.817345, 40.723843],
                                        [120.803648710938, 40.6926113105469],
                                        [120.823443632813, 40.6799404121094],
                                        [120.827345, 40.673843],
                                        [120.820533476563, 40.6683901191406],
                                        [120.823013945313, 40.6484511542969],
                                        [120.79072390625, 40.6042470527344],
                                        [120.731793242188, 40.5593959785156],
                                        [120.722896757813, 40.5482900214844],
                                        [120.675562773438, 40.5283437324219],
                                        [120.662896757813, 40.4982900214844],
                                        [120.650504179688, 40.4772060371094],
                                        [120.61783328125, 40.4812697578125],
                                        [120.582896757813, 40.4554116035157],
                                        [120.603409453125, 40.4389882636719],
                                        [120.568375273438, 40.3910268378907],
                                        [120.591138945313, 40.3727968574219],
                                        [120.50216921875, 40.3241335273438],
                                        [120.497345, 40.263843],
                                        [120.472984648438, 40.2706264472657],
                                        [120.44298953125, 40.309486310547],
                                        [120.392086210938, 40.3236623359376],
                                        [120.32490359375, 40.3530190253906],
                                        [120.312569609375, 40.4114723945313],
                                        [120.27170046875, 40.4281996894532],
                                        [120.253487578125, 40.4936098457031],
                                        [120.186612578125, 40.5310488105469],
                                        [120.2115246875, 40.5723513007813],
                                        [120.161890898438, 40.5578798652344],
                                        [120.14298953125, 40.5894863105469],
                                        [120.12869265625, 40.6005202460938],
                                        [120.111832304688, 40.5980287910157],
                                        [120.10298953125, 40.6094863105469],
                                        [120.097345, 40.6138430000001],
                                        [120.10170046875, 40.6194863105469],
                                        [120.125953398438, 40.6294130683594],
                                        [120.1176575, 40.6855751777344],
                                        [120.172945585938, 40.7009706855469],
                                        [120.192857695313, 40.6980287910156],
                                        [120.20170046875, 40.7094863105469],
                                        [120.216265898438, 40.7181996894531],
                                        [120.23170046875, 40.6981996894532],
                                        [120.245328398438, 40.6894863105469],
                                        [120.275421171875, 40.7630141425782],
                                        [120.270343046875, 40.7973757148438],
                                        [120.287345, 40.823843]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });
            define("echarts/util/mapData/geoJson/fuxin", [], function() {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": { "name": "海州区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [121.631851835938, 42.0331972480469],
                                        [121.652345, 42.0274379707032],
                                        [121.662584257813, 42.0303151679687],
                                        [121.677345, 42.0238430000001],
                                        [121.673985625, 42.0172023750001],
                                        [121.647437773438, 42.0037721992188],
                                        [121.663985625, 41.9704836250001],
                                        [121.667345, 41.9538430000001],
                                        [121.657345, 41.933843],
                                        [121.641246367188, 41.9377455878906],
                                        [121.633443632813, 41.9499404121094],
                                        [121.583912382813, 41.9673598457031],
                                        [121.622159453125, 41.9808119941406],
                                        [121.631851835938, 42.0331972480469]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "清河门区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [121.452896757813, 41.7893959785157],
                                        [121.462847929688, 41.7657851386719],
                                        [121.527345, 41.773843],
                                        [121.52298953125, 41.7681996894532],
                                        [121.50375125, 41.7533498359375],
                                        [121.501607695313, 41.738843],
                                        [121.50459109375, 41.7186452460938],
                                        [121.47170046875, 41.7094863105469],
                                        [121.456627226563, 41.6899599433594],
                                        [121.42834109375, 41.7372548652344],
                                        [121.356939726563, 41.7164357734375],
                                        [121.33099734375, 41.7364589667969],
                                        [121.337345, 41.7638430000001],
                                        [121.372896757813, 41.7682900214844],
                                        [121.417789335938, 41.8041909003907],
                                        [121.452896757813, 41.7893959785157]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "太平区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [121.747345, 42.033843],
                                        [121.74326296875, 42.0279274726563],
                                        [121.7305871875, 42.0191762519531],
                                        [121.709454375, 41.9867287421875],
                                        [121.71361453125, 41.9681728339844],
                                        [121.70142703125, 41.9597585273438],
                                        [121.697345, 41.9538430000001],
                                        [121.667345, 41.9538430000001],
                                        [121.663985625, 41.9704836250001],
                                        [121.647437773438, 42.0037721992188],
                                        [121.673985625, 42.0172023750001],
                                        [121.677345, 42.0238430000001],
                                        [121.70470828125, 42.0107900214844],
                                        [121.717345, 42.033843],
                                        [121.737345, 42.033843],
                                        [121.747345, 42.033843]
                                    ]
                                ],
                                [
                                    [
                                        [121.747345, 42.033843],
                                        [121.747345, 42.043843],
                                        [121.760152617188, 42.038843],
                                        [121.747345, 42.033843]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "阜新蒙古族自治县" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [122.327345, 42.283843],
                                        [122.327345, 42.2938430000001],
                                        [122.340152617188, 42.288843],
                                        [122.327345, 42.283843]
                                    ]
                                ],
                                [
                                    [
                                        [121.597345, 42.503843],
                                        [121.600767851563, 42.5160353828125],
                                        [121.609537382813, 42.5072658515626],
                                        [121.597345, 42.503843]
                                    ]
                                ],
                                [
                                    [
                                        [122.327345, 42.2938430000001],
                                        [122.314537382813, 42.288843],
                                        [122.327345, 42.283843],
                                        [122.332857695313, 42.2767018867188],
                                        [122.352735625, 42.2796401191407],
                                        [122.37170046875, 42.2681996894532],
                                        [122.393170195313, 42.2594130683594],
                                        [122.391607695313, 42.248843],
                                        [122.393824492188, 42.233843],
                                        [122.38845828125, 42.1975295234376],
                                        [122.404425078125, 42.1998891425782],
                                        [122.417345, 42.123843],
                                        [122.40170046875, 42.1194863105469],
                                        [122.35298953125, 42.0981996894532],
                                        [122.296768828125, 42.0825441718751],
                                        [122.27298953125, 42.0681996894532],
                                        [122.133902617188, 42.0123378730469],
                                        [122.122857695313, 41.9980287910156],
                                        [122.10978640625, 41.9999599433594],
                                        [122.09298953125, 41.9781996894531],
                                        [122.06170046875, 41.9594863105469],
                                        [122.02298953125, 41.9281996894532],
                                        [121.99170046875, 41.9194863105469],
                                        [121.9786340625, 41.9025551582031],
                                        [121.96170046875, 41.8894863105469],
                                        [121.95298953125, 41.8781996894532],
                                        [121.9210559375, 41.8651308417969],
                                        [121.89298953125, 41.8481996894532],
                                        [121.85170046875, 41.8394863105469],
                                        [121.84298953125, 41.8281996894531],
                                        [121.830474882813, 41.818540265625],
                                        [121.864859648438, 41.8089650703126],
                                        [121.838365507813, 41.7981215644531],
                                        [121.827345, 41.783843],
                                        [121.811793242188, 41.7882900214844],
                                        [121.787447539063, 41.8026015449219],
                                        [121.717345, 41.7938430000001],
                                        [121.681793242188, 41.7893959785157],
                                        [121.672799101563, 41.7781642890625],
                                        [121.657345, 41.7800868964844],
                                        [121.632799101563, 41.7770339179688],
                                        [121.621890898438, 41.7906520820313],
                                        [121.5318371875, 41.7794509101563],
                                        [121.527345, 41.773843],
                                        [121.462847929688, 41.7657851386719],
                                        [121.452896757813, 41.7893959785157],
                                        [121.417789335938, 41.8041909003907],
                                        [121.372896757813, 41.7682900214844],
                                        [121.337345, 41.7638430000001],
                                        [121.31740359375, 41.773755109375],
                                        [121.293336210938, 41.7620009589844],
                                        [121.283985625, 41.7804836250001],
                                        [121.257345, 41.783843],
                                        [121.262154570313, 41.7990334296875],
                                        [121.27482546875, 41.8351784492187],
                                        [121.302115507813, 41.8867519355469],
                                        [121.252154570313, 41.8986525703125],
                                        [121.206597929688, 41.9146205878907],
                                        [121.192535429688, 41.9590334296875],
                                        [121.172154570313, 41.9686525703125],
                                        [121.1523840625, 41.9791139960937],
                                        [121.118433867188, 41.9672145820313],
                                        [121.041807890625, 41.9702516914063],
                                        [121.042545195313, 41.9888430000001],
                                        [121.042144804688, 41.998843],
                                        [121.043136015625, 42.0238430000001],
                                        [121.041729765625, 42.0593740058595],
                                        [121.062535429688, 42.0786525703125],
                                        [121.0789465625, 42.1134255195313],
                                        [121.051417265625, 42.1804457832031],
                                        [121.052550078125, 42.2090200019532],
                                        [121.03248171875, 42.22761253125],
                                        [121.027345, 42.243843],
                                        [121.030704375, 42.250483625],
                                        [121.063985625, 42.257202375],
                                        [121.091881132813, 42.2815102363282],
                                        [121.111353789063, 42.2720009589844],
                                        [121.127393828125, 42.3037038398438],
                                        [121.143336210938, 42.2959169746094],
                                        [121.15406375, 42.31712425],
                                        [121.173985625, 42.327202375],
                                        [121.18406375, 42.34712425],
                                        [121.203985625, 42.3572023750001],
                                        [121.207345, 42.363843],
                                        [121.211612578125, 42.3695778632813],
                                        [121.271207304688, 42.3818373847657],
                                        [121.293077421875, 42.3981081367187],
                                        [121.304288359375, 42.4394594550782],
                                        [121.373077421875, 42.4581081367188],
                                        [121.385733671875, 42.475122296875],
                                        [121.412345, 42.4797035957031],
                                        [121.44623171875, 42.4738698554688],
                                        [121.476285429688, 42.4924684882813],
                                        [121.549703398438, 42.479829328125],
                                        [121.581612578125, 42.4995778632813],
                                        [121.597345, 42.503843],
                                        [121.609595976563, 42.4860964179688],
                                        [121.63326296875, 42.4697585273438],
                                        [121.66033328125, 42.4305458808594],
                                        [121.708756132813, 42.4414003730469],
                                        [121.735426054688, 42.4800283027344],
                                        [121.790069609375, 42.500473859375],
                                        [121.805694609375, 42.4969704414062],
                                        [121.828995390625, 42.5307155585937],
                                        [121.842345, 42.5277223945313],
                                        [121.852345, 42.5299636054688],
                                        [121.863116484375, 42.5275490546876],
                                        [121.87142703125, 42.5497585273438],
                                        [121.889176054688, 42.5620119453125],
                                        [121.897345, 42.573843],
                                        [121.94197390625, 42.5484706855469],
                                        [122.03838015625, 42.4961415839844],
                                        [122.069371367188, 42.4466616035156],
                                        [122.104586210938, 42.4270143867188],
                                        [122.151373320313, 42.4307741523437],
                                        [122.16197390625, 42.4184706855469],
                                        [122.1727746875, 42.4091664863282],
                                        [122.1719153125, 42.3984963203126],
                                        [122.19271609375, 42.3892153144532],
                                        [122.20197390625, 42.3784706855469],
                                        [122.223287382813, 42.3689614082031],
                                        [122.211539335938, 42.358843],
                                        [122.22271609375, 42.3492153144532],
                                        [122.232022734375, 42.3384157539063],
                                        [122.242623320313, 42.3392665839844],
                                        [122.26197390625, 42.3284706855469],
                                        [122.306158476563, 42.3184328437501],
                                        [122.327345, 42.2938430000001]
                                    ],
                                    [
                                        [121.783912382813, 42.12788596875],
                                        [121.74970828125, 42.1056130195313],
                                        [121.753468046875, 42.088843],
                                        [121.750474882813, 42.0754921699219],
                                        [121.767345, 42.0638430000001],
                                        [121.767345, 42.053843],
                                        [121.747345, 42.053843],
                                        [121.747345, 42.043843],
                                        [121.747345, 42.033843],
                                        [121.737345, 42.033843],
                                        [121.727345, 42.0477956367188],
                                        [121.717345, 42.033843],
                                        [121.70142703125, 42.0379274726563],
                                        [121.691529570313, 42.0765065742187],
                                        [121.652198515625, 42.0676894355469],
                                        [121.6014465625, 42.0834206367188],
                                        [121.57959109375, 42.11507346875],
                                        [121.54422, 42.0920412421875],
                                        [121.585611601563, 42.0684169746094],
                                        [121.578980742188, 42.038843],
                                        [121.583468046875, 42.018843],
                                        [121.581221953125, 42.008843],
                                        [121.5858215625, 41.9883315253906],
                                        [121.52529421875, 41.9787917304688],
                                        [121.584605742188, 41.9388539863281],
                                        [121.569132109375, 41.9281728339844],
                                        [121.57494265625, 41.9022499824219],
                                        [121.652027617188, 41.9261440253906],
                                        [121.657345, 41.933843],
                                        [121.689176054688, 41.9420119453126],
                                        [121.697345, 41.9538430000001],
                                        [121.739615507813, 41.9470290351563],
                                        [121.777550078125, 41.9616091132813],
                                        [121.791793242188, 41.9793959785157],
                                        [121.83468875, 41.9916616035156],
                                        [121.883370390625, 41.9856056953125],
                                        [121.881724882813, 41.998843],
                                        [121.882965117188, 42.008843],
                                        [121.874058867188, 42.0804592109376],
                                        [121.851793242188, 42.0982900214844],
                                        [121.847345, 42.1038430000001],
                                        [121.847345, 42.113843],
                                        [121.817345, 42.113843],
                                        [121.783912382813, 42.12788596875]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "细河区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [121.657345, 41.933843],
                                        [121.667345, 41.9538430000001],
                                        [121.697345, 41.9538430000001],
                                        [121.689176054688, 41.9420119453126],
                                        [121.657345, 41.933843]
                                    ]
                                ],
                                [
                                    [
                                        [121.717345, 42.033843],
                                        [121.727345, 42.0477956367188],
                                        [121.737345, 42.033843],
                                        [121.717345, 42.033843]
                                    ]
                                ],
                                [
                                    [
                                        [121.767345, 42.053843],
                                        [121.767345, 42.0638430000001],
                                        [121.780152617188, 42.058843],
                                        [121.767345, 42.053843]
                                    ]
                                ],
                                [
                                    [
                                        [121.697345, 41.9538430000001],
                                        [121.70142703125, 41.9597585273438],
                                        [121.71361453125, 41.9681728339844],
                                        [121.709454375, 41.9867287421875],
                                        [121.7305871875, 42.0191762519531],
                                        [121.74326296875, 42.0279274726563],
                                        [121.747345, 42.033843],
                                        [121.760152617188, 42.038843],
                                        [121.747345, 42.043843],
                                        [121.747345, 42.053843],
                                        [121.767345, 42.053843],
                                        [121.771158476563, 42.0476552558594],
                                        [121.803057890625, 42.0367848945313],
                                        [121.827374296875, 42.0814516425782],
                                        [121.817345, 42.1038430000001],
                                        [121.847345, 42.1038430000001],
                                        [121.851793242188, 42.0982900214844],
                                        [121.874058867188, 42.0804592109376],
                                        [121.882965117188, 42.008843],
                                        [121.881724882813, 41.998843],
                                        [121.883370390625, 41.9856056953125],
                                        [121.83468875, 41.9916616035156],
                                        [121.791793242188, 41.9793959785157],
                                        [121.777550078125, 41.9616091132813],
                                        [121.739615507813, 41.9470290351563],
                                        [121.697345, 41.9538430000001]
                                    ]
                                ],
                                [
                                    [
                                        [121.717345, 42.033843],
                                        [121.70470828125, 42.0107900214844],
                                        [121.677345, 42.0238430000001],
                                        [121.662584257813, 42.0303151679687],
                                        [121.652345, 42.0274379707032],
                                        [121.631851835938, 42.0331972480469],
                                        [121.622159453125, 41.9808119941406],
                                        [121.583912382813, 41.9673598457031],
                                        [121.633443632813, 41.9499404121094],
                                        [121.641246367188, 41.9377455878906],
                                        [121.657345, 41.933843],
                                        [121.652027617188, 41.9261440253906],
                                        [121.57494265625, 41.9022499824219],
                                        [121.569132109375, 41.9281728339844],
                                        [121.584605742188, 41.9388539863281],
                                        [121.52529421875, 41.9787917304688],
                                        [121.5858215625, 41.9883315253906],
                                        [121.581221953125, 42.008843],
                                        [121.583468046875, 42.018843],
                                        [121.578980742188, 42.038843],
                                        [121.585611601563, 42.0684169746094],
                                        [121.54422, 42.0920412421875],
                                        [121.57959109375, 42.11507346875],
                                        [121.6014465625, 42.0834206367188],
                                        [121.652198515625, 42.0676894355469],
                                        [121.691529570313, 42.0765065742187],
                                        [121.70142703125, 42.0379274726563],
                                        [121.717345, 42.033843]
                                    ]
                                ],
                                [
                                    [
                                        [121.817345, 42.1038430000001],
                                        [121.78170046875, 42.0894863105469],
                                        [121.767345, 42.0638430000001],
                                        [121.750474882813, 42.0754921699219],
                                        [121.753468046875, 42.088843],
                                        [121.74970828125, 42.1056130195313],
                                        [121.783912382813, 42.12788596875],
                                        [121.817345, 42.113843],
                                        [121.817345, 42.1038430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "新邱区" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [121.817345, 42.1038430000001],
                                        [121.827374296875, 42.0814516425782],
                                        [121.803057890625, 42.0367848945313],
                                        [121.771158476563, 42.0476552558594],
                                        [121.767345, 42.053843],
                                        [121.780152617188, 42.058843],
                                        [121.767345, 42.0638430000001],
                                        [121.78170046875, 42.0894863105469],
                                        [121.817345, 42.1038430000001]
                                    ]
                                ],
                                [
                                    [
                                        [121.817345, 42.1038430000001],
                                        [121.817345, 42.113843],
                                        [121.847345, 42.113843],
                                        [121.847345, 42.1038430000001],
                                        [121.817345, 42.1038430000001]
                                    ]
                                ]
                            ]
                        }
                    }, {
                        "type": "Feature",
                        "properties": { "name": "彰武县" },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [
                                [
                                    [
                                        [122.327345, 42.283843],
                                        [122.314537382813, 42.288843],
                                        [122.327345, 42.2938430000001],
                                        [122.327345, 42.283843]
                                    ]
                                ],
                                [
                                    [
                                        [122.327345, 42.283843],
                                        [122.340152617188, 42.288843],
                                        [122.327345, 42.2938430000001],
                                        [122.306158476563, 42.3184328437501],
                                        [122.26197390625, 42.3284706855469],
                                        [122.242623320313, 42.3392665839844],
                                        [122.232022734375, 42.3384157539063],
                                        [122.22271609375, 42.3492153144532],
                                        [122.211539335938, 42.358843],
                                        [122.223287382813, 42.3689614082031],
                                        [122.20197390625, 42.3784706855469],
                                        [122.19271609375, 42.3892153144532],
                                        [122.1719153125, 42.3984963203126],
                                        [122.1727746875, 42.4091664863282],
                                        [122.16197390625, 42.4184706855469],
                                        [122.151373320313, 42.4307741523437],
                                        [122.104586210938, 42.4270143867188],
                                        [122.069371367188, 42.4466616035156],
                                        [122.03838015625, 42.4961415839844],
                                        [121.94197390625, 42.5484706855469],
                                        [121.897345, 42.573843],
                                        [121.9052746875, 42.5940151191406],
                                        [121.900206328125, 42.6283315253907],
                                        [121.913160429688, 42.6383315253906],
                                        [121.911226835938, 42.6514028144532],
                                        [121.933160429688, 42.6683315253907],
                                        [121.931519804688, 42.6794203925782],
                                        [121.991265898438, 42.7012197089844],
                                        [122.015484648438, 42.6976406074219],
                                        [122.059400664063, 42.7241323066406],
                                        [122.071832304688, 42.7080287910157],
                                        [122.082345, 42.7095815253907],
                                        [122.100767851563, 42.7068593574219],
                                        [122.13170046875, 42.6881996894532],
                                        [122.19283328125, 42.6778151679687],
                                        [122.204361601563, 42.7059902167969],
                                        [122.197345, 42.723843],
                                        [122.222896757813, 42.7193959785156],
                                        [122.255972929688, 42.6999538398438],
                                        [122.321422148438, 42.6812416816407],
                                        [122.33205203125, 42.6679653144532],
                                        [122.3819934375, 42.6871620917969],
                                        [122.396236601563, 42.7049489570313],
                                        [122.441949492188, 42.7415529609375],
                                        [122.461793242188, 42.7718837714844],
                                        [122.427345, 42.7675991035156],
                                        [122.36687625, 42.7751210761719],
                                        [122.342896757813, 42.8278481269532],
                                        [122.419136992188, 42.8411159492187],
                                        [122.561226835938, 42.8233632636719],
                                        [122.574757109375, 42.7912538886719],
                                        [122.614039335938, 42.7746999335938],
                                        [122.710479765625, 42.7866957832032],
                                        [122.751236601563, 42.7627370429687],
                                        [122.782896757813, 42.7493959785157],
                                        [122.791793242188, 42.7382900214844],
                                        [122.83099734375, 42.7217690253907],
                                        [122.837345, 42.7138430000001],
                                        [122.78709109375, 42.7214870429688],
                                        [122.743468046875, 42.6825075507813],
                                        [122.774429960938, 42.668296125],
                                        [122.79209109375, 42.6485305],
                                        [122.802345, 42.6491408515626],
                                        [122.812345, 42.6485451484375],
                                        [122.823609648438, 42.6492165351563],
                                        [122.842061796875, 42.6285622382813],
                                        [122.852628203125, 42.6191237617188],
                                        [122.863101835938, 42.6073976875],
                                        [122.910220976563, 42.6102065253907],
                                        [122.9226575, 42.5990956855469],
                                        [122.92166140625, 42.5823696113281],
                                        [122.967345, 42.573843],
                                        [122.95197390625, 42.5474416328126],
                                        [122.912061796875, 42.5291237617188],
                                        [122.897877226563, 42.4982155585938],
                                        [122.81822390625, 42.5029628730469],
                                        [122.822642851563, 42.428843],
                                        [122.821715117188, 42.4133107734375],
                                        [122.856236601563, 42.3974672675782],
                                        [122.882061796875, 42.3685622382813],
                                        [122.902003203125, 42.3507436347657],
                                        [122.849268828125, 42.3384743476563],
                                        [122.793189726563, 42.3079994941406],
                                        [122.752061796875, 42.2891237617187],
                                        [122.747345, 42.283843],
                                        [122.729610625, 42.2783669257813],
                                        [122.672628203125, 42.2385622382813],
                                        [122.620787382813, 42.2288857246094],
                                        [122.600264921875, 42.2059206367188],
                                        [122.463199492188, 42.1487380195313],
                                        [122.432061796875, 42.1391237617187],
                                        [122.427345, 42.123843],
                                        [122.417345, 42.123843],
                                        [122.404425078125, 42.1998891425782],
                                        [122.38845828125, 42.1975295234376],
                                        [122.393824492188, 42.233843],
                                        [122.391607695313, 42.248843],
                                        [122.393170195313, 42.2594130683594],
                                        [122.37170046875, 42.2681996894532],
                                        [122.352735625, 42.2796401191407],
                                        [122.332857695313, 42.2767018867188],
                                        [122.327345, 42.283843]
                                    ]
                                ]
                            ]
                        }
                    }]
                };
            });

            provinces = {
                liao_ning: require("echarts/util/mapData/geoJson/liao_ning_geo"),
                shenyang: require("echarts/util/mapData/geoJson/shenyang"),
                dalian: require("echarts/util/mapData/geoJson/dalian"),
                anshan: require("echarts/util/mapData/geoJson/anshan"),
                benxi: require("echarts/util/mapData/geoJson/benxi"),
                fushun: require("echarts/util/mapData/geoJson/fushun"),
                tieling: require("echarts/util/mapData/geoJson/tieling"),
                panjin: require("echarts/util/mapData/geoJson/panjin"),
                dandong: require("echarts/util/mapData/geoJson/dandong"),
                jinzhou: require("echarts/util/mapData/geoJson/jinzhou"),
                yingkou: require("echarts/util/mapData/geoJson/yingkou"),
                fuxin: require("echarts/util/mapData/geoJson/fuxin"),
                liaoyang: require("echarts/util/mapData/geoJson/liaoyang"),
                chaoyang: require("echarts/util/mapData/geoJson/chaoyang"),
                huludao: require("echarts/util/mapData/geoJson/huludao"),
            };
        })();
        //  "沈阳市": "210100",
        //  "大连市": "210200",
        //  "鞍山市": "210300",
        //  "抚顺市": "210400",
        //  "本溪市": "210500",
        //  "丹东市": "210600",
        //  "锦州市": "210700",
        //  "营口市": "210800",
        //  "阜新市": "210900",
        //  "辽阳市": "211000",
        //  "盘锦市": "211100",
        //  "铁岭市": "211200",
        //  "朝阳市": "211300",
        //  "葫芦岛市": "211400",
        return provinces;

    });