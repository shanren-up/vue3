var RoundPipeNode = ht.RoundPipeNode = function() {
    RoundPipeNode.superClass.constructor.apply(this);
    this.setHoleCount(6);
};
ht.Default.def(RoundPipeNode, ht.Node, {
	_holeCount: 0,
	_holeIndex : -1,
	_centerHole : null,
    adjustBounds: function() {
        var self = this,
                host = this.getHost();
        if (host instanceof RoundPipeNode) {
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
                    "type": "circle",
                    "rect": {func: function(data) {
                            var dataWidth = data.getWidth(),
                                    dataHeight = data.getHeight(),
                                    min = Math.min(dataWidth, dataHeight);

                            return [dataWidth / 2 - min / 2, dataHeight / 2 - min / 2, min, min];
                        }},
                    "pattern": {func:'style@shape.pattern'},
                    "background": "rgba(203,203,203,0.1)",
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
    setHoleCount: function(value) {
        var self = this,
                oldHoleCount = self._holeCount;
        self._holeCount = value;
        self.fp("holeCount", oldHoleCount, value);
        self.validateHoles();
    },
    getHoleCount: function() {
        return this._holeCount;
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
    setCenterHole: function(value) {
        var self = this,
                oldCenterHole = self._centerHole;
        self._centerHole = value;
        self.fp("centerHole", oldCenterHole, value);
        self.validateHoles();
    },
    isCenterHole: function() {
        return this._centerHole;
    },
    getPipeHoleBoundsByHoleIndex: function(holeIndex) {
        if (!this._holeCount)
            return;
        if (holeIndex < 0 || holeIndex >= this._holeCount) {
            return;
        }
        var R = Math.min(this.getWidth(), this.getHeight()) / 2.0,
                cx = this.getWidth() / 2,
                cy = this.getHeight() / 2,
                count = this._centerHole ? this._holeCount - 1 : this._holeCount,
                angle = Math.PI / count,
                r = R * Math.sin(angle) / (1 + Math.sin(angle)), //r + r/ sin = R
                x = (R - r) * Math.sin(-angle * 2 * (holeIndex+1)+ Math.PI	/ count),
                y = (R - r) * Math.cos(-angle * 2 * (holeIndex+1)+ Math.PI	/ count);
        //钢管，一个管中只有一个子孔
        if (this._holeCount == 1)
			return {x:cx-R/2,y:cy-R/2,width:R,height:R};
			
        if (this._centerHole && holeIndex == this._holeCount - 1) {
            r = R - 2 * r;
            return {x: (cx - r), y: (cy - r), width: (2 * r), height: (2 * r)};
        } else {
            return {x: (cx + x - r), y: (cy + y - r), width: (2 * r), height: (2 * r)};
        }
    }
});