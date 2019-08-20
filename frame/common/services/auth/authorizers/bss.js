define([
    'configs',
    './oauth2-bearer'
], function (configs, Oauth2Bearer) {

    'use strict';

    var isEmpty = Ember.isEmpty;

    return Oauth2Bearer.extend({
        init: function () {
            this._super();
        },
        authorize: function authorize(data, block) {
            var accessToken = data['access_token'],
                headers = null;

            if (!isEmpty(accessToken)) {
                headers = {'Authorization': 'Bearer ' + accessToken};
            } else {
            }
            block(headers);
        }
    });
});
