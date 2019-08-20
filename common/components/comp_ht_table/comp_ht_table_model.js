/*
 *ht官方文档：
 * treetable:http://www.hightopo.com/guide/guide/core/treetableview/ht-treetableview-guide.html
 * table:http://www.hightopo.com/guide/guide/core/tableview/ht-tableview-guide.html
 * dataModel:http://www.hightopo.com/guide/guide/core/datamodel/ht-datamodel-guide.html
 */
define(
    function() {

        'use strict';

        var columnModel = Ember.Object.extend({
            // name属性，该属性结合accessType属性最终实现对Data属性的存取
            name: '',
            /*
             * 操作存取列的属性类型 field类似于普通对象操作 官方实例基本都用attr
             * null： 默认类型，如name为age，采用getAge()和setAge(98)的get/set或is/set方式存取
             * style：如name为age，采用getStyle('age')和setStyle('age', 98)的方式存取可以简化为.s
             * field：如name为age，采用data.age和data.age = 98的方式存取
             * attr：如name为age，采用getAttr('age')和setAttr('age', 98)的方式存取可以简化为.a
             */
            accessType: 'attr',
            // 表头的列名内容，若为空则显示name值
            displayName: '',
            // 表头的列名左侧显示的图标
            icon: '',
            // 列宽度，默认允许的最小宽度为16，避免列过窄
            width: 100,
            // 表头的列名的文本颜色
            color: '',
            // 该列是否可编辑，默认为false
            editable: false,
            // 列是否允许多选时批量编辑，默认为true
            batchEditable: false,
            /*
             * 值类型用于提示组件提供合适的renderer渲染，合适的编辑控件，及改变值时必要的类型转换
             * null：默认类型，显示为文本方式
             * string：字符串类型，显示为文本方式
             * boolean：布尔类型，显示为勾选框
             * color：颜色类型，以填充背景色的方式显示
             * int：整型类型，文本编辑器改变值时自动通过parseInt进行转换
             * number：浮点数类型，文本编辑器改变值时自动通过parseFloat转换
             */
            valueType: null,
            // 决定以文本方式进行渲染时的水平对齐方式，默认为left
            align: 'left',
            // 是否加过滤功能
            hasFilter: true,
            filterType: 'text',
            // 输入相关
            //   决定属性是否可为空，默认为true，设置为false可避免输入null或undefined
            nullable: true,
            //   决定属性是否可为空字符串，默认为false，可避免输入空字符串，空字符串转换成undefined
            emptiable: false,
            // 列升降序状态，'desc'/'asc'点击表头排序时会自动改变其值
            sortOrder: null,
            sortable: true,
            // function(v1, v2, d1, d2){return 1/-1/0}存取列排序函数，用于自定义排序逻辑
            // sortFunc: null,
            // tag string 具体参照dataModal 设置后可通过tableView.getColumnModel().getDataByTag('sortableColumn')查找到该列对象。
            /*
             * 一下几个均为列对象的方法可重载自定义 具体参数参考ht-table介绍
             */
            // getValue 自定义获取值方式
            // setValue 自定义设置值方式
            // drawCell 自定义单元格渲染方式
            // formatValue 一般用于将数字转换更易读的文本格式，可重载自定义
            // getToolTip  自定义文字提示内容
        });
        /*
         * 具体参考ht官方文档table页
         * 此部分为表头组件默认配置，不需要修改配置时不用传入组件
         * 需要修改其他属性可以在组件里面添加或者重载组件_initHeader方法添加其他配置
         */
        var tableHeaderConfigModel = Ember.Object.extend({
            // 表头高度默认跟默认行高都为22px
            height: 0,
            // 降序图标
            sortDescIcon: '',
            // 升序图标
            sortAscIcon: '',
            // 表头背景图标 默认通过背景图片水平平铺设置表头背景色/图片 默认为img/header.png
            bgIcon: '',
            // 移动列时的列头背景色
            moveBackgroundColor: '',
            // 移动列时可插入位置的提示颜色
            insertColor: '',
            // 列线是否可见
            columnLineVisible: true,
            // 列线颜色
            columnLineColor: '',
            // 设置列宽是否允许改变，默认为true
            resizable: true,
            // 设置列顺序是否允许移动改变，默认为true
            movable: true,
            // 字体 默认为'12px arial, sans-serif'
            labelFont: null,
        });
        /*
         * 具体参考ht官方文档table页
         * 此部分为表格组件默认配置，不需要修改配置时不用传入组件
         * 需要修改其他属性可以在组件里面添加或者重载组件_initTableView方法添加其他配置
         */
        var tableConfigModel = Ember.Object.extend({
            // 奇数行背景色
            oddRowBgColor: '#F1F4F7',
            // 偶数行背景色
            evenRowBgColor: '#FAFAFA',
            // 选中行背景色
            checkRowBgColor: '#87A6CB',
            // 当前焦点行背景色
            focusRowBgColor: '#87A6CB',
            // 控制可否编辑的总开关，默认为false，每个Column列对象可再控制
            editable: false,
            // 设置行高
            rowHeight: 20,
            // 线是否可见，默认为true
            rowLineVisible: true,
            // 行线颜色
            rowLineColor: '',
            // 列线是否可见
            columnLineVisible: true,
            // 字体 默认为'12px arial, sans-serif'
            labelFont: null,
            // 列线颜色
            columnLineColor: '',
            // 滚动条颜色
            scrollBarColor: '',
            // 滚动条宽度
            scrollBarSize: '',
            // 是否自动隐藏滚动条，默认为true
            autoHideScrollBar: true,
            // 当前组件check模式 null(默认) default children descendat all 具体含义参考treeTable说明setCheckMode部分
            checkModel: null,
            // 树展开图标url
            expandIcon: 'common/components/comp_ht_table/img/minus.png',
            // 树合并图标url
            collapseIcon: 'common/components/comp_ht_table/img/add.png',
        });
        return {
            columnModel: columnModel,
            tableConfigModel: tableConfigModel,
            tableHeaderConfigModel: tableHeaderConfigModel
        };
    }
);
