define(
    [],

    function () {

        "use strict";

        return [
            {
                "name": "首页",
                "templateName": "system-home-view",
                "url": "plugin/PSMS/views/system_home_view/system_home_view",
                "singleton": true,
                "visible": true,
                "isActive": true,
                "imgSrc": "img/set.png",
                "imgClass": "glyphicon glyphicon-home",
                "imgClickSrc": "img/hd.jpg",
                "pid": "PSMS"
            },
            {
                "name": "流程管理",
                // "templateName": "process-flow-edit-view",
                // "url": "plugin/PSMS/views/process_flow_edit_view/process_flow_edit_view",
                "templateName": "process-flow-edit-view-new",
                "url": "plugin/PSMS/views/process_flow_edit_view_new/process_flow_edit_view_new",
                "singleton": true,
                "visible": true,
                "isActive": false,
                "imgSrc": "img/set.png",
                "imgClass": "glyphicon glyphicon-edit",
                "imgClickSrc": "img/hd.jpg",
                "showFirstChildView": true,
                "pid": "PSMS"
            }, {
                "name": "影像处理流程",
                "templateName": "",
                "url": "",
                "singleton": true,
                "visible": false,
                "isActive": false,
                "imgSrc": "img/set.png",
                "imgClass": "glyphicon glyphicon-edit",
                "imgClickSrc": "img/hd.jpg",
                "pid": "PSMS",
                "showFirstChildView": true,
                "childViewMenus": [  {
                    "name": "影像专业处理流程",
                    "templateName": "",
                    "url": "",
                    "singleton": false,
                    "visible": true,
                    "isActive": false,
                    "imgSrc": "img/set.png",
                    "pid": "PSMS",
                    "imgClass": "glyphicon glyphicon-edit",
                    "showFirstChildView": true,
                    "childViewMenus": [
                        {
                            "name": "TH2卫星",
                            "templateName": "process-taskflow-view",
                            "url": "plugin/PSMS/views/process_taskflow_view/process_taskflow_view",
                            "singleton": false,
                            "visible": true,
                            "isActive": false,
                            "imgSrc": "img/set.png",
                            "pid": "PSMS",
                            "imgClass": "glyphicon glyphicon-edit",
                            "parameters": {
                                "processType": "3"
                            }
                        }
                    ]
                }]
            },
            {
                "name": "任务管理",
                "templateName": "",
                "url": "",
                "singleton": true,
                "visible": true,
                "isActive": false,
                "imgSrc": "img/set.png",
                "imgClass": "glyphicon glyphicon-tasks",
                "imgClickSrc": "img/hd.jpg",
                "pid": "PSMS",
                "showFirstChildView": true,
                "childViewMenus": [
                    {
                        "name": "基本任务管理",
                        "templateName": "process-task-manager-view",
                        "url": "plugin/PSMS/views/process_task_manager_view/process_task_manager_view",
                        "singleton": true,
                        "visible": true,
                        "isActive": false,
                        "imgClass": "glyphicon glyphicon-tasks",
                        "imgSrc": "img/set.png",
                        "pid": "PSMS"
                    },
                    {
                        "name": "任务流程管理",
                        "templateName": "process-manager-view",
                        "url": "plugin/PSMS/views/process_manager_view/process_manager_view",
                        "singleton": true,
                        "visible": false,
                        "isActive": false,
                        "imgClass": "glyphicon glyphicon-tasks",
                        "imgSrc": "img/set.png",
                        "pid": "PSMS"
                    },
                ]
            },
            {
                "name": "订单管理",
                "templateName": "",
                "url": "",
                "singleton": true,
                "visible": false,
                "isActive": false,
                "imgSrc": "img/set.png",
                "imgClass": "glyphicon glyphicon-briefcase",
                "imgClickSrc": "img/hd.jpg",
                "pid": "PSMS",
                "showFirstChildView": true,
                "childViewMenus": [
                    {
                        "name": "订单管理",
                        "templateName": "process-order-view",
                        "url": "plugin/PSMS/views/process_order_view/process_order_view",
                        "singleton": true,
                        "visible": true,
                        "isActive": false,
                        "imgClass": "glyphicon glyphicon-briefcase",
                        "imgSrc": "img/set.png",
                        "pid": "PSMS"
                    },
                ]
            },
            {
                "name": "集群资源管理",
                "templateName": "",
                "url": "",
                "singleton": true,
                "imgSrc": "img/set.png",
                "imgClass": "glyphicon glyphicon-align-center",
                "imgClickSrc": "img/hd.jpg",
                "visible": true,
                "isActive": false,
                "pid": "PSMS",
                "showFirstChildView": true,
                "childViewMenus": [{
                    "name": "状况与性能",
                    "templateName": "cluster-status-performs",
                    "url": "plugin/PSMS/views/cluster_status_performs/cluster_status_performs",
                    "singleton": true,
                    "visible": true,
                    "isActive": false,
                    "pid": "PSMS",
                    "imgClass": "glyphicon glyphicon-align-left",
                    "imgSrc": "img/set.png",
                    "imgClickSrc": "img/hd.jpg"
                }, {
                    "name": "节点监控",
                    "templateName": "node-monitor-view",
                    "url": "plugin/PSMS/views/node_monitor_view/node_monitor_view",
                    "singleton": true,
                    "visible": true,
                    "isActive": false,
                    "pid": "PSMS",
                    "imgClass": "glyphicon glyphicon-qrcode",
                    "imgSrc": "img/set.png",
                    "imgClickSrc": "img/hd.jpg"
                }, {
                    "name": "机器列表",
                    "templateName": "cluster-node-manage-view",
                    "url": "plugin/PSMS/views/cluster_node_manage_view/cluster_node_manage_view",
                    "singleton": true,
                    "visible": false,
                    "isActive": false,
                    "pid": "PSMS",
                    "imgClass": "glyphicon glyphicon-edit",
                    "imgSrc": "img/set.png",
                    "imgClickSrc": "img/hd.jpg"
                }]
            }, {
                "name": "运维管理",
                "templateName": "",
                "url": "",
                "singleton": true,
                "imgSrc": "img/set.png",
                "imgClass": "glyphicon glyphicon-cog",
                "imgClickSrc": "img/hd.jpg",
                "visible": true,
                "isActive": false,
                "pid": "PSMS",
                "showFirstChildView": true,
                "childViewMenus": [{
                    "name": "工具管理",
                    "templateName": "process-tools-view",
                    "url": "plugin/PSMS/views/process_tools_view/process_tools_view",
                    "singleton": true,
                    "visible": true,
                    "isActive": false,
                    "pid": "PSMS",
                    "imgSrc": "img/set.png",
                    "imgClass": "glyphicon glyphicon-wrench",
                    "imgClickSrc": "img/hd.jpg"
                }]
            }, {
                "name": "用户管理",
                "templateName": "",
                "url": "",
                "singleton": true,
                "imgSrc": "img/set.png",
                "imgClass": "glyphicon glyphicon-user",
                "imgClickSrc": "img/hd.jpg",
                "visible": true,
                "isActive": false,
                "pid": "PSMS",
                "showFirstChildView": true,
                "childViewMenus": [{
                    "name": "用户管理",
                    "templateName": "user-manager-view",
                    "url": "plugin/PSMS/views/user_manager_view/user_manager_view",
                    "singleton": true,
                    "visible": true,
                    "isActive": false,
                    "pid": "PSMS",
                    "imgSrc": "img/set.png",
                    "imgClass": "glyphicon glyphicon-user",
                    "imgClickSrc": "img/hd.jpg"
                }, {
                    "name": "角色管理",
                    "templateName": "role-manager-view",
                    "url": "plugin/PSMS/views/role_manager_view/role_manager_view",
                    "singleton": true,
                    "visible": false,
                    "isActive": false,
                    "pid": "PSMS",
                    "imgSrc": "img/set.png",
                    "imgClass": "glyphicon glyphicon-edit",
                    "imgClickSrc": "img/hd.jpg"
                }]
            }];
        return;
    });
