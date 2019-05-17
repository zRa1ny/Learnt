/**
 * Created by *** on 2018/8/10.
 */
var path = require('path')
var express = require('express');
var app = express();
var server = require('http').createServer(app);

/**
 *  下方"items"换成 "front-public" 和 "components" 两个文件夹的上一级文件夹的名称
 */ 
app.use(express.static('../../../items'))  


app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'))
});

app.get('/index.html', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'))
});

server.listen(8086, function () {
    console.log('Listening on port 8086...')
});
