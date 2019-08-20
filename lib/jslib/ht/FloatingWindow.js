(function(window, undefined) {
"use strict";
var Default = ht.Default,
    NULL = null,
    isString = function(o) {
	return typeof o === "string" || o instanceof String;
    },
    getDocument = function() {
        return document;
    },
    createElement = function(tagName) {
        return getDocument().createElement(tagName);
    },
    createDiv = function() {
        return createElement("div");
    },
    setStyle = function(dom, name, value) {
        dom.style.setProperty(name,value,NULL);
    },
    def_widget = function(className, superClass, o) {
        Default.def(ht.widget[className], superClass, o);
    },
    appendChild = function(parent, child) {
        parent.appendChild(child);
    },
    removeChild = function(parent, child) {
        parent.removeChild(child);
    },
    getDocBody = function() {
        return getDocument().body;
    },
    getDocumentElement = function() {
        return getDocument().documentElement;
    },
    getDocumentClientWidth = function() {
        return getDocumentElement().clientWidth;
    },
    getDocumentClientHeight = function() {
        return getDocumentElement().clientHeight;
    },
    addEventListener = function(dom, type, listener, useCapture) {
        dom.addEventListener(type, listener, !!useCapture);
    },
    removeEventListener =  function(dom, type, listener, useCapture) {
        dom.removeEventListener(type, listener, !!useCapture);
    };

ht.widget.FloatingWindow = function(config) {
    var self = this,
        windowDiv = self._view = createDiv(),
        contentDiv = self._contentDiv = createDiv(),
        minimizeButton = self._minimizeButton = createDiv();

    contentDiv.style.display = "inline-block";
    contentDiv.style.verticalAlign = "text-bottom";
    contentDiv.style.position = "relative";
    windowDiv.style.position = "absolute";
    windowDiv.style.left = "0px";
    windowDiv.style.top = "0px";
    windowDiv.style.whiteSpace = "nowrap";
    
    minimizeButton.style.display = "inline-block";
    minimizeButton.style.width = "23px";
    minimizeButton.innerHTML = "&nbsp;";
    minimizeButton.style.verticalAlign = "top";
    minimizeButton.style.background = "url(minimize.png)";
    minimizeButton.style.backgroundSize = "cover";
    windowDiv.appendChild(minimizeButton);
    windowDiv.appendChild(contentDiv);
    
    if (config) self.setContent(config);
    
    self.bindingHandleWindowMouseMove = self._handleWindowMouseMove.bind(self);
    self.bindingHandleWindowMouseUp = self._handleWindowMouseUp.bind(self);
    
    addEventListener(minimizeButton, "mousedown", function(e) {
        self._minimizeButtonPosition = {x: e.pageX, y: e.pageY};
    });
    addEventListener(minimizeButton, "click", function(e) {
        var downPosition = self._minimizeButtonPosition;
        if (e.pageX !== downPosition.x || e.pageY !== downPosition.y) {
            return;
        }
        if (self._status !== "min") {
            self._view.style.background = "";
            contentDiv.innerHTML = "";
            self._status = "min";
            if (self._content.iv) {
                self._content.iv();
            }
        } else {
            self._status = "max";
            self._view.style.background = self._background;
            self.setContent(self._content);
            if (self._content.iv) {
                self._content.iv();
            }
        }
    });
    addEventListener(windowDiv, "mousedown", function(e) {
        e.stopPropagation();
        self._mouseDown = 1;
        self._mousePosition = {x: e.pageX, y: e.pageY};
    });
    addEventListener(windowDiv, "mousewheel", function(e) {
        e.stopPropagation();
    });
    //toolTip停止冒泡
	addEventListener(windowDiv,"mousemove", function(e) {
		e.stopPropagation(); 
	});
};
ht.Default.def("ht.widget.FloatingWindow", Object, {
    _content: NULL,
    _background: "rgb(236, 240, 241)",
    setBackground: function(color) {
        this._background = color;
        if (this._status !== "min") {
            this._view.style.background = this._background;
        }
    },
    setContent: function(content) {
        var self = this,
            contentDiv = self._contentDiv;
        self._content = content;
       contentDiv.innerHTML = "";
        if (isString(content)) {
            contentDiv.innerHTML = content;
        } else if (content.getView) {
            appendChild(contentDiv, content.getView());
        } else {
            appendChild(contentDiv, content);
        }
    },
    getView: function() {
        return this._view;
    },
    _handleWindowMouseMove: function(e) {
        if (!this._mouseDown) return;
        var self = this,
            oldPosition = self._mousePosition,
            windowDiv = self._view,
            newX = e.pageX,
            newY = e.pageY,
            offsetX = newX - oldPosition.x,
            offsetY = newY - oldPosition.y,
            left = parseInt(windowDiv.style.left),
            top = parseInt(windowDiv.style.top),
            left = left + offsetX,
            top = top + offsetY;
        if (left < 0) left = 0;
        if (top < 0) top = 0;
        if (left + this._view.offsetWidth > this._parent.clientWidth) {
            left = this._parent.clientWidth - this._view.offsetWidth;
        }
        if (top + this._view.offsetHeight > this._parent.clientHeight) {
            top = this._parent.clientHeight - this._view.offsetHeight;
        }
        windowDiv.style.left = left + "px";
        windowDiv.style.top = top + "px";
        
        self._mousePosition = {x: newX, y: newY};
    },
    _handleWindowMouseUp: function(e) {
        this._mouseDown = 0;
        this._mousePosition = NULL;
    },
    hide: function(e) {
        if (this._view)
            this._view.style.display = "none";
    },
    show: function(e) {
        if (this._view) {
            this._view.style.display = "block";
            this._content.iv && this._content.iv();
        }
    },
    addTo: function(parent) {
        var self = this;
        self._parent = parent;
        parent.appendChild(self._view);
        window.addEventListener("mousemove", self.bindingHandleWindowMouseMove);
        window.addEventListener("mouseup", self.bindingHandleWindowMouseUp);
        self.setBackground(self._background);
    },
    dispose: function() {
        if (this._view) {
            this._parent.removeChild(this._view);
            this._parent = null;
            this._view = null;
            window.removeEventListener("mousemove", this.bindingHandleWindowMouseMove);
            window.removeEventListener("mouseup", this.bindingHandleWindowMouseUp);
        }
    }
});
})(this);