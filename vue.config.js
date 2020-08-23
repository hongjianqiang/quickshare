const { TARGET } = process.env

const config = {
  productionSourceMap: false,

  configureWebpack: cfg => {
    cfg.performance = {
      hints: false // 取消打包文件过大的警告
    }

    if (TARGET === 'Server') {
      cfg.target = 'node'
      cfg.module.rules.unshift({
        test: /(\.html?$)|(\.js.min$)/i, loader: 'raw-loader'
      })
    } else if (TARGET === 'Client') {
      cfg.entry = './src/client/main.ts'
    }

    cfg.output.filename = 'index.min.js'
  },

  chainWebpack: cfg => {
    cfg.optimization.delete('splitChunks')

    if (TARGET === 'Server') {
      cfg.module
        .rule('raw-loader')
        .test(/(\.html?$)|(\.js.min$)/i)
        .use('raw-loader')
        .loader('raw-loader')
        .end()
    } else if (TARGET === 'Client') {
      cfg.plugin('html')
        .tap(args => {
          console.log(args)
          return args
        })
    }

    cfg.module
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
} else if (TARGET === 'Client') {
  // 客户端
  config.outputDir = './dist/client'
}

module.exports = config
