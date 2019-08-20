define([
    'configs',
    'frame/common/services/auth/authenticators/oauth2-implicit',
    'frame/common/services/auth/authorizers/bss'
], function (configs, OAuth2Implicit, Bss) {

    'use strict';

    return function setupAuthenticator(registry) {
        switch (configs.authenticator) {
            case 'oauth2-implicit':
                registry.register('authenticator:oauth2-implicit', OAuth2Implicit);
                break;
        }
        switch (configs.authorizer) {
            case 'bss':
                registry.register('authorizer:bss', Bss);
                break;
        }
    };
});
