define(
    [

    ],
    function() {
        "use strict";
        return Ember.Mixin.create({
            addEvent: function(eventName, callback) {
                if (!this.handles) {
                    Object.defineProperty(this, "handles", {
                        value: {},
                        enumerable: false,
                        configurable: true,
                        writable: true
                    });
                }
                this.handles[eventName] = this.handles[eventName] || [];
                this.handles[eventName].push(callback);
            },

            offEvent: function(eventName, callback) {
                if (this.handles && this.handles[eventName]) {
                    for (var i = 0; i < this.handles[eventName].length; i++) {
                        if (this.handles[eventName][i] === callback) {
                            this.handles[eventName].removeObject(callback);
                        }
                    }
                }
            },

            emitEvent: function(eventName) {
                var params = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [];
                if (this.handles && this.handles[eventName]) {
                    Array.prototype.forEach.call(this.handles[eventName], function(arg) {
                        arg.apply(this, params);
                    }.bind(this));
                }
            },
            offAllEvent: function() {
                this.handles = null;
            },
        });
    });