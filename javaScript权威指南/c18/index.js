// ***********************   脚本化HTTP   ***********************
function get(url, callback) {
  var request = new XMLHttpRequest()
  request.open('GET', url)
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      var type = request.getResponseHeader('Content-Tyoe')
      if (type.indexOf('xml') !== -1 && request.responseXML) {
        callback(request.responseXML)
      } else if (type === 'application/json') {
        callback(JSON.parse(request.responseText))
      } else {
        callback(request.responseText)
      }
    }
  }
  request.overrideMimeType('text/plain;charset=utf-8')
  request.send(null)
}
//编码对象
function encodeFormData(data) {
  if (!data) return ''
  var pairs = []
  for (var name in data) {
    if (!data.hasOwnProperty(name)) continue
    if (typeof data[name] === 'function') continue
    var value = data[name].toString()
    name = encodeURIComponent(name.replace('%20', '+'))
    pairs.push(name + '=' + value)
  }

  return pairs.join('&')
}
//post表单格式的数据
function postData(url, data, callback) {
  var request = new XMLHttpRequest()
  request.open('POST', url)
  request.onreadystatechange = function () {
    if (request.readyState === 4 && callback) callback(request)
  }
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  request.send(encodeFormData(data))
}
//get表单格式的数据
function gettData(url, data, callback) {
  var request = new XMLHttpRequest()
  request.open('POST', url + '?' + encodeFormData(data))
  request.onreadystatechange = function () {
    if (request.readyState === 4 && callback) callback(request)
  }
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  request.send(null)
}
//post JSON编码
function postData(url, data, callback) {
  var request = new XMLHttpRequest()
  request.open('POST', url)
  request.onreadystatechange = function () {
    if (request.readyState === 4 && callback) callback(request)
  }
  request.setRequestHeader('Content-Type', 'application/json')
  request.send(JSON.stringify(data))
}

/* <query>
  <find zipcode="03234" radius="1km">
    pizza
  </find>
</query> */
//XML编码  什么东西 在哪儿 和 半径 然后向指定url发送请求
function postQuery(url, what, where, radius, callback) {
  var request = new XMLHttpRequest()
  request.open('POST', url)
  request.onreadystatechange = function () {
    if (request.readyState === 4 && callback) callback(request)
  }
  //穿件xml document with root element
  var doc = document.implementation.createDocument('', 'query', null)
  var query = doc.documentElement
  var find = doc.createElement('find')
  query.appendChild(find)
  find.setAttribute('zipcode', where)
  find.setAttribute('radius', radius)
  find.appendChild(doc.createTextNode(what))

  // xml头格式自动设置
  request.send(doc)
}
//multipart/form-data 请求
//FormData()
function postFormData(url, data, callback) {
  if (typeof FormData === 'undefined') {
    throw new Error('FormData is not implemented')
  }
  var request = new XMLHttpRequest()
  request.open('POST', url)
  request.onreadystatechange = function () {
    if (request.readyState === 4 && callback) callback(request)
  }
  var fromdata = new FormData()
  for (var name in data) {
    if (!data.hasOwnProperty(name)) continue
    var value = data[name]
    if (typeof value === 'function') continue
    fromdata.append(name, value)
  }
  //在multipart/form-data请求主题中发送名/值对
  //每次都是请求的一个部分,注意,当传入FormData对象时候
  //send()会自动设置Content-type
  request.send(fromdata)
}

//http进度事件  之前我们使用readystatechange事件进行探测http请求的完成
//XHR2定义了更多有用的事件集
//这个新的事件模型中定义了请求的不同阶段触发不同类型的事件,所以不需要检查readystate属性
//调用send()时候,触发单个loadstart事件
//在正在加载服务器响应时,XMLHttpRequest对象会发生process事件
//通常每隔50ms左右会反馈请求进度.
//如果请求u快速完成,可能不会触发progress
//事件完成触发load事件
//请求超时 触发 timeout事件
//请求终止 触发 abort事件
// 太多重定向这种的网络错误会组织请求完成, 触发 error事件.
//对于任何具体的请求,load,abort timeout error只会触发其中一个.
//触发完一个之后,浏览器应该触发loadend
{
  var request = new XMLHttpRequest()
  if ('onprogress' in request) {
    request.onprogress = function (e) {
      if (e.lengthComputable)
        progress.innerHTML =
        Math.round((100 * e.loaded) / e, total) + '%Complete'
    }
  } //判断是否支持progress事件
}

