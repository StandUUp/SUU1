'user strict'

var brdBtn = document.getElementByid('breadthe'),
  dpBtn = document.getElementByid('depth'),
  userInput = document.getElementByid('userInput'),
  checkBtn = document.getElementByid('check'),
  orderArr = []

var tree = function (element) {
  this.element = document.getElementById(element)
  this.children = this.element.children
}

tree.prototype.preOrder = function () {
  if (this.children.length > 0) {
    orderArr.push(this.children[0])
    this.children = this.children[0].element.children
    this.prototype.preOrder();
  }

}

tree.prototype.init = function () {
  preBtn.addEventListener('click', this.preOrder())
  inBtn.addEventListener('click', this.inOrder())
  postBtn.addEventListener('click', this.postOrder())
  checkBtn.addEventListener('click', this.check())
}


tree.prototype.showTree = function(){

}

var tree1 = new tree('root')

tree1.init()
