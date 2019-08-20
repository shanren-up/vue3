/**
 * 项目：GVML
 * 文件：Title.js
 * 作者：qianjing
 * 部门：产品研发部
 * 邮箱：jqian@mail.ie.ac.cn
 * 日期：2017‎-‎6‎-‎9‎ ‏‎20:05:23
 * 用途：标题栏
 */

import React, { Component, PropTypes } from 'react';

import styles from './Title.css';

export default class MarkPanel extends Component {

    static PropTypes = {
        title: PropTypes.string,
        nowaHumburg: PropTypes.string,
        hamburg: PropTypes.object,
        burgCallback: PropTypes.func
    }

    componentWillMount() {
        const {nowaHumburg} = this.props;
        this.state = {
            chooseList: false,
            chooseItem: nowaHumburg
        };
    }

    showList() {
        const state = this.state;
        state.chooseList = !state.chooseList;
        this.setState(state);
    }

    choose(e) {
        const {burgCallback} = this.props;
        const state = this.state;
        if (state.chooseItem === e.target.id) return;
        state.chooseItem = e.target.id;
        state.chooseList = !state.chooseList;
        this.setState(state);
        if (burgCallback) burgCallback(state.chooseItem);
    }

    render() {
        const { title, hamburg } = this.props;
        const state = this.state;
        const hamburgDIV = hamburg ?
            <button className={state.chooseList ? `${styles.hamburg} ${styles.hamburgChecked}` : styles.hamburg} onClick={this.showList.bind(this)} /> : null;
        let menuList = null;
        let menuHeight = 10;
        if (state.chooseList === true) {
            menuList = hamburg.map((item) => {
                menuHeight += 30;
                return (
                    <button
                      id={item.id}
                      key={item.id}
                      className={state.chooseItem === item.id ? styles.checkItem : ''}
                      onClick={this.choose.bind(this)}
                    >
                        {item.name}
                    </button>
                );
            });
        }
        const menuStyle = { height: `${menuHeight}px`}
        return (
            <div className={styles.title}>
                <span>{title}</span>
                {hamburgDIV}
                <div className={state.chooseList ? styles.menu : styles.menuHide} style={menuStyle}>
                    {menuList}
                </div>
            </div>
        );
    }
}
