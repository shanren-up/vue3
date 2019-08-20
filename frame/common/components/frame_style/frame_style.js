define(
    [
        'app',
        'json!./cultureInfo.json',
        'text!./frame_style.html',
        'css!./frame_style.css'
    ],

    function(app, cultureInfo, template) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);

        var LessItem = Ember.Object.extend({
            key: "",
            value: "",
            oldValue: "",
            isChanged: Ember.computed('value', function() {
                return this.get('oldValue') !== this.get('value');
            }),
            isColor: Ember.computed(function() {
                return this.get('key').indexOf('color') > 0;
            })
        });

        app.FrameStyleComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'frame-style',
            init: function() {
                //this.loadLess("/style/variables.less");
                this.loadConfig();
                this._super();
            },
            loadConfig: function() {
                var lessFiles = [{
                    name: "variables",
                    url: "./style/variables.less"
                }, {
                    name: "theme",
                    url: "./style/theme.less"
                }];

                this.set("lessFiles", lessFiles);
            },
            didInsertElement: function() {
                var self = this;
                Ember.run.later(function() {
                    self.$(".list-group button:eq(0)").trigger('focus');
                    self.$(".list-group button:eq(0)").trigger('click');
                }, 1000);
            },
            keyUp: function(event) {
                var value = this.$(event.target).val();
                var key = this.$(event.target).attr('formtarget');
                var global_less = this.get('global_less');
                var regxKey = new RegExp(key + ".+?;");
                var resultKey = regxKey.exec(global_less);
                var tmp_global_less = global_less.replace(resultKey[0], key + ':' + value + ';');
                this.set('global_less', tmp_global_less);
            },
            change: function(event) {
                this.keyUp(event);
            },
            loadLess: function(url) {
                var self = this;
                $.get(url, function(result) {
                    self.set('global_less', result);
                    var global_keys = [];

                    var regxKey = new RegExp("@.+?;", 'g');
                    var keys = result.match(regxKey);
                    keys.forEach(function(item) {
                        item = item.replace("@", "").replace(";", "");
                        var pair = item.split(':');
                        var lessItem = LessItem.create({
                            key: pair[0],
                            value: pair[1],
                            oldValue: pair[1]
                        });
                        global_keys.push(lessItem);
                    });
                    self.set('global_keys', global_keys);
                });
            },
            freshStyle: function() {
                var self = this;
                var hrefs = [];

                $('link').each(function(index, domEle) {
                    var href = domEle.href;
                    if (href.indexOf('lib') < 0) {
                        hrefs.push(href);
                        domEle.remove();
                    }
                });

                hrefs.forEach(function(href) {
                    self.linkLoad(href);
                });
            },
            loadlessBuildLog: function() {
                var self = this;
                var url = "/style/lessBuildLog.txt";

                $.get(url, function(result) {
                    self.set('less_build_log', result);
                });
            },
            linkLoad: function(url) {
                $("head").append("<link>");
                var css = $("head").children(":last");
                css.attr({
                    rel: "stylesheet",
                    type: "text/css",
                    href: url
                });
            },
            actions: {
                save: function() {
                    var self = this;
                    var global_less = self.get('global_less');
                    var path = self.get('currentUrl');
                    $.ajax({
                        url: "/webserver/themeHandler",
                        type: 'POST',
                        data: {
                            data: global_less,
                            path: path
                        },
                        dataType: 'json',
                        success: function(returndata) {
                            self.freshStyle();
                            self.loadlessBuildLog();
                        },
                        error: function(returndata) {
                            alert(returndata);
                        }
                    });
                },
                openLessFile: function(url) {
                    this.set('currentUrl', url);
                    this.loadLess(url);
                }
            }
        });
    });