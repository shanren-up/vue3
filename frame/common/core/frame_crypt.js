define(
    [

    ],

    function() {

        "use strict";

        var frameCrypt = Ember.Object.extend({
            pchDefKey: "!#&<>_|~",
            init: function() {
                this.set('pchDefKey', this.str2ByteArray(this.pchDefKey));
            },
            generateKey: function() {
                var key = new Array(8);
                for (var i = 0; i < key.length; i++) {
                    key[i] = Math.ceil(Math.random(Date.now()) * 255);
                }
                return key;
            },
            encode: function(strToEncode) {
                // 生成临时密钥
                var tmpKey = this.generateKey();
                // 用缺省的密钥对临时密钥进行加密
                var keyEncoded = this._encode(tmpKey, this.pchDefKey);
                // 用临时密钥对原始字符串进行加密
                var orgStrEncoded = this._encode(this.str2ByteArray(strToEncode), tmpKey);
                // 最终加密的字串是：加密后的临时密钥+加密后的字符串
                return this.byteArray2Str(keyEncoded) + this.byteArray2Str(orgStrEncoded);
            },
            _encode: function(toEncode, key) {

                var nLen = 0,
                    nKeyLen = 0,
                    i = 0,
                    j = 0;

                nLen = toEncode.length;
                nKeyLen = key.length;

                var encodedValue = new Array(nLen * 2);
                for (i = 0, j = 0; i < nLen; i++) {
                    var ch = toEncode[i];
                    ch += key[i % nKeyLen];
                    encodedValue[j++] = (this.byte2Hex(((ch >> 4) & 15)) & 0xFF);
                    encodedValue[j++] = (this.byte2Hex((ch & 15)) & 0xFF);
                }

                return encodedValue;
            },
            decode: function(strOrgEncoded) {
                if (this.isValidEncodeString(strOrgEncoded)) {
                    return strOrgEncoded;
                }

                var strDecoded = '';

                var allEncoded = this.str2ByteArray(strOrgEncoded);
                var encodedKey = new Array(16);
                var strEncoded = new Array(allEncoded.length - 16);
                for (var i = 0; i < allEncoded.length; i++) {
                    if (i < 16) {
                        encodedKey[i] = allEncoded[i];
                    } else {
                        strEncoded[i - 16] = allEncoded[i];
                    }
                }

                // 先用缺省密钥解密临时密钥
                var tmpEncoded = this._decode(encodedKey, this.pchDefKey);

                // 用解密后的临时密钥解密真正的字串
                var str = this._decode(strEncoded, tmpEncoded);

                strDecoded = this.byteArray2Str(str);
                return strDecoded;
            },
            _decode: function(encoded, key) {
                var nLen = 0;
                var nKeyLen = 0;
                var i = 0,
                    j = 0;
                nLen = encoded.length;
                nKeyLen = key.length;
                var decoded = new Array(nLen / 2 | 0);
                i = 0;
                j = 0;
                for (i = 0, j = 0; i < nLen; i += 2) {
                    var ch = ((((this.hex2Char((encoded[i] & 0xFFFF)) << 4) & 240) | this.hex2Char((encoded[i + 1] & 0xFFFF))) & 0xFF);
                    var chK = key[j % nKeyLen];
                    ch -= chK;
                    ch &= 0xFF;
                    decoded[j] = ch;
                    j++;
                }
                return decoded;
            },
            str2ByteArray: function(str) {
                var pos = 0;

                var len = str.length;

                var hexA = [];

                for (var i = 0; i < len; i++) {
                    try {
                        var s = str.charCodeAt(i);

                        var v = parseInt(s, 10);

                        hexA.push(v);
                    } catch (e) {
                        var i = 0;
                    }

                }

                return hexA;
            },
            byteArray2Str: function(bytes) {
                var str = "";

                for (var i = 0; i < bytes.length; i++) {
                    var tmp = String.fromCharCode(bytes[i]);
                    str += tmp;
                }

                return str;
            },
            byte2Hex: function(k) {
                if (k > 9) {
                    k = k - 10 + 65 /*'A'*/ ;
                } else {
                    k |= 48;
                }
                return (k & 0xFFFF);
            },
            hex2Char: function(h) {
                if (h < 65 /*'A'*/ ) {
                    h -= 48;
                } else {
                    h = ((h + 10 - 65 /*'A'*/ ) & 0xFFFF);
                }
                return h;
            },
            isValidEncodeString: function(str) {
                if (str === null || str.length < 16) {
                    return true;
                }
                for (var i = 0, length = str.length; i < length; i++) {
                    var ch = str.charCodeAt(i);
                    if (!((ch >= 48 && ch <= 57 /*'0''9'*/ ) || (ch >= 65 && ch <= 70 /*'A''F'*/ ))) {
                        return true;
                    }
                }
                return false;
            },
            decodeAndAutoCheck: function(strToDecode) {
                if (this.isValidEncodeString(strToDecode)) {
                    return strToDecode;
                }
                var strDecoded = this.decode(strToDecode);
                if (!strDecoded) {
                    return strToDecode;
                }
                return strDecoded;
            }

        });

        return frameCrypt.create();
    });