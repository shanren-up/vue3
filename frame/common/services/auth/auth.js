define(['configs', 'ember'], function (configs) {

    'use strict';

    return function (callback) {
        if (configs.authentication && configs.isNewAuthentication) {
            require([
                'frame/common/services/auth/initializers/setup-service',
                'frame/common/services/auth/initializers/setup-session',
                'frame/common/services/auth/initializers/setup-session-service',
                'frame/common/services/auth/initializers/setup-authenticator',
                'frame/common/services/auth/instance-initializers/setup-session-restoration',
                'frame/common/services/auth/utils/lookup'
            ], function(setupService, setupSession, setupSessionService, setupAuthenticator, setupSessionRestoration, lookup) {

                Ember.Application.initializer({
                    name: 'authentication',
                    initialize: function(registry) {
                        setupService(registry);
                        setupSession(registry);
                        setupSessionService(registry);
                        setupAuthenticator(registry);
                    }
                });

                Ember.Application.instanceInitializer({
                    name: 'authentication',
                    initialize: function(instance) {
                        checkRoute(instance);
                        setupSessionRestoration(instance);
                    }
                });

                function checkRoute(instance) {
                    var applicationRoute = lookup(instance, 'route:application');
                    if (!applicationRoute) {
                        instance.register('route:application', Ember.Route.extend());
                    }
                }

                callback();

            });
        } else {
            callback();
        }
    };
});
