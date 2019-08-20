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

;define("ember-collection/components/ember-collection", 
  ["ember","ember-collection/components/ember-collection/template","ember-collection/utils/translate","ember-collection/utils/needs-revalidate","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var layout = __dependency2__["default"];
    var translateCSS = __dependency3__.translateCSS;
    var needsRevalidate = __dependency4__["default"];
    var decodeEachKey = Ember.__loader.require('ember-htmlbars/utils/decode-each-key')['default'];

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
    //const { get, set } = Ember;

    /*const get = Ember.get;
    const set = Ember.set;

    class Cell {
      constructor(key, item, index, style) {
        this.key = key;
        this.hidden = false;
        this.item = item;
        this.index = index;
        this.style = style;
      }
    } mod btw*/

    var get = Ember.get;
    var set = Ember.set;

     var Cell = function Cell(key, item, index, style) {
    _classCallCheck(this, Cell);

      this.key = key;
      this.hidden = false;
      this.item = item;
      this.index = index;
      this.style = style;
    };

    function formatStyle(pos, width, height) {
      var css = 'position:absolute;top:0;left:0;';
      css += translateCSS(pos.x, pos.y);
      css += 'width:' + width + 'px;height:' + height + 'px;';
      return css;
    }

    __exports__["default"] = Ember.Component.extend({
      layout: layout,

      init() {
        // State pulled from attrs is prefixed with an underscore
        // so that there's no chance of shadowing the attrs proxy.
        this._buffer = undefined;
        this._cellLayout = undefined;
        this._rawItems = undefined;
        this._items = undefined;
        this._scrollLeft = undefined;
        this._scrollTop = undefined;
        this._clientWidth = undefined;
        this._clientHeight = undefined;
        this._contentSize = undefined;

        // this.firstCell = undefined;
        // this.lastCell = undefined;
        // this.cellCount = undefined;
        this.contentElement = undefined;
        this._cells = Ember.A();
        this._cellMap = Object.create(null);

        // TODO: Super calls should always be at the top of the constructor.
        // I had to move the super call after the properties were defined to
        // work around what I believe is a bug in the attrs proxy. The problem
        // seems to arise when you:
        //
        //   1. Call this._super() immediately.
        //   2. Set a property on `this` that is both not in the
        //      initial attrs hash and not on the prototype.
        this._super();
      },

      didInitAttrs() {
        var buffer = this.getAttr('buffer'); // getIntAttr('buffer', 5)
        this._buffer = (typeof buffer === 'number') ? buffer : 5;
        this._scrollLeft = this.getAttr('scroll-left') | 0;
        this._scrollTop = this.getAttr('scroll-top') | 0;
        this._clientWidth = this.getAttr('estimated-width') | 0;
        this._clientHeight = this.getAttr('estimated-height') | 0;
        this._scrollChange = this.getAttr('scroll-change');
      },

      _needsRevalidate() {
        needsRevalidate(this);
      },

      didReceiveAttrs() {
        // Work around emberjs/ember.js#11992. Affects <=1.13.8 and <=2.0.0.
        // This will likely be patched in 1.13.9 and 2.0.1.
        this._super();

        this.updateItems();
        this.updateScrollPosition();
      },

      updateItems() {
        this._cellLayout = this.getAttr('cell-layout');
        var rawItems = this.getAttr('items');

        if (this._rawItems !== rawItems) {
          if (this._items && this._items.removeArrayObserver) {
            this._items.removeArrayObserver(this, {
              willChange: Ember.K,
              didChange: '_needsRevalidate'
            });
          }
          this._rawItems = rawItems;
          var items = Ember.A(rawItems);
          this.set('_items', items);

          if (items && items.addArrayObserver) {
            items.addArrayObserver(this, {
              willChange: Ember.K,
              didChange: '_needsRevalidate'
            });
          }
        }
      },

      updateScrollPosition() {
        if (!this._scrollChange) { return; } // don't process bound scroll coords unless our action is being handled
        var scrollLeftAttr = this.getAttr('scroll-left');
        if (scrollLeftAttr !== undefined) {
          scrollLeftAttr = parseInt(scrollLeftAttr, 10);
          if (this._scrollLeft !== scrollLeftAttr) {
            this.set('_scrollLeft', scrollLeftAttr);
          }
        }

        var scrollTopAttr = this.getAttr('scroll-top');
        if (scrollTopAttr !== undefined) {
          scrollTopAttr = parseInt(scrollTopAttr, 10);
          if (this._scrollTop !== scrollTopAttr) {
            // console.log('updateScrollPosition', this._scrollTop, scrollTopAttr);
            this.set('_scrollTop', scrollTopAttr);
          }
        }
      },

      updateContentSize() {
        var cellLayout = this._cellLayout;
        var contentSize = cellLayout.contentSize(this._clientWidth, this._clientHeight);
        if (this._contentSize === undefined ||
            contentSize.width !== this._contentSize.width ||
            contentSize.height !== this._contentSize.height) {
          this.set('_contentSize', contentSize);
        }
      },

      willRender: function() {
        this.updateCells();
        this.updateContentSize();
      },

      updateCells() {
        if (!this._items) { return; }
        const numItems = get(this._items, 'length');
        if (this._cellLayout.length !== numItems) {
          this._cellLayout.length = numItems;
        }

        var priorMap = this._cellMap;
        var cellMap = Object.create(null);

        var index = this._cellLayout.indexAt(this._scrollLeft, this._scrollTop, this._clientWidth, this._clientHeight);
        var count = this._cellLayout.count(this._scrollLeft, this._scrollTop, this._clientWidth, this._clientHeight);
        var items = this._items;
        var bufferBefore = Math.min(index, this._buffer);
        index -= bufferBefore;
        count += bufferBefore;
        count = Math.min(count + this._buffer, get(items, 'length') - index);
        var i, pos, width, height, style, itemIndex, itemKey, cell;

        var newItems = [];

        for (i=0; i<count; i++) {
          itemIndex = index+i;
          itemKey = decodeEachKey(items.objectAt(itemIndex), '@identity');
          if (priorMap) {
            cell = priorMap[itemKey];
          }
          if (cell) {
            pos = this._cellLayout.positionAt(itemIndex, this._clientWidth, this._clientHeight);
            width = this._cellLayout.widthAt(itemIndex, this._clientWidth, this._clientHeight);
            height = this._cellLayout.heightAt(itemIndex, this._clientWidth, this._clientHeight);
            style = formatStyle(pos, width, height);
            set(cell, 'style', style);
            set(cell, 'hidden', false);
            set(cell, 'key', itemKey);
            cellMap[itemKey] = cell;
          } else {
            newItems.push(itemIndex);
          }
        }

        for (i=0; i<this._cells.length; i++) {
          cell = this._cells[i];
          if (!cellMap[cell.key]) {
            if (newItems.length) {
              itemIndex = newItems.pop();
              var item = items.objectAt(itemIndex);
              itemKey = decodeEachKey(item, '@identity');
              pos = this._cellLayout.positionAt(itemIndex, this._clientWidth, this._clientHeight);
              width = this._cellLayout.widthAt(itemIndex, this._clientWidth, this._clientHeight);
              height = this._cellLayout.heightAt(itemIndex, this._clientWidth, this._clientHeight);
              style = formatStyle(pos, width, height);
              set(cell, 'style', style);
              set(cell, 'key', itemKey);
              set(cell, 'index', itemIndex);
              set(cell, 'item', item);
              set(cell, 'hidden', false);
              cellMap[itemKey] = cell;
            } else {
              set(cell, 'hidden', true);
              set(cell, 'style', 'height: 0; display: none;');
            }
          }
        }

        for (i=0; i<newItems.length; i++) {
          itemIndex = newItems[i];
          var item = items.objectAt(itemIndex);
          itemKey = decodeEachKey(item, '@identity');
          pos = this._cellLayout.positionAt(itemIndex, this._clientWidth, this._clientHeight);
          width = this._cellLayout.widthAt(itemIndex, this._clientWidth, this._clientHeight);
          height = this._cellLayout.heightAt(itemIndex, this._clientWidth, this._clientHeight);
          style = formatStyle(pos, width, height);
          cell = new Cell(itemKey, item, itemIndex, style);
          cellMap[itemKey] = cell;
          this._cells.pushObject(cell);
        }
        this._cellMap = cellMap;
      },
      actions: {
        scrollChange(scrollLeft, scrollTop) {
          if (this._scrollChange) {
            // console.log('ember-collection sendAction scroll-change', scrollTop);
            this.sendAction('scroll-change', scrollLeft, scrollTop);
          } else {
            if (scrollLeft !== this._scrollLeft ||
                scrollTop !== this._scrollTop) {
              set(this, '_scrollLeft', scrollLeft);
              set(this, '_scrollTop', scrollTop);
              needsRevalidate(this);
            }
          }
        },
        clientSizeChange(clientWidth, clientHeight) {
          if (this._clientWidth !== clientWidth ||
              this._clientHeight !== clientHeight) {
            set(this, '_clientWidth', clientWidth);
            set(this, '_clientHeight', clientHeight);
            needsRevalidate(this);
          }
        }
      }
    });
  });
