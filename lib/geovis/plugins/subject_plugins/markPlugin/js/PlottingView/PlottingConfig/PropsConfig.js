/**
 * 定义Style 属性
 * 
 */
export const htmlType = {
    TEXT: 'text', // 文本 input
    COLOR: 'color', // 颜色,颜色面板
    NUMBER: 'number', //数字
    SELECT: 'select', // 下拉选择
    BOOLEAN: 'boolean' // 布尔
};

export const style = {
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
    'altitude-clamping': {
        label: '贴地方式',
        type: htmlType.SELECT,
        options: {
            none: 'none',
            relative_gpu: 'relative-gpu',
            terrain_drape: 'terrain-drape',
            terrain_gpu: 'terrain-gpu',
        }
    },
    'line-stretch': {
        label: '拉伸至地面',
        type: htmlType.BOOLEAN
    },
    'stretch-color': {
        label: '连接地面线颜色',
        type: htmlType.COLOR
    },
    'line-extrusion': {
        label: '是否连接地面',
        type: htmlType.BOOLEAN
    },
    'extrusion-uniform': {
        label: '连接地面的线是否是同一颜色（line',
        type: htmlType.BOOLEAN
    },
    'extrusion-color': {
        label: '连接地面的线的颜色（extrusion',
        type: htmlType.COLOR
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
    'model-scale': {
        label: '缩放',
        type: htmlType.NUMBER,
    },
    'model-heading': {
        label: '偏转',
        type: htmlType.NUMBER
    },
    'model-pitch': {
        label: '俯仰',
        type: htmlType.NUMBER
    },
    'model-roll': {
        label: '翻滚',
        type: htmlType.NUMBER
    },
    'icon-align': {
        label: '图片位置',
        type: htmlType.SELECT,
        options: {
            'left-top': 'left-top',
            'left-center': 'left-center',
            'left-bottom': 'left-bottom',
            'center-top': 'center-top',
            'center-center': 'center-center',
            'center-bottom': 'center-bottom',
            'right-top': 'right-top',
            'right-center': 'right-center',
            'right-bottom': 'right-bottom',
        }
    },
    fill: {
        label: '填充色',
        type: htmlType.COLOR
    },
    'stroke': {
        label: '轮廓线颜色',
        type: htmlType.COLOR
    },
    'stroke-width': {
        label: '线宽',
        type: htmlType.TEXT
    },
    'stroke-tessellation': {
        label: '线段段数',
        type: htmlType.NUMBER
    },
    'stroke-rounding-ratio': {
        label: '拐角片段的比例',
        type: htmlType.NUMBER
    },
    'stroke-stipple-pattern': {
        label: '点划线模式',
        type: htmlType.NUMBER
    },
    'stroke-stipple-factor': {
        label: '重绘点的数目',
        type: htmlType.NUMBER
    },
    'stroke-min-pixels': {
        label: '最小渲染宽度',
        type: htmlType.NUMBER
    },
    'stroke-linecap': {
        label: '线端点处理',
        type: htmlType.SELECT,
        options: {
            'square': 'square',
            'flat': 'flat',
            'round': 'round'
        }
    },
    'stroke-linejoin': {
        label: '线连接处处理',
        type: htmlType.SELECT,
        options: {
            'miter': 'miter',
            'round': 'round'
        }
    },
    'point-fill': {
        label: '颜色',
        type: htmlType.COLOR
    },
    'point-size': {
        label: '尺寸',
        type: htmlType.NUMBER
    },
    'text-color': {
        label: '字体颜色',
        type: htmlType.COLOR
    },
    'text-fill': {
        label: '字体填充颜色',
        type: htmlType.COLOR
    },
    'text-fill-opacity': {
        label: '填充色的透明度',
        type: htmlType.NUMBER
    },
    'text-size': {
        label: '字体大小',
        type: htmlType.NUMBER,
    },
    'text-halo': {
        label: '边框颜色',
        type: htmlType.COLOR
    },
    'text-halo-show': {
        label: '是否显示边框',
        type: htmlType.BOOLEAN
    },
    'text-halo-color': {
        label: '字体边框颜色',
        type: htmlType.COLOR
    },
    'text-halo-fill': {
        label: '是否对边框填充',
        type: htmlType.BOOLEAN
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
    'text-layout': {
        label: 'TEXT的布局',
        type: htmlType.SELECT,
        options: {
            'ltr': 'ltr',
            'rtl': 'rtl',
            'vertical': 'vertical'
        }
    },
    'text-encoding': {
        label: '的文字编码方式',
        type: htmlType.SELECT,
        options: {
            'utf-8': 'utf-8',
            'utf-16': 'utf-16',
            'utf-32': 'utf-32',
            'ascii': 'ascii',
        }
    },
    'text-declutter': {
        label: '是否重叠',
        type: htmlType.BOOLEAN
    },
    'text-axis-alignment': {
        label: '轴对齐方式',
        type: htmlType.SELECT,
        options: {
            'xy-plane': 'xy-plane',
            'reversed-xy-plane': 'reversed-xy-plane',
            'xz-plane': 'xz-plane',
            'reversed-xz-plane': 'reversed-xz-plane',
            'yz-plane': 'yz-plane',
            'reversed-yz-plane': 'reversed-yz-plane',
            'screen': 'screen',
            'user-defined-rotation': 'user-defined-rotation',
        }
    },
    'text-character-size-mode': {
        label: '大小模式',
        type: htmlType.SELECT,
        options: {
            'object-coords': 'object-coords',
            'screen-coords': 'screen-coords',
            'object-screen-coords': 'object-screen-coords'
        }
    },
    'text-gradient': {
        label: '渐变色模式',
        type: htmlType.SELECT,
        options: {
            'solid': 'solid',
            'per-character': 'per-character',
            'overall': 'overall'
        }
    },
    'text-gradient-ltcolor': {
        label: '左上角颜色',
        type: htmlType.COLOR
    },
    'text-gradient-rtcolor': {
        label: '右下角颜色',
        type: htmlType.COLOR
    },
    'text-gradient-lbcolor': {
        label: '左下角颜色',
        type: htmlType.COLOR
    },
    'text-gradient-rbcolor': {
        label: '右下角颜色',
        type: htmlType.COLOR
    },
    'text-used-3d': {
        label: '是否3D显示',
        type: htmlType.BOOLEAN
    },
    'text-link-line': {
        label: '是否有连接线',
        type: htmlType.BOOLEAN
    },
    'mesh-uniform': {
        label: '是否使用同一颜色',
        type: htmlType.BOOLEAN
    },
    'max-visible-distance': {
        label: '最大显示距离',
        type: htmlType.NUMBER
    },
    'min-visible-distance': {
        label: '最小显示距离',
        type: htmlType.NUMBER
    },
    'max-visible-range': {
        label: '最大可视相机高度',
        type: htmlType.NUMBER
    },
    'min-visible-range': {
        label: '最小可视相机高度',
        type: htmlType.NUMBER
    },
    'mesh-color': {
        label: '实体颜色',
        type: htmlType.COLOR
    },
    'mesh-color-top': {
        label: '顶部颜色',
        type: htmlType.COLOR
    },
    'mesh-color-bottom': {
        label: '底面颜色',
        type: htmlType.COLOR
    },
    'mesh-color-flank': {
        label: '侧面颜色',
        type: htmlType.COLOR
    },
    'mesh-mode': {
        label: '填充方式',
        type: htmlType.SELECT,
        options: {
            'line': 'line',
            'fill': 'fill'
        }
    },
    'mesh-frame': {
        label: '是否显示边框线',
        type: htmlType.BOOLEAN
    },
    'mesh-frame-color': {
        label: '边框线颜色',
        type: htmlType.COLOR
    },
    'mesh-line-width': {
        label: '边框线宽度',
        type: htmlType.NUMBER
    },
    'mesh-roll': {
        label: '翻滚角',
        type: htmlType.NUMBER
    },
    'mesh-scale': {
        label: '等比例缩放',
        type: htmlType.NUMBER
    },
    'mesh-pitch': {
        label: '俯仰角',
        type: htmlType.NUMBER
    },
    'meah-heading': {
        label: '偏航角',
        type: htmlType.NUMBER
    },
    'icon-roll': {
        label: '翻滚角',
        type: htmlType.NUMBER
    },
    'icon-size': {
        label: '大小',
        type: htmlType.NUMBER
    },
    'icon-pitch': {
        label: '俯仰角',
        type: htmlType.NUMBER
    },
    'icon-mode': {
        label: '图标显示模式',
        type: htmlType.SELECT,
        options: {
            'spirit': 'spirit',
            'not-spirit': 'not-spirit',
            'billboard-not-rotate': 'billboard-not-rotate',
            'local-element': 'local-element'    ,
            'front-always': 'front-always'       
        }
    },
    'icon-link-line': {
        label: '是否有连接线',
        type: htmlType.BOOLEAN
    },
    'icon-alpha': {
        label: '透明度',
        type: htmlType.NUMBER
    },
    'effect-size': {
        label: '设置大小',
        type: htmlType.NUMBER
    },
    'effect-frequency': {
        label: '点特效频率',
        type: htmlType.NUMBER
    },
    'effect-duration': {
        label: '点特效时长',
        type: htmlType.NUMBER
    },
    'effect-mode': {
        label: '点特效模式',
        type: htmlType.SELECT,
        options: {
            'flicker': 'flicker',
            'rotate': 'rotate',
            'scale': 'scale'         
        }
    },
    'effect-offset-x': {
        label: '相对绑定对象x',
        type: htmlType.NUMBER
    },
    'effect-offset-y': {
        label: '相对绑定对象y',
        type: htmlType.NUMBER
    },
    'jb-color': {
        label: '军标颜色',
        type: htmlType.COLOR
    },
    'jb-symbol-size':{
        label: '符号大小',
        type: htmlType.NUMBER
    },
    'jb-text-color': {
        label: '军标文字颜色',
        type: htmlType.COLOR
    },
    'jb-text-position': {
        label: '文字位置',
        type: htmlType.NUMBER
    },
    'jb-text-rotation': {
        label: '文字旋转',
        type: htmlType.NUMBER
    },
    'jb-lining-color': {
        label: '线标颜色',
        type: htmlType.COLOR
    },
    'jb-show-mode': {
        label: '军标显示模式',
        type: htmlType.NUMBER
    },
    'jb-text-size': {
        label: '军标文字大小',
        type: htmlType.NUMBER
    },
    'jb-scale': {
        label: '军标缩放',
        type: htmlType.NUMBER
    },
    'jb-line-width': {
        label: '军标线宽度',
        type: htmlType.NUMBER
    },
    'jb-line-type': {
        label: '军标线线型',
        type: htmlType.SELECT,
        options: {
            'solid': 'solid',
            'dashed': 'dashed'        
        }
    },
    'jb-thickness': {
        label: '军标线厚度',
        type: htmlType.NUMBER
    },
    'jb-angle':{
        label:'点标角度',
        type: htmlType.NUMBER
    },
    'jb-erect':{
        label:'点标直立',
        type: htmlType.BOOLEAN
    },
    'jb-mode-type':{
        label:'军标类型',
        type: htmlType.NUMBER
    },
    'jb-bis-gradient-fill':{
        label:'渐变填充',
        type: htmlType.BOOLEAN
    },
    'jb-fill-color':{
        label:'填充色',
        type: htmlType.COLOR
    },
    'jb-color-begin':{
        label:'起始渐变色',
        type: htmlType.COLOR
    },
    'jb-color-end':{
        label:'结尾渐变色',
        type: htmlType.COLOR
    },
    'jb-bis-serif':{
        label:'衬色',
        type: htmlType.BOOLEAN
    },
    'jb-lining-color-serif':{
        label:'衬线颜色',
        type: htmlType.COLOR
    },
    'jb-line-thickness': {
        label: '衬线厚度',
        type: htmlType.NUMBER
    },
    'jb-line-width-serif': {
        label: '衬线宽度',
        type: htmlType.NUMBER
    },
    'jb-line-type-serif': {
        label: '衬线类型',
        type: htmlType.SELECT,
        options: {
            'solid': 'solid',
            'dashed': 'dashed'        
        }
    },
    'jb-topographic':{
        label:'依地形线显示',
        type: htmlType.BOOLEAN
    },
    'jb-add-height':{
        label:'附加高度',
        type: htmlType.NUMBER
    },
    'jb-centain-thickness':{
        label:'军标厚度',
        type: htmlType.NUMBER
    },
    //new jb common style
    'mil-render-mode': {
        label: '绘制形态',
        type: htmlType.SELECT,
        options: {
            raster: 'raster',
            vector: 'vector'
        }
    },
    'mil-size-mode': {
        label: '显示模式',
        type: htmlType.SELECT,
        options: {
            object: 'object',
            // screen: 'screen'
        }
    },
    'mil-fill-mode': {
        label: '填充方式',
        type: htmlType.SELECT,
        options: {
            none: 'none',
            solid: 'solid',
            gradient: 'gradient',
            pattern: 'pattern'
        }
    },
    'mil-color': {
        label: '军标颜色',
        type: htmlType.COLOR
    },
    'mil-heading': {
        label: 'Z轴角度(点标)',
        type: htmlType.NUMBER
    },
    'mil-roll': {
        label: 'Y轴角度(点标)',
        type: htmlType.NUMBER
    },
    'mil-pitch': {
        label: 'X轴角度(点标)',
        type: htmlType.NUMBER
    },
    'mil-supplement-color': {
        label: '军标衬色',
        type: htmlType.COLOR
    },
    'mil-thickness': {
        label: '厚度',
        type: htmlType.NUMBER
    },

    //new jbPoint style   
    'mil-size': {
        label: '点标大小',
        type: htmlType.NUMBER
    },
    //todo
    'mil-azimuth': {},

    //new jbLine style
    'mil-fill-color': {
        label: '填充色',
        type: htmlType.COLOR
    },
    'mil-gradient-color': {
        label: '渐变色',
        type: htmlType.COLOR
    },
    'mil-line-width': {
        label: '线宽(线标)',
        type: htmlType.NUMBER
    },
    'mil-line-type': {
        label: '军标线型',
        type: htmlType.SELECT,
        options: {
            solid: 'solid',
            dashed: 'dashed'        
        }
    },
    'mil-text':{
        label:'文字',
        type:htmlType.TEXT
    },
    'mil-text-size':{
        label:'文字大小',
        type:htmlType.NUMBER
    }
}

export const properties = {
    text: {
        label: '文本',
        type: htmlType.TEXT,
        required: true
    },
    icon: {
        label: '图片路径',
        type: htmlType.TEXT
    },
    arcEnd: {
        label: '终止角',
        type: htmlType.NUMBER
    },
    arcStart: {
        label: '起始角',
        type: htmlType.NUMBER
    },
    z: {
        label: 'Z',
        type: htmlType.NUMBER,
        min: 0
    },
    y: {
        label: 'Y',
        type: htmlType.NUMBER,
        min: 0
    },
    x: {
        label: 'X',
        type: htmlType.NUMBER,
        min: 0
    },
    radiusX: {
        label: 'X轴',
        type: htmlType.NUMBER,
        min: 0
    },
    radiusY: {
        label: 'Y轴',
        type: htmlType.NUMBER,
        min: 0
    },
    radiusZ: {
        label: 'Z轴',
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
    },
    radiusMinor: {
        label: '短半轴',
        type: htmlType.NUMBER,
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
    height: {
        label: '高度',
        type: htmlType.NUMBER,
        min: 0
    },
    bottomColor: {
        label: '底部填充色',
        type: htmlType.COLOR
    },
    url: {
        label: '路径',
        type: htmlType.TEXT
    },
    visible: {
        label: '是否可见',
        type: htmlType.BOOLEAN
    },
    dataUrl: {
        label: '资源路径',
        type: htmlType.TEXT
    },
    topColors: {
        label: '顶部颜色数组',
        type: htmlType.COLOR
    },
    bottomColors: {
        label: '底部颜色数组',
        type: htmlType.COLOR
    },
    lib: {
        label: '军标库',
        type: htmlType.NUMBER
    },
    code: {
        label: '军标编码',
        type: htmlType.NUMBER
    },

}
