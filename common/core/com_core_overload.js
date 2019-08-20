define(
    function() {

        "use strict";

        ///js 原生对象 扩展 

        // 定义assign方法 兼容低版本浏览器
        if (!Object.assign) {
            Object.defineProperty(Object, 'assign', {
                enumerable: false,
                configurable: true,
                writable: true,
                value: function(target) { // assign方法的第一个参数
                    if (target === null || target === undefined) { // TypeError if undefined or null
                        throw new TypeError('Cannot convert undefined or null to object');
                    }
                    var to = new Object(target);
                    for (var index = 1; index < arguments.length; index++) {
                        var nextSource = arguments[index];
                        if (nextSource !== null || nextSource !== undefined) { // Skip over if undefined or null
                            for (var nextKey in nextSource) {
                                // Avoid bugs when hasOwnProperty is shadowed
                                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                    to[nextKey] = nextSource[nextKey];
                                }
                            }
                        }
                    }
                    return to;
                }
            });
        }

        //扩展默认设置为不可遍历，可写，可配置，
        Array.prototype.equals = function(array) {
            if (!array) {
                return false;
            }

            if (this.length !== array.length) {
                return false;
            }

            for (var i = 0, l = this.length; i < l; i++) {
                if (this[i] instanceof Array && array[i] instanceof Array) {
                    if (!this[i].equals(array[i])) {
                        return false;
                    }
                } else if (this[i] !== array[i]) {
                    return false;
                }
            }
            return true;
        };
        Object.defineProperty(Array.prototype, 'equals', {
            enumerable: false,
            writable: true,
            configurable: true
        });
        Object.defineProperty(Number.prototype, 'toNumber', {
            value: function() {
                return this;
            },
            enumerable: false,
            writable: true,
            configurable: true
        });
        //字符串格式化 把字符串中'{int}'部分替换为参数列表，数字为参数的序号
        Object.defineProperty(String.prototype, 'format', {
            value: function() {
                var args = arguments;
                return this.replace(/\{(\d+)\}/g, function(s, i) {
                    return args[i];
                });
            },
            enumerable: false,
            writable: true,
            configurable: true
        });
        Object.defineProperties(Date.prototype, {
            //格式化日期为输入字符串格式
            Format: {
                value: function(fmt) {
                    //author: meizz
                    var o = {
                        "M+": this.getMonth() + 1,
                        //月份
                        "d+": this.getDate(),
                        //日
                        "h+": this.getHours(),
                        //小时
                        "m+": this.getMinutes(),
                        //分
                        "s+": this.getSeconds(),
                        //秒
                        "q+": Math.floor((this.getMonth() + 3) / 3),
                        //季度
                        "S": this.getMilliseconds() //毫秒
                    };
                    if (/(y+)/.test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                    }
                    for (var k in o) {
                        if (new RegExp("(" + k + ")").test(fmt)) {
                            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                        }
                    }
                    return fmt;
                },
                enumerable: false,
                writable: true,
                configurable: true,
            },
            /*
             * 对日期进行加减指定单位的指定值，返回新的日期对象
             * add(value, [interval, date]) 
             * value number 为指定的值，不设置，默认单位为日,单位为年月时必须为整数，其它可以为小数
             * interval string 为value的单位，y/Y年M月d/D日h/H时m分s秒
             * date Date/string 为指定的开始日期，可以为日期对象或者标准的格式化字符串
             */
            add: {
                value: function(value, interval, date) {
                    var newD, temp;
                    if (arguments.length === 1) {
                        return new Date(this.getTime() + value * 24 * 3600 * 1000);
                    }
                    if (!date) {
                        newD = this.getTime();
                    } else if (Object.prototype.toString.call(date) === '[object Date]') {
                        newD = date.getTime();
                    } else if (Date.parse(date)) {
                        newD = Date.parse(date);
                    } else {
                        //日期解析有误时采用当前日期
                        newD = Date.now();
                    }
                    switch (interval) {
                        case 'y':
                            /* falls through*/
                        case 'Y':
                            value = Math.round(value);
                            newD = new Date(newD);
                            temp = newD.getFullYear();
                            newD.setFullYear(temp + value);
                            return newD;
                        case 'M':
                            value = Math.round(value);
                            newD = new Date(newD);
                            temp = newD.getMonth();
                            newD.setMonth(temp + value);
                            return newD;
                        case 'd':
                            /* falls through*/
                        case 'D':
                            return new Date(newD + value * 24 * 3600 * 1000);
                        case 'h':
                            /* falls through*/
                        case 'H':
                            return new Date(newD + value * 3600 * 1000);
                        case 'm':
                            return new Date(newD + value * 60 * 1000);
                        case 's':
                            return new Date(newD + value * 1000);
                    }
                },
                enumerable: false,
                writable: true,
                configurable: true,
            }
        });
    });