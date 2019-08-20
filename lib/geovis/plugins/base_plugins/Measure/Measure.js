
//保留两位小数     Math.round(data)
//功能：将浮点数四舍五入，取小数点后2位    
function toDecimal(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return;
    }
    f = Math.round(x * 100) / 100;
    return f;
}

class Measure extends GV.Tool {
    reference() {
        this.html = "./Measure.html";
        this.css = "./css/Measure.css";
    }

    init() {

        //创建专题场景
        this.scene = new GV.GraphicScene();
        this.earth.addScene(this.scene);

        this.toolStat = 0; //当前测量的类型
        this.draw = false; //是否是绘制状态

        var that = this;
        //选择测量类型
        $(".M_ToolStat").click(function() {
            $.each($(".M_ToolStat"), function(i, n) {
                $(".M_ToolStat").eq(i).removeClass("M_ToolStat" + (i + 1) + "A")
                $(".M_ToolStat").eq(i).addClass("M_ToolStat" + (i + 1) + "")
            });
            $(this).addClass("M_ToolStat" + $(this).index() + "A")
            that.toolStat = $(this).index();
            $(".M_tip").html("<p>当前所选点</p><p><i>0</i>单位</p>")
            $(".M_PointListMain").html("")
            that.scene.clear();
            that.lineData = undefined;
        })

        //设置是否可以绘制
        $(".M_ToolCur").click(function() {
            if ($(this).hasClass("M_ToolCurA")) {
                $(this).removeClass("M_ToolCurA")
                that.draw = false;
            } else {
                $(this).addClass("M_ToolCurA")
                that.draw = true;
            }
        })

        //添加消息监听
        this.earth.container.find('embed').mouseup(this.mouseMeasure.bind(this));
        this.earth.container.find('embed')[0].addEventListener('touchstart', this.touchMeasure.bind(this));

        //编辑修改刷新
        $(".M_PLH_Sure").click( this.updataRevise.bind(this));
    }

    //鼠标测量
    mouseMeasure(event) {
        if(!this.draw) return;
        if(event.button === 0) {//鼠标左键测量
            this.measureing();
        } else { //鼠标右键取消测量保存测量数据
            this.measureEnd();
        }
    }

    //触摸测量
    touchMeasure(event) {
        console.log(event);
        if(!this.draw) return;
        setTimeout(this.measureing.bind(this), 100);
    }

    //刷新编辑类表
    lonLatList() {
        if(!this.lineData && this.lineData.length === 0) return;
        
        var str = "";
        for (var i = 0; i < this.lineData.length; i++) {
            str = str + '<div class="M_PointItem">' +
                '<i>经度<input type="text" value="' + this.lineData[i][0] + '" style="color: rgba(255, 255, 255, 0.8);"/></i>' +
                '<i>纬度<input type="text"  value="' + this.lineData[i][1] + '" style="color: rgba(255, 255, 255, 0.8);"/></i></div>'

        }
        $(".M_PointListMain").html("");
        $(".M_PointListMain").append(str)
        
    }

    //修改后刷新
    updataRevise() {
        var list = []
        for (var i = 0; i < $(".M_PointItem").length; i++) {
            var arr = [
                $(".M_PointItem").eq(i).find("input").eq(0).val(),
                $(".M_PointItem").eq(i).find("input").eq(1).val()
            ]
            list.push(arr)
        }

        this.lineData = list;

        this.updataDraw(this.toolStat, this.lineData);
    }

    //量测操作
    measureing() {
        if(!this.earth.location) return;
        if(!this.lineData) this.lineData = [];
        this.lineData.push([this.earth.location.lon, this.earth.location.lat, this.earth.location.alt]);

        //跟新三维
        this.updataDraw(this.toolStat, this.lineData);

        //刷新编辑列表
        this.lonLatList();
            
    }

