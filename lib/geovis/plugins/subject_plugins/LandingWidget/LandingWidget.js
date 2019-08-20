/**
 * 项目：gvml
 * 文件：LandingWidget.js
 * 作者：李保行
 * 部门：产品研发中心
 * 邮箱：......
 * 日期：2017-08-landing15 16:27:20.
 * 用途：类
 */

class LandingWidget extends GV.Widget {
   
  	
  	

    init() {
        this.Weather = this.earth.getMapWidget('landing').open(); 
    }
    
    remove() {
    	this.earth.getMapWidget('landing').close();
    }
    landingPara(landingJSon) {
        this.Weather.postMessage('landingPara',landingJSon);
    }
    landingKey(key) {
        this.Weather.postMessage('landingKey',key);
    }
	

	
}

//# sourceURL=LandingWidget.js 
