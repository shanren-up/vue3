define(
    [
        'app',
        'text!./frame_historic_version.html',
        'configs',
        'common/components/comp_table/comp_table',
        'css!./frame_historic_version.css',
        'css!./frame_historic_version_theme_default.css'
    ],

    function(app, template, config, tableModel) {

        'use strict';

        app.FrameHistoricVersionComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: "frame-historic-version",
            tableConfig: null,
            name: "frameHistoricVersion",
            init: function() {
                this._super();
                require(['json!frame/version_info/historic_version' + this._getLanguage() + '.json'], function(historicVersion) {
                    this._initTable(historicVersion);
                }.bind(this));
            },
            didInsertElement: function() {},
            willDestroyElement: function() {},
            _getLanguage: function() {
                return config.language === 'zh' ? '' : ('_' + config.language);
            },
            showView: function() {
                this.findNames();
                this.childs.histroicVersionTable.refreshOptions();
            },
            _initTable: function(historicVersion) {
                var tableConfig = {};
                tableConfig.columns = this._initColumns(historicVersion.findBy('type', 'title'));
                tableConfig.dataSource = historicVersion.filterBy('type', undefined);
                tableConfig.tableConfig = tableModel.tableConfigModel.create({
                    height: 500,
                });
                this.set('tableConfig', tableConfig);
            },
            _initColumns: function(titleObj) {
                var columns = [],
                    column;
                var exception = ['note', 'type'];
                for (var key in titleObj) {
                    if (titleObj.hasOwnProperty(key) && !exception.includes(key)) {
                        column = tableModel.columnsModel.create({
                            field: key,
                            title: titleObj[key],
                        });
                        if (key === "scope" || key === "revisionRecord") {
                            column.width = (key === 'revisionRecord') ? 310 : 180;
                            column.formatter = function(value, row, index) {
                                return value.join('<br/>');
                            };
                        }
                        columns.push(column);
                    }
                }
                return columns;
            },
        });
    }
);