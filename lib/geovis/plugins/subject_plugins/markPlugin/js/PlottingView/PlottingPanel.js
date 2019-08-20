import React, { Component, PropTypes } from 'react';
import MarkPanel from './Components/MarkPanel';
import PropsPanel from './Components/PropsPanel';
import Title from './Components/Title';
import NodeConfig from './PlottingConfig/NodeConfig';
import * as Config from './PlottingConfig/PropsConfig';

import styles from './PlottingStyle.css';

export default class PlottingPanel extends Component {

    static PropTypes = {
        baseURL: PropTypes.string, 
        hamburgs: PropTypes.array,
        marklibs: PropTypes.object,
        container: PropTypes.string,
        markCallback: PropTypes.func,
        propCallback: PropTypes.func
    }

    componentWillMount() {
        this.state = {
            nowaMark: undefined,
            markid: undefined
        };
    }

    getElementsByAttr(attrName, attrValue) {
        const doc = document.getElementsByTagName('*');
        if (!attrName) return doc;
        const doms = [];
        for (const d of doc) {
            if (d.attributes[attrName]) {
                if (attrValue) {
                    if (d.attributes[attrName].nodeValue === attrValue) doms.push(d);
                } else {
                    doms.push(d);
                }
            }
        }
        return doms;
    }

    getElementById(id, doms) {
        if (doms === undefined || doms instanceof Array === false) return null;
        for (const dom of doms) {
            if (dom.id === id) return dom;
        }
        return null;
    }

    forceUpdateProps() {
        const state = this.state;
        window.setInterval(() => {
            if (window.store['store-Prop']) {
                state.nowaMark = window.store['store-Prop'].className;
                this.setState(state);
            }
        }, 500);
    }

    format(value, prop, style) {
        if (typeof value !== 'string') return value;
        const config = prop === 'style' ? Config.style[style] : Config.properties[prop];
        if (config.type === Config.htmlType.BOOLEAN) return value === 'true';
        else if (config.type === Config.htmlType.NUMBER) {
            if (config.step && config.step < 1) return parseFloat(value);
            return parseInt(value, 0);
        }
        return value;
    }

    markCallback(target) {
        // console.log(target.creator);
        const state = this.state;
        window.store['store-Mark'] = undefined;
        if (target.creator && NodeConfig[target.creator]) {
            state.nowaMark = target.creator;
            state.markid = target.id;
            // 根据target去寻找其对应类的属性和样式
            const className = NodeConfig[target.creator].name;
            const propsName = NodeConfig[target.creator].property;
            let length = 0;
            for (const i in propsName) {
                if (i !== 'style') {
                    length++;
                } else {
                    for (const j in propsName[i]) {
                        length++;
                    }
                }
            }
            const inv = setInterval(() => {
                // console.log('waiting...');
                let isBuild = false;
                let buildLength = 0;
                for (const i in propsName) {
                    if (i !== 'style') {
                        const dom = document.getElementById(i);
                        // console.log(i, dom);
                        if (dom !== null) buildLength++; else return;
                    } else {
                        for (const j in propsName[i]) {
                            const dom = document.getElementById(j);
                            // console.log(j, dom);
                            if (dom !== null) buildLength++; else return;
                        }
                    }
                }
                if (buildLength >= length) isBuild = true;
                if (isBuild) {
                    // console.log('is_build');
                    window.clearInterval(inv);
                    const tempprops = { style: {} };
                    const doms = this.getElementsByAttr('data-for', this.props.container);
                    for (const i in propsName) {
                        if (i === 'style') {
                            for (const s in propsName[i]) {
                                const dom = this.getElementById(s, doms); // 从doms中选择
                                if (dom !== null) tempprops[i][s] = this.format(dom.attributes['data-value'].nodeValue, i, s);
                            }
                        } else {
                            const dom = this.getElementById(i, doms);
                            if (dom !== null) tempprops[i] = this.format(dom.attributes['data-value'].nodeValue, i);
                        }
                    }
                    window.store['store-Mark'] = {
                        config: target,
                        className: className,
                        props: tempprops
                    };
                    // console.log(window.store['store-Mark']);
                }
            }, 300);
        } else if (target === undefined) {
            state.nowaMark = undefined;
        }
        // console.log(state.markid, '=========================', state.nowaMark);
        this.setState(state);
    }

    propCallback(name, id, value) {
        const {propCallback} = this.props;
        const state = this.state;
        const props = NodeConfig[state.nowaMark].property;
        if (props[id] && window.store['store-Mark']) {
            window.store['store-Mark'].props[id] = this.format(value, id);
        } else if (props.style[id] && window.store['store-Mark']) {
            // console.log(window.store['store-Mark']);
            window.store['store-Mark'].props.style[id] = this.format(value, 'style', id);
        }
        if (propCallback) propCallback(name, id, value);
    }

    render() {
        const {hamburgs, marklibs, container, baseURL} = this.props;
        const state = this.state;
        const style = { margin: 0 };
        this.forceUpdateProps();
        // 属性面板
        const propsPanel = {};
        for (const v in NodeConfig) {
            propsPanel[v] = (
                <PropsPanel
                  id={state.markid}
                  config={NodeConfig[v]}
                  container={container}
                  propCallback={this.propCallback.bind(this)}
                />
            );
        }
        return (
            <div className={styles.panel}>
                <div className={styles.block}>
                    <div style={style}>
                        <div className={styles.markTitle}>
                            <div className={styles.leftBorder} />
                            <span>标绘工具</span>
                        </div>
                        <MarkPanel
                          baseURL={baseURL}
                          hamburgs={hamburgs}
                          libButtons={marklibs}
                          markCallback={this.markCallback.bind(this)}
                        />
                    </div>
                </div>
                <div className={`${styles.block} ${styles.block_bottom}`}>
                    <Title title={'属性修改器'} />
                    { state.nowaMark ? propsPanel[state.nowaMark] : null }
                </div>
            </div>
        );
    }
}
