define(
    [
        'app',
        'text!./comp_tool_detail.html',
        'css!./comp_tool_detail.css'
    ],
    function(app, template) {
        "use strict";
        app.CompToolDetailComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-tool-detail',
            toolData:'',
            init: function() {
                this._super();
           
            },
            didInsertElement: function() {
                this.findNames();
                if(this.parameters){
                    this.set('toolData',this._displayHtml(this.parameters));
                }
            },
            didUpdate: function() {},

            willDestroyElement: function() {
            },
            _displayHtml:function (str) {
                var obj  = JSON.parse(str);
                str = JSON.stringify(obj , null, 4);
//                 return str.replace(/&/g, '&amp;')
//                     .replace(/</g, '&lt;')
//                     .replace(/>/g, '&gt;')
//                     .replace(/"/g, '&quot;');
                return str;
            },
            actions: {
            }
        });
    });