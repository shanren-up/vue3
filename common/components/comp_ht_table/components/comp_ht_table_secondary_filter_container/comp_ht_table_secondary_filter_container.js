define(
    [
        'app',
        'json!./cultureInfo.json',
        'text!./comp_ht_table_secondary_filter_container.html',
        'css!./comp_ht_table_secondary_filter_container.css',
        // 'common/components/comp_alarmwindow/comp_alarmwindow_controls/comp_alarmwindow_controls_popover.js'
    ],
    function(app, cultureInfo, template) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);

        app.CompHtTableSecondaryFilterContainerComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: "comp-ht-table-secondary-filter-container",
            name: 'filterWindow',
            filterItems: null,
            currentFieldName: '',
            ownerControl: null,
            searchText: null,
            //初始化
            init: function() {
                this._super();
                this._initData();
            },
            _initData: function() {
                this.searchText = '';
                this.filterItems = [];
                this.set('ownerControl', Ember.get(this.parameters, 'ownerControl'));
                this.set('currentFieldName', Ember.get(this.parameters, 'fieldName'));
                this.set('filterItems', Ember.get(this.parameters, 'filterItems'));
                this.set('allFilterItems', Ember.get(this.parameters, 'filterItems'));
            },

            didInsertElement: function() {
                var existFilterValues = Ember.get(this.parameters, 'existFilterValues');
                if (existFilterValues) {
                    var existFilterValuesArray = existFilterValues.split(',');
                    existFilterValuesArray.forEach(function(filterValue, index) {
                            var filterItem = this.allFilterItems.find(function(allFilterItem, index) {
                                    // TODO 先默认只处理字符串
                                    // if (Ember.get(allFilterItem, 'id') === -9999) {
                                        //非字典值
                                        return filterValue === Ember.get(allFilterItem, 'text').toString();
                                    // } else {
                                    //     return filterValue === Ember.get(allFilterItem, 'id').toString();
                                    // }
                                }
                                .bind(this));
                            if (filterItem) {
                                Ember.set(filterItem, 'isChecked', true);
                            }
                        }
                        .bind(this));
                }
            },
            willDestroyElement: function() {},
            actions: {
                ascCommand: function() {
                    var sortItems = this.filterItems.sortBy('id');
                    this.set('filterItems', Ember.A());
                    this.set('filterItems', sortItems);
                },
                descCommand: function() {
                    var sortItems = this.filterItems.sortBy('id');
                    var sortItemsReverse = sortItems.reverse();
                    this.set('filterItems', Ember.A());
                    this.set('filterItems', sortItemsReverse);
                },
                okCommand: function() {
                    //todo修改操作
                    this.sendAction('sendConfirm');
                },
                clearCommand: function() {
                    this.filterItems.forEach(function(item, index) {
                            Ember.set(item, 'isChecked', false);
                        }
                        .bind(this));
                    Ember.set(this, 'searchText', '');
                    Ember.set(this, 'filterItems', this.allFilterItems);
                },
                cancelCommand: function() {
                    this.sendAction('sendClose');
                },
                updateSearchText: function() {
                    var txt = this.searchText.toLowerCase();
                    var result = this.allFilterItems.filter(function(item, index, self) {
                            if (item.text.indexOf(txt) >= 0 || Ember.ExtendHelper.pinyin.getFullChars(item.text).toLowerCase().indexOf(txt) >= 0 || Ember.ExtendHelper.pinyin.getCamelChars(item.text).toLowerCase().indexOf(txt) >= 0) {
                                return item;
                            }
                        }
                        .bind(this));
                    this.set('filterItems', result);
                }
            },
        });
    });
