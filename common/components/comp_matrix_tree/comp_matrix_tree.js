define(
    [
        'app',
        'json!common/components/comp_matrix_tree/cultureInfo.json',
        'text!./common/components/comp_matrix_tree/comp_matrix_tree.html',
        'text!./common/components/comp_matrix_tree/comp_matrix_tree_item.html',
        'css!./common/components/comp_matrix_tree/comp_matrix_tree.css',
        'ember_collection'
    ],

    function(app, cultureInfo, template, itemTemplate) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);

        var Person = Ember.Object.extend({
            shoppingList: ['eggs', 'cheese']
        });

        var test = Person.create({
            name: 'Stefan Penner',
            addItem: function() {
                this.get('shoppingList').pushObject('bacon');
            }
        });
        test.addItem();

        var test1 = Person.create({
            name: 'Robert Jackson',
            addItem: function() {
                this.get('shoppingList').pushObject('sausage');
            }
        });
        test1.addItem();

        var MatrixTreeItem = Ember.Object.extend({
            name: Ember.computed('text', function() {
                var text = this.get('text');
                return text.length > 6 ? text.substring(0, 6) + "..." : text;
            }),
            id: "",
            childs: [],
            alarmSeverity: 5,
            hasChild: Ember.computed('', function() {
                return this.get('childs.0.childs').length !== 0;
            }),
            init: function() {
                this.childs = [];
                this._super();
            }
        });

        var i = 0;
        var itemsSource = [];
        while (i < 1) {
            var item = new MatrixTreeItem({
                text: i,
                id: i,
                childs: []
            });
            itemsSource.pushObject(item);
            var y = 0;
            while (y < 1) {
                var yitem = new MatrixTreeItem({
                    text: i.toString() + '_' + y.toString(),
                    childs: []
                });
                item.childs.push(yitem);

                var z = 0;
                while (z < 2) {
                    var zitem = MatrixTreeItem.create({
                        text: i.toString() + '_' + y.toString() + '_' + z.toString(),
                        childs: []
                    });
                    yitem.childs.push(zitem);
                    z++;
                    var zz = 0;
                    while (zz < 17) {
                        var zzitem = MatrixTreeItem.create({
                            text: i.toString() + '_' + y.toString() + '_' + z.toString() + '_' + zz.toString(),
                            childs: []
                        });
                        zitem.childs.push(zzitem);
                        zz++;
                        var zzz = 0;
                        var zzzLength = parseInt(Math.random(1, 2) * 10, 10) + 1;
                        while (zzz < 0) {
                            var zzzitem = MatrixTreeItem.create({
                                text: i.toString() + '_' + y.toString() + '_' + z.toString() + '_' + zz.toString() + '_' + zzz.toString(),
                                childs: []
                            });
                            zzitem.childs.push(zzzitem);
                            zzz++;
                        }
                    }
                }
                y++;
            }

            i++;
        }

        app.CompMatrixTreeItemComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(itemTemplate),
            extend: false,
            height: 0,
            alarmNeIds: [],
            init: function() {
                //level 表示层级，单页面出发re render的时候level时都后变成0，so 保存到index中；
                this.level++;
                this.index = this.level;
                this._super();
            },
            matrixCellItemStyle: Ember.computed('matrixCellWidth', function() {
                var width = this.get('matrixCellWidth');
                var height = this.get('matrixCellHeight');
                return new Ember.String.htmlSafe("width:" + width + 'px;' + 'height:' + height + 'px;line-height:' + height + 'px');
            }),
            matrixParentItemStyle: Ember.computed('matrixCellWidth', function() {
                var width = this.get('matrixCellWidth');
                return new Ember.String.htmlSafe("width:" + width + 'px;');
            }),
            matrixCellContainerWidthStyle: Ember.computed('extend', 'filterAlarmSeverityId', 'alarmNeIds', function() {
                var width = this.getContainerWidth(this.index);
                var height = this.getContainerHeight() === 0 ? 0 : this.getContainerHeight() + 2;
                var matrixCellWidth = this.get('matrixCellWidth');
                return new Ember.String.htmlSafe('width:' + width + 'px;position: relative;height:' + height + 'px;left:' + matrixCellWidth + 'px;');
            }),
            extendChanged: Ember.observer('extend', 'filterAlarmSeverityId', 'alarmNeIds', function() {
                this.freshHeight();
            }),
            matrixParentContainerWidthStyle: Ember.computed(function() {
                var width = this.getContainerWidth(this.index);
                return new Ember.String.htmlSafe('width:' + width + 'px;');
            }),
            getContainerWidth: function(index) {
                return this.get('matrixWidth') - (this.get('matrixCellWidth') + 4) * (index);
            },
            getContainerHeight: function() {
                var childsRowCount = this.getChildsRowCount();
                var height = childsRowCount * this.get('matrixCellHeight');
                height = height > 800 ? 800 : height;
                return height;
            },
            getChildsCountOneRow: function() {
                var childCount = (this.getContainerWidth(this.index)) / this.get('matrixCellWidth');
                return parseInt(childCount, 10);
            },
            getChildsRowCount: function() {
                var childsCountOneRow = this.getChildsCountOneRow();
                var childsLengh = this.filterItemsSourceChilds().length;
                var childsRowCount = (parseInt(childsLengh / childsCountOneRow, 10)) + (childsLengh % childsCountOneRow === 0 ? 0 : 1);
                return childsRowCount;
            },
            filterByNeList: function(alarmNeIds) {
                this.set('alarmNeIds', alarmNeIds);
            },
            itemsSourceChilds: Ember.computed('itemsSource.childs.@each.alarmSeverity', 'extend', 'filterAlarmSeverityId', 'alarmNeIds', function() {
                return this.filterItemsSourceChilds();
            }),
            filterItemsSourceChilds: function() {

                var result = this.get('itemsSource.childs');

                var neIds = this.get('alarmNeIds');
                if (neIds && neIds.length > 0) {
                    result = result.filter(function(item) {
                        return neIds.indexOf(item.id) !== -1;
                    });
                }
                var oneRowChildsLenght = this.getChildsCountOneRow();

                if (result.length > oneRowChildsLenght) {
                    if (!this.get('extend')) {

                        result = result.slice(0, oneRowChildsLenght - 1);

                        result.push(MatrixTreeItem.create({
                            text: Ember.oloc('comp_matrix_tree_zk'),
                            name: '',
                            childs: [],
                            isToggle: true,
                            className: this.toggleOpenStyle //'matrix-item-child-toggle-open'
                        }));
                    } else {
                        var tempresult = result.findBy('text', Ember.oloc('comp_matrix_tree_sq'));
                        if (!tempresult) {
                            result.push(MatrixTreeItem.create({
                                text: Ember.oloc('comp_matrix_tree_sq'),
                                name: '',
                                childs: [],
                                isToggle: true,
                                className: this.toggleCloseStyle //'matrix-item-child-toggle-close'
                            }));
                        }
                    }
                }
                return result;
            },
            classNames: ['matrix-container'],
            didInsertElement: function() {
                this.freshHeight();
            },
            freshHeight: function() {
                if (!this.hasChild()) {
                    var height = this.getContainerHeight();
                    this.freshParentHeigh(height);
                    this.set('height', height);

                    this.sendAction("refreshHeight");
                }
            },
            freshParentHeigh: function(height) {
                if (height) {
                    this.$('.matrix-parent:eq(0)').height(height);
                    this.$('.matrix-parent:eq(0)').css("line-height", height + 'px');
                    this.$('.matrix-parent:eq(0)').css("display", "block");

                    this.$('.matrix-parent:eq(0)').parent().css("display", "block");
                } else {
                    this.$('.matrix-parent:eq(0)').parent().css("display", "none");
                }
            },
            freshExtend: function(state) {
                if (this.hasChild()) {
                    this.childViews.forEach(function(child) {
                        child.freshExtend(state);
                    });
                } else {
                    this.set('extend', state);
                }

            },
            didRender: function() {
                var self = this;
                Ember.run.scheduleOnce('afterRender', function() {
                    var test = self;
                });
            },
            willRender: function() {
                //console.log(this.index);
            },
            hasChild: function() {
                return this.itemsSource.get('hasChild');
            },
            actions: {
                refreshHeight: function() {
                    var height = this.childViews.length;

                    this.childViews.forEach(function(item) {
                        height += item.height;
                    });
                    this.set('height', height);
                    this.freshParentHeigh(height);
                    this.sendAction("refreshHeight", height);
                },
                itemClick: function(item) {
                    if (item.get('isToggle')) {
                        this.set('extend', !this.get('extend'));
                    } else {
                        this.sendAction('itemClick', item, event);
                    }
                },
                itemDoubleClick: function(item) {
                    this.sendAction('itemDoubleClick', item, event);
                },
            }
        });

        app.CompMatrixTreeComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            matrixWidthStyle: Ember.computed('matrixWidth', function() {
                var matrixWidth = this.get('matrixWidth');
                var matrixHeight = this.get('matrixHeight');
                return new Ember.String.htmlSafe("float: left;width:" + matrixWidth + "px;height:" + matrixHeight + "px");
            }),
            matrixWidth: 1500,
            matrixHeight: 700,
            matrixCellWidth: 100,
            matrixCellHeight: 32,
            matrixItemParentStyle: "matrix-item-parent",
            matrixItemStyle: "matrix-item-child",
            matrixCellContainerStyle: "",
            toggleOpenStyle: "matrix-item-child-toggle-open",
            toggleCloseStyle: "matrix-item-child-toggle-close",
            extend: false,
            filterAlarmSeverityId: 0,
            init: function() {
                //this.itemsSource = itemsSource;
                this._super();
            },
            didInsertElement: function() {},
            freshExtend: function(state) {
                this.childViews.forEach(function(child) {
                    child.freshExtend(state);
                });
            },
            filterByNeList: function(alarmNeIds) {
                this.childViews.forEach(function(child) {
                    child.filterByNeList(alarmNeIds);
                });
            },
            actions: {
                matrixItemClick: function(item, event) {
                    if (event.button === 0) {
                        this.sendAction('matrixItemClick', item);
                    } else if (event.button === 2) {
                        this.sendAction('matrixItemRightClick', item);
                    }
                },
                matrixItemDoubleClick: function(item, event) {
                    this.sendAction('matrixItemDoubleClick', item);
                },
            }
        });

        return MatrixTreeItem;

    });