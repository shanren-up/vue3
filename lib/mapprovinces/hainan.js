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



            define("echarts/util/mapData/geoJson/hai_nan_geo", [], function() {
                return {
                type : "FeatureCollection",
                features : [{
                        type : "Feature",
                        id : "469003",
                        properties : {
                            name : "儋州市",
                            cp : [109.3291, 19.5653],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@à®¼jpnr``pRVHÊÌ¤Zt^JÖA[CâlTébQhRPOhMBcRSQiROE[FYdGNOEIH]MgEAMLLIAG_WMCSL@ED]PCLYC[ZIHgjSxJTMbHNEFCMEE_HSDFHSLECRNSFDRICHNADGPI\\RZGIJTIAHLDQOHG`GTNCOIC@eIGDWHIS[kiE[FMbECZS@KKS[FDWsCeRuU_DUQNOE[LKGUBM¨EDQP@HWHGDImXCog_~I_fGDG|QDUWKBC\\ore|}[KLsISBHVXHCN`lNdQLOnFJSXcUEJMCKSHOUMDIm_DI`kNDIGEYFM\\YPEEIPMSGLIKOVAU_EBGQ@CIk`WGGDUM_XcIOLCJphHT_NCISG_R@V]\\OjSGAQSAKF]@q^mGFKSW^cQUC[]T}SGD@^_aRUTO@OHAT"],
                            encodeOffsets : [[111506, 20018]]
                        }
                    }, {
                        type : "Feature",
                        id : "469005",
                        properties : {
                            name : "文昌市",
                            cp : [110.8905, 19.7823],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@hĲ¤Ī¯LQDaFßL[VQìwGF~Z^Ab[¹ZYöpFº lN®D´INQQk]U[GSU©S_­c}aoSiA£cÅ¡©EiQeU­qWoESKSSOmwćõWkàmJMAAMMCWHGoM]gA[FGZLZCTURFNBncVOXCdGB@TSbk\\gDOKMNKWQHIvXDJ\\VDTXPERHJMFNj@OwX@LOTGzL^GHN^@RPHPE^KTDhhtBjZL[Pg@MNGLEdHV[HbRb@JHEV_NKLBRTPZhERHJcH^HDRlZJOPGdDJPOpXTETaV[GOZXTARQTRLBLWDa^QAF`ENUPBP\\Eji`yºEvåà"],
                            encodeOffsets : [[113115, 20665]]
                        }
                    }, {
                        type : "Feature",
                        id : "469033",
                        properties : {
                            name : "乐东黎族自治县",
                            cp : [109.0283, 18.6301],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@ªVLP`@PEdNRAHOPEAKHEVL`GZBJfvdTAXNNTZJFPrHHNpKTD\\ILHbEVd^JOHLh@NNBnHP`\\xH@NBRLJTlNv_^CTLd@bNDVFbxdFVUPBTKOGEOUO@OEBXQP[H_EI\\EbeYa@UO_JMEJ_IEDKJUGMDcNUd_FMTEJSGoZ]EIYGO[YWgEQ]a@WHEDQKUSDUGAbYBUpSCYNiWqOSQEoF[UcQISWWNMSDe_cLQ_UBiKQOOASQAWgS­ā]ZaSPÝZ]XMXS[^oVËNgNKlE RôEø"],
                            encodeOffsets : [[111263, 19164]]
                        }
                    }, {
                        type : "Feature",
                        id : "4602",
                        properties : {
                            name : "三亚市",
                            cp : [109.3716, 18.3698],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@®ĂhTBXTRPBRPjLVAR`dKf`TCNXMTXRJVdE\\FpTRrPjXZMTDVoZABaVHTCLVCRGF@X^bFRhZXP\\ZHHMA[^wBWXJlW¤EJ[bCTOFWWMm@ILMGWQ@DQ^QNWFSHEbF`OXNbOVNKTEPDTLTCCVTREfvfEHNbRAENH^RJXCFHNFRpVGHWISDOTMVCZeGamaLoLÛD¹¹ėgsia{OųETtlÉwr}jR±E{L}j]HąKÃT[P"],
                            encodeOffsets : [[111547, 18737]]
                        }
                    }, {
                        type : "Feature",
                        id : "469036",
                        properties : {
                            name : "琼中黎族苗族自治县",
                            cp : [109.8413, 19.0736],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@bRFnHNbHgN@NPEnbXP@bND`NT\\@\\QZb@`@J]V@XhDpWnCJGHGXO@CR§FANHVKLF\\MPVR`CvVfQtDPKpGHG@S`WJP~^dSTHWX\\RHTFACQTIAUPOU@MG__IaYSFQKNSbORHXCZeTFJgB`YBMNMFi~IVDV[tGJWXGDQRGF]JrALgESLSAYDGIaFeXQLS\\MKSLSQYJY}eKO[EHiGSaK[Yw[bmdURgEK^_kcSGEOHKIAS]aFSU@Y]IWFUTYlkP_CUOUEkmYbSQK@EMWUuAU\\M@EpK^_ZMDQ^OXwC_ZODBrERURGVVZ\\DTXcFWNIAWJWAYUUFYEWLQQaCIZeDM`cLKRGpanJZQd"],
                            encodeOffsets : [[112153, 19488]]
                        }
                    }, {
                        type : "Feature",
                        id : "469007",
                        properties : {
                            name : "东方市",
                            cp : [108.8498, 19.0414],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@ºxJYZQIYXLl@dR\\WZEn]bA\\S~F`KXaDeTiNO^EEKWEDQXITBXaWaDQMUJOIaTWf@NJV@dSxGZFu_@WMKAU}AQ@MwG_[GOAmMMg@GKP]IUcaFKG[JSCoLGMqGEOYIMSWMSBucIeYA_HUKGFBLOFGPQBcMOF_@KO©UAtERadwZQ\\@ÊJÒgòUĪRlR°KĮVLJ"],
                            encodeOffsets : [[111208, 19833]]
                        }
                    }, {
                        type : "Feature",
                        id : "4601",
                        properties : {
                            name : "海口市",
                            cp : [110.3893, 19.8516],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@ńZƂtĢ¬æßFuz¹j_Fi[AOVOFME_RBb]XCAKQKRSBQWSPY\\HbUFSWSPoIOcCOHIPkYCQ]GdGGIFQYgSOAQLK`MFUIGa@aQ\\GGUFcHKNMh@\\OYKAigsCgLSF]GOQO]@GM]HyKSHKPW@Pxi@EMINYREXWRQ@MQcFGWIAwXGRH\\yDI`KJIdOCGRNPNtd\\UTMbQYi@]JeYOWaL[EcICMUJqWGDNZEXGJWFEXNbZRELFV]XQbAZFrYVUBCLNFCHmJaMIDDHXHEhQNXZ_TARFHVB@DTQIRR@YHAJVnAbKFUEMLd\\c^ÍÞ"],
                            encodeOffsets : [[112711, 20572]]
                        }
                    }, {
                        type : "Feature",
                        id : "469006",
                        properties : {
                            name : "万宁市",
                            cp : [110.3137, 18.8388],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@^J@ZTVbET^JBGLFPTHld]`FLQhcVanx\\\\ZbLHTGj\\FLP~fIZRZPVTQFSVAFJE^NDLEE[~LjsxVTG\\NZZNGlLRRGLJTV@hPZANN^@T\\NEPPbDZXO`d^HSvcJDIV\\XZAJUFCLNP@PQ¤@[ïKLÑIÏ]ÇE±I{u­YśUćFcYUmsVeBSVgB[RO@aYYPO^]@UVaNeDShMLG\\EfFVE\\F`"],
                            encodeOffsets : [[112657, 19182]]
                        }
                    }, {
                        type : "Feature",
                        id : "469027",
                        properties : {
                            name : "澄迈县",
                            cp : [109.9937, 19.7314],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@T\\GJCXJH@fJDDPNCNJENN^NLHBNSx@DDYbBLLDRbjZTj@`XXTlG^Xr@PJLW\\WLTlWR@HDJTD@X_PO@STMDNTMVV@NLDM`M\\XM\\JNBH[PYZúYzŸ`Ċ\\ÎÝd]c[NKVFLEBaUmBIZGQ@JQSR@CUAEGBQ`SWYRMFgWGCGJCbNnIDGMEDKVAZUEqBYRa^WEUFKYQMaFWXEHIFWMYHCrXVIIiaK@aMCUYNSIISTwXALKH@XWXIEIJQCG[IEQDE_XSBaa[AIPW@]RS[FWS[CD]PEBYNGFSaSyJG]@ugEUDQlGHiBKHUIoNSKqHFaPMICK]UUHIPDJMuCA[SCPIDIOILGAEmU[POPBVSJDREBGS[QXWSGcT}]IO_X@TGHoHOLCX\\ELT@LYTDaFENF\\lj"],
                            encodeOffsets : [[112385, 19987]]
                        }
                    }, {
                        type : "Feature",
                        id : "469030",
                        properties : {
                            name : "白沙黎族自治县",
                            cp : [109.3703, 19.211],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@D\\RV]dTXELnHr]^@LETBBRTHPi^[@U`QTHDJ`MGSogDIPKdJ`WVNHCXHl_DJR@AH`FBVPUJLHKNTJOFFZON[ZEHFCJlMJ_Cn`CJVNGPLTNDFIdVTWEIPmRKMc_kDMWGGUTAtJLK~\\f{pqD[LAVXRCH{HC`eJ`}@W^U@I@_Ya[R[@MSC_aMO@aWFmMOM@haGGMEmaQ[@MESHaIQJQMckBIw[AOSKKAMPSDSLOAV_@@`KJRbKRDfMdHZERgAWVsDMTUHqOUr@VQXTT@TfgL^NH\\@heTCZaESNObHPHeZF\\X^ElM^F^"],
                            encodeOffsets : [[111665, 19890]]
                        }
                    }, {
                        type : "Feature",
                        id : "469002",
                        properties : {
                            name : "琼海市",
                            cp : [110.4208, 19.224],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@TP\\pATHTGlZDJGAQjE\\Rb@jVBDCN`JZ[NCNHNXbULPrP\\KNbMTLjJJRFP`pNLZz^FLRHjVPZ@hxVKbHBHMNNJFRlLzGPnNHhIrHHADcPWdUAmEMVQDSKYHY\\EhBN^HpXGNDBNNBnIßÅ_g{³So]Ã£@ORO@KMEDIVYB[WJUICudGTc]P_YWaCOOMFS[]@MMYBgOU@ISHKQQkKMHYY[MSHwUit}KF\\KFMCF]EIUBETSROUKTLT[NKTWREfJbCHBZKTFTKh"],
                            encodeOffsets : [[112763, 19595]]
                        }
                    }, {
                        type : "Feature",
                        id : "469031",
                        properties : {
                            name : "昌江黎族自治县",
                            cp : [109.0407, 19.2137],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@`ZĤd`òü BSPGP@VSbQ`@]HC~T^SE]N]FkW]E[fYGGOPaTMbFDYfS@g[MGK]he@SSSRW@UVqrPVGNStCXUhBFQGYNcCeLQQaLI@_`@EUwcEaCUaMc@SK]Du`MSkKI~BVNL@X`EvYwHcTU@MIe@SXJbIPNVCRXbWbSAWJCRXFFL]FMPSjCfWb_L}E[TaBm^YF[XcQk@WKZJYRIZw¹ "],
                            encodeOffsets : [[111208, 19833]]
                        }
                    }, {
                        type : "Feature",
                        id : "469028",
                        properties : {
                            name : "临高县",
                            cp : [109.6957, 19.8063],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@jD`hNd\\^dZädĒH´Op@ùZY\\OAGIMN[[W_NCNMKU@NUMSNCTSP@`O@WSCCI@GXQSkXKX[IK@OWqH]SkWW@_SiiYQaKCAKZaCCw@MTGAMKM]FMMIMDSM_HGHRPKCBGSJJIYH[QOJCHMBDGQJECMTDQKFGTCEGTF`NFEDMFaGSNwIiTGhYJD\\KZODC^@FTKND`XBHKJNKFBNhG^FJMPcHEZF\\QPRjQTAdgNOPgQaRSê"],
                            encodeOffsets : [[112122, 20431]]
                        }
                    }, {
                        type : "Feature",
                        id : "469034",
                        properties : {
                            name : "陵水黎族自治县",
                            cp : [109.9924, 18.5415],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@R]NC`YL]FoN@V[vBXVFNL@TRZalnVFVP`DlOZkVSXEE_F[EUFeH[NKTgfCbMVU^@P]ZObZP@\\QhATUfAtUasñiāEoI]eYǯ@aKmaeWuCºKÜKpnbHbYfUDSNCPJTRAHJTDJSfDNLHXC``VBNGTYCQDIXMDSP@xLNEFRNXBIpVNLXah@RgF@`qOML@LJNSPLbaHAh@Jdj"],
                            encodeOffsets : [[112409, 19261]]
                        }
                    }, {
                        type : "Feature",
                        id : "469026",
                        properties : {
                            name : "屯昌县",
                            cp : [110.0377, 19.362],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@\\OnVBFKHPJCJOJTDB\\vDINOCGJVVL^JDONEbrGTLpMVJLGjAHGRkVChF@vH^zIbTETMHAZOFC^\\DXT\\EffAP\\PdAV@UIYfS|S@YPICMeM@sC[_A]VQEwyHSMuNcAUlQJMVGMS@mVBZPFO\\CSFQK[LqDMACiUa@[QiFBRIHYCHkGSBS[oSOqBIE^QHCRWHIXsHU\\UC}JEjMNAN_ZAIhSEYfWDQGaPMTLERZTJb``NHV@"],
                            encodeOffsets : [[112513, 19852]]
                        }
                    }, {
                        type : "Feature",
                        id : "469025",
                        properties : {
                            name : "定安县",
                            cp : [110.3384, 19.4698],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@JjDNdJ\\FbKPXfZ^Ij@RZNaVSc[MsMOHQPDJcLIJ_zCG[HQxWJBHXdENRR@XQFWZQQGOFSWUCI[WCJuRGLXNMPLhCl[Ta@SqGgJMGOmyHkKEQMINMAGaGULgwY@UOGiKQ]EYyMKoO_QEIIKiNSMa[LqOKOaVMWMGMDY\\_IKrL\\ERT[DEPYOUA@nNTUHINkRBVMdNvGTxzRF^U`BD\\@tfNDNOJ@Z{TeTJZ@VUcB[OBOeeQT@^OXBJb\\AbWTF`RCJFH\\RDJIJFXW@WLGBKxWTSJJMTVZND@bbL"],
                            encodeOffsets : [[112903, 20139]]
                        }
                    }, {
                        type : "Feature",
                        id : "469035",
                        properties : {
                            name : "保亭黎族苗族自治县",
                            cp : [109.6284, 18.6108],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@FJp@fxpQ\\ApN\\GNPNBM`HLMrXLXj\\PEHnI@WUCEM\\GTc\\GZYHTPBHRCPTdH\\K\\@HXiBJILJJAVNTOZJNtFPC`YxDPWci@IBgbGKaTOIM@KNKrP@_hE@QbgKWUMJoWAQMFEKM@wTONCJWRCZDHSAM_UD_GWMKeCITSCGIQBGXUHQoMEEGWDQIG]FMQBMaFGueFeSQDUSDSKOCSFMLUaPWM_PaEGFETMX]RCRR@HXKN@JNnXXESPaDI\\£FkXWIAX]xB\\GN"],
                            encodeOffsets : [[112031, 19071]]
                        }
                    }, {
                        type : "Feature",
                        id : "469001",
                        properties : {
                            name : "五指山市",
                            cp : [109.5282, 18.8299],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@TCNOLBTLBPx\\AJdlNRRIbJTGNF\\@RcIYbmHoLQdKN_fCJYbDRRXKZFVEZVXBXIJBXMdESW[CUYHUVQFQAqsEIMPYMSBUIIJKAIjGW[@[LGScDOGQOAGSYZ[HSd[HFNVD@XmJFG[OWiWKNqGKN_MAMO[HoM[BoRewo@Y^HpITSFENc`MVCdHNIVCLJFI`NFIP`@VZbaf[FFJG`O\\WRFA@PVPFPPH"],
                            encodeOffsets : [[111973, 19401]]
                        }
                    }
                ],
                UTF8Encoding : !0
            };
            });
            define("echarts/util/mapData/geoJson/haikou", [], function() {
                return {"type": "FeatureCollection", "features": [{"type":"Feature","properties":{"name":"龙华区"},"geometry":{"type":"MultiPolygon","coordinates":[[[[110.407345,19.8438430000001],[110.410767851563,19.8560353828125],[110.419537382813,19.8472658515625],[110.407345,19.8438430000001]]],[[[110.407345,19.8438430000001],[110.403795195313,19.8156935859375],[110.390865507813,19.8220070625],[110.383985625,19.7572023750001],[110.369700957031,19.7392214179687],[110.377345,19.723843],[110.362584257813,19.7176442695313],[110.337345,19.723843],[110.331688261719,19.738559796875],[110.33388796875,19.7562526679688],[110.291790800781,19.7682888007813],[110.245599394531,19.8020314765625],[110.296317167969,19.8623561835938],[110.311790800781,19.9468532539063],[110.271658964844,19.9583278632813],[110.273448515625,19.9727150703125],[110.293023710938,19.9883913398438],[110.287345,20.0338430000001],[110.309488554688,20.0383132148438],[110.317345,20.053843],[110.345291777344,20.039829328125],[110.337345,20.023843],[110.331395292969,20.0192507148438],[110.343114042969,19.9790529609376],[110.341529570313,19.9683303046875],[110.38672,19.9334499335938],[110.374818144531,19.8529006171876],[110.407345,19.8438430000001]]]]}},{"type":"Feature","properties":{"name":"美兰区"},"geometry":{"type":"MultiPolygon","coordinates":[[[[110.587345,19.933843],[110.587345,19.943843],[110.600152617188,19.938843],[110.587345,19.933843]]],[[[110.627345,19.953843],[110.617345,19.953843],[110.617345,19.973843],[110.627345,19.973843],[110.627345,19.953843]]],[[[110.563922148438,20.0260353828125],[110.567345,20.013843],[110.555152617188,20.0172658515626],[110.563922148438,20.0260353828125]]],[[[110.587345,19.943843],[110.574537382813,19.938843],[110.587345,19.933843],[110.592074003906,19.9154201484375],[110.634449492188,19.9249196601563],[110.627345,19.953843],[110.66048953125,19.9309596992188],[110.674798613281,19.8847927070313],[110.671051054688,19.8680690742188],[110.705396757813,19.8552175117188],[110.692074003906,19.8032985664063],[110.655574980469,19.8114821601563],[110.641429472656,19.7897585273437],[110.637345,19.7738430000001],[110.627345,19.7738430000001],[110.627345,19.763843],[110.578131132813,19.7682204414062],[110.553416777344,19.8040163398438],[110.563616972656,19.8495143867188],[110.551429472656,19.8579274726563],[110.533260527344,19.8897585273438],[110.50490359375,19.9093361640626],[110.462957792969,19.9201003242188],[110.426998320313,19.9120388007813],[110.403260527344,19.9797585273438],[110.391429472656,19.9879274726563],[110.372938261719,20.0147096992188],[110.337345,20.023843],[110.345291777344,20.039829328125],[110.317345,20.053843],[110.30298953125,20.0649245429688],[110.347432890625,20.0881984687501],[110.38875125,20.0780739570313],[110.452225371094,20.0397878242187],[110.511468535156,20.0164968085938],[110.543436308594,20.0212209296875],[110.537391386719,19.9803151679688],[110.562345,19.9766262031251],[110.575267363281,20.0081984687501],[110.583128691406,19.9891481757813],[110.5794153125,19.9640138984375],[110.587345,19.943843]],[[110.555152617188,19.9472658515626],[110.567345,19.943843],[110.563922148438,19.9560353828125],[110.555152617188,19.9472658515626]]]]}},{"type":"Feature","properties":{"name":"琼山区"},"geometry":{"type":"MultiPolygon","coordinates":[[[[110.627345,19.763843],[110.627345,19.7738430000001],[110.637345,19.7738430000001],[110.637345,19.763843],[110.627345,19.763843]]],[[[110.627345,19.763843],[110.621102324219,19.7384279609376],[110.639454375,19.7102443671876],[110.609754667969,19.6991310859376],[110.624505644531,19.6597048164063],[110.665194121094,19.649262921875],[110.651429472656,19.6397585273438],[110.643260527344,19.6079274726563],[110.627789335938,19.5841677070313],[110.637200957031,19.5421828437501],[110.602623320313,19.5276589179687],[110.587345,19.5310842109376],[110.556849394531,19.5242482734375],[110.541124296875,19.5483962226563],[110.543660917969,19.559712140625],[110.507345,19.563843],[110.498509550781,19.5939528632813],[110.44255984375,19.5783107734375],[110.425494414063,19.5800514960938],[110.412806425781,19.6093044257813],[110.389249296875,19.6195217109376],[110.362806425781,19.6634596992188],[110.385286894531,19.7027077460938],[110.377345,19.723843],[110.369700957031,19.7392214179687],[110.383985625,19.7572023750001],[110.390865507813,19.8220070625],[110.403795195313,19.8156935859375],[110.407345,19.8438430000001],[110.419537382813,19.8472658515625],[110.410767851563,19.8560353828125],[110.407345,19.8438430000001],[110.374818144531,19.8529006171876],[110.38672,19.9334499335938],[110.341529570313,19.9683303046875],[110.343114042969,19.9790529609376],[110.331395292969,20.0192507148438],[110.337345,20.023843],[110.372938261719,20.0147096992188],[110.391429472656,19.9879274726563],[110.403260527344,19.9797585273438],[110.426998320313,19.9120388007813],[110.462957792969,19.9201003242188],[110.50490359375,19.9093361640626],[110.533260527344,19.8897585273438],[110.551429472656,19.8579274726563],[110.563616972656,19.8495143867188],[110.553416777344,19.8040163398438],[110.578131132813,19.7682204414062],[110.627345,19.763843]]]]}},{"type":"Feature","properties":{"name":"秀英区"},"geometry":{"type":"MultiPolygon","coordinates":[[[[110.147345,19.863843],[110.143922148438,19.8516506171875],[110.135152617188,19.8604201484376],[110.147345,19.863843]]],[[[110.147345,19.863843],[110.141600371094,19.8988088203125],[110.143084746094,19.908843],[110.141575957031,19.9190529609375],[110.157977324219,19.9753127265625],[110.127345,19.983843],[110.127345,20.0038430000001],[110.142899199219,20.0282888007813],[110.159752226563,20.0682888007813],[110.202899199219,20.0593971992188],[110.262569609375,20.0243190742188],[110.287345,20.0338430000001],[110.293023710938,19.9883913398438],[110.273448515625,19.9727150703125],[110.271658964844,19.9583278632813],[110.311790800781,19.9468532539063],[110.296317167969,19.8623561835938],[110.245599394531,19.8020314765625],[110.291790800781,19.7682888007813],[110.33388796875,19.7562526679688],[110.331688261719,19.738559796875],[110.337345,19.723843],[110.302777128906,19.6980397773438],[110.287345,19.7003200507813],[110.267838164063,19.6974391914062],[110.257345,19.683843],[110.221158476563,19.6876564765625],[110.207408476563,19.7279982734375],[110.217642851563,19.7608547187501],[110.201158476563,19.7976564765625],[110.193531523438,19.8400295234375],[110.168675566406,19.848501203125],[110.186824980469,19.8596828437501],[110.147345,19.863843]]]]}}]};
            });
            define("echarts/util/mapData/geoJson/sanya", [], function() {
                return {"type": "FeatureCollection", "features": [{"type":"Feature","properties":{"name":"三亚市"},"geometry":{"type":"MultiPolygon","coordinates":[[[[109.697345,18.2038430000001],[109.709537382813,18.2004201484375],[109.700767851563,18.1916506171876],[109.697345,18.2038430000001]]],[[[109.697345,18.2038430000001],[109.684537382813,18.2088430000001],[109.697345,18.2138430000001],[109.697345,18.2038430000001]]],[[[109.413922148438,18.2260353828126],[109.417345,18.2138430000001],[109.405152617188,18.2172658515625],[109.413922148438,18.2260353828126]]],[[[109.663922148438,18.2260353828126],[109.667345,18.2138430000001],[109.655152617188,18.2172658515625],[109.663922148438,18.2260353828126]]],[[[109.374195585938,18.2454567695313],[109.377345,18.223843],[109.355159941406,18.227075421875],[109.374195585938,18.2454567695313]]],[[[109.763922148438,18.3160353828125],[109.767345,18.303843],[109.755152617188,18.3072658515626],[109.763922148438,18.3160353828125]]],[[[109.697345,18.273843],[109.673924589844,18.2830495429688],[109.686263457031,18.25948753125],[109.713441191406,18.2699391914063],[109.72158328125,18.2572243476563],[109.741248808594,18.26274925],[109.726717558594,18.2162087226563],[109.712105742188,18.2203151679688],[109.697345,18.2138430000001],[109.685882597656,18.2276418281251],[109.666033964844,18.2383815742188],[109.609952421875,18.2173073554688],[109.614151640625,18.1761110664063],[109.581954375,18.1793923164063],[109.572345,18.1678249335938],[109.56107546875,18.1813893867188],[109.563834257813,18.2084523750001],[109.551883574219,18.2183815742188],[109.542345,18.2298610664063],[109.532735625,18.2182936835938],[109.511173125,18.2204909492188],[109.483192167969,18.1868044257813],[109.467513457031,18.2056764960938],[109.482806425781,18.2183815742188],[109.500089140625,18.2391872382813],[109.46763796875,18.2842775703125],[109.299469023438,18.3031374335937],[109.252345,18.2983327460938],[109.226346464844,18.3009841132813],[109.190477324219,18.287505109375],[109.159569121094,18.2906545234375],[109.134039335938,18.3495241523438],[109.122022734375,18.3483010078125],[109.077178984375,18.3739846015625],[108.991971464844,18.3582253242188],[108.977345,18.383843],[109.007674589844,18.4217189765625],[109.072039824219,18.4495021796875],[109.082703886719,18.4481764960938],[109.110716582031,18.46464378125],[109.188424101563,18.4549782539063],[109.180948515625,18.5150783515625],[109.205094023438,18.5548317695313],[109.249251738281,18.5603249335938],[109.262899199219,18.5493971992188],[109.271790800781,18.5382888007813],[109.282899199219,18.5293971992188],[109.298914824219,18.5093971992188],[109.314080839844,18.529887921875],[109.310985136719,18.5547707343751],[109.391790800781,18.6193971992188],[109.407345,18.6238430000001],[109.414549589844,18.5675392890625],[109.432667265625,18.5693849921875],[109.452022734375,18.5583010078126],[109.47634890625,18.5607790351562],[109.520692167969,18.5415480781251],[109.532955351563,18.508911359375],[109.521065703125,18.4663869453125],[109.522855253906,18.448843],[109.5203528125,18.4242995429688],[109.548199492188,18.39077659375],[109.632345,18.3993532539063],[109.6709778125,18.3954152656251],[109.691883574219,18.4293044257813],[109.702806425781,18.4383815742187],[109.716839628906,18.4861940742188],[109.752806425781,18.5083815742188],[109.767345,18.5258815742188],[109.777345,18.5138430000001],[109.76982546875,18.4959401679688],[109.811429472656,18.4672145820313],[109.793260527344,18.4379274726563],[109.781043730469,18.4294924140625],[109.787345,18.4038430000001],[109.753143339844,18.3774440742188],[109.718292265625,18.2922927070313],[109.70170046875,18.2794875312501],[109.697345,18.273843]],[[109.555159941406,18.2370754218751],[109.577345,18.233843],[109.574195585938,18.2554567695313],[109.555159941406,18.2370754218751]]]]}}]};
            });
            define("echarts/util/mapData/geoJson/sansha", [], function() {
                return {"type": "FeatureCollection", "features": [{"type":"Feature","properties":{"name":"南沙群岛"},"geometry":{"type":"MultiPolygon","coordinates":[[[[112.061041289063,3.86507346875002],[112.047345,3.83384299999999],[112.003441191406,3.83858909375],[112.012420683594,3.87464866406257],[112.035816679688,3.8812258125],[112.061041289063,3.86507346875002]]],[[[112.264371367188,3.87888206250006],[112.257345,3.86384300000001],[112.224405546875,3.8683791328125],[112.214715605469,3.89408225781253],[112.250242949219,3.90747581250007],[112.264371367188,3.87888206250006]]],[[[112.277345,3.943843],[112.247345,3.943843],[112.247345,3.97384300000002],[112.277345,3.97384300000002],[112.277345,3.943843]]],[[[112.9569153125,5.02345725781254],[112.937345,4.99384300000004],[112.903260527344,4.99921409375007],[112.91306765625,5.04788596875002],[112.949603300781,5.05607444531252],[112.9569153125,5.02345725781254]]],[[[112.723365507813,5.07902366406249],[112.707345,5.05384299999999],[112.642899199219,5.0590041328125],[112.653148222656,5.117075421875],[112.672791777344,5.11952171093752],[112.723365507813,5.07902366406249]]],[[[112.611798125,5.11230979687504],[112.597345,5.07384300000004],[112.552806425781,5.08177757031255],[112.568170195313,5.12837913281249],[112.611798125,5.11230979687504]]],[[[112.661790800781,5.3593947578125],[112.657345,5.353843],[112.602899199219,5.36065452343756],[112.617027617188,5.406313703125],[112.691790800781,5.41561546093753],[112.682310820313,5.37583030468753],[112.661790800781,5.3593947578125]]],[[[112.529407988281,5.49453147656255],[112.517345,5.46384300000001],[112.465477324219,5.47265647656253],[112.460282011719,5.50779807812502],[112.503873320313,5.514243390625],[112.529407988281,5.49453147656255]]],[[[112.641783476563,5.50375999218756],[112.617345,5.46384300000001],[112.612154570313,5.46865257031252],[112.602535429688,5.50903342968757],[112.574075957031,5.57831565625001],[112.601751738281,5.57941428906256],[112.641783476563,5.50375999218756]]],[[[112.387017851563,5.63370628125005],[112.377345,5.61384300000002],[112.343895292969,5.61818870312502],[112.360350371094,5.64729514843755],[112.387017851563,5.63370628125005]]],[[[112.551749296875,5.690805890625],[112.557345,5.623843],[112.523455839844,5.63002464062507],[112.518785429688,5.68815452343751],[112.551749296875,5.690805890625]]],[[[112.504608183594,5.76341331250005],[112.497345,5.73384300000001],[112.463260527344,5.73921409375004],[112.47865359375,5.77792503125],[112.504608183594,5.76341331250005]]],[[[112.567913847656,5.77900413281251],[112.557345,5.75384300000005],[112.523260527344,5.76258811718752],[112.532423125,5.81549827343752],[112.558426542969,5.8213283515625],[112.567913847656,5.77900413281251]]],[[[112.564989042969,5.96204612500001],[112.557345,5.94384300000005],[112.523260527344,5.95258811718752],[112.559315214844,5.98736350781252],[112.564989042969,5.96204612500001]]],[[[113.247345,6.29384300000003],[113.217345,6.29384300000003],[113.217345,6.32384300000005],[113.247345,6.32384300000005],[113.247345,6.29384300000003]]],[[[113.261073027344,6.36822288281257],[113.267345,6.33384300000003],[113.23271609375,6.34016135937502],[113.261073027344,6.36822288281257]]],[[[113.623599882813,6.9391506171875],[113.607345,6.91384300000001],[113.56298953125,6.92137717968752],[113.594158964844,6.96819846875],[113.623599882813,6.9391506171875]]],[[[114.85142703125,7.18976096875007],[114.847345,7.183843],[114.81326296875,7.19258811718756],[114.83959109375,7.24792503125004],[114.878443632813,7.23850120312507],[114.86326296875,7.19792503125007],[114.85142703125,7.18976096875007]]],[[[113.811065703125,7.380122296875],[113.807345,7.373843],[113.783624296875,7.37926780468751],[113.796409941406,7.41508811718749],[113.832742949219,7.42756370312504],[113.837327910156,7.38878928906249],[113.811065703125,7.380122296875]]],[[[115.000738554688,7.5366799140625],[115.007345,7.48384300000001],[114.952926054688,7.48915550000001],[114.949469023438,7.51697288281251],[115.000738554688,7.5366799140625]]],[[[109.903949003906,7.55581077343756],[109.952064238281,7.51282249218756],[109.927413359375,7.50741721875],[109.828453398438,7.52855979687505],[109.715850859375,7.51625999218749],[109.644840117188,7.47491721874999],[109.542625761719,7.34855979687502],[109.492064238281,7.30912620312502],[109.487345,7.30384299999999],[109.452625761719,7.31456565625001],[109.463526640625,7.34293479687501],[109.528939238281,7.45528831249999],[109.651033964844,7.56374046093752],[109.716217070313,7.59084983593755],[109.903949003906,7.55581077343756]]],[[[111.604901152344,7.58329612500001],[111.557345,7.52384300000001],[111.532899199219,7.53083030468757],[111.548023710938,7.59641624218753],[111.600748320313,7.61668479687504],[111.604901152344,7.58329612500001]]],[[[114.695513945313,7.5756740546875],[114.687345,7.56384300000001],[114.65326296875,7.57258811718756],[114.669693632813,7.60712913281253],[114.717867460938,7.61792503125006],[114.71326296875,7.58792503125004],[114.695513945313,7.5756740546875]]],[[[113.791429472656,7.59976096875],[113.787345,7.59384300000002],[113.753260527344,7.61737815625002],[113.761839628906,7.64088401562505],[113.814525175781,7.65269553906251],[113.841429472656,7.63411643750004],[113.813260527344,7.60792503125],[113.791429472656,7.59976096875]]],[[[111.752061796875,7.71020530468757],[111.697345,7.643843],[111.662535429688,7.65048850781257],[111.676214628906,7.70530784375007],[111.727857695313,7.7326320625],[111.752061796875,7.71020530468757]]],[[[110.510023222656,7.81816428906254],[110.487345,7.78384300000003],[110.453260527344,7.78921409375005],[110.46865359375,7.82792503125002],[110.510023222656,7.81816428906254]]],[[[111.613336210938,7.83150413281252],[111.577345,7.77384300000005],[111.553074980469,7.79475120312506],[111.551419707031,7.815356671875],[111.588253203125,7.85811057812506],[111.611051054688,7.85994651562504],[111.613336210938,7.83150413281252]]],[[[112.92130984375,7.87707542187505],[112.927345,7.833843],[112.882445097656,7.84011253125007],[112.92130984375,7.87707542187505]]],[[[111.720789824219,7.91961936718749],[111.707345,7.88384300000006],[111.652818632813,7.88928733593751],[111.632806425781,7.92422385937503],[111.68595828125,7.93837913281251],[111.720789824219,7.91961936718749]]],[[[109.99197390625,7.81921409375007],[109.987345,7.81384300000004],[109.93271609375,7.82099143750003],[109.942786894531,7.884341046875],[110.047337675781,7.95847190625002],[110.08197390625,7.94584007031251],[110.068678007813,7.86343772656254],[109.99197390625,7.81921409375007]]],[[[114.02197390625,7.53921409375002],[114.017345,7.53384300000008],[113.983214140625,7.54006858593751],[113.902984648438,7.57586936718754],[113.898092070313,7.6367726875],[113.93197390625,7.64921409375003],[113.998729277344,7.66438010937506],[114.05271609375,7.68847190625003],[114.109783964844,7.73567405468757],[114.161600371094,7.76458518750006],[114.199581328125,7.78153342968752],[114.246380644531,7.85625510937503],[114.38271609375,7.92847190625],[114.431629667969,7.96677757031249],[114.494459257813,7.97182639843749],[114.540128203125,7.95144553906256],[114.546597929688,7.870903546875],[114.433345976563,7.79996604687504],[114.41197390625,7.74921409375006],[114.395963164063,7.66144065625006],[114.357047148438,7.63972678906256],[114.25197390625,7.60921409375003],[114.124000273438,7.55476096875002],[114.02197390625,7.53921409375002]]],[[[114.919039335938,8.00431175000002],[114.907345,7.95384300000007],[114.86298953125,7.96137717968749],[114.8759778125,8.01819846875004],[114.919039335938,8.00431175000002]]],[[[113.962423125,7.98319358593757],[113.967345,7.94384300000001],[113.9046496875,7.95168479687506],[113.889613066406,8.01788108593756],[113.938460722656,8.0239553046875],[113.962423125,7.98319358593757]]],[[[110.632879667969,8.04646507031256],[110.637345,7.983843],[110.613355742188,7.98982932812503],[110.603350859375,8.02953635937506],[110.632879667969,8.04646507031256]]],[[[111.991429472656,8.04976096875002],[111.987345,8.04384300000004],[111.934852324219,8.05731467968757],[111.91896609375,8.08170921093753],[111.937069121094,8.10792503125008],[112.000965605469,8.09863792187503],[112.019967070313,8.06946311718754],[111.991429472656,8.04976096875002]]],[[[114.121073027344,8.11822288281249],[114.127345,8.08384300000004],[114.09271609375,8.09016135937503],[114.121073027344,8.11822288281249]]],[[[113.267345,8.13384300000001],[113.278658476563,8.10440940625007],[113.23072390625,8.06939475781249],[113.221278105469,8.07880393750006],[113.261790800781,8.12939475781253],[113.267345,8.13384300000001]]],[[[113.267345,8.13384300000001],[113.267345,8.14384300000007],[113.277345,8.14384300000007],[113.277345,8.13384300000001],[113.267345,8.13384300000001]]],[[[113.277345,8.14384300000007],[113.277345,8.16384300000003],[113.287345,8.16384300000003],[113.287345,8.14384300000007],[113.277345,8.14384300000007]]],[[[114.54170046875,8.10948753125004],[114.537345,8.10384299999999],[114.49298953125,8.1113771796875],[114.51963015625,8.13715842968751],[114.61064578125,8.16535667187507],[114.615162382813,8.13478050000004],[114.57298953125,8.11819846875007],[114.54170046875,8.10948753125004]]],[[[114.810191679688,8.15594260937504],[114.817345,8.11384300000006],[114.765064726563,8.11883323437502],[114.785264921875,8.16819846875005],[114.810191679688,8.15594260937504]]],[[[110.511883574219,8.07930686718755],[110.507345,8.07384300000006],[110.463814726563,8.07941428906251],[110.458846464844,8.12816428906252],[110.576619902344,8.17837913281249],[110.601883574219,8.16421897656253],[110.566900664063,8.10316428906249],[110.511883574219,8.07930686718755]]],[[[114.736773710938,8.20628928906254],[114.727345,8.18384300000007],[114.683892851563,8.18878440625003],[114.665982695313,8.21629417187507],[114.682960234375,8.22010276562505],[114.736773710938,8.20628928906254]]],[[[113.287345,8.16384300000003],[113.29197390625,8.17921409375003],[113.34271609375,8.23847190624999],[113.35318484375,8.31847190625007],[113.38197390625,8.29051780468756],[113.370025664063,8.21042991406257],[113.304686308594,8.11943382031254],[113.283851347656,8.11775901562507],[113.34197390625,8.19973167187506],[113.33197390625,8.19921409374999],[113.287345,8.16384300000003]]],[[[115.30408328125,8.34988303906256],[115.277345,8.31384300000003],[115.199542265625,8.33407737500002],[115.162896757813,8.36341819531249],[115.174835234375,8.39829124218751],[115.301749296875,8.36863303906256],[115.30408328125,8.34988303906256]]],[[[112.981248808594,8.43694358593753],[112.967345,8.403843],[112.933260527344,8.41258811718756],[112.950074492188,8.44792503124999],[112.981248808594,8.43694358593753]]],[[[115.5646496875,8.4935744453125],[115.557345,8.46384300000004],[115.513658476563,8.4688088203125],[115.49951296875,8.50249534375006],[115.5170715625,8.52792503124999],[115.559073515625,8.51844749218754],[115.5646496875,8.4935744453125]]],[[[115.282428007813,8.51279319531256],[115.287345,8.48384299999999],[115.24298953125,8.4913771796875],[115.260704375,8.52819846875001],[115.282428007813,8.51279319531256]]],[[[111.509407988281,8.54811057812505],[111.497345,8.52384299999999],[111.453985625,8.52781760937503],[111.488624296875,8.55720237500005],[111.509407988281,8.54811057812505]]],[[[111.926678496094,8.63492698437506],[111.937345,8.61384300000005],[111.903985625,8.61805198437503],[111.926678496094,8.63492698437506]]],[[[111.681429472656,8.62976096875],[111.677345,8.62384300000002],[111.643260527344,8.63258811718749],[111.656431914063,8.67639671093755],[111.696566191406,8.685395734375],[111.716864042969,8.65422385937501],[111.681429472656,8.62976096875]]],[[[114.2276965625,8.77838401562506],[114.250850859375,8.71948753125004],[114.23170046875,8.72819846875007],[114.215330839844,8.76819846875007],[114.21037234375,8.75629417187506],[114.217345,8.71384299999999],[114.194129667969,8.731762921875],[114.185789824219,8.78819846875002],[114.2276965625,8.77838401562506]]],[[[113.977230253906,8.8387502265625],[114.007345,8.79384300000007],[113.963658476563,8.79880882031253],[113.943260527344,8.84737815625],[113.977230253906,8.8387502265625]]],[[[112.207345,8.85384300000002],[112.24197390625,8.84752464062503],[112.213616972656,8.81946311718757],[112.207345,8.85384300000002]]],[[[112.636107207031,8.83770042187505],[112.627345,8.81384300000002],[112.543387480469,8.82085960156255],[112.540572539063,8.85588889843753],[112.591363554688,8.85997092968752],[112.61197390625,8.84847190624999],[112.636107207031,8.83770042187505]]],[[[114.059139433594,8.80384300000005],[114.047345,8.77384300000003],[114.033065214844,8.78486350781257],[114.014276152344,8.83077659374999],[113.983748808594,8.8543361640625],[113.978746367188,8.88819846875005],[114.040928984375,8.85016135937503],[114.059139433594,8.80384300000005]]],[[[113.933587675781,8.86925803906257],[113.927345,8.84384300000004],[113.894964628906,8.85215354687507],[113.889705839844,8.87561057812499],[113.917613554688,8.89378440625007],[113.933587675781,8.86925803906257]]],[[[112.207345,8.85384300000002],[112.173441191406,8.85891135937506],[112.200933867188,8.89774436718755],[112.2243371875,8.88962913281256],[112.207345,8.85384300000002]]],[[[112.288472929688,8.88033714062505],[112.277345,8.85384300000002],[112.243260527344,8.86258811718749],[112.260074492188,8.89792503125001],[112.288472929688,8.88033714062505]]],[[[114.621158476563,8.84002952343751],[114.617345,8.83384300000007],[114.593531523438,8.8394533515625],[114.60970828125,8.88311057812507],[114.669556914063,8.90279319531254],[114.67802859375,8.87559592968751],[114.643531523438,8.84765647656257],[114.621158476563,8.84002952343751]]],[[[116.30142703125,8.87976096875004],[116.297345,8.863843],[116.26326296875,8.87258811718755],[116.274156523438,8.89548362500005],[116.319796171875,8.92520530468749],[116.326158476563,8.89683128125002],[116.30142703125,8.87976096875004]]],[[[112.872899199219,8.90939475781249],[112.877345,8.89384300000001],[112.812899199219,8.90190452343752],[112.826314726563,8.92829124218752],[112.872899199219,8.90939475781249]]],[[[112.382159453125,8.94761253125006],[112.387345,8.91384300000006],[112.343643828125,8.91869163281255],[112.339090605469,8.93676292187505],[112.382159453125,8.94761253125006]]],[[[113.66170046875,8.96948753124999],[113.657345,8.96384300000003],[113.63298953125,8.97062522656253],[113.643101835938,8.99251975781249],[113.720972929688,9.02313010937505],[113.723206816406,9.00801780468758],[113.68298953125,8.97819846875002],[113.66170046875,8.96948753124999]]],[[[116.747701445313,9.06681663281249],[116.737345,9.02384300000007],[116.703233671875,9.02935569531257],[116.697779570313,9.05695335156253],[116.747701445313,9.06681663281249]]],[[[116.500230742188,9.18731956250006],[116.487345,9.13384300000008],[116.454737578125,9.15174339062505],[116.449678984375,9.17732932812502],[116.500230742188,9.18731956250006]]],[[[113.690987578125,9.23632346875007],[113.677345,9.203843],[113.653260527344,9.22047385937507],[113.664888945313,9.24792503124999],[113.690987578125,9.23632346875007]]],[[[111.547157011719,9.28771995312502],[111.537345,9.26384300000004],[111.513170195313,9.27021995312506],[111.547157011719,9.28771995312502]]],[[[115.997613554688,9.29677268750003],[115.987345,9.27384300000002],[115.9273059375,9.27791526562499],[115.916573515625,9.31237327343752],[115.965636015625,9.32765647656252],[115.997613554688,9.29677268750003]]],[[[111.731065703125,9.34650901562501],[111.717345,9.31384300000001],[111.693260527344,9.32002464062499],[111.731065703125,9.34650901562501]]],[[[114.199720488281,9.36874046093749],[114.187345,9.34384300000003],[114.170445585938,9.34725608593755],[114.155374785156,9.37811546093753],[114.187484160156,9.39379417187499],[114.199720488281,9.36874046093749]]],[[[115.470836210938,9.35596214062503],[115.457345,9.32384299999999],[115.427345,9.33154319531257],[115.41791140625,9.37362815625006],[115.434483671875,9.41792503125004],[115.459371367188,9.40709983593754],[115.470836210938,9.35596214062503]]],[[[116.984210234375,9.44906760937506],[116.967345,9.41384300000005],[116.903531523438,9.41817405468756],[116.912081328125,9.4538869453125],[116.967926054688,9.47225608593753],[116.984210234375,9.44906760937506]]],[[[112.881065703125,9.56650901562503],[112.867345,9.53384300000003],[112.843260527344,9.54002464062501],[112.881065703125,9.56650901562503]]],[[[112.56193484375,9.55709983593755],[112.567345,9.51384299999999],[112.502899199219,9.5219045234375],[112.517904082031,9.56829124218753],[112.56193484375,9.55709983593755]]],[[[112.894837675781,9.59666038281254],[112.907345,9.57384300000003],[112.883804960938,9.57890647656251],[112.894837675781,9.59666038281254]]],[[[116.196939726563,9.58667991406251],[116.187345,9.56384300000005],[116.153385039063,9.56919456250004],[116.146944609375,9.59792503125007],[116.196939726563,9.58667991406251]]],[[[112.961910429688,9.64653831250008],[112.967345,9.63384300000007],[112.944346953125,9.637895734375],[112.961910429688,9.64653831250008]]],[[[113.007345,9.65384300000002],[113.019537382813,9.65042014843757],[113.010767851563,9.6416506171875],[113.007345,9.65384300000002]]],[[[113.007345,9.65384300000002],[112.995152617188,9.65726585156256],[113.003922148438,9.66603538281253],[113.007345,9.65384300000002]]],[[[112.981910429688,9.66653831250003],[112.987345,9.65384300000002],[112.964346953125,9.65789573437505],[112.981910429688,9.66653831250003]]],[[[113.031658964844,9.68730979687503],[113.037345,9.65384300000002],[113.01298953125,9.67264182812503],[113.031658964844,9.68730979687503]]],[[[114.301500273438,9.72239280468749],[114.287345,9.68384300000004],[114.253123808594,9.69414573437501],[114.251180449219,9.71834983593757],[114.301500273438,9.72239280468749]]],[[[116.603922148438,9.73603538281255],[116.607345,9.72384300000003],[116.595152617188,9.72726585156249],[116.603922148438,9.73603538281255]]],[[[114.72047,9.73252952343756],[114.707345,9.70384299999999],[114.673624296875,9.70861839062506],[114.687105742188,9.74756370312505],[114.72047,9.73252952343756]]],[[[114.354195585938,9.76545921093756],[114.357345,9.74384300000008],[114.335159941406,9.74707542187504],[114.354195585938,9.76545921093756]]],[[[116.533922148438,9.76603538281257],[116.537345,9.75384300000005],[116.525152617188,9.7572658515625],[116.533922148438,9.76603538281257]]],[[[114.262545195313,9.766157453125],[114.267345,9.74384300000008],[114.243804960938,9.75674827343752],[114.262545195313,9.766157453125]]],[[[116.579307890625,9.76789573437506],[116.587345,9.72384300000003],[116.54271609375,9.74957542187504],[116.579307890625,9.76789573437506]]],[[[114.392545195313,9.78615745312505],[114.397345,9.76384300000003],[114.373804960938,9.77674827343757],[114.392545195313,9.78615745312505]]],[[[115.908814726563,9.7009914375],[115.887345,9.65384300000002],[115.86170046875,9.65819846875004],[115.85298953125,9.68948753125],[115.83877078125,9.71305686718752],[115.85568484375,9.773794171875],[115.896143828125,9.79819846875007],[115.92170046875,9.78498069531252],[115.908814726563,9.7009914375]]],[[[116.447345,9.76384300000003],[116.427345,9.76384300000003],[116.427345,9.80384300000003],[116.447345,9.80384300000003],[116.447345,9.76384300000003]]],[[[114.467345,9.813843],[114.454439726563,9.79030296093754],[114.445030546875,9.80904319531252],[114.467345,9.813843]]],[[[116.505855742188,9.80549827343754],[116.497345,9.78384300000007],[116.47435671875,9.79024436718751],[116.468746367188,9.82819846875],[116.505855742188,9.80549827343754]]],[[[114.467345,9.813843],[114.470577421875,9.83603050000003],[114.488961210938,9.81699241406252],[114.467345,9.813843]]],[[[114.263338652344,9.83656760937505],[114.267345,9.813843],[114.254346953125,9.81940452343752],[114.263338652344,9.83656760937505]]],[[[114.277345,9.853843],[114.273922148438,9.84165061718757],[114.265152617188,9.85042014843755],[114.277345,9.853843]]],[[[114.498599882813,9.85791038281251],[114.507345,9.82384300000007],[114.48326296875,9.84047385937505],[114.498599882813,9.85791038281251]]],[[[114.537345,9.87384300000004],[114.534112578125,9.85165550000001],[114.515728789063,9.87069358593752],[114.537345,9.87384300000004]]],[[[114.277345,9.853843],[114.290247832031,9.87738303906255],[114.299659453125,9.85864280468757],[114.277345,9.853843]]],[[[114.591910429688,9.88653831250005],[114.597345,9.87384300000004],[114.574346953125,9.87789573437507],[114.591910429688,9.88653831250005]]],[[[114.380501738281,9.88778342968754],[114.387345,9.86384300000006],[114.362899199219,9.87083030468753],[114.380501738281,9.88778342968754]]],[[[114.333338652344,9.896567609375],[114.337345,9.87384300000004],[114.324346953125,9.87940452343755],[114.333338652344,9.896567609375]]],[[[114.537345,9.87384300000004],[114.542769804688,9.89756370312506],[114.5705090625,9.87854026562504],[114.537345,9.87384300000004]]],[[[114.448961210938,9.89766135937499],[114.467345,9.87384300000004],[114.43298953125,9.87967796093749],[114.448961210938,9.89766135937499]]],[[[115.592042265625,9.88480491406255],[115.577345,9.84384300000002],[115.502628203125,9.85021995312504],[115.514229765625,9.89806175],[115.557530546875,9.90063987500006],[115.592042265625,9.88480491406255]]],[[[114.48334109375,9.90656760937506],[114.487345,9.88384300000002],[114.474346953125,9.88940452343753],[114.48334109375,9.90656760937506]]],[[[114.514195585938,9.92545921093754],[114.517345,9.90384300000006],[114.4951575,9.90707542187502],[114.514195585938,9.92545921093754]]],[[[114.564195585938,9.95545921093756],[114.567345,9.93384299999999],[114.5451575,9.93707542187504],[114.564195585938,9.95545921093756]]],[[[114.58334109375,9.96656760937501],[114.587345,9.94384300000005],[114.574346953125,9.94940452343757],[114.58334109375,9.96656760937501]]],[[[114.651612578125,9.919575421875],[114.647345,9.91384300000004],[114.628546171875,9.92782737499999],[114.61998171875,9.97757346875007],[114.681163359375,9.98811057812507],[114.670089140625,9.93332542187501],[114.651612578125,9.919575421875]]],[[[114.040501738281,10.0377834296875],[114.047345,10.0138430000001],[114.022899199219,10.0208303046875],[114.040501738281,10.0377834296875]]],[[[113.880699492188,10.0078127265625],[113.867345,9.97384300000007],[113.84298953125,9.98062522656257],[113.862147246094,10.0880763984375],[113.90170046875,10.093921125],[113.880699492188,10.0078127265625]]],[[[117.3911340625,10.0974025703125],[117.377345,10.063843],[117.343170195313,10.06937034375],[117.353819609375,10.1080178046875],[117.3911340625,10.0974025703125]]],[[[116.090543242188,10.1020900703125],[116.077345,10.073843],[116.054176054688,10.0789846015626],[116.0437121875,10.106743390625],[116.077745390625,10.1360402656251],[116.090543242188,10.1020900703125]]],[[[114.274556914063,10.164966046875],[114.267345,10.1338430000001],[114.22298953125,10.1413771796876],[114.240704375,10.1781984687501],[114.274556914063,10.164966046875]]],[[[114.361910429688,10.1965383125],[114.367345,10.183843],[114.344346953125,10.1878957343751],[114.361910429688,10.1965383125]]],[[[114.341136503906,10.1874025703125],[114.327345,10.153843],[114.293170195313,10.15937034375],[114.303822050781,10.1980178046876],[114.341136503906,10.1874025703125]]],[[[115.311158476563,10.1500295234376],[115.307345,10.143843],[115.28797,10.1557814765626],[115.2798840625,10.1817385078125],[115.295855742188,10.2076564765625],[115.331065703125,10.1979543281251],[115.340382109375,10.1680373359376],[115.311158476563,10.1500295234376]]],[[[114.223338652344,10.226567609375],[114.227345,10.2038430000001],[114.214346953125,10.2094045234375],[114.223338652344,10.226567609375]]],[[[114.391429472656,10.18976096875],[114.387345,10.183843],[114.373260527344,10.1935695625001],[114.38177859375,10.2104494453126],[114.423973417969,10.23792503125],[114.423111601563,10.2016115546875],[114.391429472656,10.18976096875]]],[[[115.387345,10.213843],[115.357345,10.213843],[115.357345,10.2438430000001],[115.387345,10.2438430000001],[115.387345,10.213843]]],[[[113.623595,10.2545070625001],[113.627345,10.223843],[113.605367460938,10.2281349921875],[113.594075957031,10.2494533515625],[113.623595,10.2545070625001]]],[[[114.571881132813,10.2493068671876],[114.567345,10.2438430000001],[114.532808867188,10.24999534375],[114.549527617188,10.2671486640625],[114.60603640625,10.2883791328125],[114.630928984375,10.2749123359376],[114.571881132813,10.2493068671876]]],[[[114.276419707031,10.2547658515625],[114.267345,10.2438430000001],[114.232806425781,10.24999534375],[114.305697050781,10.3083791328125],[114.319600859375,10.2906349921876],[114.276419707031,10.2547658515625]]],[[[117.297662382813,10.3466701484375],[117.287345,10.303843],[117.253170195313,10.3128615546875],[117.26568484375,10.3680178046875],[117.297662382813,10.3466701484375]]],[[[114.710797148438,10.3203908515625],[114.707345,10.313843],[114.683892851563,10.326196515625],[114.691871367188,10.3657228828125],[114.719698515625,10.3872951484375],[114.747603789063,10.3737306953125],[114.723892851563,10.3272951484376],[114.710797148438,10.3203908515625]]],[[[114.364195585938,10.3954592109375],[114.367345,10.373843],[114.345159941406,10.377075421875],[114.364195585938,10.3954592109375]]],[[[114.413922148438,10.3960353828125],[114.417345,10.383843],[114.405152617188,10.3872658515625],[114.413922148438,10.3960353828125]]],[[[114.47334109375,10.3965676093751],[114.477345,10.373843],[114.464346953125,10.3794045234375],[114.47334109375,10.3965676093751]]],[[[114.586553984375,10.4272658515625],[114.577345,10.403843],[114.56298953125,10.4149221015625],[114.586553984375,10.4272658515625]]],[[[116.502535429688,10.3550539375],[116.528546171875,10.346567609375],[116.642154570313,10.3635060859375],[116.632003203125,10.3372805000001],[116.572154570313,10.3090334296875],[116.567345,10.303843],[116.452535429688,10.3103224921875],[116.468136015625,10.3731154609375],[116.519595976563,10.4286525703125],[116.541812773438,10.412134015625],[116.502535429688,10.3550539375]]],[[[115.732647734375,10.4770070625001],[115.737345,10.443843],[115.713624296875,10.4492678046875],[115.732647734375,10.4770070625001]]],[[[115.782061796875,10.439126203125],[115.777345,10.4338430000001],[115.752628203125,10.4559279609375],[115.768814726563,10.478559796875],[115.801334257813,10.456343],[115.782061796875,10.439126203125]]],[[[116.862022734375,10.5076174140625],[116.867345,10.4738430000001],[116.82326296875,10.4788576484375],[116.862022734375,10.5076174140625]]],[[[115.717345,10.483843],[115.697345,10.483843],[115.697345,10.5138430000001],[115.717345,10.5138430000001],[115.717345,10.483843]]],[[[116.699288359375,10.5206056953125],[116.707345,10.493843],[116.63271609375,10.5000783515626],[116.6527746875,10.520014875],[116.672345,10.518442609375],[116.699288359375,10.5206056953125]]],[[[115.803726835938,10.5190383125],[115.797345,10.503843],[115.76326296875,10.52737815625],[115.787530546875,10.5439162421875],[115.803726835938,10.5190383125]]],[[[115.742076445313,10.536880109375],[115.747345,10.5138430000001],[115.723941679688,10.5191945625],[115.71420046875,10.5475637031251],[115.742076445313,10.536880109375]]],[[[117.20002078125,10.6123781562501],[117.207345,10.5838430000001],[117.173385039063,10.5891945625001],[117.164703398438,10.6279250312501],[117.20002078125,10.6123781562501]]],[[[117.664171171875,10.6493068671875],[117.647345,10.6238430000001],[117.62326296875,10.630024640625],[117.646676054688,10.65792503125],[117.664171171875,10.6493068671875]]],[[[114.497345,10.723843],[114.493922148438,10.7116506171875],[114.485152617188,10.7204201484376],[114.497345,10.723843]]],[[[115.813595,10.7445070625001],[115.817345,10.713843],[115.795367460938,10.7181349921876],[115.784078398438,10.7394533515625],[115.813595,10.7445070625001]]],[[[117.211451445313,10.73745628125],[117.217345,10.713843],[117.1835559375,10.7190334296875],[117.176300078125,10.7478371406251],[117.211451445313,10.73745628125]]],[[[117.414483671875,10.69526878125],[117.407345,10.6638430000001],[117.382896757813,10.6693947578126],[117.2730090625,10.6885207343751],[117.269605742188,10.715884015625],[117.31396609375,10.7482912421875],[117.399039335938,10.7354494453125],[117.414483671875,10.69526878125]]],[[[114.573922148438,10.7860353828125],[114.577345,10.773843],[114.565152617188,10.7772658515625],[114.573922148438,10.7860353828125]]],[[[114.365867949219,10.7236476875001],[114.357345,10.693843],[114.312899199219,10.6994045234375],[114.321790800781,10.7393947578126],[114.352899199219,10.7482912421875],[114.451119414063,10.79370628125],[114.453233671875,10.77671409375],[114.365867949219,10.7236476875001]]],[[[114.497345,10.723843],[114.509815703125,10.7642238593751],[114.540494414063,10.7985597968751],[114.562061796875,10.7817824531251],[114.524293242188,10.7288722968751],[114.497345,10.723843]]],[[[114.860499296875,10.8377834296875],[114.867345,10.8138430000001],[114.842896757813,10.8208303046875],[114.860499296875,10.8377834296875]]],[[[115.841417265625,10.827602765625],[115.847345,10.803843],[115.823365507813,10.8098244453126],[115.804659453125,10.837837140625],[115.841417265625,10.827602765625]]],[[[117.82298953125,10.7881984687501],[117.797345,10.753843],[117.76298953125,10.7596779609376],[117.774029570313,10.8227931953125],[117.816143828125,10.84819846875],[117.837730742188,10.8242189765626],[117.82298953125,10.7881984687501]]],[[[115.85072390625,10.857915265625],[115.867345,10.833843],[115.83326296875,10.8425881171875],[115.85072390625,10.857915265625]]],[[[114.59408328125,10.886801984375],[114.57728640625,10.8295607734375],[114.526964140625,10.8583791328125],[114.511881132813,10.8493068671875],[114.498267851563,10.8329201484376],[114.481881132813,10.8193068671876],[114.477345,10.8138430000001],[114.462808867188,10.8259181953125],[114.483228789063,10.8560451484375],[114.565025664063,10.9075881171875],[114.591685820313,10.9103029609375],[114.59408328125,10.886801984375]]],[[[114.941246367188,10.8599416328125],[114.937345,10.843843],[114.903443632813,10.848911359375],[114.913155546875,10.8875148750001],[114.951026640625,10.9177443671875],[114.960299101563,10.887759015625],[114.941246367188,10.8599416328125]]],[[[114.130636015625,10.9035109687501],[114.117345,10.873843],[114.053531523438,10.8781740546875],[114.066546660156,10.9154787421875],[114.105638457031,10.9276564765625],[114.130636015625,10.9035109687501]]],[[[114.193922148438,11.0360353828125],[114.197345,11.023843],[114.185152617188,11.0272658515626],[114.193922148438,11.0360353828125]]],[[[114.283922148438,11.0460353828125],[114.287345,11.033843],[114.275152617188,11.0372658515625],[114.283922148438,11.0460353828125]]],[[[114.231910429688,11.0565383125],[114.237345,11.0438430000001],[114.214346953125,11.047895734375],[114.231910429688,11.0565383125]]],[[[117.70041140625,11.044946515625],[117.687345,11.013843],[117.64326296875,11.0251564765626],[117.654141875,11.05792503125],[117.70041140625,11.044946515625]]],[[[114.263922148438,11.0660353828126],[114.267345,11.053843],[114.255152617188,11.0572658515625],[114.263922148438,11.0660353828126]]],[[[117.040704375,11.040483625],[117.037345,11.033843],[117.030396757813,11.037358625],[117.019830351563,11.0589894843751],[117.0341028125,11.087202375],[117.070704375,11.0789748359375],[117.063985625,11.047202375],[117.040704375,11.040483625]]],[[[117.310094023438,11.0511281562501],[117.297345,11.023843],[117.27470828125,11.0288625312501],[117.2537121875,11.0573146796875],[117.289625273438,11.0874758125],[117.310094023438,11.0511281562501]]],[[[114.36170046875,11.03948753125],[114.357345,11.033843],[114.31298953125,11.0413771796875],[114.360553007813,11.08819846875],[114.380845976563,11.07397971875],[114.383463164063,11.05628440625],[114.36170046875,11.03948753125]]],[[[115.039781523438,11.08851096875],[115.027345,11.053843],[115.002628203125,11.0759279609375],[115.039781523438,11.08851096875]]],[[[117.479307890625,11.0879055],[117.467345,11.063843],[117.443985625,11.0685597968751],[117.460123320313,11.097202375],[117.479307890625,11.0879055]]],[[[114.711881132813,11.0093068671876],[114.707345,11.0038430000001],[114.692808867188,11.0159181953125],[114.761324492188,11.1183791328126],[114.801881132813,11.10124534375],[114.787037382813,11.0802004218751],[114.745494414063,11.0456935859375],[114.722808867188,11.0183791328125],[114.711881132813,11.0093068671876]]],[[[114.819410429688,11.14952659375],[114.827345,11.133843],[114.785347929688,11.1376955390626],[114.7758215625,11.157202375],[114.819410429688,11.14952659375]]],[[[114.578961210938,11.337661359375],[114.597345,11.3138430000001],[114.56298953125,11.3196779609375],[114.578961210938,11.337661359375]]],[[[114.293338652344,11.3965676093751],[114.297345,11.373843],[114.284346953125,11.3794045234375],[114.293338652344,11.3965676093751]]],[[[114.331910429688,11.4365383125],[114.337345,11.4238430000001],[114.314346953125,11.427895734375],[114.331910429688,11.4365383125]]],[[[114.367157011719,11.467719953125],[114.357345,11.443843],[114.333170195313,11.450219953125],[114.367157011719,11.467719953125]]],[[[114.383338652344,11.476567609375],[114.387345,11.453843],[114.374346953125,11.4594045234375],[114.383338652344,11.476567609375]]],[[[114.7348840625,11.45452659375],[114.727345,11.4238430000001],[114.688863554688,11.4447560859375],[114.67724734375,11.496577375],[114.718951445313,11.5059279609376],[114.7348840625,11.45452659375]]],[[[114.641881132813,11.4193068671875],[114.637345,11.413843],[114.612808867188,11.4210451484375],[114.634869414063,11.5383791328126],[114.653990507813,11.5180471015626],[114.641881132813,11.4193068671875]]],[[[117.286768828125,11.6049025703126],[117.23295046875,11.5364601875],[117.167159453125,11.4911916328125],[117.044722929688,11.4239748359375],[117.022154570313,11.3690334296875],[117.01048953125,11.28368675],[116.955303984375,11.1793947578125],[117.002061796875,11.0910353828125],[117.00400515625,11.0419045234375],[116.978995390625,11.0031642890626],[116.88923953125,10.920005109375],[116.844058867188,10.850044171875],[116.802916289063,10.8282717109375],[116.742154570313,10.8090334296876],[116.676949492188,10.7590334296875],[116.643033476563,10.772192609375],[116.630972929688,10.9983010078125],[116.555440703125,11.0012941718751],[116.492916289063,10.9582717109375],[116.419132109375,10.9106252265625],[116.35189578125,10.8251174140625],[116.28672,10.764731671875],[116.262154570313,10.7290334296876],[116.221671171875,10.6571193671875],[116.202154570313,10.6390334296875],[116.197345,10.633843],[116.162535429688,10.6448635078125],[116.172633085938,10.7332228828125],[116.209923125,10.8289894843751],[116.3119934375,11.00495628125],[116.315987578125,11.1057131171875],[116.262633085938,11.1466310859375],[116.11474734375,11.1818556953125],[116.023062773438,11.2357570625],[116.019908476563,11.3153615546876],[116.08047,11.4142726875001],[116.160719023438,11.58431175],[116.218214140625,11.64636253125],[116.278150664063,11.6780812812501],[116.318858671875,11.6796974921875],[116.376886015625,11.66132346875],[116.507135039063,11.5590334296875],[116.58422,11.57241721875],[116.640343046875,11.6244191718751],[116.774146757813,11.8828762031251],[116.818941679688,11.9137013984375],[117.01798953125,11.897798078125],[117.062535429688,11.8690334296875],[117.202154570313,11.7586525703125],[117.281529570313,11.7004299140625],[117.302154570313,11.6415920234375],[117.286768828125,11.6049025703126]]]]}},{"type":"Feature","properties":{"name":"中沙群岛的岛礁及其海域"},"geometry":{"type":"MultiPolygon","coordinates":[[[[115.411881132813,13.9293044257813],[115.407345,13.923843],[115.363057890625,13.9368386054687],[115.36107546875,13.9562966132813],[115.37818484375,13.976889875],[115.409796171875,13.9801125312501],[115.441422148438,13.953843],[115.411881132813,13.9293044257813]]],[[[117.806969023438,15.1194484687501],[117.817345,15.103843],[117.713780546875,15.1081520820313],[117.704263945313,15.1459181953125],[117.731339140625,15.1278371406251],[117.806969023438,15.1194484687501]]],[[[117.767345,15.193843],[117.84197390625,15.160649640625],[117.830064726563,15.1449782539063],[117.77197390625,15.1784719062501],[117.767345,15.193843]]],[[[117.767345,15.193843],[117.725211210938,15.2241432929688],[117.710850859375,15.150571515625],[117.7124621875,15.229555890625],[117.756046171875,15.2286647773438],[117.767345,15.193843]]],[[[113.995035429688,15.4379201484375],[114.017345,15.413843],[113.972535429688,15.4223976875],[113.995035429688,15.4379201484375]]],[[[114.24795046875,15.467583234375],[114.257345,15.433843],[114.226014433594,15.4391652656251],[114.24795046875,15.467583234375]]],[[[113.893748808594,15.479087140625],[113.887345,15.4638430000001],[113.853260527344,15.4725905585938],[113.880074492188,15.4979274726563],[113.893748808594,15.479087140625]]],[[[114.275006132813,15.53925315625],[114.267345,15.523843],[114.243985625,15.5285597968751],[114.260123320313,15.557202375],[114.275006132813,15.53925315625]]],[[[114.468961210938,15.6076589179688],[114.487345,15.5838430000001],[114.45298953125,15.5896804023438],[114.468961210938,15.6076589179688]]],[[[113.757345,15.593843],[113.717345,15.593843],[113.717345,15.6138430000001],[113.757345,15.6138430000001],[113.757345,15.593843]]],[[[114.613472929688,15.6388014960937],[114.607345,15.6138430000001],[114.57326296875,15.6225905585938],[114.609312773438,15.6573635078125],[114.613472929688,15.6388014960937]]],[[[113.919305449219,15.6779055000001],[113.907345,15.6538430000001],[113.883985625,15.658559796875],[113.900123320313,15.687202375],[113.919305449219,15.6779055000001]]],[[[113.974954863281,15.8348268867188],[113.967345,15.803843],[113.933260527344,15.8125905585938],[113.943885527344,15.8479274726563],[113.974954863281,15.8348268867188]]],[[[114.78107546875,15.9082204414063],[114.787345,15.873843],[114.75271609375,15.8801589179688],[114.78107546875,15.9082204414063]]],[[[114.121073027344,16.0182204414063],[114.127345,15.983843],[114.09271609375,15.9901589179688],[114.121073027344,16.0182204414063]]],[[[114.927257109375,16.0237844062501],[114.917345,16.0038430000001],[114.903599882813,16.010796125],[114.887393828125,16.0439821601562],[114.911617460938,16.0558132148437],[114.927257109375,16.0237844062501]]],[[[114.31498171875,16.0508913398438],[114.307345,16.0338430000001],[114.224163847656,16.0380055976563],[114.220296660156,16.0504177070313],[114.275638457031,16.0676564765625],[114.31498171875,16.0508913398438]]],[[[114.496422148438,16.0447682929688],[114.487345,16.0338430000001],[114.442808867188,16.0395412421875],[114.460640898438,16.0783815742188],[114.521197539063,16.06534690625],[114.496422148438,16.0447682929688]]],[[[114.72853640625,16.1873171210938],[114.717345,16.173843],[114.692808867188,16.1810427070313],[114.705513945313,16.2066188789063],[114.820914335938,16.2183815742188],[114.804957304688,16.1987013984376],[114.72853640625,16.1873171210938]]],[[[116.743531523438,16.3176564765626],[116.737345,16.3038430000001],[116.697257109375,16.3080666328125],[116.687818632813,16.3383791328126],[116.712017851563,16.3776564765625],[116.751158476563,16.3637844062501],[116.743531523438,16.3176564765626]]],[[[113.891158476563,19.1600295234375],[113.887345,19.153843],[113.825125761719,19.1580641914063],[113.793531523438,19.1970705390625],[113.807010527344,19.2376564765625],[113.909840117188,19.2295314765625],[113.924227324219,19.2090407539063],[113.91187625,19.1727980781251],[113.891158476563,19.1600295234375]]],[[[113.04373171875,19.498637921875],[113.027345,19.473843],[112.983468046875,19.478833234375],[112.97345828125,19.5234889960937],[113.02814578125,19.535747296875],[113.04373171875,19.498637921875]]]]}},{"type":"Feature","properties":{"name":"西沙群岛"},"geometry":{"type":"MultiPolygon","coordinates":[[[[112.231429472656,15.6997585273438],[112.227345,15.6938430000001],[112.193260527344,15.7025905585938],[112.201749296875,15.7204323554688],[112.243973417969,15.7479274726563],[112.260711699219,15.7332033515626],[112.243260527344,15.7079274726563],[112.231429472656,15.6997585273438]]],[[[111.203922148438,15.7960353828125],[111.207345,15.783843],[111.195152617188,15.7872658515626],[111.203922148438,15.7960353828125]]],[[[112.532064238281,16.0091237617188],[112.527345,16.0038430000001],[112.432625761719,16.0097805000001],[112.450428496094,16.0462697578125],[112.601698027344,16.074692609375],[112.604339628906,16.0303615546875],[112.582625761719,16.0185622382813],[112.532064238281,16.0091237617188]]],[[[111.802244902344,16.0389430976563],[111.797345,16.0338430000001],[111.732445097656,16.04089378125],[111.759163847656,16.0787429023438],[111.831939726563,16.0674733710938],[111.802244902344,16.0389430976563]]],[[[111.563636503906,16.1896022773438],[111.559188261719,16.1697585273438],[111.639613066406,16.1890407539063],[111.683973417969,16.2179274726563],[111.699820585938,16.1869264960938],[111.631429472656,16.1497585273438],[111.627345,16.143843],[111.533587675781,16.1483010078125],[111.524222441406,16.1900783515625],[111.589991484375,16.2471950507812],[111.631429472656,16.2564846015626],[111.621793242188,16.222798078125],[111.563636503906,16.1896022773438]]],[[[111.76177859375,16.2682888007813],[111.81619265625,16.224770734375],[111.811378203125,16.1860768867188],[111.771790800781,16.1693971992188],[111.767345,16.163843],[111.722552519531,16.1766506171876],[111.712899199219,16.1974709296876],[111.762899199219,16.2082888007813],[111.771790800781,16.2266457343751],[111.683084746094,16.2395558906251],[111.661561308594,16.2368801093751],[111.642899199219,16.258676984375],[111.76177859375,16.2682888007813]]],[[[112.532181425781,16.3218556953125],[112.5328528125,16.2889553046875],[112.512345,16.2885378242187],[112.464051542969,16.2895217109375],[112.422779570313,16.2694997382813],[112.417345,16.2638430000001],[112.372445097656,16.2701100898438],[112.407728300781,16.3036696601563],[112.532181425781,16.3218556953125]]],[[[112.00170046875,16.30948753125],[111.997345,16.3038430000001],[111.96298953125,16.3303615546875],[111.99959109375,16.3547414375001],[112.04408328125,16.3613161445313],[112.08170046875,16.3459206367188],[112.069447050781,16.3209963203126],[112.00170046875,16.30948753125]]],[[[112.697345,16.333843],[112.667345,16.333843],[112.667345,16.363843],[112.697345,16.363843],[112.697345,16.333843]]],[[[112.68047,16.4125295234375],[112.667345,16.3838430000001],[112.633624296875,16.388618390625],[112.647105742188,16.427563703125],[112.68047,16.4125295234375]]],[[[111.534801054688,16.4612990546875],[111.537345,16.443843],[111.484801054688,16.4466603828126],[111.505130644531,16.4663869453125],[111.534801054688,16.4612990546875]]],[[[111.700501738281,16.4677809882813],[111.707345,16.443843],[111.682899199219,16.4508327460937],[111.700501738281,16.4677809882813]]],[[[111.593985625,16.4704836250001],[111.607345,16.443843],[111.563985625,16.4478176093751],[111.571761503906,16.497202375],[111.593985625,16.4704836250001]]],[[[111.583922148438,16.5160353828126],[111.587345,16.503843],[111.575152617188,16.5072658515625],[111.583922148438,16.5160353828126]]],[[[112.512244902344,16.4789430976563],[112.507345,16.463843],[112.482445097656,16.4877663398438],[112.572752714844,16.5387429023438],[112.572381621094,16.5146413398438],[112.512244902344,16.4789430976563]]],[[[111.620894804688,16.5540895820313],[111.607345,16.523843],[111.583531523438,16.5385158515626],[111.620894804688,16.5540895820313]]],[[[111.762154570313,16.4790334296875],[111.757345,16.463843],[111.731812773438,16.4687184882813],[111.752093535156,16.4875075507813],[111.753299589844,16.5179225898437],[111.725272246094,16.5586525703125],[111.77947390625,16.5284499335938],[111.762154570313,16.4790334296875]]],[[[112.633922148438,16.5760353828125],[112.637345,16.5638430000001],[112.625152617188,16.5672658515625],[112.633922148438,16.5760353828125]]],[[[111.664195585938,16.5854567695313],[111.667345,16.5638430000001],[111.645159941406,16.567075421875],[111.664195585938,16.5854567695313]]],[[[111.712076445313,16.586880109375],[111.717345,16.5638430000001],[111.693941679688,16.5691945625001],[111.684198027344,16.5975637031251],[111.712076445313,16.586880109375]]],[[[112.739957304688,16.6977712226563],[112.747345,16.673843],[112.712625761719,16.6845632148438],[112.739957304688,16.6977712226563]]],[[[112.90375125,16.7786696601563],[112.887345,16.753843],[112.863260527344,16.7600246406251],[112.895067167969,16.7979274726563],[112.90375125,16.7786696601563]]],[[[112.252117949219,16.7846193671875],[112.257345,16.753843],[112.203961210938,16.7629128242188],[112.198746367188,16.79819846875],[112.252117949219,16.7846193671875]]],[[[112.353748808594,16.839087140625],[112.347345,16.823843],[112.313260527344,16.8325905585938],[112.340074492188,16.8579274726563],[112.353748808594,16.839087140625]]],[[[112.353319121094,16.9290407539063],[112.347345,16.9138430000001],[112.334852324219,16.9234865546876],[112.294288359375,16.97819846875],[112.3287903125,16.96212425],[112.353319121094,16.9290407539063]]],[[[112.286639433594,16.9864626289063],[112.277345,16.963843],[112.252425566406,16.9698464179688],[112.205755644531,16.9606252265626],[112.193170195313,16.9825905585938],[112.239969511719,17.000639875],[112.286639433594,16.9864626289063]]],[[[111.457345,17.073843],[111.499166289063,17.0776784492188],[111.507345,17.093843],[111.54029421875,17.0981252265625],[111.514429960938,17.1072927070313],[111.507345,17.093843],[111.465523710938,17.0900075507812],[111.442445097656,17.08815940625],[111.47650515625,17.1067092109375],[111.540875273438,17.1287429023438],[111.562244902344,17.0921706367188],[111.477430449219,17.0589430976563],[111.462244902344,17.0687429023438],[111.457345,17.073843]]]]}}]};
            });
//  "海口市": "460100",
//  "三亚市": "460200",
//  "三沙市": "460300",      
 
            provinces = {
                hai_nan: require("echarts/util/mapData/geoJson/hai_nan_geo"),
                haikou: require("echarts/util/mapData/geoJson/haikou"),
                sanya: require("echarts/util/mapData/geoJson/sanya"),
                sansha: require("echarts/util/mapData/geoJson/sansha"),
            };
        })();

        return provinces;

    });
