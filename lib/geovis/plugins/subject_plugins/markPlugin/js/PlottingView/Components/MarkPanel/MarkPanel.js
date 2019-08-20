/**
 * 项目：GVML
 * 文件：MarkPanel.js
 * 作者：qianjing
 * 部门：产品研发部
 * 邮箱：jqian@mail.ie.ac.cn
 * 日期：2017‎-‎6‎-‎9‎ ‏‎15:43:30
 * 用途：
 */

import React, { Component, PropTypes } from 'react';
import Title from '../Title';
import styles from './MarkPanel.css';

export default class MarkPanel extends Component {

    static PropTypes = {
        baseURL: PropTypes.string,
        hamburgs: PropTypes.array,
        libButtons: PropTypes.object,
        recentButtons: PropTypes.array,
        markCallback: PropTypes.func
    }

    componentWillMount() {
        const {hamburgs, recentButtons, libButtons} = this.props;
        this.state = {
            libTitle: hamburgs.length > 0 ? hamburgs[0].name : '',
            nowaHumburg: hamburgs.length > 0 ? hamburgs[0].id : undefined,
            nowaTab: libButtons[hamburgs[0].id].tab ? libButtons[hamburgs[0].id].tab[0].tabID : 'default',
            nowaMarkBtn: undefined,
            recentMark: this.props.recentButtons ? recentButtons : []
        };
    }

    // 历史记录显隐
    recentShow() {
        const state = this.state;
        state.recentMark = [];
        this.setState(state);
    }

    // 选择库类别
    burgCallback(targetId) {
        const {hamburgs, libButtons} = this.props;
        const state = this.state;
        let hamburg;
        for (const v of hamburgs) {
            if (v.id === targetId) {
                hamburg = v;
                break;
            }
        }
        if (hamburg.lib) {
            state.nowaHumburg = hamburg.id;
            state.libTitle = hamburg.name;
            if (libButtons[hamburg.id].tab) {
                state.nowaTab = libButtons[hamburg.id].tab[0].tabID;
            } else {
                state.nowaTab = 'default';
            }
            this.setState(state);
        } else {
            alert('您选择了一个空标绘库！');
        }
    }

    // 点击标绘库按钮或者历史记录按钮所触发的事件
    clickButton(mark, that) {
        console.log(mark)
        const {markCallback} = that.props;
        const state = that.state;
        state.nowaMarkBtn = mark.id;
        that.setState(state);
        if (markCallback) markCallback(mark);
    }

    // 点击标绘库按钮事件
    clickMark(mark, that) {
        const state = that.state;
        const has = (obj, arr) => {
            for (const v of arr) {
                if (obj.id === v.id) return true;
            }
            return false;
        }
        const addToQueue = (obj, arr, length) => {
            if (arr.length < length) { // 从底部添加
                arr.push(obj);
            } else {
                arr[arr.length - 1] = obj;
            }
            let temp;
            for (let i = arr.length - 1; i > 0; i--) {
                temp = arr[i - 1];
                arr[i - 1] = arr[i];
                arr[i] = temp;
            }
            return arr;
        }
        if (has(mark, state.recentMark) === false) {
            state.recentMark = addToQueue(mark, state.recentMark, 16);
            state.isRecentShow = true;
            that.setState(state);
        }
        // 真正执行标绘操作
        that.clickButton(mark, that);
        // console.log(e.target.attributes['data-mark'].nodeValue);
    }

    clickTab(e) {
        const state = this.state;
        state.nowaTab = e.target.id;
        this.setState(state);
    }

    formatURL(file) {
      if (!file) return;
	    var tempUrl = file.split('/');
	    var htmlUrl = this.props.baseURL; //当前插件路径
	    if (!htmlUrl) return file;
	    htmlUrl = htmlUrl.split('/');

	    // 去掉末尾的‘/’
	    htmlUrl.pop();
	    var res = '';
	    for (var i = 0; i < tempUrl.length; i += 1) {
	        if (i === 0 && tempUrl[i] === '.') i += 1;
	        if (tempUrl[i] === '..') {
	            htmlUrl.pop();
	        } else {
	            htmlUrl.push(tempUrl[i]);
	        }
	    }
	    for (var _i = 0; _i < htmlUrl.length; _i += 1) {
	        var sp = _i === htmlUrl.length - 1 ? '' : '/';
	        res += htmlUrl[_i] + sp;
	    }
	    return res;
    }

