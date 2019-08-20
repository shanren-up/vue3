ht.x = {};
ht.x.widget = {};
def_x_widget = function(className, superClass, o) {
    ht.Default.def(ht.x.widget[className], superClass, o);
};

ht.x.widget.ContextMenu = function(items) {
    var ul = this._view = document.createElement("ul");
    ul.className = "ht-x-widget-contextmenu";
    this.setItems(items);
    ul.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    });
};
def_x_widget('ContextMenu', Object, {
    _subuls: null,
    _items: null,
    setItems: function(items) {
        this._view.innerHTML="";
        this._items = items;
        var self = this;
        function recursion(items, view) {
            items.forEach(function(item) {
                var li = document.createElement("li");
                if (item.icon) {
                    var img = document.createElement('img');
                    img.src = item.icon;
                    li.appendChild(img);
                }
                if (item.items) {
                    var span = document.createElement("span");
                    span.innerHTML = ">";
                    li.appendChild(span);
                }

                view.appendChild(li);
                var a = document.createElement("a");
                a.innerHTML = item.label;
                if (item.href) {
                    a.href = item.href;
                } else if (item.action) {
                    li.addEventListener("click", function(e) {
                        if (e.target.parentNode == li) {
                            var arguments = [a.innerHTML, e].concat(item.options || []);
                            item.action.apply(item.scope || window, arguments);
                        }
                    });
                }
                li.appendChild(a);
                if (item.items) {
                    if (!self._subuls) {
                        self._subuls = new ht.List();
                    }
                    var ul = document.createElement("ul");
                    ul.className = "subs";
                    li.appendChild(ul);
                    self._subuls.add(ul);
//                    li.addEventListener("mouseover", function() {
//
//                        var bounds = ul.getBoundingClientRect();
//
//                        var windowWidth = document.documentElement.clientWidth;
//                        var windowHeight = document.documentElement.clientHeight;
//
//                        if (bounds.top + bounds.height > windowHeight) {
//                            ul.style.top = (windowHeight - bounds.top - bounds.height) + "px";
//                        } else {
//                            ul.style.top = "0";
//                        }
//
//                        ul.style.left = li.clientWidth + "px";
//                    });

                    recursion(item.items, ul);
                }

            });
        }
        recursion(items, this._view);
    },
    getView: function() {
        return this._view;
    },
    addTo: function(container) {
        var self = this;
        self._container = container;
        document.body.appendChild(self._view);
        this._view.style.display = "none";
        var hideFunction = self._hideFunction = function(event) {
            self.hide(event);
        };
        var contextmenuFunction = self._contextmenuFunction = function(event) {
            event.preventDefault();
            self._view.style.display = "block";
            var windowWidth = document.documentElement.clientWidth;
            var windowHeight = document.documentElement.clientHeight;

            var top = event.pageY + 2;
            var left = event.pageX + 2;

            var toBottom = event.pageY + 2 + self._view.clientHeight;
            var toRight = event.pageX + 2 + self._view.clientWidth;

            if (toBottom > windowHeight) {
                self._view.style.top = top - (toBottom - windowHeight) + "px";
            } else {
                self._view.style.top = top + "px";
            }

            if (toRight > windowWidth) {
                self._view.style.left = left - (toRight - windowWidth) + "px";
            } else {
                self._view.style.left = left + "px";
            }

            if (self._subuls) {
                self._subuls.each(function(ul) {
                    ul.style.top = "0";
                    ul.style.left = ul.parentNode.clientWidth + "px";
                })

                self._subuls.each(function(ul) {
                    var bounds = ul.getBoundingClientRect();
                    if (bounds.top + ul.scrollHeight > windowHeight) {
                        ul.style.top = (windowHeight - bounds.top - ul.scrollHeight) + "px";
                    }

                    if (bounds.left + ul.scrollWidth > windowWidth) {
                        ul.style.left = -ul.scrollWidth + "px";
                    }
                });
            }
            if (self.onshow)
                self.onshow();
        };
        document.addEventListener("click", hideFunction, true);
        container.addEventListener("contextmenu", contextmenuFunction);

    },
    hide: function(event) {
        if (event.button == 0) {
//            if (this._subuls) {
//                this._subuls.each(function(ul) {
//                    ul.style.top = "0";
//                    ul.style.left = ul.parentNode.clientWidth + "px";
//                });
//            }
            this._view.style.display = "none";
            if (this.onhide)
                this.onhide();
        }
    },
    dispose: function() {
        document.body.removeChild(this._view);
        document.removeEventListener("click", this._hideFunction, true);
        this._container.removeEventListener("contextmenu", this._contextmenuFunction);
    }
});
ht.x.graph = {};
def_x_graph = function(className, superClass, o) {
    ht.Default.def(ht.x.graph[className], superClass, o);
};
ht.x.graph.RulerFrame = function(graphView) {
    this._gv = graphView;
    var view = this._view = document.createElement("div");
    var topCanvas = this._topCanvas = document.createElement("canvas");
    var leftCanvas = this._leftCanvas = document.createElement("canvas");
    var gvView = this._gvView = graphView.getView();
    view.appendChild(topCanvas);
    view.appendChild(leftCanvas);
    view.appendChild(gvView);
    view.style.setProperty("position", "relative", null);
    view.style.setProperty("width", "100%", null);
    view.style.setProperty("height", "100%", null);

    this._leftCanvas.style.setProperty("position", "absolute", null);
    this._leftCanvas.style.setProperty("border-right", "1px solid black", null);

    this._topCanvas.style.setProperty("position", "absolute", null);
    this._topCanvas.style.setProperty("border-bottom", "1px solid black", null);

    gvView.style.setProperty("position", "absolute");
    gvView.style.setProperty("bottom", "0", null);
    gvView.style.setProperty("right", "0", null);


    this.setWidth(20);

    var self = this;
    var handleGraphViewPropertyChange = this._handleGraphViewPropertyChange = function() {
        this._selfInvalidate = 1;
        self.iv();
    };
    graphView.addPropertyChangeListener(handleGraphViewPropertyChange, this);

    var handleGraphViewMouseMove = this._handleGraphViewMouseMove = function(e) {
        if (self.isGuidesVisible()) {
            self.redraw(e);
        }
    };
    gvView.addEventListener("mousemove", handleGraphViewMouseMove);

};
def_x_graph('RulerFrame', Object, {
    ms_v: 1,
    ms_fire: 1,
    ms_ac: ["width", "guidesVisible"],
    validateImpl: function() {
        var width = this.getWidth();

        this._leftCanvas.style.setProperty("top", width + "px", null);
        this._topCanvas.style.setProperty("left", width + "px", null);
        this._gvView.style.setProperty("left", (width + 1) + "px", null);
        this._gvView.style.setProperty("top", (width + 1) + "px", null);


        ht.Default.setCanvas(this._topCanvas, this._view.clientWidth - width, width);
        ht.Default.setCanvas(this._leftCanvas, width, this._view.clientHeight - width);


        if (!this._selfInvalidate) {
            this._gv.invalidate();
        } else {
            delete this._selfInvalidate;
        }
        this._gv.validate();

        this.redraw();
    },
    redraw: function(e) {
        var topG = this._topCanvas.getContext("2d");
        var leftG = this._leftCanvas.getContext("2d");

        var viewRect = this._gv.getViewRect();
        var zoom = this._gv.getZoom();
        var startX = Math.floor(viewRect.x * zoom);
        var endX = startX + Math.ceil(viewRect.width * zoom);
        var startY = Math.floor(viewRect.y * zoom);
        var endY = startY + Math.ceil(viewRect.height * zoom);
        var width = this.getWidth();

        if (e instanceof MouseEvent && this.isGuidesVisible()) {
            var logicPoint = this._gv.getLogicalPoint(e);
            var x = logicPoint.x * zoom;
            var y = logicPoint.y * zoom;
        }

        topG.save();

        ht.Default.translateAndScale(topG, -startX, -startY, 1);
        topG.clearRect(startX, startY, endX - startX, width);
        topG.font = "" + 10 + "px Arial";


        topG.beginPath();
        topG.fillStyle = "#ccc";

        var majorTickSpacing = 100;

        while (majorTickSpacing * zoom < 50) {
            majorTickSpacing += 100;
        }
        while (majorTickSpacing * zoom > 100) {
            if (majorTickSpacing === 10)
                break;
            majorTickSpacing -= 10;
        }


        for (var i = 0; i < endX; i += majorTickSpacing / 10 * zoom) {
            topG.rect(i, startY + width - 7, 1, 7);
        }
        for (var i = 0; i > startX; i -= majorTickSpacing / 10 * zoom) {
            topG.rect(i, startY + width - 7, 1, 7);
        }
        topG.fill();

        topG.beginPath();
        topG.fillStyle = "black";


        for (var i = 0, scaleText = 0; i < endX; i += majorTickSpacing * zoom, scaleText += majorTickSpacing) {
            topG.fillText(scaleText, i, startY + 10);
            topG.rect(i, startY + width - 14, 1, 14);
        }
        for (var i = 0, scaleText = 0; i > startX; i -= majorTickSpacing * zoom, scaleText -= majorTickSpacing) {
            topG.fillText(scaleText, i, startY + 10);
            topG.rect(i, startY + width - 14, 1, 14);
        }
        topG.fill();

        if (logicPoint) {
            topG.fillStyle = "rgb(105,187,156)";
            topG.beginPath();
            topG.rect(x, startY, 2, width);
            topG.fill();
        }

        topG.restore();


        leftG.save();
        ht.Default.translateAndScale(leftG, -startX, -startY, 1);
        leftG.clearRect(startX, startY, width, endY - startY);
        leftG.font = "" + 10 + "px Arial";


        leftG.beginPath();
        leftG.fillStyle = "#ccc";
        for (var i = 0; i < endY; i += majorTickSpacing / 10 * zoom) {
            leftG.rect(startX + width - 7, i, 7, 1);
        }
        for (var i = 0; i > startY; i -= majorTickSpacing / 10 * zoom) {
            leftG.rect(startX + width - 7, i, 7, 1);
        }
        leftG.fill();


        leftG.beginPath();
        leftG.fillStyle = "black";
        for (var i = 0, scaleText = 0; i < endY; i += majorTickSpacing * zoom, scaleText += majorTickSpacing) {
            leftG.translate(startX + 10, i);
            leftG.rotate(-90 * Math.PI / 180);
            leftG.translate(-startX - 10, -i);

            leftG.fillText(scaleText, startX + 10, i);

            leftG.translate(startX + 10, i);
            leftG.rotate(90 * Math.PI / 180);
            leftG.translate(-startX - 10, -i);

            leftG.rect(startX + width - 14, i, 14, 1);
        }
        for (var i = 0, scaleText = 0; i > startY; i -= majorTickSpacing * zoom, scaleText -= majorTickSpacing) {
            leftG.translate(startX + 10, i);
            leftG.rotate(-90 * Math.PI / 180);
            leftG.translate(-startX - 10, -i);

            leftG.fillText(scaleText, startX + 10, i);

            leftG.translate(startX + 10, i);
            leftG.rotate(90 * Math.PI / 180);
            leftG.translate(-startX - 10, -i);

            leftG.rect(startX + width - 14, i, 14, 1);
        }
        leftG.fill();

        if (logicPoint) {
            leftG.fillStyle = "rgb(105,187,156)";
            leftG.beginPath();
            leftG.rect(startX, y, width, 2);
            leftG.fill();
        }
        leftG.restore();
    },
    onPropertyChanged: function(obj) {
        this._selfInvalidate = 1;
        this.iv();
    },
    dispose: function() {
        this._gv.removePropertyChangeListener(this._handleGraphViewPropertyChange, this);
        this._gvView.removeEventListener("mousemove", this._handleGraphViewMouseMove);
        this._view.parentNode.removeChild(this._view);
    }
});
ht.x.graph.MosaicPainter = function(graphView) {
    this._gv = graphView;
};
def_x_graph('MosaicPainter', Object, {
    draw: function(g) {
        var viewRect = this._gv.getViewRect();
        var zoom = this._gv.getZoom();

        var startX = viewRect.x;
        var endX = startX + viewRect.width;
        var startY = viewRect.y;
        var endY = startY + viewRect.height;
        g.save();
        g.beginPath();
        g.fillStyle = "#ddd";

        for (var i = startX, ii = 0; i < endX; i += 10 / zoom, ii++) {
            for (var j = startY, jj = 0; j < endY; j += 10 / zoom, jj++) {
                if ((ii % 2 != 0 && jj % 2 != 0) || (ii % 2 == 0 && jj % 2 == 0)) {
                    g.rect(i, j, 10 / zoom, 10 / zoom);
                }
            }
        }
        g.fill();

        g.restore();
    }
});