;define("ember-collection/components/ember-collection/template", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.HTMLBars.template((function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "revision": "Ember@1.13.10",
              "loc": {
                "source": null,
                "start": {
                  "line": 3,
                  "column": 4
                },
                "end": {
                  "line": 5,
                  "column": 4
                }
              },
              "moduleName": "template.hbs"
            },
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createElement("div");
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element0 = dom.childAt(fragment, [0]);
              var morphs = new Array(2);
              morphs[0] = dom.createUnsafeAttrMorph(element0, 'style');
              morphs[1] = dom.createMorphAt(element0,0,0);
              return morphs;
            },
            statements: [
              ["attribute","style",["get","cell.style",["loc",[null,[4,20],[4,30]]]]],
              ["inline","yield",[["get","cell.item",["loc",[null,[4,42],[4,51]]]],["get","cell.index",["loc",[null,[4,52],[4,62]]]]],[],["loc",[null,[4,34],[4,65]]]]
            ],
            locals: ["cell"],
            templates: []
          };
        }());
        return {
          meta: {
            "revision": "Ember@1.13.10",
            "loc": {
              "source": null,
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 7,
                "column": 0
              }
            },
            "moduleName": "template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("  ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
            return morphs;
          },
          statements: [
            ["block","each",[["get","_cells",["loc",[null,[3,13],[3,19]]]]],[],0,null,["loc",[null,[3,4],[5,15]]]]
          ],
          locals: [],
          templates: [child0]
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.10",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","ember-native-scrollable",[],["content-size",["subexpr","@mut",[["get","_contentSize",["loc",[null,[1,40],[1,52]]]]],[],[]],"scroll-left",["subexpr","@mut",[["get","_scrollLeft",["loc",[null,[1,65],[1,76]]]]],[],[]],"scroll-top",["subexpr","@mut",[["get","_scrollTop",["loc",[null,[1,88],[1,98]]]]],[],[]],"scrollChange",["subexpr","action",["scrollChange"],[],["loc",[null,[1,112],[1,135]]]],"clientSizeChange",["subexpr","action",["clientSizeChange"],[],["loc",[null,[1,153],[1,180]]]]],0,null,["loc",[null,[1,0],[7,28]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }()));
  });
