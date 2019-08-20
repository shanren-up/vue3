define(
    [
        'app',
        'text!./comp_treeview_demo.html',
        'comp_treeview',
    ],
    function(app, template) {

        'use strict';

        app.CompTreeviewDemoComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-treeview-demo',
            methodName: '',
            args: '',
            output: '',
            height5: Ember.computed(function() {
                return 'height:500px;overflow:auto;'.htmlSafe();
            }),
            init: function() {
                this._super();
                this.dataSource = testData;
                this.checkboxConfig = {
                    three_state: true,
                    tie_selection: false
                };
            },
            didInsertElement: function() {
                this.findNames();
            },
            willDestroyElement: function() {},
            actions: {
                execute: function() {
                    var comp = this.childs.tree,
                        result;
                    if (comp && (typeof comp[this.methodName] === 'function')) {
                        result = comp[this.methodName].apply(comp, this.args.split(','));
                    }
                    this.set('output', typeof result === 'object' ? JSON.stringify(result) : result);
                }
            }
        });
        var testData = [{
            'id': '3',
            'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
            'text': '传输网',
            'children': [{
                'id': '20171107105430',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '04-海口PTN逻辑拓扑图36-45',
                'fileUrl': 'plugin/cop/files/topo/04-海口PTN逻辑拓扑图36-45.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171107105452',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '04-海南海口PTN逻辑拓扑图(海口汇聚环1-19）1',
                'fileUrl': 'plugin/cop/files/topo/04-海南海口PTN逻辑拓扑图(海口汇聚环1-19）1.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171107105532',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '02儋州、临高PTN ',
                'fileUrl': 'plugin/cop/files/topo/02儋州、临高PTN .png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171107105549',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '02儋州、临高PTN2',
                'fileUrl': 'plugin/cop/files/topo/02儋州、临高PTN2.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171106103549',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '乐东  OTN 1 ',
                'fileUrl': 'plugin/cop/files/topo/乐东  OTN 1 .png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171107105619',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '05-保亭、陵水PTN',
                'fileUrl': 'plugin/cop/files/topo/05-保亭、陵水PTN.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171214150839',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '海口OTN  8',
                'fileUrl': 'plugin/cop/files/topo/海口OTN  8.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171107105733',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '08-海南琼海PTN逻辑拓扑图1',
                'fileUrl': 'plugin/cop/files/topo/08-海南琼海PTN逻辑拓扑图1.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171107105814',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '09-海南三亚PTN逻辑拓扑图（三亚汇聚环1-15）2',
                'fileUrl': 'plugin/cop/files/topo/09-海南三亚PTN逻辑拓扑图（三亚汇聚环1-15）2.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171107105850',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '三亚城域OTN5 12345',
                'fileUrl': 'plugin/cop/files/topo/三亚城域OTN5 12345.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171101142833',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '琼南环',
                'fileUrl': 'plugin/cop/files/topo/琼南环.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171106103619',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '万宁  OTN 1  ',
                'fileUrl': 'plugin/cop/files/topo/万宁  OTN 1  .png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171107105439',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '04-海口PTN逻辑拓扑图36-45-1',
                'fileUrl': 'plugin/cop/files/topo/04-海口PTN逻辑拓扑图36-45-1.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171107105502',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '04-海南海口PTN逻辑拓扑图(海口汇聚环1-19）2',
                'fileUrl': 'plugin/cop/files/topo/04-海南海口PTN逻辑拓扑图(海口汇聚环1-19）2.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171107105702',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '07万宁、五指山',
                'fileUrl': 'plugin/cop/files/topo/07万宁、五指山.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171106103221',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '儋州  OTN  1',
                'fileUrl': 'plugin/cop/files/topo/儋州  OTN  1.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171106103328',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '海口OTN  3',
                'fileUrl': 'plugin/cop/files/topo/海口OTN  3.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171106103152',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '澄迈OTN 1',
                'fileUrl': 'plugin/cop/files/topo/澄迈OTN 1.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171106103205',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '澄迈OTN 2',
                'fileUrl': 'plugin/cop/files/topo/澄迈OTN 2.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171106103243',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '东方  OTN 1',
                'fileUrl': 'plugin/cop/files/topo/东方  OTN 1.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171106103257',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '海口OTN  1',
                'fileUrl': 'plugin/cop/files/topo/海口OTN  1.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171106103310',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '澄迈OTN 2',
                'fileUrl': 'plugin/cop/files/topo/澄迈OTN 2.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171106103339',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '海口OTN  4',
                'fileUrl': 'plugin/cop/files/topo/海口OTN  4.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171214150923',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '01-海南白沙、琼中、澄迈、昌江PTN逻辑拓扑图',
                'fileUrl': 'plugin/cop/files/topo/01-海南白沙、琼中、澄迈、昌江PTN逻辑拓扑图.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171106103437',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '海口OTN  9',
                'fileUrl': 'plugin/cop/files/topo/海口OTN  9.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171106103448',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '海口OTN  11',
                'fileUrl': 'plugin/cop/files/topo/海口OTN  11.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171106103130',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '白沙城OTN  1',
                'fileUrl': 'plugin/cop/files/topo/白沙城OTN  1.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171106103141',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '昌江  OTN  1',
                'fileUrl': 'plugin/cop/files/topo/昌江  OTN  1.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171106103511',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '海口OTN 6',
                'fileUrl': 'plugin/cop/files/topo/海口OTN 6.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171106103525',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '海口OTN 7',
                'fileUrl': 'plugin/cop/files/topo/海口OTN 7.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171106103536',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '海口OTN 10',
                'fileUrl': 'plugin/cop/files/topo/海口OTN 10.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171106103600',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '临高  OTN 1',
                'fileUrl': 'plugin/cop/files/topo/临高  OTN 1.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171106103610',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '临高  OTN 2',
                'fileUrl': 'plugin/cop/files/topo/临高  OTN 2.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171106103628',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '万宁  OTN 2',
                'fileUrl': 'plugin/cop/files/topo/万宁  OTN 2.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171214100225',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '06-保亭、陵水PTN ',
                'fileUrl': 'plugin/cop/files/topo/06-保亭、陵水PTN .png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171107105418',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '03-海南定安、屯昌、文昌PTN逻辑拓扑图2',
                'fileUrl': 'plugin/cop/files/topo/03-海南定安、屯昌、文昌PTN逻辑拓扑图2.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171107105403',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '03-海南定安、屯昌、文昌PTN逻辑拓扑图1',
                'fileUrl': 'plugin/cop/files/topo/03-海南定安、屯昌、文昌PTN逻辑拓扑图1.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171107105521',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '04-海南海口PTN逻辑拓扑图（海口汇聚环20-35）1',
                'fileUrl': 'plugin/cop/files/topo/04-海南海口PTN逻辑拓扑图（海口汇聚环20-35）1.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171107105312',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '01-海南白沙、琼中、澄迈、昌江PTN逻辑拓扑图2',
                'fileUrl': 'plugin/cop/files/topo/01-海南白沙、琼中、澄迈、昌江PTN逻辑拓扑图2.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171107105751',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '08-海南琼海PTN逻辑拓扑图2',
                'fileUrl': 'plugin/cop/files/topo/08-海南琼海PTN逻辑拓扑图2.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171107105802',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '09-海南三亚PTN逻辑拓扑图（三亚汇聚环1-15）1',
                'fileUrl': 'plugin/cop/files/topo/09-海南三亚PTN逻辑拓扑图（三亚汇聚环1-15）1.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }, {
                'id': '20171214151100',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '海口OTN 5',
                'fileUrl': 'plugin/cop/files/topo/海口OTN 5.png',
                'managerId': '1005',
                'managerName': '赵赞善',
                'professionId': '3',
                'professionName': '传输网'
            }]
        }, {
            'id': '2',
            'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
            'text': '核心网',
            'children': [{
                'id': '20171107110054',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '琼南环',
                'fileUrl': 'plugin/cop/files/topo/琼南环.png',
                'managerId': '1001',
                'managerName': '林睿',
                'professionId': '2',
                'professionName': '核心网'
            }, {
                'id': '20171107110148',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': 'CS域语音网',
                'fileUrl': 'plugin/cop/files/topo/CS域语音网.png',
                'managerId': '1001',
                'managerName': '林睿',
                'professionId': '2',
                'professionName': '核心网'
            }, {
                'id': '20171101145137',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '海南交换数据网网络拓扑图',
                'fileUrl': 'plugin/cop/files/topo/海南交换数据网网络拓扑图.jpg',
                'managerId': '1001',
                'managerName': '林睿',
                'professionId': '2',
                'professionName': '核心网'
            }]
        }, {
            'id': '4',
            'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
            'text': '互联网',
            'children': [{
                'id': '20171031101818',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': 'DNS拓扑图',
                'fileUrl': 'plugin/cop/files/topo/DNS拓扑图.png',
                'managerId': '1012',
                'managerName': '李映壮',
                'professionId': '4',
                'professionName': '互联网'
            }, {
                'id': '20171107105154',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': 'CMNET',
                'fileUrl': 'plugin/cop/files/topo/CMNET.png',
                'managerId': '1011',
                'managerName': '何瑞强',
                'professionId': '4',
                'professionName': '互联网'
            }, {
                'id': '20171031145930',
                'icon': 'plugin/cop/images/common/cop_topo_view/topo_icon.png',
                'text': '城域网拓扑图',
                'fileUrl': 'plugin/cop/files/topo/城域网拓扑图.jpg',
                'managerId': '1011',
                'managerName': '何瑞强',
                'professionId': '4',
                'professionName': '互联网'
            }]
        }];
    });