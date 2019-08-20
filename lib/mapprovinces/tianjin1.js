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



            define("echarts/util/mapData/geoJson/tian_jin_geo", [], function() {
                return {
                type : "FeatureCollection",
                features : [{
                        type : "Feature",
                        id : "120225",
                        properties : {
                            id: -1862073617,
                            name : "蓟县",
                            cp : [117.4672, 40.004],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@EUDAEI@WNMNCBFAHFFNACDJDPBD@@GD@DIFFHEFGDBDEQOFG@EI_KG@OcJQM]RMEKBGPG@[LaCIICBWKCEEG@WBQHCDFD@HSLEJI@IHWECFGAAEKCGDBFCBSBIDCKKHEADMJMFABKOKEQAA@IEEG@GIQAEK@OZEESMOLlu@SLUTYFQCMG@@SQUAYKAACA@IB@BDB@B@DC@@BGAEFAA@BEGKJCC@AGAIHA@@JC@QEIP@@A@EGIDC@O@C@@@@CJCWKABFLBBEBSQGBAAMIEM@AKBcJEN@BEBCFMAEFEF@J@BG@BFABECKFG@AFQ@@F@BEB@@A@@AAAKAE@GFGDECEFEECBKIKDELDFEDYH@EIACDCHKBEB@BAAC@ADBHABKJIAIJICEDGDCD@@A@A@DHCHJHDFEFGBKRKBGIK@GIMHSBCH_BOJECCJCFKKMD@DNJEDEGC@OJCJHRUL@HRJ@H[DCNKDZHCTFDHCFFKR`TANVDFZRDLFARB@HPAPG`ILAR@TERNDFNHDLCLDDCXDYbHF@FEB@LDDVE@JPNfXPINCVDJJD@NJPAJHLXHDNANHhB@DPNLRMTBFRBHHr@`NBFEBOCCBIAQJDHCHLHFA@HSDCRLFTB@HEFLNF@PELBDJALFLTC@EPFLLP@tUHQJDfIHGTB^JTCPDLKAIBATFPADIEGECEMJ@JIAIHGECFEAGDI\\SPOXAFCL@BQTQBBTMZECYGAHA@GJAE@HCAEME@IECFKJADDBABLTHHG@ILEAMNDJCDHEBF@@JNFJELDFKTOT@JETBFFHBHEHKI@@IJEJ@XKEOUMS@AF@CEB"],
                            encodeOffsets : [[120575, 41009]]
                        }
                    }, {
                        type : "Feature",
                        id : "120114",
                        properties : {
                            id: 1413651624,
                            name : "武清",
                            cp : [117.0621, 39.4121],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@FWôµ@IFCLIB@EHNBp]AGEAKAEDMGZKFGBGME@ILGP@HEFB@BXMEAHUGC@IHCLOD@X[NWHWPKAEF[@EKIOL@EKGBNMJ@EIEHKBIC@BAKMIACCFQZCF]DB@ERAKADIHGEIBCGIIECFaGLZO@EFCNGAGDGAKL@BMG@IE@ADSDEH[JGC@CGA@BMDeK@EIACFE@@GG@FIAMM@CCGC@EM@ADE@CFMAAGHBDKIEAJG@DOGCDEKAGIS@KFCHKAEHIE]BeKNO[IFIOELC@A]GMBKVYCDDgGAICARc@MW@AQE@DGI@@AQ@@BKBAIQQYEFW@CEADIGGBCEIiMEMF_LGEKMBBDWEBGRC@E_CHYGCH_IAED@FFBQh@FGJaJ}AHRAREF@bE\\C@CT`FHC@\\BBF@BID@HGDDJ@@FAHKBARECKDAZBJIVNHCTA@EREAMLHDAFFBVFFC@RNRETHD@FOJMACH@CAB@P@DF@@FGDWE@FFSIEMKQDYCCHKb^JADOCIDGNDBdBCFJB@EC\\A@BJEA@JAAAD@HHD@LFBCFF@BERDHNhZQHMBGHOACCEBWEGD@PSJKCGEUD@CINLFGHE@AJK@HDABBHTB@F`DBFLBBHEDARCFG@ABJBAPVFE^FBGLGCFG_BMLEXGAAFE@@JNRVJHFALFBEHQJCTbNDHCF@PlFLJSXCHFHfVBTNJ\\BPJXC^FAVNFCHFB@FFH@JF@\\ABCFD\\BDMCAAJKQBGAILOEGHILECQLWFENJHADC@QxNHFJNLDFA@CBA@DUÂmR@FBL@BD"],
                            encodeOffsets : [[119959, 40574]]
                        }
                    }, {
                        type : "Feature",
                        id : "120115",
                        properties : {
                            id: -1802731797,
                            name : "宝坻",
                            cp : [117.4274, 39.5913],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@TZbB@JHD@DODCLM@AP@LL@BNH@ETFN@`E@DNG@CHLBCJA@AICFKDDBKA@\\N@AFNAGRBFjFFFL@DHLBLFQPcXAZMJ]GAVHAIZJFNE@JpDRRDCLFDGXA@EFF@CFFPDfEBDB@DCHCFCJDJIJBLI@I@CB@@ADBB@FALADGDC@@H@BB@FZGFCCE@@FMLALJDAFFFEFDFCB@@AHCF@L@@BBB@BB@FC@E@@R@BEL@HEFD@G@AH@AIB@@@FEFEBALDDEFAFO^IF@JCBBFPNJJ@D@PRDCEKBAXL@BIFD@T@JE@BHHJORFDI@@B@JGH@@B@BDDLIFFHCD@D@DEE@BAAAB@DAF@B@H@NGLJLMRDNMfGIEPMI@GDAKK@KIDIJ@GE@CFDN@FE@GFEPGV@TCDFKHBBF@RW@DD@@ID@TJFKIKLI@EP@IGBCLAEKLEN@KSHIGYACSD@SEAMBBMGEBMQBCMIGKFB[D@HDLPHDBC@IFITDLG@IIIFGVBNJDLN@VIRI@YIAIHIC@CLKZCBEE@JECEIHEAKGDGECBGEEM@@DA@CCCBBEGA[GEDBBoNAAH]MKiIAWKQoIIPMFQAEEDMH@FMSUYIeF@EK@BIOEKJEBICFKaKPFAFSE@LWCCFMHDDEKESBOGBKIEIODLG@CCDEQCEDWEMDIEIB@EHGEEDAEAa@@HqDEJGF[AECCFa@WCEIKAAEQB@FCAE^YDERDDJBLNABD@AJGLJF@FNIAMLH@FPKLJ@FE\\BFOLGXMXW\\C@KPGD@JHDGVFBWN@AEAGFO@KH@JNFAHEHYLNHFCLBFBBHo^MAFGA@KJED@Jó¶EX"],
                            encodeOffsets : [[119959, 40574]]
                        }
                    }, {
                        type : "Feature",
                        id : "120223",
                        properties : {
                            id: -154760975,
                            name : "静海",
                            cp : [116.9824, 38.8312],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@NGFMDATCNDR@CCbINEHNJA@C\\EEGVE@IhE[wepc¢·²^QEKIEKIgiQDkehY£uSDBMkUDOJDHC@GF@CAFBFEN@CQ@BeP@@G@HD@@MHQKi@[IGCOCESE@GMA_OcCGDu`a@VZzKDkJBLNXGDqKEWE@cFEFA@ISIi@@KMABJGBcMuFEzGVH\\ATSEUBeALCEMG@CEBUHUCGXaBPtUBBFIBFTDFF@DDKBFNGBJPHXDDMDCLJ^mBIHIL@LR\\@LCR[@@z@NFD@LLBNb@RHDBNTPT\\F@BJF@BXCFBHHBDLFB@HODADE@@JHVXCPDHCFTLBBFNCDCCCU@@GAABEHHZHBCAEdEjFDD@GfD@DXFCHF@ERFDLBH@"],
                            encodeOffsets : [[119688, 40010]]
                        }
                    }, {
                        type : "Feature",
                        id : "120221",
                        properties : {
                            id: -1785889970,
                            name : "宁河",
                            cp : [117.6801, 39.3853],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@BFLBFJXDb@DEFD\\BHEFIrC@Gb@FBCBFFGH@FJAJFNCXFFCRDCFDDH@CKJPJFALPHTALFCFGCENDDKXF@ETEBObLELJDFALIPFAJL@@FfEZJTVENG@CNFFRBNEJOpJLRBXjJNLG^BBpMAAFC\\HHBAFDADDB@@CN@FFAHFDCHLHFBJGFCFUNKJJTD\\XUXF\\^F@DDDQXXBRLRCBDFEVCDLVDpUl@LEDJHAPRFGL@CETGPBTCDDVI@CFF@GFDCCVGLKEK[Y@MECISG@BKNSCGCKWEAaEBEKNGFSECO@GGM@GYI@DÅCMLHPTF@DJHAVVNKEGDETJ^[TJNNd@NOAMFYJ@@GFANDPEJB^aOadSTQSI@MHBDIEOKCG@EEFCKCqXO@@DMFENCDDHCCGJ]AKFoDaGGHYFDHKJiCMFGC@EQ@AEHGAC@IEAATKOHGIC@IXIFEoGE[JCFCDHNmRADFZMF[EEBMO{GU@AOW@@]ZeHBDEHBKEfQkuIWBs@EC@d[@[^EDMTKCEEcI@cDAB@FCBCACmOCG{PYHeBgPwPFDDALFFFCHQGSD@BHFAR[TaFYXMASUiGFL@DQNCJI@@D@PLDN`ETEFIGMCGBCE~CAIFDPEHGEQPHJADFJGHCJLB"],
                            encodeOffsets : [[120145, 40295]]
                        }
                    }, {
                        type : "Feature",
                        id : "120109",
                        properties : {
                            id: 831685069,
                            name : "大港",
                            cp : [117.3875, 38.757],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@JFFL°_`ONJKDDFIFZN xlb~yFVNRrdJGzDPVFBCTNND\\UR@E`F@@Ip@IWGUoawOEE@ÏDgK{İEEMFëCb@KwOCDHHKBDJCDEEEAGHOABFABMCgDLSQ@CFEBMgYIDQINE@AUSwSAdYEHQMEyK[KI@GRMLE@@OqOoBOnpJ@BmEAFHL^FDB[C@BBDVFAHFJENB@sNEjQAMYsUgCSBGDJH@\\LjGR@NC@@G@HO@AfR@DM@EFEADBE@@HGDICCPlVANTC¤vgZlfRChjLJ"],
                            encodeOffsets : [[120065, 39771]]
                        }
                    }, {
                        type : "Feature",
                        id : "120107",
                        properties : {
                            id: -1542478780,
                            name : "塘沽",
                            cp : [117.6801, 38.9987],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@|ODHnPBDADEDA@CB@ddJFFLDNSFC\\]\\@@cFD@nACOMW@M@ITURBRZNHNWRQoOj½fcqAqeiDÿÍyÓįFL|Ch@ÐFFxPpbHVJXo@@JCTR^BPABQA]^MB@bE@@FQBFVJRH@FXtPNZSBAja@@NDTLJrQTHFXZFB`"],
                            encodeOffsets : [[120391, 40118]]
                        }
                    }, {
                        type : "Feature",
                        id : "120111",
                        properties : {
                            id: 1976152849,
                            name : "西青",
                            cp : [117.1829, 39.0022],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@@LHAHRHATh`LHNHDG`HDGZ`D@FQDAHXFACNAFLVRTBFOfHDCVBFQH@HSXHEPFB@LDBF[bDbLFKJBFLADBDjLvCPEI]FGEIGCBEUSjcFiBIVWfaHCjN^HtwBBFGPBJGjFBEGECGDONMFAP]TDHQOWCMGAMHKIJEIGQ]aDlUG]VGEGDC{PEbBZmE@@GH@BCA@FMQCFMYMJECELCMI_P¯`]R±¡¸odfx\\gF@JUFFH[F@DIBGMMFaJDDQ@MCSDCBENMH"],
                            encodeOffsets : [[119688, 40010]]
                        }
                    }, {
                        type : "Feature",
                        id : "120113",
                        properties : {
                            id: -667472956,
                            name : "北辰",
                            cp : [117.1761, 39.2548],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@ROHFFGCOJEDB}DFHANDJHFEFSM_KC@O@CJ@DIRM@CEKKALFKACHoLSJSIBETDJaEIIE]E]K[MYUYQILC@GF[MGNKEK@A@BCWECAIFEFYAGFOMI[OFuDiKACBCEKIAELaKaCE\\CA@KEAFOWGGTG@ERUACDeGEPSAUQKHE`FNjNFJADHHCJFB@DEXZFRRBJLA@AR@@BJ@CHF@BRX@@NQdDBBJhHCCZDLUNA^H@BKDPFEJ\\JMPfL^AJFFGLBDGLET@HJLBCFHDCPH@BIJFCLGABHNBDEF@BCN@@FHDDDN@BNEJH@@HF@DEJB@FfLNC@AHB@DHD\\IFGTCBCF@@JNH@ALKHBHCHBDMFEP@KYbHDEJF"],
                            encodeOffsets : [[120139, 40273]]
                        }
                    }, {
                        type : "Feature",
                        id : "120110",
                        properties : {
                            id: -366479092,
                            name : "东丽",
                            cp : [117.4013, 39.1223],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@ZV\\N^L^FJFFJIbSCAFTJTIpKDGLBEKLBjHTVNBZWbE\\SBQGE@ATCRHDGEEKECBECxOhOfAZGA_YEEWSGqRKISC@Mb@BiTAMYsOEWG@IQEURA@EF@@acUOXQRYCUDCHDTEF[SUEgAYDcVGJM`iAWDWLQRMHUHgDsDBLHJFCFDFGHBFFVEAGHCJN@RJFPIhBD\\FENCPWA@LFBAFHBEJUEARCDIAEDQBRNa^"],
                            encodeOffsets : [[120048, 40134]]
                        }
                    }, {
                        type : "Feature",
                        id : "120108",
                        properties : {
                            id: -143221946,
                            name : "汉沽",
                            cp : [117.8888, 39.2191],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@LMEI\\MTABKN@FCDMH@COAcH[AoēAM¡Wa[MeqpQRMXMGQYQASV@J@NNXDPmBAtJXlveRLFGACFGAYf@^X@BPV@|HNPFA\\FNEEYBCnQGMDCDE\\IHFpEFWJ@JJDGHLPBSFB@JBDGHBFR@@FHDNEjDLICGZEHGbHpCLE^BHIDDCGDCFMNE@CP@rWLDEDFFH@"],
                            encodeOffsets : [[120859, 40235]]
                        }
                    }, {
                        type : "Feature",
                        id : "120112",
                        properties : {
                            id: 289140029,
                            name : "津南",
                            cp : [117.3958, 38.9603],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@TLv@CNHFFBHGZFETNPhCVGNGRQXKXCjBN_HIdUZChBVF\\TFECSDGVCZDRQPWdVNA^]RBBAAOQ]DSE@F_Q@[VMCSMADUECOHycIqMQEU}zkawENRDENB@ADG@@HF@YnaAOF|CDFHUHH^kVbCR^JHIFLJNGHBDNPXGRSCO^EBMNCPDHHFAFiEIHOAEH"],
                            encodeOffsets : [[120045, 39982]]
                        }
                    }, {
                        type : "Feature",
                        id : "120103",
                        properties : {
                            id: -1252356227,
                            name : "河西",
                            cp : [117.2365, 39.0804],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@d@hZNFdcLYXKRCtCMOFSYEGHEAGEDMu@SKAAsx]GMTGt"],
                            encodeOffsets : [[119992, 40041]]
                        }
                    }, {
                        type : "Feature",
                        id : "120102",
                        properties : {
                            id: 2121781466,
                            name : "河东",
                            cp : [117.2571, 39.1209],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@ZBVFFIGABEEA@KXBDOFM[EACJgOIE@QIMGDBHUFEEGAEHECEDGIAKQDWLKZcdQPEP@FOFBJTJ@HNORJf@DBCN"],
                            encodeOffsets : [[120063, 40098]]
                        }
                    }, {
                        type : "Feature",
                        id : "120104",
                        properties : {
                            id: -1769610411,
                            name : "南开",
                            cp : [117.1527, 39.1065],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@NMVDCG\\E^B@HlB@YEDS@CHsNSiMGDebUXAJEjidVTAFHDFJ"],
                            encodeOffsets : [[119940, 40093]]
                        }
                    }, {
                        type : "Feature",
                        id : "120105",
                        properties : {
                            id: -233713979,
                            name : "河北",
                            cp : [117.2145, 39.1615],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@DBXFADB@L@LFHM\\NHED@JKZRb]QMRAFCJBDCBQYADMCAe@QIMP@GSIAIPE@E[EGH@ZEF]^HJAXK@KF"],
                            encodeOffsets : [[119980, 40125]]
                        }
                    }, {
                        type : "Feature",
                        id : "120106",
                        properties : {
                            id: -858988962,
                            name : "红桥",
                            cp : [117.1596, 39.1663],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@J\\PNHEZBFEJELEL@BWGI^]FEkA@G]A[FDHUCMNEHJ^"],
                            encodeOffsets : [[119942, 40112]]
                        }
                    }, {
                        type : "Feature",
                        id : "120101",
                        properties : {
                            id: -768375193,
                            name : "和平",
                            cp : [117.2008, 39.1189],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@DT@FCHG\\FFOROMEgYc@"],
                            encodeOffsets : [[119992, 40041]]
                        }
                    }
                ],
                UTF8Encoding : !0
            };
            });
            provinces = {
                tian_jin: require("echarts/util/mapData/geoJson/tian_jin_geo"),
            };
        })();

        return provinces;

    });
