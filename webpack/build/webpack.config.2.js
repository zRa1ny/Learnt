const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './app/change.js',
    polyfills: './app/polyfills.js',
    // main: './app/main.js'
    // vendor: [
    //   'lodash'
    // ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public',
    hot: true
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: require.resolve('../app/change.js'),
      use: 'imports-loader?this=>window'
    },
    {
      test: require.resolve('../app/globals.js'),
      use: 'exports-loader?file,parse=helpers.parse'
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Caching'
    }),
    new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest' // 指定公共 bundle 的名称。
    // })
    new webpack.ProvidePlugin({
      _: 'lodash'
    })
  ],
  output: {
    // filename: "webpack-numbers.js",
    // library: "webpackNumbers",
    // libraryTarget: 'umd',
    filename: '[name].[chunkhash].js',
    // chunkFilename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, '../public')
  },
  // externals: {
  // lodash: {
  //   commonjs: "lodash",
  //   commonjs2: "lodash",
  //   amd: "lodash",
  //   root: "_"
  // },
  // Everything that starts with "library/"
  // /^library\/.+$/
  // },
  mode: "development",
  // optimization: {
  // splitChunks: {
  //   cacheGroups: {
  //     commons: {
  //       name: "commons",
  //       chunks: "initial",
  //       minChunks: 2
  //     },
  //     vendor: {
  //       name: "vendor",
  //       chunks: "initial",
  //       minChunks: 2
  //     },
  //     manifest: {
  //       name: "manifest",
  //       chunks: "initial",
  //       minChunks: 2
  //     }
  //   }
  // }
  // providedExports: true,
  // usedExports: false, //实际控制是否删除无用模块
  // sideEffects: false, // 是否识别第三方库 package.json 中的 sideEffects 以剔除无用的模块。生产模式下默认开启，其他模式不开启。
  // }
};