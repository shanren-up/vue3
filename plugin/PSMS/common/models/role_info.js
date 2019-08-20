define(
    [

    ],

    function() {

        "use strict";

        var roleInfoModel = Ember.Object.extend({
            id: null,
            rolename: '',
            rolecode: '',
            level: '',
            commtents: '',
            createtime: '',
            varval1: '',
            varval2: '',
            level_: ''
        });

        return roleInfoModel;
    });