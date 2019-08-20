/**
 * 项目：GVML
 * 文件：PropsItem.js
 * 作者：qianjing
 * 部门：产品研发部
 * 邮箱：jqian@mail.ie.ac.cn
 * 日期：2017-06-11 ‏‎14:36:03
 * 用途：
 */
import React, { Component, PropTypes } from 'react';
import * as Config from '../../PlottingConfig/PropsConfig';
import TextInput from '../TextInput';
import NumberInput from '../NumberInput';
import ColorInput from '../ColorInput';
import CheckBox from '../CheckBox';
import Select from '../Select';

import styles from './PropsItem.css';

export default class PropsItem extends Component {
    static PropTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        container: PropTypes.string,
        value: PropTypes.object,
        option: PropTypes.object,
        descript: PropTypes.string,
        propCallback: PropTypes.func
    }

    componentWillMount() {
        this.state = {
            isContentShow: true,
        };
    }

    onchange(id, value) {
        // console.log('select');
        const {propCallback} = this.props;
        if (propCallback) propCallback(id, value);
    }

    render() {
        const {id, name, descript, type, value, option, container} = this.props;
        // console.log(id, name, type);
        let input;
        const style = {
            marginLeft: '12px',
            marginTop: '4px',
            height: '18px',
            position: 'absolute'
        };
        switch (type) {
            case Config.htmlType.TEXT:
                style.width = '120px';
                input = (
                    <TextInput
                      name={name}
                      id={id}
                      container={container}
                      style={style}
                      label={option.unit}
                      value={value}
                      onchange={this.onchange.bind(this)}
                    />
                );
                break;
            case Config.htmlType.BOOLEAN:
                input = (
                    <CheckBox
                      name={name}
                      id={id}
                      container={container}
                      style={style}
                      value={value}
                      label={option.unit}
                      onchange={this.onchange.bind(this)}
                    />
                );
                break;
            case Config.htmlType.COLOR:
                input = (
                    <ColorInput
                      name={name}
                      id={id}
                      container={container}
                      style={style}
                      value={value}
                      onchange={this.onchange.bind(this)}
                    />
                );
                break;
            case Config.htmlType.NUMBER:
                style.width = '100px';
                input = (
                    <NumberInput
                      name={name}
                      id={id}
                      container={container}
                      style={style}
                      value={value}
                      min={option.min}
                      max={option.max}
                      step={option.step}
                      label={option.unit}
                      onchange={this.onchange.bind(this)}
                    />
                );
                break;
            case Config.htmlType.SELECT:
                const options = [];
                for (const v in option.options) {
                    options.push(option.options[v]);
                }
                input = (
                    <Select
                      name={name}
                      id={id}
                      container={container}
                      style={style}
                      value={value}
                      options={options}
                      onchange={this.onchange.bind(this)}
                    />
                );
                break;
            default: input = null; break;
        }
        return (
            <div className={styles.propsItem}>
                <div className={styles.propsTitle} title={descript}>
                    <span>{name}</span>
                </div>
                <div className={styles.propsType}>
                    {input}
                </div>
            </div>
        );
    }
}
