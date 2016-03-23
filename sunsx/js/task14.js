/**
 * Created by Shaox on 2016/3/23.
 */
var aqiData = [
    ["北京", 90],
    ["上海", 50],
    ["福州", 10],
    ["广州", 50],
    ["成都", 90],
    ["西安", 100]
];

(function () {
    /*
    任务要求：
     在注释下方编写代码
     遍历读取aqiData中各个城市的数据
     将空气质量指数大于60的城市显示到aqi-list的列表中
     任务实现：
     假设已知数组格式一定,不考虑按拼音排序；
     新建两个函数方法分别用于比较排序，和操作DOM；
     排序筛选，将结果存储到新数组；
     循环新数组，输出。
     */
    var list = document.getElementById("aqi-list");
    //比较方法
    function compare(num1,num2){
        return num1[1]-num2[1];
    }
    //插入结果函数
    function insert(rank,data){
        var item = document.createElement("li");
        item.innerHTML='第'+rank+'名'+data;
        list.appendChild(item);
    }
    //排序
    var sortArr = aqiData.sort(compare);
    var relArr = [];
    //筛选
    for(var i in sortArr){
        if(sortArr[i][1]>60)
        relArr.push(sortArr[i]);
    }
    //输出
    for(var i in relArr){
        var num = parseInt(i)+1;
        insert(num,relArr[i]);
    }
})();