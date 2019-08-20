/**
 * 项目：gvml
 * SpatialAnalysisTool.js
 * 作者：李强
 * 部门：可视化插件研发
 * 邮箱：liq@geovis.com.cn
 * 日期：2017-08-15 14:00:00.
 * 用途：空间分析工具
 */

 /**
  * 插件名称：空间分析插件（spatialAnalysisTool）
  * 插件功能：依据地形数据提供路径分析、可视域分析、挖方分析、淹没分析、空间距离量算、山体阴影分析、等值线分析、山脊线分析、山谷线分析、鞍部点提取、山顶点提取等空间分析结果的可视化
  * 备注：该插件仅仅提供了空间分析可视化的能力，分析结果来源于空间分析服务，因此在使用该插件时必须连接空间分析服务
  * 具体使用方法如下：
  *     第一步：启用工具： var tool = earth.setCurrentTool('spatialAnalysisTool');
  *     第二步：配置空间分析服务地址，如下：
  *     tool.configUrl({
  *         ts:     'http://127.0.0.1:3000/ts',             //点点通视分析(目前不支持)
            pm:     'http://127.0.0.1:3000/pm',             //剖面分析(目前不支持)
            buffer: 'http://127.0.0.1:3000/buffer',         //缓冲区分析(目前不支持)
            height: 'http://127.0.0.1:3000/height',         //高度分析(目前不支持)
            slope:  'http://127.0.0.1:3000/slope',          //坡度分析(目前不支持)
            path:   'http://www.mindistance.geovis.ai',     //路径分析
            va:     'http://www.visibleanalysis.geovis.ai', //可视域分析
            wf:     'http://www.twanalysis.geovis.ai',      //挖方分析
            ym:     'http://www.floodanalysis.geovis.ai',   //淹没分析
            da:     'http://www.disanalysis.geovis.ai',     //空间距离量算
            rv:     'http://www.rastertovector.geovis.ai',  //栅格矢量化(目前不支持)
            hs:     'http://www.hillshade.geovis.ai',       //山体阴影分析
            cl:     'http://www.contourline.geovis.ai',     //等值线分析
            gr:     'http://www.getridge.geovis.ai',        //山脊线分析
            gv:     'http://www.getvalley.geovis.ai',       //山谷线分析
            gs:     'http://www.getsaddle.geovis.ai',       //鞍部点提取
            mp:     'http://www.moutainpoint.geovis.ai'     //山顶点提取
  *     });
  *     第三步：移除工具： 使用命令earth.setCurrentTool(null);或点击空间分析面板左上角的关闭按钮
  */

class SpatialAnalysisTool extends GV.Tool {

    reference() {
        this.html = './SpatialAnalysisTool.html';
        this.css = ['./bootstrap-3.3.7-dist/css/bootstrap.min.css', './SpatialAnalysisTool.css'];
        this.script = ['./jquery-3.1.1.min.js', './bootstrap-3.3.7-dist/js/bootstrap.min.js'];
    }

    init() {
        this.pmModle = {
            count: 0,
            start: null,
            end: null,
        };

        this.slopeData = [];

        this.tsModle = {
            count: 0,
            start: null,
            end: null,
        }

        this.firstPosition = {
            value: false,
            lon: null,
            lat: null
        }

        this.options = {
            // url: 'http://127.0.0.1:8251/spatialanalysis/',
            slope: {
                legend: {
                    "#38a800": '< 30°',
                    "#5ebd00": '30°-45°',
                    "#8bd100": '45°-55°',
                    "#c1e800": '55°-65°',
                    "#ffff00": '65°-70°',
                    "#ffbf00": '70°-75°',
                    "#ff8000": '75°-80°',
                    "#ff4000": '80°-85°',
                    "#ff0000": '≥ 85°'
                }
            }
        };


        // this.options['urls'] = {
        //     ts:     'http://127.0.0.1:3000/ts',                                 //点点通视分析(目前不支持)
        //     pm:     'http://127.0.0.1:3000/pm',                                 //剖面分析(目前不支持)
        //     buffer: 'http://127.0.0.1:3000/buffer',                             //缓冲区分析(目前不支持)
        //     path:   'http://127.0.0.1:3000/mindistance',                        //路径分析
        //     height: 'http://127.0.0.1:3000/height',                             //高度分析(目前不支持)
        //     slope:  'http://127.0.0.1:3000/slope',                              //坡度分析
        //     va:     'http://127.0.0.1:3000/visibleanalysis',                    //可视域分析
        //     wf:     'http://127.0.0.1:3000/twanalysis',                         //挖方分析
        //     ym:     'http://127.0.0.1:3000/floodanalysis',                      //淹没分析
        //     da:     'http://127.0.0.1:3000/disanalysis',                        //空间距离量算
        //     rv:     'http://127.0.0.1:3000/rastertovector',                     //栅格矢量化
        //     hs:     'http://127.0.0.1:3000/hillshade',                          //山体阴影分析
        //     cl:     'http://127.0.0.1:3000/contourline',                        //等值线分析
        //     gr:     'http://127.0.0.1:3000/getridge',                           //山脊线分析
        //     gv:     'http://127.0.0.1:3000/getvalley',                          //山谷线分析
        //     gs:     'http://127.0.0.1:3000/getsaddle',                          //鞍部点提取
        //     mp:     'http://127.0.0.1:3000/moutainpoint'                        //山顶点提取
        // };

        this.options['urls'] = {
            ts:     'http://127.0.0.1:3000/ts',                                 //点点通视分析
            pm:     'http://127.0.0.1:3000/pm',                                 //剖面分析
            buffer: 'http://127.0.0.1:3000/buffer',                             //缓冲区分析
            height: 'http://127.0.0.1:3000/height',                     //高度分析
            slope:  'http://127.0.0.1:3000/slope',                      //坡度分析
            path:   'http://www.mindistance.geovis.ai',                        //路径分析
            va:     'http://www.visibleanalysis.geovis.ai',                    //可视域分析
            wf:     'http://www.twanalysis.geovis.ai',                         //挖方分析
            ym:     'http://www.floodanalysis.geovis.ai',                      //淹没分析
            da:     'http://www.disanalysis.geovis.ai',                        //空间距离量算
            rv:     'http://www.rastertovector.geovis.ai',                     //栅格矢量化
            hs:     'http://www.hillshade.geovis.ai',                          //山体阴影分析
            cl:     'http://www.contourline.geovis.ai',                        //等值线分析
            gr:     'http://www.getridge.geovis.ai',                           //山脊线分析
            gv:     'http://www.getvalley.geovis.ai',                          //山谷线分析
            gs:     'http://www.getsaddle.geovis.ai',                          //鞍部点提取
            mp:     'http://www.moutainpoint.geovis.ai'                        //山顶点提取
        };

        this.scene = new GV.GraphicScene();
        this.earth.addScene(this.scene);

        this.initUI();
    }

