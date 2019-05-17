//定制server-sent Events聊天服务器
//nodejs
//该聊天室比较简单 完全匿名
//将新的消息以post发送到/chat/或者以get获取一个消息文本/事件流
//穿件一个get请求来骑牛"/返回一个html""
var http = require("http");
var clientUi = require('fs').readFileSync("chatclient.html")
var emulation = require('fs').readFileSync("EventSourceEmulation.js")
var clients = []; //serverResponse对象数组,用来接收发送的事件
//每隔20s发送一条注释到客户端
//这样他们就不会关闭连接再充连
setInterval(function () {
  clients.forEach(function (client) {
    client.write(":ping\n")
  })
}, 2000)
//创建一个新服务器
var server = new http.Server();
server.on("request", function (request, response) {
  //解析请求的url
  var url = require("url").parse(request.url)
  //如果请求是发送到"/",服务器就发送客户端聊天室ui
  if (url.pathname === "/") {
    response.writeHead(200, {
      "Content-Type": "text/html"
    })
    response.write("<script>" + emulation + "</script>")
    response.write(clientUi)
    response.end()
    return;
  } else if (url.pathname !== "/chat") {
    response.writeHead(404);
    response.end()
    return;
  }

  //如果请求是post,就是有一个客户端发送来了一条新的消息
  if (request.method === "POST") {
    request.setEncoding("utf8");
    var body = "";
    //在获取数据之后,将其添加到请求主题中
    request.on("data", function (chunk) {
      body += chunk;
    })
    //当请求完成,发送一个空响应
    //并将消息传播到所有处于监听状态的客户端中
    request.on("end", function () {
      response.writeHead(200) //响应请求
      response.end();

      //将消息转化为文本/事件流格式
      //确保每行的前缀是 "data:"
      //并且以两个换行符结束
      message = "data:" + body.replace("\n", "\ndata:") + "\r\n\r\n"
      clients.forEach(function (client) {
        client.write(message)
      })
    })
  } else {
    //如果不是post请求,则是客户端正在请求一组消息,客户接入 /chat
    response.writeHead(200, {
      "Content-Type": "text/event-stream"
    })
    response.write("data:你已经连接!\n\n")
    //如果客户端关闭了连接,就从活动客户端数组中删除对应的响应对象
    request.connection.on("end", function () {
      clients.splice(clients.indexOf(response), 1)
      response.end()
    })
    //记下响应对象,这样就可以向他发送未来的消息
    clients.push(response)
  }

})


server.listen(8000)