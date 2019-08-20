import * as Config from './PropsConfig';

export default {
    'GV.Label': {
        name: 'GV.Label',
        property: {
            visible: {type: Config.properties.visible, value: true},
            text: {type: Config.properties.text, value: 'HELLO GEOVIS'},
            style: {
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'none'},
                // 'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                // 'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: false},
                'render-transparent': {type: Config.style['render-transparent'], value: true},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'text-color': {type: Config.style['text-color'], value: '#FFFFFFFF'},
                'text-size': {type: Config.style['text-size'], value: 50},
                'text-halo-show': {type: Config.style['text-halo-show'], value: false},
                'text-halo': {type: Config.style['text-halo'], value: '#FF0000FF'},
                'text-halo-color': {type: Config.style['text-halo-color'], value: '#FF0000FF'},
                'text-halo-fill': {type: Config.style['text-halo-fill'], value: false},
                'text-align': {type: Config.style['text-align'], value: 'center-center'},
                'text-layout': {type: Config.style['text-layout'], value: 'ltr'},
                'text-encoding': {type: Config.style['text-encoding'], value: 'utf-8'},
                'text-declutter': {type: Config.style['text-declutter'], value: 'true'},
                'text-axis-alignment': {type: Config.style['text-axis-alignment'], value: 'screen'},
                'text-character-size-mode': {type: Config.style['text-character-size-mode'], value: 'screen-coords'},
                'text-gradient': {type: Config.style['text-gradient'], value: 'solid'},
                'text-gradient-ltcolor': {type: Config.style['text-gradient-ltcolor'], value: '#FFFFFFFF'},
                'text-gradient-rtcolor': {type: Config.style['text-gradient-rtcolor'], value: '#FFFFFFFF'},
                'text-gradient-lbcolor': {type: Config.style['text-gradient-lbcolor'], value: '#FF0000FF'},
                'text-gradient-rbcolor': {type: Config.style['text-gradient-rbcolor'], value: '#FF0000FF'},
                'text-used-3d': {type: Config.style['text-used-3d'], value: false},
                'text-link-line': {type: Config.style['text-link-line'], value: true},
            }
        },
    },
    'GV.Place': {
        name: 'GV.Place',
        property: {
            visible: {type: Config.properties.visible, value: true},
            text: {type: Config.properties.text, value: 'HELLO GEOVIS'},
            url: {type: Config.properties.url, value: 'http://127.0.0.1:3000/docResource/place_default.png'},
            style: {
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'none'},
                // 'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                // 'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: false},
                'render-transparent': {type: Config.style['render-transparent'], value: false},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'text-color': {type: Config.style['text-color'], value: '#FF00FFF0'},
                'text-size': {type: Config.style['text-size'], value: 50},
                'text-declutter': {type: Config.style['text-declutter'], value: false},
            }
        },
    },
    'GV.ImageOverLay': {
        name: 'GV.ImageOverLay',
        property: {
            visible: {type: Config.properties.visible, value: true},
            minLon: {type: Config.properties.minLon, value: 0},
            minLat: {type: Config.properties.minLat, value: 0},
            maxLon: {type: Config.properties.maxLon, value: 90},
            maxLat: {type: Config.properties.maxLat, value: 90},
            url: {type: Config.properties.url, value: 'airforce.png'},
            alpha: {type: Config.properties.alpha, value: 1},
            style: {
                // 'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                // 'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: true},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
            }
        }
    },
    'GV.Model': {
        name: 'GV.Model',
        property: {
            visible: {type: Config.properties.visible, value: true},
            url: {type: Config.properties.url, value: 'E3A.IVE'},
            style: {
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'none'},
                // 'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                // 'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: false},
                'render-transparent': {type: Config.style['render-transparent'], value: true},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'model-scale': {type: Config.style['model-scale'], value: 100000},
                'model-heading': {type: Config.style['model-heading'], value: 0},
                'model-pitch': {type: Config.style['model-pitch'], value: 0},
                'model-roll': {type: Config.style['model-roll'], value: 0},
            }
        }
    },
    'GV.Circle': {
        name: 'GV.Circle',
        property: {
            visible: {type: Config.properties.visible, value: true},
            radius: {type: Config.properties.radius, value: 1000000},
            style: {
                // 'max-visible-distance': {type: Config.style['max-visible-distance'], value: -1},
                // 'min-visible-distance': {type: Config.style['min-visible-distance'], value: -1},
                // 'max-visible-range': {type: Config.style['max-visible-range'], value: -1},
                // 'min-visible-range': {type: Config.style['min-visible-range'], value: -1},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: false},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'mesh-mode': {type: Config.style['mesh-mode'], value: 'fill'},
                'mesh-color': {type: Config.style['mesh-color'], value: '#ffffff'},
            }
        }
    },
    'GV.Cylinder': {
        name: 'GV.Cylinder',
        property: {
            visible: {type: Config.properties.visible, value: true},
            radius: {type: Config.properties.radius, value: 1000000},
            height: {type: Config.properties.height, value: 1000000},
            style: {
                // 'max-visible-distance': {type: Config.style['max-visible-distance'], value: -1},
                // 'min-visible-distance': {type: Config.style['min-visible-distance'], value: -1},
                // 'max-visible-range': {type: Config.style['max-visible-range'], value: -1},
                // 'min-visible-range': {type: Config.style['min-visible-range'], value: -1},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: false},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'mesh-mode': {type: Config.style['mesh-mode'], value: 'fill'},
                'mesh-color': {type: Config.style['mesh-color'], value: '#ffffff'},
            }
        }
    },
    'GV.Sector': {
        name: 'GV.Sector',
        property: {
            visible: {type: Config.properties.visible, value: true},
            radius: {type: Config.properties.radius, value: 1000000},
            arcStart: {type: Config.properties.arcStart, value: 0},
            arcEnd: {type: Config.properties.arcEnd, value: 270},
            style: {
                // 'max-visible-distance': {type: Config.style['max-visible-distance'], value: -1},
                // 'min-visible-distance': {type: Config.style['min-visible-distance'], value: -1},
                // 'max-visible-range': {type: Config.style['max-visible-range'], value: -1},
                // 'min-visible-range': {type: Config.style['min-visible-range'], value: -1},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: false},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'mesh-mode': {type: Config.style['mesh-mode'], value: 'fill'},
                'mesh-color': {type: Config.style['mesh-color'], value: '#ffffff'},
            }
        }
    },
    'GV.Semicylinder': {
        name: 'GV.Semicylinder',
        property: {
            visible: {type: Config.properties.visible, value: true},
            radius: {type: Config.properties.radius, value: 500000},
            height: {type: Config.properties.height, value: 1000000},
            arcStart: {type: Config.properties.arcStart, value: 0},
            arcEnd: {type: Config.properties.arcEnd, value: 270},
            style: {
                // 'max-visible-distance': {type: Config.style['max-visible-distance'], value: -1},
                // 'min-visible-distance': {type: Config.style['min-visible-distance'], value: -1},
                // 'max-visible-range': {type: Config.style['max-visible-range'], value: -1},
                // 'min-visible-range': {type: Config.style['min-visible-range'], value: -1},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: false},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'mesh-mode': {type: Config.style['mesh-mode'], value: 'fill'},
                'mesh-color': {type: Config.style['mesh-color'], value: '#ffffff'},
            }
        },
    },
    'GV.Ellipse': {
        name: 'GV.Ellipse',
        property: {
            visible: {type: Config.properties.visible, value: true},
            height: {type: Config.properties.height, value: 0},
            arcStart: {type: Config.properties.arcStart, value: 0},
            arcEnd: {type: Config.properties.arcEnd, value: 360},
            radiusX: {type: Config.properties.radiusX, value: 1000000},
            radiusY: {type: Config.properties.radiusY, value: 500000},
            style: {
                // 'max-visible-distance': {type: Config.style['max-visible-distance'], value: -1},
                // 'min-visible-distance': {type: Config.style['min-visible-distance'], value: -1},
                // 'max-visible-range': {type: Config.style['max-visible-range'], value: -1},
                // 'min-visible-range': {type: Config.style['min-visible-range'], value: -1},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: false},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'mesh-mode': {type: Config.style['mesh-mode'], value: 'fill'},
                'mesh-color': {type: Config.style['mesh-color'], value: '#ffffff'},
            }
        },
    },
    'GV.Cylindroid': {
        name: 'GV.Cylindroid',
        property: {
            visible: {type: Config.properties.visible, value: true},
            height: {type: Config.properties.height, value: 0},
            arcStart: {type: Config.properties.arcStart, value: 0},
            arcEnd: {type: Config.properties.arcEnd, value: 360},
            radiusX: {type: Config.properties.radiusX, value: 1000000},
            radiusY: {type: Config.properties.radiusY, value: 500000},
            style: {
                // 'max-visible-distance': {type: Config.style['max-visible-distance'], value: -1},
                // 'min-visible-distance': {type: Config.style['min-visible-distance'], value: -1},
                // 'max-visible-range': {type: Config.style['max-visible-range'], value: -1},
                // 'min-visible-range': {type: Config.style['min-visible-range'], value: -1},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: false},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'mesh-mode': {type: Config.style['mesh-mode'], value: 'fill'},
                'mesh-color': {type: Config.style['mesh-color'], value: '#ffffff'},
            }
        },
    },
    'GV.Ellipsoid': {
        name: 'GV.Ellipsoid',
        property: {
            visible: {type: Config.properties.visible, value: true},
            radiusX: {type: Config.properties.radiusX, value: 600000},
            radiusY: {type: Config.properties.radiusY, value: 700000},
            radiusZ: {type: Config.properties.radiusZ, value: 800000},
            style: {
                // 'max-visible-distance': {type: Config.style['max-visible-distance'], value: -1},
                // 'min-visible-distance': {type: Config.style['min-visible-distance'], value: -1},
                // 'max-visible-range': {type: Config.style['max-visible-range'], value: -1},
                // 'min-visible-range': {type: Config.style['min-visible-range'], value: -1},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: false},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'mesh-mode': {type: Config.style['mesh-mode'], value: 'fill'},
                'mesh-color': {type: Config.style['mesh-color'], value: '#ffffff'},
            }
        },
    },
    'GV.Sphere': {
        name: 'GV.Sphere',
        property: {
            visible: {type: Config.properties.visible, value: true},
            radius: {type: Config.properties.radius, value: 1000000},
            style: {
                // 'max-visible-distance': {type: Config.style['max-visible-distance'], value: -1},
                // 'min-visible-distance': {type: Config.style['min-visible-distance'], value: -1},
                // 'max-visible-range': {type: Config.style['max-visible-range'], value: -1},
                // 'min-visible-range': {type: Config.style['min-visible-range'], value: -1},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: false},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'mesh-mode': {type: Config.style['mesh-mode'], value: 'fill'},
                'mesh-color': {type: Config.style['mesh-color'], value: '#ffffff'},
            }
        },
    },
    'GV.Cone': {
        name: 'GV.Cone',
        property: {
            visible: {type: Config.properties.visible, value: true},
            height: {type: Config.properties.height, value: 1000000},
            radius: {type: Config.properties.radius, value: 800000},
            style: {
                // 'max-visible-distance': {type: Config.style['max-visible-distance'], value: -1},
                // 'min-visible-distance': {type: Config.style['min-visible-distance'], value: -1},
                // 'max-visible-range': {type: Config.style['max-visible-range'], value: -1},
                // 'min-visible-range': {type: Config.style['min-visible-range'], value: -1},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: false},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'mesh-mode': {type: Config.style['mesh-mode'], value: 'fill'},
                'mesh-color': {type: Config.style['mesh-color'], value: '#FFFFFF'},
            }
        },
    },
    'GV.Polygon': {
        name: 'GV.Polygon',
        property: {
            visible: {type: Config.properties.visible, value: true},
            style: {
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'none'},
               // 'max-visible-distance': {type: Config.style['max-visible-distance'], value: -1},
                //'min-visible-distance': {type: Config.style['min-visible-distance'], value: -1},
               // 'max-visible-range': {type: Config.style['max-visible-range'], value: -1},
                'render-transparent': {type: Config.style['render-transparent'], value: false},
                'stroke': {type: Config.style['stroke'], value: '#FFFFFFFF'},
                'stroke-width': {type: Config.style['stroke-width'], value: '3px'},
                'stroke-min-pixels': {type: Config.style['stroke-min-pixels'], value: '3px' },
                'stroke-tessellation': {type: Config.style['stroke-tessellation'], value: undefined},
                'stroke-stipple-pattern': {type: Config.style['stroke-stipple-pattern'], value: undefined },
                'stroke-stipple-factor': {type: Config.style['stroke-stipple-factor'], value: undefined },
                'stroke-linejoin': {type: Config.style['stroke-linejoin'], value: undefined },
                'stroke-linecap': {type: Config.style['stroke-linecap'], value: undefined },
                'stroke-rounding-ratio': {type: Config.style['stroke-rounding-ratio'], value: 0.5 },
                //'line-extrusion': {type: Config.style['line-extrusion'], value: true},
                'fill': {type: Config.style['fill'], value: '#FFFFFFFF'},
            
            }
        },
    },
    'GV.Polyline': {
        name: 'GV.Polyline',
        property: {
            visible: {type: Config.properties.visible, value: true},
            style: {
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'terrain-drape'},
                //'max-visible-distance': {type: Config.style['max-visible-distance'], value: -1},
                //'min-visible-distance': {type: Config.style['min-visible-distance'], value: -1},
                //'max-visible-range': {type: Config.style['max-visible-range'], value: -1},
                //'render-transparent': {type: Config.style['render-transparent'], value: false},
                'stroke': {type: Config.style['stroke'], value: '#FFFFFFFF'},
                'stroke-width': {type: Config.style['stroke-width'], value: '3px'},
                'stroke-min-pixels': {type: Config.style['stroke-min-pixels'], value: '3px' },
                 'stroke-tessellation': {type: Config.style['stroke-tessellation'], value: undefined},
                // 'stroke-stipple-pattern': {type: Config.style['stroke-stipple-pattern'], value: undefined },
                // 'stroke-stipple-factor': {type: Config.style['stroke-stipple-factor'], value: undefined },
                'stroke-linejoin': {type: Config.style['stroke-linejoin'], value: undefined },
                'stroke-linecap': {type: Config.style['stroke-linecap'], value: undefined },
                // 'stroke-rounding-ratio': {type: Config.style['stroke-rounding-ratio'], value: 0.5 },
                //'line-extrusion': {type: Config.style['line-extrusion'], value: true},
                //  'fill': {type: Config.style['fill'], value: '#FFFFFFFF'},
                //'extrusion-height': {type: Config.style['extrusion-height'], value: 10},
            }
        },
    },
    'GV.Cube': {
        name: 'GV.Cube',
        property: {
            visible: {type: Config.properties.visible, value: true},
            x: {type: Config.properties.x, value: 1000000},
            y: {type: Config.properties.y, value: 1000000},
            z: {type: Config.properties.z, value: 1000000},
            style: {
                // 'max-visible-distance': {type: Config.style['max-visible-distance'], value: -1},
                // 'min-visible-distance': {type: Config.style['min-visible-distance'], value: -1},
                // 'max-visible-range': {type: Config.style['max-visible-range'], value: -1},
                // 'min-visible-range': {type: Config.style['min-visible-range'], value: -1},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: false},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'mesh-mode': {type: Config.style['mesh-mode'], value: 'fill'},
                'mesh-color': {type: Config.style['mesh-color'], value: '#ffffff'},
            }
        },
    },
    'GV.Icon': {
        name: 'GV.Icon',
        property: {
            visible: {type: Config.properties.visible, value: true},
            url: {type: Config.properties.url, value: 'http://127.0.0.1:3000/docResource/place_default.png'},
            style: {
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'absolute'},
                // 'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                // 'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'icon-scale': {type: Config.style['icon-scale'], value: 1},
                'icon-heading': {type: Config.style['icon-heading'], value: 0},
                'icon-roll': {type: Config.style['icon-roll'], value: 0},
                'icon-pitch': {type: Config.style['icon-pitch'], value: 0},
                'icon-size': {type: Config.style['icon-size'], value: 10000},
                'icon-declutter': {type: Config.style['icon-declutter'], value: false},
                'icon-align': {type: Config.style['icon-align'], value: 'left-top'},
                'icon-mode': {type: Config.style['icon-mode'], value: 'front-always'},
                'icon-link-line': {type: Config.style['icon-link-line'], value: true},
                'icon-alpha': {type: Config.style['icon-alpha'], value: 1}
            }
        },
    },
    'GV.Spline': {
        name: 'GV.Spline',
        property: {
            visible: {type: Config.properties.visible, value: true},
            style: {
                //'max-visible-distance': {type: Config.style['max-visible-distance'], value: -1},
                //'min-visible-distance': {type: Config.style['min-visible-distance'], value: -1},
                //'max-visible-range': {type: Config.style['max-visible-range'], value: -1},
                //'render-transparent': {type: Config.style['render-transparent'], value: false},
                'render-lighting': {type: Config.style['render-lighting'], value: false},
                'stroke': {type: Config.style['stroke'], value: '#FFFFFFFF'},
                'stroke-width': {type: Config.style['stroke-width'], value: '3px'},
                //'stroke-tessellation': {type: Config.style['stroke-tessellation'], value: undefined},
                //'stroke-stipple-pattern': {type: Config.style['stroke-stipple-pattern'], value: undefined },
                //'stroke-stipple-factor': {type: Config.style['stroke-stipple-factor'], value: undefined },
                //'line-stretch': {type: Config.style['line-stretch'], value: false},
                //'stretch-color': {type: Config.style['stretch-color'], value: '#FFFFFFFF'}
            }
        },
    },
    'GV.FireEffect': {
        name: 'GV.FireEffect',
        property: {
            visible: {type: Config.properties.visible, value: true},
            style: {
                'effect-size': {type: Config.style['effect-size'], value: 1000000},
            }
        },
    },
    'GV.SmokeEffect': {
        name: 'GV.SmokeEffect',
        property: {
            visible: {type: Config.properties.visible, value: true},
            style: {
                'effect-size': {type: Config.style['effect-size'], value: 1000000},
            }
        },
    },
    'GV.RainEffect': {
        name: 'GV.RainEffect',
        property: {
            visible: {type: Config.properties.visible, value: true},
            style: {
                'effect-size': {type: Config.style['effect-size'], value: 1000000},
            }
        },
    },
    'GV.PointEffect': {
        name: 'GV.PointEffect',
        property: {
            visible: {type: Config.properties.visible, value: true},
            url: {type: Config.properties.url, value: 'http://127.0.0.1:3000/docResource/star.png'},
            style: {
                'effect-size': {type: Config.style['effect-size'], value: 300},
                'effect-frequency': {type: Config.style['effect-frequency'], value: 1},
                'effect-duration': {type: Config.style['effect-duration'], value: 100},
                'effect-mode': {type: Config.style['effect-mode'], value: 'flicker'},
                'effect-offset-x': {type: Config.style['effect-offset-x'], value: 0},
                'effect-offset-y': {type: Config.style['effect-offset-y'], value: 0}
            }
        },
    },
    'GV.GeoMesh': {
        name: 'GV.GeoMesh',
        property: {
            visible: {type: Config.properties.visible, value: true},
            drawable: {type: Config.properties.drawable, value:  'url：http://127.0.0.1:3000/docResource/geoMeshSource.txt'},
            style: {
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'none'},
                // 'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                // 'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: true},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'mesh-mode': {type: Config.style['mesh-mode'], value: 'fill'},
            }
        },
    },
    'GV.LocalMesh': {
        name: 'GV.LocalMesh',
        property: {
            visible: {type: Config.properties.visible, value: true},
            drawable: {type: Config.properties.drawable},
            style: {
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'none'},
                // 'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                // 'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: true},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'mesh-mode': {type: Config.style['mesh-mode'], value: 'fill'},
                'mesh-roll': {type: Config.style['mesh-roll'], value: 0},
                'mesh-scale': {type: Config.style['mesh-scale'], value: 30000},
                'mesh-pitch': {type: Config.style['mesh-pitch'], value: 0},
                'meah-heading': {type: Config.style['meah-heading'], value: 0},
            }
        },
    },
    'GV.PointCloud': {
        name: 'GV.PointCloud',
        property: {
            visible: {type: Config.properties.visible, value: true},
            dataUrl: {type: Config.properties.dataUrl, value: 'http://127.0.0.1:3000/docResource/pointcloud.txt'},
            style: {
                'point-size': {type: Config.style['point-size'], value: 10},
                'point-fill': {type: Config.style['point-fill'], value: '#FF0000FF'},
                'mesh-mode': {type: Config.style['mesh-mode'], value: 'fill'},
                'mesh-roll': {type: Config.style['mesh-roll'], value: 0},
                'mesh-scale': {type: Config.style['mesh-scale'], value: 1},
                'mesh-pitch': {type: Config.style['mesh-pitch'], value: 0},
                'meah-heading': {type: Config.style['meah-heading'], value: 0},
            }
        },
    },
    'GV.JBPoint': {
        name: 'GV.JBPoint',
        property: {
            visible: {type: Config.properties.visible, value: true},
            lib: {type: Config.properties.lib, value: 10},           
            text: {type: Config.properties.text, value: 'jbPoint'},
            style: {
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'none'},
                // 'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                // 'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: true},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                // 'jb-angle':{type: Config.style['jb-angle'], value: 180},
                // 'jb-erect':{type: Config.style['jb-erect'], value: false},
                // 'jb-mode-type':{type: Config.style['jb-mode-type'], value: 0},         
                // 'jb-symbol-size':{type: Config.style['jb-symbol-size'], value: 200},
                // 'jb-color': {type: Config.style['jb-color'], value: '#FF0000FF'},
                // 'jb-bis-serif':{type: Config.style['jb-bis-serif'], value: true},
                // 'jb-lining-color-serif':{type: Config.style['jb-lining-color-serif'], value: '#CCCC66FF'},            
                // 'jb-line-thickness-serif':{type: Config.style['jb-line-thickness-serif'], value: 3000},
                // 'jb-line-width-serif':{type: Config.style['jb-line-width-serif'], value: 4},
                // 'jb-line-type-serif':{type: Config.style['jb-line-type-serif'], value: 'solid'},
                'jb-color': {type: Config.style['jb-color'], value: '#FF0000FF'},
                'jb-scale': {type: Config.style['jb-scale'], value: 1},
                'jb-text-color': {type: Config.style['jb-text-color'], value: '#000000ff'},
                'jb-text-size': {type: Config.style['jb-text-size'], value: 20},
                'jb-text-position': {type: Config.style['jb-text-position'], value: 0},
                'jb-text-rotation': {type: Config.style['jb-text-rotation'], value: 0},
            },
        },

    },
    'GV.JBLine': {
        name: 'GV.JBLine',
        property: {
            visible: {type: Config.properties.visible, value: true},
            lib: {type: Config.properties.lib, value: 10},
            text: {type: Config.properties.text, value: undefined},
            style: {
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'none'},
                // 'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                // 'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: true},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                // 'jb-color': {type: Config.style['jb-color'], value: '#FF0000FF'},
                // 'jb-thickness': {type: Config.style['jb-thickness'], value: 100},
                // 'jb-line-width': {type: Config.style['jb-line-width'], value: 1},
                // 'jb-line-type': {type: Config.style['jb-line-type'], value: 'solid'},
                // 'jb-bis-gradient-fill':{type: Config.style['jb-bis-gradient-fill'], value: true},
                // 'jb-fill-color':{type: Config.style['jb-fill-color'], value: '#00FF00FF'},
                // 'jb-color-begin':{type: Config.style['jb-color-begin'], value: '#FFFF00FF'},
                // 'jb-color-end':{type: Config.style['jb-color-end'], value: '#FF0000FF'},
                // 'jb-bis-serif':{type: Config.style['jb-bis-serif'], value: true},
                // 'jb-lining-color-serif':{type: Config.style['jb-lining-color-serif'], value: '#0000FFFF'},
                // 'jb-line-thickness-serif':{type: Config.style['jb-line-thickness-serif'], value:3000},
                // 'jb-line-width-serif':{type: Config.style['jb-line-width-serif'], value: 4},
                // 'jb-line-type-serif':{type: Config.style['jb-line-type-serif'], value: 'solid'},
                // 'jb-topographic':{type: Config.style['jb-topographic'], value: true},
                // 'jb-add-height':{type: Config.style['jb-add-height'], value: 500},
                // 'jb-centain-thickness':{type: Config.style['jb-centain-thickness'], value: 300}, 
                'jb-lining-color': {type: Config.style['jb-lining-color'], value: '#FF0000FF'},
                // 'jb-thickness': {type: Config.style['jb-thickness'], value: 100},
                'jb-line-width': {type: Config.style['jb-line-width'], value: 1}, 
            },
        },
    },
    'GV.MilItem': {
        name: 'GV.MilItem',
        property: {
            visible: {type: Config.properties.visible, value: true},
            lib: {type: Config.properties.lib, value: 10},
            text: {type: Config.properties.text, value: ''},
            // code: {type: Config.properties.code, value: undefined},
            style: {
                //common
                'mil-render-mode': {type: Config.style['mil-render-mode'], value: 'raster'},
                'mil-size-mode': {type: Config.style['mil-size-mode'], value: 'object'},
                'mil-text-size': {type: Config.style['mil-text-size'], value: 30},
                // 'mil-fill-mode': {type: Config.style['mil-fill-mode'], value: 'none'},
                'mil-color': {type: Config.style['mil-color'], value: '#FF0000FF'},
                'mil-supplement-color': {type: Config.style['mil-supplement-color'], value: '#FFFF00FF'},
                'mil-thickness': {type: Config.style['mil-thickness'], value: 10},

                //point
                'mil-size': {type: Config.style['mil-size'], value: 64},
                'mil-heading': {type: Config.style['mil-heading'], value: 0},
                'mil-roll': {type: Config.style['mil-roll'], value: 0},
                'mil-pitch': {type: Config.style['mil-pitch'], value: 0},
                
                //line
                'mil-line-width': {type: Config.style['mil-line-width'], value: 5}
            }
        }
    },
    'GV.MilItemPoint': {
        name: 'GV.MilItemPoint',
        property: {
            visible: {type: Config.properties.visible, value: true},
            lib: {type: Config.properties.lib, value: 10},
            text: {type: Config.properties.text, value: ''},
            // code: {type: Config.properties.code, value: undefined},
            style: {
                // 'mil-text': {type: Config.style['mil-text'], value: ''},
                'mil-text-size': {type: Config.style['mil-text-size'], value: 30},
                //common
                'mil-render-mode': {type: Config.style['mil-render-mode'], value: 'raster'},
                'mil-size-mode': {type: Config.style['mil-size-mode'], value: 'object'},
                // 'mil-fill-mode': {type: Config.style['mil-fill-mode'], value: 'none'},
                'mil-color': {type: Config.style['mil-color'], value: '#FF0000FF'},
                'mil-supplement-color': {type: Config.style['mil-supplement-color'], value: '#FFFF00FF'},
                'mil-thickness': {type: Config.style['mil-thickness'], value: 10},
                //point
                'mil-size': {type: Config.style['mil-size'], value: 64},
                'mil-heading': {type: Config.style['mil-heading'], value: 0},
                'mil-roll': {type: Config.style['mil-roll'], value: 0},
                'mil-pitch': {type: Config.style['mil-pitch'], value: 0},
                //line
                // 'mil-fill-color': {type: Config.style['mil-fill-color'], value: '#00FFFFFF'},
                // 'mil-gradient-color': {type: Config.style['mil-gradient-color'], value: '#FF00FFFF'},
                // 'mil-line-width': {type: Config.style['mil-line-width'], value: 5},
                // 'mil-line-type': {type: Config.style['mil-line-type'], value: 'solid'},
            }
        }
    },
    'GV.MilItemLine': {
        name: 'GV.MilItemLine',
        property: {
            visible: {type: Config.properties.visible, value: true},
            lib: {type: Config.properties.lib, value: 10},
            // code: {type: Config.properties.code, value: undefined},
            style: {
                //common
                'mil-render-mode': {type: Config.style['mil-render-mode'], value: 'raster'},
                'mil-size-mode': {type: Config.style['mil-size-mode'], value: 'object'},
                // 'mil-fill-mode': {type: Config.style['mil-fill-mode'], value: 'none'},
                'mil-color': {type: Config.style['mil-color'], value: '#FF0000FF'},
                'mil-supplement-color': {type: Config.style['mil-supplement-color'], value: '#FFFF00FF'},
                'mil-thickness': {type: Config.style['mil-thickness'], value: 10},
                //point
                // 'mil-size': {type: Config.style['mil-size'], value: 64},
                //line
                // 'mil-fill-color': {type: Config.style['mil-fill-color'], value: '#00FFFFFF'},
                // 'mil-gradient-color': {type: Config.style['mil-gradient-color'], value: '#FF00FFFF'},
                'mil-line-width': {type: Config.style['mil-line-width'], value: 5},
                // 'mil-line-type': {type: Config.style['mil-line-type'], value: 'solid'},
            }
        }
    },
    'GV.MilItemOther': {
        name: 'GV.MilItemOther',
        property: {
            visible: {type: Config.properties.visible, value: true},
            lib: {type: Config.properties.lib, value: 10},
            // code: {type: Config.properties.code, value: undefined},
            style: {
                //common
                'mil-render-mode': {type: Config.style['mil-render-mode'], value: 'vector'},
                'mil-size-mode': {type: Config.style['mil-size-mode'], value: 'object'},
                'mil-color': {type: Config.style['mil-color'], value: '#FF0000FF'},
                'mil-line-width': {type: Config.style['mil-line-width'], value: 5},
                'mil-size': {type: Config.style['mil-size'], value: 64},
            }
        }
    }
};