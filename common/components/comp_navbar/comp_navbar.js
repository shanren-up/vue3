define(
    [
        'app',
        'text!./comp_navbar.html',
        'css!./comp_navbar.css'
    ],
    function(app, template) {

        'use strict';

        // 在打开视图的parameters可以取到该对象
        var dataModel = Ember.Object.extend({
            isShow: true,
            imgSrc: 'img/first_click.png',
            title: '调度管理',
            templateName: 'comp-navbar'
        });

        app.CompNavbarComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-navbar',
            position: 'left',
            classNames: ['comp-navbar'],
            classNameBindings: ['_isOpenMeau:has-height'],
            dataSource: null,
            _isShowToggleBtn: false,
            _isOpenMeau: false,
            _isMouseOver: false,
            _needScroll: false,
            _top: 0,
            _timer: null,
            init: function() {
                this._super();
            },
            didInsertElement: function() {},
            willDestroyElement: function() {
                this._resetScorll();
            },
            showToggleBtn: Ember.computed('_isShowToggleBtn', '_isOpenMeau', function() {
                return this.get('_isShowToggleBtn') || this.get('_isOpenMeau');
            }),
            mouseEnter: function() {
                this.set('_isMouseOver', true);
            },
            mouseLeave: function() {
                this.set('_isMouseOver', false);
            },
            handleResize: function() {
                Ember.run.later(this, this._checkIfNeedScroll);
            },
            _navContainerStyle: Ember.computed('_top', function() {
                return 'top: {0}px;'.format(this.get('_top')).htmlSafe();
            }),
            /**
             * 检查菜单是否过多需要滚动
             * @method _checkIfNeedScroll
             * @private
             */
            _checkIfNeedScroll: function() {
                if (!this.get('_isOpenMeau') || this.isDestroyed || this.isDestroying || !this.$().length) {
                    return;
                }
                var containerHeight = this.$().height(),
                    meauHeight = this.$('.nav-container').height();
                if (containerHeight < meauHeight) {
                    this.set('_needScroll', true);
                } else {
                    this.set('_needScroll', false);
                    this.set('_top', 0);
                }
            },
            _scrollMeau: function(deltaY) {
                if (this._timer) {
                    return;
                }
                this._timer = setTimeout(function() {
                    this._timer = null;
                }.bind(this), 50);
                var top = this._top,
                    maxTop = this.$('.nav-container').height() - this.$().height();
                top = top - deltaY / 5;
                if (top > 0) {
                    top = 0;
                }
                if (top < -maxTop) {
                    top = -maxTop;
                }
                this.set('_top', top);
            },
            _resetScorll: function() {
                this.set('_top', 0);
                clearTimeout(this._timer);
            },
            actions: {
                clickMenuItem: function(item) {
                    if (item.templateName) {
                        this.openView(item);
                    }
                },
                _toggleMeauStatus: function() {
                    this.toggleProperty('_isOpenMeau');
                    if (this._isOpenMeau) {
                        Ember.run.later(this, this._checkIfNeedScroll, 500);
                    } else {
                        this._resetScorll();
                    }
                },
                _showToggleBtn: function() {
                    this.set('_isShowToggleBtn', true);
                },
                _hideToggleBtn: function() {
                    this.set('_isShowToggleBtn', false);
                },
                _scrollMeau: function(event) {
                    if (this._needScroll && this._isMouseOver) {
                        if (event.deltaY) {
                            this._scrollMeau(event.deltaY);
                        }
                    }
                }
            }
        });
        return dataModel;
    }
);