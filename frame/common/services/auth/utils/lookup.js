define(function () {

    'use strict';

    return function (instance, factoryName) {
        if (instance.lookup) {
            return instance.lookup(factoryName);
        } else {
            return instance.container.lookup(factoryName);
        }
    };
});
