Ember.addJsonCultureInfo({
    'frame_config_frame_version': {
        'en': 'System Version',
        'zh': '系统版本'
    },
    frame_config_help_document: {
        'en': 'Help Document',
        'zh': '帮助文档'
    }
});
define({
    containerConfig: {
        // 切换菜单方式 默认 mousemove 鼠标移入移出 其他值为点击
        changeOpenedViewType: 'mousemove',

        // 切换视图时否是关闭tabs
        isCloseViewListWhenChange: true,
        // 关闭视图时是否关闭tabs
        isCloseViewListWhenClose: true,
        // 是否显示加载动画
        showLoadingAnimation: true,

        // meauType2 为2时再竖菜单为空时是否自动隐藏
        isAutoHideVerticalMeauWhenEmpty: true,
    },
    headerConfig: {
        // 是否包含用户名称显示
        hasUser: true,
        hasOnlineNum: true,
        // 是否包含退出按钮    
        hasQuit: false,
        // 是否包含注销按钮
        hasLogout: true,
        // 是否包含更多下拉菜单
        hasMoreMeau: true,
        // 标题栏组件 mini header  300px(max)*40px
        headerComponent: {
            templateName: '',
            url: ''
        }
    },
    userConfig: {
        // 触发菜单方式 click hover
        trigger: 'hover',
        // 是否显示个人档案
        showAccountInfo: true,
        // 是否显示手机系统 二维码
        showPhone: false,
        // 菜单配置 
        menuList: [{
            show: true,
            name: Ember.oloc('frame_config_frame_version'),
            type: 'modal',
            componentName: 'frame-version',
            url: 'frame/common/components/frame_version/frame_version',
            parameter: {
                headerText: Ember.oloc('frame_config_frame_version'),
            }
        }, {
            // 是否显示该菜单
            show: true,
            name: '插件下载',
            /*
             * modal 以模态框方式打开视图需配置componentName  url 组件地址 其他模态框配置信息在parameter里面
             * url 以a标签打开指定url，需配置url
             * download  直接使用a标签下载 需配合url 必须  fileName 选配
             */
            type: 'modal',
            componentName: 'frame-download-tool',
            url: 'frame/common/components/frame_download_tool/frame_download_tool',
            fileName: '',
            parameter: {
                headerText: '插件列表'
            }
        }, {
            show: true,
            name: Ember.oloc('frame_config_help_document'),
            type: 'url',
            url: 'index.html',
        }]
    },
    // url 从站点根目录开始 默认下载文件放入download文件夹
    downloadConfig: [{
        'name': 'chrome_40.0.2214.115.exe',
        'description': '作用:兼容npapi插件<br/>安装方式: 点击打开, 安装前最好卸载已有的版本',
        'url': 'download/测试.html'
    }]
});
/**
 * tomcat 路径中包含中文默认会导致文件引用错误 
 * 需要再tomcat server.xml 对应站点的Connector增加 url编码格式 一般为 URIEncoding="utf-8" 即可
 * <Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               URIEncoding="utf-8"
               redirectPort="8443" />
 */