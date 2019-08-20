/**
 * 项目：gvml
 * 文件：sceneTreeWidget.js
 * 作者：程敏英
 * 部门：可视化平台
 * 邮箱：chengmy@geovis.com.cn
 * 日期：2017-09-30 15:00:00.
 * 用途：类
 */
class sceneTreeWidget extends GV.Widget {

    reference() {
        this.script = "./zTree/jquery.ztree.all.js";
        this.css = "./sceneTreeWidget.css";
        this.html = "./sceneTreeWidget.html";
    }



    init() {
        this.zTreeInit();

        var that = this;

        //保存json数据
        GV.Util.$("#export").on("click", function () {
            if ($('.savestyle').length > 0) return;

            //创建保存面板并添加样式
            var exportdiv = GV.Util.$('<div></div>').addClass('savestyle')
            var close = GV.Util.$('<div></div>').addClass('close')
            var tree = GV.Util.$('#tree')
            var label = GV.Util.$("<span>请输入文件名:</span>")
            var val = GV.Util.$("<input type = 'text'/>").addClass('val')
            var savebtn = GV.Util.$("<button>保存</button>").addClass('savebtn')

            tree.append(exportdiv)
            exportdiv.append(close)
            exportdiv.append(label)
            exportdiv.append(val)
            exportdiv.append(savebtn)

            //保存按钮点击事件
            savebtn.click(function (e) {
                e.stopPropagation();
                if (val[0].value === '') {
                    alert('文件名不能为空')
                    return;
                }
                const tempScene = that.earth.scenesToJson();
                const scene_json = {};
                if (tempScene.graphicscene) scene_json.graphicscene = tempScene.graphicscene;
                if (tempScene.milscene) scene_json.milscene = tempScene.milscene;
                GV.Util.$.ajax({
                    type: "GET",
                    url: "http://127.0.0.1:3000/markFileList",
                    async: false,
                    success: function (res) {
                        var aaa = res.every(function (currentvalue) {
                            return currentvalue.name !== val[0].value + ".json";
                        })
                        if (aaa === true) {
                            GV.Util.$.ajax({
                                type: "POST",
                                url: "http://127.0.0.1:3000/save/",
                                data: { fileName: val[0].value + ".json", data: JSON.stringify(scene_json) },
                                success: function (response) {
                                    alert("保存成功");
                                    exportdiv.remove();
                                },
                                dataType: "json"
                            })
                        } else {
                            alert('文件名已存在')
                        }
                    },
                    dataType: "json"
                })
            })

            //关闭
            close.click(function () {
                exportdiv.remove();
            })

        });


        //读取json文件，使用parseScenes解析json
        GV.Util.$("#read").on("click", function () {
            if ($('.readstyle').length > 0) {
                alert('窗口已开启');
                return;
            }
            //创建读取面板并添加样式
            var tree = GV.Util.$('#tree')
            var read = GV.Util.$('<div></div>').addClass('readstyle')
            var list_div = GV.Util.$('<div></div>').addClass('list_div')
            var close = GV.Util.$('<div></div>').addClass('readclose')
            var list_ul = GV.Util.$('<ul></ul>').addClass('ulstyle')
            var list_li = GV.Util.$('<li><span>文件名</span><span>文件类型</span><span>大小</span><span>时间</span></li>').addClass('liststyle')
            var readbtn = GV.Util.$('<button>读取</button>').addClass('readbtn')

            //添加
            tree.append(read)
            read.append(close)
            read.append(list_div)
            list_div.append(list_ul)
            read.append(readbtn)
            list_ul.append(list_li)

            close.click(function () {
                read.remove();
            })

            var selctedList = null;
            GV.Util.$.ajax({
                type: "GET",
                url: "http://127.0.0.1:3000/markFileList",
                async: false,
                success: function (response) {
                    for (let i of response) {

                        let li = GV.Util.$(`<li><span>${i.name}</span><span>${i.type}</span><span>${i.size}</span><span>${i.mtime}</span></li>`)
                        list_ul.append(li)

                        li.click(function () {
                            if (selctedList) {
                                selctedList.isselected = false;
                                selctedList.removeClass('hiddenbg');
                                selctedList = null;
                            }
                            if (!li.isselected) {
                                li.isselected = true;
                                li.addClass('hiddenbg')
                                selctedList = li;
                            } else {
                                li.isselected = false;
                                li.removeClass('hiddenbg')
                                selctedList = null;
                            }
                        })
                    }
                },
                dataType: "json"
            }).then(function () {
                readbtn.click(function () {
                    if (selctedList.isselected) {
                        GV.Util.$.ajax({
                            type: "GET",
                            url: 'http://127.0.0.1:3000/save/' + selctedList[0].firstChild.innerText,
                            async: false,
                            success: function (response) {
                                that.earth.jsonToScenes(response);
                                that.updateScenesTree();
                            }
                        })

                    }
                })
            })
        });

        //新建场景
        // let that = this;
        // GV.Util.$("#createscene").click(function(){
        //     that.scene = new GV.GraphicScene();
        //     that.changeMarkScene(that.scene, that.markPluginThis);   
        //     that.autoCreateScene(that.scene,that);
        // });

    }