;define("ember-collection/utils/translate", 
  ["ember-collection/utils/style-properties","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var styleProperty = __dependency1__.styleProperty;
    var cssProperty = __dependency1__.cssProperty;

    const transformCSSProp   = cssProperty('transform');
    const transformStyleProp = styleProperty('transform');
    const supports3D  = !!styleProperty('perspectiveOrigin');
    __exports__.supports3D = supports3D;const supports2D  = !!transformStyleProp;
    __exports__.supports2D = supports2D;
    function translatePosition(el, x, y) {
      el.style.left = x+'px';
      el.style.top  = y+'px';
    }

    __exports__.translatePosition = translatePosition;
    function translateTransform2D(el, x, y) {
      el.style[transformStyleProp] = matrix2D(x, y);
    }

    __exports__.translateTransform2D = translateTransform2D;
    function translateTransform3D(el, x, y) {
      el.style[transformStyleProp] = matrix3D(x, y);
    }

    __exports__.translateTransform3D = translateTransform3D;
    function translatePositionCSS(x, y) {
      return `left:${x}px;top:${y}px;`;
    }

    __exports__.translatePositionCSS = translatePositionCSS;
    function translateTransform2DCSS(x, y) {
      return `${transformCSSProp}:${matrix2D(x, y)};`;
    }

    __exports__.translateTransform2DCSS = translateTransform2DCSS;
    function translateTransform3DCSS(x, y) {
      return `${transformCSSProp}:${matrix3D(x, y)};`;
    }

    __exports__.translateTransform3DCSS = translateTransform3DCSS;
    function matrix2D(x, y) {
      return `matrix(1, 0, 0, 1, ${x}, ${y})`;
    }

    function matrix3D(x, y) {
      return `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ${x}, ${y}, 0, 1)`;
    }

    const translate = (
      supports3D ? translateTransform3D : (
        supports2D ? translateTransform2D : translatePosition
      )
    );
    __exports__.translate = translate;
    const translateCSS = (
      supports3D ? translateTransform3DCSS : (
        supports2D ? translateTransform2DCSS : translatePositionCSS
      )
    );
    __exports__.translateCSS = translateCSS;
  });
