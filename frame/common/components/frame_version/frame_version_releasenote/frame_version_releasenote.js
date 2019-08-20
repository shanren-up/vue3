define(
    [
        'app',
        'json!./cultureInfo.json',
    ],

    function(app, cultureInfo) {

        'use strict';
        Ember.addJsonCultureInfo(cultureInfo);

        app.FrameVersionReleasenoteComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx("<p>" + Ember.oloc('frame_version_releasenote_wzdreleaseNote') + "</p>"),
            templateName: "frame-version-releasenote",
            //releaseNote str
            formattedMsg: '',
            init: function() {
                this._super();
                var msg = this.parameters && this.parameters.msg;
                if (typeof(msg) === 'string') {
                    this.formattedMsg = msg.replace(/</g, '&lt;').replace(/>/g, '&gt').replace(/\n/g, '<br/>');
                }
            },
            didInsertElement: function() {
                if (this.formattedMsg) {
                    this.$('p').html(this.formattedMsg);
                }
            },
            willDestroyElement: function() {
                this._super();
            },
        });
    }
);