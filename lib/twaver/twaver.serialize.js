_twaver.addMethod(twaver.Data, {
    serializeCommonXml: function(serializer, newInstance) {
        if (serializer.settings.isClientSerializable && this._clientMap) {
            for (var clientProp in this._clientMap) {
                this.serializeClientCommonXml(serializer, clientProp, newInstance)
            }
        }
    },
    serializePropertyCommonXml: function(serializer, property, newInstance) {
        serializer.serializePropertyCommonXml(this, property, newInstance)
    },
    serializeClientCommonXml: function(serializer, clientPrope, newInstance) {
        serializer.serializeClientCommonXml(this, clientPrope, newInstance)
    },
    deserializeCommonXml: function(serializer, xml) {
        var ps = xml.getElementsByTagName("p"),
            count = ps.length,
            i, p, cs, c;
        for (i = 0; i < count; i++) {
            p = ps[i];
            if (p.hasAttribute("n")) {
                this.deserializePropertyCommonXml(serializer, p, p.getAttribute("n"))
            }
        }
        if (serializer.settings.isClientSerializable) {
            cs = xml.getElementsByTagName("c");
            count = cs.length;
            for (i = 0; i < count; i++) {
                c = cs[i];
                if (c.hasAttribute("n")) {
                    this.deserializeClientCommonXml(serializer, c, c.getAttribute("n"))
                }
            }
        }
    },
    deserializePropertyCommonXml: function(serializer, propertyXml, property) {
        serializer.deserializePropertyCommonXml(this, propertyXml, property)
    },
    deserializeClientCommonXml: function(serializer, clientXml, clientProp) {
        serializer.deserializeClientCommonXml(this, clientXml, clientProp)
    }
});
_twaver.addMethod(twaver.Element, {
    serializeCommonXml: function(serializer, newInstance) {
        if (serializer.settings.isStyleSerializable && this._styleMap) {
            for (var styleProp in this._styleMap) {
                this.serializeStyleCommonXml(serializer, styleProp, newInstance)
            }
        }
        twaver.Element.superClass.serializeCommonXml.call(this, serializer, newInstance);
        this.serializePropertyCommonXml(serializer, "layerId", newInstance);
        if (this._alarmState.getHighestNativeAlarmSeverity() && serializer.settings.getPropertyType("alarmState") === "alarmstate") {
            serializer.xmlString += "	<p n='alarmState'>\n";
            twaver.AlarmSeverity.forEach(function(severity) {
                var count = this.getNewAlarmCount(severity);
                if (count > 0) {
                    serializer.xmlString += "		<n n='" + severity.name + "' c='" + count + "'/>\n"
                }
            }, this._alarmState);
            twaver.AlarmSeverity.forEach(function(severity) {
                var count = this.getAcknowledgedAlarmCount(severity);
                if (count > 0) {
                    serializer.xmlString += "		<a n='" + severity.name + "' c='" + count + "'/>\n"
                }
            }, this._alarmState);
            serializer.xmlString += "	</p>\n"
        }
    },
    serializeStyleCommonXml: function(serializer, stylePrope, newInstance) {
        serializer.serializeStyleCommonXml(this, stylePrope, newInstance)
    },
    deserializeCommonXml: function(serializer, xml) {
        twaver.Element.superClass.deserializeCommonXml.call(this, serializer, xml);
        if (serializer.settings.isStyleSerializable) {
            var ss = xml.getElementsByTagName("s"),
                count = ss.length,
                i, s;
            for (i = 0; i < count; i++) {
                s = ss[i];
                if (s.hasAttribute("n")) {
                    this.deserializeStyleCommonXml(serializer, s, s.getAttribute("n"))
                }
            }
        }
    },
    deserializeStyleCommonXml: function(serializer, styleXml, styleProp) {
        serializer.deserializeStyleCommonXml(this, styleXml, styleProp)
    },
    deserializePropertyCommonXml: function(serializer, propertyXml, property) {
        if (property === "alarmState") {
            if (serializer.settings.getPropertyType("alarmState") === "alarmstate") {
                var alarm, severity, i, s, ss = propertyXml.getElementsByTagName("n");
                for (i = 0; i < ss.length; i++) {
                    s = ss[i];
                    severity = twaver.AlarmSeverity.getByName(s.getAttribute("n"));
                    this._alarmState.setNewAlarmCount(severity, parseInt(s.getAttribute("c")))
                }
                ss = propertyXml.getElementsByTagName("a");
                for (i = 0; i < ss.length; i++) {
                    s = ss[i];
                    severity = twaver.AlarmSeverity.getByName(s.getAttribute("n"));
                    this._alarmState.setAcknowledgedAlarmCount(severity, parseInt(s.getAttribute("c")))
                }
            }
        } else {
            twaver.Element.superClass.deserializePropertyCommonXml.call(this, serializer, propertyXml, property)
        }
    }
});
_twaver.addMethod(twaver.Node, {
    serializeCommonXml: function(serializer, newInstance) {
        twaver.Node.superClass.serializeCommonXml.call(this, serializer, newInstance);
        if (serializer.settings._pm) {
            for (var p in serializer.settings._pm) {
                this.serializePropertyCommonXml(serializer, p, newInstance);
            }
        }
        if (_twaver.num(this._width) && this._width >= 0) {
            this.serializePropertyCommonXml(serializer, "width", newInstance)
        }
        if (_twaver.num(this._height) && this._height >= 0) {
            this.serializePropertyCommonXml(serializer, "height", newInstance)
        }
    }
});
_twaver.addMethod(twaver.Follower, {
    serializeCommonXml: function(serializer, newInstance) {
        twaver.Follower.superClass.serializeCommonXml.call(this, serializer, newInstance);
        this.serializePropertyCommonXml(serializer, "host", newInstance)
    }
});
_twaver.addMethod(twaver.Group, {
    serializeCommonXml: function(serializer, newInstance) {
        twaver.Group.superClass.serializeCommonXml.call(this, serializer, newInstance);
       // this.serializePropertyCommonXml(serializer, "expanded", newInstance)
    }
});
_twaver.addMethod(twaver.RotatableNode, {
    serializeCommonXml: function(serializer, newInstance) {
        twaver.RotatableNode.superClass.serializeCommonXml.call(this, serializer, newInstance);
        this.serializePropertyCommonXml(serializer, "angle", newInstance)
    }
});
_twaver.addMethod(twaver.ShapeNode, {
    serializeCommonXml: function(serializer, newInstance) {
        twaver.ShapeNode.superClass.serializeCommonXml.call(this, serializer, newInstance);
        this.serializePropertyCommonXml(serializer, "points", newInstance);
        this.serializePropertyCommonXml(serializer, "segments", newInstance)
    }
});
_twaver.addMethod(twaver.Link, {
    serializeCommonXml: function(serializer, newInstance) {
        twaver.Link.superClass.serializeCommonXml.call(this, serializer, newInstance);
        this.serializePropertyCommonXml(serializer, "fromNode", newInstance);
        this.serializePropertyCommonXml(serializer, "toNode", newInstance)
    }
});
_twaver.addMethod(twaver.ShapeLink, {
    serializeCommonXml: function(serializer, newInstance) {
        twaver.ShapeLink.superClass.serializeCommonXml.call(this, serializer, newInstance);
        this.serializePropertyCommonXml(serializer, "points", newInstance)
    }
});
_twaver.addMethod(twaver.ElementBox, {
    serializeCommonXml: function(serializer, newInstance) {
        if (serializer.settings.isLayerBoxSerializable) {
            serializer.xmlString += "	<layerBox>\n";
            this._layerBox.forEachByDepthFirst(function(layer) {
                if (this._layerBox.getDefaultLayer() === layer) {
                    serializer.xmlString += "		<layer "
                } else {
                    serializer.xmlString += "		<layer id='" + layer.getId() + "' "
                }
                if (layer.getName()) {
                    serializer.xmlString += "name='" + layer.getName() + "' "
                }
                serializer.xmlString += "visible='" + layer.isVisible() + "' editable='" + layer.isEditable() + "' movable='" + layer.isMovable() + "'/>\n"
            }, null, this);
            serializer.xmlString += "	</layerBox>\n"
        }
        if (serializer.settings.isStyleSerializable && this._styleMap) {
            for (var styleProp in this._styleMap) {
                this.serializeStyleCommonXml(serializer, styleProp, newInstance)
            }
        }
        twaver.ElementBox.superClass.serializeCommonXml.call(this, serializer, newInstance)
    },
    serializeStyleCommonXml: function(serializer, stylePrope, newInstance) {
        serializer.serializeStyleCommonXml(this, stylePrope, newInstance)
    },
    deserializeStyleCommonXml: function(serializer, styleXml, styleProp) {
        serializer.deserializeStyleCommonXml(this, styleXml, styleProp)
    },
    deserializeCommonXml: function(serializer, xml) {
        twaver.ElementBox.superClass.deserializeCommonXml.call(this, serializer, xml);
        if (serializer.settings.isLayerBoxSerializable && xml.getElementsByTagName("layerBox").length == 1) {
            this._layerBox.clear();
            var layers = xml.getElementsByTagName("layer");
            for (var i = 0; i < layers.length; i++) {
                var layerXml = layers[i];
                var layer;
                if (layerXml.hasAttribute("id")) {
                    var idType = serializer.settings.getPropertyType("layerId");
                    if (idType === "string") {
                        layer = new twaver.Layer(layerXml.getAttribute("id"))
                    } else if (idType === "int") {
                        layer = new twaver.Layer(parseInt(layerXml.getAttribute("id")))
                    } else if (idType === "number") {
                        layer = new twaver.Layer(parseFloat(layerXml.getAttribute("id")))
                    } else {
                        throw "Unsupported layer id type '" + idType + "'"
                    }
                    this._layerBox.add(layer)
                } else {
                    layer = this._layerBox.getDefaultLayer();
                    this._layerBox.moveToBottom(layer)
                }
                if (layerXml.hasAttribute("name")) {
                    layer.setName(layerXml.getAttribute("name"))
                }
                if (layerXml.hasAttribute("visible")) {
                    layer.setVisible(layerXml.getAttribute("visible") === "true")
                }
                if (layerXml.hasAttribute("editable")) {
                    layer.setEditable(layerXml.getAttribute("editable") === "true")
                }
                if (layerXml.hasAttribute("movable")) {
                    layer.setMovable(layerXml.getAttribute("movable") === "true")
                }
            }
        }
        if (serializer.settings.isStyleSerializable) {
            var ss = xml.getElementsByTagName("s");
            var count = ss.length;
            for (var i = 0; i < count; i++) {
                var s = ss[i];
                if (s.hasAttribute("n")) {
                    this.deserializeStyleCommonXml(serializer, s, s.getAttribute("n"))
                }
            }
        }
    }
});
_twaver.addMethod(twaver.DataBox, {
    serializeCommonXml: function(serializer, newInstance) {
        if (serializer.settings.isClientSerializable && this._clientMap) {
            for (var clientProp in this._clientMap) {
                this.serializeClientCommonXml(serializer, clientProp, newInstance)
            }
        }
        this.serializePropertyCommonXml(serializer, "name", newInstance);
        this.serializePropertyCommonXml(serializer, "icon", newInstance);
        this.serializePropertyCommonXml(serializer, "toolTip", newInstance)
    },
    serializePropertyCommonXml: function(serializer, property, newInstance) {
        serializer.serializePropertyCommonXml(this, property, newInstance)
    },
    serializeClientCommonXml: function(serializer, clientPrope, newInstance) {
        serializer.serializeClientCommonXml(this, clientPrope, newInstance)
    },
    deserializeCommonXml: function(serializer, xml) {
        var ps = xml.getElementsByTagName("p"),
            count = ps.length,
            i, p, cs, c;
        for (i = 0; i < count; i++) {
            p = ps[i];
            if (p.hasAttribute("n")) {
                this.deserializePropertyCommonXml(serializer, p, p.getAttribute("n"))
            }
        }
        if (serializer.settings.isClientSerializable) {
            cs = xml.getElementsByTagName("c");
            count = cs.length;
            for (i = 0; i < count; i++) {
                c = cs[i];
                if (c.hasAttribute("n")) {
                    this.deserializeClientCommonXml(serializer, c, c.getAttribute("n"))
                }
            }
        }
    },
    deserializePropertyCommonXml: function(serializer, propertyXml, property) {
        serializer.deserializePropertyCommonXml(this, propertyXml, property)
    },
    deserializeClientCommonXml: function(serializer, clientXml, clientProp) {
        serializer.deserializeClientCommonXml(this, clientXml, clientProp)
    }
});
CommonXmlSerializer = function(dataBox, settings, filterFunction) {
    this.dataBox = dataBox;
    this.settings = settings ? settings : new twaver.SerializationSettings;
    this.filterFunction = filterFunction;
    this.ref = 0;
    this.refMap = {};
    this.idMap = {};
    this.xmlString = "";
    twaver.SerializationSettings.setStyleType("background.vector.gradient", "string");
    twaver.SerializationSettings.setStyleType("body.type", "string");
    String.prototype.endWith = function(s) {
        if (s == null || s == "" || this.length == 0 || s.length > this.length) {
            return false
        }
        if (this.substring(this.length - s.length) == s) {
            return true
        } else {
            return false
        }
        return true
    };
    String.prototype.startWith = function(s) {
        if (s == null || s == "" || this.length == 0 || s.length > this.length) {
            return false
        }
        if (this.substr(0, s.length) == s) {
            return true
        } else {
            return false
        }
        return true
    }
};
_twaver.ext("CommonXmlSerializer", Object, {
    serializeCommon: function() {
        this.xmlString = "<topo version='" + twaver.Util.getVersion() + "' platform='java'>\n";
        this.serializeCommonBody();
        this.xmlString += "</twaver>\n";
        return this.xmlString
    },
    serializeCommonBtw: function() {
        this.xmlString = "<?xml version='1.0' encoding='UTF-8' ?> <topodata v='2.0' p='flex'>";
        this.serializeCommonBody();
        this.xmlString += "</topodata>\n";
        return this.xmlString
    },
    serializeCommonBody: function() {
        this.ref = 0;
        this.dataBox.getRoots().forEach(this.initRefs, this);
        if (this.settings.isDataBoxSerializable) {
            this.xmlString += "<dataBox type = '" + this.dataBox.getClassName() + "'>\n";
            this.dataBox.serializeCommonXml(this, this.dataBox.newInstance());
            this.xmlString += "</dataBox>\n"
        }
        this.dataBox.getRoots().forEach(this.serializeData, this)
    },
    initRefs: function(data) {
        this.refMap[data.getId()] = this.ref++;
        data.getChildren().forEach(this.initRefs, this)
    },
    isSerializable: function(data) {
        if (!this.dataBox.contains(data)) {
            return false
        }
        if (this.filterFunction && !this.filterFunction(data)) {
            return false
        }
        return true
    },
    serializeData: function(data) {
        if (this.isSerializable(data)) {
            var newInstance = data.newInstance();
            var ref = this.refMap[data.getId()];
            this.xmlString += "<data type='" + data.getClassName().replace('twaver.', '') + "' ref='" + ref + "'";
            if (this.settings.getPropertyType("id") != null) {
                this.xmlString += " id='" + data.getId() + "'"
            }
            this.xmlString += ">\n";
            data.serializeCommonXml(this, newInstance);
            this.xmlString += "</data>\n"
        }
        data.getChildren().forEach(this.serializeData, this)
    },
    serializePropertyCommonXml: function(instance, property, newInstance) {
        var type = this.settings.getPropertyType(property);
        if (type) {
            var value = this.getValue(instance, property, type);
            var newInstanceValue = this.getValue(newInstance, property, type);
            if (value !== newInstanceValue) {
                this.serializeCommonValue("p", property, value, newInstanceValue, type)
            }
        }
    },
    getValue: function(a, b, c) {
           var d = b.charAt(0).toUpperCase() + b.slice(1),
               e = "get" + d,
               f = "is" + d;
           var result;
               if(c==="boolean")
               {
                    if(a[f])
                    {
                        result= a[f]();
                    }
               }else{
                   result= a[e] ? a[e]() : a[f] ? a[f]() : a[b];
               }
               return result;
        // return c ? "boolean" === c ? a[f]() : a[e]() : a[e] ? a[e]() : a[f] ? a[f]() : a[b]
    },
    serializeStyleCommonXml: function(instance, style, newInstance) {
        var type = this.settings.getStyleType(style);
        if (type) {
            var value = instance.getStyle(style);
            var newInstanceValue = newInstance.getStyle(style);
            if (value != newInstanceValue) {
                this.serializeCommonValue("s", style, value, newInstanceValue, type)
            }
        }
    },
    serializeClientCommonXml: function(instance, client, newInstance) {
        var type = this.settings.getClientType(client);
        if (type != null) {
            var value = instance.getClient(client);
            var newInstanceValue = newInstance.getClient(client);
            if (value != newInstanceValue) {
                this.serializeCommonValue("c", client, value, newInstanceValue, type)
            }
        }
    },
    escape2Html: function(str) {
        if(str)
        {
          return  str.toString().replace(/&(lt|gt|nbsp|amp|quot)*;?/ig, '')
        }
        return str;
    },
    serializeCommonValue: function(c, property, value, newInstanceValue, type) {
        if (value == null) {
            this.xmlString += "	<" + c + " n='" + property + "' none=''/>\n"
        } else if (type === "cdata") {
            this.xmlString += "	<" + c + " n='" + property + "'><![CDATA[" + this.escape2Html(value) + "]]></" + c + ">\n"
        } else if (type === "data") {
            var dataRef = this.refMap[value.getId()];
            if (dataRef != null) {
                this.xmlString += "	<" + c + " n='" + property + "' ref='" + dataRef + "'/>\n"
            }
        } else if (type === "point") {
            if (!newInstanceValue || value.x !== newInstanceValue.x || value.y !== newInstanceValue.y) {
                this.xmlString += "	<" + c + " n='" + property + "' x='" + value.x + "' y='" + value.y + "'/>\n"
            }
        } else if (type === "list.point") {
            this.xmlString += "	<" + c + " n='" + property + "'>\n";
            value.forEach(function(point) {
                this.xmlString += "		<p x='" + point.x + "' y='" + point.y + "'/>\n"
            }, this);
            this.xmlString += "	</" + c + ">\n"
        } else if (type === "list.string" || type === "list.number") {
            this.xmlString += "	<" + c + " n='" + property + "'>\n";
            value.forEach(function(item) {
                this.xmlString += "		<s>" + item + "</s>\n"
            }, this);
            this.xmlString += "	</" + c + ">\n"
        } else if (type === "rectangle") {
            this.xmlString += "	<" + c + " n='" + property + "' x='" + value.x + "' y='" + value.y + "' w='" + value.width + "' h='" + value.height + "'/>\n"
        } else {
            this.xmlString += "	<" + c + " n='" + property + "'>" + value + "</" + c + ">\n"
        }
    },
    deserializeCommon: function(xmlString, rootParent) {
        _twaver.isDeserializing = true;
        this.xmlString = xmlString;
        var xml = _twaver.xml(xmlString).documentElement;
        this.refMap = {};
        this.idMap = {};
        var list = new twaver.List,
            xmlList = new twaver.List,
            data, dataXml, i, datas = xml.getElementsByTagName("data"),
            count = datas.length;
        for (i = 0; i < count; i++) {
            dataXml = datas[i];
            var type = dataXml.getAttribute("class") || dataXml.getAttribute("type");
            type = "twaver." + type;
            var idType = this.settings.getPropertyType("id");
            if (idType && dataXml.hasAttribute("id")) {
                var id = null;
                if (idType === "string") {
                    id = dataXml.getAttribute("id")
                } else if (idType === "int") {
                    id = parseInt(dataXml.getAttribute("id"))
                } else if (idType === "number") {
                    id = parseFloat(dataXml.getAttribute("id"))
                } else {
                    throw "Unsupported id type '" + idType + "'"
                }
                if (dataXml.getAttribute("action") === "remove") {
                    this.dataBox.removeById(id);
                    continue
                }
                data = this.dataBox.getDataById(id);
                if (!data) {
                    data = _twaver.newInstance(type, id)
                }
            } else {
                data = _twaver.newInstance(type)
            }
            if (dataXml.hasAttribute("ref")) {
                var ref = dataXml.getAttribute("ref");
                this.refMap[ref] = data
            }
            list.add(data);
            xmlList.add(dataXml);
            this.idMap[data.getId()] = data
        }
        this.dataBox.forEach(function(data) {
            this.idMap[data.getId()] = data
        }, this);
        count = list.size();
        for (i = 0; i < count; i++) {
            data = list.get(i);
            dataXml = xmlList.get(i);
            data.deserializeCommonXml(this, dataXml)
        }
        for (i = 0; i < count; i++) {
            data = list.get(i);
            if (this.dataBox.containsById(data.getId())) {
                continue
            }
            if (rootParent && !data.getParent()) {
                data.setParent(rootParent)
            }
            this.dataBox.add(data)
        }
        if (this.settings.isDataBoxSerializable && xml.getElementsByTagName("dataBox").length === 1) {
            this.dataBox.deserializeCommonXml(this, xml.getElementsByTagName("dataBox")[0])
        }
        _twaver.isDeserializing = false
    },
    deserializePropertyCommonXml: function(instance, xml, property) {
        var type = this.settings.getPropertyType(property);
        if (type) {
            _twaver.setValue(instance, property, this.deserializeCommonValue(xml, type))
        }
    },
    deserializeStyleCommonXml: function(instance, xml, property) {
        if (property === "content.type") {
            property = "body.type"
        }
        var type = this.settings.getStyleType(property);
        if (property.endWith("color")) {
            var str = xml.textContent.toString();
            var count = str.length;
            if (count == 9) {
                var argb = this.hextoargb("0x" + str.substr(1, 8));
                xml.textContent = "rgba(" + argb.red + "," + argb.green + "," + argb.blue + "," + argb.alpha / 255 + ")"
            }
        }
        if (type) {
            instance.setStyle(property, this.deserializeCommonValue(xml, type))
        }
    },
    hextoargb: function(val) {
        var col = {};
        col.alpha = val >> 24 & 255;
        col.red = val >> 16 & 255;
        col.green = val >> 8 & 255;
        col.blue = val & 255;
        return col
    },
    deserializeClientCommonXml: function(instance, xml, property) {
        var type = this.settings.getClientType(property);
        if (type) {
            instance.setClient(property, this.deserializeCommonValue(xml, type))
        }
    },
    deserializeCommonValue: function(xml, type) {
        if (xml.hasAttribute("@none")) {
            return null
        }
        if (type === "string") {
            return xml.textContent
        }
        if (type === "number") {
            return parseFloat(xml.textContent)
        }
        if (type === "boolean") {
            return xml.textContent === "true"
        }
        if (type === "int") {
            return parseInt(xml.textContent)
        }
        if (type === "point") {
            return {
                x: parseFloat(xml.getAttribute("x")),
                y: parseFloat(xml.getAttribute("y"))
            }
        }
        if (type === "data") {
            var ref = xml.getAttribute("ref");
            var data = this.refMap[ref];
            if (data) {
                return data
            } else {
                return this.idMap[ref]
            }
        }
        var count, numbers, ss, i;
        if (type === "list.point") {
            var points = new twaver.List;
            var ps = xml.getElementsByTagName("p");
            count = ps.length;
            for (i = 0; i < count; i++) {
                var p = ps[i];
                points.add({
                    x: parseFloat(p.getAttribute("x")),
                    y: parseFloat(p.getAttribute("y"))
                })
            }
            return points
        }
        if (type === "list.string") {
            var strings = new twaver.List;
            ss = xml.getElementsByTagName("s");
            count = ss.length;
            for (i = 0; i < count; i++) {
                strings.add(ss[i].textContent)
            }
            return strings
        }
        if (type === "list.number") {
            numbers = new twaver.List;
            ss = xml.getElementsByTagName("s");
            count = ss.length;
            for (i = 0; i < count; i++) {
                numbers.add(parseFloat(ss[i].textContent))
            }
            return numbers
        }
        if (type === "array.string") {
            return xml.textContent.split(",")
        }
        if (type === "array.number") {
            numbers = xml.textContent.split(",");
            count = numbers.length;
            for (i = 0; i < count; i++) {
                numbers[i] = parseFloat(numbers[i])
            }
            return numbers
        }
        if (type === "rectangle") {
            return {
                x: parseFloat(xml.getAttribute("x")),
                y: parseFloat(xml.getAttribute("y")),
                width: parseFloat(xml.getAttribute("w")),
                height: parseFloat(xml.getAttribute("h"))
            }
        }
        return xml.textContent
    }
});