/*关于添加新的拓展
 * 请在model中添加相关配置项，以及必要的注释，对应的事件可酌情添加
 * 另外在默认配置模型tableConfigModel中设置默认功能的开关，不常用的默认关闭，需要时单独配置覆盖
 * 添加后请先自行测试可用性，主要测试功能是否实现，将使用说明，注意事项写在配置文件中
 */
//不会触发handleResize的调表格大小如模态框的最大化，请手动调用一次表格handleResize或者resetView方法
define(
    [
        'configs'
    ],
    function(configs) {

        'use strict';

        /*表格参数配置
         * 只有部分常用参数，如果需要其他设置参数请参考http://bootstrap-table.wenzhixin.net.cn/zh-cn/documentation/#表格参数
         *  由于值为null时，插件会用null覆盖默认值，造成一些异常因此model中不设置的值为undefined
         */
        var tableConfigModel = Ember.Object.extend({
                /***表格**/
                //表格类名 注意配置时需要加上'table table-hover'两个类名才能有bootstrap table样式
                classes: 'table table-hover table-no-bordered',
                //number表格高
                height: undefined,
                //string当数据为 undefined 时显示的字符
                undefinedText: '-',
                //Boolean是否显示列头
                showHeader: true,
                //Boolean是否显示列脚
                showFooter: false,
                //Boolean在点击行时，自动选择rediobox 和 checkbox
                clickToSelect: true,
                //Boolean是否启用搜索框
                search: false,
                //Boolean是否显示 内容列下拉选择框  复式表头时（有跨行跨列表头）有bug不推荐用
                showColumns: false,
                //Boolean是否显示 刷新按钮
                showRefresh: false,
                //Boolean是否显示 切换（table/card）按钮
                showToggle: false,
                //function 自定义函数代替内置的搜索函数，函数参数为搜索框输入的text，通过操作this.data数据实现筛选。
                customSearch: undefined,
                //function 自定义函数代替内置的排序函数，函数参数为(sortName, sortOrder)，通过操作this.data数据实现筛选。
                customSort: undefined,
                /***分页***/
                //设置为 true 会在表格底部显示分页条
                pagination: false,
                //number如果设置了分页，页面数据条数
                pageSize: 10,
                //Array如果设置了分页，设置可供选择的页面数据条数默认[10, 25, 50, 100, All]
                pageList: (function() {
                    if (configs.produceId === 'TNMS_Algeria') {
                        return [10, 20, 30, 50, 100, 200];
                    }
                })(),
                //paginationPreText: '《',
                //paginationNextText: '》',
                //Boolean列是否可拖动
                resizable: true,
                /**
                 * 三种值可选 'fit' 'flex' 'overflow' 
                 * 'fit': 默认配置 固定表格宽度 调整后后一列宽度缩小 this is default resizing model, in which resizing a column does not alter table width, which means that when a column is expanded the next one shrinks.
                 * 'flex': 表格宽度固定 调整后其他所有列整体缩小 in this mode the table can change its width and each column can shrink or expand independently if there is enough space in the parent container. If there is not enough space, columns will share its width as they are resized. Table will never get bigger than its parent.
                 * 'overflow': 调整后表格加宽 allows to resize columns with overflow of parent container.
                 */
                resizeMode: 'fit',
                //Boolean列拖动是表格是否立刻跟着改变,官方文档提示消耗cpu
                liveDrag: false,
                //Boolean列是否可编辑
                editable: false,
                //checkbox列表头是否显示全选checkbox
                checkboxHeader: true,
                /**
                 * 表格提示文字配置  
                 * 一般不需要配置，需要自定义提示文本时配置 配置时注意多语言支持 
                 * 配置参考如下目录文件，配置需要覆盖对应方法即可 ，配置的方法会覆盖默认语言文件的文字
                 * lib\bootstrap-table\bootstrap-table-zh-CN.min.js
                 **/
                promptTextConfig: null
            }),
            /*列参数配置
             * 只有部分常用参数，如果需要其他设置参数请参考http://bootstrap-table.wenzhixin.net.cn/zh-cn/documentation/#列参数
             */
            columnsModel = Ember.Object.extend({
                //Boolean 设置为true会在该列显示一个单选框
                radio: false,
                //Boolean 设置为true会在该列显示一个复选框
                checkbox: false,
                //Boolean 设置为false会在表格配置为true时，点击该列不会更改radio，checkbox选择状态
                clickToSelect: true,
                //string 该列数据在，数据源对象中的key值，复式表头即包含子表头可以不设置
                //在官方文档中如果表头是复式表头，用的数据源是嵌套的对象，field写的为'key1.key2',测试后发现有时候不好用取不到值，推荐demo中数据源非嵌套对象，field直接设置为对应的key，测试在是否复式表头都可用。
                field: '',
                //string 表头显示内容
                title: '',
                //Boolean 是否可排序
                sortable: true,
                //function 定义格式化函数，可以插入html标签，参数分别为该单元格value，该row的数据对象，该row的序号（如果有分页是当前页的序号）
                //例子如下所示：会在该列单元格前插入个star图标，给图标定义事件推荐添加单元格事件然后通过event.targt来区分事件是否发生在图标位置
                //function(value, row, index) {return '<i class="glyphicon glyphicon-star"></i>' + value;},
                formatter: undefined,
                //string 水平排列方式'left', 'right', 'center' can be used.默认为为空但bootstrap表格样式表头为left其他为center，推荐使用css修改
                align: undefined,
                //string 垂直排列方式 'top', 'middle', 'bottom' can be used.默认为空但bootstrap表格样式为bottom
                valign: undefined,
                //number 表头的跨行跨列，设置后columns数组的成员为数组，每个成员数组代表一行信息，设置方法与表格td写法类似，具体参考demo
                colspan: 1,
                rowspan: 1,
                //string/number 列宽度，不设置自适应，'10%',50='50px',
                width: undefined,
                //String 该列所有表格的css class
                'class': undefined,
                /* Object 可编辑表格用，
                 * 包含的key有type: 'text|textarea|select|date|checklist',
                 * 标题title: 'Enter username'
                 * validate: function(value) {
                        if($.trim(value) == '') {
                            return 'This field is required';
                        }
                    }
                 * 其他参数参考http://vitalets.github.io/x-editable/docs.html#editable //要翻墙应该同文件夹下为2016/12/10离线网页
                */
                editable: undefined,
            }),

            /*现只支持部分常用事件，需要其他事件请自行添加,事件名格式为去掉on首字母小写即可,
             * 全部事件详细信息参数请参考http://bootstrap-table.wenzhixin.net.cn/zh-cn/documentation/#方法
             * 可以配置为任何真值，当配置为函数时直接将配置函数绑定为事件处理函数，
             * 其他‘真值’（Boolean(value)===true）发送对应事件的action，action名为事件名+‘Result’
             * 所有事件的处理函数第一个参数为e，jQuery事件，后续为其他参数，详细的信息可通过event获取（不在arguments中，绑定的事件处理函数可以直接用）
             * 发送的action参数一致
             * 插件封装的双击事件会同时触发两次单击事件，请注意
             * */
            eventConfigModel = Ember.Object.extend({
                //所有事件所有的事件都会触发该事件，参数包括：（name, args）name：事件名，args：事件的参数。
                all: undefined,

                //当用户点击某一行的时候触发，参数包括：
                //$e
                //row：点击行的数据，
                //$element：tr 元素，
                //field：点击列的 field 名称
                clickRow: undefined,

                //当用户点击某一列的时候触发（包含行的信息相当于点击单元格），参数包括：
                //$e
                //field：点击列的 field 名称，
                //value：点击列的 value 值，
                //row：点击列的整行数据，
                //$element：td 元素。
                clickCell: undefined,

                //当用户双击某一列的时候触发，参数包括：
                //$e
                //field：点击列的 field 名称，
                //value：点击列的 value 值，
                //row：点击列的整行数据，
                //$element：td 元素。
                dblClickCell: undefined,

                //可编辑表格有效，编辑保存时触发
                //e,field, row, oldValue, $element
                /*关于editable的补充
                 * 因为存在复式表格等情况，各个使用情况下模型的数据形式差别比较大，统一写更新到模型的函数比较困难，请需要时自行根据情况编写处理函数参考如下
                 * 插件会自动赋值，与=直接赋值相同，不带Ember通知
                 * 如果想实现自动通知功能需自行添加editableSave事件如下，事件触发是row中对应field值已经改变，oldValue是改变之前值
                 * row是当前行对象，ember对象用set，普通对象用Ember.set,或者使用notifyPropertyChange手动通知改变
                 * editableSave: function (e,field, row, oldValue, $el) {
                                //row.set(field,row[field]); //--ember对象
                                //Ember.set(row,field,row[field]);//---比较通用ember对象，js对象都可以
                                //this.notifyPropertyChange("");//--手动通知
                            }.bind(this)
                 */
                editableSave: undefined,

            });
        /*方法
         * 全部方法及详情参考http://bootstrap-table.wenzhixin.net.cn/zh-cn/documentation/#方法
         * 通过触发组件exeucteMethod执行，参数为方法名
         * 执行结果通过exeucteResult事件发出，参数为执行结果和执行时的参数（包括方法名和参数）
         * 常用方法有
         * getOptions   参数 无     返回表格的 Options
         * getSelections 参数 无  返回所选的行，当没有选择任何行的时候返回一个空数组
         * getAllSelections 参数 无     返回所有选择的行，包括搜索过滤前的，当没有选择任何行的时候返回一个空数组。
         * checkAll none    Check all current page rows.
         * resetWidth   参数 无     Resizes header and footer to fit current columns width
         * selectPage   参数page    跳到指定的页。
         * prevPage 参数 无     跳到上一页。
         * nextPage 参数 无     跳到下一页。
         * 等
         * */
        return {
            tableConfigModel: tableConfigModel,
            columnsModel: columnsModel,
            eventConfigModel: eventConfigModel
        };
    }
);