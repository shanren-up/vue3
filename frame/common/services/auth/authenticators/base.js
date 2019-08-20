define(function () {

    'use strict';

    var RSVP = Ember.RSVP,
        Evented = Ember.Evented,
        EmberObject = Ember.Object;

    return EmberObject.extend(Evented, {

        /**
         * Triggered when the authentication data is updated by the authenticator
         * due to an external or scheduled event.
         *
         * @event sessionDataUpdated
         * @public
         */

        /**
         * Triggered when the authentication data is invalidated by the authenticator
         * due to an external or scheduled event.
         *
         * @event sessionDataInvalidated
         * @public
         */

        /**
         * Restores the session from a session data object.
         */
        restore: function restore() {
            return RSVP.reject();
        },

        /**
         * Authenticates the session with the specified `args`.
         *
         * @method authenticate
         * @param {Any} [args] The arguments that the authenticator requires to authenticate the session
         * @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming authenticated
         * @public
         */
        authenticate: function authenticate(args) {
            return RSVP.reject();
        },

        /**
         * This method is invoked as a callback when the session is invalidated.
         *
         * @method invalidate
         * @param {Object} data The current authenticated session data
         * @param {Array} [args] additional arguments as required by the authenticator
         * @return {Ember.RSVP.Promise} A promise that when it resolves results in the session being invalidated
         * @public
         */
        invalidate: function invalidate(data, args) {
            return RSVP.resolve();
        }
    });
});