    render() {
        const {hamburgs, libButtons} = this.props;
        const state = this.state;
        // 获取历史记录大小
        let style = { maxHeight: '330px' };
        if (state.recentMark.length > 0 && state.recentMark.length < 9) style = { maxHeight: '290px' };
        else if (state.recentMark.length >= 9) style = { maxHeight: '240px' };
        // 历史记录
        const recentButtons = state.recentMark.map((item) => {
            const styleImg = {
                backgroundImage: `url(${this.formatURL(item.image)})`
            };
            return (
                <button
                  key={`recent_${item.id}`}
                  title={item.description}
                  data-mark={item.id}
                  className={state.nowaMarkBtn === item.id ? `${styles.plotButton} ${styles.btnBorder}` : styles.plotButton}
                  style={styleImg}
                  onClick={() => {
                      this.clickButton(item, this);
                  }}
                />
            );
        });
        // 标绘库列表
        const mainButtons = {};
        let mainTabs = '';
        // console.log(libButtons);
        for (const v of hamburgs) {
            if (v.lib) {
                // 首先判断libButtons是否有tab
                if (libButtons[v.id].tab) {
                    mainTabs = libButtons[v.id].tab.map((item) => {
                        const tabStyle = {
                            backgroundColor: state.nowaTab === item.tabID ? item.color : 'transparent',
                            border: `1px solid ${state.nowaTab === item.tabID ? '#fff' : item.color}`}
                        return (
                            <button
                              key={item.tabID}
                              id={item.tabID}
                              className={styles.tabItem}
                              style={tabStyle}
                              onClick={this.clickTab.bind(this)}
                            >
                                {item.text}
                            </button>
                        );
                    });
                    mainButtons[v.id] = {};
                    for (const tab of libButtons[v.id].tab) {
                        mainButtons[v.id][tab.tabID] = tab.data.map((item) => {
                            const styleImg = { backgroundImage: `url(${this.formatURL(item.image)})`, border: `1px solid ${tab.color}`};
                            return (
                                <button
                                  key={`lib_${item.id}`}
                                  data-mark={item.id}
                                  title={item.description}
                                  className={state.nowaMarkBtn === item.id ? `${styles.plotButton} ${styles.btnBorder}` : styles.plotButton}
                                  style={styleImg}
                                  onClick={() => { this.clickMark(item, this); }}
                                />
                            );
                        });
                    }
                } else {
                    mainButtons[v.id] = {};
                    mainButtons[v.id]['default'] = libButtons[v.id].data.map((item) => {
                        const styleImg = { backgroundImage: `url(${this.formatURL(item.image)})`};
                        return (
                            <button
                              key={`lib_${item.id}`}
                              data-mark={item.id}
                              title={item.description}
                              className={state.nowaMarkBtn === item.id ? `${styles.plotButton} ${styles.btnBorder}` : styles.plotButton}
                              style={styleImg}
                              onClick={() => {
                                  this.clickMark(item, this);
                              }}
                            />
                        );
                    });
                }

            }
        }
        // console.log(mainButtons, state.nowaHumburg, state.nowaTab);
        // console.log(mainButtons[state.nowaHumburg][state.nowaTab]);
        // 渲染
        return (
            <div className={styles.panel}>
                <div>
                    <div className={styles.recentTitle}>
                        <span>最近使用</span>
                        <button className={styles.cancel} onClick={this.recentShow.bind(this)} />
                    </div>
                    <div
                      className={styles.recent}
                    >
                        {state.isRecentShow === true ? recentButtons : null}
                    </div>
                </div>
                <div>
                    <Title
                      title={state.libTitle}
                      nowaHumburg={state.nowaHumburg}
                      hamburg={hamburgs}
                      burgCallback={this.burgCallback.bind(this)}
                    />
                    <div className={styles.libContainer} style={style}>
                        <div className={state.nowaTab === 'default' ? styles.tabDefault : styles.tabList}>
                            {mainTabs}
                        </div>
                        {mainButtons[state.nowaHumburg][state.nowaTab]}
                    </div>
                </div>
            </div>
        );
    }
}
