define(
    [

    ],

    function() {

        "use strict";

        var userInfoModel = Ember.Object.extend({
            id: null,
            userName: '',
            realName: '', //echarts标题
            passWord: '',
            passwordHint: '',
            tel: '',
            identityCard: '', //针对曲线图 true面  false 线
            createDate: '', //仪表盘刻度
            state: '',
            loginCount: '',
            isLocked: '', //显示比例尺
            varval1: null,
            varval2: '',
            sex: '',
            email: '',
            address: ''
        });

        return userInfoModel;
    });