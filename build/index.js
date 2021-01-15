const webpack = require('webpack')

const WEBPACK_PROD_CONFIG = require('./webpack.prod.js')

webpack(WEBPACK_PROD_CONFIG, function (err, stats) {
  if (err) throw err

  console.log(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }))
})
