$(function(){
	/**
 * 定义Style 属性
 * 
 */
 console.log("调用了js文件");
var markConfig = function(){

    var htmlType = {
        TEXT: 'text', // 文本 input
        COLOR: 'color', // 颜色,颜色面板
        NUMBER: 'number', //数字
        SELECT: 'select', // 下拉选择
        BOOLEAN: 'boolean' // 布尔
    };

    var style = {
        'render-depth-test': {
            label: '深度测试',
            type: htmlType.BOOLEAN
        },
        'render-lighting': {
            label: '灯光是否开启',
            type: htmlType.BOOLEAN
        },
        'render-backface-culling': {
            label: '背面剔除开关',
            type: htmlType.BOOLEAN
        },
        'render-transparent': {
            label: '透明选项',
            type: htmlType.BOOLEAN
        },
        'render-bin': {
            label: 'render bin',
            type: htmlType.TEXT
        },
        'altitude-clamping': {
            label: '贴地方式',
            type: htmlType.SELECT,
            options: {
                none: 'none',
                terrain: 'terrain',
                relative: 'relative',
                absolute: 'absolute'
            }
        },
        'altitude-technique': {
            label: '贴地方法',
            type: htmlType.SELECT,
            options: {
                map: 'map',
                drape: 'drape',
                gpu: 'gpu'
            }
        },
        'extrusion-height': {
            label: '挤压高度',
            type: htmlType.NUMBER,
            min: 0
        },
        'icon-scale': {
            label: '图标缩放',
            type: htmlType.NUMBER,
            min: 0.0,
            step: 0.1
        },
        'icon-heading': {
            label: '图标朝向',
            type: htmlType.NUMBER
        },
        'icon-declutter': {
            label: '是否重叠',
            type: htmlType.BOOLEAN
        },
        model: {
            label: '模型路径',
            type: htmlType.TEXT
        },
        'model-density': {
            label: '是否重叠',
            type: htmlType.BOOLEAN
        },
        'model-scale': {
            label: '缩放比例',
            type: htmlType.NUMBER,
            min: 0.0,
            step: 0.1
        },
        'icon-align': {
            label: '图片位置',
            type: htmlType.SELECT,
            options: {
                'left-top': 'left-top',
                'left-center': 'left-center',
                'left-bottom': 'left-bottom',
                'left-base-line': 'left-base-line',
                'left-bottom-base-line': 'left-bottom-base-line',
                'center-top': 'center-top',
                'center-center': 'center-center',
                'center-bottom': 'center-bottom',
                'center-base-line': 'center-base-line',
                'center-bottom-base-line': 'center-bottom-base-line',
                'right-top': 'right-top',
                'right-center': 'right-center',
                'right-bottom': 'right-bottom',
                'right-base-line': 'right-base-line',
                'right-bottom-base-line': 'right-bottom-base-line',
                'base-line': 'base-line'
            }
        },
        fill: {
            label: '填充色',
            type: htmlType.COLOR
        },
        stroke: {
            label: '轮廓线颜色',
            type: htmlType.COLOR
        },
        'stroke-width': {
            label: '线宽',
            type: htmlType.NUMBER
        },
        'stroke-tessellation': {
            label: '线段段数',
            type: htmlType.NUMBER
        },
        'stroke-tessellation-size': {
            label: '线段',
            type: htmlType.NUMBER,
            unit: 'km'
        },
        'stroke-stipple-pattern': {
            label: '点划线模式',
            type: htmlType.NUMBER
        },
        'point-fill': {
            label: '颜色',
            type: htmlType.COLOR
        },
        'point-size': {
            label: '尺寸',
            type: htmlType.NUMBER
        },
        'text-fill': {
            label: '字体颜色',
            type: htmlType.COLOR
        },
        'text-size': {
            label: '字体大小',
            type: htmlType.NUMBER,
            min: 1,
            max: 100,
            unit: '像素'
        },
        'text-halo': {
            label: '边框颜色',
            type: htmlType.COLOR
        },
        'text-halo-offset': {
            label: '边框位置',
            type: htmlType.NUMBER
        },
        'text-offset-x': {
            label: '边框X轴位置',
            type: htmlType.NUMBER
        },
        'text-offset-y': {
            label: '边框Y轴位置',
            type: htmlType.NUMBER
        },
        'text-align': {
            label: '位置',
            type: htmlType.SELECT,
            options: {
                'left-top': 'left-top',
                'left-center': 'left-center',
                'left-bottom': 'left-bottom',
                'left-base-line': 'left-base-line',
                'left-bottom-base-line': 'left-bottom-base-line',
                'center-top': 'center-top',
                'center-center': 'center-center',
                'center-bottom': 'center-bottom',
                'center-base-line': 'center-base-line',
                'center-bottom-base-line': 'center-bottom-base-line',
                'right-top': 'right-top',
                'right-center': 'right-center',
                'right-bottom': 'right-bottom',
                'right-base-line': 'right-base-line',
                'right-bottom-base-line': 'right-bottom-base-line',
                'base-line': 'base-line'
            }
        },
        'text-declutter': {
            label: '是否重叠',
            type: htmlType.BOOLEAN
        },
        'text-bbox-fill': {
            label: '整体填充色',
            type: htmlType.COLOR
        },
        'text-bbox-margin': {
            label: '文字边缘',
            type: htmlType.NUMBER
        },
        'text-bbox-border': {
            label: '线框颜色',
            type: htmlType.COLOR
        },
        'text-bbox-border-width': {
            label: '边框宽度',
            type: htmlType.NUMBER
        },
        'shallow-color': {
            label: '阴影颜色',
            type: htmlType.COLOR
        },
        declutter: {
            label: '是否碰撞',
            type: htmlType.BOOLEAN
        }
    }

    var properties = {
        extrude: {
            label: '是否牵引',
            type: htmlType.BOOLEAN
        },
        showModel: {
            label: '显示模式',
            type: htmlType.SELECT,
            options: {
                bulletin: 'bulletin',
                close_terrain: 'close_terrain'
            }
        },
        autoScaling: {
            label: '是否自动缩放',
            type: htmlType.BOOLEAN
        },
        text: {
            label: '文本',
            type: htmlType.TEXT,
            required: true
        },
        visuable: {
            label: '显隐',
            type: htmlType.BOOLEAN
        },
        maxVisuableDistance: {
            label: '最大可见距离',
            type: htmlType.NUMBER
        },
        minVisuableDistance: {
            label: '最小可见距离',
            type: htmlType.NUMBER
        },
        viewPoint: {
            label: '视口属性',
            type: htmlType.TEXT
        },
        extendData: {
            label: '扩展属性',
            type: htmlType.TEXT
        },
        icon: {
            label: '图片路径',
            type: htmlType.TEXT
        },
        autoFlash: {
            label: '动画是否开启',
            type: htmlType.BOOLEAN
        },
        flashSub: {
            label: '动画动作',
            type: htmlType.NUMBER
        },
        model: {
            label: '模型路径',
            type: htmlType.TEXT
        },
        pixelSize: {
            label: '像素大小',
            type: htmlType.NUMBER
        },
        arcEnd: {
            label: '终止角',
            type: htmlType.NUMBER
        },
        arcStart: {
            label: '起始角',
            type: htmlType.NUMBER
        },
        height: {
            label: '高度',
            type: htmlType.NUMBER,
            min: 0
        },
        length: {
            label: '长度',
            type: htmlType.NUMBER,
            min: 0
        },
        width: {
            label: '宽度',
            type: htmlType.NUMBER,
            min: 0
        },
        radiusX: {
            label: 'X轴半角',
            type: htmlType.NUMBER,
            min: 0
        },
        radiusY: {
            label: 'Y轴半角',
            type: htmlType.NUMBER,
            min: 0
        },
        radiusZ: {
            label: 'Z轴半角',
            type: htmlType.NUMBER,
            min: 0
        },
        rotationAngle: {
            label: '旋转角',
            type: htmlType.NUMBER
        },
        radiusMajor: {
            label: '长半轴',
            type: htmlType.NUMBER,
            min: 0
        },
        radiusMinor: {
            label: '短半轴',
            type: htmlType.NUMBER,
            min: 0
        },
        texture: {
            label: '纹理',
            type: htmlType.TEXT
        },
        drawable: {
            label: '集合数据',
            type: htmlType.TEXT
        },
        alpha: {
            label: '透明度',
            type: htmlType.NUMBER
        },
        maxLat: {
            label: '最大纬度',
            type: htmlType.NUMBER
        },
        minLat: {
            label: '最小纬度',
            type: htmlType.NUMBER
        },
        maxLon: {
            label: '最大经度',
            type: htmlType.NUMBER
        },
        minLon: {
            label: '最小经度',
            type: htmlType.NUMBER
        },
        radius: {
            label: '半径',
            type: htmlType.NUMBER,
            min: 0
        },
        color: {
            label: '填充色',
            type: htmlType.COLOR
        },
        bottomColor: {
            label: '底部填充色',
            type: htmlType.COLOR
        },
        polygonModel: {
            label: '线框模式',
            type: htmlType.BOOLEAN
        },
        url: {
            label: '路径',
            type: htmlType.TEXT
        },
        heading: {
            label: '朝向',
            type: htmlType.NUMBER,
            min: -180,
            max: 180,
            unit: '°'
        },
        roll: {
            label: '旋转',
            type: htmlType.NUMBER,
            min: -180,
            max: 180,
            unit: '°'
        },
        pitch: {
            label: '俯仰',
            type: htmlType.NUMBER,
            min: -180,
            max: 180,
            unit: '°'
        },
        textSize: {
            label: '字体大小',
            type: htmlType.NUMBER,
            min: 0
        },
        textPosition: {
            label: '文字位置',
            type: htmlType.SELECT,
            options: {
                'left-bottom': '底部',
                'left-center': '中部',
                'left-top': '顶部',
            }
        },
        textColor: {
            label: '字体颜色',
            type: htmlType.COLOR
        }
    }
    return {
        htmlType:htmlType,
        style:style,
        properties:properties
    }
}();




var markFinalConfig = {
    'GV.Label': {
        name: 'GV.Label',
        property: {
            extrude: {type: markConfig.properties.extrude, value: false},
            showModel: {type: markConfig.properties.showModel},
            autoScaling: {type: markConfig.properties.autoScaling},
            text: {type: markConfig.properties.text, value: 'hello,world'},
            style: {
                'render-depth-test': {type: markConfig.style['render-depth-test']},
                'render-lighting': {type: markConfig.style['render-lighting']},
                'render-transparent': {type: markConfig.style['render-transparent']},
                'render-bin': {type: markConfig.style['render-bin']},
                'text-fill': {type: markConfig.style['text-fill']},
                'text-size': {type: markConfig.style['text-size'], value: 20},
                'text-halo': {type: markConfig.style['text-halo']},
                'text-halo-offset': {type: markConfig.style['text-halo-offset']},
                'text-offset-x': {type: markConfig.style['text-offset-x']},
                'text-offset-y': {type: markConfig.style['text-offset-y']},
                'text-align': {type: markConfig.style['text-align']},
                'text-declutter': {type: markConfig.style['text-declutter']},
                'text-bbox-fill': {type: markConfig.style['text-bbox-fill']},
                'text-bbox-margin': {type: markConfig.style['text-bbox-margin']},
                'text-bbox-border': {type: markConfig.style['text-bbox-border']},
                'text-bbox-border-width': {type: markConfig.style['text-bbox-border-width']},
                'shallow-color': {type: markConfig.style['shallow-color']}
            }
        },
    },
    'GV.Place': {
        name: 'GV.Place',
        property: {
            extrude: {type: markConfig.properties.extrude, value: false},
            showModel: {type: markConfig.properties.showModel},
            autoScaling: {type: markConfig.properties.autoScaling},
            text: {type: markConfig.properties.text, value: 'hello,world'},
            icon: {type: markConfig.properties.icon, value: './pin.png'},
            style: {
                'render-depth-test': {type: markConfig.style['render-depth-test']},
                'render-lighting': {type: markConfig.style['render-lighting']},
                'render-transparent': {type: markConfig.style['render-transparent']},
                'render-bin': {type: markConfig.style['render-bin']},
                'text-fill': {type: markConfig.style['text-fill']},
                'text-size': {type: markConfig.style['text-size'], value: 20},
                'text-halo': {type: markConfig.style['text-halo']},
                'text-halo-offset': {type: markConfig.style['text-halo-offset']},
                'text-offset-x': {type: markConfig.style['text-offset-x']},
                'text-offset-y': {type: markConfig.style['text-offset-y']},
                'text-align': {type: markConfig.style['text-align']},
                'text-declutter': {type: markConfig.style['text-declutter']},
                'text-bbox-fill': {type: markConfig.style['text-bbox-fill']},
                'text-bbox-margin': {type: markConfig.style['text-bbox-margin']},
                'text-bbox-border': {type: markConfig.style['text-bbox-border']},
                'text-bbox-border-width': {type: markConfig.style['text-bbox-border-width']},
                'shallow-color': {type: markConfig.style['shallow-color']},
                'icon-scale': {type: markConfig.style['icon-scale']},
                'icon-align': {type: markConfig.style['icon-align']},
                'icon-declutter': {type: markConfig.style['icon-declutter']}
            }
        },
    },
    'GV.JBPoint': {
        name: 'GV.JBPoint',
        property: {
            color: {type: markConfig.properties.color},
            text: {type: markConfig.properties.text, value: 'hello,world'},
            textSize: {type: markConfig.properties.textSize, value: 20},
            textPosition: {type: markConfig.properties.textPosition},
            textColor: {type: markConfig.properties.textColor, value: '#FF0000FF'},
            style: {}
        }
    },
    'GV.JBLine': {
        name: 'GV.JBLine',
        property: {
            color: {type: markConfig.properties.color},
            style: {}
        }
    },
    'GV.ImageOverLay': {
        name: 'GV.ImageOverLay',
        property: {
            minLon: {type: markConfig.properties.minLon},
            minLat: {type: markConfig.properties.minLat},
            maxLon: {type: markConfig.properties.maxLon},
            maxLat: {type: markConfig.properties.maxLat},
            url: {type: markConfig.properties.url},
            alpha: {type: markConfig.properties.alpha},
            style: {}
        }
    },
    'GV.Model': {
        name: 'GV.Model',
        property: {
            heading: {type: markConfig.properties.heading, value: 0},
            roll: {type: markConfig.properties.roll, value: 0},
            pitch: {type: markConfig.properties.pitch, value: 0},
            autoScaling: {type: markConfig.properties.autoScaling},
            autoFlash: {type: markConfig.properties.autoFlash},
            style: {
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-lighting': {type: markConfig.style['render-lighting'], value: true},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-bin': {type: markConfig.style['render-bin']},
                model: {type: markConfig.style['model']},
                'model-density': {type: markConfig.style['model-density']},
                'model-scale': {type: markConfig.style['model-scale'], value: 1.0},
            }
        }
    },
    'GV.Circle': {
        name: 'GV.Circle',
        property: {
            radius: {type: markConfig.properties.radius, value: 100000},
            color: {type: markConfig.properties.color},
            style: {
                'render-lighting': {type: markConfig.style['render-lighting'], value: true},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling']}
            }
        }
    },
    'GV.Cylinder': {
        name: 'GV.Cylinder',
        property: {
            height: {type: markConfig.properties.height, value: 10000},
            radius: {type: markConfig.properties.radius, value: 100000},
            color: {type: markConfig.properties.color},
            style: {
                'render-lighting': {type: markConfig.style['render-lighting'], value: true},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling']}
            }
        }
    },
    'GV.Sector': {
        name: 'GV.Sector',
        property: {
            radius: {type: markConfig.properties.radius, value: 100000},
            color: {type: markConfig.properties.color},
            arcStart: {type: markConfig.properties.arcStart},
            arcEnd: {type: markConfig.properties.arcStart},
            style: {
                'render-lighting': {type: markConfig.style['render-lighting'], value: true},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling']}
            }
        }
    },
    'GV.Semicylinder': {
        name: 'GV.Semicylinder',
        property: {
            height: {type: markConfig.properties.height, value: 10000},
            radius: {type: markConfig.properties.radius, value: 100000},
            color: {type: markConfig.properties.color},
            arcStart: {type: markConfig.properties.arcStart},
            arcEnd: {type: markConfig.properties.arcStart},
            style: {
                'render-lighting': {type: markConfig.style['render-lighting'], value: true},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling']}
            }
        }
    },
    'GV.Ellipse': {
        name: 'GV.Ellipse',
        property: {
            radiusMajor: {type: markConfig.properties.radiusMajor, value: 200000},
            radiusMinor: {type: markConfig.properties.radiusMinor, value: 100000},
            rotationAngle: {type: markConfig.properties.rotationAngle},
            color: {type: markConfig.properties.color},
            arcStart: {type: markConfig.properties.arcStart},
            arcEnd: {type: markConfig.properties.arcStart, value: 360},
            style: {
                'render-lighting': {type: markConfig.style['render-lighting'], value: true},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling']}
            }
        }
    },
    'GV.Cylindroid': {
        name: 'GV.Cylindroid',
        property: {
            height: {type: markConfig.properties.height, value: 10000},
            radiusMajor: {type: markConfig.properties.radiusMajor, value: 200000},
            radiusMinor: {type: markConfig.properties.radiusMinor, value: 100000},
            rotationAngle: {type: markConfig.properties.rotationAngle},
            color: {type: markConfig.properties.color},
            arcStart: {type: markConfig.properties.arcStart},
            arcEnd: {type: markConfig.properties.arcStart},
            style: {
                'render-lighting': {type: markConfig.style['render-lighting'], value: true},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling']}
            }
        }
    },
    'GV.Ellipsoid': {
        name: 'GV.Ellipsoid',
        property: {
            radiusX: {type: markConfig.properties.radiusX, value: 100000},
            radiusY: {type: markConfig.properties.radiusY, value: 100000},
            radiusZ: {type: markConfig.properties.radiusZ, value: 200000},
            color: {type: markConfig.properties.color},
            style: {
                'render-lighting': {type: markConfig.style['render-lighting'], value: true},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling']}
            }
        }
    },
    'GV.Sphere': {
        name: 'GV.Sphere',
        property: {
            radius: {type: markConfig.properties.radius},
            height: {type: markConfig.properties.height},
            color: {type: markConfig.properties.color},
            style: {
                'render-lighting': {type: markConfig.style['render-lighting'], value: true},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling']}
            }
        }
    },
    'GV.Cone': {
        name: 'GV.Cone',
        property: {
            radius: {type: markConfig.properties.radius, value: 100000},
            height: {type: markConfig.properties.height},
            color: {type: markConfig.properties.color},
            bottomColor: {type: markConfig.properties.bottomColor},
            style: {
                'render-lighting': {type: markConfig.style['render-lighting'], value: true},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling']}
            }
        }
    },
    'GV.Polygon': {
        name: 'GV.Polygon',
        property: {
            style: {
                fill: {type: markConfig.style['fill']},
                stroke: {type: markConfig.style['stroke']},
                'stroke-width': {type: markConfig.style['stroke-width']},
                'altitude-clamping': {type: markConfig.style['altitude-clamping']},
                'altitude-technique': {type: markConfig.style['altitude-technique']},
                'render-lighting': {type: markConfig.style['render-lighting'], value: true},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling']}
            }
        }
    },
    'GV.Polyline': {
        name: 'GV.Polyline',
        property: {
            style: {
                stroke: {type: markConfig.style['stroke']},
                'stroke-width': {type: markConfig.style['stroke-width']},
                'altitude-clamping': {type: markConfig.style['altitude-clamping']},
                'altitude-technique': {type: markConfig.style['altitude-technique']},
                'render-lighting': {type: markConfig.style['render-lighting'], value: true},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling']}
            }
        }
    }
};
console.log(markFinalConfig);
	var setting = {
		view: {
			addHoverDom: addHoverDom,
			removeHoverDom: removeHoverDom,
			selectedMulti: false,
			showLine: false,
			addDiyDom: addDiyDom,
			showIcon: false
		},
		check: {
			enable: true
		},
		edit: {
			enable: true,
			editNameSelectAll: true,
			removeTitle: "删除图层",
			renameTitle: "编辑名称"
			// showRemoveBtn: showRemoveBtn,
			// showRenameBtn: showRenameBtn
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		callback: {
			beforeDrag: beforeDrag,
			beforeEditName: beforeEditName,
			beforeRemove: beforeRemove,
			beforeRename: beforeRename,
			onRemove: onRemove,
			onRename: onRename,
			onCheck: onCheck
		}
	};

	var zNodes =[
		{ id:1, pId:0, name:"父图层 1", open:true},
		{ id:11, pId:1, name:"子图层 1-1"},
		{ id:12, pId:1, name:"子图层 1-2"},
		{ id:13, pId:1, name:"子图层 1-3"},
		{ id:2, pId:0, name:"父节点 2", open:true},
		{ id:21, pId:2, name:"子图层 2-1"},
		{ id:22, pId:2, name:"子图层 2-2"},
		{ id:23, pId:2, name:"子图层 2-3"},
		{ id:3, pId:0, name:"父节点 3", open:true},
		{ id:31, pId:3, name:"子图层 3-1"},
		{ id:32, pId:3, name:"子图层 3-2"},
		{ id:33, pId:3, name:"子图层 3-3"}
	];
	var log, className = "dark";
	function beforeDrag(treeId, treeNodes) {
		return false;
	}
	function beforeEditName(treeId, treeNode) {
		className = (className === "dark" ? "":"dark");
		showLog("[ "+getTime()+" beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
		var zTree = $.fn.zTree.getZTreeObj("layerTree");
		zTree.selectNode(treeNode);
		setTimeout(function() {
			if (confirm("进入节点 -- " + treeNode.name + " 的编辑状态吗？")) {
				setTimeout(function() {
					zTree.editName(treeNode);
				}, 0);
			}
		}, 0);
		return false;
	}
	function onCheck(e, treeId, treeNode) {
		// count();
		// if (clearFlag) {
		// 	clearCheckedOldNodes();
		// }
	}
	function beforeRemove(treeId, treeNode) {
		className = (className === "dark" ? "":"dark");
		showLog("[ "+getTime()+" beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
		var zTree = $.fn.zTree.getZTreeObj("layerTree");
		zTree.selectNode(treeNode);
		return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
	}
	function onRemove(e, treeId, treeNode) {
		showLog("[ "+getTime()+" onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
	}
	function beforeRename(treeId, treeNode, newName, isCancel) {
		className = (className === "dark" ? "":"dark");
		showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
		if (newName.length == 0) {
			setTimeout(function() {
				var zTree = $.fn.zTree.getZTreeObj("layerTree");
				zTree.cancelEditName();
				alert("节点名称不能为空.");
			}, 0);
			return false;
		}
		return true;
	}
	function onRename(e, treeId, treeNode, isCancel) {
		showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
	}
	// function showRemoveBtn(treeId, treeNode) {
	// 	return !treeNode.isFirstNode;
	// }
	// function showRenameBtn(treeId, treeNode) {
	// 	return !treeNode.isLastNode;
	// }
	function showLog(str) {
		if (!log) log = $("#log");
		log.append("<li class='"+className+"'>"+str+"</li>");
		if(log.children("li").length > 8) {
			log.get(0).removeChild(log.children("li")[0]);
		}
	}
	function getTime() {
		var now= new Date(),
		h=now.getHours(),
		m=now.getMinutes(),
		s=now.getSeconds(),
		ms=now.getMilliseconds();
		return (h+":"+m+":"+s+ " " +ms);
	}

	var newCount = 1;
	function addHoverDom(treeId, treeNode) {
		var sObj = $("#" + treeNode.tId + "_span");
		if (!treeNode.editNameFlag && $("#addBtn_"+treeNode.tId).length==0){
			var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
				+ "' title='创建子图层' onfocus='this.blur();'></span>";
			sObj.after(addStr);
			var btn = $("#addBtn_"+treeNode.tId);
			if (btn) btn.bind("click", function(){
				var zTree = $.fn.zTree.getZTreeObj("layerTree");
				zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:"new node" + (newCount++)});
				return false;
			});
		}
		
		if (!treeNode.editNameFlag && $("#syncBtn_"+treeNode.tId).length==0){
			var syncStr = $(`<span class='button sync' id='syncBtn_${treeNode.tId}' title='同步' onfocus='this.blur();'></span>`);
			sObj.after(syncStr);
			
			var syncBtn = $("#syncBtn_"+treeNode.tId);
			if(syncBtn) syncBtn.bind("click",function(){
				var zTree = $.fn.zTree.getZTreeObj("layerTree");
				//单个协同控制点击事件
				return false;
			});
		}
		
	};
	function addDiyDom(treeId, treeNode) {
		var aObj = $("#" + treeNode.tId + "_a");
		if ($("#eyeBtn_"+treeNode.id).length>0) return;
		var eyeStr = $(`<span class='button eye' id='eyeBtn_${treeNode.tId}' title='隐藏图层开关' onfocus='this.blur();'></span>`);
		eyeStr.click(function(){
			// 隐藏自己和子图层
			$(this).parent().parent().toggleClass("hidden");
			// 切换隐藏开关图标
			$(this).toggleClass("eyeclose");
			// console.log(this,arguments);
		});
		aObj.append(eyeStr);
		// var btn = $("#eyeBtn_"+treeNode.id);
		// if (btn) btn.bind("click", function(){
			
		// });
	};

	function removeHoverDom(treeId, treeNode) {
		$("#addBtn_"+treeNode.tId).unbind().remove();
		$("#syncBtn_"+treeNode.tId).unbind().remove();
	};
	function selectAll() {
		var zTree = $.fn.zTree.getZTreeObj("layerTree");
		zTree.setting.edit.editNameSelectAll =  $("#selectAll").attr("checked");
	}
	
	$(document).ready(function(){
		$.fn.zTree.init($("#layerTree"), setting, zNodes);
		$("#selectAll").bind("click", selectAll);
	});

	var basicMarkData = "";
	var milMarkData = "";
	$.ajax({
		url:"../dist/plugins/subject_plugins/markPlugin/mark/basicMarkConfig/basic_mark.json",
		method:"GET"
	}).then(function(data){
		basicMarkData = data.data;
		fillMark(basicMarkData);
	});
	$(".tab.layer").click(function(){
		$("#toolsPanel").removeClass("actived");
		$("#layerPanel").addClass("actived");
	});
	$(".tab.tool").click(function(){
		$("#layerPanel").removeClass("actived");
		$("#toolsPanel").addClass("actived");
	});
	$(".menu_switch").click(function(){
		$(this).parent().toggleClass("dropdown");
	});
	$(".mark_popwindow .close,.mark_popwindow .mark_cancel").click(function(){
		$(".mark_popwindow").removeClass("open");
	});
	$(".labtn.import").click(function(){
		$(".mark_popwindow").toggleClass("open").find(".title").text("导入");
		$(".mark_btn").text("导入");
		$("#mark_main").html("").append($(`<div class="thead">
		<span class="name">名称</span>
		<span class="date">修改日期</span>
		<span class="type">类型</span>
		<span class="size">大小</span>
	</div>
	<div class="tbody">
		<ul>
			<li>
				<u class="icon"></u>
				<span class="name">文件夹/demo.js</span>
				<span class="date">2017/05/06/16:48</span>
				<span class="type">XML文档</span>
				<span class="size">3KB</span>
			</li>
		</ul>
		<div class="scrollbar">
	      <div class="force-overflow"></div>
	    </div>
	</div>`));
		
		
	});
	$(".labtn.save").click(function(){
		$(".mark_popwindow").toggleClass("open").find(".title").text("保存为");
		$(".mark_btn").text("保存");
		$("#mark_main").html("").append($(`<div class="inputgroup"><div class="label">文件名：</div><input type="text" name="save_dir"></div>`));
	});
	$("#basicMarkSelect").click(function(){
		$(".markRepo>.title>.text").text("基本标绘");
		$(".markRepo").attr("class","markRepo").addClass("basic").find(".title").removeClass("dropdown");
		fillMark(basicMarkData);
	});
	$("#milMarkSelect").click(function(){
		$(".markRepo>.title>.text").text("军事标绘");
		$(".markRepo").attr("class","markRepo").addClass("mil").find(".title").removeClass("dropdown");
		fillMark(milMarkData[0].data);
		$(".markRepo .tools li").css("border-color",milMarkData[0].color);
	});
	$(".markRepo>.tools").click(toolsClick);
	$(".recentTools .delete").click(function(){
		$(".recentTools .tools").html("");
	});

	$(".labtn.new").click(function(){
		var treeObj = $.fn.zTree.getZTreeObj("layerTree");
		var newNode = {name:"新图层"};
		newNode = treeObj.addNodes(null, newNode);
	});

	function fillMark(data){
		$(".markRepo .tools")
		.html("")
		.append(
			data.reduce(
				function(pre,cnt){
					var oLi = $(`<li title="${cnt.description}" data-id="${cnt.id}"  data-creator="${cnt.creator}"><span style="background-image:url('${cnt.image}')"></span></li>`);
					pre.push(oLi); 
					return pre;
				},[]
			)
		);
	}
	$.ajax({
		url:"../dist/plugins/subject_plugins/markPlugin/mark/militaryMarkConfig/mil_mark.json",
		method:"GET"
	}).then(function(data){
		milMarkData = data.tab;
		$(".milMark>span").each(function(i){
			$(this).css("border-color",milMarkData[i].color).attr("data-tabid",milMarkData[i].tabID).text(milMarkData[i].text);
			$(this).click(function(){
				fillMark(milMarkData[i].data);
				$(".markRepo .tools li").css("border-color",milMarkData[i].color);
			});
		});
	});


	function toolsClick(){
            
            var oTemp=document.elementFromPoint(event.clientX,event.clientY);
            var theLi = $(oTemp).parent().hasClass("tools") && /li/i.test(oTemp.tagName);
            var theSpan = $(oTemp).parent().parent().hasClass("tools") && /span/i.test(oTemp.tagName);
            if(theSpan){
                // 工具点击事件
                toolClick(oTemp.parentNode);
            }else if(theLi){
                // 工具点击事件
                toolClick(oTemp);
            }
            function toolClick(obj){
                var id = "rct_"+$(obj).attr("data-id");
                // console.log($(".recentTools:has(.tools)"));
                if($(".recentTools .tools:has(li#"+id+")").length >0){
                    return;
                }
                $(".recentTools .tools").append($(obj).clone().addClass("tempTool").attr("id",id));
                //更新属性
                var creator = $(obj).attr("data-creator");
                var config = markFinalConfig[creator];
                console.log(config);
                var propArr = [];
                var styleArr = [];
                
                
                for(var key in config.property){
                    if(key != "style"){
                        var text = config.property[key].type.label;
                        var type = config.property[key].type.type;
                        console.log(type);
                        switch(type){
                            case 'text': propArr.push($(`<li class="text">
                                                <span class="prop_label">${text}</span>
                                                <span class="value"><input type="text" name="${key}" value="0"><span class="unit">厘米</span></span>
                                            </li>`)[0]);
                            break;
                            case 'number': propArr.push($(`<li class="text">
                                                <span class="prop_label">${text}</span>
                                                <span class="value"><input type="text" name="${key}" value="0"><span class="unit">厘米</span></span>
                                            </li>`)[0]);
                            break;
                            case 'boolean': propArr.push($(`<li class="switch">
                                                <span class="prop_label">${text}</span>
                                                <span class="value">null<input type="hidden" name="${key}" value="yes"></span>
                                            </li>`)[0]);
                            break;
                            case 'select':break;
                            case 'color': propArr.push($(`<li class="color">
                                                            <span class="prop_label">${text}</span>
                                                            <span class="value"></span>
                                                        </li>`)[0]);
                            break;
                        }
                        
                    }
                }
                // console.log(propArr);
                $("#propModify").html("").append(propArr);
                var styleConfig = config.property.style
                for(var key in styleConfig){
                    var text = styleConfig[key].type.label;
                    var type = styleConfig[key].type.type;
                    console.log(type);
                    switch(type){
                        case 'text': styleArr.push($(`<li class="text">
                                            <span class="prop_label">${text}</span>
                                            <span class="value"><input type="text" name="${key}" value="0"><span class="unit">厘米</span></span>
                                        </li>`)[0]);
                        break;
                        case 'number': styleArr.push($(`<li class="text">
                                            <span class="prop_label">${text}</span>
                                            <span class="value"><input type="text" name="${key}" value="0"><span class="unit">厘米</span></span>
                                        </li>`)[0]);
                        break;
                        case 'boolean': styleArr.push($(`<li class="switch">
                                            <span class="prop_label">${text}</span>
                                            <span class="value">null<input type="hidden" name="${key}" value="yes"></span>
                                        </li>`)[0]);
                        break;
                        case 'select':;
                    }
                }
                $("#styleModify").html("").append(styleArr);
            }
        }
})