;define("ember-collection/utils/style-properties", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    //const { camelize, capitalize } = Ember.String; mod btw 
    const camelize = Ember.String.camelize;
    const capitalize = Ember.String.capitalize;
    const stylePrefixes  = ['Webkit',  'ms',  'Moz',  'O'];
    const cssPrefixes    = ['-webkit-','-ms-','-moz-','-o-'];

    const style = typeof document !== 'undefined' && document.documentElement && document.documentElement.style;

    function findProperty(property, css) {
      var prop = css ? camelize(property) : property;
      if (prop in style) {
        return property;
      }
      var capitalized = capitalize(prop);
      for (var i=0; i<stylePrefixes.length; i++) {
        var prefixed = stylePrefixes[i] + capitalized;
        if (prefixed in style) {
          return css ? cssPrefixes[i] + property : prefixed;
        }
      }
    }

    function styleProperty(prop) {
      return findProperty(prop, false);
    }

    __exports__.styleProperty = styleProperty;
    function cssProperty(cssProp) {
      return findProperty(cssProp, true);
    }

    __exports__.cssProperty = cssProperty;
  });
;define("ember-collection/utils/needs-revalidate", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = function needsRevalidate(view){
      view._renderNode.isDirty = true;
      view._renderNode.ownerNode.emberView.scheduleRevalidate(view._renderNode, view.toString(), 'rerendering via needsRevalidate');
    }
  });
;define("ember-collection/components/ember-native-scrollable", 
  ["ember","ember-collection/utils/translate","ember-collection/utils/style-properties","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var translate = __dependency2__.translate;
    var styleProperty = __dependency3__.styleProperty;

    const overflowScrollingProp = styleProperty('overflowScrolling');

    __exports__["default"] = Ember.Component.extend({
      init() {
        this._clientWidth = 0;
        this._clientHeight = 0;
        this._scrollLeft = 0;
        this._scrollTop = 0;
        this._animationFrame = undefined;
        this._super();
      },
      didReceiveAttrs() {
        this._contentSize = this.getAttr('content-size');
        this._scrollLeft = this.getAttr('scroll-left');
        this._scrollTop = this.getAttr('scroll-top');
      },
      didInsertElement() {
        this.contentElement = this.element.firstElementChild;
        this.applyStyle();
        this.applyContentSize();
        this.syncScrollFromAttr();
        this.startScrollCheck();
      },
      didUpdate() {
        this.applyContentSize();
        this.syncScrollFromAttr();
      },
      willDestroyElement() {
        this.cancelScrollCheck();
        this.contentElement = undefined;
      },
      applyStyle() {
        if (overflowScrollingProp) {
          this.element.style.overflow = 'scroll';
          this.element.style[overflowScrollingProp] = 'touch';
        } else {
          this.element.style.overflow = 'auto';
        }

        // hack to force render buffer so outside doesn't repaint on scroll
        translate(this.element, 0, 0);

        this.element.style.position = 'absolute';
        this.element.style.left = 0;
        this.element.style.top = 0;
        this.element.style.bottom = 0;
        this.element.style.right = 0;
      },
      applyContentSize() {
        this.contentElement.style.position = 'relative';
        this.contentElement.style.width = this._contentSize.width + 'px';
        this.contentElement.style.height = this._contentSize.height + 'px';
      },
      syncScrollFromAttr() {
        if (this._appliedScrollTop !== this._scrollTop) {
          this._appliedScrollTop = this._scrollTop;
          if (this._scrollTop >= 0) {
            this.element.scrollTop = this._scrollTop;
          }
        }
        if (this._appliedScrollLeft !== this._scrollLeft) {
          this._appliedScrollLeft = this._scrollLeft;
          if (this._scrollLeft >= 0) {
            this.element.scrollLeft = this._scrollLeft;
          }
        }
      },
      startScrollCheck() {
        const component = this;
        function step() {
          component.scrollCheck();
          nextStep();
        }
        function nextStep() {
          component._animationFrame = requestAnimationFrame(step);
        }
        nextStep();
      },
      cancelScrollCheck() {
        if (this._animationFrame) {
          cancelAnimationFrame(this._animationFrame);
          this._animationFrame = undefined;
        }
      },
      scrollCheck() {
        var element = this.element;
        var scrollLeft = element.scrollLeft;
        var scrollTop = element.scrollTop;
        var scrollChanged = false;
        if (scrollLeft !== this._appliedScrollLeft || scrollTop !== this._appliedScrollTop) {
          scrollChanged = true;
          this._appliedScrollLeft = scrollLeft;
          this._appliedScrollTop = scrollTop;
        }

        var clientWidth = element.clientWidth;
        var clientHeight = element.clientHeight;
        var clientSizeChanged = false;
        if (clientWidth !== this._clientWidth || clientHeight !== this._clientHeight) {
          clientSizeChanged = true;
          this._clientWidth = clientWidth;
          this._clientHeight = clientHeight;
        }

        if (scrollChanged || clientSizeChanged) {
          Ember.run.join(this, function sendActionsFromScrollCheck(){
            if (scrollChanged) {
              this.sendAction('scrollChange', scrollLeft, scrollTop);
            }
            if (clientSizeChanged) {
              this.sendAction('clientSizeChange', clientWidth, clientHeight);
            }
          });
        }
      }
    });
  });
