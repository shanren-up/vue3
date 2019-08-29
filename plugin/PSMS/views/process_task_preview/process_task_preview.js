define(
    [
        'app',
        'configs',
        'text!./process_task_preview.html',
        //'tiff',
        //'lib/tiff/tiff.min.js',
        './../../components/comp_file_list/comp_file_list',
        'css!./process_task_preview.css'
    ],
    function(app,configs, template) {
        "use strict";
        app.ProcessTaskPreviewComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'process-task-preview',
            showXml:true,
			showJson: false,
            sourceTask:undefined,
            subTask:undefined,
            tiffWidth:0,
            tiffHeight:0,
            showLegend:false,
            showType:'预览模式',
            showCompare:false,
            compareImgs:undefined,
            _postionData:{},
            init: function() {
                this._super();
                this.compareImgs = [];
                if(this.sourceTask && this.subTask){
                    this.set('path',this.sourceTask.projfolder+'/'+this.subTask.subtaskid)
                }
            },
            didInsertElement: function() {
                this.findNames();
            },
            didUpdate: function() {},

            willDestroyElement: function() {
            },
            actions: {
                /**
                 * 模式切换
                 */
                toggleType:function(){
                    this.set('showCompare',!this.showCompare);
                    if(this.showType === '预览模式'){
                        this.set('showType','对比模式');
                        this.set('showCompare',true);
                    }else{
                        this.set('showType','预览模式');
                        this.set('showCompare',false);
                    }
                },
                /**
                 * 对比模式时，弹出图片组件的拖拽事件
                 * @param index
                 */
                ondragstart:function(index){
                    event.dataTransfer.setData("index", JSON.stringify(index));
                    event.dataTransfer.setData("clientX", event.clientX);
                    event.dataTransfer.setData("clientY", event.clientY);
                    console.log('old:x='+event.clientX +',y='+event.clientY)
                },
                /**
                 * 对比模式时，弹出图片组件的拖拽事件
                 * @param index
                 */
                allowDrop:function(ev){
                    ev.preventDefault();
                },
                /**
                 * 对比模式时，弹出图片组件的拖拽事件
                 * @param index
                 */
                ondrop:function(ev){
                    ev.preventDefault();
                    if (ev.dataTransfer.getData("index")) {
                        var index = parseInt(ev.dataTransfer.getData("index"));
                        console.log('x--'+ev.clientX+',y--'+ev.clientY);
                        var oldX = parseInt(ev.dataTransfer.getData("clientX"));
                        var oldY = parseInt(ev.dataTransfer.getData("clientY"));
                        Ember.set(this.compareImgs[index],'clientX',this.compareImgs[index].clientX+ev.clientX-oldX);
                        Ember.set(this.compareImgs[index],'clientY',this.compareImgs[index].clientY+ev.clientY-oldY);
                    }
                },
                closeCompareItem:function(index){
                    this.compareImgs.removeAt(index);
                },
                /**
                 * 根据文件类型进行预览
                 * tiff文件支持下载，图片和xml支持预览
                 * @param type
                 * @param url
                 */
                previewFile:function(type,url){
                    if(type === 'xml'){
					    this.set('showJson',false);
                        this.set('showXml',true);
                        this.set('showImg',false);
                        this.set('showTiff',false);
                        this.set('showType','预览模式');
                        this.set('showCompare',false);
                        $.ajax({
                            url:'http://'+configs.locators.VRSSRestful['fileHost']+url,
                            type: 'get',
                            timeout: 100000,
                            cache:false,
                            error: function(xml){
                                alert('加载XML文档出错');
                            },
                            success: function(xml){
                                $("#previewArea").empty();
                                $("#previewArea").html(xml.documentElement.outerHTML);
                            }
                        });
                    }
                    if(type === 'img'){
					    this.set('showJson',false);
                        this.set('showImg',true);
                        this.set('showXml',false);
                        this.set('showTiff',false);
                        var imgSrc = 'http://'+configs.locators.VRSSRestful['fileHost']+url;
                        if(this.showType === '预览模式'){
                            if(url.indexOf('_mask') > -1){
                                this.set('showLegend',true);
                            }else{
                                this.set('showLegend',false);
                            }
                            this.set('previewImgSrc',imgSrc);
                        }else{
                            var nameArr = url.split('/');
                            this.compareImgs.addObject({
                                name:nameArr[nameArr.length-1],
                                compareImgSrc:imgSrc,
                                clientX:200,
                                clientY:50
                            });

                        }
                    }
					if(type === 'txt'){
					    this.set('showJson',false);
					    this.set('showXml',true);
					    this.set('showImg',false);
					    this.set('showTiff',false);
					    this.set('showType','预览模式');
					    this.set('showCompare',false);
					    $.ajax({
					        url:'http://'+configs.locators.VRSSRestful['fileHost']+url,
					        type: 'get',
					        timeout: 100000,
					        cache:false,
					        error: function(xml){
					            alert('加载txt文档出错');
					        },
					        success: function(xml){
					            $("#previewArea").empty();
					            $("#previewArea").html(xml);
					        }
					    });
					}
					if(type === 'json'){
					    this.set('showJson',true);
					    this.set('showXml',false);
					    this.set('showImg',false);
					    this.set('showTiff',false);
					    this.set('showType','预览模式');
					    this.set('showCompare',false);
					    $.ajax({
					        url:'http://'+configs.locators.VRSSRestful['fileHost']+url,
					        type: 'get',
					        timeout: 100000,
					        cache:false,
					        error: function(json){
					            alert('加载json文档出错');
					        },
					        success: function(json){
								/* var obj  = JSON.parse(json);
								str = JSON.stringify(obj , null, 4); */
					            $("#previewPre").empty();
					            $("#previewPre").html(JSON.stringify(json,null, 4));
					        }
					    });
					}
                    if(type === 'tif'){
					    this.set('showJson',false);
                        this.set('showTiff',true);
                        this.set('showImg',false);
                        this.set('showXml',false);
                        window.open('http://'+configs.locators.VRSSRestful['fileHost']+url,'_self')
                        // //jqueryAjax没有arrayBuffer类型，使用原生请求
                        // var xhr = new XMLHttpRequest();
                        // xhr.responseType = 'arraybuffer';
                        // xhr.onreadystatechange  = function (e) {
                        //     if (xhr.readyState == 4 && xhr.status == 200) {
                        //         $("#previewTiff").empty();
                        //         var buffer = xhr.response;
                        //         //Tiff.initialize({ TOTAL_MEMORY: 1677721600 });
                        //         var tiff = new Tiff({buffer: buffer});
                        //         var canvas = tiff.toCanvas();
                        //         // var width = tiff.width();
                        //         // var height = tiff.height();
                        //         this.set('tiffWidth',tiff.width());
                        //         this.set('tiffHeight',tiff.height());
                        //         $("#previewTiff").append(canvas);
                        //     }
                        // }.bind(this);
                        // xhr.open('GET', 'http://'+configs.locators.VRSSRestful['fileHost']+url);
                        // xhr.send(null);
                    }
                }
            }
        });
    });