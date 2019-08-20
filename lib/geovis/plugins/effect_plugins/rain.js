/**
 * 项目：gvml
 * 文件：CompassZoom.js
 * 作者：钱晶
 * 部门：产品研发中心
 * 邮箱：jqian@mail.ie.ac.cn
 * 日期：2017-03-08 13:22:28.
 * 用途：类
 */

class rain extends GV.Widget {

  init() {

	  this.rain = this.earth.getMapWidget('Rain').open();
	}
    remove() {
  	this.rain.close();
  }
   addRain(para)
   {
   		this.rain.postMessage('addRain',para)
   }
   removeRain() 
   { 
   	this.rain.postMessage('removeRain'); 
   }
   
   setRainSize(v)
   {
   		this.rain.postMessage('setRainSize',v)
   }
}
