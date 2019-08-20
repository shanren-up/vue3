/*
 * 描述：ht-tree-table
 * 封装：翟梦男
 * 联系方式：zhaimengnan@boco.com.cn
 * 创建时间：2017-6-21
 * v1.0
 */
/*
 * 其他说明
 * 默认返回model，不需要单独再引入
 * hTtable提供的相当一部分方法可以取很多有用信息，可以参考官方文档，在treeTableView _borderPane或者column上低啊用
 * 部分说明参考model，未包含部分或者不够详尽部分参考官方文档，请见谅。
 * 表格功能较多需要未包含功能请自行添加，添加后应在model添加对应配置项，并验证对默认其他情况是否有影响，
 *   必要时在helper里面添加转换数据方法
 * this.treeTableView.setVisibleFunc可以设置过滤显示的函数，默认用于列头过滤功能，如果用于其他用途请禁用表头过滤isShowFilters=false
 */
define(
    [
        'app',
        'text!./comp_ht_table.html',
        './comp_ht_table_model.js',
        './comp_ht_table_filter_helper.js',
        'ht',
        'ht_form',
    ],

    function(app, template, model, filterHelper) {

        'use strict';

        app.CompHtTableComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-ht-table',
            // 配置数据
            headerConfig: null,
            tableConfig: null,
            // 列参数
            columns: null,
            // 数据HT DataModel
            dataSource: null,
            // 是否启用过滤
            isShowFilters: true,
            // ht表格面板
            treeTableView: null,
            // 表格容器ht边框组件
            _borderPane: null,
            // 过滤相关方法
            _filterHelper: null,

            init: function() {
                this._super();
                this._filterHelper = filterHelper.create();
            },
            didInsertElement: function() {
                this._initTreeTable();
            },
            willDestroyElement: function() {
                this.treeTableView = null;
                this._borderPane = null;
                this._filterHelper.destroy();
            },
            // 动态更新dataSource和columns
            setTableColumns: Ember.observer('colunms', function(columns) {
                columns = columns || this.columns;
                if (this.treeTableView && columns instanceof Array) {
                    this.setColumns(columns);
                }
            }),
            setTableData: Ember.observer('dataSource', function(dataSource) {
                dataSource = dataSource || this.dataSource;
                if (this.treeTableView && dataSource instanceof ht.DataModel) {
                    this.treeTableView.setDataModel(dataSource);
                }
                this.resetView();
            }),
            addColumns: function(columns) {
                this.treeTableView.addColumns(columns);
            },
            setColumns: function(columns) {
                this.treeTableView.setColumns(columns);
            },
            getSelection: function() {
                return this.treeTableView.getSelectionModel().getSelection()._as;
            },
            setSelection: function(data) {
                if (data) {
                    this.treeTableView.setFocusData(data);
                }
            },
            getDataAt: function(pointOrEvent) {
                return this.treeTableView.getDataAt(pointOrEvent);
            },
            expandAll: function() {
                this.treeTableView.expandAll();
            },
            collapseAll: function() {
                this.treeTableView.collapseAll();
            },
            resetView: function() {
                if (this._borderPane) {
                    this._borderPane.invalidate();
                }
            },
            // 该函数触发组件重新排序过滤加载数据
            resetData: function() {
                if (this.treeTableView) {
                    this.treeTableView.invalidateModel();
                }
            },
            /*
             * 视图显示时会自动调用showView方法，组件不会
             * 组件非显示状态下调用handleReize会导致宽高异常
             * 这种情况下视图在showView方法里调用下异常的组件即可
             */
            showView: function() {
                this.resetView();
            },
            // 触发resieze事件时自动调用
            handleResize: function(width, height) {
                this.resetView();
            },
            // 触发二次过滤
            // TODO 默认只在字段为字符串或者可转换为字符串的字段正常工作，其他特殊情况请重载自定义
            secondaryFilter: function(column, event) {
                if (column.filterType === 'text') {
                    this._filterHelper.secondaryFilterText(column, event, this);
                } else if (column.filterType === 'time') {
                    this._filterHelper.secondaryFilterTime(column, event, this);
                }
            },

            // 初始化表格
            _initTreeTable: function() {
                var view, treeTablePane = new ht.widget.TreeTablePane();
                this._borderPane = new ht.widget.BorderPane();
                this._borderPane.setCenterView(treeTablePane);
                view = this._borderPane.getView();
                view.className = 'ht-table absolute';
                this.$('.comp-ht-table').append(view);
                this._initHeader(treeTablePane);
                this._initTableView(treeTablePane);
            },
            // 初始化表头
            _initHeader: function(treeTablePane) {
                var self = this,
                    tableHeader = treeTablePane.getTableHeader();
                this._intiHeaderConfig(tableHeader);
                tableHeader.isShowFilters = this.isShowFilters;
                tableHeader.drawColumn = function(g, column, x, y, width, height) {
                    var tv = this.tv;
                    var icon = ht.Default.getImage(column.getIcon());
                    var labelAlign = this.getLabelAlign(column);
                    //内容
                    var label = this.getLabel(column);
                    var labelFont = this.getLabelFont(column);
                    var labelColor = this.getLabelColor(column);
                    var labelWidth = ht.Default.getTextSize(labelFont, label).width;
                    var indent = icon ? this._indent : 0;
                    if (labelAlign === 'left') {
                        if (icon) {
                            ht.Default.drawStretchImage(g, icon, 'centerUniform', x, y, indent, height);
                        }
                        ht.Default.drawText(g, label, labelFont, labelColor, x + indent, y, width, height, 'left');
                    } else if (labelAlign === 'right') {
                        if (icon) {
                            ht.Default.drawStretchImage(g, icon, 'centerUniform', x + width - labelWidth - indent, y, indent, height);
                        }
                        ht.Default.drawText(g, label, labelFont, labelColor, x, y, width, height, 'right');
                    } else {
                        if (icon) {
                            ht.Default.drawStretchImage(g, icon, 'centerUniform', x + (width - labelWidth - indent) / 2, y, indent, height);
                        }
                        ht.Default.drawText(g, label, labelFont, labelColor, x + (width - labelWidth + indent) / 2, y, 0, height, 'left');
                    }
                    self._drawHeaderIcon.call(this, g, column, x, y, width, height);
                    self._initHeaderClickEvent(tableHeader);
                };
            },
            // 初始化表头配置
            _intiHeaderConfig: function(tableHeader) {
                if (this.headerConfig) {
                    this._setHeaderConfigByModel(tableHeader);
                } else {
                    // 默认设置
                    if (!ht.Default.isTouchable) {
                        tableHeader.getView().style.background = 'url(common/components/comp_ht_table/img/header.png) repeat-x';
                    }
                    tableHeader.setColumnLineColor('#C8C8C8');
                    tableHeader.setInsertColor('#6DCDF3');
                }
            },
            // 根据headerConfig设置表头配置
            _setHeaderConfigByModel: function(tableHeader) {
                ['sortDescIcon', 'sortAscIcon', 'moveBackgroundColor', 'height', 'labelFont', 'labelColor'].forEach(function(key) {
                    if (this.headerConfig[key]) {
                        tableHeader['set' + key[0].toUpperCase() + key.slice(1)](this.headerConfig[key]);
                    }
                }, this);
                ['columnLineVisible', 'resizable', 'movable'].forEach(function(key) {
                    if (this.headerConfig[key] === false) {
                        tableHeader['set' + key[0].toUpperCase() + key.slice(1)](false);
                    }
                }, this);
                if (!ht.Default.isTouchable) {
                    tableHeader.getView().style.background = 'url(' +
                        (this.headerConfig.bgIcon || 'common/components/comp_ht_table/img/header.png') + ') repeat';
                }
                tableHeader.setColumnLineColor(this.headerConfig.columnLineColor || '#C8C8C8');
                tableHeader.setInsertColor(this.headerConfig.insertColor || '#6DCDF3');
            },
            // 绘制表头排序和过滤图标
            _drawHeaderIcon: function(g, column, x, y, width, height) {
                var tv = this.tv,
                    sortIcon, filterIcon, filterIconWidth,
                    labelAlign = this.getLabelAlign(column);
                //排序图标
                if (column.isSortable() && tv.getSortColumn() === column) {
                    sortIcon = ht.Default.getImage(column.getSortOrder() === 'asc' ? this.getSortAscIcon() : this.getSortDescIcon());
                    if (sortIcon) {
                        ht.Default.drawCenterImage(g, sortIcon, x + sortIcon.width, y + height / 2, column, tv);
                    }
                }
                //二次过滤图标
                if (column && this.isShowFilters && column.hasFilter && column.getDisplayName() !== '') {
                    filterIcon = ht.Default.getImage('common/components/comp_ht_table/img/column_filter.png');
                    if (filterIcon) {
                        filterIcon.accessKey = 'filter';
                        filterIconWidth = filterIcon.width;
                        ht.Default.drawCenterImage(g, filterIcon, labelAlign === 'right' ? x + filterIconWidth : x + width - filterIconWidth, y + height / 2, column, tv);
                        column._icon_x = x + width - filterIconWidth - 8;
                        column._icon_x_end = x + width;
                    }
                }
            },
            // 表头点击事件
            _initHeaderClickEvent: function(tableHeader) {
                tableHeader.onColumnClicked = function(column, event) {
                        //使用逻辑坐标点判断选中
                        var lp = tableHeader.lp(event);
                        var px1 = column._icon_x;
                        var px2 = column._icon_x_end;
                        if (lp.x >= px1 && lp.x <= px2) {
                            //执行过滤：调用过滤方法
                            if (typeof this.secondaryFilter === 'function') {
                                this.secondaryFilter(column, event);
                            }
                            return false;
                        } else {
                            //执行排序，可使用默认的可以发送事件自行处理排序逻辑
                            return true;
                        }
                    }
                    .bind(this);
            },
            // 初始化表格主体
            _initTableView: function(treeTablePane) {
                this.treeTableView = treeTablePane.getTableView();
                this._initTableByConfig();
                this._initRowEvent();
                this._initTableEvent();
            },
            // 初始化表格配置
            _initTableByConfig: function() {
                if (this.tableConfig) {
                    this._setTableModelConfig();
                } else {
                    this.treeTableView.setRowHeight(20);
                    this.treeTableView.setExpandIcon('common/components/comp_ht_table/img/minus.png');
                    this.treeTableView.setCollapseIcon('common/components/comp_ht_table/img/add.png');
                }
                this._initRowBackground(this.tableConfig || {});
            },
            // 通过tableConfig设置表格参数
            _setTableModelConfig: function() {
                ['rowLineVisible', 'columnLineVisible', 'autoHideScrollBar'].forEach(function(key) {
                    if (this.tableConfig[key] === false) {
                        this.treeTableView['set' + key[0].toUpperCase() + key.slice(1)](false);
                    }
                }, this);
                if (this.tableConfig.editable === true) {
                    this.treeTableView.setEditable(true);
                }
                ['rowHeight', 'rowLineColor', 'labelFont', 'columnLineColor', 'scrollBarColor',
                    'scrollBarSize', 'checkModel', 'expandIcon', 'collapseIcon'
                ].forEach(function(key) {
                    if (this.tableConfig[key]) {
                        this.treeTableView['set' + key[0].toUpperCase() + key.slice(1)](this.tableConfig[key]);
                    }
                }, this);
            },
            // 设置行背景
            _initRowBackground: function(tableConfig) {
                this.treeTableView.drawRowBackground = function(g, data, selected, x, y, width, height) {
                    if ((!this.getCheckMode() && selected) || (this.getCheckMode() && data === this.getFocusData())) {
                        g.fillStyle = tableConfig.checkRowBgColor || '#87A6CB';
                    } else if (this.getRowIndex(data) % 2 === 0) {
                        g.fillStyle = tableConfig.evenRowBgColor || '#F1F4F7';
                    } else {
                        g.fillStyle = tableConfig.oddRowBgColor || '#FAFAFA';
                    }
                    g.beginPath();
                    g.rect(x, y, width, height);
                    g.fill();
                };
            },
            // 处理表格点击事件
            _initRowEvent: function() {
                this.treeTableView.onDataDoubleClicked = function(data, event) {
                    this.sendAction('rowDoubleClicked', data, this.treeTableView.getColumnAt(event), event);
                }.bind(this);
                this.treeTableView.onDataClicked = function(data, event) {
                    this.sendAction('rowClicked', data, this.treeTableView.getColumnAt(event), event);
                }.bind(this);
            },
            // 可以监听表格其他事件 如按键 滚轮 数据更新等需要时自行重载
            _initTableEvent: function() {
                // this.treeTableView.addPropertyChangeListener(function(e) {
                //     if (e.property === 'translateY') {
                //         var viewRect = {
                //             x: -e.data.tx(),
                //             y: -e.data.ty(),
                //             width: e.data.getWidth(),
                //             height: e.data.getHeight()
                //         };
                //         var rowHeight = e.data.getRowHeight();
                //         var startRowIndex = Math.floor(viewRect.y / rowHeight);
                //         var endRowIndex = Math.ceil((viewRect.y + viewRect.height) / rowHeight);
                //         this.sendAction('onscroll', startRowIndex, endRowIndex);
                //     }
                // }.bind(this));
            },
            actions: {

            }
        });
        return model;
    }
);
