import * as markConfig from './PropsmarkConfig';

export default {
    'GV.Label': {
        name: 'GV.Label',
        property: {
            visible: {type: markConfig.properties.visible, value: true},
            text: {type: markConfig.properties.text, value: 'HELLO GEOVIS'},
            style: {
                'altitude-clamping': {type: markConfig.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: markConfig.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: markConfig.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-lighting': {type: markConfig.style['render-lighting'], value: false},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling'], value: true},
                'text-color': {type: markConfig.style['text-color'], value: '#FFFFFFFF'},
                'text-size': {type: markConfig.style['text-size'], value: 50},
                'text-halo-show': {type: markConfig.style['text-halo-show'], value: false},
                'text-halo': {type: markConfig.style['text-halo'], value: '#FF0000FF'},
                'text-halo-color': {type: markConfig.style['text-halo-color'], value: '#FF0000FF'},
                'text-halo-fill': {type: markConfig.style['text-halo-fill'], value: false},
                'text-align': {type: markConfig.style['text-align'], value: 'center-center'},
                'text-layout': {type: markConfig.style['text-layout'], value: 'ltr'},
                'text-encoding': {type: markConfig.style['text-encoding'], value: 'utf-8'},
                'text-declutter': {type: markConfig.style['text-declutter'], value: 'true'},
                'text-axis-alignment': {type: markConfig.style['text-axis-alignment'], value: 'screen'},
                'text-character-size-mode': {type: markConfig.style['text-character-size-mode'], value: 'screen-coords'},
                'text-gradient': {type: markConfig.style['text-gradient'], value: 'solid'},
                'text-gradient-ltcolor': {type: markConfig.style['text-gradient-ltcolor'], value: '#FFFFFFFF'},
                'text-gradient-rtcolor': {type: markConfig.style['text-gradient-rtcolor'], value: '#FFFFFFFF'},
                'text-gradient-lbcolor': {type: markConfig.style['text-gradient-lbcolor'], value: '#FF0000FF'},
                'text-gradient-rbcolor': {type: markConfig.style['text-gradient-rbcolor'], value: '#FF0000FF'},
                'text-used-3d': {type: markConfig.style['text-used-3d'], value: false},
                'text-link-line': {type: markConfig.style['text-link-line'], value: true},
            }
        },
    },
    'GV.Place': {
        name: 'GV.Place',
        property: {
            visible: {type: markConfig.properties.visible, value: true},
            text: {type: markConfig.properties.text, value: 'HELLO GEOVIS'},
            url: {type: markConfig.properties.url, value: 'http://127.0.0.1:3000/docResource/place_default.png'},
            style: {
                'altitude-clamping': {type: markConfig.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: markConfig.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: markConfig.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-lighting': {type: markConfig.style['render-lighting'], value: false},
                'render-transparent': {type: markConfig.style['render-transparent'], value: false},
                'render-backface-culling': {type: markConfig.style['render-backface-culling'], value: true},
                'text-color': {type: markConfig.style['text-color'], value: '#FF00FFF0'},
                'text-size': {type: markConfig.style['text-size'], value: 50},
                'text-declutter': {type: markConfig.style['text-declutter'], value: true},
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
            minLon: {type: markConfig.properties.minLon, value: 0},
            minLat: {type: markConfig.properties.minLat, value: 0},
            maxLon: {type: markConfig.properties.maxLon, value: 90},
            maxLat: {type: markConfig.properties.maxLat, value: 90},
            url: {type: markConfig.properties.url, value: 'airforce.png'},
            alpha: {type: markConfig.properties.alpha, value: 1},
            style: {
                'max-visible-distance': {type: markConfig.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: markConfig.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-lighting': {type: markConfig.style['render-lighting'], value: true},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling'], value: true},
            }
        }
    },
    'GV.Model': {
        name: 'GV.Model',
        property: {
            url: {type: markConfig.properties.url, value: 'E3A.IVE'},
            style: {
                'altitude-clamping': {type: markConfig.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: markConfig.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: markConfig.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-lighting': {type: markConfig.style['render-lighting'], value: false},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling'], value: true},
                'model-scale': {type: markConfig.style['model-scale'], value: '100000'},
                'model-heading': {type: markConfig.style['model-heading'], value: 0},
                'model-pitch': {type: markConfig.style['model-pitch'], value: 0},
                'model-roll': {type: markConfig.style['model-roll'], value: 0},
            }
        }
    },
    'GV.Circle': {
        name: 'GV.Circle',
        property: {
            visible: {type: markConfig.properties.visible, value: true},
            radius: {type: markConfig.properties.radius, value: 1000000},
            style: {
                'altitude-clamping': {type: markConfig.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: markConfig.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: markConfig.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-lighting': {type: markConfig.style['render-lighting'], value: false},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling'], value: true},
                'mesh-uniform': {type: markConfig.style['mesh-uniform'], value: true},
                'mesh-color': {type: markConfig.style['mesh-color'], value: '#FFFFFFFF'},
                'mesh-color-top': {type: markConfig.style['mesh-color-top'], value: '#FFFFFFFF'},
                'mesh-color-bottom': {type: markConfig.style['mesh-color-bottom'], value: '#FFFFFFFF'},
                'mesh-color-flank': {type: markConfig.style['mesh-color-flank'], value: '#FFFFFFFF'},
                'mesh-mode': {type: markConfig.style['mesh-mode'], value: 'fill'},
                'mesh-frame': {type: markConfig.style['mesh-frame'], value: false},
                'mesh-frame-color': {type: markConfig.style['mesh-frame-color'], value:  '#FFFFFFFF'},
                'mesh-line-width': {type: markConfig.style['mesh-line-width'], value: 1.0},
                'mesh-roll': {type: markConfig.style['mesh-roll'], value: 0},
                'mesh-scale': {type: markConfig.style['mesh-scale'], value: 1},
                'mesh-pitch': {type: markConfig.style['mesh-pitch'], value: 0},
                'meah-heading': {type: markConfig.style['meah-heading'], value: 0}
            }
        }
    },
    'GV.Cylinder': {
        name: 'GV.Cylinder',
        property: {
            visible: {type: markConfig.properties.visible, value: true},
            radius: {type: markConfig.properties.radius, value: 1000000},
            height: {type: markConfig.properties.height, value: 1000000},
            style: {
                'altitude-clamping': {type: markConfig.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: markConfig.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: markConfig.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-lighting': {type: markConfig.style['render-lighting'], value: false},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling'], value: true},
                'mesh-uniform': {type: markConfig.style['mesh-uniform'], value: true},
                'mesh-color': {type: markConfig.style['mesh-color'], value: '#FFFFFFFF'},
                'mesh-color-top': {type: markConfig.style['mesh-color-top'], value: '#FFFFFFFF'},
                'mesh-color-bottom': {type: markConfig.style['mesh-color-bottom'], value: '#FFFFFFFF'},
                'mesh-color-flank': {type: markConfig.style['mesh-color-flank'], value: '#FFFFFFFF'},
                'mesh-mode': {type: markConfig.style['mesh-mode'], value: 'fill'},
                'mesh-frame': {type: markConfig.style['mesh-frame'], value: false},
                'mesh-frame-color': {type: markConfig.style['mesh-frame-color'], value:  '#FFFFFFFF'},
                'mesh-line-width': {type: markConfig.style['mesh-line-width'], value: 1.0},
                'mesh-roll': {type: markConfig.style['mesh-roll'], value: 0},
                'mesh-scale': {type: markConfig.style['mesh-scale'], value: 1},
                'mesh-pitch': {type: markConfig.style['mesh-pitch'], value: 0},
                'meah-heading': {type: markConfig.style['meah-heading'], value: 0}
            }
        }
    },
    'GV.Sector': {
        name: 'GV.Sector',
        property: {
            visible: {type: markConfig.properties.visible, value: true},
            radius: {type: markConfig.properties.radius, value: 1000000},
            arcStart: {type: markConfig.properties.arcStart, value: 0},
            arcEnd: {type: markConfig.properties.arcEnd, value: 270},
            style: {
                'altitude-clamping': {type: markConfig.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: markConfig.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: markConfig.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-lighting': {type: markConfig.style['render-lighting'], value: false},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling'], value: true},
                'mesh-uniform': {type: markConfig.style['mesh-uniform'], value: true},
                'mesh-color': {type: markConfig.style['mesh-color'], value: '#FFFFFFFF'},
                'mesh-color-top': {type: markConfig.style['mesh-color-top'], value: '#FFFFFFFF'},
                'mesh-color-bottom': {type: markConfig.style['mesh-color-bottom'], value: '#FFFFFFFF'},
                'mesh-color-flank': {type: markConfig.style['mesh-color-flank'], value: '#FFFFFFFF'},
                'mesh-mode': {type: markConfig.style['mesh-mode'], value: 'fill'},
                'mesh-frame': {type: markConfig.style['mesh-frame'], value: false},
                'mesh-frame-color': {type: markConfig.style['mesh-frame-color'], value:  '#FFFFFFFF'},
                'mesh-line-width': {type: markConfig.style['mesh-line-width'], value: 1.0},
                'mesh-roll': {type: markConfig.style['mesh-roll'], value: 0},
                'mesh-scale': {type: markConfig.style['mesh-scale'], value: 1},
                'mesh-pitch': {type: markConfig.style['mesh-pitch'], value: 0},
                'meah-heading': {type: markConfig.style['meah-heading'], value: 0}
            }
        }
    },
    'GV.Semicylinder': {
        name: 'GV.Semicylinder',
        property: {
            visible: {type: markConfig.properties.visible, value: true},
            radius: {type: markConfig.properties.radius, value: 1000000},
            height: {type: markConfig.properties.height, value: 1000000},
            arcStart: {type: markConfig.properties.arcStart, value: 0},
            arcEnd: {type: markConfig.properties.arcEnd, value: 270},
            style: {
                'altitude-clamping': {type: markConfig.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: markConfig.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: markConfig.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-lighting': {type: markConfig.style['render-lighting'], value: false},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling'], value: true},
                'mesh-uniform': {type: markConfig.style['mesh-uniform'], value: true},
                'mesh-color': {type: markConfig.style['mesh-color'], value: '#FFFFFFFF'},
                'mesh-color-top': {type: markConfig.style['mesh-color-top'], value: '#FFFFFFFF'},
                'mesh-color-bottom': {type: markConfig.style['mesh-color-bottom'], value: '#FFFFFFFF'},
                'mesh-color-flank': {type: markConfig.style['mesh-color-flank'], value: '#FFFFFFFF'},
                'mesh-mode': {type: markConfig.style['mesh-mode'], value: 'fill'},
                'mesh-frame': {type: markConfig.style['mesh-frame'], value: false},
                'mesh-frame-color': {type: markConfig.style['mesh-frame-color'], value:  '#FFFFFFFF'},
                'mesh-line-width': {type: markConfig.style['mesh-line-width'], value: 1.0},
                'mesh-roll': {type: markConfig.style['mesh-roll'], value: 0},
                'mesh-scale': {type: markConfig.style['mesh-scale'], value: 1},
                'mesh-pitch': {type: markConfig.style['mesh-pitch'], value: 0},
                'meah-heading': {type: markConfig.style['meah-heading'], value: 0}
            }
        },
    },
    'GV.Ellipse': {
        name: 'GV.Ellipse',
        property: {
            visible: {type: markConfig.properties.visible, value: true},
            height: {type: markConfig.properties.height, value: 0},
            arcStart: {type: markConfig.properties.arcStart, value: 0},
            arcEnd: {type: markConfig.properties.arcEnd, value: 360},
            radiusMajor: {type: markConfig.properties.radiusMajor, value: 1000000},
            radiusMinor: {type: markConfig.properties.radiusMinor, value: 1000000},
            rotationAngle: {type: markConfig.properties.rotationAngle, value: 0},
            style: {
                'altitude-clamping': {type: markConfig.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: markConfig.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: markConfig.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-lighting': {type: markConfig.style['render-lighting'], value: true},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling'], value: true},
                'mesh-uniform': {type: markConfig.style['mesh-uniform'], value: true},
                'mesh-color': {type: markConfig.style['mesh-color'], value: '#FFFFFFFF'},
                'mesh-color-top': {type: markConfig.style['mesh-color-top'], value: '#FFFFFFFF'},
                'mesh-color-bottom': {type: markConfig.style['mesh-color-bottom'], value: '#000000FF'},
                'mesh-color-flank': {type: markConfig.style['mesh-color-flank'], value: '#FFFFFFFF'},
                'mesh-mode': {type: markConfig.style['mesh-mode'], value: 'fill'},
                'mesh-frame': {type: markConfig.style['mesh-frame'], value: false},
                'mesh-frame-color': {type: markConfig.style['mesh-frame-color'], value:  '#FFFFFFFF'},
                'mesh-line-width': {type: markConfig.style['mesh-line-width'], value: 1.0},
                'mesh-roll': {type: markConfig.style['mesh-roll'], value: 0},
                'mesh-scale': {type: markConfig.style['mesh-scale'], value: 1},
                'mesh-pitch': {type: markConfig.style['mesh-pitch'], value: 0},
                'meah-heading': {type: markConfig.style['meah-heading'], value: 0}
            }
        },
    },
    'GV.Cylindroid': {
        name: 'GV.Cylindroid',
        property: {
            visible: {type: markConfig.properties.visible, value: true},
            height: {type: markConfig.properties.height, value: 0},
            arcStart: {type: markConfig.properties.arcStart, value: 0},
            arcEnd: {type: markConfig.properties.arcEnd, value: 360},
            radiusMajor: {type: markConfig.properties.radiusMajor, value: 1000000},
            radiusMinor: {type: markConfig.properties.radiusMinor, value: 1000000},
            rotationAngle: {type: markConfig.properties.rotationAngle, value: 0},
            style: {
                'altitude-clamping': {type: markConfig.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: markConfig.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: markConfig.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-lighting': {type: markConfig.style['render-lighting'], value: true},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling'], value: true},
                'mesh-uniform': {type: markConfig.style['mesh-uniform'], value: true},
                'mesh-color': {type: markConfig.style['mesh-color'], value: '#FFFFFFFF'},
                'mesh-color-top': {type: markConfig.style['mesh-color-top'], value: '#FFFFFFFF'},
                'mesh-color-bottom': {type: markConfig.style['mesh-color-bottom'], value: '#000000FF'},
                'mesh-color-flank': {type: markConfig.style['mesh-color-flank'], value: '#FFFFFFFF'},
                'mesh-mode': {type: markConfig.style['mesh-mode'], value: 'fill'},
                'mesh-frame': {type: markConfig.style['mesh-frame'], value: false},
                'mesh-frame-color': {type: markConfig.style['mesh-frame-color'], value:  '#FFFFFFFF'},
                'mesh-line-width': {type: markConfig.style['mesh-line-width'], value: 1.0},
                'mesh-roll': {type: markConfig.style['mesh-roll'], value: 0},
                'mesh-scale': {type: markConfig.style['mesh-scale'], value: 1},
                'mesh-pitch': {type: markConfig.style['mesh-pitch'], value: 0},
                'meah-heading': {type: markConfig.style['meah-heading'], value: 0}
            }
        },
    },
    'GV.Ellipsoid': {
        name: 'GV.Ellipsoid',
        property: {
            radiusX: {type: markConfig.properties.radiusX, value: 1000000},
            radiusY: {type: markConfig.properties.radiusY, value: 1000000},
            radiusZ: {type: markConfig.properties.radiusZ, value: 1000000},
            style: {
                'altitude-clamping': {type: markConfig.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: markConfig.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: markConfig.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-lighting': {type: markConfig.style['render-lighting'], value: true},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling'], value: true},
                'mesh-uniform': {type: markConfig.style['mesh-uniform'], value: true},
                'mesh-color': {type: markConfig.style['mesh-color'], value: '#FFFFFFFF'},
                'mesh-color-top': {type: markConfig.style['mesh-color-top'], value: '#FFFFFFFF'},
                'mesh-color-bottom': {type: markConfig.style['mesh-color-bottom'], value: '#000000FF'},
                'mesh-color-flank': {type: markConfig.style['mesh-color-flank'], value: '#FFFFFFFF'},
                'mesh-mode': {type: markConfig.style['mesh-mode'], value: 'fill'},
                'mesh-frame': {type: markConfig.style['mesh-frame'], value: false},
                'mesh-frame-color': {type: markConfig.style['mesh-frame-color'], value:  '#FFFFFFFF'},
                'mesh-line-width': {type: markConfig.style['mesh-line-width'], value: 1.0}
            }
        },
    },
    'GV.Sphere': {
        name: 'GV.Sphere',
        property: {
            visible: {type: markConfig.properties.visible, value: true},
            radius: {type: markConfig.properties.radius, value: 1000000},
            style: {
                'altitude-clamping': {type: markConfig.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: markConfig.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: markConfig.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-lighting': {type: markConfig.style['render-lighting'], value: true},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling'], value: true},
                'mesh-uniform': {type: markConfig.style['mesh-uniform'], value: true},
                'mesh-color': {type: markConfig.style['mesh-color'], value: '#FFFFFFFF'},
                'mesh-color-top': {type: markConfig.style['mesh-color-top'], value: '#FFFFFFFF'},
                'mesh-color-bottom': {type: markConfig.style['mesh-color-bottom'], value: '#000000FF'},
                'mesh-color-flank': {type: markConfig.style['mesh-color-flank'], value: '#FFFFFFFF'},
                'mesh-mode': {type: markConfig.style['mesh-mode'], value: 'fill'},
                'mesh-frame': {type: markConfig.style['mesh-frame'], value: false},
                'mesh-frame-color': {type: markConfig.style['mesh-frame-color'], value:  '#FFFFFFFF'},
                'mesh-line-width': {type: markConfig.style['mesh-line-width'], value: 1.0},
                'mesh-roll': {type: markConfig.style['mesh-roll'], value: 0},
                'mesh-scale': {type: markConfig.style['mesh-scale'], value: 1},
                'mesh-pitch': {type: markConfig.style['mesh-pitch'], value: 0},
                'meah-heading': {type: markConfig.style['meah-heading'], value: 0}
            }
        },
    },
    'GV.Cone': {
        name: 'GV.Cone',
        property: {
            visible: {type: markConfig.properties.visible, value: true},
            height: {type: markConfig.properties.height, value: 1000000},
            radius: {type: markConfig.properties.radius, value: 1000000},
            style: {
                'altitude-clamping': {type: markConfig.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: markConfig.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: markConfig.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-lighting': {type: markConfig.style['render-lighting'], value: true},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling'], value: true},
                'mesh-roll': {type: markConfig.style['mesh-roll'], value: 0},
                'mesh-scale': {type: markConfig.style['mesh-scale'], value: 1},
                'mesh-pitch': {type: markConfig.style['mesh-pitch'], value: 0},
                'meah-heading': {type: markConfig.style['meah-heading'], value: 0},
                'mesh-uniform': {type: markConfig.style['mesh-uniform'], value: true},
                'mesh-color': {type: markConfig.style['mesh-color'], value: '#FFFFFFFF'},
                'mesh-color-top': {type: markConfig.style['mesh-color-top'], value: '#FFFFFFFF'},
                'mesh-color-bottom': {type: markConfig.style['mesh-color-bottom'], value: '#000000FF'},
                'mesh-color-flank': {type: markConfig.style['mesh-color-flank'], value: '#FFFFFFFF'},
                'mesh-mode': {type: markConfig.style['mesh-mode'], value: 'fill'},
                'mesh-frame': {type: markConfig.style['mesh-frame'], value: false},
                'mesh-frame-color': {type: markConfig.style['mesh-frame-color'], value:  '#FFFFFFFF'},
                'mesh-line-width': {type: markConfig.style['mesh-line-width'], value: 1.0}
            }
        },
    },
    'GV.Polygon': {
        name: 'GV.Polygon',
        property: {
            style: {
                fill: {type: markConfig.style['fill'], value: '#FFFFFFFF'},
                'altitude-clamping': {type: markConfig.style['altitude-clamping'], value: 'absolute'},
                'max-visible-distance': {type: markConfig.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: markConfig.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-lighting': {type: markConfig.style['render-lighting'], value: true},
                'render-transparent': {type: markConfig.style['render-transparent'], value: false},
                'render-backface-culling': {type: markConfig.style['render-backface-culling'], value: true},
                'stroke': {type: markConfig.style['stroke'], value: '#FFFFFFFF'},
                'stroke-width': {type: markConfig.style['stroke-width'], value: '2px'},
                'stroke-min-pixels': {type: markConfig.style['stroke-min-pixels']},
                'stroke-tessellation': {type: markConfig.style['stroke-tessellation'], value: 20},
                'stroke-stipple-pattern': {type: markConfig.style['stroke-stipple-pattern']},
                'stroke-stipple-factor': {type: markConfig.style['stroke-stipple-factor']},
                'stroke-linejoin': {type: markConfig.style['stroke-linejoin']},
                'stroke-linecap': {type: markConfig.style['stroke-linecap']},
                'stroke-rounding-ratio': {type: markConfig.style['stroke-rounding-ratio']},
                'line-extrusion': {type: markConfig.style['line-extrusion'], value: true},
                'extrusion-height': {type: markConfig.style['extrusion-height'], value: 100000},
            }
        },
    },
    'GV.Polyline': {
        name: 'GV.Polyline',
        property: {
            style: {
                'altitude-clamping': {type: markConfig.style['altitude-clamping'], value: 'absolute'},
                'max-visible-distance': {type: markConfig.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: markConfig.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-lighting': {type: markConfig.style['render-lighting'], value: true},
                'render-transparent': {type: markConfig.style['render-transparent'], value: false},
                'render-backface-culling': {type: markConfig.style['render-backface-culling'], value: true},
                'stroke': {type: markConfig.style['stroke'], value: '#FFFFFFFF'},
                'stroke-width': {type: markConfig.style['stroke-width'], value: '2px'},
                'stroke-min-pixels': {type: markConfig.style['stroke-min-pixels']},
                'stroke-tessellation': {type: markConfig.style['stroke-tessellation'], value: 20},
                'stroke-stipple-pattern': {type: markConfig.style['stroke-stipple-pattern']},
                'stroke-stipple-factor': {type: markConfig.style['stroke-stipple-factor']},
                'stroke-linejoin': {type: markConfig.style['stroke-linejoin']},
                'stroke-linecap': {type: markConfig.style['stroke-linecap']},
                'stroke-rounding-ratio': {type: markConfig.style['stroke-rounding-ratio']},
                'line-extrusion': {type: markConfig.style['line-extrusion'], value: true},
                'extrusion-height': {type: markConfig.style['extrusion-height'], value: 100000},
            }
        },
    },
    'GV.Cube': {
        name: 'GV.Cube',
        property: {
            visible: {type: markConfig.properties.visible, value: true},
            height: {type: markConfig.properties.height, value: 1000000},
            length: {type: markConfig.properties.length, value: 1000000},
            width: {type: markConfig.properties.width, value: 1000000},
            texture: {type: markConfig.properties.texture, value: null},
            style: {
                'altitude-clamping': {type: markConfig.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: markConfig.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: markConfig.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-lighting': {type: markConfig.style['render-lighting'], value: true},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling'], value: true},
                'mesh-uniform': {type: markConfig.style['mesh-uniform'], value: true},
                'mesh-color': {type: markConfig.style['mesh-color'], value: '#FFFFFFFF'},
                'mesh-color-top': {type: markConfig.style['mesh-color-top'], value: '#FFFFFFFF'},
                'mesh-color-bottom': {type: markConfig.style['mesh-color-bottom'], value: '#000000FF'},
                'mesh-color-flank': {type: markConfig.style['mesh-color-flank'], value: '#FFFFFFFF'},
                'mesh-mode': {type: markConfig.style['mesh-mode'], value: 'fill'},
                'mesh-frame': {type: markConfig.style['mesh-frame'], value: false},
                'mesh-frame-color': {type: markConfig.style['mesh-frame-color'], value:  '#FFFFFFFF'},
                'mesh-line-width': {type: markConfig.style['mesh-line-width'], value: 1.0},
                'mesh-roll': {type: markConfig.style['mesh-roll'], value: 0},
                'mesh-scale': {type: markConfig.style['mesh-scale'], value: 1},
                'mesh-pitch': {type: markConfig.style['mesh-pitch'], value: 0},
                'meah-heading': {type: markConfig.style['meah-heading'], value: 0}
            }
        },
    },
    'GV.Icon': {
        name: 'GV.Icon',
        property: {
            url: {type: markConfig.properties.url, value: 'http://127.0.0.1:3000/docResource/place_default.png'},
            style: {
                'altitude-clamping': {type: markConfig.style['altitude-clamping'], value: 'absolute'},
                'max-visible-distance': {type: markConfig.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: markConfig.style['min-visible-distance'], value: 0},
                'icon-scale': {type: markConfig.style['icon-scale'], value: 1},
                'icon-heading': {type: markConfig.style['icon-heading'], value: 0},
                'icon-roll': {type: markConfig.style['icon-roll'], value: 0},
                'icon-pitch': {type: markConfig.style['icon-pitch'], value: 0},
                'icon-size': {type: markConfig.style['icon-size'], value: 10000},
                'icon-declutter': {type: markConfig.style['icon-declutter'], value: false},
                'icon-align': {type: markConfig.style['icon-align'], value: 'left-top'},
                'icon-mode': {type: markConfig.style['icon-mode'], value: 'front-always'},
                'icon-link-line': {type: markConfig.style['icon-link-line'], value: true},
                'icon-alpha': {type: markConfig.style['icon-alpha'], value: 1}
            }
        },
    },
    'GV.Spline': {
        name: 'GV.Spline',
        property: {
            style: {
                'altitude-clamping': {type: markConfig.style['altitude-clamping'], value: 'absolute'},
                'max-visible-distance': {type: markConfig.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: markConfig.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-lighting': {type: markConfig.style['render-lighting'], value: false},
                'render-transparent': {type: markConfig.style['render-transparent'], value: false},
                'render-backface-culling': {type: markConfig.style['render-backface-culling'], value: true},
                'stroke': {type: markConfig.style['stroke'], value: '#ffff00ff'},
                'stroke-width': {type: markConfig.style['stroke-width'], value: '2px'},
                'stroke-stipple-pattern': {type: markConfig.style['stroke-stipple-pattern']},
                'stroke-stipple-factor': {type: markConfig.style['stroke-stipple-factor']},
                'line-extrusion': {type: markConfig.style['line-extrusion'], value: true},
                'extrusion-uniform': {type: markConfig.style['extrusion-uniform'], value: true},
                'extrusion-color': {type: markConfig.style['extrusion-color'], value: '#00ffffee'},
            }
        },
    },
    'GV.FireEffect': {
        name: 'GV.FireEffect',
        property: {
            visible: {type: markConfig.properties.visible, value: true},
            style: {
                'effect-size': {type: markConfig.style['effect-size'], value: 1000000},
            }
        },
    },
    'GV.SmokeEffect': {
        name: 'GV.SmokeEffect',
        property: {
            visible: {type: markConfig.properties.visible, value: true},
            style: {
                'effect-size': {type: markConfig.style['effect-size'], value: 1000000},
            }
        },
    },
    'GV.RainEffect': {
        name: 'GV.RainEffect',
        property: {
            visible: {type: markConfig.properties.visible, value: true},
            style: {
                'effect-size': {type: markConfig.style['effect-size'], value: 1000000},
            }
        },
    },
    'GV.PointEffect': {
        name: 'GV.PointEffect',
        property: {
            visible: {type: markConfig.properties.visible, value: true},
            url: {type: markConfig.properties.url, value: 'http://127.0.0.1:3000/docResource/star.png'},
            style: {
                'effect-size': {type: markConfig.style['effect-size'], value: 300},
                'effect-frequency': {type: markConfig.style['effect-frequency'], value: 1},
                'effect-duration': {type: markConfig.style['effect-duration'], value: 100},
                'effect-mode': {type: markConfig.style['effect-mode'], value: 'flicker'},
                'effect-offset-x': {type: markConfig.style['effect-offset-x'], value: 0},
                'effect-offset-y': {type: markConfig.style['effect-offset-y'], value: 0}
            }
        },
    },
    'GV.GeoMesh': {
        name: 'GV.GeoMesh',
        property: {
            drawable: {type: markConfig.properties.drawable, value:  'url：http://127.0.0.1:3000/docResource/geoMeshSource.txt'},
            style: {
                'altitude-clamping': {type: markConfig.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: markConfig.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: markConfig.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-lighting': {type: markConfig.style['render-lighting'], value: true},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling'], value: true},
                'mesh-mode': {type: markConfig.style['mesh-mode'], value: 'fill'},
            }
        },
    },
    'GV.LocalMesh': {
        name: 'GV.LocalMesh',
        property: {
            drawable: {type: markConfig.properties.drawable},
            style: {
                'altitude-clamping': {type: markConfig.style['altitude-clamping'], value: 'none'},
                'max-visible-distance': {type: markConfig.style['max-visible-distance'], value: 1000000000000},
                'min-visible-distance': {type: markConfig.style['min-visible-distance'], value: 0},
                'render-depth-test': {type: markConfig.style['render-depth-test'], value: true},
                'render-lighting': {type: markConfig.style['render-lighting'], value: true},
                'render-transparent': {type: markConfig.style['render-transparent'], value: true},
                'render-backface-culling': {type: markConfig.style['render-backface-culling'], value: true},
                'mesh-mode': {type: markConfig.style['mesh-mode'], value: 'fill'},
                'mesh-roll': {type: markConfig.style['mesh-roll'], value: 0},
                'mesh-scale': {type: markConfig.style['mesh-scale'], value: 30000},
                'mesh-pitch': {type: markConfig.style['mesh-pitch'], value: 0},
                'meah-heading': {type: markConfig.style['meah-heading'], value: 0},
            }
        },
    },
    'GV.PointCloud': {
        name: 'GV.PointCloud',
        property: {
            dataUrl: {type: markConfig.properties.dataUrl, value: 'http://127.0.0.1:3000/docResource/pointcloud.txt'},
            style: {
                'point-size': {type: markConfig.style['point-size'], value: 10},
                'point-fill': {type: markConfig.style['point-fill'], value: '#FF0000FF'},
                'mesh-mode': {type: markConfig.style['mesh-mode'], value: 'fill'},
                'mesh-roll': {type: markConfig.style['mesh-roll'], value: 0},
                'mesh-scale': {type: markConfig.style['mesh-scale'], value: 1},
                'mesh-pitch': {type: markConfig.style['mesh-pitch'], value: 0},
                'meah-heading': {type: markConfig.style['meah-heading'], value: 0},
            }
        },
    },
};