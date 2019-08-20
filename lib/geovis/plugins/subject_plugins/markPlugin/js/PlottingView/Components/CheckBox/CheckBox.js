/**
 * 项目：GVML
 * 文件：CheckBox.js
 * 作者：qianjing
 * 部门：产品研发部
 * 邮箱：jqian@mail.ie.ac.cn
 * 日期：2017-06-11 ‏‎‏‎15:21:14
 * 用途：
 */
import React, { Component, PropTypes } from 'react';

import styles from './CheckBox.css';

export default class CheckBox extends Component {
    static PropTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        container: PropTypes.string,
        value: PropTypes.bool,
        style: PropTypes.object,
        label: PropTypes.string,
        onchange: PropTypes.func
    }

    componentWillMount() {
        const {value} = this.props;
        const check = value === true;
        this.state = {
            isChecked: check,
        };
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        const state = this.state;
        if (nextProps.value) {
            state.isChecked = true;
        } else {
            state.isChecked = false;
        }
        this.setState(state);
    }

    onchange(e) {
        const {onchange, id} = this.props;
        const state = this.state;
        state.isChecked = !state.isChecked;
        this.setState(state);
        if (onchange) onchange(id, e.target.checked);
    }

    render() {
        const {id, name, style, label, container} = this.props;
        const state = this.state;
        return (
            <div style={style} className={styles.inputContainer}>
                <input
                  type="checkbox"
                  id={id}
                  name={name}
                  data-for={container}
                  data-value={state.isChecked}
                  checked={state.isChecked}
                  onChange={this.onchange.bind(this)}
                />
                <label htmlFor={id} />
                <span className={styles.check_span}>{label}</span>
            </div>
        );
    }
}
