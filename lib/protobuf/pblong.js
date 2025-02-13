/*
 long.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
 Released under the Apache License, Version 2.0
 see: https://github.com/dcodeIO/long.js for details
*/
(function (d, g) {
    "function" === typeof define && define.amd ? define([], g) : "function" === typeof require && "object" === typeof module && module && module.exports ? module.exports = g() : (d.dcodeIO = d.dcodeIO || {}).Long = g()
})(this, function () {
    function d(a, b, c) {
        this.low = a | 0;
        this.high = b | 0;
        this.unsigned = !!c
    }

    function g(a) {
        return !0 === (a && a.__isLong__)
    }

    function m(a, b) {
        var c, t;
        if (b) {
            a >>>= 0;
            if (t = 0 <= a && 256 > a)
                if (c = z[a]) return c;
            c = e(a, 0 > (a | 0) ? -1 : 0, !0);
            t && (z[a] = c)
        } else {
            a |= 0;
            if (t = -128 <= a && 128 > a)
                if (c = A[a]) return c;
            c = e(a, 0 > a ? -1 : 0, !1);
            t &&
                (A[a] = c)
        }
        return c
    }

    function n(a, b) {
        if (isNaN(a) || !isFinite(a)) return b ? p : k;
        if (b) {
            if (0 > a) return p;
            if (a >= B) return C
        } else {
            if (a <= -D) return l;
            if (a + 1 >= D) return E
        }
        return 0 > a ? n(-a, b).neg() : e(a % 4294967296 | 0, a / 4294967296 | 0, b)
    }

    function e(a, b, c) {
        return new d(a, b, c)
    }

    function x(a, b, c) {
        if (0 === a.length) throw Error("empty string");
        if ("NaN" === a || "Infinity" === a || "+Infinity" === a || "-Infinity" === a) return k;
        "number" === typeof b ? (c = b, b = !1) : b = !!b;
        c = c || 10;
        if (2 > c || 36 < c) throw RangeError("radix");
        var t;
        if (0 < (t = a.indexOf("-"))) throw Error("interior hyphen");
        if (0 === t) return x(a.substring(1), b, c).neg();
        t = n(v(c, 8));
        for (var e = k, f = 0; f < a.length; f += 8) {
            var d = Math.min(8, a.length - f),
                g = parseInt(a.substring(f, f + d), c);
            8 > d ? (d = n(v(c, d)), e = e.mul(d).add(n(g))) : (e = e.mul(t), e = e.add(n(g)))
        }
        e.unsigned = b;
        return e
    }

    function q(a) {
        return a instanceof d ? a : "number" === typeof a ? n(a) : "string" === typeof a ? x(a) : e(a.low, a.high, a.unsigned)
    }
    Object.defineProperty(d.prototype, "__isLong__", {
        value: !0,
        enumerable: !1,
        configurable: !1
    });
    d.isLong = g;
    var A = {},
        z = {};
    d.fromInt = m;
    d.fromNumber = n;
    d.fromBits =
        e;
    var v = Math.pow;
    d.fromString = x;
    d.fromValue = q;
    var B = 4294967296 * 4294967296,
        D = B / 2,
        F = m(16777216),
        k = m(0);
    d.ZERO = k;
    var p = m(0, !0);
    d.UZERO = p;
    var r = m(1);
    d.ONE = r;
    var G = m(1, !0);
    d.UONE = G;
    var y = m(-1);
    d.NEG_ONE = y;
    var E = e(-1, 2147483647, !1);
    d.MAX_VALUE = E;
    var C = e(-1, -1, !0);
    d.MAX_UNSIGNED_VALUE = C;
    var l = e(0, -2147483648, !1);
    d.MIN_VALUE = l;
    var b = d.prototype;
    b.toInt = function () {
        return this.unsigned ? this.low >>> 0 : this.low
    };
    b.toNumber = function () {
        return this.unsigned ? 4294967296 * (this.high >>> 0) + (this.low >>> 0) : 4294967296 * this.high +
            (this.low >>> 0)
    };
    b.toString = function (a) {
        a = a || 10;
        if (2 > a || 36 < a) throw RangeError("radix");
        if (this.isZero()) return "0";
        if (this.isNegative()) {
            if (this.eq(l)) {
                var b = n(a),
                    c = this.div(b),
                    b = c.mul(b).sub(this);
                return c.toString(a) + b.toInt().toString(a)
            }
            return "-" + this.neg().toString(a)
        }
        for (var c = n(v(a, 6), this.unsigned), b = this, e = "";;) {
            var d = b.div(c),
                f = (b.sub(d.mul(c)).toInt() >>> 0).toString(a),
                b = d;
            if (b.isZero()) return f + e;
            for (; 6 > f.length;) f = "0" + f;
            e = "" + f + e
        }
    };
    b.getHighBits = function () {
        return this.high
    };
    b.getHighBitsUnsigned =
        function () {
            return this.high >>> 0
        };
    b.getLowBits = function () {
        return this.low
    };
    b.getLowBitsUnsigned = function () {
        return this.low >>> 0
    };
    b.getNumBitsAbs = function () {
        if (this.isNegative()) return this.eq(l) ? 64 : this.neg().getNumBitsAbs();
        for (var a = 0 != this.high ? this.high : this.low, b = 31; 0 < b && 0 == (a & 1 << b); b--);
        return 0 != this.high ? b + 33 : b + 1
    };
    b.isZero = function () {
        return 0 === this.high && 0 === this.low
    };
    b.isNegative = function () {
        return !this.unsigned && 0 > this.high
    };
    b.isPositive = function () {
        return this.unsigned || 0 <= this.high
    };
    b.isOdd =
        function () {
            return 1 === (this.low & 1)
        };
    b.isEven = function () {
        return 0 === (this.low & 1)
    };
    b.equals = function (a) {
        g(a) || (a = q(a));
        return this.unsigned !== a.unsigned && 1 === this.high >>> 31 && 1 === a.high >>> 31 ? !1 : this.high === a.high && this.low === a.low
    };
    b.eq = b.equals;
    b.notEquals = function (a) {
        return !this.eq(a)
    };
    b.neq = b.notEquals;
    b.lessThan = function (a) {
        return 0 > this.comp(a)
    };
    b.lt = b.lessThan;
    b.lessThanOrEqual = function (a) {
        return 0 >= this.comp(a)
    };
    b.lte = b.lessThanOrEqual;
    b.greaterThan = function (a) {
        return 0 < this.comp(a)
    };
    b.gt = b.greaterThan;
    b.greaterThanOrEqual = function (a) {
        return 0 <= this.comp(a)
    };
    b.gte = b.greaterThanOrEqual;
    b.compare = function (a) {
        g(a) || (a = q(a));
        if (this.eq(a)) return 0;
        var b = this.isNegative(),
            c = a.isNegative();
        return b && !c ? -1 : !b && c ? 1 : this.unsigned ? a.high >>> 0 > this.high >>> 0 || a.high === this.high && a.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(a).isNegative() ? -1 : 1
    };
    b.comp = b.compare;
    b.negate = function () {
        return !this.unsigned && this.eq(l) ? l : this.not().add(r)
    };
    b.neg = b.negate;
    b.add = function (a) {
        g(a) || (a = q(a));
        var b = this.high >>> 16,
            c = this.high & 65535,
            d = this.low >>> 16,
            l = a.high >>> 16,
            f = a.high & 65535,
            n = a.low >>> 16,
            k;
        k = 0 + ((this.low & 65535) + (a.low & 65535));
        a = 0 + (k >>> 16);
        a += d + n;
        d = 0 + (a >>> 16);
        d += c + f;
        c = 0 + (d >>> 16);
        c = c + (b + l) & 65535;
        return e((a & 65535) << 16 | k & 65535, c << 16 | d & 65535, this.unsigned)
    };
    b.subtract = function (a) {
        g(a) || (a = q(a));
        return this.add(a.neg())
    };
    b.sub = b.subtract;
    b.multiply = function (a) {
        if (this.isZero()) return k;
        g(a) || (a = q(a));
        if (a.isZero()) return k;
        if (this.eq(l)) return a.isOdd() ? l : k;
        if (a.eq(l)) return this.isOdd() ? l : k;
        if (this.isNegative()) return a.isNegative() ?
            this.neg().mul(a.neg()) : this.neg().mul(a).neg();
        if (a.isNegative()) return this.mul(a.neg()).neg();
        if (this.lt(F) && a.lt(F)) return n(this.toNumber() * a.toNumber(), this.unsigned);
        var b = this.high >>> 16,
            c = this.high & 65535,
            d = this.low >>> 16,
            w = this.low & 65535,
            f = a.high >>> 16,
            m = a.high & 65535,
            p = a.low >>> 16;
        a = a.low & 65535;
        var u, h, s, r;
        r = 0 + w * a;
        s = 0 + (r >>> 16);
        s += d * a;
        h = 0 + (s >>> 16);
        s = (s & 65535) + w * p;
        h += s >>> 16;
        s &= 65535;
        h += c * a;
        u = 0 + (h >>> 16);
        h = (h & 65535) + d * p;
        u += h >>> 16;
        h &= 65535;
        h += w * m;
        u += h >>> 16;
        h &= 65535;
        u = u + (b * a + c * p + d * m + w * f) & 65535;
        return e(s <<
            16 | r & 65535, u << 16 | h, this.unsigned)
    };
    b.mul = b.multiply;
    b.divide = function (a) {
        g(a) || (a = q(a));
        if (a.isZero()) throw Error("division by zero");
        if (this.isZero()) return this.unsigned ? p : k;
        var b, c, d;
        if (this.unsigned) {
            a.unsigned || (a = a.toUnsigned());
            if (a.gt(this)) return p;
            if (a.gt(this.shru(1))) return G;
            d = p
        } else {
            if (this.eq(l)) {
                if (a.eq(r) || a.eq(y)) return l;
                if (a.eq(l)) return r;
                b = this.shr(1).div(a).shl(1);
                if (b.eq(k)) return a.isNegative() ? r : y;
                c = this.sub(a.mul(b));
                return d = b.add(c.div(a))
            }
            if (a.eq(l)) return this.unsigned ?
                p : k;
            if (this.isNegative()) return a.isNegative() ? this.neg().div(a.neg()) : this.neg().div(a).neg();
            if (a.isNegative()) return this.div(a.neg()).neg();
            d = k
        }
        for (c = this; c.gte(a);) {
            b = Math.max(1, Math.floor(c.toNumber() / a.toNumber()));
            for (var e = Math.ceil(Math.log(b) / Math.LN2), e = 48 >= e ? 1 : v(2, e - 48), f = n(b), m = f.mul(a); m.isNegative() || m.gt(c);) b -= e, f = n(b, this.unsigned), m = f.mul(a);
            f.isZero() && (f = r);
            d = d.add(f);
            c = c.sub(m)
        }
        return d
    };
    b.div = b.divide;
    b.modulo = function (a) {
        g(a) || (a = q(a));
        return this.sub(this.div(a).mul(a))
    };
    b.mod = b.modulo;
    b.not = function () {
        return e(~this.low, ~this.high, this.unsigned)
    };
    b.and = function (a) {
        g(a) || (a = q(a));
        return e(this.low & a.low, this.high & a.high, this.unsigned)
    };
    b.or = function (a) {
        g(a) || (a = q(a));
        return e(this.low | a.low, this.high | a.high, this.unsigned)
    };
    b.xor = function (a) {
        g(a) || (a = q(a));
        return e(this.low ^ a.low, this.high ^ a.high, this.unsigned)
    };
    b.shiftLeft = function (a) {
        g(a) && (a = a.toInt());
        return 0 === (a &= 63) ? this : 32 > a ? e(this.low << a, this.high << a | this.low >>> 32 - a, this.unsigned) : e(0, this.low << a - 32, this.unsigned)
    };
    b.shl = b.shiftLeft;
    b.shiftRight = function (a) {
        g(a) && (a = a.toInt());
        return 0 === (a &= 63) ? this : 32 > a ? e(this.low >>> a | this.high << 32 - a, this.high >> a, this.unsigned) : e(this.high >> a - 32, 0 <= this.high ? 0 : -1, this.unsigned)
    };
    b.shr = b.shiftRight;
    b.shiftRightUnsigned = function (a) {
        g(a) && (a = a.toInt());
        a &= 63;
        if (0 === a) return this;
        var b = this.high;
        return 32 > a ? e(this.low >>> a | b << 32 - a, b >>> a, this.unsigned) : 32 === a ? e(b, 0, this.unsigned) : e(b >>> a - 32, 0, this.unsigned)
    };
    b.shru = b.shiftRightUnsigned;
    b.toSigned = function () {
        return this.unsigned ?
            e(this.low, this.high, !1) : this
    };
    b.toUnsigned = function () {
        return this.unsigned ? this : e(this.low, this.high, !0)
    };
    b.toBytes = function (a) {
        return a ? this.toBytesLE() : this.toBytesBE()
    };
    b.toBytesLE = function () {
        var a = this.high,
            b = this.low;
        return [b & 255, b >>> 8 & 255, b >>> 16 & 255, b >>> 24 & 255, a & 255, a >>> 8 & 255, a >>> 16 & 255, a >>> 24 & 255]
    };
    b.toBytesBE = function () {
        var a = this.high,
            b = this.low;
        return [a >>> 24 & 255, a >>> 16 & 255, a >>> 8 & 255, a & 255, b >>> 24 & 255, b >>> 16 & 255, b >>> 8 & 255, b & 255]
    };
    return d
});