define(
    [
        'app',
        './comp_ht_table.js',
        './comp_ht_table_helper.js'
    ],

    function(app, tableModel, helper) {

        'use strict';

        app.CompHtTableDemoComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx('<div>{{comp-ht-table name="htTable" columns=columns dataSouce=htData rowClicked="rowClicked"}}</div>'),
            templateName: 'comp-ht-table-demo',
            columns: null,
            htData: null,
            init: function() {
                this._super();
                this.columns = [];
                this.htData = [];
                Ember.run.later(this, function() {
                    this._initColumns();
                    this._initData();
                }, 500);
            },
            didInsertElement: function() {
                this.findNames();
            },
            willDestroyElement: function() {
                this.columns.clear();
                this.htData.clear();
            },
            _initColumns: function() {
                var columns = [];
                var firstColumn = this.childs.htTable.treeTableView.getTreeColumn();
                firstColumn.setDisplayName('');
                firstColumn.setAlign('center');
                firstColumn.setWidth(50);
                firstColumn.drawCell = function(g, data, selected, column, x, y, width, height, view) {
                    var indent = view._indent;
                    var level = view._levelMap[data._id];
                    var iconWidth = view.getIconWidth(data);
                    var toggleIcon = ht.Default.getImage(view.getToggleIcon(data));
                    if (toggleIcon) {
                        x += indent * level;
                        ht.Default.drawCenterImage(g, toggleIcon, x + indent / 2, y + height / 2, data, view);
                        x += indent;
                    } else {
                        x += indent * (level + 1);
                    }
                    view.drawLabel(g, data, x, y, height);
                };
                columns.push(firstColumn);
                columns.push(tableModel.columnModel.create({
                        name: 'index',
                        displayName: 'Index',
                        accessType: 'attr',
                        align: 'center',
                        drawCell: function(g, data, selected, column, x, y, w, h, view) {
                            var color, index = data.a('index');
                            switch (index) {
                                case index > 10:
                                    g.fillStyle = '#F00';
                                    break;
                                case index > 20:
                                    g.fillStyle = '#FF0';
                                    break;
                                default:
                                    g.fillStyle = '#008000';
                            }
                            g.fillRect(x, y, w, h);
                            color = selected ? '#FFF' : '#000';
                            ht.Default.drawText(g, index, ht.Default.labelFont, color, x, y, w, h, 'center');
                        }
                    }),
                    tableModel.columnModel.create({
                        name: 'nation',
                        displayName: 'Nation',
                        accessType: 'attr',
                        align: 'center',
                        drawCell: function(g, data, selected, column, x, y, w, h, view) {
                            var image = ht.Default.getImage('common/components/comp_ht_table/img/' + data.a('nation')); //data.a('nation'
                            ht.Default.drawStretchImage(g, image, 'centerUniform', x, y, w, h);
                        }

                    }),
                    tableModel.columnModel.create({
                        name: 'sex',
                        displayName: 'Sex',
                        accessType: 'attr',
                        align: 'center',
                        drawCell: function(g, data, selected, column, x, y, w, h, view) {
                            var image = ht.Default.getImage('common/components/comp_ht_table/img/' + data.a('sex'));
                            ht.Default.drawStretchImage(g, image, 'centerUniform', x, y, w, h);
                        }
                    }), tableModel.columnModel.create({
                        name: 'index',
                        displayName: 'Index',
                        accessType: 'attr',
                        align: 'center',
                        drawCell: function(g, data, selected, column, x, y, w, h, view) {
                            var color, index = data.a('index'),
                                a = document.createElement('a');
                            
                            a.innerHTML = index + 10000;
                            a.style.whiteSpace = 'nowrap';
                            a.style.font = ht.Default.labelFont;
                            a.onParentAdded = function(div) {
                                div.style.lineHeight = h + 'px';
                                div.style.verticalAlign = 'middle';
                                div.style.textAlign = 'center';
                                div.style.overflow = 'hidden';
                                div.style.textOverflow = 'ellipsis';
                            };
                            return a;
                        }
                    }));
                this.set('columns', columns);
                this.childs.htTable.setTableColumns(columns);
            },
            _initData: function() {
                var nations = ['uk', 'usa', 'mexico'],
                    sexs = ['man', 'woman'],
                    data = [];
                for (var i = 0; i < 30; i++) {
                    data.push({
                        name: Math.random(),
                        index: i,
                        sex: sexs[Math.floor(Math.random() + 0.5)] + '.png',
                        nation: nations[Math.floor(Math.random() * 3)] + '.png'
                    });
                }
                data.setEach('children', {
                    name: Math.random(),
                    index: i,
                    sex: sexs[Math.floor(Math.random() + 0.5)] + '.png',
                    nation: nations[Math.floor(Math.random() * 3)] + '.png'
                });
                this.set('htData', helper.coverData(data, 'index', 'attr'));
                this.childs.htTable.setTableData(this.htData);

            },
            actions: {
                rowClicked: function(data, column, event) {
                    console.log(data.a('index'), column && column.getName());
                },
            }
        });
    });
