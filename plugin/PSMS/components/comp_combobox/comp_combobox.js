define(
    [
        'app',
        'text!./comp_combobox.html',
        '../../common/services/process-data-service',
        'common/components/comp_msgbox/comp_msgbox',
        'css!./comp_combobox.css',
        'common/components/comp_ztree/comp_ztree'
    ],
    function (app, template, dataService, msgBox) {

        "use strict";

        app.CompComboboxComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-combobox',
            dataAdaptor: null,
            messageBox: null,
            isShow: false,
            dataSource: null,
            workDir: null,
            config: null,
            curNode: null,
            idName: null,
            parentIdName: null,

            init: function () {
                this._super();
                this.dataSource = [
                    {
                        "name": "IPS ",
                        "open": false,
                        "isParent": true,
                        "nameStr": 'IPS',
                        "children": []
                    }
                ];
                this.set('workDir', '/' + this.dataSource[0].name);
                this.messageBox = msgBox.create();
                this.dataAdaptor = dataService.create();
                this._initZtreeConfig();
                this._initZtreeData('/' + this.dataSource[0].name);
            },
            didInsertElement: function () {
                this.findNames();
                Ember.run.later(function(){
                    $('#' + this.parentIdName).click(function(e){
                        if(this.isShow){
                            this.set('isShow', !this.isShow);
                        }else{
                            if(e.target.id == 'comboboxInput' + this.idName){
                                this.set('isShow', !this.isShow);
                            }
                        }
                        event.stopPropagation();
                    }.bind(this));
                    $('#comboboxContent' + this.idName).click(function(e){
                        event = e||window.event;
                        event.stopPropagation();
                    }.bind(this));
                }.bind(this), 500);
            },
            willDestroyElement: function () {
                if(this.messageBox){
                    this.messageBox = null;
                }
                if(this.dataAdaptor){
                    this.dataAdaptor.destroy();
                    this.dataAdaptor= null;
                }
            },

            _handleTreeNodeClick: function(event, treeId, treeNode){
                var newDir = '';
                if(treeNode && treeNode.nameStr){
                    this.set('curNode', treeNode);
                    var nameList = treeNode.nameStr.split('-');
                    nameList.forEach(function(item, index){
                        newDir += '/' + item;
                    });
                }
                this.set('workDir', newDir);
            },

            _handleTreeNodeExpand: function(event, treeId, treeNode){
                var newDir = '';
                if(treeNode && treeNode.nameStr){
                    this.set('curNode', treeNode);
                    var nameList = treeNode.nameStr.split('-');
                    nameList.forEach(function(item, index){
                        newDir += '/' + item;
                    });
                }
                this._initZtreeData(newDir);
            },

            _handleTreeNodeCollapse: function(event, treeId, treeNode){

            },

            _initZtreeConfig: function(){
                this.set('config', {
                    callback:{
                        onClick: this._handleTreeNodeClick.bind(this),
                        onExpand: this._handleTreeNodeExpand.bind(this),
                        onCollapse: this._handleTreeNodeCollapse.bind(this),
                    }
                });
            },

            _handleResult: function(result){
                if(!result.length){
                    return;
                }
                var nodes = [];
                result.forEach(function(item, index){
                    nodes.push({
                        "id": item,
                        "name": item,
                        "open": false,
                        "nameStr": this.curNode.nameStr + '-' + item,
                        "isParent": true
                    });
                }.bind(this));
                this.childs['comboboxTree'].addNodes(this.curNode, nodes, true);
            },

            //服务请求目录数据
            _initZtreeData: function (dirStr) {
                var param = {
                    filePath: dirStr
                };
                this.dataAdaptor.getRestfulData(param, 'fileConfigDir', function(result){
                    if(result){
                        this._handleResult(result);
                    }
                }.bind(this));
            },
            actions: {

            }
        });
    });