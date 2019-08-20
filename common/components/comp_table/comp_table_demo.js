define(
    [
        'app',
        'configs',
        'text!./comp_table_demo.html',
        './comp_table',
    ],
    function(app, configs, template, model) {

        'use strict';

        var testArr = [{
            test: '我放假',
            "name": "bootstrap-table",
            "stargazers_count": "526a",
            "forks_count": "122",
            "description": "An extended Bootstrap table with radio, checkbox, sort, pagination, and other added features. (supports twitter bootstrap v2 and v3)"
        }, {
            test: '啊啊',
            "name": "multiple-select",
            "stargazers_count": "288a",
            "forks_count": "150",
            "description": "A jQuery plugin to select multiple elements with checkboxes :)"
        }, {
            test: '餐',
            "name": "bootstrap-show-password",
            "stargazers_count": "32a",
            "forks_count": "11",
            "description": "Show/hide password plugin for twitter bootstrap."
        }, {
            test: '发',
            "name": "blog",
            "stargazers_count": "13a",
            "forks_count": "4",
            "description": "my blog"
        }, {
            test: '吧',
            "name": "scutech-redmine",
            "stargazers_count": "6a",
            "forks_count": "3",
            "description": "Redmine notification tools for chrome extension."
        }];
        var DbRowcolumns = [
            [{
                checkbox: true,
                colspan: 1,
                rowspan: 2,
            }, {
                width: 200,
                title: 'index',
                'class': 'boot',
                formatter: function(value, row, index) {
                    return index;
                },
                titleTooltip: "aaaa",
                align: 'center',
                valign: 'middle',
                colspan: 1,
                rowspan: 2,
            }, {
                field: 'name',
                title: 'name',
                align: 'center',
                sortable: true,
                valign: 'middle',
                formatter: function(value, row, index) {
                    return value;
                },
                order: 'desc',
                colspan: 1,
                rowspan: 2,
            }, {

                title: 'count',
                align: 'center',
                colspan: 2,
                rowspan: 1,
            }, {
                field: "description",
                title: '描述',
                align: 'center',
                sortable: true,
                colspan: 1,
                rowspan: 2,
            }, {
                field: 'test',
                title: '描述',
                align: 'center',
                sortable: true,
                colspan: 1,
                rowspan: 2,
            }],
            [{
                field: 'stargazers_count',
                title: 'stargazers',
                align: 'center',
                sortable: true,

            }, {
                field: "forks_count",
                'class': 'forks',
                title: 'forks',
                align: 'center',
                sortable: true,
                formatter: function(value, row, index) {
                    {
                        return '<i class="my-star glyphicon glyphicon-star"></i>' + value;
                    }
                },

            }],
        ];

        app.CompTableDemoComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-table-demo',

            output: '点击星星测试',

            init: function() {
                this._super();
                this.dataSource = testArr.concat(testArr).concat(testArr);
                var columns = [];
                for (var val in testArr[0]) {
                    if (val === 'forks_count') {
                        columns.push(model.columnsModel.create({
                            field: val,
                            title: val,
                            formatter: function(value, row, index) {
                                {
                                    return '<i class="my-star glyphicon glyphicon-star"></i>' + value;
                                }
                            },
                        }));
                    } else {
                        columns.push(model.columnsModel.create({
                            field: val,
                            title: val
                        }));
                    }

                }
                columns.unshift(model.columnsModel.create({
                    width: '200',
                    title: 'index',
                    'class': 'boot',
                    formatter: function(value, row, index) {
                        return index;
                    },
                }));
                columns.unshift(model.columnsModel.create({
                    checkbox: true,
                    sortable: false,
                }));
                this.columns = DbRowcolumns; //columns
                this.eventConfig = model.eventConfigModel.create({
                    clickCell: true,
                    dblClickCell: this.dbClickCallback.bind(this),
                });
                this.tableConfig = model.tableConfigModel.create({
                    pagination: true,
                    pageList: [10],
                    pageSize: 5,
                    resizeMode: 'overflow',
                });
            },
            didInsertElement: function() {},
            willDestroyElement: function() {

            },
            dbClickCallback: function() {
                if (this.$(event.target).is('.my-star')) {
                    //alert('dbl-my-star');
                    console.log(arguments);
                    this.set('output', 'dbclick - my - star\n');
                }
                console.log('dblClickCell');
                event.stopPropagation();
            },
            actions: {
                query: function() {
                    var a = this.childViews[0].send('exeucteMethod', 'getSelections');
                },
                exeucteResult: function(a, b) {
                    console.log(a);
                    if (b[0] === 'getSelections') {
                        this.set('output', ('selected rows---' + JSON.stringify(a, null, 10)).htmlSafe());
                    }
                },
                clickCellResult: function() {
                    if (this.$(event.target).is('.my-star')) {
                        //alert('click-my-star');
                        console.log(arguments);
                        this.set('output', 'click - my - star\n');
                    }
                    console.log('click');
                },
            }
        });
    }
);