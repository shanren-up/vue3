define(
    [
        'app',
        'text!./comp_topo_toolbar.html',
        'css!./comp_topo_toolbar.css'
    ],

    function (app, template) {

    "use strict";

    app.CompTopoToolbarComponent = Ember.Component.extend({
            layout : Ember.ExtendHelper.compileEx(template),
            comoTopo : null,
            init : function () {
                this._super();
            },
            setCompTopo : function (comoTopo) {
                this.comoTopo = comoTopo;
            },
            handle : function (name) {
                var network = this.comoTopo.network;
                switch (name) {
                case "select":
                    network.setDefaultInteractions();
                    break;
                case "zoomIn":
                    network.zoomIn();
                    break;
                case "zoomOut":
                    network.zoomOut();
                    break;
                case "zoomReset":
                    network.zoomReset();
                    break;
                case "zoomOverview":
                    network.zoomOverview();
                    break;
                case "save":
                    this.comoTopo.saveTopoXmlByUri();
                    break;
                case "refresh":
                    this.comoTopo.refreshTopology();
                    break;
                case "magnify":
                    network.setMagnifyInteractions();
                    break;
                }
            },
            actions : {
                toolHandler : function (toolbar) {
                    if (this.comoTopo) {
                        this.handle(toolbar);
                    }
                }
            }

        });
});
