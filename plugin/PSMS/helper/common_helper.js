define(
	[
		'comp_modal',
        'json!../common/common_dictionary_data.json'
	],

	function(modal, commonData) {

		'use strict';

		var helper = Ember.Object.extend({
			roleLevelDic: null,
			init: function() {
				this.set('roleLevelDic', commonData.roleLevelData);
			},
			willDestroy: function() {},
			/**
			 * modalName  名称
			 * componentName  名称
			 * parameters  {pictureId:1,windowId:1}
			 */
			openWindow: function(targetObject, modalName, componentName, parameters) {
				var self = this;
				modal.popup({
					targetObject: targetObject,
					//父对象，支持弹出多层
					isDefaultStyle: true,
					//是否默认样式
					sizeClass: componentName + '-size',
					//弹出框大小:large、small，或自定义整体样式
					headerClass: componentName + '-header',
					//自定义头部样式,
					bodyClass: componentName + '-body',
					//自定义内容样式
					// footerClass : 'bhz-comp-XXX-modal-footer' , //自定义底部样式
					hasHeader: true,
					//是否有头部，默认true
                    hasMax: false,
                    hasPhoto: false,
					headerText: modalName,
					//头部标题名称
					// headerComponentName : 'bhz-comp-XXX-modal-header', //头部组件
					contentComponentName: componentName,
					//内容组件
					parameters: parameters,
					hasFooter: false,
					//是否有底部，默认false
					confirmText: '关闭',
					//底部按钮名称
					enforceModality: true,
					top: 100,
					close: function() { //获取传递参数
						//var param = this.parameters;
					}
				});
			},
			//时间戳转换成时间格式
            timeFormat: function (timeStr, isDate)
            {
            	if(!timeStr){
            		return '-';
				}
                var time = new Date(timeStr);
                var y = time.getFullYear();
                var m = time.getMonth()+1;
                var d = time.getDate();
                var h = time.getHours();
                var mm = time.getMinutes();
                var s = time.getSeconds();
                if(isDate){
                    return y+'-'+this.add0(m)+'-'+this.add0(d);
				}else{
                    return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
				}
            },
			add0: function(time){
				if(time < 10){
					return '0' + time;
				}
				return time;
			},
			//角色权限字典值转换
            roleValueFormat: function(levels){
				if(!levels){
					return '-';
				}
				var levelArr = levels.split(',');
				var newStr = '';
				levelArr.forEach(function(item){
					var obj = this.roleLevelDic.findBy('id', item);
					if(obj){
						if(!newStr){
							newStr += obj.name;
						}else{
                            newStr += ',' + obj.name;
						}
					}
				}.bind(this));
				return newStr;
			}
		});

		return helper.create();
	});