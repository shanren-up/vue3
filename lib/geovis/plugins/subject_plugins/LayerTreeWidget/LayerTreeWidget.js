/**
 * 项目：gvml
 * 文件：LayerTreeWidget.js
 * 作者：程敏英
 * 部门：可视化平台
 * 邮箱：chengmy@geovis.com.cn
 * 日期：2017-10-10 20:00:00.
 * 用途：类
 */

class LayerTreeWidget extends GV.Widget {
    reference() {
        this.script = "zTree/jquery.ztree.all.js";
        this.css = "LayerTreeWidget.css";
        this.html = "LayerTreeWidget.html";
    }

    init() {
        const that = this;
        this.zTreeInit();
        function reFresh(){
            GV.Util.$("#tree").empty();
            if (GV.Util.$("#tree").html() === "") {
                that.zTreeInit();
                for (let i in earth.saveLayers("json")) {
                    if (i !== "uuid") {
                        that.getLayersNodesType(i);
                        that.addChildrenNodes(i, earth.saveLayers("json")[i]);
                    }
                }
            }
        }
        GV.Util.$("#refresh").on("click", reFresh);

        GV.Util.$("#up").on("click", function () {

            let nodeInfo = that.zTree.getSelectedNodes();
            if (nodeInfo.length > 0) {
                let layer = earth.getLayerById(nodeInfo[0].id);
                earth.moveUp(layer);
                reFresh();
            } else {
                alert("没有初始化树或没有选中任何图层");
            }
            if (nodeInfo[0].isparent) {
                alert("图层根节点不能移动");
            }
        });

        GV.Util.$("#down").on("click", function () {
            let nodeInfo = that.zTree.getSelectedNodes();
            if (nodeInfo.length > 0) {
                let layer = earth.getLayerById(nodeInfo[0].id);
                earth.moveDown(layer);
                reFresh();
            } else {
                alert("没有初始化树或没有选中任何图层");
            }
            if (nodeInfo[0].isparent) {
                alert("图层根节点不能移动");
            }
        });

        //图层信息窗口
        GV.Util.$("#edit").on("click", function () {
            if (document.getElementById("newwindow") === null) {
                let nodeInfo = that.zTree.getSelectedNodes();
                let layerinfo = earth.getLayerById(nodeInfo[0].id);
                console.log("111: "+layerinfo);
                if (!nodeInfo.length > 0) {
                    alert("没有初始化图层或没有选中任何图层不能进行编辑");
                } else {
                    let newwindow = $("<div id='newwindow'></div>");
                    var windowhead = $("<div id='windowhead'>图层编辑</div>");
                    var details = $("<div id='details'></div>")
                    newwindow.addClass("windowStyle");
                    windowhead.addClass("windowhead");
                    details.addClass("windowbody");
                    $("#tree").append(newwindow);
                    newwindow.append(windowhead);
                    newwindow.append(details);

                    for (let i = 0; i < layerinfo._properties.length; i++) {
                        if (layerinfo._properties[i] === that.propertiesFilter(layerinfo._properties[i])) {
                            let spankey = $(`<span>${layerinfo._properties[i]}：</span>`)
                            let spanvalue = $(`<span>${layerinfo[layerinfo._properties[i]]}</span><br />`);
                            if (layerinfo._properties[i] === 'colorFilters') {
                                // if (spankey === 'colorFilters') {
                                spanvalue.on('click', function () {
                                    that.colorFilters(layerinfo);
                                    // console.log('asfasfasfasfasfasf');
                                    // console.log(layerinfo._colorFilters);
                                })
                            }
                            details.append(spankey);
                            details.append(spanvalue);
                        }
                    }
                }
            } else {
                document.getElementById("newwindow").remove();
            }
        });
    }
    colorFilters(layerinfo) {
        var colorFiltersObj = { };
        
        let colorwin = $('<div id = "colorwin"></div>');
        colorwin.css({
            "width": "300px",
            "height": "830px",
            "border": "1px solid #fff",
            "position": "absolute",
            "top":"-30%",
            "left": "150%"
        })
        $("#details").append(colorwin);

        //RGB
        let rgb_div = $('<div id="rgb" style="width: 100%;height:97px; position: relative;border-bottom:1px solid #fff;"><span>R:</span><input type="range" id="R" class="RGB" name="R"/><br /><span>G:</span><input type="range" id="G" class="RGB" name="G"/><br /><span>B:</span><input type="range" id="B" class="RGB" name="B"/><input id="check_rgb" type="checkbox" /><input type="text" id="rgbinfo"/></div>')
        colorwin.append(rgb_div);
        let ran = document.getElementsByClassName('RGB');
        let check = document.getElementById('check_rgb');
        let rgbinfo = document.getElementById('rgbinfo');
        let rgb = { r:0.00, g:0.00, b:0.00 };
        for (let s of ran) {
            s.min = 0;
            s.max = 100;
            s.oninput = function(){
                for (let s in rgb) {
                    if (s === "r") {
                        if (parseInt(ran[0].value) >= 50) {
                            rgb.r = (parseInt(ran[0].value) - 50) / 50;
                        } else if (parseInt(ran[0].value) < 50 && parseInt(ran[0].value) >= 0) {
                            rgb.r = -(50 - parseInt(ran[0].value)) / 50;
                        }
                    } else if (s === "g") {
                        if (parseInt(ran[1].value) >= 50) {
                            rgb.g = (parseInt(ran[1].value) - 50) / 50;
                        } else if (parseInt(ran[1].value) < 50 && parseInt(ran[1].value) >= 0) {
                            rgb.g = -(50 - parseInt(ran[1].value)) / 50;
                        }
                    } else if (s === "b") {
                        if (parseInt(ran[2].value) >= 50) {
                            rgb.b = (parseInt(ran[2].value) - 50) / 50;
                        } else if (parseInt(ran[2].value) < 50 && parseInt(ran[2].value) >= 0) {
                            rgb.b = -(50 - parseInt(ran[2].value)) / 50;
                        }
                    }
                }
                rgbinfo.value = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
                
                if (check.checked) {
                    // colorFiltersObj.rgb = rgb;
                    layerinfo.colorFilters.rgbFilter = rgb;
                    console.log(rgb)
                }
            }
        }
        check.onchange = function () {
            if (check.checked) {
                colorFiltersObj.rgbFilter = rgb;
                layerinfo.colorFilters = colorFiltersObj;
                // console.log(layerinfo.name)
            }else{
                delete colorFiltersObj.rgbFilter;
                layerinfo.colorFilters = colorFiltersObj;
                // console.log(layerinfo.name)
            }
        }

        //hsl
        let hsl_div = $('<div id="hsl" style="width: 100%;height: 97px; position: relative;border-bottom:1px solid #fff;"><span>H:</span><input type="range" id="H" class="HSL" name="H"/><br /><span>S:</span><input type="range" id="S" class="HSL" name="S"/><br /><span>L:</span><input type="range" id="L" class="HSL" name="L"/><input id="check_hsl" type="checkbox" /><input type="text" id="hslinfo"/></div>')
        colorwin.append(hsl_div);
        let ran_hsl = document.getElementsByClassName('HSL');
        let check_hsl = document.getElementById('check_hsl');
        let hslinfo = document.getElementById('hslinfo');
        let hsl = { h: 0.00, s: 0.00, l: 0.00 };
        for (let s of ran_hsl) {
            s.min = 0;
            s.max = 100;
            s.oninput = function(){
                for (let s in hsl) {
                    if (s === "h") {
                        if (parseInt(ran_hsl[0].value) >= 50) {
                            hsl.h = (parseInt(ran_hsl[0].value) - 50) / 50;
                        } else if (parseInt(ran_hsl[0].value) < 50 && parseInt(ran_hsl[0].value) >= 0) {
                            hsl.h = -(50 - parseInt(ran_hsl[0].value)) / 50;
                        }
                    } else if (s === "s") {
                        if (parseInt(ran_hsl[1].value) >= 50) {
                            hsl.s = (parseInt(ran_hsl[1].value) - 50) / 50;
                        } else if (parseInt(ran_hsl[1].value) < 50 && parseInt(ran_hsl[1].value) >= 0) {
                            hsl.s = -(50 - parseInt(ran_hsl[1].value)) / 50;
                        }
                    } else if (s === "l") {
                        if (parseInt(ran_hsl[2].value) >= 50) {
                            hsl.l = (parseInt(ran_hsl[2].value) - 50) / 50;
                        } else if (parseInt(ran_hsl[2].value) < 50 && parseInt(ran_hsl[2].value) >= 0) {
                            hsl.l = -(50 - parseInt(ran_hsl[2].value)) / 50;
                        }
                    }
                }
                hslinfo.value = "hsl(" + hsl.h + "," + hsl.s + "," + hsl.l + ")";
                
                if (check_hsl.checked) {
                    colorFiltersObj.hsl = hsl;
                    layerinfo.colorFilters.hsl = hsl;
                    //layerinfo.name = colorFiltersObj;
                    console.log(hsl)
                }
            }
        }
        check_hsl.onchange = function () {
            if (check_hsl.checked) {
                colorFiltersObj.hsl = hsl;
                // layerinfo.name = colorFiltersObj;
                layerinfo.colorFilters = colorFiltersObj;
                console.log(layerinfo.name)
            }else{
                delete colorFiltersObj.hsl;
                layerinfo.colorFilters = colorFiltersObj;
                console.log(layerinfo.name)
            }
        }

        //BrightnessContrast
        let bc_div = $('<div id="bc" style="width: 100%;height: 80px; position: relative;border-bottom:1px solid #fff;"><span>B:</span><input type="range" id="b" class="bc" name="b"/><br /><span>C:</span><input type="range" id="C" class="bc" name="C"/><input id="check_bc" type="checkbox" /><input type="text" id="bcinfo"/></div>')
        colorwin.append(bc_div);
        let ran_bc = document.getElementsByClassName('bc');
        let check_bc = document.getElementById('check_bc');
        let bcinfo = document.getElementById('bcinfo');
        let bc = { b:50 , c:50 };
        for (let s of ran_bc) {
            s.min = 0;
            s.max = 100;
            s.oninput = function(){
                for (let s in bc) {
                    if (s === "b") {
                        bc.b = parseInt(ran_bc[0].value) + '%';
                    } else if (s === "c") {
                        bc.c = parseInt(ran_bc[1].value) + '%'
                    }
                }
                bcinfo.value = "bc(" + bc.b + "," + bc.c + ")";
                
                if (check_bc.checked) {
                    // colorFiltersObj.bc = bc;
                //    layerinfo.name = colorFiltersObj;
                    layerinfo.colorFilters.brightnessContrast = bc;
                    console.log(bc)
                }
            }
        }
        check_bc.onchange = function () {
            if (check_bc.checked) {
                colorFiltersObj.brightnessContrast = bc;
                // layerinfo.name = colorFiltersObj;
                layerinfo.colorFilters = colorFiltersObj;
                console.log(layerinfo.name)
            }else{
                delete colorFiltersObj.brightnessContrast;
                layerinfo.colorFilters = colorFiltersObj;
                console.log(layerinfo.name)
            }
        }
        
        //gamma
        let gamma_div = $('<div id="gamma" style="width: 100%;height:123px; position: relative;border-bottom:1px solid #fff;"><span>R:</span><input type="range" id="gamma_R" class="gamma_RGB" name="gamma_R"/><br /><span>G:</span><input type="range" id="gamma_G" class="gamma_RGB" name="gamma_G"/><br /><span>B:</span><input type="range" id="gamma_B" class="gamma_RGB" name="gamma_B"/><br/><span>RGB:</span><input type="range" id="gamma_rgb" name="gamma_rgb" class="gamma_RGB" /><input id="check_gamma" type="checkbox" /><input type="text" id="gammainfo"/></div>')
        colorwin.append(gamma_div);
        let ran_gamma = document.getElementsByClassName('gamma_RGB');
        let check_gamma = document.getElementById('check_gamma');
        let gammainfo = document.getElementById('gammainfo');
        let gamma = { r: 0.00, g: 0.00, b: 0.00 , rgb:0.00 };
        for (let s of ran_gamma) {
            s.min = 0;
            s.max = 100;
            s.oninput = function(){
                for (let s in gamma) {
                    if (s === "r") {
                        if (parseInt(ran_gamma[0].value) >= 50) {
                            gamma.r = (parseInt(ran_gamma[0].value) - 50) / 50;
                        } else if (parseInt(ran_gamma[0].value) < 50 && parseInt(ran_gamma[0].value) >= 0) {
                            gamma.r = -(50 - parseInt(ran_gamma[0].value)) / 50;
                        }
                    } else if (s === "g") {
                        if (parseInt(ran_gamma[1].value) >= 50) {
                            gamma.g = (parseInt(ran_gamma[1].value) - 50) / 50;
                        } else if (parseInt(ran_gamma[1].value) < 50 && parseInt(ran_gamma[1].value) >= 0) {
                            gamma.g = -(50 - parseInt(ran_gamma[1].value)) / 50;
                        }
                    } else if (s === "b") {
                        if (parseInt(ran_gamma[2].value) >= 50) {
                            gamma.b = (parseInt(ran_gamma[2].value) - 50) / 50;
                        } else if (parseInt(ran_gamma[2].value) < 50 && parseInt(ran_gamma[2].value) >= 0) {
                            gamma.b = -(50 - parseInt(ran_gamma[2].value)) / 50;
                        }
                    } else if (s === "rgb") {
                        if (parseInt(ran_gamma[3].value) >= 50) {
                            gamma.rgb = (parseInt(ran_gamma[3].value) - 50) / 50;
                        } else if (parseInt(ran_gamma[3].value) < 50 && parseInt(ran_gamma[3].value) >= 0) {
                            gamma.rgb = -(50 - parseInt(ran_gamma[3].value)) / 50;
                        }
                    }
                }
                gammainfo.value = "gamma(" + gamma.r + "," + gamma.g + "," + gamma.b +  "," + gamma.rgb +")";
                if (check_gamma.checked) {
                    colorFiltersObj.gamma = gamma;
                    // layerinfo.name = colorFiltersObj;
                    layerinfo.colorFilters.gamma = gamma;
                    console.log(gamma)
                }
            }
        }
        check_gamma.onchange = function () {
            if (check_gamma.checked) {
                colorFiltersObj.gamma = gamma;
                layerinfo.colorFilters = colorFiltersObj;
                console.log(layerinfo.name)
            }else{
                delete colorFiltersObj.gamma;
                layerinfo.colorFilters = colorFiltersObj;
                console.log(layerinfo.name)
            }
        }

        //cmyk
        let cmyk_div = $('<div id="cmky" style="width: 100%;height:123px; position: relative;border-bottom:1px solid #fff;"><span>C:</span><input type="range" id="cmyk_C" class="cmyk_CMYK" name="cmyk_C"/><br /><span>M:</span><input type="range" id="cmyk_M" class="cmyk_CMYK" name="cmyk_M"/><br /><span>M:</span><input type="range" id="cmyk_Y" class="cmyk_CMYK" name="cmyk_Y"/><br/><span>K:</span><input type="range" id="cmyk_K" name="cmyk_K" class="cmyk_CMYK" /><input id="check_cmyk" type="checkbox" /><input type="text" id="cmykinfo"/></div>')
        colorwin.append(cmyk_div);
        let ran_cmyk = document.getElementsByClassName('cmyk_CMYK');
        let check_cmyk = document.getElementById('check_cmyk');
        let cmykinfo = document.getElementById('cmykinfo');
        let cmyk = { c: 0.00, m: 0.00, y: 0.00 , k:0.00 };
        for (let s of ran_cmyk) {
            s.min = 0;
            s.max = 100;
            s.oninput = function(){
                for (let s in cmyk) {
                    if (s === "c") {
                        if (parseInt(ran_cmyk[0].value) >= 50) {
                            cmyk.c = (parseInt(ran_cmyk[0].value) - 50) / 50;
                        } else if (parseInt(ran_cmyk[0].value) < 50 && parseInt(ran_cmyk[0].value) >= 0) {
                            cmyk.c = -(50 - parseInt(ran_cmyk[0].value)) / 50;
                        }
                    } else if (s === "m") {
                        if (parseInt(ran_cmyk[1].value) >= 50) {
                            cmyk.m = (parseInt(ran_cmyk[1].value) - 50) / 50;
                        } else if (parseInt(ran_cmyk[1].value) < 50 && parseInt(ran_cmyk[1].value) >= 0) {
                            cmyk.m = -(50 - parseInt(ran_cmyk[1].value)) / 50;
                        }
                    } else if (s === "y") {
                        if (parseInt(ran_cmyk[2].value) >= 50) {
                            cmyk.y = (parseInt(ran_cmyk[2].value) - 50) / 50;
                        } else if (parseInt(ran_cmyk[2].value) < 50 && parseInt(ran_cmyk[2].value) >= 0) {
                            cmyk.y = -(50 - parseInt(ran_cmyk[2].value)) / 50;
                        }
                    } else if (s === "k") {
                        if (parseInt(ran_cmyk[3].value) >= 50) {
                            cmyk.k = (parseInt(ran_cmyk[3].value) - 50) / 50;
                        } else if (parseInt(ran_cmyk[3].value) < 50 && parseInt(ran_cmyk[3].value) >= 0) {
                            cmyk.k = -(50 - parseInt(ran_cmyk[3].value)) / 50;
                        }
                    }
                }
                cmykinfo.value = "cmyk(" + cmyk.c + "," +cmyk.m + "," + cmyk.y + "," + cmyk.k + ")";
                if (check_cmyk.checked) {
                    // colorFiltersObj.cmyk = cmyk;
                    // console.log(colorFiltersObj);
                    layerinfo.colorFilters.cmyk = cmyk;
                    // console.log(cmyk)
                }
            }
        }
        check_cmyk.onchange = function () {
            if (check_cmyk.checked) {
                colorFiltersObj.cmyk = cmyk;
                // layerinfo.name = colorFiltersObj;
                layerinfo.colorFilters = colorFiltersObj;
                // console.log(layerinfo.name)
            }else{
                delete colorFiltersObj.cmyk;
                // console.log(layerinfo.name)
                layerinfo.colorFilters = colorFiltersObj;
            }
        }

        //chromKey
        let chromKey_div = $('<div id="chromKey" style="width: 100%;height:123px; position: relative;border-bottom:1px solid #fff;"><span>R:</span><input type="range" id="chromKey_R" class="chromKey_RGB" name="chromKey_R"/><br /><span>G:</span><input type="range" id="chromKey_G" class="chromKey_RGB" name="chromKey_G"/><br /><span>B:</span><input type="range" id="chromKey_B" class="chromKey_RGB" name="chromKey_B"/><br/><span>distance:</span><input type="range" id="chromKey_distance" name="chromKey_distance" class="chromKey_RGB" /><input id="check_chromKey" type="checkbox" /><input type="text" id="chromKeyinfo" style="width:295px;"/></div>')
        colorwin.append(chromKey_div);
        let ran_chromKey = document.getElementsByClassName('chromKey_RGB');
        let check_chromKey = document.getElementById('check_chromKey');
        let chromKeyinfo = document.getElementById('chromKeyinfo');
        let chromKey = { r: 0.00, g: 0.00, b: 0.00 , distance:0.00 };
        for (let s of ran_chromKey) {
            s.min = 0;
            s.max = 100;
            s.oninput = function(){
                for (let s in chromKey) {
                    if (s === "r") {
                        if (parseInt(ran_chromKey[0].value) >= 50) {
                            chromKey.r = (parseInt(ran_chromKey[0].value) - 50) / 50;
                        } else if (parseInt(ran_chromKey[0].value) < 50 && parseInt(ran_chromKey[0].value) >= 0) {
                            chromKey.r = -(50 - parseInt(ran_chromKey[0].value)) / 50;
                        }
                    } else if (s === "g") {
                        if (parseInt(ran_chromKey[1].value) >= 50) {
                            chromKey.g = (parseInt(ran_chromKey[1].value) - 50) / 50;
                        } else if (parseInt(ran_chromKey[1].value) < 50 && parseInt(ran_chromKey[1].value) >= 0) {
                            chromKey.g = -(50 - parseInt(ran_chromKey[1].value)) / 50;
                        }
                    } else if (s === "b") {
                        if (parseInt(ran_chromKey[2].value) >= 50) {
                            chromKey.b = (parseInt(ran_chromKey[2].value) - 50) / 50;
                        } else if (parseInt(ran_chromKey[2].value) < 50 && parseInt(ran_chromKey[2].value) >= 0) {
                            chromKey.b = -(50 - parseInt(ran_chromKey[2].value)) / 50;
                        }
                    } else if (s === "distance") {
                        if (parseInt(ran_chromKey[3].value) >= 50) {
                            chromKey.distance = (parseInt(ran_chromKey[3].value) - 50) / 50;
                        } else if (parseInt(ran_chromKey[3].value) < 50 && parseInt(ran_chromKey[3].value) >= 0) {
                            chromKey.distance = -(50 - parseInt(ran_chromKey[3].value)) / 50;
                        }
                    }
                    
                }
                chromKeyinfo.value = "chromKey(" + chromKey.r + "," + chromKey.g + "," + chromKey.b + "," + chromKey.distance + ")";
                if (check_chromKey.checked) {
                    // colorFiltersObj.chromKey = chromKey;
                    layerinfo.colorFilters.chromaKey = chromKey;
                    console.log(chromKey)
                }
            }
        }
        check_chromKey.onchange = function () {
            if (check_chromKey.checked) {
                colorFiltersObj.chromaKey = chromKey;
                layerinfo.colorFilters = colorFiltersObj;
                console.log(layerinfo.name)
            }else{
                delete colorFiltersObj.chromaKey;
                layerinfo.colorFilters = colorFiltersObj;
                console.log(layerinfo.name)
            }
        }

        //roll
        let roll_div = $('<div id="roll" style="width: 100%;height:140px; position: relative;border-bottom:1px solid #fff;"><span>opposite:</span><input type="checkbox" id="opposite"/><br /><span>min_h:</span><input type="range" id="min_h" class="roll_p" name="min_h"/><br /><span>max_h:</span><input type="range" id="max_h" class="roll_p" name="max_h"/><br /><span>min_v:</span><input type="range" id="min_v" class="roll_p" name="min_v"/><br/><span>max_v:</span><input type="range" id="max_v" name="max_v" class="roll_p" /><input id="check_roll" type="checkbox" /><input type="text" id="rollinfo" style="width:295px;"/></div>')
        colorwin.append(roll_div);
        let ran_roll = document.getElementsByClassName('roll_p');
        let check_roll = document.getElementById('check_roll');
        let check_opposite = document.getElementById('opposite');
        let rollinfo = document.getElementById('rollinfo');
        let roll = { opposite:true , min_percent_horizon: 0.5 , max_percent_horizon: 0.5 , min_percent_vertical: 0.5 , max_percent_vertical:0.5 };
        for (let s of ran_roll) {
            s.min = 0;
            s.max = 100;
            s.oninput = function(){
                if(check_opposite.checked){
                    roll.opposite = true;
                }else{
                    roll.opposite = false;
                }
                for (let s in roll) {
                    if (s === "min_percent_horizon") {
                       roll.min_percent_horizon = parseInt(ran_roll[0].value) / 100;
                    }else if(s === "max_percent_horizon"){
                        roll.max_percent_horizon = parseInt(ran_roll[1].value) / 100;
                    }else if(s === "min_percent_vertical"){
                        roll.min_percent_vertical = parseInt(ran_roll[2].value) / 100;
                    }else if(s === "max_percent_vertical"){
                        roll.max_percent_vertical = parseInt(ran_roll[3].value) / 100;
                    }
                    
                }
                rollinfo.value = "roll(" + roll.opposite + "," + roll.min_h + "," + roll.max_h + "," + roll.min_v + "," + roll.max_v + ")";
                if (check_roll.checked) {
                    colorFiltersObj.roll = roll;
                    layerinfo.colorFilters.roll = roll;
                    console.log(roll)
                }
            }
        }
        check_opposite.onchange = function(){
            if(check_opposite.checked){
                roll.opposite = true;
            }else{
                roll.opposite = false;
            }
            rollinfo.value = "roll(" + roll.opposite + "," + roll.min_percent_horizon + "," + roll.max_percent_horizon + "," + roll.min_percent_vertical + "," + roll.max_percent_vertical + ")";
            colorFiltersObj.roll = roll;
            if (check_roll.checked) {
                layerinfo.colorFilters = colorFiltersObj;
                console.log(layerinfo.name)
            }
        }
        check_roll.onchange = function () {
            if (check_roll.checked) {
                colorFiltersObj.roll = roll;
                layerinfo.colorFilters = colorFiltersObj;
                console.log(layerinfo.name)
            }else{
                delete colorFiltersObj.roll;
                layerinfo.colorFilters = colorFiltersObj;
                console.log(layerinfo.name)
            }
        }
        
        //glsl
        let glsl_div = $('<div id="glsl" style="width:100%;margin-top:6px;"><span>GLSL:</span><input type="text"></div>');
        colorwin.append(glsl_div);
        
    }
    //属性过滤器
    propertiesFilter(property) {
        if (property === 'driver' || property === 'colorFilters' || property === 'name' || property === 'opacity') {
            return property;
        } else {
            return null;
        }
    }
    zTreeInit() {
        let setting = {
            edit: {
                enable: true,
                showRenameBtn: false,
                showRemoveBtn: showRemoveBtn
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            view: {
                addDiyDom: addDiyDom
            },
            callback: {
                onClick: onclick,
                beforeRemove: beforeRemove,
                onRemove: onRemove

            }
        };
        let the = this;
        //单击选定时获取选定节点数据
        function onclick(event, treeId, treeNode) {
            the.zTree = $.fn.zTree.getZTreeObj("tree");
            the.zTree.selectNode(treeNode);
        }

        //删除前确认
        function beforeRemove(treeId, treeNode) {
            return confirm(`确定删除${treeNode.name}图层吗`);
        }

        //删除节点
        function onRemove(event, treeId, treeNode) {
            earth.removeLayer(treeNode.id);
        }

        //把根节点的删除按钮去除
        function showRemoveBtn(treeId, treeNode) {
            return !treeNode.isparent
        }

        //添加隐藏按钮
        function addDiyDom(treeId, treeNode) {
            var a = $(`#${treeNode.tId}_a`);
            var hide = $("<span class='button eye'></span>");
            if (!treeNode.isparent) {
                a.append(hide);
            }
            hide.click(function () {

            });
        }
        $.fn.zTree.init($("#tree"), setting, null);

        this.zTree = $.fn.zTree.getZTreeObj("tree");
    }
    //添加根节点
    getLayersNodesType(typeName) {
        this.zTree = $.fn.zTree.getZTreeObj("tree");
        let zTreeNode = this.zTree.addNodes(null, { pId: 0, isparent: true, name: typeName }, true);
    }

    //添加子节点
    addChildrenNodes(typename,children){
        if(children instanceof Array){
        for(let s = children.length - 1; s >= 0; s--){
            this.zTree = $.fn.zTree.getZTreeObj("tree");
            var parentNode = this.zTree.getNodeByParam("name",typename);
            let childrenNode = this.zTree.addNodes(parentNode,{id:children[s].uuid,name:children[s].name,isparent:false});
            }
        }else{
            this.zTree = $.fn.zTree.getZTreeObj("tree");
            var parentNode = this.zTree.getNodeByParam("name",typename);
            let childrenNode = this.zTree.addNodes(parentNode,{id:children.uuid,name:children.name,isparent:false});
        }
    }
}
//# sourceURL=LayerTreeWidget.js