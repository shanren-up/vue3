import React from 'react';
import ReactDOM from 'react-dom';
import PlottingPanel from './PlottingPanel';

export default class PlottingView {

    constructor(containerID, params = {}) {
        if (!parent) {
            console.error('父节点未指定！');
        }
        this.container = document.getElementById(containerID);
        this._url = params.url;
        this._initConfig(params.library);
        if (!window.store) window.store = {};
    }

    _initConfig(library) {
        const ajax = (url) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            xhr.send(null);
            if (xhr.readyState === 4 && xhr.status === 200) {
                return xhr.responseText;
            }
            console.error(`请求失败 => 状态码: ${xhr.status}`);
            return undefined;
        }
        const hamburgs = [];
        const libMarks = {};
        for (const v of library) {
            if (v.json) {
                const markList = ajax(v.json);
                if (markList) libMarks[v.id] = JSON.parse(markList);
            }
            hamburgs.push({
                id: v.id,
                name: v.name,
                lib: v.json ? v.json : undefined,
            });
        }
        this.hamburg = hamburgs;
        this.markslib = libMarks;
    }

    render() {
        this.plotPanel = (
            <PlottingPanel
              baseURL={this._url}
              hamburgs={this.hamburg}
              marklibs={this.markslib}
              container={this.container.id}
              propCallback={this.propFunc ? this.propFunc : undefined}
            />
        );
        ReactDOM.render(
            this.plotPanel,
            this.container
        );
    }

    unrender() {
        this.container.innerHTML = '';
        window.store['store-Mark'] = undefined;
        window.store['store-Prop'] = undefined;
    }

    set visible(isDisplay = true) {
        this._visible = isDisplay;
        if (this.container && this.container !== null) {
            this.container.style.display = this._visible === true ? 'block' : 'none';
        }
    }

    get visible() {
        return this._visible;
    }

    getMark() {
        // console.log(window);
        return window.store['store-Mark'];
    }

    renewPropPanel(mark) {
        this.mark = mark;
        window.store['store-Prop'] = mark;
    }
}
