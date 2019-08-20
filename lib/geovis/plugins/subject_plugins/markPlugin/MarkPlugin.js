/**
 * 项目：gvml
 * 文件：DyntargetTool.js
 * 作者：钱晶
 * 部门：产品研发中心
 * 邮箱：jqian@mail.ie.ac.cn
 * 日期：2017-03-06 16:27:20.
 * 用途：类
 */
// const GV = window.GV;
class MarkPlugin extends GV.Tool {
    get alias() {
        return '全新标绘面板';
    }

    reference() {
        this.script = './build/PlotPanel.js';
        this.css = './index.css';
    }

    init() {
        this._marking = false;
        this._markContainer = $('<div id="gvMarkPluginContainer" class="gv-markplugin-container"></div>').appendTo(this.container);
        $(this._markContainer).css({ height: `${this.earth.container[0].offsetHeight}px`});

        // const con = confirm('是否使用第二套军标！');
        const con = this.earth.userOptions;
        if (con === 'JBTST') {
            this._library = 'GVJBSceneTST';
            this._myJB = this.formatURL('./mark/militaryMarkConfig/Nmil_mark_t.json');
        } else if (con === 'JB1') {
            this._library = 'GVJBScene';
            this._myJB = this.formatURL('./mark/militaryMarkConfig/Nmil_mark_m.json');
        } else {
            this._myJB = this.formatURL('./mark/militaryMarkConfig/MilItem.json');
        }

        //保存标会的场景
        this._scenes = [];
        this._editNode;
        this._creatLine;
        this._editing;

        this._initMarkView();
    }

    //获得指定scene
    _getScene(type) {
        if(!type) return;

        //判断是否有该scene
        const name = '_edit'+type;

        //清空其他地方删除的场景
        if(this[name] && this[name].map === undefined) {
            var index = this._scenes.indexOf(this[name])
            if(index >=0) {
                this._scenes.splice(index,1);
            }
            this[name] = undefined;
        }

        if(this[name] && this._scenes.indexOf(this[name]) >= 0) {
            return this[name];
        }

        //根据类型创建不同的场景图层
        switch(type) {
            case 'MilScene':
                this[name] = new GV.MilScene();
                break;
            case 'GraphicScene':
                this[name] = new GV.GraphicScene();
                if(this._library) this[name].library = library;
                break;
            default:
                return;
        }

        //添加到场景
        this.earth.addScene(this[name]);
        this._scenes.push(this[name]);

        //场景变化消息发送
        if(this._scenesChange) this._scenesChange();

        return this[name];
    }

    //设置要编辑的scene
    _setScene(scene) {
        if (!scene) return;
        const sceneType = scene.constructor.name;
        //设置的类型过滤
        switch(sceneType) {
            case 'MilScene':
            case 'GraphicScene':
                break;
            default:
                return;
        }

        const name = '_edit'+sceneType;
        if (this[name] === scene) return;

        if (this._scenes.indexOf(scene) < 0) {
            this._scenes.push(scene);
            //场景变化消息发送
            if (this._scenesChange) this._scenesChange();
        }

        this[name] = scene;
    }

/**
 * 对外接口
 * 用户可以设置场景组，及场景创建数组
 * @param scenes {Array}
 */
    setScenes(scenes) {
        if (!(scenes instanceof Array)) return;
        this._scenes = scenes;
    }

/**
 * 对外接口
 * 获取场景组
 * @return scenes {Array}
 */
    getScenes() {
        return this._scenes;
    }

/**
 * 对外接口
 * 设置编辑场景对象
 */
    setEditScenes(scene) {
        this._setScene(scene);
    }

/**
 * 对外接口
 * 设置拓展的军标id
 */
    setOtherCode(code) {
        this._otherCode = code;
    }

/**
 * 对外接口
 * 监听被编辑节点的属性变化
 */
    onNodeChange(callback) {
        this._nodeChange = callback;
    }

/**
 * 对外接口
 * 监听是否添加新场景
 */
    onScenesChange(callback) {
        this._scenesChange = callback;
    }

    styleToProp(str) {
        return str.replace(/-([a-z]|[0-9])/g, function ($0) {
            return $0.toUpperCase().charAt(1);
        });
    }

