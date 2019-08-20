define(
    [
        'configs',
        'com_adapter_topores',
        'com_adapter_topostat',
        'common/components/comp_topo_toolbar/comp_topo_toolbar',
        'twaver'
    ],

    function (configs, topoResAdapter, topoStatAdapter) {

    "use strict";

    return Ember.Object.extend({
        topoStat : null,
        statUrl : "",
        url : "",
        init : function () {
            this.set('saveOrRefresh', true);
            this.set('topoStat', topoStatAdapter.create());
            this.set('box', new twaver.ElementBox());
            this.set('network', new twaver.vector.Network(this.box));

            this.set('topoResAdapter', topoResAdapter.create());
            this._super();
        },
        initStatHandler : function () {
            var self = this;
            self.topoStat.getAllCollectStatResult(self.statUrl).then(function (result) {
                result.topoStatItems.forEach(function (statItem) {
                    var test = self;
                    self.box._dataList.forEach(function (element) {

                        if (element instanceof twaver.ShapeNode) {
                            return;
                        }

                        if (element instanceof twaver.Node) {
                            if (statItem.nodeId === element.getId()) {
                                var color = self.getSeverityColor(statItem.highestSeverity);
                                element.getAlarmState().setNewAlarmCount(color, statItem.alarmCount);
                            }
                        }
                    });

                });
            });

        },
        getSeverityColor : function (hightSeverity) {
            var result = twaver.AlarmSeverity.CRITICAL;
            switch (hightSeverity) {
            case 1:
                result = twaver.AlarmSeverity.CRITICAL;
                break;
            case 2:
                result = twaver.AlarmSeverity.MAJOR;
                break;
            case 3:
                result = twaver.AlarmSeverity.MINOR;
                break;
            case 4:
                result = twaver.AlarmSeverity.WARNING;
                break;
            default:
                break;
            }

            result.nickName = "";
            return result;

        },

        refreshAlarmData : function () {
            var self = this;
            self.timer = setInterval(function () {
                    Ember.run.scheduleOnce('sync', self, function () {
                        self.initStatHandler();
                    });
                }, configs.interval);
        },
        createNetworkByJson : function (jsonDatas) {
            //twaver.SerializationSettings.setClientType('id','string');
            this.box.clear();
            twaver.SerializationSettings.setPropertyType('id', 'string');
            twaver.SerializationSettings.setClientType('bmClassId', 'string');
            twaver.SerializationSettings.setClientType('topoBmClassId', 'string');
            twaver.SerializationSettings.setClientType('cuid', 'string');
            new twaver.JsonSerializer(this.box).deserialize(jsonDatas);
            this.refreshAlarmData();
            this.finishCallBack();
        },
        changeImgUrl : function (xmlString) {
            return xmlString.replace(new RegExp("n='image'>/resources/topo", "gm"), "n='imageUrl'>./img/resources/topo");
        },
        createNetworkByUrl : function (url) {
            var self = this;
            self.url = url;
            self.box.clear();
            //var promise1 = this.topoResAdapter.refreshTopology(url);
            var promise2 = this.topoResAdapter.getTopoXmlByUri(url);
            Ember.RSVP.allSettled([promise2]).then(function (results) {
                var xmlString = self.changeImgUrl(results[0].value);
                twaver.SerializationSettings.setPropertyType('id', 'string');
                twaver.SerializationSettings.setClientType('bmClassId', 'string');
                twaver.SerializationSettings.setClientType('topoBmClassId', 'string');
                twaver.SerializationSettings.setClientType('cuid', 'string');
                var com = new CommonXmlSerializer(self.box);
                com.deserializeCommon(xmlString);
                self.refreshAlarmData();
                self.finishCallBack();
            });
        },
        refreshTopology : function () {
            if (this.saveOrRefresh) {

                var self = this;
                self.box.clear();
                var promise2 = this.topoResAdapter.refreshTopology(self.url);
                Ember.RSVP.allSettled([promise2]).then(function (results) {
                    var xmlString = self.changeImgUrl(results[0].value);
                    twaver.SerializationSettings.setPropertyType('id', 'string');
                    twaver.SerializationSettings.setClientType('bmClassId', 'string');
                    twaver.SerializationSettings.setClientType('topoBmClassId', 'string');
                    twaver.SerializationSettings.setClientType('cuid', 'string');
                    var com = new CommonXmlSerializer(self.box);
                    com.deserializeCommon(xmlString);
                    self.refreshAlarmData();
                    self.finishCallBack();
                });
            }
        },
        saveTopoXmlByUri : function () {
            if (this.saveOrRefresh) {

                var self = this;
                twaver.SerializationSettings.setPropertyType('id', 'string');
                twaver.SerializationSettings.setClientType('bmClassId', 'string');
                twaver.SerializationSettings.setClientType('topoBmClassId', 'string');
                twaver.SerializationSettings.setClientType('cuid', 'string');
                twaver.SerializationSettings.isDataBoxSerializable = false;
                var com = new CommonXmlSerializer(self.box);
                var xmlString = com.serializeCommonBtw();
                var promise2 = this.topoResAdapter.saveTopoXmlByUri(self.url, xmlString);
                Ember.RSVP.allSettled([promise2]).then(function (result) {
                    self.refreshTopology();
                });
            }
        },
        finishCallBack : function () {},
        willDestroy : function () {
            this.box.clear();
            this.network.dispose();
            this.topoResAdapter.destroy();
            this.topoStat.destroy();

            if (this.timer) {
                clearInterval(this.timer);
            }
        }
    });
});
