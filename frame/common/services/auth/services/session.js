define(function() {

    'use strict';

    var computed = Ember.computed,
        A = Ember.A,
        Service = Ember.Service,
        Evented = Ember.Evented,
        getOwner = Ember.getOwner,
        isNone = Ember.isNone,
        assert = Ember.assert;

    var SESSION_DATA_KEY_PREFIX = /^data\./;

    return Service.extend(Evented, {

        // @event authenticationSucceeded

        // @event invalidationSucceeded

        isAuthenticated: computed.oneWay('session.isAuthenticated'),

        data: computed.oneWay('session.content'),

        store: computed.oneWay('session.store'),

        attemptedTransition: computed.alias('session.attemptedTransition'),

        init: function init() {
            this._super.apply(this, arguments);
            this._forwardSessionEvents();
        },
        set: function set(key, value) {
            var setsSessionData = SESSION_DATA_KEY_PREFIX.test(key);
            if (setsSessionData) {
                var sessionDataKey = 'session.' + key.replace(SESSION_DATA_KEY_PREFIX, '');
                return this._super(sessionDataKey, value);
            } else {
                return this._super.apply(this, arguments);
            }
        },
        _forwardSessionEvents: function _forwardSessionEvents() {
            var _this = this,
                _arguments = arguments;

            ['authenticationSucceeded', 'invalidationSucceeded'].forEach(function(event) {
                var session = _this.get('session');
                // the internal session won't be available in route unit tests
                if (session) {
                    session.on(event, function() {
                        _this.trigger.apply(_this, [event].concat(Array.prototype.slice.call(_arguments)));
                    });
                }
            });
        },

        authenticate: function authenticate() {
            var session = this.get('session');

            return session.authenticate.apply(session, arguments);
        },

        invalidate: function invalidate() {
            var session = this.get('session');

            return session.invalidate.apply(session, arguments);
        },

        authorize: function authorize(authorizerFactory, block) {
            if (this.get('isAuthenticated')) {
                var authorizer = getOwner(this).lookup(authorizerFactory);
                assert('No authorizer for factory ' + authorizerFactory + ' could be found!', !isNone(authorizer));
                var sessionData = this.get('data.authenticated');
                authorizer.authorize(sessionData, block);
            }
        }
    });
});