;define("ember-collection/layout-bin-packer/bin", 
  ["ember-collection/layout-bin-packer/entry","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Entry = __dependency1__["default"];

    // I don't think this should have args
    __exports__["default"] = Bin; //mod btw

    function Bin(content, width) {
      this.width = width || 0;
      this.content = content;
    }

    function mustImplement(name) {
      return function() {
        throw new TypeError("MustImplement: " + name );
      };
    }

    // abstract
    Bin.prototype.objectAt = function (collection, index) {
      return collection[index];
    };

    // abstract: return coordinates of element at index.
    //
    // @param index: index of the element in content
    // @param width: viewport width.
    // @returns {x, y} coordinates of element at index.
    //
    // May reset cached viewport width.
    Bin.prototype.position = mustImplement('position');

    // abstract: reset internal state to be anchored at index.
    // @param index: index of the element in content
    Bin.prototype.flush = mustImplement('flush');

    // abstract: return total content height given viewport width.
    // @param width: viewport width
    //
    // May reset cached viewport width.
    Bin.prototype.height = mustImplement('height');

    // abstract: true if layout places more than one object on a line.
    Bin.prototype.isGrid = mustImplement('isGrid');

    function rangeError(length, index) {
      throw new RangeError("Parameter must be within: [" + 0 + " and " + length + ") but was: " + index);
    }

    __exports__.rangeError = rangeError;
    // abstract: returns number of elements in content.
    Bin.prototype.length = function () {
      return this.content.length;
    };

    // maximum offset of content wrt to viewport
    // The amount by which content (after being layed out) is taller than
    // the viewport.
    Bin.prototype.maxContentOffset = function Bin_maxContentOffset(width, height) {
      var contentHeight = this.height(width);
      var maxOffset = Math.max(contentHeight - height, 0);
      return maxOffset;
    }

    // abstract: returns index of first visible item.
    // @param topOffset: scroll position
    // @param width: width of viewport
    // @param height: height of viewport
    //
    Bin.prototype.visibleStartingIndex = mustImplement('visibleStartingIndex');

    // abstract: returns number of items visible in viewport.
    // @param topOffset: scroll position
    // @param width: width of viewport
    // @param height: height of viewport
    Bin.prototype.numberVisibleWithin = mustImplement('numberVisibleWithin');

    Bin.prototype.heightAtIndex = function (index) {
      return this.content[index].height;
    };

    Bin.prototype.widthAtIndex = function (index) {
      return this.content[index].width;
    };
  });
;define("ember-collection/layout-bin-packer/entry", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = function Entry(height, width, x, y) {
      this.height   = height;
      this.width    = width;
      this.position = {x:x, y:y};
    }
  });
