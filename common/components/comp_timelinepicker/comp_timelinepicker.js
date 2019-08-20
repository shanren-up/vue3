define(
    [
        'app',
        'text!./comp_timelinepicker.html',
        'jquery_range',
        'css!./comp_timelinepicker.css',
    ],
    function (app, template) {

        "use strict";

        app.CompTimelinepickerComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-timelinepicker',
            //天
            isDay: false,
            year: null,
            month: null,
            days: null,
            //小时
            hourSystem: 24,//12 24
            step: 1,
            //css
            width: 850,
            lineColor: '#adb1af',
            pointerColor: '#48565f',
            activeColor: '#a81a02',
            init: function () {
                this._super();
                if (this.get('isDay')) {
                    if (this.year && this.month) {
                        this.days = this.totalDays(this.year, this.month);
                    }
                }
            },
            didInsertElement: function () {
                this.range();
            },
            willDestroyElement: function () {
            },
            range: function () {
                var i;
                var opt = {
                    from: 0,
                    to: 23,
                    step: this.step,
                    scale: [],
                    format: function (value) {
                        return value + 'h';
                    },
                    showLabels: true,
                    snap: true
                };
                if (this.get('isDay')) {
                    opt.from = 1;
                    opt.to = this.days;
                    for (i = 1; i <= this.days; i++) {
                        opt.scale.push(i + '号');
                    }
                    opt.format = function (value) {
                        return value + '号';
                    };
                } else {
                    if (this.hourSystem !== 24 && this.hourSystem !== 12) {
                        console.log('hourSystem must be 24 or 12 ');
                        return;
                    } else {
                        for (i = 0; i < this.hourSystem; i++) {
                            opt.scale.push(i);
                        }
                        opt.to = this.hourSystem - 1;
                        opt.format = function (value) {
                            return value + 'h';
                        };
                    }
                }
                opt.width = this.width * (1 - 2 / opt.scale.length);
                var self = this;
                opt.onstatechange = function (value) {
                    self.sendAction('onStateChange', value);
                };
                //适应宽度
                this.$(this.element).find('.comp-timelinepicker-box').width(this.width)
                    .find('.comp-timelinepicker').css('padding-left', this.width / (opt.scale.length + 2))
                    .find('.single-slider')
                    .jRange(opt);
                this.setStyle();
            },
            //一个月的总天数
            totalDays: function (years, months) {
                var d = new Date(years, months, 0);
                return d.getDate();
            },
            setStyle: function () {
                this.$(this.element).find('.comp-timelinepicker').css('background', 'linear-gradient(to bottom, #fff, ' + this.lineColor + '),' + this.lineColor)
                    .find('.back-bar').css('background', 'linear-gradient(to bottom, #fff, ' + this.lineColor + '),' + this.lineColor)
                    .find('.pointer').css('background', this.activeColor);
                this.$(this.element).find('.scale span').css('background', this.pointerColor);
            },
            actions: {}
        });
    });