    initUI() {
        // const parent = $(document.body);
        const parent = this.earth.container;
        const height = parent.outerHeight();
        const left = parent.outerWidth();
        this.$element = GV.Util.$("<div style='position: absolute;'>").addClass("geovis-sp").appendTo(parent);
        // this.$element.css({
        //     top: height - 400,
        //     left: left - 600
        // });

        this.$element.css({
            right: 50,
            bottom: 100
        });

        this.$close = GV.Util.$("<span>").addClass("closeSpan").appendTo(this.$element);
        this.$close.click(() => {
            this.getEarth().setCurrentTool();
        })

        // this.$element.draggable({
        //     containment: parent,
        //     cursor: 'move' 
        // });
        this.$header = $('<div>').appendTo(this.$element);
        $("<div style='float: left;background-color: #23bbe8; width: 10px;height: 16px;margin-top: 11px'>").appendTo(this.$header);
        this.$title = $("<div style='float: left;margin: 0 10px'>").addClass("title").html("空间分析").appendTo(this.$header);
        this.$tabUl = $('<ul style="float: left">').addClass("nav nav-tabs").appendTo(this.$header);
        this.$tabContent = $('<div>').addClass('tab-content g_toggle_wrap').appendTo(this.$element);

        // 通视分析
        // this.$ts = $(`<li><a class="ts" title="通视分析" href='#sp-ts' data-toggle="tab"></a></li>`).appendTo(this.$tabUl);
        // this.$tsContent = $(`<div class="tab-pane" id="sp-ts">`).appendTo(this.$tabContent);

        // let table = $("<table class='ts'>").appendTo(this.$tsContent);

        // let tr = $('<tr>').appendTo(table);
        // let td = $('<td  width="100">').appendTo(tr);
        // $('<label>').text("点击选中:").appendTo(td);
        // td = $('<td>').appendTo(tr);
        // let btnToolbar = $('<div class="btn-toolbar" id="select_btn">').appendTo(td);
        // this.$TSBtn = $('<button type="button" class="btn btn-group rect btn-default btn-lg">').click((e) => {
        //     this.offAllEvents();
        //     if ($(e.target).hasClass('active')) {
        //         $(e.target).removeClass('active');
        //     } else {
        //         $(e.target).addClass('active');
        //         this.TSAnalysis();
        //     }
        // }).appendTo(btnToolbar);

        // tr = $('<tr>').appendTo(table);
        // td = $('<td>').appendTo(tr);
        // $('<label>').text("观察点高度:").appendTo(td);
        // this.$tsStart = $('<td>').appendTo(tr);

        // tr = $('<tr>').appendTo(table);
        // td = $('<td>').appendTo(tr);
        // $('<label>').text("目标点高度:").appendTo(td);
        // this.$tsEnd = $('<td>').appendTo(tr);
        // tr = $('<tr>').appendTo(table);
        // this.$tsError = $('<td colspan="2">').appendTo(tr);

        // tr = $('<tr>').appendTo(table);
        // td = $('<td width="100">').appendTo(tr);
        // $('<label>').text("可见区域:").appendTo(td);
        // td = $('<td>').appendTo(tr);
        // $('<div>').css({width: 50, height: 20, backgroundColor: '#0bc20b', 'margin-bottom': 5}).appendTo(td);

        // tr = $('<tr>').appendTo(table);
        // td = $('<td>').appendTo(tr);
        // $('<label>').text("不可见区域:").appendTo(td);
        // td = $('<td>').appendTo(tr);
        // $('<div>').css({width: 50, height: 20, backgroundColor: '#c00c0a', 'margin-bottom': 5}).appendTo(td);
        
        // 剖面分析
        // this.$pm = $('<li><a class="pm" title="剖面分析" href="#sp-pm" data-toggle="tab"></a></li>').appendTo(this.$tabUl);
        // this.$pmContent = $(`<div class="tab-pane" id="sp-pm">`).appendTo(this.$tabContent);
        // this.$pmChart = $('<div style="width: 800px;height: 300px">').appendTo(this.$pmContent);

        // 缓冲区分析
        // this.$buffer = $('<li><a class="buffer" title="缓冲区分析" href="#sp-buffer" data-toggle="tab"></a></li>').appendTo(this.$tabUl);
        // this.$bufferContent = $(`<div class="tab-pane" id="sp-buffer">`).appendTo(this.$tabContent);

        // 最短路径分析
        this.$path = $('<li><a class="path" title="路径分析：根据地形分析能够通行的最短路径" href="#sp-path" data-toggle="tab"></a></li>').appendTo(this.$tabUl);
        this.$pathContent = $('<div class="tab-pane" id="sp-path">').appendTo(this.$tabContent);

        let table = $('<table class="path">').appendTo(this.$pathContent);

        let tr = $('<tr>').appendTo(table);
        let td = $('<td  width="100">').appendTo(tr);
        $('<label>').text("点击选中:").appendTo(td);
        td = $('<td>').appendTo(tr);
        let btnToolbar = $('<div class="btn-toolbar" id="select_btn">').appendTo(td);
        this.$pathBtn = $('<button type="button" class="btn btn-group rect btn-default btn-lg">').click((e) => {
            this.offAllEvents();
            if ($(e.target).hasClass('active')) {
                $(e.target).removeClass('active');
            } else {
                $(e.target).addClass('active');
                this.LJAnalysis();
            }
        }).appendTo(btnToolbar);

        tr = $('<tr>').appendTo(table);
        td = $('<td width="100">').appendTo(tr);
        $('<label>').text("起点经度:").appendTo(td);
        this.$pathAnalysisSL = $('<td>').appendTo(tr);

        tr = $('<tr>').appendTo(table);
        td = $('<td width="100">').appendTo(tr);
        $('<label>').text('起点纬度:').appendTo(td);
        this.$pathAnalysisSA = $('<td>').appendTo(tr);

        tr = $('<tr>').appendTo(table);
        td = $('<td width="100">').appendTo(tr);
        $('<label>').text("终点经度:").appendTo(td);
        this.$pathAnalysisEL = $('<td>').appendTo(tr);

        tr = $('<tr>').appendTo(table);
        td = $('<td width="100">').appendTo(tr);
        $('<label>').text('终点纬度:').appendTo(td);
        this.$pathAnalysisEA = $('<td>').appendTo(tr);

        // 高度分析
        // this.$height = $('<li><a class="height" title="高度分析" href="#sp-height" data-toggle="tab"></a></li>').appendTo(this.$tabUl);
        // this.$heightContent = $('<div class="tab-pane" id="sp-height">').appendTo(this.$tabContent);

        // 坡度分析
        // this.$slope = $('<li><a class="slope" title="坡度分析" href="#sp-slope" data-toggle="tab"></a></li>').appendTo(this.$tabUl);
        // this.$slopeContent = $('<div class="tab-pane" id="sp-slope">').appendTo(this.$tabContent);
        //操作区域
        // table = $('<table class="slope" style="float: left">').appendTo(this.$slopeContent);

        // tr = $('<tr>').appendTo(table);
        // td = $('<td colspan="2">').appendTo(tr);
        // btnToolbar = $('<div class="btn-toolbar">').appendTo(td);
        // $('<div class="btn-group rect">').click((e) => {
        //     this.drawSlopeRect();
        // }).appendTo(btnToolbar);

        // tr = $('<tr>').appendTo(table);
        // td = $('<td colspan="2"  width="100">').appendTo(tr);
        // $('<label>').text("点击选中:").appendTo(td);
        // td = $('<td>').appendTo(tr);
        // btnToolbar = $('<div class="btn-toolbar" id="select_btn">').appendTo(td);
        // this.$slopeBtn = $('<button type="button" class="btn btn-group rect btn-default btn-lg">').click((e) => {
        //     this.offAllEvents();
        //     if ($(e.target).hasClass('active')) {
        //         $(e.target).removeClass('active');
        //     } else {
        //         $(e.target).addClass('active');
        //         this.drawSlopeRect();
        //     }
        // }).appendTo(btnToolbar);

        // tr = $('<tr>').appendTo(table);
        // td = $('<td>').appendTo(tr);
        // $('<label>').text('经度: ').appendTo(td);
        // this.$slopeX = $('<td>').appendTo(tr);

        // tr = $('<tr>').appendTo(table);
        // td = $('<td>').appendTo(tr);
        // $('<label>').text('纬度: ').appendTo(td);
        // this.$slopeY = $('<td>').appendTo(tr);

        // tr = $('<tr>').appendTo(table);
        // td = $('<td>').appendTo(tr);
        // $('<label>').text('高度: ').appendTo(td);
        // this.$slopeZ = $('<td>').appendTo(tr);

        // tr = $('<tr>').appendTo(table);
        // td = $('<td>').appendTo(tr);
        // $('<label>').text("坡度: ").appendTo(td);
        // this.$slopeS = $('<td>').appendTo(tr);

        // tr = $('<tr>').appendTo(table);
        // td = $('<td>').appendTo(tr);
        // $('<label>').text('坡向: ').appendTo(td);
        // this.$slopeA = $('<td>').appendTo(tr);

        // table = $('<table>').appendTo($('<div class="slope-legend">').appendTo(this.$slopeContent));

        // tr = $('<tr>').appendTo(table);
        // td = $('<td colspan="2">').text('坡度分析图例').appendTo(tr);

        // for (let color in this.options.slope.legend) {
        //     $(`<tr><td><span class="legend-img" style="background-color:${color}; line-height: 10px"></span></td><td class="legend-text">${this.options.slope.legend[color]}</td></tr>`).appendTo(table);
        // }

         // 可视区域分析
        this.$visibleArea = $(`<li><a class="visibleArea" title="可视区域分析：分析视点周围指定范围内的可视情况" href='#sp-visibleArea' data-toggle="tab"></a></li>`).appendTo(this.$tabUl);
        this.$visibleAreaContent = $(`<div class="tab-pane" id="sp-visibleArea">`).appendTo(this.$tabContent);

        table = $("<table class='visibleArea'>").appendTo(this.$visibleAreaContent);

        tr = $('<tr>').appendTo(table);
        td = $('<td  width="100">').appendTo(tr);
        $('<label>').text("点击选中:").appendTo(td);
        td = $('<td>').appendTo(tr);
        btnToolbar = $('<div class="btn-toolbar"  id="select_btn">').appendTo(td);
        this.$visibleAreaBtn = $('<button type="button" class="btn btn-group rect btn-default btn-lg">').click((e) => {
            this.offAllEvents();
            if ($(e.target).hasClass('active')) {
                $(e.target).removeClass('active');
            } else {
                $(e.target).addClass('active');
                this.TSRangeAnalysis();
            }
        }).appendTo(btnToolbar);

        tr = $('<tr>').appendTo(table);
        td = $('<td width="100">').appendTo(tr);
        $('<label>').text('分析半径:').appendTo(td);
        td = $('<td>').appendTo(tr);
        this.$visibleAreaRadiusInput = $('<input type="number" class="form-control" id="visibleAreaRadiusInput"  value="5">').css({width: 90, height: 30, backgroundColor: '#CCCCCC'}).appendTo(td);
        td = $('<td>').appendTo(tr);
        $('<label>').css({'margin-left': 15}).text('公里').appendTo(td);

        tr = $('<tr>').appendTo(table);
        td = $('<td width="100">').appendTo(tr);
        $('<label>').text("视点经度:").appendTo(td);
        this.$visibleAreaLon = $('<td>').appendTo(tr);

        tr = $('<tr>').appendTo(table);
        td = $('<td width="100">').appendTo(tr);
        $('<label>').text('视点纬度:').appendTo(td);
        this.$visibleAreaLat = $('<td>').appendTo(tr);

        tr = $('<tr>').appendTo(table);
        td = $('<td width="100">').appendTo(tr);
        $('<label>').text("可见区域:").appendTo(td);
        td = $('<td>').appendTo(tr);
        $('<div>').css({width: 50, height: 20, backgroundColor: '#0bc20b', 'margin-bottom': 5}).appendTo(td);

        tr = $('<tr>').appendTo(table);
        td = $('<td>').appendTo(tr);
        $('<label>').text('不可见区域:').appendTo(td);
        td = $('<td>').appendTo(tr);
        $('<div>').css({width: 50, height: 20, backgroundColor: '#c00c0a', 'margin-bottom': 5}).appendTo(td);

         // 挖方分析
        this.$wf = $('<li><a class="wf" title="挖方分析：根据设置基准面分析选择区域内的填挖情况" href="#sp-wf" data-toggle="tab"></a></li>').appendTo(this.$tabUl);
        this.$wfContent = $('<div class="tab-pane" id="sp-wf">').appendTo(this.$tabContent);

        table = $('<table class="wf">').appendTo(this.$wfContent);

        tr = $('<tr>').appendTo(table);
        td = $('<td  width="100">').appendTo(tr);
        $('<label>').text("点击选中:").appendTo(td);
        td = $('<td>').appendTo(tr);
        btnToolbar = $('<div class="btn-toolbar"  id="select_btn">').appendTo(td);
        this.$wfBtn = $('<button type="button" class="btn btn-group rect btn-default btn-lg">').click((e) => {
            this.offAllEvents();
            if ($(e.target).hasClass('active')) {
                $(e.target).removeClass('active');
            } else {
                $(e.target).addClass('active');
                this.WFAnalysis();
            }
        }).appendTo(btnToolbar);

        tr = $('<tr>').appendTo(table);
        td = $('<td width="100">').appendTo(tr);
        $('<label>').text('基准面高度:').appendTo(td);
        td = $('<td>').appendTo(tr);
        this.$wfLevelInput = $('<input type="number" class="form-control" id="wfLevelInput" value="200">').css({width: 90, height: 30, backgroundColor: '#CCCCCC'}).appendTo(td);
        td = $('<td>').appendTo(tr);
        $('<label>').css({'margin-left': 15}).text('米').appendTo(td);

        tr = $('<tr>').appendTo(table);
        td = $('<td width="100">').appendTo(tr);
        $('<label>').text("挖区域:").appendTo(td);
        td = $('<td>').appendTo(tr);
        $('<div>').css({width: 50, height: 20, backgroundColor: '#c00000', 'margin-bottom': 5}).appendTo(td);

        tr = $('<tr>').appendTo(table);
        td = $('<td>').appendTo(tr);
        $('<label>').text('填区域:').appendTo(td);
        td = $('<td>').appendTo(tr);
        $('<div>').css({width: 50, height: 20, backgroundColor: '#0000c0', 'margin-bottom': 5}).appendTo(td);

        tr = $('<tr>').appendTo(table);
        td = $('<td>').appendTo(tr);
        $('<label>').text('保持区域:').appendTo(td);
        td = $('<td>').appendTo(tr);
        $('<div>').css({width: 50, height: 20, backgroundColor: '#00c000', 'margin-bottom': 5}).appendTo(td);

         // 淹没分析
        this.$ym = $('<li><a class="ym" title="淹没分析：根据蓄水点分析选中区域内的被水淹没情况" href="#sp-ym" data-toggle="tab"></a></li>').appendTo(this.$tabUl);
        this.$ymContent = $('<div class="tab-pane" id="sp-ym">').appendTo(this.$tabContent);

        table = $("<table class='ym'>").appendTo(this.$ymContent);

        tr = $('<tr>').appendTo(table);
        td = $('<td  width="100">').appendTo(tr);
        $('<label>').text("点击选中:").appendTo(td);
        td = $('<td>').appendTo(tr);
        btnToolbar = $('<div class="btn-toolbar"  id="select_btn">').appendTo(td);
        this.$ymBtn = $('<button type="button" class="btn btn-group rect btn-default btn-lg">').click((e) => {
            this.offAllEvents();
            if ($(e.target).hasClass('active')) {
                $(e.target).removeClass('active');
            } else {
                $(e.target).addClass('active');
                this.YMAnalysis();
            }
        }).appendTo(btnToolbar);

        tr = $('<tr>').appendTo(table);
        td = $('<td>').appendTo(tr);
        $('<label>').text('淹没区域:').appendTo(td);
        td = $('<td>').appendTo(tr);
        $('<div>').css({width: 50, height: 20, backgroundColor: '#0000c0', 'margin-bottom': 5}).appendTo(td);

        tr = $('<tr>').appendTo(table);
        td = $('<td>').appendTo(tr);
        $('<label>').text('未淹没区域:').appendTo(td);
        td = $('<td>').appendTo(tr);
        $('<div>').css({width: 50, height: 20, backgroundColor: '#00c000', 'margin-bottom': 5}).appendTo(td);

         // 空间距离量算
        this.$ym = $('<li><a class="disanalysis" title="空间距离量算：计算两点间的空间距离" href="#sp-disanalysis" data-toggle="tab"></a></li>').appendTo(this.$tabUl);
        this.$ymContent = $('<div class="tab-pane" id="sp-disanalysis">').appendTo(this.$tabContent);

        table = $("<table class='disanalysis'>").appendTo(this.$ymContent);

        tr = $('<tr>').appendTo(table);
        td = $('<td  width="100">').appendTo(tr);
        $('<label>').text("点击选中:").appendTo(td);
        td = $('<td>').appendTo(tr);
        btnToolbar = $('<div class="btn-toolbar"  id="select_btn">').appendTo(td);
        this.$disanalysisBtn = $('<button type="button" class="btn btn-group rect btn-default btn-lg">').click((e) => {
            this.offAllEvents();
            if ($(e.target).hasClass('active')) {
                $(e.target).removeClass('active');
            } else {
                $(e.target).addClass('active');
                this.DisAnalysis();
            }
        }).appendTo(btnToolbar);

        tr = $('<tr>').appendTo(table);
        td = $('<td width="100">').appendTo(tr);
        $('<label>').text("起点经度:").appendTo(td);
        this.$disAnalysisSL = $('<td>').appendTo(tr);

        tr = $('<tr>').appendTo(table);
        td = $('<td width="100">').appendTo(tr);
        $('<label>').text('起点纬度:').appendTo(td);
        this.$disAnalysisSA = $('<td>').appendTo(tr);

        tr = $('<tr>').appendTo(table);
        td = $('<td width="100">').appendTo(tr);
        $('<label>').text("终点经度:").appendTo(td);
        this.$disAnalysisEL = $('<td>').appendTo(tr);

        tr = $('<tr>').appendTo(table);
        td = $('<td width="100">').appendTo(tr);
        $('<label>').text('终点纬度:').appendTo(td);
        this.$disAnalysisEA = $('<td>').appendTo(tr);

        tr = $('<tr>').appendTo(table);
        td = $('<td width="100">').appendTo(tr);
        $('<label>').text("空间距离:").appendTo(td);
        this.$disAnalysisResult = $('<td>').appendTo(tr);

        // 栅格矢量化
        // this.$rv = $('<li><a class="rv" title="栅格矢量化" href="#sp-rv" data-toggle="tab"></a></li>').appendTo(this.$tabUl);
        // this.$rvContent = $('<div class="tab-pane" id="sp-rv">').appendTo(this.$tabContent);

        // table = $("<table class='rv'>").appendTo(this.$rvContent);

        // tr = $('<tr>').appendTo(table);
        // td = $('<td  width="100">').appendTo(tr);
        // $('<label>').text("点击选中:").appendTo(td);
        // td = $('<td>').appendTo(tr);
        // btnToolbar = $('<div class="btn-toolbar"  id="select_btn">').appendTo(td);
        // this.$rvBtn = $('<button type="button" class="btn btn-group rect btn-default btn-lg">').click((e) => {
        //     this.offAllEvents();
        //     if ($(e.target).hasClass('active')) {
        //         $(e.target).removeClass('active');
        //     } else {
        //         $(e.target).addClass('active');
        //         this.RasterToVector();
        //     }
        // }).appendTo(btnToolbar);

        //山体阴影分析
        this.$hs = $('<li><a class="hs" title="山体阴影分析：根据设置太阳参分析选中范围内的阴影" href="#sp-hs" data-toggle="tab"></a></li>').appendTo(this.$tabUl);
        this.$hsContent = $('<div class="tab-pane" id="sp-hs">').appendTo(this.$tabContent);

        table = $("<table class='hs'>").appendTo(this.$hsContent);

        tr = $('<tr>').appendTo(table);
        td = $('<td  width="100">').appendTo(tr);
        $('<label>').text("点击选中:").appendTo(td);
        td = $('<td>').appendTo(tr);
        btnToolbar = $('<div class="btn-toolbar">').appendTo(td);
        this.$hsBtn = $('<button type="button" class="btn btn-group rect btn-default btn-lg">').click((e) => {
            this.offAllEvents();
            if ($(e.target).hasClass('active')) {
                $(e.target).removeClass('active');
            } else {
                $(e.target).addClass('active');
                this.HSAnalysis();
            }
        }).appendTo(btnToolbar);

        // tr = $('<tr>').appendTo(table);
        // td = $('<td width="120">').appendTo(tr);
        // $('<label>').text('垂直夸张系数:').appendTo(td);
        // td = $('<td>').appendTo(tr);
        // this.$factorInput = $('<input type="number" class="form-control" id="hsFactorInput" value="1">').css({width: 90, height: 30, backgroundColor: '#CCCCCC'}).appendTo(td);

        // tr = $('<tr>').appendTo(table);
        // td = $('<td width="120">').appendTo(tr);
        // $('<label>').text('太阳方位角:').appendTo(td);
        // td = $('<td>').appendTo(tr);
        // this.$azimuthInput = $('<input type="number" class="form-control" id="hsAzimuthInput" value="300">').css({width: 90, height: 30, backgroundColor: '#CCCCCC'}).appendTo(td);
        // td = $('<td>').appendTo(tr);
        // $('<label>').css({'margin-left': 15}).text('度').appendTo(td);

        // tr = $('<tr>').appendTo(table);
        // td = $('<td width="120">').appendTo(tr);
        // $('<label>').text('太阳垂直角:').appendTo(td);
        // td = $('<td>').appendTo(tr);
        // this.$verticalInput = $('<input type="number" class="form-control" id="hsVerticalInput" value="40">').css({width: 90, height: 30, backgroundColor: '#CCCCCC'}).appendTo(td);
        // td = $('<td>').appendTo(tr);
        // $('<label>').css({'margin-left': 15}).text('度').appendTo(td);

        //等值线分析
        this.$cl = $('<li><a class="cl" title="等值线分析：分析选中区域内的等高线" href="#sp-cl" data-toggle="tab"></a></li>').appendTo(this.$tabUl);
        this.$clContent = $('<div class="tab-pane" id="sp-cl">').appendTo(this.$tabContent);

        table = $("<table class='cl'>").appendTo(this.$clContent);

        tr = $('<tr>').appendTo(table);
        td = $('<td  width="100">').appendTo(tr);
        $('<label>').text("点击选中:").appendTo(td);
        td = $('<td>').appendTo(tr);
        btnToolbar = $('<div class="btn-toolbar"  id="select_btn">').appendTo(td);
        this.$clBtn = $('<button type="button" class="btn btn-group rect btn-default btn-lg">').click((e) => {
            this.offAllEvents();
            if ($(e.target).hasClass('active')) {
                $(e.target).removeClass('active');
            } else {
                $(e.target).addClass('active');
                this.CLAnalysis();
            }
        }).appendTo(btnToolbar);

        // 山脊线分析
        this.$rl = $('<li><a class="rl" title="山脊线分析：分析选中区域内的山脊线" href="#sp-rl" data-toggle="tab"></a></li>').appendTo(this.$tabUl);
        this.$rlContent = $('<div class="tab-pane" id="sp-rl">').appendTo(this.$tabContent);

        table = $("<table class='rl'>").appendTo(this.$rlContent);

        tr = $('<tr>').appendTo(table);
        td = $('<td  width="100">').appendTo(tr);
        $('<label>').text("点击选中:").appendTo(td);
        td = $('<td>').appendTo(tr);
        btnToolbar = $('<div class="btn-toolbar"  id="select_btn">').appendTo(td);
        this.$rlBtn = $('<button type="button" class="btn btn-group rect btn-default btn-lg">').click((e) => {
            this.offAllEvents();
            if ($(e.target).hasClass('active')) {
                $(e.target).removeClass('active');
            } else {
                $(e.target).addClass('active');
                this.RLAnalysis();
            }
        }).appendTo(btnToolbar);

        // 山谷线分析
        this.$vl = $('<li><a class="vl" title="山谷线分析：分析选中区域内的山谷线" href="#sp-vl" data-toggle="tab"></a></li>').appendTo(this.$tabUl);
        this.$vlContent = $('<div class="tab-pane" id="sp-vl">').appendTo(this.$tabContent);

        table = $("<table class='vl'>").appendTo(this.$vlContent);

        tr = $('<tr>').appendTo(table);
        td = $('<td  width="100">').appendTo(tr);
        $('<label>').text("点击选中:").appendTo(td);
        td = $('<td>').appendTo(tr);
        btnToolbar = $('<div class="btn-toolbar"  id="select_btn">').appendTo(td);
        this.$vlBtn = $('<button type="button" class="btn btn-group rect btn-default btn-lg">').click((e) => {
            this.offAllEvents();
            if ($(e.target).hasClass('active')) {
                $(e.target).removeClass('active');
            } else {
                $(e.target).addClass('active');
                this.VLAnalysis();
            }
        }).appendTo(btnToolbar);

        // 鞍部点提取
        this.$saddleP = $('<li><a class="saddleP" title="鞍部点提取：提取选中区域内的鞍部点" href="#sp-saddleP" data-toggle="tab"></a></li>').appendTo(this.$tabUl);
        this.$saddlePContent = $('<div class="tab-pane" id="sp-saddleP">').appendTo(this.$tabContent);

        table = $("<table class='saddleP'>").appendTo(this.$saddlePContent);

        tr = $('<tr>').appendTo(table);
        td = $('<td  width="100">').appendTo(tr);
        $('<label>').text("点击选中:").appendTo(td);
        td = $('<td>').appendTo(tr);
        btnToolbar = $('<div class="btn-toolbar" id="select_btn">').appendTo(td);
        this.$saddlePBtn = $('<button type="button" class="btn btn-group rect btn-default btn-lg">').click((e) => {
            this.offAllEvents();
            if ($(e.target).hasClass('active')) {
                $(e.target).removeClass('active');
            } else {
                $(e.target).addClass('active');
                this.SaddlePointAnalysis();
            }
        }).appendTo(btnToolbar);

        // 山顶点提取
        this.$moutainP = $('<li><a class="moutainP" title="山顶点提取：提取选中区域内的山顶点" href="#sp-moutainP" data-toggle="tab"></a></li>').appendTo(this.$tabUl);
        this.$moutainPContent = $('<div class="tab-pane" id="sp-moutainP">').appendTo(this.$tabContent);

        table = $("<table class='moutainP'>").appendTo(this.$moutainPContent);

        tr = $('<tr>').appendTo(table);
        td = $('<td  width="100">').appendTo(tr);
        $('<label>').text("点击选中:").appendTo(td);
        td = $('<td>').appendTo(tr);
        btnToolbar = $('<div class="btn-toolbar"  id="select_btn">').appendTo(td);
        this.$moutainPBtn = $('<button type="button" class="btn btn-group rect btn-default btn-lg">').click((e) => {
            this.offAllEvents();
            if ($(e.target).hasClass('active')) {
                $(e.target).removeClass('active');
            } else {
                $(e.target).addClass('active');
                this.MoutainPointAnalysis();
            }
        }).appendTo(btnToolbar);

        tr = $('<tr>').appendTo(table);
        td = $('<td  width="100">').appendTo(tr);
        $('<label>').text("尖顶山:").appendTo(td);
        td = $('<td>').appendTo(tr);
        $('<span class="sp-mountain-top-mark sp-mountain-top-mark-spire">').appendTo(td);

        tr = $('<tr>').appendTo(table);
        td = $('<td  width="100">').appendTo(tr);
        $('<label>').text("圆顶山:").appendTo(td);
        td = $('<td>').appendTo(tr);
        $('<span class="sp-mountain-top-mark sp-mountain-top-mark-dome">').appendTo(td);

        tr = $('<tr>').appendTo(table);
        td = $('<td  width="100">').appendTo(tr);
        $('<label>').text("平顶山:").appendTo(td);
        td = $('<td>').appendTo(tr);
        $('<span class="sp-mountain-top-mark sp-mountain-top-mark-flat">').appendTo(td);



        this.lastClickItem = null;

        $('a[data-toggle="tab"]').on('click', (e) => {
            if (this.lastClickItem && this.lastClickItem === $(e.target)) return;
            this.lastClickItem = $(e.target);
            this.onTabShow(e.target);
        })
        // this.$ts.find('a').tab('show');

        // this.earth.on('mouseClick', this.onWFClick, this);
    }

