define(function() {

    'use strict';

    var computed = Ember.computed,
        reads = Ember.computed.reads,
        isNone = Ember.isNone,
        typeOf = Ember.typeOf,
        isPresent = Ember.isPresent,
        isEmpty = Ember.isEmpty,
        assert = Ember.assert,
        A = Ember.A,
        getOwner = Ember.getOwner,
        Service = Ember.Service,
        merge = Ember.merge,
        keys = Object.keys;

    var _slicedToArray = (function() {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e;
            var _i;
            try {
                for (_i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);
                    if (i && _arr.length === i) {
                        break;
                    }
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"]) {
                        _i["return"]();
                    }
                } finally {
                    if (_d) {
                        throw _e;
                    }
                }
            }
            return _arr;
        }
        return function(arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    })();

    return Service.extend({
        _isFastBoot: reads('_fastBoot.isFastBoot'),

        _fastBoot: computed(function() {
            var owner = getOwner(this);

            return owner.lookup('service:fastboot');
        }),

        _document: computed(function() {
            return document;
        }),

        _documentCookies: computed(function() {
            var all = this.get('_document.cookie').split(';');
            var filtered = this._filterDocumentCookies(all);

            return filtered.reduce(function(acc, cookie) {
                if (!isEmpty(cookie)) {
                    var _cookie = _slicedToArray(cookie, 2),
                        key = _cookie[0],
                        value = _cookie[1];

                    acc[key.trim()] = value.trim();
                }
                return acc;
            }, {});
        }).volatile(),

        _fastBootCookies: computed(function() {
            var fastBootCookiesCache = this.get('_fastBootCookiesCache');

            if (!fastBootCookiesCache) {
                var fastBootCookies = this.get('_fastBoot.request.cookies');
                fastBootCookiesCache = keys(fastBootCookies).reduce(function(acc, name) {
                    var value = fastBootCookies[name];
                    acc[name] = {
                        value: value
                    };
                    return acc;
                }, {});
                this.set('_fastBootCookiesCache', fastBootCookiesCache);
            }

            return this._filterCachedFastBootCookies(fastBootCookiesCache);
        }).volatile(),

        read: function read(name) {
            var _this = this;

            var all = void 0;
            if (this.get('_isFastBoot')) {
                all = this.get('_fastBootCookies');
            } else {
                all = this.get('_documentCookies');
            }

            if (name) {
                return this._decodeValue(all[name]);
            } else {
                keys(all).forEach(function(name) {
                    return (all[name] = _this._decodeValue(all[name]));
                });
                return all;
            }
        },
        write: function write(name, value) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            assert('Cookies cannot be set to be HTTP-only as those cookies would not be accessible by the Ember.js application itself when running in the browser!', !options.httpOnly);
            assert("Cookies cannot be set as signed as signed cookies would not be modifyable in the browser as it has no knowledge of the express server's signing key!", !options.signed);
            assert('Cookies cannot be set with both maxAge and an explicit expiration time!', isEmpty(options.expires) || isEmpty(options.maxAge));
            value = this._encodeValue(value);

            if (this.get('_isFastBoot')) {
                this._writeFastBootCookie(name, value, options);
            } else {
                this._writeDocumentCookie(name, value, options);
            }
        },
        clear: function clear(name) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            assert('Expires or Max-Age options cannot be set when clearing cookies', isEmpty(options.expires) && isEmpty(options.maxAge));

            options.expires = new Date('1970-01-01');
            this.write(name, null, options);
        },
        _writeDocumentCookie: function _writeDocumentCookie(name, value) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var serializedCookie = this._serializeCookie(name, value, options);
            this.set('_document.cookie', serializedCookie);
        },
        _writeFastBootCookie: function _writeFastBootCookie(name, value) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var responseHeaders = this.get('_fastBoot.response.headers');
            var serializedCookie = this._serializeCookie.apply(this, arguments);

            if (!isEmpty(options.maxAge)) {
                options.maxAge *= 1000;
            }

            this._cacheFastBootCookie.apply(this, arguments);

            responseHeaders.append('set-cookie', serializedCookie);
        },
        _cacheFastBootCookie: function _cacheFastBootCookie(name, value) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var fastBootCache = this.getWithDefault('_fastBootCookiesCache', {});
            var cachedOptions = merge({}, options);

            if (cachedOptions.maxAge) {
                var expires = new Date();
                expires.setSeconds(expires.getSeconds() + options.maxAge);
                cachedOptions.expires = expires;
                delete cachedOptions.maxAge;
            }

            fastBootCache[name] = {
                value: value,
                options: cachedOptions
            };
            this.set('_fastBootCookiesCache', fastBootCache);
        },
        _filterCachedFastBootCookies: function _filterCachedFastBootCookies(fastBootCookiesCache) {
            var _get = this.get('_fastBoot.request'),
                requestPath = _get.path,
                protocol = _get.protocol;

            // cannot use deconstruct here


            var host = this.get('_fastBoot.request.host');

            return keys(fastBootCookiesCache).reduce(function(acc, name) {
                var _fastBootCookiesCache = fastBootCookiesCache[name],
                    value = _fastBootCookiesCache.value,
                    options = _fastBootCookiesCache.options;

                options = options || {};

                var _options = options,
                    optionsPath = _options.path,
                    domain = _options.domain,
                    expires = _options.expires,
                    secure = _options.secure;


                if (optionsPath && requestPath.indexOf(optionsPath) !== 0) {
                    return acc;
                }

                if (domain && host.indexOf(domain) + domain.length !== host.length) {
                    return acc;
                }

                if (expires && expires < new Date()) {
                    return acc;
                }

                if (secure && protocol !== 'https') {
                    return acc;
                }

                acc[name] = value;
                return acc;
            }, {});
        },
        _encodeValue: function _encodeValue(value) {
            if (isNone(value)) {
                return '';
            } else {
                return encodeURIComponent(value);
            }
        },
        _decodeValue: function _decodeValue(value) {
            if (isNone(value)) {
                return value;
            } else {
                return decodeURIComponent(value);
            }
        },
        _filterDocumentCookies: function _filterDocumentCookies(unfilteredCookies) {
            return unfilteredCookies.map(function(c) {
                return c.split('=');
            }).filter(function(c) {
                return isPresent(c[0]) && isPresent(c[1]);
            });
        },
        _serializeCookie: function _serializeCookie(name, value) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var cookie = name + '=' + value;

            if (!isEmpty(options.domain)) {
                cookie = cookie + '; domain=' + options.domain;
            }
            if (typeOf(options.expires) === 'date') {
                cookie = cookie + '; expires=' + options.expires.toUTCString();
            }
            if (!isEmpty(options.maxAge)) {
                cookie = cookie + '; max-age=' + options.maxAge;
            }
            if (options.secure) {
                cookie = cookie + '; secure';
            }
            if (!isEmpty(options.path)) {
                cookie = cookie + '; path=' + options.path;
            }

            return cookie;
        }
    });
});
