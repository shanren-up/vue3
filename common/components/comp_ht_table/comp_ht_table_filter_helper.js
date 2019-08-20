/*
 * 二次过滤
 */
define(
    [
        'comp_modal',
        './components/comp_ht_table_secondary_filter_container/comp_ht_table_secondary_filter_container.js',
        './components/comp_ht_table_secondary_filter_time/comp_ht_table_secondary_filter_time.js'
    ],
    function(modal) {

        'use strict';

        return Ember.Object.extend({
            // 报存表头过滤部分信息
            _filterInfo: null,
            init: function() {
                /*
                 * field 字段值
                 * values 值集合
                 */
                this._filterInfo = {};
            },
            willDestroy: function() {
                this._filterInfo = null;
            },
            /*
             * 弹出二次过滤窗口
             * 参数 option{
             *  event  点击事件event对象
             *  parameters 传递参数
             *  componentName  需要弹出组件名 sizeClass默认为组件名+size
             *  displayName 显示标题名一般为列显示名
             *  confirmFunc 确认的回调函数  第一个参数为弹窗组件
             * }
             */
            popSecondaryFilterWin: function(option, htTable) {
                modal.popup({
                    targetObject: htTable,
                    popoverElement: option.event.target,
                    top: option.event.clientY,
                    left: option.event.clientX,
                    //指定元素
                    placement: '',
                    hasHeader: true,
                    hasMax: false,
                    hasPhoto: false,
                    headerText: option.displayName + Ember.oloc('comp_ht_table_filter_helper_gl'),
                    sizeClass: option.componentName + '-size',
                    contentComponentName: option.componentName,
                    parameters: option.parameters,
                    hasFooter: false,
                    backdrop: false,
                    enforceModality: true,
                    confirm: option.confirmFunc,
                });
            },
            // 只在字段为字符串或者可转换为字符串的字段正常工作
            secondaryFilterText: function(column, event, htTable) {
                var existFilterValues,
                    filterItems = this._getAllData(column, htTable);
                if (this._filterInfo.field === column.getName()) {
                    existFilterValues = this._filterInfo.values;
                }
                var option = {
                    event: event,
                    parameters: {
                        // 全部值
                        filterItems: filterItems,
                        // 需要过滤的字段值
                        fieldName: column.getName(),
                        // 已经显示的需要默认选中的值
                        existFilterValues: existFilterValues,
                        // 这里没有用到，一般传可用于后续处理的组件，
                        // 例如过滤功能放到数据处理对象或者其他，可以将它传进去方便接收过滤结果，发送事件等
                        ownerControl: htTable,
                    },
                    componentName: 'comp-ht-table-secondary-filter-container',
                    displayName: column.getDisplayName(),
                    confirmFunc: this._secondaryFilterConfirmText.bind(this, htTable)
                };
                this.popSecondaryFilterWin(option, htTable);
            },

            // 过滤时间字段 弹出组件可以选择时间段 默认支持 yyyy-mm-dd hh:ii:ss 格式字符串
            secondaryFilterTime: function(column, event, htTable) {
                var existFilterValues, filterItems;
                // TODO 是否需要取得所有时间的范围作为默认值
                // filterItems = this._getAllData(column, htTable)
                if (this._filterInfo.field === column.getName()) {
                    existFilterValues = this._filterInfo.values;
                }

                var option = {
                    event: event,
                    parameters: {
                        // 需要过滤的字段值
                        fieldName: column.getName(),
                        // 默认范围[startTime,endTime]
                        existFilterValues: existFilterValues,
                        ownerControl: htTable,
                    },
                    componentName: 'comp-ht-table-secondary-filter-time',
                    displayName: column.getDisplayName(),
                    confirmFunc: this._secondaryFilterConfirmTime.bind(this, htTable)
                };
                this.popSecondaryFilterWin(option, htTable);
            },
            /*
             * 获取该字段所有值
             */
            _getAllData: function(column, htTable) {
                var obj = {},
                    // 该字段所有值
                    filterItems, existFilterValues,
                    allDatas = htTable.treeTableView.getDataModel().getDatas();
                allDatas.each(function(item) {
                    obj[item.a(column.getName())] = 1;
                });
                filterItems = Object.keys(obj).map(function(text, i) {
                    return {
                        // 序号 排序用
                        id: i,
                        // 显示的值
                        text: text
                    };
                });
                return filterItems;
            },
            // 文本过滤
            _secondaryFilterConfirmText: function(htTable, modalComp) {
                var filterWindow = modalComp.childViews.findBy('name', 'filterWindow');
                // 获取选中项
                var checked = filterWindow.allFilterItems.filterBy('isChecked', true);
                this._filterInfo.field = modalComp.parameters.fieldName;
                this._filterInfo.values = checked.getEach('text').join();
                this._setVisibleFuncText(modalComp.parameters.fieldName, checked.getEach('text'), htTable);
                htTable.resetData();
            },
            // 设置显示函数 用于二次过滤，
            _setVisibleFuncText: function(field, valueList, htTable) {
                htTable.treeTableView.setVisibleFunc(function(data) {
                    var value = data.a(field) !== undefined ? data.a(field) : data[field];
                    // 选择为空时默认全部显示 不过滤树表格中的子元素
                    if (!valueList.length || data.getParent()) {
                        return true;
                    }
                    return valueList.includes(String(value));
                });
            },
            // 时间过滤
            _secondaryFilterConfirmTime: function(htTable, modalComp) {
                var filterWindow = modalComp.childViews.findBy('name', 'filterTimeWindow');
                // 获取选中项
                var result = {
                    startTime: filterWindow.startTime,
                    endTime: filterWindow.endTime
                };
                this._filterInfo.field = modalComp.parameters.fieldName;
                this._filterInfo.values = [result.startTime, result.endTime];
                this._setVisibleFuncTime(modalComp.parameters.fieldName, result, htTable);
                htTable.resetData();
            },
            _setVisibleFuncTime: function(field, result, htTable) {
                htTable.treeTableView.setVisibleFunc(function(data) {
                    var value = data.a(field) !== undefined ? data.a(field) : data[field];
                    // 选择为空时默认全部显示 不过滤树表格中的子元素
                    if (data.getParent()) {
                        return true;
                    }
                    return value < result.endTime && value > result.startTime;
                });
            },
        });
    }
);