    showOrHide() {
        if (this.$element.css('display') == 'none') {
            this.$element.show();
            this.onTabShow(this.lastClickItem);
        } else {
            this.hide();
            this.scene.clear()
        }
    }

    hide() {
        this.offAllEvents();
        this.$element.hide();
    }

    onTabShow(tabElement) {
        tabElement = $(tabElement);
        this.offAllEvents();
        // if (this.$TSBtn.hasClass('active')) {
        //     this.$TSBtn.removeClass('active');
        // }
        if (this.$pathBtn.hasClass('active')) {
            this.$pathBtn.removeClass('active');
        }
        // if (this.$slopeBtn.hasClass('active')) {
        //     this.$slopeBtn.removeClass('active');
        // }
        if (this.$visibleAreaBtn.hasClass('active')) {
            this.$visibleAreaBtn.removeClass('active');
        }
        if (this.$wfBtn.hasClass('active')) {
            this.$wfBtn.removeClass('active');
        }
        if (this.$ymBtn.hasClass('active')) {
            this.$ymBtn.removeClass('active');
        }
        if (this.$disanalysisBtn.hasClass('active')) {
            this.$disanalysisBtn.removeClass('active');
        }
        // if (this.$rvBtn.hasClass('active')) {
        //     this.$rvBtn.removeClass('active');
        // }
        if (this.$hsBtn.hasClass('active')) {
            this.$hsBtn.removeClass('active');
        }
        if (this.$clBtn.hasClass('active')) {
            this.$clBtn.removeClass('active');
        }
        
        //通视分析
        if (tabElement.hasClass('ts')) {
            this.tsModle.count = 0;
            // this.earth.on('mouseClick', this.onTSClick, this);
        } else if (tabElement.hasClass('path')) {
            
        } else if (tabElement.hasClass('slope')) {
            this.onSlopeMove();
        } else if (tabElement.hasClass('visibleArea')) {
        }
    }

