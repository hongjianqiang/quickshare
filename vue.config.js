const { TARGET } = process.env

const config = {
  productionSourceMap: false,

  configureWebpack: {
    performance: {
      hints: false // 取消打包文件过大的警告
    }
  },

  chainWebpack: config => {
    config.optimization.delete('splitChunks')

    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10000 })) // 小于 10 KB 的图片转 base64
  },

  css: {
    extract: false // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
  }
}

if (TARGET === 'Server') {
  // 服务端
  config.outputDir = './dist/server'
  config.configureWebpack.target = 'node'
} else if (TARGET === 'Client') {
  // 客户端
  config.outputDir = './dist/client'
  config.configureWebpack.entry = './src/client/main.ts'
  config.configureWebpack.output = {
    filename: 'index.js'
  }
}

module.exports = config
