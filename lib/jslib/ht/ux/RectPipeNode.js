 var RectPipeNode = ht.RectPipeNode = function() {
    RectPipeNode.superClass.constructor.apply(this);
    this._horizonal = true;
    this.setCellCounts(new ht.List([3, 4, 5, 4, 3]));
};
ht.Default.def(RectPipeNode, ht.Node, {
    adjustBounds: function() {
        var self = this,
                host = this.getHost();
        if (host instanceof RectPipeNode) {
            var bounds = host.getPipeHoleBoundsByHoleIndex(self.getHoleIndex()),
                    hostPosition = host.getPosition(),
                    hostWidth = host.getWidth(),
                    hostHeight = host.getHeight();
            if (bounds != null) {
                self.setSize(bounds.width, bounds.height);
                self.setPosition(hostPosition.x + bounds.x - hostWidth / 2 + bounds.width / 2, hostPosition.y + bounds.y - hostHeight / 2 + bounds.height / 2);
            }
        }
    },
    handleHostPropertyChange: function(e) {
        this.updateAttach(e);
        this.adjustBounds();
    },
    validateHoles: function() {
        var self = this,
                image = {
            width: {func: function(data) {
                    return data._width || 1;
                }},
            height: {func: function(data) {
                    return data._height || 1;
                }},
            comps: [
                {
                    "type": "rect",
                    "rect": {func: function(data) {
                            var dataWidth = data.getWidth(),
                                    dataHeight = data.getHeight();

                            return [0, 0, dataWidth, dataHeight];
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
        if (count <= 0) {
            return;
        }
        for (var i = 0; i < count; i++) {
            var shape = {
                "type": "rect",
                "rect": {func: (function(i) {
                        return function(data) {
                            var rect = data.getPipeHoleBoundsByHoleIndex(i);
                            return [rect.x, rect.y, rect.width, rect.height];
                        };
                    })(i)},
                "background": null,
                "borderWidth": 1,
                "borderColor": "rgb(0, 185, 30)",
            };
            image.comps.push(shape);
        }
        self.setImage(image);
    },
    isHorizontal: function() {
        return this._horizonal;
    },
    setHorizontal: function(value) {
        var self = this,
            oldValue = self._horizonal;
        self._horizonal = value;
        self.fp("_horizonal", oldValue, value);
    },
    setCellCounts: function(cellCounts) {
        var self = this;
        if (self._cellCounts == null) {
            self._cellCounts = new ht.List();
        }
        var oldValue = self._cellCounts;
        self._cellCounts = cellCounts;
        self.fp("cellCounts", oldValue, cellCounts);
        self.validateHoles();
    },
    getCellCounts: function() {
        return this._cellCounts;
    },
    setHoleIndex: function(value) {
        var self = this,
                oldHoleIndex = self._holeIndex;
        self._holeIndex = value;
        self.fp("holeIndex", oldHoleIndex, value);
        self.adjustBounds();
    },
    getHoleIndex: function() {
        return this._holeIndex;
    },
    getAllCellCount: function() {
        var count = 0,
                cellCounts = this._cellCounts,
                i = 0;
        for (; i < cellCounts.size(); i++) {
            var rowCount = cellCounts.get(i);
            count += rowCount;
        }
        return count;
    },
    getRowIndexByCellIndex: function(cellIndex) {
        if (cellIndex < 0 || cellIndex >= this.getAllCellCount()) {
            return -1;
        }
        var count = 0,
                cellCounts = this._cellCounts,
                i = 0;
        for (; i < cellCounts.size(); i++) {
            var rowCount = cellCounts.get(i);
            count += rowCount;
            if (count >= cellIndex + 1) {
                if (this.isHorizontal()) {
                    return i;
                } else {
                    return rowCount - (count - cellIndex);
                }
            }
        }
        return -1;
    },
    getColumnIndexByCellIndex: function(cellIndex) {
        if (cellIndex < 0 || cellIndex >= this.getAllCellCount()) {
            return -1;
        }
        var count = 0,
                cellCounts = this._cellCounts,
                i = 0;
        for (; i < cellCounts.size(); i++) {
            var columnCount = cellCounts.get(i);
            count += columnCount;
            if (count >= cellIndex + 1) {
                if (this.isHorizontal()) {
                    return columnCount - (count - cellIndex);
                } else {
                    return i;
                }
            }
        }
        return -1;
    },
    getPipeHoleBoundsByHoleIndex: function(cellIndex) {
        if (cellIndex < 0 || cellIndex >= this.getAllCellCount()) {
            return;
        }
        var row = this.getRowIndexByCellIndex(cellIndex),
                column = this.getColumnIndexByCellIndex(cellIndex);
        if (row < 0 || column < 0) {
            return;
        }

        var positoinX = 0,
            positionY = 0,
            borderWidth = 1,
            x = positoinX + borderWidth,
            y = positionY + borderWidth,
            w = this.getWidth() - borderWidth * 2,
            h = this.getHeight() - borderWidth * 2,
            rect = {};
        if (this.isHorizontal()) {
            var rowCount = this._cellCounts.get(row);
            rect.width = (w / rowCount);
            rect.height = (h / this._cellCounts.size());
            rect.x = (x + column * w / rowCount);
            rect.y = (y + row * h / this._cellCounts.size());
        } else {
            var columnCount = this._cellCounts.get(column);
            rect.width = (w / this._cellCounts.size());
            rect.height = (h / columnCount);
            rect.x = (x + column * w / this._cellCounts.size());
            rect.y = (y + row * h / columnCount);
        }
        ht.Default.grow(rect, -1);
        return rect;
    }
});