    offAllEvents() {
        // this.getEarth().off('mouseClick', this.onTSClick, this);
        this.getEarth().off('mouseClick', this.onPMClick, this);
        // this.getEarth().off('mouseClick', this.onTSRangeClick, this);
        if (this.scene) {
            this.scene.clear();
        }
        this.slopeData = [];
    }

    onPMClick(info) {
        if (info) {
            this.pmModle.count++;
            if (this.pmModle.count % 2 === 1) {
                this.pmModle.start = info;
            } else {
                this.pmModle.end = info;
                this.showPM(this.pmModle.start, this.pmModle.end);
            }
        }
    }

    analysis(url, data, successFun) {
        GV.Util.$.post(url, data, successFun, 'json').fail((error) => {
            this.offAllEvents();
            if (error.responseText) {
                alert(error.responseText);
            } else {
                alert('未得到服务反馈，请检查服务连接是否正常');
            }
        });

        // GV.Util.$.ajax({
        //     url: url,
        //     dataType: 'json',
        //     method: 'POST',
        //     success: successFun,
        //     error: function(xhr) {
        //         alert('error:' + JSON.stringify(xhr));
        //     }
        // })
    }

    //剖面显示操作
    showPM(start, end) {
        let data = {
            "p1.x": start.x,
            "p1.y": start.y,
            "p2.x": end.x,
            "p2.y": end.y
        }
        this.analysis(this.options.urls.section, data, (res) => {
            if (res) {
                if (res.isSuccess) {
                    let myChart = echarts.init(this.$pmChart[0]);
                    let color = '#23bbe8';
                    // 指定图表的配置项和数据
                    let option = {
                        title: {
                            text: `最高海拔: ${res.maxH}米 最低海拔: ${res.minH}米 剖线长度: ${res.data[res.data.length - 1][0]}千米`,
                            x: 'center',
                            textStyle: {
                                color: color,
                                fontSize: 12
                            }
                        },
                        tooltip: {
                            formatter: function (params) {
                                return '距离: ' + params.data[0].toFixed(2) + '千米海拔: ' + params.data[1].toFixed(2) + '米';
                            }
                        },
                        grid: {
                            containLabel: true,
                            show: true
                        },
                        xAxis: {
                            name: "距离: 千米",
                            axisLine: {
                                lineStyle: {
                                    color: color
                                }
                            },
                            interval: (res.data[res.data.length - 1][0] - res.data[0][0]) / 10,
                            axisLabel: {
                                formatter: function (value) {
                                    return value.toFixed(0);
                                }
                            }

                        },
                        yAxis: {
                            name: "海拔: 米",
                            axisLine: {
                                lineStyle: {
                                    color: color
                                }
                            }
                        },
                        series: [{
                            type: 'line',
                            smooth: true,
                            data: res.data,
                            lineStyle: {
                                normal: {
                                    color: color
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: color
                                }
                            }
                        }]
                    };

                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                } else {
                    alert(res.msg);
                }
            } else {
                alert("服务异常");
            }
        })
    }

