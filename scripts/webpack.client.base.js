const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const package = require('../package.json');

module.exports = {
  entry: {
    app: './src/entry-client/index.ts'
  },
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, '..', 'lib', 'entry-client')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.vue$/, loader: 'vue-loader' }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: `${package.name[0].toUpperCase()}${package.name.slice(1)}`,
      template: './src/entry-client/index.html',
      filename: './index.html',
      inject: 'body',
      minify: false
    })
  ]
}
