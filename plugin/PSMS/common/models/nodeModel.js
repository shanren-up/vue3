define(
    [

    ],

    function() {

        "use strict";

        var nodeModel = Ember.Object.extend({
            nodeid: null,
            nodename: '',
            nodeip:'',
            nodeport: '',
            nodeservername:'',
            nodestatus:'',
            nodeused:'',
            nodeunused:'',
            nodegroup:'',
            nodedesc:'',
            nodetype:'',
            nodetotalused:''

        });
        return nodeModel;
    });