    onSlopeMove() {
        this.getEarth().on('mousemove', (info) => {
            let data = null;
            //搜索需要的信息
            for (let i = this.slopeData.length - 1; i >= 0; i--) {
                data = this.slopeData[i];
                if (info.x >= data.min_x && info.x < data.max_x && info.y >= data.min_y && info.y <= data.max_y) {
                    break;
                } else {
                    data = null;
                }
            }
            if (data != null) {
                let cell_x = (data.max_x - data.min_x) / data.cols,
                    cell_y = (data.max_y - data.min_y) / data.rows;
                let dcol = Math.floor((info.x - data.min_x) / cell_x);
                if (dcol >= data.cols) {
                    dcol = data.cols - 1;
                }
                let drow = Math.floor((info.y - data.min_y) / cell_y);
                if (drow >= data.rows) {
                    drow = data.rows - 1;
                }
                //求出格网偏移位置
                let off = drow * data.cols + dcol;
                this.$slopeX.text(info.x.toFixed(2));
                this.$slopeY.text(info.y.toFixed(2));
                this.$slopeZ.text(data.data[drow][dcol].toFixed(2));
                this.$slopeS.text(data.slope[off].toFixed(2));
                this.$slopeA.text(this.formatAspet(data.aspet[off]));
            }
        });
    }

    formatAspet(value) {
        if (value < 22.5) {
            return "北";
        } else if (value < 67.5) {
            return "东北";
        } else if (value < 112.5) {
            return "东";
        } else if (value < 157.5) {
            return "东南";
        } else if (value < 202.5) {
            return "南";
        } else if (value < 247.5) {
            return "西南";
        } else if (value < 292.5) {
            return "西";
        } else if (value < 337.5) {
            return "西北";
        } else {
            return "北";
        }
    }

    drawSlopeRect() {
        this.drawSelectRect((coordinates) => {
            if (coordinates && coordinates.length > 0) {
                const last = coordinates[coordinates.length - 1],
                    first = coordinates[0];
                let isClosed = true;//是否封闭
                for (let i = 0; i < last.length; i++) {
                    if (last[i] !== first[i]) {
                        isClosed = false;
                        break;
                    }
                }
                if (!isClosed) {
                    coordinates.push(coordinates[0]);
                }
                const data = {
                    geometry: JSON.stringify({type: "Polygon", coordinates: coordinates})
                }
                this.$slopeBtn.removeClass('active');
                this.analysis(this.options.urls.slope, data, (res) => {
                    this.slopeData.push(res);
                    const colors = res.slope.map((value) => {
                        if (value < 30) {
                            return "#38a800";
                        } else if (value < 45) {
                            return "#5ebd00";
                        } else if (value < 55) {
                            return "#8bd100";
                        } else if (value < 65) {
                            return "#c1e800";
                        } else if (value < 70) {
                            return "#ffff00";
                        } else if (value < 75) {
                            return "#ffbf00";
                        } else if (value < 80) {
                            return "#ff8000";
                        } else if (value < 85) {
                            return "#ff4000";
                        } else {
                            return "#ff0000";
                        }
                    });
                    const fieldData = new GV.FieldData({
                        elecData: {
                            lon_min: res.min_x,
                            lat_min: res.min_y,
                            lon_max: res.max_x,
                            lat_max: res.max_y,
                            colors: colors,
                            rows: res.rows,
                            cols: res.cols
                        }
                    });
                    this.scene.addNode(fieldData);
                })
            }
        })
    }

    drawSelectRect(fun) {
        let mouseClick = (info) => {
            if(info) {
                this.getEarth().off('mouseClick', mouseClick, this);
                let polygon = new GV.Polygon({
                    style: {
                        stroke: '#CC0000FF',
                        fill: '#CC000000',
                        'stroke-width': '3px',
                        'altitude-clamping': 'terrain-drape'
                    }
                });
                this.scene.addNode(polygon);
                let mousemove = (position) => {
                    if (position) {
                        polygon.vertices = [[info.lon, info.lat], [info.lon, position.lat], [position.lon, position.lat], [position.lon, info.lat]];
                    }
                }
                let mouseEndClick = (endPosition) => {
                    this.getEarth().off('mouseClick', mouseEndClick, this);
                    this.getEarth().off('mouseMove', mousemove, this);
                    polygon.vertices = [[info.lon, info.lat], [info.lon, endPosition.lat], [endPosition.lon, endPosition.lat], [endPosition.lon, info.lat]];
                    fun(polygon.vertices.getPoints());
                    // this.scene.removeNode(polygon);
                };
                this.getEarth().on('mouseClick', mouseEndClick, this);
                this.getEarth().on('mouseMove', mousemove, this);
            }
        }
        this.getEarth().on('mouseClick', mouseClick, this);
    }

