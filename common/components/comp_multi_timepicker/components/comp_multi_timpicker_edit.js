define(
    [
        'app',
        'json!./cultureInfo.json',
        'text!./comp_multi_timpicker_edit.html',
        '../../comp_msgbox/comp_msgbox.js',
        'css!./comp_multi_timpicker_edit.css',
    ],

    function(app, cultureInfo, template, msgbox) {

        'use strict';
        Ember.addJsonCultureInfo(cultureInfo);

        app.CompMultiTimepickerEditComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-multi-timepicker-edit',
            parameters: null,
            msgbox: null,
            init: function() {
                this._super();
                this.msgbox = msgbox.create();
                if (this.parameters) {
                    this.leftHour = this.parameters.leftTime.split(':')[0];
                    this.leftMinutes = this.parameters.leftTime.split(':')[1];
                    this.leftSeconds = this.parameters.leftTime.split(':')[2] || '00';
                    this.rightHour = this.parameters.rightTime.split(':')[0];
                    this.rightMinutes = this.parameters.rightTime.split(':')[1];
                    this.rightSeconds = this.parameters.rightTime.split(':')[2] || '00';
                }
            },
            didInsertElement: function() {},
            willDestroyElement: function() {
                this.msgbox.destroy();
            },
            validateHour: function(hours, str) {
                if (hours > 24 || hours < 0) {
                    return this.msgbox.showAlert(str + Ember.oloc('comp_multi_timpicker_edit_xscfw，qsr0-24dzs'));
                }
                if (hours % 1) {
                    return this.msgbox.showAlert(str + Ember.oloc('comp_multi_timpicker_edit_xsxysrzzsh0'));
                }
                return true;
            },
            validateMinutes: function(minutes, str) {
                if (minutes >= 60 || minutes < 0) {
                    return this.msgbox.showAlert(str + Ember.oloc('comp_multi_timpicker_edit_cfw，qsr0-59dzs'));
                }
                if (minutes % 1) {
                    return this.msgbox.showAlert(str + Ember.oloc('comp_multi_timpicker_edit_xysrzzsh0'));
                }
                return true;
            },
            validateNumber: function() {
                if (this.validateHour(this.leftHour, Ember.oloc('comp_multi_timpicker_edit_kssj')) &&
                    this.validateMinutes(this.leftMinutes, Ember.oloc('comp_multi_timpicker_edit_kssj') + Ember.oloc('comp_multi_timpicker_edit_fz')) &&
                    this.validateMinutes(this.leftSeconds, Ember.oloc('comp_multi_timpicker_edit_kssj') + Ember.oloc('comp_multi_timpicker_edit_mz')) &&
                    this.validateHour(this.rightHour, Ember.oloc('comp_multi_timpicker_edit_jssj')) &&
                    this.validateMinutes(this.rightMinutes, Ember.oloc('comp_multi_timpicker_edit_jssj') + Ember.oloc('comp_multi_timpicker_edit_fz')) &&
                    this.validateMinutes(this.rightSeconds, Ember.oloc('comp_multi_timpicker_edit_jssj') + Ember.oloc('comp_multi_timpicker_edit_mz'))) {

                    if (Number(this.rightHour) > Number(this.leftHour) ||
                        (Number(this.rightHour) === Number(this.leftHour) && Number(this.rightMinutes) > Number(this.leftMinutes)) ||
                        (Number(this.rightHour) === Number(this.leftHour) && Number(this.rightMinutes) === Number(this.leftMinutes) && Number(this.rightSeconds) > Number(this.leftSeconds))
                    ) {
                        return true;
                    } else {
                        return this.msgbox.showAlert(Ember.oloc('comp_multi_timpicker_edit_kssjxxyjssj'));
                    }
                } else {
                    return false;
                }
            },
            actions: {
                onCancel: function() {
                    this.sendAction('sendCancel');
                },
                onConfirm: function() {
                    if (!this.validateNumber()) {
                        return;
                    }
                    this.parameters.leftTime = this.leftHour + ':' + this.leftMinutes + ':' + this.leftSeconds;
                    this.parameters.rightTime = this.rightHour + ':' + this.rightMinutes + ':' + this.rightSeconds;
                    this.sendAction('sendConfirm');
                }
            }
        });
    }
);