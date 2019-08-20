define(
    [
        'app',
        'json!./cultureInfo.json',
        'configs',
        'text!./comp_nosourcedatapager.html',
        'common/components/comp_msgbox/comp_msgbox',
        'css!./comp_nosourcedatapager.css',
        'css!bootstrap_tablecss',
        'css!./comp_nosourcedatapager_theme_default.css'
    ],
    function(app, cultureInfo, configs, template, msgBox) {

        "use strict";
        Ember.addJsonCultureInfo(cultureInfo);

        app.CompNosourcedatapagerComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),

            templateName: "comp-nosourcedatapager",
            //传入参数
            config: null,
            //是否为简略模式
            isSimpleModel: false,
            //提示框
            messageBox: null,
            //外部传入需条转的页码
            curPage: 0,

            //总条数
            _totalSize: 0,
            //每页显示条数
            _pageSize: 30,
            //总共多少页
            _totalPageNum: 1,
            //页数选择下拉框
            _pageSizeSelect: null,
            //起始条数
            _startIndex: 1,
            //结束条数
            _endIndex: 1,
            //当前页页码
            _curPage: 1,
            //输入的跳转页码
            _inputCurPage: 1,
            //页数选择是否显示 
            showPageSizeSelect: null,
            //末页是否被选中
            _isLastPageSelect: false,
            //是否显示页数输入框
            _isShowPageInput: false,
            //显示页数
            _pageNum: null,

            configChanged: Ember.observer('config', 'config.totalCount', 'config.pageSize', function() {
                if (this.config && this.config.totalCount !== 0 && this.config.totalCount !== undefined && this.config.totalCount !== null) {
                    this.set('_totalSize', this.config.totalCount);
                    this.set('_pageSize', this.config.pageSize);
                    this._setData();
                } else {
                    this.set('_totalSize', 0);
                    this.set('_totalPageNum', 0);
                    this.set('_startIndex', 0);
                    this.set('_endIndex', 0);
                    if (this.config) {
                        this.set('_pageSize', this.config.pageSize);
                    }
                    this._setPageNumbers();
                }
            }),
            _isShowPageSizeSelect: Ember.computed('showPageSizeSelect', '_totalSize', '_pageSizeSelect.0', function() {
                if (this.showPageSizeSelect !== null) {
                    return this.get('showPageSizeSelect');
                }
                // 不设置默认自动判断 总数小于待选分页数，不显示分页选择
                if (this._totalSize > this._pageSizeSelect[0]) {
                    return true;
                } else {
                    return false;
                }
            }),

            //外部传的跳转当前页
            curPageChange: Ember.observer('curPage', function() {
                if (this.curPage) {
                    this.set('_curPage', this.curPage);
                    this.set('_inputCurPage', this.curPage);
                }
            }),

            //点击当前页
            curPageIndexChanged: Ember.observer('_curPage', function() {
                this.set('_startIndex', (this._curPage - 1) * this._pageSize + 1);
                var endNum = this._curPage * this._pageSize;
                if (endNum > this._totalSize) {
                    this.set('_endIndex', this._totalSize);
                } else {
                    this.set('_endIndex', endNum);
                }
                //当前页为最后一页，选中
                if (this._curPage === this._totalPageNum) {
                    this.set('_isLastPageSelect', true);
                } else {
                    this.set('_isLastPageSelect', false);
                }
                this._setPageNumbers();
                console.log(Ember.oloc('comp_nosourcedatapager_dqy') + (this._startIndex - 1) + ' ' + this._endIndex);
                this.sendAction('currentPageChanged', this._startIndex - 1, this._endIndex);
            }),

            //每页显示条数改变
            _pageSizeChange: Ember.observer('_pageSize', function() {
                var flag = this._curPage;
                this._setData();
                if (flag === 1) {
                    this.sendAction('currentPageChanged', 0, this._pageSize < this._totalSize ? this._pageSize : this._totalSize);
                }
            }),

            init: function() {
                this._super();
                this.messageBox = msgBox.create();
                this.set('_pageSizeSelect', [10, 20, 30, 50, 100, 200]);
                this.set('_isLastPageSelect', true);
                if (this.config && this.config.totalCount !== 0) {
                    this.set('_totalSize', this.config.totalCount);
                    this.set('_pageSize', this.config.pageSize);
                    this.set('_pageNum', []);
                    this._setData();
                } else {
                    this.set('_startIndex', 0);
                    this.set('_endIndex', 0);
                }
            },

            didInsertElement: function() {

            },

            willDestroyElement: function() {
                if (this.messageBox) {
                    this.messageBox.destroy();
                    this.set('messageBox', null);
                }
            },

            //设置分页相关数据
            _setData: function() {
                this.set('_totalPageNum', Math.ceil(this._totalSize / this._pageSize));
                this.set('_curPage', 1);
                this.set('_startIndex', 1);
                if (this._totalSize <= this._pageSize) {
                    this.set('_endIndex', this._totalSize);
                    this.set('_isLastPageSelect', true);
                } else {
                    this.set('_endIndex', this._pageSize);
                    this.set('_isLastPageSelect', false);
                }
                //设置页数
                this._setPageNumbers();
            },

            //设置页数（不包含左右，最多显示7格页码，有...时左右最多显示5项）
            _setPageNumbers: function() {
                var pageNumbers = [];
                var length = this._totalPageNum;
                if (length === 0) {
                    this.set('_pageNum', pageNumbers);
                    this.set('_totalPageNum', 1);
                    return;
                }
                //页数为1不需进行页数的设置
                if (length !== 1) {
                    for (var i = 1; i < length; i += 1) {
                        var pageNum = Ember.Object.create();
                        if (i === this._curPage) {
                            pageNum.set('active', true);
                        } else {
                            pageNum.set('active', false);
                        }
                        if (length <= 7) {
                            //页数小于7，显示全部页码
                            pageNum.set('disabled', false);
                            pageNum.set('num', i);
                            pageNumbers.pushObject(pageNum);
                        } else if (this._curPage <= 4 && i < 6) {
                            //当前页小于4，显示1-5页码
                            pageNum.set('disabled', false);
                            pageNum.set('num', i);
                            pageNumbers.pushObject(pageNum);
                        } else if (i >= 7 && this._curPage <= 4) {
                            //当前页小于4，总页数大于7，5页码后显示“...”，循环停止
                            pageNum.set('disabled', true);
                            pageNum.set('num', '...');
                            pageNumbers.pushObject(pageNum);
                            break;
                        }
                    }
                    //总页数大于7，当前页数大于4
                    if (pageNumbers.length === 0 && this._curPage < this._totalPageNum - 3) {
                        pageNumbers = [{
                                active: false,
                                disabled: false,
                                num: 1
                            },
                            {
                                active: false,
                                disabled: true,
                                num: '...'
                            },
                            {
                                active: false,
                                disabled: false,
                                num: this._curPage - 1
                            },
                            {
                                active: true,
                                disabled: false,
                                num: this._curPage
                            },
                            {
                                active: false,
                                disabled: false,
                                num: this._curPage + 1
                            },
                            {
                                active: false,
                                disabled: true,
                                num: '...'
                            }
                        ];
                    } else if (pageNumbers.length === 0) {
                        pageNumbers = [{
                                active: false,
                                disabled: false,
                                num: 1
                            },
                            {
                                active: false,
                                disabled: true,
                                num: '...'
                            },
                            {
                                active: this._curPage === this._totalPageNum - 4,
                                disabled: false,
                                num: this._totalPageNum - 4
                            },
                            {
                                active: this._curPage === this._totalPageNum - 3,
                                disabled: false,
                                num: this._totalPageNum - 3
                            },
                            {
                                active: this._curPage === this._totalPageNum - 2,
                                disabled: false,
                                num: this._totalPageNum - 2
                            },
                            {
                                active: this._curPage === this._totalPageNum - 1,
                                disabled: false,
                                num: this._totalPageNum - 1
                            }
                        ];
                    }
                }
                this.set('_pageNum', pageNumbers);
            },
            actions: {
                //每页显示页数修改
                pageSizeSelectChange: function(data) {
                    this.set('_pageSize', data);
                },
                //上一页
                prePage: function() {
                    if (this._totalSize === 0) {
                        //页数为0，不操作
                        return false;
                    } else if (this._curPage === 1) {
                        //当前为第一页，转到最后一页
                        this.set('_curPage', this._totalPageNum);
                    } else {
                        //上一页
                        this.set('_curPage', this._curPage - 1);
                    }
                },
                //下一页
                nextPage: function() {
                    if (this._curPage === this._totalPageNum) {
                        //当前已是最后一页，转到第一页
                        this.set('_curPage', 1);
                    } else if (this._curPage > this._totalPageNum) {
                        //页数为0，不操作
                        return false;
                    } else {
                        //下一页
                        this.set('_curPage', this._curPage + 1);
                    }
                },
                setCurPage: function(data) {
                    this.set('_curPage', data);
                },
                inputCurPage: function() {
                    this.set('_inputCurPage', event.target.value);
                },
                confirmCurPage: function() {
                    if ((/^[1-9]\d*$/.test(this._inputCurPage)) && this._inputCurPage !== '') {
                        if (this._inputCurPage - '' > this._totalPageNum) {
                            this.messageBox.showError(Ember.oloc('comp_nosourcedatapager_srdysdyzys。'));
                            this.set('_inputCurPage', this._curPage);
                        } else {
                            this.set('_curPage', this._inputCurPage - '');
                        }
                    } else {
                        this.messageBox.showError(Ember.oloc('comp_nosourcedatapager_mytsbxszzs。'));
                        this.set('_inputCurPage', this._curPage);
                    }
                }
            }
        });
    }
);