//设置xmlHttpRequest对象xhr,xhr.onprogress可以监听响应的下载进度,并且设置xhr.upload.onprogress的可以监听请求的上传进度.
//下例中演示了如何从拖拽api中获取File对象和使用如何FormData API 在单个xmlHttpRequest请求中上传多个文件
//寻找所有含有"fileDropTarget"类的元素
//并注册DnD事件处理程序使他们能响应文件的拖放
//当文件下放时,上传他们到data-uploadto属性指定的url
{
  whenReady(function () {
    var elts = document.getElementsByClassName('fileDropTarget')
    for (var i = 0; i < elts.length; i++) {
      var target = elts[i]
      var url = target.getAttribute('data-uploadto')
      if (!url) continue
      createFileUploadDropTarget(target, url)
    }

    function createFileUploadDropTarget(target, url) {
      //跟踪当前是否正在上传,因此我们能拒绝放下
      //我可以处理多个并发上传
      //但对这个例子使用进度通知太困难
      var uploading = false
      target.ondragenter = function (e) {
        console.log('dragenter')
        if (uploading) return //正在上传 忽略
        var types = e.dataTransfer.types
        if (
          types &&
          ((types.contains && types.contains('Files')) ||
            (types.indexOf && types.indexOf('Files') !== -1))
        ) {
          target.classList.add('wantdrop')
          return false
        }
      }
      target.ondragover = function (e) {
        if (!uploading) return false
      }
      target.ondragleave = function (e) {
        if (!uploading) target.classList, remove('wantdrop')
      }
      target.ondrop = function (e) {
        if (uploading) return false
        var files = e.dataTransfer.files
        if (files && files.length) {
          uploading = true
          var message = 'Uploading file:<ul>'
          for (var i = 0; i < files.length; i++)
            message += '<li>' + files[i].name + '</li>'
          message += '</ul>'
          target.innerHTML = message
          target.classList.remove('wantdrop')
          target.classList.add('uploading')
          var xhr = new XMLHttpRequest()
          xhr.open('POST', url)
          var body = new FormData()
          for (var i = 0; i < files.length; i++) body.append(i, files[i])
          xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
              target.innerHTML =
                message + Math.round((e.loaded / e.total) * 100) + '%Complete'
            }
          }
          xhr.upload.onload = function (e) {
            uploading = false
            target.classList.remove('uploading')
            target.innerHTML = 'Drop files to upload'
          }
          xhr.send(body)
          return false
        }

        target.classList.remove('wantdrop')
      }
    }
  })
}

//终止请求和超时
//可以通过xmlhttprequest对象的abort()取消http请求
//可以通过onabort判断是否存在
{
  //实现超时,假定没有timeout和ontimeout,通过abort模拟
  //发起http请求
  //如果响应成功到达,传入responseText给回调函数
  //如果在timeout毫秒内没有达到,终止这个请求
  //浏览器可能在abort后出发readystatechange
  //如果请求结果部分达到,甚至可能设置state
  //所以需要设置一个标记,当部分且超时时不会调用回调函数
  //如果使用load时间就没有这个风险
  function timedGetText(url, timeout, callback) {
    var request = new XMLHttpRequest()
    var timedout = false
    var timer = setTimeout(function () {
      timedout = true
      request.abort()
    })
    request.open('GET', url)
    request.onreadystatechange = function () {
      if (request.readyState !== 4) return
      if (timedout) return
      clearTimeout(timer)
      if (request.status === 200) callback(request.responseText)
    }

    request.send(null)
  }
}

//是通HEAD和CORS请求连接的详细信息
//linkdetails.js
//查询带有href但是没有title的属性所有a元素
//注册onmouseover事件处理程序
//这个时事件处理程序使用xmlhttprequest head请求 取得链接资源的详细信息
//然后把这些详细信息设置为链接的title属性
{
  whenReady(function () {
    //是否有机会使用跨域请求
    var supportsCORS = new XMLHttpRequest().withCredentials !== undefined
    //便利文档中所有的链接
    var links = document.getElementsByTagName('a')
    for (var i = 0; i < links.length; i++) {
      var link = links[i]
      if (!link.href) continue
      if (link.title) continue
      //如果是一个跨域链接
      if (link.host !== location.host || link.protocol !== location.protocol) {
        link.title = '站外链接'
        if (!supportsCORS) continue
      }
      if (link.addEventListener) {
        link.addEventListener('mouseover', mouseoverHandler, false)
      } else {
        link.attachEvent('onmouseover', mouseoverHandler)
      }
    }

    function mouseoverHandler(e) {
      var link = e.target || e.srcElement
      var url = link.href
      var req = new XMLHttpRequest()
      req.open('HEAD', url)
      req.onreadyStatechange = function () {
        if (req.readyState !== 4) return
        if (req.status === 2) {
          var type = req.getResponseHeader('Content-Type')
          var size = req.getResponseHeader('Content-Length')
          var date = req.getResponseHeader('Content-Modified')
          link.title = '类型:' + type + '\n大小:' + size + '\n时间:' + date
        } else {
          //如果请求失败,且链接没有 "站外链接" 的工具提示
          //name就显示这个错误
          if (!link.title) {
            link.title =
              "Couldn't fetch details:\n" + req.status + ' ' + req.statusText
          }
        }
        req.send(null)
        //移除处理程序,仅想一次获取这些头信息
        if (link.removeEventListener) {
          link.removeEventListener('mouseover', mouseoverHandler, false)
        } else {
          link.detachEvent('onmouseover', mouseoverHandler)
        }
      }
    }
  })
}

