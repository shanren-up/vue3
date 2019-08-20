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



            define("echarts/util/mapData/geoJson/shang_hai_geo", [], function() {
                return {
                type : "FeatureCollection",
                features : [{
                        type : "Feature",
                        id : "310230",
                        properties : {
                            id: -901451776,
                            name : "崇明",
                            cp : [121.5637, 31.5383],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@uŏu»GPIV±ÐɃŜ{\\qJmC[W\\t¾ÕjÕpnÃ±Â|ěÔe`² nZzZ~V|B^IpUbU{bs\\a\\OvQKªsMň£RAhQĤlA`GĂA@ĥWĝO"],
                            encodeOffsets : [[124908, 32105]]
                        }
                    }, {
                        type : "Feature",
                        id : "310119",
                        properties : {
                            id: 1807843491,
                            name : "南汇",
                            cp : [121.8755, 30.954],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@`yĉNǕDwǏ»ÖLxCdJ`HB@LBTD@CPFXANC@@PGBKNECCBB@EBFHEDDDSNKAUNBDMNqf[HcDCCcF@EFGLEBa@ACoCCDDD@LGHD@DJFBBJED@BGAEGGFKIGDBDLBAD@FHBEF@RFDMLE@SGANFFJBANPH@@E@FJjRIACDMDOEKLFD@DbDAJI@AP@BGHFBCBGDCC@DCA@CECGH@FKCEHFJGBFDIHACEDNJDCVFBDCRKRLDLITB@CjNJI^DBCfNVDHDFKHAFGDIICDWBIF@@CFAjFJNJBBHD@CJ@AEFJ@@DH@BFBCPDBMFEQGDIFCNDHIP@HDABFACBJFHEBSZC@DP@@JDBƤ~"],
                            encodeOffsets : [[124854, 31907]]
                        }
                    }, {
                        type : "Feature",
                        id : "310120",
                        properties : {
                            id: -866605735,
                            name : "奉贤",
                            cp : [121.5747, 30.8475],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@~T~JjZdDbLXDLCB_J@@FHFZJJIAGH@HGR@BENBLID@@LFCDF\\FpDBDb@FAHKFE@dEDDdC\\GreNMACVMLBTMCCFCEGFAA@DAFDLMHA@OD@BMEWDOC@AS@KGAI_DcKwÕísƝåĆctKbMBQ@EGEBEJ@@MBKL@BJB@FIBGKE@ABG@@FMFCPL@AjCD@ZOFCJIDICIlKJHNGJALH@@FPDCTJDGDBNCn"],
                            encodeOffsets : [[124274, 31722]]
                        }
                    }, {
                        type : "Feature",
                        id : "310115",
                        properties : {
                            id: -1629814843,
                            name : "浦东",
                            cp : [121.6928, 31.2561],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@EN@JJLNHjLJNR^GRYVBNZJRBV@PDvbLNDN@LGNER@nCNQNuT_TIVFV\\Z\\XnDrI|[Ʉś²ÏJUHOƣ}CA@IO@@CYDATGFIEDAEBBAGCO@GJMCEDCJRHEFANOCADAEG@@CI@FE@BDIC@AGIAIMiEEB@DE@AJCXJDCJEHGBELGCUCeMAD]CIJiM@DSAKJKCLQDQACUECDMIFCBDJGECHAEIWCK@GLMCCGEACNKCEJG@MMBMC@@CIJUINT@JAJSTEPZZCP"],
                            encodeOffsets : [[124383, 31915]]
                        }
                    }, {
                        type : "Feature",
                        id : "310116",
                        properties : {
                            id: -1014392752,
                            name : "金山",
                            cp : [121.2657, 30.8112],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@L@BIHFN@@EE@@EFBDGDAADVDD@@EF@CA@IIsRE@GDAF@BF@CV@|FBCHBLCNHAFCADBMDCFZXHILBVEEQA@MWFARJJ@DCX@@TEFBLHAAERE@AJABRPBNK\\BrJ\\VHGND@CNADKDADQjGAGNC@GJ@FCFFHC@JF@@dLBDSFADHVG\\DTEPDDHJALIJkJDJCDIPE@YDCBiK@DONE@EH@BAF@HLJA@EIA@ALKNA@@FIFAFHR@NALadsæąyQY@A±DŉXUVI^BF@FFF@HBJEDFFGFEBSRkVEXGHFBMFIVW@GAEEFOIAIPKABGWEKFSCQLQBSEIBC\\FdBLRR@JGACFDDEF@AWB@LJJYNABBA@CUEGPaO_AIE@MYMFIGAEFECHSAAKAO\\[JEDB@E@MMA@@AGBKMGDFFCDDFEDFJF@NPBAFLHFH@EDDHBADDC@DDCDHHCDDFDABDAD@FEFOBCJ[D@HEDDNJBDDHABJIBBvGLBJAH"],
                            encodeOffsets : [[123901, 31695]]
                        }
                    }, {
                        type : "Feature",
                        id : "310118",
                        properties : {
                            id: -427376862,
                            name : "青浦",
                            cp : [121.1751, 31.1909],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@RUNKdOFDJCbRFMLAHPLDN@JGL@@APBWYCKN@TU@SHGCEJIDIJKVIZVNM`iNY@CIE@CA@KBOEGEUFCCSADEIEFCDDDIDDHC@CKIeDCG@IG@DHWFEEGCH@@GO@@O]CNpeEQDBFME[JC]DGF@CKOA@QSB@GB@@GW@@ED@AQIJIAAFE@@DO@CFI@KNG@CDACAFEGKGBEGBDCCAIFCCLIECFI@MBCLDHGNAHSF@DMB@EEKBA@@C]DEICFG@ADBHGFKCDAKKHKD@@FHGAANGEEFCHKCECBCKG@ADKCNE\\[A[I@@mGBDQQEO@BCE@AI[AML@JGACLOAFKEMM@EQKC@CUCBCCBCHEA@FF@@FM@GEAJK@GNF@EXPH@FD@M^@HIADJCFDBER@DK@@DE@CAKFOCCBDHIBCNSB@GFC@GQEEOWFICGDUAEJIDBTAHJHEB@DIF@NE@H|HBDBEH@DKBAHEF@HEEUB@FGFGCCCE@AHOB@NH@PRLVNNFBX@RCPbAvMtBfH@DJF@ELBFA@EH@HNED@FFB@HLC@CJ@@DJ@PIRf@HE@CFF@GPHD@DKE@FFBEFFD@DEFCA@DD@IjCRFBAHFDKD@HF@@PM@H@BlbDJDBFEF@DLXB@HCD@@IFCBIFEJD@FDC@FBALLF@PAACJERACAJCBD@EL@JD"],
                            encodeOffsets : [[124061, 32028]]
                        }
                    }, {
                        type : "Feature",
                        id : "310117",
                        properties : {
                            id: -1190161920,
                            name : "松江",
                            cp : [121.1984, 31.0268],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@@DLDFRN@FNELPBDKHB@INK\\BBJF@ADP@RFCRHA@nJ@B\\[\\MFLDBCH@DLDADFGLEDFFMHBBGH@EC@GLLLCBLDHEAGBCH@DEFJ^C@DB@LAFFA@CNE@GTMBGHKCAD@NEJFDKJDDJEDBCDHAAFLHFHBEBDDCH@LMJ@DEP@@CF@BEJBJIBRC@@FX@@HA@@HTA@RPBDLE@CHD^\\INFAERCfFMo^D@PP@@HG@HDFFXECGH@@JDHfCLJ@DGDCCCJCCEDJFCFTBDDVEHFPFLAB@NBFCFKFC@CHIACNOHWHCAAFIDD@CDAGEI@ACFMF@R@R_@GQED@EGFEQEDE_IAHKAEXCQUOQCUDEN@ZI\\DDmAMHCICDSOC@EG@BKHIGMIBCGOCSF[CUHCGEBCTKA@cE@@IGDEEEDI@@HMDBHiHCRCBCLMB@DMCGH[UqI[AMLOAAQIB@BQFBFGBAKFE@SW@CDI@QIEBNXB@FRUFKAGJYWDENCCADBBEMGKDGAAD{EU@@DAEE@CB@HQFJt@JDBE@@FC@"],
                            encodeOffsets : [[123933, 31687]]
                        }
                    }, {
                        type : "Feature",
                        id : "310114",
                        properties : {
                            id: 1064672323,
                            name : "嘉定",
                            cp : [121.2437, 31.3625],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@F@LI@IDKJADKIEJICADGACFECCJ@HKCAFOHAJI@aCBEE@ICAEB[GFGCKL@FGEIFADMLCAEJM@ELQECEIG@BE^QKKLQCA@EHBIGQ[GEHOMGGDHKH@JOECFCjCBEFDNCACMBCILGTABDLEEOEIG@GFIMM@CGKFBFCDE@@GEAGEEACIcGaHMFITIHDN[AKF@FS@OA@BK@IHM@KCGOKBENaQIDECcPMLQVFHFB@BFBKLGD@FAJOVGIACQ@A`LPCB@JEF@RU@ANS@@RCL\\HIFpRBFRBBDKLLDADJDGBFDABHBEDNF@DGBBBADKDAHC@\\JJFBDEH[DEFDH\\LX@XLBLbT@DNJLDCEL@VJABJNDHB@HBHYFBAA@GNFB@@AFB@AFABFLFBHFCL@HJBAFBLC@DN@HN"],
                            encodeOffsets : [[124213, 32254]]
                        }
                    }, {
                        type : "Feature",
                        id : "310113",
                        properties : {
                            id: 51929664,
                            name : "宝山",
                            cp : [121.4346, 31.4051],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@mÖoÖi½[s[YEUJU`SCIEBCCWJY_LIICDWU@@FaBCJIB[ICH[@@CDKEE@MK@@IMCAEBCH@AMFI@SMGEFGB@FK@BHCAIFJNQD@FEBDFMBKGACG@ECWH@@CDDTOEEBGEK@GC@EE@GPHFR\\JHGA@FDBKRLL]RAFH@FJFDKR@FINBFKDCNEBFJEHK@DLEH\\HFADB@JFFDA@bIJGBEPDBGLI@DDEFBDCHDBIJJFCLIBCL@JKJE@ADHDBHJ@HIBBDFHBBAEIJ@BJFAVL¢"],
                            encodeOffsets : [[124300, 32302]]
                        }
                    }, {
                        type : "Feature",
                        id : "310112",
                        properties : {
                            id: 874670918,
                            name : "闵行",
                            cp : [121.4992, 31.0838],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@T@@ELE\\BCMJGJSNEbGdHDJFBJAFIEIFCEWG@@gMENSFCVJFAxR~B@IH@AIiI@GE@FGEAFQPDRiV[\\DFSGMHAXHDOMCJCDETBBNVJJI@DD@ANNNH@FILDDMFBDHNDHKL@XDFGLD@EHGFD@DDB@CDDHCDAEAHG@ABOJ@BIaC@CECLKPFNCDCJBiQEIF@@@OGBMIAEEBMTHF@NKEC@QFEGA@EBCKAACHCLJHEFHHB@AFCAIEACIC@HG@KCCDC[ECEED@KC@KJMAAFQ@GHG@BHIJYIGE@EI@A`KDWCaKcCiY}I}S[CYJM@CFDVPRRVWDFLBBG`JCFRFEFFHC@RF@HQ`Q@E@ENBDJ@HFCB@DCCEJBBGDGXMPBDGJ@DEDELEDMA@DJF@DMZ_jMNYUUJILCJIJDFGH@TSVM@DLXZ"],
                            encodeOffsets : [[124165, 32010]]
                        }
                    }, {
                        type : "Feature",
                        id : "310110",
                        properties : {
                            id: 2140031493,
                            name : "杨浦",
                            cp : [121.528, 31.2966],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@V@CXJDKJZ`XIDDFADJvSRMDM@mFQHM@KCMKMuaOCU@BDAJSX@HKJGD@PNJCJWAGT@R"],
                            encodeOffsets : [[124402, 32064]]
                        }
                    }, {
                        type : "Feature",
                        id : "310107",
                        properties : {
                            id: 1718006875,
                            name : "普陀",
                            cp : [121.3879, 31.2602],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@F@@FHDL@HFFAPFCSDC@@XGFDH@BDLHNACEFA@ERCIMJEDBAGL@@EHAFENHHJ\\ONQBQCIBC[MKACKI@GGGH@I_G@CW@[DMHCDIBMTDHN@JNHEH@FJFPKFACSBKHDJNABDMDECAFiDEDFDIPG@GLHCNH"],
                            encodeOffsets : [[124248, 32045]]
                        }
                    }, {
                        type : "Feature",
                        id : "310104",
                        properties : {
                            id: 1978111482,
                            name : "徐汇",
                            cp : [121.4333, 31.1607],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@RADL\\NCPHFfLJaJ@FWLGMGIK@IFMDOYYFOTSBI@IMSAMSACFIDNDCPWGGBHNET[CU\\QjOCERFBEHF@@HjJBJG@@J"],
                            encodeOffsets : [[124327, 31941]]
                        }
                    }, {
                        type : "Feature",
                        id : "310105",
                        properties : {
                            id: -1264157841,
                            name : "长宁",
                            cp : [121.3852, 31.2115],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@HFFB@HF@DCAELENSJADCNG\\CX@@D`H@JHGHHJ@BINBFUGEDO[MCKQB}AwQEBUIEDMTNF@hH@FXEDFJEJIB"],
                            encodeOffsets : [[124250, 31987]]
                        }
                    }, {
                        type : "Feature",
                        id : "310108",
                        properties : {
                            id: -1033045797,
                            name : "闸北",
                            cp : [121.4511, 31.2794],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@CSG@BQGODUPWTOBQAAFMECKBGEMFKEOHADDJARMR[PGI@TEJBNG@ADBFND@JL@@NFFCL@D\\@DG\\JJADI"],
                            encodeOffsets : [[124385, 32068]]
                        }
                    }, {
                        type : "Feature",
                        id : "310109",
                        properties : {
                            id: 260096415,
                            name : "虹口",
                            cp : [121.4882, 31.2788],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@bA@E@QHSXBDIMI@OHCLI@GTWBIACQAYIOFGCENBBARSPOXCVHPARH@DT"],
                            encodeOffsets : [[124385, 32068]]
                        }
                    }, {
                        type : "Feature",
                        id : "310101",
                        properties : {
                            id: 659555068,
                            name : "黄浦",
                            cp : [121.4868, 31.219],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@NEHFLAFDHDPEAMZUHQQ]IMKJG@EPERABHBGRUCCNGV"],
                            encodeOffsets : [[124379, 31992]]
                        }
                    }, {
                        type : "Feature",
                        id : "310103",
                        properties : {
                            id: 701754833,
                            name : "卢湾",
                            cp : [121.4758, 31.2074],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@VDHQGABAFQFOH@LIiKKHEXI@IbAFZB"],
                            encodeOffsets : [[124385, 31974]]
                        }
                    }, {
                        type : "Feature",
                        id : "310106",
                        properties : {
                            id: 2051361276,
                            name : "静安",
                            cp : [121.4484, 31.2286],
                            childNum : 1
                        },
                        geometry : {
                            type : "Polygon",
                            coordinates : ["@@DLLB\\NPGLFHUDMYABEeKEVMAAJ"],
                            encodeOffsets : [[124343, 31979]]
                        }
                    }
                ],
                UTF8Encoding : !0
            };
            });
            provinces = {
                shang_hai: require("echarts/util/mapData/geoJson/shang_hai_geo"),
            };
        })();

        return provinces;

    });
