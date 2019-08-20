define(
    [
        'app',
        './comp_ztree'
    ],
    function(app) {

        'use strict';

        app.CompZtreeDemoComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx('{{input value=this.searchKey }}{{input type="number" value=this.dataNumber }} {{comp-ztree name="ztree" config=config dataSource=dataSource onClick="onClick"}}'),
            templateName: 'comp-ztree-demo',
            searchKey: '',
            dataNumber: 15,
            config: null,
            dataSource: null,
            init: function() {
                this._super();
                // tree 配置
                this.config = {
                    // 组件默认编辑功能 不要和自定义的hover菜单一起用
                    edit: {
                        enable: false,
                    },
                    view: {
                        addHoverDom: this.handleHoverTreeNode.bind(this),
                        removeHoverDom: this.handleLeaveTreeNode.bind(this),
                        fontCss: this.getFontCss.bind(this),
                    }
                };
                this.dataSource = testData;
                // 添加几个数据 测试滚动效果
                this._addData(7, 15);
            },
            didInsertElement: function() {
                this.findNames();
            },
            wilDestroyElement: function() {},
            _addData: function(i, j) {
                for (var index = i; index < j; index++) {
                    this.dataSource.pushObject({
                        "name": "父节点 " + index,
                        "open": true,
                        "children": [{
                            "name": "叶子节点 " + index + "-1",
                        }, {
                            "name": "叶子节点 " + index + "-2",
                        }, {
                            "name": "叶子节点 " + index + "-3",
                        }],
                    });

                }
            },
            _changeDataSource: Ember.observer('dataNumber', function() {
                var number = +this.dataNumber;
                if (number > this.dataSource.length) {
                    this._addData(this.dataSource.length, number);
                } else if (number < this.dataSource.length) {
                    for (var i = 0; i < this.dataSource.length - number; i++) {
                        this.dataSource.popObject();
                    }
                }
            }),
            // 搜索高亮
            _handleSearchKeyChange: Ember.observer('searchKey', function() {
                this._clearHightlight();
                if (!this.searchKey.trim()) {
                    return;
                }
                var result = this.childs.ztree.getNodesByParamFuzzy('name', this.searchKey);
                if (!result.length) {
                    return;
                }
                this._makeNodesVislble(result[0]);
                result.forEach(function(treeNode) {
                    treeNode.highlight = true;
                    this.childs.ztree.updateNode(treeNode);
                    // if (treeNode.getParentNode()) {
                    //     this.childs.ztree.expandNode(treeNode.getParentNode(),true,false,true);
                    // }
                }, this);
            }),
            // 取消高亮
            _clearHightlight: function() {
                var nodes = this.childs.ztree.transformToArray(this.childs.ztree.getNodes());
                nodes.filterBy('highlight', true).forEach(function(node) {
                    node.highlight = false;
                    this.childs.ztree.updateNode(node);
                }, this);
            },
            // 滚动到指定节点
            _makeNodesVislble: function(node) {
                var $element = this.$("#" + node.tId),
                    $ztree = this.$('.z-tree-container'),
                    offsetTop,
                    height = $ztree.height(),
                    treeOffsetTop = $ztree.offset().top;
                if ($element.length) {
                    offsetTop = $element.offset().top;
                }
                if (offsetTop - treeOffsetTop < 0 || offsetTop - treeOffsetTop > height) {
                    $ztree.scrollTop(offsetTop - treeOffsetTop);
                }

            },
            // 获取字体样式函数
            getFontCss: function(treeId, treeNode) {
                return (!!treeNode.highlight) ? {
                    color: "#A60000",
                    "font-weight": "bold"
                } : {
                    color: "#333",
                    "font-weight": "normal"
                };
            },
            // 自定义hover菜单函数
            handleHoverTreeNode: function(treeId, treeNode) {
                var aObj = this.$("#" + treeNode.tId + "_a");
                // 默认自定义菜单 选中节点也会显示 如果需要显示注释这段
                if (this.childs.ztree.isSelectedNode(treeNode)) {
                    return;
                }
                if (this.$("#diyBtn_" + treeNode.tId).length > 0) {
                    return;
                }
                var editStr = "<span id='diyBtn_space_" + treeNode.tId + "' ></span>" +
                    "<button type='button' class='btn btn-default diyBtn1' id='diyBtn_" + treeNode.tId +
                    "' title='" + treeNode.name + "' onfocus='this.blur();'>alert</button>" +
                    "<img class='diyBtn1 alarm_" + treeNode.tId + "' height=15 src='img/alarm.png' ' title='" + treeNode.name + "' ' onfocus='this.blur();'/>";
                aObj.append(editStr);
                var btn = this.$("#diyBtn_" + treeNode.tId),
                    icon = this.$('.comp-ztree .alarm_' + treeNode.tId);
                if (btn) {
                    btn.on("click", function() {
                        alert("diy Button for " + treeNode.name);
                        this.childs.ztree.cancelSelectedNode(treeNode);
                        this.handleLeaveTreeNode(treeId, treeNode);
                    }.bind(this));
                }
                if (icon) {
                    icon.on('click', function() {
                        console.log('alarm click');
                        this.childs.ztree.cancelSelectedNode(treeNode);
                        this.handleLeaveTreeNode(treeId, treeNode);
                    }.bind(this));
                }
            },
            // 清除自定义菜单
            handleLeaveTreeNode: function(treeId, treeNode) {
                this.$("#diyBtn_" + treeNode.tId).off().remove();
                this.$("#diyBtn_space_" + treeNode.tId).off().remove();
                this.$('.comp-ztree .alarm_' + treeNode.tId).off().remove();
            },
            actions: {
                onClick: function(event, treeId, treeNode, clickFlag) {
                    // 默认自定义菜单选中节点也会显示 如果需要显示注释这段
                    Ember.run.later(this, function() {
                        this.handleLeaveTreeNode(treeId, treeNode);
                    });
                }
            }
        });
        // 前三个数据为导出数据
        var testData = [{
            "id": 1,
            "pId": null,
            "name": "父节点 1",
            "open": true,
            "children": [{
                "id": 11,
                "pId": 1,
                "name": "叶子节点 1-1",
                "level": 1,
                "tId": "treeDemo_2",
                "parentTId": "treeDemo_1",
                "open": false,
                "isParent": false,
                "zAsync": true,
                "isFirstNode": true,
                "isLastNode": false,
                "isAjaxing": false,
                "checked": false,
                "checkedOld": false,
                "nocheck": false,
                "chkDisabled": false,
                "halfCheck": false,
                "check_Child_State": -1,
                "check_Focus": false,
                "isHover": false,
                "editNameFlag": false
            }, {
                "id": 12,
                "pId": 1,
                "name": "叶子节点 1-2",
                "level": 1,
                "tId": "treeDemo_3",
                "parentTId": "treeDemo_1",
                "open": false,
                "isParent": false,
                "zAsync": true,
                "isFirstNode": false,
                "isLastNode": false,
                "isAjaxing": false,
                "checked": false,
                "checkedOld": false,
                "nocheck": false,
                "chkDisabled": false,
                "halfCheck": false,
                "check_Child_State": -1,
                "check_Focus": false,
                "isHover": false,
                "editNameFlag": false
            }, {
                "id": 13,
                "pId": 1,
                "name": "叶子节点 1-3",
                "level": 1,
                "tId": "treeDemo_4",
                "parentTId": "treeDemo_1",
                "open": false,
                "isParent": false,
                "zAsync": true,
                "isFirstNode": false,
                "isLastNode": true,
                "isAjaxing": false,
                "checked": false,
                "checkedOld": false,
                "nocheck": false,
                "chkDisabled": false,
                "halfCheck": false,
                "check_Child_State": -1,
                "check_Focus": false,
                "isHover": false,
                "editNameFlag": false
            }],
            "level": 0,
            "tId": "treeDemo_1",
            "parentTId": null,
            "isParent": true,
            "zAsync": true,
            "isFirstNode": true,
            "isLastNode": false,
            "isAjaxing": false,
            "checked": false,
            "checkedOld": false,
            "nocheck": false,
            "chkDisabled": false,
            "halfCheck": false,
            "check_Child_State": 0,
            "check_Focus": false,
            "isHover": false,
            "editNameFlag": false
        }, {
            "id": 2,
            "pId": null,
            "name": "父节点 2",
            "open": true,
            "children": [{
                "id": 21,
                "pId": 2,
                "name": "叶子节点 2-1",
                "level": 1,
                "tId": "treeDemo_6",
                "parentTId": "treeDemo_5",
                "open": false,
                "isParent": false,
                "zAsync": true,
                "isFirstNode": true,
                "isLastNode": false,
                "isAjaxing": false,
                "checked": false,
                "checkedOld": false,
                "nocheck": false,
                "chkDisabled": false,
                "halfCheck": false,
                "check_Child_State": -1,
                "check_Focus": false,
                "isHover": true,
                "editNameFlag": false
            }, {
                "id": 22,
                "pId": 2,
                "name": "叶子节点 2-2",
                "level": 1,
                "tId": "treeDemo_7",
                "parentTId": "treeDemo_5",
                "open": false,
                "isParent": false,
                "zAsync": true,
                "isFirstNode": false,
                "isLastNode": false,
                "isAjaxing": false,
                "checked": false,
                "checkedOld": false,
                "nocheck": false,
                "chkDisabled": false,
                "halfCheck": false,
                "check_Child_State": -1,
                "check_Focus": false,
                "isHover": false,
                "editNameFlag": false
            }, {
                "id": 23,
                "pId": 2,
                "name": "叶子节点 2-3",
                "level": 1,
                "tId": "treeDemo_8",
                "parentTId": "treeDemo_5",
                "open": false,
                "isParent": false,
                "zAsync": true,
                "isFirstNode": false,
                "isLastNode": true,
                "isAjaxing": false,
                "checked": false,
                "checkedOld": false,
                "nocheck": false,
                "chkDisabled": false,
                "halfCheck": false,
                "check_Child_State": -1,
                "check_Focus": false,
                "isHover": false,
                "editNameFlag": false
            }],
            "level": 0,
            "tId": "treeDemo_5",
            "parentTId": null,
            "isParent": true,
            "zAsync": true,
            "isFirstNode": false,
            "isLastNode": false,
            "isAjaxing": false,
            "checked": false,
            "checkedOld": false,
            "nocheck": false,
            "chkDisabled": false,
            "halfCheck": false,
            "check_Child_State": 0,
            "check_Focus": false,
            "isHover": false,
            "editNameFlag": false
        }, {
            "id": 3,
            "pId": null,
            "name": "父节点 3",
            "open": true,
            "children": [{
                "id": 31,
                "pId": 3,
                "name": "叶子节点 3-1",
                "level": 1,
                "tId": "treeDemo_10",
                "parentTId": "treeDemo_9",
                "open": false,
                "isParent": false,
                "zAsync": true,
                "isFirstNode": true,
                "isLastNode": false,
                "isAjaxing": false,
                "checked": false,
                "checkedOld": false,
                "nocheck": false,
                "chkDisabled": false,
                "halfCheck": false,
                "check_Child_State": -1,
                "check_Focus": false,
                "isHover": false,
                "editNameFlag": false
            }, {
                "id": 32,
                "pId": 3,
                "name": "叶子节点 3-2",
                "level": 1,
                "tId": "treeDemo_11",
                "parentTId": "treeDemo_9",
                "open": false,
                "isParent": false,
                "zAsync": true,
                "isFirstNode": false,
                "isLastNode": false,
                "isAjaxing": false,
                "checked": false,
                "checkedOld": false,
                "nocheck": false,
                "chkDisabled": false,
                "halfCheck": false,
                "check_Child_State": -1,
                "check_Focus": false,
                "isHover": false,
                "editNameFlag": false
            }, {
                "id": 33,
                "pId": 3,
                "name": "叶子节点 3-3",
                "level": 1,
                "tId": "treeDemo_12",
                "parentTId": "treeDemo_9",
                "open": false,
                "isParent": false,
                "zAsync": true,
                "isFirstNode": false,
                "isLastNode": true,
                "isAjaxing": false,
                "checked": false,
                "checkedOld": false,
                "nocheck": false,
                "chkDisabled": false,
                "halfCheck": false,
                "check_Child_State": -1,
                "check_Focus": false,
                "isHover": false,
                "editNameFlag": false
            }],
            "level": 0,
            "tId": "treeDemo_9",
            "parentTId": null,
            "isParent": true,
            "zAsync": true,
            "isFirstNode": false,
            "isLastNode": true,
            "isAjaxing": false,
            "checked": false,
            "checkedOld": false,
            "nocheck": false,
            "chkDisabled": false,
            "halfCheck": false,
            "check_Child_State": 0,
            "check_Focus": false,
            "isHover": false,
            "editNameFlag": false
        }, {
            "name": "父节点 4",
            "open": true,
            "children": [{
                "name": "叶子节点 4-1",
            }, {
                "name": "叶子节点 4-2",
            }, {
                "name": "叶子节点 4-3",
            }],
        }, {
            "name": "父节点 5",
            "open": false,
            "children": [{
                "name": "叶子节点 5-1",
            }, {
                "name": "叶子节点 5-2",
            }, {
                "name": "叶子节点 5-3",
            }],
        }, {
            "name": "父节点 6",
            "open": false,
            "children": [{
                "name": "叶子节点 6-1",
            }, {
                "name": "叶子节点 6-2",
            }, {
                "name": "叶子节点 6-3",
            }],
        }, ];
    }
);