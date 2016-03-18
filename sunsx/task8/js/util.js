/**
 * Created by admin on 2016/3/11.
 */
window.onload = function () {

  // 为element增加一个样式名为newClassName的新样式
  /*  function addClass(element, newClassName) {
   var $ = document.querySelectorAll(element);
   for(var i=0;i< $.length;i++){
   $[i].classList.add(newClassName);
   }
   }
   addClass("div","box");*/


// 移除element中的样式oldClassName
  /*  function removeClass(element, oldClassName) {
   var $ = document.querySelectorAll(element);
   for (var i = 0; i < $.length; i++) {
   $[i].classList.remove(oldClassName);
   }
   }
   removeClass("div", "box");*/


// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
  /*  function isSiblingNode(element, siblingNode) {
   var par1 = document.querySelector(element).parentNode;
   var par2 = document.querySelector(siblingNode).parentNode;
   if (par1 == par2) {
   return true;
   }
   }
   isSiblingNode(".box1", ".box3");*/


// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
  /*  function getPosition(element) {
   var offset = {};
   var ele = document.querySelector(element);
   offset.x = ele.offsetLeft;
   offset.y = ele.offsetTop;
   return offset;
   }
   console.log(getPosition(".box3"));*/


  // 实现一个简单的Query ,可以通过简单的组合提高查询便利
  function $(selector) {
    return document.querySelector(selector);
  }

// 给一个element绑定一个针对event事件的响应，响应函数为listener
  function addEvent(element, event, listener) {
    element.addEventListener(event,listener);
  }

// 例如：
  function a(event) {
    console.log("this is a " + event.type + " event");
  }

  addEvent($("#btn"), "click", a);

// 移除element对象对于event事件发生时执行listener的响应
  function removeEvent(element, event, listener) {
    // your implement
  }

};