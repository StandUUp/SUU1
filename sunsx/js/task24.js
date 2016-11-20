var childNodes = document.getElementsByTagName("ul")[0].children;

childNodes = Array.prototype.slice.call(childNodes);
var dom;

function checked() {

  childNodes.forEach(function (ele) {
    ele.addEventListener("click", function () {
      dom = document.querySelector(".current")
      if (dom === this) {
        this.classList.remove('current')
        dom = undefined;
      } else {
        if (dom) dom.classList.remove('current')
        this.classList.add('current')
        dom = this
      }
    })
  })
}

checked();

var delBtn = document.getElementById("del")
function remove() {
  delBtn.addEventListener("click", function (e) {
    e.preventDefault();
    dom.parentNode.removeChild(dom);
  })
}

remove();


var val, addBtn = document.getElementById("add");

function create(val, element) {
  console.log(element.children.length);
  if (element.children.length === 0) {
    var ul = document.createElement("ul");
    element.appendChild('ul')
  } else {
    element.appendChild('<li>' + val + '</li>')
  }
}
function add() {
  addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    val = document.querySelector("input").value.trim();
    if (val.length > 0 && dom!=undefined) {
      console.log(true);
      create(val, dom);
    }
  })
}

add();
