(function(){;
var define, requireModule, require, requirejs;

(function() {

  var _isArray;
  if (!Array.isArray) {
    _isArray = function (x) {
      return Object.prototype.toString.call(x) === "[object Array]";
    };
  } else {
    _isArray = Array.isArray;
  }

  var registry = {}, seen = {};
  var FAILED = false;

  var uuid = 0;

  function tryFinally(tryable, finalizer) {
    try {
      return tryable();
    } finally {
      finalizer();
    }
  }

  function unsupportedModule(length) {
    throw new Error("an unsupported module was defined, expected `define(name, deps, module)` instead got: `" + length + "` arguments to define`");
  }

  var defaultDeps = ['require', 'exports', 'module'];

  function Module(name, deps, callback, exports) {
    this.id       = uuid++;
    this.name     = name;
    this.deps     = !deps.length && callback.length ? defaultDeps : deps;
    this.exports  = exports || { };
    this.callback = callback;
    this.state    = undefined;
    this._require  = undefined;
  }


  Module.prototype.makeRequire = function() {
    var name = this.name;

    return this._require || (this._require = function(dep) {
      return require(resolve(dep, name));
    });
  }

  define = function(name, deps, callback) {
    if (arguments.length < 2) {
      unsupportedModule(arguments.length);
    }

    if (!_isArray(deps)) {
      callback = deps;
      deps     =  [];
    }

    registry[name] = new Module(name, deps, callback);
  };

  // we don't support all of AMD
  // define.amd = {};
  // we will support petals...
  define.petal = { };

  function Alias(path) {
    this.name = path;
  }

  define.alias = function(path) {
    return new Alias(path);
  };

  function reify(mod, name, seen) {
    var deps = mod.deps;
    var length = deps.length;
    var reified = new Array(length);
    var dep;
    // TODO: new Module
    // TODO: seen refactor
    var module = { };

    for (var i = 0, l = length; i < l; i++) {
      dep = deps[i];
      if (dep === 'exports') {
        module.exports = reified[i] = seen;
      } else if (dep === 'require') {
        reified[i] = mod.makeRequire();
      } else if (dep === 'module') {
        mod.exports = seen;
        module = reified[i] = mod;
      } else {
        reified[i] = requireFrom(resolve(dep, name), name);
      }
    }

    return {
      deps: reified,
      module: module
    };
  }

  function requireFrom(name, origin) {
    var mod = registry[name];
    if (!mod) {
      throw new Error('Could not find module `' + name + '` imported from `' + origin + '`');
    }
    return require(name);
  }

  function missingModule(name) {
    throw new Error('Could not find module ' + name);
  }
  requirejs = require = requireModule = function(name) {
    var mod = registry[name];


    if (mod && mod.callback instanceof Alias) {
      mod = registry[mod.callback.name];
    }

    if (!mod) { missingModule(name); }

    if (mod.state !== FAILED &&
        seen.hasOwnProperty(name)) {
      return seen[name];
    }

    var reified;
    var module;
    var loaded = false;

    seen[name] = { }; // placeholder for run-time cycles

    tryFinally(function() {
      reified = reify(mod, name, seen[name]);
      module = mod.callback.apply(this, reified.deps);
      loaded = true;
    }, function() {
      if (!loaded) {
        mod.state = FAILED;
      }
    });

    var obj;
    if (module === undefined && reified.module.exports) {
      obj = reified.module.exports;
    } else {
      obj = seen[name] = module;
    }

    if (obj !== null &&
        (typeof obj === 'object' || typeof obj === 'function') &&
          obj['default'] === undefined) {
      obj['default'] = obj;
    }

    return (seen[name] = obj);
  };

  function resolve(child, name) {
    if (child.charAt(0) !== '.') { return child; }

    var parts = child.split('/');
    var nameParts = name.split('/');
    var parentBase = nameParts.slice(0, -1);

    for (var i = 0, l = parts.length; i < l; i++) {
      var part = parts[i];

      if (part === '..') {
        if (parentBase.length === 0) {
          throw new Error('Cannot access parent module of root');
        }
        parentBase.pop();
      } else if (part === '.') { continue; }
      else { parentBase.push(part); }
    }

    return parentBase.join('/');
  }

  requirejs.entries = requirejs._eak_seen = registry;
  requirejs.clear = function(){
    requirejs.entries = requirejs._eak_seen = registry = {};
    seen = state = {};
  };
})();

;define("ember-colpick/components/col-pick-input", 
  ['exports'],
  function(exports) {
    "use strict";
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: true
    });

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    //var _ember = require('ember');

    var _ember2 = require('ember');

    var _emberColpickMixinsColPick = require('ember-colpick/mixins/col-pick');

    var _emberColpickMixinsColPick2 = _interopRequireDefault(_emberColpickMixinsColPick);

    var _emberColpickTemplate = require('ember-colpick/components/templates/col-pick-input')["default"];

    exports['default'] = _ember2['default'].TextField.extend(_emberColpickMixinsColPick2['default'], {
      layout : _emberColpickTemplate,
      flat: false
    });
    //module.exports = exports['default'];
  });
