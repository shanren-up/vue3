/**
 * 项目：GVML
 * 文件：PropsPanel.js
 * 作者：qianjing
 * 部门：产品研发部
 * 邮箱：jqian@mail.ie.ac.cn
 * 日期：2017-06-10 ‏‎16:08:37
 * 用途：
 */
import React, { Component, PropTypes } from 'react';
import PropsGroup from '../PropsGroup';
import styles from './PropsPanel.css';

export default class PropsPanel extends Component {
    static PropTypes = {
        id: PropTypes.string,
        config: PropTypes.object,
        container: PropTypes.string,
        propCallback: PropTypes.func
    }

    componentWillMount() {
        this.state = {
            isRecentShow: true,
            configValue: undefined
        };
    }

    componentWillReceiveProps(nextProps) {
        const state = this.state;
        if (window.store['store-Prop']) {
            // console.log(nextProps.config.property);
            state.configValue = { style: {} };
            for (const v in window.store['store-Prop'].properties) {
                if (v === 'style') {
                    for (const s in window.store['store-Prop'].properties[v]) {
                        if (nextProps.config.property[v][s])
                            state.configValue[v][s] = window.store['store-Prop'].properties[v][s];
                    }
                } else if (nextProps.config.property[v]) {
                    state.configValue[v] = window.store['store-Prop'].properties[v];
                }
            }
        } else {
            state.configValue = undefined;
        }
        this.setState(state);
        // console.log(state.configValue);
        window.store['store-Prop'] = undefined;
    }

    propCallback(name, id, value) {
        const {propCallback} = this.props;
        if (propCallback) propCallback(name, id, value);
    }

    render() {
        const {id, config, container} = this.props;
        const state = this.state;
        const propValue = state.configValue ? state.configValue : { style: {}}
        const simpleProps = [];
        const styleProps = [];
        for (const v in config.property) {
            if (v === 'style') {
                for (const s in config.property[v]) {
                    styleProps.push({
                        name: s,
                        type: config.property[v][s].type,
                        value: propValue[v][s] ? propValue[v][s] : config.property[v][s].value
                    });
                }
            } else {
                simpleProps.push({
                    name: v,
                    type: config.property[v].type,
                    value: propValue[v] ? propValue[v] : config.property[v].value
                });
            }
        }
        return (
            <div className={styles.propsContainer} id={id}>
                <PropsGroup
                  label={id}
                  name={'属性'}
                  type={'properties'}
                  properties={simpleProps}
                  container={container}
                  propCallback={this.propCallback.bind(this)}
                />
                <PropsGroup
                  label={id}
                  name={'样式'}
                  type={'styles'}
                  container={container}
                  properties={styleProps}
                  propCallback={this.propCallback.bind(this)}
                />
            </div>
        );
    }
}
