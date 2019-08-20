define(function () {

    'use strict';

    var Evented = Ember.Evented,
        EmberObject = Ember.Object;

    return EmberObject.extend(Evented, {

        /**
         * Authorizes a block of code.
         *
         * @method authorize
         * @param data {Object} data The current authenticated session data
         * @param block {Function} block The callback to call with the authorization data
         * @public
         */
        authorize: function authorize(data, block) {
        }
    });
});
