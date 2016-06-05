'use stric'
//定义一个最大容量
var dataCount = 50;
//生成一个模拟队列数组
function getNumRandom() {
    var num = Math.ceil(Math.random() * (100 - 10 + 1)+10);
    return num;
}
function getSourceArr() {
    var sourceArr = new Array();
    for (var i = 0; i < dataCount; i++) {
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
function render(arr, index) {
    var tar = !arr ? arr1 : arr;
    var len = tar.length;
    var wrap = $('dom-wrap');
    wrap.innerHTML = '';
    for (var i = 0; i < len; i++) {
        if (index == i) {
            wrap.innerHTML += '<span class="item" style="background-color:blue;height:' + tar[i] * 4 + 'px">' + tar[i] + '</span>'
        } else {
            wrap.innerHTML += '<span class="item" style="height:' + tar[i] * 4 + 'px">' + tar[i] + '</span>'
        }
    }
}
render();

//获取输入的数值，对每个按钮执行不同的方法
function init() {
    var el = $('enter-left');
    var er = $('enter-right');
    var ol = $('out-left');
    var or = $('out-right');
    var st = $('sort');
    el.addEventListener('click', function (e) {
        e.preventDefault();
        if (arr1.length < dataCount) {
            var num = parseInt($('textInput').value.trim());
            if (num != '' && num < 100 && num > 10) {
                arr1.unshift(num);
            } else {
                alert("限制输入的数字在10-100");
            }
            render();
            console.log(arr1);
        } else {
            alert('最多只显示' + dataCount + '条数据')
        }
    });
    er.addEventListener('click', function (e) {
        e.preventDefault();
        if (arr1.length < dataCount) {
            var num = parseInt($('textInput').value.trim());
            if (num != '' && num < 100 && num > 10) {
                arr1.push(num);
            } else {
                alert("限制输入的数字在10-100");
            }
            render();
        } else {
            alert('最多只显示' + dataCount + '条数据')
        }
    });
    ol.addEventListener('click', function (e) {
        e.preventDefault();
        if (arr1.length > 0) {
            var num = arr1.shift();
            render();
            alert("从左侧删除：" + num);
        }
    });
    or.addEventListener('click', function (e) {
        e.preventDefault();
        if (arr1.length > 0) {
            var num = arr1.pop();
            render();
            alert("从右侧删除：" + num);
        }
    });
    /*    $('dom-wrap').addEventListener('click', function (e) {
            if (e.target.className == 'item') {
                e.target.parentNode.removeChild(e.target);
            }
        })*/
    //排序
    st.addEventListener('click', function (e) {
        e.preventDefault();
        var newArr = arr1;
        var wrap = $('dom-wrap');
        var i = 0;
        function sight() {
            if (i < newArr.length - 1) {
                for (var j = 0; j < newArr.length - i - 1; j++) {
                    if (newArr[j] > newArr[j + 1]) {
                        newArr[j] += newArr[j + 1];
                        newArr[j + 1] = newArr[j] - newArr[j + 1];
                        newArr[j] = newArr[j] - newArr[j + 1];
                        render(newArr);
                    }//end if
                }//end for
                var animate = setTimeout(sight, 100);
                i++;
            } else {
                clearTimeout(animate);
            }
        } //end sight
        sight();
    });
}
init();