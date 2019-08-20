/**
 * 描述：bootstrap-table
 * 作者：翟梦男
 * 联系方式：zhaimengnan@boco.com.cn
 * 创建时间：2015-11-30
 * v1.0
 **/
/**
 * 新增editable扩展相关内容，修改在模态框内时表头表格对不齐bug
 * 修改人： 翟梦男
 * 联系方式：zhaimengnan@boco.com.cn
 * 修改时间：2016-12-10
 * v1.1
 * 现存在问题：设置表格固定高度时，行resizeable不包括表头
 */

/*关于添加新的拓展
 * 请在model中添加相关配置项，以及必要的注释，对应的事件可酌情添加
 * 另外在默认配置模型tableConfigModel中设置默认功能的开关，不常用的默认关闭，需要时单独配置打开覆盖
 * 添加后请先自行测试可用性，主要测试功能是否实现，将使用说明，注意事项写在配置文件中
 * 引入时引入压缩后的文件
 */
define(
    [
        'app',
        'text!./comp_table.html',
        './comp_table_model',
        'logHelper',
        'configs',
        'css!./comp_table.css',
        'css!./comp_table_theme_default.css',
        'bootstrap_table_locale',
        'css!bootstrap_tablecss',
        'bootstrap_table',
        'bootstrap_table_resizeable',
        'bootstrap_table_editable',
        'css!bootstrap_editablecss'
    ],
    function(app, template, model, log, config) {

        'use strict';

        app.CompTableComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-table',

            //列配置 必须
            columns: null,
            //数据 必须
            dataSource: null,
            //表格配置 选配
            tableConfig: null,
            //事件配置 选配
            eventConfig: null,

            //当前table的jQuery对象
            _$table: null,
            //填坑 表格页面不显示时fixed-table-container paddingbottom异常
            _isSetHeight: false,
            init: function() {
                this._super();
                if (config.language === 'zh') {
                    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);
                } else {
                    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['en-US']);
                }
            },
            didInsertElement: function() {
                this._$table = this.$('table.bs-table');
                this.initTable();
            },
            willDestroyElement: function() {
                if (this._$table) {
                    this.offTableEvent();
                    this.send('exeucteMethod', 'destroy');
                    this._$table = null;
                }
                this.set('columns', null);
                this.set('dataSource', null);
                this.set('tableConfig', null);
                this.set('eventConfig', null);
            },
            getTable: function() {
                return this._$table;
            },
            getOptions: function() {
                var config = {};
                if (Ember.isEmpty(this.columns)) {
                    return log.error('bootstrapTable,error:columns should not be empty');
                }
                $.extend(config, model.tableConfigModel.create(), this.tableConfig, {
                    columns: this.columns || [],
                    data: this.dataSource || []
                });
                // 有自定义文字时，更新到插件中
                $.extend($.fn.bootstrapTable.defaults, this.tableConfig && this.tableConfig.promptTextConfig);
                //
                if (config.height) {
                    this.set('_isSetHeight', true);
                } else {
                    this.set('_isSetHeight', false);
                }
                return config;
            },
            initTable: function() {
                this._$table.bootstrapTable(this.getOptions());
                this.initTableEvent();
                //解决页面加载完后拖拽不能用bug 原因执行colResizeable插件时表格为空
                this.resetView(500);
            },
            resetView: function(time) {
                Ember.run.later(this, function() {
                    if (this._$table) {
                        this.send('exeucteMethod', 'resetView');
                        this._$table.colResizable({
                            disable: true
                        });
                        this._$table.colResizable({
                            disable: !((this.tableConfig && this.tableConfig.resizable) || true),
                            liveDrag: (this.tableConfig && this.tableConfig.liveDrag) || false
                        });
                    }
                }, time);
            },
            //不会触发handleResize的调表格大小如模态框的最大化，请手动调用一次表格handleResize或者resetView方法
            handleResize: function() {
                this.resetView(0);
            },
            refreshOptions: Ember.observer('tableConfig', 'columns.[]', 'dataSource.[]', function() {
                Ember.run.once(this, function() {
                    var options;
                    if (this._$table) {
                        options = this.getOptions();
                        if (!Ember.isEmpty(options)) {
                            this.send('exeucteMethod', 'refreshOptions', this.getOptions());
                            this.resetView(0);
                        }
                    }
                });
            }),
            handleTableDataUpdate: function(result){
                this._$table.bootstrapTable('removeAll');
                this._$table.bootstrapTable('append',result);
            },
            selectPage: function(num){
                this._$table.bootstrapTable('selectPage',num);
            },
            refreshEvent: Ember.observer('eventConfig', function() {
                if (this._$table) {
                    this.offTableEvent();
                    this.initTableEvent();
                }
            }),
            initTableEvent: function() {
                var me = this,
                    eventName, item;
                if (Ember.isEmpty(this.eventConfig)) {
                    return;
                }
                for (item in this.eventConfig) {
                    if (this.eventConfig.hasOwnProperty(item) && this.eventConfig[item]) {
                        eventName = item.replace(/([A-Z])/g, function(a) {
                            return '-' + a.toLowerCase();
                        }) + '.bs.table';
                        if (typeof(this.eventConfig[item]) === 'function') {
                            this._$table.on(eventName, this.eventConfig[item]);
                        } else {
                            /* jshint -W083 */
                            this._$table.on(eventName, (function() {
                                //通过闭包保存eventName和item
                                var currentEventName = eventName,
                                    currentItem = item;
                                return function() {
                                    var args = [].slice.call(arguments, 0);
                                    args.unshift(currentItem + 'Result');
                                    me.sendAction.apply(me, args);
                                };
                            })());
                        }
                    }
                }
            },
            offTableEvent: function() {
                this._$table.off('.bs.table');
            },
            actions: {
                exeucteMethod: function() {
                    var args = [].slice.call(arguments, 0),
                        result;
                    if (this._$table) {
                        result = this._$table.bootstrapTable.apply(this._$table, args);
                        this.sendAction('exeucteResult', result, args);
                    }
                },
            }
        });
        //返回模型只引用一个文件即可
        return model;
    }
);