;define("ember-collection/layout-bin-packer/fixed-grid", 
  ["ember-collection/layout-bin-packer/bin","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Bin = __dependency1__["default"];

    __exports__["default"] = FixedGrid;// mod btw

    function FixedGrid(content, elementWidth, elementHeight) {
      this._elementWidth =  elementWidth;
      this._elementHeight =  elementHeight;

      this._super$constructor(content);
    }

    FixedGrid.prototype = Object.create(Bin.prototype);
    FixedGrid.prototype._super$constructor = Bin;

    FixedGrid.prototype.flush = function (/* index, to */) {

    };

    FixedGrid.prototype.isGrid = function (width) {
      return (Math.floor(width / this.widthAtIndex(0)) || 1) > 1;
    };

    FixedGrid.prototype.visibleStartingIndex = function (topOffset, width, height) {
      topOffset = Math.min(topOffset, this.maxContentOffset(width, height));
      var columns = Math.floor(width / this.widthAtIndex(0)) || 1;

      return Math.floor(topOffset / this.heightAtIndex(0)) * columns;
    };

    FixedGrid.prototype.numberVisibleWithin = function (topOffset, width, height, withPadding) {
      var startingIndex = this.visibleStartingIndex(topOffset, width, height);
      var columns = Math.floor(width / this.widthAtIndex(0)) || 1;
      var length = this.length();

      var rowHeight = this.heightAtIndex(0);
      var rows = Math.ceil(height / rowHeight);

      var maxNeeded = rows * columns;

      if (withPadding) {
        maxNeeded += columns;
      }

      var potentialVisible = length - startingIndex;

      return Math.max(Math.min(maxNeeded, potentialVisible), 0);
    };

    FixedGrid.prototype.widthAtIndex = function (/* index */) {
      return this._elementWidth;
    };

    FixedGrid.prototype.heightAtIndex = function (/* index */) {
      return this._elementHeight;
    };

    FixedGrid.prototype.position = function (index, width) {
      var length = this.length();
      if (length === 0 || index > length) {
        rangeError(length, index);
      }

      var columns = Math.floor(width / this.widthAtIndex(index)) || 1;

      var x = index % columns * this.widthAtIndex(index) | 0;
      var y = Math.floor(index / columns) * this.heightAtIndex(index);

      return {x:x, y:y};
    };

    FixedGrid.prototype.height = function (visibleWidth) {
      if (typeof visibleWidth !== 'number') {
        throw new TypeError('height depends on the first argument of visibleWidth(number)');
      }
      var length = this.length();
      if (length === 0) { return 0; }

      var columnCount = Math.max(Math.floor(visibleWidth/this.widthAtIndex(0), 1));
      columnCount = columnCount > 0 ? columnCount : 1;
      var rows = Math.ceil(length/columnCount);
      var totalHeight = rows * this.heightAtIndex(0);

      return totalHeight;
    };
  });
