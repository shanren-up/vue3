define(
    [
        'app',
        'text!./comp_path_dialog.html',
        '../../common/services/process-data-service',
        'common/components/comp_msgbox/comp_msgbox',
        'comp_modal',
        './components/comp_path_new/comp_path_new',
		'./components/comp_path_txt/comp_path_txt',
        'css!./comp_path_dialog.css'
    ],
    function (app, template, dataService, msgBox,modal) {

        "use strict";

        app.CompPathDialogComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-path-dialog',
            dataAdaptor: null,
            messageBox: null,
            curNode: null,
            filePath: 'plugin/PSMS/img/file_explore/file.png',
            folderPath: 'plugin/PSMS/img/file_explore/folder.png',
            //目录地址
            pathValue: null,
            curTabName:undefined,
            //是否使用列表显示
            showList:false,
            //选择的目录
            selectData:undefined,
            type:undefined,
			showTxt:false,
            init: function () {
                this._super();
                this.selectData =Ember.A();
                if(this.parameters){
                    this.set('pathValue', this.parameters.path);
                    this.set('type', this.parameters.type);
                }
                this.messageBox = msgBox.create();
                this.dataAdaptor = dataService.create();
                this._initPathData(this.pathValue);
            },
            didInsertElement: function () {
                this.findNames();
            },
            willDestroyElement: function () {
                if(this.messageBox){
                    this.messageBox = null;
                }
                if(this.dataAdaptor){
                    this.dataAdaptor.destroy();
                    this.dataAdaptor= null;
                }
            },
            /**
             * 查询结果处理
             * @param result
             * @private
             */
            _handleResult: function(result){
                if(!result.length){
                    return;
                }
                var nodes = [];
                result.forEach(function(item, index){
                    nodes.push({
                        "name": item,
                        "nameStr": this.pathValue + '/' + item,
                        "parentId": this.pathValue,
                        "src": item.indexOf('.') === -1 ? this.folderPath : this.filePath
                    });
                }.bind(this));
                this.set('curNode', nodes[0]);
                this.set('dataSource', nodes);
            },

            /**
             * 服务请求目录数据
             * @param dirStr
             * @private
             */
            _initPathData: function (dirStr) {
                var param = {
                    filePath: dirStr
                };
                this.dataAdaptor.getRestfulData(param, 'fileConfigDir', function(result){
                    if(result){
                        this._handleResult(result);
                    }
                }.bind(this));
            },
			/**
			 * editTXT文件
			 */
			editTXT:function (dirStr) {
			    var param = {
			        filePath:dirStr
			    };
			    this._openWindow('编辑文件','comp-path-txt',param);
			},
            //判断文件夹还是文件
            _handleFileType: function(fileName){
                var fileType = ['.xml', '.RAW', '.raw', '.data', '.DATA', '.XML'];
                var index = fileName.lastIndexOf('.');
                if(index > -1){
                    var str = fileName.substring(index);
                    for(var i =0;i<fileType.length;i++){
                        if(fileType[i] == str){
                            return true;
                        }
                    }
                }
                return false;
            },
			//判断是一个txt文件
			_handleFileTypeIsTXT: function(fileName){
			    var fileType = ['.txt'];
			    var index = fileName.lastIndexOf('.');
			    if(index > -1){
			        var str = fileName.substring(index);
			        for(var i =0;i<fileType.length;i++){
			            if(fileType[i] == str){
			                return true;
			            }
			        }
			    }
			    return false;
			},
            _openWindow: function (title, componentName, data) {
                var _self = this;
                modal.popup({
                    targetObject: this,
                    isDefaultStyle: true,
                    sizeClass: componentName + '-size',
                    headerClass: componentName + '-header',
                    bodyClass: componentName + '-body',
                    hasHeader: true,
                    hasMax: false,
                    hasPhoto: false,
                    headerText: title,
                    contentComponentName: componentName,
                    parameters: data,
                    hasFooter: false,
                    enforceModality: true,
                    top: 100,
                    confirm: function () {
                        _self._initPathData(_self.pathValue);
                    },
					// confirm: function () {
					//     if (this.parameters) {
					//         Ember.set(_self.flowModules[_self.folderIndex].Userproperty.InputParameter.Configuration[_self.paraIndex],'value',this.parameters.data );
					//     }
					// },
                    close: function () { //获取传递参数
                    }
                });
            },
            actions: {
                /**
                 * 返回上一级目录
                 */
                backToParent: function(){
                    if(this.curNode && this.curNode.parentId && this.curNode.parentId !== '/IPS'){
                        var index = this.curNode.parentId.lastIndexOf('/');
                        this.set('pathValue', this.curNode.parentId.substring(0, index));
                        this._initPathData(this.curNode.parentId.substring(0, index));
                    }
                },
                /**
                 * 点击文件夹下钻到下一级
                 * @param data
                 */
                itemAction: function(data){
                    if(data && data.nameStr){
						//判断是否是一个txt文件
						//获取服务器数据
						//展示并且修改txt文件
						//保存txt文件将数据流返回到后台
						 if(this._handleFileTypeIsTXT(data.nameStr)){
							this.set('pathValue', data.nameStr);
							this.editTXT(data.nameStr);
						}else{
							this.set('pathValue', data.nameStr);
							this._initPathData(data.nameStr);
						} 						
                    }
					
                },
                /**
                 * 确认按钮事件
                 */
                confirmPath: function(){
                    if(this.selectData.length>1){
                        this.messageBox.showAlert('输入或输出文件夹只能是单选，请重新选择！');
                        return;
                    }
                    if(this.selectData.length<1){
                        this.messageBox.showAlert('请选择文件夹！');
                        return;
                    }
                    this.set('parameters' , {data:this.selectData[0].nameStr,type:this.type});
                    this.sendAction('sendConfirm');
                },
                /**
                 * 取消按钮事件
                 */
                cancelPath: function(){
                    this.sendAction('sendClose');
                },
                /**
                 * 切换视图模式
                 */
                changeListType:function(){
                    this.set('showList',!this.showList)
                },
                /**
                 * 选择一个文件或文件夹
                 * @param data
                 */
                selectItem:function(data){
                    if(event.target.checked){
                        this.selectData.addObject(data);
                    }else{
                        this.selectData.removeObject(data);
                    }
                },
                /**
                 * 创建新文件夹
                 */
                newFolder:function () {
                    var param = {
                        path:this.pathValue,
                        files:this.dataSource
                    };
                    this._openWindow('新建文件夹','comp-path-new',param);
                }
            }
        });
    });