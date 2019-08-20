define(
    [
        'app',
        'text!./comp_splitpane.html',
        'lib/split-pane/split-pane',
        'css!lib/split-pane/split-pane.css',
        'css!./comp_splitpane.css'
    ],
    function(app, template) {

        'use strict';

        app.CompSplitpaneComponent = Ember.Component.extend({
            templateName: 'comp-splitpane',
            layout: Ember.ExtendHelper.compileEx(template),
            classNames: ['split-pane'],
            classNameBindings: ['splitStyle'],
            //标识是上下分(horizontal-percent)，还是左右分(vertical-percent)
            splitStyle: '',
            //是否默认展开,默认不展开
            isDefaultExpand: false,
            //弹出的时候高度(topBottom)，或着宽度(leftRight)
            showSize: 200,
            //关闭的时候高度(topBottom)，或着宽度(leftRight)
            hiddenSize: 0,
            _defaultRoute: 0,
            _clickTemp: undefined,
            _mouseDownTemp: undefined,
            _mouseMoveTemp: undefined,
            _timer: undefined,
            _splitComponent: undefined,
            init: function() {
                this._setDefault();
                this._super();
            },
            willDestroy: function() {
                this.$arrow.off('click', this._callback);
            },
            willInsertElement: function() {

            },
            didInsertElement: function() {
                this.findNames();
                this._insertDom();
                this._registerEvent();
                $(this.element).splitPane();
                Ember.run.later(function() {
                    if (this.isDefaultExpand) {
                        this.showClick(true);
                    }
                }.bind(this), 500);

            },
            //弹出和隐藏切换事件
            toggleClick: function() {
                this._clickCallback();
            },
            /**
             * showClick 显示下方控件
             *@param isShow true:显示，false，隐藏
             */
            showClick: function(isShow) {
                if (isShow) {
                    this._showLastComponent();
                } else {
                    this._hiddenComponent();
                }
            },
            _setDefault: function() {
                // this._defaultRoute = this.splitStyle === 'horizontal-percent' ? 0 : 90;
                this._splitComponent = this.splitStyle === 'horizontal-percent' ? 'lastComponentSize' : 'firstComponentSize';
                this.$divider = undefined;
                this.$arrow = undefined;
            },
            _registerEvent: function() {
                this._clickTemp = this._clickCallback.bind(this);
                this._mouseDownTemp = this._mouseDownCallback.bind(this);
                this._mouseMoveTemp = this._mouseMoveCallback.bind(this);
                this.$arrow.on('mousedown', this._clickTemp);
                this.$divider.on('mousedown', this._mouseDownTemp);
            },
            _mouseMoveCallback: function() {
                var self = this;
                this._outTime(function() {
                    self._comHandleResize();
                });
            },
            _comHandleResize: function() {
                for (var i = 0; i < this.childViews.length; i++) {
                    if (this.childViews[i].handleResize) {
                        var elementList = $(this.childViews[i].element).parents('.split-pane-component');
                        var element = elementList.length > 0 ? elementList[0] : null;
                        var size = this._getChildSize(element);
                        this.childViews[i].handleResize(size.width, size.height);
                    }
                }
            },
            _mouseDownCallback: function() {
                var self = this;
                this.$divider.on('mousemove', this._mouseMoveTemp);
                this.$divider.one('mouseup', function(event) {
                    self.$divider.off('mousemove', self._mouseMoveTemp);
                });
            },
            _insertDom: function() {
                if (this.element.childElementCount === 2) {
                    this.firstChildren = this.element.firstElementChild;
                    this.lastChildren = this.element.lastElementChild;
                    this.firstChildren.classList.add('split-pane-component');
                    this.lastChildren.classList.add('split-pane-component');
                    var divider = "<div class='split-pane-divider'><span></span><span></span></div>";
                    this.firstChildren.insertAdjacentHTML('afterEnd', divider);
                    this.$divider = $(this.element).children('.split-pane-divider').children('span:first-child');
                    this.$arrow = $(this.element).children('.split-pane-divider').children('span:last-child');
                } else {
                    console.error('[comp_splitpane error:] splitpane must be have only two children');
                }
            },
            _clickCallback: function(e) {
                e.stopPropagation();
                e.preventDefault();
                var size = this._getChildSize();
                var bSize = this.splitStyle === 'horizontal-percent' ? parseInt(size.height, 10) : parseInt(size.width, 10);
                if (bSize >= 50) {
                    this._hiddenComponent();
                } else {
                    this._showLastComponent();
                }
            },
            _hiddenComponent: function() {
                this.rota = this._defaultRoute;
                this.$arrow.css({
                    'transform': 'rotate(' + this.rota + 'deg)'
                });
                this.$(this.element).splitPane(this._splitComponent, this.hiddenSize);
            },
            _showLastComponent: function() {
                this.rota = this._defaultRoute + 180;
                this.$arrow.css({
                    'transform': 'rotate(' + this.rota + 'deg)'
                });
                this.$(this.element).splitPane(this._splitComponent, this.showSize);
                this._comHandleResize();
            },
            _getChildSize: function(element) {
                var size = { width: 0, height: 0 };
                switch (this.splitStyle) {
                    case 'horizontal-percent':
                        size = this._getCommonSize(element || this.lastChildren);
                        break;
                    case 'vertical-percent':
                        size = this._getCommonSize(element || this.firstChildren);
                        break;
                }
                return size;
            },
            _getCommonSize: function(element) {
                return { width: $(element).width(), height: $(element).height() };
            },
            _outTime: function(fn, interval) {
                var self = this;
                if (!this._timer) {
                    this._timer = setTimeout(function() {
                        clearTimeout(self._timer);
                        self._timer = null;
                        fn();
                    }, interval || 300);
                }
            }
        });
    });