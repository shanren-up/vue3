define([
    './base'
], function (Base) {

    'use strict';

    var isEmpty = Ember.isEmpty;

    return Base.extend({
        authorize: function authorize(data, block) {
            var accessToken = data['access_token'];

            if (!isEmpty(accessToken)) {
                block('Authorization', 'Bearer ' + accessToken);
            }
        }
    });
});