;define("ember-collection/layout-bin-packer/shelf-first", 
  ["ember-collection/layout-bin-packer/bin","ember-collection/layout-bin-packer/entry","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Bin = __dependency1__["default"];
    var rangeError = __dependency1__.rangeError;
    var Entry = __dependency2__["default"];

    __exports__["default"] = ShelfFirst; //mod btw

    function ShelfFirst(content, width) {
      this._super$constructor(content, width);
      this._positionEntries = [];
    }

    ShelfFirst.prototype = Object.create(Bin.prototype);
    ShelfFirst.prototype._super$constructor = Bin;
    ShelfFirst.prototype.isGrid = function ShelfFirst_isGrid(width) {
      if (width != null && width !== this.width) {
        this.flush(0);
        this.width = width;
      }
      var length = this.length();
      var entry;

      // TODO: cache/memoize

      for (var i = 0; i < length; i++) {
        entry = this._entryAt(i);
        if (entry.position.x > 0) {
          return true;
        }
      }

      return false;
    };

    ShelfFirst.prototype.height = function (width) {
      if (width != null && width !== this.width) {
        this.flush(0);
        this.width = width;
      }

      var length = this.length();
      if (length === 0) { return 0; }

      // find tallest in last row, add to Y
      var tallest  = 0;
      var currentY = 0;
      var entry;

      for (var i = length - 1; i >= 0; i--) {
        entry = this._entryAt(i);

        if (currentY > entry.position.y) {
          break; // end of last row
        } else if (tallest < entry.height) {
          tallest = entry.height;
        } else {
          // do nothing
        }

        currentY = entry.position.y;
      }

      return currentY + tallest;
    };

    ShelfFirst.prototype.flush = function (position) {
      var positionEntries = this._positionEntries;
      if (positionEntries.length > position) {
        positionEntries.length = position;
      }
    };

    ShelfFirst.prototype.numberVisibleWithin = function (topOffset, width, height, withPadding) {
      if (width !== this.width) {
        this.flush(0);
        this.width = width;
      }

      var startingIndex = this.visibleStartingIndex(topOffset, width, height);

      return this._numberVisibleWithin(startingIndex, height, withPadding);
    };

    ShelfFirst.prototype._entryAt = function _entryAt(index) {
      var length = this.length();
      var width = this.width;

      if (index >= length) {
        rangeError(length, index);
      }

      var entry;
      var entries = this._positionEntries;
      var entriesLength = entries.length;
      var startingIndex;

      var y, x, i;
      var rowHeight = 0;
      var rowWidth = 0;

      if (index < entriesLength) {
        return this._positionEntries[index];
      } else if (entriesLength === 0) {
        startingIndex = 0;
        y = 0;
      } else {
        startingIndex = entriesLength - 1;
        entry = this._positionEntries[startingIndex];
        rowWidth = entry.position.x + entry.width;
        rowHeight = entry.height;
        y = entry.position.y;
        startingIndex++;
      }

      for (i = startingIndex; i < index + 1; i++) {
        var currentHeight = this.heightAtIndex(i);
        var currentWidth = this.widthAtIndex(i);

        if (entry && (currentWidth + rowWidth) > width) {
          // new row
          y = entry.position.y + entry.height;
          x = 0;
          rowWidth = 0;
          rowHeight = currentHeight;
        } else {
          x = rowWidth;
        }

        if (currentHeight > rowHeight) {
          rowHeight = currentHeight;
        }

        entry = this._positionEntries[i] = new Entry(rowHeight, currentWidth, x, y);

        rowWidth = x + currentWidth;
      }

      return entry;
    };

    ShelfFirst.prototype._numberVisibleWithin = function (startingIndex, height, withPadding) {
      var count = 0;
      var length = this.length();
      var entry, position;
      var currentY = 0;
      var yOffset = 0;

      if (startingIndex > 0 && startingIndex < length) {
        yOffset = this._entryAt(startingIndex).position.y;
      } else {
        yOffset = 0;
      }

      var firstRowHeight;
      for (var i = startingIndex; i < length; i++) {
        entry = this._entryAt(i);
        position = entry.position;

        if (currentY === position.y) {
          // same row
        } else {
          currentY = position.y - yOffset;
          if (withPadding && !firstRowHeight) {
            firstRowHeight = entry.height;
          }
        }

        if (currentY < height) {
          count++;
        } else if (withPadding) {
          withPadding = false;
          height += Math.max(firstRowHeight, entry.height) + 1;
          count++;
        } else {
          break;
        }
      }

      return count;
    };

    ShelfFirst.prototype.position = function position(index, width) {
      var length = this.length();

      if (length === 0 || index > length) {
        rangeError(length, index);
      }

      if (width !== this.width) {
        this.flush(0);
        this.width =  width;
      }

      return this._entryAt(index).position;
    };

    ShelfFirst.prototype.visibleStartingIndex = function (topOffset, width, visibleHeight) {
      if (topOffset <= 0 ) { return 0; }

      if (width != null && width!== this.width) {
        this.flush(0);
        this.width = width;
      }
      topOffset = Math.min(topOffset, this.maxContentOffset(width, visibleHeight));

      var height = this.height();
      var length = this.length();

      // Start searching using the last item in the list
      // and the bottom of the list for calculating the average height.

      // This algorithm is necessary for efficiently finding
      // the starting index of a list with variable heights
      // in less than O(n) time.

      // Ideally, the performance will be O(log n).
      // The algorithm implemented assumes that the best case
      // is a list of items with all equal heights.
      // Lists with consistent distributions should arrive
      // at results fairly quickly as well.
      var index = length;
      var bottom = height;
      var previousIndex;

      for (;;) {
        // Try to find an item that straddles the top offset
        // or is flush with it
        var averageHeight = bottom / index;

        // Guess the index based off the average height
        index = Math.min(Math.floor(topOffset / averageHeight), length - 1);
        if (previousIndex === index) {
          return index;
        }

        var entry = this._entryAt(index);
        var position = entry.position;

        var top = position.y;
        bottom = top + entry.height;

        previousIndex = index;

        if (bottom > topOffset) {
          // Walk backwards until we find an item that won't be shown
          while (bottom >= topOffset) {
            previousIndex = index;
            index--;

            if (index === -1) {
              break;
            }
            entry = this._entryAt(index);
            position = entry.position;
            bottom = position.y + entry.height;
          }

          return previousIndex;
        } else if (topOffset === bottom) {
          // Walk forwards until we find the next one- it should be close
          while (bottom <= topOffset) {
            index++;
            entry = this._entryAt(index);
            position = entry.position;
            bottom = position.y + entry.height;
          }
          return index;
        }
      }

      return -1;
    };
  });
