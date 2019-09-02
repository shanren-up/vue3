define(
    [
        'app',
        'text!./jsplumb_figure.html',
        'common/components/comp_msgbox/comp_msgbox',
        'json!./data.json',
        'json!./../../config/properties.json',
        'css!./jsplumb_figure.css',
        'lib/jsplumb/jsplumb.js'
    ],
    function (app, template, msgBox, testData, proConfig) {

        "use strict";

        app.JsplumbFigureComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'jsplumb-figure',
            //外部数据源
            dataSource: undefined,
            messageBox: undefined,
            //显示数据
            blocks: undefined,
            lines: undefined,
            //模块Id
            idName: '',
            //所有连线
            allConnections: [],
            //当前实例
            instance: undefined,
            chartHeight: 600,
            chartInit: false,
            chartId: 'flowUI',
            //新建module
            moduleNormalName: 'decide',
            baseNormalName: 'base',
            moduleNum: 0,
            baseToolNum: 0,
            //是否显示模块状态
            showStatus: false,
            //是否可拖动
            draggable: false,
            //showIo: false,
            //是否开放删除功能
            showDel: false,
            //是否在模板显示回滚
            showStart: false,
            //是否显示模块进度
            showProcess:false,
            //是否开放鼠标框选功能
            showSelect: false,
            //默认鼠标框选不显示
            showSelectDiv: 'none',
            //鼠标框选过程对象
            selectObj: {},
            //框选的modules
            selectModules: undefined,
            init: function () {
                this._super();
                this.messageBox = msgBox.create();
                //模块id生成
                this.set('idName', Ember.ExtendHelper.makeCRC32(new Date().Format("yyyy-MM-dd hh:mm:ss")));
                // this.blocks = testData.blocks;
                // this.lines = testData.lines;
                this.blocks = [];
                this.lines = [];
                if (this.dataSource) {
                    this.blocks = this.dataSource.blocks;
                    if (this.blocks) {
                        this.blocks.forEach(function (item) {
                            //记录当前模块序列，用于新加模块时生成id
                            if (item.indexOf(this.moduleNormalName) > -1) {
                                this.moduleNum++;
                            }
                            if (item.indexOf(this.baseNormalName) > -1) {
                                this.moduleNum++;
                            }
                        }.bind(this));
                    }
                    this.lines = this.dataSource.lines;
                }
            },
            didInsertElement: function () {
                this.findNames();
                this.initChart();
            },
            willDestroyElement: function () {
                if (this.messageBox) {
                    this.messageBox = undefined;
                }
            },
            /**
             * jsplumb插件必须在界面已显示的情况才能渲染成功，这里做
             * 前置判断，直到界面已显示出来，才初始化组件
             */
            initChart: function () {
                if (!this.chartInit) {
                    var height = $("#" + this.chartId).height();
                    var width = $("#" + this.chartId).width();
                    if (height && width) {
                        this.chartInit = true;
                        this.createChart();
                    } else {
                        Ember.run.later(this, this.initChart, 100);
                    }
                }
            },
            /**
             * 外部数据源变化时重新初始化
             */
            dataSourceChange: Ember.observer('dataSource', function () {
                this.instance.reset();
                this.set('blocks', this.dataSource.blocks);
                this.set('lines', this.dataSource.lines);
                this.blocks.forEach(function (item) {
                    if (item.blockId.indexOf(this.moduleNormalName) > -1) {
                        this.moduleNum++;
                    }
                    if (item.blockId.indexOf(this.baseNormalName) > -1) {
                        this.moduleNum++;
                    }
                }.bind(this));
                Ember.run.later(this, this.createChart, 300);
            }),
            /**
             * 初始化界面
             */
            createChart: function () {
                var self = this;
                //创建jsplumb实例
                this.set('instance', jsPlumb.getInstance({
                    ConnectionOverlays: [
                        ["Arrow", {
                            location: 1,
                            visible: true,
                            width: 11,
                            length: 11,
                            id: "ARROW",
                        }],
                    ],
                    Container: this.idName + ''
                }));
                //连线添加双击事件
                this.instance.bind("dblclick", function (conn, originalEvent) {
                    console.log(conn);
                    console.log(originalEvent);
                    var param = {
                        conn: conn,
                        blocks: self.blocks
                    };
                    if (conn.targetId === 'state_end') {
                        return;
                    }
                    self.sendAction('dbClickLine', param);
                });
                //连线拖拽结束事件，拖拽结束后，要重新计算界面存在连线，lines对象再次初始化
                this.instance.bind("connectionDragStop", function (connection) {
                    this.lines = [];
                    var conns = this.instance.getAllConnections();
                    conns.forEach(function (connection) {
                        var newLine = {
                            "connectionId": connection.id,
                            "pageSourceId": connection.sourceId,
                            "pageTargetId": connection.targetId,
                            "sourceAnchor": connection.endpoints[0].anchor.type,
                            "targetAnchor": connection.endpoints[1].anchor.type,
                            "sourceText": "",
                            "targetText": ""
                        };
                        this.lines.push(newLine);
                        console.log('当前连线数量：' + this.lines.length);
                    }.bind(this));
                }.bind(this));
                if (this.blocks && this.blocks.length) {
                    this.instance.batch(function () {
                        //所有module添加Endpoint
                        this.blocks.forEach(function (item) {
                            this._addItemEndpoints(item);
                        }.bind(this));
                        //添加连线
                        this.lines.forEach(function (line) {
                            var newLine = this.instance.connect({
                                uuids: [line.pageSourceId + line.sourceAnchor, line.pageTargetId + line.targetAnchor],
                                editable: false
                            })
                            this.allConnections.push(newLine.id);
                            line.connectionId = newLine.id;
                        }.bind(this));
                    }.bind(this));
                }
            },
            /**
             * uuid算法
             * @returns {string}
             * @private
             */
            _uuid: function () {
                var s = [];
                var hexDigits = "0123456789abcdef";
                for (var i = 0; i < 36; i++) {
                    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                }
                s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
                s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
                s[8] = s[13] = s[18] = s[23] = "-";
                var uuid = s.join("");
                return uuid;
            },
            /**
             * module添加Endpoint
             * @param item
             * @private
             */
            _addItemEndpoints: function (item) {
                if (item.sourceAnchor) {
                    this._addEndpoints(this.instance, item.blockId, [item.sourceAnchor], []);
                }
                if (item.targetAnchor) {
                    this._addEndpoints(this.instance, item.blockId, [item.targetAnchor], []);
                }
            },
            /**
             * 设置锚点（可连接点）
             * @param instance
             * @param toId  module对象id
             * @param sourceAnchors 添加位置
             * @private
             */
            _addEndpoints: function (instance, toId, sourceAnchors) {
                //设置连线等样式
                var connectorPaintStyle = {
                        strokeWidth: 3,
                        stroke: "#61B7CF",
                        joinstyle: "round",
                        outlineStroke: "white",
                        outlineWidth: 3
                    },
                    connectorHoverStyle = {
                        strokeWidth: 4,
                        stroke: "#216477",
                        outlineWidth: 5,
                        outlineStroke: "white"
                    },
                    endpointHoverStyle = {
                        fill: "transparent",
                        //点颜色
                        stroke: "#009999"
                    };
                var sourceEndpoint = {
                    endpoint: "Dot",
                    enabled: true,
                    paintStyle: {
                        stroke: "#009999",
                        fill: "transparent",
                        radius: 3,
                        strokeWidth: 2
                    },
                    maxConnections: -1,
                    isSource: true,
                    isTarget: true,
                    connector: ["Flowchart", {stub: [5, 5], gap: 10, cornerRadius: 5, alwaysRespectStubs: true}],
                    connectorStyle: connectorPaintStyle,
                    hoverPaintStyle: endpointHoverStyle,
                    connectorHoverStyle: connectorHoverStyle,
                    dragOptions: {},
                    deleteEndPointsOnDetach: true,
                    overlays: [
                        ["Label", {
                            location: [0.5, 1.5],
                            label: "Drag",
                            cssClass: "endpointSourceLabel",
                            visible: false
                        }]
                    ]
                };
                for (var i = 0; i < sourceAnchors.length; i++) {
                    var sourceUUID = toId + sourceAnchors[i];
                    instance.addEndpoint(toId, sourceEndpoint, {
                        anchor: sourceAnchors[i], uuid: sourceUUID
                    });
                    if (this.draggable) {
                        instance.draggable(toId);
                    }
                }
            },
            /**
             * 增加一个module（界面工具栏拖拽进来添加）
             * @param ev
             * @param module
             * @private
             */
            _addModule: function (ev, module) {
                var newBlockArr = [];
                var newBlock = {};
                newBlock.blockX = ev.offsetX;
                newBlock.blockY = ev.offsetY;
                newBlock.imgSrc = module.imgSrc;
                newBlock.sourceAnchor = 'RightMiddle';
                newBlock.targetAnchor = 'LeftMiddle';
                if (module && module.type === 'base') {
                    //单例工具，只允许创建一个
                    if (module.singleton) {
                        if (this.blocks.findBy('blockId', module.blockId)) {
                            this.messageBox.showAlert('当前工具只能选择一个!');
                            return;
                        } else {
                            newBlock.blockId = module.blockId;
                            if (module.blockId === 'state_start' || module.blockId === 'state_end') {
                                var startBlock = {};
                                var start = proConfig.baseTools.findBy('blockId', 'state_start');
                                startBlock.blockId = start.blockId;
                                startBlock.isStatus = false;
                                startBlock.process = false;
                                startBlock.imgSrc = start.imgSrc;
                                startBlock.blockLabel = start.blockLabel;
                                startBlock.blockX = newBlock.blockX;
                                startBlock.blockY = ev.offsetY;
                                startBlock.sourceAnchor = start.sourceAnchor;
                                startBlock.flowId = start.flowId;
                                newBlockArr.push(startBlock);

                                var endBlock = {};
                                var end = proConfig.baseTools.findBy('blockId', 'state_end');
                                endBlock.blockId = end.blockId;
                                endBlock.isStatus = false;
                                endBlock.process = false;
                                endBlock.imgSrc = end.imgSrc;
                                endBlock.blockLabel = end.blockLabel;
                                endBlock.blockX = newBlock.blockX + 200;
                                endBlock.blockY = ev.offsetY;
                                endBlock.targetAnchor = end.targetAnchor;
                                endBlock.flowId = end.flowId;
                                newBlockArr.push(endBlock);
                            } else {
                                newBlock.blockId = module.blockId;
                                newBlock.isStatus = false;
                                newBlock.process = false;
                                newBlock.blockLabel = module.blockLabel;
                                newBlock.flowId = '';
                                newBlockArr.push(newBlock);
                            }
                        }
                    } else {
                        newBlock.isStatus = false;
                        newBlock.process = false;
                        newBlock.blockLabel = module.blockLabel;
                        this.baseToolNum++;
                        newBlock.blockId = module.blockId + this.baseNormalName + (this.baseToolNum + '');
                        newBlockArr.push(newBlock);
                    }
                } else {
                    this.moduleNum++;
                    newBlock.blockId = this.moduleNormalName + (this.moduleNum + '');
                    newBlock.blockLabel = module.modulename;
                    newBlock.isStatus = false;
                    newBlock.process = false;
                    newBlock.key = module.id;
                    newBlock.startBlock = true;
                    newBlock.sourceAnchor = 'RightMiddle';
                    newBlock.targetAnchor = 'LeftMiddle';
                    newBlock.content = module.content;
                    newBlock.flowId = module.id.split('-')[0] + this._uuid();
                    newBlockArr.push(newBlock);
                }
                newBlockArr.forEach(function (item) {
                    this.blocks.pushObject(item);
                    Ember.run.later(this, function () {
                        this._addItemEndpoints(item);
                    }, 100);
                }.bind(this));
                return newBlock;
            },
            /**
             * 获取组件blocks和lines，包含block的坐标
             * @returns {{blocks: *, lines: *}}
             */
            getData: function () {
                this.blocks.forEach(function (item, index) {
                    Ember.set(item, 'blockX', parseInt($('#' + item.blockId).css('left')));
                    Ember.set(item, 'blockY', parseInt($('#' + item.blockId).css('top')));
                });
                return {blocks: this.blocks, lines: this.lines};
            },
            /**
             * 删除一个module
             * @param item
             * @private
             */
            _deleteBlock: function (item) {
                this.messageBox.showConfirm('确认删除？', function (result) {
                    if (result) {
                        this.blocks.removeObject(item);
                        this.instance.removeAllEndpoints(item.blockId);
                        var line1 = this.lines.findBy('pageSourceId', item.blockId);
                        if (line1) {
                            this.lines.removeObject(line1);
                        }
                        var line2 = this.lines.findBy('pageTargetId', item.blockId);
                        if (line2) {
                            this.lines.removeObject(line2);
                        }
                        this.sendAction('deleteBlock', item);
                    }
                }.bind(this));
            },
            /**
             * 鼠标框选，获取选中的modules
             * @private
             */
            _getSelectModules: function () {
                this.selectModules = [];
                this.blocks.forEach(function (item) {
                    if (item.blockX > this.selectObj.retcLeft && item.blockX < this.selectObj.retcLeft + this.selectObj.retcWidth && item.blockY > this.selectObj.retcTop && item.blockY < this.selectObj.retcTop + this.selectObj.retcHeight) {
                        this.selectModules.push(item);
                    }
                }.bind(this));
            },
            /**
             * 垂直居中选中的modules
             */
            alignSelectModules: function () {
                if (this.selectModules && this.selectModules.length > 0) {
                    var top;
                    this.selectModules.forEach(function (item) {
                        if (!top) {
                            top = this.$('#'+item.blockId).css('top').replace('px','');
                            top = parseInt(top);
                        }
                        var left = this.$('#'+item.blockId).css('left').replace('px','');
                        Ember.set(item, 'blockX', left);
                        Ember.set(item, 'blockY', top + 1);
                        Ember.run.later(function () {
                            Ember.set(item, 'blockY', top);
                        }.bind(this), 10);

                    }.bind(this));
                    Ember.set(this, 'blocks', this.blocks);
                    Ember.run.later(function () {
                        this.instance.repaintEverything();
                        this.set('showSelectDiv', 'none');
                        this.selectObj = {};
                    }.bind(this), 100);
                }
            },
            actions: {
                /**
                 * h5拖拽事件实现，使用默认设置
                 * @param ev
                 */
                allowDrop: function (ev) {
                    ev.preventDefault();
                },
                /**
                 * h5拖拽事件实现，用于增加一个module
                 * @param ev
                 */
                ondrop: function (ev) {
                    ev.preventDefault();
                    //module是工具栏拖拽时传递的参数
                    if (ev.dataTransfer.getData("module")) {
                        var moudleObj = JSON.parse(ev.dataTransfer.getData("module"));
                        var newBlock = this._addModule(ev, moudleObj);
                        if (moudleObj.type !== 'base') {
                            var module = JSON.parse(moudleObj.content);
                            module.flow_id = newBlock.flowId;
                            this.sendAction('setParam', module);
                        }
                    }

                },
                deleteBlock: function (item) {
                    console.log('delete');
                    this._deleteBlock(item);
                },
                /**
                 * 回滚当前模块，用于任务界面失败模块修改参数后重新启动
                 * @param item
                 */
                startModuleAction: function (item) {
                    this.sendAction('startModuleAction', item);
                },
                /**
                 * module双击事件，用于任务界面修改参数
                 * @param item
                 */
                dbClickAction: function (item) {
                    this.sendAction('dbClickAction', item);
                },
                /**
                 * 鼠标框选功能，鼠标点下（未放开）时触发
                 * @param evt
                 */
                selectDown: function (evt) {
                    if (this.showSelect) {
                        var clickX = evt.clientX - evt.currentTarget.offsetLeft;
                        var clickY = evt.clientY - 75 - evt.currentTarget.offsetTop;
                        //如果点击时，this.selectObj对象已经存在，说明已存在选择框，如果点击坐标在框内，不做处理，否则取消选择框
                        if (clickX > this.selectObj.retcLeft && clickX < this.selectObj.retcLeft + this.selectObj.retcWidth && clickY > this.selectObj.retcTop && clickY < this.selectObj.retcTop + this.selectObj.retcHeight) {
                            return;
                        }
                        this.set('selectDown', true);
                        this.set('showSelectDiv', 'none');
                        this.selectObj = {};
                        this.$('#selectDiv').css('width', '0px');
                        this.$('#selectDiv').css('height', '0px');
                        this.selectObj.startX = evt.clientX - evt.currentTarget.offsetLeft;
                        this.selectObj.startY = evt.clientY - 75 - evt.currentTarget.offsetTop;
                        this.$('#selectDiv').css('left', this.selectObj.startX + 'px');
                        this.$('#selectDiv').css('top', this.selectObj.startY + 'px');
                    }
                },
                /**
                 * 鼠标框选功能，鼠标点击放开时触发
                 * @param evt
                 */
                selectUp: function (evt) {
                    if (this.showSelect) {
                        this.set('selectDown', false);
                        this._getSelectModules();
                        console.log('已选择module个数：' + this.selectModules.length);
                        //如果框选的module是0，当前选择框直接关闭
                        if (this.selectModules && this.selectModules.length > 0) {
                        } else {
                            Ember.run.later(function () {
                                this.set('showSelectDiv', 'none');
                            }.bind(this), 10);
                        }
                    }
                },
                /**
                 * 鼠标框选功能，鼠标点击后（未放开），拖动鼠标时触发，用于实时变更选择框大小
                 * @param evt
                 */
                selectMove: function (evt) {
                    if (this.showSelect && this.selectDown) {
                        var curtX = evt.clientX - evt.currentTarget.offsetLeft;
                        var curtY = evt.clientY - 75 - evt.currentTarget.offsetTop;
                        this.selectObj.retcLeft = (this.selectObj.startX - curtX > 0 ? curtX : this.selectObj.startX);
                        this.selectObj.retcTop = (this.selectObj.startY - curtY > 0 ? curtY : this.selectObj.startY);
                        this.selectObj.retcHeight = Math.abs(this.selectObj.startY - curtY);
                        this.selectObj.retcWidth = Math.abs(this.selectObj.startX - curtX);
                        this.$('#selectDiv').css('left', this.selectObj.retcLeft + "px");
                        this.$('#selectDiv').css('top', this.selectObj.retcTop + "px");
                        this.$('#selectDiv').css('width', this.selectObj.retcWidth + "px");
                        this.$('#selectDiv').css('height', this.selectObj.retcHeight + "px");
                        Ember.run.later(function () {
                            this.set('showSelectDiv', 'block');
                        }.bind(this), 10);
                    }
                },
                /**
                 * 鼠标框选功能，关闭选择框
                 */
                closeSelectDiv: function () {
                    this.set('showSelectDiv', 'none');
                },
                /**
                 * 鼠标框选功能，选择框中module垂直对齐
                 */
                alignSelectDiv: function () {
                    this.alignSelectModules();
                }
            }
        });
    });