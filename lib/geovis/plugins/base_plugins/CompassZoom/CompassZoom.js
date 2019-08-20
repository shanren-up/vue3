/**
 * 项目：gvml
 * 文件：CompassZoom.js
 * 作者：钱晶
 * 部门：产品研发中心
 * 邮箱：jqian@mail.ie.ac.cn
 * 日期：2017-03-08 13:22:28.
 * 用途：类
 */
class CompassZoom extends GV.Widget {
		reference() {
				this.html = "./zoom.html";
				this.css = "./zoom.css";
			}
        init() {
            const camera = this.earth.camera;
            var that = this;
            var updataImg = function() {
                $('#to2D > img').attr('src', that.formatURL('./image/2D.png')); 
                $('#to3D > img').attr('src', that.formatURL('./image/3D.png')); 
                $('#toMap2D > img').attr('src', that.formatURL('./image/Map2D.png')); 
                switch(that.earth.currentMode) {
                    case '2D':
                        $('#to2D > img').attr('src', that.formatURL('./image/2D选中.png'));
                        break;
                    case '3D':
                        $('#to3D > img').attr('src', that.formatURL('./image/3D选中.png'));
                        break;
                    case 'Map2D':
                        $('#toMap2D > img').attr('src', that.formatURL('./image/Map2D选中.png'));
                    break;
                }
             }
            $('#onModeClick').click(() => {
                updataImg();
                if(document.getElementById ('geovis-earth-mode').style.display == 'block'){
				    document.getElementById ('geovis-earth-mode').style.display = 'none';
				}else{
					document.getElementById ('geovis-earth-mode').style.display = 'block';
				}
            });
            $('#onModeClick').mouseup(() => {
                $('#onModeClick > img').attr('src', this.formatURL('./image/earth_mode.png'));     
            });
            $('#onModeClick').mousedown(() => {
                $('#onModeClick > img').attr('src', this.formatURL('./image/模式x.png'));     
            });

            $('#goHome').click(() => {
                camera.flyToHome(1);       
            });
            $('#goHome').mouseup(() => {
                $('#goHome > img').attr('src', this.formatURL('./image/指北针.png'));     
            });$('#goHome').mousedown(() => {
                $('#goHome > img').attr('src', this.formatURL('./image/指北针x.png'));     
            });

            $('#zoomIn').click(() => {
                camera.zoom(-0.1);   
            });
            $('#zoomIn').mouseup(() => {
                $('#zoomIn > img').attr('src', this.formatURL('./image/放大.png'));     
            });
            $('#zoomIn').mousedown(() => {
                $('#zoomIn > img').attr('src', this.formatURL('./image/放大x.png'));     
            });

            $('#zoomOut').click(() => {
                console.log(this.earth);
                camera.zoom(0.1);  
            });
            $('#zoomOut').mouseup(() => {
                $('#zoomOut > img').attr('src', this.formatURL('./image/缩小.png'));     
            });
            $('#zoomOut').mousedown(() => {
                $('#zoomOut > img').attr('src', this.formatURL('./image/suoxiao.png'));     
            });
             
            $('#to2D').click(() => {
                that.earth.currentMode = '2D'; 
                updataImg();
            });

            $('#to3D').click(() => {
                that.earth.currentMode = '3D'; 
                updataImg();   
            });

            $('#toMap2D').click(() => {
                that.earth.currentMode = 'Map2D'; 
                updataImg();
            });
            
            //功能函数未定义
            $('#拓扑').mouseup(() => {
                $('#拓扑 > img').attr('src', this.formatURL('./image/拓扑.png'));     
            });$('#拓扑').mousedown(() => {
                $('#拓扑 > img').attr('src', this.formatURL('./image/拓扑选中.png'));     
            });
            
            //功能函数未定义
            $('#时间轴').mouseup(() => {
                $('#时间轴 > img').attr('src', this.formatURL('./image/时间轴.png'));     
            });$('#时间轴').mousedown(() => {
                $('#时间轴 > img').attr('src', this.formatURL('./image/时间轴选中.png'));     
            });
        }
}

//# sourceURL=CompassZoom.js 