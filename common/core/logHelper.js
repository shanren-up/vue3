define(
    [
        "app",
        /*配置文件地址，暂无。管理日志打印权限*/
        "",
        "lib/logHelper/lib/minilog"
    ],
    function (app, logConfigs) {

        "use strict";

        return Ember.Object.extend({
            minilog: Minilog,
            printLog: null,
            init: function () {
                this.minilog.enable();
                this.printLog = this.minilog("");
            },
            error: function () {
                if (true) {
                    this.printLog.error(this.formatParam(arguments));
                }
            },
            warn: function () {
                if (false) {
                    this.printLog.warn(this.formatParam(arguments));
                }
            },
            info: function () {
                if (false) {
                    this.printLog.info(this.formatParam(arguments));
                }
            },
            debug: function () {
                if (false) {
                    this.printLog.debug(this.formatParam(arguments));
                }
            },
            formatParam: function (param) {
                //保存参数字符串
                var paramString = "";
                //保存多个参数时对其参数的处理
                var arr;
                try {
                    if (param && param.length === 1) {
                        paramString = param[0];
                    }
                    else if (param && param.length > 1) {
                        arr = Array.prototype.slice.call(param, 1).map(function (item) {
                            if (item instanceof Error) {
                                return item.toString();
                            }
                            else {
                                return JSON.stringify(item);
                            }
                        });
                        paramString = param[0].format.apply(param[0], arr);
                    }
                    else {
                        return "";
                    }
                }
                catch (e) {
                    paramString = e.toString();
                }
                return new Date().Format("yyyy-MM-dd hh:mm:ss:S") + " - " + paramString;
            }
        }).create();
    });