    //结束量测操作
    measureEnd() {
        //保存数据生成记录
        if( this.lineData && this.lineData.length >= 2) {
            var str1 = "";
            var dataStr = "";
            for (var i = 0; i < this.lineData.length; i++) {
                dataStr += "@L" + this.lineData[i] + "@R"
            }
            if (this.toolStat === 1) {
                str1 = '<div class="M_HL_Line" stat="1" data=' + dataStr + '">长度</div>'
            } else if (this.toolStat === 2) {
                str1 = '<div class="M_HL_Area" stat="2" data="' + dataStr + '">面积</div>'
            } else if (this.toolStat === 3) {
                str1 = '<div class="M_HL_Ami" stat="3" data="' + dataStr + '">角度</div>'
            }
            $(".M_HL_List").append(str1)

            //打开保存处理操作
            const that = this;
            $(".M_HL_List div").click(function() {
                that.lineData = $(this).attr("data").substring(0, dataStr.length);
                that.lineData = that.lineData.replace(/@L/g, "[");
                that.lineData = that.lineData.replace(/@R/g, "],");
                that.lineData = that.lineData.substring(0, that.lineData.length - 1);
                that.lineData = "[" + that.lineData + "]"
                that.lineData = JSON.parse(that.lineData)
                
                that.updataDraw($(this).attr("stat"), that.lineData);
               
            });
        }
        
        //清理数据,关闭状态
        $(".M_PointListMain").html("");
        $(".M_ToolCur").removeClass("M_ToolCurA");
        this.draw = false;
        this.lineData = undefined;
    }

    //更新三维
    updataDraw(toolStat, lineData) {
        if(lineData.length < 2) return;

        //绘制模型
        switch (Number(toolStat)) {
            case 1:     
                this.line(lineData);
                break;
            case 2:
                this.area(lineData);
                break;
            case 3:
                this.azimuthalAngle(lineData);
                break;
            default:
                break;
        }
    }

    //画线
    line(lineData) {
        this.scene.clear();
        const polyline = new GV.Polyline({
            vertices: lineData,
            style: {
                stroke: '#ff0000',
                'stroke-width': 6,
                'altitude-clamping': 'terrain-drape',
            }
        });

        this.scene.addNode(polyline);
        const count = polyline.getPointCount();
        if (count >= 2) {
            const temp = polyline.getPoints();
            this.earth.math.distance(temp ,(data) => {
                const distance = Number(data);
                var str = '<p>当前所选点距离总长为</p>' +
                    '<p><i>' + Math.round(distance / 1000) + '</i>千米</p>';
                $(".M_tip").html(str)
            });
        }
    }
    
    //画面
    area(lineData) {
        this.scene.clear();
        const polygon = new GV.Polygon({
            vertices: lineData,
            style: {
                fill: '#ffff007f',
                stroke: '#ffffff',
                'stroke-width': '2px',
                'altitude-clamping': 'terrain-drape',
            }
        });

        this.scene.addNode(polygon);
        const count = polygon.getPointCount();
        if (count >= 3) {
            this.earth.math.area(polygon.getPoints(), (data) => {
                const distance = Number(data);
                console.log(distance)
                var str1 = '<div>当前所选点面积 </div>' +
                    '<div><span id = "distanceInfo">' + Math.round(distance / 1000000) + '</span>平方千米</div>'
                $(".M_tip").html(str1)
            });
        }
    }

    //画方位角
    azimuthalAngle(lineData) {
        if (lineData.length > 2) {
            lineData = [lineData[0], lineData.pop()]
        }
        $(".M_PointListMain").html("")
        this.line(lineData)
        this.earth.math.azimuthalAngle({ lon: lineData[0][0], lat: lineData[0][1], alt: lineData[0][2] }, { lon: lineData[1][0], lat: lineData[1][1], alt: lineData[1][2] }, (data) => {
            var str = '<p>当前所选点角度</p>' +
                '<p><i>' + toDecimal(data) + '</i>度</p>';
            $(".M_tip").html(str)
        });
    }

    remove() {
        this.earth.removeScene(this.scene);

        //清除事件监听
        this.earth.container.find('embed')[0].addEventListener('touchstart', this.touchMeasure);
        this.earth.container.find('embed')[0].removeEventListener('mouseup', this.mouseMeasure);
    }

}

//# sourceURL=Measure.js 