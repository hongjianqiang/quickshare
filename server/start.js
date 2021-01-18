process.env.UV_THREADPOOL_SIZE = require('os').cpus().length // 设置 NodeJS 线程池大小为 CPU 内核数，最大限度发挥机器性能

require('@babel/register')({
  presets: [
    '@babel/preset-env'
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
})

require('./main.js')
