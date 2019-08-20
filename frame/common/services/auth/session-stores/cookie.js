define([
    './base',
    '../utils/objects-are-equal'
], function(BaseStore, objectsAreEqual) {

    'use strict';

    var RSVP = Ember.RSVP,
        computed = Ember.computed,
        service = Ember.inject.service,
        _Ember$run = Ember.run,
        next = _Ember$run.next,
        scheduleOnce = _Ember$run.scheduleOnce,
        cancel = _Ember$run.cancel,
        later = _Ember$run.later,
        isEmpty = Ember.isEmpty,
        typeOf = Ember.typeOf,
        testing = Ember.testing,
        isPresent = Ember.isPresent,
        A = Ember.A,
        getOwner = Ember.getOwner,
        warn = Ember.warn;

    var persistingProperty = function persistingProperty() {
        var beforeSet = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function() {};

        return computed({
            get: function get(key) {
                return this.get('_' + key);
            },
            set: function set(key, value) {
                beforeSet.apply(this, [key, value]);
                this.set('_' + key, value);
                scheduleOnce('actions', this, this.rewriteCookie);
                return value;
            }
        });
    };

    return BaseStore.extend({
        _syncDataTimeout: null,
        _renewExpirationTimeout: null,

        _cookieDomain: null,
        cookieDomain: persistingProperty(),

        _cookieName: 'immp-auth-session',
        cookieName: persistingProperty(function() {
            this._oldCookieName = this._cookieName;
        }),

        _cookiePath: '/',
        cookiePath: persistingProperty(),

        _cookieExpirationTime: null,
        cookieExpirationTime: persistingProperty(function(key, value) {
            if (value < 90) {
                this._warn('The recommended minimum value for `cookieExpirationTime` is 90 seconds. If your value is less than that, the cookie may expire before its expiration time is extended (expiration time is extended every 60 seconds).', false, {
                    id: 'ember-simple-auth.cookieExpirationTime'
                });
            }
        }),

        _cookies: service('cookies'),

        _fastboot: computed(function() {
            var owner = getOwner(this);

            return owner && owner.lookup('service:fastboot');
        }),

        _secureCookies: computed(function() {
            if (this.get('_fastboot.isFastBoot')) {
                return this.get('_fastboot.request.protocol') === 'https';
            }

            return window.location.protocol === 'https:';
        }).volatile(),

        _isPageVisible: computed(function() {
            if (this.get('_fastboot.isFastBoot')) {
                return false;
            } else {
                var visibilityState = typeof document !== 'undefined' ? document.visibilityState || 'visible' : false;
                return visibilityState === 'visible';
            }
        }).volatile(),

        init: function init() {
            var _this = this;

            this._super.apply(this, arguments);

            var cachedExpirationTime = this._read(this.get('cookieName') + '-expiration_time');
            if (cachedExpirationTime) {
                this.set('cookieExpirationTime', parseInt(cachedExpirationTime, 10));
            }

            if (!this.get('_fastboot.isFastBoot')) {
                next(function() {
                    _this._syncData().then(function() {
                        _this._renewExpiration();
                    });
                });
            } else {
                this._renew();
            }
        },

        persist: function persist(data) {
            this._lastData = data;
            data = JSON.stringify(data || {});
            var expiration = this._calculateExpirationTime();
            this._write(data, expiration);
            return RSVP.resolve();
        },


        /**
         Returns all data currently stored in the cookie as a plain object.
         @method restore
         @return {Ember.RSVP.Promise} A promise that resolves with the data currently persisted in the store when the data has been restored successfully and rejects otherwise.
         @public
         */
        restore: function restore() {
            var data = this._read(this.get('cookieName'));
            if (isEmpty(data)) {
                return RSVP.resolve({});
            } else {
                return RSVP.resolve(JSON.parse(data));
            }
        },


        /**
         Clears the store by deleting the cookie.
         @method clear
         @return {Ember.RSVP.Promise} A promise that resolves when the store has been cleared successfully and rejects otherwise.
         @public
         */
        clear: function clear() {
            this._write('', 0);
            this._lastData = {};
            return RSVP.resolve();
        },
        _read: function _read(name) {
            return this.get('_cookies').read(name) || '';
        },
        _calculateExpirationTime: function _calculateExpirationTime() {
            var cachedExpirationTime = this._read(this.get('cookieName') + '-expiration_time');
            cachedExpirationTime = cachedExpirationTime ? new Date().getTime() + cachedExpirationTime * 1000 : null;
            return this.get('cookieExpirationTime') ? new Date().getTime() + this.get('cookieExpirationTime') * 1000 : cachedExpirationTime;
        },
        _write: function _write(value, expiration) {
            var _this = this;

            var cookieOptions = {
                domain: this.get('cookieDomain'),
                expires: isEmpty(expiration) ? null : new Date(expiration),
                path: this.get('cookiePath'),
                secure: this.get('_secureCookies')
            };
            if (this._oldCookieName) {
                [this._oldCookieName, this._oldCookieName + '-expiration_time'].forEach(function(oldCookie) {
                    _this.get('_cookies').clear(oldCookie);
                });
                delete this._oldCookieName;
            }
            this.get('_cookies').write(this.get('cookieName'), value, cookieOptions);
            if (!isEmpty(expiration)) {
                var expirationCookieName = this.get('cookieName') + '-expiration_time';
                var cachedExpirationTime = this.get('_cookies').read(expirationCookieName);
                this.get('_cookies').write(expirationCookieName, this.get('cookieExpirationTime') || cachedExpirationTime, cookieOptions);
            }
        },
        _syncData: function _syncData() {
            var _this = this;

            return this.restore().then(function(data) {
                if (!objectsAreEqual(data, _this._lastData)) {
                    _this._lastData = data;
                    _this.trigger('sessionDataUpdated', data);
                }
                if (!testing) {
                    cancel(_this._syncDataTimeout);
                    _this._syncDataTimeout = later(_this, _this._syncData, 500);
                }
            });
        },
        _renew: function _renew() {
            var _this = this;

            return this.restore().then(function(data) {
                if (!isEmpty(data) && data !== {}) {
                    data = typeOf(data) === 'string' ? data : JSON.stringify(data || {});
                    var expiration = _this._calculateExpirationTime();
                    _this._write(data, expiration);
                }
            });
        },
        _renewExpiration: function _renewExpiration() {
            if (!testing) {
                cancel(this._renewExpirationTimeout);
                this._renewExpirationTimeout = later(this, this._renewExpiration, 60000);
            }
            if (this.get('_isPageVisible')) {
                return this._renew();
            } else {
                return RSVP.resolve();
            }
        },
        rewriteCookie: function rewriteCookie() {
            // if `cookieName` has not been renamed, `oldCookieName` will be nil
            var cookieName = this._oldCookieName || this._cookieName;
            var data = this._read(cookieName);
            if (isPresent(data)) {
                var expiration = this._calculateExpirationTime();
                this._write(data, expiration);
            }
        },
        _warn: function _warn() {
            warn.apply(undefined, arguments);
        }
    });
});