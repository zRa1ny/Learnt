//postMessage
//onmessage
//close //无法在外部worker对象上检测到 需要先传递关闭消息
//importScript()  //同步加载库文件 importScript('./jQuery.js','./jQuery.js') 
//WorkerGlobalScope 是worker的全局对象 拥有javascript全局对象的拥有的那些属性,诸于json对象,isNAN()等  除此之外还有拥有
//self 兑现全局对象自身的英语
//计时器方法 : setTimeout(),clearTimeout(),setInterval(),clearInterval()
//location属性,描述传递给worker构造函数的url
//navigator 拥有和window类似的属性
//addEventListener()和removeEventListener()
//XMLHttprequeset() ,Worker()
// console.log(location)
// onmessage = function (data) {
//   console.log(data)
// }

onmessage = function (e) {
  postMessage(smear(e.data))
}

function smear(pixels) {
  var data = pixels.data,
    width = pixels.width,
    height = pixels.height;
  var n = 10,
    m = n - 1; //设置n倍大,用于更多的涂抹
  for (var row = 0; row < height; row++) {
    var i = row * width * 4 + 4; //第二个行第一个像素
    for (var col = 1; col < width; col++, i += 4) {
      data[i] = (data[i] + data[i - 4] * m) / n;
      data[i + 1] = (data[i + 1] + data[i - 3] * m) / n;
      data[i + 2] = (data[i + 2] + data[i - 2] * m) / n;
      data[i + 3] = (data[i + 3] + data[i - 1] * m) / n;
    }
  }
  return pixels;
}