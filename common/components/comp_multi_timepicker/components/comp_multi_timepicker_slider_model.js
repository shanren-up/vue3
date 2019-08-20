define(
    function() {

        'use strict';

        var sliderModel = Ember.Object.extend({
            // 左边border是否显示颜色
            _hasLeftColor: false,
            // 右边border是否显示颜色
            _hasRightColor: false,
            left: 0,
            width: 40,
            //bar 长度px
            barLength: 0,
            //最小时间 秒
            minTime: 0,
            //最大时间 秒
            maxTime: 0,
            //时间最小力度 秒
            step: 1,
            //右边界位置
            right: Ember.computed('left', 'width', {
                get: function(key) {
                    return this.left + this.width;
                },
                set: function(key, value) {
                    this.set('width', value - this.left);
                    return value;
                }
            }),
            //开始时间 hh:mm:ss
            leftTime: Ember.computed('left', {
                get: function(key) {
                    return this._convertPositionToString(this.get('left'));
                },
                set: function(key, value) {
                    var sendonds = this.constructor.convertTimeStringToSeconds(value);
                    this.set('left', sendonds / (this.maxTime - this.minTime) * this.barLength);
                    return value;
                }
            }),
            //结束时间 hh:mm:ss
            rightTime: Ember.computed('right', {
                get: function(key) {
                    return this._convertPositionToString(this.get('right'));
                },
                set: function(key, value) {
                    var sendonds = this.constructor.convertTimeStringToSeconds(value);
                    this.set('right', sendonds / (this.maxTime - this.minTime) * this.barLength);
                    return value;
                }
            }),
            _updateTime: Ember.observer('minTime', 'maxTime', 'barLength', function() {
                // 计算属性 depends key 未变化时值不变所以 可以先获取之前的时间再设置left right
                var leftTime = this.get('leftTime'),
                    rightTime = this.get('rightTime');
                this.set('leftTime', leftTime);
                this.set('rightTime', rightTime);
            }),
            //位置大小相关样式
            sliderStyle: Ember.computed('left', 'width', function() {
                this.set('_hasLeftColor', this.left === 0);
                this.set('_hasRightColor', this.get('right') === this.barLength);
                return ('left:' + Math.floor(this.left) + 'px;width:' + Math.floor(this.get('width')) + 'px;').htmlSafe();
            }),
            _convertPositionToString: function(num) {
                var time;
                num = parseFloat(num.toFixed(2), 10);
                if (num <= 0) {
                    time = this.minTime;
                } else if (num >= this.barLength) {
                    time = this.maxTime;
                } else {
                    time = (this.maxTime - this.minTime) * num / this.barLength + this.minTime;
                }
                var hours = Math.floor(time / 3600),
                    mins = Math.floor(time / 60) % 60,
                    seconds = time % 60 - time % this.step + (time % this.step >= this.step / 2 ? 1 : 0);
                if (seconds === 60) {
                    mins += 1;
                    seconds = 0;
                }
                return (100 + hours).toString().slice(1) + ':' + (100 + mins).toString().slice(1) +
                    ':' + (100 + seconds).toString().slice(1);
            },
        });
        var coordinateModel = Ember.Object.extend({
            _ctx: document.createElement('canvas').getContext('2d'),
            value: 0,
            left: 0,
            style: Ember.computed('left', function() {
                var leftOffset = -(this._ctx.measureText(this.value).width / 2).toFixed(1);
                return ('left:' + this.left + 'px;margin-left:' + leftOffset + 'px;').htmlSafe();
            })
        });
        sliderModel.convertTimeStringToSeconds = function(str) {
            var hours, minutes, arr, seconds;
            if (typeof str !== 'string' || str.indexOf(':') === -1) {
                throw new TypeError(Ember.oloc('comp_multi_timepicker_slider_model_xsrhh:mmgsdzfc'));
            } else {
                arr = str.split(':');
                if (arr.length >= 2) {
                    hours = parseInt(arr[0], 10);
                    minutes = parseInt(arr[1], 10) || 0;
                    seconds = parseInt(arr[2], 10) || 0;
                    return hours * 3600 + minutes * 60 + seconds;
                } else {
                    throw new TypeError(Ember.oloc('comp_multi_timepicker_slider_model_xsrhh:mmgsdzfc'));
                }
            }
        };
        return {
            sliderModel: sliderModel,
            coordinateModel: coordinateModel,
        };
    }
);