define(
    [
        'app',
        'json!common/components/comp_echart/comp_echart_map/cultureInfo.json',
        'text!./common/components/comp_echart/comp_echart_map/comp_echart_map.html',
        './common/components/comp_echart/comp_echart_base',
        'css!./common/components/comp_echart/comp_echart.css'
    ],

    function(app, cultureInfo, template, chartbase) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);
        var _selected = {};
        _selected[Ember.oloc('comp_echart_map_sh Top10')] = false;
        _selected[Ember.oloc('comp_echart_map_gz Top10')] = false;
        var _geoCoord = {};
        _geoCoord[Ember.oloc('comp_echart_map_sh')] = [121.4648, 31.2891];
        _geoCoord[Ember.oloc('comp_echart_map_dg')] = [113.8953, 22.901];
        _geoCoord[Ember.oloc('comp_echart_map_dy')] = [118.7073, 37.5513];
        _geoCoord[Ember.oloc('comp_echart_map_zs')] = [113.4229, 22.478];
        _geoCoord[Ember.oloc('comp_echart_map_lf')] = [111.4783, 36.1615];
        _geoCoord[Ember.oloc('comp_echart_map_ly')] = [118.3118, 35.2936];
        _geoCoord[Ember.oloc('comp_echart_map_dd')] = [124.541, 40.4242];
        _geoCoord[Ember.oloc('comp_echart_map_ls')] = [119.5642, 28.1854];
        _geoCoord[Ember.oloc('comp_echart_map_wlmq')] = [87.9236, 43.5883];
        _geoCoord[Ember.oloc('comp_echart_map_fs')] = [112.8955, 23.1097];
        _geoCoord[Ember.oloc('comp_echart_map_bd')] = [115.0488, 39.0948];
        _geoCoord[Ember.oloc('comp_echart_map_lz')] = [103.5901, 36.3043];
        _geoCoord[Ember.oloc('comp_echart_map_bt')] = [110.3467, 41.4899];
        _geoCoord[Ember.oloc('comp_echart_map_bj')] = [116.4551, 40.2539];
        _geoCoord[Ember.oloc('comp_echart_map_bh')] = [109.314, 21.6211];
        _geoCoord[Ember.oloc('comp_echart_map_nj')] = [118.8062, 31.9208];
        _geoCoord[Ember.oloc('comp_echart_map_nn')] = [108.479, 23.1152];
        _geoCoord[Ember.oloc('comp_echart_map_nc')] = [116.0046, 28.6633];
        _geoCoord[Ember.oloc('comp_echart_map_nt')] = [121.1023, 32.1625];
        _geoCoord[Ember.oloc('comp_echart_map_sm')] = [118.1689, 24.6478];
        _geoCoord[Ember.oloc('comp_echart_map_tz')] = [121.1353, 28.6688];
        _geoCoord[Ember.oloc('comp_echart_map_hf')] = [117.29, 32.0581];
        _geoCoord[Ember.oloc('comp_echart_map_hhht')] = [111.4124, 40.4901];
        _geoCoord[Ember.oloc('comp_echart_map_xy')] = [108.4131, 34.8706];
        _geoCoord[Ember.oloc('comp_echart_map_heb')] = [127.9688, 45.368];
        _geoCoord[Ember.oloc('comp_echart_map_ts')] = [118.4766, 39.6826];
        _geoCoord[Ember.oloc('comp_echart_map_jx')] = [120.9155, 30.6354];
        _geoCoord[Ember.oloc('comp_echart_map_dt')] = [113.7854, 39.8035];
        _geoCoord[Ember.oloc('comp_echart_map_dl')] = [122.2229, 39.4409];
        _geoCoord[Ember.oloc('comp_echart_map_tj')] = [117.4219, 39.4189];
        _geoCoord[Ember.oloc('comp_echart_map_ty')] = [112.3352, 37.9413];
        _geoCoord[Ember.oloc('comp_echart_map_wh')] = [121.9482, 37.1393];
        _geoCoord[Ember.oloc('comp_echart_map_nb')] = [121.5967, 29.6466];
        _geoCoord[Ember.oloc('comp_echart_map_bj')] = [107.1826, 34.3433];
        _geoCoord[Ember.oloc('comp_echart_map_sq')] = [118.5535, 33.7775];
        _geoCoord[Ember.oloc('comp_echart_map_cz')] = [119.4543, 31.5582];
        _geoCoord[Ember.oloc('comp_echart_map_gz')] = [113.5107, 23.2196];
        _geoCoord[Ember.oloc('comp_echart_map_lf')] = [116.521, 39.0509];
        _geoCoord[Ember.oloc('comp_echart_map_ya')] = [109.1052, 36.4252];
        _geoCoord[Ember.oloc('comp_echart_map_zjk')] = [115.1477, 40.8527];
        _geoCoord[Ember.oloc('comp_echart_map_xz')] = [117.5208, 34.3268];
        _geoCoord[Ember.oloc('comp_echart_map_dz')] = [116.6858, 37.2107];
        _geoCoord[Ember.oloc('comp_echart_map_hz')] = [114.6204, 23.1647];
        _geoCoord[Ember.oloc('comp_echart_map_cd')] = [103.9526, 30.7617];
        _geoCoord[Ember.oloc('comp_echart_map_yz')] = [119.4653, 32.8162];
        _geoCoord[Ember.oloc('comp_echart_map_cd')] = [117.5757, 41.4075];
        _geoCoord[Ember.oloc('comp_echart_map_ls')] = [91.1865, 30.1465];
        _geoCoord[Ember.oloc('comp_echart_map_wx')] = [120.3442, 31.5527];
        _geoCoord[Ember.oloc('comp_echart_map_rz')] = [119.2786, 35.5023];
        _geoCoord[Ember.oloc('comp_echart_map_km')] = [102.9199, 25.4663];
        _geoCoord[Ember.oloc('comp_echart_map_hz')] = [119.5313, 29.8773];
        _geoCoord[Ember.oloc('comp_echart_map_zz')] = [117.323, 34.8926];
        _geoCoord[Ember.oloc('comp_echart_map_lz')] = [109.3799, 24.9774];
        _geoCoord[Ember.oloc('comp_echart_map_zz')] = [113.5327, 27.0319];
        _geoCoord[Ember.oloc('comp_echart_map_wh')] = [114.3896, 30.6628];
        _geoCoord[Ember.oloc('comp_echart_map_st')] = [117.1692, 23.3405];
        _geoCoord[Ember.oloc('comp_echart_map_jm')] = [112.6318, 22.1484];
        _geoCoord[Ember.oloc('comp_echart_map_sy')] = [123.1238, 42.1216];
        _geoCoord[Ember.oloc('comp_echart_map_cz')] = [116.8286, 38.2104];
        _geoCoord[Ember.oloc('comp_echart_map_hy')] = [114.917, 23.9722];
        _geoCoord[Ember.oloc('comp_echart_map_qz')] = [118.3228, 25.1147];
        _geoCoord[Ember.oloc('comp_echart_map_ta')] = [117.0264, 36.0516];
        _geoCoord[Ember.oloc('comp_echart_map_tz')] = [120.0586, 32.5525];
        _geoCoord[Ember.oloc('comp_echart_map_jn')] = [117.1582, 36.8701];
        _geoCoord[Ember.oloc('comp_echart_map_jn')] = [116.8286, 35.3375];
        _geoCoord[Ember.oloc('comp_echart_map_hk')] = [110.3893, 19.8516];
        _geoCoord[Ember.oloc('comp_echart_map_zb')] = [118.0371, 36.6064];
        _geoCoord[Ember.oloc('comp_echart_map_ha')] = [118.927, 33.4039];
        _geoCoord[Ember.oloc('comp_echart_map_sz')] = [114.5435, 22.5439];
        _geoCoord[Ember.oloc('comp_echart_map_qy')] = [112.9175, 24.3292];
        _geoCoord[Ember.oloc('comp_echart_map_wz')] = [120.498, 27.8119];
        _geoCoord[Ember.oloc('comp_echart_map_wn')] = [109.7864, 35.0299];
        _geoCoord[Ember.oloc('comp_echart_map_hz')] = [119.8608, 30.7782];
        _geoCoord[Ember.oloc('comp_echart_map_xt')] = [112.5439, 27.7075];
        _geoCoord[Ember.oloc('comp_echart_map_bz')] = [117.8174, 37.4963];
        _geoCoord[Ember.oloc('comp_echart_map_wf')] = [119.0918, 36.524];
        _geoCoord[Ember.oloc('comp_echart_map_yt')] = [120.7397, 37.5128];
        _geoCoord[Ember.oloc('comp_echart_map_yx')] = [101.9312, 23.8898];
        _geoCoord[Ember.oloc('comp_echart_map_zh')] = [113.7305, 22.1155];
        _geoCoord[Ember.oloc('comp_echart_map_yc')] = [120.2234, 33.5577];
        _geoCoord[Ember.oloc('comp_echart_map_pj')] = [121.9482, 41.0449];
        _geoCoord[Ember.oloc('comp_echart_map_sjz')] = [114.4995, 38.1006];
        _geoCoord[Ember.oloc('comp_echart_map_fz')] = [119.4543, 25.9222];
        _geoCoord[Ember.oloc('comp_echart_map_qhd')] = [119.2126, 40.0232];
        _geoCoord[Ember.oloc('comp_echart_map_sx')] = [120.564, 29.7565];
        _geoCoord[Ember.oloc('comp_echart_map_lc')] = [115.9167, 36.4032];
        _geoCoord[Ember.oloc('comp_echart_map_zq')] = [112.1265, 23.5822];
        _geoCoord[Ember.oloc('comp_echart_map_zs')] = [122.2559, 30.2234];
        _geoCoord[Ember.oloc('comp_echart_map_sz')] = [120.6519, 31.3989];
        _geoCoord[Ember.oloc('comp_echart_map_lw')] = [117.6526, 36.2714];
        _geoCoord[Ember.oloc('comp_echart_map_hz')] = [115.6201, 35.2057];
        _geoCoord[Ember.oloc('comp_echart_map_yk')] = [122.4316, 40.4297];
        _geoCoord[Ember.oloc('comp_echart_map_hld')] = [120.1575, 40.578];
        _geoCoord[Ember.oloc('comp_echart_map_hs')] = [115.8838, 37.7161];
        _geoCoord[Ember.oloc('comp_echart_map_qz')] = [118.6853, 28.8666];
        _geoCoord[Ember.oloc('comp_echart_map_xn')] = [101.4038, 36.8207];
        _geoCoord[Ember.oloc('comp_echart_map_xa')] = [109.1162, 34.2004];
        _geoCoord[Ember.oloc('comp_echart_map_gy')] = [106.6992, 26.7682];
        _geoCoord[Ember.oloc('comp_echart_map_lyg')] = [119.1248, 34.552];
        _geoCoord[Ember.oloc('comp_echart_map_xt')] = [114.8071, 37.2821];
        _geoCoord[Ember.oloc('comp_echart_map_hd')] = [114.4775, 36.535];
        _geoCoord[Ember.oloc('comp_echart_map_zz')] = [113.4668, 34.6234];
        _geoCoord[Ember.oloc('comp_echart_map_eeds')] = [108.9734, 39.2487];
        _geoCoord[Ember.oloc('comp_echart_map_zq')] = [107.7539, 30.1904];
        _geoCoord[Ember.oloc('comp_echart_map_jh')] = [120.0037, 29.1028];
        _geoCoord[Ember.oloc('comp_echart_map_tc')] = [109.0393, 35.1947];
        _geoCoord[Ember.oloc('comp_echart_map_yc')] = [106.3586, 38.1775];
        _geoCoord[Ember.oloc('comp_echart_map_zj')] = [119.4763, 31.9702];
        _geoCoord[Ember.oloc('comp_echart_map_zc')] = [125.8154, 44.2584];
        _geoCoord[Ember.oloc('comp_echart_map_zs')] = [113.0823, 28.2568];
        _geoCoord[Ember.oloc('comp_echart_map_zz')] = [112.8625, 36.4746];
        _geoCoord[Ember.oloc('comp_echart_map_yq')] = [113.4778, 38.0951];
        _geoCoord[Ember.oloc('comp_echart_map_qd')] = [120.4651, 36.3373];
        _geoCoord[Ember.oloc('comp_echart_map_sg')] = [113.7964, 24.7028];


        app.CompEchartMapComponent = chartbase.extend({

            layout: Ember.ExtendHelper.compileEx(template),

            templateName: 'comp-echart-map',

            init: function() {
                this._super();
            },

            didInsertElement: function() {
                this._super();
            },

            baseoption: {
                backgroundColor: '#1b1b1b',
                color: ['gold', 'aqua', 'lime'],
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}'
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: [Ember.oloc('comp_echart_map_bj Top10'), Ember.oloc('comp_echart_map_sh Top10'), Ember.oloc('comp_echart_map_gz Top10')],
                    selectedMode: 'single',
                    selected: _selected,
                    textStyle: {
                        color: '#fff'
                    }
                },
                dataRange: {
                    min: 0,
                    max: 100,
                    calculable: true,
                    color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
                    textStyle: {
                        color: '#fff'
                    }
                },
                series: [{
                        name: Ember.oloc('comp_echart_map_qg'),
                        type: 'map',
                        roam: false,
                        hoverable: false,
                        mapType: 'china',
                        itemStyle: {
                            normal: {
                                borderColor: 'rgba(100,149,237,1)',
                                borderWidth: 0.5,
                                areaStyle: {
                                    color: '#1b1b1b'
                                },
                                label: {
                                    show: true
                                }
                            }
                        },
                        data: [],
                        markLine: {
                            smooth: true,
                            symbol: ['none', 'circle'],
                            symbolSize: 1,
                            itemStyle: {
                                normal: {
                                    color: '#fff',
                                    borderWidth: 1,
                                    borderColor: 'rgba(30,144,255,0.5)'
                                }
                            },
                            data: [
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_bt')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_bh')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_gz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zc')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zq')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zs')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_cd')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_cz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_dd')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_dl')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_dy')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_ya')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_fz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_hk')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_hhht')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_hf')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_hz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_heb')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zs')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_yc')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_qz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_nc')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_km')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_gy')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_lz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_ls')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_lyg')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_ly')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_lz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_nb')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_nj')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_nn')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_nt')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_sh')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_sy')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_xa')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_st')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_sz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_qd')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_jn')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_ty')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_wlmq')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_wf')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_wh')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_wz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_wh')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_wx')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_sm')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_xn')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_xz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_yt')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_yc')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zh')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_bt')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_bh')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_gz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zc')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zq')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zs')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_cd')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_dd')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_dl')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_fz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_hk')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_hhht')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_hf')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_heb')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zs')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_yc')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_nc')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_km')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_gy')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_lz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_ls')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_lyg')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_ly')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_lz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_nb')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_nn')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_bj')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_sy')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_qhd')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_xa')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_sjz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_st')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_sz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_qd')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_jn')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_tj')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_ty')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_wlmq')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_wf')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_wh')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_wz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_wh')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_sm')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_xn')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_xz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_yt')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zh')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_bh')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zc')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zq')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zs')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_cd')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_cz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_dl')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_fz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_hk')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_hhht')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_hf')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_hz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_heb')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zs')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_yc')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_nc')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_km')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_gy')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_lz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_ls')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_lyg')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_ly')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_lz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_nb')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_nj')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_nn')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_nt')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_bj')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_sh')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_sy')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_xa')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_sjz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_st')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_qd')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_jn')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_tj')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_ty')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_wlmq')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_wz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_wh')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_wx')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_sm')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_xn')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_xz')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_yt')
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_yc')
                                }]
                            ],
                        },
                        geoCoord: _geoCoord
                    },
                    {
                        name: Ember.oloc('comp_echart_map_bj Top10'),
                        type: 'map',
                        mapType: 'china',
                        data: [],
                        markLine: {
                            smooth: true,
                            effect: {
                                show: true,
                                scaleSize: 1,
                                period: 30,
                                color: '#fff',
                                shadowBlur: 10
                            },
                            itemStyle: {
                                normal: {
                                    borderWidth: 1,
                                    lineStyle: {
                                        type: 'solid',
                                        shadowBlur: 10
                                    }
                                }
                            },
                            data: [
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_sh'),
                                    value: 95
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_gz'),
                                    value: 90
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_dl'),
                                    value: 80
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_nn'),
                                    value: 70
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_nc'),
                                    value: 60
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_ls'),
                                    value: 50
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zc'),
                                    value: 40
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_bt'),
                                    value: 30
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zq'),
                                    value: 20
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_bj')
                                }, {
                                    name: Ember.oloc('comp_echart_map_cz'),
                                    value: 10
                                }]
                            ]
                        },
                        markPoint: {
                            symbol: 'emptyCircle',
                            symbolSize: function(v) {
                                return 10 + v / 10;
                            },
                            effect: {
                                show: true,
                                shadowBlur: 0
                            },
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false
                                    }
                                },
                                emphasis: {
                                    label: {
                                        position: 'top'
                                    }
                                }
                            },
                            data: [{
                                    name: Ember.oloc('comp_echart_map_sh'),
                                    value: 95
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_gz'),
                                    value: 90
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_dl'),
                                    value: 80
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_nn'),
                                    value: 70
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_nc'),
                                    value: 60
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_ls'),
                                    value: 50
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_zc'),
                                    value: 40
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_bt'),
                                    value: 30
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_zq'),
                                    value: 20
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_cz'),
                                    value: 10
                                }
                            ]
                        }
                    },
                    {
                        name: Ember.oloc('comp_echart_map_sh Top10'),
                        type: 'map',
                        mapType: 'china',
                        data: [],
                        markLine: {
                            smooth: true,
                            effect: {
                                show: true,
                                scaleSize: 1,
                                period: 30,
                                color: '#fff',
                                shadowBlur: 10
                            },
                            itemStyle: {
                                normal: {
                                    borderWidth: 1,
                                    lineStyle: {
                                        type: 'solid',
                                        shadowBlur: 10
                                    }
                                }
                            },
                            data: [
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_bt'),
                                    value: 95
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_km'),
                                    value: 90
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_gz'),
                                    value: 80
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zz'),
                                    value: 70
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zc'),
                                    value: 60
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zq'),
                                    value: 50
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zs'),
                                    value: 40
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_bj'),
                                    value: 30
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_dd'),
                                    value: 20
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_sh')
                                }, {
                                    name: Ember.oloc('comp_echart_map_dl'),
                                    value: 10
                                }]
                            ]
                        },
                        markPoint: {
                            symbol: 'emptyCircle',
                            symbolSize: function(v) {
                                return 10 + v / 10;
                            },
                            effect: {
                                show: true,
                                shadowBlur: 0
                            },
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false
                                    }
                                },
                                emphasis: {
                                    label: {
                                        position: 'top'
                                    }
                                }
                            },
                            data: [{
                                    name: Ember.oloc('comp_echart_map_bt'),
                                    value: 95
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_km'),
                                    value: 90
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_gz'),
                                    value: 80
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_zz'),
                                    value: 70
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_zc'),
                                    value: 60
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_zq'),
                                    value: 50
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_zs'),
                                    value: 40
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_bj'),
                                    value: 30
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_dd'),
                                    value: 20
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_dl'),
                                    value: 10
                                }
                            ]
                        }
                    },
                    {
                        name: Ember.oloc('comp_echart_map_gz Top10'),
                        type: 'map',
                        mapType: 'china',
                        data: [],
                        markLine: {
                            smooth: true,
                            effect: {
                                show: true,
                                scaleSize: 1,
                                period: 30,
                                color: '#fff',
                                shadowBlur: 10
                            },
                            itemStyle: {
                                normal: {
                                    borderWidth: 1,
                                    lineStyle: {
                                        type: 'solid',
                                        shadowBlur: 10
                                    }
                                }
                            },
                            data: [
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_fz'),
                                    value: 95
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_ty'),
                                    value: 90
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zc'),
                                    value: 80
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_zq'),
                                    value: 70
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_xa'),
                                    value: 60
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_cd'),
                                    value: 50
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_cz'),
                                    value: 40
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_bj'),
                                    value: 30
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_bh'),
                                    value: 20
                                }],
                                [{
                                    name: Ember.oloc('comp_echart_map_gz')
                                }, {
                                    name: Ember.oloc('comp_echart_map_hk'),
                                    value: 10
                                }]
                            ]
                        },
                        markPoint: {
                            symbol: 'emptyCircle',
                            symbolSize: function(v) {
                                return 10 + v / 10;
                            },
                            effect: {
                                show: true,
                                shadowBlur: 0
                            },
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false
                                    }
                                },
                                emphasis: {
                                    label: {
                                        position: 'top'
                                    }
                                }
                            },
                            data: [{
                                    name: Ember.oloc('comp_echart_map_fz'),
                                    value: 95
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_ty'),
                                    value: 90
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_zc'),
                                    value: 80
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_zq'),
                                    value: 70
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_xa'),
                                    value: 60
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_cd'),
                                    value: 50
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_cz'),
                                    value: 40
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_bj'),
                                    value: 30
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_bh'),
                                    value: 20
                                },
                                {
                                    name: Ember.oloc('comp_echart_map_hk'),
                                    value: 10
                                }
                            ]
                        }
                    }
                ]
            },
            themeChanged: Ember.observer('customTheme', function() {
                this.notifyPropertyChange('datasource');
            }),
            datasourceChanged: Ember.observer('datasource', function() {
                var data = this.get('datasource');
                if (data) {
                    var option = this.initialOption();

                    this.setOption(option);
                }
            }).on('didInsertElement'),

            initialOption: function() {
                //var option = $.extend(true, {}, this.baseoption);
                var option = $.extend(true, {}, this.baseoption, this.get('customTheme') && this.get('customTheme').option);
                return option;
            }
        });
    });