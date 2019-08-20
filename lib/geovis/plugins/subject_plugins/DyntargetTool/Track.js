class Track {
    constructor( scene, info, trackPoints, width, color ) {
        this.trackInfo = info;
        this.trackPoints = trackPoints;
        this.scene = scene;
        this.selectTrackPoint = null;

        let vertices = [];
        for(let i = 0; i < this.trackPoints.length; i++) {
            vertices.push([this.trackPoints[i].LOC[0], this.trackPoints[i].LOC[1], 10000]);
            let icon = new GV.Icon({
                position: {lon: this.trackPoints[i].LOC[0], lat: this.trackPoints[i].LOC[1], alt: 10000},
                icon:'http://127.0.0.1:3000/docResource/trackIcon.png', 
                iconMode: GV.ICONMODE.SPIRIT_SIZE, 
                size: 10, 
                alpha: 0.8
            });

            this.trackPoints[i].id = icon.id;
            scene.addNode(icon);
        }

        //当航迹线只有一个点时绘制一个点，当有两个点时绘制一条折线（Polyline），当有三个点时绘制样条曲线（Spline）
        if(this.trackPoints.length > 1 && this.trackPoints.length < 3) {
            this.trackSpline = new GV.Polyline({
                vertices: vertices,
                color: color,
                style: {
                    'stroke-width': width + 'px'
                }
            });
            this.trackSpline.isLighting = false;
            scene.addNode(this.trackSpline);
        } else if( this.trackPoints.length > 2) {
            // this.trackSpline = new GV.Polyline({
            this.trackSpline = new GV.Spline({
                vertices: vertices,
                color: color,
                style: {
                    'stroke-width': width + 'px'
                }
            });
            this.trackSpline.isLighting = false;
            scene.addNode(this.trackSpline);
        }
    }

    // deletPoint  = function(id) {

    // }
    //根据ID获取航迹点的信息
    getPointInfo(id) {
        for(let i = 0; i < this.trackPoints.length; i++) {
            if(this.trackPoints[i].id === id) {
                return this.trackPoints[i];
            }
        }
        return null;
    }
    //重置已选中的航迹点样式
    resetSelectedPointStyle() {
        if(this.selectTrackPoint) {
            this.selectTrackPoint.icon = './img//trackIcon.png';
            this.selectTrackPoint.size = 10;
            this.selectTrackPoint = null;
        }
    }
    
    //根据ID判断选中的点是否为航迹线上的点
    isTrackPoint(id) {
        for(let i = 0; i < this.trackPoints.length; i++) {
            if(this.trackPoints[i].id === id) {
                return true;
            }
        }
        return false;
    }
    //删除轨迹线和线上的所有点
    removeTrack() {
        this.scene.removeNode(this.trackSpline.id);
        for(let i = 0; i < this.trackPoints.length; i++) {
            this.scene.removeNode(this.trackPoints[i].id);
        }
    }
}
