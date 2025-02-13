define([
    'frame/common/services/auth/utils/lookup'
], function (lookup) {

    'use strict';

    function setupSessionRestoration(instance) {
        var applicationRoute = lookup(instance, 'route:application');
        var session = lookup(instance, 'session:main');
        var originalBeforeModel = applicationRoute.beforeModel;
        var applyOriginalBeforeModel = function applyOriginalBeforeModel() {
            return originalBeforeModel.apply(applicationRoute, arguments);
        };
        applicationRoute.reopen({
            beforeModel: function beforeModel() {
                var _arguments = arguments;

                return session.restore().then(function () {
                    return applyOriginalBeforeModel.apply(undefined, _arguments);
                }, function () {
                    return applyOriginalBeforeModel.apply(undefined, _arguments);
                });
            }
        });
    }

    return setupSessionRestoration;
});
