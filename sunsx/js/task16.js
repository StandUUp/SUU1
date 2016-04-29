/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */

function addAqiData() {
  // 正则匹配取值
  var cyName = document.getElementById('aqi-city-input'),
      cyVal = document.getElementById('aqi-value-input'),
      matchName = /^[\u4e00-\u9fa5a-zA-Z]+$/gm.test(cyName.value),
      matchVal = /^\d{1,4}$/.test(cyVal.value);
  if (matchName && matchVal) {


    /*属性赋值添加到aqiDate中*/
    var name = cyName.value,
        val = cyVal.value;
    aqiData[name] = val;


  } else if (!matchName) {
    cyName.value = "请输入正确城市名称！";
  } else if (!matchVal) {
    cyVal.value = "请输入正确数值！";
  }
}


/**
 * 渲染aqi-table表格
 */

var table = document.getElementById('aqi-table');
function renderAqiList() {
  var tableContent = '<tr></tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
  for (var province in aqiData) {
    tableContent += "<tr></tr><td>" + province + '</td><td>' + aqiData[province] + '</td><td><button>删除</button></td></tr>'
  }
  table.innerHTML = province ? tableContent : '';
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */

function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(name) {

  // 删除操作
  delete aqiData[name];
  renderAqiList();

}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  var addBtn = document.getElementById('add-btn');
  addBtn.addEventListener('click', function () {
    addBtnHandle();
  });

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

 table.addEventListener('click',function(e){
   var tar = e.target;
    if(tar.type == 'submit'){
      var tarName = tar.parentNode.parentNode.getElementsByTagName('td')[0].textContent;
      delBtnHandle(tarName);
    }
 })

}
init();
