define([
    './base',
    '../utils/objects-are-equal'
],function (BaseStore, objectsAreEqual) {

    'use strict';

    var computed = Ember.computed,
        getOwner = Ember.getOwner,
        bind = Ember.bind;

    return BaseStore.extend({
        _isFastBoot: computed(function () {
            var fastboot = getOwner(this).lookup('service:fastboot');

            return fastboot ? fastboot.get('isFastBoot') : false;
        }),

        /**
         The `localStorage` key the store persists data in.
         @property key
         @type String
         @default 'ember_simple_auth-session'
         @public
         */
        key: 'ember_simple_auth-session',

        init: function init() {
            this._super.apply(this, arguments);

            if (!this.get('_isFastBoot')) {
                window.addEventListener('storage', bind(this, this._handleStorageEvent));
            }
        },
        willDestroy: function willDestroy() {
            if (!this.get('_isFastBoot')) {
                window.removeEventListener('storage', bind(this, this._handleStorageEvent));
            }
        },


        /**
         Persists the `data` in the `localStorage`.
         @method persist
         @param {Object} data The data to persist
         @return {Ember.RSVP.Promise} A promise that resolves when the data has successfully been persisted and rejects otherwise.
         @public
         */
        persist: function persist(data) {
            this._lastData = data;
            data = JSON.stringify(data || {});
            localStorage.setItem(this.key, data);

            return _rsvp2.default.resolve();
        },


        /**
         Returns all data currently stored in the `localStorage` as a plain object.
         @method restore
         @return {Ember.RSVP.Promise} A promise that resolves with the data currently persisted in the store when the data has been restored successfully and rejects otherwise.
         @public
         */
        restore: function restore() {
            var data = localStorage.getItem(this.key);

            return _rsvp2.default.resolve(JSON.parse(data) || {});
        },


        /**
         Clears the store by deleting the
         {{#crossLink "LocalStorageStore/key:property"}}{{/crossLink}} from
         `localStorage`.
         @method clear
         @return {Ember.RSVP.Promise} A promise that resolves when the store has been cleared successfully and rejects otherwise.
         @public
         */
        clear: function clear() {
            localStorage.removeItem(this.key);
            this._lastData = {};

            return _rsvp2.default.resolve();
        },
        _handleStorageEvent: function _handleStorageEvent(e) {
            var _this = this;

            if (e.key === this.get('key')) {
                this.restore().then(function (data) {
                    if (!objectsAreEqual(data, _this._lastData)) {
                        _this._lastData = data;
                        _this.trigger('sessionDataUpdated', data);
                    }
                });
            }
        }
    });
});
