const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const base = require('./webpack.client.base.js');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, '..', 'lib', 'entry-client')
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
