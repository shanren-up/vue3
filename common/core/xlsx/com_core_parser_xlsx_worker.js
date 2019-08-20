/* jshint worker:true */
(function() {
    'use strict';
    importScripts('../../../lib/xlsx/dist/xlsx.core.min.js');
    postMessage({
        title: 'ready'
    });

    function ab2str(data) {
        var o = '',
            i = 0,
            w = 10240;
        for (var l = data.byteLength / w; i < l; ++i) {
            o += String.fromCharCode.apply(null, new self.Uint8Array(data.slice(i * w, i * w + w)));
        }
        o += String.fromCharCode.apply(null, new self.Uint8Array(data.slice(i * w)));
        return o;
    }

    function s2ab(s) {
        var b = new self.ArrayBuffer(s.length * 2),
            v = new self.Uint16Array(b);
        for (var i = 0; i !== s.length; ++i) {
            v[i] = s.charCodeAt(i);
        }
        return [v, b];
    }

    self.onmessage = function(oEvent) {
        var workbook, out, result = {};
        try {
            workbook = self.XLSX.read(self.btoa(ab2str(oEvent.data)), {
                type: 'base64'
            });
            workbook.SheetNames.forEach(function(val) {
                var sheetArr = self.XLSX.utils.sheet_to_row_object_array(workbook.Sheets[val]);
                if (sheetArr.length) {
                    result[val] = sheetArr;
                }
            });
        } catch (e) {
            postMessage({
                title: 'error',
                detail: e.stack || e
            });
        }
        out = {
            title: 'done',
            detail: JSON.stringify(result)
        };
        postMessage(out);
        //引用传递，大数据量时提高性能，测试40k行的xlsx因为要加一次转换反而更慢了。
        //out = s2ab(out.detail)[1];
        //postMessage(out, [out]);
    };
})();
