/**
 * 项目：GVML
 * 文件：NumberInput.js
 * 作者：qianjing
 * 部门：产品研发部
 * 邮箱：jqian@mail.ie.ac.cn
 * 日期：2017-06-11 ‏‎‏‎15:21:14
 * 用途：
 */
import React, { Component, PropTypes } from 'react';

import styles from './NumberInput.css';

export default class NumberInput extends Component {
    static PropTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        container: PropTypes.string,
        value: PropTypes.number,
        min: PropTypes.number,
        max: PropTypes.number,
        step: PropTypes.number,
        style: PropTypes.object,
        onchange: PropTypes.func
    }

    componentWillMount() {
        const {value, min} = this.props;
        let v;
        if (value !== undefined) v = value;
        else if (min !== undefined) v = min;
        else v = 0;
        // console.log(value, v);
        this.state = {
            value: v,
        };
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        const state = this.state;
        if (nextProps.value !== undefined) state.value = nextProps.value;
        else if (nextProps.min !== undefined) state.value = nextProps.min;
        else state.value = 0;
        this.setState(state);
        // console.log(this.state.value);
    }

    onchange(e) {
        const {onchange} = this.props;
        const state = this.state;
        state.value = e.target.value;
        this.setState(state);
        if (onchange) onchange(e.target.id, e.target.value);
    }

    render() {
        const {id, name, label, style, placeholder, container, min, max, step} = this.props;
        const state = this.state;
        return (
            <div style={style} className={styles.inputContainer}>
                <input
                  type="number"
                  id={id}
                  name={name}
                  placeholder={placeholder}
                  data-for={container}
                  data-value={state.value}
                  value={state.value}
                  min={min}
                  max={max}
                  step={step}
                  onChange={this.onchange.bind(this)}
                />
                <span>{label}</span>
            </div>
        );
    }
}
