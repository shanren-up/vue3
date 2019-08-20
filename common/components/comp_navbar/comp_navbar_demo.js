define(
    [
        'app',
        './comp_navbar'
    ],
    function(app, model) {

        'use strict';

        function makeTestData(num) {
            var dataSource = [];
            for (var i = 0; i < num; i++) {
                dataSource.push(model.create({
                    imgSrc: 'img/first_click.png',
                    title: '调度管理',
                    templateName: 'imp-alarm-onduty-view'
                }));
            }
            return dataSource;
        }
        app.CompNavbarDemoComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx('{{comp-navbar dataSource=dataSource}}'),
            templateName: 'comp-navbar-demo',
            classNames: ['absolute', 'comp-navbar-demo'],
            init: function() {
                this._super();
                this.dataSource = makeTestData(10);
            },
            didInsertElement: function() {},
            willDestroyElement: function() {

            }
        });
    }
);