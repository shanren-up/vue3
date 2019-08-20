define(
    [
        'app',
        'configs',
        'text!./comp_timeclockpicker.html',
        'bootstrap_clockpicker'
    ],
    function(app, configs, template) {

        "use strict";

        app.CompTimeclockpickerComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-timeclockpicker',
            //当前时间
            curTime:null,
            //时间选择控件编号
            timepickerId:'',
            timepickerinputId:'',
            timeIntervalId:'',
            //时间控件高度
            datetimeHeight:28,
            // 时间文本字体大小
            fontSize:14,
            //是否禁用控件
            isDisabled:false,
            init: function() {
                this._super();
                var dateT = new Date();
                var id='timepickerId'+dateT.getMonth()+dateT.getDate()+dateT.getHours()+dateT.getMinutes()+dateT.getSeconds()+Math.round(Math.random()*10000);
                Ember.set(this,'timepickerId',id);
                id='timepickerinputId'+dateT.getMonth()+dateT.getDate()+dateT.getHours()+dateT.getMinutes()+dateT.getSeconds()+Math.round(Math.random()*10000);
                Ember.set(this,'timepickerinputId',id);
            },
            
            didInsertElement: function() {
                var format=this.get('dateFormat');
                Ember.set(this,'dateFormat',format);
                var dateNow=this.get('curTime');
                if(dateNow===null)
                {
                    var dtime=new Date();
                    Ember.set(this,'curTime',dtime.getHours()+":"+dtime.getMinutes());
                }
                var options ={};
                if(this.get('autoclose')){
                   options['autoclose'] = this.get('autoclose');
                } 
                if(this.get('placement')){
                   options['placement'] = this.get('placement');
                }
                
                // 设置分钟显示的步长
                if (this.get('stepping')) {
                    options['stepping'] = this.get('stepping');
                } else {
                    options['stepping'] = 5;
                }
                this.$('#'+this.get('timepickerinputId')).clockpicker(options);
                
                var self=this;
                var timeInterval= window.setInterval(function(){
                    
                    if(self.$('#'+self.get('timepickerinputId'))===undefined)
                    {
                        clearInterval(timeInterval);
                        return;
                    }
                    var ta=self.$('#'+self.get('timepickerinputId')).val();
                    if(ta!==self.curTime)
                    {
                        Ember.set(self,'curTime',ta);
                        self.sendAction('dateTimeChanged',self.curTime);
                    }
                },300);
            },
            
            getCurTime:function()
            {
                var self=this;
                var ta=self.$('#'+self.get('timepickerinputId')).val();
                Ember.set(self,'curTime',ta);
                return ta;
            },
            
            actions: {
                timePickerFun: function() {
                    event.stopPropagation();
                    this.$('#'+this.get('timepickerinputId')).clockpicker('show');
                },
                
            }
        });
    });