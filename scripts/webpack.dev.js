const { merge } = require('webpack-merge')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('./html-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
})
