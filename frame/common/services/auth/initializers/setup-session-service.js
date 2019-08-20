define([
    'frame/common/services/auth/utils/inject'
], function (inject) {

    'use strict';

    return function setupSessionStore(registry) {
        inject(registry, 'service:session', 'session', 'session:main');
    };
});
