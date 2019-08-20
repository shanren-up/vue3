define(
    function() {

        "use strict";

        var accessObjectTypes = [1001, 1002, 1003, 1004, 1011, 1012, 1013, 1014, 1015];
        /* 具体含义
         * 1001   一级区域  对应ZONE where ZONE_LEVEL=1。如全国
         * 1002   二级区域  对应ZONE where ZONE_LEVEL=2。如省
         * 1003   三级区域  对应ZONE where ZONE_LEVEL=3。如地市
         * 1004   四级区域  对应ZONE where ZONE_LEVEL=4。如区县
         * 
         * 1011   网元      对应INT_ID
         * 1012   网元类型  对应OBJECT_CLASS、TMSC_CAT或STP_CAT
         * 1013   网元组    对应GROUP_ID
         * 1014   厂家      对应VENDOR_ID
         * 1015   专业
         */

        /* 值实例
         *  只有一个条件时，满足即有权限 例如：某专业的操作权限  
         *  {
         *   "1005": -3213 // 
         *  },
         *  包含多个值时，取交集两个都满足，例如：某个省某个厂家同时满足有权限
         *  {
         *   "1002": -3213423,
         *   "1004": 201
         *  },
         * 
         * 
         */

        return accessObjectTypes;

    });