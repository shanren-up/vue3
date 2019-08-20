/**
 * 项目：GVML
 * 文件：ColorInput.js
 * 作者：qianjing
 * 部门：产品研发部
 * 邮箱：jqian@mail.ie.ac.cn
 * 日期：2017-06-11 ‏‎‏‎15:21:14
 * 用途：
 */
import React, { Component, PropTypes } from 'react';

import styles from './ColorInput.css';

export default class ColorInput extends Component {
    static PropTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.string,
        container: PropTypes.string,
        style: PropTypes.object,
        onchange: PropTypes.func
    }

    componentWillMount() {
        this.state = {
            colorPanel: false,
            nowaColor: this.props.value ?
                this.format(this.props.value) : {r: 255, g: 0, b: 0, a: 255}
        };
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        const state = this.state;
        if (nextProps.value) {
            state.nowaColor = this.format(nextProps.value);
        } else {
            state.nowaColor = {r: 255, g: 0, b: 0, a: 255};
        }
        this.setState(state);
    }

    onchange(id) {
        const {onchange} = this.props;
        const state = this.state;
        if (onchange) onchange(id, this.rgba2hex(state.nowaColor));
    }

    format(str) {
        let rgb;
        if (/^rgba/.test(str)) {
            rgb = this.str2rgba(str);
        } else if (/^#/.test(str)) {
            if (str.length === 7) str = `${str}FF`;
            else if (str.length === 4) str = `#${str.charAt(1)}${str.charAt(1)}${str.charAt(2)}${str.charAt(2)}${str.charAt(3)}${str.charAt(3)}FF`;
            rgb = this.hex2rgba(str);
        }
        return rgb;
    }

    // rgba(r,g,b,a) to {r, g, b, a}
    str2rgba(str) {
        let rgba;
        if (str) {
            const sub = str.substring(5, str.length - 1);
            const rgbArr = sub.split(',');
            for (let i = 0; i < rgbArr.length; i++) {
                rgbArr[i] = parseInt(rgbArr[i], 0);
            }
            rgba = { r: rgbArr[0], g: rgbArr[1], b: rgbArr[2], a: rgbArr[3] };
        }
        return rgba;
    }

    // rgb(r,g,b) to {r, g, b, a}
    rgb2rgba(str) {
        let rgba;
        if (str) {
            const sub = str.substring(4, str.length - 1);
            const rgbArr = sub.split(',');
            for (let i = 0; i < rgbArr.length; i++) {
                rgbArr[i] = parseInt(rgbArr[i], 0);
            }
            rgba = { r: rgbArr[0], g: rgbArr[1], b: rgbArr[2], a: 255 };
        }
        return rgba;
    }

    // {r,g,b, a} to rgba(r,g,b,a);
    rgba2str(rgba) {
        const alpha = Math.floor(rgba.a * 10 / 255) / 10;
        return `rgba( ${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`;
    }

    // #RRGGBBAA to {r, g, b, a}
    hex2rgba(str) {
        if (/^#/.test(str) === false) return undefined;
        const hex_r = str.substr(1, 2);
        const hex_g = str.substr(3, 2);
        const hex_b = str.substr(5, 2);
        const hex_a = str.substr(7, 2);
        const hex2dec = (hex) => {
            hex = hex.toUpperCase();
            const charA = hex.substr(0, 1);
            const charB = hex.substr(1, 1);
            const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
            const indexA = arr.indexOf(charA);
            const indexB = arr.indexOf(charB);
            return 16 * indexA + indexB;
        };
        const rgba = {
            r: hex2dec(hex_r),
            g: hex2dec(hex_g),
            b: hex2dec(hex_b),
            a: hex2dec(hex_a)
        }
        return rgba;
    }

    // {r,g,b,a} to #RRGGBBAA
    rgba2hex(rgba) {
        const dec2hex = (dec) => {
            const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
            const divider = Math.floor(dec / 16);
            const remainder = dec % 16;
            if (dec > 255 || divider > 15) return `${arr[15]}${arr[15]}`;
            return `${arr[divider]}${arr[remainder]}`;
        }
        return `#${dec2hex(rgba.r)}${dec2hex(rgba.g)}${dec2hex(rgba.b)}${dec2hex(rgba.a)}`;
    }

    changeColor(e) {
        const state = this.state;
        state.colorPanel = !state.colorPanel;
        if (state.colorPanel === false) {
            this.onchange(e.target.id);
        }
        this.setState(state);
    }

    pickColor(e) {
        const state = this.state;
        const color = e.target.style.backgroundColor;
        console.log(color);
        state.nowaColor = this.rgb2rgba(color);
        this.setState(state);
    }
    // rgb数字框切换颜色
    selectColor(e) {
        const state = this.state;
        const datafor = e.target.attributes['data-for'].nodeValue;
        const value = parseInt(e.target.value, 0);
        switch (datafor) {
            case 'r': state.nowaColor.r = value; this.setState(state); break;
            case 'g': state.nowaColor.g = value; this.setState(state); break;
            case 'b': state.nowaColor.b = value; this.setState(state); break;
            case 'a': state.nowaColor.a = value; this.setState(state); break;
            default: break;
        }
    }

    render() {
        const {id, name, style, value, container} = this.props;
        const state = this.state;
        const colorStyle = { backgroundColor: this.rgba2str(state.nowaColor) };
        const defaultColors = [
            '#000000', '#808080', '#8b0000', '#ff0000', '#ffa500',
            '#ffff00', '#00ff00', '#0000ff', '#00008b', '#800080',
            '#ffffff', '#a9a9a9', '#a52a2a', '#ffc0cb', '#ffa07a', 
            '#ffffe0', '#90ee90', '#e0ffff', '#add8e6', '#ee82ee'];
        const colorButtons = defaultColors.map((item) => {
            const bgcolor = {backgroundColor: item}
            return (
                <button
                  key={item}
                  style={bgcolor}
                  className={styles.colorBtn}
                  onClick={this.pickColor.bind(this)}
                />
            );
        });
        const colorpanel = (
            <div className={styles.colorPanel}>
                <div className={styles.colorItem}>
                    {colorButtons}
                </div>
                <div className={styles.colorValue}>
                    <div className={styles.cv}>
                        <span>R</span>
                        <input type="number" data-for={'r'} min={0} max={255} value={state.nowaColor.r} onChange={this.selectColor.bind(this)} />
                    </div>
                    <div className={styles.cv}>
                        <span>G</span>
                        <input type="number" data-for={'g'} min={0} max={255} value={state.nowaColor.g} onChange={this.selectColor.bind(this)} />
                    </div>
                    <div className={styles.cv}>
                        <span>B</span>
                        <input type="number" data-for={'b'} min={0} max={255} value={state.nowaColor.b} onChange={this.selectColor.bind(this)} />
                    </div>
                    <div className={styles.cv}>
                        <span>A</span>
                        <input type="number" data-for={'a'} min={0} max={255} value={state.nowaColor.a} onChange={this.selectColor.bind(this)} />
                    </div>
                </div>
            </div>
        );
        return (
            <div style={style} className={styles.inputContainer}>
                <button
                  id={id}
                  name={name}
                  data-for={container}
                  data-value={this.rgba2hex(state.nowaColor)}
                  style={colorStyle}
                  onClick={this.changeColor.bind(this)}
                />
                {state.colorPanel ? colorpanel : null}
            </div>
        );
    }
}

