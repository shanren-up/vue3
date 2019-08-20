(function(window, Object, undefined) {
    "use strict";    

var mathCos = Math.cos,
    mathSin = Math.sin,
    Default = ht.Default,
    PI = Math.PI,
r = function(basePoint, offsetX, offsetY, radian) {
    var sinValue = mathSin(radian),
        cosValue = mathCos(radian);
    var rotatedOffsetX = cosValue * offsetX - sinValue * offsetY,
        rotatedOffsetY = sinValue * offsetX + cosValue * offsetY;
    if (basePoint)
        return {x: basePoint.x + rotatedOffsetX, y: basePoint.y + rotatedOffsetY};
    else 
        return {x: rotatedOffsetX, y: rotatedOffsetY};
},
adjustBounds = function() {
    var isIsolating = ht.Default.isIsolating || ht.Default.getInternal().isIsolating;
    if (isIsolating()) return;
    var self = this,
        host = this.getHost();
    if (host instanceof RectPipeNode || host instanceof RoundPipeNode) {
        var bounds;
        if (host instanceof RoundPipeNode) {
            bounds = host.getPipeHoleBoundsByHoleIndex(self.getHoleIndex());
        } else {
            bounds = host.getPipeCellBoundsByCellIndex(self.getCellIndex());
        }
        var hostPosition = host.getPosition(),
            hostWidth = host.getWidth(),
            hostHeight = host.getHeight(),
            hostRotation = host.getRotation();
        if (bounds != null) {
            self.setSize(bounds.width, bounds.height);
            self.setRotation(hostRotation);
            if (hostRotation) {
                var position = r(hostPosition, 
                    bounds.x - hostWidth / 2 + bounds.width / 2,
                    bounds.y - hostHeight / 2 + bounds.height / 2,
                    hostRotation);
                self.setPosition(position.x, position.y);
            } else {
                self.setPosition(hostPosition.x - hostWidth / 2 + bounds.x  + bounds.width / 2, hostPosition.y - hostHeight / 2 + bounds.y + bounds.height / 2);
            }
        }
    }
};
ht.IsGetter.centerHole = 1;
ht.IsGetter.horizonal = 1;
ht.IsGetter.reverse = 1;
var RoundPipeNode = ht.RoundPipeNode = function() {
    RoundPipeNode.superClass.constructor.apply(this);
    this.s("shape3d", "cylinder");
    this.setHoleCount(6);
    this.setReverse(false);
};
Default.def(RoundPipeNode, ht.Node, {
    ms_ac: ["reverse", "holeCount", "centerHole", "holeIndex"],
    handleHostPropertyChange: function(e) {
        var host = this.getHost(),
            holeIndex = this.getHoleIndex();
        if (holeIndex < host.getHoleCount()) {
            if (e && e.property !== "attaches")
            adjustBounds.call(this, e);
        } else {
            RoundPipeNode.superClass.handleHostPropertyChange.call(this, e);
        }
    },
    validateHoles: function() {
        var self = this,
                image = {
            width: {func: function(data) {
                    return (data._width || 10);
                }},
            height: {func: function(data) {
                    return (data._height || 10);
                }},
            comps: [
                {
                    "type": "circle",
                    "rect": {func: function(data) {
                            var dataWidth = data.getWidth(),
                                    dataHeight = data.getHeight(),
                                    min = Math.min(dataWidth, dataHeight),
                                    borderWidth = self.s("shape.border.width") || 0;
                            
                            return [dataWidth / 2 - min / 2 + borderWidth / 2, dataHeight / 2 - min / 2 + borderWidth / 2, min - borderWidth <=0 ? 1: min - borderWidth, min - borderWidth <=0 ? 1: min - borderWidth];
                        }},
                    "pattern": {func:'style@shape.pattern'},
                    "background": "rgba(203, 203, 203, 0.1)",
                    "borderWidth": {func:'style@shape.border.width'},
                    "borderColor": {func:'style@shape.border.color'},
                    "gradient": "radial.northwest",
                    "gradientColor": "#FFF"
                }]
        };
        for (var i = 0; i < self.getHoleCount(); i++) {
            var circle = {
                "type": "circle",
                "rect": {func: (function(i) {
                        return function(data) {
                            var rect = data.getPipeHoleBoundsByHoleIndex(i);
                            return [rect.x, rect.y, rect.width, rect.height];
                        };
                    })(i)},
                "background": null,
                "borderWidth": 1,
                "borderColor": "rgb(0, 185, 30)",
                "gradient": "radial.northwest",
                "gradientColor": "#FFF"
            };
            image.comps.push(circle);
        }
        self.setImage(image);
    },
    onPropertyChanged: function (e) {
        var self = this;
        RoundPipeNode.superClass.onPropertyChanged.call(self, e);
        if (e.property === "reverse" || e.property === "holeCount" || e.property === "centerHole") {
            self.validateHoles();
        } else if (e.property === "holeIndex" || e.property === "host") {
            adjustBounds.call(self);
        }
    },
    getAttachByHoleIndex: function(holeIndex) {
        var attaches = this.getAttaches();
        if (attaches) {
            for (var i = 0; i < attaches.size(); i++) {
                var attach = attaches.get(i);
                if (attach.getHoleIndex() === holeIndex) {
                    return attach;
                }
            }
        }
    },
    getHoleIndexByPoint: function(x, y) {
        var self = this, 
            holeCount = self.getHoleCount(),
            position = {x: x - self.getPosition().x + self.getWidth() / 2, y: y - self.getPosition().y + self.getHeight() / 2};
        for (var i = 0; i < holeCount; i++) {
            var holeBounds = self.getPipeHoleBoundsByHoleIndex(i);
            if (Default.containsPoint(holeBounds, position)) {
                return i;
            }
        }
    },
    removeHole: function(index) {
        var attaches = this.getAttaches(),
            oldHoleCount = this._holeCount;
        if (attaches) {
            var removedAttach;
            for (var i = 0; i < attaches.size(); i++) {
                var attach = attaches.get(i);
                if (attach.getHoleIndex() === index) {
                    removedAttach = attach;//removedAttach必须在for之外修改，不然会影响for循环
                } else if (attach.getHoleIndex() > index) {
                    attach.setHoleIndex(attach.getHoleIndex() - 1);
                }
            }
            if (removedAttach) {
                removedAttach.setHost(null);
                this._dataModel.remove(removedAttach);
            }
        }
        this.setHoleCount(oldHoleCount - 1);
    },
    removeHoleByPoint: function(x, y) {
        var holeIndex = this.getHoleIndexByPoint(x, y);
        if (holeIndex >= 0)
            this.removeHole(holeIndex);
    },
    getPipeHoleBoundsByHoleIndex: function(holeIndex) {
        var self = this;
        if (!self._holeCount)
            return;
        if (holeIndex < 0 || holeIndex >= self._holeCount) {
            return;
        }
        
        var reverse = false;
        if (self._reverse) {
            reverse = !reverse;
        }
        if (self._dataModel && self._dataModel._mirror) {
            reverse = !reverse;
        }
        
        var borderWidth = (self.s("shape.border.width") || 0) * 2,
            width = self.getWidth() - borderWidth <= 0 ? 1 : self.getWidth() - borderWidth,
            height = self.getHeight() - borderWidth <= 0 ? 1 : self.getHeight() - borderWidth,
            centerHole = self._centerHole,
            holeCount = self._holeCount,
            rect;
        var R = Math.min(width, height) / 2,
            cx = self.getWidth() / 2,
            cy = self.getHeight() / 2,
            count = centerHole ? holeCount - 1 : holeCount,
            angle = PI / count,
            r = R * mathSin(angle) / (1 + mathSin(angle)), //r + r/ sin = R
            x = (R - r) * mathSin(-angle * 2 * (holeIndex + 1) + PI / count),//* mathSin(angle * 2 * holeIndex)
            y = (R - r) * mathCos(-angle * 2 * (holeIndex + 1) + PI / count);
        if (reverse) {
            x = (R - r) * mathSin(angle * 2 * (holeIndex + 1) - PI / count),
            y = (R - r) * mathCos(angle * 2 * (holeIndex + 1) - PI / count);
        }
        if (holeCount === 1) {
            rect = {x:cx-R/2,y:cy-R/2,width:R,height:R};
        } else {
            if (centerHole && holeIndex == holeCount - 1) {
                r = R - 2 * r;
                rect = {x: (cx - r), y: (cy - r), width: (2 * r), height: (2 * r)};
            } else {
                rect = {x: (cx + x - r), y: (cy + y - r), width: (2 * r), height: (2 * r)};
            }
        }
        return rect;
    },
    getClassName: function() {
        return "ht.RoundPipeNode";
    },
    getSerializableProperties: function() {
        var map = RoundPipeNode.superClass.getSerializableProperties.call(this);        
        map.holeCount = 1;              
        map.holeIndex = 1;              
        map.centerHole = 1;
        map.reverse = 1;
        delete map.image;
        return map;
    }
});
var RectPipeNode = ht.RectPipeNode = function() {
    RectPipeNode.superClass.constructor.apply(this);
    this._horizonal = true;
    this.setCellCount(new ht.List([3, 4, 5, 4, 3]));
    this.setReverse(false);
};
Default.def(RectPipeNode, ht.Node, {
    ms_ac: ["reverse", "horizonal", "cellIndex", "cellCount"],
    handleHostPropertyChange: function(e) {
        var host = this.getHost(),
            holeIndex = this.getCellIndex();
        if (holeIndex < host.getAllCellCount()) {
            if (e && e.property !== "attaches")
                adjustBounds.call(this, e);
        } else {
            RectPipeNode.superClass.handleHostPropertyChange.call(this, e);
        }
    },
    validateCells: function() {
        var self = this,
            image = {
            width: {func: function(data) {
                    return data._width || 10;
                }},
            height: {func: function(data) {
                    return data._height || 10;
                }},
            comps: [
                {
                    "type": "rect",
                    "rect": {func: function(data) {
                            var dataWidth = data.getWidth(),
                                dataHeight = data.getHeight(),
                                borderWidth = 1;
                            return [borderWidth / 2, borderWidth / 2, 
                                    dataWidth - borderWidth <= 0 ? 1 : dataWidth - borderWidth, 
                                    dataHeight - borderWidth <= 0 ? 1 : dataHeight -borderWidth];
                                
                        }},
                    "pattern": {func:'style@shape.pattern'},
                    "background": "rgba(203,203,203,0.1)",
                    "borderWidth": 1,
                    "borderColor": "rgb(0, 185, 30)",
                    "gradient": "radial.northwest",
                    "gradientColor": "#FFF"
                }]
        };

        var count = this.getAllCellCount();
        if (count > 0) {
            for (var i = 0; i < count; i++) {
                var shape = {
                    "type": "rect",
                    "rect": {func: (function(i) {
                            return function(data) {
                                var rect = data.getPipeCellBoundsByCellIndex(i);
                                return [rect.x, rect.y, rect.width, rect.height];
                            };
                        })(i)},
                    "background": null,
                    "borderWidth": 1,
                    "borderColor": "rgb(0, 185, 30)"
                };
                image.comps.push(shape);
            }
        }
        self.setImage(image);
    },
    onPropertyChanged: function (e) {
        var self = this;
        RectPipeNode.superClass.onPropertyChanged.call(self, e);
        if (e.property === "reverse" || e.property === "horizonal" || e.property === "cellCount") {
            self.validateCells();
        } else if (e.property === "cellIndex" || e.property === "host") {
            adjustBounds.call(self);
        }
    },
    setCellCount: function(cellCount) {
        if (!cellCount) return;
        if (!cellCount._as) {
            cellCount = new ht.List(cellCount);
        }
        var self = this;
        if (self._cellCount == null) {
            self._cellCount = new ht.List();
        }
        var oldValue = self._cellCount;
        self._cellCount = cellCount;
        self.fp("cellCount", oldValue, cellCount);
    },
    getAllCellCount: function() {
        var count = 0,
                cellCount = this._cellCount,
                i = 0;
        for (; i < cellCount.size(); i++) {
            var rowCount = cellCount.get(i);
            count += rowCount;
        }
        return count;
    },
    getCellIndexByPoint: function(x, y) {
        var row = this.getRowIndexByPoint(x, y),
            column = this.getColumnIndexByPoint(x, y),
            cellCount = this._cellCount,
            cellIndex = 0;
        for (var i = 0; i < row; i++) {
            cellIndex += cellCount.get(i);
        }
        cellIndex += column;
        return cellIndex;
    },
    getRowIndexByPoint: function(x, y){
        x = x - this.getPosition().x + this.getWidth() / 2;
        y = y - this.getPosition().y + this.getHeight() / 2;
    	var count = this.getAllCellCount();
    	for(var i = 0; i < count; i++){
    		var rect = this.getPipeCellBoundsByCellIndex(i);
    		if(Default.containsPoint(rect, {x: x, y: y})) {
    			return this.getRowIndexByCellIndex(i);
    		}
    	}
    	return -1;
    },
    getRowIndexByCellIndex: function(cellIndex) {
        if (cellIndex < 0 || cellIndex >= this.getAllCellCount()) {
            return -1;
        }
        var count = 0,
                cellCount = this._cellCount,
                i = 0;
        for (; i < cellCount.size(); i++) {
            var rowCount = cellCount.get(i);
            count += rowCount;
            if (count >= cellIndex + 1) {
                if (this.isHorizonal()) {
                    return i;
                } else {
                    return rowCount - (count - cellIndex);
                }
            }
        }
        return -1;
    },
    removeCell: function(index) {
        var allCellCount = this.getAllCellCount(),
            cellCount = this._cellCount;
        
    	if(index < 0 || index >= allCellCount) {
            return;
    	}
        var row = this.getRowIndexByCellIndex(index);
        
        var attaches = this.getAttaches();
        if (attaches) {
            var removedAttach;
            for (var i = 0; i < attaches.size(); i++) {
                var attach = attaches.get(i);
                if (attach.getCellIndex() === index) {
                    removedAttach = attach;//removedAttach必须在for之外修改，不然会影响for循环
                } else if (attach.getCellIndex() > index) {
                    attach.setCellIndex(attach.getCellIndex() - 1);
                }
            }
            if (removedAttach) {
                removedAttach.setHost(null);
                this._dataModel.remove(removedAttach);
            }
        }
        
        var cellCountArray = cellCount._as.slice(0);
        cellCountArray[row]--;
        if (cellCountArray[row] <= 0) {
            cellCountArray.splice(row, 1);
        }
        this.setCellCount(new ht.List(cellCountArray));
    },
    removeCellByPoint: function(x, y) {
        var cellIndex = this.getCellIndexByPoint(x, y);
        if (cellIndex >= 0)
            this.removeCell(cellIndex);
    },
    getColumnIndexByPoint: function(x, y ){
        x = x - this.getPosition().x + this.getWidth() / 2;
        y = y - this.getPosition().y + this.getHeight() / 2;
    	var count = this.getAllCellCount();
    	for(var i = 0; i < count; i++){
    		var rect = this.getPipeCellBoundsByCellIndex(i);
    		if(Default.containsPoint(rect, {x: x, y: y})) {
    			return this.getColumnIndexByCellIndex(i);
    		}
    	}
    	return -1;
    },
    getColumnIndexByCellIndex: function(cellIndex) {
        if (cellIndex < 0 || cellIndex >= this.getAllCellCount()) {
            return -1;
        }
        var count = 0,
                cellCount = this._cellCount,
                i = 0;
        for (; i < cellCount.size(); i++) {
            var columnCount = cellCount.get(i);
            count += columnCount;
            if (count >= cellIndex + 1) {
                if (this.isHorizonal()) {
                    return columnCount - (count - cellIndex);
                } else {
                    return i;
                }
            }
        }
        return -1;
    },
    getPipeCellBoundsByCellIndex: function(cellIndex) {
        if (cellIndex < 0 || cellIndex >= this.getAllCellCount()) {
            return;
        }
        var row = this.getRowIndexByCellIndex(cellIndex),
            column = this.getColumnIndexByCellIndex(cellIndex);
        if (row < 0 || column < 0) {
            return;
        }
        
        var reverse = false;
        if (this._reverse) {
            reverse = !reverse;
        }
        if (this._dataModel && this._dataModel._mirror) {
            reverse = !reverse;
        }
        
        
        if (reverse) {
            var rowCount = this._cellCount.get(row);
            column = rowCount - column - 1;
        }
        
        var positoinX = 0,
            positionY = 0,
            borderWidth = 1,
            x = positoinX + borderWidth,
            y = positionY + borderWidth,
            w = this.getWidth() - borderWidth * 2,
            h = this.getHeight() - borderWidth * 2,
            rect = {};
        if (this.isHorizonal()) {
            var rowCount = this._cellCount.get(row);
            rect.width = (w / rowCount);
            rect.height = (h / this._cellCount.size());
            rect.x = (x + column * w / rowCount);
            rect.y = (y + row * h / this._cellCount.size());
        } else {
            var columnCount = this._cellCount.get(column);
            rect.width = (w / this._cellCount.size());
            rect.height = (h / columnCount);
            rect.x = (x + column * w / this._cellCount.size());
            rect.y = (y + row * h / columnCount);
        }
        Default.grow(rect, -3);
        return rect;
    },
    getAttachByCellIndex: function(cellIndex) {
        var attaches = this.getAttaches();
        if (attaches) {
            for (var i = 0; i < attaches.size(); i++) {
                var attach = attaches.get(i);
                if (attach.getCellIndex() === cellIndex) {
                    return attach;
                }
            }
        }
    },
    getClassName: function() {
        return "ht.RectPipeNode";
    },
    getSerializableProperties: function() {
        var map = RectPipeNode.superClass.getSerializableProperties.call(this);        
        map.horizonal = 1;              
        map.cellCount = 1;            
        map.cellIndex = 1;
        map.reverse = 1;
        delete map.image;
        return map;
    }
});
})(this, Object);

