/**
 * 项目：GVML
 * 文件：Select.js
 * 作者：qianjing
 * 部门：产品研发部
 * 邮箱：jqian@mail.ie.ac.cn
 * 日期：2017-06-11 ‏‎‏‎15:21:14
 * 用途：
 */
import React, { Component, PropTypes } from 'react';

import styles from './Select.css';

export default class Select extends Component {
    static PropTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        options: PropTypes.array.isRequired,
        value: PropTypes.string,
        container: PropTypes.string,
        style: PropTypes.object,
        onchange: PropTypes.func
    }

    componentWillMount() {
        const {value, options} = this.props;
        const check = value === undefined ? options[0] : value;
        this.state = {
            value: check,
        };
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        const state = this.state;
        if (nextProps.value) {
            state.value = nextProps.value;
        } else {
            state.value = nextProps.options[0];
        }
        this.setState(state);
    }

    onchange(e) {
        // console.log('select');
        const {onchange} = this.props;
        const state = this.state;
        state.value = e.target.value;
        this.setState(state);
        if (onchange) onchange(e.target.id, e.target.value);
    }

    render() {
        const {id, name, style, options, container} = this.props;
        const state = this.state;
        const optionList = options.map(item => (
            <option key={item}>{item}</option>
        ));
        return (
            <div style={style} className={styles.inputContainer}>
                <select
                  id={id}
                  name={name}
                  data-for={container}
                  data-value={state.value}
                  value={state.value}
                  className={styles.select}
                  onChange={this.onchange.bind(this)}
                >
                    {optionList}
                </select>
            </div>
        );
    }
}
