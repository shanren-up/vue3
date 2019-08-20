define([
    './base',
    './local-storage',
    './cookie'
], function(Base, LocalStorage, Cookie) {

    "use strict";

    var computed = Ember.computed,
        service = Ember.inject.service,
        getOwner = Ember.getOwner;

    var LOCAL_STORAGE_TEST_KEY = '_ember_simple_auth_test_key';

    var proxyToInternalStore = function proxyToInternalStore() {
        return computed({
            get: function get(key) {
                return this.get('_' + key);
            },
            set: function set(key, value) {
                this.set('_' + key, value);
                var _store = this.get('_store');
                if (_store) {
                    _store.set(key, value);
                }
                return value;
            }
        });
    };

    return Base.extend({

        localStorageKey: 'ember_simple_auth-session',

        _cookieDomain: null,
        cookieDomain: proxyToInternalStore(),

        _cookieName: 'ember_simple_auth-session',
        cookieName: proxyToInternalStore(),

        _cookiePath: '/',
        cookiePath: proxyToInternalStore(),

        _cookieExpirationTime: null,
        cookieExpirationTime: proxyToInternalStore(),

        _cookies: service('cookies'),

        _fastboot: computed(function() {
            var owner = getOwner(this);

            return owner && owner.lookup('service:fastboot');
        }),

        _isLocalStorageAvailable: computed(function() {
            try {
                localStorage.setItem(LOCAL_STORAGE_TEST_KEY, true);
                localStorage.removeItem(LOCAL_STORAGE_TEST_KEY);
                return true;
            } catch (e) {
                return false;
            }
        }),

        init: function init() {
            this._super.apply(this, arguments);

            var store = void 0;
            if (this.get('_isLocalStorageAvailable')) {
                var options = {
                    key: this.get('localStorageKey')
                };
                options._isFastBoot = false;
                store = this._createStore(LocalStorage, options);
            } else {
                var _options = this.getProperties('cookieDomain', 'cookieName', 'cookieExpirationTime', 'cookiePath');
                _options._fastboot = this.get('_fastboot');
                _options._cookies = this.get('_cookies');

                store = this._createStore(Cookie, _options);
                this.set('cookieExpirationTime', store.get('cookieExpirationTime'));
            }
            this.set('_store', store);
        },

        _createStore: function _createStore(storeType, options) {
            var _this = this;

            var store = storeType.create(options);

            store.on('sessionDataUpdated', function(data) {
                _this.trigger('sessionDataUpdated', data);
            });
            return store;
        },

        persist: function persist() {
            var _get;

            return (_get = this.get('_store')).persist.apply(_get, arguments);
        },

        restore: function restore() {
            return this.get('_store').restore();
        },

        clear: function clear() {
            return this.get('_store').clear();
        }
    });
});