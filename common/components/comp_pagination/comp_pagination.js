/* 外部赋值：
 * pagcolumn: 显示多少个矩形页码块（默认10个）
 * maxnum：最大页码 --- 需要计算后传过来
 * lineNum： 每页多少行
 * allCountStr：总共多少行数据
 */
define(
    [
        'app',
        'configs',
        'text!./comp_pagination.html',
        'css!./comp_pagination.css',
    ],
    function(app, configs, template) {

        "use strict";

        app.CompPaginationComponent = Ember.Component.extend({
            layout: Ember.ExtendHelper.compileEx(template),
            templateName: 'comp-pagination',
            
            bottomHeight: 0,

            //外部赋值属性
            pagcolumn: 10,   
            maxnum: 100,
            lineNum: 20,
            allCountStr: "1000",

            checkednum: 1,
            columnlist: [],
            middleStr: "...",

            datasourceChanged: Ember.observer('maxnum', function() {
                this.initcolumn();
            }).on('didInsertElement'),

            initcolumn: function() {
                var list = [];
                if(this.maxnum <= this.pagcolumn) {
                    for(var i = 1; i <= this.maxnum; i++) {
                        list.push({
                            num: i,
                            selected: i === this.checkednum
                        });
                    }
                } else {
                    if(this.checkednum + this.pagcolumn - 1 > this.maxnum) {
                        //从后往前推
                        list.push({
                            num: this.middleStr,
                            selected: false
                        });
                        for(var l = this.maxnum - this.pagcolumn + 2; l <= this.maxnum; l++) {
                            list.push({
                                num: l,
                                selected: l === this.checkednum
                            });
                        }
                    } else if(this.checkednum < this.pagcolumn / 2) {
                        for(var f = this.checkednum; f < this.checkednum + this.pagcolumn / 2; f++) {
                            list.push({
                                num: f,
                                selected: f === this.checkednum
                            });
                        }
                        list.push({
                            num: this.middleStr,
                            selected: false
                        });
                        for(var o = this.maxnum - this.pagcolumn / 2 + 1; o <= this.maxnum; o++) {
                            list.push({
                                num: o,
                                selected: o === this.checkednum
                            });
                        }
                    } else {
                        list.push({
                            num: this.middleStr,
                            selected: false
                        });
                        var sNumber = this.checkednum - (this.pagcolumn - 2) / 2;
                        if(sNumber < 1) {
                            sNumber = 1;
                        }
                        for(var k = sNumber; k < sNumber + 8; k++) {
                            list.push({
                                num: k,
                                selected: k === this.checkednum
                            });
                        }
                        list.push({
                            num: this.middleStr,
                            selected: false
                        });
                    }
                }
                this.set("columnlist", list);
            },
            
            showcolumn: function(mnum) {
                var list = [];
                if(mnum <= this.pagcolumn) {
                    for(var i = 1; i <= mnum; i++) {
                        list.push({
                            num: i,
                            selected: i === this.checkednum
                        });
                    }
                } else {
                    if(this.checkednum + this.pagcolumn - 1 > mnum) {
                        //从后往前推
                        list.push({
                            num: this.middleStr,
                            selected: false
                        });
                        for(var l = mnum - this.pagcolumn + 2; l <= mnum; l++) {
                            list.push({
                                num: l,
                                selected: l === this.checkednum
                            });
                        }
                    } else if(this.checkednum < this.pagcolumn / 2) {
                        for(var f = this.checkednum; f < this.checkednum + this.pagcolumn / 2; f++) {
                            list.push({
                                num: f,
                                selected: f === this.checkednum
                            });
                        }
                        list.push({
                            num: this.middleStr,
                            selected: false
                        });
                        for(var o = mnum - this.pagcolumn / 2 + 1; o <= mnum; o++) {
                            list.push({
                                num: o,
                                selected: o === this.checkednum
                            });
                        }
                    } else {
                        list.push({
                            num: this.middleStr,
                            selected: false
                        });
                        var sNumber = this.checkednum - (this.pagcolumn - 2) / 2;
                        if(sNumber < 1) {
                            sNumber = 1;
                        }
                        for(var k = sNumber; k < sNumber + 8; k++) {
                            list.push({
                                num: k,
                                selected: k === this.checkednum
                            });
                        }
                        list.push({
                            num: this.middleStr,
                            selected: false
                        });
                    }
                }
                this.set("columnlist", list);
            },

            init: function() {
                this._super();
            },

            didInsertElement: function() {
                //this.initcolumn();
            },

            willDestroyElement: function() {

            },

            actions: {
                clickNum: function(num) {
                    if(this.middleStr === num) {
                        return;
                    }
                    this.setColumnStatus(num);
                },
                nextClick: function() {
                    if(this.checkednum < this.maxnum) {
                        this.setColumnStatus(this.checkednum + 1);
                    }
                },
                previousClick: function() {
                    if(this.checkednum > 1) {
                        this.setColumnStatus(this.checkednum - 1);
                    }
                },
                firstClick: function() {
                    this.setColumnStatus(1);
                },
                lastClick: function() {
                    this.setColumnStatus(this.maxnum);
                },
                gotoClick: function() {
                    var num = this.$("#myInputId").val();
                    if(num && parseInt(num, 10) > 0) {
                        var inum = parseInt(num, 10);
                        if(inum > 0 && inum <= this.maxnum) {
                            this.setColumnStatus(inum);
                        } else {
                            //err
                        }
                    } else {
                        //err
                    }
                },
            },

            setColumnStatus: function(num) {
                if(num !== this.checkednum) {
                    var self = this;
                    self.columnlist.forEach(function(obj) {
                        if(Number(obj.num) === Number(num)) {
                            Ember.set(obj, 'selected', true);
                        } else {
                            Ember.set(obj, 'selected', false);
                        }
                    });
                    self.set('checkednum', num);
                    this.initcolumn();
                    this.sendAction("changenum", num);
                }
            },

        });
    });