    drawSelectRectYM(fun) {
        let mouseClick = (info) => {
            if(info) {
                this.getEarth().off('mouseClick', mouseClick, this);
                let polygon = new GV.Polygon({
                    style: {
                        stroke: '#CC0000FF',
                        fill: '#CC000000',
                        'stroke-width': '5px',
                        'altitude-clamping': 'terrain-drape'
                    }
                });
                this.scene.addNode(polygon);
                let mousemove = (position) => {
                    if (position) {
                        polygon.vertices = [[info.lon, info.lat], [info.lon, position.lat], [position.lon, position.lat], [position.lon, info.lat]];
                    }
                }
                let mouseSecondClick = () => {
                    this.getEarth().off('mouseClick', mouseSecondClick, this);
                    this.getEarth().off('mouseMove', mousemove, this);

                    const psource = new GV.Icon({
                        url: this.formatHostURL('./images/water.png'),
                        style: {
                            'icon-mode': GV.ICON_MODE.SPIRIT_SIZE, 
                            'icon-size': 32, 
                            'icon-alpha': 1, 
                            'icon-link-line': false,
                            'icon-align': 'center-bottom'
                        }
                    });
                    this.scene.addNode(psource);
                    let mouseEndClick = (endClickPosition) => {
                        if(endClickPosition) {
                            this.getEarth().off('mouseClick', mouseEndClick, this);
                            this.getEarth().off('mouseMove', mouseEndMove, this);
                            psource.position = {
                                lon: endClickPosition.lon,
                                lat: endClickPosition.lat,
                                alt: endClickPosition.alt
                            }
                            fun(polygon.vertices.getPoints(), psource.position);  
                            // this.scene.removeNode(polygon);
                        }     
                    }

                    let mouseEndMove = (endMovePosition) => {
                        if(endMovePosition) {
                            psource.position = {
                                lon: endMovePosition.lon,
                                lat:  endMovePosition.lat,
                                alt: endMovePosition.alt
                            }
                        }
                    }

                    this.getEarth().on('mouseClick', mouseEndClick, this);
                    this.getEarth().on('mouseMove', mouseEndMove, this);
                };
                this.getEarth().on('mouseClick', mouseSecondClick, this);
                this.getEarth().on('mouseMove', mousemove, this);
            }
        }
        this.getEarth().on('mouseClick', mouseClick, this);
    }

    drawSelectLine(fun) {
        const mouseClick = (info) => {
            if (info) {
                this.earth.off('mouseClick', mouseClick, this);
                const polyline = new GV.Polyline({
                    style: {
                        stroke: '#fff00fff',
                        'stroke-width': '3px',
                        'altitude-clamping': 'terrain-drape'
                    }
                });
                this.scene.addNode(polyline);
                const startIcon = new GV.Icon({
                    position: {
                        lon: info.lon,
                        lat: info.lat,
                        alt: info.alt
                    },
                    url: this.formatHostURL('./images/start.png'),
                    style: {
                        'icon-mode': GV.ICON_MODE.SPIRIT_SIZE, 
                        'icon-size': 48, 
                        'icon-alpha': 1, 
                        'icon-link-line': false,
                        'icon-align': 'center-bottom'
                    }
                });
                this.scene.addNode(startIcon);

                const endIcon = new GV.Icon({
                    url: this.formatHostURL('./images/end.png'),
                    style: {
                        'icon-mode': GV.ICON_MODE.SPIRIT_SIZE, 
                        'icon-size': 48, 
                        'icon-alpha': 1, 
                        'icon-link-line': false,
                        'icon-align': 'center-bottom'
                    }
                });
                this.scene.addNode(endIcon);
                const mousemove = (position) => {
                    if (position) {
                        polyline.vertices = [[info.lon, info.lat], [position.lon, position.lat]];
                        endIcon.position = {
                            lon: position.lon,
                            lat: position.lat,
                            alt: position.alt
                        }
                    }
                }
                const mouseEndClick = (endPosition) => {
                    this.getEarth().off('mouseClick', mouseEndClick, this);
                    this.getEarth().off('mouseMove', mousemove, this);
                    polyline.vertices = [[info.lon, info.lat], [endPosition.lon, endPosition.lat]];
                    endIcon.position = {
                        lon: endPosition.lon,
                        lat:  endPosition.lat,
                        alt: endPosition.alt
                    }
                    fun(polyline.vertices.getPoints());
                    // this.scene.removeNode(polyline);
                };
                this.getEarth().on('mouseClick', mouseEndClick, this);
                this.getEarth().on('mouseMove', mousemove, this);
            }
        };
        this.getEarth().on('mouseClick', mouseClick, this);
    }

    drawSelectPoint(fun) {
        const icon = new GV.Icon({
            url: this.formatHostURL('./images/selectIcon.png'), //图标资源
            style: {
                'icon-mode': GV.ICON_MODE.SPIRIT_SIZE, //图标显示模式
                'icon-size': 32, //图标大小
                'icon-alpha': 1, //图标透明度
                'icon-link-line': false //是否有接地连接线
            }
        });
        this.scene.addNode(icon);

        const mousemove = (position) => {
            if (position) {
                icon.position = {
                    lon: position.lon,
                    lat: position.lat,
                    alt: position.alt
                }
            }
        }
        const mouseEndClick = () => {
            this.getEarth().off('mouseClick', mouseEndClick, this);
            this.getEarth().off('mouseMove', mousemove, this);
            fun(icon.position);
            // this.scene.removeNode(icon);
        };
        this.getEarth().on('mouseClick', mouseEndClick, this);
        this.getEarth().on('mouseMove', mousemove, this);
    }

    // onTSClick(info) {
    //     if (info) {
    //         this.tsModle.count++;
    //         if (this.tsModle.count % 2 == 1) {
    //             this.tsModle.start = info;
    //         } else {
    //             this.tsModle.end = info;
    //             this.TSAnalysis(this.tsModle.start, this.tsModle.end);
    //         }
    //     }
    // }

    addLine(start, end, color) {
        let node = new GV.Polyline({
            vertices: [[start.x, start.y, start.z], [end.x, end.y, end.z]],
            style: {
                'stroke-width': 3,
                'stroke': color,
                'altitude-clamping': 'terrain-drape'
            }
        });
        this.scene.addNode(node);
    }

    TSAnalysis() {
        this.drawSelectLine((positions) => {
            this.$TSBtn.removeClass('active');
            let data = {
                // "p1.x": positions[0][0],
                // "p1.y": positions[0][1],
                // "p2.x": positions[1][0],
                // "p2.y": positions[1][1]
            }
            this.analysis(this.options.urls.ts + '?p1.x=' + positions[0][0] + '?p1.y=' + positions[0][1] + '&p2.x=' + positions[1][0] + '?p2.y=' + positions[1][1], data, (res) => {
                if (res) {
                    this.$tsError.text(res.msg);
                    if (res.isSuccess) {
                        start.z = res.startH;
                        end.z = res.endH;
                        this.$tsStart.text(start.z.toFixed(2) + '米' );
                        this.$tsEnd.text(end.z.toFixed(2) + '米' );
                        if (res.point) {
                            this.addLine(start, res.point, '#0bc20b');
                            this.addLine(res.point, end, '#c00c0a');
                        } else {
                            this.addLine(start, end, '#0bc20b');
                        }
                    }
                }
            })
        })
    }

    // 通视范围分析
    TSRangeAnalysis(info) {
        this.drawSelectPoint((position) => {
            this.$visibleAreaLon.text(position.lon.toFixed(3));
            this.$visibleAreaLat.text(position.lat.toFixed(3));
            this.$visibleAreaBtn.removeClass('active');

            this.analysis(this.options.urls.va + '?seePointlon=' + position.lon + '&seePointlat=' + position.lat + '&redius=' + this.$visibleAreaRadiusInput.val() || 5, {
                // seePointlon: position.lon, 
                // seePointlat: position.lat, 
                // redius: this.$visibleAreaRadiusInput.val() || 5
            }, (data) => {
                console.log('通视范围分析');
                this.createVisibilityRange(position.lon, position.lat, data.linelist);
            })
        })
    }

    // 最短路径分析
    LJAnalysis() {
        this.drawSelectLine((positions) => {
            this.$pathAnalysisSL.text(positions[0][0].toFixed(3));
            this.$pathAnalysisSA.text(positions[0][1].toFixed(3));
            this.$pathAnalysisEL.text(positions[1][0].toFixed(3));
            this.$pathAnalysisEA.text(positions[1][1].toFixed(3));
            this.$pathBtn.removeClass('active');

            this.analysis(this.options.urls.path + '?startlon=' + positions[0][0] + '&startlat=' + positions[0][1] + '&endlon=' + positions[1][0] + '&endlat=' + positions[1][1], {            
                // startlon: positions[0][0],
                // startlat: positions[0][1],
                // endlon: positions[1][0], 
                // endlat: positions[1][1]
            }, (data) => {
                console.log('路径分析')

                let vertices = [[positions[1][0], positions[1][1], 0]];
                for (let i = 0; i < data.roadset.length; i++) {
                    vertices.push([data.roadset[i].lon, data.roadset[i].lat, 0]);
                }
                vertices.push([positions[0][0], positions[0][1], 0])
                let path = new GV.Polyline({
                    vertices: vertices,
                    style: {
                        'stroke': '#ff0000CC',
                        'stroke-width': '3px',
                        'altitude-clamping': 'terrain-drape'
                    }
                });
                this.scene.addNode(path);
            });
        })
    }

