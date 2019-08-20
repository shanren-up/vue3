var CreateVectorInteractor = function(graphView, mapdiv) {
    CreateVectorInteractor.superClass.constructor.call(this, graphView);
    this._cachedShapePoints = new ht.List();
    this._mapdiv = mapdiv;
    this._seriesTipDiv = document.createElement("div");
    this._seriesTipDiv.style.position = "absolute";
    this._seriesTipDiv.style.background = "rgb(132, 132, 132)";
    this._seriesTipDiv.style.color = "white";
    this._seriesTipDiv.style.setProperty("white-space", "nowrap");
};
ht.Default.def(CreateVectorInteractor, ht.graph.Interactor, {
    setUp: function() {
        var self = this,
            gv = self.gv;
        CreateVectorInteractor.superClass.setUp.call(self);
        gv.addTopPainter(self);
        self._handleKeydown = function(e) {
            self.handle_keydown(e);
        };
        if (this._mapdiv)
            this._mapdiv.addEventListener("keydown", self._handleKeydown);
    },
    tearDown: function() {
        var self = this,
            gv = self.gv;
        CreateVectorInteractor.superClass.tearDown.call(self);
        gv.removeTopPainter(self);
        if (this._mapdiv)
        this._mapdiv.removeEventListener("keydown", self._handleKeydown);
    },
    setSeriesTip: function(tipStr) {
        this._seriesTip = tipStr;
    },
    handle_mousedown: function(e) {
        var self = this,
            gv = self.gv,
            vectorType = self._vectorType;
        self._mousedownPosition = {x: e.clientX, y: e.clientY};
        //_editingData:resizing node   _changingPoint: will add or remove shape point
        if ((gv._editing) || gv._moving || gv._changingPoint || !ht.Default.isLeftButton(e))
            return;
        
        if(vectorType && vectorType !== "shape" && vectorType !== "series" && !ht.Default.isCtrlDown(e)){//control for selecting
            self.startDragging(e);
        }
        e.stopPropagation();
    },
    handle_mousemove: function(e) {
        var self = this,
            gv = self.gv,
            cachedShapePoints = self._cachedShapePoints,
            cachedShapePointsSize = cachedShapePoints.size(),
            lp = gv.lp(e);
        if (self._betweenSeries) {
            self._targetNode.setPosition(lp.x, lp.y);
            if (self.onMove) {
                self.onMove(e);
            }
        } else if (cachedShapePointsSize > 0) {
            if (ht.Default.isShiftDown(e) && cachedShapePointsSize > 0) {
                 lp = convertPoint(lp, cachedShapePoints.get(cachedShapePointsSize - 1));
            }
            self._logicalPoint = lp;
            self.redraw();
        }
        var seriesTipDiv = self._seriesTipDiv,
        seriesTip = self._seriesTip,
        gvView = gv.getView();
	    if (seriesTip) {
	        seriesTipDiv.innerHTML = seriesTip;
	        if (!gvView.contains(seriesTipDiv)) {
	            gvView.appendChild(seriesTipDiv);
	        }
	        var rect = gvView.getBoundingClientRect(),
	            mouseX = e.clientX,
	            mouseY = e.clientY;
	        seriesTipDiv.style.left = mouseX - rect.left + 5 + "px";
	        seriesTipDiv.style.top = mouseY - rect.top + "px";
	    } else {
	        seriesTipDiv.innerHTML = "";
	        if (seriesTipDiv.parentNode)
	            seriesTipDiv.parentNode.removeChild(seriesTipDiv);
	    }
    },
    reset: function() {
        this.handle_keydown({keyCode: 27});
    },
    undo: function() {
        this.handle_keydown({keyCode: 90,metaKey:1, ctrlKey: 1});
    },
    handle_keydown: function(e) {
        var self = this,
            cachedShapePoints = self._cachedShapePoints,
            gv = self.gv;
        if (e.keyCode === 90 && ht.Default.isCtrlDown(e)) {//Ctrl + Z
            if (self._betweenSeries) {
                 if (self._seriesNodes.size() === 2 && self._seriesEdges.size() === 1) {
                    self.reset();
                } else {
                    var lastEdge = self._seriesEdges.get(self._seriesEdges.size() - 2),
                        lastNode = lastEdge.getTarget(),
                        source = lastEdge.getSource();
                    if (lastNode.getEdges().size() > 2) {
                        gv.dm().remove(lastEdge);
                        self._seriesEdges.remove(lastEdge);
                        self._edge.setSource(source);
                    } else {
                        gv.dm().remove(lastNode);
                        self._seriesNodes.remove(lastNode);

                        gv.dm().remove(lastEdge);
                        self._seriesEdges.remove(lastEdge);

                        gv.dm().add(self._edge);
                        self._edge.setTarget(self._targetNode);
                        self._edge.setSource(source);
                    }
                }
            }
        }
        else if (e.keyCode === 27) {//ESC
            cachedShapePoints.clear();
            self._logicalPoint = null;
            self.redraw();
            
            if (self._betweenSeries) {
                self._seriesNodes.each(function(data) {
                    gv.dm().remove(data);
                });
                self._seriesEdges.each(function(data) {
                    gv.dm().remove(data);
                });
                delete self._targetNode;
                delete self._sourceNode;
                delete self._edge;
                delete self._betweenSeries;
                delete self._seriesEdges;
                delete self._seriesNodes;
            }
            if (self._seriesTipDiv.parentNode)
            	self._seriesTipDiv.parentNode.removeChild(self._seriesTipDiv);
        }
        if(e.keyCode == 90 && self._vectorType === 'shape')
        {
        	if(cachedShapePoints.size() > 0)
        	{
        		cachedShapePoints.removeAt(cachedShapePoints.size() - 1);
        		self.redraw();
        	}
        }
    },
    handle_mouseup: function(e) {
        var self = this,
            gv = self.gv,
            vectorType = self._vectorType,
            cachedShapePoints = self._cachedShapePoints,
            cachedShapePointsSize = cachedShapePoints.size(),
            lp = gv.lp(e),
            mousedownPosition = self._mousedownPosition;
        if (!mousedownPosition) {
            return;
        }
        var offsetX = e.clientX - mousedownPosition.x, 
            offsetY = e.clientY - mousedownPosition.y;
        var length = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
        if ((vectorType !== "shape" && vectorType !== "series") || gv._editing || (gv._moving && !self._betweenSeries) || gv._changingPoint || (!ht.Default.isLeftButton(e) && e.button != 1))
            return;
        if (vectorType === "series") {
            if (self._betweenSeries) {
                if (length > 2) return;
                var targetNode = self._targetNode;
                
                if (ht.Default.isDoubleClick(e)) {
                    if (targetNode) {
                        gv.dm().remove(targetNode);
                        self._seriesNodes.remove(targetNode);
                    }
                    if (self._edge) {
                        gv.dm().remove(self._edge);
                        self._seriesEdges.remove(self._edge);
                    }
                    delete self._targetNode;
                    delete self._sourceNode;
                    delete self._edge;
                    delete self._betweenSeries;
                    if (self._seriesTipDiv.parentNode)
                        self._seriesTipDiv.parentNode.removeChild(self._seriesTipDiv);
                    if (self.onSeriesCreateCompleted) {
                        self.onSeriesCreateCompleted(self._seriesNodes, self._seriesEdges);
                    }
                    delete self._seriesNodes;
                    delete self._seriesEdges;
                } else {
                    var node = gv.getDataAt(e);
                    if (e.button == 1) {
                        if (node && node instanceof ht.Node) {
                            self._edge.setSource(node);
                        }
                    } else {
                        if (node && node instanceof ht.Node) {
                            self._edge.setTarget(node);
                            gv.dm().remove(targetNode);
                            self._seriesNodes.remove(targetNode);
                            targetNode = node;
                        }

                        targetNode.setWidth(30);
                        targetNode.setHeight(30);
                        if (self.onCreateCompleted) {
                            self.onCreateCompleted(targetNode, self._seriesNodes.size() - 1);
                        }
                        if (self.onCreateCompleted) {
                            self.onCreateCompleted(self._edge, self._seriesEdges.size() - 1);
                        }
                        var newTargetNode = new ht.Node();
                        self._targetNode = newTargetNode;
                        self._sourceNode = targetNode;
                        self._edge = new ht.Edge(targetNode, newTargetNode);

                        self._edge.s("edge.offset", 6);

                        newTargetNode.setWidth(0);
                        newTargetNode.setHeight(0);
                        newTargetNode.setPosition(lp.x, lp.y);
                        
                        if (self.onCreateStarted) {
                            self.onCreateStarted(newTargetNode, self._seriesNodes.size());
                        }
                        if (self.onCreateStarted) {
                            self.onCreateStarted(self._edge, self._seriesEdges.size());
                        }
                        
                        gv.dm().add(newTargetNode);
                        gv.dm().add(self._edge);
                        if (!self._seriesNodes.contains(newTargetNode)) self._seriesNodes.add(newTargetNode);
                        if (!self._seriesEdges.contains(self._edge)) self._seriesEdges.add(self._edge);
                    }
                }
            } else {
                if (length > 2 || !ht.Default.isLeftButton(e)) return;
                var sourceNode = new ht.Node(),
                    targetNode = new ht.Node(),
                    edge = new ht.Edge(sourceNode, targetNode);
                
                edge.s("edge.offset", 6);
                sourceNode.setPosition(lp.x, lp.y);
                targetNode.setPosition(lp.x, lp.y);
                targetNode.setWidth(0);
                targetNode.setHeight(0);
                gv.dm().add(sourceNode);
                gv.dm().add(targetNode);
                gv.dm().add(edge);
                if (self.onCreateCompleted) {
                    self.onCreateCompleted(sourceNode, 0);
                }
                
                if (self.onCreateStarted) {
                    self.onCreateStarted(targetNode, 1);
                }
                if (self.onCreateStarted) {
                    self.onCreateStarted(edge, 0);
                }
                
                var nodes = new ht.List(),
                    edges = new ht.List();
                nodes.add(sourceNode);
                nodes.add(targetNode);
                edges.add(edge);
                
                self._seriesNodes = nodes;
                self._seriesEdges = edges;
                self._sourceNode = sourceNode;
                self._targetNode = targetNode;
                self._edge = edge;
                self._betweenSeries = true;
            }
            return;
        }
        
//        if (!gv._panning && !gv._pinching) {
            if (ht.Default.isDoubleClick(e)) {//create Shape
                if (cachedShapePointsSize > 1) {
                    var shape = new ht.Shape(),
                        segments = new ht.List();
                    segments.add(1);
                    for (var i = 1; i < cachedShapePointsSize; i++) {
                        segments.add(2);
                    }
                    shape.setSegments(segments);
                    shape.setPoints(cachedShapePoints);
                    shape.setParent(gv.getCurrentSubGraph());
                    gv.dm().add(shape);
                    gv.sm().ss(shape);
                    self._cachedShapePoints = new ht.List();
                    if (self.onCreateCompleted) {
                        self.onCreateCompleted(shape);
                    }
                } else {
                    cachedShapePoints.clear();
                }
                self._logicalPoint = null;
            } else {//add Point to cachedShapePoints
                var point = gv.lp(e);
                for (var i = 0; i < cachedShapePointsSize; i++) {
                    var oldPoint = cachedShapePoints.get(i);
                    if (ht.Default.getDistance(oldPoint, point) < 8) {
                        point.x = oldPoint.x;
                        point.y = oldPoint.y;
                        break;
                    }
                }
                if (ht.Default.isShiftDown(e) && cachedShapePointsSize > 0) {
                    point = convertPoint(point, cachedShapePoints.get(cachedShapePointsSize - 1));
                }
                cachedShapePoints.add(point);
            }
            self.redraw();
//        }
    },
    handleWindowMouseMove: function(e) {
        if(this._pause)return;
        var self = this,
            gv = self.gv,
            p1 = self._lastLogicalPoint,
            p2 = self._logicalPoint = gv.lp(e),
            rect = ht.Default.unionPoint(p1, p2),
            vectorType = self._vectorType,
            drawingNode = self.drawingNode,
            node = null;
        
        if (!drawingNode) {
            if (rect.width > 2 && rect.height > 2) {
                if (vectorType === "node") {
                    node = new ht.Node();
                } else if (vectorType === "rect") {
                    node = new ht.Node();
                    node.s("shape", "rect");
                }else if (vectorType === "grid") {
                    node = new ht.Grid();
                }else if(vectorType === 'circle')
                {
                	node = new ht.Node();
                    node.s("shape", "circle");
                } else if(vectorType === 'text')
                {
                	node = new ht.Node();
                    node.setImage("TEXT");
                    node.a("name","请修改！");
                }else if(vectorType === 'image')
                {
                	node = new ht.Node();
                    node.setImage("/resources/topo/draw/image.png");
                } else if (vectorType === "roundPipe") {
                    node = new ht.RoundPipeNode();
                } else if (vectorType === "rectPipe") {
                    node = new ht.RectPipeNode();
                }
                node.setParent(gv.getCurrentSubGraph());
                gv.dm().add(node);
                if (self.onCreateStarted) {
                    self.onCreateStarted(node);
                }
                drawingNode = self.drawingNode = node;
            }
        }
        if (drawingNode) {
            var nodeWidth = rect.width > 0.01 ? rect.width : 2,
                nodeHeight = rect.height > 0.01 ? rect.height : 2,
                positionX = rect.x + rect.width / 2, 
                positionY = rect.y + rect.height / 2;
            
            drawingNode.setPosition(positionX, positionY);
            drawingNode.setSize(nodeWidth, nodeHeight);
            
//            if (drawingNode instanceof ht.RoundPipe) {
//                drawingNode.setHoleCount(6);
//            } else if (drawingNode instanceof ht.RoundPipe)
            
            self.redraw();
        }
    },
    handleWindowMouseUp: function(e) {
        var self = this,
            gv = self.gv,
            drawingNode = self.drawingNode;
        if (!drawingNode) 
            return;
        gv.sm().ss(drawingNode);
        if (self.onCreateCompleted) {
            self.onCreateCompleted(drawingNode);
        }
        delete self.drawingNode;
        self.clearDragging();
        self.redraw();
    },
    redraw: function() {
        this.gv.redraw();
    },
    draw: function(g) {
        var self = this,
            vectorType = self._vectorType,
            cachedShapePoints = self._cachedShapePoints,
            cachedShapePointsSize = cachedShapePoints.size(),
            mouseLogicalPoint = self._logicalPoint;
        if (vectorType === "shape") {
            if (cachedShapePointsSize > 0) {
                //draw shape
                var startPoint = cachedShapePoints.get(0);
                g.lineWidth = 2;
//                g.strokeStyle = '#1ABC9C';
                g.strokeStyle = "black";
                if(self._fillStyle)
                	g.fillStyle = self._fillStyle;
                g.beginPath();
                g.moveTo(startPoint.x, startPoint.y);
                for (var i = 1; i < cachedShapePointsSize; i++) {
                    startPoint = cachedShapePoints.get(i);
                    g.lineTo(startPoint.x, startPoint.y);
                }
                if (mouseLogicalPoint) {
                    g.lineTo(mouseLogicalPoint.x, mouseLogicalPoint.y);
                }
                g.stroke();
                if(self._fillStyle)
                	g.fill();
                //highlight focus point
                for (i = 0; i < cachedShapePointsSize; i++) {
                    startPoint = cachedShapePoints.get(i);
                    if (mouseLogicalPoint && ht.Default.getDistance(mouseLogicalPoint, startPoint) < 8) {
                        g.strokeStyle = 'red';
                    } else {
                        g.strokeStyle = '#34495E';
                    }
                    g.fillStyle = 'white';
                    g.lineWidth = 1;
                    g.beginPath();
                    g.arc(startPoint.x, startPoint.y, 4, 0, Math.PI * 2, true);
                    g.fill();
                    g.stroke();
                }
            }
        } else {//Node's border
            var p1 = self._lastLogicalPoint;
            if (p1 && mouseLogicalPoint) {
                var rect = ht.Default.unionPoint(p1, mouseLogicalPoint);
                g.lineWidth = 1;
                g.strokeStyle = 'rgb(26, 188, 156)';
                g.beginPath();
                g.rect(rect.x, rect.y, rect.width, rect.height);
                g.stroke();
            }
//            //正交线
//            if(mouseLogicalPoint)
//            {
//            	var viewRect = this.gv.getViewRect();
//            	
//            	g.lineTo(viewRect.x-viewRect.width/2,mouseLogicalPoint.y);
//				g.moveTo(mouseLogicalPoint.x, mouseLogicalPoint.y);
//				g.lineTo(mouseLogicalPoint.x,viewRect.y-viewRect.height/2);
//				
//				g.stroke();  
//            }
        }
    }
});