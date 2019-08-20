define(
    [
        'configs',
        'json!./cultureInfo.json',
        'frame/common/models/frame_access_type',
        'frame/common/models/frame_new_access_type',
        'frame/common/core/frame_core_helper',
    ],

    function(config, cultureInfo, frameAccessType, frameNewAccessType, frameCoreHelperIns) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);

        var frameUser = Ember.Object.extend({
            mobilephone: '',
            userId: -1,
            userCode: -1,
            userName: '',
            userNameZh: '',
            loginTime: 0,
            isAdmin: false,
            isSupperAdmin: false,
            passWord: '',
            roles: [],
            securityIDs: [],
            loginType: -1,
            securityDatas: [],
            userNESQL: '',
            expTime: '',
            userLevel: -1,
            provinceId: -1,
            regionId: -1,
            cityId: -1,
            _accessObjects: [],
            _operationObjects: [],
            properties: [],

            // 统一鉴权新增
            // 操作权限集合
            _operationList: null,
            // 数据权限集合
            _dataOperationList: null,
            _dataOperationTranslationList: null,
            // 登录ID
            loginId: null,
            // 用户邮箱
            userEmail: null,
            // 座机
            landlineTelephone: '',
            // 密码过期日期
            pwdExpireDate: null,
            // 密码是否必须修改
            pwdMustChange: false,
            // 修改时间
            modifiedTime: null,
            // 创建时间
            createTime: null,
            // 用户状态 字典 1正常 2锁定 11待审批 12驳回 51协议升级
            userStatus: null,
            // 备注
            memo: null,
            // 有效期开始时间 默认为null，用于临时账户。
            validStartTime: null,
            // 有效期结束时间 同上
            validEndTime: null,
            // TODO 用户拥有全部区域是否与用户level相同
            zones: null,
            _allZonesList: null,
            _allZonesMap: null,
            init: function() {
                this.set('roles', []);
                this.set('securityIDs', []);
                this.set('regionIDs', []);
                this.set('_accessObjects', []);
                this.set('securityDatas', []);
                this.set('_operationObjects', []);
                this.set('_operationList', []);
                this.set('_dataOperationList', []);
                this.set('_dataOperationTranslationList', []);
                this.set('zones', []);
                this.set('_allZonesList', []);
                this.set('_allZonesMap', {});
            },
            willDestroy: function() {},
            accessObjectsChanged: Ember.observer("_accessObjects", function() {
                /* this._accessObjects.forEach(function (item) {
                var test = 1;
                }); */
            }),
            hasExp: function() {
                var lastDate = frameCoreHelperIns.getItemToStorage('frame_last_login_time');
            },
            getAccessObject: function(accessType) {},
            setUserInfo: function(userInfo) {
                this.set('userId', userInfo.id);
                this.set('userName', userInfo.username);
                this.set('userNameZh', userInfo.realname);
                this.set('isSupperAdmin', 'administrator' === userInfo.username);
                this.set('passWord', userInfo.password);
                this.set('mobilephone', userInfo.tel);
                this.set('roles', userInfo.varval1);
                this.set('email', userInfo.email);

                frameCoreHelperIns.setItemToStorage('frame_last_login_time', Date.now());
            },


            /** 
             * 旧操作权限
             * 为了兼容之前代码 如果config.isNewAuthentication为true调用对应统一鉴权对应接口
             * 参数请参考新接口
             */
            // 设置全部操作权限
            setOperationPrivilges: function(data) {
                if (config.isNewAuthentication) {
                    this.setOperationsUniform(data);
                } else {
                    this.set('_operationObjects', data.operationprivigles);
                }
            },
            // 验证操作权限
            checkOperationPrivilge: function(operationId) {
                if (config.isNewAuthentication) {
                    return this.checkOperationUniform.apply(this, arguments);
                }
                if (this._checkIsString(operationId)) {
                    return this._operationObjects.includes(operationId);
                } else {
                    return false;
                }
            },
            // 获取所有操作权限
            getOperationPrivilges: function() {
                if (config.isNewAuthentication) {
                    return this.getOperationsUniform.apply(this, arguments);
                }
                return this._operationObjects;
            },

            /**
             * 旧数据权限
             * 为了兼容之前代码 如果config.isNewAuthentication为true调用对应统一鉴权对应接口 
             * 参数请参考新接口
             */
            /* 判断是否包含指定类型的集合
             * @public
             * @param {string} accessType  参考 frame_new_access_type.js中枚举
             * @param {(string|number)} dataPrivilgeId 对应数据权限的值
             * @returns {boolean} 是否包含对应鉴权数据的集合
             */
            // 设置全部数据权限
            setAllDataPrivilges: function(data) {
                if (config.isNewAuthentication) {
                    this.setDataOperationsUniform(data);
                } else {
                    this.set('_accessObjects', data.dataprivigles);
                }
            },
            checkDataPrivilge: function(accessType, dataPrivilgeId) {
                if (config.isNewAuthentication) {
                    return this.checkDataOperationUniform.apply(this, arguments);
                }
                if (this._checkIsAccessType(accessType) && this._checkIsString(dataPrivilgeId)) {
                    if (this._accessObjects[accessType] != null) {
                        return this._accessObjects[accessType].includes(dataPrivilgeId);
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            },


            /* 获取指定类型数据权限集合
             * @public
             * @param accessType{string} 参考 frame_new_access_type.js中枚举
             * @returns {Array} 包含对应鉴权数据的集合
             */
            getDataPrivilges: function(accessType) {
                if (config.isNewAuthentication) {
                    return this.getDataOperationsUniform.apply(this, arguments);
                }
                if (this._checkIsAccessType(accessType)) {
                    if (this._accessObjects[accessType] != null) {
                        return this._accessObjects[accessType];
                    } else {
                        return [];
                    }
                } else {
                    return [];
                }
            },
            /**
             * 统一鉴权操作权限
             */
            /** 设置所有操作权限集合
             * @public
             * @param  {array} dataList 操作权限集合 
             */
            setOperationsUniform: function(dataList) {
                this.set('_operationList', dataList);
            },
            /** 获取指定appId全部操作权限
             * @public
             * @param {number|array} appId  不传参数时返回所有操作权限
             * @returns {array} 指定appId全部操作权限集合 数据格式如下
             * [
                  {
                    "appId": 100001,
                    "operIds": [
                    100001001
                    ]
                  }
                ]
             */
            getOperationsUniform: function(appId) {
                if (Array.isArray(appId)) {
                    var appIdList = appId.map(function(id) {
                        return parseInt(id, 10);
                    });
                    return this._operationList.filter(function(item) {
                        return appIdList.includes(item.appId);
                    });
                } else if (appId) {
                    return this._operationList.filterBy('appId', parseInt(appId, 10));
                } else {
                    return this._operationList;
                }
            },
            /** 判断当前appId是否包含指定类型的集合
             * @public
             * @param {number} appId  
             * @param {number} operationId 
             * @returns {boolean} 是否包含对应鉴权数据的集合
             */
            checkOperationUniform: function(appId, operationId) {
                var appData = this.getOperationsUniform(appId),
                    result;
                if (appId && appData.length) {
                    try {
                        result = appData[0].operIds.includes(parseInt(operationId, 10));
                        return result;
                    } catch (e) {
                        return false;
                    }
                } else {
                    return false;
                }

            },
            /**
             * 统一鉴权数据权限
             */
            /** 设置所有数据权限集合
             * @public
             * @param  {array} dataList 操作权限集合 
             */
            setDataOperationsUniform: function(dataList) {
                this.set('_dataOperationList', dataList);
            },
            /** 获取指定appId全部数据权限
             * @public
             * @param {number|array} appId  不传参数时返回所有数据权限
             * @param {boolean} withUserZone  如数据权限为空是否使用用户所属区域作为默认数据权限
             * @returns {array} 指定appId全部操作权限集合 数据格式如下
             * [
                {
                    "appId": 100001,
                    "ruleSets": [
                    {
                        "1005": -3213
                    }
                    ]
                }
                ]
             */
            getDataOperationsUniform: function(appId, withUserZone) {
                var _this = this,
                    appIdList = null;
                if (Array.isArray(appId)) {
                    appIdList = appId.map(function(id) {
                        return parseInt(id, 10);
                    });
                } else if (appId) {
                    appId = parseInt(appId, 10);
                }
                if (withUserZone === true && (appIdList || appId)) {
                    var ruleSets = [],
                        zoneIds,
                        zoneLevel,
                        rule;
                    for (zoneLevel = 1; zoneLevel <= 4; zoneLevel++) {
                        zoneIds = this.zones.filterBy('zoneLevel', zoneLevel).mapBy('zoneId');
                        if (zoneIds.length > 0) {
                            rule = {};
                            rule[1000 + zoneLevel] = zoneIds;
                            ruleSets.push(rule);
                        }
                    }
                    if (!appIdList && appId) {
                        appIdList = [appId];
                    }
                    return appIdList.map(function(id) {
                        var dataOperation = _this._dataOperationList.findBy('appId', appId);
                        return {
                            appId: id,
                            ruleSets: dataOperation && !Ember.isEmpty(dataOperation.ruleSets) ? dataOperation.ruleSets : ruleSets
                        };
                    });
                } else if (appIdList) {
                    return this._dataOperationList.filter(function(item) {
                        return appIdList.includes(item.appId);
                    });
                } else if (appId) {
                    return this._dataOperationList.filterBy('appId', appId);
                } else {
                    return this._dataOperationList;
                }
            },
            /** 设置数据权限翻译
             * @public
             * @param  {array} dataList 数据权限翻译集合
             */
            setDataOperationsUniformTranslation: function(dataList) {
                this.set('_dataOperationTranslationList', dataList);
            },
            /**
             *
             * @param sharedAppId  数据权限共用AppId，如610000
             * @param appId        应用自身AppId
             */
            getDataOperationsUniformTranslation: function(sharedAppId, appId) {
                if (!jQuery.isNumeric(sharedAppId) || appId && !jQuery.isNumeric(appId)) {
                    throw new Error('invalid arguments');
                }
                var result = [],
                    translations = [],
                    dataOperations = [];
                sharedAppId = parseInt(sharedAppId, 10);
                appId = appId ? parseInt(appId, 10) : 0;
                translations = this._dataOperationTranslationList.filterBy('appId', appId);
                dataOperations = this.getDataOperationsUniform(sharedAppId, true);
                if (translations.length > 0 && !Ember.isEmpty(translations[0].translation) &&
                    dataOperations.length > 0 && !Ember.isEmpty(dataOperations[0].ruleSets)) {
                    translations = translations[0].translation;
                    dataOperations[0].ruleSets.forEach(function(ruleSet) {
                        var ruleSetNew = {};
                        Ember.keys(ruleSet).forEach(function(key) {
                            if (translations[key]) {
                                ruleSetNew[translations[key]] = ruleSet[key];
                            }
                        });
                        if (Ember.keys(ruleSetNew).length > 0) {
                            result.push(ruleSetNew);
                        }
                    });
                }
                return result;
            },
            /** 判断是否包含指定类型的集合
             * TODO 只能查询区域鉴权信息 accessTypeArea = [1001, 1002, 1003, 1004, ],
             * @public
             * @param {number} appId  不传参数时返回所有数据权限
             * @param {number} accessType  参考 frame_new_access_type.js中枚举
             * @param {number} operationId 对应数据权限的值
             * @returns {boolean} 是否包含对应鉴权数据的集合
             */
            checkDataOperationUniform: function(appId, accessType, operationId) {
                var appData = this.getDataOperationsUniform(appId, true),
                    accessTypeArea = [1001, 1002, 1003, 1004, ],
                    // accessTypeOther = [1011, 1012, 1013, 1014, 1015],
                    operationList;
                if (!appId || !appData.length || !this._checkIsAccessType(accessType)) {
                    return false;
                }
                if (!accessTypeArea.includes(Number(accessType))) {
                    throw new Error('checkDataOperationUniform只能查询区域鉴权 accessType需要在1001, 1002, 1003, 1004中', accessType);
                }
                try {
                    operationList = appData[0].ruleSets;
                } catch (e) {
                    return false;
                }
                for (var i = 0, len = operationList.length; i < len; i++) {
                    // 查询对应的 权限直接存在 返回true
                    if (operationList[i][accessType] && operationList[i][accessType].includes(String(operationId))) { //Number(operationList[i][accessType])=== Number(operationId)) {
                        return true;
                        //  如果对应属性值对应区域则查找上一级是否有
                    } else {
                        var parentZone = this._getOperationIdZone(operationId);
                        if (parentZone && this._checkDataOperationZoneInOperation(parentZone, operationList[i])) {
                            return true;
                        }
                    }
                }
                return false;
            },
            _getOperationIdZone: function(operationId) {
                var currentZone = this._allZonesMap[operationId];
                if (currentZone && currentZone.parentZoneId) {
                    return this._allZonesMap[currentZone.parentZoneId];
                }
            },
            _checkDataOperationZoneInOperation: function(areaInfo, operation) {
                var accessTypeArea = [1001, 1002, 1003, 1004];
                if (areaInfo && areaInfo.zoneLevel) {
                    var accessType = accessTypeArea[areaInfo.zoneLevel - 1];
                    // 包含该区域
                    if (operation[accessType] && operation[accessType].includes(String(areaInfo.zoneId))) {
                        return true;
                    }
                    // 否则 如果zoneLevel已经是1 返回false 否则返回父区域判断结果
                    if (areaInfo.zoneLevel > 1) {
                        return this._checkDataOperationUniformParentZone(this._allZonesMap[areaInfo.parentZoneId], operation);
                    } else {
                        return false;
                    }
                }
                return false;
            },

            _checkIsAccessType: function(accessType) {
                if (config.isNewAuthentication) {
                    if (frameNewAccessType.includes(+accessType)) {
                        return true;
                    } else {
                        throw "accessType is not right";
                    }
                }
                var has = false;
                for (var prop in frameAccessType) {
                    if (accessType === frameAccessType[prop]) {
                        has = true;
                    }
                }

                if (!has) {
                    throw "accessType is not right";
                }

                return has;

            },
            _checkIsString: function(value) {
                var is = typeof value === "string";
                if (!is) {
                    throw value + " value must be string ";
                }

                return is;
            },
            // 统一鉴权后新增
            // 设置用户信息
            setUserInfoNew: function(userInfo) {
                var loginTime;
                this.set('userId', userInfo.userId);
                this.set('userName', userInfo.userName);
                this.set('mobilephone', userInfo.userMobile);
                this.set('loginId', userInfo.loginId);
                this.set('userEmail', userInfo.userEmail);
                this.set('pwdExpireDate', userInfo.pwdExpireDate);
                this.set('modifiedTime', userInfo.modifiedTime);
                this.set('createTime', userInfo.createTime);
                this.set('userStatus', userInfo.userStatus);
                this.set('memo', userInfo.memo);
                this.set('validStartTime', userInfo.validStartTime);
                this.set('validEndTime', userInfo.validEndTime);
                this.set('landlineTelephone', userInfo.userPhone);


                this.set('isSupperAdmin', 'administrator' === userInfo.name);
                if (userInfo.loginTime) {
                    loginTime = new Date(userInfo.loginTime).getTime();
                }
                this.set('loginTime', loginTime || Date.now());

                frameCoreHelperIns.setItemToStorage('frame_last_login_time', Date.now());
                // Ember.run.later(this, this.writeSuccessLog);
            },
            writeSuccessLog: function() {
//              require(['frame/common/services/adapter/frame_log_adapter/frame_log_adapter'], function(logAdapter) {
//                  // 写入登录成功日志
//                  logAdapter.writeLog(logAdapter.logModel.create({
//                      // 登出 ologId 
//                      ologId: -1,
//                      applicationId: Number(this._appId),
//                      memo: Ember.oloc('frame_user_yhdlcg'),
//                      specificOpType: 'Login',
//                      // 是否登录操作
//                      isLoginOp: true,
//                      // 日志级别 'Debug', 'Info', 'Major', 'Warning', 'Error', 'None'
//                      logLevel: 'Major',
//                      // 操作是否成功
//                      isSuccess: true,
//                  }));
//              }.bind(this));
            },
            // 设置用户角色
            setUserRole: function(roles) {
                this.set('roles', roles);
            },
            /* 新版统一鉴权
             * userLevel 该用户最高权限 字典值 1,2,3,4 对应 全国，省，地市，区县
             * zones 该用户所有区域详细信息 是对象数组，每个区域对象模型如下
             * ZONE_TYPE	区域类型	PK，根据不同应用分几类 101 行政区划代码 201广电系统
             * ZONE_ID	区域ID	PK
             * PARENT_ZONE_ID	父级区域	FK，同类型之间父子关系。无父级为null
             * ZONE_NAME	区域名称	
             * ZONE_NAME_SHORT	区域简称	如：京
             * ZONE_NAME_PINYIN	区域名称拼音	用于拼音排序。每个字间用空格间隔
             * ZONE_ALIAS	区域英文标识	如：BJ
             * ZONE_ORDER	区域排序。展现顺序	
             * ZONE_LEVEL	区域级别	冗余字段 字典值同userLevel
             * ZONE_LEVEL_1_ID	所属一级区域ID	冗余字段，按需选用  字典值同上
             * ZONE_LEVEL_2_ID	所属二级区域ID	冗余字段，按需选用  字典值同上
             * ZONE_LEVEL_3_ID	所属三级区域ID	冗余字段，按需选用  字典值同上
             * ZONE_LEVEL_4_ID	所属四级区域ID	冗余字段，按需选用  字典值同上
             */
            // 设置用户区域
            setUserZones: function(zones) {
                this.set('zones', zones);
                // 获取最高级别赋值给userLevel
                this.set('userLevel', Math.min.apply(null, zones.getEach('zoneLevel')));
            },
            // 设置用户区域
            setAllZones: function(zones) {
                this.set('_allZonesList', zones || []);
                this.set('_allZonesMap', Ember.isEmpty(zones) ? {} : zones.reduce(function(previousValue, item, index, enumerable) {
                    if (item.zoneId || item.zoneId === 0) {
                        previousValue[item.zoneId] = item;
                    }
                    return previousValue;
                }, {}));
            },
            // 获取用户区域树（可以传Zone对象数组、多个Zone对象、ZoneId数组、多个ZoneId）
            getUserZoneTree: function( /** 可以传Zone对象数组、多个Zone对象、ZoneId数组、多个ZoneId */ ) {
                var _this = this;
                if (arguments.length > 0 && this._allZonesMap !== null) {
                    var zoneIds = [],
                        children = [],
                        withChildren = arguments.length > 1 && arguments[arguments.length - 1] === true;
                    if (Ember.isArray(arguments[0])) {
                        zoneIds = arguments[0];
                    } else {
                        zoneIds = Array.prototype.slice.call(arguments, 0, withChildren ? arguments.length - 1 : arguments.length);
                    }
                    if (zoneIds.length > 0 && Ember.typeOf(zoneIds[0]) === 'object') {
                        zoneIds = zoneIds.mapBy('zoneId');
                    }
                    var root = {},
                        map = {},
                        i;

                    if (withChildren) {
                        for (i = 0; i < zoneIds.length; i++) {
                            map[zoneIds[i]] = Ember.copy(_this._allZonesMap[zoneIds[i]]);
                            children.push(map[zoneIds[i]]);
                        }
                    }

                    for (i = 0; i < zoneIds.length; i++) {
                        var parent = null,
                            item = map[zoneIds[i]] || (map[zoneIds[i]] = Ember.copy(_this._allZonesMap[zoneIds[i]]));
                        if (item.zoneLevel === 1) {
                            if (root.zoneLevel !== 1) {
                                root = item;
                            }
                            continue;
                        }
                        if (item.zoneId) {
                            if (item.parentZoneId && !map[item.parentZoneId] && this._allZonesMap[item.parentZoneId]) {
                                map[item.parentZoneId] = Ember.copy(this._allZonesMap[item.parentZoneId]) || null;
                            }
                            parent = map[item.parentZoneId];

                            if (parent && item) {
                                if (parent.zoneId) {
                                    zoneIds.push(parent.zoneId);
                                }
                                if (!parent.children) {
                                    parent.children = [];
                                }
                                if (parent.children.filter(function(obj) {
                                        return obj.zoneId === item.zoneId;
                                    }).length === 0) {
                                    parent.children.push(item);
                                }
                            }

                            if (parent && parent.zoneLevel === 1) {
                                root = parent;
                            }
                        }
                    }

                    if (children.length > 0) { // withChildren === true
                        while (children.length > 0) {
                            var child = children.shift(),
                                tmp = this.getZoneChildren(child);
                            if (tmp.length > 0) {
                                child.children = tmp.map(function(value) {
                                    return map[value.zoneId] || (map[value.zoneId] = Ember.copy(_this._allZonesMap[value.zoneId]));
                                });
                                Array.prototype.push.apply(children, child.children);
                            }
                        }
                    }

                    return root;
                }
                return {};
            },
            getUserZoneTreeWithChildren: function( /** 可以传Zone对象数组、多个Zone对象、ZoneId数组、多个ZoneId */ ) {
                var args = Array.prototype.slice.call(arguments);
                args.push(true); // withChildren = true
                return this.getUserZoneTree.apply(this, args);
            },
            // 获取区域的全部子区域（可以传Zone对象数组、多个Zone对象、ZoneId数组、多个ZoneId）
            getZoneChildren: function( /** 可以传Zone对象数组、多个Zone对象、ZoneId数组、多个ZoneId */ ) {
                if (arguments.length > 0 && this._allZonesList !== null) {
                    var zoneIds = [];
                    if (Ember.isArray(arguments[0])) {
                        zoneIds = arguments[0];
                    } else {
                        zoneIds = Array.prototype.slice.call(arguments);
                    }
                    if (zoneIds.length > 0 && Ember.typeOf(zoneIds[0]) === 'object') {
                        zoneIds = zoneIds.mapBy('zoneId');
                    }
                    if (zoneIds.length > 0) {
                        return this._allZonesList.filter(function(zone) {
                            return zone.parentZoneId !== undefined && zone.parentZoneId !== null && zoneIds.includes(zone.parentZoneId);
                        });
                    }
                }
                return [];
            }
        });

        return frameUser;

    });