'user strict'

var brBtn = document.getElementById('breadthe'),
  dpBtn = document.getElementById('depth'),
  userInput = document.getElementById('userInput'),
  checkBtn = document.getElementById('check'),
  computer = document.querySelector('.computer'),
  nodeArr = []

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
    Array.prototype.push.apply(stack, checkDiv.apply(null, target.children));//将其子元素一股脑推入stack，增加长度
  }
}
walkDom(computer, function (node) { console.count() });

function checkDiv() {
  var result = [];
  Array.prototype.slice.call(arguments).forEach(function (node) {
    if (node.tagName == "DIV") result.push(node);
  })
  return result;
}



// 遍历可视化
function walkShow(i) {
  function show() {
    nodeArr[i].classList.add("current");
    if (i > 0) nodeArr[i - 1].classList.remove("current");
    i += 1;
    if (i < nodeArr.length) {
      setTimeout(show, 500);
    }
  }
  show();
}

//绑定
dpBtn.addEventListener("click", function () { walkShow(0) })