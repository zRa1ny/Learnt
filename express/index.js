const express = require("express")
const bodyParser = require('body-parser')
const fs = require("fs")
const app = express();
var router = express.Router();

// 实现代理

// const request = require('request');
// var proxy = require('http-proxy-middleware');
// let serverUrl = 'http://test-zhzl.spacecig.com';
// app.use('/', function (req, res) {
//   let url = serverUrl + req.url;
//   req.pipe(request(url)).pipe(res);
// });

// app.use('/', proxy({
//   target: 'http://test-zhzl.spacecig.com',
//   changeOrigin: true
// }));
// end


router.get("/file", function (req, res) {
  fs.readFile(__dirname + "/" + "file.json", "utf8", function (err, data) {

    if (err) throw err;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.json({
      code: 1,
      success: "ok",
      data: JSON.parse(data)
    })
  })
})
router.get("/list", function (req, res) {
  fs.readFile(__dirname + "/" + "list.json", "utf8", function (err, data) {

    if (err) throw err;
    res.json({
      code: 1,
      success: "ok",
      data: JSON.parse(data)
    })
  })
})
router.get("/item", function (req, res) {
  fs.readFile(__dirname + "/" + "list.json", "utf8", function (err, data) {
    if (err) throw err;
    try {
      var id = req.query.id;
      console.log(id)
      var desObj = JSON.parse(data);
      var resData;
      desObj.forEach(element => {
        if (element.id = id) {
          res.json({
            success: 'ok',
            code: 1,
            data: element
          })
          throw new Error('endForEach');
        }

      });
    } catch (e) {
      if (e.message != 'endForEach') throw e;
    }
  })
})
router.post("/list", function (req, res) {
  fs.readFile(__dirname + "/" + "list.json", "utf8", function (err, data) {

    if (err) throw err;
    var id = req.body.id;
    var title = req.body.title;
    var des = req.body.des;
    var desObj = JSON.parse(data);
    var flag = desObj.every(function (keyid) {
      return keyid !== id
    })
    if (flag) {
      desObj.push({
        id: id,
        title: title,
        des: des
      })
      fs.writeFile("detail.json", desObj, 'utf8', (err) => {
        if (err) throw err;
        res.json({
          success: 'ok',
          code: 1,
          data: desObj
        })
      })
    } else {
      res.json({
        success: '重复添加',
        code: 0,
      })
    }
  })
})
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use("/api", router)
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})