    // 淹没分析
    YMAnalysis() {
        this.drawSelectRectYM((positions, psource) => {

            let rect = this.getRectMinAndMax(positions);
            this.$ymBtn.removeClass('active');

            this.analysis(this.options.urls.ym + '?leftlon=' + rect.leftlon + '&rightlon=' + rect.rightlon + '&uplat=' + rect.uplat + '&downlat=' + rect.downlat
                + '&psourceLon=' + psource.lon + '&psourceLat=' + psource.lat, {
                    // leftlon: rect.leftlon, 
                    // rightlon: rect.rightlon, 
                    // uplat: rect.uplat,
                    // downlat: rect.downlat,
                    // psourceLon: psource.lon,
                    // psourceLat: psource.lat
                }, (data) => {
                    console.log('淹没分析');
                    console.log(data);
                    var colorst = [];
                      for(var i = 0; i < data.height-1; i++) {
                        colorst.push([]);
                        for(var j = 0; j < data.width-1; j++) {
                            colorst[i][j] = data.ymset[ i * (data.width-1) + j].ym ?  "#2121F0CC" : "#00FF00CC";
                        }
                    }
                    var colors = [];
                    for(var i = 0; i < data.height-1; i++) {
                        for(var j = 0; j < data.width-1; j++) {
                            colors[i * (data.width-1) + j] = colorst[data.height - 2 - i][j];
                        }
                    }
                    var image = new GV.FieldData({
                        elecData: {
                            lon_min: rect.leftlon,
                            lat_min: rect.downlat,
                            lon_max: rect.rightlon,
                            lat_max: rect.uplat,
                            rows: data.height - 1,
                            cols: data.width - 1,
                            colors: colors
                        }
                    });
                    this.scene.addNode(image); //将分析场景节点添加到地球
                    var place = new GV.Place({
                        position: {lon:120.731, lat:22.6632, alt: 1000},
                        url: this.formatHostURL('./images/water.png'),
                    });
                    this.scene.addNode(place);
                });
        });
    }

    // 挖方分析
    WFAnalysis() {
        this.drawSelectRect((positions) => {
            let rect = this.getRectMinAndMax(positions);

            this.$wfBtn.removeClass('active');
            this.analysis(this.options.urls.wf + '?leftlon=' + rect.leftlon + '&rightlon=' + rect.rightlon + '&uplat=' + rect.uplat + '&downlat=' + rect.downlat + '&level=' + this.$wfLevelInput.val() || 100, {
                    // leftlon: rect.leftlon, 
                    // rightlon: rect.rightlon, 
                    // uplat: rect.uplat,
                    // downlat: rect.downlat,
                    // level: this.$wfLevelInput.val() || 100
                }, (data) => {
                    console.log('挖方分析');

                    var colorst = [];
                    for(var i = 0; i < data.height; i++) {
                        colorst.push([]);
                        for(var j = 0; j < data.width; j++) {
                            colorst[i][j] = data.TCutFillSet[i * data.width + j].CutorFill === 0 ? "#00FF00AA" : (data.TCutFillSet[i * data.width + j].CutorFill === 1 ? "#FF0000AA" : "#0000FFAA");
                        }
                    }
                    var colors = [];
                    for(var i = 0; i < data.height; i++) {
                        for(var j = 0; j < data.width; j++) {
                            colors[i * data.width + j] = colorst[data.height - 1 - i][j];
                        }
                    }

                    var image = new GV.FieldData({
                        elecData: {
                            lon_min: rect.leftlon,
                            lat_min: rect.downlat,
                            lon_max: rect.rightlon,
                            lat_max: rect.uplat,
                            rows: data.height,
                            cols: data.width,
                            colors: colors
                        }
                    });
                    this.scene.addNode(image); //将分析场景节点添加到地球
                });
        });
    }
    // 空间距离量算
    DisAnalysis() {
        this.drawSelectLine((positions) => {
            this.$disAnalysisSL.text(positions[0][0].toFixed(3));
            this.$disAnalysisSA.text(positions[0][1].toFixed(3));
            this.$disAnalysisEL.text(positions[1][0].toFixed(3));
            this.$disAnalysisEA.text(positions[1][1].toFixed(3));
            this.$disanalysisBtn.removeClass('active');

            this.analysis(this.options.urls.da + '?firstlon=' + positions[0][0] + '&firstlat=' + positions[0][1]+ '&secondlon=' + positions[1][0] + '&secondlat=' + positions[1][1], {
                // firstlon: positions[0][0],
                // firstlat: positions[0][1],
                // secondlon: positions[1][0], 
                // secondlat: positions[1][1]
            }, (data) => {
                console.log('空间距离量算');

                var distance = data.distance ? data.distance + '米' : '未计算出结果，请重新选择';
                this.$disAnalysisResult.text(distance);
            });
        })
    }

    // 栅格矢量化
    RasterToVector() {
        this.drawSelectRect((positions) => {
            let rect = this.getRectMinAndMax(positions);
            this.$rvBtn.removeClass('active');

            this.analysis(this.options.urls.rv + '?leftlon=' + rect.leftlon + '&rightlon=' + rect.rightlon + '&uplat=' + rect.uplat + '&downlat=' + rect.downlat, {
                    // leftlon: rect.leftlon, 
                    // rightlon: rect.rightlon, 
                    // uplat: rect.uplat,
                    // downlat: rect.downlat
                }, (data) => {
                    console.log('栅格矢量化');

                    let result = data.result;
                    for (let i = 0; i < result.length; i++) {
                        let type = result[i][0].type;
                        let vertices = [];
                        switch(type) {
                            case 'Line':
                                for (let j = 0; j < result[i].length; j++) {
                                    vertices.push([result[i][j].x, result[i][j].y, 0]);
                                }
                                let polyline = new GV.Polyline({
                                    vertices: vertices,
                                    style : {
                                        'stroke': '#ff0000ee',
                                        'stroke-width': '3px',
                                        'altitude-clamping': 'terrain-drape'
                                    }
                                });
                                this.scene.addNode(polyline);
                                vertices = null;
                                break;
                            case 'Polygon':
                                for (let j = 0; j < result[i].length; j++) {
                                    vertices.push([result[i][j].x, result[i][j].y, 0]);
                                }
                                let Polygon = new GV.Polygon({
                                    vertices: vertices,
                                    style : {
                                        'fill': '#ffff007f',
                                        'stroke': '#ffffffff',
                                        'stroke-width': '1px',
                                        'altitude-clamping': 'terrain-drape'
                                    }
                                });
                                this.scene.addNode(Polygon);
                                vertices = null;
                                break;
                            default:
                                break;
                        }
                    }
            }); 
        });
    }

    // 山体阴影分析
    HSAnalysis() {
        this.drawSelectRect((positions) => {
            let rect = this.getRectMinAndMax(positions);
            this.$hsBtn.removeClass('active');
            // var factor = this.$factorInput.val() || 1;
            // var Azimuth = this.$azimuthInput.val() || 0;
            // var Vertical = this.$verticalInput.val() || 0

            var url = this.options.urls.hs + '?leftlon=' + rect.leftlon + '&rightlon=' + rect.rightlon + '&uplat=' + rect.uplat + '&downlat=' + rect.downlat + '&factor=1&Azimuth=300.0&Vertical=40.0';
            this.analysis(url, {
                    // leftlon: rect.leftlon, 
                    // rightlon: rect.rightlon, 
                    // uplat: rect.uplat,
                    // downlat: rect.downlat,
                    // factor: this.$factorInput.val() || 1,
                    // Azimuth: this.$azimuthInput.val() || 0,
                    // Vertical: this.$verticalInput.val() || 0
                }, (data) => {
                    console.log('阴影分析');
                    console.log(data);
                    //原始数据以左上角开始，需要转化为以右下角开始
                    var colorst = new Array;
                    for(var i = 0; i < data.height-1; i++) {
                        colorst.push([]);
                        for(var j = 0; j < data.width-1; j++) {
                            let grayValueNumber = Math.round(data.Shadeset[i * (data.width-1) + j].Shade);
                            if(grayValueNumber > 255) {
                                grayValueNumber = 255;
                            }
                            let grayValue = grayValueNumber.toString(16);
                            if(grayValue.length === 1) {
                                grayValue = '0' + grayValue;
                            }
                            colorst[i][j] = '#' + grayValue + grayValue + grayValue;
                        }
                    }
                    var colors = [];
                    for(var i = 0; i < data.height-1; i++) {
                        for(var j = 0; j < data.width-1; j++) {
                            colors[i * (data.width-1) + j] = colorst[data.height - 2 - i][j];
                        }
                    }

                    var image = new GV.FieldData({
                        elecData: {
                            lon_min: rect.leftlon,
                            lat_min: rect.downlat,
                            lon_max: rect.rightlon,
                            lat_max: rect.uplat,
                            rows: data.height-1,
                            cols: data.width-1,
                            colors: colors
                        }
                    });
                    this.scene.addNode(image); //将分析场景节点添加到地球
            });
        });
    }
    // 等值线
    CLAnalysis() {
        this.drawSelectRect((positions) => {
            let rect = this.getRectMinAndMax(positions);
            this.$clBtn.removeClass('active');

            this.analysis(this.options.urls.cl + '?leftlon=' + rect.leftlon + '&rightlon=' + rect.rightlon + '&uplat=' + rect.uplat + '&downlat=' + rect.downlat, {
            // this.analysis('http://192.168.44.101:5000/contourline' + '?leftlon=' + rect.leftlon + '&rightlon=' + rect.rightlon + '&uplat=' + rect.uplat + '&downlat=' + rect.downlat, {
                    // leftlon: rect.leftlon, 
                    // rightlon: rect.rightlon, 
                    // uplat: rect.uplat,
                    // downlat: rect.downlat
                }, (data) => {
                    console.log(data);
                    console.log('等值线分析');
                    const colorArray = ['#00FF00FF', '#80FF00FF', '#AAFF00FF', '#D5FF00FF', '#FFFF00FF', '#FFD500FF', 'FFAA00FF', 'FF8000FF', 'FF5500FF', 'FF0000FF']

                    for(let i = 0; i < data.ContourLine.length; i++) {
                        let vertices = [];
                        const value = data.ContourLine[i][0].value;
                        for(let j = 0; j < data.ContourLine[i].length; j++) {
                            vertices.push([data.ContourLine[i][j].lon, data.ContourLine[i][j].lat, 0]);
                        }
                        let polyline = new GV.Polyline({
                                vertices: vertices,
                                style: {
                                    'stroke': colorArray[value],
                                    'stroke-width': '2px',
                                    'altitude-clamping': 'terrain-drape'
                                }
                            });
                        this.scene.addNode(polyline);
                    }
                });
        });
    }

