// *********************** 脚本化css *********************** 
//將e轉化為相對定位的元素,使之左右震动
//第一个参数可以是元素对象或者元素id
//第二参数是函数,以e魏参数,将在动画结束之后调用
//第三个参数指定e的震动距离,默认是5px
//第四个参数震动时间,默认是500ms
function shake(e, oncomplate, distance, time) {
  //句柄函数
  if (typeof e === "string") e = document.getElementById(e);
  if (!time) time = 500;
  if (!distance) distance = 5;
  var originalStyle = e.style.cssText;
  e.style.position = "relative";
  var start = (new Date().getTime());
  animate();
  //函数检查消耗的时间,并更新e的位置
  //如果动画完成,它将e还原为原始状态
  //否则 它讲更新e的位置,安排它自身重新运行
  function animate() {
    // console.log('xx')
    var now = (new Date()).getTime();
    var elapsed = now - start;
    var fraction = elapsed / time; //是总时间的几分之几
    if (fraction < 1) {
      //如果动画未完成
      //作为动画完成比例的函数,计算e的x的位置
      //使用正弦函数完成比例,乘以4pi
      //所以,它来回往复两次
      var x = distance * Math.sin(fraction * 4 * Math.PI)
      e.style.left = x + "px";
      //在25毫秒后或者总时间的最后尝试再次运行好书
      //目的是为了产生每秒40帧的动画
      setTimeout(animate, Math.min(25, time - elapsed))
    } else {
      e.style.cssText = originalStyle;
      if (oncomplate) oncomplate(e)
    }
  }
};

// shake('css')
function fadeOut(e, oncomplate, time) {
  if (typeof e === "string") e = document.getElementById(e);
  if (!time) time = 500;
  var ease = Math.sqrt;
  var start = (new Date()).getTime();
  animate();

  function animate() {
    var elapsed = (new Date()).getTime() - start;
    var fraction = elapsed / time;
    if (fraction < 1) {
      var opacity = 1 - ease(fraction);
      e.style.opacity = String(opacity);
      setTimeout(animate, Math.min(25, time - elapsed))
    } else {
      e.style.opacity = "0";
      if (oncomplate) oncomplate(e)
    }
  }
}
// fadeOut('css')
// shake('css', fadeOut)

//window.getComputedStyle()  获得计算之后的渲染样式的只读对象
// console.log(window.getComputedStyle(document.getElementById('css'), null))

//模拟classList

function CSSClassList(e) {
  this.e = e;
}
CSSClassList.prototype.contains = function (c) {
  if (c.length === 0 || c.indexOf(" ") != 1) throw new Error('Invalid class name: ' + c)
  var classes = this.e.className;
  if (!classes) return false;
  if (classes = c) return true;
  return classes.search("\\b" + c + "\\b") != -1;
}

CSSClassList.prototype.add = function (c) {
  if (this.contains(c)) return;
  var classes = this.e.className;
  if (classes && classes[classes.length - 1] != " ") c = " " + c;
  this.e.className += c;
}
CSSClassList.prototype.remove = function (c) {
  if (!this.contains(c)) return;
  var pattern = new RegExp("\\b" + c + "\\b\\s*", "g");
  this.e.className = this.e.className.replace(pattern, "")
}
CSSClassList.prototype.toggle = function (c) {
  if (this.contains(c)) {
    this.remove(c)
  } else {
    this.add(c)
  }
}


function classList(e) {
  if (e.classList) return e.classList;
  else return new CSSClassList(e)
}