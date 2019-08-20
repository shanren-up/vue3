/**
 * 基于zTree封装 默认已添加excheck和exedit扩展
 * 官方文档参考http://www.treejs.cn/v3/main.php#_zTreeInfo
 * 每个节点可设置参数较多参考官方api treeNode部分 http://www.treejs.cn/v3/api.php
 * 2017年9月15日
 */
define(
    [
        'app',
        'json!./cultureInfo.json',
        'css!./comp_ztree.css',
        'ztree',
    ],
    function(app, cultureInfo) {

        'use strict';
        Ember.addJsonCultureInfo(cultureInfo);

        app.CompZtreeComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx('<ul id={{_ztreeId}} class="z-tree-container ztree"></ul>'),
            templateName: 'comp-ztree',
            classNames: ['comp-ztree', 'absolute'],
            /**
             *  自定义配置 会覆盖组件默认配置 zTree默认配置 
             *  具体内容参考http://www.treejs.cn/v3/api.php setting 配置详解
             * @member {object} config 
             * @default null
             * @public
             */
            config: null,
            /**
             * 数据源对象 
             * 推荐使用树结构的数据如：{name: "父节点1", children: [{name: "子节点1"},{name: "子节点2"}]}
             * 简单结构数据需自行在config中配置，参考api网页介绍
             * @member {object} dataSource
             * @default null
             * @public
             */
            dataSource: null,
            /**
             * ztree绑定Dom的Jquery对象
             * @member {object} _$ztree
             * @default null
             * @private
             */
            _$ztree: null,
            /**
             * ztree插件对象含有多种组件方法
             * @member {object} _$_ztreeObj
             * @default null
             * @private
             */
            _ztreeObj: null,
            /**
             * ztree 组件根据容器id生成树子元素id 所以生成一个id
             * @member {object} _$_ztreeObj
             * @default null
             * @private
             */
            _ztreeId: Ember.generateGuid(null, 'ztree'),
            /**
             * ztree支持的所有事件 用于检测是否订阅了相关事件
             * 事件也可以通过config配置，都设置同一事件冲突时action事件方式覆盖config配置
             * @member {array} _eventDict
             * @default eventList
             * @private
             * @readonly
             */
            _eventDict: ['beforeAsync', 'beforeCheck', 'beforeClick', 'beforeCollapse', 'beforeDblClick',
                'beforeDrag', 'beforeDragOpen', 'beforeDrop', 'beforeEditName', 'beforeExpand', 'beforeMouseDown',
                'beforeMouseUp', 'beforeRemove', 'beforeRename', 'beforeRightClick', 'onAsyncError', 'onAsyncSuccess',
                'onCheck', 'onClick', 'onCollapse', 'onDblClick', 'onDrag', 'onDragMove', 'onDrop', 'onExpand', 'onMouseDown',
                'onMouseUp', 'onNodeCreated', 'onRemove', 'onRename', 'onRightClick'
            ],
            init: function() {
                this._super();
            },
            didInsertElement: function() {
                this._$ztree = this.$('.ztree');
                this._initZtree();
            },
            willDestroyElement: function() {
                this._$ztree = null;
                this._ztreeObj.destroy();
                this._ztreeObj = null;
            },
            /**
             * 返回组件默认配置和用户配置混合后结果
             * @method _getZtreeConfig
             * @return {object}
             * @private
             */
            _getZtreeConfig: function() {
                var eventConfig = {},
                    // 默认配置
                    defaultConfig = {
                        edit: {
                            removeTitle: Ember.oloc('comp_ztree_sc'),
                            renameTitle: Ember.oloc('comp_ztree_cmm')
                        }
                    };
                // 模板事件
                this._eventDict.forEach(function(eventName) {
                    // 如果在模板里面设置了事件
                    if (this.get(eventName)) {
                        eventConfig[eventName] = function() {
                            // 通过action方式把事件和参数发送出去
                            this.sendAction.apply(this, [eventName].concat([].slice.call(arguments)));
                        }.bind(this);
                    }
                }, this);
                return Ember.$.extend(true, defaultConfig, this.get('config'), {
                    callback: eventConfig
                });
            },
            /**
             * 初始化ztree
             * @method _initZtree
             * @private
             */
            _initZtree: Ember.observer('config', 'dataSource.[]', function() {
                if (this._ztreeObj) {
                    this._ztreeObj.destroy();
                }
                this._ztreeObj = Ember.$.fn.zTree.init(this._$ztree, this._getZtreeConfig(), this.get('dataSource'));
            }),
            /**
             * 获取zTreeObj  可以调用未封装的插件提供的方法
             * @method getZtreeObj
             * @return {object} zTreeObj
             * @public
             */
            getZtreeObj: function() {
                return this._ztreeObj;
            },
            /**
             * 获取zTreeId  插件提供一些需要自行添加dom的回调里面用到
             * @method getZtreeId
             * @return {string} _ztreeId
             * @public
             */
            getZtreeId: function() {
                return this._ztreeId;
            },
            /**
             * 展开/合并 全部节点
             * @method expandAll
             * 此方法不会触发 beforeExpand / onExpand 和 beforeCollapse / onCollapse 事件回调函数。
             * @param {boolean} isExpand true展开全部节点 false折叠
             * @return 返回值表示最终实际操作情况 true表示展开全部节点 false表示折叠全部节点 null表示不存在任何父节点
             * @public
             */
            expandAll: function(isExpand) {
                return this._ztreeObj.expandAll(isExpand);
            },
            /**
             * 展开/合并指定节点
             * @method expandNode
             * 此方法可以触发 beforeExpand / onExpand 和 beforeCollapse / onCollapse 事件回调函数。
             * @param {object} treeNode 需要 展开 / 折叠 的节点数据
             * @param {boolean} expandFlag true展开节点false折叠节点 省略此参数，则根据对此节点的展开状态进行 toggle 切换
             * @param {boolean} sonSign true 表示 全部子孙节点 进行与 expandFlag 相同的操作 省略此参数，等同于 false
             * @param {boolean} focus true 展开/折叠操作后，通过设置焦点保证此焦点进入可视区域内，false 不设置任何焦点 省略此参数，等同于 false
             * @param {boolean} callbackFlag  true 表示执行此方法时触发 beforeExpand / onExpand 或 beforeCollapse / onCollapse 事件回调函数 省略此参数，等同于 false
             * @return 返回值表示最终实际操作情况 true表示展开节点 false表示折叠节点 null表示不是父节点
             * @public
             */
            expandNode: function(treeNode, expandFlag, sonSign, focus, callbackFlag) {
                return this._ztreeObj.expandNode(treeNode, expandFlag, sonSign, focus, callbackFlag);
            },
            /**
             * 获取 zTree 的全部节点数据
             * @method getNodes
             * @return {array} 全部节点数据
             * @public
             */
            getNodes: function() {
                return this._ztreeObj.getNodes();
            },
            /**
             * 根据 zTree 的唯一标识 tId 快速获取节点 JSON 数据对象
             * @method getNodeByTId
             * @param {string} tId 节点在 zTree 内的唯一标识 tId
             * @public
             */
            getNodeByTId: function(tId) {
                return this._ztreeObj.getNodeByTId(tId);
            },
            /**
             * 根据自定义规则搜索节点数据 JSON 对象集合 或 单个节点数据
             * @method getNodesByFilter
             * @param {function} filter 自定义过滤器函数 filter 参数：node (节点数据)filter 返回值：boolean (true 表示符合搜索条件；false 表示不符合搜索条件)
             * @param {boolean}  true 表示只查找单个节点 false查找符合条件集合 默认false
             * @param {object} parentNode 搜索范围，指定在某个父节点下的子节点中进行搜索  忽略此参数，表示在全部节点中搜索
             * @param {any} invokeParam  用户自定义的数据对象，用于 filter 中进行计算
             */
            getNodesByFilter: function(filter, isSingle, parentNode, invokeParam) {
                return this._ztreeObj.getNodesByFilter(filter, isSingle, parentNode, invokeParam);
            },
            /**
             * 根据节点数据的属性搜索，获取条件完全匹配的节点数据 JSON 对象
             * @method getNodeByParam
             * @param {string} key 需要精确匹配的属性名称
             * @param {?} 需要精确匹配的属性值，可以是任何类型，只要保证与 key 指定的属性值保持一致即可
             * @param {object} parentNode 搜索范围，指定在某个父节点下的子节点中进行搜索     忽略此参数，表示在全部节点中搜索
             * @return {object|null} 匹配精确搜索的节点数据 如无结果，返回 null 如有多个节点满足查询条件，只返回第一个匹配到的节点
             * @public
             */
            getNodeByParam: function(key, value, parentNode) {
                return this._ztreeObj.getNodeByParam(key, value, parentNode);
            },
            /**
             * 根据节点数据的属性搜索，获取条件完全匹配的节点数据 JSON 对象集合
             * 同getNodeByParam 返回查找到的多个数据集合
             * @method getNodesByParam
             * @param {string} key 需要精确匹配的属性名称
             * @param {?} 需要精确匹配的属性值，可以是任何类型，只要保证与 key 指定的属性值保持一致即可
             * @param {object} parentNode 搜索范围
             * @return {array} 匹配精确搜索的节点数据集合 如无结果，返回[]
             * @public
             */
            getNodesByParam: function(key, value, parentNode) {
                return this._ztreeObj.getNodeByParam(key, value, parentNode);
            },
            /**
             * 根据节点数据的属性搜索，获取条件完全匹配的节点数据 JSON 对象集合
             * 同getNodesByParam 只能模糊查找字符串属性
             * @method getNodesByParamFuzzy
             * @param {string} key 需要精确匹配的属性名称
             * @param {string} 需要模糊匹配的属性值
             * @param {object} parentNode 搜索范围
             * @return {array} 匹配精确搜索的节点数据集合 如无结果，返回[]
             * @public
             */
            getNodesByParamFuzzy: function(key, value, parentNode) {
                return this._ztreeObj.getNodesByParamFuzzy(key, value, parentNode);
            },
            /**
             * 获取 zTree 当前被选中的节点数据集合
             * @method getSelectedNodes
             * @public
             */
            getSelectedNodes: function() {
                return this._ztreeObj.getSelectedNodes();
            },
            /**
             * 判断当前节点是否被选中
             * @method isSelectedNode
             * @public
             */
            isSelectedNode: function(treeNode) {
                return this._ztreeObj.isSelectedNode(treeNode);
            },
            /**
             * 获取 zTree 当前被选中的节点数据集合
             * @method selectNode
             * @param treeNode 需要被选中的节点数据
             * @param {boolean} addFlag  true 表示追加选中，会出现多点同时被选中的情况false （默认）表示单独选中，原先被选中的节点会被取消选中状态
             * @param {boolean}  isSilent  true 选中节点时，不会让节点自动滚到到可视区域内false （默认）表示选中节点时，会让节点自动滚到到可视区域内
             * @public
             */
            selectNode: function(treeNode, addFlag, isSilent) {
                return this._ztreeObj.selectNode(treeNode, addFlag, isSilent);
            },
            /**
             * 取消节点的选中状态。
             * @method cancelSelectedNode
             * @param treeNode 需要取消选中状态的节点 如果省略此参数，则将取消全部被选中节点的选中状态。
             * @public
             */
            cancelSelectedNode: function(treeNode) {
                return this._ztreeObj.cancelSelectedNode(treeNode);
            },
            /**
             * 获取输入框被勾选 或 未勾选的节点集合
             * @method getCheckedNodes  
             * @param {boolean} checked true(默认) 表示获取被勾选的节点集合  false 表示获取 未勾选 的节点集合
             */
            getCheckedNodes: function(checked) {
                return this.getCheckedNodes(checked);
            },
            /**
             * 获取 zTree 当前被选中的节点数据集合
             * @method checkNode
             * @param treeNode 需要勾选或取消勾选的节点数据
             * @param {boolean} checked   true 表示勾选节点checked = false 表示节点取消勾选 省略此参数，则根据对此节点的勾选状态进行 toggle 切换
             * @param {boolean}  checkTypeFlag  true 表示按照 setting.check.chkboxType 属性进行父子节点的勾选联动操作false 表示只修改此节点勾选状态，无任何勾选联动操作 
             * @param {boolean} callbackFlag true 表示执行此方法时触发 beforeCheck & onCheck 事件回调函数
             * @public
             */
            checkNode: function(treeNode, checked, checkTypeFlag, callbackFlag) {
                return this._ztreeObj.selectNode(treeNode, checked, checkTypeFlag, callbackFlag);
            },
            /**
             * 勾选 或 取消勾选 全部节点 不会触发对应事件
             * @method checkAllNodes
             * @param {boolean} checked  true 表示勾选全部节点 false 全部节点取消勾选
             * @public
             */
            checkAllNodes: function(checked) {
                return this._ztreeObj.checkAllNodes(checked);
            },
            /**
             * 获取zTreeObj  可以调用未封装的插件提供的方法
             * @method addNodes
             * @param {object}  parentNode  指定的父节点，如果增加根节点，请设置 parentNode 为 null 即可。
             * @param {number}  index 新节点插入的位置（从 0 开始）index = -1 时，插入到最后 可省略该参数
             * @param {object}  newNodes 需要增加的节点数据 JSON 对象集合，数据只需要满足 zTree 的节点数据必需的属性即可，详细请参考“treeNode 节点数据详解”
             * @param {boolean} isSilent 设定增加节点后是否自动展开父节点。
             * @return {object} zTreeObj
             * @public
             */
            addNodes: function(parentNode, index, newNodes, isSilent) {
                return this._ztreeObj.addNodes(parentNode, index, newNodes, isSilent);
            },
            /**
             * 删除节点。 
             * @method removeNode 
             * @param {object} treeNode 需要被删除的节点数据
             * @param {boolean} callbackFlag true 触发对应事件
             * @public
             */
            removeNode: function(treeNode) {
                this._ztreeObj.removeNode(treeNode);
            },
            /**
             * 清空某父节点的子节点。
             * @method removeChildNodes 
             * @param {object} treeNode 需要清空子节点节点的节点
             * @return {object} 将该父节点的子节点数据返回
             * @public
             */
            removeChildNodes: function(treeNode) {
                return this._ztreeObj.removeChildNodes(treeNode);
            },
            /**
             * 更新某节点数据，主要用于该节点显示属性的更新。
             * @method updateNode
             * @param {object} treeNode 指定需要更新的节点数据
             * @param {boolean} checkTypeFlag true 表示按照 setting.check.chkboxType 属性进行父子节点的勾选联动操作 false 表示无任何勾选联动操作
             * @public
             */
            updateNode: function(treeNode, checkTypeFlag) {
                this._ztreeObj.updateNode(treeNode, checkTypeFlag);
            },
            /**
             * 将 zTree 使用的嵌套格式的数据转换为简单 Array 格式
             * @method transformToArray
             * @param {object|array} treeNodes 需要被转换的 zTree 节点数据对象集合 或 某个单独节点的数据对象
             * @return {array}
             * @public
             */
            transformToArray: function(treeNodes) {
                return this._ztreeObj.transformToArray(treeNodes);
            },

            /**
             * 刷新 zTree 
             * @method refresh
             * @public
             */
            refresh: function() {
                this._ztreeObj.refresh();
            },
        });
    }
);