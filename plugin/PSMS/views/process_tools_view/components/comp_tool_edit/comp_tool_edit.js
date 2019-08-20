define(
    [
        'app',
        'text!./comp_tool_edit.html',
        'common/components/comp_msgbox/comp_msgbox',
        'css!./comp_tool_edit.css'
    ],
    function(app, template,msgBox) {

        "use strict";

        app.CompToolEditComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-tool-edit',
            messageBox: undefined,
            toolData:undefined,
            init: function() {
                this._super();
                this.messageBox = msgBox.create();
            },
            didInsertElement: function() {
                this.findNames();
                if(this.parameters){
                    this.set('toolData',this.parameters);
                }
            },
            didUpdate: function() {},

            willDestroyElement: function() {
                if (this.messageBox) {
                    this.messageBox = null;
                }
            },
            _validInfo:function(){

            },
            actions: {
                confirmToolInfo: function () {
                    Ember.set(this.toolData, 'weight', parseInt(this.$('#toolWeight').val()));
                    this.parameters.toolData = this.toolData;
                    this.sendAction('sendConfirm');
                },
                cancelToolInfo: function () {
                    this.sendAction('sendClose');
                },
            }
        });
    });