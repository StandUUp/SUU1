'user strict'

var brBtn = document.getElementById('breadthe'),
  dpBtn = document.getElementById('depth'),
  userInput = document.getElementById('userInput'),
  checkBtn = document.getElementById('check'),
  computer = document.querySelector('.computer'),
  nodeArr = [], /*存储DOM元素*/
  textArr = []   /*存储DOM元素文本*/

// 递归遍历
/*function walkDom(node, callback) {
  if (node === null) { // 判断node是否为null
    return
  }
  callback(node) // 将node自身传入callback
  node = node.getElementsByTagName('div')[0] // 改变node为其子元素节点
  while (node) {
    walkDom(node, callback) // 如果存在子元素，则递归调用walkDom
    node = node.nextElementSibling // 从头到尾遍历元素节点
  }
}
walkDom(computer, function (node) {
  nodeArr.push(node);
})*/


// 循环遍历
function walkDom(node, callback) {
  if (node === null) {
    return
  }
  var stack = [node] //存入数组
  var target
  while (stack.length) { //数组长度不为0，继续循环
    target = stack.shift() //取出元素
    callback(target) //传入callback
    Array.prototype.unshift.apply(stack, checkDiv.apply(null, target.children));//将其子元素一股脑推入stack，增加长度
  }
}

walkDom(computer, function (node) {
  nodeArr.push(node);
  var span = node.querySelector("span")
  if (span) {
    textArr.push(span.textContent)
  } else {
    textArr.push(node.textContent)
  }
});

function checkDiv() {
  var result = [];
  Array.prototype.slice.call(arguments).forEach(function (node) {
    if (node.tagName == "DIV") result.push(node);
  })
  return result;
}

// 遍历可视化
function walkShow(val) {
  var i = 0;
  //没有参数传进去的情况；
  function showDefault() {
    if (i < nodeArr.length) nodeArr[i].classList.add("current");
    if (i > 0) nodeArr[i - 1].classList.remove("current");
    i += 1;
    if (i <= nodeArr.length) {
      setTimeout(showDefault, 500);
    }
  }
  // 有参数传进去的情况
  function showSituation(val) {
    var index = textArr.indexOf(val)
    if (val.length == 0 || index == -1) {
      alert("没有发现元素");
    } else {
      nodeArr[i].classList.add("current");
      if (i > 0) nodeArr[i - 1].classList.remove("current");
      i += 1;
    }
    function _timeOut() {
      return function () {
        showSituation(val)
      }
    };
    if (i < index) {
      setTimeout(_timeOut, 500);
    }
  }
  // 条件判断
  if (typeof val == undefined) {
    showDefault();
  } else {
    showSituation(val)
  }
}



//绑定
dpBtn.addEventListener("click", function () { walkShow() })
checkBtn.addEventListener("click", function () { walkShow(userInput.value) })