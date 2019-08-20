/**
 * 项目：gvml
 * 文件：Birdview.js
 * 作者：董波
 * 部门：产品研发中心
 * 邮箱：dongb@mail.ie.ac.cn
 * 日期：2017-06-29 19:37:20.
 * 用途：类
 */
class Birdview extends GV.Widget {

 reference() {
		this.html = "./Birdview.html";
		this.css = './Birdview.css';
	}

    init() {
        //this.css('./Birdview.css');
        //this.html('./Birdview.html');
        $(this.container).css({
          'position': 'relative',
           'top': 0,
           'height': '0px'
        });

        // init position
        const lon = this.earth.camera.viewpoint.lon;
        const lat = this.earth.camera.viewpoint.lat;
        const width = 300;
        const height = 150;

        let x = (lon + 180) / 360 * width;
        let y = (lat + 90) / 180 * height;
        x = x < 0 ? 0 : x > width ? width : x;
        y = y < 0 ? 0 : y > height ? height : y;
        var cross = document.getElementById('cross_cursor');
        cross.style.left = `${x-12}px`;
        cross.style.top = `${height-y-12}px`

        this.earth.camera.onCameraChange(this.cameraChange);
        var that = this;
        
        var birdView = document.getElementById('birdview');

        cross.onclick = (event) => {
            event.stopPropagation();
        }

        birdView.onclick = (event) => {
            cross.style.left = `${event.offsetX - 12}px`;
            cross.style.top = `${event.offsetY - 12}px`

            var viewpoint = this.earth.camera.viewpoint;
            viewpoint.lon = (event.offsetX) * 360 / width - 180;
            viewpoint.lat = 90 - (event.offsetY) * 180 / height;

            this.earth.camera.setViewpoint(viewpoint, 0);
        }
        
        $(".del").click(() => {
            that.earth.unusingWidget(this)
        });
    }

    cameraChange(cameraData) {
        const width = 300;
        const height = 150;

        if(!cameraData || !cameraData.viewpoint) return;
        const lon = cameraData.viewpoint.lon;
        const lat = cameraData.viewpoint.lat;

        let x = (lon + 180) / 360 *width;
        let y = (lat + 90) / 180 * height;
        x = x < 0 ? 0 : x > width ? width : x;
        y = y < 0 ? 0 : y > height ? height : y;
        var cross = document.getElementById('cross_cursor');
        cross.style.left = `${x-12}px`;
        cross.style.top = `${height-y-12}px`
    }

    remove() {
        this.earth.camera.offCameraChange(this.cameraChange);
    }
}

//# sourceURL=Birdview.js
