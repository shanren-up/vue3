define([
    'frame/common/services/auth/services/session',
    'frame/common/services/auth/services/cookies'
], function (SessionService, Cookies) {

    'use strict';

    return function setupService(registry) {
        registry.register('service:session', SessionService);
        registry.register('service:cookies', Cookies);
    };
});