;define("ember-collection/layouts/grid", 
  ["ember-collection/layout-bin-packer/fixed-grid","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var FixedGrid = __dependency1__["default"];

    __exports__["default"] = class Grid
    {
      constructor(cellWidth, cellHeight) {
        this.length = 0;
        this.bin = new FixedGrid(this, cellWidth, cellHeight);
      }

      contentSize(clientWidth/*, clientHeight*/) {
        return {
          width: clientWidth,
          height: this.bin.height(clientWidth)
        };
      }

      indexAt(offsetX, offsetY, width, height) {
        return this.bin.visibleStartingIndex(offsetY, width, height);
      }

      positionAt(index, width /*,height*/) {
        return this.bin.position(index, width);
      }

      widthAt(index) {
        return this.bin.widthAtIndex(index);
      }

      heightAt(index) {
        return this.bin.heightAtIndex(index);
      }

      count(offsetX, offsetY, width, height) {
        return this.bin.numberVisibleWithin(offsetY, width, height, true);
      }

      maxScroll(width, height) {
        return this.bin.maxContentOffset(width, height);
      }
    }
  });
;define("ember-collection/layouts/mixed-grid", 
  ["ember-collection/layout-bin-packer/shelf-first","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ShelfFirst = __dependency1__["default"];

    __exports__["default"] = class MixedGrid
    {
      constructor(content, width) {
        this.content = content;
        this.bin = new ShelfFirst(content, width);
      }

      contentSize(clientWidth/*, clientHeight*/) {
        return {
          width: clientWidth,
          height: this.bin.height(clientWidth)
        };
      }

      indexAt(offsetX, offsetY, width, height) {
        return this.bin.visibleStartingIndex(offsetY, width, height);
      }

      positionAt(index, width, height) {
        return this.bin.position(index, width, height);
      }

      widthAt(index) {
        return this.bin.widthAtIndex(index);
      }

      heightAt(index) {
        return this.bin.heightAtIndex(index);
      }

      count(offsetX, offsetY, width, height) {
        return this.bin.numberVisibleWithin(offsetY, width, height, true);
      }
      maxScroll(width, height) {
        return this.bin.maxContentOffset(width, height);
      }
    }
  });
  
   define('fixed-grid-layout', ['exports', 'ember', 'ember-collection/layouts/grid'], function (exports, Ember, Grid) {

        'use strict';

        exports['default'] = Ember['default'].Helper.helper(function (params, hash) {
                return new Grid['default'](params[0], params[1]);
            });

    });

    define('mixed-grid-layout', ['exports', 'ember', 'ember-collection/layouts/mixed-grid'], function (exports, Ember, MixedGrid) {

        'use strict';

        exports['default'] = Ember['default'].Helper.helper(function (params, hash) {
                return new MixedGrid['default'](params[0]);
            });

    });

    define('ember', ['exports'], function (__exports__) {
        __exports__['default'] = window.Ember;
    });

    var EmberCollection = require('ember-collection/components/ember-collection')['default'];
    App.EmberCollectionComponent = EmberCollection;
    var EmberNativeScrollable =  require('ember-collection/components/ember-native-scrollable')['default'];
    App.EmberNativeScrollableComponent = EmberNativeScrollable;
    App.__container__.registry._resolveCache["helper:mixedGridLayout"] = require('mixed-grid-layout')['default'];
    App.__container__.registry._resolveCache["helper:fixedGridLayout"] = require('fixed-grid-layout')['default'];
  
  
  })();