//借助<script></script>发送HTTP请求:JSONP
//根据指定url发送一个jsonp请求
//然后把解析得到的数据传递给回调函数
//在url中添加一个名为jsonp的查询参数,用于指定该请求的回调函数的名称

function getJSONP(url, callback) {
  var cbnum = 'cb' + getJSONP.counter++
  var cbname = 'getJSONP.' + cbnum
  //将回调函数名称以表单编码的形式添加到url的查询部分中
  //使用jsonp作为参数名.一些支持jsonp的辅助
  //可能使用其他参数名,比如 callback
  if (url.indexOf('?') === -1) {
    //没有查询部分
    url += '?jsonp=' + cbname
  } else {
    url += '&jsonp=' + cbname
  }

  var script = document.createElement('script')
  getJSONP[cbnum] = function (response) {
    try {
      callback(response)
    } finally {
      //回调函数响应或响应抛出错误
      delete getJSONP[cbnum]
      script.parentNode.removeChild(script)
    }
  }

  script.src = url
  document.body.appendChild(script)
}
getJSONP.counter = 0

//基于服务器端推送事件comet技术
//在服务器端推送事件的标准草案中定义了一个EventSource对象
//可以传递一个url给构造函数,然后在返回的实例上监听消息时间
{
  // var ticker = new EventSource("stockprices.php")
  // ticker.onmessage = function (e) {
  //   var type = e.type;
  //   var data = e.data;
  // }

  function chat(url) {
    //注意一些ui细节
    var nick = prompt("enter your nickname"); //获取用户昵称
    var input = document.getElementById("input") //获取表单元素
    input.focus() //设置键盘焦点

    //通过EventSource注册新的消息通知
    var chat = new EventSource(url);
    chat.onmessage = function (event) {
      var msg = event.data;
      var node = document.createTextNode(msg)
      var div = document.createElement('div')
      div.appendChild(node)
      document.body.insertBefore(div, input)
      input.scrollIntoView();
    }
    //通过xmlhttprequest
    input.onchange = function () {
      var msg = nick + ":" + input.value;
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url)
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.send(msg);
      input.value = "";
    }
  }
}

//通过xhr模拟EventSource
{
  if (window.EventSource === undefined) {
    let iEventSource = function (url) {
      var xhr; //http连接器
      var evtsrc = this; //在时间处理中通道
      var charsReceived = 0; //这样我们就知道什么是新的
      var type = null; //检查属性响应类型
      var data = ""; //存放小心数据
      var eventName = "message"; //时间对象类型字段
      var lastEventId = ""; //用于和服务器再次同步
      var retrydelay = 1000; //延迟时间
      var aborted = false; //设置为true表示放弃连接
      //创建一个xhr对象
      xhr = new XMLHttpRequest();
      //定义一个事件处理程序
      xhr.onreadystatechange = function () {
        switch (xhr.readyState) {
          case 3:
            processData();
            break;
          case 4:
            reconnect();
            break;
        }
      }

      connect(); //创建一个长期存在的链接
      function connect() {
        charsReceived = 0;
        type = null;
        xhr.open("GET", null);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        if (lastEventId) xhr.setRequestHeader("Last-Event-ID", lastEventId);
        xhr.send();
      }
      //如果是链接正常关闭,等待1s重新链接
      function reconnect() {
        if (aborted) return;
        if (xhr.status >= 300) return;
        setTimeout(connect, retrydelay)
      }
      //m每当数据到达的时候,会处理并触发onmessage处理程序
      //这个函数处理server-send Events 协议的细节
      function processData() {
        if (!type) {
          //如果没有装备好,先检查响应类型
          type = xhr.getResponseHeader("Content-Type");
          if (type !== "text/event-stream") {
            aborted = true;
            xhr.abort();
            return;
          }
        }
        //记录接收的数据
        var chunk = xhr.responseText.substring(charsReceived)
        charsReceived = xhr.responseText.length;

        //将大块文本数据分成多行,并且便利他们
        var lines = chunk.replace(/(\r\n|\r|\n)$/, "").split(/\r\n|\r|\n/);
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i],
            pos = line.indexOf(":"),
            name, value = "";
          if (pos === 0) continue; //忽略注释
          if (pos > 0) {
            name = line.substring(0, pos);
            value = line.substring(pos + 1);
            if (value.charAt(0) == "") value = value.substring(1)
          } else name = line;
          switch (name) {
            case "event":
              eventName = value;
              break;
            case "data":
              data += value + "\n";
              break;
            case "id":
              lastEventId = value;
              break;
            case "retry":
              retrydelay = parseInt(value) || 1000;
              break;
            default:
              break;
          }
          if (line === "") {
            if (evtsrc.onmessage && data !== "") {
              //如果末尾有新行 就裁剪新航
              if (data.charAt(dara.length - 1) == "\n") {
                data = data.substring(0, data.length - 1)
              }
              evtsrc.onmessage({
                type: eventName,
                data: data,
                origin: url
              })
            }

            data = "";
            continue;
          }
        }



      }
    }
  }
}