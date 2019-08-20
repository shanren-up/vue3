define(
    [

    ],
    function () {
        "use strict";
        var dictionaryItem = Ember.Object.extend({
            key: null,
            value: null,
            /**
             * 初始化
             * @method init
             * @private
             */
            init: function () {

            },

            is: function (key) {
                return (this.key === key);
            },
            toString: function () {
                return this.key.toString() + ":" + this.value.toString();
            }
        });

        var dictionary = Ember.Object.extend({
            /**
             * 字典对象
             * @member {object} _map
             * @private
             */
            _map: null,
            /**
             * 初始化
             * @method init
             * @private
             */
            init: function () {
                this.set('_map', Ember.A());
            },

            /**
             * 增加项
             * @function
             * @param {object} key 增加的key
             * @param {object} value 增加的value
             * @returns boolean
             */
            addItem: function (key, value) {
                var isExist = this.setItem(key, value, false);
                if (isExist) {
                    return false;
                } else {
                    this._map.push(dictionaryItem.create({
                        key: key,
                        value: value
                    }));
                    return true;
                }
            },

            insertItem: function (key, value, index) {
                var isExist = this.setItem(key, value, false);
                if (isExist) {
                    return false;
                } else {
                    this._map.splice(index, 0, dictionaryItem.create({
                        key: key,
                        value: value
                    }));
                    return true;
                }
            },

            setItem: function (key, value, isSetSubItem) {
                var item = this.getItem(key, isSetSubItem);
                if (item) {
                    item.value = value;
                    return true;
                } else {
                    return false;
                }
            },
            /**
             * 是否包含key
             * @function
             * @param 是否包含此key
             * @returns boolean
             */
            contains: function (key) {
                for (var i = 0, l = this._map.length; i < l; i++) {
                    var item = this._map[i];
                    if (item.is(key)) {
                        return true;
                    }
                }
                return false;
            },

            /**
             * 通过key获取对象
             * @function
             * @param 对象key
             * @returns object
             */
            getItem: function (key, isGetSubItem) {
                for (var i = 0, l = this._map.length; i < l; i++) {
                    var item = this._map[i];
                    if (item.is(key)) {
                        return item.value;
                    }
                    if (isGetSubItem) {
                        var subItem = this._getSubItem(item.value, key);
                        if (subItem) {
                            return subItem;
                        }
                    }
                }
                return null;
            },

            _getSubItem: function (alarm, key) {
                if (alarm._childMap) {
                    if (alarm._childMap[key]) {
                        return alarm._childMap[key];
                    } else {
                        for (var item in alarm._childMap) {
                            return this._getSubItem(alarm._childMap[item], key);
                        }
                    }
                } else {
                    return null;
                }
            },

            /**
             * 通过key删除对象
             * @function
             * @param 对象key
             * @returns
             */
            removeItem: function (key, isRemoveSubItem) {
                for (var i = 0, l = this._map.length; i < l; i++) {
                    var item = this._map[i];
                    if (item.is(key)) {
                        this._map.splice(i, 1);
                        break;
                    }
                    if (isRemoveSubItem) {
                        this._removeSubItem(item.value, key);
                    }
                }
            },

            _removeSubItem: function (alarm, key) {
                if (alarm._childMap) {
                    if (alarm._childMap[key]) {
                        delete alarm._childMap[key];
                    } else {
                        for (var item in alarm._childMap) {
                            this._removeSubItem(item, key);
                        }
                    }
                } else {
                    return;
                }
            },
            /**
             * 清空
             * @function
             */
            removeAll: function () {
                this._map.length = 0;
            },

            /**
             * 计数
             * @function
             */
            count: function () {
                return this._map.length;
            },
            /**
             * 复制
             * @function
             */
            clone: function () {
                return dictionary.create().copy(this);
            },

            /**
             * 复制另一个字典的数据
             * @function
             */
            copy: function (source) {
                if (!(source instanceof Dictionary)) {
                    throw new Error('source parameter must be a  dictionary object');
                }
                this._map = source._map.slice();
                return this;
            },

            /**
             * 遍历
             * @function
             * @param {function} iterator 遍历方法
             * @param {mixed} context 上下文
             */
            forEach: function (iterator, context) {
                for (var i = 0, l = this._map.length; i < l; i++) {
                    var item = this._map[i];
                    iterator.call(context, item.key, item.value, i, this);
                }
            },
            /**
             * 排序
             * @function
             * @param {function} iterator 排序方法
             */
            sort: function (iterator) {
                if (typeof iterator !== 'function') {
                    iterator = function (a, b) {
                        return a > b ? 1 : b > a ? -1 : 0;
                    };
                }
                this._map.sort(function (a, b) {
                    return iterator(a.key, b.key);
                });
                return this;
            },
            /**
             * 从已有的数组中返回选定的元素
             * @function
             * @param {int} start 开始索引
             * @param {int} end 结束索引
             */
            slice: function (start, end) {
                var dictionary = this._map.slice(start, end);
                if (dictionary) {
                    return dictionary.getEach('value');
                }
            },
            /**
             *
             * @function 过滤
             * @param {function} iterator 过滤方法
             * @param {mixed} context 上下文
             * @returns
             */
            filter: function (iterator, context) {
                var r = dictionary.create();
                for (var i = 0, l = this._map.length; i < l; i++) {
                    var item = this._map[i];
                    var ok = iterator.call(scope, item.value, item.key, i, this);
                    if (ok) {
                        r.addItem(item.key, item.value);
                    }
                }
                return r;
            },
            /**
             * 获取全部key集合
             * @function
             * @returns array
             */
            keys: function () {
                var k = [];
                for (var i = 0, l = this._map.length; i < l; i++) {
                    var item = this._map[i];
                    k[i] = item.key;
                }
                return k;
            },

            /**
             * 获取值集合
             * @function
             * @returns array
             */
            values: function () {
                var v = [];
                for (var i = 0, l = this._map.length; i < l; i++) {
                    var item = this._map[i];
                    v[i] = item.value;
                }
                return v;
            }
        });
        return dictionary;
    });