define([
    'frame/common/services/auth/internal-session',
    'frame/common/services/auth/session-stores/cookie',
    'frame/common/services/auth/utils/inject'
], function (InternalSession, CookieSessionStore, inject) {

    'use strict';

    return function setupSession(registry) {
        registry.register('session:main', InternalSession);

        var store = 'session-store:application';
        registry.register(store, CookieSessionStore);
        inject(registry, 'session:main', 'store', store);
    };
});
