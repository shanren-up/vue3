define(
    [
        'app',
        'text!./comp_multi_timepicker_slider.html',
        'comp_modal',
        './comp_multi_timepicker_slider_model.js',
        './comp_multi_timpicker_edit',
        'css!./comp_multi_timepicker_slider.css',

    ],

    function(app, template, modal, model) {

        'use strict';

        // left:0,
        // width:40,
        // right: 0,
        // min: 0,
        // max: 500,
        // barLength
        // //最小时间 分钟
        // minTime: 0,
        // //最大时间 分钟
        // maxTime: 0,
        // //时间最小力度分钟
        // step: 1,
        // //开始时间分钟
        // leftTime: 0,
        // //结束时间 分钟
        // rightTime: 120,

        app.CompMultiTimepickerSliderComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-multi-timepicker-slider',
            //序号
            index: 0,
            dataSource: null,
            _isShowTip: false,
            init: function() {
                this._super();
                if (!this.dataSource) {
                    this.dataSource = model.sliderModel.create();
                }
            },
            didInsertElement: function() {},
            willDestroyElement: function() {},
            _validLeft: function(left) {
                var max = this.dataSource.get('barLength');
                if (left <= 0) {
                    left = 0;
                } else if (left + this.dataSource.get('width') > max) {
                    left = max - this.dataSource.get('width');
                }
                return left;
            },
            _validWidth: function(width) {
                var max = this.dataSource.get('barLength');
                //最小宽度为1
                if (width <= 1) {
                    width = 1;
                } else if (width + this.dataSource.get('left') > max) {
                    width = max - this.dataSource.get('left');
                }
                return width;
            },
            // resize 时的处理函数
            _handleResize: function(event) {
                var moveX = event.clientX - this._dragOrign.x,
                    width, left;
                this._dragOrign.x = event.clientX;
                if (this._dragOrign.origin === 'right') {
                    width = this.dataSource.get('width') + moveX;
                    this.dataSource.set('width', this._validWidth(width));
                } else {
                    left = this.dataSource.get('left') + moveX;
                    width = this.dataSource.get('width');
                    if (left > 0 && left < this.dataSource.barLength) {
                        width = width - moveX;
                    }
                    if (left + width === this.dataSource.barLength) {
                        this.dataSource.set('left', left);
                        this.dataSource.set('width', width);
                        return;
                    }
                    this.dataSource.set('left', this._validLeft(left));
                    this.dataSource.set('width', this._validWidth(width));

                }


            },
            // move 处理函数
            _handleMove: function(event) {
                if (!event) {
                    return;
                }
                var moveX = event.clientX - this._dragOrign.x,
                    left;
                this._dragOrign.x = event.clientX;
                left = this.dataSource.get('left') + moveX;

                this.dataSource.set('left', this._validLeft(left));
            },
            // handle 低版本浏览器 拖动图标必须显示在页面
            _newAndAddImgElement: function() {
                var img = document.createElement('img');
                img.className = 'multi-timepicker-temp';
                document.body.appendChild(img);
                img.width = img.height = 1;
                img.opacity = 0;
                // 下个loop中删除
                setTimeout(function() {
                    Ember.$(img).remove();
                });
                return img;
            },
            actions: {
                resizeStart: function(origin, event) {
                    event.stopPropagation();
                    event.dataTransfer.setDragImage(this._newAndAddImgElement(), 0, 0);
                    this.set('_isShowTip', true);
                    this._dragOrign = {
                        x: event.clientX,
                        y: event.clientY,
                        origin: origin,
                        type: 'resize',
                    };
                },
                resizeDrag: function(origin, event) {
                    event.stopPropagation();
                    if (!this._dragOrign || this._dragOrign.type !== 'resize' || event.clientX === 0) {
                        return;
                    }
                    Ember.run.once(this, function() {
                        this._handleResize(event);
                    });
                },
                resizeEnd: function(origin, event) {
                    event.stopPropagation();
                    Ember.run.later(this, function() {
                        if (!this.isDestroyed && !this.isDestroying) {
                            this.set('_isShowTip', false);
                        }
                    }, 500);
                    Ember.run.once(this, function() {
                        this._handleResize(event);
                        this.sendAction('itemResizeEnd', {
                            index: this.index,
                            origin: this._dragOrign.origin,
                            left: this.dataSource.get('left'),
                            right: this.dataSource.get('right'),
                        });
                        this._dragOrign = null;
                    });
                },
                moveStart: function(event) {
                    event.stopPropagation();
                    this.set('_isShowTip', true);
                    event.dataTransfer.dropEffect = 'move';
                    event.dataTransfer.setDragImage(this._newAndAddImgElement(), 0, 0);
                    this._dragOrign = {
                        x: event.clientX,
                        y: event.clientY,
                        type: 'move',
                    };
                },
                moveDrag: function(event) {
                    event.stopPropagation();
                    if (!this._dragOrign || this._dragOrign.type !== 'move' || event.clientX === 0) {
                        return;
                    }
                    Ember.run.once(this, function() {
                        this._handleMove(event);
                    });
                },
                moveEnd: function(origin, event) {
                    event.stopPropagation();
                    Ember.run.later(this, function() {
                        if (!this.isDestroyed && !this.isDestroying) {
                            this.set('_isShowTip', false);
                        }
                    }, 500);
                    Ember.run.once(this, function() {
                        this._handleMove(event);
                        this.sendAction('itemMoveEnd', {
                            index: this.index,
                            left: this.dataSource.get('left'),
                            right: this.dataSource.get('right'),
                        });
                        this._dragOrign = null;
                    });
                },
                showEdit: function() {
                    var params = {
                        leftTime: this.dataSource.get('leftTime'),
                        rightTime: this.dataSource.get('rightTime')
                    };
                    //非模态框
                    modal.popup({
                        targetObject: this,
                        popoverElement: this.$('.comp-multi-timepicker-slider'), //指定元素
                        placement: 'top-right', //弹出方位：bottom、top、top-right、top-left、bottom-right、bottom-left、left、right
                        hasHeader: true, //是否包含默认头部
                        hasMax: false, //头部是否包含“最大化”按钮
                        hasPhoto: false, //头部是否包含“截图”按钮
                        headerText: Ember.oloc('comp_multi_timepicker_slider_xgsj'),
                        sizeClass: 'comp-multi-timepicker-edit-size',
                        contentComponentName: 'comp-multi-timepicker-edit',
                        hasFooter: false, //是否包含默认底部
                        backdrop: true, //非模态框
                        parameters: params,
                        enforceModality: true,
                        confirm: function() {
                            this.dataSource.set('leftTime', params.leftTime);
                            this.dataSource.set('rightTime', params.rightTime);
                            // 进行一次检测合并
                            this.sendAction('itemMoveEnd', {
                                index: this.index,
                                left: this.dataSource.get('left'),
                                right: this.dataSource.get('right'),
                            });
                        }.bind(this)
                    });
                }
            }
        });
    }
);