;define("ember-colpick/components/col-pick", 
  ['exports'],
  function(exports) {
    "use strict";
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: true
    });

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    //var _ember = require('ember');

    var _ember2 = require('ember');

    var _emberColpickMixinsColPick = require('ember-colpick/mixins/col-pick');

    var _emberColpickMixinsColPick2 = _interopRequireDefault(_emberColpickMixinsColPick);

    exports['default'] = _ember2['default'].Component.extend(_emberColpickMixinsColPick2['default']);
    //module.exports = exports['default'];
  });
;define("ember-colpick/components/templates/col-pick-input", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.HTMLBars.template((function() {
      return {
        meta: {
          "revision": "Ember@1.13.8",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 2,
              "column": 0
            }
          },
          "moduleName": "col-pick-input.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          return morphs;
        },
        statements: [
          ["content","yield",["loc",[null,[1,0],[1,9]]]]
        ],
        locals: [],
        templates: []
      };
    }()));
  });
;define("ember-colpick/mixins/col-pick", 
  ['exports'],
  function(exports) {
    "use strict";
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: true
    });

    //function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    //var _ember = require('ember');

    var _ember2 = require('ember');

    function onRenderObserver() /*keys..., fn*/{
      var args = Array.prototype.slice.call(arguments);
      var fn = args.slice(-1)[0];
      var keys = args.slice(0, -1);

      var observer = function observer() {
        if (this._state !== 'inDOM') {
          // don't schedule unless inDOM
          return;
        }
        _ember2['default'].run.schedule('render', this, function () {
          // don't run unless still inDOM
          if (this._state === 'inDOM') {
            fn.call(this);
          }
        });
      };

      return _ember2['default'].observer.apply(null, keys.concat([observer]));
    }

    exports['default'] = _ember2['default'].Mixin.create({
      colpickLayout: 'hex',
      colorScheme: 'dark',
      classNames: ['ember-col-pick'],
      flat: true, // [true/false] render as popup (true) rendering inline (false)
      value: null,
      previewValue: null,
      useHashtag: false,

      _colpick: undefined,

      configDidChange: onRenderObserver('colorScheme', 'colpickLayout', 'flat', function () {
        this._tearDownColpick();
        this.rerender();
      }),

      valueDidChange: onRenderObserver('value', function () {
        var value = this.get('value');
        if (this._colpick && value) {
          this._colpick.colpickSetColor(value);
        }
      }),

      _setupColpick: function _setupColpick() {
        var layout = this.get('colpickLayout');
        var colorScheme = this.get('colorScheme');

        if (layout && colorScheme) {
          var colpick = this._colpick = this.$().colpick({
            layout: layout,
            colorScheme: colorScheme,
            submit: 0,
            flat: this.get('flat'),
            onChange: _ember2['default'].run.bind(this, function (hsb, hex, rgb, el, bySetColor) {
              if (this.get('useHashtag')) {
                hex = '#' + hex;
              }

              this.set('previewValue', hex);

              if (!bySetColor) {
                this.set('value', hex);
              }
            }),
            onHide: _ember2['default'].run.bind(this, function () {
              this.sendAction('onHide');
            })
          });

          colpick.find('input[type=text]').keyup(function () {
            var hexInputVal = this.value;
            if (hexInputVal.length === 6) {
              colpick.colpickSetColor(hexInputVal);
            }
          });

          var value = this.get('value');
          if (value) {
            colpick.colpickSetColor(value);
          }
        }
      },

      popup: function popup() {
        if (this._state === 'inDOM') {
          return _ember2['default'].$('#' + this.$().data('colpickId'));
        }
      },

      didInsertElement: function didInsertElement() {
        this._super();
        this._setupColpick();
      },

      _tearDownColpick: function _tearDownColpick() {
        if (this._colpick) {
          this.popup().remove();
          this._colpick = undefined;
        }
      },

      willDestroyElement: function willDestroyElement() {
        this._tearDownColpick();
        this._super();
      }
    });
    //module.exports = exports['default'];
  });

    define('ember', ['exports'], function (__exports__) {
        __exports__['default'] = window.Ember;
    });

    App.ColPickComponent = require('ember-colpick/components/col-pick')['default'];
    App.ColPickInputComponent = require('ember-colpick/components/col-pick-input')['default'];
    
  })();