define([
    './base'
], function (BaseAuthenticator) {

    'use strict';

    var RSVP = Ember.RSVP,
        isEmpty = Ember.isEmpty;

    return BaseAuthenticator.extend({

        restore: function restore(data) {
            var _this = this;

            return new RSVP.Promise(function (resolve, reject) {
                if (!_this._validateData(data)) {
                    return reject('Could not restore session - "access_token" missing.');
                }

                return resolve(data);
            });
        },


        authenticate: function authenticate(hash) {
            var _this = this;

            return new RSVP.Promise(function (resolve, reject) {
                if (hash.error) {
                    reject(hash.error);
                } else if (!_this._validateData(hash)) {
                    reject('Invalid auth params - "access_token" missing.');
                } else {
                    resolve(hash);
                }
            });
        },

        invalidate: function invalidate() {
            return RSVP.Promise.resolve();
        },

        _validateData: function _validateData(data) {
            // see https://tools.ietf.org/html/rfc6749#section-4.2.2

            return !isEmpty(data) && !isEmpty(data.access_token);
        }
    });
});
