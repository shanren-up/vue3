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



            define("echarts/util/mapData/geoJson/bei_jing_geo", [], function() {
                return {
                type : "FeatureCollection",
                features : [{
                        type : "Feature",
                        id : "110228",
                        properties : {
                            name : "密云县",
                            cp : [117.0923, 40.5121],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@vIHZDZQtDLNMXIbHRCXXITbJ@H`LGPRDDJNCLHTOCWFGvGBUJMKGFO^IHWXITQCIY^AXGfRDXF`DJOLB~G\\DZIHHpErUVMhHb]\\MBVF@FTP`@zTbD\\@~M\\K`H^EVODWICAakAQXoIcCOCIgGYNWFWNGGKKGaJEGMEIKYJUT_J_Go@_SyQaSFMEGTcYOQLIIi@EKAUPCV[EEXQCW|aMUMAaYCYNIDGGACIMGGSKDQGaF_C[GaB@GOIiOKAYLmI@CN]F[SWWAcKKI@HMUimEKbeYQYISNUOcBKPIFBNgvDPGZYFSf]CMSIWGEUFgDIQ[MeDMJS@RR@LphFPCHaBAJKF@J]IBJO@HlO@@RKAMPJHCNDJTHFP@ZGNANBRFH@J_fM^ONJNF\\VTDJHDON@XRND\\XRCPVETCLBVKDFJINHRGPRV@\\CLJN@VbXbLVT"],
                            encodeOffsets : [[119561, 41684]]
                        }
                    }, {
                        type : "Feature",
                        id : "110116",
                        properties : {
                            name : "怀柔区",
                            cp : [116.6377, 40.6219],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@JHTVHXCHPfnDJGHNDJSB[JSBGVSAOH@PMPuDEHHXZN@PHF@ZLJ@LHVYJA\\OFWP]BMtMBSRGV[JeVAPQVIFENMD¡@^NV\\JH@NNL@NM\\kTQ\\I^FNIpBHGTBFFAZQfKDIXQTLXFXNNVMVHRGpCFLlRLEVBBH`IVO\\G`RDPAXLXBXORHZEHTDLLN@VGTMrQNFPeASKG@GMOAKBYMK@GTUHUXSHMVDNMOUEOZMJML@^KRACMZEZMRQLUHE@OFENPR@DI\\ChMHIDG\\GJMDWHCKGMDCIQCHO_K@GaIJSWWQDaGWJMNCKRsCYGYuJUSaKaW@UIMDK@[QUHOGQJMEILCAUDKFSOUQD[WMCQ@WPMGCCIUSE[IMPMN]`e@IEGAQBMHM@YEOSGCIDMIGNOLB@QP@GkP@AI^J@ILEBIbADGEOog@KQQWSekWQQUOFKZLF@PUNmIaHIUeBCTSHENcJa@_IWSaGu`GLSBKJQFOXGDXVQVOBIHcDSJWBEFGTMH[^mLaXcHiKElTRKtFXZ`MHMPCNRDxZB\\ICIHK@KHbIVFZ@BPnGTGbDXRDJaZKRiGEFSFEJhjFNZFjn"],
                            encodeOffsets : [[119314, 41552]]
                        }
                    }, {
                        type : "Feature",
                        id : "110111",
                        properties : {
                            name : "房山区",
                            cp : [115.8453, 39.7163],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@h@bl@HRJDZ``TA\\VVD^H`\\pF\\J`JGv@ZO\\GPSTEjPTR`FnEbDTDHEhLFMTK@ETSPULKEI@OVISKSJACEQNQbVIXGDIN@dMB[IIBcN]ZHNLP@XOWCFWCNRHTpATD@^NVNLED@Rh@jCEF}E[OOHUEW]W@QGGDIQSH_MmFmCUT_K]i@MHCMWFCFE{BMHMPOHKS]CFNGBELDH_@BcAKOACESAOBELaXAROB@FODMEDWJAG[aE@UM@DImEWJMC@OeCA{aE[@{L@MINUCQXKfUJORCHqJBF@TCXWNQX]M[EAJO@@KMBQJIC]EWMCCUBEBFHKDOTMBGNGF]MWDBRDdMDQVyE@LPVHDCP@JVVMTG~HNSH[CmRUvHPHBbA\\PTNRC\\YNJPRARPJDDR"],
                            encodeOffsets : [[118343, 40770]]
                        }
                    }, {
                        type : "Feature",
                        id : "110229",
                        properties : {
                            name : "延庆县",
                            cp : [116.1543, 40.5286],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@^AXOPEB[ZIGU@KKI@YGE@OYMGWFGvCNO@OPGTBHUTA\\ITACIGMIHmCOeDGGWSUIGimYEEMgiFITEFEjHLQbYCIWQaCSHmHAOY@UEaJG@LGLDJ[JAwYQCDMNONGY_EWLsSQFkMO[NWAIGaIYL@HMBOKiOQDWEUDMQSF_QIUBWdg@[NaAKQ@M]OQ@WhgLUMMFYQDIRCEUZOOCIOJ[KIUMKL@HIDKVEBM`HJAJSJUdBLGNEdMBMO[BYEWJSNKNaD]PE\\SjOT_RQVEZPpNQXfNA~lNG`@PNLp¼RFLfbdKbATUh@FSNWjGFZVLFHVA~X¨PPROfFJbNJPLFbENJPrEFNPFRHDDJdENJLVEPBJTVTHGHFRFH@PXP\\ORQHW\\BjWFDERLPPBbB\\E`B\\D\\L`@F]FCnJ^AZL"],
                            encodeOffsets : [[119262, 41751]]
                        }
                    }, {
                        type : "Feature",
                        id : "110109",
                        properties : {
                            name : "门头沟区",
                            cp : [115.8, 39.9957],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@V@XMnGPY²JQNEhH\\AZMPDVTTDZCPiJkHSHCjIdFtEHITCNITQEKUAMCEIKCECABYESKFWAKBEIIHABGDCKCAIHMHALKEI\\CFIBILIJQZS]BBEECS@E@@C]COKI@CABAAEEDMGCH]A[M@CJWHJaUMRFRBDTITLUJ@PFJKLOVST@FSLENgKGFSCaCmF_ESQiOSFOT[HYPu@IH_[IoE_[]GUC[USB__CYQI@Gakg@qZeHQNMNV\\FVLPgJAFJPRLCH[XcPELUT[JiV_EELFTADBXRTRLJC@fHXHHbPd`fR@NfT`@TLplHMpCEJHJBVLF@JTVnG^KXDXHNVGRLRXFJVdDHSNWLGfEzA"],
                            encodeOffsets : [[118635, 41113]]
                        }
                    }, {
                        type : "Feature",
                        id : "110114",
                        properties : {
                            name : "昌平区",
                            cp : [116.1777, 40.2134],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@VNLJI\\JPPDYPFVQDCJZRNEVNhKXgR@^P@NLRbB\\Mh@XcVARJE`RTCNFVXRCjPPLNA@GZKbJJHXB\\MNPjLdGbWnK\\]NGHSFEXATIdCJGPARUWUHCPWRELITAHKv_E@iYCaW_BQ\\Y@QIO@QDCIGZCEMWGFMFAFgHEDOCSqKCCFGAMKEAC@ODGCGs@WH@KQA@EE@CE@GEA@EH@GGUEEJEAYD@JM@@DAA@FHD@FTJEHUC@JUBKCKG@G[CIIQReAYhO@OXGDO@@FF@IHJFCPEBACBIAAKDOABXARHPNEHGbQAAKQFGIAM[C@WHKaGiCEGOAHUKCIokSCUSOCYN[BgGMFIR±OZmHWNU@ShbbXDHVXXGJ^lZ@PZ\\Nb@\\FHJAD"],
                            encodeOffsets : [[118750, 41232]]
                        }
                    }, {
                        type : "Feature",
                        id : "110115",
                        properties : {
                            name : "大兴区",
                            cp : [116.4716, 39.6352],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@F\\E~DFN@BDFEpHFCHBBEGCDCJBHUDSBB@ELCPbF@B\\J@BJVAFJ\\ADKTCBGECFMT@BMN@@FH@DaNBEnvB@FPBATK@FHEFIAKFBFL@@PKBFJHC@FXBRAFCDMPDTOL@JIVFDHH@DDH@BGRFCDLD@N^@@CNA@KNOAEBCECFEGCFGMGFIPMOEJOLBADBBHGG@GCHIECY@INC@DMGS\\AIOZAAEYA@GT@KKMBEETCGMVINFxA@MJADB@FlA@HJA@NND@DFA@DVAZBBOFKH_JA@K^GBC@EFEG@gAENMXKJigC@IbSJMqGOP£RGSMGE@kbQFDPEFiBSGGSBK]I{CDWCIDOic[C_G@SuSO@EWKCO@MNY@\\uZOPENQD[LKESSKGBKEG@EJGAGHoH¥CqhifeJkX_XFFGHFNEDFPENKHM^IFIVL^S`DVEnNnG`RTCJHH@R^XFXGVPP"],
                            encodeOffsets : [[119042, 40704]]
                        }
                    }, {
                        type : "Feature",
                        id : "110113",
                        properties : {
                            name : "顺义区",
                            cp : [116.7242, 40.1619],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@EhEBENXHFNYDJHCD@RJP@R[ZARX`DbjZF@bHXT`Jb@dIFMTGDSfAJVbGnJVM@OKELYPERVXRflXTT@NIfC\\NJRhCVEHFJXNT^DTeZEHYCOhuAMJELOdAVPTMOWBWNMNEJgl]@WGUFIC[T{EEDEHGCIGMI@SECUQI[D{A{GQESPUH]CsiMCmHUeoHENcAaDGCMDGMQCACCBaCGLMAHB@DIEQLOAAEEJ@CW@CDINGAAGKQOCgV@LG@BEGDKNeREFBNCFIDOPKD[@YRW@GFWDAFE@EHDDrLDTCPGF", "@@KrJEH[\\B@FF@CHFBHUNAJKADGECBCMAG^E@EbI@BEGP"],
                            encodeOffsets : [[119283, 41084], [119377, 41046]]
                        }
                    }, {
                        type : "Feature",
                        id : "110117",
                        properties : {
                            name : "平谷区",
                            cp : [117.1706, 40.2052],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@ZJZRafFLjnVGNJ@LLBdXX\\T^EDMJ@nZKLBjPPJ@HbA\\H`DbERHLCFK^BZaFWXQLAGMHa\\OLO@SBIpBdCLVQfElO@GSAKEDQTC@GEBKG@ORIJBDAPDFA@CaOq@GGQAAEJK@KMUGAAGEAa@MGMBGCGSIIW@WSUCMDOJeWOM@IUF{WMWaDIMgIoRoCOKeEOEAG_I[cg@wLIFENQFDVTFJ@HNDJGHCFFFS|D\\EJHV@Xk^IhMFMNAXPX"],
                            encodeOffsets : [[119748, 41190]]
                        }
                    }, {
                        type : "Feature",
                        id : "110112",
                        properties : {
                            name : "通州区",
                            cp : [116.7297, 39.8131],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@FDAJTGDNDCTDDEDBBE@DT@@EHCDGJ@EIZ@@FDBR@ATFBBVFFE@@HNA\\VE@CLIFNJFNJBCP]A@LJFA@HJEDD\\C@DBCHLAEPF@@DH@APHAERDF\\GIxDTM@CFLBBFJ@CNUPMHECGDBF]BMFPDLRBHHBJMDCX@@DFIBFPBRKJF@CGANBHKbDDABDRDHNNCHDbCdBFMpGHiOYMefKJMC}HWAUNW\\NNBNAkNU|]HMTMN@MZBLFFF@RIRUTBMFIEGaAGGAOIIUGTSFcYKS@MSLYPKRUBU]EWDOI]CKGASgW@MTWKIMCS@uMAKKADMECGAKVUTSDy@IjWLMNBF@hHEF@FAD]H@LIBG`ELAPYAUB@CEB@CMC@MIB@GkB@ECAIB@NwBMEUJHNSDFFNALLS@@HZBBFYBJP[BHTCND@JMZ@FDGJHDH@GHAABCKAIPPFONEJNHEHHDEFFDADBFMP@L"],
                            encodeOffsets : [[119329, 40782]]
                        }
                    }, {
                        type : "Feature",
                        id : "110105",
                        properties : {
                            name : "朝阳区",
                            cp : [116.4977, 39.949],
                            childNum : 2
                        },
                        geometry : {
                            type : "MultiPolygon",
                            coordinates : [["@@bFGHBHFBFIVFHHG@@FFB@HDFF@@FRB@LXGt@DHCH@PBDLFBNF@BEXCHEX@ZQ\\@LCPOJCDEAMFEfQLMHCAFH@@KhUNE^AAEHCFDNGVODMI@AEKADEN@CSJw[HCEFQGBBOG@@CE@FOKBDGCAD@C[FCGIB@IE@K^BDOIAEMMIJEDKF@[UMB@GF@EEAUEABSQ@CA@EY@FJI@CHGD@FS@@CAFCACFSCCDCMSHBIECMB@D]@@MKCDCQEAHG@CCG@CGUEIJK@SPOCCNEDQBDNDB@DJCDLFCBBALJB@BVGPBKVO@KHCCCD@FE@BNA@FNCTDDJA@FGB@NBDW@CL@hT@@ZHHQDDDAFSAANBC@HG@EFS@@DE@@PCB@Ue@CADNJB@FCBWA@LI^ix@FIHrH"], ["@@HUNAJKADGECBCMAG^E@EbI@BEGPKrJEH[\\B@FF@CHFB"]],
                            encodeOffsets : [[[119169, 40992]], [[119398, 41063]]]
                        }
                    }, {
                        type : "Feature",
                        id : "110108",
                        properties : {
                            name : "海淀区",
                            cp : [116.2202, 40.0239],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@plDJVLGPBFHjDbHGL@X\\DBNHJREBLRBHaFGMGOBQAWPBLCBBAJBDFADOIEJGE@@EP@HCPWP@ZgfBRQJJ\\D@HLHLDVA@IVDFGSI@EGC@EBB@CN@@IZCAGHGaEqGJG@EjwJ]@K@GSA@e_I@NE@CA@Kg@KC@ENCFAKQAW@WIMK@V@I@@F@^EDFB@HcIaDYCBRRDCHD@EFLN@FE@CJUPEJOJMTBPEDIFCMIAKNOGMRFJNDVBFLSRMJSDGJsFcEiJGDGTIlOjYD"],
                            encodeOffsets : [[118834, 41050]]
                        }
                    }, {
                        type : "Feature",
                        id : "110106",
                        properties : {
                            name : "丰台区",
                            cp : [116.2683, 39.8309],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@hMN@NFTQCFRCBJFA@HJ@@HJ@HJ\\FTACD@@UNLXJX@@MA@@IECAQlDFEHBDI~D@GXCFMVDFCH@@NF@ANJC@FnAB@AMF@@EDCDDLGP@LUOAUH@AIABKAAEDCKID@CCACMWA@EGDEILA@OK@AELEJBFEEGL@BSOA@EuAFmMACbG@@EM@ANS@ENFDAHSDCL[BEIUBAII@A[E@OaKD@FAACTGVIACDHDAFGAEDoGEFACM@ig@@QFCMKMU@]SCoBGSMQDEXXDWPO@MKYGM^AdJJA\\cNB\\G^DNHFCBFABDBJ@PL^D@DF@T@FDAF^A"],
                            encodeOffsets : [[118958, 40846]]
                        }
                    }, {
                        type : "Feature",
                        id : "110107",
                        properties : {
                            name : "石景山区",
                            cp : [116.1887, 39.9346],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@NQPHLMJBDNJEFCAONSPIFIVODIF@@EKMFEC@DGQCAQZDbCdJ@GEAFC@]@EJ@DCSB[EGII@@GI@@GEBAIQDDESRMEM@gNYTIRKJAJEJ[DFJKLGBGNBJLDCDAHGBJJAFBLEXTLZFBAFDLD"],
                            encodeOffsets : [[118940, 40953]]
                        }
                    }, {
                        type : "Feature",
                        id : "110102",
                        properties : {
                            name : "西城区",
                            cp : [116.3631, 39.9353],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@XBDA@EIACM@IJAD]BC@SFABISAD]H@@OAEDQEW@BLEMD@FLDh@@LDBF@@M`J@fTB@H"],
                            encodeOffsets : [[119175, 40932]]
                        }
                    }, {
                        type : "Feature",
                        id : "110101",
                        properties : {
                            name : "东城区",
                            cp : [116.418, 39.9367],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@DBf@@VDA@OF@@CT@FEH@@GADBMTBBECCRCGG@YS@@gDK@AC@PG@C^TBAJEB@TADC^IB@J"],
                            encodeOffsets : [[119182, 40921]]
                        }
                    }, {
                        type : "Feature",
                        id : "110104",
                        properties : {
                            name : "宣武区",
                            cp : [116.3603, 39.8852],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@RBX@RFFCBFU@aK@WA}CCJGAEFkCBRFD@JB@@N"],
                            encodeOffsets : [[119118, 40855]]
                        }
                    }, {
                        type : "Feature",
                        id : "110103",
                        properties : {
                            name : "崇文区",
                            cp : [116.4166, 39.8811],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@XBL@@bEVD@BX@AC@MHA@EIBCCDSEMmB@EIDBME@@MG@EDUCENWD@H"],
                            encodeOffsets : [[119175, 40829]]
                        }
                    }
                ],
                UTF8Encoding : !0
            };
            });
            provinces = {
                bei_jing: require("echarts/util/mapData/geoJson/bei_jing_geo"),
            };
        })();

        return provinces;

    });
