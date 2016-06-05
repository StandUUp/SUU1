//生成一个模拟队列数组
function getNumRandom() {
    var num = Math.ceil(Math.random() * 100);
    return num;
}
function getSourceArr() {
    var sourceArr = new Array();
    for (var i = 0; i < 5; i++) {
        sourceArr.push(getNumRandom());
    }
    return sourceArr;
}
var arr1 = getSourceArr();

// 通过id获取element
function $(id) {
    var element = document.getElementById(id);
    return element;
}
//渲染初始数据
function render() {
    var len = arr1.length;
    var wrap = $('dom-wrap');
    wrap.innerHTML = '';
    for (var i = 0; i < len; i++) {
        wrap.innerHTML += '<span class="item">' + arr1[i] + '</span>'
    }
}
render();

//获取输入的数值，对每个按钮执行不同的方法
function init() {
    var el = $('enter-left');
    var er = $('enter-right');
    var ol = $('out-left');
    var or = $('out-right');
    el.addEventListener('click', function (e) {
        e.preventDefault();
        var num = $('textInput').value.trim();
        if (num != '') arr1.unshift(num);
        render();
    });
    er.addEventListener('click', function (e) {
        e.preventDefault();
        var num = $('textInput').value.trim();
        if (num != '') arr1.push(num);
        render();
    });
    ol.addEventListener('click', function (e) {
        e.preventDefault();
        if (arr1.lenth > 0) var num = arr1.shift();
        render();
        alert("从左侧删除：" + num);
    });
    or.addEventListener('click', function (e) {
        e.preventDefault();
        if (arr1.lenth > 0) var num = arr1.pop();
        render();
        alert("从右侧删除：" + num);
    });
    $('dom-wrap').addEventListener('click', function (e) {
        if (e.target.className == 'item') {
            console.log(e.target.innerHTML);
            e.target.parentNode.removeChild(e.target);
        }
    })
}
init();