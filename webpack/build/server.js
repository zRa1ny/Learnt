const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
const watching = compiler.watch({
  // watchOptions 示例
  aggregateTimeout: 300,
  poll: undefined
}, (err, stats) => {
  // 在这里打印 watch/build 结果...
  console.log(stats);
});
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.

// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath
// }));

// Serve the files on port 3000.
app.listen(3303, function () {
  console.log('Example app listening on port 3000!\n');
});