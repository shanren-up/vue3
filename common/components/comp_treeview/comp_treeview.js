define(
    [
        'app',
        'json!common/components/comp_treeview/cultureInfo.json'
    ],

    function(app, cultureInfo) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);

        var TreeNode = Ember.Object.extend({
            id: '',
            text: Ember.string,
            children: [],
            hasChild: Ember.computed('children.@each.length', function() {
                return this.get('children.0.children').length !== 0;
            })
        });

        app.CompTreeviewComponent = Ember.Component.extend({
            //字段
            _isDestroying: false,
            //属性
            treeObject: null,
            actionReceiver: null,
            currentNode: null,
            selectedNodes: null,
            checkCallback: true,
            data: null,
            _refreshTree: Ember.observer('data', function() {
                var treeObject = this.get('treeObject');
                var t = treeObject.jstree(true);
                if (null !== t) {
                    t.settings.core['data'] = this.get('data');
                    t.refresh();
                }
            }),
            plugins: null,
            //***是否显示图标
            isShowIcon: Ember.computed.alias('themes.icons'),
            isShowStripes: Ember.computed.alias('themes.stripes'),
            isShowDots: Ember.computed.alias('themes.dots'),
            isShowFloatMenu: false,
            defaultFloatMenu: "",

            themes: {
                name: 'proton',
                url: './lib/js-tree/themes/proton/style.min.css',
                dir: true,
                dots: true,
                icons: false,
                stripes: false,
                variant: true,
                responsive: true
            },
            //plugin
            checkboxOptions: null,
            contextmenuOptions: {
                "items": {
                    "删除": {
                        "label": Ember.oloc('comp_treeview_xj'),
                        "icon": false,
                        "action": function(data) {
                            var inst = $.jstree.reference(data.reference);
                            var obj = inst.get_node(data.reference);
                            //todo handler event
                            alert(Ember.oloc('comp_treeview_xj'));
                            //this.sendAction('OnAddTreeNodeContextMenuClick',obj);
                        },
                        "submenu": {}
                    },
                    "新建": {
                        "label": Ember.oloc('comp_treeview_sc'),
                        "icon": false,
                        "action": function(data) {
                            var inst = $.jstree.reference(data.reference);
                            var obj = inst.get_node(data.reference);
                            //todo handler event
                            alert(Ember.oloc('comp_treeview_sc'));
                            //this.sendAction('OnDeleteTreeNodeContextMenuClick',obj);
                        },
                        "submenu": {}
                    },
                    "编辑": {
                        "label": Ember.oloc('comp_treeview_bj'),
                        "icon": false,
                        "action": function(data) {
                            var inst = $.jstree.reference(data.reference);
                            var obj = inst.get_node(data.reference);
                            //todo handler event
                            alert(Ember.oloc('comp_treeview_bj'));
                            //this.sendAction('OnEditTreeNodeContextMenuClick',obj);
                        },
                        "submenu": {}
                    }
                }
            },

            //初始化
            init: function() {
                this._super();
                var proxy = Ember.Object.extend(Ember.ActionHandler).create({
                    target: this
                });
                this.set('actionReceiver', proxy);
            },
            didInsertElement: function() {
                var tree = this._initJsTree();
                this._initEventHandlers(tree);
                this.set('treeObject', tree);

            },
            willDestroyElement: function() {
                this._super();
                this.set('isReady', false);
                this.set('_isDestroying', true);
            },

            _initJsTree: function() {
                var configObject = {};

                configObject["core"] = {
                    "data": this.get('data'),
                    "check_callback": this.get('checkCallback')
                };

                var themes = this.get('themes');
                if (themes && typeof themes === "object") {
                    configObject["core"]["themes"] = themes;
                }
                var pluginsArray = this.get('plugins');
                if (pluginsArray) {
                    pluginsArray = pluginsArray.replace(/ /g, '').split(',');
                    configObject["plugins"] = pluginsArray;

                    if (pluginsArray.indexOf("contextmenu") !== -1 ||
                        pluginsArray.indexOf("dnd") !== -1 ||
                        pluginsArray.indexOf("unique") !== -1) {
                        configObject["core"]["check_callback"] = true;
                    }

                    var checkboxOptions = this.get('checkboxOptions');
                    if (checkboxOptions && pluginsArray.indexOf("checkbox") !== -1) {
                        configObject["checkbox"] = checkboxOptions;
                    }

                    var stateOptions = this.get('stateOptions');
                    if (stateOptions && pluginsArray.indexOf("state") !== -1) {
                        configObject["checkbox"] = stateOptions;
                    }

                    var typesOptions = this.get('typesOptions');
                    if (typesOptions && pluginsArray.indexOf("types") !== -1) {
                        configObject["types"] = typesOptions;
                    }

                    configObject["contextmenu"] = this._setupContextMenus(pluginsArray);

                    configObject["search"] = {
                        "search_callback": this.searchCallback.bind(this)
                    };
                }
                return this.$().jstree(configObject);
            },

            _setupContextMenus: function(pluginsArray) {
                /*jshint -W083 */
                var contextmenuOptions = this.get('contextmenuOptions');

                if (!pluginsArray) {
                    return;
                }
                if (contextmenuOptions && pluginsArray.indexOf("contextmenu") !== -1) {
                    if (typeof contextmenuOptions["items"] === "object") {
                        var newMenuItems = {};
                        for (var menuItem in contextmenuOptions["items"]) {
                            if (contextmenuOptions["items"].hasOwnProperty(menuItem)) {
                                newMenuItems[menuItem] = contextmenuOptions["items"][menuItem];
                                if (contextmenuOptions["items"][menuItem] && typeof contextmenuOptions["items"][menuItem]["action"] === "string") {
                                    var emberAction = contextmenuOptions["items"][menuItem]["action"];
                                    newMenuItems[menuItem]["action"] = function() {
                                            Ember.run(this, function() {
                                                var node = this.get('currentNode');
                                                this.send("contextmenuItemDidClick", emberAction, node);
                                            });
                                        }
                                        .bind(this);
                                }
                            }
                        }
                        this.setContextMenuItems(newMenuItems);

                    }
                    return contextmenuOptions;
                }
            },
            //重写，可以根据不同node，返回不同菜单
            setContextMenuItems: function(newMenuItems) {
                var contextmenuOptions = this.get('contextmenuOptions');
                contextmenuOptions.items = function(node) {
                        Ember.run(this, function() {
                            this.set('currentNode', node);
                        });
                        return newMenuItems;
                    }
                    .bind(this);
            },
            _initEventHandlers: function(treeObject) {
                if (!treeObject) {
                    throw new Error('You must pass a valid jsTree object');
                }
                /*
                 init事件 先于loaded执行
                 */
                treeObject.on('init.jstree', function(e, data) {
                        Ember.run(this, function() {
                            this.sendAction('initComplated', e, data);
                        });
                    }
                    .bind(this));

                treeObject.on('ready.jstree', function(e, data) {
                        Ember.run(this, function() {
                            this.set('isReady', true);
                            this.sendAction('loaded', e, data);
                        });
                    }
                    .bind(this));

                treeObject.on('refresh.jstree', function(e, data) {
                        Ember.run(this, function() {
                            this.sendAction('refreshed', e, data);
                        });
                    }
                    .bind(this));

                treeObject.on('redraw.jstree', function() {
                        Ember.run(this, function() {
                            this.sendAction('redraw');
                        });
                    }
                    .bind(this));

                treeObject.on('after_open.jstree', function(e, data) {
                        Ember.run(this, function() {
                            this.sendAction('nodeOpend', data.node);
                        });
                    }
                    .bind(this));

                treeObject.on('after_close.jstree', function(e, data) {
                        Ember.run(this, function() {
                            this.sendAction('nodeclosed', data.node);
                        });
                    }
                    .bind(this));

                treeObject.on('select_node.jstree', function(e, data) {
                        Ember.run(this, function() {
                            this.sendAction('selectNodeChanged', data.node, data.selected, data.event);
                        });
                    }
                    .bind(this));

                treeObject.on('deselect_node.jstree', function(e, data) {
                        Ember.run(this, function() {
                            this.sendAction('deselectChanged', data.node, data.selected, data.event);
                        });
                    }
                    .bind(this));

                treeObject.on('uncheck_node.jstree', function(e, data) {
                        Ember.run(this, function() {
                            this.sendAction('uncheckNode', data.node, data.selected, data.event);
                        });
                    }
                    .bind(this));

                treeObject.on('rename_node.jstree', function(e, data) {
                        Ember.run(this, function() {
                            this.sendAction('renameNode', e, data);
                        });
                    }
                    .bind(this));

                treeObject.on('check_node.jstree', function(e, data) {
                        Ember.run(this, function() {
                            this.sendAction('checkNode', data.node, data.selected, data.event);
                        });
                    }
                    .bind(this));

                //select变更
                treeObject.on('changed.jstree', function(e, data) {
                        Ember.run(this, function() {
                            this.sendAction('selectChanged', data);
                            if (this.get('treeObject') && !(this.get('isDestroyed') || this.get('isDestroying'))) {
                                var selectionChangedEventNames = ["model", "select_node", "deselect_node", "select_all", "deselect_all"];
                                if (data.action && selectionChangedEventNames.indexOf(data.action) !== -1) {
                                    var selNodes = Ember.A(this.get('treeObject').jstree(true).get_selected(true));
                                    this.set('selectedNodes', selNodes);
                                }
                            }
                        });
                    }
                    .bind(this));
            },

            //重写方法
            searchCallback: function(str, node) {
                if (typeof node.original === 'object') {
                    if (node.original[this.search_property]) {
                        var propValue = node.original[this.search_property];
                        if (propValue === str) {
                            return true;
                        }
                    }
                }
            },

            //私有方法


            //公共方法
            getTree: function() {
                var treeObject = this.get('treeObject');
                return treeObject.jstree(true);
            },

            getNodeById: function(nodeId) {
                if (!nodeId) {
                    throw new Error('getNode() fucttion must pass nodeId');
                }

                var treeObject = this.get('treeObject');
                if (treeObject) {
                    return treeObject.jstree(true).get_node(nodeId);
                }
            },
            getchecked: function(isFull) {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    return treeObject.jstree(true).get_checked(isFull);
                }
            },
            getUndetermined: function(isFull) {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    return treeObject.jstree(true).get_undetermined(isFull);
                }
            },

            renameNode: function(obj, val) {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    return treeObject.jstree(true).rename_node(obj, val);
                }
            },
            edit: function(obj, default_text, callback) {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    return treeObject.jstree(true).edit(obj, default_text, callback);
                }
            },
            destroy: function() {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    if (!this.get('_isDestroying')) {
                        treeObject.jstree(true).destroy();
                    }
                }
            },

            getContainer: function() {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    return treeObject.jstree(true).get_container();
                }
            },

            getParent: function(obj) {
                obj = obj || "#";
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    return treeObject.jstree(true).get_parent(obj);
                }
            },

            loadNode: function(obj, cb) {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    return treeObject.jstree(true).load_node(obj, cb);
                }
            },

            loadAll: function(obj, cb) {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    return treeObject.jstree(true).load_all(obj, cb);
                }
            },

            openNode: function(obj, cb, animation) {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    treeObject.jstree(true).open_node(obj, cb, animation);
                }
            },

            openAll: function(obj, animation) {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    treeObject.jstree(true).open_all(obj, animation);
                }
            },

            closeNode: function(obj, cb) {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    treeObject.jstree(true).close_node(obj, cb);
                }
            },

            checkNode: function(obj, cb) {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    treeObject.jstree(true).check_node(obj, cb);
                }
            },

            closeAll: function(obj, animation) {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    treeObject.jstree(true).close_all(obj, animation);
                }
            },

            toggleNode: function(obj) {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    treeObject.jstree(true).toggle_node(obj);
                }
            },

            createNode: function(obj, node, pos, callback, is_loaded) {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    return treeObject.jstree(true).create_node(obj, node, pos, callback, is_loaded);
                }
            },

            moveNode: function(obj, par, pos, callback, is_loaded) {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    treeObject.jstree(true).move_node(obj, par, pos, callback, is_loaded);
                }
            },

            copyNode: function(obj, par, pos, callback, is_loaded) {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    treeObject.jstree(true).copy_node(obj, par, pos, callback, is_loaded);
                }
            },

            deleteNode: function(obj) {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    treeObject.jstree(true).delete_node(obj);
                }
            },

            selectNode: function(obj, suppress_event) {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    treeObject.jstree(true).select_node(obj, suppress_event);
                }
            },

            deselectAll: function(suppress_event) {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    treeObject.jstree(true).deselect_all(suppress_event);
                }
            },


            clearSearch: function() {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    treeObject.jstree(true).clear_search();
                }
            },

            lastError: function() {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    var error = treeObject.jstree(true).last_error();
                    this.set('_lastError', error);
                }
            },

            deselectNodes: function() {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    treeObject.jstree(true).deselect_all();
                }
            },

            getPrevDom: function(obj, strict) {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    return treeObject.jstree(true).get_prev_dom(obj, strict);
                }
            },

            getNextDom: function(obj, strict) {
                var treeObject = this.get('treeObject');
                if (treeObject) {
                    return treeObject.jstree(true).get_next_dom(obj, strict);
                }
            },

            selectNodes: function(property, values) {
                if (this.plugins.indexOf("search") === -1) {
                    return;
                }

                var treeObject = this.get('treeObject');
                if (treeObject) {
                    this.set('search_property', property);

                    treeObject.on('search.jstree', function(event, data) {
                            treeObject.jstree(true).select_node(data.nodes, true, true);
                        }
                        .bind(this));

                    if (Ember.$.isArray(values)) {
                        for (var i = 0; i < values.length; i++) {
                            treeObject.jstree(true).search(values[i]);
                        }

                        treeObject.jstree(true).clear_search();
                    }
                }
            },

            searchNodes: function(property, values) {
                if (this.plugins.indexOf("search") === -1) {
                    return;
                }

                var treeObject = this.get('treeObject');
                if (treeObject) {
                    this.set('search_property', property);

                    if (Ember.$.isArray(values)) {
                        for (var i = 0; i < values.length; i++) {
                            treeObject.jstree(true).search(values[i], false, false, null, true);
                        }
                    }
                }
            },

            ///Action处理
            actions: {
                contextmenuItemDidClick: function(actionName, node) {
                    var tree = this.get('getTree');
                    if (actionName !== undefined) {
                        this.sendAction(actionName, node);
                    }
                }
            }
        });
    });