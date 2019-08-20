define(
	[
		'configures/serverlocator',
	],

	function(locators) {

		'use strict';

		Object.defineProperty(window, 'configs', {
			value: {},
			configurable: false,
			enumerable: false,
			writable: false
		});
		/* global configs */
		configs.locators = locators;

		configs.theme = 'default';

		configs.themes = ['default', 'zhanshi', 'black'];
		/* 菜单种类配置 枚举值 
		 * 1 全横排,一级菜单在标题栏，二级在标题栏下方其他为下拉菜单
		 * 2 一级菜单在标题栏，二级菜单为竖排
		 * 3 全部竖排，标题栏无菜单
		 * 4 一级菜单在标题栏，其他为下拉菜单 
		 * @property {number}
		 */
		configs.meauType = 2;

		Object.defineProperty(configs, 'authentication', {
			value: true, //是否需要登录鉴权，启用新鉴权需要设置`isNewAuthentication`
			configurable: false,
			enumerable: false,
			writable: false
		});
		configs.isNewAuthentication = false; // 是否启用新登录鉴权
		configs.authenticator = 'oauth2-implicit'; // 'compatible', 'oauth2-implicit', 'oauth2-password'
		configs.authorizer = 'bss'; // 'compatible', 'bss'
		configs.authNeverTimeout = false; // 页面打开时用户永远不超时退出
		// 新版统一鉴权配置
		configs.bssClientId = 'bss-embed-white';
		configs.bssCustomLoginPage = false; // true或字符串启用自定义登录页，如为true则使用默认地址 'plugin/${configs.produceId}/login/login.html'
		configs.bssExcludePages = []; // 不认证的视图（templateName）

		configs.forbidF5 = false;

		configs.isLong = true;

		configs.verifyCodeEnabled = true;

		configs.language = 'zh'; // zh, en

		configs.showHeader = true;

		configs.showFooter = false; //返回按钮

		configs.showUser = false;

		configs.showMenuItemsCount = 0;

		configs.produceName = '算法测试平台';

		configs.produceId = 'PSMS'; //

		configs.produceId_Json = {
			alarmwindow_contextMenu: '_O4',
			alarmwindow_style: '_O4',
			alarmwindow_toolbar: '',
			alarmsearch: '_04',
			filterOrRule: '_04',
			roster: '_04',
			report: '_04'
		};
		configs.operatorId = 10086;

		configs.supportSearchProperties = ['templateName', 'theme', 'showHeader', 'provinceId'];

		configs.useLocalIpAsServiceIp = false;

		configs.searchParameters = {};

		//是否使用IceGrid连接服务
		configs.IsUseIceGrid = false;
		configs.IsSupportAlarmCloud = false;
		// 是否在启动时加载资源仓储
		configs.isLoadResource = false;

		//代理刷新的时间 毫秒
		configs.interval = 1000;
		//默认线程池大小
		configs.threadCount = 2;
		//线程池最大线程数
		configs.threadMaxCount = 10;

		configs.onceCount = 1000;

		configs.enableOverTime = true;

		configs.criticalOverTime = 300;

		configs.minorOverTime = 300;

		configs.warningOverTime = 300;

		configs.majorOverTime = 300;

		configs.overTimeRefreshInterval = 300000;

		configs.isMarkNewAlarm = true;

		configs.enableLog = false;

		configs.enableRemind = false;
		return configs;
	});