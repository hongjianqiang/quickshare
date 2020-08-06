const { merge } = require('webpack-merge');
const base = require('./webpack.client.base.js');

module.exports = merge(base, {
  mode: 'production'
});
