/**
 * 项目：gvml
 * 文件：WindFieldWidget.js
 * 作者：李保行
 * 部门：产品研发中心
 * 邮箱：jqian@mail.ie.ac.cn
 * 日期：2017-08-08 16:27:20.
 * 用途：类
 */

class WindFieldWidget extends GV.Widget {
   
    init() {
		this.weatherfield = this.earth.getMapWidget('WindFieldWidget').open();    
    }
    
    remove() {
    	this.earth.getMapWidget('WindFieldWidget').close();
    }
    windFieldWidget(windFieldJSon) {
        this.weatherfield.postMessage('WindFieldWidget',windFieldJSon);
    }
    currentKey(windFieldWidgetKey) {
        this.weatherfield.postMessage('WindFieldWidgetKey',windFieldWidgetKey);
    }
	
}

//# sourceURL=WindFieldWidget.js 
