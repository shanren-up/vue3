define(
    [
        'app',
        // 'json!./cultureInfo.json',
        'configs',
        'jquery',
        'text!./comp_datetimepicker.html',
        'css!./comp_datetimpicker.css',
        'css!./comp_datetimepicker_theme_default.css',
        'bootstrap_datetimepicker'
    ],
    function(app, configs,$, template) {

        'use strict';
        // Ember.addJsonCultureInfo(cultureInfo);

        app.BhzCompDatetimepickerComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-datetimpicker',

            dateFormat: 'yyyy-mm-dd hh:ii:ss',
            //最小时间
            minDate: null,
            //最大时间
            maxDate: null,
            //在数组中的日期不能被选择，例如节假日
            enabledDates: [],
            //当前时间
            curDate: null,
            //当选择一个日期之后是否立即关闭此日期时间选择器
            autoclose: true,
            //时间选择控件编号
            datetimepickerId: '',
            //时间控件编号
            datetimeInputId: '',
            //时间控件高度
            datetimeHeight: 28,
            // 时间文本字体大小
            fontSize: 12,
            //是否禁用控件
            isDisabled: false,
            minViewValus: [0, 1, 2, 3, 4, 'hour', 'day', 'month', 'year', 'decade'],
            //日期时间选择器所能够提供的最精确的时间选择视图
            //默认值:0, 'hour'
            //0 or 'hour' for the hour view
            //1 or 'day' for the day view
            //2 or 'month' for month view (the default)
            //3 or 'year' for the 12-month overview
            //4 or 'decade' for the 10-year overview. Useful for date-of-birth datetimepickers.
            minView: 0,
            //pickerPosition弹出框定位
            pickerPosition: 'bottom-right',
            init: function() {
                this._super();
                var dateT = new Date();
                var id = 'datetimepickerId' + dateT.getMonth() + dateT.getDate() + dateT.getHours() + dateT.getMinutes() + dateT.getSeconds() + Math.round(Math.random() * 10000);
                Ember.set(this, 'datetimepickerId', id);
                id = 'datetimeInputId' + dateT.getMonth() + dateT.getDate() + dateT.getHours() + dateT.getMinutes() + dateT.getSeconds() + Math.round(Math.random() * 10000);
                Ember.set(this, 'datetimeInputId', id);
                // 插件自带英语文字
                $.fn.datetimepicker.dates['zh'] = {
                    days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
                    daysShort: ['日', '一', '二', '三', '四', '五', '六', '日'],
                    daysMin: ['日', '一', '二', '三', '四', '五', '六', '日'],
                    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    monthsShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
                    meridiem: ['上午', '下午'],
                    today: '今天'
                };
                var flag = this.get('showNumberFlag'),
                    languageDict = $.fn.datetimepicker.dates;
                if (flag) {
                    Object.keys(languageDict).forEach(function(language) {
                        languageDict[language].months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
                        languageDict[language].monthsShort = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
                    });
                }
                if (languageDict['en']) {
                    languageDict['en'].daysMin = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                }
            },
            didInsertElement: function() {
                var dateNow = this.get('curDate');
                if (dateNow === null) {
                    Ember.set(this, 'curDate', new Date());
                }
                this.dateTimePickerPun();
            },

            dateTimePickerPun: function() {
                var parm = {
                    'format': this.get('dateFormat'),
                    'language': configs.language || 'en'
                };
                if (this.get('autoclose')) {
                    parm['autoclose'] = this.get('autoclose');
                }
                if (this.get('maxDate') !== null) {
                    parm['endDate'] = this.get('maxDate');
                }
                if (this.get('minDate') !== null) {
                    parm['startDate'] = this.get('minDate');
                }
                // 设置分钟显示的步长
                if (this.get('stepping')) {
                    parm['minuteStep'] = this.get('stepping');
                } else {
                    parm['minuteStep'] = 5;
                }
                var minView = this.get('minView');
                if (minView && this.minViewValus.indexOf(minView) !== -1) {
                    parm['minView'] = minView;
                }
                //设置弹出日历的位置
                if (this.get('pickerPosition')) {
                    parm['pickerPosition'] = this.get('pickerPosition');
                }

                this.$('#' + this.get('datetimepickerId')).datetimepicker(parm);
            },

            actions: {
                timePickerFun: function() {
                    this.dateTimePickerPun();
                },
                timeChangeFun: function() {
                    var ta = this.$('#' + this.get('datetimeInputId')).val();
                    if (ta !== this.curDate) {
                        Ember.set(this, 'curDate', ta);
                        this.sendAction('dateTimeChanged', this.curDate);
                    }
                }
            }
        });
    });