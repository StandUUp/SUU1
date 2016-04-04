/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */

function getData() {
    //获取所有的li
    var source = document.getElementById('source').getElementsByTagName('li');
    var data = new Array();
    //循环取出所有li标签中所用到的数据
    for (var i = 0; i < source.length; i++) {
        //获取li的内容然后通过字符串方法截取城市名
        var city = source[i].innerHTML.toString().split('空气质量')[0];
        //查找li标签中的b标签获取数值
        var score = source[i].getElementsByTagName('b')[0].textContent;
        //给数组赋值
        data[i] = [city, score]
    }
    return data;
}


/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */

function sortAqiData(data) {
    //比较方法
    function compare(num1, num2) {
        return num1[1] - num2[1];
    }

    //排序
    var sortData = data.sort(compare);

    return sortData;
}

/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */

function render(data) {
    //获取目标ul
    var dest = document.getElementById('resort');
    //简单十以内的转换
    var chinese = ['一', '二', '三', '四', '五', '六', '七', '八', '九']
    //循环排序后的二维数组
    for (var i in data) {
        //名次，使用前面定义的汉字数组
        var rank = chinese[i];
        //城市名
        var city = data[i][0];
        //空气指数
        var score = data[i][1];

        insert(dest, rank, city, score);
    }
    //DOM操作定义函数
    function insert(element, rank, city, score) {
        var item = document.createElement("li");
        item.innerHTML = '第' + rank + '名：' + city + '空气质量：' + '<b>' + score + '</b>';
        element.appendChild(item);
    }
}

function btnHandle() {
    var aqiData = getData();
    aqiData = sortAqiData(aqiData);
    render(aqiData);
}

function init() {
    //获取目标Btn
    var btn = document.getElementById('sort-btn');
    //DOM方法
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        btnHandle();
    })
}
init();