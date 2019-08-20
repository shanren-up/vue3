define(
    [
        'app',
        'text!./comp_file_list.html',
        '../../common/services/process-data-service',
        'common/components/comp_msgbox/comp_msgbox',
        'json!./../../config/properties.json',
        'css!./comp_file_list.css'
    ],
    function (app, template, dataService, msgBox, proConfig) {

        "use strict";

        app.CompFileListComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-file-list',
            dataAdaptor: null,
            messageBox: null,
            curNode: null,
            //文件图片列表
            imgMap: {
                folder: 'plugin/PSMS/img/file_explore/folder.png',
                jpg: 'plugin/PSMS/img/file_explore/img.png',
                xml: 'plugin/PSMS/img/file_explore/xml.png',
                tif: 'plugin/PSMS/img/file_explore/tiff.png',
                tiff: 'plugin/PSMS/img/file_explore/tiff.png',
                unknown: 'plugin/PSMS/img/file_explore/unknown.png',
            },
            //路径
            pathValue: null,
            curTabName: undefined,
            //视图切换，是否显示列表
            showList: true,
            init: function () {
                this._super();
                if (this.parameters && this.parameters.path) {
                    this.set('pathValue', this.parameters.path);
                }
                if (this.parameters && this.parameters.curTabName) {
                    this.set('curTabName', this.parameters.curTabName);
                }
                this.messageBox = msgBox.create();
                this.dataAdaptor = dataService.create();
                this._initPathData(this.pathValue);
            },
            didInsertElement: function () {
                this.findNames();
            },
            willDestroyElement: function () {
                if (this.messageBox) {
                    this.messageBox = null;
                }
                if (this.dataAdaptor) {
                    this.dataAdaptor.destroy();
                    this.dataAdaptor = null;
                }
            },
            _handleResult: function (result) {
                if (!result.length) {
                    return;
                }
                var nodes = [];
                result.forEach(function (item, index) {
                    if (this.curTabName === 'VRSS2-CA' && item.indexOf('.') !== -1) {
                        var index = item.lastIndexOf('.');
                        var fileType = item.substring(index);
                        if (fileType.toLowerCase() !== '.raw') {
                            return
                        }
                    }
                    if (this.curTabName === 'VRSS2-PRODUCT' && item.indexOf('.') !== -1) {
                        var index = item.lastIndexOf('.');
                        var fileType = item.substring(index);
                        if (fileType.toLowerCase() !== '.xml') {
                            return
                        }
                    }
                    nodes.push({
                        "name": item,
                        "nameStr": this.pathValue + '/' + item,
                        "parentId": this.pathValue,
                        "src": this._handleFileType(item)
                    });
                }.bind(this));
                this.set('dataSource', nodes);
            },
            /**
             *  服务请求目录数据
             * @param dirStr
             * @private
             */
            _initPathData: function (dirStr) {
                var index = dirStr.lastIndexOf('/');
                var parentId = dirStr.substring(0, index);
                var node = {
                    "name": dirStr,
                    "nameStr": dirStr,
                    "parentId": parentId,
                    "src": this.imgMap.folder
                };
                this.set('curNode', node);
                var param = {
                    filePath: dirStr
                };
                this.dataAdaptor.getRestfulData(param, 'fileConfigDir', function (result) {
                    if (result) {
                        this._handleResult(result);
                    }
                }.bind(this));
            },
            /**
             * 判断文件夹还是文件
             * @param fileName
             * @returns {string}
             * @private
             */
            _handleFileType: function (fileName) {
                var fileType = ['xml', 'raw', 'data', 'jpg', 'tif', 'tiff'];
                var index = fileName.lastIndexOf('.');
                var imgUrl = '';
                if (index > -1) {
                    var str = fileName.substring(index + 1);
                    for (var i = 0; i < fileType.length; i++) {
                        if (fileType[i] == str) {
                            imgUrl = this.imgMap[str];
                        }
                    }
                    if (imgUrl === '') {
                        imgUrl = this.imgMap['unknown'];
                    }
                } else {
                    imgUrl = this.imgMap['folder'];
                }
                return imgUrl;
            },
            actions: {
                /**
                 * 返回上一级
                 */
                backToParent: function () {
                    if (this.curNode && this.curNode.parentId) {
                        this.set('pathValue', this.curNode.parentId);
                        this._initPathData(this.curNode.parentId);
                    }
                },
                /**
                 * 查询文件
                 */
                search: function () {
                    var lastIndex = this.pathValue.lastIndexOf('/');
                    if (lastIndex === this.pathValue.length - 1) {
                        return;
                    }
                    this._initPathData(this.pathValue);
                },
                /**
                 * 点击下钻
                 * @param data
                 */
                itemAction: function (data) {
                    if (data && data.nameStr) {
                        this.set('pathValue', data.nameStr);
                        this._initPathData(data.nameStr);
                    }
                },
                /**
                 * 文件预览，action向上抛出文件信息
                 * @param data
                 */
                itemPreview: function (data) {
                    if (data && data.nameStr && data.nameStr.indexOf('.xml') !== -1) {
                        this.sendAction('previewFile', 'xml', data.nameStr.split(proConfig.fileDir.resultDir)[1]);
                    }
                    if (data && data.nameStr && data.nameStr.indexOf('.jpg') !== -1) {
                        this.sendAction('previewFile', 'img', data.nameStr.split(proConfig.fileDir.resultDir)[1]);
                    }
                    if (data && data.nameStr && data.nameStr.indexOf('.tif') !== -1) {
                        this.sendAction('previewFile', 'tif', data.nameStr.split(proConfig.fileDir.resultDir)[1]);
                    }
                },
                confirmPath: function () {
                    Ember.set(this.parameters, 'path', this.pathValue);
                    this.sendAction('sendConfirm');
                },
                cancelPath: function () {
                    this.sendAction('sendClose');
                },
                changeListType: function () {
                    this.set('showList', !this.showList)
                }
            }
        });
    });