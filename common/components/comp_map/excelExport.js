define(
    [],

    function() {

        "use strict";

        var version = "1.3";
        var csvSeparator = ',';
        var uri = {
            excel: 'data:application/vnd.ms-excel;base64,',
            csv: "data:application/csv;base64,"
        };
        var template = {
            excel: '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
        };
        var csvDelimiter = ",";
        var csvNewLine = "\r\n";
        var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        window.btoa = function(c) {
            var d = "";
            var m,
                k,
                h = "";
            var l,
                j,
                g,
                f = "";
            var e = 0;
            do {
                m = c.charCodeAt(e++);
                k = c.charCodeAt(e++);
                h = c.charCodeAt(e++);
                l = m >> 2;
                j = ((m & 3) << 4) | (k >> 4);
                g = ((k & 15) << 2) | (h >> 6);
                f = h & 63;
                if (isNaN(k)) {
                    g = f = 64;
                } else {
                    if (isNaN(h)) {
                        f = 64;
                    }
                }
                d = d + a.charAt(l) + a.charAt(j) + a.charAt(g) + a.charAt(f);
                m = k = h = "";
                l = j = g = f = "";
            } while (e < c.length);
            return d;
        };
        window.atob = function(c) {
            var d = "";
            var m,
                k,
                h = "";
            var l,
                j,
                g,
                f = "";
            var e = 0;
            do {
                l = a.indexOf(c.charAt(e++));
                if (l < 0) {
                    continue;
                }
                j = a.indexOf(c.charAt(e++));
                if (j < 0) {
                    continue;
                }
                g = a.indexOf(c.charAt(e++));
                if (g < 0) {
                    continue;
                }
                f = a.indexOf(c.charAt(e++));
                if (f < 0) {
                    continue;
                }
                m = (l << 2) | (j >> 4);
                k = ((j & 15) << 4) | (g >> 2);
                h = ((g & 3) << 6) | f;
                d += String.fromCharCode(m);
                if (g !== 64) {
                    d += String.fromCharCode(k);
                }
                if (f !== 64) {
                    d += String.fromCharCode(h);
                }
                m = k = h = "";
                l = j = g = f = "";
            } while (e < c.length);
            return d;
        };

        var base64 = {
            encode: function(str) {
                return window.btoa(unescape(encodeURIComponent(str)));
            },
            decode: function(str) {
                return decodeURIComponent(escape(window.atob(str)));
            }
        };

        var format = function(s, c) {
            return s.replace(new RegExp("{(\\w+)}", "g"), function(m, p) {
                return c[p];
            });
        };

        var get = function(element) {
            if (!element.nodeType) {
                return document.getElementById(element);
            }
            return element;
        };

        var fixCSVField = function(value) {
            var fixedValue = value;
            var addQuotes = (value.indexOf(csvDelimiter) !== -1) || (value.indexOf('\r') !== -1) || (value.indexOf('\n') !== -1);
            var replaceDoubleQuotes = (value.indexOf('"') !== -1);

            if (replaceDoubleQuotes) {
                fixedValue = fixedValue.replace(/"/g, '""');
            }
            if (addQuotes || replaceDoubleQuotes) {
                fixedValue = '"' + fixedValue + '"';
            }
            return fixedValue;
        };

        var dataToCSV = function(dataSource) {
            var data = "";
            var i,
                j,
                k,
                row;
            for (i = 0; i < dataSource.length; i++) {
                var cloumnName = dataSource[i].columnTitle;
                row = dataSource[i].columnCell.length;
                data = data + (i ? csvDelimiter : '') + fixCSVField(cloumnName.trim());
            }
            data = data + csvNewLine;
            for (k = 0; k < row; k++) {
                for (j = 0; j < dataSource.length; j++) {
                    data = data + (j ? csvDelimiter : '') + fixCSVField(dataSource[j].columnCell[k].columnValue);
                }
                data = data + csvNewLine;
            }
            return data;
        };

        var ee = {
            /** @expose */
            excel: function(anchor, table, name) {
                table = get(table);
                var ctx = {
                    worksheet: name || 'Worksheet',
                    table: table.innerHTML
                };
                var hrefvalue = uri.excel + base64.encode(format(template.excel, ctx));
                if (anchor) {
                    anchor.href = hrefvalue;
                }
                // Return true to allow the link to work
                return true;
            },
            
            excelAll: function(anchor, tableThead, tableTbody, name) {
                tableThead = get(tableThead);
                tableTbody = get(tableTbody);
                var ctx = {
                    worksheet: name || 'Worksheet',
                    table: tableThead.innerHTML + tableTbody.innerHTML
                };
                var hrefvalue = uri.excel + base64.encode(format(template.excel, ctx));
                if (anchor) {
                    anchor.href = hrefvalue;
                }
                // Return true to allow the link to work
                return true;
            },

            dataSourceToCSV: function(anchor, dataSource, delimiter, newLine) {
                if (delimiter !== undefined && delimiter) {
                    csvDelimiter = delimiter;
                }
                if (newLine !== undefined && newLine) {
                    csvNewLine = newLine;
                }
                var csvData = dataToCSV(dataSource);
                var hrefvalue = uri.csv + '77u/' + base64.encode(csvData);
                if (anchor) {
                    anchor.href = hrefvalue;
                }
                return true;
            }
        };

        return ee;
    });