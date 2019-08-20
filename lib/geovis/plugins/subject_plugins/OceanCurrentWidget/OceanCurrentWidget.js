/**
 * 项目：gvml
 * 文件：oceanCurrentWidget.js
 * 作者：李保行
 * 部门：产品研发中心
 * 邮箱：......
 * 日期：2017-08-08 16:27:20.
 * 用途：类
 */

class OceanCurrentWidget extends GV.Widget {
   
  	
  	

    init() {

        this.ocean = this.earth.getMapWidget('oceancurrent').open(); 
    }
    
    remove() {
    	this.earth.getMapWidget('oceancurrent').close();
    }
    oceanCurrentPara(oceanCurrentJSon) {
        this.ocean.postMessage('oceanCurrentPara',oceanCurrentJSon);
    }
    currentKey(key) {
        this.ocean.postMessage('oceanCurrentKey',key);
    }
	

	
}

//# sourceURL=OceanCurrentWidget.js 
