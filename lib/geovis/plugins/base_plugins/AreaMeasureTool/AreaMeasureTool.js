/**
 * 项目：gvml
 * 文件：DistanceTool.js
 * 作者：钱晶
 * 部门：产品研发中心
 * 邮箱：jqian@mail.ie.ac.cn
 * 日期：2017-03-05 19:37:20.
 * 用途：类
 */
class AreaMeasureTool extends GV.Tool {

    init() {
           if(!this.scene) {
              this.scene = new GV.GraphicScene(); //创建专题场景节点
              this.earth.addScene(this.scene); //将专题场景节点添加到地球
           }

            this.polygon = undefined; //保存线
            this.text = undefined;
            this.distance = 0;
            this.isDraw = false; //是否是绘制状态
            this.earth.container.mouseup(this.mouseUp.bind(this));

            this.earth.container.mousemove(this.mouseMove.bind(this));

    }

    mouseUp(event) {
        if(!this.earth.location) return;
          if(event.button === 0){//左键按下和ctrl按下开始绘图
              if(!this.polygon) {
                  this.polygon = new GV.Polygon({
                      vertices: [[this.earth.location.lon, this.earth.location.lat, 10000], [this.earth.location.lon, this.earth.location.lat, 10000]],
                      style : {
                         fill: '#ffff007f',
                          stroke: '#ff0000',
                          'stroke-width': 3,
                          'altitude-clamping': 'terrain-drape',
                      }
                  });
                  this.scene.addNode(this.polygon);
                  this.isDraw  = true;
              }

              if(this.isDraw) {
      
                  var tempv = this.polygon.getPoint(this.polygon.getPointCount() - 1);
                  if(tempv[0] === this.earth.location.lon && tempv[1] === this.earth.location.lat) return;
                
                  this.polygon.addPoints([[this.earth.location.lon, this.earth.location.lat, 10000]]);

                  //添加距离
                  if(this.text === undefined) {           
                      this.text = new GV.Label({
                          position: { lat: 0, lon: -5 },
                          style: {
                              'text-align':  'center_center',
                              'text-geographic-course': 30.0,
                              'text-bbox-fill': '#FFFF0033',
                              'text-bbox-margin': 8,
                              'text-bbox-border': '#FFFF00',
                              'text-bbox-border-width': 0.5,
                              'text-size':35,
                          },
                          text: ''
                      });
                      this.scene.addNode(this.text);
                  }

                const count = this.polygon.getPointCount();
                if(count >= 3) {
                    const temp = this.polygon.getPoint(count-3);
                    this.earth.math.area(this.polygon.getPoints(), (data) => {
                            const d = Number(data);
                            this.distance = this.distance+d;
                            this.text.text = this.distance.toString();
                            this.text.position = {lat:this.earth.location.lat, lon:this.earth.location.lon};
                    });
                }
              }

          } else if(event.button == 2) {//右键按下
              if(this.isDraw) {
                  const count = this.polygon.getPointCount();
                  if(count >= 2) {
                      const temp = this.polygon.getPoint(count-2);
                      this.earth.math.area(this.polygon.getPoints(), (data) => {
                                const d = Number(data);
                                this.distance = this.distance;
                                this.text.text = this.distance.toString();
                                this.text.position = {lat:this.earth.location.lat, lon:this.earth.location.lon};
                            });
                  }
                  this.isDraw = false;
              } 
          } 
    }

    mouseMove(event) {
        if(!this.earth.location) return;
        if(this.polygon && this.isDraw) {
            this.polygon.revisePoint(this.polygon.getPointCount()-1, [this.earth.location.lon, this.earth.location.lat, 10000]);
        }
    }

    remove() {
      this.earth.container.unbind('mousemove');
      this.earth.container.unbind('mouseup');
      if(this.polygon) {
        this.scene.remove(this.polygon);
        this.polygon = undefined;
      }

      if(this.text) {
        this.scene.remove(this.text);
        this.text = undefined;
      }
    }
  
}
//# sourceURL=AreaMeasureTool.js 