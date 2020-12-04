const path  = require('path')
// console.log("__dirname",__dirname,__filename)
// console.log(path.join('/feedback/','/view/'))   //连接多个路径字符串为一个规范的路径
// console.log(path.join(__dirname,  '/feedback/','/view/'))   //连接多个路径字符串为一个规范的路径
// console.log(path.resolve('/photo.png','/public/'));    //解析多个路径字符串为一个绝对路径
// console.log(path.parse(__filename))     //解析路径字符串为一个路径信息对象
// console.log(path.basename(__filename)); //获取文件名
// console.log(path.extname(__filename));  //获取文件扩展名
// console.log(path.dirname(__filename));  //获取文件路径
console.log(path.resolve('./', './123.txt'))