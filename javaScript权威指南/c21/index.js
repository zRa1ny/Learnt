// *********************** 多媒体和图形编程 *********************** 
//图片翻转函数 
function rollover() {
  for (var i = 0; i < document.images.length; i++) {
    var img = document.images[i];
    var rollover = img.getAttribute("data-rollover");
    if (!rollover) continue;
    (new Image()).src = rollover; //缓存图片
    //定义一个属性来表示默认图片url
    img.setAttribute("data-rollout", img.src)
    //注册函数来创建翻转效果
    img.onmouseover = function () {
      this.src = this.getAttribute("data-rollover")
    }
    img.onmouseout = function () {
      this.src = this.getAttribute("data-rollout")
    }
  }
}
rollover()
//图片隐写术
{
  var testWMcanvas = document.getElementById('testWMcanvas')
  var ctx = testWMcanvas.getContext('2d')
  var originalData;
  var textData;

  canvasImg()

  function canvasImg() {

    for (var i = 0; i < document.images.length; i++) {
      var img = document.images[i];
      var rollover = img.getAttribute("data-canvas");
      if (!rollover) continue;
      img.setAttribute("data-rollout", img.src)
      //注册函数来创建翻转效果
      img.onmouseenter = function () {
        testWMcanvas.width = this.width
        testWMcanvas.height = this.height;
        if (this.textBase64) {
          this.src = this.textBase64;
        } else {
          ctx.font = "30px Microsoft Yahei";
          ctx.fillText(this.getAttribute("data-canvas"), 0, 130);
          var textData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height).data;
          ctx.drawImage(this, 0, 0, 150, 250);
          var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
          processData(mergeData(textData, "R", imgData))
          this.src = testWMcanvas.toDataURL();
          this.textBase64 = this.src

        }
      }
      img.onmouseout = function () {
        this.src = this.getAttribute("data-rollout")
      }
    }
  }


  var mergeData = function (newData, color, originalData) {
    var oData = originalData.data;
    var bit, offset; // offset的作用是找到alpha通道值，这里需要大家自己动动脑筋
    console.log(oData)
    console.log(newData)
    switch (color) {
      case 'R':
        bit = 0;
        offset = 3;
        break;
      case 'G':
        bit = 1;
        offset = 2;
        break;
      case 'B':
        bit = 2;
        offset = 1;
        break;
    }
    //R bit=0 offset=3
    //有内容 =>偶数 =>解析的时候判断是偶数还是奇数 =>偶数余数0=>设置背景色黑色=>奇数余1=>设置背景显示字体
    for (var i = 0; i < oData.length; i++) {
      if (i % 4 == bit) {
        // 只处理目标通道
        //i=0 
        if (newData[i + offset] === 0 && (oData[i] % 2 === 1)) {
          // 没有信息的像素，该通道最低位置0，但不要越界
          if (oData[i] === 255) {
            oData[i]--;
          } else {
            oData[i]++;
          }
          // newData[i + offset] === 0  判断没有内容+为奇数  将其+1-1变为偶数
        } else if (newData[i + offset] !== 0 && (oData[i] % 2 === 0)) {
          // // 有信息的像素，该通道最低位置1，可以想想上面的斑点效果是怎么实现的
          if (oData[i] === 255) {
            oData[i]--;
          } else {
            oData[i]++;
          }
        }
      }
    }
    console.log(originalData.data)
    // ctx.putImageData(originalData, 0, 0);
    return originalData
  }

  var processData = function (originalData) {
    var data = originalData.data;
    for (var i = 0; i < data.length; i++) {
      if (i % 4 == 0) {
        // 红色分量
        if (data[i] % 2 == 0) {
          //2  偶數  
          data[i] = 0;
        } else {
          //奇書
          data[i] = 255;
        }
      } else if (i % 4 == 3) {
        // alpha通道不做处理
        continue;
      } else {
        // 关闭其他分量，不关闭也不影响答案，甚至更美观 o(^▽^)o
        // data[i] = 0;
      }
    }
    // 将结果绘制到画布
    ctx.putImageData(originalData, 0, 0);
    // document.getElementById('testWM').src = _arrayBufferToBase64(originalData.data)
    // return ctx.toDataURL()
  }


  function _arrayBufferToBase64(raw) {
    var base64 = '';
    var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var bytes = new Uint8Array(raw);
    var byteLength = bytes.byteLength;
    var byteRemainder = byteLength % 3;
    var mainLength = byteLength - byteRemainder;
    var a, b, c, d;
    var chunk;
    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
      // Combine the three bytes into a single integer
      chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
      // Use bitmasks to extract 6-bit segments from the triplet
      a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
      b = (chunk & 258048) >> 12; // 258048 = (2^6 - 1) << 12
      c = (chunk & 4032) >> 6; // 4032 = (2^6 - 1) << 6
      d = chunk & 63; // 63 = 2^6 - 1
      // Convert the raw binary segments to the appropriate ASCII encoding
      base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
    }
    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
      chunk = bytes[mainLength];
      a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2;
      // Set the 4 least significant bits to zero
      b = (chunk & 3) << 4 // 3 = 2^2 - 1;
      base64 += encodings[a] + encodings[b] + '==';
    } else if (byteRemainder == 2) {
      chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
      a = (chunk & 16128) >> 8 // 16128 = (2^6 - 1) << 8;
      b = (chunk & 1008) >> 4 // 1008 = (2^6 - 1) << 4;
      // Set the 2 least significant bits to zero
      c = (chunk & 15) << 2 // 15 = 2^4 - 1;
      base64 += encodings[a] + encodings[b] + encodings[c] + '=';
    }
    return "data:image/jpeg;base64," + base64;
  }

}
//脚本化音频和视频
{
  let a = new Audio();
  if (a.canPlayType("audio/wav")) {
    a.src = ""
  }
}

