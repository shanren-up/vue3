/*
 * 转换HT模型
 * 使用时需要已经加载ht.js 使用ht组件都依赖于ht.js所以不用特意设置
 */
define(
    [],
    function() {

        'use strict';

        return Ember.Object.extend({

            /*
             * 转换数据到HtModel
             * data object数据或者Array数据集合
             * nameKey 设置为name的Key 只有data.setName('')的值能够在treeColumn显示出来
             * accessType设置的获取数据方式推荐attr
             * dataModel HT DataModel一个数据只能添加到一个DataModel里面，
             *  一个DataModel可以设置给多个Ht组件，不传该参数默认创建新的DataModel
             * tag 属性默认为数据唯一标识设置为HT模型的tag tag不能有重复
             * 可通过 DataModel#getDataByTag(tag)查找数据
             */
            coverData: function(data, nameKey, accessType, dataModel) {
                if (!dataModel) {
                    dataModel = new ht.DataModel();
                }
                if (accessType === null) {
                    // 按照model说明设置时有问题先不要使用
                    throw new TypeError('accessType暂不支持null的转换');
                }
                this._coverData(data, nameKey, accessType, dataModel);
                return dataModel;
            },
            // TODO 未添加循环引用监测
            _coverData: function(data, nameKey, accessType, dataModel, parent) {
                var htData;
                if (Array.isArray(data)) {
                    data.forEach(function(item, i) {
                        var htData = this._coverOneData(item, nameKey, accessType, parent);
                        // 添加最后一个子元素标记
                        if (i === data.length - 1) {
                            htData.a('_isLastChild', true);
                        }
                        dataModel.add(htData);
                        if (item.children) {
                            this._coverData(item.children, nameKey, accessType, dataModel, htData);
                        }
                    }, this);
                } else {
                    htData = this._coverOneData(data, nameKey, accessType, parent);
                    dataModel.add(htData);
                    if (data.children) {
                        this._coverData(data.children, nameKey, accessType, dataModel, htData);
                    }
                }
            },
            _coverOneData: function(data, nameKey, accessType, parent) {
                var result = new ht.Data();
                result.setName(data[nameKey]);
                if (data.hasOwnProperty('tag')) {
                    result.setTag(data.tag);
                }
                if (parent) {
                    result.setParent(parent);
                }
                // 保存一份原始数据 不需要 去掉
                // result.a('originalData', data);
                if (accessType === 'attr') {
                    return result.a(data);
                } else if (accessType === 'field') {
                    // 只设置自有属性
                    Object.keys(data).forEach(function(key) {
                        // 调过方法
                        if (typeof data[key] === 'function') {
                            return;
                        }
                        result[key] = data[key];
                    });
                    return result;
                    // style为获取和设置图元样式不推荐他用
                } else if (accessType === 'style') {
                    return result.s(data);
                }
            },
            // TODO
            coverTreeData: function(data, accessType, dataModel) {

            }
        }).create();
    }
);
