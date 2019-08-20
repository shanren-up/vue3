define(
    [
        'app',
        'text!./view_comp_XXX.html',
         'css!./view_comp_XXX.css'
    ],

    function (app, template) {

    "use strict";

    app.ViewCompXXXComponent = Ember.Component.extend({
            layout : Ember.ExtendHelper.compileEx(template),
            templateName : 'view-comp-XXX',
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
