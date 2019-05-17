// *********************** 服务器端javascript *********************** 
const fs = require('fs')
const path = require('path')
const configpath = './javaScript权威指南/config.json'
// var ojs = fs.readFile(configpath, "utf8", function (err, buffer) {
//   if (err) throw err;
//   console.log(buffer)
// })
// fs.writeFile(configpath, JSON.stringify({
//   name: "cline",
//   age: 18
// }))
//用流api复制文件
//若想知道何时完成,请传递回调函数
// function fileCopy(filename1, filename2, done) {
//   var input = fs.createReadStream(filename1); //输入流
//   var output = fs.createWriteStream(filename2); //输出流
//   input.on("data", function (d) {
//     output.write(d)
//   })
//   input.on("error", function (err) {
//     throw err
//   })
//   input.on('end', function () {
//     output.end();
//     if (done) done();
//   })
// }

// //使用同步方法列出一个目录的内容,并显示文件大小和修改日期
// var dir = process.cwd(); //当前目录
// if (process.argv.length > 2) dir = process.argv[2]; //或来自命令行
// var files = fs.readdirSync(dir);
// process.stdout.write("name\tSize\tDate\n"); //输出头
// files.forEach(filename => {
//   console.log(filename)
//   var fullname = path.join(dir, filename);
//   var stats = fs.statSync(fullname);
//   if (stats.isDirectory()) filename += "/";
//   console.log(filename + "\t" + stats.size + "\t" + stats.mtime + "\n")
// })
//node中简单的TCP回显服务器:监听2000端口上的链接
//并且把客户端的数据回显给它
// var net = require("net")
// var server = net.createServer()
// server.listen(2000, function () {
//   console.log("Listening on port 200")
// })
// server.on("connection", function (stream) {
//   console.log("Accepting connection from ", stream.remoteAddress)
//   stream.on("data", function (data) {
//     stream.write(data)
//   })
//   stream.on("end", function (data) {
//     console.log("Connection closed")
//   })
// })
//除了基础的net模块,node使用http模块内置支持http协议
var http = require('http');
var httputils = require('./httputils')
var urls = require('url');
// console.log(httputils)
// var server = new http.Server(); //创建新的http服务器
// server.listen(8000);
// //Nodes使用on()方法注册时间处理程序
// //当服务器得到新的请求,则运行函数处理它
// server.on('request', function (request, response) {
//   //解析请求的url
//   var url = urls.parse(request.url);
//   console.log(url)
//   //特殊url会让服务器在发送前先等待
//   //此处用于模拟缓慢的网络连接
//   if (url.pathname === "/test/delay") {
//     //使用查询字符串来获取延迟时长或者2000s
//     var delay = parseInt(url.query) || 2000;
//     //设置响应头和状态码
//     response.writeHead(200, {
//       "Content-Type": "text/plain;charset=UTF-8"
//     });
//     //立即开始编写响应主题
//     response.write("Sleeping For " + delay + "milliseconds..")
//     setTimeout(() => {
//       response.write('done')
//       response.end()
//     }, delay);
//   }
//   //如果是/test/mirror,则原文返回他
//   //当需要看到这个请求头和主题时很有用
//   else if (url.pathname === "/test/mirror") {
//     //响应头和状态
//     response.writeHead(200, {
//       "Content-Type": "text/plain;charset=UTF-8"
//     });
//     //用请求的内容开始编写响应主题
//     response.write(request.method + " " + request.url + "HTTP/" + request.httpVersion + "\r\n")
//     //所有的请求头
//     for (var h in request.headers) {
//       response.write(h + ":" + request.headers[h] + "\r\n")
//     }
//     response.write("\r\n");
//     //在这些事件处理程序中完成响应
//     //当请求主题的数据块完成时,把其写入响应中
//     request.on("data", function (chunk) {
//       response.write(chunk)
//     })
//     request.on('end', function (chunk) {
//       response.end()
//     })
//   }
//   //否则处理来自本地目录的文件
//   else {
//     //获取本地文件名,基于其扩展名推测内容类型
//     var filename = url.pathname.substring(1); //去掉前导"/"
//     var type;
//     switch (filename.substring(filename.lastIndexOf(".") + 1)) {
//       //扩展名
//       case "html":
//         ;
//       case "htm":
//         type = "text/html;charset=UTF-8";
//         break;
//       case "js":
//         type = "application/javascript:charset=UTF-8";
//         break;
//       case "css":
//         type = "text/css;charset=UTF-8";
//         break;
//       case "txt":
//         type = "text/plain;charset=UTF-8";
//         break;
//       case "manifest":
//         type = "text/cache-manifest;charset=UTF-8";
//         break;
//       default:
//         type = "application/octet-stream";
//         break;
//     }

//     //异步读取数据,并将内容作为单独数据块穿给回调函数
//     //对于确实很大的文件,使用流api  fs.createReadStream()更好
//     fs.readFile(filename, function (err, content) {
//       if (err) {
//         response.writeHead(404, {
//           "Content-Type": "text/plain;charset:UTF-8"
//         })
//         response.write(err.message)
//         response.end()
//       } else {
//         response.writeHead(200, {
//           "Content-Type": type
//         })
//         response.write(content); //吧文件内容作为相应主题发送
//         response.end()
//       }
//     })
//   }
// })