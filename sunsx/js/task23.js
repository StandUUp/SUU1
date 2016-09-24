'user strict'

var preBtn = document.getElementByid('pre'),
  inBtn = document.getElementByid('in'),
  postBtn = document.getElementByid('post'),
  userInput = document.getElementByid('userInput'),
  checkBtn = document.getElementByid('check')

var tree = function (element) {
  this.element = document.getElementById(element)
  this.chidren = this.element.childen
}
tree.prototype.traversal = function () {
  for (var i = 0; i < this.childen.length;i++) {
  }
}

tree.prototype.init = function () {
  preBtn.addEventListener('click', this.preOrder())
  inBtn.addEventListener('click', this.inOrder())
  postBtn.addEventListener('click', this.postOrder())
  checkBtn.addEventListener('click', this.check())
}

var tree1 = new tree('root')

tree1.init()
