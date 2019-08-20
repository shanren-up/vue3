/**
 * 项目：GVML
 * 文件：TextInput.js
 * 作者：qianjing
 * 部门：产品研发部
 * 邮箱：jqian@mail.ie.ac.cn
 * 日期：2017-06-11 ‏‎‏‎15:21:14
 * 用途：
 */
import React, { Component, PropTypes } from 'react';

import styles from './TextInput.css';

export default class TextInput extends Component {
    static PropTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        value: PropTypes.string,
        container: PropTypes.string,
        style: PropTypes.object,
        onchange: PropTypes.func
    }

    componentWillMount() {
        this.state = {
            isChanged: false,
            value: this.props.value ? this.props.value : ''
        };
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        const state = this.state;
        if (nextProps.value) {
            state.value = nextProps.value;
        } else {
            state.value = '';
        }
        this.setState(state);
    }

    onchange(e) {
        const state = this.state;
        if (state.isChanged === false) {
            state.isChanged = true;
        }
        state.value = e.target.value;
        this.setState(state);
    }

    onblur(e) {
        const state = this.state;
        const {onchange} = this.props;
        if (state.isChanged === true) {
            state.isChanged = false;
            this.setState(state);
            if (onchange) onchange(e.target.id, e.target.value);
        }
    }

    render() {
        const {id, name, label, style, placeholder, container} = this.props;
        const state = this.state;
        return (
            <div style={style} className={styles.inputContainer}>
                <input
                  type="text"
                  id={id}
                  name={name}
                  placeholder={placeholder}
                  data-for={container}
                  data-value={state.value}
                  value={state.value}
                  onBlur={this.onblur.bind(this)}
                  onChange={this.onchange.bind(this)}
                />
                <span>{label}</span>
            </div>
        );
    }
}
