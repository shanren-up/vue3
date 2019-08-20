define(
    [
        'logHelper'
    ],
    function(log) {

        'use strict';

        var xlsx = Ember.Object.extend({
            worker: null,
            isBusy: false,
            init: function() {
                this.worker = new Worker('common/core/xlsx/com_core_parser_xlsx_worker.js');
            },
            willDestroy: function() {
                this.worker.onmessage = null;
                if (this.worker) {
                    this.worker.terminate();
                    this.worker = null;
                }
            },
            ab2str: function(data) {
                var o = "",
                    l = 0,
                    w = 10240;
                for (; l < data.byteLength / w; ++l) {
                    o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w, l * w + w)));
                }
                o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w)));
                return o;
            },
            parseData: function(data) {
                //console.time('xlsx');
                if (this.isBusy) {
                    return new Ember.RSVP.Promise(function(resolve, reject) {
                        reject('busy');
                    });
                }
                this.isBusy = true;
                return new Ember.RSVP.Promise(function(resolve, reject) {
                    this.worker.onmessage = function(e) {
                        switch (e.data.title) {
                            case 'ready':
                                break;
                            case 'error':
                                log.error('imp.core.parseXlsxError:{0}', e.data.detail);
                                reject(e.data.detail);
                                break;
                            case 'done':
                                //resolve(JSON.parse(this.ab2str(e.data).replace(/\n/g, "\\n").replace(/\r/g, "\\r")));
                                //console.timeEnd('xlsx');
                                this.isBusy = false;
                                resolve(JSON.parse(e.data.detail));
                                break;
                        }
                    }.bind(this);
                    this.worker.postMessage(data);
                }.bind(this));
            }
        });
        return xlsx.create();
    }
);

/*使用说明
 * fileChange为input type=file的change事件处理函数
 * 拖动excel文件时事件data也可以转换
 * define(
    [
        'app',
        'configs',
        'text!./imp_experience_lib_manage_view.html',
        'plugin/imp/common/core/xlsx/imp_core_parser_xlsx',
        'css!./imp_experience_lib_manage_view.css'
    ],
    function(app, configs, template, xlsx) {

        'use strict';

        app.ImpExperienceLibManageViewComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'imp-experience-lib-manage-view',
            init: function() {
                this._super();
            },
            didInsertElement: function() {},
            willDestroyElement: function() {
                this._super();
            },
            fileOnload: function() {
                var data = event.target.result;
                xlsx.parseData(data).then(function(obj) {
                    console.log(obj);
                }, function(reason) {
                    console.log(reason);
                });
            },
            actions: {
                fileChange: function() {
                    var files = event.target.files,
                        f = files[0],
                        reader = new FileReader(),
                        name = f.name;
                    reader.onload = this.fileOnload.bind(this);
                    reader.readAsArrayBuffer(f);
                },
                handleDrop：function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    var files = e.dataTransfer.files;
                    var f = files[0];
                    {
                        var reader = new FileReader();
                        var name = f.name;
                        reader.onload = this.fileOnload.bind(this);
                    }
                }
            }
        });
    });
 *
 *
 *
 *
 *
 *
 */
