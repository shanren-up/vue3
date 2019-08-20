/**
 * 项目：gvml
 * 文件：WeatherSetTool.js
 * 作者：李保行
 * 部门：产品研发中心
 * 邮箱：jqian@mail.ie.ac.cn
 * 日期：2017-08-08 16:27:20.
 * 用途：类
 */

class WeatherSetTool extends GV.Widget {
   
    init() {
		this.Weather = this.earth.getMapWidget('weather').open();    
    }
    
    remove() {
    	this.earth.getMapWidget('weather').close();
    }
    rasterFiledPara(rasterFieldJSon) {
        this.Weather.postMessage('rasterFiledPara',rasterFieldJSon);
    }
    currentKey(key) {
        this.Weather.postMessage('currentKey',key);
    }
	
}

//# sourceURL=WeatherSetTool.js 
