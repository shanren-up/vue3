/**
 * 项目：gvml
 * SkyAndOcean.js
 * 作者：李强
 * 部门：产品研发中心
 * 邮箱：liq@geovis.com.cn
 * 日期：2017-10-18 14:00:00.
 * 用途：类
 */

class SkyAndOcean extends GV.Widget {
    reference() {
        this.css = './SkyAndOcean.css';
        this.html = './SkyAndOcean.html';
    }

    init() {
        const that = this;
        const sky = that.earth.map.mapOptions.sky;
        const ocean = that.earth.map.mapOptions.ocean;
        const wind = that.earth.map.mapOptions.wind;

        const closeBtn = document.getElementById('close_widget');

        const skySwitch = document.getElementById('sky_switch');

        const lightingSwitch = document.getElementById('lighting_switch');
        const yearInput = document.getElementById('date_year');
        const monthInput = document.getElementById('date_month');
        const dayInput = document.getElementById('date_day');
        const hourInput = document.getElementById('hour_input');

        const cloudSwitch = document.getElementById('cloud_switch');
        const cloudTypeSelect = document.getElementById('cloud_type_select');
        const cloudHeightInput = document.getElementById('cloud_height');

        const oceanSwitch = document.getElementById('ocean_switch');
        const waveSizeInput = document.getElementById('wave_size_input');

        const windDirectionInput = document.getElementById('wind_direction');
        const windLevelInput = document.getElementById('wind_level');

        _initView();

        closeBtn.onclick = () => {
            that.earth.unusingWidget(that.name);
        }

        skySwitch.onclick = () => {
            if (skySwitch.getAttribute('data') === 'true') {
                skySwitch.style.backgroundImage = `url(${that.formatHostURL('./image/close.png')})`;
                skySwitch.setAttribute('data', false);
                sky.visible = false;
            } else {
                skySwitch.style.backgroundImage = `url(${that.formatHostURL('./image/open.png')})`;
                skySwitch.setAttribute('data', true);
                sky.visible = true;
            }
        }

        lightingSwitch.onclick = () => {
            if (lightingSwitch.getAttribute('data') === 'true') {
                lightingSwitch.style.backgroundImage = `url(${that.formatHostURL('./image/close.png')})`;
                lightingSwitch.setAttribute('data', false);
                sky.lighting = false;
            } else {
                lightingSwitch.style.backgroundImage = `url(${that.formatHostURL('./image/open.png')})`;
                lightingSwitch.setAttribute('data', true);
                sky.lighting = true;
            }
        }

        yearInput.onchange = () => {
            that.earth.setCurrentClock({
                year: yearInput.value,
                month: monthInput.value,
                day: dayInput.value,
                hour: hourInput.value * 24 / 100,
                minute: 0,
                second: 0
            })
        }

        monthInput.onchange = () => {
            that.earth.setCurrentClock({
                year: yearInput.value,
                month: monthInput.value,
                day: dayInput.value,
                hour: hourInput.value * 24 / 100,
                minute: 0,
                second: 0
            })
        }

        dayInput.onchange = () => {
            that.earth.setCurrentClock({
                year: yearInput.value,
                month: monthInput.value,
                day: dayInput.value,
                hour: hourInput.value * 24 / 100,
                minute: 0,
                second: 0
            })
        }

        hourInput.onchange = () => {
            that.earth.setCurrentClock({
                year: yearInput.value,
                month: monthInput.value,
                day: dayInput.value,
                hour: hourInput.value * 24 / 100,
                minute: 0,
                second: 0
            })
        }

        cloudSwitch.onclick = () => {
            if (cloudSwitch.getAttribute('data') === 'true') {
                cloudSwitch.style.backgroundImage = `url(${that.formatHostURL('./image/close.png')})`;
                cloudSwitch.setAttribute('data', false);
                sky.cloud.visible = false;
            } else {
                cloudSwitch.style.backgroundImage = `url(${that.formatHostURL('./image/open.png')})`;
                cloudSwitch.setAttribute('data', true);
                sky.cloud.visible = true;
            }
        }

        cloudTypeSelect.onchange = function () {
            sky.cloud.type = cloudTypeSelect.value;
        }

        cloudHeightInput.onchange = function () {
            sky.cloud.height = cloudHeightInput.value;
        }

        oceanSwitch.onclick = function () {
            if (oceanSwitch.getAttribute('data') === 'true') {
                oceanSwitch.style.backgroundImage = `url(${that.formatHostURL('./image/close.png')})`;
                oceanSwitch.setAttribute('data', false);
                ocean.visible = false;
            } else {
                oceanSwitch.style.backgroundImage = `url(${that.formatHostURL('./image/open.png')})`;
                oceanSwitch.setAttribute('data', true);
                ocean.visible = true;
            }
        }

        waveSizeInput.onchange = function () {
            ocean.waveSize = waveSizeInput.value * 3 / 100;
        }

        windDirectionInput.onchange = function () {
            wind.direction = windDirectionInput.value;
        }

        windLevelInput.onchange = function () {
            wind.level = windLevelInput.value;
        }

        //根据配置初始化页面参数
        function _initView() {
            if (sky.visible === true || sky.visible === 'true') {
                skySwitch.style.backgroundImage = `url(${that.formatHostURL('./image/open.png')})`;
                skySwitch.setAttribute('data', true);
            }

            if (sky.lighting === true || sky.lighting === 'true') {
                lightingSwitch.style.backgroundImage = `url(${that.formatHostURL('./image/open.png')})`;
                lightingSwitch.setAttribute('data', true);
            }

            that.earth.getCurrentClock((date) => {
                yearInput.value = date.year;
                monthInput.value = date.month;
                dayInput.value = date.day;
                hourInput.value = date.hour * 100 / 24;
            }, 'object');

            if (sky.cloud.visible === true || sky.cloud.visible === 'true') {
                cloudSwitch.style.backgroundImage = `url(${that.formatHostURL('./image/open.png')})`;
                cloudSwitch.setAttribute('data', true);
            }

            cloudHeightInput.value = sky.cloud.height;

            for (let i = 0; i < cloudTypeSelect.length; i++) {          
                if (parseInt(cloudTypeSelect[i].value) === parseInt(sky.cloud.type)) {
                    cloudTypeSelect[i].selected = "selected";
                }
            }


            if (ocean.visible === true || ocean.visible === 'true') {
                oceanSwitch.style.backgroundImage = `url(${that.formatHostURL('./image/open.png')})`;
                oceanSwitch.setAttribute('data', true);
            }

            waveSizeInput.value = ocean.waveSize * 100 / 3;
            
            windDirectionInput.value = wind.direction;
            windLevelInput.value = wind.level;
        }
    }
}

//# sourceURL=Skyandcloud.js 
