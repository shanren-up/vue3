define(
    [
        'app',
        'text!./frame_download_tool.html',
        'frame/configures/config',
        'common/components/comp_table/comp_table',
        'css!./frame_download_tool.css',
        'css!./frame_download_tool_theme_default.css',
    ],

    function(app, template, frameConfig, tableModel) {

        "use strict";

        app.FrameDownloadToolComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'frame-download-tool',
            tableConfig: null,
            classNames: 'frame-download-tool',
            init: function() {
                this._super();
                this._initTable();
            },
            didInsertElement: function() {},
            willDestroyElement: function() {},
            _initTable: function() {
                var tableConfig = this._initTableData();
                tableConfig.eventConfig = this._initTableEvent();
                tableConfig.tableConfig = tableModel.tableConfigModel.create({
                    height: 320,
                });
                this.set('tableConfig', tableConfig);
            },
            _initDefaultColumns: function() {
                var download = Ember.oloc('frame_download_tool_download');
                return [tableModel.columnsModel.create({
                    width: 80,
                    sortable: false,
                    title: Ember.oloc('frame_download_tool_index'),
                    formatter: function(value, row, index) {
                        return index + 1;
                    }
                }), tableModel.columnsModel.create({
                    field: 'name',
                    width: 180,
                    title: Ember.oloc('frame_download_tool_name'),
                }), tableModel.columnsModel.create({
                    field: 'description',
                    title: Ember.oloc('frame_download_tool_description'),
                }), tableModel.columnsModel.create({
                    field: 'url',
                    width: 100,
                    title: Ember.oloc('frame_download_tool_action'),
                    formatter: function(value, row, index) {
                        return '<a href={0} download={1}>{2}</a>'.format(value, row.name, download);
                    }
                })];
            },
            _initTableData: function() {
                return {
                    columns: this._initDefaultColumns(),
                    dataSource: frameConfig.downloadConfig
                };
            },
            _initTableEvent: function() {
                return tableModel.eventConfigModel.create({
                    clickCell: this._tableClickCallback.bind(this),
                });
            },
            _tableClickCallback: function($e, field, value, row, $element) {
                if (event.target.dataset.action !== 'releaseNote') {
                    return;
                }
            },
            actions: {}
        });
    });