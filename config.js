require.config({
	baseUrl: './',
	paths: {
		jquery: 'lib/jquery/dist/jquery.min',
		ember: 'lib/ember/ember',
		ember_template_compiler: 'lib/ember/ember-template-compiler',
		ember_data: 'lib/ember-data/ember-data.min',
		bdmap: 'lib/bdMap/baidumap_offline',
		bdmaplib: 'lib/bdMap/BdMapLib',
		bdmaplib_css: 'lib/bdMap/BdMapLibCss',
		bootstrap: 'lib/bootstrap/dist/js/bootstrap.min',
		bootstrapcss: 'style/bootstrap_boco_default',
		bootbox: 'lib/bootbox/bootbox.min',
		echart2: 'lib/echarts/dist/echarts-all-2.min',
		echart: 'lib/echarts/dist/echarts-all.min',
		echarts: 'lib/echarts-gl/echarts.min',
		twaver_license: 'lib/twaver/twaver',
		twaver: 'lib/twaver/license',
		twaver_serialize: 'lib/twaver/twaver.serialize',
		configs: 'configures/environment',
		app_view: 'frame/core/appview',
		app_init: 'frame/core/appInit',
		app_info: 'frame/common/models/frame_info',
		app: 'frame/core/app',
		fontawesome_css: 'lib/fontawesome/css/font-awesome.min',
		ember_collection: 'lib/ember-collection/ember-collection',
		ember_table: 'lib/ember-table/ember-table',
		sl_ember_components: 'lib/sl-ember-components/sl-ember-components',
		jquery_ui: 'lib/jquery-ui/jquery-ui.min',
		easy_ui: 'lib/easyUI/jquery.easyui.min',
		easy_ui_css: 'lib/easyUI/themes/bootstrap/easyui',
		jquery_mousewheel: 'lib/jquery-mousewheel/jquery.mousewheel.min',
		jquery_upload: 'lib/jquery-upload/ajaxfileupload',
		jquery_contextmenu: 'lib/jQuery-contextMenu/dist/jquery.contextMenu',
		jquery_contextmenucss: 'lib/jQuery-contextMenu/dist/jquery.contextMenu',
		jquiery_ui_positon: 'lib/jQuery-contextMenu/dist/jquery.ui.position',
		antiscroll: 'lib/antiscroll/antiscroll',
		sh_circle_loader: 'lib/jquery-sh-circle-loader/jquery.shCircleLoader.min',
		delayTooltip: 'lib/delayTooltip/delayTooltip.min',
		jquery_colpick: 'lib/jquery-colpick/js/colpick',
		jquery_colpick_css: 'lib/jquery-colpick/css/colpick',
		ember_colpick: 'lib/ember-colpick/ember-colpick',
		ztree: 'lib/ztree/js/jquery.ztree.all-3.5.min',
		ztree_css: 'lib/ztree/css/zTreeStyle/zTreeStyle',

		silverlight: 'lib/silverlight/Silverlight.min',
		jstree: 'lib/js-tree/jstree.min',
		jtopo: 'lib/jtopo/jtopo-0.4.8.min',
		layout_border: 'lib/layout-border/layout.border.min',
		logHelper: 'common/core/logHelper',
		ice: 'lib/ice/Ice.min',
		xslider: 'lib/xslider/xslider.min',
		tiff:'lib/tiff/tiff.min',
		html2canvas: 'lib/html2canvas/html2canvas.min',
		comp_xslider: 'common/components/comp_xslider/comp_xslider',

		correlation_cloud: 'common/services/proxy/com_proxy_correlation/xdpp_cloud_correlation',
		filter_cloud: 'common/services/proxy/com_proxy_filter/scene_monitor_filter_svc_cloud',
		statistics_cloud: 'common/services/proxy/com_proxy_statistics/xdpp_cloud_statistics',
		topology_cloud: 'common/services/proxy/com_proxy_topology/xdpp_cloud_topology',

		com_proxy_message: 'common/services/proxy/com_proxy_message/scene_monitor_message',
		com_adapter_message: 'common/services/adapter/com_adapter_message/com_adapter_message',

		comp_modal: 'common/components/comp_modal/comp_modal',
		bhz_comp_modal: 'plugin/bhz/common/components/bhz_comp_modal/bhz_comp_modal',
		comp_treeview: 'common/components/comp_treeview/comp_treeview',
		comp_matrix_tree: 'common/components/comp_matrix_tree/comp_matrix_tree',
		jdataTables: 'lib/jquery.dataTables/dist/js/jquery.dataTables',
		bootstrapjdataTables: 'lib/jquery.dataTables/dist/js/dataTables.bootstrap',
		jdataTablesSelect: 'lib/jquery.dataTables/dist/js/dataTables.select',
		comp_data_table: 'common/components/comp_data_table/comp_data_table',
		gcss_comp_table: 'plugin/gcss/common/components/gcss_comp_table/gcss_comp_table',
		comp_iframe: "common/components/comp_iframe/comp_iframe",

		//百度播放器
		cyberplayer: 'lib/cyberplayer/cyberplayer',
		comp_contextmenu: 'common/components/comp_jquery_contextmenu/comp_jquery_contextmenu',
		comp_topo: "common/components/comp_topo/comp_topo",
		//拓扑业务公共控件
		view_topo: 'common/businessviews/view_comp_topo/view_comp_topo_mainview/view_comp_topo',
		view_basetopo: 'common/businessviews/view_comp_topo/view_comp_topo_mainview/view_comp_topo_baseview/view_comp_topo_baseview',
		view_tool_basetopo: 'common/businessviews/view_comp_topo/view_comp_topo_mainview/view_comp_topo_tool_baseview/view_comp_topo_tool_baseview',
		view_topoTree: 'common/businessviews/view_comp_topo_tree/view_comp_topo_tree',
		ipsnum: 'lib/ipsnum/ipsnum',

		//echarts
		comp_echart_ringpie: 'common/components/comp_echart/comp_echart_ringpie/comp_echart_ringpie',
		comp_echart_ringpie2: 'common/components/comp_echart/comp_echart_ringpie2/comp_echart_ringpie2',
		comp_echart_ringcircle: 'common/components/comp_echart/comp_echart_ringcircle/comp_echart_ringcircle',
		comp_echart_timeline: 'common/components/comp_echart/comp_echart_timeline/comp_echart_timeline',
		comp_echart_timebar: 'common/components/comp_echart/comp_echart_timebar/comp_echart_timebar',
		comp_echart_radar: 'common/components/comp_echart/comp_echart_radar/comp_echart_radar',
		comp_echart_ring: 'common/components/comp_echart/comp_echart_ring/comp_echart_ring',
		comp_echart_stackbar: 'common/components/comp_echart/comp_echart_stackbar/comp_echart_stackbar',
		comp_echart_stdbar: 'common/components/comp_echart/comp_echart_stdbar/comp_echart_stdbar',
		comp_echart_multistdbar: 'common/components/comp_echart/comp_echart_multistdbar/comp_echart_multistdbar',
		comp_echart_rainbowbar: 'common/components/comp_echart/comp_echart_rainbowbar/comp_echart_rainbowbar',
		comp_echart_gradbar: 'common/components/comp_echart/comp_echart_gradbar/comp_echart_gradbar',
		comp_echart_stdline: 'common/components/comp_echart/comp_echart_stdline/comp_echart_stdline',
		comp_echart_map: 'common/components/comp_echart/comp_echart_map/comp_echart_map',
		comp_echart_transversebar: 'common/components/comp_echart/comp_echart_transversebar/comp_echart_transversebar',
		comp_echart_gauge: 'common/components/comp_echart/comp_echart_gauge/comp_echart_gauge',
		comp_echart_pie: 'common/components/comp_echart/comp_echart_pie/comp_echart_pie',
		comp_echart_arealine: 'common/components/comp_echart/comp_echart_arealine/comp_echart_arealine',
		//bhz全局样式
		bhz_global_style: 'plugin/bhz/style/bhz_global',

		//ueditor组件
		zeroclipboard: 'lib/ueditor/third-party/zeroclipboard/ZeroClipboard.min',
		codemirror: 'lib/ueditor/third-party/codemirror/codemirror.min',
		codemirror_css: 'lib/ueditor/third-party/codemirror/codemirror',
		ueditor_config: 'lib/ueditor/ueditor.config',
		ueditor: 'lib/ueditor/ueditor.all',
		ueditor_css: 'lib/ueditor/themes/default/css/ueditor.min',
		//ueditor中文组件包

		//bootstrap_datepicker
		bootstrap_datepicker: 'lib/bootstrap-datepicker/dist/js/bootstrap-datepicker.min',
		bootstrap_datepicker_zh: 'lib/bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min',
		bootstrap_datepicker_css: 'lib/bootstrap-datepicker/dist/css/bootstrap-datepicker3.min',

		//silder组件
		bootstapSlider: 'lib/bootstrap-slider/dist/bootstrap-slider.min',
		bootstapSlidercss: 'lib/bootstrap-slider/dist/css/bootstrap-slider.min',

		moment: 'lib/moment/min/moment-with-locales.min',
		//moment_timezone : 'lib/moment-timezone/moment-timezone',
		moment_timezone_with_data: 'lib/moment-timezone/builds/moment-timezone-with-data.min',
		select2: 'lib/select2/dist/js/select2.full',
		select2_css: 'lib/select2/dist/css/select2',
		typeahead: 'lib/typeahead.js/dist/bloodhound.min',

		//地图相关
		//引入ht JS
		ht: 'lib/jslib/ht/ht',
		ht_cssanimation: 'lib/jslib/ht/ht-cssanimation.min',
		ht_contextmenu: 'lib/jslib/ht/ht-contextmenu.min',
		ht_form: 'lib/jslib/ht/ht-form.min',
		ht_overview: 'lib/jslib/ht/ht-overview.min',
		ht_dialog: 'lib/jslib/ht/ht-dialog.min',
		ht_menu: 'lib/jslib/ht/ht-menu.min',
		ht_rulerframe: 'lib/jslib/ht/ht-rulerframe.min',
		ht_telecom: 'lib/jslib/ht/ht-telecom.min',
		ht_xeditinteractor: 'lib/jslib/ht/ht-xeditinteractor.min',
		ht_panel: 'lib/jslib/ht/ht-panel.min',
		ht_live: 'lib/jslib/ht/ht-live.min',
		FloatingWindow: 'lib/jslib/ht/FloatingWindow.min',
		CreateVectorInteractor: 'lib/jslib/ht/CreateVectorInteractor.min',
		WdatePicker: 'lib/jslib/ht/datePicker/WdatePicker.min',
		ht_pickinput: 'lib/jslib/ht/ht-pickinput.min',
		ht_animation: 'lib/jslib/ht/ht-animation.min',
		ht_propertypane: 'lib/jslib/ht/ht-propertypane.min',
		ht_pipenode: 'lib/jslib/ht/ux/ht-pipenode.min',
		ht_main: 'lib/jslib/ht/main',
		ht_flow: 'lib/jslib/ht/ht-flow',
		ht_html: 'lib/jslib/ht/ht-htmlnode',
		ht_edgetype: 'lib/jslib/ht/ht-edgetype',

		//时间控件
		moment: 'lib/bootstrap-datepicker/dist/js/moment.min',
		bootstrap_datetimepicker: 'lib/bootstrap-datepicker/dist/js/bootstrap-datetimepicker.min',
		//时间控件 时钟时间选择控件
		bootstrap_clockpicker: 'lib/bootstrap-datepicker/dist/js/bootstrap-clockpicker.min',
		jquery_clockpicker: 'lib/bootstrap-datepicker/dist/js/jquery-clockpicker.min',
		jquery_range: 'lib/jquery-range/jquery.range',

		pageNation: 'lib/bootstrap-paginator.min',

		//bootstrap右键菜单
		bootstrap_contextmenu: 'lib/bootstrap-contextmenu/bootstrap-contextmenu',

		slong: 'lib/long/slong',
		bootstrap_multiselect: 'lib/bootstrap-multiselect/dist/js/bootstrap-multiselect',
		//bootstrap-table
		bootstrap_table: 'lib/bootstrap-table/bootstrap-table.min',
		bootstrap_tablecss: 'lib/bootstrap-table/bootstrap-table.min',
		bootstrap_table_locale: 'lib/bootstrap-table/bootstrap-table-zh-CN.min',
		colResizable: 'lib/bootstrap-table/colResizable-1.6.min',
		bootstrap_table_resizeable: 'lib/bootstrap-table/bootstrap-table-resizable.min',
		bootstrap_editable: 'lib/bootstrap-table/bootstrap-editable',
		bootstrap_table_editable: 'lib/bootstrap-table/bootstrap-table-editable',
		bootstrap_editablecss: 'lib/bootstrap-table/bootstrap-editable',

		//jui chart图
		jui_core: 'lib/jui/core.min',
		jui_chart: 'lib/jui/chart.min',

		restful: 'common/services/adapter/com_adapter_restful/com_adapter_restful',
		geovis: "lib/geovis/GVML",
		geovis_css: "lib/geovis/css/gvml",
		jsplumb: 'lib/jsplumb/jquery.jsPlumb-1.7.2',
	},
	waitSeconds: 150,
	map: {
		'*': {
			'css': 'lib/require-css/css',
			'text': 'lib/require-text/text.min',
			'json': 'lib/require-json/require-json',
			'domReady': 'lib/domReady/domReady'
		}
	},
	shim: {
		'bootstrap': ['jquery'],
		//easy_ui
		'easy_ui': ['jquery', 'css!easy_ui_css'],
		'bdmaplib': ['bdmaplib', 'css!bdmaplib_css'],
		'ember_template_compiler': ['bootstrap', 'css!bootstrapcss'],
		'ember': ['jquery'],
		'layout_border': ['jquery'],
		'jquery_upload': ['jquery'],
		'sh_circle_loader': ['jquery'],
		'twaver': ['twaver_serialize'],
		'twaver_serialize': ['twaver_license'],
		'app': ['ember_template_compiler'],
		'app_view': ['configs', 'ember', 'layout_border', 'sh_circle_loader'],
		'ember_table': ['css!fontawesome_css', 'ember_collection', 'css!lib/antiscroll/antiscroll.css', 'css!ember_table', 'jquery', 'jquery_ui', 'ember', 'jquery_mousewheel', 'antiscroll'],

		'jquery_colpick': ['jquery'],
		'ember_colpick': ['css!jquery_colpick_css', 'jquery_colpick'],
		'jquery_range': ['jquery', 'css!lib/jquery-range/jquery.range.css'],

		'moment_timezone_with_data': ['moment'],
		'bootstrap_datepicker_zh': ['bootstrap_datepicker'],
		'bootstapSlider': ['bootstrap', 'css!bootstrapcss'],
		'sl_ember_components': [
			'css!bootstrap_datepicker_css', 'css!select2_css', 'moment_timezone_with_data', 'bootstrap_datepicker_zh', 'select2', 'typeahead'
		],
		'select2': ['css!select2_css'],
		'jquery_contextmenu': ['jquiery_ui_positon', 'css!jquery_contextmenucss'],
		'ice': ['slong'],

		'comp_treeview': ['ember', 'jstree', 'css!lib/js-tree/themes/default/style.min.css'],
		//ueditor包的依赖关系
		'ueditor': ['ueditor_config'],

		//bootstrap_datepicker
		'bootstrap_datepicker': ['css!bootstrapcss', 'css!lib/bootstrap-datepicker/dist/css/bootstrap-datepicker.css'],
		'bootstrap_datepicker_zh': ['bootstrap_datepicker'],

		'bootstrap_multiselect': ['css!lib/bootstrap-multiselect/dist/css/bootstrap-multiselect.css'],

		//定义datatable依赖
		'comp_data_table': ['bootstrapjdataTables', 'jdataTablesSelect', 'css!lib/jquery.dataTables/dist/css/select.bootstrap.css', 'css!lib/jquery.dataTables/dist/css/jquery.dataTables.css', 'css!lib/jquery.dataTables/dist/css/dataTables.bootstrap.css'],

		'comp_xslider': ['xslider'],
		//ht2级js依赖项
		'ht_cssanimation': ['ht'],
		'ht_contextmenu': ['ht'],
		'ht_form': ['ht'],
		'ht_html': ['ht'],
		//ht3级js依赖项
		'ht_overview': ['ht_cssanimation', 'ht_contextmenu', 'ht_form'],
		'ht_dialog': ['ht_cssanimation', 'ht_contextmenu', 'ht_form'],
		'ht_menu': ['ht_cssanimation', 'ht_contextmenu', 'ht_form'],
		'ht_rulerframe': ['ht_cssanimation', 'ht_contextmenu', 'ht_form'],
		'ht_telecom': ['ht_cssanimation', 'ht_contextmenu', 'ht_form'],
		'ht_xeditinteractor': ['ht_cssanimation', 'ht_contextmenu', 'ht_form'],
		'ht_panel': ['ht_cssanimation', 'ht_contextmenu', 'ht_form'],
		'ht_live': ['ht_cssanimation', 'ht_contextmenu', 'ht_form'],
		'FloatingWindow': ['ht_cssanimation', 'ht_contextmenu', 'ht_form'],
		'CreateVectorInteractor': ['ht_cssanimation', 'ht_contextmenu', 'ht_form'],
		'WdatePicker': ['ht_cssanimation', 'ht_contextmenu', 'ht_form'],
		'ht_pickinput': ['ht_cssanimation', 'ht_contextmenu', 'ht_form'],
		'ht_animation': ['ht_cssanimation', 'ht_contextmenu', 'ht_form'],
		'ht_propertypane': ['ht_cssanimation', 'ht_contextmenu', 'ht_form'],
		'ht_pipenode': ['ht_cssanimation', 'ht_contextmenu', 'ht_form'],
		'ht_flow': ['ht_cssanimation', 'ht_contextmenu', 'ht_form'],
		ht_edgetype: ['ht'],
		//ht入口
		'ht_main': ['ht_overview', 'ht_dialog', 'ht_menu', 'ht_rulerframe', 'ht_telecom', 'ht_xeditinteractor', 'ht_panel', 'ht_live', 'FloatingWindow', 'CreateVectorInteractor', 'WdatePicker', 'ht_pickinput', 'ht_animation', 'ht_propertypane', 'ht_pipenode', 'ht_flow'],
		//定义leaflet 2级js文件依赖项
		'proj4_compressed': ['leaflet'],
		'proj4leaflet': ['leaflet'],
		'Control_MiniMap': ['leaflet'],
		'L_Control_MousePosition': ['Control_MiniMap'],
		'Control_FullScreen': ['L_Control_MousePosition'],
		//定义leaflet 3级 js文件
		'esri_leaflet_src': ['proj4_compressed', 'proj4leaflet', 'Control_MiniMap', 'L_Control_MousePosition', 'Control_FullScreen'],
		'leaflet_heatmap': ['esri_leaflet_src', 'h337'],
		'tp_map': ['esri_leaflet_src', 'leaflet_heatmap'],
		//定义leaflet_main依赖项
		'leaflet_main': ['tp_map', 'css!lib/jslib/leaflet/leaflet.css', 'css!lib/jslib/leaflet/plugins/L.Control.Zoomslider.css', 'css!lib/jslib/leaflet/plugins/L.Control.Pan.css',
			'css!lib/jslib/leaflet/plugins/L.Control.Pan.ie.css', 'css!lib/jslib/leaflet/plugins/Control.MiniMap.css', 'css!lib/jslib/leaflet/plugins/L.Control.MousePosition.css',
			'css!lib/jslib/leaflet/plugins/Control.FullScreen.css', 'css!lib/jslib/tp/tp-map.css'
		],

		'bootstrap_datetimepicker': ['bootstrap', 'moment', 'css!lib/bootstrap-datepicker/dist/css/bootstrap-datetimepicker.css'],
		'bootstrap_clockpicker': ['bootstrap', 'css!lib/bootstrap-datepicker/dist/css/bootstrap-clockpicker.css'],
		'pageNation': ['jquery', 'bootstrap', 'css!bootstrapcss'],
		//定义bootstrap_table依赖
		'bootstrap_table': ['bootstrap'],
		'bootstrap_table_locale': ['bootstrap_table'],
		'colResizable': ['jquery'],
		'bootstrap_table_resizeable': ['bootstrap_table', 'colResizable'],
		'bootstrap_table_editable': ['bootstrap_editable', 'bootstrap_table'],

		//jui chart图依赖
		'jui_chart': ['jui_core'],
		'ztree': ['jquery', 'css!ztree_css'],
		'jsplumb': ['jquery']
	}
});

require(['frame/common/services/auth/auth', 'ember'], function(setupAuthentication) {

	setupAuthentication(function() {
		require(['app'], function(App) {
			require(['app_init', 'app_view'], function() {
				App.advanceReadiness();
			});
		});
	});
});