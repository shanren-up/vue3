define(
    [
        'app',
        'css!./comp_data_table.css',
    ],
    function(app) {
        "use strict";
        app.CompDataTableComponent = Ember.Component.extend({
            //不可修改成员
            templateName: "comp-data-table",
            tagName: 'table',
            classNames: ['dataTable', 'table', 'table-striped', 'table-bordered', 'table-condensed', 'display'],
            classNameBindings: ['customClass'],
            attributeBindings: ['cellspacing'],
            //初始化
            init: function() {
                this._super();
                //设置默认值
                $.extend($.fn.dataTable.defaults, {
                    searching: false,
                    paging: false,
                    ordering: true,
                    info: false,
                    autoWidth: false,
                    orderClasses: false
                });
            },
            didInsertElement: function() {

            },
            willDestroyElement: function() {
                this.destroy();
            },
            handleResize: function(width, height) {
                this._refresh();
            },
            _initDatatable: function() {
                Ember.run.later(this, function() {
                    if(!this.$()) {
                        return;
                    }

                    var configObject = {};
                    configObject['columns'] = this.columns;
                    configObject['data'] = this.datasource;
                    configObject['paging'] = this.paging;
                    configObject['ordering'] = this.ordering;
                    configObject['destroy'] = true;
                    if(this.scrollX) {
                        configObject['scrollX'] = this.scrollX;
                    }
                    if(this.scrollY) {
                        configObject['scrollY'] = this.scrollY;
                    }
                    if(this.scrollX || this.scrollY) {
                        configObject['scrollCollapse'] = false;
                    } else {
                        configObject['scrollCollapse'] = true;
                    }
                    configObject['lengthMenu'] = this.lengthMenu;
                    configObject['searching'] = this.searching;
                    configObject['pageLength'] = this.pageLength;
                    configObject['order'] = this.order;
                    configObject['info'] = this.info;
                    configObject['select'] = true;
                    var table = this.$().DataTable(configObject);
                    this._initEventHandlers(table);
                    return table;
                }, 500);
            },

            _getDataTable: function() {
                //判断是否重复
                if($.fn.dataTable.isDataTable('table')) {
                    return $('table').DataTable();
                } else {
                    return this._initDatatable();
                }
            },
            //字段
            //属性
            height: '',
            width: '',
            columns: [],
            datasource: [],
            //          "order": [[ 3, "desc" ]]
            order: [],
            //自定义样式
            customClass: 'default-style',
            cellspacing: 0,
            _refresh: Ember.observer('columns', 'datasource', 'order', function() {
                if(this.columns.length > 0 && this.datasource.length > 0) {
                    Ember.run.once(this, '_initDatatable');
                }
            }),
            hasFooter: false,
            paging: false,
            ordering: true,
            //分页控件属性
            lengthMenu: [10, 25, 50],
            //x轴和y轴的滚动条
            scrollX: true,
            scrollY: false,
            searching: false,
            pageLength: 20,
            info: false,
            //方法
            clear: function() {
                var table = this._getDataTable();
                if(table) {
                    return table.clear();
                }
            },
            getdata: function() {
                var table = this._getDataTable();
                if(table) {
                    return table.data();
                }
            },
            destroy: function() {
                var table = this._getDataTable();
                if(table) {
                    return table.destroy();
                }
            },
            //parameter like [ 1, 'asc' ], [ 2, 'asc' ] 
            orderFields: function(fields) {
                var table = this._getDataTable();
                if(table) {
                    var para = fields ? fields : '';
                    return table.order(para).draw();
                }
            },
            search: function() {
                var table = this._getDataTable();
                if(table) {
                    return table.search();
                }
            },
            settings: function() {
                var table = this._getDataTable();
                if(table) {
                    return table.settings();
                }
            },
            //事件
            _initEventHandlers: function(dataTable) {
                dataTable.off('select');
                dataTable.on('select', function(e, dt, items, indexes) {
                        Ember.run(this, function() {
                            var rowdata = dataTable.rows(indexes).data().toArray();
                            this.sendAction('selectItemChanged', {
                                e: e,
                                dt: dt,
                                items: items,
                                rowdata: rowdata
                            });
                        });
                    }
                    .bind(this));
            }
        });
    }
);