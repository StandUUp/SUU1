/**
 * Created by admin on 2016/4/29.
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 用于渲染图表的数据
var chartData = {

};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart(graTime) {
    var wrap = document.getElementById('aqi-chart-wrap');
    wrap.innerHTML = '';
    var barColor;
    for (var i in chartData[graTime]) {
        if (chartData[graTime][i] < 100) {
            barColor = 'color-lowest';
        } else if (chartData[graTime][i] < 200) {
            barColor = 'color-low';
        } else if (chartData[graTime][i] < 300) {
            barColor = 'color-medium';
        } else if (chartData[graTime][i] < 400) {
            barColor = 'color-high';
        } else {
            barColor = 'color-highest';
        }
        var item = '<div class="bar-' + graTime + ' ' + barColor + '" style ="height:' + chartData[graTime][i] + 'px" title="' + i +'：'+ chartData[graTime][i] + '"></div>'
        wrap.innerHTML += item;
    }

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(e) {
    if (e.target.checked) pageState.nowGraTime = e.target.value;
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart(pageState.nowGraTime);
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(e) {
    // 确定是否选项发生了变化
    pageState.nowSelectCity = e.target.value;
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart(pageState.nowGraTime);
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var radios = document.getElementById('form-gra-time').elements['gra-time'];
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) pageState.nowGraTime = radios[i].value;
        radios[i].addEventListener('change', graTimeChange);
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    var select = document.getElementById('city-select');
    select.innerHTML = '';
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    for (var city in aqiSourceData) {
        select.innerHTML += '<option>' + city + '</option>'
    }
    pageState.nowSelectCity = select.value;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    select.addEventListener('change', citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    var graTime = pageState.nowGraTime;
    var cityCurrent = pageState.nowSelectCity;
    var raw = aqiSourceData[cityCurrent]; // 当前城市的源数据
    if (!raw) return false;
    switch (graTime) {
        case 'day':
            // 日数据
            var dataDays = {}
            for (var i in raw) {
                dataDays[i] = raw[i]
            }
            // 处理好的数据存到 chartData 中
            chartData['day'] = dataDays;
        case 'week':
            // 周数据
            var dataPerWeek = 0;   //每周的数据
            var dataWeeks = [];   //所有周的数据
            var dayArr = []; //存储每天是周几的数组
            for (var i in raw) {
                var date = new Date(i); // 日期转换
                dayArr.push(date.getDay()); //每天是周几
                dataPerWeek += raw[i]      // 每天数据相加
                if (date.getDay() == 0) { // 如果是0表示这一周结束
                    dataWeeks.push(dataPerWeek); // 将当前周数据保存到数组中
                    dataPerWeek = 0;               // 下周数据归零
                }
            }
            // 获取每周数据之和
            if (dataPerWeek != 0) dataWeeks.push(dataPerWeek);
            // 获取一共有几周
            var weeksLen = dataWeeks.length;
            // 第一周以及最后一周的天数
            var first = dayArr.indexOf(0);
            var last = dayArr.lastIndexOf(0);
            var firstWeekDays = dayArr.slice(0, first).length + 1;
            var lastWeekDays = dayArr.slice(last).length - 1;
            lastWeekDays = lastWeekDays > 0 ? lastWeekDays : 7;
            //求每周的平均数值
            var dataWeeksAverage = {};
            for (var i in dataWeeks) {
                if (i == 0) {
                    dataWeeksAverage['第'+(parseInt(i)+1)+'周'] = Math.round(dataWeeks[i] / firstWeekDays);
                } else if (i == weeksLen - 1) {
                    dataWeeksAverage['第'+(parseInt(i)+1)+'周'] = Math.round(dataWeeks[i] / lastWeekDays);
                } else {
                    dataWeeksAverage['第'+(parseInt(i)+1)+'周'] = Math.round(dataWeeks[i] / 7);
                }
            }
            // 处理好的数据存到 chartData 中
            chartData['week'] = dataWeeksAverage;
        case 'month':
            // 月数据
            var monthArr = [], //存储月份
                daysArr = [], //存储每天，数组长度为每月天数
                daysLen, //每个月的天数
                daysCountArr = [],//存储每月天数的长度 
                dataMonth = 0, //每月的数据
                dataMonths = [], //存储每月数据的数组
                daysMonthsAverage = {} //每月的平均数据;
            for (var i in raw) {
                var date = new Date(i);
                var m = date.getMonth();
                if (monthArr.indexOf(m) == -1) {
                    if (dataMonth != 0) dataMonths.push(dataMonth);
                    monthArr.push(m);
                    dataMonth = raw[i];
                    daysLen = daysArr.length;
                    if (daysLen != 0) daysCountArr.push(daysLen);
                    daysArr = [i];
                } else {
                    daysArr.push(i);
                    dataMonth += raw[i]
                }
            }
            daysCountArr.push(daysArr.length);
            dataMonths.push(dataMonth);
            for (var i in dataMonths) {
                daysMonthsAverage[(monthArr[i] + 1)+'月份'] = Math.ceil(dataMonths[i] / daysCountArr[i]);
            }
            // 处理好的数据存到 chartData 中
            chartData['month'] = daysMonthsAverage;
    }
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

init();