    //zTree 初始化
    zTreeInit() {
        let setting = {
            edit: {
                enable: true
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            view: {
                addDiyDom: addDiyDom,
                showTitle: true,

            },
            callback: {
                beforeRemove: beforeRemove,
                onRemove: onRemove,
                onClick: onClick
            }
        };
        $.fn.zTree.init($("#tree"), setting, null);
        this._ztreeobj = $.fn.zTree.getZTreeObj("tree");
        //节点隐藏
        function addDiyDom(treeId, treeNode) {
            var TNode = $("#" + treeNode.tId + "_a");
            var hidden = $(`<span class = "button eye" id = "hidden_${treeNode.tId}"></span> `);
            if (!treeNode.isparent) { //判断是否为子节点
                if (that.earth.getNodeById(treeNode.id).visible === false) { //如果当前标绘节点不可见
                    hidden.addClass("hiden");
                } else if (that.earth.getNodeById(treeNode.id).visible == undefined) { //有的标绘场景节点没有预设visible，所以值为undefined
                    that.earth.getNodeById(treeNode.id).visible = true;
                }
                if (that.earth.getNodeById(treeNode.id).visible) {
                    hidden.addClass("show");
                }
            } else {
                if (that.earth.getSceneById(treeNode.id).visible === false) { //判断场景可见性
                    hidden.addClass("hiden");
                } else {
                    hidden.addClass("show");
                }
            }
            TNode.append(hidden);
            hidden.click(function (event) {
                event.stopPropagation();
                if (!treeNode.isparent) {
                    if (that.earth.getNodeById(treeNode.id).visible) {
                        $(this).removeClass("show").addClass("hiden");
                        that.earth.getNodeById(treeNode.id).visible = false;
                    } else {
                        $(this).removeClass("hiden").addClass("show");
                        that.earth.getNodeById(treeNode.id).visible = true;
                    }
                } else {
                    if (that.earth.getSceneById(treeNode.id).visible) {
                        $(this).parent().parent().toggleClass('lahidden')
                        that.earth.getSceneById(treeNode.id).visible = false;
                    } else {
                        $(this).parent().parent().toggleClass('lahidden')
                        that.earth.getSceneById(treeNode.id).visible = true;
                    }
                }
                // var sceneId = this.earth.getSceneById($(this).attr("data-uuid")); //获取场景
                // sceneId = sceneId || this.earth.getNodeById($parentLi.attr("data-uuid"));
                // sceneId.visible = sceneId.visible?false:true;
            });
        }

        //点击事件
        let that = this;
        function onClick(event, treeId, treeNode) {
            let selectNode = that._ztreeobj.getSelectedNodes()[0];
            console.log(selectNode)
            if (selectNode.isparent) {
                //alert();
                //that.changeMarkScene(this.earth.getSceneById(selectNode.id), that.markPluginThis); 
            }
        }


        function beforeRemove(treeId, treeNode) {
            return confirm("确认删除" + treeNode.name + "节点吗？");
        }

        //删除节点
        function onRemove(event, treeId, treeNode) {
            console.log(this)
            if (treeNode.isparent == true) {
                let scene = that.earth.getSceneById(treeNode.id);
                that.earth.removeScene(scene);
            } else {
                let scene = that.earth.getSceneById(treeNode.pId);
                let node = that.earth.getNodeById(treeNode.id);
                scene.removeNode(node);
            }
        }
    }

    reFresh() {

    }

    //获取标绘场景
    updateScenesTree() {
        //var scenes = this.markP._scenes;
        var scenes = this.earth.getScenes();
        if (!scenes) return;
        GV.Util.$("#tree").empty();
        this.zTreeInit();
        for (var scene of scenes) {
            var zTreeObj = this._ztreeobj.addNodes(null, { id: scene[1].id, pId: 0, isparent: true, name: (scene[1] instanceof GV.MilScene) ? "军标场景" : "普通场景" });
            $("#" + zTreeObj[0].tId).attr("data-uuid", scene[1].id);
            this.addNode(scene[1]);
        }
    }

    //节点过滤器
    nodeFilter(Type) {
        if (Type == "uuid" || Type == "library" || Type == "optimized" || Type == "visible") {
            return true;
        } else {
            return false;
        }
    }

    //往父节点添加子节点
    addNode(scenes) {
        //获取父节点
        var parentZNode = this._ztreeobj.getNodeByParam("id", scenes.id);
        if (!scenes._nodes) return;
        scenes = scenes._nodes;
        for (let s of scenes) {
            let nodeinfo = this._ztreeobj.addNodes(parentZNode, { id: s[1].id, name: `${s[1].tag}节点` });
            $("#" + nodeinfo[0].tId).attr("data-uuid", s[1].id);
        }
    }

    //标绘面板刷新时自动创建一个场景，并生成一个场景节点
    autoCreateScene(scene, sceneTree_this) {
        var zTreeObj1 = sceneTree_this._ztreeobj.addNodes(null, { id: scene.id, pId: 0, isparent: true, name: "场景" });
        sceneTree_this.zTreeObj = zTreeObj1[0];
        $("#" + sceneTree_this.zTreeObj.tId).attr("data-uuid", scene.id);
    }

    //标绘面板点击时自动刷新出叶子节点
    autoCreateNode(scene, sceneTree_this, addNodeInfo) {
        var parentZNode = sceneTree_this._ztreeobj.getNodeByParam("id", scene._uuid);
        if (parentZNode) {
            let nodeinfo = sceneTree_this._ztreeobj.addNodes(parentZNode, { id: addNodeInfo._uuid, name: `${addNodeInfo.tag}节点` });
            $("#" + nodeinfo[0].tId).attr("data-uuid", addNodeInfo._uuid);
        }
    }

    // //获取MarkPlugin的方法
    // changeScene(callback, that){
    //     this.changeMarkScene = callback; 
    //     this.markPluginThis = that;
    // }
}
//# sourceURL=sceneTreeWidget.js
