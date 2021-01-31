process.env.UV_THREADPOOL_SIZE = require('os').cpus().length // 设置 NodeJS 线程池大小为 CPU 内核数，最大限度发挥机器性能

const open = require('open')
const express = require('express')
const webpack = require('webpack')

const { createProxyMiddleware } = require('http-proxy-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const tryUsePort = require('../shared/tryUsePort')
const WEBPACK_DEV_CONFIG = require('./webpack.dev.js')

tryUsePort(process.env.PORT || process.argv[2] || 2020, port => {
  const compiler = webpack(WEBPACK_DEV_CONFIG)
  const devInstance = webpackDevMiddleware(compiler, { publicPath: WEBPACK_DEV_CONFIG.output.publicPath })
  const hotInstance = webpackHotMiddleware(compiler, { log: false, heartbeat: 2000 })
  
  const app = express()
  
  app.use('/api', createProxyMiddleware({ target: `http://localhost:${port+1}`, changeOrigin: true }));

  app.use(devInstance)
  app.use(hotInstance)
  
  devInstance.waitUntilValid(() => {
    const LOCAL_URL = `http://localhost:${port}`

    process.stdout.write(`\n Listening at ${LOCAL_URL} \n`)

    open(LOCAL_URL)
  })

  app.listen(port)
})
