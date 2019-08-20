define(
    [
        'app',
        'json!./cultureInfo.json',
        'text!./comp_multi_timepicker.html',
        './components/comp_multi_timepicker_slider_model.js',
        'css!./comp_multi_timepicker.css',
        './components/comp_multi_timepicker_slider.js'
    ],

    function(app, cultureInfo, template, model) {

        'use strict';
        Ember.addJsonCultureInfo(cultureInfo);

        app.CompMultiTimepickerComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-multi-timepicker',
            classNames: ['absolute'],
            // 选择时间的力度 分钟
            step: 1,
            // 坐标间隔 小时
            coordinateStep: 2,
            minTime: '00:00',
            maxTime: '24:00',
            sliderData: null,
            _coordinateData: null,
            _dragData: null,
            _barWidth: 0,
            defaultValue: '',
            init: function() {
                this._super();
                if (!this.sliderData) {
                    this.sliderData = [];
                }
            },
            didInsertElement: function() {
                Ember.run.later(this, this.handleResize, 300);
            },
            willDestroyElement: function() {
                this.sliderData.length = 0;
            },
            showView: function() {
                this.handleResize();
            },
            getValue: function() {
                return this.sliderData.map(function(item) {
                    return item.get('leftTime') + '~' + item.get('rightTime');
                }).join();
            },
            setValue: function(value) {
                if (value && value.indexOf('~') !== -1 && value.indexOf(':') !== -1) {
                    value.split(',').forEach(function(str) {
                        if (model.sliderModel.convertTimeStringToSeconds(str.split('~')[0]) >
                            model.sliderModel.convertTimeStringToSeconds(str.split('~')[1])) {
                            throw new Error(Ember.oloc('comp_multi_timepicker_jssjxydykssj'));
                        }
                    });
                    this._setValue(value);
                } else {
                    throw new TypeError(Ember.oloc('comp_multi_timepicker_xszhh:mm~hh:mmgsdzfc'));
                }
            },
            // value: Ember.computed('sliderData.@each.left','sliderData.@each.width', {
            //     get: function(key) {
            //         return this.sliderData.map(function(item) {
            //             return item.get('leftTime') + '~' + item.get('rightTime');
            //         }).join();
            //     },
            //     set: function(key, value) {
            //         if (!this.sliderData || !this._barWidth) {
            //             this.defaultValue = value;
            //             return value;
            //         }
            //         this._setValue(value);
            //         return value;
            //     }
            // }),
            _minMinutes: Ember.computed('minTime', function() {
                var timeStr = this.minTime || '00:00';
                return model.sliderModel.convertTimeStringToSeconds(timeStr);

            }),
            _maxMinutes: Ember.computed('maxTime', function() {
                var timeStr = this.maxTime || '24:00';
                return model.sliderModel.convertTimeStringToSeconds(timeStr);
            }),
            _initCoordinate: Ember.observer('_barWidth', '_maxMinutes', '_minMinutes', function() {
                var max = Math.floor(this.get('_maxMinutes') / 3600),
                    min = Math.ceil(this.get('_minMinutes') / 3600);
                this.set('_coordinateData', []);
                for (var i = min; i <= max; i++) {
                    if (i % this.coordinateStep === 0) {
                        this._coordinateData.pushObject(model.coordinateModel.create({
                            value: i,
                            left: Math.round(i * 3600 * this._barWidth / (this.get('_maxMinutes') - this.get('_minMinutes')))
                        }));
                    }
                }
            }),
            handleResize: function() {
                Ember.run.later(this, function() {
                    if (this.isDestroyed || this.isDestroying) {
                        return;
                    }
                    this.set('_barWidth', Math.floor(this.$('.bar-bg').width()));
                    this.sliderData.setEach('barLength', this._barWidth);
                    if (this.defaultValue) {
                        this._setValue(this.defaultValue);
                        this.defaultValue = '';
                    }
                }, 200);
            },
            _setValue: function(value) {
                var arr = value.split(',');
                var sliderList = [];
                arr.forEach(function(str) {
                    if (str.indexOf('~') === -1) {
                        return;
                    }
                    var slider = model.sliderModel.create({
                        left: 0,
                        width: 0,
                        barLength: this._barWidth,
                        minTime: this.get('_minMinutes'),
                        maxTime: this.get('_maxMinutes'),
                        step: this.step,
                    });
                    slider.set('leftTime', str.split('~')[0]);
                    slider.set('rightTime', str.split('~')[1]);
                    sliderList.push(slider);
                }, this);
                this.set('sliderData', sliderList);
            },
            //check pointer 是否已经被占用 参数相对于bar-bg的横坐标 返回false，或包括当前点slider的序号
            _checkPointer: function(x) {
                var isChecked = false;
                this.sliderData.forEach(function(item, i) {
                    if (isChecked !== false) {
                        return;
                    }
                    if (item.get('left') < x && item.get('right') > x) {
                        isChecked = i;
                    }
                });
                return isChecked;
            },
            //获取当前点左侧滑块的序号 x相对于bar-bg的横坐标
            _getLeftIndex: function(x) {
                var index = -1;
                this.sliderData.forEach(function(item, i) {
                    if (item.get('right') < x) {
                        index = i;
                    }
                });
                return index;
            },
            // _getPointerLeft
            // 添加滑块 参数 相对于bar-bg的横坐标 width 插入的位置 index
            _addSlider: function(x1, width, index) {
                this.sliderData.splice(index, 0, model.sliderModel.create({
                    left: x1,
                    width: width,
                    barLength: this._barWidth,
                    minTime: this.get('_minMinutes'),
                    maxTime: this.get('_maxMinutes'),
                    step: this.step,
                }));
                this.notifyPropertyChange('sliderData');
                //this.sliderData.pushObject();
            },
            //更改新增滑块的宽度
            _changeDragWidth: function(e) {
                var moveX;
                if (!e) {
                    return;
                }
                if (this._dragData) {
                    moveX = e.clientX - this._dragData.x;
                    if (moveX >= 0) {
                        if (moveX + this._dragData.originX > this._barWidth) {
                            this.sliderData[this._dragData.index].set('width', this._barWidth - this._dragData.originX);
                        } else {
                            // 防止时间段为0
                            if (moveX === 0) {
                                moveX = 1;
                            }
                            this.sliderData[this._dragData.index].set('width', moveX);
                        }
                    } else {
                        if (this._dragData.originX + moveX > 0) {
                            this.sliderData[this._dragData.index].set('left', this._dragData.originX + moveX);
                            this.sliderData[this._dragData.index].set('width', -moveX);
                        } else {
                            this.sliderData[this._dragData.index].set('left', 0);
                            this.sliderData[this._dragData.index].set('width', this._dragData.originX);
                        }
                    }

                }
            },
            // 合并相连的滑块 合并的首尾序号 compareIndex 可选 只作为参考坐标不修改
            _mergeSlider: function(startIndex, endIndex, compareIndex) {
                //console.log(startIndex, endIndex);
                var maxRight = Math.max(this.sliderData[startIndex].get('right'), this.sliderData[endIndex].get('right')),
                    minLeft = Math.min(this.sliderData[startIndex].get('left'), this.sliderData[endIndex].get('left'));
                // compareIndex 只作为参考坐标不修改
                if (!Ember.isEmpty(compareIndex)) {
                    maxRight = Math.max(maxRight, this.sliderData[compareIndex].get('right'));
                    minLeft = Math.min(minLeft, this.sliderData[compareIndex].get('left'));
                }
                this.sliderData.splice(startIndex, endIndex - startIndex + 1, model.sliderModel.create({
                    left: minLeft,
                    width: maxRight - minLeft,
                    barLength: this._barWidth,
                    minTime: this.get('_minMinutes'),
                    maxTime: this.get('_maxMinutes'),
                    step: this.step,
                }));
                this.notifyPropertyChange('sliderData');
            },
            // 检查子滑块左侧的点是否接触其他滑块 返回false 或者接触到的左侧滑块的序号index
            _checkItemLeft: function(option) {
                var leftIndex, pointIndex;
                leftIndex = this._getLeftIndex(option.left + 0.1) + 1;
                if (option.left === option.right) {
                    leftIndex -= 1;
                }
                if (leftIndex > this.sliderData.length) {
                    leftIndex = this.sliderData.length;
                }
                pointIndex = this._checkPointer(option.left - 0.1);
                //左侧第一个的下一个是否是自己
                if (leftIndex !== option.index || pointIndex !== false) {
                    //如果空余则合并到leftIndex+1否则pointIndex
                    if (pointIndex === false) {
                        //向左改变大小只合并包含的
                        return leftIndex;
                    } else {
                        return pointIndex;
                    }
                }
                return false;
            },
            // 检查子滑块右侧的点是否接触其他滑块 返回false 或者接触到的右侧滑块的序号index
            _checkItemRight: function(option) {
                var leftIndex, pointIndex;
                leftIndex = this._getLeftIndex(option.right - 0.1);
                pointIndex = this._checkPointer(option.right);
                if (leftIndex !== option.index - 1 || pointIndex !== false) {
                    //如果空余则合并到leftIndex否则pointIndex
                    if (pointIndex === false) {
                        return leftIndex;
                    } else {
                        return pointIndex;
                    }
                }
                return false;
            },
            // 移动首尾都改变了位置时合并slider 参数左侧合并点 右侧合并点 当前序号
            _mergeSliderSpecial: function(leftResult, rightResult, index) {
                //因为是移动，而且滑块总是有序的，所以首尾坐标都变大或者变小是只可能都大于原来下标或都小于
                if (leftResult > index && rightResult > index) {
                    this._mergeSlider(leftResult, rightResult, index);
                    this.sliderData.removeAt(index);
                    this.notifyPropertyChange('sliderData');
                } else if (leftResult < index && rightResult < index) {
                    this._mergeSlider(leftResult, rightResult, index);

                    this.sliderData.removeAt(index - (rightResult - leftResult));
                    this.notifyPropertyChange('sliderData');
                }
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
                dragStart: function(event) {
                    event.stopPropagation();
                    event.dataTransfer.setDragImage(this._newAndAddImgElement(), 0, 0);
                    if (event.target.className !== 'bar-bg') {
                        return;
                    }
                    var index = this._getLeftIndex(event.offsetX) + 1;
                    this._addSlider(event.offsetX, 0, index);
                    this._dragData = {
                        index: index,
                        originX: event.offsetX,
                        x: event.clientX,
                        y: event.clientY,
                    };
                },
                draging: function(event) {
                    event.stopPropagation();
                    if (!this._dragData || event.clientX === 0) {
                        return;
                    }
                    Ember.run.once(this, function() {
                        // 由于sliderData 与子组件顺序不对应 所以用index查找 TODO index改为name
                        var currentSlider = this.childViews.filterBy('index', this._dragData.index)[0];
                        if (currentSlider) {
                            currentSlider.set('_isShowTip', true);
                        }
                        this._changeDragWidth(event);
                    });
                },
                dragEnd: function(event) {
                    event.stopPropagation();
                    if (!this._dragData) {
                        return;
                    }
                    Ember.run.once(this, function() {
                        var currentSlider = this.childViews.filterBy('index', this._dragData.index)[0];
                        if (currentSlider) {
                            currentSlider.set('_isShowTip', false);
                        }
                        if (!event) {
                            return;
                        }
                        this._changeDragWidth(event);
                        var currentX = event.clientX - this._dragData.x + this._dragData.originX;
                        var leftIndex, pointIndex;
                        // 左划
                        if (event.clientX - this._dragData.x < 0) {
                            leftIndex = this._getLeftIndex(currentX - 0.1) + 1;
                            //当前点是否空余 false 空余
                            pointIndex = this._checkPointer(currentX - 0.1);
                            if (leftIndex !== this._dragData.index || pointIndex !== false) {
                                //如果空余则合并到leftIndex否则pointIndex
                                if (pointIndex === false) {
                                    this._mergeSlider(leftIndex, this._dragData.index);
                                } else {
                                    this._mergeSlider(pointIndex, this._dragData.index);
                                }
                            }
                        } else {
                            //+0.1为了向右偏移一点检查左边第一个是否是自己
                            leftIndex = this._getLeftIndex(currentX + 0.1);
                            //当前点是否空余 false 空余
                            pointIndex = this._checkPointer(currentX + 0.1);
                            if (leftIndex !== this._dragData.index || pointIndex !== false) {
                                //如果空余则合并到leftIndex否则pointIndex
                                if (pointIndex === false) {
                                    this._mergeSlider(this._dragData.index, leftIndex);
                                } else {
                                    this._mergeSlider(this._dragData.index, pointIndex);
                                }
                            }
                        }

                        this._dragData = null;
                        this.sendAction('onChange', this.getValue());
                    });
                },
                dragOver: function(event) {
                    event.stopPropagation();
                    return false;
                },
                /*
                index 发送事件滑块的序号
                origin resize的方向
                left  resize 完成时的左侧坐标
                right resize 完成时的右侧坐标
                 */
                itemResizeEnd: function(option) {
                    var rightResult, leftResult;
                    //右测改变只检测右侧点
                    if (option.origin === 'right') {
                        rightResult = this._checkItemRight(option);
                        if (rightResult !== false) {
                            this._mergeSlider(option.index, rightResult);
                        }
                        //左侧测改变只检测左侧点
                    } else if (option.origin === 'left') {
                        leftResult = this._checkItemLeft(option);
                        if (leftResult !== false) {
                            if (leftResult > this.sliderData.length - 1) {
                                leftResult = this.sliderData.length - 1;
                            }
                            this._mergeSlider(leftResult, option.index);
                        }

                    }
                    this.sendAction('onChange', this.getValue());
                },
                /*
                index 发送事件滑块的序号
                left  resize 完成时的左侧坐标
                right resize 完成时的右侧坐标
                 */
                itemMoveEnd: function(option) {
                    // 判断左侧的点
                    var leftResult = this._checkItemLeft(option);
                    // 判断右侧的点
                    var rightResult = this._checkItemRight(option);
                    if (leftResult !== false) {
                        if (rightResult !== false) {
                            //如果left>right 说明整体移动而且没有重合其他滑块
                            if (leftResult <= rightResult) {
                                this._mergeSliderSpecial(leftResult, rightResult, option.index);
                            } else if (leftResult > rightResult) {
                                this.set('sliderData', this.sliderData.sortBy('left'));

                            }
                        } else {
                            this._mergeSlider(leftResult, option.index);
                        }
                    } else {
                        if (rightResult !== false) {
                            this._mergeSlider(option.index, rightResult);
                        }
                    }
                    this.sendAction('onChange', this.getValue());
                },
            }
        });
    });