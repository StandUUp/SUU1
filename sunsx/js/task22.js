// 按钮
var preBtn = document.getElementById('pre')
var inBtn = document.getElementById('in')
var postBtn = document.getElementById('post')
// 获取根节点
var root = document.getElementById('root')
var divList, i
// 前序遍历
function preOrder (node) {
  if (!(node === null)) {
    divList.push(node)
    preOrder(node.firstElementChild)
    if (node.children.length > 1) preOrder(node.lastElementChild)
  }
}

// 中序遍历
function inOrder (node) {
  if (!(node === null)) {
    inOrder(node.firstElementChild)
    divList.push(node)
    if (node.children.length > 1) inOrder(node.lastElementChild)
  }
}

// 后序遍历
function postOrder (node) {
  if (!(node === null)) {
    postOrder(node.firstElementChild)
    if (node.children.length > 1) postOrder(node.lastElementChild)
    divList.push(node)
  }
}

// 遍历的可视化
function showTree () {
  if (divList[i]) divList[i].classList.add('current')
  if (i > 0) divList[i - 1].classList.remove('current')
  ++i
  if (i > divList.length) return
  setTimeout(showTree, 500)
}

// 事件监听
preBtn.addEventListener('click', function () {
  divList = []
  i = 0
  preOrder(root)
  showTree()
})

inBtn.addEventListener('click', function () {
  divList = []
  i = 0
  inOrder(root)
  showTree()
})

postBtn.addEventListener('click', function () {
  divList = []
  i = 0
  postOrder(root)
  showTree()
})
