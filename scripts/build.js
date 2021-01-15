process.env.UV_THREADPOOL_SIZE = require('os').cpus().length // 设置 NodeJS 线程池大小为 CPU 内核数，最大限度发挥机器性能

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