    _initMarkView() {
        const plotTool = new PlotPanel.PlottingView(this._markContainer[0].id, {
            url: this.url,
            library: [
                {id: 'basic_mark', name: '基本标绘库', json: this.formatURL('./mark/basicMarkConfig/basic_mark.json')},
                {id: 'military_mark', name: '军事标绘库', json: this._myJB},
                // {id: 'model_mark', name: '三维模型库'},
                // {id: 'model_mark0', name: '三维模型库0'}
            ]
        });
        this._plotTool = plotTool;
        const that = this;
        plotTool.propFunc = (name, prop, value) => {
            console.log(name, prop, value);
            console.log(that.styleToProp(prop));
            if (!that._editNode) return;
            if (name === '样式') {
                that._editNode.style[that.styleToProp(prop)] = value;

            } else {
                that._editNode[prop] = value;

            }
            if (this._nodeChange) this._nodeChange(this._creatLine.id, 'property');
        };
        plotTool.render();
        const hand = $('<div className="mark_hand"></div>').appendTo(this._markContainer);
        // console.log(GV.Util.formatURL('./assets/hand.png', this.url));
        hand.css({
            position: 'absolute',
            top: '9px',
            right: '18px',
            width: '32px',
            height: '32px',
            border: '1px solid #00a0e9',
            cursor: 'pointer',
            backgroundImage: `url(${this.formatURL('./assets/hand.png')})`,
            backgroundPosition: 'center',
            backgroundSize: '24px 24px',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'rgb(225, 72, 72)'
        });

        //选取事件
        const _selectObj = () => {
            that.earth.pick((obj) => {
                if (!obj) return;
                console.log(obj.id);
                console.log(obj.code);
                that._editNode = obj;
                that._plotTool.renewPropPanel({
                    className: `GV.${that._editNode.constructor.name}`,
                    properties: that._editNode.toJson()[that._editNode.tag],
                });
            });
        }

        //鼠标操作
        const _mouseup = (event) => {
            if (!that.earth.location) return;
            if (event.button === 0) {
                that._creatMark(that.earth.location);
                if (this.earth.currentMode === 'Map2D') {
                    that._addLinePoint(that.earth.location);
                } else {
                    that.needAddPoint = true; //在移动的时候添加点
                }

            } else if (event.button === 2) {
                that._endUpdateLine();
            }
        }
        const _mouseMove = () => {
            if (!that.earth.location) return;
            if (this.earth.currentMode === 'Map2D') return;
            that._updateLine(that.earth.location);
            if (that.needAddPoint) {
                that._addLinePoint(that.earth.location);
                that.needAddPoint = false;
            }
        }

        //触摸屏操作
        const _touchup = () => {
            if (!that.earth.location) return;
            that._creatMark(that.earth.location);
            that._addLinePoint(that.earth.location);
        }
        //TODO如果想结束划线是触摸屏操作需要添加结束按钮或是切换成其他的标会

        hand.click(() => {
            //编辑状态与创建状态切换按钮
            this._editing = !this._editing;
            if (this._editing === true) {
                hand.css({ backgroundColor: '#18191a'});
                this.earth.earthdiv[0].removeEventListener('mouseup', _selectObj);
                this.earth.clearMapTool();

                this.earth.earthdiv[0].addEventListener('mouseup', _mouseup);
                this.earth.earthdiv[0].addEventListener('mousemove', _mouseMove);

            } else {
                hand.css({ backgroundColor: 'rgb(225, 72, 72)'});

                this._editNode = undefined;
                this._endUpdateLine();
                this.earth.earthdiv[0].removeEventListener('mouseup', _mouseup);
                this.earth.earthdiv[0].removeEventListener('mousemove', _mouseMove);

                this.earth.earthdiv[0].addEventListener('mouseup', _selectObj);
                this.earth.getMapTool('itemSelect').select();
            }
        });

    }

