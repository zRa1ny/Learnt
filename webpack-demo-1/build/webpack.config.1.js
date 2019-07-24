// 保存 =》 开发/使用webpack-dev-server
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //默认添加输出路径到html
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin'); //清理文件夹
module.exports = {
  // entry: './app/main.js',
  entry: {
    app: './app/index.js',
    print: './app/print.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Output Managemnt"
    }),
    new CleanWebpackPlugin()
  ],
  devtool: 'inline-source-map', //配置source-map
  devServer: {
    contentBase: "./public"
  },
  output: {
    // filename: 'bundle.js',
    filename: '[name].bundle.js',
    path: path.resolve('./public')
  },
  mode: 'development', // 设置mode
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader'
      ]
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        "file-loader"
      ]
    }, {
      test: /\.xml$/,
      use: [
        "xml-loader"
      ]
    }]
  }
};