//使用javascript绘制svg饼状图
function pieChart(data, width, height, cx, cy, r, colors, labels, lx, ly) {
  //这个是表示svg元素的XML命名空间
  var svgns = "http://www.w3.org/2000/svg";
  //创建一个svg元素,同事指定像素大小和用户坐标
  var chart = document.createElementNS(svgns, "svg:svg")
  chart.setAttribute("width", width)
  chart.setAttribute("height", height)
  chart.setAttribute("viewBox", "0 0" + width + " " + height)
  var total = 0;
  for (var i = 0; i < data.length; i++) total += data[i];
  var angles = [];
  for (var i = 0; i < data.length; i++) {
    angles[i] = data[i] / total * Math.PI * 2;
  }
  //便利饼状图的米格分片
  startangle = 0;
  for (var i = 0; i < data.length; i++) {
    //这里表示锲结束为止
    var endangle = startangle + angles[i];
    //计算出于锲和圆橡胶的点
    //这些计算公式都是以12点钟方向为0
    //顺势正方向角度递增
    var x1 = cx + r * Math.sin(startangle)
    var y1 = cy + r * Math.cos(startangle)
    var x2 = cx + r * Math.sin(endangle)
    var y2 = cy + r * Math.cos(endangle)
    var big = 0;
    if (endangle - startangle > Math.PI) big = 1;
    var path = document.createElementNS(svgns, "path")
    var d = "M " + cx + "," + cy + " L " + x1 + "," + y1 + " A " + r + "," + r + " O " + big + " 1 " + x2 + "," + y2 + " z"
    //设置<svg:path>元素的属性
    path.setAttribute("d", d)
    path.setAttribute("fill", colors[i])
    path.setAttribute("stroke", "black")
    path.setAttribute("stroke-width", "2")
    chart.appendChild(path)

    startangle = endangle;
    // Now draw a little matching square for the key
    var icon = document.createElementNS(svgns, "rect");
    icon.setAttribute("x", lx); // Position the square
    icon.setAttribute("y", ly + 30 * i);
    icon.setAttribute("width", 20); // Size the square
    icon.setAttribute("height", 20);
    icon.setAttribute("fill", colors[i]); // Same fill color as wedge
    icon.setAttribute("stroke", "black"); // Same outline, too.
    icon.setAttribute("stroke-width", "2");
    chart.appendChild(icon); // Add to the chart

    // And add a label to the right of the rectangle
    var label = document.createElementNS(svgns, "text");
    label.setAttribute("x", lx + 30); // Position the text
    label.setAttribute("y", ly + 30 * i + 18);
    // Text style attributes could also be set via CSS
    label.setAttribute("font-family", "sans-serif");
    label.setAttribute("font-size", "16");
    // Add a DOM text node to the <svg:text> element
    label.appendChild(document.createTextNode(labels[i]));
    chart.appendChild(label); // Add text to the chart
  }
  return chart
}
//canvas
{
  var canvas = document.getElementById('square');
  var context = canvas.getContext('2d');
  context.fillStyle = "#f00";
  context.fillRect(0, 0, 10, 10);

  canvas = document.getElementById("circle")
  context = canvas.getContext('2d')
  context.beginPath(); //开始一条新路径
  context.arc(5, 5, 5, 0, 2 * Math.PI, true) //将圆形调价到该路径
  context.fillStyle = "#oof" //设置填充色为蓝色
  context.fill() //填充路径
} {
  var canvas = document.getElementById("canvas");
  var c = canvas.getContext("2d")

  //绘制线段
  c.beginPath();
  c.moveTo(50, 50)
  c.lineTo(100, 100)
  c.lineTo(50, 100)
  c.closePath()
  //定义了一条路,并没有在画布上绘制任何图形,入股需要绘制,可以通过stroke()方法,要填充这些线段闭合的区域 可以是通fill()
  c.fill()
  c.stroke()
  //开始一条新路径
  c.beginPath();
  c.moveTo(200, 200)
  c.lineTo(150, 150)
  c.lineTo(150, 200)
  c.closePath()
  c.stroke()
  // canvas.height = canvas.height; //重设高度 清除画布
  c.clearRect(0, 0, canvas.width, canvas.height); //清除画布v
  var x = 100,
    y = 100,
    r = 50,
    num = 6;
  c.beginPath();
  c.moveTo(x, y)
  var angle = 2 * Math.PI / num;

  for (var i = 1; i < num + 2; i++) {
    c.lineTo(x + r * Math.sin(angle * i), y + r * Math.cos(angle * i))
  }
  c.fillStyle = "#ccc" //内部填充色
  c.strokeStyle = "#008" //边框色
  c.save() //保存当前状态
  c.lineWidth = 5; //line宽度
  c.shadowOffsetY = 10;
  c.shadowColor = "red";
  c.restore() //回退到上个状态
  c.fill();
  c.stroke()

  function snowflake(c, n, x, y, len) {
    var deg = Math.PI / 180
    c.save();
    c.translate(x, y);
    c.moveTo(0, 0)
    leg(n);
    c.rotate(-120 * deg)
    leg(n)
    c.rotate(-120 * deg)
    leg(n)
    c.closePath()
    c.restore();
    //绘制n级别的科赫雪花的一条边
    //此函数在画完一条边的时候就离开当前点
    //然后通过坐标系变换将当前点有转换成(0,0,)
    //这意味画完一条边之后可以很贱的调用rotate()进行旋转
    function leg(n) {
      c.save(); //保存当前坐标系变换
      if (n == 0) {
        //不需要递归的情况
        c.lineTo(len, 0)
      } else {
        c.scale(1 / 3, 1 / 3) //子边长度是原边长的1/3
        leg(n - 1); //递归第一条子边
        c.rotate(60 * deg) //顺时针旋转60
        leg(n - 1) //递归第二条子边
        c.rotate(-120 * deg)
        leg(n - 1)
        c.rotate(60 * deg) //顺时针旋转60
        leg(n - 1)
      }
      c.restore() //恢复坐标系变换
      c.translate(len, 0)
    }
  }
  snowflake(c, 4, 200, 200, 100)
  c.stroke();
  //画曲线
  function rads(x) {
    return Math.PI * x / 180
  } //工具函数 将角度转化为弧度制

  c.beginPath();
  c.arc(75, 100, 50, 0, rads(360), false)
  c.moveTo(200, 100)
  c.arc(200, 100, 50, rads(-60), rads(0), false)
  c.closePath()
  c.beginPath();

  c.moveTo(300, 300)
  c.arcTo(350, 50, 350, 150, 30)
  c.font = "20px sans-serif"
  c.fillText('hah笑嘻嘻', 50, 50)
  c.strokeText('hah笑嘻嘻', 200, 50)
  var pattern = c.createPattern(document.getElementById('i1'), "repeat")
  var befade = c.createLinearGradient(0, 0, canvas.width, canvas.height)
  befade.addColorStop(0.0, "red")
  befade.addColorStop(1.0, "#fff")
  c.closePath()
  c.strokeStyle = "red"
  // c.fillStyle = befade
  // c.fillStyle = pattern
  c.fill()
  c.stroke()
  c.clearRect(0, 0, canvas.width, canvas.height); //清除画布
  //检测一个鼠标事件是否发生在当前路径上
  function hitpath(context, event) {
    //从canvas对象中获取canvas元素
    var canvas = context.canvas;
    //获取画布尺寸和位置
    var bb = canvas.getBoundingClientRect();
    //将鼠标事件坐标通过转换和缩放变换成画布坐标
    var x = (event.clientX - bb.left) * (canvas.width / bb.width);
    var y = (event.clientY - bb.top) * (canvas.height / bb.height);
    //用这些变化后的坐标调用isPointInPath()
    return context.isPointInPath(x, y)
  }
  //检测鼠标事件出发点的语速是否绘制过了
  function hitpaint(context, event) {
    //从canvas对象中获取canvas元素
    var canvas = context.canvas;
    //获取画布尺寸和位置
    var bb = canvas.getBoundingClientRect();
    //将鼠标事件坐标通过转换和缩放变换成画布坐标
    var x = (event.clientX - bb.left) * (canvas.width / bb.width);
    var y = (event.clientY - bb.top) * (canvas.height / bb.height);
    //获取像素,一个像素或者多个设备像素映射到一个css像素的像素
    var pixels = context.getImageData(x, y, 1, 1)
    for (var i = 3; i < pixels.data.length; i += 4) {
      if (pixels.data[i] !== 0) return true;
    }
    return false;
  }
  canvas.onclick = function (event) {
    if (hitpath(this.getContext("2d"), event)) {
      alert("Hit!")
    } else {
      console.log('xx')
    }
  }

  //制作迷你图
  function sparkline(selector) {
    var elts = document.getElementsByClassName(selector);
    main: for (var e = 0; e < elts.length; e++) {
      var elt = elts[e];
      //获取元素内容并转换成一个包含数字的数组
      //如果转换失败,则跳过钙元素
      var content = elt.textContent || elt.innerText;
      content = content.replace(/^\s+|\s+$/g, "")
      var text = content.replace(/#.*$/gm, "")
      text = text.replace(/[\n\r\t\v\f]/g, "")
      var data = text.split(/\s+|\s*,\s*/) //以恐吓或者逗号进行分割
      for (var i = 0; i < data.length; i++) {
        data[i] = Number(data[i]);
        if (isNaN(data[i])) continue main;
      }
      //现在根据数据和元素的data-s属性一级元素的计算样式 来计算
      //迷你图的颜色 宽度 高度和y轴的范围
      var style = getComputedStyle(elt, null)
      var color = style.color;
      var height = parseInt(elt.getAttribute('data-height')) || parseInt(style.fontSize) || 20
      var width = parseInt(elt.getAttribute('data-width')) || data.length * (parseInt(elt.getAttribute("data-dx")) || height / 6)
      var ymin = parseInt(elt.getAttribute("data-ymin")) || Math.min.apply(Math, data)
      var ymax = parseInt(elt.getAttribute("data-ymax")) || Math.max.apply(Math, data)
      if (ymin >= ymax) ymax = ymin + 1

      //创建一个画布元素
      var canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.title = content;
      elt.innerHTML = "";
      elt.appendChild(canvas)
      //绘制点(i,data[i]) 转化为画布坐标
      var context = canvas.getContext('2d')
      for (var i = 0; i < data.length; i++) {
        var x = width * i / data.length;
        var y = (ymax - data[i]) * height / (ymax - ymin)
        context.lineTo(x, y)
      }
      context.strokeStyle = color;
      context.stroke()

    }
  }
  sparkline("sparkline")
}