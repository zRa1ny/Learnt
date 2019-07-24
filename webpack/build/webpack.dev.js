const merge = require('webpack-merge');
const common = require('./webpack.common');
module.exports = merge(common, {
  devtool: "inline-source-map",
  devServer: {
    contentBase: './dist',
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
})