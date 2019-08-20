/**
 * 项目：gvml
 * 文件：scaleBar.js
 * 作者：程敏英
 * 部门：可视化平台
 * 邮箱：chengmy@geovis.com.cn
 * 日期：2018.01.09
 * 用途：比例尺
 */

class scaleBar extends GV.Widget {

    reference() {
        this.css = "scaleBar.css";
        this.html = "scaleBar.html";
    }

    init() {

        $(this.container).css({
            'top': '-50px',
        });

        //插件初始化时立即初始化比例尺
        ( () => {
            this.main()
        })();

        //监听相机变化
        this.earth.camera.onCameraChange( () => {
            this.main()
        })
    }

    main() {
        
        var scale = this.earth.camera.scale;
        var camerascale = this.earth.camera.scale * 100;
        var distance = document.getElementsByClassName('scaleBar_text')[0];
        var len = document.getElementsByClassName('gvmap_scaleBar')[0];

        var jsondata = {
            arr: [5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 25000, 50000, 100000, 200000, 500000, 1000000, 2000000],
            text: ['2.5m', '5m', '10m', '25m', '50m', '100m', '250m', '500m', '1000m', '2500m', '5km', '10km', '12.5km', '25km', '50km', '100km', '250km', '500km', '1000km']
        };

        for (let i = 0; i < jsondata.text.length; i++) {
            if (camerascale > jsondata.arr[i - 1] && camerascale <= jsondata.arr[i]) {
                let wid = jsondata.arr[i] / scale;
                len.style.width = wid / 2 + "px";
                distance.innerText = jsondata.text[i];
            }
            if (camerascale > 0 && camerascale <= jsondata.arr[0]) {
                len.style.width = "50px";
                distance.innerText = "<2.5m";
            }
            if (camerascale > jsondata.arr[jsondata.arr.length - 1]) {
                len.style.width = "50px";
                distance.innerText = ">1000km";
            }
        }
    }
}