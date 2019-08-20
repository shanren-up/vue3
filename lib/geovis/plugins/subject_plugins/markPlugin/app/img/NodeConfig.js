import * as Config from './PropsConfig';

export default {
    'GV.Label': {
        name: 'GV.Label',
        property: {
            visible: {type: Config.properties.visible, value: true},
            text: {type: Config.properties.text, value: 'HELLO GEOVIS'},
            style: {
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: false},
                'render-transparent': {type: Config.style['render-transparent'], value: true},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'text-color': {type: Config.style['text-color'], value: '#FFFFFFFF'},
                'text-fill': {type: Config.style['text-fill'], value: '#FFFFFF'},
                'text-fill-opacity': {type: Config.style['text-fill-opacity'], value: 1},
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
                'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: false},
                'render-transparent': {type: Config.style['render-transparent'], value: false},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'text-color': {type: Config.style['text-color'], value: '#FF00FFF0'},
                'text-fill': {type: Config.style['text-fill'], value: '#FFFFFF'},
                'text-fill-opacity': {type: Config.style['text-fill-opacity'], value: 1},
                'text-size': {type: Config.style['text-size'], value: 50},
                'text-declutter': {type: Config.style['text-declutter'], value: true},
            }
        },
    },
    'GV.JBPoint': {
        name: 'GV.JBPoint',
        property: {
            color: {type: Config.properties.color},
            text: {type: Config.properties.text, value: 'hello,world'},
            textSize: {type: Config.properties.textSize, value: 20},
            textPosition: {type: Config.properties.textPosition},
            textColor: {type: Config.properties.textColor, value: '#FF0000FF'},
            style: {}
        }
    },
    'GV.JBLine': {
        name: 'GV.JBLine',
        property: {
            color: {type: Config.properties.color},
            style: {}
        }
    },
    'GV.ImageOverLay': {
        name: 'GV.ImageOverLay',
        property: {
            minLon: {type: Config.properties.minLon, value: 0},
            minLat: {type: Config.properties.minLat, value: 0},
            maxLon: {type: Config.properties.maxLon, value: 90},
            maxLat: {type: Config.properties.maxLat, value: 90},
            url: {type: Config.properties.url, value: 'airforce.png'},
            alpha: {type: Config.properties.alpha, value: 1},
            style: {
                'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
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
            url: {type: Config.properties.url, value: 'E3A.IVE'},
            style: {
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: false},
                'render-transparent': {type: Config.style['render-transparent'], value: true},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'model-scale': {type: Config.style['model-scale'], value: '100000'},
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
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: false},
                'render-transparent': {type: Config.style['render-transparent'], value: true},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'mesh-uniform': {type: Config.style['mesh-uniform'], value: true},
                'mesh-color': {type: Config.style['mesh-color'], value: '#FFFFFFFF'},
                'mesh-color-top': {type: Config.style['mesh-color-top'], value: '#FFFFFFFF'},
                'mesh-color-bottom': {type: Config.style['mesh-color-bottom'], value: '#000000FF'},
                'mesh-color-flank': {type: Config.style['mesh-color-flank'], value: '#FFFFFFFF'},
                'mesh-mode': {type: Config.style['mesh-mode'], value: 'fill'},
                'mesh-frame': {type: Config.style['mesh-frame'], value: false},
                'mesh-frame-color': {type: Config.style['mesh-frame-color'], value:  '#FFFFFFFF'},
                'mesh-line-width': {type: Config.style['mesh-line-width'], value: 1.0},
                'mesh-roll': {type: Config.style['mesh-roll'], value: 0},
                'mesh-scale': {type: Config.style['mesh-scale'], value: 1},
                'mesh-pitch': {type: Config.style['mesh-pitch'], value: 0},
                'meah-heading': {type: Config.style['meah-heading'], value: 0}
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
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: false},
                'render-transparent': {type: Config.style['render-transparent'], value: true},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'mesh-uniform': {type: Config.style['mesh-uniform'], value: true},
                'mesh-color': {type: Config.style['mesh-color'], value: '#FFFFFFFF'},
                'mesh-color-top': {type: Config.style['mesh-color-top'], value: '#FFFFFFFF'},
                'mesh-color-bottom': {type: Config.style['mesh-color-bottom'], value: '#000000FF'},
                'mesh-color-flank': {type: Config.style['mesh-color-flank'], value: '#FFFFFFFF'},
                'mesh-mode': {type: Config.style['mesh-mode'], value: 'fill'},
                'mesh-frame': {type: Config.style['mesh-frame'], value: false},
                'mesh-frame-color': {type: Config.style['mesh-frame-color'], value:  '#FFFFFFFF'},
                'mesh-line-width': {type: Config.style['mesh-line-width'], value: 1.0},
                'mesh-roll': {type: Config.style['mesh-roll'], value: 0},
                'mesh-scale': {type: Config.style['mesh-scale'], value: 1},
                'mesh-pitch': {type: Config.style['mesh-pitch'], value: 0},
                'meah-heading': {type: Config.style['meah-heading'], value: 0}
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
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: false},
                'render-transparent': {type: Config.style['render-transparent'], value: true},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'mesh-uniform': {type: Config.style['mesh-uniform'], value: true},
                'mesh-color': {type: Config.style['mesh-color'], value: '#FFFFFFFF'},
                'mesh-color-top': {type: Config.style['mesh-color-top'], value: '#FFFFFFFF'},
                'mesh-color-bottom': {type: Config.style['mesh-color-bottom'], value: '#000000FF'},
                'mesh-color-flank': {type: Config.style['mesh-color-flank'], value: '#FFFFFFFF'},
                'mesh-mode': {type: Config.style['mesh-mode'], value: 'fill'},
                'mesh-frame': {type: Config.style['mesh-frame'], value: false},
                'mesh-frame-color': {type: Config.style['mesh-frame-color'], value:  '#FFFFFFFF'},
                'mesh-line-width': {type: Config.style['mesh-line-width'], value: 1.0},
                'mesh-roll': {type: Config.style['mesh-roll'], value: 0},
                'mesh-scale': {type: Config.style['mesh-scale'], value: 1},
                'mesh-pitch': {type: Config.style['mesh-pitch'], value: 0},
                'meah-heading': {type: Config.style['meah-heading'], value: 0}
            }
        }
    },
    'GV.Semicylinder': {
        name: 'GV.Semicylinder',
        property: {
            visible: {type: Config.properties.visible, value: true},
            radius: {type: Config.properties.radius, value: 1000000},
            height: {type: Config.properties.height, value: 1000000},
            arcStart: {type: Config.properties.arcStart, value: 0},
            arcEnd: {type: Config.properties.arcEnd, value: 270},
            style: {
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: false},
                'render-transparent': {type: Config.style['render-transparent'], value: true},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'mesh-uniform': {type: Config.style['mesh-uniform'], value: true},
                'mesh-color': {type: Config.style['mesh-color'], value: '#FFFFFFFF'},
                'mesh-color-top': {type: Config.style['mesh-color-top'], value: '#FFFFFFFF'},
                'mesh-color-bottom': {type: Config.style['mesh-color-bottom'], value: '#000000FF'},
                'mesh-color-flank': {type: Config.style['mesh-color-flank'], value: '#FFFFFFFF'},
                'mesh-mode': {type: Config.style['mesh-mode'], value: 'fill'},
                'mesh-frame': {type: Config.style['mesh-frame'], value: false},
                'mesh-frame-color': {type: Config.style['mesh-frame-color'], value:  '#FFFFFFFF'},
                'mesh-line-width': {type: Config.style['mesh-line-width'], value: 1.0},
                'mesh-roll': {type: Config.style['mesh-roll'], value: 0},
                'mesh-scale': {type: Config.style['mesh-scale'], value: 1},
                'mesh-pitch': {type: Config.style['mesh-pitch'], value: 0},
                'meah-heading': {type: Config.style['meah-heading'], value: 0}
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
            radiusMajor: {type: Config.properties.radiusMajor, value: 1000000},
            radiusMinor: {type: Config.properties.radiusMinor, value: 1000000},
            rotationAngle: {type: Config.properties.rotationAngle, value: 0},
            style: {
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: true},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'mesh-uniform': {type: Config.style['mesh-uniform'], value: true},
                'mesh-color': {type: Config.style['mesh-color'], value: '#FFFFFFFF'},
                'mesh-color-top': {type: Config.style['mesh-color-top'], value: '#FFFFFFFF'},
                'mesh-color-bottom': {type: Config.style['mesh-color-bottom'], value: '#000000FF'},
                'mesh-color-flank': {type: Config.style['mesh-color-flank'], value: '#FFFFFFFF'},
                'mesh-mode': {type: Config.style['mesh-mode'], value: 'fill'},
                'mesh-frame': {type: Config.style['mesh-frame'], value: false},
                'mesh-frame-color': {type: Config.style['mesh-frame-color'], value:  '#FFFFFFFF'},
                'mesh-line-width': {type: Config.style['mesh-line-width'], value: 1.0},
                'mesh-roll': {type: Config.style['mesh-roll'], value: 0},
                'mesh-scale': {type: Config.style['mesh-scale'], value: 1},
                'mesh-pitch': {type: Config.style['mesh-pitch'], value: 0},
                'meah-heading': {type: Config.style['meah-heading'], value: 0}
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
            radiusMajor: {type: Config.properties.radiusMajor, value: 1000000},
            radiusMinor: {type: Config.properties.radiusMinor, value: 1000000},
            rotationAngle: {type: Config.properties.rotationAngle, value: 0},
            style: {
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: true},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'mesh-uniform': {type: Config.style['mesh-uniform'], value: true},
                'mesh-color': {type: Config.style['mesh-color'], value: '#FFFFFFFF'},
                'mesh-color-top': {type: Config.style['mesh-color-top'], value: '#FFFFFFFF'},
                'mesh-color-bottom': {type: Config.style['mesh-color-bottom'], value: '#000000FF'},
                'mesh-color-flank': {type: Config.style['mesh-color-flank'], value: '#FFFFFFFF'},
                'mesh-mode': {type: Config.style['mesh-mode'], value: 'fill'},
                'mesh-frame': {type: Config.style['mesh-frame'], value: false},
                'mesh-frame-color': {type: Config.style['mesh-frame-color'], value:  '#FFFFFFFF'},
                'mesh-line-width': {type: Config.style['mesh-line-width'], value: 1.0},
                'mesh-roll': {type: Config.style['mesh-roll'], value: 0},
                'mesh-scale': {type: Config.style['mesh-scale'], value: 1},
                'mesh-pitch': {type: Config.style['mesh-pitch'], value: 0},
                'meah-heading': {type: Config.style['meah-heading'], value: 0}
            }
        },
    },
    'GV.Ellipsoid': {
        name: 'GV.Ellipsoid',
        property: {
            radiusX: {type: Config.properties.radiusX, value: 1000000},
            radiusY: {type: Config.properties.radiusY, value: 1000000},
            radiusZ: {type: Config.properties.radiusZ, value: 1000000},
            style: {
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: true},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'mesh-uniform': {type: Config.style['mesh-uniform'], value: true},
                'mesh-color': {type: Config.style['mesh-color'], value: '#FFFFFFFF'},
                'mesh-color-top': {type: Config.style['mesh-color-top'], value: '#FFFFFFFF'},
                'mesh-color-bottom': {type: Config.style['mesh-color-bottom'], value: '#000000FF'},
                'mesh-color-flank': {type: Config.style['mesh-color-flank'], value: '#FFFFFFFF'},
                'mesh-mode': {type: Config.style['mesh-mode'], value: 'fill'},
                'mesh-frame': {type: Config.style['mesh-frame'], value: false},
                'mesh-frame-color': {type: Config.style['mesh-frame-color'], value:  '#FFFFFFFF'},
                'mesh-line-width': {type: Config.style['mesh-line-width'], value: 1.0}
            }
        },
    },
    'GV.Sphere': {
        name: 'GV.Sphere',
        property: {
            visible: {type: Config.properties.visible, value: true},
            radius: {type: Config.properties.radius, value: 1000000},
            style: {
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: true},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'mesh-uniform': {type: Config.style['mesh-uniform'], value: true},
                'mesh-color': {type: Config.style['mesh-color'], value: '#FFFFFFFF'},
                'mesh-color-top': {type: Config.style['mesh-color-top'], value: '#FFFFFFFF'},
                'mesh-color-bottom': {type: Config.style['mesh-color-bottom'], value: '#000000FF'},
                'mesh-color-flank': {type: Config.style['mesh-color-flank'], value: '#FFFFFFFF'},
                'mesh-mode': {type: Config.style['mesh-mode'], value: 'fill'},
                'mesh-frame': {type: Config.style['mesh-frame'], value: false},
                'mesh-frame-color': {type: Config.style['mesh-frame-color'], value:  '#FFFFFFFF'},
                'mesh-line-width': {type: Config.style['mesh-line-width'], value: 1.0},
                'mesh-roll': {type: Config.style['mesh-roll'], value: 0},
                'mesh-scale': {type: Config.style['mesh-scale'], value: 1},
                'mesh-pitch': {type: Config.style['mesh-pitch'], value: 0},
                'meah-heading': {type: Config.style['meah-heading'], value: 0}
            }
        },
    },
    'GV.Cone': {
        name: 'GV.Cone',
        property: {
            visible: {type: Config.properties.visible, value: true},
            height: {type: Config.properties.height, value: 1000000},
            radius: {type: Config.properties.radius, value: 1000000},
            style: {
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: true},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'mesh-roll': {type: Config.style['mesh-roll'], value: 0},
                'mesh-scale': {type: Config.style['mesh-scale'], value: 1},
                'mesh-pitch': {type: Config.style['mesh-pitch'], value: 0},
                'meah-heading': {type: Config.style['meah-heading'], value: 0},
                'mesh-uniform': {type: Config.style['mesh-uniform'], value: true},
                'mesh-color': {type: Config.style['mesh-color'], value: '#FFFFFFFF'},
                'mesh-color-top': {type: Config.style['mesh-color-top'], value: '#FFFFFFFF'},
                'mesh-color-bottom': {type: Config.style['mesh-color-bottom'], value: '#000000FF'},
                'mesh-color-flank': {type: Config.style['mesh-color-flank'], value: '#FFFFFFFF'},
                'mesh-mode': {type: Config.style['mesh-mode'], value: 'fill'},
                'mesh-frame': {type: Config.style['mesh-frame'], value: false},
                'mesh-frame-color': {type: Config.style['mesh-frame-color'], value:  '#FFFFFFFF'},
                'mesh-line-width': {type: Config.style['mesh-line-width'], value: 1.0}
            }
        },
    },
    'GV.Polygon': {
        name: 'GV.Polygon',
        property: {
            style: {
                fill: {type: Config.style['fill'], value: '#FFFFFFFF'},
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'absolute'},
                'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: false},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'stroke': {type: Config.style['stroke'], value: '#FFFFFFFF'},
                'stroke-width': {type: Config.style['stroke-width'], value: '10px'},
                'stroke-min-pixels': {type: Config.style['stroke-min-pixels']},
                'stroke-tessellation': {type: Config.style['stroke-tessellation']},
                'stroke-stipple-pattern': {type: Config.style['stroke-stipple-pattern']},
                'stroke-stipple-factor': {type: Config.style['stroke-stipple-factor']},
                'stroke-linejoin': {type: Config.style['stroke-linejoin']},
                'stroke-linecap': {type: Config.style['stroke-linecap']},
                'stroke-rounding-ratio': {type: Config.style['stroke-rounding-ratio']},
                'line-extrusion': {type: Config.style['line-extrusion'], value: true},
                'extrusion-height': {type: Config.style['extrusion-height'], value: 100000},
            }
        },
    },
    'GV.Polyline': {
        name: 'GV.Polyline',
        property: {
            style: {
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'absolute'},
                'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: false},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'stroke': {type: Config.style['stroke'], value: '#FFFFFFFF'},
                'stroke-width': {type: Config.style['stroke-width'], value: '3px'},
                'stroke-min-pixels': {type: Config.style['stroke-min-pixels']},
                'stroke-tessellation': {type: Config.style['stroke-tessellation']},
                'stroke-stipple-pattern': {type: Config.style['stroke-stipple-pattern']},
                'stroke-stipple-factor': {type: Config.style['stroke-stipple-factor']},
                'stroke-linejoin': {type: Config.style['stroke-linejoin']},
                'stroke-linecap': {type: Config.style['stroke-linecap']},
                'stroke-rounding-ratio': {type: Config.style['stroke-rounding-ratio']},
                'line-extrusion': {type: Config.style['line-extrusion'], value: false},
                'extrusion-height': {type: Config.style['extrusion-height'], value: 100000},
            }
        },
    },
    'GV.Cube': {
        name: 'GV.Cube',
        property: {
            visible: {type: Config.properties.visible, value: true},
            height: {type: Config.properties.height, value: 1000000},
            radius: {type: Config.properties.radius, value: 1000000},
            texture: {type: Config.properties.texture, value: null},
            style: {
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: true},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'mesh-uniform': {type: Config.style['mesh-uniform'], value: true},
                'mesh-color': {type: Config.style['mesh-color'], value: '#FFFFFFFF'},
                'mesh-color-top': {type: Config.style['mesh-color-top'], value: '#FFFFFFFF'},
                'mesh-color-bottom': {type: Config.style['mesh-color-bottom'], value: '#000000FF'},
                'mesh-color-flank': {type: Config.style['mesh-color-flank'], value: '#FFFFFFFF'},
                'mesh-mode': {type: Config.style['mesh-mode'], value: 'fill'},
                'mesh-frame': {type: Config.style['mesh-frame'], value: false},
                'mesh-frame-color': {type: Config.style['mesh-frame-color'], value:  '#FFFFFFFF'},
                'mesh-line-width': {type: Config.style['mesh-line-width'], value: 1.0},
                'mesh-roll': {type: Config.style['mesh-roll'], value: 0},
                'mesh-scale': {type: Config.style['mesh-scale'], value: 1},
                'mesh-pitch': {type: Config.style['mesh-pitch'], value: 0},
                'meah-heading': {type: Config.style['meah-heading'], value: 0}
            }
        },
    },
    'GV.Icon': {
        name: 'GV.Icon',
        property: {
            style: {
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'absolute'},
                'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'icon-scale': {type: Config.style['icon-scale'], value: 1},
                'icon-heading': {type: Config.style['icon-heading'], value: 0},
                'icon-roll': {type: Config.style['icon-roll'], value: 0},
                'icon-pitch': {type: Config.style['icon-pitch'], value: 0},
                'icon-size': {type: Config.style['icon-size'], value: 30},
                'icon-declutter': {type: Config.style['icon-declutter'], value: false},
                'icon-align': {type: Config.style['icon-align'], value: 'left-top'},
                'icon-mode': {type: Config.style['icon-mode'], value: 'spirit'},
                'icon-link-line': {type: Config.style['icon-link-line'], value: false},
                'icon-alpha': {type: Config.style['icon-alpha'], value: 1}
            }
        },
    },
    'GV.Spline': {
        name: 'GV.Spline',
        property: {
            style: {
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: true},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'stroke': {type: Config.style['stroke'], value: '#FFFFFFFF'},
                'stroke-width': {type: Config.style['stroke-width'], value: '3px'},
                'stroke-stipple-pattern': {type: Config.style['stroke-stipple-pattern']},
                'stroke-stipple-factor': {type: Config.style['stroke-stipple-factor']},
                'line-extrusion': {type: Config.style['line-extrusion'], value: false},
                'extrusion-uniform': {type: Config.style['extrusion-uniform'], value: true},
                'extrusion-color': {type: Config.style['extrusion-color'], value: '#FFFFFFFF'},
            }
        },
    },
    'GV.FireEffectNode': {
        name: 'GV.FireEffectNode',
        property: {
            visible: {type: Config.properties.visible, value: true},
            style: {
                'effect-size': {type: Config.style['effect-size'], value: 1},
            }
        },
    },
    'GV.SmokeEffectNode': {
        name: 'GV.SmokeEffectNode',
        property: {
            visible: {type: Config.properties.visible, value: true},
            style: {
                'effect-size': {type: Config.style['effect-size'], value: 1},
            }
        },
    },
    'GV.RainEffectNode': {
        name: 'GV.RainEffectNode',
        property: {
            visible: {type: Config.properties.visible, value: true},
            style: {
                'effect-size': {type: Config.style['effect-size'], value: 1},
            }
        },
    },
    'GV.PointEffectNode': {
        name: 'GV.PointEffectNode',
        property: {
            visible: {type: Config.properties.visible, value: true},
            style: {
                'effect-size': {type: Config.style['effect-size'], value: 1},
            }
        },
    },
    'GV.PointEffectNode': {
        name: 'GV.PointEffectNode',
        property: {
            visible: {type: Config.properties.visible, value: true},
            style: {
                'effect-size': {type: Config.style['effect-size'], value: 1},
            }
        },
    },
    'GV.GeoMesh': {
        name: 'GV.GeoMesh',
        property: {
            drawable: {type: Config.properties.drawable},
            texture: {type: Config.properties.texture},
            style: {
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
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
            drawable: {type: Config.properties.drawable},
            texture: {type: Config.properties.texture},
            style: {
                'altitude-clamping': {type: Config.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: Config.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: Config.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: Config.style['render-depth-test'], value: true},
                'render-lighting': {type: Config.style['render-lighting'], value: true},
                'render-transparent': {type: Config.style['render-transparent'], value: true},
                'render-backface-culling': {type: Config.style['render-backface-culling'], value: true},
                'mesh-mode': {type: Config.style['mesh-mode'], value: 'fill'},
                'mesh-roll': {type: Config.style['mesh-roll'], value: 0},
                'mesh-scale': {type: Config.style['mesh-scale'], value: 1},
                'mesh-pitch': {type: Config.style['mesh-pitch'], value: 0},
                'meah-heading': {type: Config.style['meah-heading'], value: 0},
            }
        },
    },
    'GV.PointCloud': {
        name: 'GV.PointCloud',
        property: {
            dataUrl: {type: Config.properties.dataUrl},
            url: {type: Config.properties.url},
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
};