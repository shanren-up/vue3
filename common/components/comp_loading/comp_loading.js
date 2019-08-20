define(
    [
        'app',
        'text!./comp_loading.html',
        'css!./comp_loading.css',
        'sh_circle_loader'
    ],

    function(app, template) {

        'use strict';

        app.CompLoadingComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            style: 'loading',
            _timer: null,
            // 当前是否处于loading状态
            _status: false,
            init: function() {
                this._super();
            },
            didInsertElement: function() {},
            willDestroyElement: function() {
                if (this._status) {
                    this.stop();
                }
                this.cancelAutoStop();
            },
            /**
             * 获取当前状态 是否在loading动画中
             * @return {boolean} status true表示在动画中
             */
            getStatus: function() {
                return this._status;
            },
            /**
             * 开始loading动画并在指定时间后自动结束动画
             * @mehod startWithTimes
             * @param {number} times  多少秒之后切换到stop状态
             */
            startWithTimes: function(times) {
                this.start();
                // 重复使用时更新时间
                if (this._timer) {
                    clearTimeout(this.timer);
                }
                this._timer = setTimeout(function() {
                    this.stop();
                }.bind(this), parseInt(times, 10) * 1000 || 1e4);
            },
            /**
             * 取消由startWithTimes注册的定时停止动画
             * @mehod cancelAutoStop
             */
            cancelAutoStop: function() {
                clearTimeout(this._timer);
                this._timer = null;
            },
            start: function() {
                this.set('_status', true);
                $(this.element.parentElement).css('pointer-events', 'none');
                this.$('#loading1').shCircleLoader({
                    color: '#6697C4',
                    dotsRadius: 10
                });

            },
            stop: function() {
                this.set('_status', false);
                $(this.element.parentElement).css('pointer-events', 'all');
                this.$('#loading1').shCircleLoader('destroy');
            },
            _loadingStyle: Ember.computed('style', function() {
                return this.get('style');
            })
        });

        // mouseEnter:function(event){
        // $(event.target)
        // },
    });