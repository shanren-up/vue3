/*
 *bootstrap-select组件可多选isMultiple
 *用法示例如下：可以像其他ember inputhelper类似自动更新value的属性,value值对应的会自动选中
 *dataSource [{id:1,txt:'abc'} ,{}...]
 *{{comp-select dataSource=baseData.vendor displayText='设备厂家'  value=queryData.vendorId }}
 *返回值、默认值类型与默认select类似的字符串多个值用逗号分隔
 *选中状态变化时this.sendAction('selectedChange', ‘1,2,3’);
 */
define(
    [
        'app',
        'json!./cultureInfo.json',
        'text!./comp_select.html',
        'css!./comp_select.css',
        'bootstrap_multiselect'
    ],

    function(app, cultureInfo, template) {

        'use strict';
        Ember.addJsonCultureInfo(cultureInfo);

        app.CompSelectComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-select',
            //属性
            isMultiple: true,
            //是否显示文字
            showDisplayText: true,
            //显示的标题名
            displayText: '',
            //数据
            dataSource: null,
            //全选是否返回选中项
            isSendAnyway: false,
            //当前select的value 可设置多个，中间逗号隔开
            vaule: null,
            //宽度
            width: null,
            //是否禁用
            disabled: false,
            //select JQuery对象
            _$select: null,
            // 是否自己设置value
            _isSetSeft: false,
            //初始化
            init: function() {
                this._super();
            },
            didInsertElement: function() {
                this._initSelect();
            },
            willDestroyElement: function() {

            },
            _initSelect: function() {
                this._$select = this.$('.dropdown-control');
                this._$select.multiselect({
                    buttonClass: 'btn btn-default search-btn',
                    includeSelectAllOption: true,
                    selectAllText: Ember.oloc('comp_select_qb'),
                    selectAllValue: Ember.oloc('comp_select_qb'),
                    filterPlaceholder: Ember.oloc('comp_select_cx'),
                    nonSelectedText: Ember.oloc('comp_select_wxz'),
                    nSelectedText: Ember.oloc('comp_select_xz'),
                    allSelectedText: Ember.oloc('comp_select_qb'),
                    enableFiltering: true,
                    numberDisplayed: 5,
                    maxHeight: 200,
                    maxWidth: this.width || 170,
                    buttonWidth: this.width || 170,
                    onChange: this._changeHandle.bind(this),
                    onDropdownHidden: this._dropDownHandle.bind(this),
                    filterFun: this._filterHandle,
                });
                Ember.run.later(this, this.resetCondition);
                if (this.disabled) {
                    Ember.run.later(this, this._disableSelect);
                }
            },

            //私有方法
            _dropDownHandle: function(event) {
                if (this.isDestroyed || this.isDestroying) {
                    return;
                }
                var value = this.getCondition();
                this._isSetSeft = true;
                this.set('value', value);
                this.sendAction('selectedChange', value);
                this._isSetSeft = false;
            },
            _changeHandle: function(option, checked, select) {

            },
            //支持拼音搜索
            _filterHandle: function(filterStr, text) {
                var i, filterUpperCase = filterStr.toUpperCase(),
                    textStr = text;
                //先查找原文，然后拼音全拼、首字母
                for (i = 0; i < 3; i++) {
                    if (textStr.indexOf(filterStr) !== -1 || textStr.indexOf(filterUpperCase) !== -1) {
                        return true;
                    }
                    if (i === 0) {
                        //全拼
                        textStr = Ember.ExtendHelper.pinyin.getFullChars(text).toUpperCase();
                    } else if (i === 1) {
                        //首字母
                        textStr = Ember.ExtendHelper.pinyin.getCamelChars(text);
                    }
                }
                return false;
            },
            _disableSelect: Ember.observer('disabled', function() {
                if (this.get('disabled')) {
                    Ember.run.later(this, function() {
                        this._$select.multiselect('disable');
                    }, 200);
                } else {
                    Ember.run.later(this, function() {
                        this._$select.multiselect('enable');
                    }, 200);
                }
            }),
            _setDefaultValue: Ember.observer('dataSource', 'value', function() {
                if (this._isSetSeft) {
                    return;
                }
                //数据绑定延迟执行
                Ember.run.later(this, function() {
                    var values;
                    this._$select.multiselect('rebuild');
                    if (this.get('value') !== null && this.get('value') !== undefined) {
                        //先取消选中项然后选中默认值
                        values = String(this.get('value'));
                        this._$select.multiselect('deselectAll', false);
                        this._$select.multiselect('select', values.split(','));
                    } else {
                        if (this.isMultiple) {
                            //如果未设置默认值则选择全部
                            this._$select.multiselect('selectAll', false);
                        }
                        //将默认设置值更新到value
                        this._dropDownHandle();
                    }
                    this._$select.multiselect('updateButtonText');
                    this._$select.multiselect('refresh');
                    this._disableSelect();
                }.bind(this), 200);
            }),
            //方法
            getCondition: function() {
                var result = this._$select.val();
                //单选返回val的值
                if (!this.isMultiple) {
                    return result;
                }
                //没有选中项或者    （ 选择全部 且 非必传字段）
                if (!result.length || (result.length === this.dataSource.length && !this.isSendAnyway)) {
                    return null;
                } else {
                    return result.join();
                }
            },
            getElement: function() {
                return this._$select;
            },
            //全选
            selectAll: function() {
                if (this._$select) {
                    this._$select.multiselect('selectAll', false);
                    this._$select.multiselect('updateButtonText');
                }
            },
            //全不选
            deselectAll: function() {
                if (this._$select) {
                    this._$select.multiselect('deselectAll', false);
                    this._$select.multiselect('updateButtonText');
                }
            },
            resetCondition: function() {
                this._setDefaultValue();
            },
            //动作
            actions: {},
        });
    });