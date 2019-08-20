define(
    [
        'common/core/xlsx/com_core_export_file_saver',
        'lib/xlsx/dist/xlsx.core.min',
        'logHelper'
    ],
    function(saveAs, xlsx, log) {

        'use strict';

        function generateArray(rows) {
            var out = [],
                ranges = [],
                widthList;
            for (var R = 0; R < rows.length; ++R) {
                var outRow = [];
                var row = rows[R];
                var columns = row.querySelectorAll('td');
                if (!columns.length) {
                    columns = row.querySelectorAll('th');
                }
                if (R === 0) {
                    widthList = [].slice.call(columns).map(function(td) {
                        return parseInt($(td).width(), 10);
                    });
                }
                for (var C = 0; C < columns.length; ++C) {
                    var cell = columns[C];
                    var colspan = cell.getAttribute('colspan');
                    var rowspan = cell.getAttribute('rowspan');
                    var cellValue = cell.innerText.trim();
                    // if (cellValue !== '' && cellValue === +cellValue) {
                    //     cellValue = +cellValue;
                    // }
                    //Skip ranges
                    /*jslint -W083 */
                    ranges.forEach(function(range) {
                        if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
                            for (var i = 0; i <= range.e.c - range.s.c; ++i) {
                                outRow.push(null);
                            }
                            log.info('imp.core.export,excel,range:{0}', range.e.c - range.s.c);
                        }
                    });

                    //Handle Row Span
                    if (rowspan || colspan) {
                        rowspan = +rowspan || 1;
                        colspan = +colspan || 1;
                        ranges.push({
                            s: {
                                r: R,
                                c: outRow.length
                            },
                            e: {
                                r: R + rowspan - 1,
                                c: outRow.length + colspan - 1
                            }
                        });
                    }

                    //Handle Value
                    outRow.push(cellValue !== '' ? cellValue : null);

                    //Handle Colspan
                    if (colspan) {
                        for (var k = 0; k < colspan - 1; ++k) {
                            outRow.push(null);
                        }
                    }
                }
                out.push(outRow);
            }
            return [out, ranges, widthList];
        }

        // function datenum(v, date1904) {
        //     if (date1904) {
        //         v += 1462;
        //     }
        //     var epoch = Date.parse(v);
        //     return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
        // }

        function sheet_from_array_of_arrays(data, widthList) {
            widthList = widthList || [];
            var ws = {
                s: {
                    '!row': [{
                        wpx: 167
                    }]
                },
                '!cols': widthList.map(function(item) {
                    return {
                        wpx: item
                    };
                })
            };
            var range = {
                s: {
                    c: 10000000,
                    r: 10000000
                },
                e: {
                    c: 0,
                    r: 0
                }
            };
            for (var R = 0; R !== data.length; ++R) {
                for (var C = 0; C !== data[R].length; ++C) {
                    if (range.s.r > R) {
                        range.s.r = R;
                    }
                    if (range.s.c > C) {
                        range.s.c = C;
                    }
                    if (range.e.r < R) {
                        range.e.r = R;
                    }
                    if (range.e.c < C) {
                        range.e.c = C;
                    }
                    var cell = {
                        v: data[R][C]
                    };
                    if (cell.v === null) {
                        continue;
                    }
                    var cell_ref = XLSX.utils.encode_cell({
                        c: C,
                        r: R
                    });
                    cell.t = 's';
                    // if (typeof cell.v === 'number') {
                    //     cell.t = 's';
                    // } else if (typeof cell.v === 'boolean') {
                    //     cell.t = 'b';
                    // } else if (cell.v instanceof Date) {
                    //     cell.t = 'n';
                    //     cell.z = XLSX.SSF._table[14];
                    //     cell.v = datenum(cell.v);
                    // } else {
                    //     cell.t = 's';
                    // }
                    ws[cell_ref] = cell;
                }
            }
            if (range.s.c < 10000000) {
                ws['!ref'] = XLSX.utils.encode_range(range);
            }
            return ws;
        }

        function Workbook() {
            if (!(this instanceof Workbook)) {
                return new Workbook();
            }
            this.SheetNames = [];
            this.Sheets = {};
        }

        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i !== s.length; ++i) {
                view[i] = s.charCodeAt(i) & 0xFF;
            }
            return buf;
        }
        //获取一个表格的tr element为表格元素或者表格id
        function getTableTr(element) {
            if (element.nodeType) {
                return element.querySelectorAll('tr');
            } else {
                return document.getElementById(element).querySelectorAll('tr');
            }
        }
        //获取表格所有tr元素 参数为表格或者表格数组
        function getAllTr(table) {
            var rows = [];
            //表格数组
            if (table instanceof Array) {
                table.forEach(function(item) {
                    rows.push.apply(rows, getTableTr(item));
                });
            } else {
                rows = getTableTr(table);
            }
            return rows;
        }
        return {
            /*
             *table为表格元素或者id，多个表格时放入数组
             *eg：table1或者[table2,table3]均可
             *将表格内容导出到excel
             *fileName 为文件名 ws_name 为工作薄名 表格默认导入到一个工作薄内所以只能有一个
             *type 文件类型默认xlsx
             * widthList 宽度列表 可选 默认为表格实际宽度
             */
            exportTable: function(table, fileName, ws_name, type, widthList) {
                var rows = getAllTr(table),
                    oo = generateArray(rows);
                /* original data */
                var data = oo[0];
                log.debug('imp_core_export_excel,exportTable,paramData:{0}', data);
                fileName = fileName || 'download';
                ws_name = ws_name || fileName;
                type = type || 'xlsx';

                var wb = new Workbook(),
                    ws = sheet_from_array_of_arrays(data, widthList || oo[2]);

                /* add ranges to worksheet */
                ws['!merges'] = oo[1];

                /* add worksheet to workbook */
                wb.SheetNames.push(ws_name);
                wb.Sheets[ws_name] = ws;

                var wbout = XLSX.write(wb, {
                    bookType: type,
                    bookSST: false,
                    type: 'binary'
                });
                saveAs(new Blob([s2ab(wbout)], {
                    type: 'application/octet-stream'
                }), fileName + '.' + type);
            },

            /*
            *将数组数据导出到excel
            *dataArr 结构
            [{
                ws_name: Ember.oloc('com_core_export_excel_gzbmc1'),
                widthList: [100,200,300],
                data:[//二维数组每个内层数组为一行数据
                    [1-1,1-2,1-3],//excel第一行数据
                    [2-1,2-2,2-3]//excel第二行数据
                ]
            },{
                ws_name: Ember.oloc('com_core_export_excel_gzbmc2'),
                data:
            },...]
            *fileName 文件名
            *type 文件类型 默认xlsx  --支持xlsx，xlsb，ods
            */
            exportData: function(dataArr, fileName, type) {
                log.debug('imp_core_export_excel,exportData,paramData:{0}', dataArr);
                var wb = new Workbook(),
                    wbout;
                fileName = fileName || 'download';
                type = type || 'xlsx';
                dataArr.forEach(function(item, i) {
                    wb.SheetNames.push(item.ws_name || fileName + i);
                    wb.Sheets[item.ws_name || fileName + i] = sheet_from_array_of_arrays(item.data, item.widthList);
                });
                wbout = XLSX.write(wb, {
                    bookType: type,
                    bookSST: false,
                    type: 'binary'
                });
                saveAs(new Blob([s2ab(wbout)], {
                    type: 'application/octet-stream'
                }), fileName + '.' + type);
            }
        };
    });