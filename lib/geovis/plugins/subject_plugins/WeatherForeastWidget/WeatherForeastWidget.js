/**
 * 项目：gvml
 * 文件：WeatherForeastWidget.js
 * 作者：李保行
 * 部门：产品研发中心
 * 邮箱：jqian@mail.ie.ac.cn
 * 日期：2017-08-08 16:27:20.
 * 用途：类
 */

class WeatherForeastWidget extends GV.Widget {
   
    init() {
		this.weatherforeast = this.earth.getMapWidget('WeatherForeastWidget').open();    
    }
    
    remove() {
    	this.earth.getMapWidget('WeatherForeastWidget').close();
    }
    weatherForeastWidget(weatherForeastJSon) {
        this.weatherforeast.postMessage('weatherForeastPara',weatherForeastJSon);
    }
    currentKey(weatherForeastKey) {
        this.weatherforeast.postMessage('weatherForeastKey',weatherForeastKey);
    }
	
}

//# sourceURL=WeatherSetTool.js 
