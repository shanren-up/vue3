/**
 * 项目：GVML
 * 文件：PropsGroup.js
 * 作者：qianjing
 * 部门：产品研发部
 * 邮箱：jqian@mail.ie.ac.cn
 * 日期：2017-06-11 ‏‎11:37:31
 * 用途：
 */
import React, { Component, PropTypes } from 'react';
import PropsItem from '../PropsItem';
import styles from './PropsGroup.css';

export default class PropsGroup extends Component {
    static PropTypes = {
        name: PropTypes.string,
        label: PropTypes.string,
        container: PropTypes.string,
        properties: PropTypes.object,
        propCallback: PropTypes.func
    }

    componentWillMount() {
        this.state = {
            isContentShow: true,
        };
    }

    visible() {
        const state = this.state;
        state.isContentShow = !state.isContentShow;
        this.setState(state);
    }

    propCallback(id, value) {
        const {propCallback, name} = this.props;
        if (propCallback) propCallback(name, id, value);
    }

    render() {
        const {properties, name, container} = this.props;
        const state = this.state;
        const propList = properties.map((item) => {
            // console.log(item, item.name, item.type.type, item.value);
            const root = container;
            return (
                <PropsItem
                  key={item.name}
                  id={item.name}
                  container={root}
                  name={item.type.label}
                  type={item.type.type}
                  value={item.value}
                  option={item.type}
                  descipt={item.type.desciption}
                  propCallback={this.propCallback.bind(this)}
                />
            )
        });
        return (
            <div className={styles.propsGroup}>
                <div className={styles.propsTitle}>
                    <button
                      className={`${styles.propsShow} ${state.isContentShow ? styles.turndown : styles.turnright}`}
                      onClick={this.visible.bind(this)}
                    />
                    <span>{name}</span>
                </div>
                <div className={state.isContentShow ? styles.listshow : styles.listhide}>
                    {propList}
                </div>
            </div>
        );
    }
}
