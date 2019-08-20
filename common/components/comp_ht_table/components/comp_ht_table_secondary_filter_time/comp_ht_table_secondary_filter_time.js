/**
 * Created by Administrator on 2016/12/26.
 */
define(
    [
        'app',
        'json!./cultureInfo.json',
        'text!./comp_ht_table_secondary_filter_time.html',
        'css!./comp_ht_table_secondary_filter_time.css',
        'common/components/comp_datetimpicker/comp_datetimepicker'
    ],

    function(app, cultureInfo, template) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);

        app.CompHtTableSecondaryFilterTimeComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: "comp-ht-table-secondary-filter-time",
            name: 'filterTimeWindow',
            ownerControl: null,
            //初始化的tip颜色，默认绿色
            normalTipColor: true,
            tipWord: Ember.oloc('comp_ht_table_secondary_filter_time_qtxwzsjxx！'),
            startTime: '',
            endTime: '',
            currentFieldName: '',
            parameters: null,
            dateFormat: 'yyyy-mm-dd hh:ii:ss',
            minView: 0,
            //初始化
            init: function() {
                this._super();
                this._initData();
            },
            _initData: function() {
                this.set('ownerControl', Ember.get(this.parameters, 'ownerControl'));
                this.set('currentFieldName', Ember.get(this.parameters, 'fieldName'));
                var existFilterValues = Ember.get(this.parameters, 'existFilterValues');
                if (this.parameters.dateFormat) {
                    this.dateFormat = this.parameters.dateFormat;
                }
                if (this.parameters.minView) {
                    this.minView = this.parameters.minView;
                }
                //如果没有外界给的时间参数，就设置为默认时间
                if (existFilterValues) {
                    this.set('startTime', existFilterValues[0]);
                    this.set('endTime', existFilterValues[1]);
                } else {
                    this._setDefaultValue();
                }
            },
            willDestroyElement: function() {},
            _setDefaultValue: function() {
                this.set('endTime', new Date().Format('yyyy-MM-dd hh:mm:ss'));
                this.set('startTime', new Date().add(-1440, 'm').Format('yyyy-MM-dd hh:mm:ss'));
            },
            validation: function() {
                var sTime = new Date(this.startTime);
                var eTime = new Date(this.endTime);
                if ((!this.startTime && this.endTime) || (this.startTime && !this.endTime)) {
                    this.set('tipWord', Ember.oloc('comp_ht_table_secondary_filter_time_cw，nhwtxwzsj！'));
                    this.set('normalTipColor', false);
                    return false;
                } else if (sTime >= eTime) {
                    this.set('tipWord', Ember.oloc('comp_ht_table_secondary_filter_time_cw，jssjbnzykssj！'));
                    this.set('normalTipColor', false);
                    return false;
                }
                return true;
            },
            actions: {
                okCommand: function() {
                    if (!this.validation()) {
                        return;
                        //todo返回参数
                    }
                    this.sendAction('sendConfirm');
                },
                clearCommand: function() {
                    this.set('tipWord', Ember.oloc('comp_ht_table_secondary_filter_time_qtxwzsjxx！'));
                    this.set('normalTipColor', true);
                    this.set('endTime', '');
                    this.set('startTime', '');
                },
                cancelCommand: function() {
                    this.sendAction('sendClose');
                }
            }
        });
    });
