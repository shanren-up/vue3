define(
    [
        'app',
        'text!./comp_XXX.html',
        'css!./comp_XXX.css'
    ],

    function (app, template) {

    "use strict";

    app.CompXXXComponent = Ember.Component.extend({
            layout : Ember.ExtendHelper.compileEx(template),
            templateName : 'base-XXX-view',
            init : function () {
                this._super();
            },
            didInsertElement : function () {},
            actions : {
                showView : function (item) {
                    this.childViews[1].addView(item);
                },
                delView : function (item) {
                    this.childViews[1].delView(item);
                },
            }
        });

    // mouseEnter:function(event){
    // $(event.target)
    // },
});