    // 山脊线分析
    RLAnalysis() {
        this.drawSelectRect((positions) => {
            let rect = this.getRectMinAndMax(positions);
            this.$rlBtn.removeClass('active');

            this.analysis(this.options.urls.gr + '?leftlon=' + rect.leftlon + '&rightlon=' + rect.rightlon + '&uplat=' + rect.uplat + '&downlat=' + rect.downlat, {
                    // leftlon: rect.leftlon, 
                    // rightlon: rect.rightlon, 
                    // uplat: rect.uplat,
                    // downlat: rect.downlat
                }, (data) => {
                    console.log('山脊线分析');
                    this.drawPolylineByArray(data.RidgeLine, 3, '#F0F000CC');
                });
        });
    }

    // 山谷线分析
    VLAnalysis() {
        this.drawSelectRect((positions) => {
            let rect = this.getRectMinAndMax(positions);
            this.$vlBtn.removeClass('active');

            this.analysis(this.options.urls.gv + '?leftlon=' + rect.leftlon + '&rightlon=' + rect.rightlon + '&uplat=' + rect.uplat + '&downlat=' + rect.downlat, {
                    // leftlon: rect.leftlon, 
                    // rightlon: rect.rightlon, 
                    // uplat: rect.uplat,
                    // downlat: rect.downlat
                }, (data) => {
                    console.log('山谷线线分析');
                    console.log(data)
                    this.drawPolylineByArray(data.VallLine, 3, '#F0F000CC');
                });
        });
    }

    // 鞍部点提取
    SaddlePointAnalysis() {
        this.drawSelectRect((positions) => {
            let rect = this.getRectMinAndMax(positions);
            this.$saddlePBtn.removeClass('active');

            this.analysis(this.options.urls.gs + '?leftlon=' + rect.leftlon + '&rightlon=' + rect.rightlon + '&uplat=' + rect.uplat + '&downlat=' + rect.downlat, {
                    // leftlon: rect.leftlon, 
                    // rightlon: rect.rightlon, 
                    // uplat: rect.uplat,
                    // downlat: rect.downlat
                }, (data) => {
                    console.log('鞍部点提取');
                    for(let i = 0; i < data.SaddlePoint.length; i++) {
                        let icon = new GV.Icon({
                            position: {lon: data.SaddlePoint[i].lon, lat: data.SaddlePoint[i].lat, alt: data.SaddlePoint[i].value}, //图标位置
                            url: this.formatHostURL('./images/saddle.png'), //图标资源
                            style: {
                                'icon-mode': GV.ICON_MODE.SPIRIT_SIZE, //图标显示模式
                                'icon-size': 16, //图标大小
                                'icon-alpha': 1, //图标透明度
                                'icon-link-line': false //是否有接地连接线
                            }
                        });
                        this.scene.addNode(icon);
                    }
                });
        });
    }

    // 山顶点提取   1: 尖顶山  2：圆顶山  3：平顶山
    MoutainPointAnalysis() {
        this.drawSelectRect((positions) => {
            let rect = this.getRectMinAndMax(positions);
            this.$moutainPBtn.removeClass('active');

            this.analysis(this.options.urls.mp + '?leftlon=' + rect.leftlon + '&rightlon=' + rect.rightlon + '&uplat=' + rect.uplat + '&downlat=' + rect.downlat, {
                    // leftlon: rect.leftlon, 
                    // rightlon: rect.rightlon, 
                    // uplat: rect.uplat,
                    // downlat: rect.downlat
                }, (data) => {
                    console.log('山顶点提取');
                    for(let i = 0; i < data.MountanTop.length; i++) {
                        let icon = new GV.Icon({
                            position: {lon: data.MountanTop[i].lon, lat: data.MountanTop[i].lat, alt: data.MountanTop[i].value}, //图标位置
                            url: this.formatHostURL(`./images/mountan${data.MountanTop[i].type}.png`), //图标资源
                            style: {
                                'icon-mode': GV.ICON_MODE.SPIRIT_SIZE, //图标显示模式
                                'icon-size': 16, //图标大小
                                'icon-alpha': 1, //图标透明度
                                'icon-link-line': false //是否有接地连接线
                            }
                        });
                        this.scene.addNode(icon);
                    }
                });
        });
    }

    getEarth() {
        return this.earth;
    }
    
    //仅传入可视线段的起始和终点
    createVisibilityRange(startLon, startLat, object) {
        for (let i = 0; i < object.length; i++) {
            let vertices = [[startLon, startLat, 0]];
            let visible = object[i][0].visible;
            for (let j = 0; j < object[i].length; j++) {
                if ( !object[i][j].visible === visible ) {
                    vertices.push([object[i][j-1].position.x, object[i][j-1].position.y, 0]);
                    const line = new GV.Polyline({
                        vertices: vertices,
                        style: {
                            stroke: visible ? '#0BC20BFF' : '#C00C0AFF',
                            'stroke-width': '3px',
                            'altitude-clamping': 'terrain-drape'
                        }
                    });
                    this.scene.addNode(line);
                    visible = object[i][j].visible;
                    vertices = [[object[i][j-1].position.x, object[i][j-1].position.y, 0]];
                }
            }
            vertices.push([object[i][object[i].length - 1].position.x, object[i][object[i].length - 1].position.y, 0]);
            const line = new GV.Polyline({
                vertices: vertices,
                style: {
                    stroke: visible ? '#0BC20BFF' : '#C00C0AFF',
                    'stroke-width': '1px',
                    'altitude-clamping': 'terrain-drape'
                }
            });
            this.scene.addNode(line);
        }
    }

    // 根据数组绘制线
    drawPolylineByArray(pointArr, width, color) {
        for(let i = 0; i < pointArr.length; i++) {
            let vertices = [];
            for(let j =0; j < pointArr[i].length; j++) {
                vertices.push([pointArr[i][j].lon, pointArr[i][j].lat, 0]);
            }
            console.log(vertices);
            let polyline = new GV.Polyline({
                vertices: vertices,
                style: {
                    'stroke': color,
                    'stroke-width': width + 'px',
                    'altitude-clamping': 'terrain-drape'
                }
            });
            this.scene.addNode(polyline);
        }
    }

    getRectMinAndMax(positions) {
        var leftlon, rightlon, uplat, downlat;

        //当选择区域跨经度180和-180时进行处理
        if(Math.abs(positions[0][0]) + Math.abs(positions[2][0]) > 180 && positions[0][0] * positions[2][0] < 0) {
            if(positions[0][0] < 0 && positions[2][0] > 0) {
                leftlon = positions[2][0];
                rightlon = positions[0][0];
            } else {
                leftlon = positions[0][0];
                rightlon = positions[2][0];
            }
        } else {
            if(positions[0][0] >= positions[2][0] ) {
                leftlon = positions[2][0];
                rightlon = positions[0][0];
            } else {
                leftlon = positions[0][0];
                rightlon = positions[2][0];
            }
        }

        if(positions[0][1] >= positions[2][1]) {
            uplat = positions[0][1];
            downlat = positions[2][1];
        } else {
            uplat = positions[2][1];
            downlat = positions[0][1];
        }
        
        return {
            leftlon: leftlon, 
            rightlon: rightlon, 
            uplat: uplat,
            downlat: downlat
        };
    }

    configUrl(urls) {
        setTimeout(() => {
            $.extend(this.options.urls, urls);
        }, 1000)
    }

    remove() {
        this.scene.clear();
        this.offAllEvents();
        this.$element.remove();
    }
}

//# sourceURL=SpatialAnalysisTool.js