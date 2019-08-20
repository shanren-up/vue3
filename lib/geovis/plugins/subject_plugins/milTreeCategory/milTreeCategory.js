/**
 * 项目：gvml
 * 文件：milTreeCategory.js
 * 作者：程敏英
 * 部门：可视化平台
 * 邮箱：chengmy@geovis.com.cn
 * 日期：2017-09-30 15:00:00.
 * 用途：类
 */
class milTreeCategory extends GV.Widget {
    reference() {
        this.css = './milTreeCategory.css';
        this.html = './milTreeCategory.html';
    }
    init() {
        this.returnId = '';
        this.milScene = new GV.MilScene();
        this.earth.addScene(this.milScene);
        this.milScene.getMilTree((tree) => {
            this.data = tree;
            this.initZTree();
        });
        this.getClickImage();
    }
    initZTree() {
        var setting = {
            edit: {
                enable: true
            },
            view: {
                addDiyDom: null,
                showLine: true,
                showIcon: true
            },
            data: {
                simpleData: {
                    enable: true,
                    idKey: 'ID',
                    pIdKey: 'PARENTID',
                    rootPId: 0
                },
                key: {
                    name: 'VALUE'
                }
            },
            callback: {
                onClick: onClick
            }
        }
        let that = this;
        function onClick(event, treeId, treeNode) {
            if (!that.zTreeObj.getSelectedNodes()[0].isParent) {
                that.returnId = that.zTreeObj.getSelectedNodes()[0].ID;
                that.milScene.getMilCategory(that.returnId, (imgs) => {
                    that.imgdata = imgs;
				    that.getSelectNode(that.imgdata)
                });
            }
        }
        $.fn.zTree.init($("#tree"),setting,this.data.TREE.__array__);
        this.zTreeObj = $.fn.zTree.getZTreeObj("tree");
    }

    getSelectNode(array){
        if($("#plot").children().length !== 0){
            $("#plot").empty();
        }
        if($("#plot").children().length === 0){
            for(let i of array.Category.__array__){
                    let plot_li = $(`<li id = "${i.id}"><span style="width:40px;height:40px;"></span></li>`);
                    plot_li.children()[0].style.backgroundImage = "url("+ i.img +")";
                    $("#plot").append(plot_li);
            }
        }

    }
    getClickImage(){
        var jbImage = document.getElementById("plot");
		let that = this;
        jbImage.onclick = function(event) {
            let imginfo = document.elementFromPoint(event.clientX,event.clientY);
			imginfo.style.bgColor = 'blue';
            if(that._mark) that._mark(imginfo.parentNode.id.slice(2));
        }
    }

    listenJbMark(callback) {
        this._mark = callback;
    }
}
//# sourceURL=milTreeCategory.js
