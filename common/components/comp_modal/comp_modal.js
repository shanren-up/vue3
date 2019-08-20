/**
 * 描述：封装自定义模态框公共组件
 * 作者：袁昌龙
 * 联系方式：yuanchanglong@boco.com.cn
 * 创建时间：2015-11-18
 **/
define(
    [
        'app',
        'json!./common/components/comp_modal/cultureInfo.json',
        'text!./common/components/comp_modal/comp_modal.html',
        'css!./comp_modal.css',
        'css!common/components/comp_modal/comp_modal_theme_gxgd.css',
        'html2canvas'
    ],

    function(app, cultureInfo, template) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);

        app.StyleBindingsMixin = Ember.Mixin.create({
            concatenatedProperties: ['styleBindings'],
            attributeBindings: ['style'],
            unitType: 'px',
            createStyleString: function(styleName, property) {
                var value;
                value = this.get(property);
                if (value === void 0) {
                    return;
                }
                if (Ember.typeOf(value) === 'number') {
                    value = value + this.get('unitType');
                }
                return "" + styleName + ":" + value + ";";
            },
            applyStyleBindings: function() {
                var lookup,
                    properties,
                    styleBindings,
                    styleComputed,
                    styles,
                    _this = this;
                styleBindings = this.styleBindings;
                if (!styleBindings) {
                    return;
                }
                lookup = {};
                styleBindings.forEach(function(binding) {
                    var property,
                        style,
                        _ref;
                    _ref = binding.split(':');
                    property = _ref[0];
                    style = _ref[1];
                    return lookup[style || property] = property;
                });
                styles = _.keys(lookup);
                properties = _.values(lookup);
                styleComputed = Ember.computed(function() {
                    var styleString,
                        styleTokens;
                    styleTokens = styles.map(function(style) {
                        return _this.createStyleString(style, lookup[style]);
                    });
                    styleString = styleTokens.join('');
                    if (styleString.length !== 0) {
                        return styleString;
                    }
                });
                styleComputed.property.apply(styleComputed, properties);
                return Ember.defineProperty(this, 'style', styleComputed);
            },
            init: function() {
                this.applyStyleBindings();
                return this._super();
            }
        });

        app.CompModalHeaderComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx("<img class='comp-modal-header-close' src='img/close.png' data-toggle='tooltip' title={{oloc 'comp_modal_gb'}} {{action 'sendClose'}} />{{#if hasMax}}{{#if isMax}}<img class='comp-modal-header-max' src='img/max.png' data-toggle='tooltip' title={{oloc 'comp_modal_zdh'}} {{action 'sendMax'}} />{{else}}<img class='comp-modal-header-max' src='img/restore.png' data-toggle='tooltip' title={{oloc 'comp_modal_hy'}} {{action 'sendMax'}} />{{/if}}{{/if}}{{#if hasPhoto}}<img class='comp-modal-header-photo' src='img/photo.png' data-toggle='tooltip' title={{ oloc 'comp_modal_jt' }} {{action 'sendPhoto'}} />{{/if}}<span class='modal-title'>{{headerText}}</span>"),
            //          <button type='button' class='close' {{action 'sendClose'}}>&times;</button><span class='modal-title'>{{headerText}}</span>"),
            init: function() {
                this._super();
            },
            isMax: true,
            hasMax: true,
            hasPhoto: true,
            actions: {
                sendPhoto: function() {
                    this.sendAction('sendPhoto');
                },
                sendMax: function() {
                    this.set('isMax', !this.get('isMax'));
                    this.sendAction('sendMax');
                },
                sendClose: function() {
                    this.sendAction('sendClose');
                }
            }
        });

        app.CompModalContentComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx("<p>{{content}}</p>"),
            init: function() {
                this._super();
            }
        });

        app.CompModalFooterComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx("<button type='button' class='btn btn-primary btn-confirm button-confirm btn-boco-pos' {{action 'sendConfirm'}}>{{confirmText}}</button>"),
            init: function() {
                this._super();
            },
            actions: {
                sendConfirm: function() {
                    this.sendAction('sendConfirm');
                }
            }
        });

        app.CompModalComponent = Ember.Component.extend(app.StyleBindingsMixin, {
            layout: Ember.ExtendHelper.compileEx(template),
            classNames: ['comp-modal'],
            classNameBindings: ['isShowing:in', 'hasCloseButton::has-no-close-button', 'fade'],
            modalPaneBackdrop: '<div class="modal-backdrop"></div>',
            bodyElementSelector: '.modal-backdrop',
            enforceModality: false,
            escToCancel: true,
            backdrop: true,
            isShowing: false,
            hasCloseButton: true,
            fade: true,
            headerText: "Modal Header",
            confirmText: "Confirm",
            cancelText: "Cancel",
            closeText: null,
            popoverElement: null,
            placement: 'bottom',
            left: 0,
            top: 60,
            content: "",
            size: "normal",
            isValid: true,
            confirm: Ember.K,
            param: Ember.K,
            cancel: Ember.K,
            close: Ember.K,
            max: Ember.K,
            parameters: null,
            hasHeader: true,
            hasMax: true,
            hasPhoto: true,
            hasFooter: false,
            isDefaultStyle: true,
            headerClass: "comp-modal-header",
            bodyClass: "comp-modal-body",
            footerClass: "comp-modal-footer",
            maxClass: 'comp-modal-max',
            headerComponentName: 'comp-modal-header',
            contentComponentName: 'comp-modal-content',
            footerComponentName: 'comp-modal-footer',
            _headerComponentName: Ember.computed(function() {
                var headerComponentName = this.get('headerComponentName');
                return this.get('headerComponentName');
            }).property('headerComponentName'),
            _contentComponentName: Ember.computed(function() {
                return this.get('contentComponentName');
            }).property('contentComponentName'),
            _footerComponentName: Ember.computed(function() {
                return this.get('footerComponentName');
            }).property('footerComponentName'),
            sizeClass: Ember.computed(function() {
                switch (this.get('size')) {
                    case 'large':
                        return 'modal-lg';
                    case 'small':
                        return 'modal-sm';
                    default:
                        return '';
                }
            }).property('size'),
            modalClass: Ember.computed(function() {
                var $target = $(this.get('popoverElement'));
                if (Ember.isEmpty($target)) {
                    if (!this.get('isDefaultStyle')) {
                        return "";
                    }
                }
                return 'modal-content';
            }).property('isDefaultStyle'),
            _lastPositionStyle: "",
            positionStyle: Ember.computed('isDefaultStyle', function() {
                return this.calcPositionStyle();
            }),
            calcPositionStyle: function() {
                var $target = $(this.get('popoverElement'));
                if (Ember.isEmpty($target)) {
                    if (this.get('isDefaultStyle')) {
                        return "margin-left:auto;margin-right:auto;top:" + this.get('top') + "px;";
                    }
                } else {
                    if (this.$('#modal')) {
                        //模态框的宽度和高度
                        var modalWidth = this.$('#modal').width();
                        var modalHeight = this.$('#modal').height();
                        //绝对定位的宽度和高度
                        var absoluteLeft = this.get('left');
                        var absoluteTop = this.get('top');
                        //浏览器可用内容区的宽度和高度
                        var windowWidth = window.innerWidth;
                        var windowHeight = window.innerHeight;
                        //如果位置已经越出屏幕右侧且左侧宽度够用
                        if ((parseFloat(absoluteLeft) + parseFloat(modalWidth) > parseFloat(windowWidth)) && (absoluteLeft > modalWidth)) {
                            this.set('left', absoluteLeft - modalWidth);
                        }
                        //如果位置已经越出屏幕下方且上方高度够用
                        if ((parseFloat(absoluteTop) + parseFloat(modalHeight) > parseFloat(windowHeight)) && (absoluteTop > modalHeight)) {
                            this.set('top', absoluteTop - modalHeight);
                        }
                    }
                    this.set('positionStyle', "margin-left:" + this.get('left') + "px;margin-top:" + this.get('top') + "px;");
                    return "margin-left:" + this.get('left') + "px;margin-top:" + this.get('top') + "px;";
                }
                return "";
            },
            init: function() {
                Ember.setOwner(this, Ember.getOwner(this.targetObject));
                this.renderer = this.targetObject.renderer;
                this._super();
            },
            _checkCollide: function() {
                var modal = this.$('#modal');
                var checkLeft = modal.offset().left;
                var checkTop = modal.offset().top;
                if (checkLeft <= 0) {
                    modal.css('left', -(window.innerWidth / 2 - modal.width() / 2));
                } else if (checkTop <= 0) {
                    modal.css('top', 0);
                } else if (parseInt(modal.css('left'), 10) >= (window.innerWidth / 2 - modal.width() / 2)) {
                    modal.css('left', (window.innerWidth / 2 - modal.width() / 2));
                } else if (parseInt(modal.css('top'), 10) >= (window.innerHeight - modal.height())) {
                    modal.css('top', (window.innerHeight - modal.height()));
                }
                //console.log("offsetleft="+checkLeft+"   offsetTop="+checkTop);
            },
            _throttleReturnTrue: function() {
                if (this._timer) {
                    return false;
                }
                this._timer = setTimeout(function() {
                    if (this.isDestroyed) {
                        return;
                    }
                    this._timer = null;
                }.bind(this), 50);
                return true;
            },
            actions: {
                dragstart: function(ev) {
                    ev.dataTransfer.setDragImage(new Image(0, 0), 0, 0);
                    this._postionData = {
                        x: ev.clientX,
                        y: ev.clientY
                    };
                },
                drag: function(ev) { //节点拖拽
                    ev.stopPropagation();
                    if (!this._throttleReturnTrue() || !ev.clientX || !ev.clientY /*||this._checkCollide()*/ ) {
                        return;
                    }
                    var moveX = ev.clientX - this._postionData.x,
                        moveY = ev.clientY - this._postionData.y;
                    var modal = this.$('#modal');
                    //console.log("X="+modal.offset().left+"  Y="+modal.offset().top);
                    modal.css({
                        top: (parseInt(modal.css('top'), 10) || 0) + moveY,
                        left: (parseInt(modal.css('left'), 10) || 0) + moveX
                    });
                    this._checkCollide();
                    this._postionData = {
                        x: ev.clientX,
                        y: ev.clientY
                    };
                },
                sendPhoto: function() {
                    var modalContent = this.$('#modal');
                    html2canvas(modalContent, {
                        onrendered: function(canvas) {
                            var imgData = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
                            var filename = '' + (new Date()).getTime() + '.png';
                            var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
                            save_link.href = imgData;
                            save_link.download = filename;
                            var event = document.createEvent('MouseEvents');
                            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                            save_link.dispatchEvent(event);
                        }
                    });
                },
                sendMax: function() {
                    var modalContent = this.$('#modal');
                    var lastPositionStyle = this.get('positionStyle');
                    this.set('positionStyle', this._lastPositionStyle);
                    this._lastPositionStyle = lastPositionStyle;
                    modalContent.toggleClass(this.get('sizeClass'));
                    modalContent.toggleClass(this.get('maxClass'));

                    var max;
                    if (!this.get('isShowing')) {
                        return;
                    }
                    max = this.get('max');
                    if (typeof max === 'function') {
                        this.max(this);
                    } else {
                        this.sendAction('max');
                    }

                },
                sendCancel: function() {
                    var cancel;
                    if (!this.get('isShowing')) {
                        return;
                    }
                    cancel = this.get('cancel');
                    if (typeof cancel === 'function') {
                        this.cancel(this);
                    } else {
                        this.sendAction('cancel');
                    }
                    return this.hide();
                },
                sendConfirm: function() {
                    var confirm;
                    if (!this.get('isShowing')) {
                        return;
                    }
                    confirm = this.get('confirm');
                    if (typeof confirm === 'function') {
                        this.confirm(this);
                    } else {
                        this.sendAction('confirm');
                    }
                    return this.hide();
                },
                sendParam: function() {
                    var param;
                    if (!this.get('isShowing')) {
                        return;
                    }
                    param = this.get('param');
                    if (typeof param === 'function') {
                        this.param(this);
                    } else {
                        this.sendAction('param');
                    }
                    return;
                },
                sendClose: function() {
                    var close;
                    if (!this.get('isShowing')) {
                        return;
                    }
                    close = this.get('close');
                    if (typeof close === 'function') {
                        this.close(this);
                    } else {
                        this.sendAction('close');
                    }
                    return this.hide();
                }
            },
            didInsertElement: function() {
                this._super();
                this.snapToPosition();
                if (this.get('fade')) {
                    //this.$()[0].offsetWidth;
                }
                if (this.get('backdrop')) {
                    this._appendBackdrop();
                }
                Ember.run.next(this, function() {
                    return this.set('isShowing', true);
                });
                $(document.body).addClass('modal-open');
                return this._setupDocumentHandlers();
            },
            willDestroyElement: function() {
                this._super();
                this._removeDocumentHandlers();
                if (this._backdrop) {
                    return this._backdrop.remove();
                }
            },
            handleResize: function(width, height) {
                this.snapToPosition();
            },
            computeFrameOffset: function(win, pos) {
                var found,
                    frame,
                    frames,
                    rect,
                    _i,
                    _len;
                if (pos == null) {
                    pos = {
                        top: 0,
                        left: 0
                    };
                }
                frames = win.parent.document.getElementsByTagName("iframe");
                found = false;
                for (_i = 0, _len = frames.length; _i < _len; _i++) {
                    frame = frames[_i];
                    if (frame.contentWindow === win) {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    rect = frame.getBoundingClientRect();
                    pos.left += rect.left;
                    pos.top += rect.top;
                    if (win !== top) {
                        this.computeFrameOffset(win.parent, pos);
                    }
                }
                return pos;
            },
            getOffset: function($target) {
                var doc,
                    pos,
                    win;
                pos = $target.offset();
                doc = $target[0].ownerDocument;
                win = doc.defaultView;
                return this.computeFrameOffset(win, pos);
            },
            snapToPosition: function() {
                var $target,
                    actualHeight,
                    actualWidth,
                    pos;
                $target = $(this.get('popoverElement'));
                if ((this.get('_state') || this.get('state')) !== 'inDOM' || Ember.isEmpty($target)) {
                    return;
                }
                actualWidth = this.$('#modalBody').width();
                actualHeight = this.$('#modalBody').height();
                pos = this.getOffset($target);
                pos.width = $target[0].offsetWidth;
                pos.height = $target[0].offsetHeight;
                switch (this.get('placement')) {
                    case 'bottom':
                        this.set('top', pos.top + pos.height);
                        this.set('left', pos.left + pos.width / 2 - actualWidth);
                        break;
                    case 'top':
                        this.set('top', pos.top - actualHeight);
                        this.set('left', pos.left + pos.width / 2 - actualWidth);
                        break;
                    case 'top-right':
                        this.set('top', pos.top);
                        this.set('left', pos.left + pos.width);
                        break;
                    case 'top-left':
                        this.set('top', pos.top);
                        this.set('left', pos.left - actualWidth);
                        break;
                    case 'bottom-right':
                        this.set('top', pos.top + pos.height);
                        this.set('left', pos.left + pos.width - actualWidth);
                        break;
                    case 'bottom-left':
                        this.set('top', pos.top + pos.height);
                        this.set('left', pos.left);
                        break;
                    case 'left':
                        this.set('top', pos.top - this.get('marginTop'));
                        this.set('left', pos.left - actualWidth);
                        break;
                    case 'right':
                        this.set('top', pos.top - this.get('marginTop'));
                        this.set('left', pos.left + pos.width);
                        break;
                    default:
                        //对于默认赋值了top和left的窗体进行判断

                        break;
                }
                this.calcPositionStyle();
                //this.correctIfOffscreen();
            },
            //todo:待完善
            correctIfOffscreen: function() {
                var actualHeight,
                    actualWidth,
                    bodyHeight,
                    bodyWidth;
                bodyWidth = $('body').width();
                bodyHeight = $('body').height();
                actualWidth = this.$()[0].offsetWidth;
                actualHeight = this.$()[0].offsetHeight;
                if (this.get('left') + actualWidth > bodyWidth) {
                    this.set('left', bodyWidth - actualWidth - this.get('marginLeft'));
                }
                if (this.get('left') < 0) {
                    this.set('left', this.get('marginLeft'));
                }
                if (this.get('top') + actualHeight > bodyHeight) {
                    this.set('top', bodyHeight - actualHeight - this.get('marginTop'));
                }
                if (this.get('top') < 0) {
                    return this.set('top', this.get('marginTop'));
                }
            },
            keyHandler: Ember.computed(function() {
                var _this = this;
                return function(event) {
                    if (event.which === 27 && _this.get('escToCancel')) {
                        return _this.send('sendCancel');
                    }
                };
            }),
            click: function(event) {
                if (event.target !== event.currentTarget) {
                    return;
                }
                if (!this.get('enforceModality')) {
                    return this.hide();
                }
            },
            hide: function() {
                var _this = this;
                this.set('isShowing', false);
                $(document.body).removeClass('modal-open');
                if (this._backdrop) {
                    this._backdrop.removeClass('in');
                }
                if (this.get('fade')) {
                    // return this.$().one($.support.transition.end, function() {
                        return Ember.run(_this, _this.destroy);
                    // });
                } else {
                    return Ember.run(this, this.destroy);
                }
            },
            _appendBackdrop: function() {
                var modalPaneBackdrop,
                    parentLayer;
                parentLayer = this.$().parent();
                modalPaneBackdrop = this.get('modalPaneBackdrop');
                if (this.get('fade')) {
                    this._backdrop = jQuery(modalPaneBackdrop).addClass('fade');
                }
                this._backdrop.appendTo(parentLayer);
                return Ember.run.next(this, function() {
                    return this._backdrop.addClass('in');
                });
            },
            _setupDocumentHandlers: function() {
                var _this = this;
                this._super();
                if (!this._hideHandler) {
                    this._hideHandler = function() {
                        return _this.hide();
                    };
                    $(document).on('modal:hide', this._hideHandler);
                }
                return $(document).on('keyup', this.get('keyHandler'));
            },
            _removeDocumentHandlers: function() {
                this._super();
                $(document).off('modal:hide', this._hideHandler);
                this._hideHandler = null;
                return $(document).off('keyup', this.get('keyHandler'));
            }
        });

        app.CompModalComponent.reopenClass({
            rootElement: 'body',
            poppedModal: null,
            hideAll: function() {
                return $(document).trigger('modal:hide');
            },
            popup: function(options) {
                var modal,
                    rootElement;
                if (options == null) {
                    options = {};
                }
                //this.hideAll();
                rootElement = options.rootElement || this.rootElement;
                this.targetObject = options.targetObject;
                modal = this.create(options);
                modal.appendTo(rootElement);
                return this;
            }
        });
        /*
         * 使用举例：modal.popup({
         targetObject : this,
         headerText : Ember.oloc('comp_modal_xxxx'),
         enforceModality : true,
         sizeClass : 'bs-host-config-information-modal-size',
         footerViewClass : Ember.Component,
         contentViewClass : app.HostConfigInformationComponent.extend({
         host : this.get("host")
         })
         });
         */
        return app.CompModalComponent;
    });