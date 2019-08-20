直接引用videojs-flash.js文件有报错，所以对源文件做出修改
	修改前：define(['video.js'], factory)
	修改后：define(['lib/video/video.min'], factory)