    //创建或更新标会实体
    _creatMark(location) {
        const mark = this._plotTool.getMark();

        if (this.oldMarkName === mark.className && this._creatLine) { //是否在划线条件判断 || this.oldMarkName === 'GV.MilItemOther'
            if (this.oldMarkName === 'GV.MilItemPoint' || this.oldMarkName === 'GV.MilItemLine') {
                if (this.oldCode === mark.config.id)
                    return;
            } else if (this.oldMarkName === 'GV.MilItemOther') {
                if (this.oldCode === this._otherCode) return;
            } else {
                return;
            }
        }

        if (mark.className === 'MilItemOther') {//从外边接进来的数据
            if (this._otherCode === 'other') return;
        }

        this._endUpdateLine();
        this._addMark(mark, location);
        this.oldMarkName = mark.className;
        if (this.oldMarkName === 'GV.MilItemLine') this.oldCode = mark.config.id;
        if (this.oldMarkName === 'GV.MilItemOther') this.oldCode = this._otherCode;
    }

    //线添加点
    _addLinePoint(location) {
        if (!this._creatLine) return;
        if (this._creatLine.maxCount &&
            this._creatLine.maxCount !== -1 &&
            this._creatLine.getPointCount() >= this._creatLine.maxCount) {
            this._endUpdateLine();
            return;
        }
        this._creatLine.addPoints([location.lon, location.lat, location.alt])
    }

    //动态更新点的位置
    _updateLine(location) {
        if (!this._creatLine) return;
        this._creatLine.revisePoint(this._creatLine.getPointCount()-1,[location.lon, location.lat, location.alt]);

    }

    //停止更新点的位置
    _endUpdateLine() {
        if (!this._creatLine) return;
        if (this._nodeChange) this._nodeChange(this._creatLine.id, 'point');
        this._creatLine = undefined;
    }

