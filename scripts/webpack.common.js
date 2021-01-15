const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    client: [
      path.resolve(__dirname, '..', 'client', 'main.js'),
      'webpack-hot-middleware/client?quiet=true&reload=true' // 热配置重载
    ]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.m?js$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '..', 'dist', 'client'),
    publicPath: '/'
  }
}
