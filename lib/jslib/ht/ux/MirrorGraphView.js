var MirrorGraphView = function(dataModel) {
    var self = this;
    MirrorGraphView.superClass.constructor.call(self, dataModel);
    self._bindingGraphViewPropertyChangeHandler = self.graphviewPropertyChangeHandler.bind(self);
    self._bindingGraphViewSelectionChangeHandler = self.graphviewSelectionChangeHandler.bind(self);
    self._bindingGraphViewDataChangeHandler = self.graphviewDataChangeHandler.bind(self);
    self._bindingGraphViewEventHandler = self.graphviewViewEventhandler.bind(self);
    
    
    self.addPropertyChangeListener(function() {
        self._needSyncView = 1;
    });
    self.sm().ms(function(e) {
        self._isolateSync = 1;
        self.syncSelect(self._bindGraph, self);
        delete self._isolateSync;
    });
    var dataChangeHandler = function(e) {
        var graph = self._bindGraph;
        self._isolateSync = 1;
        if (e.kind === "remove") {
            if (!graph._isolateSync) {
                graph.dm().remove(graph.dm().getDataById(e.data._id));
            }
            delete self._isolateSync;
        } else if (e.kind === "clear") {
            if (!graph._isolateSync) {
                graph.dm().clear();
            }
            delete self._isolateSync;
        } else {
            if (!graph._isolateSync) {
                if (!self._cacheMap) {
                    self._cacheMap = {};
                    setTimeout(function() {
                        self.syncDatas(self._cacheMap, graph, self);
                        delete self._cacheMap;
                        delete self._isolateSync;
                    }, 16);
                }
                self._cacheMap[e.data._id] = e.data;
            } else {
                delete self._isolateSync;
            }
        }
    };
    self.dm().addDataPropertyChangeListener(dataChangeHandler);
    self.dm().addDataModelChangeListener(dataChangeHandler);
    self.addViewListener(function(e) {
        if (e.kind === "validate") {
            var graph = self._bindGraph;
            if (self._needSyncView !== null) {
                self.syncView(graph, self);
                self._needSyncView = null;
            }
        }
    });
    self.dm()._mirror = true;
};
ht.Default.def(MirrorGraphView, ht.graph.GraphView, {
    graphviewViewEventhandler: function(e) {
        if (e.kind === "validate") {
            var self = this,
                graph = self._bindGraph;
            if (graph._needSyncView !== null) {
                self.syncView(self, graph);
                graph._needSyncView = null;
            }
        }
    },
    graphviewPropertyChangeHandler: function() {
        this._bindGraph._needSyncView = 1;
    },
    graphviewSelectionChangeHandler: function() {
        var graph = this._bindGraph;
        graph._isolateSync = 1;
        this.syncSelect(this, graph);
        delete graph._isolateSync;
    },
    graphviewDataChangeHandler: function(e) {
        var self = this,
            graph = self._bindGraph;
        graph._isolateSync = 1;
        if (e.kind === "remove") {
            if (!self._isolateSync) {
                self.dm().remove(self.dm().getDataById(e.data._id));
            }
            delete graph._isolateSync;
        } else if (e.kind === "clear") {
            if (!self._isolateSync) {
                self.dm().clear();
            }
            delete graph._isolateSync;
        } else {
            if (!self._isolateSync) {
                if (!graph._cacheMap) {
                    graph._cacheMap = {};
                    setTimeout(function() {
                        self.syncDatas(graph._cacheMap, self, graph);
                        delete graph._cacheMap;
                        delete graph._isolateSync;
                    }, 16);
                }
                graph._cacheMap[e.data._id] = e.data;
            } else {
                delete graph._isolateSync;
            }
        }
    },
    bind: function(graph) {
        var self = this;
        if (self._bindGraph) {
            self._bindGraph.removePropertyChangeListener(self._bindingGraphViewPropertyChangeHandler);
            self._bindGraph.sm().ums(self._bindingGraphViewSelectionChangeHandler);
            self._bindGraph.dm().removeDataPropertyChangeListener(self._bindingGraphViewDataChangeHandler);
            self._bindGraph.dm().removeDataModelChangeListener(self._bindingGraphViewDataChangeHandler);
            self._bindGraph.removeViewListener(self._bindingGraphViewEventHandler);
        }
        self._bindGraph = graph;
        graph.addPropertyChangeListener(self._bindingGraphViewPropertyChangeHandler);
        graph.sm().ms(self._bindingGraphViewSelectionChangeHandler);
        graph.dm().addDataPropertyChangeListener(self._bindingGraphViewDataChangeHandler);
        graph.dm().addDataModelChangeListener(self._bindingGraphViewDataChangeHandler);
        graph.addViewListener(self._bindingGraphViewEventHandler);
    },
    syncSelect: function(targetGraph, sourceGraph) {
        if (!targetGraph._isolateSync) {
            var selections = sourceGraph.sm().getSelection();
            targetGraph.sm().clearSelection();
            selections.each(function(selection) {
                targetGraph.sm().as(targetGraph.dm().getDataById(selection._id));
            });
        }
    },
    syncView: function(targetGraph, sourceGraph) {
        var self = this;
        sourceGraph._isolateSync = 1;
        if (!targetGraph._isolateSync) {
            targetGraph.setZoom(sourceGraph.getZoom());
            targetGraph.tx(sourceGraph.tx());
            targetGraph.ty(sourceGraph.ty());
            targetGraph.validate();
                
            var setIsolating = ht.Default.setIsolating || ht.Default.getInternal().setIsolating;
            setIsolating(true);
            targetGraph.dm().each(function(data) {
                if (data instanceof ht.Node) {//&& !data.getHost()
                    var gData = sourceGraph.dm().getDataById(data._id);
                    self.mirrorPosition(data, targetGraph, gData ? gData.getPosition() : null);
                }
            });
            setIsolating(false);
            
            targetGraph.validate();
        }
        if (!sourceGraph._cacheMap)
            delete sourceGraph._isolateSync;
    },
    syncDatas: function(map, targetGraph, sourceGraph) {
        if (map == null) return;
        var self = this,
            targetDm = targetGraph.dm(),
            sourceDm = sourceGraph.dm(),
            list = new ht.List(),
            allList = new ht.List(),
            syncChildren = function(children) {
                if (children != null && children.size() > 0) {
                    for (var i = 0; i < children.size(); i++) {
                        var child = children.get(i);
                        if (!allList.contains(child)) allList.add(child);
                        syncChildren(child.getChildren());
                    }
                }
            };
        for (var i in map) {
            var mapData = map[i];
            list.add(mapData);
            allList.add(mapData);
            syncChildren(mapData.getChildren());
        }
        if (list.size() > 0) {
            list.each(function(data) {
                var removeData = targetDm.getDataById(data._id);
                if (removeData) {
                    targetDm.remove(removeData);
                }
            });
            var serializer = new ht.JSONSerializer(sourceDm),
                deserializer = new ht.JSONSerializer(targetDm);
            serializer.isSerializable = function(data) {
                if (allList.contains(data)) {
                    return true;
                } else {
                    return false;
                }
            };
            var json = serializer.serialize(),
                targetList = deserializer.deserialize(json, null , true);
            var setIsolating = ht.Default.setIsolating || ht.Default.getInternal().setIsolating;
            setIsolating(true);
            targetList.each(function(targetNode) {
                    var sourceData = sourceDm.getDataById(targetNode.getId());
                    if (targetNode instanceof ht.Node) {
                        if (targetNode instanceof ht.Shape) {
                            setIsolating(false);
                        }
                        self.mirrorPosition(targetNode, targetGraph);//先设置position和rotation，以免影响attach
                        targetNode.setRotation(-targetNode.getRotation());
                        if (targetNode instanceof ht.Shape) {
                            setIsolating(true);
                        }
                    } else if (targetNode instanceof ht.Edge) {
                        var source = sourceData.getSource(),
                            target = sourceData.getTarget();
                        if (source)
                            targetNode.setSource(targetDm.getDataById(source._id));
                        if (target)
                            targetNode.setTarget(targetDm.getDataById(target._id));
                    }
            });
            targetList.each(function(targetNode) {
                    var sourceData = sourceDm.getDataById(targetNode.getId());
                    if (targetNode instanceof ht.Node) {
                        var sourceHost = sourceData.getHost(),
                            targetAttach = targetNode;
                        while(sourceHost) {
                            var targetHost = targetDm.getDataById(sourceHost._id);
                            targetAttach.setHost(targetHost);
                            
                            sourceHost = sourceHost.getHost();
                            targetAttach = targetAttach.getHost();
                        }
                        
                        var sourceParent = sourceData.getParent(),
                            targetChild = targetNode;
                        while(sourceParent) {
                            var targetParent = targetDm.getDataById(sourceParent._id);
                            targetChild.setParent(targetParent);
                            
                            sourceParent = sourceParent.getParent();
                            targetChild = targetChild.getParent();
                        }
                        
                        var buildAttachHost = function(data, targetData) {
                            if (data.getAttaches()) {
                                var attaches = data.getAttaches();
                                attaches.each(function(attach) {
                                    if (sourceDm.contains(attach)) {
                                        var targetAttach = targetDm.getDataById(attach._id);
                                        targetAttach.setHost(targetData);
                                        buildAttachHost(attach, targetAttach);
                                    }
                                });
                            }
                        };
                        buildAttachHost(sourceData, targetNode);
                        
                        var buildChildParent = function(data, targetData) {
                            if (data.getChildren()) {
                                var children = data.getChildren();
                                children.each(function(child) {
                                    if (sourceDm.contains(child)) {
                                        var targetChild = targetDm.getDataById(child._id);
                                        targetChild.setParent(targetData);
                                        buildChildParent(child, targetChild);
                                    }
                                });
                            }
                        };
                        buildChildParent(sourceData, targetNode);
                    } else if (targetNode instanceof ht.Edge) {
                        var source = sourceData.getSource(),
                            target = sourceData.getTarget();
                        if (source)
                            targetNode.setSource(targetDm.getDataById(source._id));
                        if (target)
                            targetNode.setTarget(targetDm.getDataById(target._id));
                    }
            });
            setIsolating(false);
            this.syncSelect(targetGraph, sourceGraph);
        }
    },
    mirrorPosition: function(data, v, sourcePosition) {
            var viewRect = v.getViewRect(),
                centerX = viewRect.x + viewRect.width / 2;
            sourcePosition = sourcePosition || data.getPosition();
            centerX += (centerX - sourcePosition.x);
            data.setPosition(centerX, sourcePosition.y);
    }
});