    //TODO该方法需要重构
    _addMark(mark, location) {
        const options = mark.props;
        let node;
        switch (mark.className) {
            case 'GV.JBPoint':
                options.code = mark.config.id;
                if (mark.config.type) options.jbType = mark.config.type;
                options.position = location;
                node = new GV.JBPoint(options);
                this._getScene('GraphicScene').addNode(node);
                break;
            case 'GV.Label':
                options.position = location;
                node = new GV.Label(options);
                this._getScene('GraphicScene').addNode(node);
                break;
            case 'GV.Place':
                options.position = location;
                node = new GV.Place(options);
                this._getScene('GraphicScene').addNode(node);
                break;
            case 'GV.ImageOverLay':
                options.position = location;
                node = new GV.ImageOverLay(options);
                this._getScene('GraphicScene').addNode(node);
                break;

            case 'GV.Model':
                options.position = location;
                node = new GV.Model(options);
                this._getScene('GraphicScene').addNode(node);
                break;

            case 'GV.Circle':
                options.position = location;
                options.height = 0;
                options.arcStart = 0;
                options.arcEnd = 360;
                node = new GV.Circle(options);
                this._getScene('GraphicScene').addNode(node);
                break;
            case 'GV.Cylinder':
                options.position = location;
                options.arcStart = 0;
                options.arcEnd = 360;
                node = new GV.Circle(options);
                this._getScene('GraphicScene').addNode(node);
                break;

            case 'GV.Sector':
                options.position = location;
                options.height = 0;
                node = new GV.Circle(options);
                this._getScene('GraphicScene').addNode(node);
                break;

            case 'GV.Semicylinder':
                options.position = location;
                node = new GV.Circle(options);
                this._getScene('GraphicScene').addNode(node);
                break;

            case 'GV.Ellipse':
                options.position = location;
                options.height = 0;
                node = new GV.Ellipse(options);
                this._getScene('GraphicScene').addNode(node);
                break;

            case 'GV.Cylindroid':
                options.position = location;
                node = new GV.Ellipse(options);
                this._getScene('GraphicScene').addNode(node);
                break;

            case 'GV.Ellipsoid':
                options.position = location;
                node = new GV.Ellipsoid(options);
                this._getScene('GraphicScene').addNode(node);
                break;

            case 'GV.Sphere':
                options.position = location;
                node = new GV.Sphere(options);
                this._getScene('GraphicScene').addNode(node);
                break;

            case 'GV.Cone':
                options.position = location;
                node = new GV.Cone(options);
                this._getScene('GraphicScene').addNode(node);
                break;

            case 'GV.Cube':
                options.position = location;
                node = new GV.Cube(options);
                this._getScene('GraphicScene').addNode(node);
                break;

            case 'GV.Icon':
                options.position = location;
                node = new GV.Icon(options);
                this._getScene('GraphicScene').addNode(node);
                break;

            case 'GV.FireEffect':
                options.position = location;
                node = new GV.FireEffect(options);
                this._getScene('GraphicScene').addNode(node);
                break;

            case 'GV.SmokeEffect':
                options.position = location;
                node = new GV.SmokeEffect(options);
                this._getScene('GraphicScene').addNode(node);
                break;

            case 'GV.RainEffect':
                options.position = location;
                node = new GV.RainEffect(options);
                this._getScene('GraphicScene').addNode(node);
                break;

            case 'GV.PointEffect':
                options.position = location;
                node = new GV.PointEffect(options);
                this._getScene('GraphicScene').addNode(node);
                break;

            case 'GV.GeoMesh':
                options.position = location;
                node = new GV.GeoMesh(options);
                this._getScene('GraphicScene').addNode(node);
                break;

            case 'GV.LocalMesh':
                options.position = location;
                node = new GV.LocalMesh(options);
                this._getScene('GraphicScene').addNode(node);
                break;

            case 'GV.PointCloud':
                options.position = location;
                node = new GV.PointCloud(options);
                this._getScene('GraphicScene').addNode(node);
                break;
            case 'GV.MilItemPoint':
                options.code = mark.config.id;
                options.libid = (mark.config.libid === undefined) ? mark.props.lib : mark.config.libid;
                options.vertices = [[location.lon, location.lat, location.alt]];
                node = new GV.MilItem(options);
                this._getScene('MilScene').addNode(node);
                break;
            case 'GV.MilItemLine':
                options.code = mark.config.id;
                options.libid = (mark.config.libid === undefined) ? mark.props.lib : mark.config.libid;
                options.vertices = [[location.lon, location.lat, location.alt]];
                node = new GV.MilItem(options);
                this._getScene('MilScene').addNode(node);
                break;
            case 'GV.MilItemOther':
                options.code = this._otherCode;
                options.libid = mark.props.lib;
                options.vertices = [[location.lon, location.lat, location.alt]];
                node = new GV.MilItem(options);
                this._getScene('MilScene').addNode(node);
                break;
            case 'GV.JBLine':
                options.code = mark.config.id;
                if (mark.config.type) options.jbType = mark.config.type;
                options.vertices = [[location.lon, location.lat, location.alt]];
                node = new GV.JBLine(options);
                this._getScene('GraphicScene').addNode(node);
                break;
            case 'GV.Polygon':
                options.vertices = [[location.lon, location.lat, location.alt]];
                node = new GV.Polygon(options);
                this._getScene('GraphicScene').addNode(node);
                break;
            case 'GV.Polyline':
                options.vertices = [[location.lon, location.lat, location.alt]];
                node = new GV.Polyline(options);
                this._getScene('GraphicScene').addNode(node);
                break;
            case 'GV.Spline':
                options.vertices = [[location.lon, location.lat, location.alt]];
                node = new GV.Spline(options);
                this._getScene('GraphicScene').addNode(node);
                break;

            default: break;
        }

        if (mark.className === 'GV.MilItemPoint' || mark.className === 'GV.MilItemLine' || mark.className === 'GV.MilItemOther') {
            var that = this;
            node.getMaxCount((maxCount)=>{
                if (maxCount === 1) return;
                this._creatLine = node;
                this._creatLine.maxCount = maxCount;
                if (this.earth.current && this.earth.currentMode !== 'Map2D')
                this._addLinePoint(node.getPoint(0));
            } )
        }
        else if (node instanceof GV.GeometryNode) {
            this._creatLine = node;
        }

        //发送添加添加节点消息
        if (this._nodeChange) this._nodeChange(node.id, 'add');
    }

    remove() {
        super.remove();
        // $(this.container).remove();
        $(this.container).css({
            'position': 'relative',
            'top': '-100%',
            'height': '0px',
            'width': '100%'
          });
        this.container.innerHTML = '';
        window.store['store-Mark'] = undefined;
        window.store['store-Prop'] = undefined;
        this.earth.clearMapTool();
    }
}

//# sourceURL=MarkPlugin.js
