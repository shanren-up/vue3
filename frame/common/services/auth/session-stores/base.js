define(function () {

    'use strict';

    var RSVP = Ember.RSVP,
        EmberObject = Ember.Object,
        Evented = Ember.Evented;

    return EmberObject.extend(Evented, {

        // @event sessionDataUpdated

        persist: function persist(data) {
            return RSVP.reject();
        },

        restore: function restore() {
            return RSVP.reject();
        },

        clear: function clear() {
            return RSVP.reject();
        }
    });
});
