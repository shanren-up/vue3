define(
    [
        'app',
        'json!./cultureInfo.json',
        'text!./frame_version.html',
        'configs',
        'common/components/comp_table/comp_table',
        'comp_modal',
        'css!./frame_version.css',
        'css!./frame_version_theme_default.css',
        './frame_version_releasenote/frame_version_releasenote.js',
        './frame_historic_version/frame_historic_version'
    ],

    function(app, cultureInfo, template, config, tableModel, modal) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);

        app.FrameVersionComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'frame-version',
            systemInfo: null,
            tableConfig: null,
            alertTxt: '',
            bgImg: null,
            init: function() {
                this._super();
                this.systemInfo = [];
                require(['text!frame/version_info/system_info' + this._getLanguage() + '.ini'], function(systemInfo) {
                    this._initData(systemInfo);
                }.bind(this));
                // TODO 背景图要求与产品header背景图一致图 所以吧产品header的背景class加上
                this.set('bgClass', 'frame-header-bg-img-' + config.produceId);
            },
            didInsertElement: function() {},
            willDestroyElement: function() {},
            _getLanguage: function() {
                return config.language === 'zh' ? '' : ('_' + config.language);
            },
            _initData: function(systemInfo) {
                if (!systemInfo) {
                    return;
                }
                var model = Ember.Object.extend({
                        txt: '',
                        isVersion: false
                    }),
                    subProduceList;
                this.set('systemInfo', systemInfo.split('\n').map(function(item) {
                    if (!item) {
                        return;
                    }
                    if (item.indexOf(Ember.oloc('frame_version_jg')) !== -1) {
                        this.set('alertTxt', item);
                        return;
                    } else if (item.indexOf('produce') !== -1) {
                        subProduceList = item;
                        return;
                    }
                    return model.create({
                        txt: item,
                        isVersion: item.indexOf(Ember.oloc('frame_version_bb')) !== -1
                    });
                }, this).filter(function(item) {
                    return item !== undefined;
                }));
                this._initSubProduce(subProduceList);
            },
            _initSubProduce: function(str) {
                str = str.slice(str.indexOf('[') + 1, str.indexOf(']'));
                var promiseList = str.split(',').map(function(prdName) {
                    return new Ember.RSVP.Promise(function(resolve, reject) {
                        require(['text!frame/version_info/' + prdName + this._getLanguage() + '.ini'], function(info) {
                            resolve(info);
                        });
                    }.bind(this));
                }, this);
                Ember.RSVP.allSettled(promiseList).then(function(datas) {
                    var subPrdInfoList = datas.filterBy('state', 'fulfilled').getEach('value');
                    this._initTable(subPrdInfoList);
                }.bind(this));
            },
            _initTable: function(subPrdInfoList) {
                var tableConfig = this._initTableData(subPrdInfoList);
                tableConfig.eventConfig = this._initTableEvent();
                tableConfig.tableConfig = tableModel.tableConfigModel.create({
                    height: 220,
                });
                this.set('tableConfig', tableConfig);
            },
            _initDefaultColumns: function() {
                var columns = [];
                var title = [Ember.oloc('frame_version_mc'), Ember.oloc('frame_version_dqbb'), Ember.oloc('frame_version_fbrq'), Ember.oloc('frame_version_ylkjbb'), 'java' + Ember.oloc('frame_version_fwbb')];
                var ename = ['name', 'version', 'date', 'frameVerison', 'javaVersion'];
                return title.map(function(item, i) {
                    return tableModel.columnsModel.create({
                        field: ename[i],
                        title: item,
                    });
                });
            },
            _initTableData: function(subPrdInfoList) {
                var columns = this._initDefaultColumns(),
                    dataSource = [];
                subPrdInfoList.forEach(function(item) {
                    var dataItem = {},
                        index = item.indexOf('ReleaseNote');
                    item.slice(0, index).split('\n').forEach(function(row, i) {
                        var title = row.split('=')[0].trim(),
                            value = row.split('=')[1] && row.split('=')[1].trim(),
                            columnItem = columns.findBy('title', title);
                        if (!title || !value) {
                            return;
                        }
                        if (columnItem) {
                            dataItem[columnItem.field] = value;
                        } else {
                            columns.push(tableModel.columnsModel.create({
                                field: 'add' + i,
                                title: title,
                            }));
                            dataItem['add' + i] = value;
                        }
                    });
                    dataItem.releaseNote = item.slice(index);
                    dataSource.push(dataItem);
                });
                columns.push(tableModel.columnsModel.create({
                    field: 'releaseNote',
                    title: Ember.oloc('frame_version_gxrz'),
                    width: 140,
                    formatter: function(value, row, index) {
                        return '<a class="release-note" data-action="releaseNote" role="button">' +
                            row.name + 'ReleaseNote</a>';
                    }
                }));
                return {
                    columns: columns,
                    dataSource: dataSource
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
                modal.popup({
                    targetObject: this, //父对象，支持弹出多层
                    hasMax: false,
                    hasPhoto: false,
                    isDefaultStyle: true, //是否默认样式
                    sizeClass: 'frame-version-releasenote-size', //弹出框大小:large、small，或自定义整体样式
                    //headerClass: 'frame-version-releasenote-modal-header', //自定义头部样式,
                    //bodyClass: 'frame-version-releasenote-modal-body', //自定义内容样式
                    hasHeader: true, //是否有头部，默认true
                    headerText: row.name + 'ReleaseNote', //头部标题名称
                    contentComponentName: 'frame-version-releasenote',
                    parameters: {
                        msg: value
                    }
                });
            },
            actions: {
                historicVersion: function() {
                    modal.popup({
                        hasMax: false,
                        hasPhoto: false,
                        targetObject: this, //父对象，支持弹出多层
                        isDefaultStyle: true, //是否默认样式
                        sizeClass: 'frame-historic-version-size', //弹出框大小:large、small，或自定义整体样式
                        //headerClass: 'frame-historic-version-header', //自定义头部样式,
                        //bodyClass: 'frame-historic-version-body', //自定义内容样式
                        hasHeader: true, //是否有头部，默认true
                        headerText: Ember.oloc('frame_version_lsbb'), //头部标题名称
                        contentComponentName: 'frame-historic-version',
                        max: function() {
                            this.findNames();
                            this.childs.frameHistoricVersion.showView();
                        }
                    });
                }
            }
        });
    });