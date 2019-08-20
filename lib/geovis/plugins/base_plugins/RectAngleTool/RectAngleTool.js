
// 创建插件
class RectAngleTool extends GV.Tool {

// 初始化插件
 reference() {
		this.script = '../UtilTools/GAjax.js';
		this.script = '../UtilTools/echarts3.js';
		this.script = '../UtilTools/createChars.js';
	}
  init() {
  	
  	// 激活插件
	this.distance = this.earth.getMapTool('RectAngleTool').select(); 

	// 接收框选操作
	this.distance.on('ts_rectangle', this.ontsrectangle);
	
  }
   
   // 连接服务并绘制统计信息
	ontsrectangle(msg){	
		createchars(msg,"http://192.168.6.2:19002/api/v1/query/DTMB");	 
	}

	remove() {
		this.distance.off('ts_rectangle', this.ontsrectangle);
		this.earth.clearMapTool();
	}
}




