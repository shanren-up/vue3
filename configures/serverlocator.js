define(
	[

	],

	function() {

		"use strict";

		var locator = {};
		var localUrl = window.location.host + '/Frame';

		locator.VRSSRestful = {
            //"host": "192.168.48.144:8050",
            //"host": "192.168.31.59:8050",
            //"host": "192.168.31.146:8050",
            //"host": "192.168.48.145:8050",
            "host": "192.168.31.5:8050",

            //数管地址
            "dmsUrl":"http://192.168.48.145:9090/portal/",

            //文件服务地址
            //"fileHost":"192.168.48.145:9988",
            "fileHost":"192.168.31.5:8083",
            //登录服务地址 参数 userName password  传json对象  application/json post请求
            // {"status":true,"msg":"登录成功","data":{"access_token":"3d16a9b9-d0ae-4a39-8ceb-4d138e2a7c1c","user_id":"2","userPwd":"123456","userName":"hyj"}}
            "loginHost":"192.168.48.193:9339",
            "login":"user/login",
            "selectUser":"user/search",
            "addUser":"user/add",
            "deleteUser":"user/delete",
            "updateUser":"user/update",
            "selectRole":"user/role",
            //外部任务url
            "taskHost":"192.168.31.42:9080",
            "selectTaskUrl":"spps/service/task/queryTaskList?token=13224321",
            "postTask":"spps/service/task/sendOrderToHH",
            "modifyExportPath":"spps/service/task/modifyExportPath",
            "queryExportPath":"spps/service/task/queryExportPath",
            "queryHHOrder":"spps/service/task/queryHHOrder",

            //"svcId": "user/loginUser",
            //流程任务
            "selectTask":"task/selectTaskInfoList",
            "flowPauseAction": "task/pausetask",
            "flowDeleteAction": "flow/deleteTaskInfo",
            "flowStopAction": "task/stopTask",
            "flowContinueAction": "task/continueTask",
            "allFlows": "flow/selectFlowTaskList",
            "allFlowsByInfo": "flow/selectDBFlowTaskList",
            "flowTasks": "flow/selectSubTaskList",
            "taskLogInfo": "",
            "taskDbLogInfo": "",
			//用户管理
            "allUsers": "user/showAll",
            "userDeleteAction": "user/deleteUser",
            "userUpdateAction": "user/updateUser",
            "userInsertAction": "user/createUser",
            "userLockAction": "user/lockedUser",
            "userUnLockAction": "user/unlockedUser",
			//角色管理
            "allUserRoles": "role/showAllRole",
            "roleDeleteAction": "role/deleteRole",
            "roleInsertAction": "role/createRole",
            "roleUpdateAction": "role/updateRole",
			//自动流程级别设置
            "autoLevelSearch": "global/selectAutoLevel",
            "autoLevelSubmit": "global/setAutoLevel",
            "taskMaxNum": "global/nodeTaskMaxNum",
            "taskMaxNumSearch": "global/nodeTaskMaxNumSearch",

            //3minsar
            //流程任务
            "flowSubmit": "task/submitTask",
            "task":"task/selectTaskInfoList",
            "deleteTask":"task/deleteTaskInfo",
            "updateTask":"task/updateTask",
            //子任务流程
            "subTask":"subTask/selectSubTaskList",
            "pauseTask":"subTask/pauseTask",
            "stopTask":"subTask/stopTask",
            "recoverTask":"subTask/recoverTask",
            "continueTask":"subTask/continueTask",
            "deleteSubTaskInfo":"subTask/deleteSubTaskInfo",
            "updateSubTask":"subTask/updateSubTask",


            //任务状态
            "taskFlowStatus":"subFlowTask/selectSubFlowTaskList",
            //集群资源管理
            "nodePerformance": "resource/getHistoryInfo",
            "nodeList": "resource/getResourceList",
            "createNode": "resource/createResource",
            "deleteNode": "resource/deleteResource",
            "updateNode": "resource/updateResource",
            "nodeStatus":"resource/getResourceListWithSigar",

            //文件路径选择
            "fileConfigDir": "dealfile/findPath",
            "fileConfig":"dealfile/findPathFile",
            "pathCheck":"dealfile/checkDir",
            "createFolder":"dealfile/creatDir",
            //文件上传
            "fileUpload":"dealfile/upload",

            //获取流程模板
            "selectFlows":"flow/selectFlowWithUserId",
            "deleteFlow":"flow/deleteFlow",
            "createFlow":"flow/createFlow",
            "updateFlow":"flow/updateFlow",

            //获取工具列表
            "flowTools":"module/selectModuleList",
            "deleteTools":"module/deleteModle",
			"deleteModleMuch":"module/deleteModleMuch",
            "updateTools":"module/updateModule",
            //流程ui
            "selectUIData":"uiData/selectUIData",
            "updateUIData":"uiData/updateUIData",
            "deleteUIData":"uiData/deleteUIData",
            "submitUiData":"uiData/submitUiData",
		};

		locator.restfulUrl = {
			"svcId": "butlersys/searchstat",
			"host": "10.12.2.59:8089"
		};
		locator.localResourceUrl = {
			"svcId": "plugin/trq/img/docResource",
			"host": localUrl
		};
		return locator;
	});