
/**
 * 项目：gvml
 * 文件：FrameStatInfo.js
 * 作者：王焰辉
 * 部门：产品研发中心
 * 邮箱：wangyh@geovis.com
 * 日期：2017-03-21 23:23:38.
 * 用途：帧率统计
 */
let FrameStatInfo;
{
    const GV = window.GV;
    const $ = window.$;

    FrameStatInfo = (
        class FrameState extends GV.Widget {

            reference() {
                this.html = "./FrameStatInfo.html";
                this.css = './FrameStatInfo.css';
            }
 
            init() {
                this.earth.onFrameStatInfo(this.updateInfo);
            }

            updateInfo(info) {
                $('#frame .right_span').html(parseFloat(info.frame_rate).toFixed(4));
                $('#event .right_span').html(parseFloat(info.event_time).toFixed(4));
                $('#update .right_span').html(parseFloat(info.update_time).toFixed(4));
                $('#cull .right_span').html(parseFloat(info.cull_time).toFixed(4));
                $('#draw .right_span').html(parseFloat(info.draw_time).toFixed(4));
                $('#gpu .right_span').html(parseFloat(info.gpu_time).toFixed(4));
                $('#postframe .right_span').html(parseFloat(info.postframe_time).toFixed(4));
                $('#webgl .right_span').html(parseFloat(info.webgl_time).toFixed(4));
            }

            remove() {
                this.earth.offFrameStatInfo(this.updateInfo);
            }

        }
    );
}

//# sourceURL=FrameStatInfo.js 

