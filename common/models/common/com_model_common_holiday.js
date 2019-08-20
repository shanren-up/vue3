define(
    [
    ],
    function() {
        'use strict';
        return Ember.Object.extend({
            //ID
            id:'',
            //年份
            the_year:'',
            //年份
            holiday_name:'',
            //节假日起始时间
            holiday_start:'',
            //节假日结束时间
            holiday_end:'',
            //是否启用
            enable:'',
        });
    });