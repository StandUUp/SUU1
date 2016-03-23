/**
 * Created by Shaox on 2016/3/23.
 */
(function(){
    /*
     任务要求：
     给按钮button绑定一个点击事件
     在事件处理函数中
     获取aqi-input输入的值，并显示在aqi-display中
     任务实现：
     不考虑兼容性
     不考虑空格等特殊情况
     使用二级DOM实现
     */
    var input = document.getElementById("aqi-input");
    var btn = document.getElementById("button");
    var span = document.getElementById("aqi-display");
    var val = input.value;
    btn.addEventListener("click",output);
    function output(){
        //获取输入的值，并判断是否输入
        var val = input.value;
        if(val.length>0){
            span.innerHTML=val;
        }else{
            span.innerHTML="您输入的数据为空！";
        }
    }
})();